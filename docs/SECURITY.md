# Security

Security for the Election Guide Assistant is structured in three layers:
HTTP response headers, request-level middleware, and application-level
input validation. Nothing sensitive is persisted server-side — the app
is stateless by design.

## HTTP response headers

Configured in `next.config.mjs` and applied to every route:

| Header                        | Value                                                                                   |
| ----------------------------- | --------------------------------------------------------------------------------------- |
| `Content-Security-Policy`     | Strict default with explicit allow-lists for fonts, styles, scripts, images, and connect sources |
| `Referrer-Policy`             | `strict-origin-when-cross-origin`                                                       |
| `X-Content-Type-Options`      | `nosniff`                                                                               |
| `X-Frame-Options`             | `DENY`                                                                                  |
| `Cross-Origin-Opener-Policy`  | `same-origin`                                                                           |
| `Permissions-Policy`          | Denies `camera`, `microphone`, and `geolocation`                                        |

The `x-powered-by` header is disabled via `poweredByHeader: false` to
avoid leaking framework metadata.

## Request middleware

`middleware.ts` runs on the edge for every route and:

- Generates a stable `x-request-id` (UUID) on every request.
- Forwards Google Cloud's `X-Cloud-Trace-Context` into a downstream
  `x-trace-id` header so application logs can correlate with Cloud
  Trace.
- Forces `Cache-Control: no-store, max-age=0` on API responses so
  proxies cannot accidentally cache them.

## Input validation

`lib/validation.ts` provides dependency-free validators:

- `validateString` — min/max length, optional regex pattern.
- `validateEnum` — fixed allow-list with branded type guarantees.
- `validateQuestion` — specialises the above for the assistant input.
- `sanitizeFreeText` — defence-in-depth strip of `<script>` tags and
  `javascript:` URIs. Rendering still relies on React's escaping.

All assistant inputs are routed through these validators in
`app/page.tsx` before any state update.

## Dependency policy

- Runtime dependencies: `clsx`, `framer-motion`, `lucide-react`,
  `next`, `react`, `react-dom`, `tailwind-merge`, `zustand`. All are
  pinned to exact minor versions.
- No user-generated content is sent to third-party services.
- No secrets are committed to the repository; deploy credentials are
  loaded via GitHub OIDC (Workload Identity Federation) at deploy
  time.

## Reporting vulnerabilities

If you discover a vulnerability, please open a private issue or email
the maintainers before disclosing publicly. We aim to respond within
72 hours.

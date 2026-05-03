# Contributing to Election Guide Assistant

Thank you for considering a contribution! This project is a civic-education platform, and we welcome help from developers, writers, designers, and accessibility advocates.

## Getting started

1. **Fork** the repository and clone your fork locally.
2. Install dependencies:
   ```bash
   nvm use          # picks up the .nvmrc (Node 20)
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000` and verify the app loads correctly.

## Development workflow

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run lint` | Run ESLint across the codebase |
| `npm test` | Run the full Vitest test suite |
| `npm run build` | Create a production build |
| `npm run ci` | Lint → Test → Build (same as CI pipeline) |

## Branch naming

Use descriptive branch names:

- `feature/glossary-search` — new functionality
- `fix/checklist-toggle-state` — bug fix
- `docs/update-accessibility-notes` — documentation improvement

## Commit messages

Write clear, imperative commit messages:

```
Add keyboard navigation to timeline explorer
Fix checklist item toggle not persisting
Update accessibility docs with screen-reader notes
```

## Pull request guidelines

1. **One concern per PR.** Keep changes focused and reviewable.
2. **Run `npm run ci` locally** before opening a PR. The CI pipeline will reject PRs that fail lint, tests, or build.
3. **Describe your changes** in the PR body — what you changed, why, and how you tested it.
4. **Add tests** for new functionality where practical (see `tests/` and [`docs/TESTING.md`](./docs/TESTING.md)).
5. **Respect accessibility.** All interactive elements must be keyboard-reachable and have visible focus states. See [`docs/ACCESSIBILITY.md`](./docs/ACCESSIBILITY.md).

## Content contributions

All civic content lives in `lib/data/*.ts` and is strongly typed by `lib/types.ts`. If you're adding or editing content:

- Keep language **neutral and non-partisan**.
- Use **plain language** — avoid institutional jargon unless it's defined in the glossary.
- Follow the existing data structures; the TypeScript compiler will enforce the schema.

## Code style

- **TypeScript** (strict mode) — no `any` unless truly unavoidable.
- **Tailwind CSS** with the project's token-driven theme — avoid arbitrary values.
- **Framer Motion** for animations — respect the `prefers-reduced-motion` setting.
- **ESLint** enforces the configured rules; please don't disable rules without discussion.

## Reporting issues

Open a GitHub issue with:

- A clear title describing the problem or suggestion.
- Steps to reproduce (for bugs).
- Expected vs. actual behavior.
- Screenshots or screen recordings if relevant.

## Code of conduct

Be respectful, constructive, and welcoming. This is a civic-education project — we hold ourselves to the same standard of clarity and inclusiveness that we ask of the product.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).

# Testing

The Election Guide Assistant uses **Vitest** for fast, type-safe unit
tests. Tests live in `tests/` and run in Node with JSDOM-free modules —
the app's data layer is pure TypeScript, so this keeps the suite
millisecond-fast.

## Running the suite

```bash
npm test              # one-shot run
npm run test:coverage # with v8 coverage report
npm run ci            # lint + test + build
```

The `npm run ci` script is the single command exercised locally and in
CI (`.github/workflows/deploy-cloud-run.yml`). No deploy happens
without it passing.

## Test inventory

| File                            | What it covers                                                               |
| ------------------------------- | ---------------------------------------------------------------------------- |
| `tests/assistant.test.ts`       | Assistant intent matcher, depth variants, suggestion list, edge cases       |
| `tests/data.test.ts`            | End-to-end data integration: assistant → checklist → regions                 |
| `tests/checklist.test.ts`       | Scenario-to-item mapping, urgency tiers, uniqueness                         |
| `tests/faq.test.ts`             | FAQ shape, myth-vs-fact entries, keyword coverage                           |
| `tests/glossary.test.ts`        | Term uniqueness, related-term integrity                                     |
| `tests/google-cloud.test.ts`    | Structured logger output shape, severity mapping for HTTP statuses          |
| `tests/process.test.ts`         | Process-step glyphs, caption and detail presence                            |
| `tests/regions.test.ts`         | ISO-3166 codes, authority metadata, fallback behaviour                      |
| `tests/scenarios.test.ts`       | Every scenario has at least one checklist item                              |
| `tests/timeline.test.ts`        | Phase count, sequencing, checkpoint tones, key phase content                |
| `tests/validation.test.ts`      | String/enum validators, question-input guardrails, sanitizer                |
| `tests/voting-day.test.ts`      | Group coverage, accessibility items, item body hygiene                      |

All tests are deterministic and network-free.

## Adding new tests

1. Put tests under `tests/` using a descriptive filename
   (`feature.test.ts`).
2. Prefer small, focused `it()` blocks — one behaviour per test.
3. Avoid mocking React components in this suite; for UI behaviour,
   add a separate `*.ui.test.tsx` file in a future iteration.
4. Confirm `npm run ci` is green before opening a pull request.

## CI behaviour

The deploy workflow runs the suite ahead of building the container
image. Any failure blocks Cloud Run deployment. This wiring keeps the
only deploy paths auditable and ensures the production revision is
always test-green.

# Election Guide Assistant

A premium, interactive civic-tech companion that walks first-time voters,
students, and curious citizens through the election process — in plain
language, with a calm and non-partisan tone.

## What's in the box

- **Entry / Overview** — editorial hero with a smart prompt and quick chips
- **Process Flow** — six clickable steps with custom SVG glyphs
- **Eligibility Check** — a 30-second yes/no self-check
- **Timeline Explorer** — a phase-by-phase scrubber with full editorial detail
- **Personalised Checklist** — scenario-driven, with progress ring and "next step" suggestion
- **Voting Day Guide** — calm, in-order, including issue-handling and accessibility
- **FAQ + Myth vs Fact** — accordion + reveal-style myth cards
- **Glossary Explorer** — civic terms with plain-language and "why it matters"
- **Assistant** — depth toggle (Quick / Beginner / Student / Detailed) with contextual prompts
- **Command Palette (⌘K)** — keyboard nav, fuzzy section + term + assistant search
- **Region Sheet** — modular region/election-type swap
- **Settings Sheet** — theme, large text, high contrast, reduced motion

## Design choices

- **Editorial civic-tech** aesthetic — warm paper neutrals, deep ink, a single ember accent (terracotta/burnt-sienna), sage as a categorisation hue. Hairline borders, layered cards, no glass/gradient cliché.
- **Typography** — `Instrument Serif` for editorial display, `Inter` for UI, `JetBrains Mono` for tabular figures (dates, deadlines, indices).
- **Custom UI** — non-pill `Button` with inset highlight + press depth, `Chip` with active-fill, `Segmented` morphing toggle (Framer `layoutId`), editorial `SectionHeader` with index/eyebrow.
- **Standout detail** — the Timeline Explorer scrubber + per-phase editorial composition, plus the keyboard-driven Command Palette.
- **Motion** — Framer Motion springs throughout. Honours `prefers-reduced-motion` via global CSS plus a `MotionConfig` wrapper that responds to the in-app toggle.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS with token-driven theme (light + dark) and a11y modes
- Framer Motion for choreography
- Zustand (with `localStorage` persistence) for state
- Lucide for iconography

## Run

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build
npm start      # serve the prod build
```

## Data model

All content is in `lib/data/*.ts` and strictly typed in `lib/types.ts`:

- `regions.ts` — country-level metadata + applicable election types
- `timeline.ts` — phase-by-phase content
- `process.ts` — process flow steps
- `scenarios.ts` — checklist scenarios
- `checklist.ts` — items tagged by scenario
- `votingDay.ts` — items grouped by polling-day stage
- `faq.ts` — common questions + myth/fact pairs
- `glossary.ts` — civic terms with three layers (short/plain/why)
- `assistant.ts` — pre-authored depth-aware responses + intent matcher

The schema is built so a real source layer (e.g. official APIs) can plug in
later — every content item carries a `category` (`official-guidance` |
`explainer` | `checklist` | `common-question` | `deadline` | `definition`).

## Accessibility

- Semantic landmarks (`header`, `aside`, `main`, `nav`, `footer`)
- `:focus-visible` ember rings on every interactive element
- 44×44 minimum touch targets on mobile
- ARIA roles for slider, dialog, listbox, switch
- Skip-to-content link
- Reduced motion respected via OS pref + in-app toggle
- High-contrast mode that strengthens hairlines and deepens muted text

## Disclaimer

This guide is educational. Election rules and dates vary by region and
update over time. For binding information, always consult your country's
election commission, electoral office, or equivalent.

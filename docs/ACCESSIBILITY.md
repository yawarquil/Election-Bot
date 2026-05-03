# Accessibility

The Election Guide Assistant is built to WCAG 2.1 AA guidelines. This
document is a living inventory of what is in place and what is tested.

## Structure and landmarks

- `app/layout.tsx` declares `lang="en"` on `<html>` and wraps page
  content in a clear `<main id="main-content">` element.
- A skip-to-content link is the first focusable element on every page
  and is visually revealed only on focus.
- Every section uses semantic headings (`<h1>`–`<h3>`) in document
  order.

## Keyboard navigation

- Every interactive element is reachable by keyboard.
- The command palette (`⌘K` / `Ctrl+K`) supports `ArrowUp`/`ArrowDown`,
  `Enter`, and `Escape`.
- Visible focus is always preserved via `focus-visible` styles —
  defaults are never suppressed.

## Screen readers

- The assistant transcript uses `role="log"` with `aria-live="polite"`
  and `aria-relevant="additions text"` so streamed answers are
  announced without interrupting.
- `aria-busy` is toggled during the loading state.
- The assistant input has an `sr-only` help text associated via
  `aria-describedby` explaining the keyboard shortcuts.
- The segmented depth control exposes `role="tablist"` with
  `aria-selected` on active tabs.

## Motion and sensory preferences

- Users can toggle **Reduce motion**, **Larger text**, and
  **High contrast** in the settings sheet (`components/shell/SettingsSheet.tsx`).
- Preferences persist via `zustand` local storage so returning users
  keep their settings.
- Animations respect the OS-level `prefers-reduced-motion` setting in
  addition to the in-app toggle.

## Colour and contrast

- The editorial palette uses deep ink and paper neutrals with an
  ember accent, chosen for AA-level contrast in both light and dark
  themes.
- High-contrast mode strengthens borders and key text further.

## Input guardrails

- The assistant `<textarea>` uses `maxLength={280}` and is
  width-bounded so screen magnifier users don't have to scroll.
- The hero prompt input in `components/sections/Entry.tsx` uses the
  same cap.

## Testing

- Data-layer tests verify structural integrity (titles, bodies, and
  required fields) of checklist items, voting-day guidance, and
  glossary entries.
- Accessibility considerations are reviewed on every PR — please
  confirm all interactive elements are keyboard-operable and screen
  reader friendly before merging.

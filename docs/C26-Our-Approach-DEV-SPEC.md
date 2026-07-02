# C26 Aquatics — /our-approach page redesign (Layout "1a", Numbered Principles)

## Goal
Replace the current prose-heavy `/our-approach` page with a scannable, editorial layout. The five-paragraph "Train with purpose" block becomes **four numbered principle cards**; everything else keeps existing components/data. No copy is invented — all text comes from `src/data/approach.ts` and the current page prose (condensed).

Attached `C26-Our-Approach.html` is a pixel reference (standalone, works offline). Build it inside the existing Astro app using existing components + design tokens — do **not** hardcode hex values; use the CSS variables below.

## Stack context (existing)
- Astro. Page file: `src/pages/our-approach.astro`.
- Reusable sections already exist and are kept as-is: `Hero` (variant="page"), `DifferenceMatrix`, `CoreValues`, `CTABand`, `SeamHatch`.
- Data source: `src/data/approach.ts` (mission, vision, motto, coreValues, differenceRows).
- Tokens: `tokens/colors.css`, `typography.css`, `spacing.css`, `effects.css`. Fonts: Barlow / Barlow Condensed / Barlow Semi Condensed (already loaded).

## Section order (top → bottom)
1. **Hero** — `<Hero variant="page" eyebrow="Our Approach" title="Our <span class='hero-accent'>approach</span>" subtitle="Great swimmers are developed through purpose, patience, and consistency — not endless laps and accumulated yardage." />` (unchanged).
2. **The C26 method → four Numbered Principles** — NEW section (see below). Replaces the old `.prose-band` "Train with purpose" wall of text.
3. **Pull-quote band** (navy) — existing `.pullquote`, text: "Train with purpose. Develop for the long term. Peak when it matters most. Love the process." Middle sentence accented teal.
4. **DifferenceMatrix** — existing component, unchanged.
5. **Mission / Vision** — existing `.statements` grid (mission = display type, vision = body). Unchanged.
6. **CoreValues** — existing 8-card grid, unchanged.
7. **Our home** — feature band, image left / copy right (condensed from current "Our home" prose).
8. **Beyond the pool / open water** — feature band, copy left / image right, teal left-rule.
9. **CTABand** — "Ready to join the team?" (unchanged).

> The old standalone "Swimming & mental wellness" prose band and the "motto" band are dropped in 1a to cut length. If you want to keep wellness, add it as a short band before CoreValues — flag it and we'll supply condensed copy.

## NEW component: `NumberedPrinciples`
`src/components/sections/NumberedPrinciples.astro`. Data-driven, 2×2 grid on desktop, single column under ~860px.

Eyebrow: "The C26 method" (`--teal-600`). Heading: "Train with purpose" (`--font-display`, uppercase, `--navy-700`). Intro (max 680px): "Every practice has a purpose. Every set has an objective. Every season has a plan. Our whole philosophy comes down to four commitments we make to every swimmer."

Four items (big condensed number + title + body). Numbers 01/02 use `--teal-400`, 03/04 use `--orange-500`:

- **01 Train with purpose** — "We prioritize quality over quantity — technique, efficiency, and movement patterns. The goal isn't to out-yard everyone else; it's to maximize every yard we swim."
- **02 Develop for the long term** — "Science-backed periodization lets swimmers grow progressively. Rather than chasing early wins at 11, 12, or 13, we build toward full potential at 16–18 and the collegiate level."
- **03 Peak when it matters most** — "We balance training stress, recovery, strength, and mobility so athletes perform at their best when it counts — while reducing the risk of burnout and overuse injury."
- **04 Love the process** — "Success isn't only times on a scoreboard. It's confidence, resilience, discipline, and friendships — healthy young people who love the sport for life."

Suggest storing these four in `src/data/approach.ts` (e.g. `export const principles: {n:string; title:string; body:string}[]`) so copy stays with the rest.

Number: `font-family: var(--font-display); font-weight: var(--fw-black); font-size: 64px; line-height: .8`. Item = flex row, gap ~22px. Title: `--font-display`, 700, uppercase, 24px, `--navy-700`. Body: 15–16px, `line-height:1.6`, `--text-body`.

## Feature bands (Our home / Beyond the pool)
Two-column (image + copy), `align-items:center`, stacks to 1 col under ~860px.
- **Our home** — image LEFT, copy RIGHT, on `--surface-alt`. Eyebrow "Our home". Heading "One facility. Everything your swimmer needs." Two short paras (condensed from current page): the owned C26 Hub pool at AdventHealth SportsPark at Bluhawk + the 10,000-sq-ft performance / recovery facility.
- **Beyond the pool** — copy LEFT, image RIGHT, on `--surface`, with a `4px solid var(--teal-500)` left rule + left padding. Heading "The Midwest's premier open water program", one para on Coach Robbie's open-water record.

Image placeholders in the reference are striped boxes labeled `[ facility photo … ]` — swap for real `<Image>` assets. Radius `--r-lg`, ~300–320px tall.

## Tokens to use (do not hardcode)
- Navy heading `--navy-700` (#183e53); near-black bands `--navy-900`; accents `--orange-500` (#f38f1f) and teal `--teal-400/500/600`.
- Surfaces: `--surface` (#fff), `--surface-alt` (#f6f9fa). Borders `--border`. Body text `--text-body`; muted `--text-muted`.
- Section rhythm: `--section-y` (96px). Container: `--container` (1200px), gutter 24px.
- Actions: squared corners `--r-xs` (2px); content cards `--r-md`/`--r-lg`.
- Difference-matrix C26 cell tint in the reference is #eefbfa (teal-50) — add a `--teal-50` token if not present, or reuse the existing one in `DifferenceMatrix.astro`.

## Responsive
- ≤860px: principles grid, mission/vision grid, and feature bands collapse to 1 column; CTA row stacks.
- ≤560px: CoreValues grid → 1 column (existing behavior).

## Accessibility
- One `<h1>` (hero). Section headings `<h2>`, principle/value/card titles `<h3>`. Keep `aria-labelledby` on sections as the current page does.
- Number glyphs (01–04) are decorative — don't let them be read as content order; put the real label in the `<h3>`.
- Maintain color contrast: body copy on `--surface-alt` and white cards passes AA; orange is used for accents/CTAs only, not body text.

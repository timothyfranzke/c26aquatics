# C26 Aquatics — Brand Intro Animation

**Status:** Validated, ready to implement
**Date:** 2026-06-19
**Scope:** Homepage-only, first-visit-only brand reveal animation

## Goal

On the first visit to the homepage, play a ~2.2s brand intro: the kraken silhouette is hit by spotlights from four angles, the C26 Aquatics wordmark fades in, and the lockup flies up to the header where it settles into the normal site chrome. Repeat visitors and reduced-motion users see the normal page with no overlay.

## Architecture

One new self-contained component:

- `src/components/widgets/BrandIntro.astro` — overlay markup, inline boot script, scoped styles, and the animation orchestrator.
- `src/pages/index.astro` — imports and renders `<BrandIntro />` once, at the top of the page.

No new dependencies. Uses the existing `src/assets/brand/kraken-white.png` and `src/assets/brand/wordmark-navy.png` (same assets that back the OG card).

### FOUC prevention

The overlay's default CSS is `display: none`. A small `is:inline` boot script reads `localStorage` and `prefers-reduced-motion` synchronously, and only when the splash should play does it set `data-c26-intro="show"` on `<html>`. CSS shows the overlay only when that attribute is present. Reduced-motion users, repeat visitors, and JS-disabled users see zero flicker.

## Animation Timeline (~2.2s)

**Phase 1 — Spotlight flashes (0–900ms)**
Kraken sits centered, dimmed to ~30%. Four radial-gradient overlays positioned at the NW/NE/SW/SE corners flash on in sequence (~150ms each, ~50ms gaps). A final brightness pulse on the kraken closes the phase.

**Phase 2 — Splash hold (900–1400ms)**
Spotlights cleared, kraken at full brightness. Wordmark fades in over 300ms, centered over the kraken (same arrangement as the OG card). Brief settle of ~200ms.

**Phase 3 — Fly to header (1400–2200ms)**
JS reads `getBoundingClientRect()` of `.c26-header__kraken` and writes CSS custom properties for the target translate + scale. The lockup container animates from viewport center to the header's top-left slot over 800ms. During the same window: splash wordmark fades to 0, the header's HTML wordmark fades from 0 → 1, and the navy backdrop fades to 0. At 2200ms the overlay is removed from the DOM.

## State

Single localStorage key: `c26:intro-seen` (value `"1"` or absent). The flag is set the moment the animation starts — a visitor who reloads mid-splash does not see it again.

The boot script:

```js
try {
  var seen = localStorage.getItem('c26:intro-seen') === '1';
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!seen && !reduced) {
    document.documentElement.dataset.c26Intro = 'show';
  }
} catch (e) { /* Safari private mode: do not show */ }
```

## Skip Behavior

A click anywhere on the overlay or pressing Esc triggers `dismiss()`:

- Cancel pending phase timers.
- Add `c26-intro--dismissing` class → CSS fades the overlay over 200ms.
- Remove the overlay from the DOM.

The seen flag was already set at start, so no extra bookkeeping.

## Edge Cases

| Case | Behavior |
|---|---|
| JS disabled | Overlay stays `display: none`. Page renders normally. |
| Safari private mode (localStorage throws) | Catch swallows the error; splash does not show. |
| Window resize mid-fly | Stale target position; acceptable, self-corrects on next render. |
| Header element missing at Phase 3 | Skip the fly, fade the overlay. Console warning. |
| Mobile (≤900px) | Header kraken target shrinks to 40px; measurement is dynamic so it works. Lockup uses `min(560px, 70vw)` for kraken size. |
| Image not loaded yet | `loading="eager"; decoding="sync"` on both kraken and wordmark. |

## Verification

Manual only — no automated tests for this visual/UX work.

- `npm run dev` → open `/` in a private window. Watch full sequence. Click and Esc both skip. Reload should not replay. Clearing localStorage should replay.
- DevTools → Rendering → Emulate `prefers-reduced-motion: reduce` → reload `/`. No splash.
- 375px mobile viewport: confirm lockup fits and lands on the smaller header slot.
- `npm run build && npm run preview` → verify production build is clean.

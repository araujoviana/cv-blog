Sourced from Prxypad's **Spamton Deltarune (white) Cursor Set**
(https://www.rw-designer.com/cursor-set/spamton-white, CC BY-NC, noncommercial
use, credit the author). Original files are animated Windows `.ani` cursors;
each was decomposed into its raw frames (native 32x32, no rescaling) and
re-exported as PNG since browsers can't read `.ani` directly. The frame
sequence/timing and per-frame hotspot were read out of each `.ani`'s `anih` /
`rate` / `seq ` chunks and are hardcoded in `src/scripts/cursor-animator.js`
(all frames run at ~167ms, i.e. 6fps, matching the source).

Only 5 of the original 12 cursors (arrow, link-select, text-select,
unavailable, background/busy) are wired up, see `cursor-animator.js` and the
`--cursor-*` custom properties in `src/styles/global.css`. The rest
(move/resize/help) have no matching interaction on this site and weren't
worth the added surface.

| File prefix  | Source `.ani`               | Role                                    |
| ------------ | --------------------------- | --------------------------------------- |
| `default-*`  | `spamton normal select.ani` | default arrow                           |
| `pointer-*`  | `spamton link slect.ani`    | links, buttons, `.cv-tile`              |
| `text-*`     | `spamton text select.ani`   | post body text (`.cv-frame__body`)      |
| `disabled-*` | `spamton unavailable.ani`   | `[disabled]`, `[aria-disabled="true"]`  |
| `busy-*`     | `spamton background.ani`    | page navigation (Astro view transition) |

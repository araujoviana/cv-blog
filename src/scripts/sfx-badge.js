// The virus-alert footer badge plays a one-shot splat sound on click. Plain
// Audio() rather than the ambient track's Web Audio API path (see
// audio-player.js): this is a single short clip fired on a real click, not
// something that needs sample-accurate looping.
//
// The footer isn't transition:persist, so view-transition navigation swaps
// in a brand new button node on every page change. This module script only
// runs once (browsers don't re-execute an already-loaded module), so binding
// the listener just at top level would only ever work on whichever page
// happened to be loaded first. astro:page-load fires after the initial load
// AND after every subsequent swap, so rebinding there keeps it working.
document.addEventListener("astro:page-load", () => {
  const badge = document.getElementById("cv-virus-badge");
  if (badge) {
    badge.addEventListener("click", () => {
      new Audio(badge.dataset.sfx).play().catch(() => {});
    });
  }
});

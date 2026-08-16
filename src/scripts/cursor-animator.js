// Drives the animated Spamton cursor set. CSS `cursor` isn't animatable via
// @keyframes (it only ever holds one static image), so instead this ticks a
// shared 167ms interval (the frame rate baked into the source .ani files,
// see public/cursors/README.md) and rewrites the --cursor-* custom
// properties consumed by src/styles/global.css to point at the next frame.
//
// Per-role frame URLs/hotspots/sequence come from window.__cvCursorFrames,
// set from the `data-cursor-frames` attribute Layout.astro puts on <html>
// (needs base-path-aware URLs from import.meta.env.BASE_URL, which this
// plain script can't compute itself).
const FRAME_MS = 167;
const FALLBACK_KEYWORD = {
  default: "auto",
  pointer: "pointer",
  text: "text",
  disabled: "not-allowed",
  busy: "progress",
};

const raw = document.documentElement.dataset.cursorFrames;
if (raw) {
  const roles = JSON.parse(raw);
  const root = document.documentElement.style;
  const step = {};

  const paint = (role) => {
    const { hotspot, frames, sequence } = roles[role];
    const frameIndex = sequence[step[role]];
    root.setProperty(
      `--cursor-${role}`,
      `${frames[frameIndex]} ${hotspot[0]} ${hotspot[1]}, ${FALLBACK_KEYWORD[role]}`,
    );
    step[role] = (step[role] + 1) % sequence.length;
  };

  for (const role of Object.keys(roles)) {
    step[role] = 0;
    paint(role);
  }

  setInterval(() => {
    for (const role of Object.keys(roles)) paint(role);
  }, FRAME_MS);
}

// Busy cursor during page navigation (Astro's ClientRouter view transitions).
document.addEventListener("astro:before-preparation", () => {
  document.documentElement.classList.add("cv-busy");
});
document.addEventListener("astro:after-swap", () => {
  document.documentElement.classList.remove("cv-busy");
});

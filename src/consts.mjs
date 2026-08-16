// Single source of truth for the GitHub Pages base path, shared between
// astro.config.mjs and src/plugins/rehype-emoji.mjs (the latter runs inside
// the markdown pipeline, outside Vite, so it has no import.meta.env.BASE_URL
// to read, this constant is what it uses instead).
export const SITE_BASE = "/cv-blog/";

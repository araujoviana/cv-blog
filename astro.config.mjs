// @ts-check
import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import { SITE_BASE } from "./src/consts.mjs";
import rehypeEmoji from "./src/plugins/rehype-emoji.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://araujoviana.github.io",
  base: SITE_BASE,
  markdown: {
    processor: unified({ rehypePlugins: [rehypeEmoji] }),
  },
});

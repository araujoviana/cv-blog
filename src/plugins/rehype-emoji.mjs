// Steam-style custom emoji: `:shortcode:` in post markdown becomes an inline
// looping GIF, sized to match the surrounding text (see .cv-emoji in
// global.css). Runs as a rehype plugin (over the HTML/hast tree, post
// remark-rehype) rather than a remark plugin (over mdast) because splitting
// a text node into text+<img>+text siblings is a hast-native shape; doing
// the same in mdast would mean emitting raw HTML and re-parsing it.
//
// The shortcode -> filename registry lives in src/data/emoji.json. Add a
// GIF to public/emoji/ and a line there, no code changes needed.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { SITE_BASE } from "../consts.mjs";

const emojiPath = fileURLToPath(new URL("../data/emoji.json", import.meta.url));
const emojiMap = JSON.parse(readFileSync(emojiPath, "utf-8"));

const SHORTCODE_RE = /:([a-zA-Z0-9_+-]+):/g;
// Shortcodes only make sense as prose, not inside code samples.
const SKIP_TAGS = new Set(["code", "pre"]);

function emojiNode(file, label) {
  return {
    type: "element",
    tagName: "img",
    properties: {
      src: `${SITE_BASE}emoji/${file}`,
      alt: label,
      title: label,
      className: ["cv-emoji"],
      loading: "lazy",
    },
    children: [],
  };
}

function splitText(value) {
  SHORTCODE_RE.lastIndex = 0;
  const parts = [];
  let cursor = 0;
  let match;
  let matchedAny = false;

  while ((match = SHORTCODE_RE.exec(value))) {
    const [full, name] = match;
    const file = emojiMap[name];
    if (!file) continue;

    matchedAny = true;
    if (match.index > cursor) {
      parts.push({ type: "text", value: value.slice(cursor, match.index) });
    }
    parts.push(emojiNode(file, full));
    cursor = match.index + full.length;
  }

  if (!matchedAny) return null;
  if (cursor < value.length)
    parts.push({ type: "text", value: value.slice(cursor) });
  return parts;
}

function walk(node) {
  if (!node.children || (node.tagName && SKIP_TAGS.has(node.tagName))) return;

  const next = [];
  for (const child of node.children) {
    if (child.type === "text") {
      const split = splitText(child.value);
      next.push(...(split ?? [child]));
    } else {
      walk(child);
      next.push(child);
    }
  }
  node.children = next;
}

export default function rehypeEmoji() {
  return (tree) => walk(tree);
}

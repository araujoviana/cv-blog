import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { beforeAll, describe, expect, it } from "vitest";

// Real integration test: actually run `astro build` and inspect the output.
// This is the class of test that would have caught the BASE_URL-without-
// trailing-slash bug that once broke every internal link on GitHub Pages.

const root = fileURLToPath(new URL("..", import.meta.url));
const distDir = path.join(root, "dist");
const postsDir = path.join(root, "src/content/posts");

const postSlugs = readdirSync(postsDir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.replace(/\.md$/, ""));

beforeAll(() => {
  // Vitest/Vite set process.env.BASE_URL = "/" for its own module runtime,
  // which execSync would otherwise pass down to the child `astro build` and
  // have it silently override astro.config.mjs's `base`. Strip it so the
  // build reflects the real configured base path.
  const env = { ...process.env };
  delete env.BASE_URL;
  execSync("bun run build", { cwd: root, stdio: "pipe", env });
}, 30_000);

describe("astro build output", () => {
  it("produces dist/index.html", () => {
    expect(existsSync(path.join(distDir, "index.html"))).toBe(true);
  });

  it("produces a page for every post", () => {
    for (const slug of postSlugs) {
      expect(existsSync(path.join(distDir, "posts", slug, "index.html"))).toBe(
        true,
      );
    }
  });

  it("prefixes internal links with the /cv-blog/ GitHub Pages base path", () => {
    const html = readFileSync(path.join(distDir, "index.html"), "utf-8");

    for (const slug of postSlugs) {
      expect(html).toContain(`href="/cv-blog/posts/${slug}/"`);
    }

    // Regression guard: a bare `base: "/cv-blog"` (no trailing slash) used to
    // silently produce unprefixed hrefs like "posts/x" instead of
    // "/cv-blog/posts/x/".
    expect(html).not.toContain('href="posts/');
    expect(html).not.toContain('href="/posts/');
  });
});

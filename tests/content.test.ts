import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as yaml from "js-yaml";
import { describe, expect, it } from "vitest";
import { z } from "zod";

const root = fileURLToPath(new URL("..", import.meta.url));
const postsDir = path.join(root, "src/content/posts");

// Mirrors the schema in src/content.config.ts. Kept in sync by hand, that
// file imports from "astro:content", a virtual module that only resolves
// inside Astro's own runtime, not under plain Vitest/Node.
const postSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  order: z.number().int().positive(),
  tags: z.array(z.string()).default([]),
  summary: z.string().optional(),
});

function readFrontmatter(file: string): unknown {
  const raw = readFileSync(path.join(postsDir, file), "utf-8");
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) throw new Error(`${file}: missing frontmatter block`);
  return yaml.load(match[1]);
}

const files = readdirSync(postsDir).filter((f) => f.endsWith(".md"));

describe("post frontmatter", () => {
  it("finds at least one post", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)("%s matches the content collection schema", (file) => {
    const result = postSchema.safeParse(readFrontmatter(file));
    expect(
      result.success,
      result.success ? "" : JSON.stringify(result.error?.issues, null, 2),
    ).toBe(true);
  });

  it("has a unique `order` per post", () => {
    const orders = files.map(
      (file) => (readFrontmatter(file) as { order: number }).order,
    );
    expect(new Set(orders).size).toBe(orders.length);
  });
});

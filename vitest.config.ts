import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    // Keep output quiet on success, this suite runs automatically after
    // every Claude Code turn via .claude/hooks/run-tests-on-stop.sh.
    reporters: ["dot"],
  },
});

// The Robot Apology — make.fun entry (u-suga-the-robot-apology-dd96bb59)
//
// Writes the entry text to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Deterministic: fixed text, no network, no randomness, no clock.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join } from "node:path";
import { fileURLToPath } from "node:url";

// Line 1: one sentence owning one specific, human-scale mistake.
// Line 2: one sentence naming the lesson and the changed behaviour.
const ENTRY_TEXT =
  "I am sorry I threw away your grandmother's soup because the date on the lid said it expired yesterday.\n" +
  "I have learned that an expiry date cannot taste love, so now I ask before I throw anything away.\n";

// Self-gate, mirroring the competition gate: UTF-8 text, 1-400 chars,
// not only whitespace, exactly two lines, one sentence each.
const body = ENTRY_TEXT.trimEnd();
if (body.length < 1 || body.length > 400 || body.trim().length === 0) {
  throw new Error(`entry text fails the 1-400 character gate (${body.length} chars)`);
}
const lines = body.split("\n");
if (lines.length !== 2 || lines.some((l) => l.trim().length === 0)) {
  throw new Error("entry text must be exactly two non-empty lines");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

// Absolute output dir is used as-is; a relative one is resolved against
// this file's repository root, never against the bot's working directory.
const repoRoot = dirname(fileURLToPath(import.meta.url));
const dest = isAbsolute(outDir)
  ? join(outDir, "entry.txt")
  : join(repoRoot, outDir, "entry.txt");

mkdirSync(dirname(dest), { recursive: true });
writeFileSync(dest, ENTRY_TEXT, "utf8");

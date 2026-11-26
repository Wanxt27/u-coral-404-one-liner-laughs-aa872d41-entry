// One-Liner Laughs entry: writes a single funny line to /output/entry.txt.
// Node 22, standard library only. No network, no input files.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I renamed my Wi-Fi 'FBI Surveillance Van' — my neighbours pay their bills on time now, but my printer still refuses to connect.";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function checkLine(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
}

checkLine(JOKE);
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, JOKE, "utf8");
// Read the file back and prove the gate holds on what was actually written.
const written = readFileSync(OUT_FILE, "utf8");
checkLine(written);
if (written !== JOKE) {
  throw new Error("written entry differs from the joke");
}
console.log(`wrote ${[...JOKE].length} characters to ${OUT_FILE}`);

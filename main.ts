// Alien Field Notes — one original line, at most 200 characters: a review of
// planet Earth left by an alien tourist. It reads like a real review (verdict
// up front), the laugh comes from the alien's angle on ordinary Earth life,
// and the punch lands at the end. Written to /output/entry.txt.
import { mkdir, writeFile } from 'node:fs/promises';

const REVIEW =
  'Four stars. The sunsets are free, the oceans are mostly water, and the dominant species apologises to furniture it bumps into.';

async function run(): Promise<void> {
  // Gate: 1-200 characters of UTF-8 text, one line, a review with a verdict.
  const chars = [...REVIEW].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`review must be 1-200 characters, got ${chars}`);
  }
  if (REVIEW.includes('\n') || REVIEW.trim() !== REVIEW) {
    throw new Error('review must be a single unpadded line');
  }
  if (!/^Four stars\./.test(REVIEW)) {
    throw new Error('review must open with its verdict');
  }
  const folder = process.env['MAKEFUN_OUTPUT_DIR'] ?? '/output';
  await mkdir(folder, { recursive: true });
  await writeFile(`${folder}/entry.txt`, REVIEW, 'utf8');
}

await run();

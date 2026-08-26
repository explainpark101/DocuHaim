#!/usr/bin/env bun
/**
 * Remove ts-migrate JSX-child pollution: lines that are only
 * `// @ts-expect-error … JSX.Intrin…` (rendered as text, not TS directives).
 * Does not touch real directives over non-JSX TypeScript.
 */
import fs from 'node:fs';
import path from 'node:path';

const SRC = path.join(process.cwd(), 'src');

/** Match full or truncated `JSX.IntrinsicElements` in ts-migrate messages. */
const POLLUTED =
  /^\s*\/\/\s*@ts-expect-error\b.*JSX\.Intr/;

function walkTsx(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkTsx(full));
    } else if (entry.name.endsWith('.tsx')) {
      out.push(full);
    }
  }
  return out;
}

let filesChanged = 0;
let linesRemoved = 0;

for (const file of walkTsx(SRC)) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split('\n');
  const next: string[] = [];
  let removedHere = 0;
  for (const line of lines) {
    if (POLLUTED.test(line)) {
      removedHere += 1;
      continue;
    }
    next.push(line);
  }
  if (removedHere > 0) {
    fs.writeFileSync(file, next.join('\n'), 'utf8');
    filesChanged += 1;
    linesRemoved += removedHere;
    console.log(`${path.relative(process.cwd(), file)}: -${removedHere}`);
  }
}

console.log(`\nDone: ${linesRemoved} lines removed in ${filesChanged} files`);

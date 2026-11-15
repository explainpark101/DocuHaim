/**
 * Regenerates src/utils/emojiShortcodeData.ts from @tiptap/extension-emoji.
 * Run: bun scripts/generate-emoji-shortcode-data.ts
 */

import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gitHubEmojis } from '@tiptap/extension-emoji';

const glyph: Record<string, string> = {};
const name: Record<string, string> = {};

for (const item of gitHubEmojis) {
  const g = item.emoji;
  const n = item.name;
  if (!g || !n) continue;
  glyph[n] = g;
  name[n] = n;
  for (const sc of item.shortcodes ?? []) {
    glyph[sc] = g;
    name[sc] = n;
  }
}

const header = `/**
 * Compact GitHub emoji shortcode maps (no TipTap runtime).
 * Generated from @tiptap/extension-emoji gitHubEmojis — do not edit by hand.
 * Regenerate: bun scripts/generate-emoji-shortcode-data.ts
 */

`;

const body =
  header +
  `export const EMOJI_SHORTCODE_TO_GLYPH: Readonly<Record<string, string>> = ${JSON.stringify(glyph)};\n\n` +
  `export const EMOJI_SHORTCODE_TO_NAME: Readonly<Record<string, string>> = ${JSON.stringify(name)};\n`;

const out = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  'src',
  'utils',
  'emojiShortcodeData.ts',
);
writeFileSync(out, body, 'utf8');
console.log(`Wrote ${out} (${Object.keys(glyph).length} keys, ${body.length} bytes)`);

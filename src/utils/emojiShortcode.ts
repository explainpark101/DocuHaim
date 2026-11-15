/**
 * GitHub-style emoji shortcodes (`:cross_mark:` → ❌).
 * Shared by Haim TipTap markdown parse and markdown-it preview.
 * Uses a local compact map so markdown-it / mdEditorConfig do not pull TipTap.
 */

import {
  EMOJI_SHORTCODE_TO_GLYPH,
  EMOJI_SHORTCODE_TO_NAME,
} from '@/utils/emojiShortcodeData';

/** Shortcode body: letters, digits, underscore, plus, hyphen (TipTap inputRegex). */
export const EMOJI_SHORTCODE_BODY_RE = /[a-zA-Z0-9_+-]+/;

/** Full `:name:` match (global). */
export const EMOJI_SHORTCODE_GLOBAL_RE = /:([a-zA-Z0-9_+-]+):/g;

/** Resolve shortcode or canonical name → native emoji glyph, or null if unknown. */
export function resolveEmojiShortcodeGlyph(
  name: string | null | undefined,
): string | null {
  const key = String(name ?? '').trim();
  if (!key) return null;
  const glyph = EMOJI_SHORTCODE_TO_GLYPH[key];
  return glyph ? String(glyph) : null;
}

/** Resolve to TipTap emoji node `name` attr (canonical), or null. */
export function resolveEmojiShortcodeName(
  name: string | null | undefined,
): string | null {
  const key = String(name ?? '').trim();
  if (!key) return null;
  const canonical = EMOJI_SHORTCODE_TO_NAME[key];
  return canonical ? String(canonical) : null;
}

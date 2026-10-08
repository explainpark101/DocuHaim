/**
 * GitHub-style emoji shortcodes (`:cross_mark:` → ❌).
 * Shared by Haim TipTap markdown parse and markdown-it preview.
 */

import { gitHubEmojis, shortcodeToEmoji } from '@tiptap/extension-emoji';

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
  const item = shortcodeToEmoji(key, gitHubEmojis);
  const glyph = item?.emoji;
  return glyph ? String(glyph) : null;
}

/** Resolve to TipTap emoji node `name` attr (canonical), or null. */
export function resolveEmojiShortcodeName(
  name: string | null | undefined,
): string | null {
  const key = String(name ?? '').trim();
  if (!key) return null;
  const item = shortcodeToEmoji(key, gitHubEmojis);
  return item?.name ? String(item.name) : null;
}

export { gitHubEmojis, shortcodeToEmoji };

/**
 * markdown-it: replace known `:shortcode:` in text tokens with native emoji.
 * Code spans / fences are already separate tokens — left untouched.
 */

import type { MarkdownIt as MarkdownItInstance, Token } from 'markdown-it';
import {
  EMOJI_SHORTCODE_GLOBAL_RE,
  resolveEmojiShortcodeGlyph,
} from '@/utils/emojiShortcode';

type TokenCtor = new (type: string, tag: string, nesting: number) => Token;

function splitTextToken(token: Token, TokenCtor: TokenCtor): Token[] {
  const text = String(token.content ?? '');
  EMOJI_SHORTCODE_GLOBAL_RE.lastIndex = 0;
  if (!EMOJI_SHORTCODE_GLOBAL_RE.test(text)) return [token];

  const out: Token[] = [];
  let last = 0;
  EMOJI_SHORTCODE_GLOBAL_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = EMOJI_SHORTCODE_GLOBAL_RE.exec(text)) !== null) {
    const full = match[0];
    const name = match[1] ?? '';
    const glyph = resolveEmojiShortcodeGlyph(name);
    const start = match.index;

    if (!glyph) continue;

    if (start > last) {
      const before = new TokenCtor('text', '', 0);
      before.content = text.slice(last, start);
      out.push(before);
    }
    const emojiTok = new TokenCtor('text', '', 0);
    emojiTok.content = glyph;
    out.push(emojiTok);
    last = start + full.length;
  }

  if (out.length === 0) return [token];

  if (last < text.length) {
    const after = new TokenCtor('text', '', 0);
    after.content = text.slice(last);
    out.push(after);
  }
  return out;
}

export function emojiShortcodeMarkdownItPlugin(md: MarkdownItInstance): void {
  md.core.ruler.after('inline', 'emoji_shortcode', (state) => {
    const TokenCtor = state.Token as TokenCtor;
    for (const block of state.tokens) {
      if (block.type !== 'inline' || !block.children?.length) continue;
      const next: Token[] = [];
      for (const child of block.children) {
        if (child.type !== 'text' || !child.content.includes(':')) {
          next.push(child);
          continue;
        }
        next.push(...splitTextToken(child, TokenCtor));
      }
      block.children = next;
    }
  });
}

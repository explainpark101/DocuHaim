/**
 * TipTap Emoji + Markdown load/serialize for `:shortcode:` (GitHub set).
 * Stock @tiptap/extension-emoji has renderMarkdown + input/paste rules but no
 * markdownTokenizer — vault shortcodes stayed as plain text on open.
 */

import { Emoji, gitHubEmojis } from '@tiptap/extension-emoji';
import { resolveEmojiShortcodeName } from '@/utils/emojiShortcode';

const SHORTCODE_AT_START_RE = /^:([a-zA-Z0-9_+-]+):/;

export const HaimEmoji = Emoji.extend({
  markdownTokenizer: {
    name: 'emoji',
    level: 'inline' as const,
    start: (src: string) => src.indexOf(':'),
    tokenize: (src: string) => {
      const match = SHORTCODE_AT_START_RE.exec(src);
      if (!match) return undefined;
      const shortcode = match[1] ?? '';
      const canonical = resolveEmojiShortcodeName(shortcode);
      if (!canonical) return undefined;
      return {
        type: 'emoji',
        raw: match[0],
        emojiName: canonical,
      };
    },
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseMarkdown: (token: any, helpers: any) => {
    const name = resolveEmojiShortcodeName(token?.emojiName || token?.name);
    if (!name) {
      const raw = String(token?.raw || '');
      return raw ? helpers.createTextNode(raw) : null;
    }
    return helpers.createNode('emoji', { name });
  },

  // Keep parent renderMarkdown → `:${name}:`
}).configure({
  emojis: gitHubEmojis,
  enableEmoticons: true,
});

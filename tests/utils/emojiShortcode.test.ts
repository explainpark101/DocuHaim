import { describe, expect, it } from 'vitest';
import {
  resolveEmojiShortcodeGlyph,
  resolveEmojiShortcodeName,
} from '@/utils/emojiShortcode';
import {
  applyAppMarkdownItBaseOptions,
  applyAppMarkdownItPlugins,
} from '@/utils/appMarkdownItPlugins';

describe('emojiShortcode', () => {
  it('resolves cross_mark to ❌', () => {
    expect(resolveEmojiShortcodeGlyph('cross_mark')).toBe('❌');
    expect(resolveEmojiShortcodeName('cross_mark')).toBe('x');
  });

  it('resolves alias x and white_check_mark', () => {
    expect(resolveEmojiShortcodeGlyph('x')).toBe('❌');
    expect(resolveEmojiShortcodeGlyph('white_check_mark')).toBe('✅');
  });

  it('returns null for unknown names', () => {
    expect(resolveEmojiShortcodeGlyph('not_a_real_emoji_zz')).toBeNull();
    expect(resolveEmojiShortcodeName('not_a_real_emoji_zz')).toBeNull();
  });
});

describe('emojiShortcodeMarkdownItPlugin', () => {
  async function render(mdSrc: string): Promise<string> {
    const MarkdownIt = (await import('markdown-it')).default;
    const md = new MarkdownIt();
    applyAppMarkdownItBaseOptions(md);
    // Includes emoji_shortcode via APP_MARKDOWN_IT_PLUGIN_DEFS
    applyAppMarkdownItPlugins(md);
    return md.render(mdSrc);
  }

  it('replaces known shortcodes in prose', async () => {
    const html = await render('Done :cross_mark: ok');
    expect(html).toContain('❌');
    expect(html).not.toContain(':cross_mark:');
  });

  it('leaves shortcodes inside inline code', async () => {
    const html = await render('Use `:cross_mark:` literal');
    expect(html).toContain(':cross_mark:');
    // code content should not be replaced with the glyph alone as prose
    expect(html).toMatch(/<code[^>]*>:cross_mark:<\/code>/);
  });

  it('leaves unknown shortcodes literal', async () => {
    const html = await render('Hi :not_a_real_emoji_zz:');
    expect(html).toContain(':not_a_real_emoji_zz:');
  });
});

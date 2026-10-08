import { describe, expect, it } from 'vitest';

describe('HaimEmoji markdown', () => {
  async function setup(markdown: string) {
    const { Editor } = await import('@tiptap/core');
    const StarterKit = (await import('@tiptap/starter-kit')).default;
    const { HaimMarkdown } = await import(
      '@/components/haimEditor/extensions/HaimMarkdown'
    );
    const { HaimEmoji } = await import(
      '@/components/haimEditor/extensions/HaimEmoji'
    );

    const editor = new Editor({
      extensions: [StarterKit, HaimMarkdown, HaimEmoji],
      content: markdown,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      contentType: 'markdown' as any,
    });
    return editor;
  }

  it('parses :cross_mark: into an emoji node', async () => {
    const editor = await setup('Done :cross_mark: here');
    try {
      let found = false;
      editor.state.doc.descendants((node) => {
        if (node.type.name === 'emoji' && node.attrs.name === 'x') {
          found = true;
        }
      });
      expect(found).toBe(true);
      const md = editor.getMarkdown();
      expect(md).toMatch(/:(x|cross_mark):/);
    } finally {
      editor.destroy();
    }
  });

  it('does not parse unknown shortcodes as emoji nodes', async () => {
    const editor = await setup('Hi :not_a_real_emoji_zz:');
    try {
      let found = false;
      editor.state.doc.descendants((node) => {
        if (node.type.name === 'emoji') found = true;
      });
      expect(found).toBe(false);
      expect(editor.getText()).toContain(':not_a_real_emoji_zz:');
    } finally {
      editor.destroy();
    }
  });
});

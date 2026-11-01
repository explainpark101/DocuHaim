import { describe, expect, it } from 'vitest';
import type { Editor } from '@tiptap/core';

async function openEditor(markdown: string): Promise<Editor> {
  const { Editor } = await import('@tiptap/core');
  const StarterKit = (await import('@tiptap/starter-kit')).default;
  const { Markdown } = await import('@tiptap/markdown');
  const { HaimInlineCode } = await import(
    '@/components/haimEditor/extensions/HaimInlineCode'
  );
  return new Editor({
    extensions: [
      StarterKit.configure({ code: false }),
      HaimInlineCode,
      Markdown,
    ],
    content: markdown,
    contentType: 'markdown',
  });
}

function textMarks(editor: Editor): { text: string; marks: string[] }[] {
  const found: { text: string; marks: string[] }[] = [];
  editor.state.doc.descendants((node) => {
    if (!node.isText) return;
    found.push({
      text: node.text ?? '',
      marks: node.marks.map((mark) => mark.type.name),
    });
  });
  return found;
}

describe('inline code inside bold', () => {
  it('keeps the bold mark on **`code`**', async () => {
    const editor = await openEditor('**`code`**');
    try {
      const [node] = textMarks(editor);
      expect(node?.text).toBe('code');
      expect(node?.marks).toEqual(expect.arrayContaining(['bold', 'code']));
      const again = await openEditor(editor.getMarkdown());
      try {
        const [round] = textMarks(again);
        expect(round?.text).toBe('code');
        expect(round?.marks).toEqual(expect.arrayContaining(['bold', 'code']));
      } finally {
        again.destroy();
      }
    } finally {
      editor.destroy();
    }
  });

  it('does not treat asterisks inside a code span as bold', async () => {
    const editor = await openEditor('`**no**`');
    try {
      const [node] = textMarks(editor);
      expect(node?.text).toBe('**no**');
      expect(node?.marks).toEqual(['code']);
    } finally {
      editor.destroy();
    }
  });

  it('does not keep a link mark on a URL inside inline code', async () => {
    const { Editor } = await import('@tiptap/core');
    const StarterKit = (await import('@tiptap/starter-kit')).default;
    const Link = (await import('@tiptap/extension-link')).default;
    const { Markdown } = await import('@tiptap/markdown');
    const { HaimInlineCode } = await import(
      '@/components/haimEditor/extensions/HaimInlineCode'
    );
    const editor = new Editor({
      extensions: [
        StarterKit.configure({ code: false }),
        HaimInlineCode,
        Link.configure({ openOnClick: false, autolink: false }),
        Markdown,
      ],
      content: 'https://example.com/in-code',
      contentType: 'markdown',
    });
    try {
      editor.commands.selectAll();
      editor.commands.setLink({ href: 'https://example.com/in-code' });
      expect(
        textMarks(editor).some((n) => n.marks.includes('link')),
      ).toBe(true);
      editor.commands.setCode();
      const marks = textMarks(editor);
      expect(marks.some((n) => n.marks.includes('code'))).toBe(true);
      expect(marks.some((n) => n.marks.includes('link'))).toBe(false);
    } finally {
      editor.destroy();
    }
  });

  it('loads a URL in backticks as code only (no link mark)', async () => {
    const { Editor } = await import('@tiptap/core');
    const StarterKit = (await import('@tiptap/starter-kit')).default;
    const { HaimLink } = await import(
      '@/components/haimEditor/extensions/HaimLink'
    );
    const { Markdown } = await import('@tiptap/markdown');
    const { HaimInlineCode } = await import(
      '@/components/haimEditor/extensions/HaimInlineCode'
    );
    const editor = new Editor({
      extensions: [
        StarterKit.configure({ code: false }),
        HaimInlineCode,
        HaimLink,
        Markdown,
      ],
      content: '`https://example.com/coded`',
      contentType: 'markdown',
    });
    try {
      const marks = textMarks(editor);
      expect(marks.some((n) => n.text.includes('https://example.com/coded'))).toBe(
        true,
      );
      expect(marks.some((n) => n.marks.includes('code'))).toBe(true);
      expect(marks.some((n) => n.marks.includes('link'))).toBe(false);
    } finally {
      editor.destroy();
    }
  });
});

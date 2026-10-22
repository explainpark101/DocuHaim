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
});

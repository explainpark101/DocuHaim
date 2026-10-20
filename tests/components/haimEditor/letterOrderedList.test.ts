import type { Editor } from '@tiptap/core';
import { describe, expect, it } from 'vitest';

async function openEditor(markdown: string) {
  const { Editor } = await import('@tiptap/core');
  const { createHaimExtensions } = await import(
    '@/components/haimEditor/createHaimExtensions'
  );
  return new Editor({
    extensions: createHaimExtensions({ placeholder: '', profile: 'note' }),
    content: markdown,
    contentType: 'markdown',
  });
}

function countNodes(editor: Editor, name: string): number {
  let count = 0;
  editor.state.doc.descendants((node) => {
    if (node.type.name === name) count += 1;
  });
  return count;
}

describe('haim ordered list letter markers', () => {
  it('keeps a single letter and a dot as plain text', async () => {
    const editor = await openEditor('a. hello\n');
    try {
      expect(countNodes(editor, 'orderedList')).toBe(0);
      expect(editor.state.doc.textContent).toContain('a. hello');
    } finally {
      editor.destroy();
    }
  });

  it('keeps uppercase and roman markers as plain text', async () => {
    const editor = await openEditor('A. Title\n\ni. roman\n\niv. four\n');
    try {
      expect(countNodes(editor, 'orderedList')).toBe(0);
      expect(editor.state.doc.textContent).toContain('A. Title');
      expect(editor.state.doc.textContent).toContain('i. roman');
      expect(editor.state.doc.textContent).toContain('iv. four');
    } finally {
      editor.destroy();
    }
  });

  it('still parses numeric ordered lists', async () => {
    const editor = await openEditor('1. one\n2. two\n');
    try {
      expect(countNodes(editor, 'orderedList')).toBe(1);
      expect(countNodes(editor, 'listItem')).toBe(2);
    } finally {
      editor.destroy();
    }
  });

  it('does not fold a letter marker into a numeric list', async () => {
    const editor = await openEditor('1. one\na. two\n');
    try {
      expect(countNodes(editor, 'orderedList')).toBe(1);
      expect(countNodes(editor, 'listItem')).toBe(1);
      expect(editor.state.doc.textContent).toContain('a. two');
    } finally {
      editor.destroy();
    }
  });
});

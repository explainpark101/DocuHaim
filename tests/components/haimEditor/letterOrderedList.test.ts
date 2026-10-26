import { Editor } from '@tiptap/core';
import { describe, expect, it } from 'vitest';
import { createHaimExtensions } from '@/components/haimEditor/createHaimExtensions';

function openEditor(markdown: string) {
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
  it('keeps a single letter and a dot as plain text', () => {
    const editor = openEditor('a. hello\n');
    try {
      expect(countNodes(editor, 'orderedList')).toBe(0);
      expect(editor.state.doc.textContent).toContain('a. hello');
    } finally {
      editor.destroy();
    }
  });

  it('keeps uppercase and roman markers as plain text', () => {
    const editor = openEditor('A. Title\n\ni. roman\n\niv. four\n');
    try {
      expect(countNodes(editor, 'orderedList')).toBe(0);
      expect(editor.state.doc.textContent).toContain('A. Title');
      expect(editor.state.doc.textContent).toContain('i. roman');
      expect(editor.state.doc.textContent).toContain('iv. four');
    } finally {
      editor.destroy();
    }
  });

  it('still parses numeric ordered lists', () => {
    const editor = openEditor('1. one\n2. two\n');
    try {
      expect(countNodes(editor, 'orderedList')).toBe(1);
      expect(countNodes(editor, 'listItem')).toBe(2);
    } finally {
      editor.destroy();
    }
  });

  it('does not fold a letter marker into a numeric list', () => {
    const editor = openEditor('1. one\na. two\n');
    try {
      expect(countNodes(editor, 'orderedList')).toBe(1);
      expect(countNodes(editor, 'listItem')).toBe(1);
      expect(editor.state.doc.textContent).toContain('a. two');
    } finally {
      editor.destroy();
    }
  });
});

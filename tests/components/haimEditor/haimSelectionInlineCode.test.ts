import { describe, expect, it } from 'vitest';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { TextSelection } from '@tiptap/pm/state';
import {
  HaimSelectionInlineCode,
  tryHandleSelectionInlineCodeKey,
} from '@/components/haimEditor/extensions/HaimSelectionInlineCode';

function makeEditor(text: string) {
  return new Editor({
    extensions: [StarterKit, HaimSelectionInlineCode],
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: text ? [{ type: 'text', text }] : [],
        },
      ],
    },
  });
}

function selectAll(editor: Editor) {
  const from = 1;
  const to = editor.state.doc.content.size - 1;
  const { tr } = editor.state;
  tr.setSelection(TextSelection.create(tr.doc, from, to));
  editor.view.dispatch(tr);
}

function backtickKey() {
  return {
    key: '`',
    code: 'Backquote',
    ctrlKey: false,
    metaKey: false,
    altKey: false,
    shiftKey: false,
    isComposing: false,
    defaultPrevented: false,
  };
}

describe('HaimSelectionInlineCode', () => {
  it('toggles code mark when backtick is pressed on a selection', () => {
    const editor = makeEditor('hello');
    try {
      selectAll(editor);
      const handled = tryHandleSelectionInlineCodeKey(
        editor.view,
        backtickKey(),
        () => editor.commands.toggleCode(),
      );
      expect(handled).toBe(true);
      expect(editor.isActive('code')).toBe(true);
      expect(editor.getText()).toBe('hello');
    } finally {
      editor.destroy();
    }
  });

  it('toggles code off on a second backtick with selection', () => {
    const editor = makeEditor('hello');
    try {
      selectAll(editor);
      editor.commands.toggleCode();
      expect(editor.isActive('code')).toBe(true);
      selectAll(editor);
      const handled = tryHandleSelectionInlineCodeKey(
        editor.view,
        backtickKey(),
        () => editor.commands.toggleCode(),
      );
      expect(handled).toBe(true);
      expect(editor.isActive('code')).toBe(false);
    } finally {
      editor.destroy();
    }
  });

  it('does not handle empty selection', () => {
    const editor = makeEditor('hello');
    try {
      const handled = tryHandleSelectionInlineCodeKey(
        editor.view,
        backtickKey(),
        () => editor.commands.toggleCode(),
      );
      expect(handled).toBe(false);
      expect(editor.isActive('code')).toBe(false);
    } finally {
      editor.destroy();
    }
  });

  it('does not handle selection inside a code block', () => {
    const editor = new Editor({
      extensions: [StarterKit, HaimSelectionInlineCode],
      content: {
        type: 'doc',
        content: [
          {
            type: 'codeBlock',
            content: [{ type: 'text', text: 'const x = 1' }],
          },
        ],
      },
    });
    try {
      const { tr } = editor.state;
      tr.setSelection(TextSelection.create(tr.doc, 1, 6));
      editor.view.dispatch(tr);
      const handled = tryHandleSelectionInlineCodeKey(
        editor.view,
        backtickKey(),
        () => editor.commands.toggleCode(),
      );
      expect(handled).toBe(false);
    } finally {
      editor.destroy();
    }
  });
});

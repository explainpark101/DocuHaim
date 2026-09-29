import { describe, expect, it } from 'vitest';
import type { EditorView } from '@codemirror/view';
import {
  insertLineAboveInEditorView,
  isInsertLineAboveKeyEvent,
} from '@/utils/cmInsertLineAbove';

function createMockView(docText: string, head: number) {
  let text = docText;
  let caret = head;
  const view = {
    get state() {
      const lineAt = (pos: number) => {
        const lines = text.split('\n');
        let from = 0;
        for (let i = 0; i < lines.length; i += 1) {
          const lineText = lines[i] ?? '';
          const to = from + lineText.length;
          const isLast = i === lines.length - 1;
          if (pos < to || (pos === to && !isLast) || isLast) {
            return { from, to, text: lineText, number: i + 1 };
          }
          from = to + 1;
        }
        return { from: 0, to: text.length, text, number: 1 };
      };
      return {
        doc: {
          toString: () => text,
          lineAt,
        },
        selection: { main: { head: caret } },
      };
    },
    dispatch(spec: {
      changes?: { from: number; to: number; insert: string };
      selection?: { anchor: number };
      scrollIntoView?: boolean;
    }) {
      if (spec.changes) {
        const { from, to, insert } = spec.changes;
        text = `${text.slice(0, from)}${insert}${text.slice(to)}`;
      }
      if (typeof spec.selection?.anchor === 'number') {
        caret = spec.selection.anchor;
      }
    },
  };
  return {
    view: view as unknown as EditorView,
    getText: () => text,
    getHead: () => caret,
  };
}

describe('isInsertLineAboveKeyEvent', () => {
  it('matches Ctrl/Cmd+Shift+Enter', () => {
    expect(
      isInsertLineAboveKeyEvent({
        key: 'Enter',
        code: 'Enter',
        ctrlKey: true,
        metaKey: false,
        shiftKey: true,
        altKey: false,
      }),
    ).toBe(true);
    expect(
      isInsertLineAboveKeyEvent({
        key: 'Enter',
        code: 'Enter',
        ctrlKey: false,
        metaKey: true,
        shiftKey: true,
        altKey: false,
      }),
    ).toBe(true);
  });

  it('matches via code when key is empty', () => {
    expect(
      isInsertLineAboveKeyEvent({
        key: '',
        code: 'NumpadEnter',
        ctrlKey: true,
        metaKey: false,
        shiftKey: true,
        altKey: false,
      }),
    ).toBe(true);
  });

  it('rejects Enter without Mod+Shift', () => {
    expect(
      isInsertLineAboveKeyEvent({
        key: 'Enter',
        code: 'Enter',
        ctrlKey: true,
        metaKey: false,
        shiftKey: false,
        altKey: false,
      }),
    ).toBe(false);
    expect(
      isInsertLineAboveKeyEvent({
        key: 'Enter',
        code: 'Enter',
        ctrlKey: false,
        metaKey: false,
        shiftKey: true,
        altKey: false,
      }),
    ).toBe(false);
  });
});

describe('insertLineAboveInEditorView', () => {
  it('inserts a blank line above the caret and moves the cursor there', () => {
    const { view, getText, getHead } = createMockView('hello\nworld', 8);
    expect(insertLineAboveInEditorView(view)).toBe(true);
    expect(getText()).toBe('hello\n\nworld');
    expect(getHead()).toBe(6);
  });

  it('works on the first line', () => {
    const { view, getText, getHead } = createMockView('hello', 2);
    expect(insertLineAboveInEditorView(view)).toBe(true);
    expect(getText()).toBe('\nhello');
    expect(getHead()).toBe(0);
  });
});

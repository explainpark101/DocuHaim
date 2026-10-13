import { describe, expect, it, vi } from 'vitest';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import {
  applyHaimLlmAssistResult,
  cmFocusMemory,
  readHaimLlmAssistSelection,
  tipTapFocusMemory,
} from '@/utils/haimLlmAssistSelection';
import { selectHaimTextblockOrAll } from '@/components/haimEditor/extensions/HaimNodeRange';
import type { EditorView as CmEditorView } from '@codemirror/view';

function tipTapDoc(paragraphs: string[]) {
  return new Editor({
    extensions: [StarterKit],
    content: {
      type: 'doc',
      content: paragraphs.map((text) => ({
        type: 'paragraph',
        content: text ? [{ type: 'text', text }] : [],
      })),
    },
  });
}

function mockCm(doc: string, from: number, to: number, focused = false) {
  const dispatch = vi.fn();
  const view = {
    hasFocus: focused,
    state: {
      doc: {
        length: doc.length,
        sliceString: (a: number, b?: number) =>
          b == null ? doc.slice(a) : doc.slice(a, b),
        toString: () => doc,
      },
      selection: { main: { from, to } },
    },
    dispatch,
    focus: vi.fn(),
  };
  return { view: view as unknown as CmEditorView, dispatch };
}

describe('readHaimLlmAssistSelection', () => {
  it('reads TipTap selection from focus memory when panel steals focus', () => {
    const ed = tipTapDoc(['hello world']);
    try {
      ed.commands.setTextSelection({ from: 1, to: 6 });
      const memory = tipTapFocusMemory(ed);
      const snap = readHaimLlmAssistSelection(ed, {
        cm: null,
        preferSource: false,
        focusMemory: memory,
      });
      expect(snap.text).toBe('hello');
      expect(snap.surface).toBe('tiptap');
      expect(snap.from).toBe(1);
      expect(snap.to).toBe(6);
    } finally {
      ed.destroy();
    }
  });

  it('prefers CM focus memory after panel steals focus', () => {
    const ed = tipTapDoc(['alpha']);
    const { view } = mockCm('one two three', 4, 7);
    try {
      const memory = cmFocusMemory(view);
      const snap = readHaimLlmAssistSelection(ed, {
        cm: view,
        preferSource: false,
        focusMemory: memory,
      });
      expect(snap.surface).toBe('cm');
      expect(snap.text).toBe('two');
    } finally {
      ed.destroy();
    }
  });

  it('prefers live focused CM over TipTap memory', () => {
    const ed = tipTapDoc(['tiptap']);
    const { view } = mockCm('source-sel', 0, 10, true);
    try {
      ed.commands.setTextSelection({ from: 1, to: 7 });
      const memory = tipTapFocusMemory(ed);
      const snap = readHaimLlmAssistSelection(ed, {
        cm: view,
        preferSource: false,
        focusMemory: memory,
      });
      expect(snap.surface).toBe('cm');
      expect(snap.text).toBe('source-sel');
    } finally {
      ed.destroy();
    }
  });
});

describe('applyHaimLlmAssistResult', () => {
  it('dispatches CM replace when focus memory is source', () => {
    const ed = tipTapDoc(['ignored']);
    const { view, dispatch } = mockCm('aaa bbb ccc', 4, 7);
    try {
      const memory = cmFocusMemory(view);
      const ok = applyHaimLlmAssistResult({
        editor: ed,
        cm: view,
        result: 'XXX',
        preferSource: true,
        focusMemory: memory,
      });
      expect(ok).toBe(true);
      expect(dispatch).toHaveBeenCalled();
      const arg = dispatch.mock.calls[0]?.[0] as {
        changes: { from: number; to: number; insert: string };
      };
      expect(arg.changes).toEqual({ from: 4, to: 7, insert: 'XXX' });
    } finally {
      ed.destroy();
    }
  });

  it('appends at CM doc end when forceAppendAtEnd and preferSource', () => {
    const ed = tipTapDoc(['ignored']);
    const { view, dispatch } = mockCm('body', 0, 0);
    try {
      const ok = applyHaimLlmAssistResult({
        editor: ed,
        cm: view,
        result: 'TAIL',
        forceAppendAtEnd: true,
        preferSource: true,
        focusMemory: cmFocusMemory(view),
      });
      expect(ok).toBe(true);
      const arg = dispatch.mock.calls[0]?.[0] as {
        changes: { from: number; to: number; insert: string };
      };
      expect(arg.changes.from).toBe(4);
      expect(arg.changes.to).toBe(4);
      expect(arg.changes.insert).toBe('\nTAIL');
    } finally {
      ed.destroy();
    }
  });
});

describe('selectHaimTextblockOrAll', () => {
  it('selects the current textblock then the whole document', () => {
    const ed = tipTapDoc(['alpha', 'bravo']);
    try {
      ed.commands.setTextSelection(3);
      expect(selectHaimTextblockOrAll(ed)).toBe(true);
      expect(ed.state.doc.textBetween(ed.state.selection.from, ed.state.selection.to)).toBe(
        'alpha',
      );

      expect(selectHaimTextblockOrAll(ed)).toBe(true);
      const { from, to } = ed.state.selection;
      expect(ed.state.doc.textBetween(from, to, '\n')).toBe('alpha\nbravo');
    } finally {
      ed.destroy();
    }
  });
});

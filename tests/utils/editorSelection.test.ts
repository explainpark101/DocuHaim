import { afterEach, describe, expect, it, vi } from 'vitest';
import type { EditorView } from '@codemirror/view';
import { recordMdEditorSourceFocus } from '@/utils/mdEditorSourceFocus';
import {
  getEditorSelectionFromRef,
  subscribeEditorSelectionFromRef,
} from '@/utils/editorSelection';

function createMockView(docText: string, selection = { from: 0, to: 0 }) {
  let text = docText;
  let from = selection.from;
  let to = selection.to;
  const view = {
    dom: { closest: () => null },
    get state() {
      return {
        doc: {
          length: text.length,
          toString: () => text,
          sliceString: (a: number, b: number) => text.slice(a, b),
        },
        selection: { main: { from, to } },
      };
    },
    dispatch(spec: {
      effects?: unknown;
      changes?: { from: number; to: number; insert: string };
      selection?: { anchor: number };
    }) {
      if (spec.changes) {
        const { from: f, to: t, insert } = spec.changes;
        text = `${text.slice(0, f)}${insert}${text.slice(t)}`;
        const anchor = spec.selection?.anchor ?? f + insert.length;
        from = anchor;
        to = anchor;
      }
      return true;
    },
  };

  return {
    view: view as unknown as EditorView,
    getText: () => text,
  };
}

function editorRefFor(view: EditorView | null, apiExtras: Record<string, unknown> = {}) {
  return {
    current: {
      getEditorView: () => view,
      root: null,
      ...apiExtras,
    },
  };
}

afterEach(() => {
  vi.useRealTimers();
});

describe('getEditorSelectionFromRef', () => {
  it('reads selection from CodeMirror view', () => {
    const { view } = createMockView('hello world', { from: 0, to: 5 });
    const snap = getEditorSelectionFromRef(editorRefFor(view));
    expect(snap.text).toBe('hello');
    expect(snap.from).toBe(0);
    expect(snap.to).toBe(5);
    expect(snap.view).toBe(view);
  });

  it('falls back to getSelectedText when view is unavailable', () => {
    const snap = getEditorSelectionFromRef(
      editorRefFor(null, { getSelectedText: () => 'fallback' }),
    );
    expect(snap.text).toBe('fallback');
    expect(snap.from).toBe(0);
    expect(snap.to).toBe(0);
    expect(snap.view).toBeNull();
  });

  it('falls back to last source-editor focus when live selection is collapsed', () => {
    const { view } = createMockView('hello world', { from: 0, to: 0 });
    recordMdEditorSourceFocus(view, 0, 5);
    const snap = getEditorSelectionFromRef(editorRefFor(view));
    expect(snap.text).toBe('hello');
    expect(snap.from).toBe(0);
    expect(snap.to).toBe(5);
    expect(snap.view).toBe(view);
  });

  it('prefers live non-empty selection over focus history', () => {
    const { view } = createMockView('hello world', { from: 6, to: 11 });
    recordMdEditorSourceFocus(view, 0, 5);
    const snap = getEditorSelectionFromRef(editorRefFor(view));
    expect(snap.text).toBe('world');
    expect(snap.from).toBe(6);
    expect(snap.to).toBe(11);
  });

  it('falls back to md-editor getSelectedText when live selection is empty', () => {
    const { view } = createMockView('hello world', { from: 0, to: 0 });
    const snap = getEditorSelectionFromRef(
      editorRefFor(view, { getSelectedText: () => 'hello' }),
    );
    expect(snap.text).toBe('hello');
  });
});

describe('subscribeEditorSelectionFromRef', () => {
  it('retries until the editor view mounts', () => {
    vi.useFakeTimers();
    const { view } = createMockView('abc', { from: 1, to: 3 });
    const ref: {
      current: {
        getEditorView: () => EditorView | null;
        root: null;
      };
    } = {
      current: {
        getEditorView: () => null,
        root: null,
      },
    };
    const onChange = vi.fn();

    const cleanup = subscribeEditorSelectionFromRef(ref, onChange);
    expect(onChange).not.toHaveBeenCalled();

    ref.current.getEditorView = () => view;
    vi.advanceTimersByTime(50);

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ text: 'bc', from: 1, to: 3 }),
    );

    cleanup();
  });
});

import { afterEach, describe, expect, it, vi } from 'vitest';
import type { EditorView } from '@codemirror/view';
import {
  clearMdEditorSourceFocus,
  getMdEditorSourceFocus,
  recordMdEditorSourceFocus,
} from '@/utils/mdEditorSourceFocus';

const previewOnlyUi = vi.hoisted(() => ({ value: false }));

vi.mock('@/utils/previewMirrorEdit', () => ({
  isMdEditorPreviewOnlyUi: () => previewOnlyUi.value,
}));

import {
  applyLlmResultToEditor,
  shouldAppendLlmResultAtDocEnd,
} from '@/utils/editorSelection';

function createMockView(docText: string, selection = { from: 0, to: 0 }) {
  let text = docText;
  let from = selection.from;
  let to = selection.to;
  const dispatches: Array<{ from: number; to: number; insert: string }> = [];

  const view = {
    hasFocus: false,
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
      changes: { from: number; to: number; insert: string };
      selection?: { anchor: number };
    }) {
      const { from: f, to: t, insert } = spec.changes;
      dispatches.push({ from: f, to: t, insert });
      text = `${text.slice(0, f)}${insert}${text.slice(t)}`;
      const anchor = spec.selection?.anchor ?? f + insert.length;
      from = anchor;
      to = anchor;
    },
    focus() {
      this.hasFocus = true;
    },
  };

  return { view: view as unknown as EditorView, dispatches, getText: () => text };
}

function editorRefFor(view: EditorView | null) {
  return {
    current: {
      getEditorView: () => view,
      root: null,
    },
  };
}

afterEach(() => {
  previewOnlyUi.value = false;
});

describe('mdEditorSourceFocus', () => {
  it('records and clears last focus range', () => {
    const { view } = createMockView('hello', { from: 2, to: 2 });
    expect(getMdEditorSourceFocus(view)).toBeNull();

    recordMdEditorSourceFocus(view, 2, 5);
    expect(getMdEditorSourceFocus(view)).toEqual({
      from: 2,
      to: 5,
      everFocused: true,
    });

    clearMdEditorSourceFocus(view);
    expect(getMdEditorSourceFocus(view)).toBeNull();
  });
});

describe('shouldAppendLlmResultAtDocEnd', () => {
  it('appends when source Editor was never focused', () => {
    const { view } = createMockView('abc');
    expect(shouldAppendLlmResultAtDocEnd(editorRefFor(view), { view })).toBe(true);
  });

  it('does not append when source Editor was focused', () => {
    const { view } = createMockView('abc');
    recordMdEditorSourceFocus(view, 1, 1);
    expect(shouldAppendLlmResultAtDocEnd(editorRefFor(view), { view })).toBe(false);
  });

  it('appends in preview-only mode even with focus history', () => {
    const { view } = createMockView('abc');
    recordMdEditorSourceFocus(view, 1, 1);
    previewOnlyUi.value = true;
    expect(shouldAppendLlmResultAtDocEnd(editorRefFor(view), { view })).toBe(true);
  });

  it('appends when view is missing', () => {
    expect(shouldAppendLlmResultAtDocEnd({ current: null }, { view: null })).toBe(true);
  });
});

describe('applyLlmResultToEditor', () => {
  it('appends at doc end when never focused', () => {
    const { view, dispatches, getText } = createMockView('hello');
    const ok = applyLlmResultToEditor({
      editorRef: editorRefFor(view),
      result: 'X',
    });
    expect(ok).toBe(true);
    expect(dispatches).toEqual([{ from: 5, to: 5, insert: '\nX' }]);
    expect(getText()).toBe('hello\nX');
  });

  it('inserts at last collapsed focus position', () => {
    const { view, dispatches, getText } = createMockView('hello world');
    recordMdEditorSourceFocus(view, 5, 5);
    const ok = applyLlmResultToEditor({
      editorRef: editorRefFor(view),
      result: '!',
    });
    expect(ok).toBe(true);
    expect(dispatches).toEqual([{ from: 5, to: 5, insert: '!' }]);
    expect(getText()).toBe('hello! world');
  });

  it('replaces last focus selection range', () => {
    const { view, dispatches, getText } = createMockView('hello world');
    recordMdEditorSourceFocus(view, 0, 5);
    const ok = applyLlmResultToEditor({
      editorRef: editorRefFor(view),
      result: 'hi',
    });
    expect(ok).toBe(true);
    expect(dispatches).toEqual([{ from: 0, to: 5, insert: 'hi' }]);
    expect(getText()).toBe('hi world');
  });

  it('appends in preview-only even with focus history', () => {
    const { view, dispatches, getText } = createMockView('doc');
    recordMdEditorSourceFocus(view, 1, 1);
    previewOnlyUi.value = true;
    const ok = applyLlmResultToEditor({
      editorRef: editorRefFor(view),
      result: 'tail',
    });
    expect(ok).toBe(true);
    expect(dispatches).toEqual([{ from: 3, to: 3, insert: '\ntail' }]);
    expect(getText()).toBe('doc\ntail');
  });
});

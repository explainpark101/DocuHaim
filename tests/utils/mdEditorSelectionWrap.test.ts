import { afterEach, describe, expect, it, vi } from 'vitest';
import { EditorSelection, EditorState } from '@codemirror/state';
import type { EditorView } from '@codemirror/view';
import {
  handleMdEditorSelectionWrapKeydown,
  isInlineCodeFenceTriggerKey,
} from '@/utils/mdEditorSelectionWrap';

const baseMods = {
  ctrlKey: false,
  metaKey: false,
  altKey: false,
  shiftKey: false,
  isComposing: false,
  defaultPrevented: false,
} as const;

function stubNavigator(platform: string, userAgent: string) {
  vi.stubGlobal('navigator', {
    platform,
    userAgent,
  });
}

function makeView(doc: string, from: number, to: number = from): EditorView {
  let state = EditorState.create({
    doc,
    selection: EditorSelection.range(from, to),
  });
  return {
    get state() {
      return state;
    },
    composing: false,
    dispatch(spec: Parameters<EditorView['dispatch']>[0]) {
      state = state.update(spec as never).state;
    },
  } as unknown as EditorView;
}

const backtickEvent = {
  key: '`',
  code: 'Backquote',
  ...baseMods,
};

describe('isInlineCodeFenceTriggerKey', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('matches backtick key and Backquote code on any platform', () => {
    stubNavigator('Win32', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
    expect(
      isInlineCodeFenceTriggerKey({
        key: '`',
        code: 'Backquote',
        ...baseMods,
      }),
    ).toBe(true);
  });

  it('matches Korean won / backslash / IntlBackslash only on Apple', () => {
    stubNavigator('MacIntel', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)');
    expect(
      isInlineCodeFenceTriggerKey({
        key: '₩',
        code: 'Backquote',
        ...baseMods,
      }),
    ).toBe(true);
    expect(
      isInlineCodeFenceTriggerKey({
        key: '\\',
        code: 'IntlBackslash',
        ...baseMods,
      }),
    ).toBe(true);
  });

  it('does not treat backslash as fence trigger on Windows', () => {
    stubNavigator('Win32', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
    expect(
      isInlineCodeFenceTriggerKey({
        key: '\\',
        code: 'Backslash',
        ...baseMods,
      }),
    ).toBe(false);
    expect(
      isInlineCodeFenceTriggerKey({
        key: '\\',
        code: 'IntlBackslash',
        ...baseMods,
      }),
    ).toBe(false);
  });

  it('does not treat backslash as fence trigger on Android', () => {
    stubNavigator(
      'Linux armv8l',
      'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36',
    );
    expect(
      isInlineCodeFenceTriggerKey({
        key: '\\',
        code: 'Backslash',
        ...baseMods,
      }),
    ).toBe(false);
  });

  it('matches backslash on iOS', () => {
    stubNavigator('iPhone', 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)');
    expect(
      isInlineCodeFenceTriggerKey({
        key: '\\',
        code: 'Backslash',
        ...baseMods,
      }),
    ).toBe(true);
  });

  it('ignores modified keys', () => {
    stubNavigator('MacIntel', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)');
    expect(
      isInlineCodeFenceTriggerKey({
        key: '`',
        code: 'Backquote',
        ...baseMods,
        ctrlKey: true,
      }),
    ).toBe(false);
  });
});

describe('handleMdEditorSelectionWrapKeydown', () => {
  it('wraps a non-empty selection with backticks', () => {
    const view = makeView('hello world', 0, 5);
    expect(handleMdEditorSelectionWrapKeydown(backtickEvent, view)).toBe(true);
    expect(view.state.doc.toString()).toBe('`hello` world');
  });

  it('does not wrap an empty selection (lets the backtick insert)', () => {
    const view = makeView('hello', 2);
    expect(handleMdEditorSelectionWrapKeydown(backtickEvent, view)).toBe(false);
    expect(view.state.doc.toString()).toBe('hello');
  });
});

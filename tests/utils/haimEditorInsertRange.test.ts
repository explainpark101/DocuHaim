import { describe, expect, it } from 'vitest';
import {
  clampHaimInsertRange,
  escapeMarkdownLinkLabel,
  resolveHaimInsertRange,
} from '@/utils/haimEditorInsertRange';
import type { Editor } from '@tiptap/react';

function mockEditor({
  size,
  from,
  to,
  isFocused,
}: {
  size: number;
  from: number;
  to: number;
  isFocused: boolean;
}): Editor {
  return {
    isFocused,
    state: {
      doc: { content: { size } },
      selection: { from, to },
    },
  } as unknown as Editor;
}

describe('haimEditorInsertRange', () => {
  it('clamps ranges into doc size', () => {
    expect(clampHaimInsertRange(10, -2, 99)).toEqual({ from: 0, to: 10 });
    expect(clampHaimInsertRange(10, 3, 7)).toEqual({ from: 3, to: 7 });
  });

  it('escapes markdown link labels', () => {
    expect(escapeMarkdownLinkLabel('a[b]\\c')).toBe('a\\[b\\]\\\\c');
  });

  it('appends at end when forceAppendAtEnd', () => {
    const editor = mockEditor({ size: 42, from: 5, to: 8, isFocused: true });
    expect(
      resolveHaimInsertRange(editor, {
        forceAppendAtEnd: true,
        everFocused: true,
        lastFocusedRange: { from: 5, to: 8 },
      }),
    ).toEqual({ from: 42, to: 42 });
  });

  it('appends at end when never focused', () => {
    const editor = mockEditor({ size: 20, from: 1, to: 1, isFocused: false });
    expect(
      resolveHaimInsertRange(editor, {
        everFocused: false,
        lastFocusedRange: null,
      }),
    ).toEqual({ from: 20, to: 20 });
  });

  it('uses live selection when focused', () => {
    const editor = mockEditor({ size: 100, from: 10, to: 15, isFocused: true });
    expect(
      resolveHaimInsertRange(editor, {
        everFocused: true,
        lastFocusedRange: { from: 1, to: 2 },
      }),
    ).toEqual({ from: 10, to: 15 });
  });

  it('uses last focused range when blurred', () => {
    const editor = mockEditor({ size: 100, from: 0, to: 0, isFocused: false });
    expect(
      resolveHaimInsertRange(editor, {
        everFocused: true,
        lastFocusedRange: { from: 30, to: 40 },
      }),
    ).toEqual({ from: 30, to: 40 });
  });

  it('falls back to live selection when blurred without memory', () => {
    const editor = mockEditor({ size: 100, from: 12, to: 12, isFocused: false });
    expect(
      resolveHaimInsertRange(editor, {
        everFocused: true,
        lastFocusedRange: null,
      }),
    ).toEqual({ from: 12, to: 12 });
  });
});

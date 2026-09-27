import { describe, expect, it } from 'vitest';
import { getHaimSelectedPlainText } from '@/components/haimEditor/getHaimSelectedPlainText';

function mockTipTap(text: string, focused = false) {
  const empty = text.length === 0;
  return {
    isFocused: focused,
    state: {
      selection: { from: 0, to: text.length, empty },
      doc: {
        textBetween: () => text,
      },
    },
  };
}

function mockCm(text: string, focused = false) {
  return {
    hasFocus: focused,
    state: {
      selection: { main: { from: 0, to: text.length } },
      doc: {
        sliceString: () => text,
      },
    },
  };
}

describe('getHaimSelectedPlainText', () => {
  it('returns TipTap selection when only TipTap has text', () => {
    expect(
      getHaimSelectedPlainText(mockTipTap('hello') as never, null),
    ).toBe('hello');
  });

  it('returns CodeMirror selection when only source has text', () => {
    expect(
      getHaimSelectedPlainText(null, mockCm('https://a.test') as never),
    ).toBe('https://a.test');
  });

  it('prefers focused CodeMirror over TipTap', () => {
    expect(
      getHaimSelectedPlainText(
        mockTipTap('tiptap') as never,
        mockCm('cm', true) as never,
      ),
    ).toBe('cm');
  });

  it('falls back to TipTap when neither is focused', () => {
    expect(
      getHaimSelectedPlainText(
        mockTipTap('tiptap') as never,
        mockCm('cm') as never,
      ),
    ).toBe('tiptap');
  });

  it('skips CodeMirror when source is hidden', () => {
    expect(
      getHaimSelectedPlainText(mockTipTap('a') as never, mockCm('b') as never, {
        sourceVisible: false,
      }),
    ).toBe('a');
  });

  it('returns empty when nothing is selected', () => {
    expect(getHaimSelectedPlainText(mockTipTap('') as never, null)).toBe('');
  });
});

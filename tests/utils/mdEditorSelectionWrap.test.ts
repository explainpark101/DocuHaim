import { describe, expect, it } from 'vitest';
import { isInlineCodeFenceTriggerKey } from '@/utils/mdEditorSelectionWrap';

describe('isInlineCodeFenceTriggerKey', () => {
  it('matches backtick key and Backquote code', () => {
    expect(
      isInlineCodeFenceTriggerKey({
        key: '`',
        code: 'Backquote',
        ctrlKey: false,
        metaKey: false,
        altKey: false,
        shiftKey: false,
        isComposing: false,
        defaultPrevented: false,
      }),
    ).toBe(true);
  });

  it('matches Korean won sign on Backquote', () => {
    expect(
      isInlineCodeFenceTriggerKey({
        key: '₩',
        code: 'Backquote',
        ctrlKey: false,
        metaKey: false,
        altKey: false,
        shiftKey: false,
        isComposing: false,
        defaultPrevented: false,
      }),
    ).toBe(true);
  });

  it('matches IntlBackslash', () => {
    expect(
      isInlineCodeFenceTriggerKey({
        key: '\\',
        code: 'IntlBackslash',
        ctrlKey: false,
        metaKey: false,
        altKey: false,
        shiftKey: false,
        isComposing: false,
        defaultPrevented: false,
      }),
    ).toBe(true);
  });

  it('ignores modified keys', () => {
    expect(
      isInlineCodeFenceTriggerKey({
        key: '`',
        code: 'Backquote',
        ctrlKey: true,
        metaKey: false,
        altKey: false,
        shiftKey: false,
        isComposing: false,
        defaultPrevented: false,
      }),
    ).toBe(false);
  });
});

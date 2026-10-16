import { describe, expect, it } from 'vitest';
import { isLightboxImageCopyShortcut } from '@/utils/copyImageToClipboard';

describe('isLightboxImageCopyShortcut', () => {
  it('matches Ctrl+C and Cmd+C', () => {
    expect(
      isLightboxImageCopyShortcut({
        key: 'c',
        ctrlKey: true,
        metaKey: false,
        altKey: false,
        shiftKey: false,
      }),
    ).toBe(true);
    expect(
      isLightboxImageCopyShortcut({
        key: 'C',
        ctrlKey: false,
        metaKey: true,
        altKey: false,
        shiftKey: false,
      }),
    ).toBe(true);
  });

  it('ignores plain C, shifted C, and IME composition', () => {
    expect(
      isLightboxImageCopyShortcut({
        key: 'c',
        ctrlKey: false,
        metaKey: false,
        altKey: false,
        shiftKey: false,
      }),
    ).toBe(false);
    expect(
      isLightboxImageCopyShortcut({
        key: 'c',
        ctrlKey: true,
        metaKey: false,
        altKey: false,
        shiftKey: true,
      }),
    ).toBe(false);
    expect(
      isLightboxImageCopyShortcut({
        key: 'c',
        ctrlKey: true,
        metaKey: false,
        altKey: false,
        shiftKey: false,
        isComposing: true,
      }),
    ).toBe(false);
  });
});

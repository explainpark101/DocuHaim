import { describe, expect, it } from 'vitest';
import { shouldOpenDesktopExternalLink } from '@/utils/shared/initDesktopExternalLinks';

describe('shouldOpenDesktopExternalLink', () => {
  it('opens cross-origin http(s) links', () => {
    expect(shouldOpenDesktopExternalLink('https://example.com')).toBe(true);
    expect(shouldOpenDesktopExternalLink('http://example.com/path')).toBe(true);
  });

  it('opens mailto and tel links', () => {
    expect(shouldOpenDesktopExternalLink('mailto:hello@example.com')).toBe(true);
    expect(shouldOpenDesktopExternalLink('tel:+821012345678')).toBe(true);
  });

  it('opens target=_blank http(s) even when same-origin check would pass', () => {
    expect(
      shouldOpenDesktopExternalLink('https://example.com', { target: '_blank' }),
    ).toBe(true);
  });

  it('ignores in-app anchors and fragments', () => {
    expect(shouldOpenDesktopExternalLink('#section')).toBe(false);
    expect(shouldOpenDesktopExternalLink('notes/foo.md')).toBe(false);
    expect(shouldOpenDesktopExternalLink('javascript:void(0)')).toBe(false);
    expect(shouldOpenDesktopExternalLink('')).toBe(false);
  });
});

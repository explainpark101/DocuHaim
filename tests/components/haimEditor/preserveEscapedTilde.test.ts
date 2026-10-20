import { describe, expect, it } from 'vitest';
import {
  protectEscapedTildes,
  restoreEscapedTildes,
} from '@/components/haimEditor/preserveEscapedTilde';

describe('preserveEscapedTilde', () => {
  it('round-trips a source backslash-tilde', () => {
    const protectedMd = protectEscapedTildes('see \\~ and more');
    expect(protectedMd).not.toContain('\\~');
    expect(restoreEscapedTildes(protectedMd)).toBe('see \\~ and more');
  });

  it('leaves an already-escaped backslash plus tilde alone', () => {
    expect(protectEscapedTildes('\\\\~')).toBe('\\\\~');
  });

  it('does not rewrite backslash-tilde inside fenced or inline code', () => {
    const fenced = '```\n\\~\n```\n';
    expect(protectEscapedTildes(fenced)).toBe(fenced);
    const inline = 'use `\\~` here';
    expect(protectEscapedTildes(inline)).toBe(inline);
  });
});

import { describe, expect, it } from 'vitest';
import {
  DOCUHAIM_SCHEME_PREFIX,
  buildDocuhaimHref,
  isDocuhaimHref,
  normalizeDocuhaimPath,
  parseDocuhaimHref,
} from '@/utils/docuhaimLink';

describe('docuhaimLink', () => {
  it('normalizes paths', () => {
    expect(normalizeDocuhaimPath('/notes/a.md')).toBe('notes/a.md');
    expect(normalizeDocuhaimPath('notes\\a.md')).toBe('notes/a.md');
    expect(normalizeDocuhaimPath('notes%2Fb.md')).toBe('notes/b.md');
  });

  it('detects scheme case-insensitively', () => {
    expect(isDocuhaimHref('docuhaim://notes/a.md')).toBe(true);
    expect(isDocuhaimHref('DOCUHAIM://notes/a.md')).toBe(true);
    expect(isDocuhaimHref('https://example.com')).toBe(false);
  });

  it('parses without treating first segment as hostname', () => {
    expect(parseDocuhaimHref('docuhaim://notes/meeting.md')).toBe(
      'notes/meeting.md',
    );
    expect(parseDocuhaimHref('docuhaim://a/b.md')).toBe('a/b.md');
    expect(parseDocuhaimHref('Docuhaim://folder/file%20name.md')).toBe(
      'folder/file name.md',
    );
    expect(parseDocuhaimHref('https://x')).toBe(null);
  });

  it('builds encoded segment hrefs', () => {
    expect(buildDocuhaimHref('notes/meeting.md')).toBe(
      `${DOCUHAIM_SCHEME_PREFIX}notes/meeting.md`,
    );
    expect(buildDocuhaimHref('folder/file name.md')).toBe(
      `${DOCUHAIM_SCHEME_PREFIX}folder/file%20name.md`,
    );
    expect(buildDocuhaimHref('/notes/a.md')).toBe(
      `${DOCUHAIM_SCHEME_PREFIX}notes/a.md`,
    );
  });

  it('round-trips spaced paths', () => {
    const href = buildDocuhaimHref('dir/my note.md');
    expect(parseDocuhaimHref(href)).toBe('dir/my note.md');
  });
});

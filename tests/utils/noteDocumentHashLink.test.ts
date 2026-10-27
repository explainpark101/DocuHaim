import { describe, expect, it } from 'vitest';
import {
  headingMatchesHashFragment,
  isNoteDocumentHashHref,
  noteHashFragment,
  slugifyHeadingForHash,
} from '@/utils/noteDocumentHashLink';

describe('isNoteDocumentHashHref', () => {
  it('accepts hash-only hrefs', () => {
    expect(isNoteDocumentHashHref('#')).toBe(true);
    expect(isNoteDocumentHashHref('#intro')).toBe(true);
    expect(isNoteDocumentHashHref('#한글-제목')).toBe(true);
  });

  it('rejects non-hash and footnote hashes', () => {
    expect(isNoteDocumentHashHref('')).toBe(false);
    expect(isNoteDocumentHashHref('https://x.com/#a')).toBe(false);
    expect(isNoteDocumentHashHref('/view/a.md#x')).toBe(false);
    expect(isNoteDocumentHashHref('#source-1')).toBe(false);
    expect(isNoteDocumentHashHref('#fnref-1')).toBe(false);
  });
});

describe('noteHashFragment', () => {
  it('strips # and decodes', () => {
    expect(noteHashFragment('#intro')).toBe('intro');
    expect(noteHashFragment('#')).toBe('');
    expect(noteHashFragment('#a%20b')).toBe('a b');
  });
});

describe('slugifyHeadingForHash', () => {
  it('slugifies english and keeps hangul', () => {
    expect(slugifyHeadingForHash('Hello World!')).toBe('hello-world');
    expect(slugifyHeadingForHash('  Introduction  ')).toBe('introduction');
    expect(slugifyHeadingForHash('한글 제목')).toBe('한글-제목');
  });
});

describe('headingMatchesHashFragment', () => {
  it('matches by id, plain text, or slug', () => {
    expect(headingMatchesHashFragment('Hello', 'hello', 'hello')).toBe(true);
    expect(headingMatchesHashFragment('Hello World', 'hello-world')).toBe(true);
    expect(headingMatchesHashFragment('한글 제목', '한글 제목')).toBe(true);
    expect(headingMatchesHashFragment('한글 제목', '한글-제목')).toBe(true);
    expect(headingMatchesHashFragment('Other', 'hello')).toBe(false);
  });
});

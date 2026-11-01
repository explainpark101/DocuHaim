import { describe, expect, it } from 'vitest';
import {
  isInsideFencedCode,
  isInsideInlineCodeSpan,
  isInsideMarkdownCodeLiteral,
} from '@/utils/markdownCodeLiteral';

describe('isInsideInlineCodeSpan', () => {
  it('detects a simple backtick span', () => {
    const s = 'see `https://example.com` now';
    const urlAt = s.indexOf('https');
    expect(isInsideInlineCodeSpan(s, urlAt)).toBe(true);
    expect(isInsideInlineCodeSpan(s, 0)).toBe(false);
  });

  it('handles double-backtick spans', () => {
    const s = 'x ``a`b`` y';
    expect(isInsideInlineCodeSpan(s, s.indexOf('a'))).toBe(true);
    expect(isInsideInlineCodeSpan(s, s.indexOf('y'))).toBe(false);
  });
});

describe('isInsideFencedCode', () => {
  it('detects fenced bodies', () => {
    const s = 'before\n```\nhttps://inside.example\n```\nafter https://out.example';
    expect(isInsideFencedCode(s, s.indexOf('https://inside'))).toBe(true);
    expect(isInsideFencedCode(s, s.indexOf('https://out'))).toBe(false);
  });
});

describe('isInsideMarkdownCodeLiteral', () => {
  it('covers inline and fenced', () => {
    const s = '`https://a.com` and\n```\nhttps://b.com\n```\nhttps://c.com';
    expect(isInsideMarkdownCodeLiteral(s, s.indexOf('https://a'))).toBe(true);
    expect(isInsideMarkdownCodeLiteral(s, s.indexOf('https://b'))).toBe(true);
    expect(isInsideMarkdownCodeLiteral(s, s.indexOf('https://c'))).toBe(false);
  });
});

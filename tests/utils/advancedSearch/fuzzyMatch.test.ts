import { describe, expect, it } from 'vitest';
import {
  FUZZY_EXACT_MATCH_SCORE,
  compareAdvancedSearchRelevance,
  getFuzzyMatchRate,
  isFuzzyExactMatch,
  scoreFuzzyRelevance,
} from '@/utils/advancedSearch/fuzzyMatch';

describe('getFuzzyMatchRate', () => {
  it('returns 1 for perfect text + length equality', () => {
    expect(getFuzzyMatchRate('설정', '설정')).toBe(1);
    expect(getFuzzyMatchRate('  Hello World ', 'hello world')).toBe(1);
  });

  it('returns query/haystack length ratio for contiguous matches', () => {
    expect(getFuzzyMatchRate('abcdef', 'abc')).toBeCloseTo(0.5);
    expect(getFuzzyMatchRate('hello world', 'hello')).toBeCloseTo(5 / 11);
  });

  it('returns 0 when there is no match', () => {
    expect(getFuzzyMatchRate('alpha', 'zzz')).toBe(0);
  });
});

describe('scoreFuzzyRelevance', () => {
  it('ranks exact same-length matches at the absolute top tier', () => {
    expect(scoreFuzzyRelevance('줄 번호', '줄 번호')).toBe(FUZZY_EXACT_MATCH_SCORE);
    expect(scoreFuzzyRelevance('줄 번호', '줄 번호')).toBeGreaterThan(
      scoreFuzzyRelevance('줄 번호 표시', '줄 번호'),
    );
  });

  it('prefers higher length coverage among prefix matches', () => {
    const near = scoreFuzzyRelevance('설정창', '설정');
    const far = scoreFuzzyRelevance('설정 페이지와 기타 옵션들', '설정');
    expect(near).toBeGreaterThan(far);
  });

  it('keeps exact above startsWith even when lengths are close', () => {
    expect(scoreFuzzyRelevance('abc', 'abc')).toBeGreaterThan(
      scoreFuzzyRelevance('abcd', 'abc'),
    );
  });
});

describe('compareAdvancedSearchRelevance', () => {
  it('pins exact title matches above higher-scoring partials', () => {
    const exact = { title: '설정', score: 100 };
    const partial = { title: '설정 페이지', score: 99_999 };
    expect(compareAdvancedSearchRelevance(exact, partial, '설정')).toBeLessThan(0);
    expect(compareAdvancedSearchRelevance(partial, exact, '설정')).toBeGreaterThan(0);
  });

  it('falls back to score then locale title', () => {
    const a = { title: '가', score: 10 };
    const b = { title: '나', score: 20 };
    expect(compareAdvancedSearchRelevance(a, b, 'zzz')).toBeGreaterThan(0);
  });
});

describe('isFuzzyExactMatch', () => {
  it('requires same normalized text and length', () => {
    expect(isFuzzyExactMatch('Foo', 'foo')).toBe(true);
    expect(isFuzzyExactMatch('foobar', 'foo')).toBe(false);
  });
});

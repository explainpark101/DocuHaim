/**
 * Partial / fuzzy matching for Advanced Search — same rules as chat search
 * (VS Code-style subsequence; space-separated tokens are AND).
 */

import {
  fuzzyMatchText,
  fuzzyMatchTokensInHaystacks,
  splitSearchTokens,
} from '@/utils/chatWithMyself/fuzzyMatchCore';

export { fuzzyMatchText, fuzzyMatchTokensInHaystacks, splitSearchTokens };

/** Score tier for identical haystack === query (same characters + length). */
export const FUZZY_EXACT_MATCH_SCORE = 100_000;

export function normalizeFuzzyText(value: string): string {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

/**
 * Match rate in [0, 1].
 * 1 = perfect equality after normalize (same text and character length).
 * Contiguous substring uses queryLen / haystackLen; fuzzy is capped below that.
 */
export function getFuzzyMatchRate(haystack: string, query: string): number {
  const h = normalizeFuzzyText(haystack);
  const q = normalizeFuzzyText(query);
  if (!q || !h) return 0;
  if (h === q) return 1;

  if (h.startsWith(q) || h.includes(q)) {
    return q.length / Math.max(h.length, 1);
  }

  const tokens = splitSearchTokens(q);
  if (tokens.length >= 2) {
    if (tokens.every((t) => fuzzyMatchText(h, t))) {
      const joinedLen = tokens.join('').length;
      return Math.min(1, joinedLen / Math.max(h.length, 1)) * 0.9;
    }
    return 0;
  }

  if (fuzzyMatchText(h, q)) {
    return Math.min(1, q.length / Math.max(h.length, 1)) * 0.75;
  }
  return 0;
}

/**
 * Rank how well `query` matches `haystack` (higher = better).
 * Perfect equality (same text + length) outranks every partial / Lucivy boost.
 * Contiguous and fuzzy scores scale with match rate (length coverage).
 */
export function scoreFuzzyRelevance(haystack: string, query: string): number {
  const h = normalizeFuzzyText(haystack);
  const q = normalizeFuzzyText(query);
  if (!q || !h) return 0;

  // Exact: same characters and same length → absolute top tier.
  if (h === q) return FUZZY_EXACT_MATCH_SCORE;

  const rate = getFuzzyMatchRate(h, q);
  if (rate <= 0) return 0;

  if (h.startsWith(q)) {
    // Near-full length coverage (rate→1) ranks just under exact.
    return Math.round(8_000 + rate * 1_500);
  }
  if (h.includes(q)) {
    return Math.round(6_000 + rate * 1_500);
  }

  const tokens = splitSearchTokens(q);
  if (tokens.length >= 2) {
    return Math.round(3_500 + rate * 2_000);
  }

  return Math.round(2_500 + rate * 2_000);
}

/** Best fuzzy score across several fields. */
export function scoreFuzzyFields(
  fields: Array<string | null | undefined>,
  query: string,
): number {
  let best = 0;
  for (const field of fields) {
    const s = scoreFuzzyRelevance(String(field || ''), query);
    if (s > best) best = s;
  }
  return best;
}

/** True when haystack equals query after normalize (perfect length + text). */
export function isFuzzyExactMatch(haystack: string, query: string): boolean {
  const q = normalizeFuzzyText(query);
  if (!q) return false;
  return normalizeFuzzyText(haystack) === q;
}

/**
 * Sort comparator: exact title matches first, then higher score, then locale title.
 * Returns negative when `a` should come before `b`.
 */
export function compareAdvancedSearchRelevance(
  a: { title: string; score: number },
  b: { title: string; score: number },
  query: string,
): number {
  const aExact = isFuzzyExactMatch(a.title, query) ? 1 : 0;
  const bExact = isFuzzyExactMatch(b.title, query) ? 1 : 0;
  if (aExact !== bExact) return bExact - aExact;
  if (b.score !== a.score) return b.score - a.score;
  return a.title.localeCompare(b.title, 'ko');
}

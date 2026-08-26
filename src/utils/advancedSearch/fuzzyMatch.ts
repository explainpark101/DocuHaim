/**
 * Partial / fuzzy matching for Advanced Search — same rules as chat search
 * (VS Code-style subsequence; space-separated tokens are AND).
 */

import {
  fuzzyMatchText,
  fuzzyMatchTokensInHaystacks,
  splitSearchTokens,
} from '@/utils/chatWithMyself/search';

export { fuzzyMatchText, fuzzyMatchTokensInHaystacks, splitSearchTokens };

/**
 * Rank how well `query` matches `haystack` (higher = better).
 * Contiguous substring beats subsequence; 0 = no match.
 */
export function scoreFuzzyRelevance(haystack: string, query: string): number {
  const h = String(haystack || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
  const q = String(query || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
  if (!q) return 0;
  if (!h) return 0;

  if (h === q) return 1000;
  if (h.startsWith(q)) return 860;
  if (h.includes(q)) return 720;

  // Multi-token: every token must fuzzy-match the haystack.
  const tokens = splitSearchTokens(q);
  if (tokens.length >= 2) {
    if (tokens.every((t) => fuzzyMatchText(h, t))) {
      const joinedLen = tokens.join('').length;
      const density = Math.min(1, joinedLen / Math.max(h.length, 1));
      return Math.round(480 + density * 160);
    }
    return 0;
  }

  if (fuzzyMatchText(h, q)) {
    const density = Math.min(1, q.length / Math.max(h.length, 1));
    return Math.round(400 + density * 200);
  }
  return 0;
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

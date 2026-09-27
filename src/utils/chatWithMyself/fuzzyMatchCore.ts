/**
 * VS Code-style fuzzy / partial match helpers (no markdown-it / md-editor).
 * Kept separate from chat search snippet HTML so Advanced Search boot stays lean.
 */

export function fuzzyMatchText(haystack: string, needle: string): boolean {
  const text = String(haystack || '').toLowerCase();
  const q = String(needle || '').trim().toLowerCase();
  if (!q) return true;
  if (text.includes(q)) return true;

  const tokens = q.split(/\s+/).filter(Boolean);
  return tokens.every((token) => fuzzySubsequence(text, token));
}

export function splitSearchTokens(query: string): string[] {
  return String(query || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Space-separated tokens are AND across the message, OR across fields:
 * each token must match at least one haystack.
 */
export function fuzzyMatchTokensInHaystacks(
  haystacks: Array<string | null | undefined> | string | null | undefined,
  query: string,
): boolean {
  const tokens = splitSearchTokens(query);
  if (tokens.length === 0) return true;
  const texts = (Array.isArray(haystacks) ? haystacks : [haystacks]).map((h) =>
    String(h || ''),
  );
  return tokens.every((token) => texts.some((text) => fuzzyMatchText(text, token)));
}

function fuzzySubsequence(haystack: string, needle: string): boolean {
  let hi = 0;
  for (let ni = 0; ni < needle.length; ni += 1) {
    const ch = needle[ni];
    if (ch === undefined) return false;
    const found = haystack.indexOf(ch, hi);
    if (found < 0) return false;
    hi = found + 1;
  }
  return true;
}

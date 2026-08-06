import { isStopword } from './stopwords';

type GaruLike = {
  tokenize: (text: string) => string[];
  nouns: (text: string, options?: { includeSL?: boolean }) => string[];
  isLoaded: () => boolean;
};

let garuPromise: Promise<GaruLike | null> | null = null;
let garuInstance: GaruLike | null = null;

/**
 * Lazy-load garu-ko browser WASM. Returns null on failure (fallback tokenizer).
 */
export async function ensureGaru(): Promise<GaruLike | null> {
  if (garuInstance?.isLoaded()) return garuInstance;
  if (garuPromise) return garuPromise;
  garuPromise = (async () => {
    try {
      const mod = await import('garu-ko/browser');
      const instance = await mod.Garu.load();
      garuInstance = instance;
      return instance;
    } catch (err) {
      console.warn('[advancedSearch] garu-ko load failed; using fallback tokenizer', err);
      garuInstance = null;
      return null;
    }
  })();
  return garuPromise;
}

const HAS_HANGUL_RE = /[\uac00-\ud7a3]/;
/** Unicode letters/numbers (better than \\w for non-ASCII). */
const WORD_RE = /[\p{L}\p{N}_]+/gu;
/** Soft cap — very large notes are truncated for indexing to keep UI responsive. */
const MAX_INDEX_CHARS = 80_000;

function normalizeTerm(raw: string): string | null {
  const t = String(raw || '')
    .trim()
    .toLowerCase();
  if (!t || t.length < 2) return null;
  if (isStopword(t)) return null;
  return t;
}

function fallbackTokenize(text: string): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  const push = (raw: string) => {
    const t = normalizeTerm(raw);
    if (!t || seen.has(t)) return;
    seen.add(t);
    out.push(t);
  };

  for (const m of text.matchAll(WORD_RE)) {
    push(m[0]);
  }

  // Hangul bigrams as weak fallback when morph analyzer is unavailable
  const hangulRuns = text.match(/[\uac00-\ud7a3]{2,}/g) || [];
  for (const run of hangulRuns) {
    for (let i = 0; i < run.length - 1; i++) {
      push(run.slice(i, i + 2));
    }
  }
  return out;
}

function tokenizeWithGaru(garu: GaruLike, text: string): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  const push = (raw: string) => {
    const t = normalizeTerm(raw);
    if (!t || seen.has(t)) return;
    seen.add(t);
    out.push(t);
  };

  // Nouns (+ foreign SL) only — avoid a second full tokenize pass (main-thread cost).
  try {
    for (const n of garu.nouns(text, { includeSL: true })) push(n);
  } catch {
    // ignore
  }

  // Latin/number tokens via regex
  for (const m of text.matchAll(WORD_RE)) {
    if (!HAS_HANGUL_RE.test(m[0])) push(m[0]);
  }

  if (out.length === 0) return fallbackTokenize(text);
  return out;
}

/**
 * Tokenize scrubbed text (+ optional extra terms like image filenames).
 * Call `ensureGaru()` once before heavy indexing batches.
 */
export function tokenizeForIndex(
  text: string,
  extraTerms: string[] = [],
  garu: GaruLike | null = garuInstance,
): string[] {
  // Cap body size so huge notes cannot freeze the main thread.
  const capped =
    text.length > MAX_INDEX_CHARS
      ? text.slice(0, MAX_INDEX_CHARS)
      : text;
  const base = garu?.isLoaded()
    ? tokenizeWithGaru(garu, capped)
    : fallbackTokenize(capped);
  const seen = new Set(base);
  const out = [...base];
  for (const extra of extraTerms) {
    // Path/filename pieces: split on separators so folder segments are searchable.
    for (const part of String(extra || '').split(/[/\\_\-.]+/)) {
      const t = normalizeTerm(part);
      if (!t || seen.has(t)) continue;
      seen.add(t);
      out.push(t);
    }
    const noExt = String(extra || '').replace(/\.[a-z0-9]{1,5}$/i, '');
    const whole = normalizeTerm(noExt.replace(/[/\\]+/g, '-'));
    if (whole && !seen.has(whole)) {
      seen.add(whole);
      out.push(whole);
    }
    // Keep raw basename stem (without path) as a strong term.
    const base = noExt.split(/[/\\]/).pop() || '';
    const baseTerm = normalizeTerm(base);
    if (baseTerm && !seen.has(baseTerm)) {
      seen.add(baseTerm);
      out.push(baseTerm);
    }
  }
  return out;
}

/** Async tokenize ensuring garu is loaded when Korean is present. */
export async function tokenizeForIndexAsync(
  text: string,
  extraTerms: string[] = [],
): Promise<string[]> {
  if (HAS_HANGUL_RE.test(text) || extraTerms.some((t) => HAS_HANGUL_RE.test(t))) {
    await ensureGaru();
  }
  return tokenizeForIndex(text, extraTerms, garuInstance);
}

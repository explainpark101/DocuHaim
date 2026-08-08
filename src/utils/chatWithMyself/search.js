import { marked } from 'marked';
import { getCachedOg } from './chatDb.js';
import { extractUrls, hashUrl } from './og';
import { ogArchiveKey } from './paths.js';

/**
 * VS Code-style fuzzy / partial match: every needle char appears in order
 * in haystack (not necessarily contiguous). Space-separated tokens are AND.
 */
export function fuzzyMatchText(haystack, needle) {
  const text = String(haystack || '').toLowerCase();
  const q = String(needle || '').trim().toLowerCase();
  if (!q) return true;
  if (text.includes(q)) return true;

  const tokens = q.split(/\s+/).filter(Boolean);
  return tokens.every((token) => fuzzySubsequence(text, token));
}

export function splitSearchTokens(query) {
  return String(query || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Space-separated tokens are AND across the message, OR across fields:
 * each token must match at least one haystack.
 */
export function fuzzyMatchTokensInHaystacks(haystacks, query) {
  const tokens = splitSearchTokens(query);
  if (tokens.length === 0) return true;
  const texts = (Array.isArray(haystacks) ? haystacks : [haystacks]).map((h) =>
    String(h || ''),
  );
  return tokens.every((token) =>
    texts.some((text) => fuzzyMatchText(text, token)),
  );
}

function fuzzySubsequence(haystack, needle) {
  if (!needle) return true;
  if (haystack.includes(needle)) return true;
  let hi = 0;
  for (let ni = 0; ni < needle.length; ni++) {
    const found = haystack.indexOf(needle[ni], hi);
    if (found < 0) return false;
    hi = found + 1;
  }
  return true;
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Flatten cached OG fields into searchable plain text.
 */
export function ogDataToSearchText(data, url = '') {
  if (!data || typeof data !== 'object') return url ? String(url) : '';
  return [url || data.url, data.title, data.description, data.siteName, data.url]
    .map((v) => String(v || '').trim())
    .filter(Boolean)
    .join('\n');
}

/**
 * Read OG search text for one URL from IndexedDB, then archive (no network).
 */
export async function loadOgSearchText(url, storage) {
  if (!url) return '';
  const urlHash = await hashUrl(url);
  const idb = await getCachedOg(urlHash);
  if (idb?.data) return ogDataToSearchText(idb.data, url);
  if (storage?.readArchive) {
    try {
      const archived = await storage.readArchive(ogArchiveKey(urlHash));
      if (archived) return ogDataToSearchText(archived, url);
    } catch {
      /* ignore */
    }
  }
  return '';
}

/**
 * Concatenate OG search text for every URL in a message body.
 */
export async function loadMessageOgSearchText(msg, storage) {
  const urls = extractUrls(msg?.body);
  if (!urls.length) return '';
  const parts = [];
  for (const url of urls) {
    const text = await loadOgSearchText(url, storage);
    if (text) parts.push(text);
  }
  return parts.join('\n\n');
}

/**
 * Keep the start of the text and the first query hit; omit the rest with ellipsis.
 */
export function buildSearchPreviewText(text, query, opts = {}) {
  const {
    headChars = 72,
    contextRadius = 56,
    maxTotal = 260,
  } = opts;
  const raw = String(text ?? '');
  if (!raw) return '';
  const q = String(query || '').trim();
  if (!q) {
    if (raw.length <= maxTotal) return raw;
    return `${raw.slice(0, maxTotal).trimEnd()}…`;
  }
  if (raw.length <= maxTotal) return raw;

  const lower = raw.toLowerCase();
  const candidates = [q, ...q.split(/\s+/).filter(Boolean)].sort(
    (a, b) => b.length - a.length,
  );
  let matchStart = -1;
  let matchLen = 0;
  for (const token of candidates) {
    const idx = lower.indexOf(token.toLowerCase());
    if (idx >= 0) {
      matchStart = idx;
      matchLen = token.length;
      break;
    }
  }

  if (matchStart < 0) {
    return `${raw.slice(0, Math.min(headChars, maxTotal)).trimEnd()}…`;
  }

  const matchEnd = matchStart + matchLen;
  const ctxStart = Math.max(0, matchStart - contextRadius);
  const ctxEnd = Math.min(raw.length, matchEnd + contextRadius);

  if (matchStart <= headChars) {
    const end = Math.min(raw.length, Math.max(ctxEnd, headChars));
    const slice = raw.slice(0, Math.min(end, maxTotal));
    return end < raw.length ? `${slice.trimEnd()}…` : raw;
  }

  let head = raw.slice(0, headChars);
  const headBreak = head.lastIndexOf(' ');
  if (headBreak > headChars * 0.45) head = head.slice(0, headBreak);

  let context = raw.slice(ctxStart, ctxEnd);
  if (ctxStart > 0) {
    const soft = context.search(/\s/);
    if (soft >= 0 && soft < 28) context = context.slice(soft + 1);
  }

  let out = `${head.trimEnd()} … ${context.trim()}`;
  if (ctxEnd < raw.length) out += '…';
  if (out.length > maxTotal + 48) {
    out = `${out.slice(0, maxTotal).trimEnd()}…`;
  }
  return out;
}

/**
 * Body (+ optional OG) text prepared for search-result cards.
 */
export function buildSearchResultDisplayText(body, query, ogSearchText = '') {
  const q = String(query || '').trim();
  const bodyStr = String(body || '');
  const ogStr = String(ogSearchText || '');
  const bodyHit = Boolean(q) && fuzzyMatchText(bodyStr, q);
  const ogHit = Boolean(q) && Boolean(ogStr) && fuzzyMatchText(ogStr, q);

  if (ogHit && !bodyHit) {
    const head = bodyStr.trim()
      ? buildSearchPreviewText(bodyStr, '', { headChars: 64, maxTotal: 96 })
      : '';
    const ogPreview = buildSearchPreviewText(ogStr, q, {
      headChars: 48,
      contextRadius: 48,
      maxTotal: 200,
    });
    return head ? `${head}\n\n🔗 ${ogPreview}` : `🔗 ${ogPreview}`;
  }

  return buildSearchPreviewText(bodyStr, q);
}

/**
 * Highlight contiguous token matches inside HTML text nodes only (not tags).
 */
export function highlightHtmlMatches(html, query) {
  const q = String(query || '').trim();
  if (!q || !html) return html;
  const tokens = [
    ...new Set(
      q
        .split(/\s+/)
        .filter(Boolean)
        .sort((a, b) => b.length - a.length),
    ),
  ];
  if (tokens.length === 0) return html;

  const parts = String(html).split(/(<[^>]+>)/g);
  return parts
    .map((part) => {
      if (!part || part.startsWith('<')) return part;
      let text = part;
      for (const token of tokens) {
        const re = new RegExp(`(${escapeRegExp(token)})`, 'gi');
        text = text.replace(
          re,
          '<mark class="chat-search-hit rounded-sm bg-amber-200/90 px-0.5 text-inherit dark:bg-amber-500/40">$1</mark>',
        );
      }
      return text;
    })
    .join('');
}

/**
 * Render chat body for search result cards, with optional query highlights.
 * When `markdown` is false (default), escape as plain text with line breaks.
 * Long bodies are shortened to start + match context before marking.
 * @param {string} body
 * @param {string} [query]
 * @param {string} [ogSearchText]
 * @param {{ markdown?: boolean }} [options]
 */
export function renderSearchResultHtml(
  body,
  query = '',
  ogSearchText = '',
  options = {},
) {
  const raw = buildSearchResultDisplayText(body, query, ogSearchText);
  const asMarkdown = options.markdown === true;
  let html;
  if (asMarkdown) {
    try {
      html = marked.parse(raw, { async: false });
    } catch {
      html = null;
    }
  }
  if (typeof html !== 'string') {
    html = raw
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br/>');
  }
  return highlightHtmlMatches(html, query);
}

/**
 * ![[path]] wiki image URL resolution (cache + pre-signed URL).
 * Shared by MarkdownEditor, ExportPDFPage, etc.
 *
 * Keeps a process-lifetime memory map of path → URL so preview re-renders
 * can reuse the same src string (avoids flicker from new blob: URLs / async IDB).
 */
import {
  getCachedWikiImageObjectUrl,
  setCachedWikiImageBlob,
  getCachedWikiImageUrl,
  setCachedWikiImageUrl,
} from '@/utils/wikiImageCacheDb';
import { WIKI_IMAGE_CACHE_MODE_URL } from '@/utils/wikiImageSettings';
import { getWikiImageCacheMode } from '@/utils/wikiImageRuntime';

const inFlight = new Map();
/** @type {Map<string, string>} */
const memoryUrlByPath = new Map();

/**
 * Sync lookup for already-resolved URLs (markdown-it / hydration before paint).
 * @param {string} path
 * @returns {string|null}
 */
export function peekResolvedWikiImageUrl(path: any) {
  if (!path) return null;
  return memoryUrlByPath.get(path) || null;
}

/**
 * @param {string} path
 * @param {string} url
 */
function rememberResolvedWikiImageUrl(path: any, url: any) {
  if (!path || !url) return;
  const prev = memoryUrlByPath.get(path);
  if (prev && prev !== url && typeof prev === 'string' && prev.startsWith('blob:')) {
    try {
      URL.revokeObjectURL(prev);
    } catch {
      /* ignore */
    }
  }
  memoryUrlByPath.set(path, url);
}

/**
 * Drop memory entry (and revoke blob URLs) so the next resolve fetches fresh.
 * @param {string} path
 */
function forgetResolvedWikiImageUrl(path: any) {
  if (!path) return;
  const prev = memoryUrlByPath.get(path);
  memoryUrlByPath.delete(path);
  if (prev && typeof prev === 'string' && prev.startsWith('blob:')) {
    try {
      URL.revokeObjectURL(prev);
    } catch {
      /* ignore */
    }
  }
}

/**
 * @param {string} path
 * @param {(path: string) => Promise<string|null>} getPresignedUrl
 * @param {{ skipCache?: boolean }} [opts]
 */
export function resolveWikiImageUrl(
  path: string,
  getPresignedUrl: (path: string) => Promise<string | null>,
  opts: { skipCache?: boolean } = {},
) {
  if (!path) {
    return Promise.resolve(null);
  }
  const trimmed = String(path).trim();
  // Cover / markdown may embed data URIs or remote URLs after single-file export.
  if (/^(https?:|data:|blob:|\/\/)/i.test(trimmed)) {
    return Promise.resolve(trimmed);
  }
  if (typeof getPresignedUrl !== 'function') {
    return Promise.resolve(null);
  }
  const skipCache = opts.skipCache === true;
  if (!skipCache) {
    const mem = memoryUrlByPath.get(trimmed);
    if (mem) return Promise.resolve(mem);
  }

  const inFlightKey = skipCache ? `${trimmed}:refresh` : trimmed;
  if (inFlight.has(inFlightKey)) {
    return inFlight.get(inFlightKey);
  }

  const fetchFresh = () =>
    getPresignedUrl(trimmed).then(async (url: any) => {
      if (!url) return null;
      const mode = getWikiImageCacheMode();
      if (mode === WIKI_IMAGE_CACHE_MODE_URL) {
        const expiresAt = Date.now() + 3600 * 1000;
        await setCachedWikiImageUrl({ path: trimmed, url, expiresAt });
        rememberResolvedWikiImageUrl(trimmed, url);
        return url;
      }
      try {
        const res = await fetch(url);
        if (!res.ok) return null;
        const blob = await res.blob();
        await setCachedWikiImageBlob({ path: trimmed, blob });
        const objectUrl = URL.createObjectURL(blob);
        rememberResolvedWikiImageUrl(trimmed, objectUrl);
        return objectUrl;
      } catch {
        return null;
      }
    });

  const p = skipCache
    ? (async () => {
        forgetResolvedWikiImageUrl(trimmed);
        return fetchFresh();
      })()
    : (async () => {
        const mode = getWikiImageCacheMode();
        if (mode === WIKI_IMAGE_CACHE_MODE_URL) {
          const cachedUrl = await getCachedWikiImageUrl(trimmed);
          if (cachedUrl) {
            rememberResolvedWikiImageUrl(trimmed, cachedUrl);
            return cachedUrl;
          }
          return fetchFresh();
        }
        const mem = memoryUrlByPath.get(trimmed);
        if (mem) return mem;
        const cachedObjectUrl = await getCachedWikiImageObjectUrl(trimmed);
        if (cachedObjectUrl) {
          rememberResolvedWikiImageUrl(trimmed, cachedObjectUrl);
          return cachedObjectUrl;
        }
        return fetchFresh();
      })();

  inFlight.set(inFlightKey, p);
  p.finally(() => {
    inFlight.delete(inFlightKey);
  });
  return p;
}

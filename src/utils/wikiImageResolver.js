/**
 * ![[path]] 위키 이미지용 URL 해석 (캐시 + Pre-signed URL)
 * MarkdownEditor, ExportPDFPage 등에서 공통 사용.
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

/**
 * @param {string} path
 * @param {(path: string) => Promise<string|null>} getPresignedUrl
 * @param {{ skipCache?: boolean }} [opts]
 */
export function resolveWikiImageUrl(path, getPresignedUrl, opts = {}) {
  if (!path || typeof getPresignedUrl !== 'function') {
    return Promise.resolve(null);
  }
  const skipCache = opts.skipCache === true;
  const inFlightKey = skipCache ? `${path}:refresh` : path;
  if (inFlight.has(inFlightKey)) {
    return inFlight.get(inFlightKey);
  }
  const fetchFresh = () =>
    getPresignedUrl(path).then(async (url) => {
      if (!url) return null;
      const mode = getWikiImageCacheMode();
      if (mode === WIKI_IMAGE_CACHE_MODE_URL) {
        const expiresAt = Date.now() + 3600 * 1000;
        await setCachedWikiImageUrl({ path, url, expiresAt });
        return url;
      }
      try {
        const res = await fetch(url);
        if (!res.ok) return null;
        const blob = await res.blob();
        await setCachedWikiImageBlob({ path, blob });
        return URL.createObjectURL(blob);
      } catch {
        return null;
      }
    });

  const p = skipCache
    ? fetchFresh()
    : (async () => {
        const mode = getWikiImageCacheMode();
        if (mode === WIKI_IMAGE_CACHE_MODE_URL) {
          const cachedUrl = await getCachedWikiImageUrl(path);
          if (cachedUrl) return cachedUrl;
          return fetchFresh();
        }
        const cachedObjectUrl = await getCachedWikiImageObjectUrl(path);
        if (cachedObjectUrl) return cachedObjectUrl;
        return fetchFresh();
      })();
  inFlight.set(inFlightKey, p);
  p.finally(() => {
    inFlight.delete(inFlightKey);
  });
  return p;
}

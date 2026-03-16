/**
 * Preview용 위키 이미지 ![[path]] Pre-signed URL 캐시 (IndexedDB)
 * path = S3 Object Key, expiresAt = timestamp
 */
import Dexie from 'dexie';

export const wikiImageCacheDb = new Dexie('s3haim-wiki-image-cache');

wikiImageCacheDb.version(1).stores({
  urls: 'path, expiresAt',
});

const EXPIRE_BUFFER_MS = 60 * 1000;
const DEBUG = true;

/**
 * 유효한 캐시 URL 조회
 * @param {string} path - S3 Object Key
 * @returns {Promise<string|null>}
 */
export async function getCachedWikiImageUrl(path) {
  const record = await wikiImageCacheDb.urls.where('path').equals(path).first();
  if (!record) {
    if (DEBUG) console.log('[wiki-image] getCachedWikiImageUrl: no record', { path });
    return null;
  }
  if (record.expiresAt <= Date.now() + EXPIRE_BUFFER_MS) {
    if (DEBUG) console.log('[wiki-image] getCachedWikiImageUrl: expired', { path, expiresAt: record.expiresAt });
    return null;
  }
  if (DEBUG) console.log('[wiki-image] getCachedWikiImageUrl: hit', { path });
  return record.url;
}

/**
 * Pre-signed URL 캐시 저장
 * @param {{ path: string, url: string, expiresAt: number }} params
 */
export async function setCachedWikiImageUrl({ path, url, expiresAt }) {
  await wikiImageCacheDb.urls.put({ path, url, expiresAt });
  if (DEBUG) console.log('[wiki-image] setCachedWikiImageUrl', { path, expiresAt });
}

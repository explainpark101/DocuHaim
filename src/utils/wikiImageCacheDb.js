/**
 * Preview용 위키 이미지 ![[path]] Blob 캐시 (IndexedDB)
 * - path = S3 Object Key
 * - Blob 자체를 저장하고, 꺼낼 때마다 Object URL을 생성한다.
 */
import Dexie from 'dexie';

export const wikiImageCacheDb = new Dexie('s3haim-wiki-image-cache');

// v1: urls(path, expiresAt, url) — Pre-signed URL 캐시
wikiImageCacheDb.version(1).stores({
  urls: 'path, expiresAt',
});

// v2: blobs(path, createdAt, blob) — 실제 이미지 Blob 캐시
wikiImageCacheDb
  .version(2)
  .stores({
    blobs: 'path, createdAt',
  });

const DEBUG = false;

/**
 * Blob 캐시에서 Object URL 반환
 * @param {string} path - S3 Object Key
 * @returns {Promise<string|null>} object URL (예: blob:https://...)
 */
export async function getCachedWikiImageObjectUrl(path) {
  const table = wikiImageCacheDb.table('blobs');
  const record = await table.where('path').equals(path).first();
  if (!record || !record.blob) {
    if (DEBUG) console.log('[wiki-image] getCachedWikiImageObjectUrl: no record', { path });
    return null;
  }
  const url = URL.createObjectURL(record.blob);
  if (DEBUG) console.log('[wiki-image] getCachedWikiImageObjectUrl: hit', { path });
  return url;
}

/**
 * Blob 캐시 저장
 * @param {{ path: string, blob: Blob }} params
 */
export async function setCachedWikiImageBlob({ path, blob }) {
  const table = wikiImageCacheDb.table('blobs');
  await table.put({ path, blob, createdAt: Date.now() });
  if (DEBUG) console.log('[wiki-image] setCachedWikiImageBlob', { path });
}

/**
 * Pre-signed URL 캐시용 타입
 * @typedef {{ path: string, url: string, expiresAt: number }} WikiImageUrlCacheItem
 */

/**
 * Pre-signed URL 캐시에서 유효한 URL 조회
 * @param {string} path
 * @returns {Promise<string|null>}
 */
export async function getCachedWikiImageUrl(path) {
  const table = wikiImageCacheDb.table('urls');
  const record = /** @type {WikiImageUrlCacheItem|null} */ (await table.where('path').equals(path).first());
  if (!record) {
    if (DEBUG) console.log('[wiki-image] getCachedWikiImageUrl: no record', { path });
    return null;
  }
  const now = Date.now();
  if (record.expiresAt <= now) {
    if (DEBUG) console.log('[wiki-image] getCachedWikiImageUrl: expired', { path, expiresAt: record.expiresAt, now });
    return null;
  }
  if (DEBUG) console.log('[wiki-image] getCachedWikiImageUrl: hit', { path });
  return record.url;
}

/**
 * Pre-signed URL 캐시 저장
 * @param {WikiImageUrlCacheItem} item
 */
export async function setCachedWikiImageUrl(item) {
  const table = wikiImageCacheDb.table('urls');
  await table.put(item);
  if (DEBUG) console.log('[wiki-image] setCachedWikiImageUrl', { path: item.path, expiresAt: item.expiresAt });
}

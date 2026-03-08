/**
 * md 에디터 전환 시 임시 초안 저장 (IndexedDB)
 * - 전환 전: IndexedDB에 먼저 저장 후 서버 저장
 * - 다시 열 때: IndexedDB 내용 우선, 서버가 더 최신이면 alert로 확인
 * - 동기화 완료 후: IndexedDB 항목 삭제
 */
import Dexie from 'dexie';

export const memoDraftsDb = new Dexie('s3haim-memo-drafts');

memoDraftsDb.version(1).stores({
  drafts: 'key, originalLastModified, savedAt',
});

/**
 * @param {string} storageType - 's3' | 'local'
 * @param {string} path - 파일 경로 (S3 key 또는 로컬 path)
 * @returns {string}
 */
export function getDraftKey(storageType, path) {
  return `${storageType}:${path}`;
}

/**
 * @typedef {Object} MemoDraft
 * @property {string} key
 * @property {string} content
 * @property {number} originalLastModified - 로드 시점의 서버/파일 lastModified (timestamp)
 * @property {number} savedAt
 */

/**
 * 초안 저장
 * @param {Object} params
 * @param {string} params.key - getDraftKey(storageType, path)
 * @param {string} params.content
 * @param {number} params.originalLastModified - 원본 lastModified (Date.getTime() 또는 timestamp)
 */
export async function saveMemoDraft({ key, content, originalLastModified }) {
  const record = {
    key,
    content: content ?? '',
    originalLastModified: originalLastModified ?? 0,
    savedAt: Date.now(),
  };
  await memoDraftsDb.drafts.put(record);
}

/**
 * 초안 조회
 * @param {string} key
 * @returns {Promise<MemoDraft|null>}
 */
export async function getMemoDraft(key) {
  const record = await memoDraftsDb.drafts.where('key').equals(key).first();
  return record ?? null;
}

/**
 * 초안 삭제 (동기화 완료 시)
 * @param {string} key
 */
export async function deleteMemoDraft(key) {
  await memoDraftsDb.drafts.where('key').equals(key).delete();
}

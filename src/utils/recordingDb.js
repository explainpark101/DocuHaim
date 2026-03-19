/**
 * note-with-recording: IndexedDB (Dexie) 로컬 녹음 데이터 저장
 * 저장 대상: 원본 오디오 Blob, 마크다운 텍스트, 동기화 JSON
 */
import Dexie from 'dexie';

export const db = new Dexie('s3haim-recordings');

db.version(2).stores({
  recordings:
    '++id, noteKey, createdAt, status, nextAttemptAt',
});

/**
 * @typedef {Object} RecordingRecord
 * @property {number} [id]
 * @property {string} noteKey - S3 경로 (예: notes/회의록.md)
 * @property {Blob} audioBlob - 원본 webm/opus Blob
 * @property {string} markdown - 녹음 시점 마크다운
 * @property {Array<{time: number, line: number, text: string}>} syncData - 필기 트래킹
 * @property {number} createdAt - timestamp
 * @property {number} recordingTs - 녹음/저장 기준 timestamp (S3 키 고정용)
 * @property {'pending'|'encoding'|'uploading'|'uploaded'|'failed'} status
 * @property {number} [attempts]
 * @property {number} [lastAttemptAt]
 * @property {number} [nextAttemptAt]
 * @property {string} [audioKey]
 * @property {string} [syncKey]
 * @property {string} [error]
 */

/**
 * 녹음 데이터를 IndexedDB에 저장
 * @param {Object} params
 * @param {string} params.noteKey
 * @param {Blob} params.audioBlob
 * @param {string} params.markdown
 * @param {Array<{time: number, line: number, text: string}>} params.syncData
 * @returns {Promise<number>} id
 */
export async function saveRecording({ noteKey, audioBlob, markdown, syncData }) {
  const now = Date.now();
  return db.recordings.add({
    noteKey,
    audioBlob,
    markdown: markdown ?? '',
    syncData: syncData ?? [],
    createdAt: now,
    recordingTs: now,
    status: 'pending',
    attempts: 0,
    lastAttemptAt: null,
    nextAttemptAt: now,
    audioKey: null,
    syncKey: null,
  });
}

/**
 * noteKey로 대기 중인 녹음 조회
 * @param {string} noteKey
 * @returns {Promise<RecordingRecord|null>}
 */
export async function getPendingRecording(noteKey) {
  const list = await db.recordings
    .where('noteKey')
    .equals(noteKey)
    .filter((r) => r.status === 'pending')
    .limit(1)
    .toArray();
  return list[0] ?? null;
}

/**
 * 업로드 대기/실패 녹음 목록 조회 (nextAttemptAt 기준)
 * @param {Object} [params]
 * @param {number} [params.now]
 * @param {number} [params.limit]
 * @returns {Promise<RecordingRecord[]>}
 */
export async function listUploadableRecordings(params = {}) {
  const now = params.now ?? Date.now();
  const limit = params.limit ?? 10;
  const list = await db.recordings
    .where('status')
    .anyOf(['pending', 'failed'])
    .filter((r) => r.nextAttemptAt == null || r.nextAttemptAt <= now)
    .toArray();
  return list
    .sort((a, b) => (a.nextAttemptAt ?? 0) - (b.nextAttemptAt ?? 0))
    .slice(0, limit);
}

/**
 * ID로 녹음 조회
 * @param {number} id
 * @returns {Promise<RecordingRecord|null>}
 */
export async function getRecordingById(id) {
  const r = await db.recordings.get(id);
  return r ?? null;
}

/**
 * 녹음 상태 업데이트
 * @param {number} id
 * @param {Partial<RecordingRecord>} updates
 */
export async function updateRecordingStatus(id, updates) {
  return db.recordings.update(id, updates);
}

/**
 * noteKey에 해당하는 업로드 완료 녹음 삭제 (중복 방지용)
 * @param {string} noteKey
 */
export async function deleteRecordingsByNoteKey(noteKey) {
  return db.recordings.where('noteKey').equals(noteKey).delete();
}

/**
 * 녹음 1건 삭제 (업로드 성공 후 원본 정리)
 * @param {number} id
 */
export async function deleteRecordingById(id) {
  return db.recordings.delete(id);
}

/**
 * 녹음 업로드 큐 통계
 * @returns {Promise<{ pending: number, uploading: number, failed: number }>}
 */
export async function getRecordingQueueStats() {
  const [pending, uploading, failed] = await Promise.all([
    db.recordings.where('status').equals('pending').count(),
    db.recordings.where('status').equals('uploading').count(),
    db.recordings.where('status').equals('failed').count(),
  ]);
  return { pending, uploading, failed };
}

/**
 * note-with-recording: IndexedDB (Dexie) 로컬 녹음 데이터 저장
 * 저장 대상: 원본 오디오 Blob, 마크다운 텍스트, 동기화 JSON
 */
import Dexie from 'dexie';

export const db = new Dexie('s3haim-recordings') as any;

db.version(3).stores({
  recordings:
    '++id, noteKey, createdAt, status, nextAttemptAt',
  fragments:
    '++id, recordingId, chunkIndex',
});

// v4: 오디오를 별도 스토어에 ArrayBuffer로 저장 (Safari stale Blob 업데이트 오류 방지)
db.version(4).stores({
  recordings:
    '++id, noteKey, createdAt, status, nextAttemptAt',
  recordingAudio: 'recordingId',
  fragments:
    '++id, recordingId, chunkIndex',
}).upgrade(async (tx: any) => {
  const rows = await tx.table('recordings').toArray();
  for (const row of rows) {
    if (row.id == null || !row.audioBlob) continue;
    try {
      const audioBuffer = await row.audioBlob.arrayBuffer();
      await tx.table('recordingAudio').put({
        recordingId: row.id,
        audioBuffer,
        audioMimeType: row.audioBlob.type || 'audio/webm',
      });
      const { audioBlob: _removed, ...meta } = row;
      await tx.table('recordings').put(meta);
    } catch (_) {
      // stale blob — 업로드 실패 시 사용자가 재녹음 필요
    }
  }
});

/**
 * @typedef {Object} RecordingRecord
 * @property {number} [id]
 * @property {string} noteKey - S3 경로 (예: notes/회의록.md)
 * @property {Blob} [audioBlob] - 런타임 조회 시 recordingAudio에서 복원
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
async function persistRecordingAudio(recordingId: any, audioBlob: any) {
  const audioBuffer = await audioBlob.arrayBuffer();
  await db.recordingAudio.put({
    recordingId,
    audioBuffer,
    audioMimeType: audioBlob.type || 'audio/webm',
  });
}

async function attachAudioBlob(record: any) {
  if (!record) return null;
  if (record.audioBlob instanceof Blob) return record;
  const audio = await db.recordingAudio.get(record.id);
  if (!audio?.audioBuffer) return record;
  return {
    ...record,
    audioBlob: new Blob([audio.audioBuffer], {
      type: audio.audioMimeType || 'audio/webm',
    }),
  };
}

export async function saveRecording({
  noteKey,
  audioBlob,
  markdown,
  syncData
}: any) {
  const now = Date.now();
  const id = await db.recordings.add({
    noteKey,
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
  await persistRecordingAudio(id, audioBlob);
  return id;
}

/**
 * noteKey로 대기 중인 녹음 조회
 * @param {string} noteKey
 * @returns {Promise<RecordingRecord|null>}
 */
export async function getPendingRecording(noteKey: any) {
  const list = await db.recordings
    .where('noteKey')
    .equals(noteKey)
    .filter((r: any) => r.status === 'pending')
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
  // @ts-expect-error TS(2339): Property 'now' does not exist on type '{}'.
  const now = params.now ?? Date.now();
  // @ts-expect-error TS(2339): Property 'limit' does not exist on type '{}'.
  const limit = params.limit ?? 10;
  const list = await db.recordings
    .where('status')
    .anyOf(['pending', 'failed'])
    .filter((r: any) => r.nextAttemptAt == null || r.nextAttemptAt <= now)
    .toArray();
  return list
    .sort((a: any, b: any) => (a.nextAttemptAt ?? 0) - (b.nextAttemptAt ?? 0))
    .slice(0, limit);
}

/**
 * ID로 녹음 조회
 * @param {number} id
 * @returns {Promise<RecordingRecord|null>}
 */
export async function getRecordingById(id: any) {
  const r = await db.recordings.get(id);
  if (!r) return null;
  return attachAudioBlob(r);
}

/**
 * 녹음 상태 업데이트
 * @param {number} id
 * @param {Partial<RecordingRecord>} updates
 */
export async function updateRecordingStatus(id: any, updates: any) {
  const row = await db.recordings.get(id);
  if (!row) return 0;
  if (row.audioBlob instanceof Blob) {
    const existingAudio = await db.recordingAudio.get(id);
    if (!existingAudio) {
      try {
        await persistRecordingAudio(id, row.audioBlob);
      } catch (_) {
        // stale blob — 메타만 갱신 시도
      }
    }
    const { audioBlob: _removed, ...meta } = row;
    await db.recordings.put({ ...meta, ...updates });
    return 1;
  }
  return db.recordings.update(id, updates);
}

/**
 * noteKey에 해당하는 업로드 완료 녹음 삭제 (중복 방지용)
 * @param {string} noteKey
 */
export async function deleteRecordingsByNoteKey(noteKey: any) {
  const rows = await db.recordings.where('noteKey').equals(noteKey).toArray();
  await Promise.all(
    rows.map((r: any) => r.id != null ? db.recordingAudio.delete(r.id) : Promise.resolve())
  );
  return db.recordings.where('noteKey').equals(noteKey).delete();
}

/**
 * 녹음 1건 삭제 (업로드 성공 후 원본 정리)
 * @param {number} id
 */
export async function deleteRecordingById(id: any) {
  await db.recordingAudio.delete(id);
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

/**
 * @typedef {Object} RecordingFragment
 * @property {number} [id]
 * @property {number} recordingId - 녹음 record id
 * @property {number} chunkIndex - 청크 순서
 * @property {Blob} data - 오디오 청크 데이터
 * @property {number} createdAt - 저장 시각
 */

/**
 * 녹음 중 오디오 청크를 fragment로 저장
 * @param {number} recordingId
 * @param {number} chunkIndex
 * @param {Blob} chunk
 * @returns {Promise<number>}
 */
export async function saveRecordingFragment(recordingId: any, chunkIndex: any, chunk: any) {
  const data = await chunk.arrayBuffer();
  return db.fragments.add({
    recordingId,
    chunkIndex,
    data,
    mimeType: chunk.type || 'audio/webm',
    createdAt: Date.now(),
  });
}

/**
 * 녹음에 대한 모든 fragment 조회
 * @param {number} recordingId
 * @returns {Promise<RecordingFragment[]>}
 */
export async function getRecordingFragments(recordingId: any) {
  return db.fragments
    .where('recordingId')
    .equals(recordingId)
    .sortBy('chunkIndex');
}

/**
 * 녹음의 모든 fragment 삭제
 * @param {number} recordingId
 */
export async function deleteRecordingFragments(recordingId: any) {
  return db.fragments.where('recordingId').equals(recordingId).delete();
}

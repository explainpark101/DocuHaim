/**
 * note-with-recording: encode + write audio/sync via injectable writer
 * FFmpeg 없이 MediaRecorder 출력(webm/mp4)을 그대로 저장
 */
import { putObject } from '@/utils/vault/s3Client';
import { updateRecordingStatus } from '@/utils/recording/recordingDb';
import { encodeSyncData } from '@/utils/syncProto';
import { compileSyncData } from '@/utils/compileSyncData';

/**
 * mimeType으로 확장자 결정
 */
function getExtensionFromMimeType(mimeType) {
  if (!mimeType || typeof mimeType !== 'string') return 'webm';
  if (mimeType.includes('mp4')) return 'm4a';
  return 'webm';
}

/**
 * noteKey에서 base 경로 추출 (notes/회의록.md → notes/회의록)
 */
export function getNoteBase(noteKey) {
  if (!noteKey || typeof noteKey !== 'string') return '';
  const lastDot = noteKey.lastIndexOf('.');
  return lastDot <= 0 ? noteKey : noteKey.slice(0, lastDot);
}

/**
 * noteKey + mimeType + timestamp → 고유 오디오 키 (여러 녹음 지원)
 * @param {string} noteKey - 예: notes/회의록.md
 * @param {string} [mimeType] - audioBlob.type
 * @param {number} [timestamp] - Date.now(), 없으면 단일 녹음용 (하위 호환)
 */
export function getAudioKey(noteKey, mimeType, timestamp) {
  if (!noteKey || typeof noteKey !== 'string') return null;
  const ext = getExtensionFromMimeType(mimeType);
  const base = getNoteBase(noteKey);
  if (timestamp != null) {
    return `${base}-rec-${timestamp}.${ext}`;
  }
  return `${base}.${ext}`;
}

/**
 * noteKey에 해당하는 녹음 키의 sync Protobuf 키
 */
export function getSyncKeyForRecording(audioKey) {
  if (!audioKey || typeof audioKey !== 'string') return null;
  const lastDot = audioKey.lastIndexOf('.');
  if (lastDot <= 0) return null;
  return audioKey.slice(0, lastDot) + '.sync.pb';
}

/** @deprecated 하위 호환 - getRecordingKeysFromTree 사용 권장 */
export function getAudioKeyCandidates() {
  return [];
}

/**
 * noteKey → 동기화 Protobuf 키 (녹음별)
 */
export function getSyncKey(noteKey, timestamp) {
  if (!noteKey || typeof noteKey !== 'string') return null;
  const base = getNoteBase(noteKey);
  if (timestamp != null) {
    return `${base}-rec-${timestamp}.sync.pb`;
  }
  return `${base}.sync.pb`;
}

/**
 * @param {Object} params
 * @param {Object} params.recording - { audioBlob, syncData, noteKey }
 * @param {(args: { key: string, body: Uint8Array, contentType: string }) => Promise<void>} params.writeObject
 * @param {number} [params.recordId]
 * @param {(msg: string) => void} [params.onStatus]
 * @param {number} [params.timestamp]
 */
export async function runEncodeAndWritePipeline({
  recording,
  writeObject,
  recordId,
  onStatus,
  timestamp,
}) {
  const { audioBlob, syncData, noteKey } = recording;
  const fixedTs =
    timestamp ??
    recording?.recordingTs ??
    recording?.createdAt ??
    Date.now();
  const audioKey = getAudioKey(noteKey, audioBlob?.type, fixedTs);
  const syncKey = getSyncKey(noteKey, fixedTs);

  if (!audioKey) throw new Error('유효한 noteKey가 필요합니다.');
  if (typeof writeObject !== 'function') {
    throw new Error('writeObject is required');
  }

  onStatus?.('업로드 중');

  if (recordId) {
    await updateRecordingStatus(recordId, { status: 'uploading' });
  }

  const contentType = audioBlob?.type?.includes('mp4') ? 'audio/mp4' : 'audio/webm';
  const body = new Uint8Array(await audioBlob.arrayBuffer());

  await writeObject({ key: audioKey, body, contentType });

  if (syncKey && syncData?.length > 0) {
    const compiled = compileSyncData(syncData);
    const syncBody = encodeSyncData(compiled);
    await writeObject({
      key: syncKey,
      body: syncBody,
      contentType: 'application/x-protobuf',
    });
  }

  if (recordId) {
    await updateRecordingStatus(recordId, { status: 'uploaded' });
  }

  onStatus?.('완료');
  return { audioKey, syncKey };
}

/**
 * 녹음 결과를 S3에 업로드 (인코딩 없음) — backward-compatible wrapper
 * @param {Object} params
 * @param {Object} params.recording - { audioBlob, syncData, noteKey }
 * @param {import('@aws-sdk/client-s3').S3Client} params.client
 * @param {string} params.bucket
 * @param {number} [params.recordId] - IndexedDB id (상태 업데이트용)
 * @param {(msg: string) => void} [params.onStatus]
 */
export async function runEncodeAndUploadPipeline({
  recording,
  client,
  bucket,
  recordId,
  onStatus,
  timestamp,
}) {
  if (!client || !bucket) throw new Error('S3 client and bucket are required');
  return runEncodeAndWritePipeline({
    recording,
    recordId,
    onStatus,
    timestamp,
    writeObject: async ({ key, body, contentType }) => {
      await putObject(client, {
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
      });
    },
  });
}

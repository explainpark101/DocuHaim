import { runEncodeAndUploadPipeline } from './recordingPipeline';
import {
  deleteRecordingById,
  getRecordingById,
  listUploadableRecordings,
  updateRecordingStatus,
  deleteRecordingFragments,
} from './recordingDb';

const DEFAULT_MAX_PER_DRAIN = 5;

let drainingPromise = null;

function computeBackoffMs(attempts) {
  const base = 2000;
  const cap = 5 * 60 * 1000;
  const exp = Math.min(cap, base * 2 ** Math.min(10, Math.max(0, attempts)));
  const jitter = Math.floor(Math.random() * 500);
  return exp + jitter;
}

/**
 * IndexedDB에 저장된 녹음을 S3로 업로드 시도 (성공할 때까지 재시도 기반)
 * - pending/failed 중 nextAttemptAt <= now 인 항목만 처리
 * - 성공 시 IndexedDB 원본 삭제
 *
 * @param {Object} params
 * @param {import('@aws-sdk/client-s3').S3Client} params.client
 * @param {string} params.bucket
 * @param {number} [params.maxPerDrain]
 * @param {(msg: string) => void} [params.onStatus]
 */
export async function drainRecordingUploadQueue({
  client,
  bucket,
  maxPerDrain = DEFAULT_MAX_PER_DRAIN,
  onStatus,
}) {
  if (!client || !bucket) return { processed: 0 };

  if (drainingPromise) return drainingPromise;

  drainingPromise = (async () => {
    let processed = 0;
    const now = Date.now();
    const candidates = await listUploadableRecordings({ now, limit: maxPerDrain });

    for (const item of candidates) {
      const id = item.id;
      if (!id) continue;

      const fresh = await getRecordingById(id);
      if (!fresh) continue;
      if (!(fresh.status === 'pending' || fresh.status === 'failed')) continue;

      const attempts = fresh.attempts ?? 0;
      await updateRecordingStatus(id, {
        status: 'uploading',
        lastAttemptAt: Date.now(),
        error: null,
      });

      try {
        onStatus?.('업로드 중');
        const result = await runEncodeAndUploadPipeline({
          recording: fresh,
          client,
          bucket,
          recordId: id,
          onStatus,
          timestamp: fresh.recordingTs ?? fresh.createdAt,
        });

        await updateRecordingStatus(id, {
          status: 'uploaded',
          audioKey: result.audioKey ?? null,
          syncKey: result.syncKey ?? null,
          nextAttemptAt: null,
        });

        await deleteRecordingFragments(id);
        await deleteRecordingById(id);
        processed += 1;
      } catch (e) {
        const nextAttempts = attempts + 1;
        const nextAttemptAt = Date.now() + computeBackoffMs(nextAttempts);
        await updateRecordingStatus(id, {
          status: 'failed',
          attempts: nextAttempts,
          nextAttemptAt,
          error: e?.message ? String(e.message) : String(e),
        });
      }
    }

    return { processed };
  })();

  try {
    return await drainingPromise;
  } finally {
    drainingPromise = null;
  }
}


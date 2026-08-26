import { runEncodeAndWritePipeline } from '@/utils/recording/recordingPipeline';
import { putObject } from '@/utils/s3Client';
import {
  deleteRecordingById,
  getRecordingById,
  listUploadableRecordings,
  updateRecordingStatus,
  deleteRecordingFragments,
} from '@/utils/recording/recordingDb';

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
 * Drain IndexedDB recordings via injectable writeObject (remote) or S3 client/bucket.
 *
 * @param {Object} params
 * @param {(args: { key: string, body: Uint8Array, contentType: string }) => Promise<void>} [params.writeObject]
 * @param {import('@aws-sdk/client-s3').S3Client} [params.client]
 * @param {string} [params.bucket]
 * @param {number} [params.maxPerDrain]
 * @param {(msg: string) => void} [params.onStatus]
 */
export async function drainRecordingUploadQueue({
  writeObject,
  client,
  bucket,
  maxPerDrain = DEFAULT_MAX_PER_DRAIN,
  onStatus,
}) {
  const effectiveWriter =
    typeof writeObject === 'function'
      ? writeObject
      : client && bucket
        ? async ({ key, body, contentType }) => {
            await putObject(client, {
              Bucket: bucket,
              Key: key,
              Body: body,
              ContentType: contentType,
            });
          }
        : null;

  if (!effectiveWriter) return { processed: 0 };

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
        const result = await runEncodeAndWritePipeline({
          recording: fresh,
          writeObject: effectiveWriter,
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

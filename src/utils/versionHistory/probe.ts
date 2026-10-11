import {
  getBucketVersioningStatus,
} from '@/utils/vault/s3Client';
import type { VersionHistoryContext, VersionHistoryMode } from '@/utils/versionHistory/types';

type CacheEntry = { mode: VersionHistoryMode; at: number };

const cacheByScope = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 5 * 60 * 1000;

function scopeKey(ctx: VersionHistoryContext): string {
  const mode = ctx.storageMode || 'unknown';
  const bucket = ctx.s3?.bucket || '';
  return `${mode}:${bucket}`;
}

export function clearVersionHistoryProbeCache(): void {
  cacheByScope.clear();
}

/**
 * Resolve whether this vault uses S3 native object versions or app snapshots.
 */
export async function resolveVersionHistoryMode(
  ctx: VersionHistoryContext,
  options: { force?: boolean } = {},
): Promise<VersionHistoryMode> {
  const key = scopeKey(ctx);
  const cached = cacheByScope.get(key);
  if (
    !options.force &&
    cached &&
    Date.now() - cached.at < CACHE_TTL_MS
  ) {
    return cached.mode;
  }

  let mode: VersionHistoryMode = 'app';

  if (ctx.storageMode === 's3' && ctx.s3?.getClient && ctx.s3.bucket) {
    const client = ctx.s3.getClient();
    if (client) {
      try {
        const status = await getBucketVersioningStatus(
          client as Parameters<typeof getBucketVersioningStatus>[0],
          ctx.s3.bucket,
        );
        mode = status === 'Enabled' ? 'native' : 'app';
      } catch (e: unknown) {
        const err = e as { name?: string; Code?: string; $metadata?: { httpStatusCode?: number } };
        const status = err?.$metadata?.httpStatusCode;
        const name = err?.name || err?.Code || '';
        if (
          status === 403 ||
          status === 401 ||
          status === 501 ||
          /AccessDenied|NotImplemented|MethodNotAllowed/i.test(String(name))
        ) {
          mode = 'app';
        } else {
          // Transient errors: prefer app snapshots so history is not lost.
          mode = 'app';
        }
      }
    }
  }

  cacheByScope.set(key, { mode, at: Date.now() });
  return mode;
}

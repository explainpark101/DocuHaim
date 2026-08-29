/**
 * Shared in-flight claims for Advanced Search indexing.
 *
 * Rebuild workers pull distinct paths from a shared queue (`runClaimedWorkQueue`).
 * Path locks serialize rebuild vs incremental notify. A global write lock protects
 * Lucivy + in-memory docIdMap mutations. Prep workers coalesce identical bodies.
 */

import { chatDateFromPath } from '@/utils/advancedSearch/collectSources';

const pathTailByKey = new Map<string, Promise<void>>();

export function fileIndexClaimKey(path: string): string {
  return `file:${String(path || '').replace(/^\/+/, '')}`;
}

/** Normalize chat day path or YYYY-MM-DD to one claim key. */
export function chatIndexClaimKey(dateStrOrPath: string): string {
  const raw = String(dateStrOrPath || '').replace(/^\/+/, '');
  const date =
    chatDateFromPath(raw) ||
    (/^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw : raw);
  return `chat:${date}`;
}

/** True while any exclusive job holds this key (or is queued behind it). */
export function isIndexPathBusy(key: string): boolean {
  return pathTailByKey.has(key);
}

/**
 * Run `fn` exclusively for `key`. Same-key callers serialize; different keys
 * run in parallel. Failures do not break the chain for later waiters.
 */
export async function withIndexPathLock<T>(
  key: string,
  fn: () => Promise<T>,
): Promise<T> {
  const prev = pathTailByKey.get(key) ?? Promise.resolve();
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  const next = prev.then(
    () => gate,
    () => gate,
  );
  pathTailByKey.set(key, next);

  await prev.then(
    () => undefined,
    () => undefined,
  );
  try {
    return await fn();
  } finally {
    release();
    if (pathTailByKey.get(key) === next) {
      pathTailByKey.delete(key);
    }
  }
}

/** Serialize Lucivy / DocIdMap / docs Map mutations across parallel rebuild workers. */
let writeTail: Promise<void> = Promise.resolve();

export async function withIndexWriteLock<T>(fn: () => Promise<T>): Promise<T> {
  const prev = writeTail;
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  writeTail = prev.then(
    () => gate,
    () => gate,
  );
  await prev.then(
    () => undefined,
    () => undefined,
  );
  try {
    return await fn();
  } finally {
    release();
  }
}

/**
 * Bounded worker pool: each worker claims the next unclaimed item (by key).
 * Duplicate keys in `items` are skipped after the first claim — no two workers
 * process the same path. Claim is synchronous so JS tasks cannot race.
 *
 * `shouldStop` (e.g. rebuild cancel) prevents new claims; in-flight work should
 * also exit ASAP via its own cancel checks.
 */
export async function runClaimedWorkQueue<T>(
  items: readonly T[],
  concurrency: number,
  keyOf: (item: T) => string,
  fn: (item: T, claimOrdinal: number) => Promise<void>,
  options?: {
    shouldStop?: () => boolean;
    /** Fired once when claiming stops because `shouldStop` became true. */
    onStopClaiming?: () => void;
  },
): Promise<void> {
  const n = items.length;
  if (n === 0) return;

  const claimedKeys = new Set<string>();
  let cursor = 0;
  let ordinal = 0;
  let stop = false;
  let stopClaimNotified = false;

  const stopped = () => stop || Boolean(options?.shouldStop?.());

  const notifyStopClaiming = () => {
    if (stopClaimNotified) return;
    if (!options?.shouldStop?.()) return;
    stopClaimNotified = true;
    try {
      options.onStopClaiming?.();
    } catch {
      // ignore
    }
  };

  const claimNext = (): { item: T; ordinal: number } | null => {
    if (stopped()) {
      notifyStopClaiming();
      return null;
    }
    while (cursor < n) {
      const item = items[cursor] as T;
      cursor += 1;
      const key = keyOf(item);
      if (claimedKeys.has(key)) continue;
      claimedKeys.add(key);
      ordinal += 1;
      return { item, ordinal };
    }
    return null;
  };

  const limit = Math.max(1, Math.min(concurrency, n));
  const worker = async () => {
    while (true) {
      if (stopped()) {
        notifyStopClaiming();
        return;
      }
      const claimed = claimNext();
      if (!claimed) return;
      try {
        await fn(claimed.item, claimed.ordinal);
      } catch (err) {
        stop = true;
        notifyStopClaiming();
        throw err;
      }
    }
  };

  const results = await Promise.allSettled(
    Array.from({ length: limit }, () => worker()),
  );
  const firstReject = results.find(
    (r): r is PromiseRejectedResult => r.status === 'rejected',
  );
  if (firstReject) throw firstReject.reason;
}

/**
 * Coalesce identical in-flight prepare jobs (same key) onto one Promise.
 * Different content for the same path should use withIndexPathLock instead.
 */
const coalesceByKey = new Map<string, Promise<unknown>>();

export async function coalesceIndexWork<T>(
  key: string,
  fn: () => Promise<T>,
): Promise<T> {
  const existing = coalesceByKey.get(key);
  if (existing) return existing as Promise<T>;
  const run = fn().finally(() => {
    if (coalesceByKey.get(key) === run) {
      coalesceByKey.delete(key);
    }
  });
  coalesceByKey.set(key, run);
  return run;
}

/** Bounded concurrency helpers for Advanced Search index rebuild. */

/**
 * Run `fn` over `items` with up to `concurrency` in-flight promises.
 * Preserves result order matching `items`. Prefer `runClaimedWorkQueue`
 * when each item must be owned by exactly one worker (path dedupe).
 */
export async function mapPool<T, R>(
  items: readonly T[],
  concurrency: number,
  fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const n = items.length;
  if (n === 0) return [];
  const limit = Math.max(1, Math.min(concurrency, n));
  const results = new Array<R>(n);
  let next = 0;

  const worker = async () => {
    while (true) {
      const i = next;
      next += 1;
      if (i >= n) return;
      results[i] = await fn(items[i] as T, i);
    }
  };

  await Promise.all(Array.from({ length: limit }, () => worker()));
  return results;
}

/** Prefer hardware concurrency; cap so we do not overwhelm S3/WebDAV. */
export function indexRebuildConcurrency(): number {
  const hw =
    typeof navigator !== 'undefined' && navigator.hardwareConcurrency
      ? navigator.hardwareConcurrency
      : 4;
  return Math.min(8, Math.max(2, hw));
}

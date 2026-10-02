/**
 * Helpers for queuing folder-scoped inverted-index rebuilds.
 * Engine.rebuild rejects while building, so the Settings coverage UI
 * enqueues paths and starts the next job when idle.
 */

/** Normalize vault-relative folder path for queue identity. */
export function normalizeFolderIndexPath(path: string): string {
  return String(path || '')
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')
    .replace(/\/+$/, '');
}

/**
 * Append a folder path if not already active or queued.
 * Returns the next queue (same reference when unchanged).
 */
export function enqueueFolderIndexPath(
  queue: readonly string[],
  path: string,
  activePath: string | null = null,
): string[] {
  const nextPath = normalizeFolderIndexPath(path);
  if (!nextPath) return queue.slice();
  const active = activePath ? normalizeFolderIndexPath(activePath) : null;
  if (active && active === nextPath) return queue.slice();
  if (queue.some((p) => normalizeFolderIndexPath(p) === nextPath)) {
    return queue.slice();
  }
  return [...queue, nextPath];
}

/** Remove one path from the queue (normalized match). */
export function removeFolderIndexPath(
  queue: readonly string[],
  path: string,
): string[] {
  const target = normalizeFolderIndexPath(path);
  return queue.filter((p) => normalizeFolderIndexPath(p) !== target);
}

export type FolderIndexRowTone = 'idle' | 'queued' | 'active';

export function folderIndexRowTone(
  path: string,
  activePath: string | null,
  queue: readonly string[],
): FolderIndexRowTone {
  const n = normalizeFolderIndexPath(path);
  if (activePath && normalizeFolderIndexPath(activePath) === n) return 'active';
  if (queue.some((p) => normalizeFolderIndexPath(p) === n)) return 'queued';
  return 'idle';
}

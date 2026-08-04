/**
 * Trash emptying filters and helpers.
 */

export type EmptyTrashMode = 'zeroByte' | 'largerThan' | 'smallerThan' | 'all';

export type EmptyTrashSizeUnit = 'B' | 'KB' | 'MB' | 'GB';

export type EmptyTrashOptions = {
  mode: EmptyTrashMode;
  /** Used when mode is largerThan / smallerThan */
  thresholdValue?: number;
  thresholdUnit?: EmptyTrashSizeUnit;
};

export type TrashFileEntry = {
  path: string;
  name: string;
  size: number | null;
  /** When true, entry is a directory (only removed in `all` mode). */
  isFolder?: boolean;
};

const UNIT_MULTIPLIER: Record<EmptyTrashSizeUnit, number> = {
  B: 1,
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
};

export function thresholdToBytes(
  value: number | null | undefined,
  unit: EmptyTrashSizeUnit = 'MB',
): number {
  const n = typeof value === 'number' && Number.isFinite(value) ? value : 0;
  return Math.max(0, n) * (UNIT_MULTIPLIER[unit] ?? UNIT_MULTIPLIER.MB);
}

export function matchesEmptyTrashFilter(
  entry: TrashFileEntry,
  options: EmptyTrashOptions,
): boolean {
  if (options.mode === 'all') return true;
  if (entry.isFolder) return false;
  if (typeof entry.size !== 'number' || !Number.isFinite(entry.size)) return false;

  const threshold = thresholdToBytes(options.thresholdValue, options.thresholdUnit ?? 'MB');
  if (options.mode === 'zeroByte') return entry.size === 0;
  if (options.mode === 'largerThan') return entry.size > threshold;
  if (options.mode === 'smallerThan') return entry.size < threshold;
  return false;
}

export function filterTrashEntries(
  entries: TrashFileEntry[],
  options: EmptyTrashOptions,
): TrashFileEntry[] {
  return entries.filter((entry) => matchesEmptyTrashFilter(entry, options));
}

/** Skip the trash root marker itself. */
export function isTrashRootKey(path: string | null | undefined): boolean {
  if (!path) return false;
  const normalized = path.replace(/^\/+/, '').replace(/\/+$/, '');
  return normalized === '.trash';
}

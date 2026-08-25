export type TreeModifiedDateLevel = 'full' | 'noSeconds' | 'dateOnly' | 'compact';

export const TREE_MODIFIED_DATE_LEVELS: readonly TreeModifiedDateLevel[] = [
  'full',
  'noSeconds',
  'dateOnly',
  'compact',
] as const;

export function toTreeModifiedDate(value: unknown): Date | null {
  if (value == null) return null;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }
  const parsed = new Date(value as string | number);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

function dateParts(date: Date): { yy: string; MM: string; dd: string; hh: string; mm: string; ss: string } {
  return {
    yy: String(date.getFullYear()).slice(-2),
    MM: pad2(date.getMonth() + 1),
    dd: pad2(date.getDate()),
    hh: pad2(date.getHours()),
    mm: pad2(date.getMinutes()),
    ss: pad2(date.getSeconds()),
  };
}

/**
 * Formats a tree file modified timestamp for sidebar display.
 * Levels truncate as: full -> noSeconds -> dateOnly -> compact (relative years).
 */
export function formatTreeNodeModifiedDate(
  date: Date,
  level: TreeModifiedDateLevel,
  now: Date = new Date(),
): string {
  const { yy, MM, dd, hh, mm, ss } = dateParts(date);

  if (level === 'full') return `${yy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
  if (level === 'noSeconds') return `${yy}-${MM}-${dd} ${hh}:${mm}`;
  if (level === 'dateOnly') return `${yy}-${MM}-${dd}`;

  if (date.getFullYear() !== now.getFullYear()) {
    const yearsAgo = now.getFullYear() - date.getFullYear();
    if (yearsAgo > 0) return `${yearsAgo}년전`;
  }
  return `${yy}-${MM}-${dd}`;
}

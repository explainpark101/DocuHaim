import type { HaimTableMerge } from '@/utils/haimTable/types';

export function normalizeMerge(raw: unknown): HaimTableMerge | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  const r = typeof o.r === 'number' ? o.r : Number(o.r);
  const c = typeof o.c === 'number' ? o.c : Number(o.c);
  const colspan = typeof o.colspan === 'number' ? o.colspan : Number(o.colspan ?? 1);
  const rowspan = typeof o.rowspan === 'number' ? o.rowspan : Number(o.rowspan ?? 1);
  if (!Number.isInteger(r) || !Number.isInteger(c) || r < 0 || c < 0) return null;
  if (!Number.isInteger(colspan) || !Number.isInteger(rowspan) || colspan < 1 || rowspan < 1) {
    return null;
  }
  if (colspan === 1 && rowspan === 1) return null;
  return { r, c, colspan, rowspan };
}

export function normalizeMerges(raw: unknown): HaimTableMerge[] {
  if (!Array.isArray(raw)) return [];
  const out: HaimTableMerge[] = [];
  for (const item of raw) {
    const m = normalizeMerge(item);
    if (m) out.push(m);
  }
  return out;
}

/** Map of covered cell keys (not the origin) → true. */
export function coveredCellSet(merges: HaimTableMerge[]): Set<string> {
  const covered = new Set<string>();
  for (const m of merges) {
    for (let dr = 0; dr < m.rowspan; dr += 1) {
      for (let dc = 0; dc < m.colspan; dc += 1) {
        if (dr === 0 && dc === 0) continue;
        covered.add(`${m.r + dr},${m.c + dc}`);
      }
    }
  }
  return covered;
}

export function mergeAt(merges: HaimTableMerge[], r: number, c: number): HaimTableMerge | null {
  return merges.find((m) => m.r === r && m.c === c) ?? null;
}

/** Merge that covers (r,c), including the origin cell. */
export function mergeCoveringCell(
  merges: HaimTableMerge[],
  r: number,
  c: number,
): HaimTableMerge | null {
  for (const m of merges) {
    if (
      r >= m.r
      && r < m.r + m.rowspan
      && c >= m.c
      && c < m.c + m.colspan
    ) {
      return m;
    }
  }
  return null;
}

export function isCovered(merges: HaimTableMerge[], r: number, c: number): boolean {
  return coveredCellSet(merges).has(`${r},${c}`);
}

/**
 * Create a merge from a rectangular selection (inclusive).
 * Origin is top-left. Removes overlapping merges first.
 */
export function mergeSelection(
  merges: HaimTableMerge[],
  r0: number,
  c0: number,
  r1: number,
  c1: number,
): HaimTableMerge[] {
  const top = Math.min(r0, r1);
  const left = Math.min(c0, c1);
  const bottom = Math.max(r0, r1);
  const right = Math.max(c0, c1);
  const rowspan = bottom - top + 1;
  const colspan = right - left + 1;
  if (rowspan === 1 && colspan === 1) return merges;

  const next = merges.filter((m) => {
    const mBottom = m.r + m.rowspan - 1;
    const mRight = m.c + m.colspan - 1;
    return mBottom < top || m.r > bottom || mRight < left || m.c > right;
  });
  next.push({ r: top, c: left, colspan, rowspan });
  return next;
}

/** Unmerge any merge that intersects the selection. */
export function unmergeSelection(
  merges: HaimTableMerge[],
  r0: number,
  c0: number,
  r1: number,
  c1: number,
): HaimTableMerge[] {
  const top = Math.min(r0, r1);
  const left = Math.min(c0, c1);
  const bottom = Math.max(r0, r1);
  const right = Math.max(c0, c1);
  return merges.filter((m) => {
    const mBottom = m.r + m.rowspan - 1;
    const mRight = m.c + m.colspan - 1;
    return mBottom < top || m.r > bottom || mRight < left || m.c > right;
  });
}

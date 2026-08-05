export type RebaseMergeResult =
  | { status: 'clean'; text: string }
  | { status: 'conflict' };

type DiffChunk = {
  kind: 'equal' | 'del' | 'ins';
  lines: string[];
};

type LineChange = {
  baseStart: number;
  baseEnd: number;
  lines: string[];
};

const DP_CELL_LIMIT = 2_000_000;

function splitLines(text: string): string[] {
  return text.split('\n');
}

function joinLines(lines: string[]): string {
  return lines.join('\n');
}

function linesEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function diffLines(a: string[], b: string[]): DiffChunk[] {
  const n = a.length;
  const m = b.length;
  if (n === 0 && m === 0) return [];
  if (n === 0) return [{ kind: 'ins', lines: b.slice() }];
  if (m === 0) return [{ kind: 'del', lines: a.slice() }];

  if (n * m > DP_CELL_LIMIT) {
    if (n === m && a.every((line, i) => line === b[i])) {
      return [{ kind: 'equal', lines: a.slice() }];
    }
    const chunks: DiffChunk[] = [];
    if (n) chunks.push({ kind: 'del', lines: a.slice() });
    if (m) chunks.push({ kind: 'ins', lines: b.slice() });
    return chunks;
  }

  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    const row = dp[i];
    const nextRow = dp[i + 1];
    if (!row || !nextRow) continue;
    for (let j = m - 1; j >= 0; j--) {
      row[j] =
        a[i] === b[j]
          ? (nextRow[j + 1] ?? 0) + 1
          : Math.max(nextRow[j] ?? 0, row[j + 1] ?? 0);
    }
  }

  const chunks: DiffChunk[] = [];
  const push = (kind: DiffChunk['kind'], line: string) => {
    const last = chunks[chunks.length - 1];
    if (last?.kind === kind) last.lines.push(line);
    else chunks.push({ kind, lines: [line] });
  };

  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      push('equal', a[i] ?? '');
      i += 1;
      j += 1;
      continue;
    }
    const down = dp[i + 1]?.[j] ?? 0;
    const right = dp[i]?.[j + 1] ?? 0;
    if (down >= right) {
      push('del', a[i] ?? '');
      i += 1;
    } else {
      push('ins', b[j] ?? '');
      j += 1;
    }
  }
  while (i < n) {
    push('del', a[i] ?? '');
    i += 1;
  }
  while (j < m) {
    push('ins', b[j] ?? '');
    j += 1;
  }
  return chunks;
}

function changesFromDiff(base: string[], side: string[]): LineChange[] {
  const diff = diffLines(base, side);
  const changes: LineChange[] = [];
  let baseIdx = 0;
  let changeStart = 0;
  let deleted: string[] = [];
  let inserted: string[] = [];

  const flush = () => {
    if (deleted.length === 0 && inserted.length === 0) return;
    changes.push({
      baseStart: changeStart,
      baseEnd: changeStart + deleted.length,
      lines: inserted,
    });
    deleted = [];
    inserted = [];
  };

  for (const chunk of diff) {
    if (chunk.kind === 'equal') {
      flush();
      baseIdx += chunk.lines.length;
      changeStart = baseIdx;
      continue;
    }
    if (deleted.length === 0 && inserted.length === 0) changeStart = baseIdx;
    if (chunk.kind === 'del') {
      deleted.push(...chunk.lines);
      baseIdx += chunk.lines.length;
    } else {
      inserted.push(...chunk.lines);
    }
  }
  flush();
  return changes;
}

function changesOverlap(a: LineChange, b: LineChange): boolean {
  const aInsert = a.baseStart === a.baseEnd;
  const bInsert = b.baseStart === b.baseEnd;
  if (aInsert && bInsert) return a.baseStart === b.baseStart;
  return a.baseStart < b.baseEnd && b.baseStart < a.baseEnd;
}

/**
 * Single-commit git rebase / diff3 merge.
 * `base` is the last known disk snapshot, `ours` is the editor, `theirs` is fresh disk.
 */
export function rebaseMergeTexts(base: string, ours: string, theirs: string): RebaseMergeResult {
  if (ours === theirs) return { status: 'clean', text: ours };
  if (ours === base) return { status: 'clean', text: theirs };
  if (theirs === base) return { status: 'clean', text: ours };

  const baseLines = splitLines(base);
  const oursLines = splitLines(ours);
  const theirsLines = splitLines(theirs);
  const oursChanges = changesFromDiff(baseLines, oursLines);
  const theirsChanges = changesFromDiff(baseLines, theirsLines);

  for (const oursChange of oursChanges) {
    for (const theirsChange of theirsChanges) {
      if (!changesOverlap(oursChange, theirsChange)) continue;
      if (
        oursChange.baseStart === theirsChange.baseStart &&
        oursChange.baseEnd === theirsChange.baseEnd &&
        linesEqual(oursChange.lines, theirsChange.lines)
      ) {
        continue;
      }
      return { status: 'conflict' };
    }
  }

  const merged: LineChange[] = [];
  const seen = new Set<string>();
  const all = [...oursChanges, ...theirsChanges].sort((a, b) => {
    if (a.baseStart !== b.baseStart) return a.baseStart - b.baseStart;
    return a.baseEnd - b.baseEnd;
  });
  for (const change of all) {
    const key = `${change.baseStart}:${change.baseEnd}:${change.lines.join('\n')}`;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(change);
  }

  const out: string[] = [];
  let cursor = 0;
  for (const change of merged) {
    if (change.baseStart < cursor) return { status: 'conflict' };
    out.push(...baseLines.slice(cursor, change.baseStart));
    out.push(...change.lines);
    cursor = change.baseEnd;
  }
  out.push(...baseLines.slice(cursor));
  return { status: 'clean', text: joinLines(out) };
}

export function formatLocalFileTimestamp(date: Date = new Date()): string {
  const y = date.getFullYear();
  const mo = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const h = String(date.getHours()).padStart(2, '0');
  const mi = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  return `${y}${mo}${d}-${h}${mi}${s}`;
}

export function splitFileName(fileName: string): { base: string; ext: string } {
  const trimmed = (fileName || '').trim() || 'note';
  const lastDot = trimmed.lastIndexOf('.');
  if (lastDot <= 0 || lastDot === trimmed.length - 1) {
    return { base: trimmed, ext: '' };
  }
  return { base: trimmed.slice(0, lastDot), ext: trimmed.slice(lastDot) };
}

export function buildTimestampedCopyName(
  fileName: string,
  date: Date = new Date(),
  disambiguator = 1,
): string {
  const { base, ext } = splitFileName(fileName);
  const stamp = formatLocalFileTimestamp(date);
  const extra = disambiguator > 1 ? `-${disambiguator}` : '';
  return `${base}_${stamp}${extra}${ext}`;
}

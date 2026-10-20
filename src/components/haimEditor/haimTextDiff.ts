/**
 * Text spans for dual-pane follower patches.
 * Prefix/suffix stays on the main thread (local edits). Large dirty middles
 * go to a worker line diff. Covering replaces must not use CodeMirror's
 * selection.map (assoc -1 pins the drag anchor at 0; a non-empty range maps
 * to the whole document).
 */

export const HAIM_WASM_DIFF_MIN_DOC_BYTES = 32 * 1024;
export const HAIM_WASM_DIFF_MIN_DIRTY_BYTES = 8 * 1024;
export const HAIM_LINE_DIFF_WORKER_TIMEOUT_MS = 80;

export type HaimTextChange = {
  from: number;
  to: number;
  insert: string;
};

export function commonPrefixLength(before: string, after: string): number {
  const limit = Math.min(before.length, after.length);
  let i = 0;
  while (i < limit && before.charCodeAt(i) === after.charCodeAt(i)) i += 1;
  return i;
}

export function commonSuffixLength(
  before: string,
  after: string,
  prefix: number,
): number {
  const beforeEnd = before.length;
  const afterEnd = after.length;
  let suffix = 0;
  while (
    prefix + suffix < beforeEnd &&
    prefix + suffix < afterEnd &&
    before.charCodeAt(beforeEnd - 1 - suffix) ===
      after.charCodeAt(afterEnd - 1 - suffix)
  ) {
    suffix += 1;
  }
  return suffix;
}

/** One middle span, or null when the strings are equal. */
export function prefixSuffixChange(
  before: string,
  after: string,
): HaimTextChange | null {
  if (before === after) return null;
  const prefix = commonPrefixLength(before, after);
  const suffix = commonSuffixLength(before, after, prefix);
  const from = prefix;
  const to = before.length - suffix;
  return {
    from,
    to,
    insert: after.slice(prefix, after.length - suffix),
  };
}

export function dirtySpanBytes(change: HaimTextChange): number {
  return Math.max(change.to - change.from, change.insert.length);
}

/**
 * Worker line diff only when a local prefix/suffix span is still huge.
 * Small spans are cheaper in JS than a WASM copy.
 */
export function shouldUseWasmLineDiff(
  before: string,
  after: string,
  dirtyBytes: number,
): boolean {
  if (before.length < HAIM_WASM_DIFF_MIN_DOC_BYTES) return false;
  if (after.length < HAIM_WASM_DIFF_MIN_DOC_BYTES) return false;
  if (dirtyBytes >= HAIM_WASM_DIFF_MIN_DIRTY_BYTES) return true;
  const larger = Math.max(before.length, after.length);
  return larger > 0 && dirtyBytes / larger > 0.25;
}

/**
 * Map a document offset through non-overlapping changes in original coordinates.
 * A point inside a replacement stays a point (clamped into the insert), never
 * the whole inserted range.
 */
export function mapOffsetThroughChanges(
  pos: number,
  changes: readonly HaimTextChange[],
): number {
  const ordered = [...changes].sort((a, b) => b.from - a.from);
  let next = pos;
  for (const change of ordered) {
    if (next >= change.to) {
      next += change.insert.length - (change.to - change.from);
    } else if (next > change.from) {
      next = change.from + Math.min(next - change.from, change.insert.length);
    }
  }
  return Math.max(0, next);
}

export function mapSelectionThroughChanges(
  anchor: number,
  head: number,
  changes: readonly HaimTextChange[],
  nextDocLength: number,
): { anchor: number; head: number } {
  const cap = Math.max(0, nextDocLength);
  const mappedAnchor = Math.min(cap, mapOffsetThroughChanges(anchor, changes));
  const mappedHead = Math.min(cap, mapOffsetThroughChanges(head, changes));
  return { anchor: mappedAnchor, head: mappedHead };
}

type MyersOp = { kind: 'eq' | 'del' | 'ins'; line: string };

/**
 * Line diff of two strings into original-coordinate changes.
 * Used as the JS fallback (Vitest has no wasm plugin) and by the worker
 * when WASM fails to instantiate.
 */
export function lineDiffChanges(before: string, after: string): HaimTextChange[] {
  if (before === after) return [];
  const a = before.split('\n');
  const b = after.split('\n');
  if (a.length * b.length > 250_000) {
    const span = prefixSuffixChange(before, after);
    return span ? [span] : [];
  }
  const ops = myersLineOps(a, b);
  return opsToChanges(ops);
}

function myersLineOps(a: string[], b: string[]): MyersOp[] {
  const n = a.length;
  const m = b.length;
  const max = n + m;
  const offset = max;
  const v = new Int32Array(2 * max + 1);
  const trace: Int32Array[] = [];
  v[offset + 1] = 0;
  let foundD = 0;
  for (let d = 0; d <= max; d += 1) {
    const snapshot = v.slice();
    trace.push(snapshot);
    for (let k = -d; k <= d; k += 2) {
      const kIndex = offset + k;
      let x: number;
      if (k === -d || (k !== d && v[kIndex - 1]! < v[kIndex + 1]!)) {
        x = v[kIndex + 1]!;
      } else {
        x = v[kIndex - 1]! + 1;
      }
      let y = x - k;
      while (x < n && y < m && a[x] === b[y]) {
        x += 1;
        y += 1;
      }
      v[kIndex] = x;
      if (x >= n && y >= m) {
        foundD = d;
        d = max + 1;
        break;
      }
    }
  }
  return backtrackMyers(a, b, trace, foundD, offset);
}

function backtrackMyers(
  a: string[],
  b: string[],
  trace: Int32Array[],
  dEnd: number,
  offset: number,
): MyersOp[] {
  const ops: MyersOp[] = [];
  let x = a.length;
  let y = b.length;
  for (let d = dEnd; d > 0; d -= 1) {
    const prev = trace[d];
    if (!prev) break;
    const k = x - y;
    const kIndex = offset + k;
    let prevK: number;
    if (k === -d || (k !== d && prev[kIndex - 1]! < prev[kIndex + 1]!)) {
      prevK = k + 1;
    } else {
      prevK = k - 1;
    }
    const prevX = prev[offset + prevK]!;
    const prevY = prevX - prevK;
    while (x > prevX && y > prevY) {
      x -= 1;
      y -= 1;
      const line = a[x] ?? '';
      ops.push({ kind: 'eq', line });
    }
    if (x === prevX) {
      y -= 1;
      ops.push({ kind: 'ins', line: b[y] ?? '' });
    } else {
      x -= 1;
      ops.push({ kind: 'del', line: a[x] ?? '' });
    }
  }
  while (x > 0 && y > 0) {
    x -= 1;
    y -= 1;
    ops.push({ kind: 'eq', line: a[x] ?? '' });
  }
  while (x > 0) {
    x -= 1;
    ops.push({ kind: 'del', line: a[x] ?? '' });
  }
  while (y > 0) {
    y -= 1;
    ops.push({ kind: 'ins', line: b[y] ?? '' });
  }
  ops.reverse();
  return ops;
}

function opsToChanges(ops: MyersOp[]): HaimTextChange[] {
  const changes: HaimTextChange[] = [];
  let oldPos = 0;
  let hunkFrom = 0;
  let deleted = '';
  let inserted = '';
  const flush = () => {
    if (!deleted && !inserted) return;
    changes.push({ from: hunkFrom, to: hunkFrom + deleted.length, insert: inserted });
    deleted = '';
    inserted = '';
  };
  for (let i = 0; i < ops.length; i += 1) {
    const op = ops[i];
    if (!op) continue;
    const piece = i === ops.length - 1 ? op.line : `${op.line}\n`;
    if (op.kind === 'eq') {
      flush();
      oldPos += piece.length;
      hunkFrom = oldPos;
      continue;
    }
    if (!deleted && !inserted) hunkFrom = oldPos;
    if (op.kind === 'del') {
      deleted += piece;
      oldPos += piece.length;
    } else {
      inserted += piece;
    }
  }
  flush();
  return changes;
}

export function applyTextChanges(before: string, changes: readonly HaimTextChange[]): string {
  const ordered = [...changes].sort((a, b) => b.from - a.from);
  let next = before;
  for (const change of ordered) {
    next = next.slice(0, change.from) + change.insert + next.slice(change.to);
  }
  return next;
}

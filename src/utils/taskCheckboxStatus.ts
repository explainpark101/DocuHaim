/** Three-state task checkbox marker used in Haim / vault markdown. */
export type TaskCheckboxStatus = 'todo' | 'doing' | 'done';

const MARKER_TODO = ' ';
const MARKER_DOING = '~';
const MARKER_DONE = 'x';

/**
 * Parse a single checkbox marker character (` `, `~`, `x`/`X`) to status.
 * Unknown markers → `todo`.
 */
export function parseTaskCheckboxMarker(
  ch: string | null | undefined,
): TaskCheckboxStatus {
  const c = String(ch ?? ' ');
  if (c === MARKER_DOING) return 'doing';
  if (c === 'x' || c === 'X') return 'done';
  return 'todo';
}

/** Serialize status to canonical marker (` `, `~`, `x`). */
export function serializeTaskCheckboxMarker(
  status: TaskCheckboxStatus | null | undefined,
): string {
  if (status === 'doing') return MARKER_DOING;
  if (status === 'done') return MARKER_DONE;
  return MARKER_TODO;
}

/** Cycle: todo → doing → done → todo. */
export function cycleTaskCheckboxStatus(
  status: TaskCheckboxStatus | null | undefined,
): TaskCheckboxStatus {
  if (status === 'todo') return 'doing';
  if (status === 'doing') return 'done';
  return 'todo';
}

/** Resolve status from TipTap attrs (`status` preferred, else `checked`). */
export function taskCheckboxStatusFromAttrs(attrs: {
  status?: unknown;
  checked?: unknown;
} | null | undefined): TaskCheckboxStatus {
  const s = attrs?.status;
  if (s === 'todo' || s === 'doing' || s === 'done') return s;
  return attrs?.checked ? 'done' : 'todo';
}

/**
 * Count task lines in markdown.
 * total = todo+doing+done; completed = done only; pending = todo+doing.
 */
export function countTaskCheckboxLines(markdown: string | null | undefined): {
  total: number;
  completed: number;
  pending: number;
} {
  const lines = String(markdown ?? '').split('\n');
  let total = 0;
  let completed = 0;
  for (const line of lines) {
    const m = line.match(/^\s*(?:[-*+]|\d+[.)])\s+\[([ xX~])\](?:\s|$)/);
    if (!m) continue;
    total += 1;
    if (parseTaskCheckboxMarker(m[1]) === 'done') completed += 1;
  }
  return {
    total,
    completed,
    pending: total - completed,
  };
}

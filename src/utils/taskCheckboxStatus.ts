/** Three-state task checkbox marker used in Haim / vault markdown. */
export type TaskCheckboxStatus = 'todo' | 'doing' | 'done';

/**
 * Checkbox behavior kind:
 * - `check` — binary GFM (`[ ]` ↔ `[x]`)
 * - `status` — 3-state (`[ ]` → `[~]` → `[x]` → …)
 */
export type TaskCheckboxKind = 'check' | 'status';

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

/**
 * Infer kind from a raw markdown marker.
 * Only `~` is status in vault markdown; space/x are regular checks.
 */
export function taskCheckboxKindFromMarker(
  ch: string | null | undefined,
): TaskCheckboxKind {
  return parseTaskCheckboxMarker(ch) === 'doing' ? 'status' : 'check';
}

/** Parse `data-kind` / attr; `doing` always forces status. */
export function parseTaskCheckboxKind(
  kind: unknown,
  status?: TaskCheckboxStatus | null,
): TaskCheckboxKind {
  if (status === 'doing') return 'status';
  if (kind === 'status') return 'status';
  return 'check';
}

/** Resolve kind from TipTap attrs (`kind` preferred; `doing` ⇒ status). */
export function taskCheckboxKindFromAttrs(attrs: {
  kind?: unknown;
  status?: unknown;
  checked?: unknown;
} | null | undefined): TaskCheckboxKind {
  return parseTaskCheckboxKind(
    attrs?.kind,
    taskCheckboxStatusFromAttrs(attrs),
  );
}

/** Cycle: todo → doing → done → todo (status checkboxes). */
export function cycleTaskCheckboxStatus(
  status: TaskCheckboxStatus | null | undefined,
): TaskCheckboxStatus {
  if (status === 'todo') return 'doing';
  if (status === 'doing') return 'done';
  return 'todo';
}

/** Binary toggle for regular checkboxes: todo ↔ done. */
export function toggleTaskCheckboxStatus(
  status: TaskCheckboxStatus | null | undefined,
): TaskCheckboxStatus {
  return status === 'done' ? 'todo' : 'done';
}

/**
 * Advance status according to kind.
 * `check` never enters `doing`; stray `doing` under check → `done`.
 */
export function advanceTaskCheckboxStatus(
  status: TaskCheckboxStatus | null | undefined,
  kind: TaskCheckboxKind | null | undefined,
): TaskCheckboxStatus {
  const resolved = parseTaskCheckboxKind(kind, status ?? undefined);
  if (resolved === 'status') return cycleTaskCheckboxStatus(status);
  if (status === 'doing') return 'done';
  return toggleTaskCheckboxStatus(status);
}

/**
 * Advance a raw markdown marker char (source Ctrl-Tab / checklist UI).
 * `~` → status cycle; otherwise binary.
 */
export function advanceTaskCheckboxMarker(
  ch: string | null | undefined,
): string {
  const status = parseTaskCheckboxMarker(ch);
  const kind = taskCheckboxKindFromMarker(ch);
  return serializeTaskCheckboxMarker(
    advanceTaskCheckboxStatus(status, kind),
  );
}

/** Build TipTap taskItem attrs from a marker character. */
export function taskItemAttrsFromMarker(ch: string | null | undefined): {
  status: TaskCheckboxStatus;
  checked: boolean;
  kind: TaskCheckboxKind;
} {
  const status = parseTaskCheckboxMarker(ch);
  const kind = taskCheckboxKindFromMarker(ch);
  return {
    status,
    checked: status === 'done',
    kind: status === 'doing' ? 'status' : kind,
  };
}

/**
 * Serialize status for vault markdown.
 * Regular checks never write `~` (coerce stray doing → space).
 */
export function serializeTaskCheckboxMarkerForKind(
  status: TaskCheckboxStatus | null | undefined,
  kind: TaskCheckboxKind | null | undefined,
): string {
  if (kind === 'check') {
    if (status === 'done') return MARKER_DONE;
    return MARKER_TODO;
  }
  return serializeTaskCheckboxMarker(status);
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

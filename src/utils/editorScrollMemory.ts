/**
 * Scroll memory for markdown editors (split panes / tab remounts / app restart).
 * Keyed by `type:path`. In-memory map is mirrored to localStorage so a
 * cold start can restore the last position.
 */

export type EditorScrollSnapshot = {
  editorTop: number;
  editorLeft: number;
  previewTop: number;
  previewLeft: number;
};

const STORAGE_KEY = 's3haim_editor_scroll_v1';
const MAX_ENTRIES = 80;

const memory = new Map<string, EditorScrollSnapshot>();
/** Oldest key first. */
const order: string[] = [];
let flushTimer = 0;

function localStore(): Storage | null {
  try {
    const ls = globalThis.localStorage;
    if (!ls || typeof ls.getItem !== 'function') return null;
    return ls;
  } catch {
    return null;
  }
}

function normalizeSnapshot(snap: EditorScrollSnapshot): EditorScrollSnapshot {
  return {
    editorTop: Number.isFinite(snap.editorTop) ? snap.editorTop : 0,
    editorLeft: Number.isFinite(snap.editorLeft) ? snap.editorLeft : 0,
    previewTop: Number.isFinite(snap.previewTop) ? snap.previewTop : 0,
    previewLeft: Number.isFinite(snap.previewLeft) ? snap.previewLeft : 0,
  };
}

function isSnapshot(value: unknown): value is EditorScrollSnapshot {
  if (!value || typeof value !== 'object') return false;
  const row = value as Partial<EditorScrollSnapshot>;
  return (
    typeof row.editorTop === 'number' &&
    typeof row.editorLeft === 'number' &&
    typeof row.previewTop === 'number' &&
    typeof row.previewLeft === 'number'
  );
}

function touchOrder(key: string): void {
  const idx = order.indexOf(key);
  if (idx >= 0) order.splice(idx, 1);
  order.push(key);
  while (order.length > MAX_ENTRIES) {
    const oldest = order.shift();
    if (oldest) memory.delete(oldest);
  }
}

function readStorage(): void {
  const ls = localStore();
  if (!ls) return;
  try {
    const raw = ls.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as {
      order?: unknown;
      entries?: unknown;
    };
    const entries =
      parsed.entries && typeof parsed.entries === 'object'
        ? (parsed.entries as Record<string, unknown>)
        : {};
    const keys = Array.isArray(parsed.order)
      ? parsed.order.filter((key): key is string => typeof key === 'string')
      : Object.keys(entries);
    memory.clear();
    order.length = 0;
    for (const key of keys) {
      if (order.length >= MAX_ENTRIES) break;
      const snap = entries[key];
      if (!key || !isSnapshot(snap)) continue;
      memory.set(key, normalizeSnapshot(snap));
      order.push(key);
    }
  } catch {
    // Ignore corrupt storage.
  }
}

function writeStorage(): void {
  const ls = localStore();
  if (!ls) return;
  try {
    if (memory.size === 0) {
      ls.removeItem(STORAGE_KEY);
      return;
    }
    const entries: Record<string, EditorScrollSnapshot> = {};
    for (const key of order) {
      const snap = memory.get(key);
      if (snap) entries[key] = snap;
    }
    ls.setItem(
      STORAGE_KEY,
      JSON.stringify({ v: 1, order: order.slice(), entries }),
    );
  } catch {
    // Quota or private mode.
  }
}

function scheduleFlush(): void {
  if (typeof window === 'undefined') return;
  if (flushTimer) window.clearTimeout(flushTimer);
  flushTimer = window.setTimeout(() => {
    flushTimer = 0;
    writeStorage();
  }, 250);
}

/** Write the in-memory map to localStorage immediately. */
export function flushEditorScrollMemory(): void {
  if (typeof window !== 'undefined' && flushTimer) {
    window.clearTimeout(flushTimer);
    flushTimer = 0;
  }
  writeStorage();
}

/** Replace the in-memory map with the localStorage copy. */
export function hydrateEditorScrollMemoryFromStorage(): void {
  if (typeof window !== 'undefined' && flushTimer) {
    window.clearTimeout(flushTimer);
    flushTimer = 0;
  }
  readStorage();
}

if (typeof window !== 'undefined') {
  readStorage();
  window.addEventListener('pagehide', flushEditorScrollMemory);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flushEditorScrollMemory();
  });
}

export function editorScrollMemoryKeyFromFile(
  currentFile: { type?: string; id?: string } | null | undefined,
): string | null {
  if (!currentFile?.id || !currentFile?.type) return null;
  return `${currentFile.type}:${currentFile.id}`;
}

export function rememberEditorScroll(key: string, snap: EditorScrollSnapshot): void {
  if (!key) return;
  memory.set(key, normalizeSnapshot(snap));
  touchOrder(key);
  scheduleFlush();
}

export function recallEditorScroll(key: string): EditorScrollSnapshot | null {
  if (!key) return null;
  return memory.get(key) ?? null;
}

export function clearEditorScroll(key: string): void {
  if (!key) return;
  memory.delete(key);
  const idx = order.indexOf(key);
  if (idx >= 0) order.splice(idx, 1);
  scheduleFlush();
}

/** Test helper — wipe all remembered positions. */
export function clearAllEditorScrollMemory(): void {
  memory.clear();
  order.length = 0;
  if (typeof window !== 'undefined' && flushTimer) {
    window.clearTimeout(flushTimer);
    flushTimer = 0;
  }
  try {
    localStore()?.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

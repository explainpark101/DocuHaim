import type { FileStorageType, WorkspaceTab } from '@/utils/workspaceTabs/types';
import { isFileTab } from '@/utils/workspaceTabs/helpers';

export const CLOSED_TAB_HISTORY_KEY = 's3haim_closedTabHistory';

/** Long closed-tab stack (session-scoped). */
export const CLOSED_TAB_HISTORY_MAX = 500;

export type ClosedTabEntry =
  | { kind: 'chat' }
  | { kind: 'settings' }
  | {
      kind: 'file';
      storageType: Exclude<FileStorageType, 'session'>;
      path: string;
      name?: string;
    };

function readRaw(): unknown {
  if (typeof window === 'undefined') return null;
  // Prefer localStorage so Ctrl+Shift+T survives restart; migrate legacy session key.
  try {
    const local = window.localStorage.getItem(CLOSED_TAB_HISTORY_KEY);
    if (local) return JSON.parse(local);
  } catch {
    // ignore
  }
  try {
    const session = window.sessionStorage.getItem(CLOSED_TAB_HISTORY_KEY);
    if (!session) return null;
    const parsed = JSON.parse(session);
    try {
      window.localStorage.setItem(CLOSED_TAB_HISTORY_KEY, session);
      window.sessionStorage.removeItem(CLOSED_TAB_HISTORY_KEY);
    } catch {
      // ignore migrate failures
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeRaw(entries: ClosedTabEntry[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CLOSED_TAB_HISTORY_KEY, JSON.stringify(entries));
  } catch {
    // quota / private mode
  }
  try {
    window.sessionStorage.removeItem(CLOSED_TAB_HISTORY_KEY);
  } catch {
    // ignore
  }
}

function isClosedTabEntry(value: unknown): value is ClosedTabEntry {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  if (v.kind === 'chat' || v.kind === 'settings') return true;
  if (
    v.kind === 'file' &&
    (v.storageType === 's3' || v.storageType === 'local' || v.storageType === 'webdav') &&
    typeof v.path === 'string' &&
    v.path
  ) {
    return true;
  }
  return false;
}

export function loadClosedTabHistory(): ClosedTabEntry[] {
  const raw = readRaw();
  if (!Array.isArray(raw)) return [];
  return raw.filter(isClosedTabEntry).slice(0, CLOSED_TAB_HISTORY_MAX);
}

export function saveClosedTabHistory(entries: ClosedTabEntry[]): void {
  writeRaw(entries.slice(0, CLOSED_TAB_HISTORY_MAX));
}

export function clearClosedTabHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(CLOSED_TAB_HISTORY_KEY);
  } catch {
    // ignore
  }
  try {
    window.sessionStorage.removeItem(CLOSED_TAB_HISTORY_KEY);
  } catch {
    // ignore
  }
}

export function closedTabEntryFromWorkspaceTab(tab: WorkspaceTab): ClosedTabEntry | null {
  if (tab.kind === 'chat') return { kind: 'chat' };
  if (tab.kind === 'settings') return { kind: 'settings' };
  if (!isFileTab(tab)) return null;
  if (tab.storageType === 'session') return null;
  const name =
    tab.editedFileName ||
    (typeof tab.currentFile.name === 'string' ? tab.currentFile.name : undefined) ||
    tab.path.split('/').filter(Boolean).pop() ||
    undefined;
  return {
    kind: 'file',
    storageType: tab.storageType,
    path: tab.path,
    ...(name ? { name } : {}),
  };
}

/** Push most-recently-closed to the front (index 0). Dedupes identical entries. */
export function pushClosedTab(entry: ClosedTabEntry | null | undefined): void {
  if (!entry) return;
  const prev = loadClosedTabHistory();
  const filtered = prev.filter((e) => {
    if (entry.kind === 'chat') return e.kind !== 'chat';
    if (entry.kind === 'settings') return e.kind !== 'settings';
    return !(
      e.kind === 'file' &&
      e.storageType === entry.storageType &&
      e.path === entry.path
    );
  });
  saveClosedTabHistory([entry, ...filtered]);
}

/** Pop the most recently closed entry, or null if empty. */
export function popClosedTab(): ClosedTabEntry | null {
  const prev = loadClosedTabHistory();
  if (prev.length === 0) return null;
  const [first, ...rest] = prev;
  saveClosedTabHistory(rest);
  return first ?? null;
}

export function closedTabHistoryLength(): number {
  return loadClosedTabHistory().length;
}

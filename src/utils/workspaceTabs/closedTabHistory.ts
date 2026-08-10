import type { FileStorageType, WorkspaceTab } from './types';
import { isFileTab } from './helpers';

export const CLOSED_TAB_HISTORY_KEY = 's3haim_closedTabHistory';

/** Long closed-tab stack (session-scoped). */
export const CLOSED_TAB_HISTORY_MAX = 500;

export type ClosedTabEntry =
  | { kind: 'chat' }
  | {
      kind: 'file';
      storageType: Exclude<FileStorageType, 'session'>;
      path: string;
      name?: string;
    };

function readRaw(): unknown {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(CLOSED_TAB_HISTORY_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeRaw(entries: ClosedTabEntry[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(CLOSED_TAB_HISTORY_KEY, JSON.stringify(entries));
  } catch {
    // quota / private mode
  }
}

function isClosedTabEntry(value: unknown): value is ClosedTabEntry {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  if (v.kind === 'chat') return true;
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
    window.sessionStorage.removeItem(CLOSED_TAB_HISTORY_KEY);
  } catch {
    // ignore
  }
}

export function closedTabEntryFromWorkspaceTab(tab: WorkspaceTab): ClosedTabEntry | null {
  if (tab.kind === 'chat') return { kind: 'chat' };
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

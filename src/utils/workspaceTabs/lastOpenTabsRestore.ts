import type { FileStorageType, PersistedWorkspaceTab, PersistedWorkspaceTabs } from './types';
import { CHAT_TAB_ID, SETTINGS_TAB_ID } from './types';
import { fileTabId } from './helpers';
import type { ClosedTabEntry } from './closedTabHistory';

/**
 * Last non-empty open-tab list from the previous session (localStorage).
 * Written on pagehide so a cold start can still Ctrl+Shift+T restore siblings
 * after live `s3haim_workspaceTabs` is reduced to the auto-opened active tab.
 */
export const LAST_OPEN_TABS_RESTORE_KEY = 's3haim_lastOpenTabsRestore';

/** In-session queue seeded once from the last-open snapshot (also localStorage). */
export const TABS_RESTORE_QUEUE_KEY = 's3haim_tabsRestoreQueue';

function readJson(key: string): unknown {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota / private mode
  }
}

function removeKey(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

function isPersistedTab(value: unknown): value is PersistedWorkspaceTab {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  if (v.kind === 'chat' || v.kind === 'settings') return true;
  if (
    v.kind === 'file' &&
    (v.type === 's3' || v.type === 'local' || v.type === 'webdav') &&
    typeof v.path === 'string' &&
    v.path
  ) {
    return true;
  }
  return false;
}

function normalizeSnapshot(raw: unknown): PersistedWorkspaceTabs | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  if (o.version !== 1 || !Array.isArray(o.tabs)) return null;
  const tabs = o.tabs.filter(isPersistedTab);
  if (tabs.length === 0) return null;
  const activeId = typeof o.activeId === 'string' || o.activeId === null ? o.activeId : null;
  return { version: 1, tabs, activeId };
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

/** Persist the current open-tab list for the next cold start (skip empty). */
export function saveLastOpenTabsSnapshot(payload: PersistedWorkspaceTabs): void {
  const normalized = normalizeSnapshot(payload);
  if (!normalized) return;
  writeJson(LAST_OPEN_TABS_RESTORE_KEY, normalized);
}

export function loadLastOpenTabsSnapshot(): PersistedWorkspaceTabs | null {
  return normalizeSnapshot(readJson(LAST_OPEN_TABS_RESTORE_KEY));
}

export function clearLastOpenTabsSnapshot(): void {
  removeKey(LAST_OPEN_TABS_RESTORE_KEY);
}

export function persistedTabId(tab: PersistedWorkspaceTab): string {
  if (tab.kind === 'chat') return CHAT_TAB_ID;
  if (tab.kind === 'settings') return SETTINGS_TAB_ID;
  return fileTabId(tab.type, tab.path);
}

export function persistedTabToClosedEntry(tab: PersistedWorkspaceTab): ClosedTabEntry | null {
  if (tab.kind === 'chat') return { kind: 'chat' };
  if (tab.kind === 'settings') return { kind: 'settings' };
  return {
    kind: 'file',
    storageType: tab.type as Exclude<FileStorageType, 'session'>,
    path: tab.path,
  };
}

function loadRestoreQueue(): ClosedTabEntry[] {
  const raw = readJson(TABS_RESTORE_QUEUE_KEY);
  if (!Array.isArray(raw)) return [];
  return raw.filter(isClosedTabEntry);
}

function saveRestoreQueue(entries: ClosedTabEntry[]): void {
  if (entries.length === 0) {
    removeKey(TABS_RESTORE_QUEUE_KEY);
    return;
  }
  writeJson(TABS_RESTORE_QUEUE_KEY, entries);
}

/**
 * Seed Ctrl+Shift+T restore queue once per cold start from the last-open snapshot
 * (and optional live persisted tabs). Entries already open are skipped.
 * Most-recent / rightmost tabs are restored first (front of queue).
 */
export function seedTabsRestoreQueueFromSnapshot(
  snapshot: PersistedWorkspaceTabs | null | undefined,
  openTabIds: ReadonlySet<string>,
): void {
  if (!snapshot?.tabs?.length) return;
  const entries: ClosedTabEntry[] = [];
  for (let i = snapshot.tabs.length - 1; i >= 0; i -= 1) {
    const tab = snapshot.tabs[i];
    if (!tab) continue;
    const id = persistedTabId(tab);
    if (openTabIds.has(id)) continue;
    const entry = persistedTabToClosedEntry(tab);
    if (!entry) continue;
    const dup = entries.some((e) => {
      if (entry.kind === 'chat') return e.kind === 'chat';
      if (entry.kind === 'settings') return e.kind === 'settings';
      return (
        e.kind === 'file' &&
        entry.kind === 'file' &&
        e.storageType === entry.storageType &&
        e.path === entry.path
      );
    });
    if (!dup) entries.push(entry);
  }
  // Keep an existing queue if this seed would be empty (e.g. second mount).
  if (entries.length === 0) return;
  saveRestoreQueue(entries);
}

/** Pop next tab to restore from the cold-start queue. */
export function popTabsRestoreQueue(): ClosedTabEntry | null {
  const prev = loadRestoreQueue();
  if (prev.length === 0) return null;
  const [first, ...rest] = prev;
  saveRestoreQueue(rest);
  return first ?? null;
}

export function clearTabsRestoreQueue(): void {
  removeKey(TABS_RESTORE_QUEUE_KEY);
}

export function tabsRestoreQueueLength(): number {
  return loadRestoreQueue().length;
}

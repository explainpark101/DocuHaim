import {
  CHAT_TAB_ID,
  CONTENT_SEARCH_TAB_ID,
  LAST_FILE_KEY,
  SETTINGS_TAB_ID,
  WORKSPACE_TABS_STORAGE_KEY,
  type FileStorageType,
  type PersistedWorkspaceTabs,
  type PersistedWorkspaceTab,
} from '@/utils/workspaceTabs/types';
import { fileTabId } from '@/utils/workspaceTabs/helpers';

function readJson(storage: Storage, key: string): unknown {
  try {
    const raw = storage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeBoth(key: string, value: unknown): void {
  try {
    const serialized = JSON.stringify(value);
    window.sessionStorage.setItem(key, serialized);
    window.localStorage.setItem(key, serialized);
  } catch {
    // ignore quota / private mode
  }
}

function clearBoth(key: string): void {
  try {
    window.sessionStorage.removeItem(key);
  } catch {
    // ignore
  }
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

function isPersistedTab(value: unknown): value is PersistedWorkspaceTab {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  if (v.kind === 'chat' || v.kind === 'settings' || v.kind === 'content-search') return true;
  if (
    v.kind === 'file' &&
    (v.type === 's3' || v.type === 'local' || v.type === 'webdav' || v.type === 'session') &&
    typeof v.path === 'string' &&
    v.path
  ) {
    return true;
  }
  return false;
}

function normalizePersisted(raw: unknown): PersistedWorkspaceTabs | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  if (o.version !== 1 || !Array.isArray(o.tabs)) return null;
  const tabs = o.tabs.filter(isPersistedTab);
  const activeId = typeof o.activeId === 'string' || o.activeId === null ? o.activeId : null;
  return { version: 1, tabs, activeId };
}

function persistedId(tab: PersistedWorkspaceTab): string {
  if (tab.kind === 'chat') return CHAT_TAB_ID;
  if (tab.kind === 'settings') return SETTINGS_TAB_ID;
  if (tab.kind === 'content-search') return CONTENT_SEARCH_TAB_ID;
  return fileTabId(tab.type, tab.path);
}

/** Hydrate from workspace schema or legacy `s3haim_lastFile`. */
export function loadPersistedWorkspaceTabs(): PersistedWorkspaceTabs | null {
  if (typeof window === 'undefined') return null;

  const fromSession = normalizePersisted(readJson(window.sessionStorage, WORKSPACE_TABS_STORAGE_KEY));
  if (fromSession && fromSession.tabs.length > 0) return fromSession;

  const fromLocal = normalizePersisted(readJson(window.localStorage, WORKSPACE_TABS_STORAGE_KEY));
  if (fromLocal && fromLocal.tabs.length > 0) return fromLocal;

  // Legacy single lastFile
  let legacy: unknown = readJson(window.sessionStorage, LAST_FILE_KEY);
  if (!legacy) legacy = readJson(window.localStorage, LAST_FILE_KEY);
  if (!legacy || typeof legacy !== 'object') return null;
  const l = legacy as Record<string, unknown>;
  if (l.type === 'chat') {
    return { version: 1, tabs: [{ kind: 'chat' }], activeId: CHAT_TAB_ID };
  }
  if (l.type === 'settings') {
    return { version: 1, tabs: [{ kind: 'settings' }], activeId: SETTINGS_TAB_ID };
  }
  if (
    (l.type === 's3' || l.type === 'local' || l.type === 'webdav') &&
    typeof l.path === 'string' &&
    l.path
  ) {
    const type = l.type as FileStorageType;
    const path = l.path;
    return {
      version: 1,
      tabs: [{ kind: 'file', type, path }],
      activeId: fileTabId(type, path),
    };
  }
  return null;
}

export function savePersistedWorkspaceTabs(payload: PersistedWorkspaceTabs): void {
  if (typeof window === 'undefined') return;
  writeBoth(WORKSPACE_TABS_STORAGE_KEY, payload);

  // Keep legacy key in sync for older clients / partial restores.
  const active = payload.tabs.find((t) => payload.activeId === persistedId(t));
  if (!active) {
    clearBoth(LAST_FILE_KEY);
    return;
  }
  if (active.kind === 'chat') {
    writeBoth(LAST_FILE_KEY, { type: 'chat' });
    return;
  }
  if (active.kind === 'settings') {
    writeBoth(LAST_FILE_KEY, { type: 'settings' });
    return;
  }
  if (active.kind === 'content-search') {
    writeBoth(LAST_FILE_KEY, { type: 'content-search' });
    return;
  }
  writeBoth(LAST_FILE_KEY, { type: active.type, path: active.path });
}

export function clearPersistedWorkspaceTabs(): void {
  if (typeof window === 'undefined') return;
  clearBoth(WORKSPACE_TABS_STORAGE_KEY);
  clearBoth(LAST_FILE_KEY);
}

export function toPersistedWorkspaceTabs(
  tabs: Array<
    | { kind: 'chat' }
    | { kind: 'settings' }
    | { kind: 'content-search' }
    | { kind: 'file'; storageType: FileStorageType; path: string; appRoute?: string }
  >,
  activeId: string | null,
): PersistedWorkspaceTabs {
  const persisted: PersistedWorkspaceTab[] = [];
  for (const t of tabs) {
    if (t.kind === 'chat') {
      persisted.push({ kind: 'chat' });
    } else if (t.kind === 'settings') {
      persisted.push({ kind: 'settings' });
    } else if (t.kind === 'content-search') {
      persisted.push({ kind: 'content-search' });
    } else if (t.kind === 'file' && t.storageType !== 'session') {
      // Session tabs are ephemeral — do not persist.
      persisted.push({
        kind: 'file',
        type: t.storageType,
        path: t.path,
        ...(t.appRoute ? { appRoute: t.appRoute } : {}),
      });
    }
  }
  let nextActive = activeId;
  if (nextActive) {
    const ok = persisted.some((p) => nextActive === persistedId(p));
    if (!ok) {
      const first = persisted[0];
      nextActive = first ? persistedId(first) : null;
    }
  }
  return { version: 1, tabs: persisted, activeId: nextActive };
}

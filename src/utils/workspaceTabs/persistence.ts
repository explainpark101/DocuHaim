import {
  CHAT_TAB_ID,
  LAST_FILE_KEY,
  WORKSPACE_TABS_STORAGE_KEY,
  type FileStorageType,
  type PersistedWorkspaceTabs,
  type PersistedWorkspaceTab,
} from './types';
import { fileTabId } from './helpers';

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
  if (v.kind === 'chat') return true;
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
  const active = payload.tabs.find((t) => {
    if (t.kind === 'chat') return payload.activeId === CHAT_TAB_ID;
    return payload.activeId === fileTabId(t.type, t.path);
  });
  if (!active) {
    clearBoth(LAST_FILE_KEY);
    return;
  }
  if (active.kind === 'chat') {
    writeBoth(LAST_FILE_KEY, { type: 'chat' });
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
  tabs: { kind: 'chat' }[] | Array<{ kind: 'chat' } | { kind: 'file'; storageType: FileStorageType; path: string }>,
  activeId: string | null,
): PersistedWorkspaceTabs {
  const persisted: PersistedWorkspaceTab[] = [];
  for (const t of tabs) {
    if (t.kind === 'chat') {
      persisted.push({ kind: 'chat' });
    } else if (t.kind === 'file' && t.storageType !== 'session') {
      // Session tabs are ephemeral — do not persist.
      persisted.push({ kind: 'file', type: t.storageType, path: t.path });
    }
  }
  let nextActive = activeId;
  if (nextActive) {
    const ok = persisted.some((p) =>
      p.kind === 'chat' ? nextActive === CHAT_TAB_ID : nextActive === fileTabId(p.type, p.path),
    );
    if (!ok) nextActive = persisted[0]
      ? persisted[0].kind === 'chat'
        ? CHAT_TAB_ID
        : fileTabId(persisted[0].type, persisted[0].path)
      : null;
  }
  return { version: 1, tabs: persisted, activeId: nextActive };
}

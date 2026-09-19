import {
  CHAT_TAB_ID,
  CONTENT_SEARCH_TAB_ID,
  LAST_FILE_KEY,
  SETTINGS_TAB_ID,
  WORKSPACE_TABS_STORAGE_KEY,
  type FileStorageType,
  type PersistedWorkspaceTabs,
  type PersistedWorkspaceTabsV1,
  type PersistedWorkspaceTab,
} from '@/utils/workspaceTabs/types';
import { fileTabId } from '@/utils/workspaceTabs/helpers';
import {
  createSingleLeafLayout,
  fromPersistedPaneNode,
  isPersistedPaneNode,
  syncLayoutWithTabs,
  toPersistedPaneNode,
  type PersistedPaneNode,
} from '@/utils/workspaceTabs/paneLayout';

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

export function persistedId(tab: PersistedWorkspaceTab): string {
  if (tab.kind === 'chat') return CHAT_TAB_ID;
  if (tab.kind === 'settings') return SETTINGS_TAB_ID;
  if (tab.kind === 'content-search') return CONTENT_SEARCH_TAB_ID;
  return fileTabId(tab.type, tab.path);
}

function layoutFromTabList(
  tabs: PersistedWorkspaceTab[],
  activeId: string | null,
): { layout: PersistedPaneNode; focusedPaneId: string } {
  const tabIds = tabs.map(persistedId);
  const leaf = createSingleLeafLayout(tabIds, activeId);
  return { layout: toPersistedPaneNode(leaf), focusedPaneId: leaf.id };
}

function normalizePersisted(raw: unknown): PersistedWorkspaceTabs | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  if (!Array.isArray(o.tabs)) return null;
  const tabs = o.tabs.filter(isPersistedTab);
  const activeId = typeof o.activeId === 'string' || o.activeId === null ? o.activeId : null;

  // Prefer a valid layout tree even when focusedPaneId is missing (derive focus).
  if ((o.version === 1 || o.version === 2) && isPersistedPaneNode(o.layout)) {
    const tabIds = tabs.map(persistedId);
    const focusHint = typeof o.focusedPaneId === 'string' ? o.focusedPaneId : null;
    const synced = syncLayoutWithTabs(fromPersistedPaneNode(o.layout), tabIds, focusHint);
    return {
      version: 2,
      tabs,
      activeId,
      layout: toPersistedPaneNode(synced.layout),
      focusedPaneId: synced.focusedPaneId,
    };
  }

  if (o.version === 1 || o.version === 2) {
    // v1 or v2 missing layout — synthesize a single leaf.
    const { layout, focusedPaneId } = layoutFromTabList(tabs, activeId);
    return { version: 2, tabs, activeId, layout, focusedPaneId };
  }

  return null;
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
    const { layout, focusedPaneId } = layoutFromTabList([{ kind: 'chat' }], CHAT_TAB_ID);
    return { version: 2, tabs: [{ kind: 'chat' }], activeId: CHAT_TAB_ID, layout, focusedPaneId };
  }
  if (l.type === 'settings') {
    const { layout, focusedPaneId } = layoutFromTabList([{ kind: 'settings' }], SETTINGS_TAB_ID);
    return {
      version: 2,
      tabs: [{ kind: 'settings' }],
      activeId: SETTINGS_TAB_ID,
      layout,
      focusedPaneId,
    };
  }
  if (
    (l.type === 's3' || l.type === 'local' || l.type === 'webdav') &&
    typeof l.path === 'string' &&
    l.path
  ) {
    const type = l.type as FileStorageType;
    const path = l.path;
    const id = fileTabId(type, path);
    const tabs: PersistedWorkspaceTab[] = [{ kind: 'file', type, path }];
    const { layout, focusedPaneId } = layoutFromTabList(tabs, id);
    return { version: 2, tabs, activeId: id, layout, focusedPaneId };
  }
  return null;
}

export function savePersistedWorkspaceTabs(payload: PersistedWorkspaceTabs | PersistedWorkspaceTabsV1): void {
  if (typeof window === 'undefined') return;
  const normalized =
    payload.version === 2
      ? payload
      : (() => {
          const { layout, focusedPaneId } = layoutFromTabList(payload.tabs, payload.activeId);
          return {
            version: 2 as const,
            tabs: payload.tabs,
            activeId: payload.activeId,
            layout,
            focusedPaneId,
          };
        })();
  writeBoth(WORKSPACE_TABS_STORAGE_KEY, normalized);

  // Keep legacy key in sync for older clients / partial restores.
  const active = normalized.tabs.find((t) => normalized.activeId === persistedId(t));
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
    | { kind: 'file'; storageType: FileStorageType; path: string }
  >,
  activeId: string | null,
  layout?: PersistedPaneNode | null,
  focusedPaneId?: string | null,
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
      persisted.push({ kind: 'file', type: t.storageType, path: t.path });
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

  const tabIds = persisted.map(persistedId);
  if (layout) {
    const focusHint = focusedPaneId || null;
    const synced = syncLayoutWithTabs(fromPersistedPaneNode(layout), tabIds, focusHint);
    return {
      version: 2,
      tabs: persisted,
      activeId: nextActive,
      layout: toPersistedPaneNode(synced.layout),
      focusedPaneId: synced.focusedPaneId,
    };
  }

  const synthesized = layoutFromTabList(persisted, nextActive);
  return {
    version: 2,
    tabs: persisted,
    activeId: nextActive,
    layout: synthesized.layout,
    focusedPaneId: synthesized.focusedPaneId,
  };
}

import {
  CHAT_TAB_ID,
  SETTINGS_TAB_ID,
  WORKSPACE_TAB_SOFT_CAP,
  type FileWorkspaceTab,
  type WorkspaceTab,
  type WorkspaceTabsState,
} from '@/utils/workspaceTabs/types';
import {
  createChatTab,
  createFileTab,
  createSettingsTab,
  isFileTab,
  isFileTabDirty,
  revokeFileTabObjectUrl,
} from '@/utils/workspaceTabs/helpers';

export const emptyWorkspaceTabsState = (): WorkspaceTabsState => ({
  tabs: [],
  activeId: null,
});

export function getActiveTab(state: WorkspaceTabsState): WorkspaceTab | null {
  if (!state.activeId) return null;
  return state.tabs.find((t) => t.id === state.activeId) ?? null;
}

export function getActiveFileTab(state: WorkspaceTabsState): FileWorkspaceTab | null {
  const t = getActiveTab(state);
  return isFileTab(t) ? t : null;
}

function touchActivate(tabs: WorkspaceTab[], id: string, now: number): WorkspaceTab[] {
  return tabs.map((t) => {
    if (t.id !== id) return t;
    if (t.kind === 'file') return { ...t, lastActivatedAt: now };
    return t;
  });
}

/**
 * Prefer closing least-recently-activated non-dirty file tabs.
 * Returns tabs after eviction, or null if a dirty prompt is required.
 */
export function evictForSoftCap(
  tabs: WorkspaceTab[],
  opts?: { softCap?: number; promptCloseDirty?: (tab: FileWorkspaceTab) => boolean },
): { tabs: WorkspaceTab[]; closed: FileWorkspaceTab[] } | null {
  const softCap = opts?.softCap ?? WORKSPACE_TAB_SOFT_CAP;
  const fileTabs = tabs.filter(isFileTab);
  if (fileTabs.length < softCap) {
    return { tabs, closed: [] };
  }

  let next = [...tabs];
  const closed: FileWorkspaceTab[] = [];

  while (next.filter(isFileTab).length >= softCap) {
    const candidates = next.filter(isFileTab).filter((t) => !isFileTabDirty(t));
    let victim: FileWorkspaceTab | undefined;
    if (candidates.length > 0) {
      victim = candidates.reduce((a, b) =>
        a.lastActivatedAt <= b.lastActivatedAt ? a : b,
      );
    } else {
      const dirty = next.filter(isFileTab);
      const oldest = dirty.reduce((a, b) =>
        a.lastActivatedAt <= b.lastActivatedAt ? a : b,
      );
      if (opts?.promptCloseDirty && !opts.promptCloseDirty(oldest)) {
        return null;
      }
      victim = oldest;
    }
    if (!victim) break;
    revokeFileTabObjectUrl(victim);
    closed.push(victim);
    next = next.filter((t) => t.id !== victim!.id);
  }

  return { tabs: next, closed };
}

export function activateTab(state: WorkspaceTabsState, id: string, now = Date.now()): WorkspaceTabsState {
  if (!state.tabs.some((t) => t.id === id)) return state;
  return {
    tabs: touchActivate(state.tabs, id, now),
    activeId: id,
  };
}

export function openOrActivateChat(state: WorkspaceTabsState, now = Date.now()): WorkspaceTabsState {
  const existing = state.tabs.find((t) => t.kind === 'chat');
  if (existing) {
    return activateTab(state, CHAT_TAB_ID, now);
  }
  return {
    tabs: [...state.tabs, createChatTab()],
    activeId: CHAT_TAB_ID,
  };
}

export function openOrActivateSettings(state: WorkspaceTabsState, now = Date.now()): WorkspaceTabsState {
  const existing = state.tabs.find((t) => t.kind === 'settings');
  if (existing) {
    return activateTab(state, SETTINGS_TAB_ID, now);
  }
  return {
    tabs: [...state.tabs, createSettingsTab()],
    activeId: SETTINGS_TAB_ID,
  };
}

export type OpenFileTabInput = {
  storageType: FileWorkspaceTab['storageType'];
  path: string;
  currentFile: FileWorkspaceTab['currentFile'];
  editorContent: string;
  editedFileName?: string;
};

/**
 * Insert or replace file tab contents.
 * By default activates the tab; pass `{ activate: false }` to update in the background.
 * Caller handles soft-cap via `evictForSoftCap` before calling when opening a new id.
 */
export function openOrReplaceFileTab(
  state: WorkspaceTabsState,
  input: OpenFileTabInput,
  now = Date.now(),
  opts?: { activate?: boolean },
): WorkspaceTabsState {
  const activate = opts?.activate !== false;
  const tab = createFileTab({ ...input, now });
  const idx = state.tabs.findIndex((t) => t.id === tab.id);
  let tabs: WorkspaceTab[];
  if (idx >= 0) {
    const prev = state.tabs[idx];
    if (isFileTab(prev)) {
      const prevUrl = prev.currentFile.objectUrl;
      const nextUrl = tab.currentFile.objectUrl;
      if (typeof prevUrl === 'string' && prevUrl && prevUrl !== nextUrl) {
        revokeFileTabObjectUrl(prev);
      }
    }
    // Keep soft-cap LRU order stable for background content updates.
    const nextTab =
      !activate && isFileTab(prev)
        ? { ...tab, lastActivatedAt: prev.lastActivatedAt }
        : tab;
    tabs = state.tabs.map((t, i) => (i === idx ? nextTab : t));
  } else {
    tabs = [...state.tabs, tab];
  }
  return { tabs, activeId: activate ? tab.id : state.activeId };
}

export function patchFileTab(
  state: WorkspaceTabsState,
  id: string,
  patch: Partial<
    Pick<
      FileWorkspaceTab,
      'currentFile' | 'editorContent' | 'baselineContent' | 'editedFileName' | 'lastActivatedAt'
    >
  > & {
    /** When true, revoke previous objectUrl if replaced. */
    revokePreviousObjectUrl?: boolean;
  },
): WorkspaceTabsState {
  const { revokePreviousObjectUrl, ...rest } = patch;
  return {
    ...state,
    tabs: state.tabs.map((t) => {
      if (!isFileTab(t) || t.id !== id) return t;
      if (revokePreviousObjectUrl && rest.currentFile) {
        const prevUrl = t.currentFile.objectUrl;
        const nextUrl = rest.currentFile.objectUrl;
        if (typeof prevUrl === 'string' && prevUrl && prevUrl !== nextUrl) {
          revokeFileTabObjectUrl(t);
        }
      }
      return { ...t, ...rest };
    }),
  };
}

/**
 * Close a tab. If it was active, activate a neighbor (prefer right, else left; chat ok).
 */
export function closeTab(state: WorkspaceTabsState, id: string): WorkspaceTabsState {
  const idx = state.tabs.findIndex((t) => t.id === id);
  if (idx < 0) return state;
  const closing = state.tabs[idx];
  if (isFileTab(closing)) {
    revokeFileTabObjectUrl(closing);
  }
  const tabs = state.tabs.filter((t) => t.id !== id);
  if (state.activeId !== id) {
    return { tabs, activeId: state.activeId };
  }
  const neighbor = tabs[idx] ?? tabs[idx - 1] ?? null;
  return { tabs, activeId: neighbor?.id ?? null };
}

export function findFileTab(
  state: WorkspaceTabsState,
  storageType: string,
  path: string,
): FileWorkspaceTab | null {
  const id = `${storageType}:${path}`;
  const t = state.tabs.find((x) => x.id === id);
  return isFileTab(t) ? t : null;
}

export type RetargetFileTabInput = {
  path: string;
  currentFile?: FileWorkspaceTab['currentFile'];
  editedFileName?: string;
};

/**
 * Retarget a file tab after rename/move (id is `${storageType}:${path}`).
 * If a tab already exists at the destination, merge into it and drop the source.
 */
export function retargetFileTab(
  state: WorkspaceTabsState,
  storageType: string,
  oldPath: string,
  input: RetargetFileTabInput,
): WorkspaceTabsState {
  const newPath = String(input.path || '');
  if (!storageType || !oldPath || !newPath) return state;
  if (oldPath === newPath) {
    const existing = findFileTab(state, storageType, oldPath);
    if (!existing) return state;
    return patchFileTab(state, existing.id, {
      ...(input.currentFile ? { currentFile: { ...existing.currentFile, ...input.currentFile } } : {}),
      ...(input.editedFileName != null ? { editedFileName: input.editedFileName } : {}),
    });
  }

  const oldId = `${storageType}:${oldPath}`;
  const newId = `${storageType}:${newPath}`;
  const oldTab = findFileTab(state, storageType, oldPath);
  if (!oldTab) return state;

  const destTab = findFileTab(state, storageType, newPath);
  const nextName =
    input.editedFileName ??
    (typeof input.currentFile?.name === 'string' ? input.currentFile.name : undefined) ??
    newPath.split('/').filter(Boolean).pop() ??
    oldTab.editedFileName;

  const nextCurrentFile: FileWorkspaceTab['currentFile'] = {
    ...oldTab.currentFile,
    ...(input.currentFile || {}),
    id: newPath,
    type: storageType,
    ...(nextName ? { name: nextName } : {}),
  };

  if (destTab && destTab.id !== oldId) {
    // Destination already open — keep dest slot, drop source, preserve editor if dest empty.
    const merged: FileWorkspaceTab = {
      ...destTab,
      path: newPath,
      currentFile: {
        ...destTab.currentFile,
        ...nextCurrentFile,
      },
      editedFileName: nextName || destTab.editedFileName,
      editorContent: destTab.editorContent || oldTab.editorContent,
      baselineContent: destTab.baselineContent || oldTab.baselineContent,
      lastActivatedAt: Math.max(destTab.lastActivatedAt, oldTab.lastActivatedAt),
    };
    revokeFileTabObjectUrl(oldTab);
    const tabs = state.tabs
      .filter((t) => t.id !== oldId)
      .map((t) => (t.id === newId ? merged : t));
    const activeId =
      state.activeId === oldId || state.activeId === newId ? newId : state.activeId;
    return { tabs, activeId };
  }

  const retargeted: FileWorkspaceTab = {
    ...oldTab,
    id: newId,
    path: newPath,
    currentFile: nextCurrentFile,
    editedFileName: nextName || oldTab.editedFileName,
  };
  const tabs = state.tabs.map((t) => (t.id === oldId ? retargeted : t));
  const activeId = state.activeId === oldId ? newId : state.activeId;
  return { tabs, activeId };
}

/**
 * Rewrite open file tab paths after a folder rename/move (`oldPrefix` → `newPrefix`).
 * Prefixes should include the trailing slash when targeting a folder.
 */
export function retargetFileTabsByPathPrefix(
  state: WorkspaceTabsState,
  storageType: string,
  oldPrefix: string,
  newPrefix: string,
): WorkspaceTabsState {
  if (!storageType || !oldPrefix || oldPrefix === newPrefix) return state;
  let next = state;
  for (const tab of state.tabs) {
    if (!isFileTab(tab) || tab.storageType !== storageType) continue;
    if (tab.path !== oldPrefix && !tab.path.startsWith(oldPrefix)) continue;
    const newPath = newPrefix + tab.path.slice(oldPrefix.length);
    next = retargetFileTab(next, storageType, tab.path, {
      path: newPath,
      currentFile: {
        ...tab.currentFile,
        id: newPath,
      },
    });
  }
  return next;
}

/** Reorder tabs by moving `activeId` to the position of `overId`. */
export function moveTab(
  state: WorkspaceTabsState,
  activeId: string,
  overId: string,
): WorkspaceTabsState {
  if (activeId === overId) return state;
  const oldIndex = state.tabs.findIndex((t) => t.id === activeId);
  const newIndex = state.tabs.findIndex((t) => t.id === overId);
  if (oldIndex < 0 || newIndex < 0) return state;
  const tabs = state.tabs.slice();
  const [removed] = tabs.splice(oldIndex, 1);
  if (!removed) return state;
  tabs.splice(newIndex, 0, removed);
  return { ...state, tabs };
}

import {
  CHAT_TAB_ID,
  CONTENT_SEARCH_TAB_ID,
  SETTINGS_TAB_ID,
  WORKSPACE_TAB_SOFT_CAP,
  defaultWorkspaceLayout,
  type FileWorkspaceTab,
  type WorkspaceTab,
  type WorkspaceTabsState,
} from '@/utils/workspaceTabs/types';
import type { PaneNode } from '@/utils/workspaceTabs/paneLayout';
import {
  createChatTab,
  createContentSearchTab,
  createFileTab,
  createSettingsTab,
  isFileTab,
  isFileTabDirty,
  revokeFileTabObjectUrl,
} from '@/utils/workspaceTabs/helpers';
import {
  addTabToFocusedLeaf,
  findLeafContainingTab,
  flattenTabIdsFromLayout,
  getFocusedLeafActiveId,
  moveTabToLeaf,
  removeTabFromLayout,
  reorderInLeaf,
  retargetTabIdInLayout,
  setLeafActive,
  setLeafExportPdf,
  splitLeaf,
  syncLayoutWithTabs,
  type PaneSplitEdge,
} from '@/utils/workspaceTabs/paneLayout';

export const emptyWorkspaceTabsState = (): WorkspaceTabsState => {
  const { layout, focusedPaneId } = defaultWorkspaceLayout();
  return {
    tabs: [],
    activeId: null,
    layout,
    focusedPaneId,
  };
};

function withSyncedActiveId(state: Omit<WorkspaceTabsState, 'activeId'> & { activeId?: string | null }): WorkspaceTabsState {
  const activeId = getFocusedLeafActiveId(state.layout, state.focusedPaneId);
  return { ...state, activeId };
}

function ensureLayout(state: {
  tabs: WorkspaceTab[];
  layout: PaneNode;
  focusedPaneId: string;
  activeId?: string | null;
}): WorkspaceTabsState {
  const tabIds = state.tabs.map((t) => t.id);
  const synced = syncLayoutWithTabs(state.layout, tabIds, state.focusedPaneId);
  return withSyncedActiveId({
    tabs: state.tabs,
    layout: synced.layout,
    focusedPaneId: synced.focusedPaneId,
  });
}

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
  const leaf = findLeafContainingTab(state.layout, id);
  let layout = state.layout;
  let focusedPaneId = state.focusedPaneId;
  if (leaf) {
    layout = setLeafActive(layout, leaf.id, id);
    focusedPaneId = leaf.id;
  } else {
    const added = addTabToFocusedLeaf(layout, focusedPaneId, id, { activate: true });
    layout = added.layout;
    focusedPaneId = added.focusedPaneId;
  }
  return ensureLayout({
    tabs: touchActivate(state.tabs, id, now),
    layout,
    focusedPaneId,
  });
}

export function setFocusedPane(state: WorkspaceTabsState, paneId: string): WorkspaceTabsState {
  return ensureLayout({
    ...state,
    focusedPaneId: paneId,
  });
}

export function openOrActivateChat(
  state: WorkspaceTabsState,
  now = Date.now(),
  opts?: { activate?: boolean },
): WorkspaceTabsState {
  const activate = opts?.activate !== false;
  const existing = state.tabs.find((t) => t.kind === 'chat');
  if (existing) {
    return activate ? activateTab(state, CHAT_TAB_ID, now) : state;
  }
  const tabs = [...state.tabs, createChatTab()];
  const placed = addTabToFocusedLeaf(state.layout, state.focusedPaneId, CHAT_TAB_ID, {
    activate,
  });
  return ensureLayout({
    tabs: activate ? touchActivate(tabs, CHAT_TAB_ID, now) : tabs,
    layout: placed.layout,
    focusedPaneId: placed.focusedPaneId,
  });
}

export function openOrActivateSettings(
  state: WorkspaceTabsState,
  now = Date.now(),
  opts?: { activate?: boolean },
): WorkspaceTabsState {
  const activate = opts?.activate !== false;
  const existing = state.tabs.find((t) => t.kind === 'settings');
  if (existing) {
    return activate ? activateTab(state, SETTINGS_TAB_ID, now) : state;
  }
  const tabs = [...state.tabs, createSettingsTab()];
  const placed = addTabToFocusedLeaf(state.layout, state.focusedPaneId, SETTINGS_TAB_ID, {
    activate,
  });
  return ensureLayout({
    tabs: activate ? touchActivate(tabs, SETTINGS_TAB_ID, now) : tabs,
    layout: placed.layout,
    focusedPaneId: placed.focusedPaneId,
  });
}

export function openOrActivateContentSearch(
  state: WorkspaceTabsState,
  now = Date.now(),
  opts?: { activate?: boolean },
): WorkspaceTabsState {
  const activate = opts?.activate !== false;
  const existing = state.tabs.find((t) => t.kind === 'content-search');
  if (existing) {
    return activate ? activateTab(state, CONTENT_SEARCH_TAB_ID, now) : state;
  }
  const tabs = [...state.tabs, createContentSearchTab()];
  const placed = addTabToFocusedLeaf(state.layout, state.focusedPaneId, CONTENT_SEARCH_TAB_ID, {
    activate,
  });
  return ensureLayout({
    tabs: activate ? touchActivate(tabs, CONTENT_SEARCH_TAB_ID, now) : tabs,
    layout: placed.layout,
    focusedPaneId: placed.focusedPaneId,
  });
}

export type OpenFileTabInput = {
  storageType: FileWorkspaceTab['storageType'];
  path: string;
  currentFile: FileWorkspaceTab['currentFile'];
  editorContent: string;
  editedFileName?: string;
  noteSurface?: FileWorkspaceTab['noteSurface'];
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
    let nextTab: FileWorkspaceTab = tab;
    if (isFileTab(prev)) {
      nextTab = {
        ...tab,
        lastActivatedAt: !activate ? prev.lastActivatedAt : tab.lastActivatedAt,
      };
      const surface = input.noteSurface ?? prev.noteSurface;
      if (surface) {
        nextTab = { ...nextTab, noteSurface: surface };
      }
    } else if (input.noteSurface) {
      nextTab = { ...tab, noteSurface: input.noteSurface };
    }
    tabs = state.tabs.map((t, i) => (i === idx ? nextTab : t));
  } else {
    tabs = [...state.tabs, tab];
  }

  if (!activate) {
    // New tab still needs a leaf slot.
    if (idx < 0) {
      const placed = addTabToFocusedLeaf(state.layout, state.focusedPaneId, tab.id, {
        activate: false,
      });
      return ensureLayout({
        tabs,
        layout: placed.layout,
        focusedPaneId: placed.focusedPaneId,
      });
    }
    return ensureLayout({ ...state, tabs });
  }

  if (idx >= 0) {
    return activateTab({ ...state, tabs }, tab.id, now);
  }
  const placed = addTabToFocusedLeaf(state.layout, state.focusedPaneId, tab.id, {
    activate: true,
  });
  return ensureLayout({
    tabs: touchActivate(tabs, tab.id, now),
    layout: placed.layout,
    focusedPaneId: placed.focusedPaneId,
  });
}

export function patchFileTab(
  state: WorkspaceTabsState,
  id: string,
  patch: Partial<
    Pick<
      FileWorkspaceTab,
      | 'currentFile'
      | 'editorContent'
      | 'baselineContent'
      | 'editedFileName'
      | 'lastActivatedAt'
      | 'noteSurface'
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
 * Close a tab. If it was active in its leaf, activate a neighbor in that leaf.
 */
export function closeTab(state: WorkspaceTabsState, id: string): WorkspaceTabsState {
  const idx = state.tabs.findIndex((t) => t.id === id);
  if (idx < 0) return state;
  const closing = state.tabs[idx];
  if (isFileTab(closing)) {
    revokeFileTabObjectUrl(closing);
  }
  const tabs = state.tabs.filter((t) => t.id !== id);
  const layout = removeTabFromLayout(state.layout, id);
  return ensureLayout({
    tabs,
    layout,
    focusedPaneId: state.focusedPaneId,
  });
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
      ...(destTab.noteSurface || oldTab.noteSurface
        ? { noteSurface: destTab.noteSurface ?? oldTab.noteSurface }
        : {}),
    };
    revokeFileTabObjectUrl(oldTab);
    const tabs = state.tabs
      .filter((t) => t.id !== oldId)
      .map((t) => (t.id === newId ? merged : t));
    const layout = removeTabFromLayout(retargetTabIdInLayout(state.layout, oldId, newId), oldId);
    return ensureLayout({
      tabs,
      layout,
      focusedPaneId: state.focusedPaneId,
    });
  }

  const retargeted: FileWorkspaceTab = {
    ...oldTab,
    id: newId,
    path: newPath,
    currentFile: nextCurrentFile,
    editedFileName: nextName || oldTab.editedFileName,
  };
  const tabs = state.tabs.map((t) => (t.id === oldId ? retargeted : t));
  const layout = retargetTabIdInLayout(state.layout, oldId, newId);
  return ensureLayout({
    tabs,
    layout,
    focusedPaneId: state.focusedPaneId,
  });
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

/**
 * Reorder within the same leaf, or move across leaves when `overId` is in another leaf.
 * Also keeps `tabs[]` order aligned with flattened layout display order.
 */
export function moveTab(
  state: WorkspaceTabsState,
  activeId: string,
  overId: string,
): WorkspaceTabsState {
  if (activeId === overId) return state;
  const fromLeaf = findLeafContainingTab(state.layout, activeId);
  const toLeaf = findLeafContainingTab(state.layout, overId);
  if (!fromLeaf || !toLeaf) return state;

  let layout = state.layout;
  let focusedPaneId = state.focusedPaneId;
  if (fromLeaf.id === toLeaf.id) {
    layout = reorderInLeaf(layout, fromLeaf.id, activeId, overId);
  } else {
    const moved = moveTabToLeaf(layout, activeId, toLeaf.id, {
      activate: true,
      beforeTabId: overId,
    });
    layout = moved.layout;
    focusedPaneId = moved.focusedPaneId;
  }

  const order = flattenTabIdsFromLayout(layout);
  const byId = new Map(state.tabs.map((t) => [t.id, t]));
  const tabs = order.map((id) => byId.get(id)).filter(Boolean) as WorkspaceTab[];
  // Append any missing (should not happen).
  for (const t of state.tabs) {
    if (!order.includes(t.id)) tabs.push(t);
  }

  return ensureLayout({
    tabs,
    layout,
    focusedPaneId,
  });
}

export function splitTabToEdge(
  state: WorkspaceTabsState,
  leafId: string,
  edge: PaneSplitEdge,
  tabId: string,
): WorkspaceTabsState | null {
  if (!state.tabs.some((t) => t.id === tabId)) return null;
  const result = splitLeaf(state.layout, leafId, edge, tabId);
  if (!result) return null;
  const order = flattenTabIdsFromLayout(result.layout);
  const byId = new Map(state.tabs.map((t) => [t.id, t]));
  const tabs = order.map((id) => byId.get(id)).filter(Boolean) as WorkspaceTab[];
  for (const t of state.tabs) {
    if (!order.includes(t.id)) tabs.push(t);
  }
  return ensureLayout({
    tabs,
    layout: result.layout,
    focusedPaneId: result.focusedPaneId,
  });
}

export function moveTabIntoLeaf(
  state: WorkspaceTabsState,
  tabId: string,
  targetLeafId: string,
): WorkspaceTabsState {
  if (!state.tabs.some((t) => t.id === tabId)) return state;
  const moved = moveTabToLeaf(state.layout, tabId, targetLeafId, { activate: true });
  const order = flattenTabIdsFromLayout(moved.layout);
  const byId = new Map(state.tabs.map((t) => [t.id, t]));
  const tabs = order.map((id) => byId.get(id)).filter(Boolean) as WorkspaceTab[];
  for (const t of state.tabs) {
    if (!order.includes(t.id)) tabs.push(t);
  }
  return ensureLayout({
    tabs,
    layout: moved.layout,
    focusedPaneId: moved.focusedPaneId,
  });
}

export function openExportPdfInLeaf(
  state: WorkspaceTabsState,
  leafId: string,
  tabId: string,
): WorkspaceTabsState {
  if (!state.tabs.some((t) => t.id === tabId)) return state;
  const layout = setLeafExportPdf(setLeafActive(state.layout, leafId, tabId), leafId, tabId);
  return ensureLayout({
    ...state,
    layout,
    focusedPaneId: leafId,
  });
}

export function clearExportPdfInLeaf(
  state: WorkspaceTabsState,
  leafId: string,
): WorkspaceTabsState {
  const layout = setLeafExportPdf(state.layout, leafId, null);
  return ensureLayout({
    ...state,
    layout,
  });
}

/** Replace the pane tree (e.g. after layout editor apply). Preserves tab records. */
export function replaceWorkspaceLayout(
  state: WorkspaceTabsState,
  layout: PaneNode,
  focusedPaneId?: string | null,
): WorkspaceTabsState {
  const order = flattenTabIdsFromLayout(layout);
  const byId = new Map(state.tabs.map((t) => [t.id, t]));
  const tabs = order.map((id) => byId.get(id)).filter(Boolean) as WorkspaceTab[];
  for (const t of state.tabs) {
    if (!order.includes(t.id)) tabs.push(t);
  }
  const focus = focusedPaneId || state.focusedPaneId;
  return ensureLayout({
    tabs,
    layout,
    focusedPaneId: focus,
  });
}

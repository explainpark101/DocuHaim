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
  collapseLeafIntoSibling,
  findLeaf,
  findLeafContainingTab,
  flattenTabIdsFromLayout,
  getFocusedLeafActiveId,
  moveTabToLeaf,
  pruneLayoutToTabs,
  removeTabFromLayout,
  reorderInLeaf,
  retargetTabIdInLayout,
  setLeafActive,
  setLeafExportPdf,
  splitLeaf,
  syncLayoutWithTabs,
  countLeaves,
  WORKSPACE_TAB_GROUP_ZONE_ID,
  WORKSPACE_TAB_ORPHAN_ZONE_ID,
  type PaneSplitEdge,
  splitAtWorkspaceEdge,
} from '@/utils/workspaceTabs/paneLayout';
import { swapLeafContents } from '@/utils/workspaceTabs/paneLayoutEdit';

export { WORKSPACE_TAB_GROUP_ZONE_ID, WORKSPACE_TAB_ORPHAN_ZONE_ID };

export const emptyWorkspaceTabsState = (): WorkspaceTabsState => {
  const { layout, focusedPaneId } = defaultWorkspaceLayout();
  return {
    tabs: [],
    activeId: null,
    layout,
    focusedPaneId,
  };
};

function withResolvedActiveId(state: {
  tabs: WorkspaceTab[];
  layout: PaneNode;
  focusedPaneId: string;
  activeId?: string | null;
}): WorkspaceTabsState {
  const tabIds = new Set(state.tabs.map((t) => t.id));
  const preferred = state.activeId;
  const preferredOk = typeof preferred === 'string' && tabIds.has(preferred);
  const preferredInLayout =
    preferredOk && Boolean(findLeafContainingTab(state.layout, preferred));
  // Orphan (outside split group) keeps its own activeId; in-layout follows focused leaf.
  const activeId =
    preferredOk && !preferredInLayout
      ? preferred
      : getFocusedLeafActiveId(state.layout, state.focusedPaneId);
  return {
    tabs: state.tabs,
    layout: state.layout,
    focusedPaneId: state.focusedPaneId,
    activeId,
  };
}

function ensureLayout(state: {
  tabs: WorkspaceTab[];
  layout: PaneNode;
  focusedPaneId: string;
  activeId?: string | null;
}): WorkspaceTabsState {
  const tabIds = state.tabs.map((t) => t.id);
  // While split, allow tabs to live outside the pane tree (orphan / full-window).
  // When unsplit, absorb everyone into the single leaf.
  const synced =
    countLeaves(state.layout) > 1
      ? pruneLayoutToTabs(state.layout, tabIds, state.focusedPaneId)
      : syncLayoutWithTabs(state.layout, tabIds, state.focusedPaneId);
  return withResolvedActiveId({
    tabs: state.tabs,
    layout: synced.layout,
    focusedPaneId: synced.focusedPaneId,
    ...(state.activeId !== undefined ? { activeId: state.activeId } : {}),
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

/** Place a newly opened tab. While split, leave it outside the pane tree (full window). */
function placeNewTab(
  layout: PaneNode,
  focusedPaneId: string,
  tabId: string,
  opts?: { activate?: boolean },
): { layout: PaneNode; focusedPaneId: string; activeId: string | null } {
  const activate = opts?.activate !== false;
  if (activate && countLeaves(layout) > 1) {
    const stripped = removeTabFromLayout(layout, tabId);
    const pruned = pruneLayoutToTabs(
      stripped,
      flattenTabIdsFromLayout(stripped).filter((id) => id !== tabId),
      focusedPaneId,
    );
    return {
      layout: pruned.layout,
      focusedPaneId: pruned.focusedPaneId,
      activeId: tabId,
    };
  }
  const placed = addTabToFocusedLeaf(layout, focusedPaneId, tabId, { activate });
  return { ...placed, activeId: activate ? tabId : null };
}

function tabsOrderedByLayout(
  tabs: WorkspaceTab[],
  layout: PaneNode,
): WorkspaceTab[] {
  const order = flattenTabIdsFromLayout(layout);
  const byId = new Map(tabs.map((t) => [t.id, t]));
  const inLayout = new Set(order);
  const next = order.map((id) => byId.get(id)).filter(Boolean) as WorkspaceTab[];
  for (const t of tabs) {
    if (!inLayout.has(t.id)) next.push(t);
  }
  return next;
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

function reorderOrphanTabs(
  tabs: WorkspaceTab[],
  layout: PaneNode,
  activeId: string,
  overId: string,
): WorkspaceTab[] {
  const inLayout = new Set(flattenTabIdsFromLayout(layout));
  const layoutOrdered = flattenTabIdsFromLayout(layout)
    .map((id) => tabs.find((t) => t.id === id))
    .filter(Boolean) as WorkspaceTab[];
  const orphans = tabs.filter((t) => !inLayout.has(t.id));
  const from = orphans.findIndex((t) => t.id === activeId);
  const to = orphans.findIndex((t) => t.id === overId);
  if (from < 0 || to < 0 || from === to) {
    return tabsOrderedByLayout(tabs, layout);
  }
  const nextOrphans = orphans.slice();
  const [removed] = nextOrphans.splice(from, 1);
  if (!removed) return tabsOrderedByLayout(tabs, layout);
  nextOrphans.splice(to, 0, removed);
  return [...layoutOrdered, ...nextOrphans];
}

/**
 * Remove a tab from the split group so it becomes a full-window orphan.
 * Keeps the remaining split layout intact when other leaves still have tabs.
 */
export function extractTabToOrphan(
  state: WorkspaceTabsState,
  id: string,
  now = Date.now(),
): WorkspaceTabsState {
  if (!state.tabs.some((t) => t.id === id)) return state;
  if (countLeaves(state.layout) <= 1) {
    return activateTab(state, id, now);
  }
  const layout = removeTabFromLayout(state.layout, id);
  const pruned = pruneLayoutToTabs(
    layout,
    flattenTabIdsFromLayout(layout),
    state.focusedPaneId,
  );
  return ensureLayout({
    tabs: touchActivate(tabsOrderedByLayout(state.tabs, pruned.layout), id, now),
    layout: pruned.layout,
    focusedPaneId: pruned.focusedPaneId,
    activeId: id,
  });
}

export function activateTab(state: WorkspaceTabsState, id: string, now = Date.now()): WorkspaceTabsState {
  if (!state.tabs.some((t) => t.id === id)) return state;
  const leaf = findLeafContainingTab(state.layout, id);
  if (leaf) {
    return ensureLayout({
      tabs: touchActivate(state.tabs, id, now),
      layout: setLeafActive(state.layout, leaf.id, id),
      focusedPaneId: leaf.id,
      activeId: id,
    });
  }
  // Outside the split group while split: keep as orphan full-window.
  if (countLeaves(state.layout) > 1) {
    return ensureLayout({
      tabs: touchActivate(state.tabs, id, now),
      layout: state.layout,
      focusedPaneId: state.focusedPaneId,
      activeId: id,
    });
  }
  const added = addTabToFocusedLeaf(state.layout, state.focusedPaneId, id, { activate: true });
  return ensureLayout({
    tabs: touchActivate(state.tabs, id, now),
    layout: added.layout,
    focusedPaneId: added.focusedPaneId,
    activeId: id,
  });
}

/** Activate a tab as a full window (extract from split group when split). */
function activateTabFullWindow(
  state: WorkspaceTabsState,
  id: string,
  now = Date.now(),
): WorkspaceTabsState {
  if (!state.tabs.some((t) => t.id === id)) return state;
  if (countLeaves(state.layout) <= 1) {
    return activateTab(state, id, now);
  }
  return extractTabToOrphan(state, id, now);
}

export function setFocusedPane(state: WorkspaceTabsState, paneId: string): WorkspaceTabsState {
  // Clear orphan preference so the focused leaf's active tab becomes workspace active.
  return ensureLayout({
    tabs: state.tabs,
    layout: state.layout,
    focusedPaneId: paneId,
    activeId: null,
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
    return activate ? activateTabFullWindow(state, CHAT_TAB_ID, now) : state;
  }
  const tabs = [...state.tabs, createChatTab()];
  const placed = placeNewTab(state.layout, state.focusedPaneId, CHAT_TAB_ID, {
    activate,
  });
  const ordered = tabsOrderedByLayout(tabs, placed.layout);
  return ensureLayout({
    tabs: activate ? touchActivate(ordered, CHAT_TAB_ID, now) : ordered,
    layout: placed.layout,
    focusedPaneId: placed.focusedPaneId,
    activeId: placed.activeId,
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
    return activate ? activateTabFullWindow(state, SETTINGS_TAB_ID, now) : state;
  }
  const tabs = [...state.tabs, createSettingsTab()];
  const placed = placeNewTab(state.layout, state.focusedPaneId, SETTINGS_TAB_ID, {
    activate,
  });
  const ordered = tabsOrderedByLayout(tabs, placed.layout);
  return ensureLayout({
    tabs: activate ? touchActivate(ordered, SETTINGS_TAB_ID, now) : ordered,
    layout: placed.layout,
    focusedPaneId: placed.focusedPaneId,
    activeId: placed.activeId,
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
    return activate ? activateTabFullWindow(state, CONTENT_SEARCH_TAB_ID, now) : state;
  }
  const tabs = [...state.tabs, createContentSearchTab()];
  const placed = placeNewTab(state.layout, state.focusedPaneId, CONTENT_SEARCH_TAB_ID, {
    activate,
  });
  const ordered = tabsOrderedByLayout(tabs, placed.layout);
  return ensureLayout({
    tabs: activate ? touchActivate(ordered, CONTENT_SEARCH_TAB_ID, now) : ordered,
    layout: placed.layout,
    focusedPaneId: placed.focusedPaneId,
    activeId: placed.activeId,
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
    // New tab still needs a leaf slot (background restore shells stay in focused leaf).
    if (idx < 0) {
      const placed = placeNewTab(state.layout, state.focusedPaneId, tab.id, {
        activate: false,
      });
      return ensureLayout({
        tabs: tabsOrderedByLayout(tabs, placed.layout),
        layout: placed.layout,
        focusedPaneId: placed.focusedPaneId,
        activeId: placed.activeId,
      });
    }
    return ensureLayout({ ...state, tabs });
  }

  if (idx >= 0) {
    return activateTabFullWindow({ ...state, tabs }, tab.id, now);
  }
  const placed = placeNewTab(state.layout, state.focusedPaneId, tab.id, {
    activate: true,
  });
  return ensureLayout({
    tabs: touchActivate(tabsOrderedByLayout(tabs, placed.layout), tab.id, now),
    layout: placed.layout,
    focusedPaneId: placed.focusedPaneId,
    activeId: placed.activeId,
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
 * Reorder within the same leaf, move across leaves, leave the split group
 * (orphan zone / orphan tab), or join the group (group zone / in-group tab).
 */
export function moveTab(
  state: WorkspaceTabsState,
  activeId: string,
  overId: string,
): WorkspaceTabsState {
  if (activeId === overId) return state;
  if (!state.tabs.some((t) => t.id === activeId)) return state;

  const fromLeaf = findLeafContainingTab(state.layout, activeId);

  if (overId === WORKSPACE_TAB_ORPHAN_ZONE_ID) {
    return fromLeaf ? extractTabToOrphan(state, activeId) : state;
  }

  if (overId === WORKSPACE_TAB_GROUP_ZONE_ID) {
    if (fromLeaf) return state;
    if (countLeaves(state.layout) <= 1) {
      return activateTab(state, activeId);
    }
    return moveTabIntoLeaf(state, activeId, state.focusedPaneId);
  }

  const toLeaf = findLeafContainingTab(state.layout, overId);
  const overIsTab = state.tabs.some((t) => t.id === overId);

  if (!overIsTab) return state;

  // Orphan → join leaf at over position.
  if (!fromLeaf && toLeaf) {
    const moved = moveTabToLeaf(state.layout, activeId, toLeaf.id, {
      activate: true,
      beforeTabId: overId,
    });
    return ensureLayout({
      tabs: tabsOrderedByLayout(state.tabs, moved.layout),
      layout: moved.layout,
      focusedPaneId: moved.focusedPaneId,
      activeId,
    });
  }

  // In-group → drop onto orphan tab: leave split, then reorder orphans.
  if (fromLeaf && !toLeaf) {
    const extracted = extractTabToOrphan(state, activeId);
    return ensureLayout({
      tabs: reorderOrphanTabs(extracted.tabs, extracted.layout, activeId, overId),
      layout: extracted.layout,
      focusedPaneId: extracted.focusedPaneId,
      activeId,
    });
  }

  // Both orphans: reorder among outside-group tabs.
  if (!fromLeaf && !toLeaf) {
    return ensureLayout({
      tabs: reorderOrphanTabs(state.tabs, state.layout, activeId, overId),
      layout: state.layout,
      focusedPaneId: state.focusedPaneId,
      activeId: state.activeId,
    });
  }

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

  return ensureLayout({
    tabs: tabsOrderedByLayout(state.tabs, layout),
    layout,
    focusedPaneId,
    activeId,
  });
}

export type SplitTabToEdgeResult =
  | { ok: true; state: WorkspaceTabsState }
  | { ok: false; reason: 'soft-cap' | 'missing' };

export function splitTabToEdge(
  state: WorkspaceTabsState,
  leafId: string,
  edge: PaneSplitEdge,
  tabId: string,
  softCap?: number,
): SplitTabToEdgeResult {
  if (!state.tabs.some((t) => t.id === tabId)) return { ok: false, reason: 'missing' };
  const result = splitLeaf(state.layout, leafId, edge, tabId, softCap);
  if (!result.ok) return { ok: false, reason: result.reason };
  const order = flattenTabIdsFromLayout(result.layout);
  const byId = new Map(state.tabs.map((t) => [t.id, t]));
  const tabs = order.map((id) => byId.get(id)).filter(Boolean) as WorkspaceTab[];
  for (const t of state.tabs) {
    if (!order.includes(t.id)) tabs.push(t);
  }
  return {
    ok: true,
    state: ensureLayout({
      tabs,
      layout: result.layout,
      focusedPaneId: result.focusedPaneId,
    }),
  };
}

/** Full-height / full-width strip wrapping the entire workspace layout. */
export function splitTabToWorkspaceEdge(
  state: WorkspaceTabsState,
  edge: PaneSplitEdge,
  tabId: string,
  softCap?: number,
): SplitTabToEdgeResult {
  if (!state.tabs.some((t) => t.id === tabId)) return { ok: false, reason: 'missing' };
  const result = splitAtWorkspaceEdge(state.layout, edge, tabId, softCap);
  if (!result.ok) return { ok: false, reason: result.reason };
  const order = flattenTabIdsFromLayout(result.layout);
  const byId = new Map(state.tabs.map((t) => [t.id, t]));
  const tabs = order.map((id) => byId.get(id)).filter(Boolean) as WorkspaceTab[];
  for (const t of state.tabs) {
    if (!order.includes(t.id)) tabs.push(t);
  }
  return {
    ok: true,
    state: ensureLayout({
      tabs,
      layout: result.layout,
      focusedPaneId: result.focusedPaneId,
    }),
  };
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
    activeId: tabId,
  });
}

/**
 * Center drop onto another pane: swap both leaves' contents (pane positions).
 * Same leaf or orphan tab → join via moveTabIntoLeaf.
 */
export function swapPanesOrMoveTabToCenter(
  state: WorkspaceTabsState,
  tabId: string,
  targetLeafId: string,
): WorkspaceTabsState {
  if (!state.tabs.some((t) => t.id === tabId)) return state;
  if (!findLeaf(state.layout, targetLeafId)) return state;
  const source = findLeafContainingTab(state.layout, tabId);
  if (!source || source.id === targetLeafId) {
    return moveTabIntoLeaf(state, tabId, targetLeafId);
  }
  const layout = swapLeafContents(state.layout, source.id, targetLeafId);
  if (layout === state.layout) return state;
  return ensureLayout({
    tabs: state.tabs,
    layout,
    focusedPaneId: targetLeafId,
    activeId: tabId,
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

/** Dismiss a split pane: move its tabs outside the group as background orphans
 * (do not steal focus) and collapse the empty leaf. */
export function collapsePaneLeaf(
  state: WorkspaceTabsState,
  leafId: string,
): WorkspaceTabsState {
  if (countLeaves(state.layout) <= 1) return state;
  const leaf = findLeaf(state.layout, leafId);
  if (!leaf) return state;

  const leaveIds = leaf.tabIds.slice();
  const leaveSet = new Set(leaveIds);
  if (leaveIds.length === 0) {
    const result = collapseLeafIntoSibling(state.layout, leafId);
    if (!result) return state;
    return ensureLayout({
      tabs: tabsOrderedByLayout(state.tabs, result.layout),
      layout: result.layout,
      focusedPaneId: result.focusedPaneId,
      activeId: state.activeId,
    });
  }

  let layout = state.layout;
  for (const id of leaveIds) {
    layout = removeTabFromLayout(layout, id);
  }
  const pruned = pruneLayoutToTabs(
    layout,
    flattenTabIdsFromLayout(layout),
    state.focusedPaneId,
  );

  // Keep focus on the current tab when it was not in the dismissed pane.
  // Otherwise stay on the remaining split leaf (never jump to the new orphans).
  const keepActive =
    typeof state.activeId === 'string' &&
    state.tabs.some((t) => t.id === state.activeId) &&
    !leaveSet.has(state.activeId)
      ? state.activeId
      : getFocusedLeafActiveId(pruned.layout, pruned.focusedPaneId);

  return ensureLayout({
    tabs: tabsOrderedByLayout(state.tabs, pruned.layout),
    layout: pruned.layout,
    focusedPaneId: pruned.focusedPaneId,
    activeId: keepActive,
  });
}

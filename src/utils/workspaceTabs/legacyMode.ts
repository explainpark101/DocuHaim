import {
  CHAT_TAB_ID,
  CONTENT_SEARCH_TAB_ID,
  SETTINGS_TAB_ID,
  defaultWorkspaceLayout,
  type FileWorkspaceTab,
  type WorkspaceTab,
  type WorkspaceTabsState,
} from '@/utils/workspaceTabs/types';
import { isFileTab, revokeFileTabObjectUrl } from '@/utils/workspaceTabs/helpers';
import { getActiveTab } from '@/utils/workspaceTabs/workspaceTabsStore';
import {
  createSingleLeafLayout,
  removeTabFromLayout,
  syncLayoutWithTabs,
} from '@/utils/workspaceTabs/paneLayout';

function withSingleLeaf(tabs: WorkspaceTab[], activeId: string | null): WorkspaceTabsState {
  const tabIds = tabs.map((t) => t.id);
  const layout = createSingleLeafLayout(tabIds, activeId);
  return {
    tabs,
    activeId: layout.activeId,
    layout,
    focusedPaneId: layout.id,
  };
}

/**
 * Collapse multi-tab state to legacy single-slot:
 * - keep only one file tab (active file, else most recently activated file)
 * - drop chat / settings tabs (legacy uses exclusive /chat and /settings routes)
 * - revoke objectUrls for closed file tabs
 */
export function collapseWorkspaceToLegacy(state: WorkspaceTabsState): WorkspaceTabsState {
  const active = getActiveTab(state);
  let keepFile: FileWorkspaceTab | null = isFileTab(active) ? active : null;
  if (!keepFile) {
    const files = state.tabs.filter(isFileTab);
    if (files.length > 0) {
      keepFile = files.reduce((a, b) =>
        a.lastActivatedAt >= b.lastActivatedAt ? a : b,
      );
    }
  }

  for (const tab of state.tabs) {
    if (!isFileTab(tab)) continue;
    if (keepFile && tab.id === keepFile.id) continue;
    revokeFileTabObjectUrl(tab);
  }

  if (keepFile) {
    return withSingleLeaf([keepFile], keepFile.id);
  }
  const { layout, focusedPaneId } = defaultWorkspaceLayout();
  return { tabs: [], activeId: null, layout, focusedPaneId };
}

/** After opening a file in legacy mode, drop every other file tab and any chat tab. */
export function retainOnlyFileTab(
  state: WorkspaceTabsState,
  fileTabId: string,
): WorkspaceTabsState {
  const keep = state.tabs.find((t) => t.id === fileTabId);
  if (!keep || !isFileTab(keep)) {
    return collapseWorkspaceToLegacy(state);
  }
  for (const tab of state.tabs) {
    if (tab.id === keep.id) continue;
    if (isFileTab(tab)) revokeFileTabObjectUrl(tab);
  }
  return withSingleLeaf([keep], keep.id);
}

function stripKind(
  state: WorkspaceTabsState,
  kind: 'chat' | 'settings' | 'content-search',
  singletonId: string,
): WorkspaceTabsState {
  const tabs = state.tabs.filter((t) => t.kind !== kind);
  const layout = removeTabFromLayout(state.layout, singletonId);
  const synced = syncLayoutWithTabs(
    layout,
    tabs.map((t) => t.id),
    state.focusedPaneId,
  );
  return {
    tabs,
    layout: synced.layout,
    focusedPaneId: synced.focusedPaneId,
    activeId:
      state.activeId === singletonId
        ? (synced.layout.type === 'leaf'
            ? synced.layout.activeId
            : tabs[0]?.id ?? null)
        : state.activeId && tabs.some((t) => t.id === state.activeId)
          ? state.activeId
          : (tabs[0]?.id ?? null),
  };
}

export function stripChatTab(state: WorkspaceTabsState): WorkspaceTabsState {
  return stripKind(state, 'chat', CHAT_TAB_ID);
}

export function stripContentSearchTab(state: WorkspaceTabsState): WorkspaceTabsState {
  return stripKind(state, 'content-search', CONTENT_SEARCH_TAB_ID);
}

export function stripSettingsTab(state: WorkspaceTabsState): WorkspaceTabsState {
  return stripKind(state, 'settings', SETTINGS_TAB_ID);
}

export type { WorkspaceTab };

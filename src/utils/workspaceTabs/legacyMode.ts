import {
  CHAT_TAB_ID,
  SETTINGS_TAB_ID,
  type FileWorkspaceTab,
  type WorkspaceTab,
  type WorkspaceTabsState,
} from '@/utils/workspaceTabs/types';
import { isFileTab, revokeFileTabObjectUrl } from '@/utils/workspaceTabs/helpers';
import { getActiveTab } from '@/utils/workspaceTabs/workspaceTabsStore';

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
    return { tabs: [keepFile], activeId: keepFile.id };
  }
  return { tabs: [], activeId: null };
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
  return { tabs: [keep], activeId: keep.id };
}

export function stripChatTab(state: WorkspaceTabsState): WorkspaceTabsState {
  const tabs = state.tabs.filter((t) => t.kind !== 'chat');
  const activeId =
    state.activeId === CHAT_TAB_ID
      ? (tabs[0]?.id ?? null)
      : state.activeId && tabs.some((t) => t.id === state.activeId)
        ? state.activeId
        : (tabs[0]?.id ?? null);
  return { tabs, activeId };
}

export function stripSettingsTab(state: WorkspaceTabsState): WorkspaceTabsState {
  const tabs = state.tabs.filter((t) => t.kind !== 'settings');
  const activeId =
    state.activeId === SETTINGS_TAB_ID
      ? (tabs[0]?.id ?? null)
      : state.activeId && tabs.some((t) => t.id === state.activeId)
        ? state.activeId
        : (tabs[0]?.id ?? null);
  return { tabs, activeId };
}

export type { WorkspaceTab };

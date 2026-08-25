export type {
  ChatWorkspaceTab,
  FileStorageType,
  FileWorkspaceTab,
  PersistedWorkspaceTab,
  PersistedWorkspaceTabs,
  SettingsWorkspaceTab,
  WorkspaceTab,
  WorkspaceTabsState,
} from '@/utils/workspaceTabs/types';
export {
  CHAT_TAB_ID,
  EDITABLE_VIEWERS,
  LAST_FILE_KEY,
  SETTINGS_TAB_ID,
  WORKSPACE_TABS_STORAGE_KEY,
  WORKSPACE_TAB_SOFT_CAP,
  isEditableViewer,
} from '@/utils/workspaceTabs/types';
export {
  anyFileTabDirty,
  createChatTab,
  createFileTab,
  createSettingsTab,
  fileTabId,
  isChatTab,
  isFileTab,
  isFileTabDirty,
  isSettingsTab,
  revokeFileTabObjectUrl,
  tabDirectoryPath,
  tabDisplayTitle,
} from '@/utils/workspaceTabs/helpers';
export {
  clearPersistedWorkspaceTabs,
  loadPersistedWorkspaceTabs,
  savePersistedWorkspaceTabs,
  toPersistedWorkspaceTabs,
} from '@/utils/workspaceTabs/persistence';
export {
  activateTab,
  closeTab,
  emptyWorkspaceTabsState,
  evictForSoftCap,
  findFileTab,
  getActiveFileTab,
  getActiveTab,
  moveTab,
  openOrActivateChat,
  openOrActivateSettings,
  openOrReplaceFileTab,
  patchFileTab,
  retargetFileTab,
  retargetFileTabsByPathPrefix,
} from '@/utils/workspaceTabs/workspaceTabsStore';
export type { RetargetFileTabInput, OpenFileTabInput } from '@/utils/workspaceTabs/workspaceTabsStore';
export {
  CLOSED_TAB_HISTORY_KEY,
  CLOSED_TAB_HISTORY_MAX,
  clearClosedTabHistory,
  closedTabEntryFromWorkspaceTab,
  closedTabHistoryLength,
  loadClosedTabHistory,
  popClosedTab,
  pushClosedTab,
  saveClosedTabHistory,
} from '@/utils/workspaceTabs/closedTabHistory';
export type { ClosedTabEntry } from '@/utils/workspaceTabs/closedTabHistory';
export {
  LAST_OPEN_TABS_RESTORE_KEY,
  TABS_RESTORE_QUEUE_KEY,
  clearLastOpenTabsSnapshot,
  clearTabsRestoreQueue,
  loadLastOpenTabsSnapshot,
  pickWorkspaceTabsRestoreSource,
  persistedTabId,
  persistedTabToClosedEntry,
  popTabsRestoreQueue,
  saveLastOpenTabsSnapshot,
  seedTabsRestoreQueueFromSnapshot,
  tabsRestoreQueueLength,
} from '@/utils/workspaceTabs/lastOpenTabsRestore';

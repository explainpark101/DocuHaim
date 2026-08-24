export type {
  ChatWorkspaceTab,
  FileStorageType,
  FileWorkspaceTab,
  PersistedWorkspaceTab,
  PersistedWorkspaceTabs,
  SettingsWorkspaceTab,
  WorkspaceTab,
  WorkspaceTabsState,
} from './types';
export {
  CHAT_TAB_ID,
  EDITABLE_VIEWERS,
  LAST_FILE_KEY,
  SETTINGS_TAB_ID,
  WORKSPACE_TABS_STORAGE_KEY,
  WORKSPACE_TAB_SOFT_CAP,
  isEditableViewer,
} from './types';
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
} from './helpers';
export {
  clearPersistedWorkspaceTabs,
  loadPersistedWorkspaceTabs,
  savePersistedWorkspaceTabs,
  toPersistedWorkspaceTabs,
} from './persistence';
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
} from './workspaceTabsStore';
export type { RetargetFileTabInput, OpenFileTabInput } from './workspaceTabsStore';
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
} from './closedTabHistory';
export type { ClosedTabEntry } from './closedTabHistory';
export {
  LAST_OPEN_TABS_RESTORE_KEY,
  TABS_RESTORE_QUEUE_KEY,
  clearLastOpenTabsSnapshot,
  clearTabsRestoreQueue,
  loadLastOpenTabsSnapshot,
  persistedTabId,
  persistedTabToClosedEntry,
  popTabsRestoreQueue,
  saveLastOpenTabsSnapshot,
  seedTabsRestoreQueueFromSnapshot,
  tabsRestoreQueueLength,
} from './lastOpenTabsRestore';

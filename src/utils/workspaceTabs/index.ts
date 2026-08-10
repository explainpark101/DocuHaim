export type {
  ChatWorkspaceTab,
  FileStorageType,
  FileWorkspaceTab,
  PersistedWorkspaceTab,
  PersistedWorkspaceTabs,
  WorkspaceTab,
  WorkspaceTabsState,
} from './types';
export {
  CHAT_TAB_ID,
  EDITABLE_VIEWERS,
  LAST_FILE_KEY,
  WORKSPACE_TABS_STORAGE_KEY,
  WORKSPACE_TAB_SOFT_CAP,
  isEditableViewer,
} from './types';
export {
  anyFileTabDirty,
  createChatTab,
  createFileTab,
  fileTabId,
  isChatTab,
  isFileTab,
  isFileTabDirty,
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
  openOrActivateChat,
  openOrReplaceFileTab,
  patchFileTab,
} from './workspaceTabsStore';

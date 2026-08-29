import { createContext } from 'react';

/** Chrome-only shell bag (&lt;30 keys). Prefer domain hooks for vault/file/tree/tabs. */
export type AppChromeValue = {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean | ((p: boolean) => boolean)) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean | ((p: boolean) => boolean)) => void;
  isMobile: boolean;
  chatSurfaceActive: boolean;
  lockChatViewport: boolean;
  isChatRoute: boolean;
  isSettingsRoute: boolean;
  isContentSearchRoute: boolean;
  appName: string;
  handleBrandClick: (...args: any[]) => any;
  chatAttachDropHost: any;
  setChatAttachDropHost: (...args: any[]) => any;
  handleDropToChatAttach: (...args: any[]) => any;
  handleRegisterChatAttachDrop: (...args: any[]) => any;
  fileTabContextMenuRef: { current: any };
  expandPathsRef: { current: any };
  showHiddenFolders: boolean;
  showTrashFolder: boolean;
  hideRecordingCompanions: boolean;
  treeStickyFolderPathEnabled: boolean;
  showTreeModifiedDate: boolean;
  treeHoverExpandSettings: any;
  setTreeHoverExpandSettings: (...args: any[]) => any;
  uploadFileInputRef: { current: any };
  uploadFolderInputRef: { current: any };
  handleUploadFileSelect: (...args: any[]) => any;
  handleUploadFolderSelect: (...args: any[]) => any;
  operationStatus: string;
};

export const AppChromeContext = createContext<AppChromeValue | null>(null);

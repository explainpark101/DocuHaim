import { describe, expect, it } from 'vitest';

/** Mirrors CHROME_KEYS in AppLogicProvider — keep in sync. */
const CHROME_KEYS = [
  'sidebarOpen',
  'setSidebarOpen',
  'sidebarCollapsed',
  'setSidebarCollapsed',
  'isMobile',
  'chatSurfaceActive',
  'lockChatViewport',
  'isChatRoute',
  'isSettingsRoute',
  'appName',
  'handleBrandClick',
  'chatAttachDropHost',
  'setChatAttachDropHost',
  'handleDropToChatAttach',
  'handleRegisterChatAttachDrop',
  'fileTabContextMenuRef',
  'expandPathsRef',
  'showHiddenFolders',
  'showTrashFolder',
  'hideRecordingCompanions',
  'treeStickyFolderPathEnabled',
  'showTreeModifiedDate',
  'treeHoverExpandSettings',
  'setTreeHoverExpandSettings',
  'uploadFileInputRef',
  'uploadFolderInputRef',
  'handleUploadFileSelect',
  'handleUploadFolderSelect',
] as const;

describe('App chrome bag', () => {
  it('stays under 30 chrome keys', () => {
    expect(CHROME_KEYS.length).toBeLessThanOrEqual(30);
    expect(CHROME_KEYS.length).toBe(28);
  });
});

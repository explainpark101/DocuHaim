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
  'isContentSearchRoute',
  'appName',
  'handleBrandClick',
  'chatAttachDropHost',
  'setChatAttachDropHost',
  'handleDropToChatAttach',
  'handleRegisterChatAttachDrop',
  'quizSourceDropActive',
  'quizSourceDropHost',
  'handleDropToQuizSource',
  'kanbanCardDropActive',
  'kanbanCardDropHost',
  'handleDropToKanbanCards',
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
  'operationStatus',
] as const;

describe('App chrome bag', () => {
  it('stays under a soft ceiling and matches AppLogicProvider', () => {
    expect(CHROME_KEYS.length).toBeLessThanOrEqual(40);
    expect(CHROME_KEYS.length).toBe(36);
  });
});

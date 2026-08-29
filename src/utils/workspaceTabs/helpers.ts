import {
  CHAT_TAB_ID,
  CONTENT_SEARCH_TAB_ID,
  SETTINGS_TAB_ID,
  type ChatWorkspaceTab,
  type ContentSearchWorkspaceTab,
  type FileStorageType,
  type FileWorkspaceTab,
  type SettingsWorkspaceTab,
  type WorkspaceTab,
  isEditableViewer,
} from '@/utils/workspaceTabs/types';

export function fileTabId(storageType: string, path: string): string {
  return `${storageType}:${path}`;
}

export function createChatTab(): ChatWorkspaceTab {
  return { id: CHAT_TAB_ID, kind: 'chat' };
}

export function createSettingsTab(): SettingsWorkspaceTab {
  return { id: SETTINGS_TAB_ID, kind: 'settings' };
}

export function createContentSearchTab(): ContentSearchWorkspaceTab {
  return { id: CONTENT_SEARCH_TAB_ID, kind: 'content-search' };
}

export function createFileTab(params: {
  storageType: FileStorageType;
  path: string;
  currentFile: FileWorkspaceTab['currentFile'];
  editorContent: string;
  editedFileName?: string;
  now?: number;
}): FileWorkspaceTab {
  const { storageType, path, currentFile, editorContent } = params;
  const now = params.now ?? Date.now();
  const baseline =
    typeof currentFile.content === 'string' ? currentFile.content : editorContent;
  return {
    id: fileTabId(storageType, path),
    kind: 'file',
    storageType,
    path,
    currentFile,
    editorContent,
    baselineContent: baseline,
    editedFileName: params.editedFileName ?? String(currentFile.name ?? path.split('/').pop() ?? ''),
    lastActivatedAt: now,
  };
}

export function isChatTab(tab: WorkspaceTab | null | undefined): tab is ChatWorkspaceTab {
  return tab?.kind === 'chat';
}

export function isSettingsTab(tab: WorkspaceTab | null | undefined): tab is SettingsWorkspaceTab {
  return tab?.kind === 'settings';
}

export function isContentSearchTab(
  tab: WorkspaceTab | null | undefined,
): tab is ContentSearchWorkspaceTab {
  return tab?.kind === 'content-search';
}

export function isFileTab(tab: WorkspaceTab | null | undefined): tab is FileWorkspaceTab {
  return tab?.kind === 'file';
}

export function isFileTabDirty(tab: FileWorkspaceTab): boolean {
  const viewer = typeof tab.currentFile.viewer === 'string' ? tab.currentFile.viewer : 'markdown';
  if (!isEditableViewer(viewer)) return false;
  return tab.baselineContent !== tab.editorContent;
}

export function anyFileTabDirty(tabs: WorkspaceTab[]): boolean {
  return tabs.some((t) => isFileTab(t) && isFileTabDirty(t));
}

export function tabDisplayTitle(tab: WorkspaceTab): string {
  if (tab.kind === 'chat') return '나와의 채팅';
  if (tab.kind === 'settings') return '설정';
  if (tab.kind === 'content-search') return '본문 검색';
  const name = tab.editedFileName || String(tab.currentFile.name || '') || tab.path;
  return name.split('/').filter(Boolean).pop() || name || tab.path;
}

/** Parent directory of a file tab path (POSIX-style). Root → `/`. */
export function tabDirectoryPath(tab: FileWorkspaceTab): string {
  const raw = String(tab.path || '').replace(/\\/g, '/');
  const parts = raw.split('/').filter(Boolean);
  if (parts.length <= 1) return '/';
  return parts.slice(0, -1).join('/');
}

export function revokeFileTabObjectUrl(tab: FileWorkspaceTab): void {
  const file = tab.currentFile;
  const viewer = file.viewer;
  if (
    (viewer === 'image' || viewer === 'pdf' || viewer === 'audio' || viewer === 'video') &&
    typeof file.objectUrl === 'string' &&
    file.objectUrl
  ) {
    try {
      URL.revokeObjectURL(file.objectUrl);
    } catch {
      // ignore
    }
  }
}

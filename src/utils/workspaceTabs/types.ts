/** Fixed id for the singleton 「나와의 채팅」 tab. */
export const CHAT_TAB_ID = 'chat' as const;

/** Fixed id for the singleton settings tab. */
export const SETTINGS_TAB_ID = 'settings' as const;

/** Fixed id for the singleton vault content search tab. */
export const CONTENT_SEARCH_TAB_ID = 'content-search' as const;

/** Soft max open file tabs (chat / settings excluded). */
export const WORKSPACE_TAB_SOFT_CAP = 12;

export const WORKSPACE_TABS_STORAGE_KEY = 's3haim_workspaceTabs';

/** Legacy single-slot key (compat hydrate). */
export const LAST_FILE_KEY = 's3haim_lastFile';

export type FileStorageType = 's3' | 'local' | 'webdav' | 'session';

export type ChatWorkspaceTab = {
  id: typeof CHAT_TAB_ID;
  kind: 'chat';
};

export type SettingsWorkspaceTab = {
  id: typeof SETTINGS_TAB_ID;
  kind: 'settings';
};

export type ContentSearchWorkspaceTab = {
  id: typeof CONTENT_SEARCH_TAB_ID;
  kind: 'content-search';
};

export type FileWorkspaceTab = {
  id: string;
  kind: 'file';
  storageType: FileStorageType;
  path: string;
  /** App router pathname for this tab (`/view/...`, `/quiz/...`, …). */
  appRoute?: string;
  /** Opened file payload (same shape as App `currentFile`). */
  currentFile: Record<string, unknown> & {
    type?: string;
    id?: string;
    name?: string;
    content?: string;
    viewer?: string;
    objectUrl?: string;
  };
  editorContent: string;
  /** Dirty compare baseline (usually last loaded/saved `content`). */
  baselineContent: string;
  editedFileName: string;
  lastActivatedAt: number;
};

export type WorkspaceTab =
  | ChatWorkspaceTab
  | SettingsWorkspaceTab
  | ContentSearchWorkspaceTab
  | FileWorkspaceTab;

export type WorkspaceTabsState = {
  tabs: WorkspaceTab[];
  activeId: string | null;
};

export type PersistedWorkspaceTab =
  | { kind: 'chat' }
  | { kind: 'settings' }
  | { kind: 'content-search' }
  | { kind: 'file'; type: FileStorageType; path: string; appRoute?: string };

export type PersistedWorkspaceTabs = {
  version: 1;
  tabs: PersistedWorkspaceTab[];
  activeId: string | null;
};

export const EDITABLE_VIEWERS = ['markdown', 'json', 'raw', 'html', 'svg'] as const;

export function isEditableViewer(viewer: string | undefined): boolean {
  return EDITABLE_VIEWERS.includes((viewer || 'markdown') as (typeof EDITABLE_VIEWERS)[number]);
}

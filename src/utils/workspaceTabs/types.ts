import type { PaneNode, PersistedPaneNode } from '@/utils/workspaceTabs/paneLayout';
import { createSingleLeafLayout } from '@/utils/workspaceTabs/paneLayout';

/** Fixed id for the singleton 「나와의 채팅」 tab. */
export const CHAT_TAB_ID = 'chat' as const;

/** Fixed id for the singleton settings tab. */
export const SETTINGS_TAB_ID = 'settings' as const;

/** Fixed id for the singleton vault content search tab. */
export const CONTENT_SEARCH_TAB_ID = 'content-search' as const;

/** Fixed id for the singleton LLM Assist split-pane tab. */
export const LLM_ASSIST_TAB_ID = 'llm-assist' as const;

/** Soft max open file tabs (chat / settings excluded). */
export const WORKSPACE_TAB_SOFT_CAP = 12;

export const WORKSPACE_TABS_STORAGE_KEY = 's3haim_workspaceTabs';

/** Legacy single-slot key (compat hydrate). */
export const LAST_FILE_KEY = 's3haim_lastFile';

export type FileStorageType = 's3' | 'local' | 'webdav' | 'idb' | 'session';

/** Quiz vs markdown editor for `.quiz.md` file tabs (per-tab, not pathname-only). */
export type FileNoteSurface = 'edit' | 'quiz';

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

export type LlmAssistWorkspaceTab = {
  id: typeof LLM_ASSIST_TAB_ID;
  kind: 'llm-assist';
};

export type FileWorkspaceTab = {
  id: string;
  kind: 'file';
  storageType: FileStorageType;
  path: string;
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
  /** For `.quiz.md`: quiz runner vs markdown editor. Default inferred when activating. */
  noteSurface?: FileNoteSurface;
};

export type WorkspaceTab =
  | ChatWorkspaceTab
  | SettingsWorkspaceTab
  | ContentSearchWorkspaceTab
  | LlmAssistWorkspaceTab
  | FileWorkspaceTab;

export type WorkspaceTabsState = {
  tabs: WorkspaceTab[];
  /** Focused leaf's active tab (mirrors layout). */
  activeId: string | null;
  layout: PaneNode;
  focusedPaneId: string;
};

export type PersistedWorkspaceTab =
  | { kind: 'chat' }
  | { kind: 'settings' }
  | { kind: 'content-search' }
  | { kind: 'llm-assist' }
  | { kind: 'file'; type: FileStorageType; path: string };

export type PersistedWorkspaceTabsV1 = {
  version: 1;
  tabs: PersistedWorkspaceTab[];
  activeId: string | null;
};

export type PersistedWorkspaceTabs = {
  version: 2;
  tabs: PersistedWorkspaceTab[];
  activeId: string | null;
  layout: PersistedPaneNode;
  focusedPaneId: string;
};

/** @deprecated Use PersistedWorkspaceTabs (v2). Kept for callers that only need tabs/activeId. */
export type PersistedWorkspaceTabsCompat = PersistedWorkspaceTabsV1 | PersistedWorkspaceTabs;

export const EDITABLE_VIEWERS = ['markdown', 'json', 'raw', 'html', 'svg'] as const;

export function isEditableViewer(viewer: string | undefined): boolean {
  return EDITABLE_VIEWERS.includes((viewer || 'markdown') as (typeof EDITABLE_VIEWERS)[number]);
}

export function defaultWorkspaceLayout(
  tabIds: string[] = [],
  activeId: string | null = null,
): { layout: PaneNode; focusedPaneId: string } {
  const layout = createSingleLeafLayout(tabIds, activeId);
  return { layout, focusedPaneId: layout.id };
}

import type { FileWorkspaceTab, WorkspaceTabsState } from '@/utils/workspaceTabs/types';
import { closedTabEntryFromWorkspaceTab, pushClosedTab } from '@/utils/workspaceTabs/closedTabHistory';
import { tabDisplayTitle } from '@/utils/workspaceTabs/helpers';
import {
  activateTab,
  closeTab,
  evictForSoftCap,
  findFileTab,
  getActiveFileTab,
  moveTab,
  openOrActivateChat,
  openOrActivateContentSearch,
  openOrActivateSettings,
  openOrReplaceFileTab,
  patchFileTab,
  retargetFileTab,
  retargetFileTabsByPathPrefix,
} from '@/utils/workspaceTabs/workspaceTabsStore';

export function flushEditorIntoActiveFileTab(
  state: WorkspaceTabsState,
  payload: {
    editorContent: string;
    currentFile: FileWorkspaceTab['currentFile'] | null;
    editedFileName: string;
  },
): WorkspaceTabsState {
  const active = getActiveFileTab(state);
  if (!active) return state;
  const incoming = payload.currentFile;
  // Never rewrite the active tab in place when the editor already points at
  // another path (e.g. create-file used to setCurrentFile without a new tab).
  if (
    incoming
    && typeof incoming.id === 'string'
    && incoming.id
    && incoming.id !== active.path
    && incoming.id !== active.currentFile?.id
  ) {
    return state;
  }
  const nextFile: FileWorkspaceTab['currentFile'] = incoming
    ? {
        ...active.currentFile,
        ...incoming,
        content:
          typeof active.currentFile.content === 'string'
            ? active.currentFile.content
            : typeof incoming.content === 'string'
              ? incoming.content
              : active.baselineContent,
      }
    : active.currentFile;
  return patchFileTab(state, active.id, {
    editorContent: payload.editorContent,
    currentFile: nextFile,
    editedFileName: payload.editedFileName || active.editedFileName,
  });
}

export function applyOpenedFileReducer(
  state: WorkspaceTabsState,
  file: FileWorkspaceTab['currentFile'],
  editorContent: string,
  opts?: {
    promptCloseDirty?: (tab: FileWorkspaceTab) => boolean;
    /** When false, update an existing tab without changing activeId (default true). */
    activate?: boolean;
  },
): WorkspaceTabsState {
  const activate = opts?.activate !== false;
  const storageType = String(file.type || '') as FileWorkspaceTab['storageType'];
  const path = String(file.id || '');
  if (!storageType || !path) return state;

  const existing = findFileTab(state, storageType, path);
  if (!existing) {
    // Background load finished after the tab was closed — discard.
    if (!activate) return state;
    const evictOpts =
      opts?.promptCloseDirty != null ? { promptCloseDirty: opts.promptCloseDirty } : {};
    const evicted = evictForSoftCap(state.tabs, evictOpts);
    if (!evicted) return state;
    for (const tab of evicted.closed) {
      pushClosedTab(closedTabEntryFromWorkspaceTab(tab));
    }
    return openOrReplaceFileTab(
      { ...state, tabs: evicted.tabs },
      {
        storageType,
        path,
        currentFile: file,
        editorContent,
        editedFileName: String(file.name || ''),
      },
      Date.now(),
      { activate },
    );
  }

  return openOrReplaceFileTab(
    state,
    {
      storageType,
      path,
      currentFile: file,
      editorContent,
      editedFileName: String(file.name || ''),
    },
    Date.now(),
    { activate },
  );
}

export function activateFileTabReducer(
  state: WorkspaceTabsState,
  storageType: string,
  path: string,
): WorkspaceTabsState {
  const existing = findFileTab(state, storageType, path);
  if (!existing) return state;
  return activateTab(state, existing.id);
}

export function softCapPrompt(tab: FileWorkspaceTab): boolean {
  return window.confirm(
    `열린 탭이 너무 많습니다. 저장되지 않은 「${tabDisplayTitle(tab)}」 탭을 닫고 계속할까요?`,
  );
}

export {
  activateTab,
  closeTab,
  findFileTab,
  getActiveFileTab,
  openOrActivateChat,
  openOrActivateContentSearch,
  openOrActivateSettings,
  patchFileTab,
  moveTab,
  retargetFileTab,
  retargetFileTabsByPathPrefix,
};

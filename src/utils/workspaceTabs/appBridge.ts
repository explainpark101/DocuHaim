import type { FileWorkspaceTab, WorkspaceTabsState } from './types';
import { tabDisplayTitle } from './helpers';
import {
  activateTab,
  closeTab,
  evictForSoftCap,
  findFileTab,
  getActiveFileTab,
  moveTab,
  openOrActivateChat,
  openOrReplaceFileTab,
  patchFileTab,
} from './workspaceTabsStore';

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
  const nextFile: FileWorkspaceTab['currentFile'] = payload.currentFile
    ? {
        ...active.currentFile,
        ...payload.currentFile,
        content:
          typeof active.currentFile.content === 'string'
            ? active.currentFile.content
            : typeof payload.currentFile.content === 'string'
              ? payload.currentFile.content
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
  opts?: { promptCloseDirty?: (tab: FileWorkspaceTab) => boolean },
): WorkspaceTabsState {
  const storageType = String(file.type || '') as FileWorkspaceTab['storageType'];
  const path = String(file.id || '');
  if (!storageType || !path) return state;

  const existing = findFileTab(state, storageType, path);
  if (!existing) {
    const evictOpts =
      opts?.promptCloseDirty != null ? { promptCloseDirty: opts.promptCloseDirty } : {};
    const evicted = evictForSoftCap(state.tabs, evictOpts);
    if (!evicted) return state;
    return openOrReplaceFileTab(
      { ...state, tabs: evicted.tabs },
      {
        storageType,
        path,
        currentFile: file,
        editorContent,
        editedFileName: String(file.name || ''),
      },
    );
  }

  return openOrReplaceFileTab(state, {
    storageType,
    path,
    currentFile: file,
    editorContent,
    editedFileName: String(file.name || ''),
  });
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
  patchFileTab,
  moveTab,
};

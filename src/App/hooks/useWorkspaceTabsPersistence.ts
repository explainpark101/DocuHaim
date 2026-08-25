import { useEffect, type MutableRefObject } from 'react';
import {
  clearPersistedWorkspaceTabs,
  loadLastOpenTabsSnapshot,
  saveLastOpenTabsSnapshot,
  savePersistedWorkspaceTabs,
  toPersistedWorkspaceTabs,
} from '@/utils/workspaceTabs';
import { flushEditorIntoActiveFileTab } from '@/utils/workspaceTabs/appBridge';
import type { WorkspaceTabsState } from '@/utils/workspaceTabs/types';

type PersistDeps = {
  isUnlocked: boolean;
  workspaceTabs: WorkspaceTabsState;
  currentFile: any;
  editorContent: string;
  workspaceTabsEnabledRef: MutableRefObject<boolean>;
  workspaceTabsRef: MutableRefObject<WorkspaceTabsState>;
  editorContentRef: MutableRefObject<string>;
  currentFileRef: MutableRefObject<any>;
  editedFileNameRef: MutableRefObject<string>;
  hasRestoredPersistedWorkspaceTabsRef: MutableRefObject<boolean>;
};

/**
 * Tabs-domain persistence: live workspaceTabs key + last-open snapshot on leave.
 * Actions (activate/close/…) remain registered on WorkspaceTabsProvider.
 */
export function useWorkspaceTabsPersistence(deps: PersistDeps) {
  const {
    isUnlocked,
    workspaceTabs,
    currentFile,
    editorContent,
    workspaceTabsEnabledRef,
    workspaceTabsRef,
    editorContentRef,
    currentFileRef,
    editedFileNameRef,
    hasRestoredPersistedWorkspaceTabsRef,
  } = deps;

  useEffect(() => {
    if (!isUnlocked) return;
    if (workspaceTabsEnabledRef.current && !hasRestoredPersistedWorkspaceTabsRef.current) {
      return;
    }
    const flushed = flushEditorIntoActiveFileTab(workspaceTabs, {
      editorContent: editorContentRef.current ?? '',
      currentFile: currentFileRef.current,
      editedFileName: editedFileNameRef.current ?? '',
    });
    const payload = toPersistedWorkspaceTabs(
      flushed.tabs.map((t) =>
        t.kind === 'chat'
          ? { kind: 'chat' }
          : t.kind === 'settings'
            ? { kind: 'settings' }
            : { kind: 'file', storageType: t.storageType, path: t.path },
      ),
      flushed.activeId,
    );
    if (payload.tabs.length === 0) {
      clearPersistedWorkspaceTabs();
      return;
    }
    savePersistedWorkspaceTabs(payload);
    const prevSnap = loadLastOpenTabsSnapshot();
    if (!prevSnap || payload.tabs.length >= prevSnap.tabs.length) {
      saveLastOpenTabsSnapshot(payload);
    }
  }, [
    isUnlocked,
    workspaceTabs,
    currentFile,
    editorContent,
    workspaceTabsEnabledRef,
    hasRestoredPersistedWorkspaceTabsRef,
    workspaceTabsRef,
    editorContentRef,
    currentFileRef,
    editedFileNameRef,
  ]);

  useEffect(() => {
    if (!isUnlocked) return undefined;
    const persistLastOpenSnapshot = () => {
      if (!workspaceTabsEnabledRef.current) return;
      const flushed = flushEditorIntoActiveFileTab(workspaceTabsRef.current, {
        editorContent: editorContentRef.current ?? '',
        currentFile: currentFileRef.current,
        editedFileName: editedFileNameRef.current ?? '',
      });
      const payload = toPersistedWorkspaceTabs(
        flushed.tabs.map((t) =>
          t.kind === 'chat'
            ? { kind: 'chat' }
            : t.kind === 'settings'
              ? { kind: 'settings' }
              : { kind: 'file', storageType: t.storageType, path: t.path },
        ),
        flushed.activeId,
      );
      saveLastOpenTabsSnapshot(payload);
    };
    const onVisibilityHidden = () => {
      if (document.visibilityState === 'hidden') persistLastOpenSnapshot();
    };
    window.addEventListener('pagehide', persistLastOpenSnapshot);
    window.addEventListener('beforeunload', persistLastOpenSnapshot);
    document.addEventListener('visibilitychange', onVisibilityHidden);
    return () => {
      window.removeEventListener('pagehide', persistLastOpenSnapshot);
      window.removeEventListener('beforeunload', persistLastOpenSnapshot);
      document.removeEventListener('visibilitychange', onVisibilityHidden);
    };
  }, [
    isUnlocked,
    workspaceTabsEnabledRef,
    workspaceTabsRef,
    editorContentRef,
    currentFileRef,
    editedFileNameRef,
  ]);
}

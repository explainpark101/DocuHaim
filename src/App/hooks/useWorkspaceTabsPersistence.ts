import { useEffect, type MutableRefObject } from 'react';
import {
  persistWorkspaceTabsForRestart,
  toPersistedWorkspaceTabs,
} from '@/utils/workspaceTabs';
import { flushEditorIntoActiveFileTab } from '@/utils/workspaceTabs/appBridge';
import type { WorkspaceTabsState } from '@/utils/workspaceTabs/types';
import { isDesktopApp } from '@/utils/isDesktopApp';

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

function buildPersistedWorkspaceTabsPayload(
  state: WorkspaceTabsState,
  mirrors: {
    editorContent: string;
    currentFile: any;
    editedFileName: string;
  },
) {
  const flushed = flushEditorIntoActiveFileTab(state, mirrors);
  return toPersistedWorkspaceTabs(
    flushed.tabs.map((t) =>
      t.kind === 'chat'
        ? { kind: 'chat' }
        : t.kind === 'settings'
          ? { kind: 'settings' }
          : t.kind === 'content-search'
            ? { kind: 'content-search' }
            : { kind: 'file', storageType: t.storageType, path: t.path, ...(t.appRoute ? { appRoute: t.appRoute } : {}) },
    ),
    flushed.activeId,
  );
}

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
    const payload = buildPersistedWorkspaceTabsPayload(workspaceTabs, {
      editorContent: editorContentRef.current ?? '',
      currentFile: currentFileRef.current,
      editedFileName: editedFileNameRef.current ?? '',
    });
    persistWorkspaceTabsForRestart(payload);
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

    const persistForQuit = () => {
      if (!workspaceTabsEnabledRef.current) return;
      const payload = buildPersistedWorkspaceTabsPayload(workspaceTabsRef.current, {
        editorContent: editorContentRef.current ?? '',
        currentFile: currentFileRef.current,
        editedFileName: editedFileNameRef.current ?? '',
      });
      persistWorkspaceTabsForRestart(payload);
    };

    const onVisibilityHidden = () => {
      if (document.visibilityState === 'hidden') persistForQuit();
    };

    window.addEventListener('pagehide', persistForQuit);
    window.addEventListener('beforeunload', persistForQuit);
    document.addEventListener('visibilitychange', onVisibilityHidden);

    let unlistenClose: (() => void) | undefined;
    if (isDesktopApp()) {
      void (async () => {
        try {
          const { getCurrentWindow } = await import('@tauri-apps/api/window');
          unlistenClose = await getCurrentWindow().onCloseRequested(() => {
            persistForQuit();
          });
        } catch (err) {
          console.warn('[workspaceTabs] Tauri close persist hook failed:', err);
        }
      })();
    }

    return () => {
      unlistenClose?.();
      window.removeEventListener('pagehide', persistForQuit);
      window.removeEventListener('beforeunload', persistForQuit);
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

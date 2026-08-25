// @ts-nocheck — tab domain actions; tighten with WorkspaceTabsCtxValue
import { useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useFileSessionOwned } from '@/App/providers/AppFileSessionStateProvider';
import { useWorkspaceTabsPersistence } from '@/App/hooks/useWorkspaceTabsPersistence';
import {
  closedTabEntryFromWorkspaceTab,
  getActiveFileTab,
  getActiveTab,
  isChatTab,
  isFileTab,
  isFileTabDirty,
  isSettingsTab,
  pushClosedTab,
} from '@/utils/workspaceTabs';
import {
  activateTab,
  closeTab,
  flushEditorIntoActiveFileTab,
  moveTab,
  openOrActivateChat,
  openOrActivateSettings,
} from '@/utils/workspaceTabs/appBridge';
import {
  collapseWorkspaceToLegacy,
  stripChatTab,
  stripSettingsTab,
} from '@/utils/workspaceTabs/legacyMode';
import { SESSION_STORAGE_TYPE } from '@/utils/sessionWorkspace';
import { clearEncMdPassword } from '@/utils/encMd';
import { isSettingsAppPathname } from '@/utils/appHref';
import { useAuth } from '@/contexts/AuthContext';

export type TabBridgeDeps = {
  onLeavingDirtyFileTab?: (file: any, content: string) => void;
  requestDirtyCloseConfirm?: (tabId: string) => void;
};

/**
 * Owns workspace tab activate/close/open/reorder bodies.
 * Bridge deps (focus-save + dirty-close modal) inject from orchestration until those move.
 */
export function useWorkspaceTabsDomain({
  tabsApi,
  workspaceTabsEnabled,
  setWorkspaceTabsEnabled,
  workspaceTabsEnabledRef,
  workspaceTabsRef,
  bridgeDepsRef,
  hasRestoredPersistedWorkspaceTabsRef,
}: {
  tabsApi: { state: any; setState: (s: any) => void };
  workspaceTabsEnabled: boolean;
  setWorkspaceTabsEnabled: (v: boolean) => void;
  workspaceTabsEnabledRef: { current: boolean };
  workspaceTabsRef: { current: any };
  bridgeDepsRef: { current: TabBridgeDeps };
  hasRestoredPersistedWorkspaceTabsRef: { current: boolean };
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isUnlocked } = useAuth();
  const {
    currentFile,
    setCurrentFile,
    editorContent,
    setEditorContent,
    editorContentRef,
    currentFileRef,
    editedFileName,
    setEditedFileName,
  } = useFileSessionOwned();

  const editedFileNameRef = useRef(editedFileName);
  editedFileNameRef.current = editedFileName;
  const setWorkspaceTabs = tabsApi.setState;

  const isChatRoute =
    location.pathname === '/chat' || location.pathname.endsWith('/chat');
  const isSettingsRoute = isSettingsAppPathname(location.pathname);

  const onLeavingDirty = useCallback((file, content) => {
    bridgeDepsRef.current.onLeavingDirtyFileTab?.(file, content);
  }, [bridgeDepsRef]);

  const activateWorkspaceTab = useCallback(
    (id, options = {}) => {
      const { navigateUrl = true } = options;
      const flushed = flushEditorIntoActiveFileTab(workspaceTabsRef.current, {
        editorContent: editorContentRef.current ?? '',
        currentFile: currentFileRef.current,
        editedFileName: editedFileNameRef.current ?? '',
      });
      const leaving = getActiveTab(flushed);
      if (
        isFileTab(leaving) &&
        leaving.id !== id &&
        isFileTabDirty(leaving) &&
        leaving.storageType !== SESSION_STORAGE_TYPE
      ) {
        onLeavingDirty(leaving.currentFile, leaving.editorContent);
      }
      const activated = activateTab(flushed, id);
      workspaceTabsRef.current = activated;
      setWorkspaceTabs(activated);
      const active = getActiveTab(activated);
      if (isFileTab(active)) {
        const file = active.currentFile;
        setCurrentFile(file);
        currentFileRef.current = file;
        setEditorContent(active.editorContent);
        editorContentRef.current = active.editorContent;
        setEditedFileName(active.editedFileName || String(file?.name || ''));
        if (navigateUrl) {
          const viewPath =
            (typeof file?.id === 'string' && file.id) || active.path;
          navigate(`/view/${viewPath}`);
        }
      } else if (isChatTab(active)) {
        setCurrentFile(null);
        currentFileRef.current = null;
        if (navigateUrl) navigate('/chat');
      } else if (isSettingsTab(active)) {
        setCurrentFile(null);
        currentFileRef.current = null;
        if (navigateUrl) navigate('/settings');
      } else if (navigateUrl) {
        navigate('/');
      }
    },
    [
      navigate,
      onLeavingDirty,
      workspaceTabsRef,
      setWorkspaceTabs,
      editorContentRef,
      currentFileRef,
      setCurrentFile,
      setEditorContent,
      setEditedFileName,
    ],
  );

  const openChatWorkspaceTab = useCallback(
    (options = {}) => {
      const { navigateUrl = true } = options;
      if (!workspaceTabsEnabledRef.current) {
        const flushed = flushEditorIntoActiveFileTab(workspaceTabsRef.current, {
          editorContent: editorContentRef.current ?? '',
          currentFile: currentFileRef.current,
          editedFileName: editedFileNameRef.current ?? '',
        });
        const leaving = getActiveFileTab(flushed);
        if (leaving && isFileTabDirty(leaving) && leaving.storageType !== SESSION_STORAGE_TYPE) {
          onLeavingDirty(leaving.currentFile, leaving.editorContent);
        }
        const next = stripChatTab(flushed);
        workspaceTabsRef.current = next;
        setWorkspaceTabs(next);
        setCurrentFile(null);
        currentFileRef.current = null;
        if (navigateUrl) navigate('/chat');
        return;
      }
      const flushed = flushEditorIntoActiveFileTab(workspaceTabsRef.current, {
        editorContent: editorContentRef.current ?? '',
        currentFile: currentFileRef.current,
        editedFileName: editedFileNameRef.current ?? '',
      });
      const leaving = getActiveFileTab(flushed);
      if (leaving && isFileTabDirty(leaving) && leaving.storageType !== SESSION_STORAGE_TYPE) {
        onLeavingDirty(leaving.currentFile, leaving.editorContent);
      }
      const next = openOrActivateChat(flushed);
      workspaceTabsRef.current = next;
      setWorkspaceTabs(next);
      setCurrentFile(null);
      currentFileRef.current = null;
      if (navigateUrl) navigate('/chat');
    },
    [
      navigate,
      onLeavingDirty,
      workspaceTabsEnabledRef,
      workspaceTabsRef,
      setWorkspaceTabs,
      editorContentRef,
      currentFileRef,
      setCurrentFile,
    ],
  );

  const openSettingsWorkspaceTab = useCallback(
    (options = {}) => {
      const { navigateUrl = true, hash } = options;
      const target =
        typeof hash === 'string' && hash
          ? `/settings${hash.startsWith('#') ? hash : `#${hash}`}`
          : '/settings';
      if (!workspaceTabsEnabledRef.current) {
        const flushed = flushEditorIntoActiveFileTab(workspaceTabsRef.current, {
          editorContent: editorContentRef.current ?? '',
          currentFile: currentFileRef.current,
          editedFileName: editedFileNameRef.current ?? '',
        });
        const leaving = getActiveFileTab(flushed);
        if (leaving && isFileTabDirty(leaving) && leaving.storageType !== SESSION_STORAGE_TYPE) {
          onLeavingDirty(leaving.currentFile, leaving.editorContent);
        }
        const next = stripSettingsTab(flushed);
        workspaceTabsRef.current = next;
        setWorkspaceTabs(next);
        setCurrentFile(null);
        currentFileRef.current = null;
        if (navigateUrl) navigate(target);
        return;
      }
      const flushed = flushEditorIntoActiveFileTab(workspaceTabsRef.current, {
        editorContent: editorContentRef.current ?? '',
        currentFile: currentFileRef.current,
        editedFileName: editedFileNameRef.current ?? '',
      });
      const leaving = getActiveFileTab(flushed);
      if (leaving && isFileTabDirty(leaving) && leaving.storageType !== SESSION_STORAGE_TYPE) {
        onLeavingDirty(leaving.currentFile, leaving.editorContent);
      }
      const next = openOrActivateSettings(flushed);
      workspaceTabsRef.current = next;
      setWorkspaceTabs(next);
      setCurrentFile(null);
      currentFileRef.current = null;
      if (navigateUrl) navigate(target);
    },
    [
      navigate,
      onLeavingDirty,
      workspaceTabsEnabledRef,
      workspaceTabsRef,
      setWorkspaceTabs,
      editorContentRef,
      currentFileRef,
      setCurrentFile,
    ],
  );

  const collapseToLegacyWorkspace = useCallback(() => {
    const flushed = flushEditorIntoActiveFileTab(workspaceTabsRef.current, {
      editorContent: editorContentRef.current ?? '',
      currentFile: currentFileRef.current,
      editedFileName: editedFileNameRef.current ?? '',
    });
    const wasChat = isChatRoute;
    const wasSettings =
      isSettingsRoute || isSettingsTab(getActiveTab(flushed));
    const next = collapseWorkspaceToLegacy(flushed);
    workspaceTabsRef.current = next;
    setWorkspaceTabs(next);
    const active = getActiveTab(next);
    if (wasChat) {
      setCurrentFile(null);
      currentFileRef.current = null;
      return;
    }
    if (wasSettings) {
      setCurrentFile(null);
      currentFileRef.current = null;
      if (!isSettingsRoute) {
        navigate('/settings');
      }
      return;
    }
    if (isFileTab(active)) {
      const file = active.currentFile;
      setCurrentFile(file);
      currentFileRef.current = file;
      setEditorContent(active.editorContent);
      editorContentRef.current = active.editorContent;
      setEditedFileName(active.editedFileName || String(file?.name || ''));
    }
  }, [
    isChatRoute,
    isSettingsRoute,
    navigate,
    workspaceTabsRef,
    setWorkspaceTabs,
    editorContentRef,
    currentFileRef,
    setCurrentFile,
    setEditorContent,
    setEditedFileName,
  ]);

  const closeWorkspaceTabById = useCallback(
    (id, options = {}) => {
      const { skipDirtyConfirm = false, skipHistory = false } = options;
      const closing = workspaceTabsRef.current.tabs.find((t) => t.id === id);
      if (!skipDirtyConfirm && isFileTab(closing) && isFileTabDirty(closing)) {
        bridgeDepsRef.current.requestDirtyCloseConfirm?.(id);
        return;
      }
      if (!skipHistory && closing) {
        pushClosedTab(closedTabEntryFromWorkspaceTab(closing));
      }
      if (isFileTab(closing)) {
        const closedPath = closing.currentFile?.id || closing.path || '';
        if (closedPath) clearEncMdPassword(closedPath);
      }
      const next = closeTab(workspaceTabsRef.current, id);
      workspaceTabsRef.current = next;
      setWorkspaceTabs(next);
      const active = getActiveTab(next);
      if (isFileTab(active)) {
        const file = active.currentFile;
        setCurrentFile(file);
        currentFileRef.current = file;
        setEditorContent(active.editorContent);
        editorContentRef.current = active.editorContent;
        setEditedFileName(active.editedFileName || String(file?.name || ''));
        navigate(`/view/${(typeof file?.id === 'string' && file.id) || active.path}`);
      } else if (isChatTab(active)) {
        setCurrentFile(null);
        currentFileRef.current = null;
        navigate('/chat');
      } else if (isSettingsTab(active)) {
        setCurrentFile(null);
        currentFileRef.current = null;
        navigate('/settings');
      } else {
        setCurrentFile(null);
        currentFileRef.current = null;
        setEditorContent('');
        editorContentRef.current = '';
        setEditedFileName('');
        navigate('/');
      }
    },
    [
      navigate,
      bridgeDepsRef,
      workspaceTabsRef,
      setWorkspaceTabs,
      currentFileRef,
      editorContentRef,
      setCurrentFile,
      setEditorContent,
      setEditedFileName,
    ],
  );

  const reorderWorkspaceTabs = useCallback(
    (activeId, overId) => {
      const next = moveTab(workspaceTabsRef.current, activeId, overId);
      workspaceTabsRef.current = next;
      setWorkspaceTabs(next);
    },
    [workspaceTabsRef, setWorkspaceTabs],
  );

  const cycleWorkspaceTab = useCallback(
    (delta) => {
      if (!workspaceTabsEnabledRef.current) return;
      const { tabs, activeId } = workspaceTabsRef.current;
      if (!tabs.length) return;
      let idx = tabs.findIndex((t) => t.id === activeId);
      if (idx < 0) idx = delta > 0 ? -1 : 0;
      const nextIdx = (idx + delta + tabs.length) % tabs.length;
      const next = tabs[nextIdx];
      if (next) activateWorkspaceTab(next.id);
    },
    [activateWorkspaceTab, workspaceTabsEnabledRef, workspaceTabsRef],
  );

  useWorkspaceTabsPersistence({
    isUnlocked,
    workspaceTabs: tabsApi.state,
    currentFile,
    editorContent,
    workspaceTabsEnabledRef,
    workspaceTabsRef,
    editorContentRef,
    currentFileRef,
    editedFileNameRef,
    hasRestoredPersistedWorkspaceTabsRef,
  });

  return {
    workspaceTabsEnabled,
    setWorkspaceTabsEnabled,
    workspaceTabsEnabledRef,
    workspaceTabsRef,
    activateWorkspaceTab,
    closeWorkspaceTabById,
    openChatWorkspaceTab,
    openSettingsWorkspaceTab,
    reorderWorkspaceTabs,
    collapseToLegacyWorkspace,
    cycleWorkspaceTab,
  };
}

import { useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useFileSessionOwned } from '@/App/providers/AppFileSessionStateProvider';
import { useModalsOwned } from '@/App/providers/AppModalsStateProvider';
import { useWorkspaceTabsPersistence } from '@/App/hooks/useWorkspaceTabsPersistence';
import {
  closedTabEntryFromWorkspaceTab,
  getActiveFileTab,
  getActiveTab,
  isChatTab,
  isContentSearchTab,
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
  openOrActivateContentSearch,
  openOrActivateSettings,
} from '@/utils/workspaceTabs/appBridge';
import {
  collapseWorkspaceToLegacy,
  stripChatTab,
  stripContentSearchTab,
  stripSettingsTab,
} from '@/utils/workspaceTabs/legacyMode';
import { SESSION_STORAGE_TYPE } from '@/utils/sessionWorkspace';
import { clearEncMdPassword, isEncMdPath } from '@/utils/encMd';
import {
  contentSearchPathname,
  isSettingsAppPathname,
  openNotePathnameForStoragePath,
} from '@/utils/appHref';
import { evictQuizPaneTab, getQuizTabMode } from '@/stores/quizPaneSessionStore';
import { useAuth } from '@/contexts/AuthContext';
import { findFileTab } from '@/utils/workspaceTabs/appBridge';
import { getDraftKey, saveMemoDraft } from '@/utils/memoDraftsDb';
import {
  loadWorkspaceTabsAutoSaveMode,
  WORKSPACE_TABS_AUTO_SAVE_CHANGED_EVENT,
  type WorkspaceTabsAutoSaveMode,
} from '@/utils/workspaceTabsSettings';
import { useEffect } from 'react';

/**
 * Owns workspace tab activate/close/open/reorder bodies.
 * Dirty-close uses useModalsOwned; focus-save uses saveFileRef + settings mode.
 */
export function useWorkspaceTabsDomain({
  tabsApi,
  workspaceTabsEnabled,
  setWorkspaceTabsEnabled,
  workspaceTabsEnabledRef,
  workspaceTabsRef,
  hasRestoredPersistedWorkspaceTabsRef,
}: {
  tabsApi: { state: any; setState: (s: any) => void };
  workspaceTabsEnabled: boolean;
  setWorkspaceTabsEnabled: (v: boolean) => void;
  workspaceTabsEnabledRef: { current: boolean };
  workspaceTabsRef: { current: any };
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
    saveFileRef,
    setSavingTabIds,
    savingTabIdsRef,
  } = useFileSessionOwned();
  const { setPendingCloseTabId, setShowCloseFileConfirmModal } = useModalsOwned();

  const editedFileNameRef = useRef(editedFileName);
  editedFileNameRef.current = editedFileName;
  const setWorkspaceTabs = tabsApi.setState;
  const workspaceTabsAutoSaveModeRef = useRef(loadWorkspaceTabsAutoSaveMode());

  useEffect(() => {
    const onAutoSaveMode = (event: Event) => {
      const detail = (event as CustomEvent<{ mode?: WorkspaceTabsAutoSaveMode }>).detail;
      const mode = detail?.mode ?? loadWorkspaceTabsAutoSaveMode();
      workspaceTabsAutoSaveModeRef.current = mode;
    };
    window.addEventListener(WORKSPACE_TABS_AUTO_SAVE_CHANGED_EVENT, onAutoSaveMode);
    return () => {
      window.removeEventListener(WORKSPACE_TABS_AUTO_SAVE_CHANGED_EVENT, onAutoSaveMode);
    };
  }, []);

  const isChatRoute =
    location.pathname === '/chat' || location.pathname.endsWith('/chat');
  const isSettingsRoute = isSettingsAppPathname(location.pathname);

  const queueBackgroundTabSave = useCallback((file: any, content: any) => {
    if (!file?.type || !file?.id) return;
    if (file.type === SESSION_STORAGE_TYPE) return;
    if (isEncMdPath(file.id) || isEncMdPath(file.name)) return;
    const viewer = file.viewer || 'markdown';
    if (!['markdown', 'json', 'raw', 'html', 'svg'].includes(viewer)) return;

    const text = typeof content === 'string' ? content : '';
    const tab = findFileTab(workspaceTabsRef.current, file.type, file.id);
    const baseline =
      tab != null
        ? tab.baselineContent
        : typeof file.content === 'string'
          ? file.content
          : '';
    if (text === baseline) return;

    const tabId = `${file.type}:${file.id}`;
    if (savingTabIdsRef.current.has(tabId)) return;
    savingTabIdsRef.current.add(tabId);
    setSavingTabIds([...savingTabIdsRef.current]);

    const origLastMod = file.lastModified;
    const ts =
      origLastMod instanceof Date
        ? origLastMod.getTime()
        : typeof origLastMod === 'number'
          ? origLastMod
          : 0;

    void (async () => {
      try {
        await saveMemoDraft({
          key: getDraftKey(file.type, file.id),
          content: text,
          originalLastModified: ts,
        });
        await saveFileRef.current?.(file, {
          skipSuffixCheck: true,
          skipCoverChangeCheck: true,
          contentOverride: text,
          background: true,
        });
      } catch (err) {
        console.error('Background tab save failed:', err);
      } finally {
        savingTabIdsRef.current.delete(tabId);
        setSavingTabIds([...savingTabIdsRef.current]);
      }
    })();
  }, [workspaceTabsRef, savingTabIdsRef, setSavingTabIds, saveFileRef]);

  const onLeavingDirty = useCallback(
    (file: any, content: any) => {
      if (!workspaceTabsEnabledRef.current) return;
      if (workspaceTabsAutoSaveModeRef.current !== 'onFocusChange') return;
      queueBackgroundTabSave(file, content);
    },
    [workspaceTabsEnabledRef, queueBackgroundTabSave],
  );

  const activateWorkspaceTab = useCallback(
    (id: string, options: { navigateUrl?: boolean } = {}) => {
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
          navigate(
            openNotePathnameForStoragePath(viewPath, {
              preferView: getQuizTabMode(id) === 'edit',
            }),
          );
        }
      } else if (isChatTab(active)) {
        setCurrentFile(null);
        currentFileRef.current = null;
        if (navigateUrl) navigate('/chat');
      } else if (isSettingsTab(active)) {
        setCurrentFile(null);
        currentFileRef.current = null;
        if (navigateUrl) navigate('/settings');
      } else if (isContentSearchTab(active)) {
        setCurrentFile(null);
        currentFileRef.current = null;
        if (navigateUrl) navigate('/search');
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
      location.pathname,
    ],
  );

  const openChatWorkspaceTab = useCallback(
    (options: { navigateUrl?: boolean; activate?: boolean } = {}) => {
      const { navigateUrl = true, activate = true } = options;
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
      const next = openOrActivateChat(flushed, Date.now(), { activate });
      workspaceTabsRef.current = next;
      setWorkspaceTabs(next);
      if (activate) {
        setCurrentFile(null);
        currentFileRef.current = null;
      }
      if (navigateUrl && activate) navigate('/chat');
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
    (options: { navigateUrl?: boolean; hash?: string; activate?: boolean } = {}) => {
      const { navigateUrl = true, hash, activate = true } = options;
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
      const next = openOrActivateSettings(flushed, Date.now(), { activate });
      workspaceTabsRef.current = next;
      setWorkspaceTabs(next);
      if (activate) {
        setCurrentFile(null);
        currentFileRef.current = null;
      }
      if (navigateUrl && activate) navigate(target);
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

  const openContentSearchWorkspaceTab = useCallback(
    (options: { navigateUrl?: boolean; query?: string; activate?: boolean } = {}) => {
      const { navigateUrl = true, query, activate = true } = options;
      const target = contentSearchPathname(query);
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
        const next = stripContentSearchTab(flushed);
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
      const next = openOrActivateContentSearch(flushed, Date.now(), { activate });
      workspaceTabsRef.current = next;
      setWorkspaceTabs(next);
      if (activate) {
        setCurrentFile(null);
        currentFileRef.current = null;
      }
      if (navigateUrl && activate) navigate(target);
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
    (
      id: string,
      options: { skipDirtyConfirm?: boolean; skipHistory?: boolean } = {},
    ) => {
      const { skipDirtyConfirm = false, skipHistory = false } = options;
      const closing = workspaceTabsRef.current.tabs.find((t: { id: string }) => t.id === id);
      if (!skipDirtyConfirm && isFileTab(closing) && isFileTabDirty(closing)) {
        setPendingCloseTabId(id);
        setShowCloseFileConfirmModal(true);
        return;
      }
      if (!skipHistory && closing) {
        pushClosedTab(closedTabEntryFromWorkspaceTab(closing));
      }
      if (isFileTab(closing)) {
        const closedPath = closing.currentFile?.id || closing.path || '';
        if (closedPath) clearEncMdPassword(closedPath);
      }
      evictQuizPaneTab(id);
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
        navigate(
          openNotePathnameForStoragePath(
            (typeof file?.id === 'string' && file.id) || active.path,
            { preferView: getQuizTabMode(active.id) === 'edit' },
          ),
        );
      } else if (isChatTab(active)) {
        setCurrentFile(null);
        currentFileRef.current = null;
        navigate('/chat');
      } else if (isSettingsTab(active)) {
        setCurrentFile(null);
        currentFileRef.current = null;
        navigate('/settings');
      } else if (isContentSearchTab(active)) {
        setCurrentFile(null);
        currentFileRef.current = null;
        navigate('/search');
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
      setPendingCloseTabId,
      setShowCloseFileConfirmModal,
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
    (activeId: string, overId: string) => {
      const next = moveTab(workspaceTabsRef.current, activeId, overId);
      workspaceTabsRef.current = next;
      setWorkspaceTabs(next);
    },
    [workspaceTabsRef, setWorkspaceTabs],
  );

  const cycleWorkspaceTab = useCallback(
    (delta: number) => {
      if (!workspaceTabsEnabledRef.current) return;
      const { tabs, activeId } = workspaceTabsRef.current;
      if (!tabs.length) return;
      let idx = tabs.findIndex((t: { id: string }) => t.id === activeId);
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
    openContentSearchWorkspaceTab,
    reorderWorkspaceTabs,
    collapseToLegacyWorkspace,
    cycleWorkspaceTab,
  };
}

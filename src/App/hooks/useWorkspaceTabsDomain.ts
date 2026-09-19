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
  clearExportPdfInLeaf,
  closeTab,
  flushEditorIntoActiveFileTab,
  moveTab,
  moveTabIntoLeaf,
  openExportPdfInLeaf,
  openOrActivateChat,
  openOrActivateContentSearch,
  openOrActivateSettings,
  replaceWorkspaceLayout,
  setFocusedPane,
  splitTabToEdge,
  collapsePaneLeaf,
} from '@/utils/workspaceTabs/appBridge';
import {
  findLeafContainingTab,
  flattenTabIdsFromLayout,
  resizeSplit,
  type PaneNode,
  type PaneSplitEdge,
} from '@/utils/workspaceTabs/paneLayout';
import { isQuizMdPath } from '@/utils/quiz/quizPath';
import { isQuizAppPathname, openNotePathnameForStoragePath, contentSearchPathname, isSettingsAppPathname } from '@/utils/appHref';
import { patchFileTab } from '@/utils/workspaceTabs/workspaceTabsStore';
import {
  collapseWorkspaceToLegacy,
  stripChatTab,
  stripContentSearchTab,
  stripSettingsTab,
} from '@/utils/workspaceTabs/legacyMode';
import { SESSION_STORAGE_TYPE } from '@/utils/sessionWorkspace';
import { clearEncMdPassword, isEncMdPath } from '@/utils/encMd';
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
      // Keep quiz vs edit surface on file tabs so secondary panes stay correct.
      let withSurface = activated;
      const nextActive = getActiveTab(activated);
      if (isFileTab(nextActive) && isQuizMdPath(nextActive.path || nextActive.currentFile?.id)) {
        const wantQuiz = isQuizAppPathname(location.pathname);
        const surface = wantQuiz ? 'quiz' : 'edit';
        if (nextActive.noteSurface !== surface) {
          withSurface = patchFileTab(activated, nextActive.id, { noteSurface: surface });
        }
      }
      workspaceTabsRef.current = withSurface;
      setWorkspaceTabs(withSurface);
      const active = getActiveTab(withSurface);
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
          const preferView = active.noteSurface === 'edit';
          navigate(
            openNotePathnameForStoragePath(viewPath, {
              currentPathname: location.pathname,
              ...(preferView ? { preferView: true } : {}),
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
      const active = getActiveTab(next);
      if (active) activateWorkspaceTab(active.id, { navigateUrl: true });
    },
    [activateWorkspaceTab, setWorkspaceTabs, workspaceTabsRef],
  );

  const focusWorkspacePane = useCallback(
    (paneId: string) => {
      const next = setFocusedPane(workspaceTabsRef.current, paneId);
      workspaceTabsRef.current = next;
      setWorkspaceTabs(next);
      const active = getActiveTab(next);
      if (active) activateWorkspaceTab(active.id, { navigateUrl: true });
    },
    [activateWorkspaceTab, setWorkspaceTabs, workspaceTabsRef],
  );

  const resizeWorkspaceSplit = useCallback(
    (splitId: string, ratio: number) => {
      const prev = workspaceTabsRef.current;
      const layout = resizeSplit(prev.layout, splitId, ratio);
      const next = { ...prev, layout };
      workspaceTabsRef.current = next;
      setWorkspaceTabs(next);
    },
    [setWorkspaceTabs, workspaceTabsRef],
  );

  const handleWorkspacePaneDrop = useCallback(
    (tabId: string, leafId: string, zone: PaneSplitEdge | 'center'): boolean => {
      const prev = workspaceTabsRef.current;
      let next = prev;
      if (zone === 'center') {
        next = moveTabIntoLeaf(prev, tabId, leafId);
      } else {
        const split = splitTabToEdge(prev, leafId, zone, tabId);
        if (!split) return false;
        next = split;
      }
      workspaceTabsRef.current = next;
      setWorkspaceTabs(next);
      activateWorkspaceTab(tabId, { navigateUrl: true });
      return true;
    },
    [activateWorkspaceTab, setWorkspaceTabs, workspaceTabsRef],
  );

  const splitWorkspaceTabToEdge = useCallback(
    (tabId: string, edge: PaneSplitEdge): boolean => {
      const prev = workspaceTabsRef.current;
      const host = findLeafContainingTab(prev.layout, tabId);
      const leafId = host?.id ?? prev.focusedPaneId;
      if (!leafId) return false;
      // Need another tab in the host leaf or the empty remnant collapses back.
      if (!host || host.tabIds.length <= 1) return false;
      const split = splitTabToEdge(prev, leafId, edge, tabId);
      if (!split) return false;
      workspaceTabsRef.current = split;
      setWorkspaceTabs(split);
      activateWorkspaceTab(tabId, { navigateUrl: true });
      return true;
    },
    [activateWorkspaceTab, setWorkspaceTabs, workspaceTabsRef],
  );

  const applyWorkspacePaneLayout = useCallback(
    (layout: PaneNode, focusedPaneId?: string | null) => {
      const prev = workspaceTabsRef.current;
      const next = replaceWorkspaceLayout(prev, layout, focusedPaneId);
      workspaceTabsRef.current = next;
      setWorkspaceTabs(next);
      const active = getActiveTab(next);
      if (active) activateWorkspaceTab(active.id, { navigateUrl: true });
    },
    [activateWorkspaceTab, setWorkspaceTabs, workspaceTabsRef],
  );

  const collapseWorkspacePane = useCallback(
    (leafId: string) => {
      const prev = workspaceTabsRef.current;
      const prevActiveId = prev.activeId;
      const next = collapsePaneLeaf(prev, leafId);
      if (next === prev) return;
      workspaceTabsRef.current = next;
      setWorkspaceTabs(next);
      // Extracted tabs open in the background — only navigate when focus moved
      // to a remaining in-split tab (e.g. dismissed the focused pane).
      if (next.activeId && next.activeId !== prevActiveId) {
        activateWorkspaceTab(next.activeId, { navigateUrl: true });
      }
    },
    [activateWorkspaceTab, setWorkspaceTabs, workspaceTabsRef],
  );

  const openExportPdfInFocusedPane = useCallback(
    (tabId?: string | null) => {
      const state = workspaceTabsRef.current;
      const id = tabId || state.activeId;
      if (!id) return false;
      const leafId = state.focusedPaneId;
      const next = openExportPdfInLeaf(state, leafId, id);
      workspaceTabsRef.current = next;
      setWorkspaceTabs(next);
      return true;
    },
    [setWorkspaceTabs, workspaceTabsRef],
  );

  const clearExportPdfInFocusedPane = useCallback(
    (leafId?: string | null) => {
      const state = workspaceTabsRef.current;
      const id = leafId || state.focusedPaneId;
      const next = clearExportPdfInLeaf(state, id);
      workspaceTabsRef.current = next;
      setWorkspaceTabs(next);
    },
    [setWorkspaceTabs, workspaceTabsRef],
  );

  const cycleWorkspaceTab = useCallback(
    (delta: number) => {
      if (!workspaceTabsEnabledRef.current) return;
      const state = workspaceTabsRef.current;
      const order = flattenTabIdsFromLayout(state.layout);
      const ids = order.length > 0 ? order : state.tabs.map((t: { id: string }) => t.id);
      if (!ids.length) return;
      let idx = ids.findIndex((id: string) => id === state.activeId);
      if (idx < 0) idx = delta > 0 ? -1 : 0;
      const nextIdx = (idx + delta + ids.length) % ids.length;
      const nextId = ids[nextIdx];
      if (nextId) activateWorkspaceTab(nextId);
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
    focusWorkspacePane,
    resizeWorkspaceSplit,
    handleWorkspacePaneDrop,
    splitWorkspaceTabToEdge,
    applyWorkspacePaneLayout,
    collapseWorkspacePane,
    openExportPdfInFocusedPane,
    clearExportPdfInFocusedPane,
  };
}

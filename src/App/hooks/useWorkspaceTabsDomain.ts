import { useCallback, useEffect, useRef, useState } from 'react';
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
  isLlmAssistTab,
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
  openOrActivateLlmAssist,
  openOrActivateSettings,
  replaceWorkspaceLayout,
  setFocusedPane,
  splitTabToEdge,
  collapsePaneLeaf,
  swapPanesOrMoveTabToCenter,
  splitTabToWorkspaceEdge,
} from '@/utils/workspaceTabs/appBridge';
import {
  countLeaves,
  findLeafContainingTab,
  flattenTabIdsFromLayout,
  type PaneNode,
  type PaneSplitEdge,
} from '@/utils/workspaceTabs/paneLayout';
import { normalizeAfterSnappedResize, resizeSplitLinked } from '@/utils/workspaceTabs/paneLayoutNormalize';
import { isQuizMdPath } from '@/utils/quiz/quizPath';
import { isQuizAppPathname, openNotePathnameForStoragePath, contentSearchPathname, isSettingsAppPathname } from '@/utils/appHref';
import { patchFileTab } from '@/utils/workspaceTabs/workspaceTabsStore';
import {
  collapseWorkspaceToLegacy,
  stripChatTab,
  stripContentSearchTab,
  stripLlmAssistTab,
  stripSettingsTab,
} from '@/utils/workspaceTabs/legacyMode';
import { SESSION_STORAGE_TYPE } from '@/utils/sessionWorkspace';
import { clearEncMdPassword, isEncMdPath } from '@/utils/encMd';
import { useAuth } from '@/contexts/AuthContext';
import { findFileTab } from '@/utils/workspaceTabs/appBridge';
import { getDraftKey, saveMemoDraft } from '@/utils/memoDraftsDb';
import {
  loadWorkspacePaneSoftCap,
  loadWorkspaceTabsAutoSaveMode,
  WORKSPACE_TABS_AUTO_SAVE_CHANGED_EVENT,
  type WorkspaceTabsAutoSaveMode,
} from '@/utils/workspaceTabsSettings';
import type { WorkspacePaneSoftCapPrompt } from '@/components/shell/workspace/WorkspacePaneSoftCapModal';
import { useLlmAssistSessionOptional } from '@/contexts/LlmAssistSessionContext';
import { LLM_ASSIST_TAB_ID } from '@/utils/workspaceTabs/types';

type SoftCapPendingAction =
  | {
      kind: 'drop';
      tabId: string;
      leafId: string;
      zone: PaneSplitEdge | 'center';
      centerBehavior?: 'swap' | 'join';
      workspaceEdge?: boolean;
    }
  | { kind: 'split'; tabId: string; edge: PaneSplitEdge };

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
  const llmAssistSession = useLlmAssistSessionOptional();
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
  const [paneSoftCapPrompt, setPaneSoftCapPrompt] = useState<WorkspacePaneSoftCapPrompt | null>(
    null,
  );
  const softCapPendingRef = useRef<SoftCapPendingAction | null>(null);

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

  const openPaneSoftCapPrompt = useCallback((pending: SoftCapPendingAction, leafCount: number) => {
    softCapPendingRef.current = pending;
    setPaneSoftCapPrompt({
      leafCount,
      currentCap: loadWorkspacePaneSoftCap(),
    });
  }, []);

  const cancelPaneSoftCapPrompt = useCallback(() => {
    softCapPendingRef.current = null;
    setPaneSoftCapPrompt(null);
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
      } else if (isLlmAssistTab(active)) {
        // Stay on current route — LLM Assist is a pane, not a page.
        setCurrentFile(null);
        currentFileRef.current = null;
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

  const openLlmAssistWorkspaceTab = useCallback(
    (options: { activate?: boolean } = {}) => {
      const { activate = true } = options;
      if (!workspaceTabsEnabledRef.current) return;
      const flushed = flushEditorIntoActiveFileTab(workspaceTabsRef.current, {
        editorContent: editorContentRef.current ?? '',
        currentFile: currentFileRef.current,
        editedFileName: editedFileNameRef.current ?? '',
      });
      const next = openOrActivateLlmAssist(flushed, Date.now(), { activate });
      workspaceTabsRef.current = next;
      setWorkspaceTabs(next);
      if (activate) {
        setCurrentFile(null);
        currentFileRef.current = null;
      }
    },
    [
      workspaceTabsEnabledRef,
      workspaceTabsRef,
      setWorkspaceTabs,
      editorContentRef,
      currentFileRef,
      setCurrentFile,
    ],
  );

  const closeLlmAssistWorkspaceTab = useCallback(
    (options: { skipHistory?: boolean } = {}) => {
      const { skipHistory = true } = options;
      const state = workspaceTabsRef.current;
      if (!state.tabs.some((t: { kind: string }) => t.kind === 'llm-assist')) return;
      if (!skipHistory) {
        const closing = state.tabs.find((t: { kind: string }) => t.kind === 'llm-assist');
        if (closing) pushClosedTab(closedTabEntryFromWorkspaceTab(closing));
      }
      const next = stripLlmAssistTab(state);
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
      }
    },
    [
      workspaceTabsRef,
      setWorkspaceTabs,
      currentFileRef,
      editorContentRef,
      setCurrentFile,
      setEditorContent,
      setEditedFileName,
    ],
  );

  // Wire split presentation ↔ workspace tab without circular imports.
  const registerSplitWorkspaceHandlers = llmAssistSession?.registerSplitWorkspaceHandlers;
  useEffect(() => {
    if (!registerSplitWorkspaceHandlers) return;
    registerSplitWorkspaceHandlers({
      open: () => openLlmAssistWorkspaceTab({ activate: true }),
      close: () => closeLlmAssistWorkspaceTab({ skipHistory: true }),
    });
    return () => {
      registerSplitWorkspaceHandlers(null);
    };
  }, [registerSplitWorkspaceHandlers, openLlmAssistWorkspaceTab, closeLlmAssistWorkspaceTab]);

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
      const wasLlmAssist = id === LLM_ASSIST_TAB_ID || closing?.kind === 'llm-assist';
      const next = closeTab(workspaceTabsRef.current, id);
      workspaceTabsRef.current = next;
      setWorkspaceTabs(next);
      if (wasLlmAssist) {
        // Keep presentation preference; only close the assist session.
        llmAssistSession?.setOpen(false);
      }
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
      } else if (isLlmAssistTab(active)) {
        setCurrentFile(null);
        currentFileRef.current = null;
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
      llmAssistSession,
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
    (splitId: string, ratio: number, opts?: { linkAligned?: boolean }) => {
      const prev = workspaceTabsRef.current;
      const layout = resizeSplitLinked(
        prev.layout,
        splitId,
        ratio,
        Boolean(opts?.linkAligned),
      );
      const next = { ...prev, layout };
      workspaceTabsRef.current = next;
      setWorkspaceTabs(next);
    },
    [setWorkspaceTabs, workspaceTabsRef],
  );

  /**
   * After sash drag ends with Alt (linked spanning resize): promote aligned 2×2
   * nests so the shared boundary becomes the outer split.
   * Without Alt, boundaries stay independent even if a snap magnet engaged.
   */
  const finishResizeWorkspaceSplit = useCallback(
    (splitId: string, _snapped: boolean, opts?: { linkAligned?: boolean }) => {
      if (!opts?.linkAligned) return;
      const prev = workspaceTabsRef.current;
      const layout = normalizeAfterSnappedResize(prev.layout, splitId);
      if (layout === prev.layout) return;
      const next = { ...prev, layout };
      workspaceTabsRef.current = next;
      setWorkspaceTabs(next);
    },
    [setWorkspaceTabs, workspaceTabsRef],
  );

  const handleWorkspacePaneDrop = useCallback(
    (
      tabId: string,
      leafId: string,
      zone: PaneSplitEdge | 'center',
      opts?: { centerBehavior?: 'swap' | 'join'; workspaceEdge?: boolean },
    ): boolean => {
      const prev = workspaceTabsRef.current;
      let next = prev;
      if (zone === 'center') {
        // Default: swap the two panes. Sidebar "open here" passes join.
        const centerBehavior = opts?.centerBehavior ?? 'swap';
        next =
          centerBehavior === 'join'
            ? moveTabIntoLeaf(prev, tabId, leafId)
            : swapPanesOrMoveTabToCenter(prev, tabId, leafId);
      } else if (opts?.workspaceEdge) {
        const split = splitTabToWorkspaceEdge(prev, zone, tabId);
        if (!split.ok) {
          if (split.reason === 'soft-cap') {
            openPaneSoftCapPrompt(
              {
                kind: 'drop',
                tabId,
                leafId,
                zone,
                workspaceEdge: true,
                ...(opts.centerBehavior ? { centerBehavior: opts.centerBehavior } : {}),
              },
              countLeaves(prev.layout),
            );
          }
          return false;
        }
        next = split.state;
      } else {
        const split = splitTabToEdge(prev, leafId, zone, tabId);
        if (!split.ok) {
          if (split.reason === 'soft-cap') {
            openPaneSoftCapPrompt(
              {
                kind: 'drop',
                tabId,
                leafId,
                zone,
                ...(opts?.centerBehavior ? { centerBehavior: opts.centerBehavior } : {}),
              },
              countLeaves(prev.layout),
            );
          }
          return false;
        }
        next = split.state;
      }
      workspaceTabsRef.current = next;
      setWorkspaceTabs(next);
      activateWorkspaceTab(tabId, { navigateUrl: true });
      return true;
    },
    [activateWorkspaceTab, openPaneSoftCapPrompt, setWorkspaceTabs, workspaceTabsRef],
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
      if (!split.ok) {
        if (split.reason === 'soft-cap') {
          openPaneSoftCapPrompt({ kind: 'split', tabId, edge }, countLeaves(prev.layout));
        }
        return false;
      }
      workspaceTabsRef.current = split.state;
      setWorkspaceTabs(split.state);
      activateWorkspaceTab(tabId, { navigateUrl: true });
      return true;
    },
    [activateWorkspaceTab, openPaneSoftCapPrompt, setWorkspaceTabs, workspaceTabsRef],
  );

  const confirmPaneSoftCapPrompt = useCallback(
    (_nextCap: number) => {
      const pending = softCapPendingRef.current;
      softCapPendingRef.current = null;
      setPaneSoftCapPrompt(null);
      if (!pending) return;
      if (pending.kind === 'drop') {
        handleWorkspacePaneDrop(pending.tabId, pending.leafId, pending.zone, {
          ...(pending.centerBehavior ? { centerBehavior: pending.centerBehavior } : {}),
          ...(pending.workspaceEdge ? { workspaceEdge: true } : {}),
        });
        return;
      }
      splitWorkspaceTabToEdge(pending.tabId, pending.edge);
    },
    [handleWorkspacePaneDrop, splitWorkspaceTabToEdge],
  );

  const applyWorkspacePaneLayout = useCallback(
    (layout: PaneNode, focusedPaneId?: string | null) => {
      const flushed = flushEditorIntoActiveFileTab(workspaceTabsRef.current, {
        editorContent: editorContentRef.current ?? '',
        currentFile: currentFileRef.current,
        editedFileName: editedFileNameRef.current ?? '',
      });
      const next = replaceWorkspaceLayout(flushed, layout, focusedPaneId);
      workspaceTabsRef.current = next;
      setWorkspaceTabs(next);
      const active = getActiveTab(next);
      if (active) activateWorkspaceTab(active.id, { navigateUrl: true });
    },
    [
      activateWorkspaceTab,
      currentFileRef,
      editedFileNameRef,
      editorContentRef,
      setWorkspaceTabs,
      workspaceTabsRef,
    ],
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
    openLlmAssistWorkspaceTab,
    closeLlmAssistWorkspaceTab,
    reorderWorkspaceTabs,
    collapseToLegacyWorkspace,
    cycleWorkspaceTab,
    focusWorkspacePane,
    resizeWorkspaceSplit,
    finishResizeWorkspaceSplit,
    handleWorkspacePaneDrop,
    splitWorkspaceTabToEdge,
    applyWorkspacePaneLayout,
    collapseWorkspacePane,
    openExportPdfInFocusedPane,
    clearExportPdfInFocusedPane,
    paneSoftCapPrompt,
    cancelPaneSoftCapPrompt,
    confirmPaneSoftCapPrompt,
  };
}

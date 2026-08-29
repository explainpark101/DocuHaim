import { useCallback, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useVault } from '@/App/hooks/useVault';
import { useFileSessionOwned } from '@/App/providers/AppFileSessionStateProvider';
import { useFileSession } from '@/App/hooks/useFileSession';
import { useModalsOwned } from '@/App/providers/AppModalsStateProvider';
import { useChromeOwned } from '@/App/providers/AppChromeStateProvider';
import { useWorkspaceTabsCtx } from '@/App/hooks/useWorkspaceTabsCtx';
import { useSidebarToggleShortcut } from '@/hooks/useSidebarToggleShortcut';
import { useNavigate } from 'react-router';
import {
  getActiveFileTab,
  getActiveTab,
  isFileTab,
  isFileTabDirty,
} from '@/utils/workspaceTabs';
import { flushEditorIntoActiveFileTab } from '@/utils/workspaceTabs/appBridge';
import { STORAGE_MODE_LOCAL, STORAGE_MODE_WEBDAV } from '@/utils/storageSettings';
import { advancedSearchEngine } from '@/utils/advancedSearch';
import { whenIdle, waitForWorkspaceTabsRestore } from '@/utils/advancedSearch/yieldToMain';
import { isTauriAndroid } from '@/utils/tauriPlatform';
import { SESSION_STORAGE_TYPE } from '@/utils/sessionWorkspace';

/**
 * useAppChromeDomain: context-owned domain handlers.
 */
export function useAppChromeDomain() {
  const { isUnlocked, s3Creds } = useAuth();
  const { isMobile, setSidebarOpen, setSidebarCollapsed } = useChromeOwned();
  const { getBackendForType, localRootHandle, localTree, localVaultFsPath, s3Tree, sessionWorkspaces, storageMode, webdavConfig, webdavTree } = useVault();
  const { closeCurrentFileRef, currentFileRef, editedFileNameRef, editorContentRef, flushSessionEditorToWorkspaceRef, maybeAutoSaveOnFocusChangeRef, navGuardRef, saveFileRef, setCurrentFile, setEditorContent } = useFileSessionOwned();
  const { saveFile } = useFileSession();
  const { pendingCloseTabId, setPendingCloseTabId, setShowCloseFileConfirmModal } = useModalsOwned();
  const { closeWorkspaceTabById, setState: setWorkspaceTabs, workspaceTabsRef, hasRestoredPersistedWorkspaceTabsRef, workspaceTabsEnabledRef } = useWorkspaceTabsCtx();
  const navigate = useNavigate();

  const toggleFileTreeSidebar = useCallback(() => {
    if (isMobile) {
      setSidebarOpen((prev) => !prev);
      return;
    }
    setSidebarCollapsed((prev) => !prev);
  }, [isMobile, setSidebarOpen, setSidebarCollapsed]);

  useSidebarToggleShortcut({
    enabled: isUnlocked,
    onToggle: toggleFileTreeSidebar,
  });

  const handleBrandClick = async () => {
    const flushed = flushEditorIntoActiveFileTab(workspaceTabsRef.current, {
      editorContent: editorContentRef.current ?? '',
      currentFile: currentFileRef.current,
      editedFileName: editedFileNameRef.current ?? '',
    });
    const leaving = getActiveFileTab(flushed);
    if (leaving && isFileTabDirty(leaving) && leaving.storageType !== SESSION_STORAGE_TYPE) {
      maybeAutoSaveOnFocusChangeRef.current?.(leaving.currentFile, leaving.editorContent);
    } else if (leaving?.storageType === SESSION_STORAGE_TYPE) {
      flushSessionEditorToWorkspaceRef.current?.();
    }
    const next = { ...flushed, activeId: null };
    workspaceTabsRef.current = next;
    setWorkspaceTabs(next);
    setCurrentFile(null);
    currentFileRef.current = null;
    setEditorContent('');
    editorContentRef.current = '';
    navigate('/');
  };

  const handleCloseFileConfirmSave = async () => {
    setShowCloseFileConfirmModal(false);
    const closeId =
      pendingCloseTabId ||
      getActiveFileTab(workspaceTabsRef.current)?.id ||
      null;
    setPendingCloseTabId(null);
    if (!closeId) {
      await saveFile(null, { skipSuffixCheck: true });
      closeCurrentFileRef.current?.();
      return;
    }
    const tab = workspaceTabsRef.current.tabs.find((t) => t.id === closeId);
    if (isFileTab(tab)) {
      const isActive = workspaceTabsRef.current.activeId === closeId;
      if (isActive) {
        await saveFileRef.current?.(null, { skipSuffixCheck: true });
      } else {
        await saveFileRef.current?.(tab.currentFile, {
          skipSuffixCheck: true,
          skipCoverChangeCheck: true,
          contentOverride: tab.editorContent,
        });
      }
    }
    closeWorkspaceTabById(closeId, { skipDirtyConfirm: true });
  };

  const handleCloseFileConfirmDiscard = () => {
    setShowCloseFileConfirmModal(false);
    const closeId =
      pendingCloseTabId ||
      getActiveTab(workspaceTabsRef.current)?.id ||
      null;
    setPendingCloseTabId(null);
    if (closeId) {
      closeWorkspaceTabById(closeId, { skipDirtyConfirm: true });
      return;
    }
    closeCurrentFileRef.current?.();
  };

  const handleNavGuardConfirmSave = async () => {
    await saveFileRef.current?.(null, { skipSuffixCheck: true });
    navGuardRef.current?.proceed();
  };

  const handleNavGuardConfirmDiscard = () => {
    navGuardRef.current?.proceed();
  };

  // 3. S3 Actions — getS3Client / getBackendForType / load* owned by VaultProvider (useVault)

  const advancedSearchTreesRef = useRef({
    storageMode,
    s3Tree,
    localTree,
    webdavTree,
    sessionWorkspaces,
  });
  advancedSearchTreesRef.current = {
    storageMode,
    s3Tree,
    localTree,
    webdavTree,
    sessionWorkspaces,
  };

  // Tauri Android: never build/load lucivy inverted index (filename/path search only).
  useEffect(() => {
    if (!isTauriAndroid()) return;
    if (advancedSearchEngine.isEnabled()) {
      advancedSearchEngine.setEnabled(false);
    }
  }, []);

  useEffect(() => {
    const backend = getBackendForType(storageMode);
    const storageKey =
      storageMode === STORAGE_MODE_LOCAL
        ? `local:${localVaultFsPath || localRootHandle?.name || 'default'}`
        : storageMode === STORAGE_MODE_WEBDAV
          ? `webdav:${webdavConfig?.endpoint || ''}:${webdavConfig?.basePath || ''}`
          : `s3:${s3Creds?.bucket || ''}`;
    advancedSearchEngine.configure({
      backend,
      storageKey,
      getTree: () => {
        const cur = advancedSearchTreesRef.current;
        if (cur.storageMode === STORAGE_MODE_LOCAL) return cur.localTree || [];
        if (cur.storageMode === STORAGE_MODE_WEBDAV) return cur.webdavTree || [];
        return cur.s3Tree || [];
      },
    });
  }, [storageMode, getBackendForType, localRootHandle, s3Creds.bucket, webdavConfig]);

  useEffect(() => {
    if (!isUnlocked) return undefined;
    if (!advancedSearchEngine.isEnabled()) return undefined;
    const backend = getBackendForType(storageMode);
    if (!backend?.isReady?.()) return undefined;
    let cancelled = false;
    const idleId = whenIdle(() => {
      void (async () => {
        await waitForWorkspaceTabsRestore(
          () => workspaceTabsEnabledRef.current,
          () => hasRestoredPersistedWorkspaceTabsRef.current,
        );
        if (cancelled) return;
        // Defer index load until after first paint so Tauri startup stays responsive.
        await advancedSearchEngine.ensureLoaded();
        if (cancelled) return;
        await advancedSearchEngine.refreshCheckpointStatus();
      })();
    }, 5000);
    return () => {
      cancelled = true;
      if (idleId != null && typeof cancelIdleCallback === 'function') {
        cancelIdleCallback(idleId);
      }
    };
  }, [isUnlocked, storageMode, getBackendForType, localRootHandle, s3Creds.bucket, webdavConfig]);

  const api = {
    handleBrandClick,
    handleCloseFileConfirmSave,
    handleCloseFileConfirmDiscard,
    handleNavGuardConfirmSave,
    handleNavGuardConfirmDiscard,
    advancedSearchTreesRef,
  };
  return api;
}

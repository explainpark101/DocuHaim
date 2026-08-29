/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useLayoutEffect, useCallback, useMemo, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useModalsOwned } from '@/App/providers/AppModalsStateProvider';
import { useVault } from '@/App/hooks/useVault';
import { useFileSessionOwned } from '@/App/providers/AppFileSessionStateProvider';
import { useFileSession } from '@/App/hooks/useFileSession';
import { useTreeOpsOwned } from '@/App/providers/AppTreeOpsStateProvider';
import { useTreeOps } from '@/App/hooks/useTreeOps';
import { useWorkspaceTabsCtx } from '@/App/hooks/useWorkspaceTabsCtx';
import { useNavigate, useLocation } from 'react-router';
import { findFileNodeByPath, findNodeByPath } from '@/utils/s3Tree';
import { getSignedGetUrl } from '@/utils/s3Client';
import {
  CHAT_TAB_ID,
  SETTINGS_TAB_ID,
  pickWorkspaceTabsRestoreSource,
  persistedTabId,
  seedTabsRestoreQueueFromSnapshot,
} from '@/utils/workspaceTabs';
import { STORAGE_MODE_LOCAL, STORAGE_MODE_WEBDAV } from '@/utils/storageSettings';
import { createWebdavBackend } from '@/utils/storage';
import { hasStoredLocalRootHandle, loadLastLocalFolderName } from '@/utils/localFolderStore';
import { isDesktopApp } from '@/utils/isDesktopApp';
import { isTauriAndroid } from '@/utils/tauriPlatform';
import { loadLocalVaultFsPath } from '@/utils/localVaultPathStore';
import { readTauriLocalDirectoryTree, loadTauriLocalTreeInitial } from '@/utils/storage/tauriLocalBackend';
import { loadExpandedFolderPaths } from '@/utils/expandedFoldersStore';
import { ensureAndroidDefaultLocalVaultRoot } from '@/utils/storage/androidLocalVault';
import {
  resolveDesktopOpenPaths,
  subscribeDesktopOpenFiles,
  takeDesktopOpenPathQueue,
} from '@/utils/desktopOpenFiles';
import { consumePendingPrintReturnState } from '@/utils/printNavigationState';
import { resolveLocalFileNode } from '@/utils/localFileNode';
import { parseViewPathFromAppPathname, parseExportPdfPathFromAppPathname, parseOpenNotePathFromAppPathname, isChatAppPathname, isSettingsAppPathname, isContentSearchAppPathname, isExportPdfAppPathname, exportPdfPathnameForStoragePath } from '@/utils/appHref';

/**
 * useFileOpenRoutingDomain: context-owned domain handlers.
 */
export function useFileOpenRoutingDomain() {
  const { isUnlocked, s3Creds } = useAuth();
  const { localFolderRestoreSettled, setLocalFolderRestoreSettled, setPendingLocalFolderName, setShowRestoreLocalFolderModal } = useModalsOwned();
  const {
    getS3Client,
    loadLocalFolderChildren,
    loadWebdavFolderChildren,
    localRootHandle,
    localTree,
    localVaultFsPath,
    s3Tree,
    setIsLocalTreeLoading,
    setLocalTree,
    setLocalVaultFsPath,
    storageMode,
    webdavConfig,
    webdavReady,
    webdavTree,
  } = useVault();
  const { clearOpenFileStateRef, currentFileRef, editorContentRef, hasProcessedOpenFromUrlRef, hasPromptedLocalFolderRestoreRef, hasRestoredFromPrintRef, hasRestoredLastFileRef, hasSeededTabsRestoreQueueRef, loadLastOpenedFileRef, openSessionWorkspaceRef, prevEditorContentRef, prevHistoryViewPathRef, restorePersistedWorkspaceTabsRef, restoringWorkspaceTabsRef, selectFileRawRef, selectFileRef, setCurrentFile, setEditorContent } = useFileSessionOwned();
  const { selectFileRaw } = useFileSession();
  const { createModalContext } = useTreeOpsOwned();
  const { handleTreeNodeSelect } = useTreeOps();
  const { hasRestoredPersistedWorkspaceTabsRef, openChatWorkspaceTab, openContentSearchWorkspaceTab, openSettingsWorkspaceTab, workspaceTabsEnabled, workspaceTabsEnabledRef } = useWorkspaceTabsCtx();
  const navigate = useNavigate();
  const location = useLocation();

  const selectFile = useCallback(
    (type: any, node: any) => {
      void handleTreeNodeSelect(type, node, {});
    },
    [handleTreeNodeSelect],
  );

  const ensureAdvancedSearchBrowseFolder = useCallback(
    async (folderPath: any) => {
      if (!folderPath) return;
      if (storageMode === STORAGE_MODE_LOCAL) {
        const node =
          findNodeByPath(localTree, folderPath) ||
          findNodeByPath(localTree, folderPath.replace(/\/$/, '')) ||
          findNodeByPath(localTree, `${folderPath.replace(/\/$/, '')}/`);
        if ((node as any)?.type === 'folder') {
          await loadLocalFolderChildren(node);
        }
        return;
      }
      if (storageMode === STORAGE_MODE_WEBDAV) {
        const node =
          findNodeByPath(webdavTree, folderPath) ||
          findNodeByPath(webdavTree, folderPath.replace(/\/$/, '')) ||
          findNodeByPath(webdavTree, `${folderPath.replace(/\/$/, '')}/`);
        if ((node as any)?.type === 'folder') {
          await loadWebdavFolderChildren(node);
        }
      }
    },
    [storageMode, localTree, webdavTree, loadLocalFolderChildren, loadWebdavFolderChildren],
  );

  const ensureCreateModalFolderLoaded = useCallback(
    async (folderPath: any) => {
      const st = createModalContext?.storageType;
      if (!folderPath || !st) return;
      if (st === 'local') {
        const node =
          findNodeByPath(localTree, folderPath) ||
          findNodeByPath(localTree, folderPath.replace(/\/$/, '')) ||
          findNodeByPath(localTree, `${folderPath.replace(/\/$/, '')}/`);
        if ((node as any)?.type === 'folder') {
          await loadLocalFolderChildren(node);
        }
        return;
      }
      if (st === 'webdav') {
        const node =
          findNodeByPath(webdavTree, folderPath) ||
          findNodeByPath(webdavTree, folderPath.replace(/\/$/, '')) ||
          findNodeByPath(webdavTree, `${folderPath.replace(/\/$/, '')}/`);
        if ((node as any)?.type === 'folder') {
          await loadWebdavFolderChildren(node);
        }
      }
    },
    [
      createModalContext?.storageType,
      localTree,
      webdavTree,
      loadLocalFolderChildren,
      loadWebdavFolderChildren,
    ],
  );

  const createModalTree = useMemo(() => {
    const st = createModalContext?.storageType;
    if (st === 'local') return localTree;
    if (st === 'webdav') return webdavTree;
    if (st === 's3') return s3Tree;
    return null;
  }, [createModalContext?.storageType, localTree, webdavTree, s3Tree]);

  const handleOpenInNewWindow = useCallback(
    async (storageType: any, node: any) => {
      if (node?.type !== 'file' || !node?.path) return;

      const path = node.path;
      const ext = (path.split('.').pop() || '').toLowerCase();

      const imageExts = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'ico', 'avif'];
      const videoExts = ['mp4', 'webm', 'ogv', 'mov', 'mkv'];
      const audioExts = ['m4a', 'mp3', 'wav', 'ogg', 'aac', 'flac', 'weba'];
      const isPathMedia =
        (storageType === 's3' || storageType === 'webdav' || storageType === 'local') &&
        (ext === 'pdf' || imageExts.includes(ext) || videoExts.includes(ext) || audioExts.includes(ext));

      if (isPathMedia && (storageType === 's3' || storageType === 'webdav')) {
        const win = window.open('about:blank', '_blank');
        if (!win) {
          alert('팝업이 차단되어 새 창을 열 수 없습니다.');
          return;
        }

        try {
          if (storageType === 's3') {
            const client = getS3Client();
            const bucket = s3Creds.bucket;
            if (!client || !bucket) throw new Error('S3 클라이언트 또는 버킷이 초기화되지 않았습니다.');
            const signedUrl = await getSignedGetUrl(client, bucket, path, 3600);
            win.location.href = signedUrl.toString();
          } else {
            const backend = createWebdavBackend(webdavConfig);
            const url = await backend.getObjectUrl(path);
            if (!url) throw new Error('WebDAV URL을 만들 수 없습니다.');
            win.location.href = url;
          }
        } catch (e) {
          console.error('Open media URL failed:', e);
          alert('미디어 열기에 실패했습니다.');
        }
        return;
      }

      if (isPathMedia && storageType === 'local' && node.handle) {
        const win = window.open('about:blank', '_blank');
        if (!win) {
          alert('팝업이 차단되어 새 창을 열 수 없습니다.');
          return;
        }
        try {
          const file = await node.handle.getFile();
          const url = URL.createObjectURL(file);
          win.location.href = url;
        } catch (e) {
          console.error('Open local media failed:', e);
          alert('미디어 열기에 실패했습니다.');
        }
        return;
      }

      const url = new URL(window.location.href);
      const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
      const encodedView = String(path)
        .split('/')
        .filter(Boolean)
        .map((segment) => encodeURIComponent(segment))
        .join('/');
      if (isDesktopApp()) {
        url.hash = `/view/${encodedView}`;
      } else {
        url.pathname = `${base && base !== '/' ? base : ''}/view/${encodedView}`;
      }
      url.searchParams.set('open', `${storageType}:${path}`);
      window.open(url.toString(), '_blank');
    },
    [getS3Client, s3Creds.bucket, webdavConfig]
  );

  useEffect(() => {
    if (!isUnlocked || hasRestoredFromPrintRef.current) return;
    const pending = consumePendingPrintReturnState();
    hasRestoredFromPrintRef.current = true;
    if (!pending) return;

    hasProcessedOpenFromUrlRef.current = true;
    hasRestoredLastFileRef.current = true;

    const nextContent = typeof pending.editorContent === 'string' ? pending.editorContent : '';
    if (pending.currentFile && typeof pending.currentFile === 'object') {
      setCurrentFile(pending.currentFile);
    }
    prevEditorContentRef.current = nextContent;
    editorContentRef.current = nextContent;
    setEditorContent(nextContent);
  }, [isUnlocked]);

  // SPA return from Export PDF: apply sessionStorage/memory handoff before paint.
  const wasOnExportPdfRef = useRef(isExportPdfAppPathname(location.pathname));
  useLayoutEffect(() => {
    const onExportPdf = isExportPdfAppPathname(location.pathname);
    const leftExportPdf = wasOnExportPdfRef.current && !onExportPdf;
    wasOnExportPdfRef.current = onExportPdf;
    if (!leftExportPdf || !isUnlocked) return;

    const pending = consumePendingPrintReturnState();
    if (!pending) return;

    const nextContent = typeof pending.editorContent === 'string' ? pending.editorContent : '';
    prevEditorContentRef.current = nextContent;
    editorContentRef.current = nextContent;
    setEditorContent(nextContent);

    const pendingFile = pending.currentFile;
    if (!pendingFile || typeof pendingFile !== 'object') return;

    setCurrentFile((prev: any) => {
      if (prev && pendingFile.id && prev.id === pendingFile.id) {
        return {
          ...prev,
          name: pendingFile.name ?? prev.name,
          viewer: pendingFile.viewer ?? prev.viewer,
          size: pendingFile.size ?? prev.size,
          lastModified: pendingFile.lastModified ?? prev.lastModified,
          content:
            typeof pendingFile.content === 'string' ? pendingFile.content : prev.content,
        };
      }
      // Avoid replacing a live local FileSystemHandle with a serializable stub.
      if (prev?.type === 'local' && pendingFile.type === 'local') return prev;
      return pendingFile;
    });
  }, [location.pathname, isUnlocked]);

  // Seed Ctrl+Shift+T queue once from last-open snapshot (siblings of the auto-restored tab).
  useEffect(() => {
    if (!isUnlocked || !workspaceTabsEnabled) return;
    if (hasSeededTabsRestoreQueueRef.current) return;
    hasSeededTabsRestoreQueueRef.current = true;
    const source = pickWorkspaceTabsRestoreSource();
    if (!source?.tabs?.length) return;
    const openIds = new Set(source.tabs.map((tab) => persistedTabId(tab)));
    seedTabsRestoreQueueFromSnapshot(source, openIds as Set<string>);
  }, [isUnlocked, workspaceTabsEnabled]);

  // Nothing to restore — allow live tab persistence (avoids blocking fresh sessions).
  useEffect(() => {
    if (!isUnlocked || !workspaceTabsEnabled) return;
    if (hasRestoredPersistedWorkspaceTabsRef.current) return;
    const persisted = pickWorkspaceTabsRestoreSource();
    if (persisted?.tabs?.length) return;
    hasRestoredPersistedWorkspaceTabsRef.current = true;
  }, [isUnlocked, workspaceTabsEnabled]);

  // Desktop OS / CLI open-file queue (Tauri file association)
  useEffect(() => {
    if (!isUnlocked || !isDesktopApp()) return undefined;
    let cancelled = false;

    const processPaths = async (paths: any) => {
      const abs = (paths || []).filter(Boolean);
      if (!abs.length || cancelled) return;
      const routes = await resolveDesktopOpenPaths(abs);
      for (const route of routes) {
        if (cancelled) return;
        if (route.kind === 'vault') {
          const name = route.relativePath.split('/').filter(Boolean).pop() || 'note.md';
          const node = {
            type: 'file',
            path: route.relativePath,
            name,
          };
          await selectFileRaw('local', node);
        } else if (route.kind === 'session') {
          await openSessionWorkspaceRef.current?.(route.workspace);
        }
      }
    };

    const drain = () => {
      const pending = takeDesktopOpenPathQueue();
      if (pending.length) void processPaths(pending);
    };

    drain();
    const unsub = subscribeDesktopOpenFiles(() => drain());
    return () => {
      cancelled = true;
      unsub();
    };
  }, [isUnlocked, selectFileRaw, openSessionWorkspaceRef]);

  // Open file from ?open=, /view/* or /export-pdf/* route, or last-file cache once storage is ready.
  useEffect(() => {
    if (!isUnlocked || hasProcessedOpenFromUrlRef.current) return;

    const onChat =
      location.pathname === '/chat' || location.pathname.endsWith('/chat');
    const onSettings = isSettingsAppPathname(location.pathname);
    const onContentSearch = isContentSearchAppPathname(location.pathname);
    const openParam =
      typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search).get('open')
        : null;
    const routeExportPath = parseExportPdfPathFromAppPathname(location.pathname);
    const routeViewPath = parseViewPathFromAppPathname(location.pathname);
    const routeNotePath = routeExportPath || routeViewPath;

    let type = null;
    let path = null;

    if (openParam) {
      const colonIdx = openParam.indexOf(':');
      const openType = colonIdx >= 0 ? openParam.slice(0, colonIdx) : null;
      const openPath = colonIdx >= 0 ? openParam.slice(colonIdx + 1) : null;
      if (
        (openType !== 's3' && openType !== 'local' && openType !== 'webdav') ||
        !openPath
      ) {
        hasProcessedOpenFromUrlRef.current = true;
        return;
      }
      type = openType;
      path = openPath;
    } else if (routeNotePath) {
      type =
        storageMode === STORAGE_MODE_LOCAL
          ? 'local'
          : storageMode === STORAGE_MODE_WEBDAV
            ? 'webdav'
            : 's3';
      path = routeNotePath;
    } else if (onChat) {
      hasRestoredLastFileRef.current = true;
      hasProcessedOpenFromUrlRef.current = true;
      if (workspaceTabsEnabledRef.current) {
        openChatWorkspaceTab({ navigateUrl: false });
      }
      return;
    } else if (onSettings) {
      hasRestoredLastFileRef.current = true;
      hasProcessedOpenFromUrlRef.current = true;
      if (workspaceTabsEnabledRef.current) {
        openSettingsWorkspaceTab({ navigateUrl: false });
      }
      return;
    } else if (onContentSearch) {
      hasRestoredLastFileRef.current = true;
      hasProcessedOpenFromUrlRef.current = true;
      if (workspaceTabsEnabledRef.current) {
        openContentSearchWorkspaceTab({ navigateUrl: false });
      }
      return;
    } else if (isExportPdfAppPathname(location.pathname)) {
      // Bare /export-pdf without a note path — do not restore last file into the editor.
      hasRestoredLastFileRef.current = true;
      hasProcessedOpenFromUrlRef.current = true;
      return;
    } else {
      if (hasRestoredLastFileRef.current) return;
      const persisted = pickWorkspaceTabsRestoreSource();
      if (persisted?.tabs?.length) {
        hasRestoredLastFileRef.current = true;
        // Workspace tabs: open chat/settings shells, then defer file restore to the
        // follow-up effect (avoids hasRestoredLastFileRef blocking retry while vault loads).
        if (workspaceTabsEnabledRef.current) {
          hasProcessedOpenFromUrlRef.current = true;
          if (persisted.tabs.some((t) => t.kind === 'chat')) {
            openChatWorkspaceTab({ navigateUrl: false, activate: false });
          }
          if (persisted.tabs.some((t) => t.kind === 'settings')) {
            openSettingsWorkspaceTab({ navigateUrl: false, activate: false });
          }
          if (persisted.activeId === CHAT_TAB_ID) {
            navigate('/chat');
            return;
          }
          if (persisted.activeId === SETTINGS_TAB_ID) {
            navigate('/settings');
            return;
          }
          return;
        }
        // Legacy single-slot mode: open the active file directly when possible.
        const fileTabs = persisted.tabs.filter((t) => t.kind === 'file');
        const activeFile =
          fileTabs.find((t) => persisted.activeId === `${t.type}:${t.path}`) ||
          (persisted.activeId === CHAT_TAB_ID || persisted.activeId === SETTINGS_TAB_ID
            ? null
            : fileTabs[0]);
        if (persisted.activeId === CHAT_TAB_ID) {
          hasProcessedOpenFromUrlRef.current = true;
          navigate('/chat');
          return;
        }
        if (persisted.activeId === SETTINGS_TAB_ID) {
          hasProcessedOpenFromUrlRef.current = true;
          navigate('/settings');
          return;
        }
        if (activeFile) {
          type = activeFile.type;
          path = activeFile.path;
        } else {
          hasProcessedOpenFromUrlRef.current = true;
          return;
        }
      } else {
        const saved = loadLastOpenedFileRef.current?.();
        if (!saved || typeof saved !== 'object') {
          hasRestoredLastFileRef.current = true;
          return;
        }
        if (saved.type === 'chat') {
          hasRestoredLastFileRef.current = true;
          hasProcessedOpenFromUrlRef.current = true;
          if (workspaceTabsEnabledRef.current) openChatWorkspaceTab();
          else navigate('/chat');
          return;
        }
        if (saved.type !== 's3' && saved.type !== 'local' && saved.type !== 'webdav') {
          hasRestoredLastFileRef.current = true;
          return;
        }
        type = saved.type;
        path = saved.path;
      }
    }

    if (!type || !path) return;

    if (type === 'local') {
      if (!localRootHandle) {
        if (localFolderRestoreSettled) {
          hasProcessedOpenFromUrlRef.current = true;
          hasRestoredLastFileRef.current = true;
        }
        return;
      }
    } else if (type === 'webdav') {
      if (!webdavReady || !webdavTree?.length) return;
    } else if (!s3Tree?.length) {
      return;
    }

    let cancelled = false;
    (async () => {
      let node = null;
      if (type === 'local') {
        node =
          findFileNodeByPath(localTree, path) ||
          findNodeByPath(localTree, path) ||
          (await resolveLocalFileNode(localRootHandle, path));
      } else if (type === 'webdav') {
        node = findFileNodeByPath(webdavTree, path) || findNodeByPath(webdavTree, path);
      } else {
        node = findFileNodeByPath(s3Tree, path) || findNodeByPath(s3Tree, path);
      }
      if (cancelled) return;
      hasProcessedOpenFromUrlRef.current = true;
      hasRestoredLastFileRef.current = true;
      if (openParam) {
        const params = new URLSearchParams(location.search);
        params.delete('open');
        const nextSearch = params.toString();
        const nextPathname = routeExportPath
          ? exportPdfPathnameForStoragePath(path)
          : `/view/${path}`;
        navigate(
          {
            pathname: nextPathname,
            search: nextSearch ? `?${nextSearch}` : '',
          },
          { replace: true },
        );
      }
      if ((node as any)?.type === 'file') {
        if (routeExportPath || isExportPdfAppPathname(location.pathname)) {
          await selectFileRawRef.current?.(type, node, { skipNavigate: true });
        } else {
          selectFile(type, node);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    isUnlocked,
    localRootHandle,
    localFolderRestoreSettled,
    localTree,
    webdavReady,
    webdavTree,
    s3Tree,
    storageMode,
    location.pathname,
    location.search,
    selectFile,
    loadLastOpenedFileRef,
    navigate,
    openChatWorkspaceTab,
    openSettingsWorkspaceTab,
  ]);

  selectFileRawRef.current = selectFileRaw;

  useEffect(() => {
    if (!isUnlocked || !workspaceTabsEnabled || !hasProcessedOpenFromUrlRef.current) return;
    if (hasRestoredPersistedWorkspaceTabsRef.current || restoringWorkspaceTabsRef.current) return;

    const persisted = pickWorkspaceTabsRestoreSource();
    if (!persisted?.tabs?.length) {
      hasRestoredPersistedWorkspaceTabsRef.current = true;
      return;
    }

    const needsLocal = persisted.tabs.some((tab) => tab.kind === 'file' && tab.type === 'local');
    if (needsLocal && !localRootHandle && !localVaultFsPath) {
      if (localFolderRestoreSettled) {
        hasRestoredPersistedWorkspaceTabsRef.current = true;
      }
      return;
    }

    const needsWebdav = persisted.tabs.some((tab) => tab.kind === 'file' && tab.type === 'webdav');
    if (needsWebdav && !webdavReady) return;

    const routeNotePath = parseOpenNotePathFromAppPathname(location.pathname);
    const routeStorageType = routeNotePath
      ? storageMode === STORAGE_MODE_LOCAL
        ? 'local'
        : storageMode === STORAGE_MODE_WEBDAV
          ? 'webdav'
          : 's3'
      : null;
    const explicitActiveId = isChatAppPathname(location.pathname)
      ? CHAT_TAB_ID
      : isSettingsAppPathname(location.pathname)
        ? SETTINGS_TAB_ID
        : routeNotePath && routeStorageType
          ? `${routeStorageType}:${routeNotePath}`
          : null;
    const navigateActiveUrl = explicitActiveId == null && !isExportPdfAppPathname(location.pathname);

    restoringWorkspaceTabsRef.current = true;
    void (async () => {
      try {
        await restorePersistedWorkspaceTabsRef.current?.(persisted, {
          activeId: explicitActiveId,
          navigateActiveUrl,
        });
      } finally {
        restoringWorkspaceTabsRef.current = false;
        hasRestoredPersistedWorkspaceTabsRef.current = true;
      }
    })();
  }, [
    isUnlocked,
    workspaceTabsEnabled,
    localRootHandle,
    localVaultFsPath,
    localFolderRestoreSettled,
    webdavReady,
    location.pathname,
    storageMode,
    restorePersistedWorkspaceTabsRef,
  ]);

  // Open settings as a workspace tab whenever /settings is hit (incl. locked first-run).
  useEffect(() => {
    if (!isSettingsAppPathname(location.pathname)) return;
    if (!workspaceTabsEnabledRef.current) return;
    openSettingsWorkspaceTab({ navigateUrl: false });
  }, [location.pathname, openSettingsWorkspaceTab]);

  useEffect(() => {
    if (!isContentSearchAppPathname(location.pathname)) return;
    if (!workspaceTabsEnabledRef.current) return;
    openContentSearchWorkspaceTab({ navigateUrl: false });
  }, [location.pathname, openContentSearchWorkspaceTab]);

  // Keep the open note in sync with browser history (back/forward, history.back, …).
  useEffect(() => {
    if (!isUnlocked || !hasProcessedOpenFromUrlRef.current) return;
    if (
      isChatAppPathname(location.pathname) ||
      isSettingsAppPathname(location.pathname) ||
      isContentSearchAppPathname(location.pathname)
    ) {
      if (workspaceTabsEnabledRef.current) {
        if (isChatAppPathname(location.pathname)) {
          openChatWorkspaceTab({ navigateUrl: false });
        } else if (isSettingsAppPathname(location.pathname)) {
          openSettingsWorkspaceTab({ navigateUrl: false });
        } else {
          openContentSearchWorkspaceTab({ navigateUrl: false });
        }
      }
      return;
    }

    const routeNotePath = parseOpenNotePathFromAppPathname(location.pathname);
    if (!routeNotePath) {
      // Bare /export-pdf keeps whatever was opened via navigation state.
      if (isExportPdfAppPathname(location.pathname)) return;
      prevHistoryViewPathRef.current = null as any;
      // Bare `/` does not close workspace tabs (tab bar owns lifecycle).
      return;
    }

    const routeChanged = prevHistoryViewPathRef.current !== routeNotePath;
    prevHistoryViewPathRef.current = routeNotePath;

    if (currentFileRef.current?.id === routeNotePath) {
      return;
    }

    // Only react to real history navigation — not vault tree refreshes after save.
    if (!routeChanged) {
      return;
    }

    const type =
      storageMode === STORAGE_MODE_LOCAL
        ? 'local'
        : storageMode === STORAGE_MODE_WEBDAV
          ? 'webdav'
          : 's3';

    if (type === 'local') {
      if (!localRootHandle) return;
    } else if (type === 'webdav') {
      if (!webdavReady || !webdavTree?.length) return;
    } else if (!s3Tree?.length) {
      return;
    }

    let cancelled = false;
    (async () => {
      let node = null;
      if (type === 'local') {
        node =
          findFileNodeByPath(localTree, routeNotePath) ||
          findNodeByPath(localTree, routeNotePath) ||
          (await resolveLocalFileNode(localRootHandle, routeNotePath));
      } else if (type === 'webdav') {
        node = findFileNodeByPath(webdavTree, routeNotePath) || findNodeByPath(webdavTree, routeNotePath);
      } else {
        node = findFileNodeByPath(s3Tree, routeNotePath) || findNodeByPath(s3Tree, routeNotePath);
      }
      if (cancelled) return;
      if ((node as any)?.type === 'file') {
        await selectFileRawRef.current?.(type, node, { skipNavigate: true });
        return;
      }
      // Tree refresh after rename updates the open file id but not the URL yet.
      // Only close when the route itself changed to a missing path (back/forward).
      if (routeChanged && currentFileRef.current) clearOpenFileStateRef.current?.();
    })();

    return () => {
      cancelled = true;
    };
  }, [
    isUnlocked,
    location.pathname,
    storageMode,
    localRootHandle,
    localTree,
    webdavReady,
    webdavTree,
    s3Tree,
    openChatWorkspaceTab,
    openSettingsWorkspaceTab,
  ]);

  // Prompt to restore last local folder when returning in local mode
  useEffect(() => {
    if (!isUnlocked || hasPromptedLocalFolderRestoreRef.current) return;
    if (storageMode !== STORAGE_MODE_LOCAL || localRootHandle) return;
    // Tauri shells persist an absolute vault path — no FSA handle restore.
    if (isDesktopApp() || localVaultFsPath) {
      setLocalFolderRestoreSettled(true);
      return;
    }

    let cancelled = false;
    (async () => {
      const stored = await hasStoredLocalRootHandle();
      const name = loadLastLocalFolderName();
      if (cancelled) return;
      if (!stored || !name) {
        setLocalFolderRestoreSettled(true);
        return;
      }
      hasPromptedLocalFolderRestoreRef.current = true;
      setPendingLocalFolderName(name);
      setShowRestoreLocalFolderModal(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [isUnlocked, storageMode, localRootHandle, localVaultFsPath]);

  // Restore Tauri local vault tree from persisted absolute path
  // (Android: ensure app-private LocalHaim default when none is set).
  useEffect(() => {
    if (!isUnlocked || !isDesktopApp()) return;
    if (storageMode !== STORAGE_MODE_LOCAL) return;
    let cancelled = false;
    (async () => {
      let abs = localVaultFsPath || loadLocalVaultFsPath();
      if (!abs && isTauriAndroid()) {
        abs = (await ensureAndroidDefaultLocalVaultRoot()) || '';
      }
      if (!abs || cancelled) return;
      if (localVaultFsPath !== abs) setLocalVaultFsPath(abs);
      setIsLocalTreeLoading(true);
      try {
        const tree = await loadTauriLocalTreeInitial(
          abs,
          loadExpandedFolderPaths().local,
        );
        if (!cancelled) setLocalTree(tree);
      } catch (e) {
        console.warn('Failed to restore Tauri local vault tree:', e);
      } finally {
        if (!cancelled) setIsLocalTreeLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isUnlocked, storageMode, localVaultFsPath]);

  const api = {
    selectFile,
    ensureAdvancedSearchBrowseFolder,
    ensureCreateModalFolderLoaded,
    createModalTree,
    handleOpenInNewWindow,
  };
  selectFileRef.current = selectFile;
  return api;
}

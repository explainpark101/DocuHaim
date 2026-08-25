/**
 * App logic setup: autosave helpers, document title, auth session restore,
 * settings-toggle sync. Owns routing restore refs; pulls other state from ctx.
 */
import { useCallback, useEffect, useRef, type MutableRefObject } from 'react';
import type { Location, NavigateFunction } from 'react-router';
import type { WorkspaceTabsCtxValue } from '@/App/context/WorkspaceTabsContext';
import type { FileSessionValue } from '@/App/context/FileSessionContext';
import type { AuthS3Creds } from '@/contexts/AuthContext';
import type { WorkspaceTabsState } from '@/utils/workspaceTabs/types';
import type { WorkspaceTabsAutoSaveMode } from '@/utils/workspaceTabsSettings';
import { getExt } from '@/App/helpers';
import { clearAllLlmApiKeySessions } from '@/utils/llmApiKeySession';
import {
  clearPlaintextWebdavConfig,
  loadWebdavConfig,
  decryptWebdavConfig,
  hasEncryptedWebdavConfig,
  DEFAULT_WEBDAV_CONFIG,
  DEFAULT_STORAGE_MODE,
  getAppNameByStorageMode,
  saveStorageMode,
} from '@/utils/storageSettings';
import { isDesktopApp } from '@/utils/isDesktopApp';
import { registerAppLockAction } from '@/utils/advancedSearch/appLockActions';
import { clearAuthSession, saveAuthSession, tryRestoreAuthSession } from '@/utils/authSession';
import {
  CHAT_TAB_ID,
  SETTINGS_TAB_ID,
  pickWorkspaceTabsRestoreSource,
  clearPersistedWorkspaceTabs,
  getActiveFileTab,
  isFileTabDirty,
} from '@/utils/workspaceTabs';
import {
  closeTab,
  findFileTab,
  flushEditorIntoActiveFileTab,
} from '@/utils/workspaceTabs/appBridge';
import {
  loadWorkspaceTabsAutoSaveMode,
  WORKSPACE_TABS_AUTO_SAVE_CHANGED_EVENT,
} from '@/utils/workspaceTabsSettings';
import { isEncMdPath } from '@/utils/encMd';
import { getDraftKey, saveMemoDraft } from '@/utils/memoDraftsDb';
import { subscribeSettingsToggles } from '@/utils/advancedSearch/settingsToggles';
import {
  isWebAuthnPRFSupported,
  browserSupportsWebAuthn,
  getStoredWebAuthn,
  isStoredWithWebAuthn,
} from '@/utils/webauthn';
import {
  hasDesktopBiometricLockMarker,
  hasDesktopStoredCredsMarker,
  getDesktopAppEntryLockModeSync,
  loadPasswordEncryptedCredsBlob,
  migrateLegacyDesktopSecretsToStronghold,
  tryRestoreDesktopStrongholdSession,
} from '@/utils/desktopStrongholdSecrets';
import { hasDesktopAppEntryLock } from '@/utils/desktopAppEntryLock';
import { SESSION_STORAGE_TYPE } from '@/utils/sessionWorkspace';

type WebdavConfig = {
  endpoint: string;
  username: string;
  password: string;
  basePath: string;
};

type BackgroundTabSaveFile = {
  type?: string;
  id?: string;
  name?: string;
  viewer?: string;
  content?: string;
  lastModified?: Date | number;
};

export type AppLogicSetupDomainCtx = {
  s3Creds: AuthS3Creds;
  setWebdavConfig: (cfg: WebdavConfig | ((prev: WebdavConfig) => WebdavConfig)) => void;
  lock: () => void;
  unlock: (creds: AuthS3Creds, password?: string) => void;
  proceedWithoutStoredCreds: () => void;
  isUnlocked: boolean;
  masterPassword: string;
  webdavConfig: WebdavConfig;
  navigate: NavigateFunction;
  location: Location;
  setSelectedIds: (ids: Set<string> | ((prev: Set<string>) => Set<string>)) => void;
  setCurrentFile: (
    file: BackgroundTabSaveFile | null | ((prev: BackgroundTabSaveFile | null) => BackgroundTabSaveFile | null),
  ) => void;
  currentFileRef: MutableRefObject<BackgroundTabSaveFile | null>;
  setEditorContent: (content: string | ((prev: string) => string)) => void;
  editorContentRef: MutableRefObject<string>;
  setEditedFileName: (name: string | ((prev: string) => string)) => void;
  editedFileName: string;
  currentFile: BackgroundTabSaveFile | null;
  editedFileNameRef: MutableRefObject<string>;
  workspaceTabsApi: WorkspaceTabsCtxValue;
  workspaceTabsRef: MutableRefObject<WorkspaceTabsState>;
  workspaceTabsEnabledRef: MutableRefObject<boolean>;
  setWorkspaceTabs: WorkspaceTabsCtxValue['setState'];
  setWorkspaceTabsEnabled: (enabled: boolean) => void;
  setSavingTabIds: (ids: string[] | ((prev: string[]) => string[])) => void;
  savingTabIdsRef: MutableRefObject<Set<string>>;
  saveFileRef: MutableRefObject<FileSessionValue['saveFile'] | undefined>;
  s3Tree: unknown[];
  webdavTree: unknown[];
  sessionWorkspace: unknown;
  sessionWorkspaceRef: MutableRefObject<unknown>;
  storageMode: string;
  fileSessionApi: FileSessionValue;
  appLockPromptManual: boolean;
  setAuthWanted: (wanted: boolean) => void;
  authWanted: boolean;
  shareBlockingAuth: boolean;
  setShowAuthModal: (show: boolean) => void;
  setWebauthnPRFSupported: (supported: boolean) => void;
  setWebauthnAvailable: (available: boolean) => void;
  webauthnAvailable: boolean;
  isChatRoute: boolean;
  isSettingsRoute: boolean;
  setShowTrashFolder: (show: boolean) => void;
  setShowHiddenFolders: (show: boolean) => void;
  setHideRecordingCompanions: (hide: boolean) => void;
  setTreeStickyFolderPathEnabled: (enabled: boolean) => void;
  setShowTreeModifiedDate: (show: boolean) => void;
  suppressUnsavedNavGuardRef?: MutableRefObject<boolean>;
};

export function useAppLogicSetupDomain(ctx: AppLogicSetupDomainCtx) {
  const {
    s3Creds, setWebdavConfig, lock, unlock, proceedWithoutStoredCreds,
    isUnlocked, masterPassword, webdavConfig, navigate, location,
    setSelectedIds, setCurrentFile, currentFileRef, setEditorContent, editorContentRef,
    setEditedFileName, editedFileName, currentFile, editedFileNameRef,
    workspaceTabsApi, workspaceTabsRef, workspaceTabsEnabledRef, setWorkspaceTabs,
    setWorkspaceTabsEnabled, setSavingTabIds, savingTabIdsRef, saveFileRef,
    s3Tree, webdavTree, sessionWorkspace, sessionWorkspaceRef,
    storageMode, fileSessionApi, appLockPromptManual,
    setAuthWanted, authWanted, shareBlockingAuth, setShowAuthModal,
    setWebauthnPRFSupported, setWebauthnAvailable, webauthnAvailable,
    isChatRoute, isSettingsRoute,
    setShowTrashFolder, setShowHiddenFolders, setHideRecordingCompanions,
    setTreeStickyFolderPathEnabled, setShowTreeModifiedDate,
  } = ctx;

  const fallbackSuppressUnsavedNavGuardRef = useRef(false);
  const suppressUnsavedNavGuardRef =
    ctx.suppressUnsavedNavGuardRef ?? fallbackSuppressUnsavedNavGuardRef;

  const workspaceTabsAutoSaveModeRef = useRef(loadWorkspaceTabsAutoSaveMode());
  const appName = getAppNameByStorageMode(storageMode || DEFAULT_STORAGE_MODE);

  useEffect(() => {
    const onUnload = () => {
      clearAllLlmApiKeySessions();
    };
    window.addEventListener('beforeunload', onUnload);
    return () => window.removeEventListener('beforeunload', onUnload);
  }, []);

  useEffect(() => {
    clearAllLlmApiKeySessions();
  }, [s3Creds?.googleAiStudioApiKey, s3Creds?.openaiCompatibleApiKey, s3Creds?.openaiCompatibleBaseUrl, s3Creds?.llmProviderProfiles]);

  const lockApp = useCallback(() => {
    clearPlaintextWebdavConfig();
    setWebdavConfig({ ...DEFAULT_WEBDAV_CONFIG });
    lock();
  }, [lock]);

  useEffect(() => {
    if (!isDesktopApp()) return;
    return registerAppLockAction(() => {
      lockApp();
    });
  }, [lockApp]);

  useEffect(() => {
    if (!isUnlocked) return;
    if (
      isDesktopApp() &&
      (hasDesktopBiometricLockMarker() || getDesktopAppEntryLockModeSync() === 'password')
    ) {
      clearAuthSession();
      return;
    }
    void saveAuthSession({
      creds: s3Creds,
      password: masterPassword,
      webdavConfig,
    });
  }, [isUnlocked, s3Creds, masterPassword, webdavConfig]);

  const loadPlainWebdavIfAllowed = useCallback(async () => {
    const cfg = await loadWebdavConfig();
    if (cfg?.endpoint || cfg?.username || cfg?.password) {
      setWebdavConfig(cfg);
    }
  }, []);

  const s3TreeRef = useRef<unknown[]>([]);
  const webdavTreeRef = useRef<unknown[]>([]);
  const prevHistoryViewPathRef = useRef<string | undefined>(undefined);
  const hasRestoredLastFileRef = useRef(false);
  const hasProcessedOpenFromUrlRef = useRef(false);
  const hasRestoredFromPrintRef = useRef(false);
  const hasPromptedLocalFolderRestoreRef = useRef(false);

  const hasSeededTabsRestoreQueueRef = useRef(false);
  const restoringWorkspaceTabsRef = useRef(false);

  const loadLastOpenedFile = useCallback(() => {
    const persisted = pickWorkspaceTabsRestoreSource();
    if (persisted?.tabs?.length) {
      const active = persisted.tabs.find((t) => {
        if (t.kind === 'chat') return persisted.activeId === CHAT_TAB_ID;
        if (t.kind === 'settings') return persisted.activeId === SETTINGS_TAB_ID;
        return (
          persisted.activeId === `${t.type}:${t.path}` ||
          (!persisted.activeId && persisted.tabs[0] === t)
        );
      });
      if (active?.kind === 'chat') return { type: 'chat' };
      if (active?.kind === 'settings') return { type: 'settings' };
      if (active?.kind === 'file') return { type: active.type, path: active.path };
      const first = persisted.tabs[0];
      if (first?.kind === 'chat') return { type: 'chat' };
      if (first?.kind === 'settings') return { type: 'settings' };
      if (first?.kind === 'file') return { type: first.type, path: first.path };
    }
    try {
      const sessionValue = window.sessionStorage.getItem('s3haim_lastFile');
      if (sessionValue) return JSON.parse(sessionValue);
    } catch (_) {}
    try {
      const localValue = window.localStorage.getItem('s3haim_lastFile');
      if (localValue) return JSON.parse(localValue);
    } catch (_) {}
    return null;
  }, []);

  const clearLastOpenedFile = useCallback(() => {
    clearPersistedWorkspaceTabs();
  }, []);

  const queueBackgroundTabSave = useCallback((file: BackgroundTabSaveFile, content: string) => {
    const fileType = file.type;
    const fileId = file.id;
    if (!fileType || !fileId) return;
    if (fileType === SESSION_STORAGE_TYPE) return;
    // Encrypted notes: never auto-save or write plaintext drafts.
    if (isEncMdPath(fileId) || isEncMdPath(file.name)) return;
    const viewer = file.viewer || 'markdown';
    if (!['markdown', 'json', 'raw', 'html', 'svg'].includes(viewer)) return;

    const text = typeof content === 'string' ? content : '';
    const tab = findFileTab(workspaceTabsRef.current, fileType, fileId);
    const baseline =
      tab != null
        ? tab.baselineContent
        : typeof file.content === 'string'
          ? file.content
          : '';
    if (text === baseline) return;

    const tabId = `${fileType}:${fileId}`;
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
          key: getDraftKey(fileType, fileId),
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
  }, []);

  /** VS Code onFocusChange: save when leaving a dirty file tab. */
  const maybeAutoSaveOnFocusChange = useCallback(
    (file: BackgroundTabSaveFile, content: string) => {
      if (!workspaceTabsEnabledRef.current) return;
      if (workspaceTabsAutoSaveModeRef.current !== 'onFocusChange') return;
      queueBackgroundTabSave(file, content);
    },
    [queueBackgroundTabSave],
  );

  /** VS Code onWindowChange: save active dirty file when window/tab loses focus. */
  const maybeAutoSaveOnWindowChange = useCallback(() => {
    if (!workspaceTabsEnabledRef.current) return;
    if (workspaceTabsAutoSaveModeRef.current !== 'onWindowChange') return;
    const flushed = flushEditorIntoActiveFileTab(workspaceTabsRef.current, {
      editorContent: editorContentRef.current ?? '',
      currentFile: currentFileRef.current,
      editedFileName: editedFileNameRef.current ?? '',
    });
    workspaceTabsRef.current = flushed;
    setWorkspaceTabs(flushed);
    const leaving = getActiveFileTab(flushed);
    if (
      leaving &&
      isFileTabDirty(leaving) &&
      leaving.storageType !== SESSION_STORAGE_TYPE
    ) {
      queueBackgroundTabSave(leaving.currentFile, leaving.editorContent);
    }
  }, [queueBackgroundTabSave]);

  const {
    activateWorkspaceTab,
    closeWorkspaceTabById,
    openChatWorkspaceTab,
    openSettingsWorkspaceTab,
    reorderWorkspaceTabs,
    collapseToLegacyWorkspace,
    cycleWorkspaceTab,
  } = workspaceTabsApi;

  useEffect(() => {
    s3TreeRef.current = s3Tree;
  }, [s3Tree]);
  useEffect(() => {
    webdavTreeRef.current = webdavTree;
  }, [webdavTree]);
  useEffect(() => {
    sessionWorkspaceRef.current = sessionWorkspace;
  }, [sessionWorkspace]);
  useEffect(() => {
    currentFileRef.current = currentFile;
  }, [currentFile]);

  useEffect(() => {
    const pathname = location.pathname || '/';
    if (pathname === '/') {
      document.title = 'Docu Haim - Markdown Notes';
      return;
    }
    const onChat = pathname === '/chat' || pathname.endsWith('/chat');
    if (onChat) {
      document.title = `${appName} - 나와의 채팅`;
      return;
    }
    if (currentFile) {
      const fileName = currentFile.name
        || (typeof currentFile.id === 'string' && currentFile.id.split('/').filter(Boolean).pop())
        || 'Untitled';
      document.title = `${appName} - ${fileName}`;
      return;
    }
    document.title = appName;
  }, [appName, currentFile, location.pathname]);

  useEffect(() => {
    saveStorageMode(storageMode);
    setSelectedIds(new Set());
    setCurrentFile(null);
    currentFileRef.current = null;
    setEditorContent('');
    editorContentRef.current = '';
    // Drop workspace tabs from the previous storage backend.
    let next = workspaceTabsRef.current;
    for (const tab of [...next.tabs]) {
      next = closeTab(next, tab.id);
    }
    workspaceTabsRef.current = next;
    setWorkspaceTabs(next);
  }, [storageMode]);

  useEffect(() => {
    setEditedFileName(currentFile?.name ?? '');
  }, [currentFile?.id, currentFile?.name]);

  const hasSuffixChange = useCallback(() => {
    if (!currentFile?.name) return false;
    const trimmed = (editedFileName ?? '').trim();
    return trimmed !== currentFile.name && getExt(trimmed) !== getExt(currentFile.name);
  }, [currentFile?.name, editedFileName]);

  useEffect(() => {
    return subscribeSettingsToggles((id, enabled) => {
      if (id === 'settings-show-trash') setShowTrashFolder(enabled);
      else if (id === 'settings-show-hidden') setShowHiddenFolders(enabled);
      else if (id === 'settings-hide-recording') setHideRecordingCompanions(enabled);
      else if (id === 'settings-tree-sticky') setTreeStickyFolderPathEnabled(enabled);
      else if (id === 'settings-tree-modified-date') setShowTreeModifiedDate(enabled);
      else if (id === 'settings-workspace-tabs') {
        workspaceTabsEnabledRef.current = enabled;
        setWorkspaceTabsEnabled(enabled);
        if (!enabled) {
          collapseToLegacyWorkspace();
        } else if (isChatRoute) {
          openChatWorkspaceTab({ navigateUrl: false });
        } else if (isSettingsRoute) {
          openSettingsWorkspaceTab({ navigateUrl: false });
        }
      }
    });
  }, [collapseToLegacyWorkspace, isChatRoute, isSettingsRoute, openChatWorkspaceTab, openSettingsWorkspaceTab]);

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

  useEffect(() => {
    const onWindowLoseFocus = () => {
      maybeAutoSaveOnWindowChange();
    };
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') onWindowLoseFocus();
    };
    window.addEventListener('blur', onWindowLoseFocus);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('blur', onWindowLoseFocus);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [maybeAutoSaveOnWindowChange]);

  // 1. Init (S3 client etc. are from npm modules; no script loading)
  // Same-tab reload: restore unlock from sessionStorage before showing AuthModal.
  // If a share-target chooser is open, defer AuthModal until that flow finishes.

  useEffect(() => {
    if (isUnlocked) return;

    let cancelled = false;
    (async () => {
      const session = await tryRestoreAuthSession();
      if (cancelled) return;
      if (session) {
        unlock(session.creds as AuthS3Creds, session.password);
        const sessionWebdav = session.webdavConfig as WebdavConfig | null;
        if (sessionWebdav?.endpoint || sessionWebdav?.username) {
          setWebdavConfig(sessionWebdav);
        } else if (session.password) {
          decryptWebdavConfig(session.password)
            .then((decryptedWebdav) => {
              if (decryptedWebdav) setWebdavConfig(decryptedWebdav);
            })
            .catch((err) => console.warn('WebDAV config decrypt on session restore failed:', err));
        }
        return;
      }

      if (isDesktopApp()) {
        try {
          await migrateLegacyDesktopSecretsToStronghold();
          if (cancelled) return;
          if (getDesktopAppEntryLockModeSync() === 'biometric' || (hasDesktopBiometricLockMarker() && hasDesktopStoredCredsMarker())) {
            setAuthWanted(true);
            return;
          }
          if (getDesktopAppEntryLockModeSync() === 'password') {
            const passwordBlob = await loadPasswordEncryptedCredsBlob();
            if (cancelled) return;
            if (passwordBlob) {
              setAuthWanted(true);
              return;
            }
          }
          const desktop = await tryRestoreDesktopStrongholdSession();
          if (cancelled) return;
          if (desktop.creds) {
            unlock(desktop.creds as AuthS3Creds, '');
            if (desktop.webdav) setWebdavConfig(desktop.webdav);
            return;
          }
        } catch (err) {
          console.warn('Desktop Stronghold restore failed:', err);
        }
        if (!cancelled && hasDesktopStoredCredsMarker()) {
          proceedWithoutStoredCreds();
          void loadPlainWebdavIfAllowed();
          navigate('/settings');
          return;
        }
      }

      if (isDesktopApp() && hasDesktopStoredCredsMarker()) {
        setAuthWanted(true);
      } else {
        const stored = localStorage.getItem('s3NotesEncrypted');
        if (stored || hasEncryptedWebdavConfig()) {
          setAuthWanted(true);
        } else {
          proceedWithoutStoredCreds();
          void loadPlainWebdavIfAllowed();
          navigate('/settings');
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isUnlocked, unlock, proceedWithoutStoredCreds, navigate, loadPlainWebdavIfAllowed]);

  useEffect(() => {
    if (isUnlocked || !authWanted) return;
    if (shareBlockingAuth) return;
    setShowAuthModal(true);
  }, [isUnlocked, authWanted, shareBlockingAuth, setShowAuthModal]);

  useEffect(() => {
    Promise.all([isWebAuthnPRFSupported(), browserSupportsWebAuthn()]).then(([prf, basic]) => {
      setWebauthnPRFSupported(prf);
      setWebauthnAvailable(prf || basic);
    });
  }, []);

  const canUnlockWithWebAuthnForModal =
    (isDesktopApp() &&
      getDesktopAppEntryLockModeSync() === 'biometric' &&
      webauthnAvailable) ||
    (webauthnAvailable &&
      !!getStoredWebAuthn() &&
      (isStoredWithWebAuthn() || !!getStoredWebAuthn()?.encryptedPassword));

  const autoPromptWebAuthnForModal = !(
    isDesktopApp() &&
    hasDesktopAppEntryLock() &&
    canUnlockWithWebAuthnForModal &&
    appLockPromptManual
  );

  // 2. Auth Actions


  return {
    lockApp,
    loadPlainWebdavIfAllowed,
    appName,
    workspaceTabsAutoSaveModeRef,
    s3TreeRef,
    webdavTreeRef,
    prevHistoryViewPathRef,
    suppressUnsavedNavGuardRef,
    hasRestoredLastFileRef,
    hasProcessedOpenFromUrlRef,
    hasRestoredFromPrintRef,
    hasPromptedLocalFolderRestoreRef,
    hasSeededTabsRestoreQueueRef,
    restoringWorkspaceTabsRef,
    hasRestoredPersistedWorkspaceTabsRef: workspaceTabsApi.hasRestoredPersistedWorkspaceTabsRef,
    loadLastOpenedFile,
    clearLastOpenedFile,
    queueBackgroundTabSave,
    maybeAutoSaveOnFocusChange,
    maybeAutoSaveOnWindowChange,
    activateWorkspaceTab,
    closeWorkspaceTabById,
    openChatWorkspaceTab,
    openSettingsWorkspaceTab,
    reorderWorkspaceTabs,
    collapseToLegacyWorkspace,
    cycleWorkspaceTab,
    handleEditorTypeChange: fileSessionApi.handleEditorTypeChange,
    saveFile: fileSessionApi.saveFile,
    refreshLocalFileFromDisk: fileSessionApi.refreshLocalFileFromDisk,
    refreshRemoteFile: fileSessionApi.refreshRemoteFile,
    handleRequestCloseEditor: fileSessionApi.handleRequestCloseEditor,
    openAdvancedSearchFile: fileSessionApi.openAdvancedSearchFile,
    selectFileRaw: fileSessionApi.selectFileRaw,
    commitOpenFile: fileSessionApi.commitOpenFile,
    saveCurrentMarkdownBeforeSwitch: fileSessionApi.saveCurrentMarkdownBeforeSwitch,
    applyOpenFileIdentityChange: fileSessionApi.applyOpenFileIdentityChange,
    renameCurrentFileFullName: fileSessionApi.renameCurrentFileFullName,
    hasSuffixChange,
    canUnlockWithWebAuthnForModal,
    autoPromptWebAuthnForModal,
  };
}

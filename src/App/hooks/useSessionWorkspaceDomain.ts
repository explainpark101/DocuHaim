// @ts-nocheck — residual cross-domain handlers pending further domain splits
/**
 * Residual app logic still shared across chrome/bootstrap/session/PWA/chat/routing.
 * Prefer carving into use*Domain modules; compose entry is useAppOrchestration.
 */
import { useState, useEffect, useLayoutEffect, useCallback, useMemo, useRef } from 'react';
import type { AppLogicGlue } from '@/App/hooks/appLogicGlue';
import { markAutoSaveTimestamp } from '@/App/hooks/autoSaveBridge';
import { getParentPathsToExpand, getExt } from '@/App/helpers';
import { useWorkspaceTabsCtx } from '@/App/hooks/useWorkspaceTabsCtx';
import { useBootstrapOwned } from '@/App/providers/AppBootstrapStateProvider';
import { useVault } from '@/App/hooks/useVault';
import { useFileSessionOwned } from '@/App/providers/AppFileSessionStateProvider';
import { useFileSession } from '@/App/hooks/useFileSession';
import { useTreeOpsOwned } from '@/App/providers/AppTreeOpsStateProvider';
import { useTreeOps } from '@/App/hooks/useTreeOps';
import { useRecordingOwned } from '@/App/providers/RecordingProvider';
import { useNavigate, useLocation } from 'react-router';
import { encryptData, decryptData, encryptWithEntropy, decryptWithEntropy, deriveEntropyFromPassword } from '@/utils/crypto';
import {
  isWebAuthnPRFSupported,
  browserSupportsWebAuthn,
  getStoredWebAuthn,
  isStoredWithWebAuthn,
  unlockWithWebAuthn,
  loadCredsWithWebAuthn,
  saveCredsWithWebAuthn,
  enableWebAuthnUnlock,
  disableWebAuthnUnlock,
  updateWebAuthnWrappedPassword,
} from '@/utils/webauthn';
import { buildS3Tree, getFileLastModifiedMap, findFileNodeByPath, findNodeByPath, flattenTreeToPaths, getRecordingKeysFromTree } from '@/utils/s3Tree';
import { allocateUniqueFileSystemName, getTreeChildNames, treeChildNameTaken } from '@/utils/treeCopy';
import { resolveUploadDestFileName } from '@/utils/uploadNameConflict';
import { normalizePathToNfc, normalizeUnicodeNfc } from '@/utils/unicodeNfc';
import { resolveTreeDestName } from '@/utils/treeNameConflict';
import {
  createS3Client,
  listObjectsV2,
  collectS3DirectoryMarkersFromUpload,
  putS3FolderMarkers,
  getObjectBody,
  headObject,
  putObject,
  deleteObject,
  deleteObjects,
  copyObject,
  getSignedGetUrl,
  streamS3ObjectToWritable,
} from '@/utils/s3Client';
import ShareTargetGate, {
  useChatStorageCtx,
} from '@/components/chatWithMyself/ShareTargetGate';
import { useHistoryOverlayBack } from '@/hooks/useHistoryOverlayBack';
import { useAlertModal } from '@/contexts/AlertModalContext';
import { useToast } from '@/contexts/ToastContext';
import {
  CHAT_TAB_ID,
  SETTINGS_TAB_ID,
  anyFileTabDirty,
  clearPersistedWorkspaceTabs,
  getActiveFileTab,
  getActiveTab,
  isChatTab,
  isFileTab,
  isFileTabDirty,
  isSettingsTab,
  loadLastOpenTabsSnapshot,
  loadPersistedWorkspaceTabs,
  pickWorkspaceTabsRestoreSource,
  popClosedTab,
  popTabsRestoreQueue,
  pushClosedTab,
  saveLastOpenTabsSnapshot,
  savePersistedWorkspaceTabs,
  seedTabsRestoreQueueFromSnapshot,
  toPersistedWorkspaceTabs,
} from '@/utils/workspaceTabs';
import {
  applyOpenedFileReducer,
  closeTab,
  findFileTab,
  flushEditorIntoActiveFileTab,
  patchFileTab,
  retargetFileTab,
  retargetFileTabsByPathPrefix,
  softCapPrompt,
} from '@/utils/workspaceTabs/appBridge';
import { retainOnlyFileTab } from '@/utils/workspaceTabs/legacyMode';
import { resolveOpenTextContent } from '@/utils/workspaceTabs/resolveOpenText';
import {
  loadWorkspaceTabsAutoSaveMode,
  WORKSPACE_TABS_AUTO_SAVE_CHANGED_EVENT,
} from '@/utils/workspaceTabsSettings';
import {
  detectTimeZone,
  formatChatMessageAsNoteMarkdown,
  formatNoteShareChatBody,
  createChatBackend,
  patchChatMessageMeta,
  appendChatMessage,
  enqueuePendingShare,
  unlinkChatNotesForDeletedPaths,
  deletedNoteScopeFromNode,
  SELF_GROUP,
  postChatSyncEvent,
  postChatLocalSyncEvent,
  localDateString,
  resolveReplyThreadMessages,
  readMeta,
  sortGroupsKo,
} from '@/utils/chatWithMyself';
import { AuthModal } from '@/components/modals/AuthModal';
import { SetPasswordModal } from '@/components/modals/SetPasswordModal';
import { SaveMethodModal } from '@/components/modals/SaveMethodModal';
import { ExportPasswordModal } from '@/components/modals/ExportPasswordModal';
import { ImportPasswordModal } from '@/components/modals/ImportPasswordModal';
import { DeleteConfirmModal, normalizeDeleteTargets } from '@/components/modals/DeleteConfirmModal';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import EmptyTrashConfirmModal from '@/components/modals/EmptyTrashConfirmModal';
import {
  noteCoverCommentChanged,
  revertNoteCoverComment,
} from '@/utils/noteCover';
import { executeEmptyTrash } from '@/utils/emptyTrashExecute';
import Modal from '@/components/modals/Modal';
import { useVisualViewportLock } from '@/hooks/useVisualViewportLock';
import { MoveFileModal } from '@/components/modals/MoveFileModal';
import { MoveFolderModal } from '@/components/modals/MoveFolderModal';
import { CreateItemModal } from '@/components/modals/CreateItemModal';
import PromptModal from '@/components/modals/PromptModal';
import { DownloadMethodModal } from '@/components/modals/DownloadMethodModal';
import {
  clearEncMdPassword,
  decryptEncMdContent,
  encryptEncMdContent,
  getEncMdPassword,
  isEncMdPath,
  prepareEncMdVaultBody,
  setEncMdPassword,
  tryUnlockEncMdContent,
} from '@/utils/encMd';

import { getSyncKeyForRecording, runEncodeAndWritePipeline } from '@/utils/recordingPipeline';
import {
  deleteRecordingById,
  deleteRecordingFragments,
  getRecordingQueueStats,
} from '@/utils/recordingDb';
import { decodeSyncData } from '@/utils/syncProto';
import { savePendingUpload, getPendingUploads } from '@/utils/pendingUploadsDb';
import { syncPendingUploads } from '@/utils/syncPendingUploads';
import { isFileProbablyImage, uploadEditorImage, buildEditorImagePathPrefix, normalizeEditorImagePathPrefix, sniffImageMimeFromFile, getExtensionFromMime } from '@/utils/editorImageUpload';
import { uploadLocalEditorImage, getLocalWikiImageObjectUrl } from '@/utils/localEditorImage';
import { dbgClipboard, fileSummaries } from '@/utils/clipboardImageDebug';
import { drainRecordingUploadQueue } from '@/utils/recordingUploadQueue';
import { setPrintSettingsStore } from '@/utils/printSettingsStore';
import {
  loadWebfontsFromStorage,
  notifyWebfontsChanged,
  setWebfontSettingsStore,
} from '@/utils/webfontSettingsStore';
import {
  loadTableStylesFromStorage,
  setTableStyleSettingsStore,
  getCachedTableStyleTemplate,
} from '@/utils/tableStyleSettingsStore';
import {
  loadCoverSettingsFromStorage,
  notifyCoverSettingsChanged,
  setCoverSettingsStore,
} from '@/utils/coverSettingsStore';
import {
  loadOgWorkerSettingsFromStorage,
  notifyOgWorkerSettingsChanged,
  setOgWorkerSettingsStore,
} from '@/utils/ogWorkerSettings';
import UserWebfontStyles from '@/components/UserWebfontStyles';
import {
  setLlmPromptTemplatesStore,
  syncLlmPromptTemplatesToRemote,
} from '@/utils/llmPromptTemplatesDb';
import { loadEditorType, saveEditorType } from '@/utils/editorTypeSettings';
import {
  DEFAULT_STORAGE_MODE,
  DEFAULT_WEBDAV_CONFIG,
  getAppNameByStorageMode,
  loadStorageMode,
  loadWebdavConfig,
  saveStorageMode,
  saveWebdavConfig,
  decryptWebdavConfig,
  clearPlaintextWebdavConfig,
  hasEncryptedWebdavConfig,
  requiresEncryptedWebdavStorage,
  STORAGE_MODE_LOCAL,
  STORAGE_MODE_S3,
  STORAGE_MODE_WEBDAV,
} from '@/utils/storageSettings';
import {
  createStorageBackendForType,
  createWebdavBackend,
  createLocalBackend,
  createStorageBackend,
} from '@/utils/storage';
import { openPathFileFromBackend } from '@/utils/storage/openPathFileFromBackend.js';
import { collectCompanionImageKeysForDelete } from '@/utils/unusedImageCleanup';
import { loadOrphanImageAutoDeleteEnabled } from '@/utils/orphanImageCleanupSettings';
import { patchWebdavTreeChildren } from '@/utils/webdavTree.js';
import AdvancedSearchHost from '@/components/advancedSearch/AdvancedSearchHost';
import {
  advancedSearchEngine,
  notifyAdvancedSearchChange,
} from '@/utils/advancedSearch';
import { webdavPropfindDeep, webdavHead } from '@/utils/webdavClient';
import {
  readLocalDirectoryLevel,
  readLocalDirectoryTree,
  patchLocalTreeChildren,
  hydrateExpandedLocalFolders,
} from '@/utils/localTree';
import { loadExpandedFolderPaths } from '@/utils/expandedFoldersStore';
import {
  ensureDirectoryReadWritePermission,
  hasStoredLocalRootHandle,
  loadLastLocalFolderName,
  pickLocalRootDirectory,
  saveLocalRootHandle,
  tryRestoreLocalRootHandle,
} from '@/utils/localFolderStore';
import { isDesktopApp } from '@/utils/isDesktopApp';
import { isTauriAndroid, isTauriDesktopPlatform } from '@/utils/tauriPlatform';
import {
  loadLocalVaultFsPath,
  saveLocalVaultFsPath,
  clearLocalVaultFsPath,
} from '@/utils/localVaultPathStore';
import {
  basenameFromVaultPath,
  isLocalVaultReady,
} from '@/utils/localVaultReady';
import {
  pickTauriLocalVaultDirectory,
  readTauriLocalDirectoryTree,
} from '@/utils/storage/tauriLocalBackend';
import { ensureAndroidDefaultLocalVaultRoot } from '@/utils/storage/androidLocalVault';
import {
  resolveDesktopOpenPaths,
  subscribeDesktopOpenFiles,
  takeDesktopOpenPathQueue,
} from '@/utils/desktopOpenFiles';
import { loadHideRecordingCompanions } from '@/utils/recordingVisibilitySettings';
import { loadTreeStickyFolderPathEnabled } from '@/utils/treeStickySettings';
import { loadTreeShowModifiedDateEnabled } from '@/utils/treeModifiedDateSettings';
import {
  loadShowHiddenFolders,
  loadShowTrashFolder,
} from '@/utils/treeVisibilitySettings';
import {
  setSettingsToggle,
  subscribeSettingsToggles,
} from '@/utils/advancedSearch/settingsToggles';
import {
  loadTreeHoverExpandSettings,
  saveTreeHoverExpandSettings,
  treeHoverExpandSettingsToMs,
} from '@/utils/treeHoverExpandSettings';
import { consumePendingPrintReturnState } from '@/utils/printNavigationState';
import {
  getDraftKey,
  saveMemoDraft,
  getMemoDraft,
  deleteMemoDraft,
} from '@/utils/memoDraftsDb';
import { rebaseMergeTexts, buildTimestampedCopyName } from '@/utils/textRebaseMerge';
import { resolveLocalFileNode } from '@/utils/localFileNode';
import { resolveStorageImagePath } from '@/utils/storageImagePath';
import { parseViewPathFromAppPathname, parseExportPdfPathFromAppPathname, parseOpenNotePathFromAppPathname, isChatAppPathname, isSettingsAppPathname, isExportPdfAppPathname, exportPdfPathnameForStoragePath } from '@/utils/appHref';
import { useUnsavedNavigationGuard } from '@/hooks/useUnsavedNavigationGuard';
import { usePwaNewFileShortcut } from '@/hooks/usePwaNewFileShortcut';
import { useNewTempFileShortcut } from '@/hooks/useNewTempFileShortcut';
import { buildZipBlob } from '@/utils/zipBuilder';
import {
  SESSION_STORAGE_TYPE,
  addEmptyUntitledSessionFile,
  buildSessionDownload,
  buildSessionTree,
  createEmptyUntitledSessionWorkspace,
  decodeSessionText,
  mimeForSessionFileName,
  pickDefaultSessionOpenPath,
  putSessionFileBytes,
  renameSessionFile,
  sessionViewerForName,
  updateSessionFileText,
  workspaceFromDataTransfer,
  workspaceFromDirectoryHandle,
  workspaceFromFileList,
} from '@/utils/sessionWorkspace';
import {
  buildMarkdownImageZipEntries,
  collectMarkdownExportImageBytes,
  embedMarkdownImagesAsDataUris,
  formatMissingExportImagesMessage,
  isMarkdownFileName,
  markdownExportBundleDirectoryName,
  planMarkdownImageExport,
  writeMarkdownImageBundleToDirectory,
  zipFileNameForMarkdown,
} from '@/utils/markdownImageExport';
import {
  bundleSessionMarkdownImages,
  prepareSessionMarkdownForVault,
} from '@/utils/sessionNoteImport';
import { remapMarkdownHeadingLevels } from '@/utils/markdownHeadings';
import { copyText } from '@/utils/copyText';
import { useActivityIndicator, ActivityTypes } from '@/contexts/ActivityIndicatorContext';
import { useAuth } from '@/contexts/AuthContext';
import ActivityIndicatorBar from '@/components/ActivityIndicatorBar';
import { clearAllLlmApiKeySessions } from '@/utils/llmApiKeySession';
import { resolveLlmProviderProfiles } from '@/utils/llmProviderProfiles';
import { clearAuthSession, saveAuthSession, tryRestoreAuthSession } from '@/utils/authSession';
import {
  hasDesktopBiometricLockMarker,
  hasDesktopStoredCredsMarker,
  getDesktopAppEntryLockModeSync,
  loadDesktopWebdavConfig,
  loadPasswordEncryptedCredsBlob,
  migrateLegacyDesktopSecretsToStronghold,
  saveDesktopCreds,
  saveDesktopWebdavConfig,
  savePasswordEncryptedCredsBlob,
  tryRestoreDesktopStrongholdSession,
} from '@/utils/desktopStrongholdSecrets';
import { decryptDesktopPasswordWebdav, hasDesktopAppEntryLock, refreshDesktopPasswordEntryLockSecrets } from '@/utils/desktopAppEntryLock';
import { unlockDesktopWithBiometricGate } from '@/utils/desktopBiometricUnlock';
import { registerAppLockAction } from '@/utils/advancedSearch/appLockActions';
import {
  applyForcedAppUpdate,
  checkAppBuildUpdate,
  checkServiceWorkerUpdate,
  getLocalAppBuildId,
} from '@/utils/pwaUpdate';
import { usePwaSnippetsOwned } from '@/App/providers/AppPwaSnippetsStateProvider';


/**
 * Session open/close/drop/download helpers.
 */
export function useSessionWorkspaceDomain(bag: Record<string, any>, glueRef?: { current: AppLogicGlue }) {
  const {
    addIndicator,
    removeIndicator,
    updateIndicator,
    showAlert,
    showToast,
    auth,
    scriptsLoaded,
    shareBlockingAuth,
    setShareBlockingAuth,
    storageMode,
    setStorageMode,
    s3Tree,
    localTree,
    webdavTree,
    sessionWorkspace,
    setSessionWorkspace,
    localRootHandle,
    setLocalRootHandle,
    localVaultFsPath,
    setLocalVaultFsPath,
    webdavConfig,
    setWebdavConfig,
    getBackendForType,
    getS3Client,
    loadS3Files,
    refreshLocalTree,
    refreshWebdavTree,
    webdavReady,
    currentFile,
    setCurrentFile,
    editorContent,
    setEditorContent,
    editorContentRef,
    prevEditorContentRef,
    currentFileRef,
    editedFileName,
    setEditedFileName,
    isSaving,
    setIsSaving,
    savingTabIds,
    setSavingTabIds,
    editorType,
    setEditorType,
    encMdPrompt,
    setEncMdPrompt,
    fileSessionApi,
    treeOpsApi,
    workspaceTabsApi,
    isRecording,
    audioLevel,
    startRecording,
    stopRecording,
    captureSync,
    setRecordingPipelineStatus,
    setRecordingQueueStats,
    setRecordingsList,
    selectedRecordingKey,
    setSelectedRecordingKey,
    recordingAudioUrl,
    setRecordingAudioUrl,
    recordingSyncData,
    setRecordingSyncData,
    isUnlocked,
    showAuthModal,
    setShowAuthModal,
    showSetPasswordModal,
    setShowSetPasswordModal,
    masterPassword,
    setMasterPassword,
    s3Creds,
    setS3Creds,
    unlock,
    proceedWithoutStoredCreds,
    lock,
    navigate,
    location,
    sessionWorkspaceRef,
    sessionObjectUrlsRef,
    sessionVaultBindingsRef,
    writeSessionFileToHaimRef,
    isOpeningSession,
    setIsOpeningSession,
    showRestoreLocalFolderModal,
    setShowRestoreLocalFolderModal,
    pendingLocalFolderName,
    setPendingLocalFolderName,
    workspaceTabs,
    setWorkspaceTabs,
    workspaceTabsRef,
    workspaceTabsEnabled,
    setWorkspaceTabsEnabled,
    workspaceTabsEnabledRef,
    workspaceTabsAutoSaveModeRef,
    editedFileNameRef,
    savingTabIdsRef,
    fileInputRef,
    uploadFileInputRef,
    uploadFolderInputRef,
    operationStatus,
    setOperationStatus,
    webauthnPRFSupported,
    setWebauthnPRFSupported,
    webauthnAvailable,
    setWebauthnAvailable,
    addToNoteSelectPath,
    setAddToNoteSelectPath,
    showExportPasswordModal,
    setShowExportPasswordModal,
    showImportPasswordModal,
    setShowImportPasswordModal,
    importFileContent,
    setImportFileContent,
    showSaveMethodModal,
    setShowSaveMethodModal,
    saveMethodModalCreds,
    setSaveMethodModalCreds,
    showUnsavedConfirmModal,
    setShowUnsavedConfirmModal,
    showSuffixChangeConfirmModal,
    setShowSuffixChangeConfirmModal,
    suffixConfirmAction,
    setSuffixConfirmAction,
    showCloseFileConfirmModal,
    setShowCloseFileConfirmModal,
    pendingCloseTabId,
    setPendingCloseTabId,
    showOverwriteCredsConfirmModal,
    setShowOverwriteCredsConfirmModal,
    showCoverChangeConfirmModal,
    setShowCoverChangeConfirmModal,
    pendingCoverSaveRef,
    pendingWebAuthnSave,
    setPendingWebAuthnSave,
    pendingPasswordSave,
    setPendingPasswordSave,
    expandPathsRef,
    showDownloadMethodModal,
    setShowDownloadMethodModal,
    downloadModalMode,
    setDownloadModalMode,
    showSaveSessionToNoteModal,
    setShowSaveSessionToNoteModal,
    saveSessionToNoteSelectPath,
    setSaveSessionToNoteSelectPath,
    isSavingSessionToNote,
    setIsSavingSessionToNote,
    downloadProgress,
    setDownloadProgress,
    downloadComplete,
    setDownloadComplete,
    downloadResultModal,
    setDownloadResultModal,
    closeDownloadResultModal,
    openUnsupportedFolderDownloadModal,
    triggerBlobDownload,
    isMobile,
    setIsMobile,
    isChatRoute,
    isSettingsRoute,
    activeWorkspaceTab,
    chatTabActive,
    chatSurfaceActive,
    lockChatViewport,
    sidebarOpen,
    setSidebarOpen,
    sidebarCollapsed,
    setSidebarCollapsed,
    hideRecordingCompanions,
    setHideRecordingCompanions,
    treeStickyFolderPathEnabled,
    setTreeStickyFolderPathEnabled,
    showTreeModifiedDate,
    setShowTreeModifiedDate,
    treeHoverExpandSettings,
    setTreeHoverExpandSettings,
    showHiddenFolders,
    setShowHiddenFolders,
    showTrashFolder,
    setShowTrashFolder,
    appName,
    s3TreeRef,
    webdavTreeRef,
    prevHistoryViewPathRef,
    suppressUnsavedNavGuardRef,
    hasRestoredLastFileRef,
    hasProcessedOpenFromUrlRef,
    hasRestoredFromPrintRef,
    hasPromptedLocalFolderRestoreRef,
    localFolderRestoreSettled,
    setLocalFolderRestoreSettled,
    saveFileRef,
    selectFileRawRef,
    fileTabContextMenuRef,
    hasSeededTabsRestoreQueueRef,
    hasRestoredPersistedWorkspaceTabsRef,
    restoringWorkspaceTabsRef,
    loadLastOpenedFile,
    clearLastOpenedFile,
    queueBackgroundTabSave,
    maybeAutoSaveOnFocusChange,
    maybeAutoSaveOnWindowChange,
    collapseToLegacyWorkspace,
    openChatWorkspaceTab,
    openSettingsWorkspaceTab,
    activateWorkspaceTab,
    closeWorkspaceTabById,
    saveFile,
    selectFileRaw,
    commitOpenFile,
    renameCurrentFileFullName,
    handleRequestCloseEditor,
    applyOpenFileIdentityChange,
    saveCurrentMarkdownBeforeSwitch,
    requestNewFile,
    requestAdvancedSearchCreateItem,
    newFileDefaultParentPath,
    handleTreeNodeSelect,
    toSelectKey,
    lastSelectedIdRef,
    setSelectedIds,
    canScanStorageUsage,
    scanActiveStorageUsageTree,
    llmProviderProfiles,
    getImgbbApiKey,
    lockApp,
    loadPlainWebdavIfAllowed,
    clearOpenFileState,
    hasUnsavedEditorChanges,
    revokeOpenFileObjectUrl,
  } = bag;

  const revokeSessionObjectUrls = useCallback(() => {
    for (const url of sessionObjectUrlsRef.current.values()) {
      URL.revokeObjectURL(url);
    }
    sessionObjectUrlsRef.current.clear();
  }, []);

  const getSessionObjectUrl = useCallback((path, bytes, mime) => {
    const existing = sessionObjectUrlsRef.current.get(path);
    if (existing) return existing;
    const url = URL.createObjectURL(new Blob([bytes], { type: mime || 'application/octet-stream' }));
    sessionObjectUrlsRef.current.set(path, url);
    return url;
  }, []);

  const flushSessionEditorToWorkspace = useCallback(() => {
    const cur = currentFileRef.current;
    const ws = sessionWorkspaceRef.current;
    if (!cur || cur.type !== SESSION_STORAGE_TYPE || !cur.id || !ws) return ws;
    const editable = ['markdown', 'json', 'raw', 'html', 'svg'].includes(cur.viewer || 'markdown');
    if (!editable) return ws;
    const next = updateSessionFileText(ws, cur.id, editorContentRef.current ?? '');
    sessionWorkspaceRef.current = next;
    setSessionWorkspace(next);
    return next;
  }, []);

  const closeSessionWorkspace = useCallback(() => {
    if (
      currentFileRef.current?.type === SESSION_STORAGE_TYPE &&
      hasUnsavedEditorChanges() &&
      !window.confirm('저장하지 않은 변경이 있습니다. 세션을 닫으면 사라집니다. 닫을까요?')
    ) {
      return;
    }
    revokeSessionObjectUrls();
    sessionVaultBindingsRef.current = Object.create(null);
    sessionWorkspaceRef.current = null;
    setSessionWorkspace(null);
    if (currentFileRef.current?.type === SESSION_STORAGE_TYPE) {
      clearOpenFileState();
      navigate('/');
    }
  }, [clearOpenFileState, hasUnsavedEditorChanges, navigate, revokeSessionObjectUrls]);

  const applySessionFileToEditor = useCallback(
    (path, workspace, options = {}) => {
      const record = workspace?.files?.[path];
      if (!record) return false;
      const skipNavigate = options.skipNavigate === true;
      const viewer = sessionViewerForName(record.name);
      const size = record.bytes.byteLength;
      const mime = mimeForSessionFileName(record.name);

      if (viewer === 'image' || viewer === 'pdf' || viewer === 'audio' || viewer === 'video') {
        const url = getSessionObjectUrl(path, record.bytes, mime);
        const file = {
          type: SESSION_STORAGE_TYPE,
          id: path,
          name: record.name,
          viewer,
          objectUrl: url,
          size,
        };
        commitOpenFile(file, '');
        if (!skipNavigate) navigate(`/view/${path}`);
        return true;
      }

      if (viewer === 'unsupported') {
        const file = {
          type: SESSION_STORAGE_TYPE,
          id: path,
          name: record.name,
          viewer: 'unsupported',
          size,
        };
        commitOpenFile(file, '');
        if (!skipNavigate) navigate(`/view/${path}`);
        return true;
      }

      const text = decodeSessionText(record.bytes);
      const file = {
        type: SESSION_STORAGE_TYPE,
        id: path,
        name: record.name,
        content: text,
        viewer,
        size,
      };
      commitOpenFile(file, text);
      if (!skipNavigate) navigate(`/view/${path}`);
      return true;
    },
    [getSessionObjectUrl, navigate, commitOpenFile],
  );

  const openSessionWorkspace = useCallback(
    async (workspace) => {
      if (
        sessionWorkspaceRef.current &&
        !window.confirm('이미 열린 다운로드 세션이 있습니다. 새 파일로 바꾸면 현재 세션은 사라집니다. 계속할까요?')
      ) {
        return false;
      }
      revokeSessionObjectUrls();
      sessionVaultBindingsRef.current = Object.create(null);
      sessionWorkspaceRef.current = workspace;
      setSessionWorkspace(workspace);
      const path = pickDefaultSessionOpenPath(workspace);
      if (!path) {
        alert('열 수 있는 파일이 없습니다.');
        return false;
      }
      applySessionFileToEditor(path, workspace);
      if (isMobile) setSidebarOpen(false);
      return true;
    },
    [applySessionFileToEditor, isMobile, revokeSessionObjectUrls],
  );

  const handleOpenSessionFiles = useCallback(
    async (fileList, origin) => {
      setIsOpeningSession(true);
      try {
        const workspace = await workspaceFromFileList(fileList, origin);
        return await openSessionWorkspace(workspace);
      } catch (error) {
        console.error('Session open failed:', error);
        alert(error?.message || '파일을 열지 못했습니다.');
        return false;
      } finally {
        setIsOpeningSession(false);
      }
    },
    [openSessionWorkspace],
  );

  const handleOpenSessionDirectory = useCallback(async () => {
    if (!('showDirectoryPicker' in window)) {
      alert('이 브라우저는 폴더 선택을 지원하지 않습니다. ZIP 또는 MD 파일을 열어 주세요.');
      return;
    }
    setIsOpeningSession(true);
    try {
      const dirHandle = await window.showDirectoryPicker();
      const workspace = await workspaceFromDirectoryHandle(dirHandle);
      await openSessionWorkspace(workspace);
    } catch (error) {
      if (error?.name === 'AbortError') return;
      console.error('Session folder open failed:', error);
      alert(error?.message || '폴더를 열지 못했습니다.');
    } finally {
      setIsOpeningSession(false);
    }
  }, [openSessionWorkspace]);

  const handleDropSessionTransfer = useCallback(
    async (dataTransfer) => {
      setIsOpeningSession(true);
      try {
        const workspace = await workspaceFromDataTransfer(dataTransfer);
        await openSessionWorkspace(workspace);
      } catch (error) {
        console.error('Session drop failed:', error);
        alert(error?.message || '드롭한 항목을 열지 못했습니다.');
      } finally {
        setIsOpeningSession(false);
      }
    },
    [openSessionWorkspace],
  );

  const downloadSessionWorkspace = useCallback(async () => {
    const flushed = flushSessionEditorToWorkspace() ?? sessionWorkspaceRef.current;
    if (!flushed) return;
    const { blob, fileName } = await buildSessionDownload(flushed);
    triggerBlobDownload(blob, fileName);
    markAutoSaveTimestamp();
    const cur = currentFileRef.current;
    if (cur?.type === SESSION_STORAGE_TYPE && cur.id) {
      const record = flushed.files[cur.id];
      const text = editorContentRef.current ?? '';
      setCurrentFile((prev) => {
        if (!prev || prev.type !== SESSION_STORAGE_TYPE || prev.id !== cur.id) return prev;
        const next = {
          ...prev,
          content: ['markdown', 'json', 'raw', 'html', 'svg'].includes(prev.viewer || '') ? text : prev.content,
          size: record?.bytes.byteLength ?? prev.size,
        };
        currentFileRef.current = next;
        return next;
      });
    }
    setOperationStatus(`다운로드: ${fileName}`);
  }, [flushSessionEditorToWorkspace, triggerBlobDownload]);

  const closeCurrentFile = () => {
    const active = getActiveTab(workspaceTabsRef.current);
    if (active) {
      closeWorkspaceTabById(active.id, { skipDirtyConfirm: true });
      return;
    }
    setCurrentFile((prev) => {
      revokeOpenFileObjectUrl(prev);
      return null;
    });
    currentFileRef.current = null;
    setEditorContent('');
    editorContentRef.current = '';
    navigate('/');
  };

  /** Logo / brand: go to `/` home (keep tabs open; clear active selection). */

  const api = {
    flushSessionEditorToWorkspace,
    closeSessionWorkspace,
    applySessionFileToEditor,
    openSessionWorkspace,
    handleOpenSessionFiles,
    handleOpenSessionDirectory,
    handleDropSessionTransfer,
    downloadSessionWorkspace,
    closeCurrentFile,
    getSessionObjectUrl,
    revokeSessionObjectUrls,
  };
  Object.assign(bag, api);
  if (glueRef) {
    Object.assign(glueRef.current, api);
  }
  return api;
}

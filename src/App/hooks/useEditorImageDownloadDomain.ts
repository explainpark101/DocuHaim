// @ts-nocheck — residual cross-domain handlers pending further domain splits
/**
 * Residual app logic still shared across chrome/bootstrap/session/PWA/chat/routing.
 * Prefer carving into use*Domain modules; compose entry is useAppOrchestration.
 */
import { useState, useEffect, useLayoutEffect, useCallback, useMemo, useRef } from 'react';
import type { AppLogicGlue } from '@/App/hooks/appLogicGlue';
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
 * Editor image upload + download/session-to-haim.
 */
export function useEditorImageDownloadDomain(bag: Record<string, any>, glueRef?: { current: AppLogicGlue }) {
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
    flushSessionEditorToWorkspace,
    getSessionObjectUrl,
    setIsLocalTreeLoading,
    setLocalTree,
  } = bag;

  const editorImageUploadInProgressRef = useRef(false);
  const editorImageUploadAbortControllerRef = useRef(null);
  const editorImageUploadCancelRequestedRef = useRef(false);
  const [isUploadingEditorImage, setIsUploadingEditorImage] = useState(false);
  const [editorImageUploadPercent, setEditorImageUploadPercent] = useState(0);

  const cancelEditorImageUpload = useCallback(() => {
    if (!editorImageUploadInProgressRef.current) return false;
    editorImageUploadCancelRequestedRef.current = true;
    if (editorImageUploadAbortControllerRef.current) {
      editorImageUploadAbortControllerRef.current.abort();
    }
    return true;
  }, []);

  const confirmAndCancelEditorImageUpload = useCallback(() => {
    if (!editorImageUploadInProgressRef.current) return true;
    const confirmed = window.confirm('이미지 업로드를 취소하시겠습니까?');
    if (!confirmed) return false;
    cancelEditorImageUpload();
    return true;
  }, [cancelEditorImageUpload]);

  /** 에디터 이미지 업로드 — 현재 md 파일과 동일한 경로(하위 .images/)에 저장, 반환값은 ![[path]]용 Object Key 배열. 업로드 중에는 중복 호출 무시 */
  const handleUploadEditorImage = useCallback(
    async (files) => {
      dbgClipboard('app:upload:start', {
        rawCount: files?.length ?? 0,
        files: fileSummaries(files),
        currentFileId: currentFile?.id ?? null,
        currentFileType: currentFile?.type ?? null,
      });
      const isLocalUpload =
        currentFile?.type === 'local' &&
        isLocalVaultReady(localRootHandle, localVaultFsPath);
      const isWebdavUpload = currentFile?.type === 'webdav' && webdavReady;
      const isSessionUpload = currentFile?.type === SESSION_STORAGE_TYPE;
      const client = getS3Client();
      if (!isLocalUpload && !isWebdavUpload && !isSessionUpload && (!client || !s3Creds.bucket)) {
        dbgClipboard('app:upload:abort', { reason: 'no storage backend ready' });
        setOperationStatus(
          currentFile?.type === 'webdav'
            ? '이미지 업로드는 WebDAV 연결 후 사용할 수 있습니다.'
            : currentFile?.type === 'local'
              ? '이미지 업로드는 로컬 폴더를 연 뒤 사용할 수 있습니다.'
              : currentFile?.type === SESSION_STORAGE_TYPE
                ? '이미지 업로드는 열린 세션에서만 사용할 수 있습니다.'
                : '이미지 업로드는 S3 연결 후 사용할 수 있습니다.',
        );
        return [];
      }
      if (isLocalUpload && !isLocalVaultReady(localRootHandle, localVaultFsPath)) {
        dbgClipboard('app:upload:abort', { reason: 'no local vault ready' });
        setOperationStatus('이미지 업로드는 로컬 폴더를 연 뒤 사용할 수 있습니다.');
        return [];
      }
      const candidates = Array.from(files).filter((f) => f && f.size > 0);
      const imageFiles = [];
      for (const f of candidates) {
        if (f.type?.startsWith('image/')) {
          imageFiles.push(f);
          continue;
        }
        if (!f.type || f.type === 'application/octet-stream') {
          if (await isFileProbablyImage(f)) imageFiles.push(f);
        }
      }
      dbgClipboard('app:upload:afterFilter', {
        candidates: fileSummaries(candidates),
        imageFiles: fileSummaries(imageFiles),
      });
      if (!imageFiles.length) {
        dbgClipboard('app:upload:empty', { reason: 'no image files after filter' });
        return [];
      }
      if (editorImageUploadInProgressRef.current) {
        dbgClipboard('app:upload:skipped', { reason: 'editorImageUploadInProgressRef' });
        return [];
      }
      editorImageUploadInProgressRef.current = true;
      editorImageUploadCancelRequestedRef.current = false;
      setIsUploadingEditorImage(true);
      setEditorImageUploadPercent(0);
      const indicatorId = addIndicator({
        id: 'editor-image-upload',
        type: ActivityTypes.FILE_UPLOAD,
        label: '이미지 업로드 중',
      });
      const imagePathPrefix =
        (currentFile?.type === 's3' ||
          currentFile?.type === 'local' ||
          currentFile?.type === 'webdav' ||
          currentFile?.type === SESSION_STORAGE_TYPE) &&
        currentFile?.id
          ? buildEditorImagePathPrefix(currentFile.id)
          : '.images/note';
      const paths = [];
      const totalBytes = imageFiles.reduce((acc, file) => acc + (file.size || 0), 0);
      let uploadedBytes = 0;
      const reportProgress = (file, percent) => {
        const currentUploaded = (file.size || 0) * (Math.max(0, Math.min(100, percent)) / 100);
        const overallPercent =
          totalBytes > 0 ? ((uploadedBytes + currentUploaded) / totalBytes) * 100 : percent;
        const normalized = Math.max(0, Math.min(100, Math.round(overallPercent)));
        setEditorImageUploadPercent(normalized);
        updateIndicator(indicatorId, {
          progress: normalized,
          detail: `${normalized}%`,
        });
      };
      try {
        for (const file of imageFiles) {
          if (editorImageUploadCancelRequestedRef.current) break;
          const uploadController = new AbortController();
          editorImageUploadAbortControllerRef.current = uploadController;
          let path;
          if (isLocalUpload) {
            if (localVaultFsPath && !localRootHandle) {
              const backend = getBackendForType('local');
              const prefix = normalizeEditorImagePathPrefix(imagePathPrefix);
              const uuid =
                typeof crypto !== 'undefined' && crypto.randomUUID
                  ? crypto.randomUUID()
                  : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
              let mime = file.type;
              if (!mime || mime === 'application/octet-stream') {
                mime = (await sniffImageMimeFromFile(file)) || mime;
              }
              const ext = getExtensionFromMime(mime);
              path = `${prefix}${uuid}${ext}`.replace(/\/+/g, '/').replace(/^\//, '');
              reportProgress(file, 0);
              const body = new Uint8Array(await file.arrayBuffer());
              if (uploadController.signal.aborted) {
                throw new DOMException('Aborted', 'AbortError');
              }
              await backend.writeBytes(path, body, mime || 'application/octet-stream');
              reportProgress(file, 100);
            } else {
              path = await uploadLocalEditorImage(localRootHandle, file, {
                imagePathPrefix,
                signal: uploadController.signal,
                onProgress: (percent) => reportProgress(file, percent),
              });
            }
          } else if (isWebdavUpload) {
            const backend = getBackendForType('webdav');
            const prefix = normalizeEditorImagePathPrefix(imagePathPrefix);
            const uuid =
              typeof crypto !== 'undefined' && crypto.randomUUID
                ? crypto.randomUUID()
                : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
            let mime = file.type;
            if (!mime || mime === 'application/octet-stream') {
              mime = (await sniffImageMimeFromFile(file)) || mime;
            }
            const ext = getExtensionFromMime(mime);
            path = `${prefix}${uuid}${ext}`.replace(/\/+/g, '/').replace(/^\//, '');
            reportProgress(file, 0);
            const body = new Uint8Array(await file.arrayBuffer());
            if (uploadController.signal.aborted) {
              throw new DOMException('Aborted', 'AbortError');
            }
            await backend.writeBytes(path, body, mime || 'application/octet-stream');
            reportProgress(file, 100);
          } else if (isSessionUpload) {
            const prefix = normalizeEditorImagePathPrefix(imagePathPrefix);
            const uuid =
              typeof crypto !== 'undefined' && crypto.randomUUID
                ? crypto.randomUUID()
                : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
            let mime = file.type;
            if (!mime || mime === 'application/octet-stream') {
              mime = (await sniffImageMimeFromFile(file)) || mime;
            }
            const ext = getExtensionFromMime(mime);
            path = `${prefix}${uuid}${ext}`.replace(/\/+/g, '/').replace(/^\//, '');
            reportProgress(file, 0);
            const body = new Uint8Array(await file.arrayBuffer());
            if (uploadController.signal.aborted) {
              throw new DOMException('Aborted', 'AbortError');
            }
            const nextWs = putSessionFileBytes(
              flushSessionEditorToWorkspace() ?? sessionWorkspaceRef.current ?? {
                origin: 'md',
                originName: 'untitled',
                files: {},
              },
              path,
              body,
            );
            sessionWorkspaceRef.current = nextWs;
            setSessionWorkspace(nextWs);
            sessionObjectUrlsRef.current.delete(path);
            reportProgress(file, 100);
          } else {
            path = await uploadEditorImage(client, s3Creds.bucket, file, {
              imagePathPrefix,
              signal: uploadController.signal,
              onProgress: (percent) => reportProgress(file, percent),
            });
          }
          uploadedBytes += file.size || 0;
          editorImageUploadAbortControllerRef.current = null;
          const committedPercent = totalBytes > 0 ? Math.round((uploadedBytes / totalBytes) * 100) : 100;
          setEditorImageUploadPercent(Math.max(0, Math.min(100, committedPercent)));
          paths.push(path);
        }
        if (isLocalUpload && paths.length > 0) {
          if (localVaultFsPath && !localRootHandle) {
            setIsLocalTreeLoading(true);
            try {
              const tree = await readTauriLocalDirectoryTree(localVaultFsPath);
              setLocalTree(tree);
            } finally {
              setIsLocalTreeLoading(false);
            }
          } else if (localRootHandle) {
            setIsLocalTreeLoading(true);
            try {
              const tree = await readLocalDirectoryTree(localRootHandle, '', localRootHandle);
              setLocalTree(tree);
            } finally {
              setIsLocalTreeLoading(false);
            }
          }
        }
        if (isWebdavUpload && paths.length > 0) {
          await refreshWebdavTree();
        }
      } catch (err) {
        if (err?.name === 'AbortError') {
          dbgClipboard('app:upload:cancelled', { message: err?.message ?? 'aborted' });
          setOperationStatus('이미지 업로드가 취소되었습니다.');
        } else {
          dbgClipboard('app:upload:error', { message: err?.message ?? String(err) });
          setOperationStatus('이미지 업로드 실패: ' + (err.message || String(err)));
        }
      } finally {
        editorImageUploadAbortControllerRef.current = null;
        editorImageUploadInProgressRef.current = false;
        editorImageUploadCancelRequestedRef.current = false;
        setIsUploadingEditorImage(false);
        setEditorImageUploadPercent(0);
        removeIndicator(indicatorId);
      }
      dbgClipboard('app:upload:return', { paths, pathCount: paths.length });
      return paths;
    },
    [getS3Client, s3Creds, currentFile, localRootHandle, localVaultFsPath, webdavReady, getBackendForType, refreshWebdavTree, addIndicator, removeIndicator, updateIndicator, flushSessionEditorToWorkspace]
  );

  /** Preview용 ![[path]] 이미지 URL 반환 (S3: Pre-signed, 로컬/WebDAV: blob URL) */
  const getPresignedUrlForPath = useCallback(
    async (path) => {
      const trimmed = String(path || '').trim();
      if (!trimmed) return null;
      // Cover / single-file export may store data: URIs in note-cover paths.
      if (/^(https?:|data:|blob:|\/\/)/i.test(trimmed)) return trimmed;
      if (currentFile?.type === SESSION_STORAGE_TYPE) {
        const ws = sessionWorkspaceRef.current;
        const candidates = [
          trimmed,
          trimmed.replace(/^\/+/, ''),
          resolveStorageImagePath(trimmed, currentFile.id),
        ].filter(Boolean);
        for (const key of candidates) {
          const record = ws?.files?.[key];
          if (record) {
            return getSessionObjectUrl(record.path, record.bytes, mimeForSessionFileName(record.name));
          }
        }
        console.warn('[wiki-image] getPresignedUrlForPath: session failed', { path: trimmed });
        return null;
      }
      if (currentFile?.type === 'local' && isLocalVaultReady(localRootHandle, localVaultFsPath)) {
        if (localVaultFsPath && !localRootHandle) {
          try {
            const backend = getBackendForType('local');
            return await backend.getObjectUrl(trimmed);
          } catch (err) {
            console.warn('[wiki-image] getPresignedUrlForPath: local vault failed', {
              path: trimmed,
              err,
            });
            return null;
          }
        }
        const url = await getLocalWikiImageObjectUrl(localRootHandle, trimmed);
        if (url) {
          console.log('[wiki-image] getPresignedUrlForPath: local ok', { path: trimmed, urlLength: url.length });
          return url;
        }
        console.warn('[wiki-image] getPresignedUrlForPath: local failed', { path: trimmed });
        return null;
      }
      if (currentFile?.type === 'webdav' && webdavReady) {
        try {
          const backend = getBackendForType('webdav');
          return await backend.getObjectUrl(trimmed);
        } catch (err) {
          console.warn('[wiki-image] getPresignedUrlForPath: webdav failed', { path: trimmed, err });
          return null;
        }
      }
      const client = getS3Client();
      if (!client || !s3Creds.bucket) {
        console.log('[wiki-image] getPresignedUrlForPath: no client or bucket', { path: trimmed });
        return null;
      }
      try {
        const url = await getSignedGetUrl(client, s3Creds.bucket, trimmed, 3600);
        console.log('[wiki-image] getPresignedUrlForPath: ok', { path: trimmed, urlLength: url?.length });
        return url;
      } catch (err) {
        console.warn('[wiki-image] getPresignedUrlForPath: failed', { path: trimmed, err });
        return null;
      }
    },
    [getS3Client, s3Creds, currentFile, localRootHandle, localVaultFsPath, webdavReady, getBackendForType, getSessionObjectUrl]
  );

  /** Chat with Myself: resolve by storageMode (not current editor file). */
  const getChatImageUrlForPath = useCallback(
    async (path) => {
      if (storageMode === 'local' && isLocalVaultReady(localRootHandle, localVaultFsPath)) {
        if (localVaultFsPath && !localRootHandle) {
          try {
            const backend = getBackendForType('local');
            return await backend.getObjectUrl(path);
          } catch {
            return null;
          }
        }
        return getLocalWikiImageObjectUrl(localRootHandle, path);
      }
      if (storageMode === 'webdav') {
        try {
          const backend = createChatBackend({
            mode: 'webdav',
            webdavConfig,
          });
          return await backend.getBinaryBlobUrl(path);
        } catch {
          return null;
        }
      }
      const client = getS3Client();
      if (!client || !s3Creds.bucket) return null;
      try {
        return await getSignedGetUrl(client, s3Creds.bucket, path, 3600);
      } catch {
        return null;
      }
    },
    [storageMode, localRootHandle, localVaultFsPath, getBackendForType, getS3Client, s3Creds.bucket, webdavConfig],
  );

  useEffect(() => {
    if (!scriptsLoaded || !isUnlocked || storageMode !== 's3' || !s3Creds.bucket) return;
    const run = async () => {
      const client = getS3Client();
      if (!client) return;
      const pending = await getPendingUploads();
      const indicatorId =
        pending.length > 0
          ? addIndicator({
              id: 'sync-pending',
              type: ActivityTypes.FILE_UPLOAD,
              label: `${pending.length}개 대기 파일 동기화 중`,
            })
          : null;
      try {
        const { synced } = await syncPendingUploads(client, s3Creds.bucket, setOperationStatus);
        if (synced > 0) setOperationStatus(`대기 중이던 ${synced}개 파일 동기화 완료`);
      } catch (e) {
        console.error('Pending uploads sync failed:', e);
      } finally {
        if (indicatorId) removeIndicator(indicatorId);
      }
      loadS3Files();
    };
    run();
  }, [scriptsLoaded, isUnlocked, storageMode, s3Creds.bucket, loadS3Files, getS3Client, addIndicator, removeIndicator]);


  const api = {
    cancelEditorImageUpload,
    confirmAndCancelEditorImageUpload,
    handleUploadEditorImage,
    getPresignedUrlForPath,
    getChatImageUrlForPath,
    isUploadingEditorImage,
    editorImageUploadPercent,
  };
  Object.assign(bag, api);
  if (glueRef) {
    Object.assign(glueRef.current, api);
  }
  return api;
}

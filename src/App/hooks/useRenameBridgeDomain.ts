// @ts-nocheck — residual cross-domain handlers pending further domain splits
/**
 * Residual app logic still shared across chrome/bootstrap/session/PWA/chat/routing.
 * Prefer carving into use*Domain modules; compose entry is useAppOrchestration.
 */
import { useState, useEffect, useLayoutEffect, useCallback, useMemo, useRef } from 'react';
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
 * rename helpers + file-session bridge deps registration.
 */
export function useRenameBridgeDomain(bag: Record<string, any>, glueRef?: { current: any }) {
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
    hasSuffixChange,
    selectFile,
    closeCurrentFile,
    hasUnsavedEditorChanges,
    requestEncMdPassword,
    handleRequestSessionSaveChooser,
    connectedHaimStorageType,
    flushSessionEditorToWorkspace,
    applySessionFileToEditor,
  } = bag;

  const renameS3File = async (file, newName, contentOverride = null) => {
    const client = getS3Client();
    if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');

    const oldKey = file.id;
    const lastSlash = oldKey.lastIndexOf('/');
    const dirPrefix = lastSlash >= 0 ? oldKey.slice(0, lastSlash + 1) : '';
    const newKey = dirPrefix + newName;

    if (newKey === oldKey) return file;

    if (contentOverride != null && typeof contentOverride === 'string') {
      const viewer = file.viewer || 'markdown';
      const contentType =
        viewer === 'json'
          ? 'application/json'
          : viewer === 'raw'
            ? 'text/plain'
            : viewer === 'html'
              ? 'text/html'
              : viewer === 'svg'
                ? 'image/svg+xml'
                : 'text/markdown';
      await putObject(client, {
        Bucket: s3Creds.bucket,
        Key: newKey,
        Body: contentOverride,
        ContentType: contentType,
      });
    } else {
      await copyObject(client, s3Creds.bucket, oldKey, newKey);
    }
    await deleteObject(client, s3Creds.bucket, oldKey);

    await loadS3Files();

    const result = { ...file, id: newKey, name: newName };
    if (contentOverride != null) result.content = contentOverride;
    return result;
  };

  const renameLocalFile = async (file, newName) => {
    const pHandle = file.parentHandle || localRootHandle;
    if (!pHandle) throw new Error('루트 폴더를 먼저 열어주세요.');

    const oldPath = file.id;
    const lastSlash = oldPath.lastIndexOf('/');
    const dirPrefix = lastSlash >= 0 ? oldPath.slice(0, lastSlash + 1) : '';
    const newPath = dirPrefix + newName;

    if (newPath === oldPath) return file;

    const newFileHandle = await pHandle.getFileHandle(newName, { create: true });
    const writable = await newFileHandle.createWritable();
    await writable.write(editorContent);
    await writable.close();

    await pHandle.removeEntry(file.name, { recursive: false });

    await refreshLocalTree();

    return { ...file, id: newPath, name: newName, handle: newFileHandle, content: editorContent };
  };

  // Keep latest bridge values without re-registering every render (empty-deps bug).
  const fileBridgeLatestRef = useRef({});
  fileBridgeLatestRef.current = {
    hasSuffixChange,
    setSuffixConfirmAction,
    setShowSuffixChangeConfirmModal,
    pendingCoverSaveRef,
    setShowCoverChangeConfirmModal,
    sessionVaultBindingsRef,
    writeSessionFileToHaimRef,
    handleRequestSessionSaveChooser,
    connectedHaimStorageType,
    requestEncMdPassword,
    setOperationStatus,
    setPendingCloseTabId,
    setShowCloseFileConfirmModal,
    closeCurrentFile,
    hasUnsavedEditorChanges,
    expandPathsRef,
    selectFile,
    flushSessionEditorToWorkspace,
    applySessionFileToEditor,
    maybeAutoSaveOnFocusChange,
    renameS3File,
    renameLocalFile,
    suppressUnsavedNavGuardRef,
    applyWorkspaceFilePathRetarget: treeOpsApi.applyWorkspaceFilePathRetarget,
    sessionWorkspaceRef,
    savingTabIdsRef,
  };
  const treeBridgeLatestRef = useRef({});
  treeBridgeLatestRef.current = {
    setOperationStatus,
    expandPathsRef,
    isMobile: bag.isMobile,
    setSidebarOpen: bag.setSidebarOpen,
    confirmAndCancelEditorImageUpload: bag.confirmAndCancelEditorImageUpload,
    uploadFileInputRef: bag.uploadFileInputRef,
    uploadFolderInputRef: bag.uploadFolderInputRef,
    setAddToNoteSelectPath: bag.setAddToNoteSelectPath,
    setSaveSessionToNoteSelectPath: bag.setSaveSessionToNoteSelectPath,
    requestEncMdPassword,
    renameS3File,
    renameLocalFile,
    readBackendBytes: bag.readBackendBytes,
    downloadMarkdownImageZip: bag.downloadMarkdownImageZip,
    chatSurfaceActive: bag.chatSurfaceActive,
    setDownloadResultModal: bag.setDownloadResultModal,
  };

  useLayoutEffect(() => {
    const L = () => fileBridgeLatestRef.current;
    const T = () => treeBridgeLatestRef.current;
    fileSessionApi.registerFileSessionBridgeDeps({
      hasSuffixChange: (...a) => L().hasSuffixChange?.(...a),
      setSuffixConfirmAction: (...a) => L().setSuffixConfirmAction?.(...a),
      setShowSuffixChangeConfirmModal: (...a) => L().setShowSuffixChangeConfirmModal?.(...a),
      get pendingCoverSaveRef() {
        return L().pendingCoverSaveRef;
      },
      setShowCoverChangeConfirmModal: (...a) => L().setShowCoverChangeConfirmModal?.(...a),
      get sessionVaultBindingsRef() {
        return L().sessionVaultBindingsRef;
      },
      get writeSessionFileToHaimRef() {
        return L().writeSessionFileToHaimRef;
      },
      handleRequestSessionSaveChooser: (...a) => L().handleRequestSessionSaveChooser?.(...a),
      connectedHaimStorageType: (...a) => L().connectedHaimStorageType?.(...a),
      requestEncMdPassword: (...a) => L().requestEncMdPassword?.(...a),
      setOperationStatus: (...a) => L().setOperationStatus?.(...a),
      setPendingCloseTabId: (...a) => L().setPendingCloseTabId?.(...a),
      setShowCloseFileConfirmModal: (...a) => L().setShowCloseFileConfirmModal?.(...a),
      closeCurrentFile: (...a) => L().closeCurrentFile?.(...a),
      hasUnsavedEditorChanges: (...a) => L().hasUnsavedEditorChanges?.(...a),
      get expandPathsRef() {
        return L().expandPathsRef;
      },
      selectFile: (...a) => L().selectFile?.(...a),
      flushSessionEditorToWorkspace: (...a) => L().flushSessionEditorToWorkspace?.(...a),
      applySessionFileToEditor: (...a) => L().applySessionFileToEditor?.(...a),
      maybeAutoSaveOnFocusChange: (...a) => L().maybeAutoSaveOnFocusChange?.(...a),
      renameS3File: (...a) => L().renameS3File?.(...a),
      renameLocalFile: (...a) => L().renameLocalFile?.(...a),
      get suppressUnsavedNavGuardRef() {
        return L().suppressUnsavedNavGuardRef;
      },
      applyWorkspaceFilePathRetarget: (...a) => L().applyWorkspaceFilePathRetarget?.(...a),
      get sessionWorkspaceRef() {
        return L().sessionWorkspaceRef;
      },
      get savingTabIdsRef() {
        return L().savingTabIdsRef;
      },
    });
    treeOpsApi.registerTreeOpsBridgeDeps?.({
      setOperationStatus: (...a) => T().setOperationStatus?.(...a),
      get expandPathsRef() {
        return T().expandPathsRef;
      },
      get isMobile() {
        return T().isMobile;
      },
      setSidebarOpen: (...a) => T().setSidebarOpen?.(...a),
      confirmAndCancelEditorImageUpload: (...a) =>
        T().confirmAndCancelEditorImageUpload?.(...a),
      get uploadFileInputRef() {
        return T().uploadFileInputRef;
      },
      get uploadFolderInputRef() {
        return T().uploadFolderInputRef;
      },
      setAddToNoteSelectPath: (...a) => T().setAddToNoteSelectPath?.(...a),
      setSaveSessionToNoteSelectPath: (...a) => T().setSaveSessionToNoteSelectPath?.(...a),
      requestEncMdPassword: (...a) => T().requestEncMdPassword?.(...a),
      renameS3File: (...a) => T().renameS3File?.(...a),
      renameLocalFile: (...a) => T().renameLocalFile?.(...a),
      readBackendBytes: (...a) => T().readBackendBytes?.(...a),
      downloadMarkdownImageZip: (...a) => T().downloadMarkdownImageZip?.(...a),
      get chatSurfaceActive() {
        return T().chatSurfaceActive;
      },
      setDownloadResultModal: (...a) => T().setDownloadResultModal?.(...a),
    });
  }, [fileSessionApi, treeOpsApi]);

  // 6. Create & Delete

  const api = {
    renameS3File,
    renameLocalFile
  };
  Object.assign(bag, api);
  if (glueRef) Object.assign(glueRef.current, api);
  return api;
}

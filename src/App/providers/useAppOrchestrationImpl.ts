// @ts-nocheck — orchestration glue; handlers gradually leave for domain modules
/**
 * Cross-domain orchestration implementation (open/save/CRUD bodies).
 * Prefer useAppOrchestration export; domain state is owned by outer providers.
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
import { useRegisterSW } from 'virtual:pwa-register/react';
import { usePwaSnippetsOwned } from '@/App/providers/AppPwaSnippetsStateProvider';


export function useMainAppController() {
  const { addIndicator, removeIndicator, updateIndicator } = useActivityIndicator();
  const { showAlert } = useAlertModal();
  const { showToast } = useToast();
  const auth = useAuth();
  const {
    scriptsLoaded,
    shareBlockingAuth,
    setShareBlockingAuth,
  } = useBootstrapOwned();
  const {
    storageMode,
    setStorageMode,
    s3Tree,
    setS3Tree,
    localTree,
    setLocalTree,
    webdavTree,
    setWebdavTree,
    sessionWorkspace,
    setSessionWorkspace,
    localRootHandle,
    setLocalRootHandle,
    localVaultFsPath,
    setLocalVaultFsPath,
    webdavConfig,
    setWebdavConfig,
    isLocalTreeLoading,
    setIsLocalTreeLoading,
    isWebdavTreeLoading,
    setIsWebdavTreeLoading,
    localFolderLoadingPath,
    webdavFolderLoadingPath,
    getBackendForType,
    getS3Client,
    loadS3Files,
    refreshLocalTree,
    refreshWebdavTree,
    loadLocalFolderChildren,
    loadWebdavFolderChildren,
    openLocalFolder,
    webdavReady,
    attachLocalRootFolder,
    scanActiveStorageUsageTree,
    canScanStorageUsage,
  } = useVault();
  const {
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
    isRefreshingFromDisk,
    setIsRefreshingFromDisk,
    isPullingFromRemote,
    setIsPullingFromRemote,
  } = useFileSessionOwned();
  const fileSessionApi = useFileSession();
  const {
    selectedIds,
    setSelectedIds,
    deleteTarget,
    setDeleteTarget,
    emptyTrashTarget,
    setEmptyTrashTarget,
    isEmptyingTrash,
    setIsEmptyingTrash,
    deletingFolderPath,
    setDeletingFolderPath,
    isDeletingFolder,
    setIsDeletingFolder,
    isDeleting,
    setIsDeleting,
    isMoveModalOpen,
    setIsMoveModalOpen,
    moveFolderTarget,
    setMoveFolderTarget,
    moveFileTarget,
    setMoveFileTarget,
    createModalOpen,
    setCreateModalOpen,
    createModalContext,
    setCreateModalContext,
    moveModalSelectPath,
    setMoveModalSelectPath,
    isCreateSubmitting,
    setIsCreateSubmitting,
    dropTarget,
    setDropTarget,
    treeNameConflict,
    setTreeNameConflict,
    treeTransferBusy,
    setTreeTransferBusy,
  } = useTreeOpsOwned();
  const treeOpsApi = useTreeOps();
  const {
    handleTreeNodeSelect,
    handleDownloadNode,
    handleDuplicateNode,
    renameTreeItem,
    requestCreateItem,
    requestNewFile,
    requestAdvancedSearchCreateItem,
    newFileDefaultParentPath,
    requestUploadFile,
    requestUploadFolder,
    settleTreeNameConflict,
    askTreeNameConflict,
    askUploadNameConflict,
    getUploadTreeForStorage,
    loadFileCompareForDest,
    handleRequestMoveFolder,
    handleDropOnFolder,
    handleDragEndNode,
    handleCreateItemSubmit,
    beginTreeTransferBusy,
    endTreeTransferBusy,
    reloadOpenFileIfPath,
    moveS3FileToFolder,
    moveLocalFileToFolder,
    moveS3FolderToFolder,
    moveLocalFolderToFolder,
    moveWebdavFileToFolder,
    moveWebdavFolderToFolder,
    copyS3FileToFolder,
    copyLocalFileToFolder,
    copyS3FolderToFolder,
    copyLocalFolderToFolder,
    copyWebdavFileToFolder,
    copyWebdavFolderToFolder,
    lastSelectedIdRef,
    toSelectKey,
  } = treeOpsApi;

  const {
    isRecording,
    audioLevel,
    startRecording,
    stopRecording,
    captureSync,
    recordingPipelineStatus,
    setRecordingPipelineStatus,
    recordingQueueStats,
    setRecordingQueueStats,
    recordingsList,
    setRecordingsList,
    selectedRecordingKey,
    setSelectedRecordingKey,
    recordingAudioUrl,
    setRecordingAudioUrl,
    recordingSyncData,
    setRecordingSyncData,
  } = useRecordingOwned();
  const {
    snippetConfig,
    setSnippetConfig,
    swRegistration,
    setSwRegistration,
    isApplyingPwaUpdate,
    setIsApplyingPwaUpdate,
    hidePwaUpdateToast,
    setHidePwaUpdateToast,
    isCheckingAppUpdate,
    setIsCheckingAppUpdate,
    showAppUpdateConfirmModal,
    setShowAppUpdateConfirmModal,
    appUpdateAvailable,
    setAppUpdateAvailable,
    appBuildLocalId,
    setAppBuildLocalId,
    appBuildRemoteId,
    setAppBuildRemoteId,
    appUpdateCheckError,
    setAppUpdateCheckError,
  } = usePwaSnippetsOwned();
  const {
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
    appLockPromptManual,
  } = auth;
  const navigate = useNavigate();
  const location = useLocation();

  const llmProviderProfiles = useMemo(
    () => resolveLlmProviderProfiles(s3Creds),
    [s3Creds],
  );

  const getImgbbApiKey = useCallback(
    () => (s3Creds?.imgbbApiKey || '').trim(),
    [s3Creds?.imgbbApiKey],
  );

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

  // Vault trees / storageMode owned by AppVaultStateProvider (useVaultOwned).
  const sessionWorkspaceRef = useRef(null);
  const sessionObjectUrlsRef = useRef(new Map());
  /** session file id -> { destPath, storageType } after saving into connected Haim */
  const sessionVaultBindingsRef = useRef(Object.create(null));
  const writeSessionFileToHaimRef = useRef(null);
  const [isOpeningSession, setIsOpeningSession] = useState(false);
  const [showRestoreLocalFolderModal, setShowRestoreLocalFolderModal] = useState(false);
  const [pendingLocalFolderName, setPendingLocalFolderName] = useState('');
  
  // File/editor session owned by AppFileSessionStateProvider (useFileSessionOwned).
  // Workspace tab state: sole source is WorkspaceTabsProvider → useWorkspaceTabs.
  const workspaceTabsApi = useWorkspaceTabsCtx();
  const workspaceTabs = workspaceTabsApi.state;
  const setWorkspaceTabs = workspaceTabsApi.setState;
  const workspaceTabsRef = workspaceTabsApi.workspaceTabsRef;
  workspaceTabsRef.current = workspaceTabs;
  const workspaceTabsEnabled = workspaceTabsApi.workspaceTabsEnabled;
  const setWorkspaceTabsEnabled = workspaceTabsApi.setWorkspaceTabsEnabled;
  const workspaceTabsEnabledRef = workspaceTabsApi.workspaceTabsEnabledRef;
  workspaceTabsEnabledRef.current = workspaceTabsEnabled;
  const workspaceTabsAutoSaveModeRef = useRef(loadWorkspaceTabsAutoSaveMode());
  const editedFileNameRef = useRef('');
  /** Tab ids (`type:path`) currently writing in the background. */
  const savingTabIdsRef = useRef(new Set());
  // Tree ops state owned by AppTreeOpsStateProvider (useTreeOpsOwned).
  const [showHiddenFolders, setShowHiddenFolders] = useState(() => loadShowHiddenFolders());
  const [showTrashFolder, setShowTrashFolder] = useState(() => loadShowTrashFolder());

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

  const fileInputRef = useRef(null);
  const uploadFileInputRef = useRef(null);
  const uploadFolderInputRef = useRef(null);
  const [uploadTarget, setUploadTarget] = useState(null);
  const [operationStatus, setOperationStatus] = useState('');
  const [webauthnPRFSupported, setWebauthnPRFSupported] = useState(false);
  const [webauthnAvailable, setWebauthnAvailable] = useState(false);
  const [addToNoteSelectPath, setAddToNoteSelectPath] = useState(null);
  const [showExportPasswordModal, setShowExportPasswordModal] = useState(false);
  const [showImportPasswordModal, setShowImportPasswordModal] = useState(false);
  const [importFileContent, setImportFileContent] = useState(null);
  const [showSaveMethodModal, setShowSaveMethodModal] = useState(false);
  const [saveMethodModalCreds, setSaveMethodModalCreds] = useState(null);
  const [showUnsavedConfirmModal, setShowUnsavedConfirmModal] = useState(false);
  editedFileNameRef.current = editedFileName;
  const [showSuffixChangeConfirmModal, setShowSuffixChangeConfirmModal] = useState(false);
  const [suffixConfirmAction, setSuffixConfirmAction] = useState('renameOnly'); // 'renameOnly' | 'renameAndSave'
  const [showCloseFileConfirmModal, setShowCloseFileConfirmModal] = useState(false);
  /** Tab id awaiting save/discard close confirm (`ConfirmModal`). */
  const [pendingCloseTabId, setPendingCloseTabId] = useState(null);
  const [showOverwriteCredsConfirmModal, setShowOverwriteCredsConfirmModal] = useState(false);
  const [showCoverChangeConfirmModal, setShowCoverChangeConfirmModal] = useState(false);
  const pendingCoverSaveRef = useRef(null);
  const [pendingWebAuthnSave, setPendingWebAuthnSave] = useState(null);
  const [pendingPasswordSave, setPendingPasswordSave] = useState(null);
  const expandPathsRef = useRef(null);
  const [showDownloadMethodModal, setShowDownloadMethodModal] = useState(false);
  const [downloadModalMode, setDownloadModalMode] = useState('default');
  const [showSaveSessionToNoteModal, setShowSaveSessionToNoteModal] = useState(false);
  const [saveSessionToNoteSelectPath, setSaveSessionToNoteSelectPath] = useState(null);
  const [isSavingSessionToNote, setIsSavingSessionToNote] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [downloadResultModal, setDownloadResultModal] = useState({
    isOpen: false,
    title: '',
    message: '',
  });
  const closeDownloadResultModal = useCallback(() => {
    setDownloadResultModal({
      isOpen: false,
      title: '',
      message: '',
    });
  }, []);
  const openUnsupportedFolderDownloadModal = useCallback(() => {
    setDownloadResultModal({
      isOpen: true,
      title: '폴더 다운로드',
      message: '이 브라우저에서 폴더 다운로드는 지원하지 않습니다',
    });
  }, []);
  const triggerBlobDownload = useCallback((blob, fileName) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = normalizeUnicodeNfc(String(fileName || 'download'));
    a.click();
    URL.revokeObjectURL(url);
  }, []);
  // Snippet settings (VSCode-style JSON, synced to .settings/snippets.json)
  // snippetConfig owned by AppPwaSnippetsStateProvider
  const [snippetLoadedFromS3, setSnippetLoadedFromS3] = useState(false);
  const [snippetLoadedFromLocal, setSnippetLoadedFromLocal] = useState(false);
  const [snippetLoadedFromWebdav, setSnippetLoadedFromWebdav] = useState(false);
  const [isSavingSnippets, setIsSavingSnippets] = useState(false);

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false
  );
  const isChatRoute =
    location.pathname === '/chat' || location.pathname.endsWith('/chat');
  const isSettingsRoute = isSettingsAppPathname(location.pathname);
  const activeWorkspaceTab = getActiveTab(workspaceTabs);
  const chatTabActive = isChatTab(activeWorkspaceTab);
  const chatSurfaceActive = workspaceTabsEnabled ? chatTabActive : isChatRoute;
  const lockChatViewport = isMobile && chatSurfaceActive;
  useVisualViewportLock(lockChatViewport);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  useHistoryOverlayBack(
    sidebarOpen,
    closeSidebar,
    isMobile,
    'main-sidebar',
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try {
      return typeof window !== 'undefined' && window.localStorage.getItem('s3haim_sidebar_collapsed') === '1';
    } catch {
      return false;
    }
  });
  const [hideRecordingCompanions, setHideRecordingCompanions] = useState(() => loadHideRecordingCompanions());
  const [treeStickyFolderPathEnabled, setTreeStickyFolderPathEnabled] = useState(() =>
    loadTreeStickyFolderPathEnabled(),
  );
  const [showTreeModifiedDate, setShowTreeModifiedDate] = useState(() =>
    loadTreeShowModifiedDateEnabled(),
  );
  const [treeHoverExpandSettings, setTreeHoverExpandSettings] = useState(() =>
    loadTreeHoverExpandSettings(),
  );

  // Recording + PWA/snippets owned by RecordingProvider / AppPwaSnippetsStateProvider
  const appName = getAppNameByStorageMode(storageMode || DEFAULT_STORAGE_MODE);
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    immediate: true,
    onRegisteredSW(_swUrl, registration) {
      if (registration) setSwRegistration(registration);
    },
    onRegisterError(error) {
      console.error('PWA service worker registration error:', error);
    },
  });

  const s3TreeRef = useRef([]);
  const webdavTreeRef = useRef([]);
  const prevHistoryViewPathRef = useRef(undefined);
  const suppressUnsavedNavGuardRef = useRef(false);
  const hasRestoredLastFileRef = useRef(false);
  const hasProcessedOpenFromUrlRef = useRef(false);
  const hasRestoredFromPrintRef = useRef(false);
  const hasPromptedLocalFolderRestoreRef = useRef(false);
  const [localFolderRestoreSettled, setLocalFolderRestoreSettled] = useState(false);
  const saveFileRef = useRef(null);
  const selectFileRawRef = useRef(null);
  /** Sidebar fills `{ open }` so file tabs can reuse TreeNode context menu. */
  const fileTabContextMenuRef = useRef(null);

  const hasSeededTabsRestoreQueueRef = useRef(false);
  const hasRestoredPersistedWorkspaceTabsRef =
    workspaceTabsApi.hasRestoredPersistedWorkspaceTabsRef;
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

  const queueBackgroundTabSave = useCallback((file, content) => {
    if (!file?.type || !file?.id) return;
    if (file.type === SESSION_STORAGE_TYPE) return;
    // Encrypted notes: never auto-save or write plaintext drafts.
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
  }, []);

  /** VS Code onFocusChange: save when leaving a dirty file tab. */
  const maybeAutoSaveOnFocusChange = useCallback(
    (file, content) => {
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

  useLayoutEffect(() => {
    workspaceTabsApi.registerTabBridgeDeps({
      onLeavingDirtyFileTab: maybeAutoSaveOnFocusChange,
      requestDirtyCloseConfirm: (id) => {
        setPendingCloseTabId(id);
        setShowCloseFileConfirmModal(true);
      },
    });
  }, [workspaceTabsApi, maybeAutoSaveOnFocusChange]);

  const handleEditorTypeChange = fileSessionApi.handleEditorTypeChange;
  const {
    saveFile,
    refreshLocalFileFromDisk,
    refreshRemoteFile,
    handleRequestCloseEditor,
    openAdvancedSearchFile,
    selectFileRaw,
    commitOpenFile,
    saveCurrentMarkdownBeforeSwitch,
    applyOpenFileIdentityChange,
    renameCurrentFileFullName,
  } = fileSessionApi;

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
    const mql = window.matchMedia('(max-width: 768px)');
    const handler = () => setIsMobile(mql.matches);
    handler();
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!swRegistration) return undefined;

    const checkForUpdate = () => {
      swRegistration.update().catch((error) => {
        console.warn('PWA update check failed:', error);
      });
    };

    checkForUpdate();
    const interval = setInterval(checkForUpdate, 5 * 60 * 1000);
    const onVisible = () => {
      if (document.visibilityState === 'visible') checkForUpdate();
    };
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', checkForUpdate);
    window.addEventListener('pageshow', checkForUpdate);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', checkForUpdate);
      window.removeEventListener('pageshow', checkForUpdate);
    };
  }, [swRegistration]);

  useEffect(() => {
    if (needRefresh) {
      setHidePwaUpdateToast(false);
      setIsApplyingPwaUpdate(false);
    }
  }, [needRefresh]);

  useEffect(() => {
    if (showAppUpdateConfirmModal && needRefresh) {
      setAppUpdateAvailable(true);
    }
  }, [needRefresh, showAppUpdateConfirmModal]);

  const handleApplyPwaUpdate = useCallback(async () => {
    try {
      setIsApplyingPwaUpdate(true);
      await updateServiceWorker(true);
    } catch (error) {
      console.error('PWA update apply failed:', error);
      setIsApplyingPwaUpdate(false);
    }
  }, [updateServiceWorker]);

  const handleCheckAppUpdate = useCallback(async () => {
    setIsCheckingAppUpdate(true);
    try {
      const buildCheck = await checkAppBuildUpdate();
      setAppBuildLocalId(buildCheck.localId || getLocalAppBuildId());

      let swFound = false;
      try {
        swFound = await checkServiceWorkerUpdate(swRegistration, 2500);
      } catch (error) {
        console.warn('Service worker update check failed:', error);
      }

      const waiting = Boolean(needRefresh || swRegistration?.waiting || swFound);
      if (buildCheck.ok) {
        setAppBuildRemoteId(buildCheck.remoteId);
        setAppUpdateCheckError('');
        setAppUpdateAvailable(Boolean(buildCheck.updateAvailable || waiting));
      } else {
        setAppBuildRemoteId(buildCheck.remoteId || '');
        setAppUpdateCheckError(buildCheck.error || 'unknown');
        setAppUpdateAvailable(waiting);
        console.warn('App update check failed:', buildCheck.error);
      }
    } catch (error) {
      console.warn('App update check failed:', error);
      setAppBuildLocalId(getLocalAppBuildId());
      setAppBuildRemoteId('');
      setAppUpdateCheckError(error?.message || String(error) || 'unknown');
      setAppUpdateAvailable(Boolean(needRefresh || swRegistration?.waiting));
    } finally {
      setIsCheckingAppUpdate(false);
      setShowAppUpdateConfirmModal(true);
    }
  }, [needRefresh, swRegistration]);

  const handleConfirmAppUpdate = useCallback(async () => {
    setShowAppUpdateConfirmModal(false);
    setHidePwaUpdateToast(true);
    const buildMismatch = Boolean(
      appBuildLocalId && appBuildRemoteId && appBuildLocalId !== appBuildRemoteId,
    );
    try {
      setIsApplyingPwaUpdate(true);
      if (buildMismatch) {
        await applyForcedAppUpdate();
        return;
      }
      if (needRefresh || appUpdateAvailable || swRegistration?.waiting) {
        await updateServiceWorker(true);
        return;
      }
      window.location.reload();
    } catch (error) {
      console.error('App update apply failed:', error);
      setIsApplyingPwaUpdate(false);
      window.location.reload();
    }
  }, [appBuildLocalId, appBuildRemoteId, appUpdateAvailable, needRefresh, swRegistration, updateServiceWorker]);

  useEffect(() => {
    try {
      window.localStorage.setItem('s3haim_sidebar_collapsed', sidebarCollapsed ? '1' : '0');
    } catch {
      // ignore
    }
  }, [sidebarCollapsed]);

  useEffect(() => {
    saveTreeHoverExpandSettings(treeHoverExpandSettings);
  }, [treeHoverExpandSettings]);

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
    const onAutoSaveMode = (event) => {
      const mode = event?.detail?.mode ?? loadWorkspaceTabsAutoSaveMode();
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
  const [authWanted, setAuthWanted] = useState(false);
  // shareBlockingAuth owned by AppBootstrapStateProvider
  const [shareGroupSend, setShareGroupSend] = useState(null);
  /** Chat pane host for Sidebar-portaled tree→note-share droppable. */
  const [chatAttachDropHost, setChatAttachDropHost] = useState(null);
  const chatAttachDropHandlerRef = useRef(null);
  const handleDropToChatAttach = useCallback((items) => {
    chatAttachDropHandlerRef.current?.(items);
  }, []);
  const handleRegisterChatAttachDrop = useCallback((handler) => {
    chatAttachDropHandlerRef.current =
      typeof handler === 'function' ? handler : null;
  }, []);

  useEffect(() => {
    if (isUnlocked) return;

    let cancelled = false;
    (async () => {
      const session = await tryRestoreAuthSession();
      if (cancelled) return;
      if (session) {
        unlock(session.creds, session.password);
        if (session.webdavConfig?.endpoint || session.webdavConfig?.username) {
          setWebdavConfig(session.webdavConfig);
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
            unlock(desktop.creds, '');
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
  const handleUnlock = async (password) => {
    try {
      if (isDesktopApp()) {
        const migrated = await migrateLegacyDesktopSecretsToStronghold(password);
        if (migrated.creds) {
          unlock(migrated.creds, '');
          if (migrated.webdav) setWebdavConfig(migrated.webdav);
          return;
        }
      }

      const storedBlob = isDesktopApp() ? await loadPasswordEncryptedCredsBlob() : null;
      const stored = storedBlob
        ? JSON.stringify(storedBlob)
        : localStorage.getItem('s3NotesEncrypted');
      if (!stored) throw new Error("저장된 데이터가 없습니다.");
      const encryptedObj = JSON.parse(stored);
      if (encryptedObj?.webauthn) throw new Error("보안 키로 저장된 데이터는 비밀번호로 해제할 수 없습니다.");
      let decryptedStr;
      if (Array.isArray(encryptedObj.passwordSalt)) {
        const entropy = await deriveEntropyFromPassword(password, new Uint8Array(encryptedObj.passwordSalt));
        decryptedStr = await decryptWithEntropy(encryptedObj, entropy);
      } else {
        decryptedStr = await decryptData(password, encryptedObj);
      }
      const creds = JSON.parse(decryptedStr);
      if (isDesktopApp()) {
        const entryLockMode = getDesktopAppEntryLockModeSync();
        if (entryLockMode === 'password') {
          const decryptedWebdav = await decryptDesktopPasswordWebdav(password);
          if (decryptedWebdav) setWebdavConfig(decryptedWebdav);
          unlock(creds, password);
          return;
        }
        await saveDesktopCreds(creds);
        if (stored) {
          await savePasswordEncryptedCredsBlob(JSON.parse(stored));
        }
        const decryptedWebdav = await decryptWebdavConfig(password);
        if (decryptedWebdav) {
          await saveDesktopWebdavConfig(decryptedWebdav);
          setWebdavConfig(decryptedWebdav);
        }
        await migrateLegacyDesktopSecretsToStronghold(password);
      }
      unlock(creds, isDesktopApp() ? '' : password);
      if (!isDesktopApp()) {
        try {
          const decryptedWebdav = await decryptWebdavConfig(password);
          if (decryptedWebdav) setWebdavConfig(decryptedWebdav);
        } catch (webdavErr) {
          console.warn('WebDAV config decrypt failed:', webdavErr);
        }
      }
    } catch (e) {
      alert(e?.message || "비밀번호가 틀렸거나 데이터가 손상되었습니다.");
      console.error(e);
    }
  };

  const handleUnlockWithWebAuthn = async () => {
    if (isDesktopApp() && getDesktopAppEntryLockModeSync() === 'biometric') {
      const desktop = await unlockDesktopWithBiometricGate();
      if (desktop.creds) {
        unlock(desktop.creds, '');
        if (desktop.webdav) setWebdavConfig(desktop.webdav);
        loadS3Files(desktop.creds);
      } else {
        proceedWithoutStoredCreds();
      }
      navigate('/');
      return;
    }
    if (isStoredWithWebAuthn()) {
      const creds = await loadCredsWithWebAuthn();
      if (isDesktopApp()) {
        await saveDesktopCreds(creds);
        await migrateLegacyDesktopSecretsToStronghold();
        const webdav = await loadDesktopWebdavConfig();
        if (webdav) setWebdavConfig(webdav);
      }
      unlock(creds, '');
      loadS3Files(creds);
      navigate('/');
    } else {
      const password = await unlockWithWebAuthn();
      if (password) await handleUnlock(password);
    }
  };

  const saveEncryptedSettings = async (creds, password, options = {}) => {
    const { stayOnSettings = false } = options;
    try {
      if (isDesktopApp()) {
        await saveDesktopCreds(creds);
        setS3Creds(creds);
        setMasterPassword('');
        setShowSetPasswordModal(false);
        loadS3Files(creds);
        if (stayOnSettings) {
          showAlert({
            title: '연결 정보',
            message: '연결 정보 업데이트가 완료되었습니다.',
          });
        } else {
          navigate('/');
        }
        return;
      }

      const passwordSalt = window.crypto.getRandomValues(new Uint8Array(16));
      const entropy = await deriveEntropyFromPassword(password, passwordSalt);
      const encrypted = await encryptWithEntropy(JSON.stringify(creds), entropy);
      const stored = {
        passwordSalt: Array.from(passwordSalt),
        salt: encrypted.salt,
        iv: encrypted.iv,
        cipher: encrypted.cipher,
      };
      localStorage.setItem('s3NotesEncrypted', JSON.stringify(stored));
      if (webdavConfig?.endpoint || webdavConfig?.username || webdavConfig?.password) {
        await saveWebdavConfig(webdavConfig, password);
      }
      clearPlaintextWebdavConfig();
      setS3Creds(creds);
      setMasterPassword(password);
      setShowSetPasswordModal(false);
      if (getStoredWebAuthn()) {
        try {
          await updateWebAuthnWrappedPassword(password);
        } catch {
          // WebAuthn 래핑 갱신 실패 시에도 저장은 완료된 상태로 둠
        }
      }
      loadS3Files(creds);
      if (stayOnSettings) {
        showAlert({
          title: '연결 정보',
          message: '연결 정보 업데이트가 완료되었습니다.',
        });
      } else {
        navigate('/');
      }
    } catch (e) {
      alert("설정 저장 중 오류가 발생했습니다: " + e.message);
    }
  };

  /** Fields the settings S3/Gemini forms can change; missing/null ≡ ''. */
  const CREDS_COMPARE_KEYS = [
    'accessKeyId',
    'secretAccessKey',
    'region',
    'bucket',
    'endpoint',
    'googleAiStudioApiKey',
    'openaiCompatibleBaseUrl',
    'openaiCompatibleApiKey',
    'llmProviderProfiles',
    'imgbbApiKey',
  ];

  const S3_CONNECTION_KEYS = [
    'accessKeyId',
    'secretAccessKey',
    'region',
    'bucket',
    'endpoint',
  ];

  const normalizeCredsForCompare = (creds) => {
    if (!creds || typeof creds !== 'object') return null;
    const out = {};
    for (const key of CREDS_COMPARE_KEYS) {
      if (key === 'llmProviderProfiles') {
        out[key] = JSON.stringify(resolveLlmProviderProfiles(creds));
      } else {
        out[key] = creds[key] == null ? '' : String(creds[key]);
      }
    }
    return out;
  };

  const isCredsDirty = (formCreds, savedCreds) => {
    const a = normalizeCredsForCompare(formCreds);
    const b = normalizeCredsForCompare(savedCreds);
    if (!a || !b) return !!a !== !!b;
    return CREDS_COMPARE_KEYS.some((key) => a[key] !== b[key]);
  };

  const isS3ConnectionDirty = (formCreds, savedCreds) => {
    const a = normalizeCredsForCompare(formCreds);
    const b = normalizeCredsForCompare(savedCreds);
    if (!a || !b) return !!a !== !!b;
    return S3_CONNECTION_KEYS.some((key) => a[key] !== b[key]);
  };

  const shouldConfirmDesktopCredsOverwrite = (formCreds, savedCreds) => {
    if (!isDesktopApp()) return true;
    return isS3ConnectionDirty(formCreds, savedCreds);
  };

  const handleSaveS3Creds = (creds) => {
    if (isDesktopApp()) {
      void (async () => {
        try {
          if (getDesktopAppEntryLockModeSync() === 'password' && masterPassword) {
            await refreshDesktopPasswordEntryLockSecrets(masterPassword, creds, webdavConfig);
            setS3Creds(creds);
            loadS3Files(creds);
            showAlert({
              title: '연결 정보',
              message: '연결 정보 업데이트가 완료되었습니다.',
            });
            return;
          }
          if (hasStoredCreds() && shouldConfirmDesktopCredsOverwrite(creds, s3Creds)) {
            setPendingPasswordSave({ creds, password: '', options: { stayOnSettings: true } });
            setShowOverwriteCredsConfirmModal(true);
            return;
          }
          await saveDesktopCreds(creds);
          setS3Creds(creds);
          loadS3Files(creds);
          showAlert({
            title: '연결 정보',
            message: '연결 정보 업데이트가 완료되었습니다.',
          });
        } catch (e) {
          alert(e?.message || '설정 저장 중 오류가 발생했습니다.');
        }
      })();
      return;
    }
    setS3Creds(creds);
    setSaveMethodModalCreds(creds);
    setShowSaveMethodModal(true);
  };

  const handleSaveWithWebAuthn = async (creds) => {
    if (typeof localStorage !== 'undefined' && (localStorage.getItem('s3NotesEncrypted') || getStoredWebAuthn())) {
      setPendingWebAuthnSave(creds);
      setShowOverwriteCredsConfirmModal(true);
      return;
    }
    await saveCredsWithWebAuthn(creds);
    loadS3Files(creds);
    setShowSaveMethodModal(false);
    setSaveMethodModalCreds(null);
    showAlert({
      title: '연결 정보',
      message: '연결 정보 업데이트가 완료되었습니다.',
    });
  };

  const handleSaveWithPasswordFromModal = () => {
    setShowSaveMethodModal(false);
    setSaveMethodModalCreds(null);
    setShowSetPasswordModal(true);
  };

  const hasStoredCreds = () => {
    if (isDesktopApp()) {
      return (
        hasDesktopStoredCredsMarker() || getDesktopAppEntryLockModeSync() !== 'off'
      );
    }
    return (
      typeof localStorage !== 'undefined' &&
      (!!localStorage.getItem('s3NotesEncrypted') ||
        !!getStoredWebAuthn() ||
        hasEncryptedWebdavConfig())
    );
  };

  const requestSaveEncryptedSettings = (creds, password, options = {}) => {
    if (hasStoredCreds()) {
      if (isDesktopApp() && !shouldConfirmDesktopCredsOverwrite(creds, s3Creds)) {
        void saveEncryptedSettings(creds, password, options);
        return;
      }
      setPendingPasswordSave({ creds, password, options });
      setShowOverwriteCredsConfirmModal(true);
      return;
    }
    saveEncryptedSettings(creds, password, options);
  };

  const handleOverwriteCredsConfirm = async () => {
    try {
      if (pendingWebAuthnSave) {
        await saveCredsWithWebAuthn(pendingWebAuthnSave);
        loadS3Files(pendingWebAuthnSave);
        setShowSaveMethodModal(false);
        setSaveMethodModalCreds(null);
        setPendingWebAuthnSave(null);
        showAlert({
          title: '연결 정보',
          message: '연결 정보 업데이트가 완료되었습니다.',
        });
      } else if (pendingPasswordSave) {
        if (isDesktopApp()) {
          await saveDesktopCreds(pendingPasswordSave.creds);
          setS3Creds(pendingPasswordSave.creds);
          loadS3Files(pendingPasswordSave.creds);
          setPendingPasswordSave(null);
          showAlert({
            title: '연결 정보',
            message: '연결 정보 업데이트가 완료되었습니다.',
          });
        } else {
          await saveEncryptedSettings(
            pendingPasswordSave.creds,
            pendingPasswordSave.password,
            pendingPasswordSave.options
          );
          setPendingPasswordSave(null);
        }
      }
    } finally {
      setShowOverwriteCredsConfirmModal(false);
    }
  };

  const handleExportCreds = () => {
    if (!s3Creds?.bucket && !hasStoredCreds()) return alert("내보낼 데이터가 없습니다.");
    setShowExportPasswordModal(true);
  };

  const handleExportConfirm = async (exportPassword) => {
    try {
      const dataToExport = s3Creds;
      if (!dataToExport?.bucket) {
        alert("내보낼 연결 정보가 없습니다. 먼저 설정에서 S3 연결 정보를 저장하세요.");
        setShowExportPasswordModal(false);
        return;
      }
      const encryptedObj = await encryptData(exportPassword, JSON.stringify(dataToExport));
      const blob = new Blob([JSON.stringify(encryptedObj)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `s3-haim-creds-${new Date().toISOString()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setShowExportPasswordModal(false);
    } catch (e) {
      alert("내보내기 중 오류가 발생했습니다: " + (e?.message || e));
    }
  };

  const handleImportCreds = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target.result;
        const parsed = JSON.parse(content);
        if (!parsed || typeof parsed !== 'object' || !parsed.salt || !parsed.iv || !parsed.ciphertext) {
          alert("잘못된 백업 파일 형식입니다. 비밀번호로 암호화된 JSON 파일이어야 합니다.");
          return;
        }
        setImportFileContent(content);
        setShowImportPasswordModal(true);
      } catch {
        alert("잘못된 파일 형식입니다.");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleImportConfirm = async (importPassword) => {
    try {
      const encryptedObj = JSON.parse(importFileContent);
      const decryptedStr = await decryptData(importPassword, encryptedObj);
      const creds = JSON.parse(decryptedStr);
      setImportFileContent(null);
      setShowImportPasswordModal(false);
      if (isDesktopApp()) {
        await saveDesktopCreds(creds);
        setS3Creds(creds);
        setMasterPassword('');
        loadS3Files(creds);
        navigate('/');
        alert('복원되었습니다.');
      } else if (webauthnPRFSupported) {
        await saveCredsWithWebAuthn(creds);
        setS3Creds(creds);
        setMasterPassword('');
        loadS3Files(creds);
        navigate('/');
        alert("복원되었습니다. 이 기기에서는 보안 키로 잠금 해제됩니다.");
      } else {
        await saveEncryptedSettings(creds, importPassword);
      }
    } catch (_e) {
      alert("비밀번호가 틀렸거나 파일이 손상되었습니다.");
    }
  };

  const handleSettingsClose = (formCreds) => {
    if (!isUnlocked && hasStoredCreds()) {
      alert("저장소 잠금 해제 후 닫을 수 있습니다.");
      return;
    }
    if (formCreds != null && isCredsDirty(formCreds, s3Creds)) {
      setShowUnsavedConfirmModal(true);
      return;
    }
    if (workspaceTabsEnabledRef.current) {
      const hasSettings = workspaceTabsRef.current.tabs.some((t) => t.kind === 'settings');
      if (hasSettings) {
        closeWorkspaceTabById(SETTINGS_TAB_ID);
        return;
      }
    }
    navigate('/');
  };

  const handleUnsavedConfirmLeave = () => {
    setShowUnsavedConfirmModal(false);
    if (workspaceTabsEnabledRef.current) {
      const hasSettings = workspaceTabsRef.current.tabs.some((t) => t.kind === 'settings');
      if (hasSettings) {
        closeWorkspaceTabById(SETTINGS_TAB_ID, { skipHistory: false });
        return;
      }
    }
    navigate('/');
  };

  const handleSuffixChangeConfirm = async () => {
    const trimmed = (editedFileName ?? '').trim();
    if (!trimmed || !currentFile) {
      setShowSuffixChangeConfirmModal(false);
      return;
    }
    const isRenameAndSave = suffixConfirmAction === 'renameAndSave';
    setShowSuffixChangeConfirmModal(false);
    try {
      const updated = await renameCurrentFileFullName(trimmed);
      if (isRenameAndSave && updated) {
        await saveFile(updated);
      }
    } catch {
      // rename/save errors already handled inside
    }
  };

  const handleSuffixChangeCancel = () => {
    setShowSuffixChangeConfirmModal(false);
    if (suffixConfirmAction === 'renameOnly') {
      setEditedFileName(currentFile?.name ?? '');
    }
  };

  const hasUnsavedEditorChanges = useCallback(() => {
    if (suppressUnsavedNavGuardRef.current) return false;
    // Flush mirrors into a copy for accurate dirty check across tabs.
    const flushed = flushEditorIntoActiveFileTab(workspaceTabsRef.current, {
      editorContent: editorContentRef.current ?? '',
      currentFile: currentFileRef.current,
      editedFileName: editedFileNameRef.current ?? '',
    });
    if (anyFileTabDirty(flushed.tabs)) return true;
    const file = currentFileRef.current;
    if (!file) return false;
    const editable = ['markdown', 'json', 'raw', 'html', 'svg'].includes(file.viewer || 'markdown');
    return editable && file.content !== editorContentRef.current;
  }, []);

  const allowWorkspaceTabNavigation = useCallback(({ currentLocation, nextLocation }) => {
    if (!workspaceTabsEnabledRef.current) return false;
    const isShell = (pathname) => {
      const p = String(pathname || '');
      return (
        p === '/' ||
        p === '/chat' ||
        p.endsWith('/chat') ||
        p === '/settings' ||
        p.endsWith('/settings') ||
        p.startsWith('/view/')
      );
    };
    return isShell(currentLocation.pathname) && isShell(nextLocation.pathname);
  }, []);

  const navGuard = useUnsavedNavigationGuard({
    isDirty: hasUnsavedEditorChanges,
    shouldAllowNavigation: allowWorkspaceTabNavigation,
  });

  const revokeOpenFileObjectUrl = (file) => {
    if (
      file &&
      (file.viewer === 'image' || file.viewer === 'pdf' || file.viewer === 'audio' || file.viewer === 'video') &&
      file.objectUrl
    ) {
      URL.revokeObjectURL(file.objectUrl);
    }
  };

  const clearOpenFileState = useCallback(() => {
    // Close active file tab only (or clear mirrors when no tab model match).
    const active = getActiveFileTab(workspaceTabsRef.current);
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
    clearLastOpenedFile();
  }, [clearLastOpenedFile, closeWorkspaceTabById]);

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
    setLastAutoSaveAt(Date.now());
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
  const handleBrandClick = async () => {
    const flushed = flushEditorIntoActiveFileTab(workspaceTabsRef.current, {
      editorContent: editorContentRef.current ?? '',
      currentFile: currentFileRef.current,
      editedFileName: editedFileNameRef.current ?? '',
    });
    const leaving = getActiveFileTab(flushed);
    if (leaving && isFileTabDirty(leaving) && leaving.storageType !== SESSION_STORAGE_TYPE) {
      maybeAutoSaveOnFocusChange(leaving.currentFile, leaving.editorContent);
    } else if (leaving?.storageType === SESSION_STORAGE_TYPE) {
      flushSessionEditorToWorkspace();
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
      closeCurrentFile();
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
    closeCurrentFile();
  };

  const handleNavGuardConfirmSave = async () => {
    await saveFileRef.current?.(null, { skipSuffixCheck: true });
    navGuard.proceed();
  };

  const handleNavGuardConfirmDiscard = () => {
    navGuard.proceed();
  };

  // 3. S3 Actions — getS3Client / getBackendForType / load* owned by VaultProvider (useVault)

  const advancedSearchTreesRef = useRef({
    storageMode,
    s3Tree,
    localTree,
    webdavTree,
    sessionWorkspace,
  });
  advancedSearchTreesRef.current = {
    storageMode,
    s3Tree,
    localTree,
    webdavTree,
    sessionWorkspace,
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
    void (async () => {
      // Load existing index if any — never auto-rebuild when missing.
      // Checkpoint presence is refreshed so Settings can offer resume vs fresh.
      await advancedSearchEngine.ensureLoaded();
      if (cancelled) return;
      await advancedSearchEngine.refreshCheckpointStatus();
    })();
    return () => {
      cancelled = true;
    };
  }, [isUnlocked, storageMode, getBackendForType, localRootHandle, s3Creds.bucket, webdavConfig]);

  const getAdvancedSearchTrees = useCallback(() => {
    const cur = advancedSearchTreesRef.current;
    const trees = [];
    if (cur.storageMode === STORAGE_MODE_LOCAL) trees.push(cur.localTree);
    else if (cur.storageMode === STORAGE_MODE_WEBDAV) trees.push(cur.webdavTree);
    else trees.push(cur.s3Tree);
    if (cur.sessionWorkspace) {
      trees.push(buildSessionTree(cur.sessionWorkspace));
    }
    return trees;
  }, []);

  // webdavReady owned by VaultProvider (useVault)

  const resolveClosedFileNode = useCallback(
    async (entry) => {
      if (entry.kind !== 'file') return null;
      const { storageType, path } = entry;
      const fallbackName =
        entry.name || path.split('/').filter(Boolean).pop() || 'file';
      if (storageType === 'local') {
        if (localVaultFsPath) {
          const node =
            findFileNodeByPath(localTree, path) ||
            findNodeByPath(localTree, path) || {
              type: 'file',
              path,
              name: fallbackName,
            };
          return node?.type === 'file' ? node : null;
        }
        if (!localRootHandle) {
          throw new Error('Local storage not ready');
        }
        const node =
          findFileNodeByPath(localTree, path) ||
          findNodeByPath(localTree, path) ||
          (await resolveLocalFileNode(localRootHandle, path));
        return node?.type === 'file' ? node : null;
      }
      if (storageType === 'webdav') {
        if (!webdavReady || !webdavConfig) {
          throw new Error('WebDAV not ready');
        }
        const node =
          findFileNodeByPath(webdavTree, path) || findNodeByPath(webdavTree, path);
        if (node?.type === 'file') return node;
        const meta = await webdavHead(webdavConfig, path);
        if (!meta) return null;
        return {
          path,
          id: path,
          name: fallbackName,
          type: 'file',
        };
      }
      // s3
      const node = findFileNodeByPath(s3Tree, path) || findNodeByPath(s3Tree, path);
      if (node?.type === 'file') return node;
      const client = getS3Client();
      if (!client || !s3Creds?.bucket) {
        throw new Error('S3 not ready');
      }
      const meta = await headObject(client, s3Creds.bucket, path);
      if (!meta) return null;
      return {
        path,
        id: path,
        name: fallbackName,
        type: 'file',
      };
    },
    [
      localRootHandle,
      localVaultFsPath,
      localTree,
      webdavReady,
      webdavConfig,
      webdavTree,
      s3Tree,
      getS3Client,
      s3Creds?.bucket,
    ],
  );

  const reopenClosedWorkspaceTab = useCallback(async () => {
    if (!workspaceTabsEnabledRef.current) return;
    // Prefer explicitly closed tabs; then cold-start queue from last open list.
    for (;;) {
      const entry = popClosedTab() || popTabsRestoreQueue();
      if (!entry) return;
      if (entry.kind === 'chat') {
        openChatWorkspaceTab();
        return;
      }
      if (entry.kind === 'settings') {
        openSettingsWorkspaceTab();
        return;
      }
      try {
        const node = await resolveClosedFileNode(entry);
        if (!node) {
          // Missing — already popped; try older history.
          continue;
        }
        await selectFileRawRef.current?.(entry.storageType, node);
        return;
      } catch (err) {
        // Transient failure: put entry back and stop.
        console.error('Reopen closed tab failed:', err);
        pushClosedTab(entry);
        return;
      }
    }
  }, [openChatWorkspaceTab, openSettingsWorkspaceTab, resolveClosedFileNode]);

  const restorePersistedWorkspaceTabs = useCallback(
    async (persisted, options = {}) => {
      const { activeId: explicitActiveId = null, navigateActiveUrl = false } = options;
      if (!workspaceTabsEnabledRef.current || !persisted?.tabs?.length) return false;

      let restoredAny = false;
      for (const tab of persisted.tabs) {
        if (tab.kind === 'chat') {
          openChatWorkspaceTab({ navigateUrl: false });
          restoredAny = true;
          continue;
        }
        if (tab.kind === 'settings') {
          openSettingsWorkspaceTab({ navigateUrl: false });
          restoredAny = true;
          continue;
        }

        if (findFileTab(workspaceTabsRef.current, tab.type, tab.path)) {
          restoredAny = true;
          continue;
        }

        try {
          const node = await resolveClosedFileNode({
            kind: 'file',
            storageType: tab.type,
            path: tab.path,
          });
          if (node?.type !== 'file') continue;
          await selectFileRawRef.current?.(tab.type, node, { skipNavigate: true });
          restoredAny = true;
        } catch (err) {
          console.warn('Failed to restore workspace tab:', tab.path, err);
        }
      }

      const targetActiveId = explicitActiveId ?? persisted.activeId;
      if (targetActiveId === CHAT_TAB_ID) {
        if (workspaceTabsRef.current.tabs.some((tab) => tab.id === CHAT_TAB_ID)) {
          activateWorkspaceTab(CHAT_TAB_ID, { navigateUrl: navigateActiveUrl });
        }
        return restoredAny;
      }
      if (targetActiveId === SETTINGS_TAB_ID) {
        if (workspaceTabsRef.current.tabs.some((tab) => tab.id === SETTINGS_TAB_ID)) {
          activateWorkspaceTab(SETTINGS_TAB_ID, { navigateUrl: navigateActiveUrl });
        }
        return restoredAny;
      }

      if (typeof targetActiveId === 'string' && targetActiveId) {
        const activeExists = workspaceTabsRef.current.tabs.some((tab) => tab.id === targetActiveId);
        if (activeExists) {
          activateWorkspaceTab(targetActiveId, { navigateUrl: navigateActiveUrl });
        }
      }

      return restoredAny;
    },
    [activateWorkspaceTab, openChatWorkspaceTab, openSettingsWorkspaceTab, resolveClosedFileNode],
  );

  useEffect(() => {
    const onKeyDown = (e) => {
      if (!workspaceTabsEnabledRef.current) return;
      if (e.defaultPrevented || e.isComposing) return;
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;

      // Ctrl/Cmd+Shift+T — reopen most recently closed tab
      if (e.shiftKey && (e.key === 'T' || e.key === 't')) {
        e.preventDefault();
        e.stopPropagation();
        void reopenClosedWorkspaceTab();
        return;
      }

      // Ctrl/Cmd+W — close active tab
      if (!e.altKey && !e.shiftKey && (e.key === 'w' || e.key === 'W')) {
        e.preventDefault();
        e.stopPropagation();
        const activeId = workspaceTabsRef.current.activeId;
        if (activeId) closeWorkspaceTabById(activeId);
        return;
      }

      // Ctrl/Cmd+Tab / Ctrl/Cmd+Shift+Tab — cycle open tabs
      if (e.key === 'Tab') {
        e.preventDefault();
        e.stopPropagation();
        cycleWorkspaceTab(e.shiftKey ? -1 : 1);
      }
    };
    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [reopenClosedWorkspaceTab, closeWorkspaceTabById, cycleWorkspaceTab]);

  const { ready: chatStorageReady, ctx: chatStorageCtx } = useChatStorageCtx({
    storageMode,
    getS3Client,
    s3Bucket: s3Creds.bucket,
    localRootHandle,
    webdavConfig,
  });

  const getAdvancedSearchChatGroups = useCallback(async () => {
    if (!chatStorageReady || !chatStorageCtx) return [];
    try {
      const meta = await readMeta(chatStorageCtx);
      return sortGroupsKo(meta.groups || []);
    } catch (err) {
      console.warn('[advancedSearch] read chat groups failed', err);
      return [];
    }
  }, [chatStorageReady, chatStorageCtx]);

  const handleShareBlockingChange = useCallback((blocking) => {
    setShareBlockingAuth(Boolean(blocking));
  }, []);

  const handleShareComposeClaimed = useCallback((seed) => {
    if (seed?.body || seed?.files?.length) setShareGroupSend(seed);
  }, []);

  const handleShareGroupSendConsumed = useCallback(() => {
    setShareGroupSend(null);
  }, []);

  // refreshWebdavTree / loadWebdavFolderChildren / loadS3Files owned by VaultProvider

  // IndexedDB recording upload retry: on app start / network recovery (S3/WebDAV only)
  useEffect(() => {
    if (!isUnlocked) return;
    if (storageMode === 'local') {
      getRecordingQueueStats().then(setRecordingQueueStats).catch(() => {});
      return;
    }

    const refreshStats = () => getRecordingQueueStats().then(setRecordingQueueStats).catch(() => {});

    const kick = () => {
      if (storageMode === 's3') {
        const client = getS3Client();
        const bucket = s3Creds.bucket;
        if (!client || !bucket) return Promise.resolve();
        return drainRecordingUploadQueue({ client, bucket })
          .then((r) => {
            refreshStats();
            if (r?.processed > 0) loadS3Files();
          })
          .catch(() => {
            refreshStats();
          });
      }
      if (storageMode === 'webdav' && webdavReady) {
        const backend = createWebdavBackend(webdavConfig);
        const writeObject = ({ key, body, contentType }) => backend.writeBytes(key, body, contentType);
        return drainRecordingUploadQueue({ writeObject })
          .then((r) => {
            refreshStats();
            if (r?.processed > 0) refreshWebdavTree();
          })
          .catch(() => {
            refreshStats();
          });
      }
      return Promise.resolve();
    };

    refreshStats();
    kick();
    const onOnline = () => kick();
    window.addEventListener('online', onOnline);
    const pollId = window.setInterval(refreshStats, 2000);

    const beforeUnload = () => {
      try {
        if (storageMode === 's3') {
          const client = getS3Client();
          const bucket = s3Creds.bucket;
          if (client && bucket) drainRecordingUploadQueue({ client, bucket }).catch(() => {});
        } else if (storageMode === 'webdav' && webdavReady) {
          const backend = createWebdavBackend(webdavConfig);
          const writeObject = ({ key, body, contentType }) => backend.writeBytes(key, body, contentType);
          drainRecordingUploadQueue({ writeObject }).catch(() => {});
        }
      } catch (_) {}
    };
    window.addEventListener('beforeunload', beforeUnload);

    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('beforeunload', beforeUnload);
      window.clearInterval(pollId);
    };
  }, [isUnlocked, storageMode, webdavReady, webdavConfig, getS3Client, s3Creds.bucket, loadS3Files, refreshWebdavTree]);

  useEffect(() => {
    setPrintSettingsStore({ getS3Client, s3Creds, localRootHandle, storageMode, webdavConfig });
    setWebfontSettingsStore({ getS3Client, s3Creds, localRootHandle, storageMode, webdavConfig });
    setTableStyleSettingsStore({ getS3Client, s3Creds, localRootHandle, storageMode, webdavConfig });
    setCoverSettingsStore({ getS3Client, s3Creds, localRootHandle, storageMode, webdavConfig });
    setOgWorkerSettingsStore({ getS3Client, s3Creds, localRootHandle, storageMode, webdavConfig });
    setLlmPromptTemplatesStore({ getS3Client, s3Creds, localRootHandle, storageMode, webdavConfig });
    void loadWebfontsFromStorage().then((settings) => {
      notifyWebfontsChanged(settings);
    });
    void loadTableStylesFromStorage();
    void loadCoverSettingsFromStorage().then((settings) => {
      notifyCoverSettingsChanged(settings);
    });
    void loadOgWorkerSettingsFromStorage().then((settings) => {
      notifyOgWorkerSettingsChanged(settings);
    });
  }, [getS3Client, s3Creds, localRootHandle, storageMode, webdavConfig]);

  // Push existing IndexedDB AI templates to remote as soon as storage is ready
  useEffect(() => {
    if (!isUnlocked) return;
    const ready =
      (storageMode === 'local' && isLocalVaultReady(localRootHandle, localVaultFsPath)) ||
      (storageMode === 'webdav' && webdavReady) ||
      (storageMode === 's3' && s3Creds.bucket);
    if (!ready) return;
    syncLlmPromptTemplatesToRemote();
  }, [isUnlocked, storageMode, localRootHandle, localVaultFsPath, webdavReady, s3Creds.bucket]);

  const loadSnippetConfigFromS3 = useCallback(
    async (creds = s3Creds) => {
      const client = getS3Client(creds);
      if (!client || !creds?.bucket) return;
      try {
        const head = await headObject(client, creds.bucket, '.settings/snippets.json');
        if (!head) {
          setSnippetLoadedFromS3(true);
          return;
        }
        const { body } = await getObjectBody(client, creds.bucket, '.settings/snippets.json');
        const text = new TextDecoder('utf-8').decode(body);
        const parsed = JSON.parse(text);
        if (parsed && Array.isArray(parsed.snippets)) {
          setSnippetConfig({ snippets: parsed.snippets });
        }
        setSnippetLoadedFromS3(true);
      } catch (e) {
        console.error('Snippet settings load from S3 failed:', e);
        setSnippetLoadedFromS3(true);
      }
    },
    [getS3Client, s3Creds],
  );

  const loadSnippetConfigFromLocal = useCallback(async () => {
    if (!localRootHandle) return;
    try {
      const settingsDir = await localRootHandle.getDirectoryHandle('.settings', { create: false });
      const fileHandle = await settingsDir.getFileHandle('snippets.json', { create: false });
      const file = await fileHandle.getFile();
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (parsed && Array.isArray(parsed.snippets)) {
        setSnippetConfig({ snippets: parsed.snippets });
      }
      setSnippetLoadedFromLocal(true);
    } catch (_e) {
      // 없으면 무시
      setSnippetLoadedFromLocal(true);
    }
  }, [localRootHandle]);

  const loadSnippetConfigFromWebdav = useCallback(async () => {
    if (!webdavReady) return;
    try {
      const backend = createWebdavBackend(webdavConfig);
      const head = await backend.head('.settings/snippets.json');
      if (!head) {
        setSnippetLoadedFromWebdav(true);
        return;
      }
      const { text } = await backend.readText('.settings/snippets.json');
      const parsed = JSON.parse(text);
      if (parsed && Array.isArray(parsed.snippets)) {
        setSnippetConfig({ snippets: parsed.snippets });
      }
      setSnippetLoadedFromWebdav(true);
    } catch (e) {
      console.error('Snippet settings load from WebDAV failed:', e);
      setSnippetLoadedFromWebdav(true);
    }
  }, [webdavConfig, webdavReady]);

  // Snippet settings: load from active storage mode
  useEffect(() => {
    if (!scriptsLoaded || !isUnlocked) return;
    if (storageMode === 'local' && localRootHandle && !snippetLoadedFromLocal) {
      loadSnippetConfigFromLocal();
    } else if (storageMode === 'webdav' && webdavReady && !snippetLoadedFromWebdav) {
      loadSnippetConfigFromWebdav();
    } else if (storageMode === 's3' && s3Creds.bucket && !snippetLoadedFromS3) {
      loadSnippetConfigFromS3();
    }
  }, [
    scriptsLoaded,
    isUnlocked,
    storageMode,
    s3Creds.bucket,
    localRootHandle,
    webdavReady,
    snippetLoadedFromS3,
    snippetLoadedFromLocal,
    snippetLoadedFromWebdav,
    loadSnippetConfigFromS3,
    loadSnippetConfigFromLocal,
    loadSnippetConfigFromWebdav,
  ]);

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

  // Recording list + selected recording URL/sync load
  const currentFileId = currentFile?.id;
  const currentFileType = currentFile?.type;
  const currentFileViewer = currentFile?.viewer;
  useEffect(() => {
    const pathStorageTypes = ['s3', 'local', 'webdav'];
    if (
      currentFileId == null ||
      !pathStorageTypes.includes(currentFileType) ||
      currentFileViewer !== 'markdown'
    ) {
      setRecordingsList([]);
      setSelectedRecordingKey(null);
      setRecordingAudioUrl('');
      setRecordingSyncData([]);
      return;
    }
    const noteKey = currentFileId;
    const tree =
      currentFileType === 's3'
        ? s3Tree
        : currentFileType === 'webdav'
          ? webdavTree
          : localTree;
    const list = getRecordingKeysFromTree(tree, noteKey);
    setRecordingsList(list);
    setSelectedRecordingKey(list.length > 0 ? list[0].key : null);
  }, [currentFileId, currentFileType, currentFileViewer, s3Tree, localTree, webdavTree]);

  useEffect(() => {
    if (!selectedRecordingKey || !currentFileType) {
      setRecordingAudioUrl('');
      setRecordingSyncData([]);
      return;
    }
    const storageType = currentFileType;
    if (!['s3', 'local', 'webdav'].includes(storageType)) {
      setRecordingAudioUrl('');
      setRecordingSyncData([]);
      return;
    }
    const backend = getBackendForType(storageType);
    if (!backend) return;

    let revoked = false;
    (async () => {
      try {
        const url = await backend.getObjectUrl(selectedRecordingKey);
        if (!revoked) setRecordingAudioUrl(url || '');
      } catch {
        if (!revoked) setRecordingAudioUrl('');
      }
    })();

    const syncKey = getSyncKeyForRecording(selectedRecordingKey);
    if (syncKey) {
      (async () => {
        try {
          const { body } = await backend.readBytes(syncKey);
          const data = decodeSyncData(body);
          if (!revoked && Array.isArray(data)) setRecordingSyncData(data);
        } catch {
          try {
            const jsonKey = syncKey.replace(/\.sync\.pb$/, '.sync.json');
            const { body } = await backend.readBytes(jsonKey);
            const json = new TextDecoder('utf-8').decode(body);
            const data = JSON.parse(json);
            if (!revoked && Array.isArray(data)) setRecordingSyncData(data);
          } catch {
            if (!revoked) setRecordingSyncData([]);
          }
        }
      })();
    }

    return () => {
      revoked = true;
      setRecordingAudioUrl('');
      setRecordingSyncData([]);
    };
  }, [selectedRecordingKey, currentFileType, getBackendForType]);

  // Mobile: poll S3 every 30s and refresh if S3 has newer LastModified
  useEffect(() => {
    if (!isMobile || !s3Creds.bucket || !isUnlocked) return;
    const client = getS3Client();
    if (!client) return;

    const poll = async () => {
      try {
        const contents = await listObjectsV2(client, s3Creds.bucket, '');
        const newTree = buildS3Tree(contents);
        const oldMap = getFileLastModifiedMap(s3TreeRef.current);
        const newMap = getFileLastModifiedMap(newTree);
        const changedKeys = new Set();
        for (const [path, newDate] of newMap) {
          const oldDate = oldMap.get(path);
          if (!oldDate || newDate.getTime() > oldDate.getTime()) changedKeys.add(path);
        }
        setS3Tree(newTree);

        const cur = currentFileRef.current;
        if (cur?.type !== 's3' || !changedKeys.has(cur.id)) return;
        const newNode = findFileNodeByPath(newTree, cur.id);
        const newLastMod = newNode?.lastModified ? (newNode.lastModified instanceof Date ? newNode.lastModified : new Date(newNode.lastModified)) : null;

        const { body, ContentType } = await getObjectBody(client, s3Creds.bucket, cur.id);
        const ext = (cur.name?.split('.').pop() || '').toLowerCase();
        if (cur.viewer === 'markdown' || ext === 'md' || ext === 'markdown' || ext === '') {
          const text = new TextDecoder('utf-8').decode(body);
          setCurrentFile((prev) => (prev?.id === cur.id ? { ...prev, content: text, lastModified: newLastMod } : prev));
          setEditorContent((prevContent) => (currentFileRef.current?.id === cur.id ? text : prevContent));
        } else if (cur.viewer === 'json' || ext === 'json') {
          const raw = new TextDecoder('utf-8').decode(body);
          let display = raw;
          try {
            const parsed = JSON.parse(raw);
            display = JSON.stringify(parsed, null, 2);
          } catch { /* keep raw */ }
          setCurrentFile((prev) => (prev?.id === cur.id ? { ...prev, content: display, lastModified: newLastMod } : prev));
          setEditorContent((prevContent) => (currentFileRef.current?.id === cur.id ? display : prevContent));
        } else if (cur.viewer === 'html' || cur.viewer === 'svg' || ext === 'html' || ext === 'htm' || ext === 'svg') {
          const text = new TextDecoder('utf-8').decode(body);
          setCurrentFile((prev) => (prev?.id === cur.id ? { ...prev, content: text, lastModified: newLastMod } : prev));
          setEditorContent((prevContent) => (currentFileRef.current?.id === cur.id ? text : prevContent));
        } else if (cur.viewer === 'image' || cur.viewer === 'pdf' || cur.viewer === 'audio' || cur.viewer === 'video') {
          const mime = ContentType || (cur.viewer === 'pdf' ? 'application/pdf' : '');
          const blob = new Blob([body], { type: mime || undefined });
          const url = URL.createObjectURL(blob);
          setCurrentFile((prev) => {
            if (prev?.id !== cur.id) return prev;
            if (prev.objectUrl) URL.revokeObjectURL(prev.objectUrl);
            return { ...prev, objectUrl: url, lastModified: newLastMod };
          });
        }
      } catch {
        // ignore poll errors
      }
    };

    const t = setInterval(poll, 30000);
    poll();
    return () => clearInterval(t);
  }, [isMobile, s3Creds.bucket, isUnlocked, getS3Client]);

  // Mobile: poll WebDAV every 30s when in webdav mode
  useEffect(() => {
    if (!isMobile || storageMode !== 'webdav' || !webdavReady || !isUnlocked) return;

    const poll = async () => {
      try {
        const backend = createWebdavBackend(webdavConfig);
        const newTree = await backend.listAll();
        const oldMap = getFileLastModifiedMap(webdavTreeRef.current);
        const newMap = getFileLastModifiedMap(newTree);
        const changedKeys = new Set();
        for (const [path, newDate] of newMap) {
          const oldDate = oldMap.get(path);
          if (!oldDate || newDate.getTime() > oldDate.getTime()) changedKeys.add(path);
        }
        setWebdavTree(newTree);

        const cur = currentFileRef.current;
        if (cur?.type !== 'webdav' || !changedKeys.has(cur.id)) return;
        const newNode = findFileNodeByPath(newTree, cur.id);
        const newLastMod = newNode?.lastModified
          ? newNode.lastModified instanceof Date
            ? newNode.lastModified
            : new Date(newNode.lastModified)
          : null;

        const { text } = await backend.readText(cur.id);
        const ext = (cur.name?.split('.').pop() || '').toLowerCase();
        if (cur.viewer === 'markdown' || ext === 'md' || ext === 'markdown' || ext === '') {
          setCurrentFile((prev) => (prev?.id === cur.id ? { ...prev, content: text, lastModified: newLastMod } : prev));
          setEditorContent((prevContent) => (currentFileRef.current?.id === cur.id ? text : prevContent));
        } else if (cur.viewer === 'json' || ext === 'json') {
          let display = text;
          try {
            display = JSON.stringify(JSON.parse(text), null, 2);
          } catch { /* keep raw */ }
          setCurrentFile((prev) => (prev?.id === cur.id ? { ...prev, content: display, lastModified: newLastMod } : prev));
          setEditorContent((prevContent) => (currentFileRef.current?.id === cur.id ? display : prevContent));
        } else if (cur.viewer === 'html' || cur.viewer === 'svg' || ext === 'html' || ext === 'htm' || ext === 'svg') {
          setCurrentFile((prev) => (prev?.id === cur.id ? { ...prev, content: text, lastModified: newLastMod } : prev));
          setEditorContent((prevContent) => (currentFileRef.current?.id === cur.id ? text : prevContent));
        }
      } catch {
        // ignore poll errors
      }
    };

    const t = setInterval(poll, 30000);
    poll();
    return () => clearInterval(t);
  }, [isMobile, storageMode, webdavReady, webdavConfig, isUnlocked]);

  // Local folder load/open/refresh owned by VaultProvider (useVault)

  const getActiveStorageBackend = useCallback(() => {
    return createStorageBackend({
      mode:
        storageMode === STORAGE_MODE_LOCAL
          ? 'local'
          : storageMode === STORAGE_MODE_WEBDAV
            ? 'webdav'
            : 's3',
      getS3Client,
      s3Creds,
      localRootHandle,
      localVaultFsPath,
      webdavConfig,
    });
  }, [storageMode, getS3Client, s3Creds, localRootHandle, localVaultFsPath, webdavConfig]);

  const handleReadUnusedImageText = useCallback(
    async (path) => {
      const backend = getActiveStorageBackend();
      const { text } = await backend.readText(path);
      return text;
    },
    [getActiveStorageBackend],
  );

  const handleReadUnusedImageBytes = useCallback(
    async (path) => {
      const backend = getActiveStorageBackend();
      const { body } = await backend.readBytes(path);
      return body instanceof Uint8Array ? body : new Uint8Array(body);
    },
    [getActiveStorageBackend],
  );

  const handleDeleteUnusedImagePaths = useCallback(
    async (paths, mode) => {
      const list = (Array.isArray(paths) ? paths : []).filter(Boolean);
      if (!list.length) return;
      const backend = getActiveStorageBackend();
      for (const path of list) {
        try {
          if (mode === 'hard') {
            await backend.delete(path);
          } else {
            await backend.trash(path);
          }
        } catch (e) {
          if (e?.$metadata?.httpStatusCode === 404) continue;
          throw e;
        }
      }
      if (storageMode === STORAGE_MODE_LOCAL) await refreshLocalTree();
      else if (storageMode === STORAGE_MODE_WEBDAV) await refreshWebdavTree();
      else loadS3Files();
    },
    // refreshLocalTree is a stable-enough function declaration in this component body
    // eslint-disable-next-line react-hooks/exhaustive-deps -- refreshLocalTree recreated each render
    [getActiveStorageBackend, storageMode, refreshWebdavTree, loadS3Files, localRootHandle],
  );

  useEffect(() => {
    if (storageMode !== STORAGE_MODE_WEBDAV || !webdavReady || !isUnlocked) return;
    refreshWebdavTree();
  }, [storageMode, webdavReady, isUnlocked, refreshWebdavTree]);

  const handleConfirmRestoreLocalFolder = async () => {
    setShowRestoreLocalFolderModal(false);
    try {
      const handle = await tryRestoreLocalRootHandle();
      if (!handle) {
        setLocalFolderRestoreSettled(true);
        alert('폴더 접근 권한이 없습니다. 사이드바에서 폴더를 다시 선택해 주세요.');
        return;
      }
      setStorageMode(STORAGE_MODE_LOCAL);
      await attachLocalRootFolder(handle);
    } catch (e) {
      setLocalFolderRestoreSettled(true);
      alert(`폴더를 다시 열지 못했습니다: ${e?.message || e}`);
    }
  };

  // 5. File Read & Save
  const selectFile = useCallback(
    (type, node) => {
      void handleTreeNodeSelect(type, node, {});
    },
    [handleTreeNodeSelect],
  );

  const ensureAdvancedSearchBrowseFolder = useCallback(
    async (folderPath) => {
      if (!folderPath) return;
      if (storageMode === STORAGE_MODE_LOCAL) {
        const node =
          findNodeByPath(localTree, folderPath) ||
          findNodeByPath(localTree, folderPath.replace(/\/$/, '')) ||
          findNodeByPath(localTree, `${folderPath.replace(/\/$/, '')}/`);
        if (node?.type === 'folder') {
          await loadLocalFolderChildren(node);
        }
        return;
      }
      if (storageMode === STORAGE_MODE_WEBDAV) {
        const node =
          findNodeByPath(webdavTree, folderPath) ||
          findNodeByPath(webdavTree, folderPath.replace(/\/$/, '')) ||
          findNodeByPath(webdavTree, `${folderPath.replace(/\/$/, '')}/`);
        if (node?.type === 'folder') {
          await loadWebdavFolderChildren(node);
        }
      }
    },
    [storageMode, localTree, webdavTree, loadLocalFolderChildren, loadWebdavFolderChildren],
  );

  const ensureCreateModalFolderLoaded = useCallback(
    async (folderPath) => {
      const st = createModalContext?.storageType;
      if (!folderPath || !st) return;
      if (st === 'local') {
        const node =
          findNodeByPath(localTree, folderPath) ||
          findNodeByPath(localTree, folderPath.replace(/\/$/, '')) ||
          findNodeByPath(localTree, `${folderPath.replace(/\/$/, '')}/`);
        if (node?.type === 'folder') {
          await loadLocalFolderChildren(node);
        }
        return;
      }
      if (st === 'webdav') {
        const node =
          findNodeByPath(webdavTree, folderPath) ||
          findNodeByPath(webdavTree, folderPath.replace(/\/$/, '')) ||
          findNodeByPath(webdavTree, `${folderPath.replace(/\/$/, '')}/`);
        if (node?.type === 'folder') {
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
    async (storageType, node) => {
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

    setCurrentFile((prev) => {
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
    const openIds = new Set();
    if (typeof source.activeId === 'string' && source.activeId) {
      openIds.add(source.activeId);
    } else {
      const first = source.tabs[0];
      if (first?.kind === 'chat') openIds.add(CHAT_TAB_ID);
      else if (first?.kind === 'settings') openIds.add(SETTINGS_TAB_ID);
      else if (first?.kind === 'file') openIds.add(`${first.type}:${first.path}`);
    }
    seedTabsRestoreQueueFromSnapshot(source, openIds);
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

    const processPaths = async (paths) => {
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
          await openSessionWorkspace(route.workspace);
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
  }, [isUnlocked, selectFileRaw, openSessionWorkspace]);

  // Open file from ?open=, /view/* or /export-pdf/* route, or last-file cache once storage is ready.
  useEffect(() => {
    if (!isUnlocked || hasProcessedOpenFromUrlRef.current) return;

    const onChat =
      location.pathname === '/chat' || location.pathname.endsWith('/chat');
    const onSettings = isSettingsAppPathname(location.pathname);
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
        // Restore chat/settings shell immediately; files open asynchronously below when possible.
        if (workspaceTabsEnabledRef.current) {
          if (persisted.tabs.some((t) => t.kind === 'chat')) {
            openChatWorkspaceTab({ navigateUrl: false });
          }
          if (persisted.tabs.some((t) => t.kind === 'settings')) {
            openSettingsWorkspaceTab({ navigateUrl: false });
          }
        }
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
        const saved = loadLastOpenedFile();
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
      if (node?.type === 'file') {
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
    loadLastOpenedFile,
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
        await restorePersistedWorkspaceTabs(persisted, {
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
    restorePersistedWorkspaceTabs,
  ]);

  // Open settings as a workspace tab whenever /settings is hit (incl. locked first-run).
  useEffect(() => {
    if (!isSettingsAppPathname(location.pathname)) return;
    if (!workspaceTabsEnabledRef.current) return;
    openSettingsWorkspaceTab({ navigateUrl: false });
  }, [location.pathname, openSettingsWorkspaceTab]);

  // Keep the open note in sync with browser history (back/forward, history.back, …).
  useEffect(() => {
    if (!isUnlocked || !hasProcessedOpenFromUrlRef.current) return;
    if (isChatAppPathname(location.pathname) || isSettingsAppPathname(location.pathname)) {
      if (workspaceTabsEnabledRef.current) {
        if (isChatAppPathname(location.pathname)) {
          openChatWorkspaceTab({ navigateUrl: false });
        } else {
          openSettingsWorkspaceTab({ navigateUrl: false });
        }
      }
      return;
    }

    const routeNotePath = parseOpenNotePathFromAppPathname(location.pathname);
    if (!routeNotePath) {
      // Bare /export-pdf keeps whatever was opened via navigation state.
      if (isExportPdfAppPathname(location.pathname)) return;
      prevHistoryViewPathRef.current = null;
      // Bare `/` does not close workspace tabs (tab bar owns lifecycle).
      return;
    }

    if (currentFileRef.current?.id === routeNotePath) {
      prevHistoryViewPathRef.current = routeNotePath;
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

    const routeChanged = prevHistoryViewPathRef.current !== routeNotePath;
    prevHistoryViewPathRef.current = routeNotePath;

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
      if (node?.type === 'file') {
        await selectFileRawRef.current?.(type, node, { skipNavigate: true });
        return;
      }
      // Tree refresh after rename updates the open file id but not the URL yet.
      // Only close when the route itself changed to a missing path (back/forward).
      if (routeChanged && currentFileRef.current) clearOpenFileState();
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
        const tree = await readTauriLocalDirectoryTree(abs);
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


  const handleViewUnsupportedAsText = async () => {
    if (!currentFile || currentFile.viewer !== 'unsupported') return;
    if (currentFile.type === 's3') {
      try {
        const client = getS3Client();
        if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
        const { body, ContentLength } = await getObjectBody(client, s3Creds.bucket, currentFile.id);
        const content = new TextDecoder('utf-8').decode(body);
        setCurrentFile((prev) => ({
          ...prev,
          content,
          viewer: 'raw',
          size: typeof ContentLength === 'number' ? ContentLength : prev?.size ?? null,
        }));
        setEditorContent(content);
      } catch (e) {
        console.error('S3 파일 로드 실패:', e);
        alert('파일을 텍스트로 불러오지 못했습니다.');
      }
    } else if (currentFile.type === SESSION_STORAGE_TYPE) {
      const record = sessionWorkspaceRef.current?.files?.[currentFile.id];
      if (!record) {
        alert('파일을 텍스트로 불러오지 못했습니다.');
        return;
      }
      const content = decodeSessionText(record.bytes);
      setCurrentFile((prev) => ({
        ...prev,
        content,
        viewer: 'raw',
        size: record.bytes.byteLength,
      }));
      setEditorContent(content);
    } else if (currentFile.type === 'local' && currentFile.handle) {
      try {
        const content = await currentFile.handle.getFile().then((f) => f.text());
        setCurrentFile((prev) => ({
          ...prev,
          content,
          viewer: 'raw',
          size: typeof content === 'string' ? new TextEncoder().encode(content).length : prev?.size ?? null,
        }));
        setEditorContent(content);
      } catch (e) {
        console.error('Local file load failed:', e);
        alert('파일을 텍스트로 불러오지 못했습니다.');
      }
    } else if (currentFile.type === 'webdav') {
      try {
        const backend = createWebdavBackend(webdavConfig);
        const { text, contentLength } = await backend.readText(currentFile.id);
        setCurrentFile((prev) => ({
          ...prev,
          content: text,
          viewer: 'raw',
          size: typeof contentLength === 'number' ? contentLength : prev?.size ?? null,
        }));
        setEditorContent(text);
      } catch (e) {
        console.error('WebDAV file load failed:', e);
        alert('파일을 텍스트로 불러오지 못했습니다.');
      }
    }
  };

  const handleRequestDownload = () => {
    setDownloadModalMode('default');
    setShowDownloadMethodModal(true);
    setDownloadProgress(0);
    setDownloadComplete(false);
  };

  const handleRequestSessionSaveChooser = () => {
    setDownloadModalMode('session-save');
    setShowDownloadMethodModal(true);
    setDownloadProgress(0);
    setDownloadComplete(false);
  };

  const handleRequestSessionTransformDownload = () => {
    setDownloadModalMode('session-transform');
    setShowDownloadMethodModal(true);
    setDownloadProgress(0);
    setDownloadComplete(false);
  };

  const readSessionBytes = async (path) => {
    const ws = sessionWorkspaceRef.current;
    const cur = currentFileRef.current;
    const candidates = [
      path,
      String(path || '').replace(/^\/+/, ''),
      cur?.id ? resolveStorageImagePath(path, cur.id) : null,
    ].filter(Boolean);
    for (const key of candidates) {
      const record = ws?.files?.[key];
      if (record) return record.bytes;
    }
    throw new Error(`이미지를 찾지 못했습니다: ${path}`);
  };

  const connectedHaimStorageType = () => {
    if (storageMode === 'local') return 'local';
    if (storageMode === 'webdav') return 'webdav';
    return 's3';
  };

  const isConnectedHaimReady = () => {
    if (storageMode === 's3') return Boolean(s3Creds.bucket);
    if (storageMode === 'local') return Boolean(localRootHandle);
    if (storageMode === 'webdav') return Boolean(webdavReady);
    return false;
  };

  const writeSessionFileToHaim = async ({
    destPath,
    sessionFile = null,
    content = null,
    confirmOverwrite = false,
  }) => {
    const storageType = connectedHaimStorageType();
    const file = sessionFile || currentFileRef.current;
    if (!file || file.type !== SESSION_STORAGE_TYPE) {
      throw new Error('다운로드 세션 파일이 없습니다.');
    }
    const textToSave = content != null ? String(content) : editorContentRef.current ?? '';
    const isActive =
      currentFileRef.current?.type === SESSION_STORAGE_TYPE &&
      currentFileRef.current?.id === file.id;
    if (isActive) {
      flushSessionEditorToWorkspace();
    } else if (sessionWorkspaceRef.current) {
      const next = updateSessionFileText(sessionWorkspaceRef.current, file.id, textToSave);
      sessionWorkspaceRef.current = next;
      setSessionWorkspace(next);
    }

    const backend = getBackendForType(storageType);
    if (confirmOverwrite) {
      const existing = await backend.head?.(destPath);
      if (existing && !window.confirm(`이미 있는 파일입니다. 덮어쓸까요?\n${destPath}`)) {
        return { cancelled: true };
      }
    }

    const viewer = file.viewer || 'markdown';
    const destName =
      String(destPath || '')
        .split('/')
        .filter(Boolean)
        .pop() ||
      file.name ||
      'untitled.md';
    const isMd =
      isMarkdownFileName(destName) || isMarkdownFileName(file.name) || viewer === 'markdown';

    let vaultText = textToSave;
    if (isMd) {
      const prepared = await prepareSessionMarkdownForVault({
        markdown: textToSave,
        sessionNotePath: file.id || destName,
        destNotePath: destPath,
        readBytes: readSessionBytes,
      });
      vaultText = prepared.markdown;
      await backend.writeText(destPath, prepared.markdown, 'text/markdown; charset=utf-8');
      for (const image of prepared.images) {
        await backend.writeBytes(image.path, image.data, mimeForSessionFileName(image.path));
      }
      if (prepared.missing.length) alert(formatMissingExportImagesMessage(prepared.missing));
    } else {
      const contentTypeForViewer =
        viewer === 'json'
          ? 'application/json'
          : viewer === 'raw'
            ? 'text/plain'
            : viewer === 'html'
              ? 'text/html'
              : viewer === 'svg'
                ? 'image/svg+xml'
                : 'text/plain';
      await backend.writeText(destPath, textToSave, contentTypeForViewer);
    }

    if (storageType === 's3') loadS3Files();
    else if (storageType === 'local') await refreshLocalTree();
    else await refreshWebdavTree();

    if (file.id) {
      sessionVaultBindingsRef.current[file.id] = { destPath, storageType };
    }

    const savedByteLength = new TextEncoder().encode(textToSave).length;
    if (isActive) {
      setCurrentFile((prev) => {
        if (!prev || prev.type !== SESSION_STORAGE_TYPE || prev.id !== file.id) return prev;
        const next = { ...prev, content: textToSave, size: savedByteLength };
        currentFileRef.current = next;
        return next;
      });
      setLastAutoSaveAt(Date.now());
    }

    const existingTab = findFileTab(workspaceTabsRef.current, SESSION_STORAGE_TYPE, file.id);
    if (existingTab) {
      const tabId = `${SESSION_STORAGE_TYPE}:${file.id}`;
      const patch = {
        currentFile: {
          ...existingTab.currentFile,
          content: textToSave,
          size: savedByteLength,
        },
        baselineContent: textToSave,
      };
      if (existingTab.editorContent === textToSave) {
        patch.editorContent = textToSave;
      }
      const patched = patchFileTab(workspaceTabsRef.current, tabId, patch);
      workspaceTabsRef.current = patched;
      setWorkspaceTabs(patched);
    }

    notifyAdvancedSearchChange({
      type: 'file',
      path: destPath,
      content: vaultText,
    });
    setOperationStatus(`노트 저장 완료: ${destPath}`);
    return { cancelled: false, destPath };
  };
  writeSessionFileToHaimRef.current = writeSessionFileToHaim;

  const applySessionMarkdownExportOptions = async ({
    imageMode = 'files',
    imageSyntax = 'markdown',
    headingMax = 1,
    tableFormat = 'haim',
  } = {}) => {
    flushSessionEditorToWorkspace();
    const cur = currentFileRef.current;
    if (!cur || cur.type !== SESSION_STORAGE_TYPE) return null;
    const fileName = cur.name || 'untitled.md';
    if (!isMarkdownFileName(fileName)) {
      return { cur, fileName, bundled: null };
    }
    let markdown = remapMarkdownHeadingLevels(editorContentRef.current ?? '', headingMax);
    if (tableFormat === 'html') {
      const { convertHaimTablesToHtmlInMarkdown } = await import('@/utils/haimTable/toHtml');
      markdown = convertHaimTablesToHtmlInMarkdown(markdown, (id) =>
        getCachedTableStyleTemplate(id),
      );
    }
    const effectiveSyntax = imageMode === 'base64' ? 'markdown' : imageSyntax;
    const bundled = await bundleSessionMarkdownImages({
      markdown,
      notePath: cur.id,
      readBytes: readSessionBytes,
      imageSyntax: effectiveSyntax,
    });
    return { cur, fileName, bundled };
  };

  const downloadSessionTransformed = async ({
    imageMode = 'files',
    imageSyntax = 'markdown',
    headingMax = 1,
    tableFormat = 'haim',
  } = {}) => {
    const prepared = await applySessionMarkdownExportOptions({
      imageMode,
      imageSyntax,
      headingMax,
      tableFormat,
    });
    if (!prepared) return;
    const { fileName, bundled } = prepared;
    if (!bundled) {
      await downloadSessionWorkspace();
      return;
    }
    if (imageMode === 'base64') {
      const markdown = bundled.images.length
        ? embedMarkdownImagesAsDataUris(bundled.markdown, bundled.images)
        : bundled.markdown;
      triggerBlobDownload(new Blob([markdown], { type: 'text/markdown;charset=utf-8' }), fileName);
    } else if (bundled.images.length) {
      const zipBlob = await buildZipBlob(
        buildMarkdownImageZipEntries(fileName, bundled.markdown, bundled.images),
      );
      triggerBlobDownload(zipBlob, zipFileNameForMarkdown(fileName));
    } else {
      triggerBlobDownload(
        new Blob([bundled.markdown], { type: 'text/markdown;charset=utf-8' }),
        fileName,
      );
    }
    const missingMessage = formatMissingExportImagesMessage(bundled.missing);
    if (missingMessage) alert(missingMessage);
    setOperationStatus('다운로드 완료');
  };

  const writeSessionWorkspaceToDirectory = async (dirHandle, workspace, onProgress) => {
    const records = Object.values(workspace?.files || {});
    const total = Math.max(records.length, 1);
    let done = 0;
    for (const record of records) {
      if (!record) continue;
      const parts = String(record.path || record.name || 'file')
        .replace(/\\/g, '/')
        .split('/')
        .filter(Boolean);
      const fileName = parts.pop() || 'file';
      let dir = dirHandle;
      for (const part of parts) {
        dir = await dir.getDirectoryHandle(part, { create: true });
      }
      const uniqueName = await allocateUniqueFileSystemName(dir, fileName);
      const fileHandle = await dir.getFileHandle(uniqueName, { create: true });
      const writable = await fileHandle.createWritable();
      try {
        await writable.write(record.bytes);
      } finally {
        await writable.close();
      }
      done += 1;
      onProgress?.(Math.min(100, Math.round((done / total) * 100)));
    }
  };

  const handleRequestSaveSessionToNote = () => {
    if (!isConnectedHaimReady()) {
      alert(
        storageMode === 'local'
          ? '로컬 폴더를 먼저 열어 주세요.'
          : '저장소를 먼저 연결해 주세요.',
      );
      return;
    }
    setShowSaveSessionToNoteModal(true);
  };

  const handleSelectHaimFromDownload = () => {
    setShowDownloadMethodModal(false);
    setDownloadModalMode('default');
    const cur = currentFileRef.current;
    if (!cur || cur.type !== SESSION_STORAGE_TYPE) return;
    const binding = sessionVaultBindingsRef.current[cur.id];
    if (
      binding?.destPath &&
      binding.storageType === connectedHaimStorageType() &&
      isConnectedHaimReady()
    ) {
      void (async () => {
        try {
          await writeSessionFileToHaimRef.current?.({
            destPath: binding.destPath,
            sessionFile: cur,
          });
        } catch (error) {
          console.error('Save session to Haim failed:', error);
          alert('노트 저장에 실패했습니다: ' + (error?.message || error));
        }
      })();
      return;
    }
    handleRequestSaveSessionToNote();
  };

  const handleConfirmSaveSessionToNote = async ({ path, fileName }) => {
    let finalName = String(fileName || '').trim() || 'untitled.md';
    if (!/\.[^./\\]+$/.test(finalName)) finalName += '.md';
    if (finalName.includes('/') || finalName.includes('\\')) {
      alert('파일명에 / 를 넣을 수 없습니다.');
      return;
    }
    const destPath = `${path || ''}${finalName}`;
    setIsSavingSessionToNote(true);
    try {
      const result = await writeSessionFileToHaim({
        destPath,
        confirmOverwrite: true,
      });
      if (result?.cancelled) return;
      setShowSaveSessionToNoteModal(false);
      showAlert({
        title: '내 노트에 저장',
        message: '노트를 저장했습니다.',
        detail: destPath,
      });
    } catch (error) {
      console.error('Save session to note failed:', error);
      alert('노트 저장에 실패했습니다: ' + (error?.message || error));
    } finally {
      setIsSavingSessionToNote(false);
    }
  };

  const readBackendBytes = async (storageType, path) => {
    const backend = getBackendForType(storageType);
    const { body } = await backend.readBytes(path);
    return body instanceof Uint8Array ? body : new Uint8Array(body);
  };

  const downloadMarkdownImageZip = async (
    storageType,
    notePath,
    fileName,
    markdownText,
    imageSyntax = 'markdown',
  ) => {
    const plan = planMarkdownImageExport(markdownText, notePath, { syntax: imageSyntax });
    if (!plan.images.length) return false;
    const { entries, missing } = await collectMarkdownExportImageBytes(plan.images, (path) =>
      readBackendBytes(storageType, path),
    );
    const zipBlob = await buildZipBlob(buildMarkdownImageZipEntries(fileName, plan.markdown, entries));
    triggerBlobDownload(zipBlob, zipFileNameForMarkdown(fileName));
    const missingMessage = formatMissingExportImagesMessage(missing);
    if (missingMessage) alert(missingMessage);
    return true;
  };

  const downloadMarkdownImageBase64 = async (storageType, notePath, fileName, markdownText) => {
    const built = await buildMarkdownImageBase64Content(storageType, notePath, markdownText);
    if (!built) return false;
    triggerBlobDownload(
      new Blob([built.markdown], { type: 'text/markdown;charset=utf-8' }),
      fileName,
    );
    const missingMessage = formatMissingExportImagesMessage(built.missing);
    if (missingMessage) alert(missingMessage);
    return true;
  };

  /** Build single-MD (base64-embedded) markdown for download or clipboard. */
  const buildMarkdownImageBase64Content = async (storageType, notePath, markdownText) => {
    const plan = planMarkdownImageExport(markdownText, notePath, { syntax: 'markdown' });
    if (!plan.images.length) {
      return { markdown: plan.markdown || markdownText, missing: [] };
    }
    const { entries, missing } = await collectMarkdownExportImageBytes(plan.images, (path) =>
      readBackendBytes(storageType, path),
    );
    return {
      markdown: embedMarkdownImagesAsDataUris(plan.markdown, entries),
      missing,
    };
  };

  const copyMarkdownTextToClipboard = async (markdown) => {
    const ok = await copyText(markdown, {
      message: '파일이 클립보드에 복사되었습니다',
      icon: 'copy',
    });
    if (!ok) {
      alert('클립보드 복사에 실패했습니다.');
      return false;
    }
    return true;
  };

  /** Clipboard delivery for "단일 MD에 포함" (base64) export. */
  const handleCopyCurrentFileToClipboard = async ({
    imageMode = 'base64',
    headingMax = 1,
    tableFormat = 'haim',
  } = {}) => {
    if (!currentFile) return;
    if (imageMode !== 'base64') return;
    const storageType = currentFile.type;
    const fileName = currentFile.name || currentFile.id?.split('/').filter(Boolean).pop() || 'download';
    if (!isMarkdownFileName(fileName)) return;

    try {
      if (storageType === SESSION_STORAGE_TYPE) {
        flushSessionEditorToWorkspace();
        const cur = currentFileRef.current;
        if (!cur || cur.type !== SESSION_STORAGE_TYPE) return;
        const bundled = await bundleSessionMarkdownImages({
          markdown: remapMarkdownHeadingLevels(editorContentRef.current ?? '', headingMax),
          notePath: cur.id,
          readBytes: readSessionBytes,
          imageSyntax: 'markdown',
        });
        const markdown = bundled.images.length
          ? embedMarkdownImagesAsDataUris(bundled.markdown, bundled.images)
          : bundled.markdown;
        const copied = await copyMarkdownTextToClipboard(markdown);
        if (!copied) return;
        const missingMessage = formatMissingExportImagesMessage(bundled.missing);
        if (missingMessage) alert(missingMessage);
        setOperationStatus('클립보드에 복사 완료');
        setShowDownloadMethodModal(false);
        setDownloadModalMode('default');
        return;
      }

      if (storageType !== 's3' && storageType !== 'local' && storageType !== 'webdav') return;
      const notePath = currentFile.id || '';
      const backend = getBackendForType(storageType);
      const { text } = await backend.readText(notePath);
      let markdown = remapMarkdownHeadingLevels(text, headingMax);
      if (tableFormat === 'html') {
        const { convertHaimTablesToHtmlInMarkdown } = await import('@/utils/haimTable/toHtml');
        markdown = convertHaimTablesToHtmlInMarkdown(markdown, (id) =>
          getCachedTableStyleTemplate(id),
        );
      }
      const built = await buildMarkdownImageBase64Content(storageType, notePath, markdown);
      const copied = await copyMarkdownTextToClipboard(built.markdown);
      if (!copied) return;
      const missingMessage = formatMissingExportImagesMessage(built.missing);
      if (missingMessage) alert(missingMessage);
      setShowDownloadMethodModal(false);
      setDownloadModalMode('default');
    } catch (e) {
      console.error('클립보드 복사 실패:', e);
      alert('클립보드 복사에 실패했습니다: ' + (e?.message || e));
    }
  };

  /** Object URL 방식: 메모리 제한 ~100–200MB. presigned URL 인코딩 이슈 회피 */
  const handleDownloadCurrentFile = async ({
    imageMode = 'files',
    imageSyntax = 'markdown',
    headingMax = 1,
    tableFormat = 'haim',
  } = {}) => {
    if (!currentFile) return;
    const storageType = currentFile.type;
    if (storageType === SESSION_STORAGE_TYPE) {
      try {
        if (downloadModalMode === 'session-transform') {
          await downloadSessionTransformed({ imageMode, imageSyntax, headingMax, tableFormat });
        } else if (isMarkdownFileName(currentFile.name || currentFile.id)) {
          await downloadSessionTransformed({ imageMode, imageSyntax, headingMax, tableFormat });
        } else {
          await downloadSessionWorkspace();
        }
      } catch (e) {
        console.error('세션 다운로드 실패:', e);
        alert('다운로드에 실패했습니다: ' + (e?.message || e));
      }
      setShowDownloadMethodModal(false);
      setDownloadModalMode('default');
      return;
    }
    if (storageType !== 's3' && storageType !== 'local' && storageType !== 'webdav') return;
    const fileName = currentFile.name || currentFile.id?.split('/').filter(Boolean).pop() || 'download';
    const notePath = currentFile.id || '';
    try {
      if (isMarkdownFileName(fileName)) {
        const backend = getBackendForType(storageType);
        const { text } = await backend.readText(notePath);
        let markdown = remapMarkdownHeadingLevels(text, headingMax);
        if (tableFormat === 'html') {
          const { convertHaimTablesToHtmlInMarkdown } = await import('@/utils/haimTable/toHtml');
          markdown = convertHaimTablesToHtmlInMarkdown(markdown, (id) =>
            getCachedTableStyleTemplate(id),
          );
        }
        const effectiveSyntax = imageMode === 'base64' ? 'markdown' : imageSyntax;
        const bundled =
          imageMode === 'base64'
            ? await downloadMarkdownImageBase64(storageType, notePath, fileName, markdown)
            : await downloadMarkdownImageZip(
                storageType,
                notePath,
                fileName,
                markdown,
                effectiveSyntax,
              );
        if (!bundled) {
          triggerBlobDownload(new Blob([markdown], { type: 'text/markdown;charset=utf-8' }), fileName);
        }
      } else {
        const body = await readBackendBytes(storageType, notePath);
        triggerBlobDownload(new Blob([body]), fileName);
      }
    } catch (e) {
      console.error('파일 다운로드 실패:', e);
      alert('파일 다운로드에 실패했습니다: ' + (e?.message || e));
    }
    setShowDownloadMethodModal(false);
  };

  const saveSnippetConfigToS3 = useCallback(
    async (config) => {
      const client = getS3Client();
      if (!client || !s3Creds.bucket) return;
      try {
        await putObject(client, {
          Bucket: s3Creds.bucket,
          Key: '.settings/snippets.json',
          Body: JSON.stringify(config ?? { snippets: [] }, null, 2),
          ContentType: 'application/json',
          CacheControl: 'no-cache, no-store, must-revalidate',
        });
      } catch (e) {
        console.error('Snippet settings save to S3 failed:', e);
        throw e;
      }
    },
    [getS3Client, s3Creds],
  );

  const saveSnippetConfigToLocal = useCallback(
    async (config) => {
      if (!localRootHandle) return;
      try {
        const settingsDir = await localRootHandle.getDirectoryHandle('.settings', { create: true });
        const fileHandle = await settingsDir.getFileHandle('snippets.json', { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(JSON.stringify(config ?? { snippets: [] }, null, 2));
        await writable.close();
      } catch (e) {
        console.error('Snippet settings save to local failed:', e);
      }
    },
    [localRootHandle],
  );

  const handleChangeSnippetConfig = (nextConfig) => {
    setSnippetConfig(nextConfig ?? { snippets: [] });
  };

  const saveSnippetConfigToWebdav = useCallback(
    async (config) => {
      if (!webdavReady) return;
      try {
        const backend = createWebdavBackend(webdavConfig);
        await backend.writeText(
          '.settings/snippets.json',
          JSON.stringify(config ?? { snippets: [] }, null, 2),
          'application/json',
        );
      } catch (e) {
        console.error('Snippet settings save to WebDAV failed:', e);
        throw e;
      }
    },
    [webdavConfig, webdavReady],
  );

  const handleSaveSnippetConfig = async (config) => {
    const toSave = config ?? snippetConfig;
    setIsSavingSnippets(true);
    try {
      if (storageMode === 's3') {
        await saveSnippetConfigToS3(toSave);
      } else if (storageMode === 'local') {
        await saveSnippetConfigToLocal(toSave);
      } else if (storageMode === 'webdav') {
        await saveSnippetConfigToWebdav(toSave);
      }
      setOperationStatus('스니펫 설정이 저장되었습니다.');
    } catch (e) {
      alert('스니펫 설정 저장에 실패했습니다: ' + (e?.message || e));
    } finally {
      setIsSavingSnippets(false);
    }
  };

  /** Storage API: pick folder; MD+images nest under `{fileName}/`, single MD saves as a file. */
  const handleDownloadToFolder = async ({
    imageMode = 'files',
    imageSyntax = 'markdown',
    headingMax = 1,
    tableFormat = 'haim',
  } = {}) => {
    if (!currentFile) return;
    const storageType = currentFile.type;
    if (
      storageType !== 's3' &&
      storageType !== 'local' &&
      storageType !== 'webdav' &&
      storageType !== SESSION_STORAGE_TYPE
    ) {
      return;
    }
    try {
      if (!('showDirectoryPicker' in window)) {
        openUnsupportedFolderDownloadModal();
        setShowDownloadMethodModal(false);
        return;
      }
      const dirHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
      const canWrite = await ensureDirectoryReadWritePermission(dirHandle);
      if (!canWrite) {
        throw new Error('선택한 폴더에 쓰기 권한이 필요합니다.');
      }

      if (storageType === SESSION_STORAGE_TYPE) {
        const fileName =
          currentFile.name || currentFile.id?.split('/').filter(Boolean).pop() || 'download';
        if (isMarkdownFileName(fileName)) {
          const prepared = await applySessionMarkdownExportOptions({
            imageMode,
            imageSyntax,
            headingMax,
            tableFormat,
          });
          const bundled = prepared?.bundled;
          if (!bundled) throw new Error('세션 문서를 준비하지 못했습니다.');

          const writeSingleMarkdownFile = async (content) => {
            const uniqueFileName = await allocateUniqueFileSystemName(dirHandle, fileName);
            const fileHandle = await dirHandle.getFileHandle(uniqueFileName, { create: true });
            const writable = await fileHandle.createWritable();
            try {
              await writable.write(content);
            } finally {
              await writable.close();
            }
          };

          if (imageMode === 'base64' || !bundled.images.length) {
            const markdown = bundled.images.length
              ? embedMarkdownImagesAsDataUris(bundled.markdown, bundled.images)
              : bundled.markdown;
            await writeSingleMarkdownFile(markdown);
            setDownloadProgress(100);
            setDownloadComplete(true);
          } else {
            const bundleDirName = await allocateUniqueFileSystemName(
              dirHandle,
              markdownExportBundleDirectoryName(fileName),
              { isFolder: true },
            );
            const bundleDirHandle = await dirHandle.getDirectoryHandle(bundleDirName, {
              create: true,
            });
            await writeMarkdownImageBundleToDirectory(
              bundleDirHandle,
              fileName,
              bundled.markdown,
              bundled.images,
              (percent) => setDownloadProgress(percent),
            );
            setDownloadComplete(true);
          }
          const missingMessage = formatMissingExportImagesMessage(bundled.missing);
          if (missingMessage) alert(missingMessage);
          return;
        }

        const flushed = flushSessionEditorToWorkspace() ?? sessionWorkspaceRef.current;
        if (!flushed) throw new Error('다운로드 세션이 없습니다.');
        await writeSessionWorkspaceToDirectory(dirHandle, flushed, (percent) =>
          setDownloadProgress(percent),
        );
        setDownloadComplete(true);
        return;
      }

      const fileName = currentFile.name || currentFile.id?.split('/').filter(Boolean).pop() || 'download';
      const notePath = currentFile.id || '';

      if (isMarkdownFileName(fileName)) {
        const backend = getBackendForType(storageType);
        const { text } = await backend.readText(notePath);
        let markdown = remapMarkdownHeadingLevels(text, headingMax);
        if (tableFormat === 'html') {
          const { convertHaimTablesToHtmlInMarkdown } = await import('@/utils/haimTable/toHtml');
          markdown = convertHaimTablesToHtmlInMarkdown(markdown, (id) =>
            getCachedTableStyleTemplate(id),
          );
        }
        const effectiveSyntax = imageMode === 'base64' ? 'markdown' : imageSyntax;
        const plan = planMarkdownImageExport(markdown, notePath, { syntax: effectiveSyntax });

        const writeSingleMarkdownFile = async (content) => {
          const uniqueFileName = await allocateUniqueFileSystemName(dirHandle, fileName);
          const fileHandle = await dirHandle.getFileHandle(uniqueFileName, { create: true });
          const writable = await fileHandle.createWritable();
          try {
            await writable.write(content);
          } finally {
            await writable.close();
          }
        };

        // Single MD (base64 embed, or no images): write the file into the picked folder.
        if (imageMode === 'base64' || !plan.images.length) {
          if (plan.images.length) {
            const { entries, missing } = await collectMarkdownExportImageBytes(
              plan.images,
              (path) => readBackendBytes(storageType, path),
              (completed, total) => {
                setDownloadProgress(Math.min(90, Math.round((completed / Math.max(total, 1)) * 90)));
              },
            );
            const bundled = embedMarkdownImagesAsDataUris(plan.markdown, entries);
            await writeSingleMarkdownFile(bundled);
            const missingMessage = formatMissingExportImagesMessage(missing);
            if (missingMessage) alert(missingMessage);
          } else {
            await writeSingleMarkdownFile(plan.markdown || markdown);
          }
          setDownloadProgress(100);
          setDownloadComplete(true);
          return;
        }

        // Split files: nest under a uniquely named folder next to .pictures/.
        const bundleDirName = await allocateUniqueFileSystemName(
          dirHandle,
          markdownExportBundleDirectoryName(fileName),
          { isFolder: true },
        );
        const bundleDirHandle = await dirHandle.getDirectoryHandle(bundleDirName, { create: true });
        const { entries, missing } = await collectMarkdownExportImageBytes(
          plan.images,
          (path) => readBackendBytes(storageType, path),
          (completed, total) => {
            setDownloadProgress(Math.min(90, Math.round((completed / Math.max(total, 1)) * 90)));
          },
        );
        await writeMarkdownImageBundleToDirectory(
          bundleDirHandle,
          fileName,
          plan.markdown,
          entries,
          (percent) => setDownloadProgress(90 + Math.round(percent * 0.1)),
        );
        const missingMessage = formatMissingExportImagesMessage(missing);
        if (missingMessage) alert(missingMessage);
        setDownloadComplete(true);
        return;
      }

      const uniqueFileName = await allocateUniqueFileSystemName(dirHandle, fileName);
      const fileHandle = await dirHandle.getFileHandle(uniqueFileName, { create: true });
      const writable = await fileHandle.createWritable();

      if (storageType === 's3') {
        const client = getS3Client();
        if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
        await streamS3ObjectToWritable(
          client,
          s3Creds.bucket,
          notePath,
          writable,
          (percent) => setDownloadProgress(percent),
        );
      } else if (storageType === 'local' && currentFile.handle) {
        const file = await currentFile.handle.getFile();
        const total = file.size;
        const reader = file.stream().getReader();
        let received = 0;
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          await writable.write(value);
          received += value.length;
          if (total) setDownloadProgress(Math.min(100, (received / total) * 100));
        }
        await writable.close();
      } else {
        const body = await readBackendBytes(storageType, notePath);
        await writable.write(body);
        await writable.close();
        setDownloadProgress(100);
      }
      setDownloadComplete(true);
    } catch (e) {
      if (e?.name === 'AbortError') {
        setShowDownloadMethodModal(false);
        return;
      }
      console.error('폴더에 저장 실패:', e);
      alert('폴더에 저장에 실패했습니다: ' + (e?.message || e));
      setShowDownloadMethodModal(false);
    }
  };

  const handleRequestMoveFileFromSidebar = (node, storageType) => {
    setMoveFileTarget({ node, storageType });
    setIsMoveModalOpen(true);
  };

  const handleConfirmMoveFileFromSidebar = async (dest) => {
    if (!moveFileTarget || !dest) return;
    const { node, storageType } = moveFileTarget;
    const destPath = dest.path || '';
    const tree = getUploadTreeForStorage(storageType);
    const usedNames = new Set(getTreeChildNames(tree, destPath, findNodeByPath));
    const destFilePath = `${destPath}${node.name}`;
    if (destFilePath === node.path) {
      setMoveFileTarget(null);
      setIsMoveModalOpen(false);
      return;
    }

    let destName = node.name;
    try {
      if (treeChildNameTaken(usedNames, node.name)) {
        const resolved = await resolveTreeDestName({
          name: node.name,
          usedNames,
          kind: 'file',
          action: 'move',
          askConflict: askTreeNameConflict,
          loadCompare: () =>
            loadFileCompareForDest({
              storageType,
              destFolderPath: destPath,
              fileName: node.name,
              incomingPath: node.path,
              incomingNode: node,
              existingLabel: `대상 폴더의 "${node.name}"`,
              incomingLabel: `이동할 "${node.name}"`,
            }),
        });
        if (!resolved) return;
        destName = resolved;
      }

      const destFilePath = `${destPath}${destName}`;
      beginTreeTransferBusy({
        storageType,
        path: node.path,
        nodeType: 'file',
        destFolderPath: destPath || '',
        action: 'move',
      });

      try {
        const fileToMove =
          storageType === 's3'
            ? { id: node.path, name: node.name }
            : storageType === 'webdav'
              ? { id: node.path, name: node.name }
              : { ...node, handle: node.handle, parentHandle: node.parentHandle || localRootHandle };
        if (storageType === 's3') {
          await moveS3FileToFolder(fileToMove, destPath, destName);
          if (currentFileRef.current?.type === 's3' && currentFileRef.current.id === node.path) {
            setCurrentFile((prev) =>
              prev && prev.id === node.path
                ? { ...prev, id: destFilePath, name: destName }
                : prev,
            );
          } else {
            await reloadOpenFileIfPath(storageType, destFilePath);
          }
        } else if (storageType === 'webdav') {
          const updated = await moveWebdavFileToFolder(fileToMove, destPath, destName);
          if (currentFileRef.current?.type === 'webdav' && currentFileRef.current.id === node.path) {
            setCurrentFile(updated);
          } else {
            await reloadOpenFileIfPath(storageType, destFilePath);
          }
        } else {
          const updated = await moveLocalFileToFolder(
            fileToMove,
            dest.handle || localRootHandle,
            destPath,
            destName,
          );
          if (currentFileRef.current?.type === 'local' && currentFileRef.current.id === node.path) {
            setCurrentFile(updated);
          } else {
            await reloadOpenFileIfPath(storageType, destFilePath);
          }
        }
        setMoveFileTarget(null);
        setIsMoveModalOpen(false);
        setOperationStatus(`파일 이동 완료: ${destName}`);
      } finally {
        endTreeTransferBusy(storageType, node.path);
      }
    } catch (e) {
      endTreeTransferBusy(storageType, node.path);
      alert('파일 이동 실패: ' + e.message);
      setOperationStatus(`파일 이동 실패: ${e.message}`);
    }
  };

  /**
   * Prompt for `.enc.md` password (Esc cancel, Enter confirm).
   * @param {{ title?: string, message?: string, confirmLabel?: string }} [opts]
   * @returns {Promise<string>}
   */
  const requestEncMdPassword = useCallback((opts = {}) => {
    return new Promise((resolve, reject) => {
      setEncMdPrompt({
        title: opts.title || '암호화된 노트',
        message:
          opts.message ||
          '비밀번호를 입력하세요.',
        confirmLabel: opts.confirmLabel || '확인',
        error: '',
        resolve: (pw) => {
          setEncMdPrompt(null);
          resolve(pw);
        },
        reject: () => {
          setEncMdPrompt(null);
          reject(new Error('cancelled'));
        },
      });
    });
  }, []);

  useEffect(() => {
    saveFileRef.current = saveFile;
  }, [saveFile]);

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

  const applyWorkspaceFilePathRetarget = (storageType, oldPath, newPath, filePatch = null) => {
    if (!storageType || !oldPath || !newPath) return;
    const next = retargetFileTab(workspaceTabsRef.current, storageType, oldPath, {
      path: newPath,
      ...(filePatch
        ? {
            currentFile: filePatch,
            editedFileName:
              typeof filePatch.name === 'string' ? filePatch.name : undefined,
          }
        : {}),
    });
    if (next === workspaceTabsRef.current) return;
    workspaceTabsRef.current = next;
    setWorkspaceTabs(next);
  };

  const applyWorkspaceFolderPathRetarget = (storageType, oldPrefix, newPrefix) => {
    if (!storageType || !oldPrefix || !newPrefix || oldPrefix === newPrefix) return;
    const from = oldPrefix.endsWith('/') ? oldPrefix : `${oldPrefix}/`;
    const to = newPrefix.endsWith('/') ? newPrefix : `${newPrefix}/`;
    const next = retargetFileTabsByPathPrefix(workspaceTabsRef.current, storageType, from, to);
    if (next === workspaceTabsRef.current) return;
    workspaceTabsRef.current = next;
    setWorkspaceTabs(next);
  };

  useLayoutEffect(() => {
    fileSessionApi.registerFileSessionBridgeDeps({
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
      applyWorkspaceFilePathRetarget,
      sessionWorkspaceRef,
      savingTabIdsRef,
    });
  });

  // 6. Create & Delete
  const requestNewTempFile = useCallback(() => {
    flushSessionEditorToWorkspace();
    const existing = sessionWorkspaceRef.current;
    if (existing) {
      const { workspace, path } = addEmptyUntitledSessionFile(existing);
      sessionWorkspaceRef.current = workspace;
      setSessionWorkspace(workspace);
      applySessionFileToEditor(path, workspace);
      if (isMobile) setSidebarOpen(false);
      return;
    }
    const workspace = createEmptyUntitledSessionWorkspace();
    revokeSessionObjectUrls();
    sessionVaultBindingsRef.current = Object.create(null);
    sessionWorkspaceRef.current = workspace;
    setSessionWorkspace(workspace);
    applySessionFileToEditor('untitled.md', workspace);
    if (isMobile) setSidebarOpen(false);
  }, [
    applySessionFileToEditor,
    flushSessionEditorToWorkspace,
    isMobile,
    revokeSessionObjectUrls,
  ]);

  usePwaNewFileShortcut({
    enabled: isUnlocked && canScanStorageUsage,
    onNewFile: requestNewFile,
  });

  useNewTempFileShortcut({
    enabled: isUnlocked && canScanStorageUsage,
    onNewTempFile: requestNewTempFile,
  });

  const handleUploadFileSelect = async (e) => {
    const files = e.target.files;
    if (!files?.length || !uploadTarget) return;
    const { storageType, parentPath, parentDirHandle } = uploadTarget;
    setUploadTarget(null);

    const indicatorId = addIndicator({
      id: 'upload-file',
      type: ActivityTypes.FILE_UPLOAD,
      label: files.length > 1 ? `${files.length}개 파일 업로드 중` : '파일 업로드 중',
    });
    try {
      const usedNames = new Set(
        getTreeChildNames(getUploadTreeForStorage(storageType), parentPath || '', findNodeByPath),
      );
      let uploadedCount = 0;
      let skippedCount = 0;

      if (storageType === 's3') {
        const client = getS3Client();
        if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const destName = await resolveUploadDestFileName(
            file.name,
            usedNames,
            askUploadNameConflict,
          );
          if (!destName) {
            skippedCount += 1;
            continue;
          }
          const key = parentPath + destName;
          const body = await file.arrayBuffer();
          await putObject(client, {
            Bucket: s3Creds.bucket,
            Key: key,
            Body: new Uint8Array(body),
            ContentType: file.type || 'application/octet-stream',
          });
          usedNames.add(destName);
          uploadedCount += 1;
          await reloadOpenFileIfPath(storageType, key);
        }
        loadS3Files();
      } else if (storageType === 'local') {
        if (localVaultFsPath && !localRootHandle) {
          const backend = getBackendForType('local');
          if (!backend?.isReady?.()) throw new Error('루트 폴더를 먼저 열어주세요.');
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const destName = await resolveUploadDestFileName(
              file.name,
              usedNames,
              askUploadNameConflict,
            );
            if (!destName) {
              skippedCount += 1;
              continue;
            }
            const key = (parentPath || '') + destName;
            const body = new Uint8Array(await file.arrayBuffer());
            await backend.writeBytes(key, body, file.type || 'application/octet-stream');
            usedNames.add(destName);
            uploadedCount += 1;
            await reloadOpenFileIfPath(storageType, key);
          }
          await refreshLocalTree();
        } else {
          const targetDirHandle = parentDirHandle || localRootHandle;
          if (!targetDirHandle) throw new Error('루트 폴더를 먼저 열어주세요.');
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const destName = await resolveUploadDestFileName(
              file.name,
              usedNames,
              askUploadNameConflict,
            );
            if (!destName) {
              skippedCount += 1;
              continue;
            }
            const newFileHandle = await targetDirHandle.getFileHandle(destName, { create: true });
            const writable = await newFileHandle.createWritable();
            await writable.write(await file.arrayBuffer());
            await writable.close();
            usedNames.add(destName);
            uploadedCount += 1;
            await reloadOpenFileIfPath(storageType, `${parentPath || ''}${destName}`);
          }
          refreshLocalTree();
        }
      } else if (storageType === 'webdav') {
        const backend = createWebdavBackend(webdavConfig);
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const destName = await resolveUploadDestFileName(
            file.name,
            usedNames,
            askUploadNameConflict,
          );
          if (!destName) {
            skippedCount += 1;
            continue;
          }
          const key = parentPath + destName;
          const body = new Uint8Array(await file.arrayBuffer());
          await backend.writeBytes(key, body, file.type || 'application/octet-stream');
          usedNames.add(destName);
          uploadedCount += 1;
          await reloadOpenFileIfPath(storageType, key);
        }
        await refreshWebdavTree();
      }
      const parentPaths = getParentPathsToExpand(parentPath);
      expandPathsRef.current?.(storageType, parentPaths);
      if (uploadedCount === 0 && skippedCount > 0) {
        setOperationStatus('업로드 취소됨');
      } else if (skippedCount > 0) {
        setOperationStatus(
          uploadedCount > 1
            ? `${uploadedCount}개 파일 업로드 완료 (${skippedCount}개 취소)`
            : `업로드 완료 (${skippedCount}개 취소)`,
        );
      } else {
        setOperationStatus(
          uploadedCount > 1 ? `${uploadedCount}개 파일 업로드 완료` : '업로드 완료',
        );
      }
    } catch (err) {
      alert('업로드 실패: ' + err.message);
    } finally {
      settleTreeNameConflict('cancel');
      removeIndicator(indicatorId);
      e.target.value = '';
    }
  };

  const handleUploadFolderSelect = async (e) => {
    const files = e.target.files;
    if (!files?.length || !uploadTarget) return;
    const { storageType, parentPath, parentDirHandle } = uploadTarget;
    setUploadTarget(null);

    const indicatorId = addIndicator({
      id: 'upload-folder',
      type: ActivityTypes.FILE_UPLOAD,
      label: `${files.length}개 파일 업로드 중`,
    });
    try {
      if (storageType === 's3') {
        const client = getS3Client();
        if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
        const dirMarkers = collectS3DirectoryMarkersFromUpload(parentPath, files);
        if (dirMarkers.length) {
          await putS3FolderMarkers(client, s3Creds.bucket, dirMarkers);
        }
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const relPath = normalizePathToNfc(file.webkitRelativePath || file.name);
          const key = parentPath + relPath;
          const body = await file.arrayBuffer();
          await putObject(client, {
            Bucket: s3Creds.bucket,
            Key: key,
            Body: new Uint8Array(body),
            ContentType: file.type || 'application/octet-stream',
          });
        }
        loadS3Files();
      } else if (storageType === 'local') {
        if (localVaultFsPath && !localRootHandle) {
          const backend = getBackendForType('local');
          if (!backend?.isReady?.()) throw new Error('루트 폴더를 먼저 열어주세요.');
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const relPath = normalizePathToNfc(file.webkitRelativePath || file.name);
            const key = (parentPath || '') + relPath;
            const body = new Uint8Array(await file.arrayBuffer());
            await backend.writeBytes(key, body, file.type || 'application/octet-stream');
          }
          await refreshLocalTree();
        } else {
          const targetDirHandle = parentDirHandle || localRootHandle;
          if (!targetDirHandle) throw new Error('루트 폴더를 먼저 열어주세요.');
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const relPath = normalizePathToNfc(file.webkitRelativePath || file.name);
            const parts = relPath.replace(/\/$/, '').split('/');
            let dir = targetDirHandle;
            for (let j = 0; j < parts.length - 1; j++) {
              dir = await dir.getDirectoryHandle(parts[j], { create: true });
            }
            const fileName = parts[parts.length - 1];
            const newFileHandle = await dir.getFileHandle(fileName, { create: true });
            const writable = await newFileHandle.createWritable();
            await writable.write(await file.arrayBuffer());
            await writable.close();
          }
          refreshLocalTree();
        }
      } else if (storageType === 'webdav') {
        const backend = createWebdavBackend(webdavConfig);
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const relPath = normalizePathToNfc(file.webkitRelativePath || file.name);
          const key = parentPath + relPath;
          const body = new Uint8Array(await file.arrayBuffer());
          await backend.writeBytes(key, body, file.type || 'application/octet-stream');
        }
        await refreshWebdavTree();
      }
      const parentPaths = getParentPathsToExpand(parentPath);
      expandPathsRef.current?.(storageType, parentPaths);
      setOperationStatus(`${files.length}개 파일 업로드 완료`);
    } catch (err) {
      alert('폴더 업로드 실패: ' + err.message);
    } finally {
      removeIndicator(indicatorId);
      e.target.value = '';
    }
  };

  const ensureLocalTrashDir = async () => {
    if (!localRootHandle) {
      throw new Error('루트 폴더가 열려 있지 않습니다.');
    }
    return localRootHandle.getDirectoryHandle('.trash', { create: true });
  };

  const moveLocalEntryToTrash = async (node) => {
    const trashRoot = await ensureLocalTrashDir();
    const relativePath = node.path.replace(/\/$/, ''); // remove trailing slash for folders
    const segments = relativePath.split('/'); // e.g. ['foo', 'bar.md'] or ['foo','bar']
    const name = segments.pop();

    let targetDir = trashRoot;
    for (const segment of segments) {
      if (!segment) continue;
      targetDir = await targetDir.getDirectoryHandle(segment, { create: true });
    }

    if (node.type === 'file') {
      const file = await node.handle.getFile();
      const newFileHandle = await targetDir.getFileHandle(name, { create: true });
      const writable = await newFileHandle.createWritable();
      await writable.write(await file.arrayBuffer());
      await writable.close();
      const pHandle = node.parentHandle || localRootHandle;
      await pHandle.removeEntry(node.name, { recursive: false });
    } else if (node.type === 'folder') {
      const sourceDir = node.handle;
      const targetDirForFolder = await targetDir.getDirectoryHandle(name, { create: true });

      const copyDirRecursive = async (srcHandle, destHandle) => {
        for await (const entry of srcHandle.values()) {
          if (entry.kind === 'file') {
            const file = await entry.getFile();
            const newFileHandle = await destHandle.getFileHandle(entry.name, { create: true });
            const writable = await newFileHandle.createWritable();
            await writable.write(await file.arrayBuffer());
            await writable.close();
          } else if (entry.kind === 'directory') {
            const newDirHandle = await destHandle.getDirectoryHandle(entry.name, { create: true });
            await copyDirRecursive(entry, newDirHandle);
          }
        }
      };

      await copyDirRecursive(sourceDir, targetDirForFolder);

      const pHandle = node.parentHandle || localRootHandle;
      await pHandle.removeEntry(node.name, { recursive: true });
    }
  };

  const moveS3KeyToTrash = async (client, bucket, key) => {
    const destKey = `.trash/${key}`;
    await copyObject(client, bucket, key, destKey);
    await deleteObject(client, bucket, key);
  };

  const moveS3EntryToTrash = async (node, additionalKeys = []) => {
    const client = getS3Client();
    if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');

    const bucket = s3Creds.bucket;

    await putObject(client, { Bucket: bucket, Key: '.trash/', Body: '' });

    if (node.type === 'file') {
      const srcKey = node.path;
      const destKey = `.trash/${srcKey}`;
      await copyObject(client, bucket, srcKey, destKey);
      await deleteObject(client, bucket, srcKey);
    } else if (node.type === 'folder') {
      const prefix = node.path;
      const contents = await listObjectsV2(client, bucket, prefix);

      if (contents.length > 0) {
        for (const { Key } of contents) {
          const destKey = `.trash/${Key}`;
          await copyObject(client, bucket, Key, destKey);
        }
        await deleteObjects(client, bucket, contents.map(({ Key }) => ({ Key })));
      }
    }
    for (const key of additionalKeys) {
      try {
        await moveS3KeyToTrash(client, bucket, key);
      } catch (e) {
        if (e?.$metadata?.httpStatusCode !== 404) throw e;
      }
    }
  };

  const associatedRecordings = (() => {
    const targets = normalizeDeleteTargets(deleteTarget);
    if (!targets.length) return [];
    const seen = new Set();
    const recordings = [];
    for (const t of targets) {
      if (!['s3', 'local', 'webdav'].includes(t.type) || t.node.type !== 'file') continue;
      const tree =
        t.type === 's3' ? s3Tree : t.type === 'webdav' ? webdavTree : localTree;
      for (const r of getRecordingKeysFromTree(tree, t.node.path)) {
        if (seen.has(r.key)) continue;
        seen.add(r.key);
        recordings.push(r);
      }
    }
    return recordings;
  })();

  const confirmDelete = async (options = {}) => {
    const targets = normalizeDeleteTargets(deleteTarget);
    if (!targets.length) return;
    const { deleteWithRecordings = false } = options;

    const closeModal = () => setDeleteTarget(null);
    let closeTimer = null;

    // Trash root emptying uses EmptyTrashConfirmModal (context menu / dedicated flow).
    if (targets.length === 1 && targets[0].node.path === '.trash/') {
      closeModal();
      return;
    }

    const workTargets = targets.filter((t) => t.node.path !== '.trash/');
    if (!workTargets.length) return;

    if (workTargets.some((t) => t.node.type === 'folder') && isDeletingFolder) return;

    setIsDeleting(true);
    const multi = workTargets.length > 1;
    if (multi) {
      setOperationStatus(`${workTargets.length}개 항목 삭제 중…`);
    }

    closeTimer = setTimeout(closeModal, 3000);

    let successCount = 0;
    let failCount = 0;
    let lastError = null;
    let anyFolder = false;
    const isChatRoute = chatSurfaceActive;
    let openFileAffected = false;
    /** @type {Array<{ path?: string, type?: string, name?: string }>} */
    const deletedNodesForChat = [];

    const treeFor = (type) =>
      type === 's3' ? s3Tree : type === 'webdav' ? webdavTree : localTree;

    const recordingKeysForNode = (node, type) => {
      if (!deleteWithRecordings || node.type !== 'file') return [];
      return getRecordingKeysFromTree(treeFor(type), node.path).flatMap((r) => {
        const syncKey = getSyncKeyForRecording(r.key);
        return syncKey ? [r.key, syncKey] : [r.key];
      });
    };

    const companionKeysForNode = (node, type) => {
      if (!loadOrphanImageAutoDeleteEnabled()) return [];
      return collectCompanionImageKeysForDelete(node, treeFor(type));
    };

    const mergeAdditionalKeys = (node, type) => {
      const seen = new Set();
      const out = [];
      for (const key of [...recordingKeysForNode(node, type), ...companionKeysForNode(node, type)]) {
        if (!key || seen.has(key) || key === node.path) continue;
        seen.add(key);
        out.push(key);
      }
      return out;
    };

    try {
      const storagesTouched = new Set();

      for (const { node, type } of workTargets) {
        const isInTrash = node.path.startsWith('.trash/');
        const isFolder = node.type === 'folder';
        const additionalKeys = mergeAdditionalKeys(node, type);

        if (isFolder) {
          anyFolder = true;
          setIsDeletingFolder(true);
          setDeletingFolderPath(node.path);
          if (!multi) setOperationStatus(`폴더 삭제 중: ${node.path}`);
        } else if (!multi) {
          setOperationStatus(isInTrash ? `영구 삭제 중: ${node.path}` : `삭제 중: ${node.path}`);
        }

        try {
          if (type === 's3') {
            const client = getS3Client();
            if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');

            if (isInTrash) {
              if (node.type === 'folder') {
                const contents = await listObjectsV2(client, s3Creds.bucket, node.path);
                const keys = [
                  ...contents.map(({ Key }) => Key),
                  ...additionalKeys,
                ].filter(Boolean);
                if (keys.length > 0) {
                  await deleteObjects(client, s3Creds.bucket, keys.map((Key) => ({ Key })));
                }
              } else {
                const keysToDelete =
                  additionalKeys.length > 0
                    ? [node.path, ...additionalKeys]
                    : [node.path];
                await deleteObjects(client, s3Creds.bucket, keysToDelete.map((Key) => ({ Key })));
              }
            } else {
              await moveS3EntryToTrash(node, additionalKeys);
            }
            storagesTouched.add('s3');
          } else if (type === 'local') {
            if (localVaultFsPath && !localRootHandle) {
              const backend = getBackendForType('local');
              if (!backend?.isReady?.()) throw new Error('루트 폴더를 먼저 열어주세요.');
              if (isInTrash) {
                if (node.type === 'folder') {
                  await backend.deletePrefix(node.path);
                } else {
                  await backend.delete(node.path);
                }
                for (const key of additionalKeys) {
                  try {
                    await backend.delete(key);
                  } catch {
                    /* missing companion ok */
                  }
                }
              } else {
                const trashPath =
                  node.type === 'folder'
                    ? `${String(node.path || '').replace(/\/+$/, '')}/`
                    : node.path;
                await backend.trash(trashPath, { additionalKeys });
              }
            } else {
              if (!localRootHandle) throw new Error('루트 폴더를 먼저 열어주세요.');

              if (isInTrash) {
                const pHandle = node.parentHandle || localRootHandle;
                await pHandle.removeEntry(node.name, { recursive: true });
                if (additionalKeys.length > 0) {
                  const backend = createLocalBackend(localRootHandle);
                  for (const key of additionalKeys) {
                    try {
                      await backend.delete(key);
                    } catch {
                      /* missing companion ok */
                    }
                  }
                }
              } else if (additionalKeys.length > 0) {
                const backend = createLocalBackend(localRootHandle);
                const trashPath =
                  node.type === 'folder'
                    ? `${String(node.path || '').replace(/\/+$/, '')}/`
                    : node.path;
                await backend.trash(trashPath, { additionalKeys });
              } else {
                await moveLocalEntryToTrash(node);
              }
            }
            storagesTouched.add('local');
          } else if (type === 'webdav') {
            const backend = createWebdavBackend(webdavConfig);
            if (isInTrash) {
              if (node.type === 'folder') {
                await backend.deletePrefix(node.path);
                for (const key of additionalKeys) {
                  try {
                    await backend.delete(key);
                  } catch (e) {
                    if (e?.$metadata?.httpStatusCode !== 404) throw e;
                  }
                }
              } else {
                const keysToDelete =
                  additionalKeys.length > 0
                    ? [node.path, ...additionalKeys]
                    : [node.path];
                for (const key of keysToDelete) {
                  try {
                    await backend.delete(key);
                  } catch (e) {
                    if (e?.$metadata?.httpStatusCode !== 404) throw e;
                  }
                }
              }
            } else {
              await backend.trash(node.path, { additionalKeys });
            }
            storagesTouched.add('webdav');
          }

          successCount += 1;
          deletedNodesForChat.push(node);

          if (
            currentFile?.id &&
            (node.type === 'folder'
              ? currentFile.id === node.path || currentFile.id.startsWith(node.path)
              : currentFile.id === node.path)
          ) {
            openFileAffected = true;
          }
        } catch (e) {
          failCount += 1;
          lastError = e;
        }
      }

      if (storagesTouched.has('s3')) loadS3Files();
      if (storagesTouched.has('local')) await refreshLocalTree();
      if (storagesTouched.has('webdav')) await refreshWebdavTree();

      if (openFileAffected) {
        const activeFile = getActiveFileTab(workspaceTabsRef.current);
        if (activeFile) {
          closeWorkspaceTabById(activeFile.id, { skipDirtyConfirm: true });
        } else {
          setCurrentFile(null);
          currentFileRef.current = null;
          setEditorContent('');
          editorContentRef.current = '';
          if (!isChatRoute) {
            navigate('/');
          }
        }
      }

      if (chatStorageReady && chatStorageCtx && deletedNodesForChat.length) {
        try {
          for (const node of deletedNodesForChat) {
            const scope = deletedNoteScopeFromNode(node);
            const { dateStrs } = await unlinkChatNotesForDeletedPaths(chatStorageCtx, scope);
            for (const dateStr of dateStrs) {
              postChatSyncEvent('day', { dateStr });
              postChatLocalSyncEvent('day', { dateStr });
            }
          }
        } catch (unlinkErr) {
          console.warn('Failed to unlink chat note refs after delete:', unlinkErr);
        }
      }

      if (successCount > 0) {
        setSelectedIds(new Set());
      }
    } finally {
      if (closeTimer) clearTimeout(closeTimer);
      closeModal();
      setIsDeleting(false);
      if (anyFolder) {
        setIsDeletingFolder(false);
        setDeletingFolderPath(null);
      }
      if (failCount === 0 && successCount > 0) {
        setOperationStatus(
          multi ? `${successCount}개 항목 삭제 완료` : `삭제 완료: ${workTargets[0].node.path}`,
        );
      } else if (successCount === 0 && lastError) {
        alert('삭제 실패: ' + lastError.message);
        setOperationStatus(`삭제 실패: ${lastError.message}`);
      } else if (failCount > 0) {
        alert(
          `${successCount}개 삭제 완료, ${failCount}개 실패` +
            (lastError ? `: ${lastError.message}` : ''),
        );
        setOperationStatus(`${successCount}개 삭제, ${failCount}개 실패`);
      }
    }
  };

  const confirmEmptyTrash = async (options) => {
    if (!emptyTrashTarget?.storageType || isEmptyingTrash) return;
    const storageType = emptyTrashTarget.storageType;
    setIsEmptyingTrash(true);
    setOperationStatus('쓰레기통 비우는 중…');
    try {
      const { deletedCount } = await executeEmptyTrash({
        storageType,
        options,
        getS3Client,
        bucket: s3Creds.bucket,
        localRootHandle,
        webdavConfig,
      });
      if (storageType === 's3') await loadS3Files();
      else if (storageType === 'local') await refreshLocalTree();
      else if (storageType === 'webdav') await refreshWebdavTree();

      if (
        currentFile?.id &&
        (currentFile.id === '.trash/' || currentFile.id.startsWith('.trash/'))
      ) {
        setCurrentFile(null);
        setEditorContent('');
      }

      setEmptyTrashTarget(null);
      setOperationStatus(
        deletedCount > 0
          ? `쓰레기통 정리 완료 (${deletedCount}개 삭제)`
          : '쓰레기통 정리 완료 (삭제할 항목 없음)',
      );
    } catch (e) {
      alert('쓰레기통 비우기 실패: ' + (e?.message || e));
      setOperationStatus(`쓰레기통 비우기 실패: ${e?.message || e}`);
    } finally {
      setIsEmptyingTrash(false);
    }
  };

  const handleRequestMove = async () => {
    if (!currentFile) return;
    if (currentFile.type === 's3') {
      await loadS3Files();
    } else if (currentFile.type === 'local' && localRootHandle) {
      await refreshLocalTree();
    } else if (currentFile.type === 'webdav' && webdavReady) {
      await refreshWebdavTree();
    }
    setIsMoveModalOpen(true);
  };

  const handleCreateNoteFromChatMessage = async ({
    message,
    parentPath = '',
    parentHandle,
    fileName,
    includeReplyThread = false,
  }) => {
    let finalName = String(fileName || '').trim();
    if (!finalName) throw new Error('파일명이 비어 있습니다.');
    if (!finalName.endsWith('.md')) finalName += '.md';
    if (finalName.includes('/') || finalName.includes('\\')) {
      throw new Error('파일명에 / 를 넣을 수 없습니다.');
    }
    const newPath = `${parentPath || ''}${finalName}`;
    const tz = detectTimeZone();
    /** @type {object[]} */
    let threadMessages = [];
    if (includeReplyThread && message?.replyTo && chatStorageCtx) {
      try {
        threadMessages = await resolveReplyThreadMessages(chatStorageCtx, message);
      } catch (err) {
        console.warn('Failed to resolve reply thread for note:', err);
        if (message.replySnippet) {
          threadMessages = [
            {
              id: message.replyTo,
              at: '',
              group: message.replyGroup || '나',
              body: message.replySnippet,
            },
          ];
        }
      }
    }
    const body = formatChatMessageAsNoteMarkdown(message, tz, newPath, {
      threadMessages,
    });

    if (storageMode === 's3') {
      const client = getS3Client();
      if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
      await putObject(client, {
        Bucket: s3Creds.bucket,
        Key: newPath,
        Body: body,
        ContentType: 'text/markdown; charset=utf-8',
      });
      await loadS3Files();
    } else if (storageMode === 'webdav') {
      const backend = createWebdavBackend(webdavConfig);
      await backend.writeText(newPath, body, 'text/markdown; charset=utf-8');
      await refreshWebdavTree();
    } else {
      const targetDir = parentHandle || localRootHandle;
      if (!targetDir) throw new Error('루트 폴더를 먼저 열어주세요.');
      const newFileHandle = await targetDir.getFileHandle(finalName, { create: true });
      const writable = await newFileHandle.createWritable();
      await writable.write(body);
      await writable.close();
      await refreshLocalTree();
    }

    if (chatStorageCtx && message?.id) {
      const dateStr =
        message.dateStr || localDateString(new Date(message.at || Date.now()), tz);
      try {
        await patchChatMessageMeta(chatStorageCtx, dateStr, message.id, {
          notePath: newPath,
        });
        postChatSyncEvent('day', { dateStr });
      } catch (err) {
        console.warn('Failed to link chat message to note:', err);
      }
    }

    setOperationStatus(`노트 생성 완료: ${newPath}`);
    return newPath;
  };

  const handleOpenNoteFromChat = useCallback(
    async (notePath) => {
      if (!notePath) return;
      const path = String(notePath);
      const type =
        storageMode === STORAGE_MODE_LOCAL
          ? 'local'
          : storageMode === STORAGE_MODE_WEBDAV
            ? 'webdav'
            : 's3';
      const tree =
        type === 's3' ? s3Tree : type === 'webdav' ? webdavTree : localTree;
      let node = findNodeByPath(tree, path) || findFileNodeByPath(tree, path);
      if ((!node || node.type !== 'file') && type === 'local') {
        node = await resolveLocalFileNode(localRootHandle, path);
      }
      if (!node || node.type !== 'file') {
        showAlert({
          title: '노트 열기',
          message: '해당 노트가 삭제되어 열 수 없습니다',
          detail: path,
        });
        return;
      }
      await selectFile(type, node);
    },
    [
      storageMode,
      s3Tree,
      webdavTree,
      localTree,
      localRootHandle,
      selectFile,
      showAlert,
    ],
  );

  const handleOpenStorageUsageFile = useCallback(
    async (file) => {
      const scanned = file?.node;
      const path = String(file?.path || scanned?.path || '');
      if (!path) return;

      const type =
        storageMode === STORAGE_MODE_LOCAL
          ? 'local'
          : storageMode === STORAGE_MODE_WEBDAV
            ? 'webdav'
            : 's3';
      const tree =
        type === 's3' ? s3Tree : type === 'webdav' ? webdavTree : localTree;
      const live = findNodeByPath(tree, path) || findFileNodeByPath(tree, path);
      const node =
        type === 'local' && scanned?.handle
          ? scanned
          : live || scanned;

      if (!node) {
        showAlert({
          title: '파일 열기',
          message: '해당 파일을 찾을 수 없습니다',
          detail: path,
        });
        return;
      }
      if (type === 'local' && !node.handle) {
        showAlert({
          title: '파일 열기',
          message: '로컬 파일 핸들을 찾을 수 없습니다. 폴더를 다시 연 뒤 분석해 주세요.',
          detail: path,
        });
        return;
      }

      if (!confirmAndCancelEditorImageUpload()) return;
      saveCurrentMarkdownBeforeSwitch(type, node);
      setSelectedIds(new Set([toSelectKey(type, path)]));
      lastSelectedIdRef.current = toSelectKey(type, path);
      await selectFileRaw(type, node);
    },
    [
      storageMode,
      s3Tree,
      webdavTree,
      localTree,
      selectFileRaw,
      showAlert,
      confirmAndCancelEditorImageUpload,
      saveCurrentMarkdownBeforeSwitch,
    ],
  );

  const handleShareNoteToChatWithMyself = useCallback(async (fileOverride = null) => {
    const file = fileOverride || currentFile;
    if (!file?.id && !file?.path) return;
    const path = String(file.id || file.path || '');
    if (!path) return;
    const name =
      (!fileOverride && String(editedFileName || '').trim()) ||
      file.name ||
      path.split('/').filter(Boolean).pop() ||
      'note';
    const body = formatNoteShareChatBody({ path, name });
    try {
      if (chatStorageReady && chatStorageCtx) {
        const { dateStr } = await appendChatMessage(chatStorageCtx, {
          body,
          group: SELF_GROUP,
          source: 'share',
        });
        if (dateStr) {
          postChatSyncEvent('day', { dateStr });
          postChatLocalSyncEvent('day', { dateStr });
        }
      } else {
        await enqueuePendingShare({ body, intent: 'sendSelf' });
      }
      setOperationStatus('나와의 채팅에 공유했습니다');
      navigate('/chat');
    } catch (err) {
      try {
        await enqueuePendingShare({ body, intent: 'sendSelf' });
        setOperationStatus('나와의 채팅에 공유했습니다 (동기화 대기)');
        navigate('/chat');
      } catch {
        setOperationStatus(
          `공유 실패: ${err?.message || String(err) || 'unknown error'}`,
        );
      }
    }
  }, [
    currentFile,
    editedFileName,
    chatStorageReady,
    chatStorageCtx,
    navigate,
  ]);

  const handleShareNodeToChatWithMyself = useCallback(
    async (_storageType, node) => {
      if (!node || node.type !== 'file') return;
      const path = String(node.path || node.id || '');
      if (!path) return;
      if (isMobile) setSidebarOpen(false);
      await handleShareNoteToChatWithMyself({
        id: path,
        path,
        name: node.name,
      });
    },
    [handleShareNoteToChatWithMyself, isMobile],
  );

  const handleConfirmMoveFolder = async (dest) => {
    if (!moveFolderTarget || !dest) return;
    const { node, storageType } = moveFolderTarget;
    const destPath = dest.path || '';
    const tree = getUploadTreeForStorage(storageType);
    const usedNames = new Set(getTreeChildNames(tree, destPath, findNodeByPath));
    const destFolderPrefix = `${destPath}${node.name}/`;
    if (destFolderPrefix === node.path) {
      setMoveFolderTarget(null);
      return;
    }

    let destName = node.name;
    try {
      if (treeChildNameTaken(usedNames, node.name)) {
        const resolved = await resolveTreeDestName({
          name: node.name,
          usedNames,
          kind: 'folder',
          action: 'move',
          askConflict: askTreeNameConflict,
        });
        if (!resolved) return;
        destName = resolved;
      }

      beginTreeTransferBusy({
        storageType,
        path: node.path,
        nodeType: 'folder',
        destFolderPath: destPath || '',
        action: 'move',
      });

      try {
        if (storageType === 's3') {
          await moveS3FolderToFolder(node, destPath, destName);
        } else if (storageType === 'webdav') {
          await moveWebdavFolderToFolder(node, destPath, destName);
        } else {
          const destHandle = dest.handle || localRootHandle;
          if (!destHandle) throw new Error('대상 폴더를 찾을 수 없습니다.');
          await moveLocalFolderToFolder(node, destHandle, destPath, destName);
        }
        const oldPrefix = node.path.endsWith('/') ? node.path : `${node.path}/`;
        const newPrefix = `${destPath}${destName}/`;
        applyWorkspaceFolderPathRetarget(storageType, oldPrefix, newPrefix);
        if (
          currentFileRef.current &&
          currentFileRef.current.type === storageType &&
          (currentFileRef.current.id === node.path ||
            currentFileRef.current.id.startsWith(oldPrefix) ||
            currentFileRef.current.id.startsWith(node.path))
        ) {
          const cur = currentFileRef.current;
          const newPath = cur.id.startsWith(oldPrefix)
            ? newPrefix + cur.id.slice(oldPrefix.length)
            : cur.id.startsWith(node.path)
              ? newPrefix + cur.id.slice(node.path.length)
              : cur.id;
          applyOpenFileIdentityChange(
            { ...cur, id: newPath },
            { oldPath: cur.id, retargetTabs: false },
          );
        }
        setMoveFolderTarget(null);
        setOperationStatus(`폴더 이동 완료: ${destName}`);
      } finally {
        endTreeTransferBusy(storageType, node.path);
      }
    } catch (e) {
      endTreeTransferBusy(storageType, node.path);
      alert('폴더 이동 실패: ' + e.message);
      setOperationStatus(`폴더 이동 실패: ${e.message}`);
    }
  };

  const handleConfirmMove = async (dest) => {
    if (!currentFile || !dest) return;
    const destPath = dest.path || '';
    const tree = getUploadTreeForStorage(currentFile.type);
    const usedNames = new Set(getTreeChildNames(tree, destPath, findNodeByPath));
    const fileName = currentFile.name;
    const destFilePath = `${destPath}${fileName}`;
    if (destFilePath === currentFile.id) {
      setIsMoveModalOpen(false);
      return;
    }

    let destName = fileName;
    try {
      if (treeChildNameTaken(usedNames, fileName)) {
        const resolved = await resolveTreeDestName({
          name: fileName,
          usedNames,
          kind: 'file',
          action: 'move',
          askConflict: askTreeNameConflict,
          loadCompare: () =>
            loadFileCompareForDest({
              storageType: currentFile.type,
              destFolderPath: destPath,
              fileName,
              incomingPath: currentFile.id,
              incomingNode: null,
              existingLabel: `대상 폴더의 "${fileName}"`,
              incomingLabel: `이동할 "${fileName}"`,
            }),
        });
        if (!resolved) return;
        destName = resolved;
      }

      const srcPath = currentFile.id;
      const destFilePath = `${destPath}${destName}`;
      beginTreeTransferBusy({
        storageType: currentFile.type,
        path: srcPath,
        nodeType: 'file',
        destFolderPath: destPath || '',
        action: 'move',
      });

      try {
        if (currentFile.type === 's3') {
          const updated = await moveS3FileToFolder(currentFile, destPath, destName);
          if (updated) {
            applyOpenFileIdentityChange(
              { ...currentFile, id: updated.id, name: destName },
              { oldPath: srcPath },
            );
          }
        } else if (currentFile.type === 'webdav') {
          const updated = await moveWebdavFileToFolder(currentFile, destPath, destName);
          if (updated) {
            applyOpenFileIdentityChange(updated, { oldPath: srcPath });
          }
        } else if (currentFile.type === 'local') {
          const updated = await moveLocalFileToFolder(
            currentFile,
            dest.handle,
            destPath,
            destName,
          );
          if (updated) {
            applyOpenFileIdentityChange(updated, { oldPath: srcPath });
          }
        }
        setIsMoveModalOpen(false);
        setOperationStatus(`파일 이동 완료: ${destPath}${destName}`);
      } finally {
        endTreeTransferBusy(currentFile.type, srcPath);
      }
    } catch (e) {
      endTreeTransferBusy(currentFile.type, currentFile.id);
      alert('파일 이동 실패: ' + e.message);
      setOperationStatus(`파일 이동 실패: ${e.message}`);
    }
  };

  // §7–8 Auto save / sync owned by AutoSaveProvider (useAutoSaveDomain).

  useEffect(() => {
    editorContentRef.current = editorContent;
  }, [editorContent]);

  const handleToggleRecording = async () => {
    const pathStorageTypes = ['s3', 'local', 'webdav'];
    const noteKey =
      pathStorageTypes.includes(currentFile?.type) && currentFile?.viewer === 'markdown'
        ? currentFile.id
        : '';

    if (isRecording) {
      const result = await stopRecording({
        noteKey,
        markdown: editorContent,
      });
      if (!result || !noteKey) return;

      const indicatorId = addIndicator({
        id: 'recording-upload',
        type: ActivityTypes.RECORDING,
        label: '녹음 업로드 중',
      });
      try {
        if (currentFile?.type === 'local' && localRootHandle) {
          setRecordingPipelineStatus('저장 중');
          const localBackend = createLocalBackend(localRootHandle);
          await runEncodeAndWritePipeline({
            recording: result,
            writeObject: ({ key, body, contentType }) => localBackend.writeBytes(key, body, contentType),
            recordId: result.id,
            onStatus: setRecordingPipelineStatus,
          });
          if (result.id) {
            await deleteRecordingFragments(result.id);
            await deleteRecordingById(result.id);
          }
          await refreshLocalTree();
        } else if (currentFile?.type === 's3') {
          const client = getS3Client();
          if (client && s3Creds.bucket) {
            setRecordingPipelineStatus('업로드 중');
            await drainRecordingUploadQueue({
              client,
              bucket: s3Creds.bucket,
              onStatus: setRecordingPipelineStatus,
            });
            loadS3Files();
          }
        } else if (currentFile?.type === 'webdav' && webdavReady) {
          setRecordingPipelineStatus('업로드 중');
          const backend = createWebdavBackend(webdavConfig);
          await drainRecordingUploadQueue({
            writeObject: ({ key, body, contentType }) => backend.writeBytes(key, body, contentType),
            onStatus: setRecordingPipelineStatus,
          });
          await refreshWebdavTree();
        }
      } catch (e) {
        alert('녹음 업로드 실패: ' + (e?.message || e));
      } finally {
        removeIndicator(indicatorId);
        setRecordingPipelineStatus('');
      }
    } else {
      await startRecording();
    }
  };

  const formatTime = (ts) => {
    if (!ts) return '—';
    const d = new Date(ts);
    const hh = `${d.getHours()}`.padStart(2, '0');
    const mm = `${d.getMinutes()}`.padStart(2, '0');
    const ss = `${d.getSeconds()}`.padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  };

  const formatFileSize = (bytes) => {
    if (bytes == null || isNaN(bytes)) return '알 수 없음';
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    if (mb < 1024) return `${mb.toFixed(1)} MB`;
    const gb = mb / 1024;
    return `${gb.toFixed(1)} GB`;
  };

  const isEditableStorage =
    currentFile?.type === 's3' ||
    currentFile?.type === 'local' ||
    currentFile?.type === 'webdav' ||
    currentFile?.type === SESSION_STORAGE_TYPE;

  useLayoutEffect(() => {
    treeOpsApi.registerTreeOpsBridgeDeps({
      setOperationStatus,
      expandPathsRef,
      isMobile,
      setSidebarOpen,
      confirmAndCancelEditorImageUpload,
      uploadFileInputRef,
      uploadFolderInputRef,
      setUploadTarget,
      setAddToNoteSelectPath,
      setSaveSessionToNoteSelectPath,
      requestEncMdPassword,
      renameS3File,
      renameLocalFile,
      applyWorkspaceFilePathRetarget,
      applyWorkspaceFolderPathRetarget,
      readBackendBytes,
      downloadMarkdownImageZip,
      chatSurfaceActive,
      setDownloadResultModal,
    });
  });

  return {
    activateWorkspaceTab,
    addToNoteSelectPath,
    appBuildLocalId,
    appBuildRemoteId,
    appName,
    appUpdateAvailable,
    appUpdateCheckError,
    associatedRecordings,
    audioLevel,
    autoPromptWebAuthnForModal,
    canScanStorageUsage,
    canUnlockWithWebAuthnForModal,
    cancelEditorImageUpload,
    captureSync,
    chatAttachDropHost,
    chatStorageCtx,
    chatStorageReady,
    chatSurfaceActive,
    closeDownloadResultModal,
    closeSessionWorkspace,
    closeWorkspaceTabById,
    confirmDelete,
    confirmEmptyTrash,
    createModalContext,
    createModalOpen,
    createModalTree,
    currentFile,
    currentFileRef,
    deleteTarget,
    deletingFolderPath,
    disableWebAuthnUnlock,
    downloadComplete,
    downloadModalMode,
    downloadProgress,
    downloadResultModal,
    dropTarget,
    editedFileName,
    editorContent,
    editorContentRef,
    prevEditorContentRef,
    editorImageUploadPercent,
    editorType,
    emptyTrashTarget,
    enableWebAuthnUnlock,
    encMdPrompt,
    ensureAdvancedSearchBrowseFolder,
    ensureCreateModalFolderLoaded,
    expandPathsRef,
    fileInputRef,
    fileTabContextMenuRef,
    formatFileSize,
    formatTime,
    getAdvancedSearchChatGroups,
    getAdvancedSearchTrees,
    getBackendForType,
    getChatImageUrlForPath,
    getImgbbApiKey,
    getPresignedUrlForPath,
    getS3Client,
    handleApplyPwaUpdate,
    handleBrandClick,
    handleChangeSnippetConfig,
    handleCheckAppUpdate,
    handleCloseFileConfirmDiscard,
    handleCloseFileConfirmSave,
    handleConfirmAppUpdate,
    handleConfirmMove,
    handleConfirmMoveFileFromSidebar,
    handleConfirmMoveFolder,
    handleConfirmRestoreLocalFolder,
    handleConfirmSaveSessionToNote,
    handleCopyCurrentFileToClipboard,
    handleCreateItemSubmit,
    handleCreateNoteFromChatMessage,
    handleDeleteUnusedImagePaths,
    handleDownloadCurrentFile,
    handleDownloadNode,
    handleDownloadToFolder,
    handleDragEndNode,
    handleDropOnFolder,
    handleDropSessionTransfer,
    handleDropToChatAttach,
    handleDuplicateNode,
    handleEditorTypeChange,
    handleExportConfirm,
    handleExportCreds,
    handleImportConfirm,
    handleImportCreds,
    handleNavGuardConfirmDiscard,
    handleNavGuardConfirmSave,
    handleOpenInNewWindow,
    handleOpenNoteFromChat,
    handleOpenSessionDirectory,
    handleOpenSessionFiles,
    handleOpenStorageUsageFile,
    handleOverwriteCredsConfirm,
    handleReadUnusedImageBytes,
    handleReadUnusedImageText,
    handleRegisterChatAttachDrop,
    handleRequestCloseEditor,
    handleRequestDownload,
    handleRequestMove,
    handleRequestMoveFileFromSidebar,
    handleRequestMoveFolder,
    handleRequestSaveSessionToNote,
    handleRequestSessionTransformDownload,
    handleSaveS3Creds,
    handleSaveSnippetConfig,
    handleSaveWithPasswordFromModal,
    handleSaveWithWebAuthn,
    handleSelectHaimFromDownload,
    handleSettingsClose,
    handleShareBlockingChange,
    handleShareComposeClaimed,
    handleShareGroupSendConsumed,
    handleShareNodeToChatWithMyself,
    handleShareNoteToChatWithMyself,
    handleSuffixChangeCancel,
    handleSuffixChangeConfirm,
    handleToggleRecording,
    handleTreeNodeSelect,
    handleUnlock,
    handleUnlockWithWebAuthn,
    handleUnsavedConfirmLeave,
    handleUploadEditorImage,
    handleUploadFileSelect,
    handleUploadFolderSelect,
    handleViewUnsupportedAsText,
    hidePwaUpdateToast,
    hideRecordingCompanions,
    isApplyingPwaUpdate,
    isChatRoute,
    isCheckingAppUpdate,
    isCreateSubmitting,
    isDeleting,
    isDeletingFolder,
    isEditableStorage,
    isEmptyingTrash,
    isLocalTreeLoading,
    isMobile,
    isMoveModalOpen,
    isOpeningSession,
    isPullingFromRemote,
    isRecording,
    isRefreshingFromDisk,
    isSaving,
    isSavingSessionToNote,
    isSavingSnippets,
    isSettingsRoute,
    isUnlocked,
    isUploadingEditorImage,
    isWebdavTreeLoading,
    llmProviderProfiles,
    loadLocalFolderChildren,
    loadS3Files,
    loadWebdavFolderChildren,
    localFolderLoadingPath,
    localRootHandle,
    localTree,
    localVaultFsPath,
    location,
    lockChatViewport,
    masterPassword,
    moveFileTarget,
    moveFolderTarget,
    moveModalSelectPath,
    navGuard,
    navigate,
    needRefresh,
    newFileDefaultParentPath,
    openAdvancedSearchFile,
    openChatWorkspaceTab,
    openLocalFolder,
    openSettingsWorkspaceTab,
    operationStatus,
    pendingCloseTabId,
    pendingCoverSaveRef,
    pendingLocalFolderName,
    proceedWithoutStoredCreds,
    recordingAudioUrl,
    recordingPipelineStatus,
    recordingQueueStats,
    recordingSyncData,
    recordingsList,
    refreshLocalFileFromDisk,
    refreshLocalTree,
    refreshRemoteFile,
    refreshWebdavTree,
    renameCurrentFileFullName,
    renameTreeItem,
    reorderWorkspaceTabs,
    requestAdvancedSearchCreateItem,
    requestCreateItem,
    requestNewFile,
    requestNewTempFile,
    requestSaveEncryptedSettings,
    requestUploadFile,
    requestUploadFolder,
    s3Creds,
    s3Tree,
    saveFile,
    saveMethodModalCreds,
    saveSessionToNoteSelectPath,
    savingTabIds,
    scanActiveStorageUsageTree,
    scriptsLoaded,
    selectedIds,
    selectedRecordingKey,
    sessionWorkspace,
    setAddToNoteSelectPath,
    setChatAttachDropHost,
    setCreateModalContext,
    setCreateModalOpen,
    setCurrentFile,
    setDeleteTarget,
    setDownloadComplete,
    setDownloadModalMode,
    setDownloadProgress,
    setEditedFileName,
    setEditorContent,
    setEmptyTrashTarget,
    setHidePwaUpdateToast,
    setImportFileContent,
    setIsMoveModalOpen,
    setLocalFolderRestoreSettled,
    setMoveFileTarget,
    setMoveFolderTarget,
    setMoveModalSelectPath,
    setPendingCloseTabId,
    setPendingPasswordSave,
    setPendingWebAuthnSave,
    setSaveMethodModalCreds,
    setSaveSessionToNoteSelectPath,
    setSelectedIds,
    setSelectedRecordingKey,
    setShowAppUpdateConfirmModal,
    setShowCloseFileConfirmModal,
    setShowCoverChangeConfirmModal,
    setShowDownloadMethodModal,
    setShowExportPasswordModal,
    setShowImportPasswordModal,
    setShowOverwriteCredsConfirmModal,
    setShowRestoreLocalFolderModal,
    setShowSaveMethodModal,
    setShowSaveSessionToNoteModal,
    setShowSetPasswordModal,
    setShowSuffixChangeConfirmModal,
    setShowUnsavedConfirmModal,
    setSidebarCollapsed,
    setSidebarOpen,
    setStorageMode,
    setSuffixConfirmAction,
    setTreeHoverExpandSettings,
    setWebdavConfig,
    setWorkspaceTabs,
    settleTreeNameConflict,
    shareBlockingAuth,
    shareGroupSend,
    showAlert,
    showAppUpdateConfirmModal,
    showAuthModal,
    showCloseFileConfirmModal,
    showCoverChangeConfirmModal,
    showDownloadMethodModal,
    showExportPasswordModal,
    showHiddenFolders,
    showImportPasswordModal,
    showOverwriteCredsConfirmModal,
    showRestoreLocalFolderModal,
    showSaveMethodModal,
    showSaveSessionToNoteModal,
    showSetPasswordModal,
    showSuffixChangeConfirmModal,
    showTrashFolder,
    showTreeModifiedDate,
    showUnsavedConfirmModal,
    sidebarCollapsed,
    sidebarOpen,
    snippetConfig,
    snippetLoadedFromLocal,
    snippetLoadedFromS3,
    snippetLoadedFromWebdav,
    storageMode,
    treeHoverExpandSettings,
    treeNameConflict,
    treeStickyFolderPathEnabled,
    treeTransferBusy,
    uploadFileInputRef,
    uploadFolderInputRef,
    webauthnPRFSupported,
    webdavConfig,
    webdavFolderLoadingPath,
    webdavReady,
    webdavTree,
    workspaceTabs,
    workspaceTabsEnabled,
    workspaceTabsEnabledRef,
    workspaceTabsRef,
  };
}

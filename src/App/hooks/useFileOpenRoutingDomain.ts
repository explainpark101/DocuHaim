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
 * selectFile + URL/history/desktop/print restore.
 */
export function useFileOpenRoutingDomain(bag: Record<string, any>, glueRef?: { current: AppLogicGlue }) {
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
    openSessionWorkspace,
    restorePersistedWorkspaceTabs,
  } = bag;

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



  const api = {
    selectFile,
    ensureAdvancedSearchBrowseFolder,
    ensureCreateModalFolderLoaded,
    createModalTree,
    handleOpenInNewWindow,
  };
  Object.assign(bag, api);
  if (glueRef) {
    Object.assign(glueRef.current, api);
  }
  return api;
}

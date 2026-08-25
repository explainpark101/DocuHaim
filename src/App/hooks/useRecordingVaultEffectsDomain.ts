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
 * Recording list + vault poll + local restore.
 */
export function useRecordingVaultEffectsDomain(bag: Record<string, any>, glueRef?: { current: AppLogicGlue }) {
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
    setS3Tree,
    setWebdavTree,
    attachLocalRootFolder,
  } = bag;

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

  const api = {
    handleReadUnusedImageText,
    handleReadUnusedImageBytes,
    handleDeleteUnusedImagePaths,
    handleConfirmRestoreLocalFolder,
  };
  Object.assign(bag, api);
  if (glueRef) {
    Object.assign(glueRef.current, api);
  }
  return api;
}

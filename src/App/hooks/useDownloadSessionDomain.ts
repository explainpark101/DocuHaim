// @ts-nocheck — residual cross-domain handlers pending further domain splits
/**
 * Residual app logic still shared across chrome/bootstrap/session/PWA/chat/routing.
 * Prefer carving into use*Domain modules; compose entry is useAppOrchestration.
 */
import { useState, useEffect, useLayoutEffect, useCallback, useMemo, useRef } from 'react';
import { markAutoSaveTimestamp } from '@/App/hooks/autoSaveBridge';
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
 * Download/view-unsupported/session-save-to-note.
 */
export function useDownloadSessionDomain(bag: Record<string, any>, glueRef?: { current: AppLogicGlue }) {
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
    downloadSessionWorkspace,
  } = bag;

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
      markAutoSaveTimestamp();
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

  // snippet save owned by usePwaSnippetsDomain

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

  // moved to useTreeOpsDomain (lines were 4810-4910)

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


  const api = {
    handleViewUnsupportedAsText,
    handleRequestDownload,
    handleRequestSessionSaveChooser,
    handleRequestSessionTransformDownload,
    connectedHaimStorageType,
    writeSessionFileToHaim,
    handleRequestSaveSessionToNote,
    handleSelectHaimFromDownload,
    handleConfirmSaveSessionToNote,
    readBackendBytes,
    downloadMarkdownImageZip,
    handleCopyCurrentFileToClipboard,
    handleDownloadCurrentFile,
    handleDownloadToFolder,
    requestEncMdPassword,
  };
  Object.assign(bag, api);
  if (glueRef) {
    Object.assign(glueRef.current, api);
  }
  return api;
}

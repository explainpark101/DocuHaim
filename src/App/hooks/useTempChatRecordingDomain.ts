// @ts-nocheck — extracted domain handlers
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
 * Temp file shortcuts, chat note/share, recording toggle.
 */
export function useTempChatRecordingDomain(bag: Record<string, any>, glueRef?: { current: any }) {
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
    loadPlainWebdavIfAllowed
  } = bag;

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

  // moved to useTreeOpsDomain (lines were 5100-5321)

  // moved to useTreeOpsDomain (lines were 5323-5432)

  // moved to useTreeOpsDomain (lines were 5434-5752)

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

  // moved to useTreeOpsDomain (lines were 5986-6144)

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

  const api = {
    requestNewTempFile,
    handleCreateNoteFromChatMessage,
    handleOpenNoteFromChat,
    handleOpenStorageUsageFile,
    handleShareNoteToChatWithMyself,
    handleShareNodeToChatWithMyself,
    handleToggleRecording,
    formatTime,
    formatFileSize,
    isEditableStorage
  };
  Object.assign(bag, api);
  if (glueRef) Object.assign(glueRef.current, api);
  return api;
}

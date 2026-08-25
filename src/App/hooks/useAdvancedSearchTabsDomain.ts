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
 * Advanced search trees + tab restore helpers.
 */
export function useAdvancedSearchTabsDomain(bag: Record<string, any>, glueRef?: { current: AppLogicGlue }) {
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
    cycleWorkspaceTab,
    advancedSearchTreesRef,
  } = bag;

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


  const api = {
    getAdvancedSearchTrees,
    getAdvancedSearchChatGroups,
    reopenClosedWorkspaceTab,
    restorePersistedWorkspaceTabs,
    chatStorageReady,
    chatStorageCtx,
  };
  Object.assign(bag, api);
  if (glueRef) {
    Object.assign(glueRef.current, api);
  }
  return api;
}

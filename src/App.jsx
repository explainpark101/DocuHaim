import { useState, useEffect, useLayoutEffect, useCallback, useMemo, useRef, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router';
import { IconX } from '@/components/icons';
import { ChevronsRight } from 'lucide-react';
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
import { pruneNestedMovePaths, getParentFolderPath } from '@/utils/treeMove';
import { resolveNewFileDefaultParentPath } from '@/utils/newFileDefaultParentPath';
import { allocateUniqueCopyName, allocateUniqueFileSystemName, getTreeChildNames, treeChildNameTaken } from '@/utils/treeCopy';
import { resolveUploadDestFileName } from '@/utils/uploadNameConflict';
import { normalizePathToNfc, normalizeUnicodeNfc } from '@/utils/unicodeNfc';
import { resolveTreeDestName } from '@/utils/treeNameConflict';
import { buildFileComparePayload } from '@/utils/buildFileComparePayload';
import {
  upsertTreeTransferBusy,
  removeTreeTransferBusy,
} from '@/utils/treeTransferBusy';
import TreeNameConflictModal from '@/components/modals/TreeNameConflictModal';
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
import Sidebar from '@/components/Sidebar';
import ResizableSidebarPanel from '@/components/ResizableSidebarPanel';
import WorkspaceMainPanels from '@/components/workspace/WorkspaceMainPanels';
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
  closedTabEntryFromWorkspaceTab,
  emptyWorkspaceTabsState,
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
  activateTab,
  applyOpenedFileReducer,
  closeTab,
  findFileTab,
  flushEditorIntoActiveFileTab,
  moveTab,
  openOrActivateChat,
  openOrActivateSettings,
  patchFileTab,
  retargetFileTab,
  retargetFileTabsByPathPrefix,
  softCapPrompt,
} from '@/utils/workspaceTabs/appBridge';
import {
  collapseWorkspaceToLegacy,
  retainOnlyFileTab,
  stripChatTab,
  stripSettingsTab,
} from '@/utils/workspaceTabs/legacyMode';
import { resolveOpenTextContent } from '@/utils/workspaceTabs/resolveOpenText';
import {
  loadWorkspaceTabsAutoSaveMode,
  loadWorkspaceTabsEnabled,
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
import { resolveCreateItemPath } from '@/utils/createItemPath';
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

const ChatWithMyselfPane = lazy(() => import('@/components/chatWithMyself/ChatWithMyselfPane'));
const ExportPDFPage = lazy(() => import('@/pages/ExportPDFPage'));
const LlmAssistPopoutPage = lazy(() => import('@/pages/LlmAssistPopoutPage'));

function RouteSuspenseFallback() {
  return (
    <div className="flex h-full min-h-48 flex-1 items-center justify-center bg-white text-sm text-gray-400 dark:bg-odp-bgSofter dark:text-odp-muted">
      로딩 중…
    </div>
  );
}
import { useRecording } from '@/hooks/useRecording';
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
import {
  loadLocalVaultFsPath,
  saveLocalVaultFsPath,
  clearLocalVaultFsPath,
} from '@/utils/localVaultPathStore';
import {
  pickTauriLocalVaultDirectory,
  readTauriLocalDirectoryTree,
} from '@/utils/storage/tauriLocalBackend';
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
import { loadNewFileAsTempEnabled } from '@/utils/newFileTempSettings';
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
import SaveSessionToNoteModal from '@/components/modals/SaveSessionToNoteModal';
import { useActivityIndicator, ActivityTypes } from '@/contexts/ActivityIndicatorContext';
import { useAuth } from '@/contexts/AuthContext';
import ActivityIndicatorBar from '@/components/ActivityIndicatorBar';
import { clearAllLlmApiKeySessions } from '@/utils/llmApiKeySession';
import { resolveLlmProviderProfiles } from '@/utils/llmProviderProfiles';
import { tryRestoreAuthSession } from '@/utils/authSession';
import {
  hasDesktopStoredCredsMarker,
  loadDesktopWebdavConfig,
  migrateLegacyDesktopSecretsToStronghold,
  saveDesktopCreds,
  saveDesktopWebdavConfig,
  tryRestoreDesktopStrongholdSession,
} from '@/utils/desktopStrongholdSecrets';
import { applyDocumentTheme } from '@/utils/documentTheme';
import {
  applyForcedAppUpdate,
  checkAppBuildUpdate,
  checkServiceWorkerUpdate,
  getLocalAppBuildId,
} from '@/utils/pwaUpdate';
import { useRegisterSW } from 'virtual:pwa-register/react';

/** Ancestor folder paths (with trailing `/`) to expand so a file under `parentPath` is visible. */
function getParentPathsToExpand(parentPath) {
  if (!parentPath || parentPath === '') return [];
  const parts = parentPath.replace(/\/$/, '').split('/').filter(Boolean);
  const result = [];
  let acc = '';
  for (const p of parts) {
    acc += p + '/';
    result.push(acc);
  }
  return result;
}

export default function App() {
  const location = useLocation();
  if (location.pathname === '/llm-assist-popout') {
    return (
      <div className="llm-assist-popout-layout min-h-screen max-w-screen bg-white dark:bg-odp-bgSofter">
        <Suspense fallback={<RouteSuspenseFallback />}>
          <LlmAssistPopoutPage />
        </Suspense>
      </div>
    );
  }
  return <MainApp />;
}

function getExt(fileName) {
  if (!fileName || typeof fileName !== 'string') return '';
  const lastDot = fileName.lastIndexOf('.');
  return lastDot > 0 ? fileName.slice(lastDot) : '';
}

function MainApp() {
  const { addIndicator, removeIndicator, updateIndicator } = useActivityIndicator();
  const { showAlert } = useAlertModal();
  const { showToast } = useToast();
  const auth = useAuth();
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

  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = window.localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  
  // File Systems State
  const [s3Tree, setS3Tree] = useState([]);
  const [localTree, setLocalTree] = useState([]);
  const [webdavTree, setWebdavTree] = useState([]);
  const [sessionWorkspace, setSessionWorkspace] = useState(null);
  const sessionWorkspaceRef = useRef(null);
  const sessionObjectUrlsRef = useRef(new Map());
  /** session file id -> { destPath, storageType } after saving into connected Haim */
  const sessionVaultBindingsRef = useRef(Object.create(null));
  const writeSessionFileToHaimRef = useRef(null);
  const [isOpeningSession, setIsOpeningSession] = useState(false);
  const [isWebdavTreeLoading, setIsWebdavTreeLoading] = useState(false);
  const [webdavFolderLoadingPath, setWebdavFolderLoadingPath] = useState(null);
  const [localRootHandle, setLocalRootHandle] = useState(null);
  const [localVaultFsPath, setLocalVaultFsPath] = useState(() =>
    isDesktopApp() ? loadLocalVaultFsPath() : '',
  );
  const [isLocalTreeLoading, setIsLocalTreeLoading] = useState(false);
  const [localFolderLoadingPath, setLocalFolderLoadingPath] = useState(null);
  const localFolderLoadInFlightRef = useRef(new Set());
  const [showRestoreLocalFolderModal, setShowRestoreLocalFolderModal] = useState(false);
  const [pendingLocalFolderName, setPendingLocalFolderName] = useState('');
  
  // Editor State (mirrors of the active file tab)
  const [currentFile, setCurrentFile] = useState(null);
  const [editorContent, setEditorContent] = useState('');
  /** 저장 시점의 최신 문자열 (Novel 디바운스 onChange 직후에도 동기 반영) */
  const editorContentRef = useRef('');
  const [workspaceTabs, setWorkspaceTabs] = useState(() => emptyWorkspaceTabsState());
  const workspaceTabsRef = useRef(workspaceTabs);
  workspaceTabsRef.current = workspaceTabs;
  const [workspaceTabsEnabled, setWorkspaceTabsEnabled] = useState(() =>
    loadWorkspaceTabsEnabled(),
  );
  const workspaceTabsEnabledRef = useRef(workspaceTabsEnabled);
  workspaceTabsEnabledRef.current = workspaceTabsEnabled;
  const workspaceTabsAutoSaveModeRef = useRef(loadWorkspaceTabsAutoSaveMode());
  const editedFileNameRef = useRef('');
  const [isSaving, setIsSaving] = useState(false);
  /** Tab ids (`type:path`) currently writing in the background. */
  const [savingTabIds, setSavingTabIds] = useState(() => []);
  const savingTabIdsRef = useRef(new Set());
  const [isRefreshingFromDisk, setIsRefreshingFromDisk] = useState(false);
  const [isPullingFromRemote, setIsPullingFromRemote] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [emptyTrashTarget, setEmptyTrashTarget] = useState(null);
  const [isEmptyingTrash, setIsEmptyingTrash] = useState(false);
  const [lastInputAt, setLastInputAt] = useState(null);
  const [lastAutoSaveAt, setLastAutoSaveAt] = useState(null);
  const [lastAutoSyncAt, setLastAutoSyncAt] = useState(null);
  const [showHiddenFolders, setShowHiddenFolders] = useState(() => loadShowHiddenFolders());
  const [showTrashFolder, setShowTrashFolder] = useState(() => loadShowTrashFolder());
  const [editorType, setEditorType] = useState(() => loadEditorType());
  const [storageMode, setStorageMode] = useState(() => loadStorageMode());
  const [webdavConfig, setWebdavConfig] = useState(() => ({ ...DEFAULT_WEBDAV_CONFIG }));

  const fileInputRef = useRef(null);
  const uploadFileInputRef = useRef(null);
  const uploadFolderInputRef = useRef(null);
  const [uploadTarget, setUploadTarget] = useState(null);
  const [deletingFolderPath, setDeletingFolderPath] = useState(null);
  const [isDeletingFolder, setIsDeletingFolder] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [operationStatus, setOperationStatus] = useState('');
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [webauthnPRFSupported, setWebauthnPRFSupported] = useState(false);
  const [webauthnAvailable, setWebauthnAvailable] = useState(false);
  const [moveFolderTarget, setMoveFolderTarget] = useState(null);
  const [moveFileTarget, setMoveFileTarget] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createModalContext, setCreateModalContext] = useState(null);
  const [moveModalSelectPath, setMoveModalSelectPath] = useState(null);
  /** @type {[{ title: string, message: string, error: string, resolve: Function, reject: Function } | null, Function]} */
  const [encMdPrompt, setEncMdPrompt] = useState(null);
  const [addToNoteSelectPath, setAddToNoteSelectPath] = useState(null);
  const [isCreateSubmitting, setIsCreateSubmitting] = useState(false);
  const [showExportPasswordModal, setShowExportPasswordModal] = useState(false);
  const [showImportPasswordModal, setShowImportPasswordModal] = useState(false);
  const [importFileContent, setImportFileContent] = useState(null);
  const [showSaveMethodModal, setShowSaveMethodModal] = useState(false);
  const [saveMethodModalCreds, setSaveMethodModalCreds] = useState(null);
  const [showUnsavedConfirmModal, setShowUnsavedConfirmModal] = useState(false);
  const [editedFileName, setEditedFileName] = useState('');
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
  const [dropTarget, setDropTarget] = useState(null);
  const [treeNameConflict, setTreeNameConflict] = useState(null);
  const [treeTransferBusy, setTreeTransferBusy] = useState([]);
  const treeNameConflictResolverRef = useRef(null);
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
  const isAndroidBrowser = useCallback(() => {
    if (typeof navigator === 'undefined') return false;
    return /Android/i.test(navigator.userAgent || '');
  }, []);
  const triggerBlobDownload = useCallback((blob, fileName) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = normalizeUnicodeNfc(String(fileName || 'download'));
    a.click();
    URL.revokeObjectURL(url);
  }, []);
  const downloadFolderAsZip = useCallback(async (storageType, node, folderName, indicatorId) => {
    const entries = [];
    const nfcFolderName = normalizeUnicodeNfc(String(folderName || 'folder'));

    if (storageType === 's3') {
      const client = createS3Client(s3Creds);
      if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
      const bucket = s3Creds.bucket;
      const prefix = node.path || '';
      const contents = await listObjectsV2(client, bucket, prefix);
      const fileObjects = (contents || []).filter((item) => item.Key && !item.Key.endsWith('/'));
      const totalFiles = fileObjects.length;
      let completed = 0;
      for (const { Key } of fileObjects) {
        const relativeKey = prefix ? Key.slice(prefix.length) : Key;
        if (!relativeKey) continue;
        const { body } = await getObjectBody(client, bucket, Key);
        entries.push({
          path: normalizePathToNfc(`${nfcFolderName}/${relativeKey}`.replace(/\\/g, '/')),
          data: body,
        });
        completed += 1;
        updateIndicator(indicatorId, {
          progress: totalFiles ? Math.min(100, Math.round((completed / totalFiles) * 100)) : 100,
          detail: `${completed}/${totalFiles}`,
        });
      }
    } else if (storageType === 'local') {
      const sourceDirHandle = node.handle || (node.path === '' ? localRootHandle : null);
      if (!sourceDirHandle) throw new Error('원본 폴더 핸들을 찾을 수 없습니다.');
      const collectLocalFiles = async (dirHandle, basePath = '') => {
        for await (const entry of dirHandle.values()) {
          if (entry.kind === 'file') {
            const file = await entry.getFile();
            entries.push({
              path: normalizePathToNfc(
                `${nfcFolderName}/${basePath}${entry.name}`.replace(/\\/g, '/'),
              ),
              data: new Uint8Array(await file.arrayBuffer()),
            });
          } else if (entry.kind === 'directory') {
            await collectLocalFiles(
              entry,
              `${basePath}${normalizeUnicodeNfc(entry.name)}/`,
            );
          }
        }
      };
      await collectLocalFiles(sourceDirHandle);
      updateIndicator(indicatorId, { progress: 100 });
    }

    const zipBlob = await buildZipBlob(entries);
    triggerBlobDownload(zipBlob, `${nfcFolderName}.zip`);
  }, [localRootHandle, s3Creds, triggerBlobDownload, updateIndicator]);
  const [selectedIds, setSelectedIds] = useState(() => new Set());
  const lastSelectedIdRef = useRef(null);

  // Snippet settings (VSCode-style JSON, synced to .settings/snippets.json)
  const [snippetConfig, setSnippetConfig] = useState({ snippets: [] });
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

  const {
    isRecording,
    audioLevel,
    startRecording,
    stopRecording,
    captureSync,
  } = useRecording();

  const [recordingPipelineStatus, setRecordingPipelineStatus] = useState('');
  const [recordingQueueStats, setRecordingQueueStats] = useState({ pending: 0, uploading: 0, failed: 0 });
  const [recordingsList, setRecordingsList] = useState([]);
  const [selectedRecordingKey, setSelectedRecordingKey] = useState(null);
  const [recordingAudioUrl, setRecordingAudioUrl] = useState('');
  const [recordingSyncData, setRecordingSyncData] = useState([]);
  const [swRegistration, setSwRegistration] = useState(null);
  const [isApplyingPwaUpdate, setIsApplyingPwaUpdate] = useState(false);
  const [hidePwaUpdateToast, setHidePwaUpdateToast] = useState(false);
  const [isCheckingAppUpdate, setIsCheckingAppUpdate] = useState(false);
  const [showAppUpdateConfirmModal, setShowAppUpdateConfirmModal] = useState(false);
  const [appUpdateAvailable, setAppUpdateAvailable] = useState(false);
  const [appBuildLocalId, setAppBuildLocalId] = useState(() => getLocalAppBuildId());
  const [appBuildRemoteId, setAppBuildRemoteId] = useState('');
  const [appUpdateCheckError, setAppUpdateCheckError] = useState('');
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
  const currentFileRef = useRef(null);
  const prevHistoryViewPathRef = useRef(undefined);
  const suppressUnsavedNavGuardRef = useRef(false);
  const hasRestoredLastFileRef = useRef(false);
  const hasProcessedOpenFromUrlRef = useRef(false);
  const hasRestoredFromPrintRef = useRef(false);
  const hasPromptedLocalFolderRestoreRef = useRef(false);
  const [localFolderRestoreSettled, setLocalFolderRestoreSettled] = useState(false);
  const saveFileRef = useRef(null);
  const selectFileRawRef = useRef(null);
  /** Per-tab open generation (`type:path` → seq). Parallel opens stay independent. */
  const openFileRequestSeqByKeyRef = useRef(new Map());
  /** Sidebar fills `{ open }` so file tabs can reuse TreeNode context menu. */
  const fileTabContextMenuRef = useRef(null);
  const prevEditorContentRef = useRef('');

  const hasSeededTabsRestoreQueueRef = useRef(false);
  const hasRestoredPersistedWorkspaceTabsRef = useRef(false);
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

  const commitOpenFile = useCallback((file, content = '', options = {}) => {
    if (!file?.type || !file?.id) return false;
    const activate = options.activate !== false;
    const tabId = `${file.type}:${file.id}`;
    const flushed = flushEditorIntoActiveFileTab(workspaceTabsRef.current, {
      editorContent: editorContentRef.current ?? '',
      currentFile: currentFileRef.current,
      editedFileName: editedFileNameRef.current ?? '',
    });
    const existing = findFileTab(flushed, file.type, file.id);
    // Background finish after close: do not reopen the tab.
    if (!existing && !activate) return false;
    let next = applyOpenedFileReducer(flushed, file, content, {
      promptCloseDirty: softCapPrompt,
      activate,
    });
    if (next === flushed && !findFileTab(flushed, file.type, file.id)) {
      return false;
    }
    if (options.baselineContent != null && typeof options.baselineContent === 'string') {
      next = patchFileTab(next, tabId, {
        baselineContent: options.baselineContent,
        currentFile: { ...file, content: options.baselineContent },
        editorContent: content,
      });
    }
    // Legacy mode: one file slot only (drop other file tabs + chat tab).
    if (!workspaceTabsEnabledRef.current) {
      next = retainOnlyFileTab(next, tabId);
    }
    workspaceTabsRef.current = next;
    setWorkspaceTabs(next);
    // Only sync editor mirrors when this tab is (or became) active.
    if (next.activeId === tabId) {
      setCurrentFile(file);
      currentFileRef.current = file;
      setEditorContent(content);
      editorContentRef.current = content;
      setEditedFileName(file.name || '');
      editedFileNameRef.current = file.name || '';
    }
    return true;
  }, []);

  const activateWorkspaceTab = useCallback(
    (id, options = {}) => {
      const { navigateUrl = true } = options;
      const flushed = flushEditorIntoActiveFileTab(workspaceTabsRef.current, {
        editorContent: editorContentRef.current ?? '',
        currentFile: currentFileRef.current,
        editedFileName: editedFileNameRef.current ?? '',
      });
      const leaving = getActiveTab(flushed);
      if (
        isFileTab(leaving) &&
        leaving.id !== id &&
        isFileTabDirty(leaving) &&
        leaving.storageType !== SESSION_STORAGE_TYPE
      ) {
        maybeAutoSaveOnFocusChange(leaving.currentFile, leaving.editorContent);
      }
      const activated = activateTab(flushed, id);
      workspaceTabsRef.current = activated;
      setWorkspaceTabs(activated);
      const active = getActiveTab(activated);
      if (isFileTab(active)) {
        const file = active.currentFile;
        setCurrentFile(file);
        currentFileRef.current = file;
        setEditorContent(active.editorContent);
        editorContentRef.current = active.editorContent;
        setEditedFileName(active.editedFileName || String(file?.name || ''));
        if (navigateUrl) {
          const viewPath =
            (typeof file?.id === 'string' && file.id) || active.path;
          navigate(`/view/${viewPath}`);
        }
      } else if (isChatTab(active)) {
        setCurrentFile(null);
        currentFileRef.current = null;
        if (navigateUrl) navigate('/chat');
      } else if (isSettingsTab(active)) {
        setCurrentFile(null);
        currentFileRef.current = null;
        if (navigateUrl) navigate('/settings');
      } else if (navigateUrl) {
        navigate('/');
      }
    },
    [navigate, maybeAutoSaveOnFocusChange],
  );

  const openChatWorkspaceTab = useCallback(
    (options = {}) => {
      const { navigateUrl = true } = options;
      if (!workspaceTabsEnabledRef.current) {
        // Legacy: exclusive /chat route — flush editor to the single file tab if any.
        const flushed = flushEditorIntoActiveFileTab(workspaceTabsRef.current, {
          editorContent: editorContentRef.current ?? '',
          currentFile: currentFileRef.current,
          editedFileName: editedFileNameRef.current ?? '',
        });
        const leaving = getActiveFileTab(flushed);
        if (leaving && isFileTabDirty(leaving) && leaving.storageType !== SESSION_STORAGE_TYPE) {
          maybeAutoSaveOnFocusChange(leaving.currentFile, leaving.editorContent);
        }
        const next = stripChatTab(flushed);
        workspaceTabsRef.current = next;
        setWorkspaceTabs(next);
        setCurrentFile(null);
        currentFileRef.current = null;
        if (navigateUrl) navigate('/chat');
        return;
      }
      const flushed = flushEditorIntoActiveFileTab(workspaceTabsRef.current, {
        editorContent: editorContentRef.current ?? '',
        currentFile: currentFileRef.current,
        editedFileName: editedFileNameRef.current ?? '',
      });
      const leaving = getActiveFileTab(flushed);
      if (leaving && isFileTabDirty(leaving) && leaving.storageType !== SESSION_STORAGE_TYPE) {
        maybeAutoSaveOnFocusChange(leaving.currentFile, leaving.editorContent);
      }
      const next = openOrActivateChat(flushed);
      workspaceTabsRef.current = next;
      setWorkspaceTabs(next);
      setCurrentFile(null);
      currentFileRef.current = null;
      if (navigateUrl) navigate('/chat');
    },
    [navigate, maybeAutoSaveOnFocusChange],
  );

  const openSettingsWorkspaceTab = useCallback(
    (options = {}) => {
      const { navigateUrl = true, hash } = options;
      const target =
        typeof hash === 'string' && hash
          ? `/settings${hash.startsWith('#') ? hash : `#${hash}`}`
          : '/settings';
      if (!workspaceTabsEnabledRef.current) {
        const flushed = flushEditorIntoActiveFileTab(workspaceTabsRef.current, {
          editorContent: editorContentRef.current ?? '',
          currentFile: currentFileRef.current,
          editedFileName: editedFileNameRef.current ?? '',
        });
        const leaving = getActiveFileTab(flushed);
        if (leaving && isFileTabDirty(leaving) && leaving.storageType !== SESSION_STORAGE_TYPE) {
          maybeAutoSaveOnFocusChange(leaving.currentFile, leaving.editorContent);
        }
        const next = stripSettingsTab(flushed);
        workspaceTabsRef.current = next;
        setWorkspaceTabs(next);
        setCurrentFile(null);
        currentFileRef.current = null;
        if (navigateUrl) navigate(target);
        return;
      }
      const flushed = flushEditorIntoActiveFileTab(workspaceTabsRef.current, {
        editorContent: editorContentRef.current ?? '',
        currentFile: currentFileRef.current,
        editedFileName: editedFileNameRef.current ?? '',
      });
      const leaving = getActiveFileTab(flushed);
      if (leaving && isFileTabDirty(leaving) && leaving.storageType !== SESSION_STORAGE_TYPE) {
        maybeAutoSaveOnFocusChange(leaving.currentFile, leaving.editorContent);
      }
      const next = openOrActivateSettings(flushed);
      workspaceTabsRef.current = next;
      setWorkspaceTabs(next);
      setCurrentFile(null);
      currentFileRef.current = null;
      if (navigateUrl) navigate(target);
    },
    [navigate, maybeAutoSaveOnFocusChange],
  );

  const collapseToLegacyWorkspace = useCallback(() => {
    const flushed = flushEditorIntoActiveFileTab(workspaceTabsRef.current, {
      editorContent: editorContentRef.current ?? '',
      currentFile: currentFileRef.current,
      editedFileName: editedFileNameRef.current ?? '',
    });
    const wasChat = isChatRoute;
    const next = collapseWorkspaceToLegacy(flushed);
    workspaceTabsRef.current = next;
    setWorkspaceTabs(next);
    const active = getActiveTab(next);
    if (wasChat) {
      // Stay on exclusive /chat; keep a single file tab in store for when leaving chat.
      setCurrentFile(null);
      currentFileRef.current = null;
      return;
    }
    if (isFileTab(active)) {
      const file = active.currentFile;
      setCurrentFile(file);
      currentFileRef.current = file;
      setEditorContent(active.editorContent);
      editorContentRef.current = active.editorContent;
      setEditedFileName(active.editedFileName || String(file?.name || ''));
    }
  }, [isChatRoute]);

  const closeWorkspaceTabById = useCallback(
    (id, options = {}) => {
      const { skipDirtyConfirm = false, skipHistory = false } = options;
      const closing = workspaceTabsRef.current.tabs.find((t) => t.id === id);
      if (!skipDirtyConfirm && isFileTab(closing) && isFileTabDirty(closing)) {
        setPendingCloseTabId(id);
        setShowCloseFileConfirmModal(true);
        return;
      }
      if (!skipHistory && closing) {
        pushClosedTab(closedTabEntryFromWorkspaceTab(closing));
      }
      if (isFileTab(closing)) {
        const closedPath =
          closing.currentFile?.id || closing.path || '';
        if (closedPath) clearEncMdPassword(closedPath);
      }
      const next = closeTab(workspaceTabsRef.current, id);
      workspaceTabsRef.current = next;
      setWorkspaceTabs(next);
      const active = getActiveTab(next);
      if (isFileTab(active)) {
        const file = active.currentFile;
        setCurrentFile(file);
        currentFileRef.current = file;
        setEditorContent(active.editorContent);
        editorContentRef.current = active.editorContent;
        setEditedFileName(active.editedFileName || String(file?.name || ''));
        navigate(`/view/${(typeof file?.id === 'string' && file.id) || active.path}`);
      } else if (isChatTab(active)) {
        setCurrentFile(null);
        currentFileRef.current = null;
        navigate('/chat');
      } else if (isSettingsTab(active)) {
        setCurrentFile(null);
        currentFileRef.current = null;
        navigate('/settings');
      } else {
        setCurrentFile(null);
        currentFileRef.current = null;
        setEditorContent('');
        editorContentRef.current = '';
        setEditedFileName('');
        navigate('/');
      }
    },
    [navigate],
  );

  const reorderWorkspaceTabs = useCallback((activeId, overId) => {
    const next = moveTab(workspaceTabsRef.current, activeId, overId);
    workspaceTabsRef.current = next;
    setWorkspaceTabs(next);
  }, []);

  const cycleWorkspaceTab = useCallback(
    (delta) => {
      if (!workspaceTabsEnabledRef.current) return;
      const { tabs, activeId } = workspaceTabsRef.current;
      if (!tabs.length) return;
      let idx = tabs.findIndex((t) => t.id === activeId);
      if (idx < 0) idx = delta > 0 ? -1 : 0;
      const nextIdx = (idx + delta + tabs.length) % tabs.length;
      const next = tabs[nextIdx];
      if (next) activateWorkspaceTab(next.id);
    },
    [activateWorkspaceTab],
  );

  const handleEditorTypeChange = useCallback((next) => {
    saveEditorType(next);
    setEditorType(next);
  }, []);

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

  useEffect(() => {
    applyDocumentTheme(theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  // 1. Init (S3 client etc. are from npm modules; no script loading)
  // Same-tab reload: restore unlock from sessionStorage before showing AuthModal.
  // If a share-target chooser is open, defer AuthModal until that flow finishes.
  const [authWanted, setAuthWanted] = useState(false);
  // True until ShareTargetGate finishes bootstrap / chooser — prevents AuthModal flash.
  const [shareBlockingAuth, setShareBlockingAuth] = useState(true);
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
    void loadWebdavConfig().then(setWebdavConfig);
  }, []);

  useEffect(() => {
    setScriptsLoaded(true);
    if (isUnlocked) return;

    let cancelled = false;
    (async () => {
      const session = await tryRestoreAuthSession();
      if (cancelled) return;
      if (session) {
        unlock(session.creds, session.password);
        if (session.password) {
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
          navigate('/settings');
          return;
        }
      }

      const stored = localStorage.getItem('s3NotesEncrypted');
      if (stored) {
        setAuthWanted(true);
      } else {
        proceedWithoutStoredCreds();
        navigate('/settings');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isUnlocked, unlock, proceedWithoutStoredCreds, navigate]);

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

      const stored = localStorage.getItem('s3NotesEncrypted');
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
        await saveDesktopCreds(creds);
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

  const handleSaveS3Creds = (creds) => {
    if (isDesktopApp()) {
      void (async () => {
        try {
          if (hasStoredCreds()) {
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
      return hasDesktopStoredCredsMarker();
    }
    return (
      typeof localStorage !== 'undefined' &&
      (!!localStorage.getItem('s3NotesEncrypted') || !!getStoredWebAuthn())
    );
  };

  const requestSaveEncryptedSettings = (creds, password, options = {}) => {
    if (hasStoredCreds()) {
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

  const handleRequestCloseEditor = () => {
    const active = getActiveTab(workspaceTabsRef.current);
    if (active) {
      closeWorkspaceTabById(active.id);
      return;
    }
    if (hasUnsavedEditorChanges()) {
      setPendingCloseTabId(null);
      setShowCloseFileConfirmModal(true);
    } else {
      closeCurrentFile();
    }
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

  // 3. S3 Actions (using @aws-sdk/client-s3)
  const getS3Client = useCallback((creds = s3Creds) => createS3Client(creds), [s3Creds]);

  const getBackendForType = useCallback(
    (type) =>
      createStorageBackendForType(type, {
        getS3Client,
        s3Creds,
        localRootHandle,
        localVaultFsPath,
        webdavConfig,
      }),
    [getS3Client, s3Creds, localRootHandle, localVaultFsPath, webdavConfig],
  );

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

  const webdavReady = Boolean(webdavConfig?.endpoint && webdavConfig?.username);

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

  const refreshWebdavTree = useCallback(async () => {
    if (!webdavReady) return;
    setIsWebdavTreeLoading(true);
    try {
      const backend = createWebdavBackend(webdavConfig);
      const children = await backend.listChildren('');
      setWebdavTree(children);
    } catch (err) {
      console.error('WebDAV tree load error:', err);
    } finally {
      setIsWebdavTreeLoading(false);
    }
  }, [webdavReady, webdavConfig]);

  const loadWebdavFolderChildren = useCallback(
    async (folderNode) => {
      if (!folderNode?.path || folderNode.childrenLoaded === true || !webdavReady) return;
      setWebdavFolderLoadingPath(folderNode.path);
      try {
        const backend = createWebdavBackend(webdavConfig);
        const children = await backend.listChildren(folderNode.path);
        setWebdavTree((prev) => patchWebdavTreeChildren(prev, folderNode.path, children));
      } finally {
        setWebdavFolderLoadingPath((current) => (current === folderNode.path ? null : current));
      }
    },
    [webdavReady, webdavConfig],
  );

  const loadS3Files = useCallback(async (creds = s3Creds) => {
    const client = getS3Client(creds);
    if (!client || !creds.bucket) return;
    try {
      const contents = await listObjectsV2(client, creds.bucket, '');
      setS3Tree(buildS3Tree(contents));
    } catch (err) {
      console.error("S3 Load Error:", err);
    }
  }, [getS3Client, s3Creds]);

  const scanActiveStorageUsageTree = useCallback(async () => {
    if (storageMode === STORAGE_MODE_LOCAL) {
      if (isDesktopApp() && localVaultFsPath) {
        return readTauriLocalDirectoryTree(localVaultFsPath);
      }
      if (!localRootHandle) throw new Error('로컬 폴더가 열려 있지 않습니다.');
      return readLocalDirectoryTree(localRootHandle, '', localRootHandle);
    }
    if (storageMode === STORAGE_MODE_WEBDAV) {
      if (!webdavReady) throw new Error('WebDAV가 연결되지 않았습니다.');
      const backend = createWebdavBackend(webdavConfig);
      return backend.listAll();
    }
    const client = getS3Client();
    if (!client || !s3Creds.bucket) throw new Error('S3가 연결되지 않았습니다.');
    const contents = await listObjectsV2(client, s3Creds.bucket, '');
    return buildS3Tree(contents);
  }, [
    storageMode,
    localRootHandle,
    localVaultFsPath,
    webdavReady,
    webdavConfig,
    getS3Client,
    s3Creds.bucket,
  ]);

  const canScanStorageUsage =
    (storageMode === STORAGE_MODE_LOCAL && Boolean(localRootHandle || localVaultFsPath)) ||
    (storageMode === STORAGE_MODE_WEBDAV && webdavReady) ||
    (storageMode !== STORAGE_MODE_LOCAL &&
      storageMode !== STORAGE_MODE_WEBDAV &&
      Boolean(s3Creds.bucket));

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
      (storageMode === 'local' && localRootHandle) ||
      (storageMode === 'webdav' && webdavReady) ||
      (storageMode === 's3' && s3Creds.bucket);
    if (!ready) return;
    syncLlmPromptTemplatesToRemote();
  }, [isUnlocked, storageMode, localRootHandle, webdavReady, s3Creds.bucket]);

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
      const isLocalUpload = currentFile?.type === 'local' && localRootHandle;
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
      if (isLocalUpload && !localRootHandle) {
        dbgClipboard('app:upload:abort', { reason: 'no local root handle' });
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
            path = await uploadLocalEditorImage(localRootHandle, file, {
              imagePathPrefix,
              signal: uploadController.signal,
              onProgress: (percent) => reportProgress(file, percent),
            });
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
        if (isLocalUpload && paths.length > 0 && localRootHandle) {
          setIsLocalTreeLoading(true);
          try {
            const tree = await readLocalDirectoryTree(localRootHandle, '', localRootHandle);
            setLocalTree(tree);
          } finally {
            setIsLocalTreeLoading(false);
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
    [getS3Client, s3Creds, currentFile, localRootHandle, webdavReady, getBackendForType, refreshWebdavTree, addIndicator, removeIndicator, updateIndicator, flushSessionEditorToWorkspace]
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
      if (currentFile?.type === 'local' && localRootHandle) {
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
    [getS3Client, s3Creds, currentFile, localRootHandle, webdavReady, getBackendForType, getSessionObjectUrl]
  );

  /** Chat with Myself: resolve by storageMode (not current editor file). */
  const getChatImageUrlForPath = useCallback(
    async (path) => {
      if (storageMode === 'local' && localRootHandle) {
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
    [storageMode, localRootHandle, getS3Client, s3Creds.bucket, webdavConfig],
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

  // 4. Local Folder Load
  const attachLocalRootFolder = useCallback(async (dirHandle, { fullScan = false } = {}) => {
    const canWrite = await ensureDirectoryReadWritePermission(dirHandle);
    if (!canWrite) {
      throw new Error('선택한 폴더에 쓰기 권한이 없습니다. 폴더를 다시 선택해 주세요.');
    }
    setIsLocalTreeLoading(true);
    setLocalRootHandle(dirHandle);
    try {
      await saveLocalRootHandle(dirHandle);
      let tree = fullScan
        ? await readLocalDirectoryTree(dirHandle, '', dirHandle)
        : await readLocalDirectoryLevel(dirHandle, '', dirHandle);
      if (!fullScan) {
        tree = await hydrateExpandedLocalFolders(tree, loadExpandedFolderPaths().local);
      }
      setLocalTree(tree);
    } finally {
      setIsLocalTreeLoading(false);
    }
  }, []);

  const loadLocalFolderChildren = useCallback(async (folderNode) => {
    if (!folderNode?.handle || folderNode.childrenLoaded === true) return;
    const folderPath = folderNode.path;
    if (!folderPath || localFolderLoadInFlightRef.current.has(folderPath)) return;
    localFolderLoadInFlightRef.current.add(folderPath);
    setLocalFolderLoadingPath(folderPath);
    try {
      const children = await readLocalDirectoryLevel(
        folderNode.handle,
        folderPath,
        folderNode.handle,
      );
      setLocalTree((prev) => patchLocalTreeChildren(prev, folderPath, children));
    } finally {
      localFolderLoadInFlightRef.current.delete(folderPath);
      setLocalFolderLoadingPath((current) => (current === folderPath ? null : current));
    }
  }, []);

  const openLocalFolder = async () => {
    try {
      if (isDesktopApp()) {
        const abs = await pickTauriLocalVaultDirectory();
        if (!abs) return;
        saveLocalVaultFsPath(abs);
        setLocalVaultFsPath(abs);
        setLocalRootHandle(null);
        setStorageMode(STORAGE_MODE_LOCAL);
        setIsLocalTreeLoading(true);
        try {
          const tree = await readTauriLocalDirectoryTree(abs);
          setLocalTree(tree);
        } finally {
          setIsLocalTreeLoading(false);
        }
        return;
      }
      // Must request readwrite; default showDirectoryPicker mode is read-only.
      const dirHandle = await pickLocalRootDirectory();
      clearLocalVaultFsPath();
      setLocalVaultFsPath('');
      setStorageMode(STORAGE_MODE_LOCAL);
      await attachLocalRootFolder(dirHandle);
    } catch (e) {
      if (e?.name === 'AbortError') return;
      console.error('Local folder selection cancelled or failed:', e);
      alert(e?.message || '로컬 폴더를 열지 못했습니다.');
    }
  };

  const refreshLocalTree = async () => {
    if (isDesktopApp() && localVaultFsPath) {
      setIsLocalTreeLoading(true);
      try {
        const tree = await readTauriLocalDirectoryTree(localVaultFsPath);
        setLocalTree(tree);
      } finally {
        setIsLocalTreeLoading(false);
      }
      return;
    }
    if (!localRootHandle) return;
    setIsLocalTreeLoading(true);
    try {
      const tree = await readLocalDirectoryTree(localRootHandle, '', localRootHandle);
      setLocalTree(tree);
    } finally {
      setIsLocalTreeLoading(false);
    }
  };

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
  const selectFileRaw = useCallback(async (type, node, options = {}) => {
    if (node.type === 'folder') return;
    const requestKey = `${type}:${node.path}`;
    const prevAttempt = openFileRequestSeqByKeyRef.current.get(requestKey) || 0;
    const attemptId = prevAttempt + 1;
    openFileRequestSeqByKeyRef.current.set(requestKey, attemptId);
    const isCurrentAttempt = () =>
      openFileRequestSeqByKeyRef.current.get(requestKey) === attemptId;
    const skipNavigate = options.skipNavigate === true;
    const goToViewPath = () => {
      if (!skipNavigate) navigate(`/view/${node.path}`);
    };

    // Already-open file: activate that tab first, then sync from server/disk.
    const existingBefore = findFileTab(workspaceTabsRef.current, type, node.path);
    let didNavigateEarly = false;

    if (existingBefore) {
      const activeBefore = getActiveFileTab(workspaceTabsRef.current);
      const shouldActivate = activeBefore ? activeBefore.id !== existingBefore.id : true;
      if (shouldActivate) {
        activateWorkspaceTab(existingBefore.id, { navigateUrl: !skipNavigate });
        if (!skipNavigate) didNavigateEarly = true;
      }
    }

    const commit = (file, content = '', commitOpts = {}) => {
      if (!isCurrentAttempt()) {
        if (typeof file?.objectUrl === 'string' && file.objectUrl) {
          try {
            URL.revokeObjectURL(file.objectUrl);
          } catch {
            /* ignore */
          }
        }
        return false;
      }
      const tabId = `${type}:${node.path}`;
      const wasActive = workspaceTabsRef.current.activeId === tabId;
      // Never steal focus when fetch finishes — activate only via markAsLoading / existing activate.
      const ok = commitOpenFile(file, content, { ...commitOpts, activate: false });
      if (!ok) {
        if (typeof file?.objectUrl === 'string' && file.objectUrl) {
          try {
            URL.revokeObjectURL(file.objectUrl);
          } catch {
            /* ignore */
          }
        }
        return false;
      }
      if (!wasActive) {
        const label = String(node.name || file?.name || node.path || '파일');
        showToast({ message: `「${label}」 로딩 완료`, durationMs: 2200 });
      }
      return true;
    };

    const markAsLoading = () => {
      if (!isCurrentAttempt()) return false;

      if (existingBefore) {
        const live = findFileTab(workspaceTabsRef.current, type, node.path);
        if (!live) return true;

        const next = patchFileTab(workspaceTabsRef.current, live.id, {
          currentFile: { ...live.currentFile, viewer: 'loading' },
        });
        workspaceTabsRef.current = next;
        setWorkspaceTabs(next);

        const active = getActiveFileTab(next);
        if (active && active.id === live.id) {
          setCurrentFile(active.currentFile);
          currentFileRef.current = active.currentFile;
          setEditorContent(active.editorContent);
          editorContentRef.current = active.editorContent;
          setEditedFileName(active.editedFileName || String(active.currentFile?.name || ''));
          editedFileNameRef.current = active.editedFileName || String(active.currentFile?.name || '');
        }
        return true;
      }

      const placeholder = {
        type,
        id: node.path,
        name: node.name,
        viewer: 'loading',
      };

      const ok = commitOpenFile(placeholder, '', { activate: true });
      if (ok && !skipNavigate && !didNavigateEarly) {
        goToViewPath();
        didNavigateEarly = true;
      }
      return ok;
    };

    try {
      if (type === 'webdav') {
      if (!webdavReady) return;
      try {
        const ok = markAsLoading();
        if (!ok) return;

        const backend = createWebdavBackend(webdavConfig);
        const opened = await openPathFileFromBackend({ backend, type: 'webdav', node });
        if (!opened) return;
        let { currentFile: openedFile, editorContent: content } = opened;
        if (opened.needsEncMdPassword) {
          const plain = await unlockEncMdOrPrompt(node.path, opened.encMdCiphertext);
          if (plain == null) return;
          content = plain;
          openedFile = { ...openedFile, content: plain, encMd: true };
        }
        // Do not revokePrev(other tab) — only this tab's media is replaced via commitOpenFile.
        commit(openedFile, content);
      } catch (err) {
        console.error('WebDAV Read Error:', err);
      }
      return;
      }

    const ext = (node.name.split('.').pop() || '').toLowerCase();

    if (type === 's3') {
      const client = getS3Client();
      if (!client) return;

      const ok = markAsLoading();
      if (!ok) return;

      const imageExts = ['png', 'jpg', 'jpeg', 'gif', 'webp'];

      if (imageExts.includes(ext)) {
        try {
          const { body, ContentLength } = await getObjectBody(client, s3Creds.bucket, node.path);
          const mime = `image/${ext === 'jpg' ? 'jpeg' : ext}`;
          const blob = new Blob([body], { type: mime });
          const url = URL.createObjectURL(blob);
          commit({
            type: 's3',
            id: node.path,
            name: node.name,
            viewer: 'image',
            objectUrl: url,
            size: typeof ContentLength === 'number' ? ContentLength : null,
            lastModified: node.lastModified,
          }, '');
        } catch (err) {
          console.error('S3 Read Error:', err);
        }
        return;
      }

      if (ext === 'pdf') {
        try {
          const { body, ContentLength } = await getObjectBody(client, s3Creds.bucket, node.path);
          const blob = new Blob([body], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          commit({
            type: 's3',
            id: node.path,
            name: node.name,
            viewer: 'pdf',
            objectUrl: url,
            size: typeof ContentLength === 'number' ? ContentLength : null,
            lastModified: node.lastModified,
          }, '');
        } catch (err) {
          console.error('S3 Read Error:', err);
        }
        return;
      }

      if (ext === 'md' || ext === 'markdown' || ext === '') {
        try {
          const { body, ContentLength, LastModified } = await getObjectBody(client, s3Creds.bucket, node.path);
          const serverText = new TextDecoder('utf-8').decode(body);
          const serverLastModified = LastModified ?? node.lastModified;
          const serverLastModTs =
            serverLastModified instanceof Date
              ? serverLastModified.getTime()
              : serverLastModified
                ? new Date(serverLastModified).getTime()
                : 0;

          const draftKey = getDraftKey('s3', node.path);
          if (isEncMdPath(node.path)) {
            await deleteMemoDraft(draftKey);
          }
          const draft = isEncMdPath(node.path)
            ? null
            : await getMemoDraft(draftKey);
          const existingTab = findFileTab(workspaceTabsRef.current, 's3', node.path);
          const resolved = await resolveOpenTextContent({
            serverText,
            serverLastModTs,
            existingTab,
            draft,
            confirmMessage: '서버에 더 최신 버전이 있습니다. 기존 내용을 버리고 서버 버전으로 교체할까요?',
            deleteDraft: () => deleteMemoDraft(draftKey),
          });

          let contentToUse = resolved.contentToUse;
          let baselineContent = resolved.baselineContent;
          if (isEncMdPath(node.path)) {
            const plain = await unlockEncMdOrPrompt(node.path, serverText);
            if (plain == null) return;
            contentToUse = plain;
            baselineContent = plain;
          }

          commit({
            type: 's3',
            id: node.path,
            name: node.name,
            content: baselineContent,
            viewer: 'markdown',
            size: typeof ContentLength === 'number' ? ContentLength : null,
            lastModified: serverLastModified ?? node.lastModified,
            ...(isEncMdPath(node.path) ? { encMd: true } : {}),
          }, contentToUse, { baselineContent });
        } catch (err) {
          console.error('S3 Read Error:', err);
        }
        return;
      }

      if (ext === 'json') {
        try {
          const { body, ContentLength } = await getObjectBody(client, s3Creds.bucket, node.path);
          const raw = new TextDecoder('utf-8').decode(body);
          const maxFormatLen = 100000;
          let display = raw;
          if (raw.length <= maxFormatLen) {
            try {
              const parsed = JSON.parse(raw);
              display = JSON.stringify(parsed, null, 2);
            } catch {
              display = raw;
            }
          }
          commit({
            type: 's3',
            id: node.path,
            name: node.name,
            content: display,
            viewer: 'json',
            size: typeof ContentLength === 'number' ? ContentLength : null,
            lastModified: node.lastModified,
          }, display);
        } catch (err) {
          console.error('S3 Read Error:', err);
        }
        return;
      }

      if (ext === 'html' || ext === 'htm' || ext === 'svg') {
        try {
          const { body, ContentLength } = await getObjectBody(client, s3Creds.bucket, node.path);
          const text = new TextDecoder('utf-8').decode(body);
          const viewer = ext === 'svg' ? 'svg' : 'html';
          commit({
            type: 's3',
            id: node.path,
            name: node.name,
            content: text,
            viewer,
            size: typeof ContentLength === 'number' ? ContentLength : null,
            lastModified: node.lastModified,
          }, text);
        } catch (err) {
          console.error('S3 Read Error:', err);
        }
        return;
      }

      const audioExts = ['m4a', 'mp3', 'wav', 'ogg', 'aac', 'flac', 'weba'];
      const videoExts = ['mp4', 'webm', 'ogv', 'mov'];
      const isAudio = audioExts.includes(ext);
      const isVideo = videoExts.includes(ext);

      if (isAudio) {
        try {
          const { body, ContentLength } = await getObjectBody(client, s3Creds.bucket, node.path);
          const mime = ext === 'm4a' || ext === 'mp4' ? 'audio/mp4' : ext === 'mp3' ? 'audio/mpeg' : ext === 'ogg' || ext === 'ogv' ? 'audio/ogg' : ext === 'weba' ? 'audio/webm' : `audio/${ext}`;
          const blob = new Blob([body], { type: mime });
          const url = URL.createObjectURL(blob);
          commit({
            type: 's3',
            id: node.path,
            name: node.name,
            viewer: 'audio',
            objectUrl: url,
            size: typeof ContentLength === 'number' ? ContentLength : null,
            lastModified: node.lastModified,
          }, '');
        } catch (err) {
          console.error('S3 Read Error:', err);
        }
        return;
      }

      if (isVideo) {
        try {
          const { body, ContentLength } = await getObjectBody(client, s3Creds.bucket, node.path);
          const mime = ext === 'mp4' || ext === 'mov' ? 'video/mp4' : ext === 'webm' ? 'video/webm' : 'video/ogg';
          const blob = new Blob([body], { type: mime });
          const url = URL.createObjectURL(blob);
          commit({
            type: 's3',
            id: node.path,
            name: node.name,
            viewer: 'video',
            objectUrl: url,
            size: typeof ContentLength === 'number' ? ContentLength : null,
            lastModified: node.lastModified,
          }, '');
        } catch (err) {
          console.error('S3 Read Error:', err);
        }
        return;
      }

      commit({
        type: 's3',
        id: node.path,
        name: node.name,
        viewer: 'unsupported',
        size: null,
        lastModified: node.lastModified,
      }, '');
    } else if (type === 'local') {
      const ok = markAsLoading();
      if (!ok) return;

      // Desktop (Tauri) vault: no FileSystemAccess handles — use path backend.
      if ((localVaultFsPath || isDesktopApp()) && !node.handle) {
        const backend = getBackendForType('local');
        if (!backend?.isReady?.()) {
          alert('로컬 폴더를 먼저 열어주세요.');
          return;
        }
        const opened = await openPathFileFromBackend({ backend, type: 'local', node });
        if (!opened) return;
        let { currentFile: openedFile, editorContent: content } = opened;
        if (opened.needsEncMdPassword) {
          const plain = await unlockEncMdOrPrompt(node.path, opened.encMdCiphertext);
          if (plain == null) return;
          content = plain;
          openedFile = { ...openedFile, content: plain, encMd: true };
        }
        commit(openedFile, content || '');
        return;
      }

      const file = await node.handle.getFile();
      const serverLastModTs = file.lastModified ?? 0;

      const imageExts = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
      const audioExts = ['m4a', 'mp3', 'wav', 'ogg', 'aac', 'flac', 'weba'];
      const videoExts = ['mp4', 'webm', 'ogv', 'mov'];

      const openLocalBlobViewer = (viewer, mime) => {
        const blob = new Blob([file], { type: mime || file.type || undefined });
        const url = URL.createObjectURL(blob);
        commit({
          type: 'local',
          id: node.path,
          name: node.name,
          viewer,
          objectUrl: url,
          handle: node.handle,
          parentHandle: node.parentHandle,
          size: typeof file.size === 'number' ? file.size : null,
          lastModified: file.lastModified,
        }, '');
      };

      if (imageExts.includes(ext)) {
        const mime = `image/${ext === 'jpg' ? 'jpeg' : ext}`;
        openLocalBlobViewer('image', mime);
        return;
      }

      if (ext === 'pdf') {
        openLocalBlobViewer('pdf', 'application/pdf');
        return;
      }

      if (audioExts.includes(ext)) {
        const mime = ext === 'm4a' || ext === 'mp4' ? 'audio/mp4' : ext === 'mp3' ? 'audio/mpeg' : ext === 'ogg' ? 'audio/ogg' : ext === 'weba' ? 'audio/webm' : `audio/${ext}`;
        openLocalBlobViewer('audio', mime);
        return;
      }

      if (videoExts.includes(ext)) {
        const mime = ext === 'mp4' || ext === 'mov' ? 'video/mp4' : ext === 'webm' ? 'video/webm' : 'video/ogg';
        openLocalBlobViewer('video', mime);
        return;
      }

      if (ext === 'json') {
        const raw = await file.text();
        const maxFormatLen = 100000;
        let display = raw;
        if (raw.length <= maxFormatLen) {
          try {
            display = JSON.stringify(JSON.parse(raw), null, 2);
          } catch {
            display = raw;
          }
        }
        commit({
          type: 'local',
          id: node.path,
          name: node.name,
          content: display,
          handle: node.handle,
          parentHandle: node.parentHandle,
          viewer: 'json',
          size: typeof file.size === 'number' ? file.size : null,
          lastModified: file.lastModified,
        }, display);
        return;
      }

      if (ext === 'html' || ext === 'htm' || ext === 'svg') {
        const text = await file.text();
        const viewer = ext === 'svg' ? 'svg' : 'html';
        commit({
          type: 'local',
          id: node.path,
          name: node.name,
          content: text,
          handle: node.handle,
          parentHandle: node.parentHandle,
          viewer,
          size: typeof file.size === 'number' ? file.size : null,
          lastModified: file.lastModified,
        }, text);
        return;
      }

      if (ext !== 'md' && ext !== 'markdown' && ext !== '') {
        commit({
          type: 'local',
          id: node.path,
          name: node.name,
          handle: node.handle,
          parentHandle: node.parentHandle,
          viewer: 'unsupported',
          size: typeof file.size === 'number' ? file.size : null,
          lastModified: file.lastModified,
        }, '');
        return;
      }

      const serverText = await file.text();
      const draftKey = getDraftKey('local', node.path);
      if (isEncMdPath(node.path)) {
        await deleteMemoDraft(draftKey);
      }
      const draft = isEncMdPath(node.path)
        ? null
        : await getMemoDraft(draftKey);
      const existingTab = findFileTab(workspaceTabsRef.current, 'local', node.path);
      const resolved = await resolveOpenTextContent({
        serverText,
        serverLastModTs,
        existingTab,
        draft,
        confirmMessage: '더 최신 버전이 있습니다. 기존 내용을 버리고 최신 버전으로 교체할까요?',
        deleteDraft: () => deleteMemoDraft(draftKey),
      });

      let contentToUse = resolved.contentToUse;
      let baselineContent = resolved.baselineContent;
      if (isEncMdPath(node.path)) {
        const plain = await unlockEncMdOrPrompt(node.path, serverText);
        if (plain == null) return;
        contentToUse = plain;
        baselineContent = plain;
      }

      commit({
        type: 'local',
        id: node.path,
        name: node.name,
        content: baselineContent,
        handle: node.handle,
        parentHandle: node.parentHandle,
        viewer: 'markdown',
        size: typeof file.size === 'number' ? file.size : null,
        lastModified: file.lastModified,
        ...(isEncMdPath(node.path) ? { encMd: true } : {}),
      }, contentToUse, { baselineContent });
    } else if (type === SESSION_STORAGE_TYPE) {
      flushSessionEditorToWorkspace();
      const workspace = sessionWorkspaceRef.current;
      if (!workspace) return;
      applySessionFileToEditor(node.path, workspace, { skipNavigate });
    }
    } finally {
      try {
        if (isCurrentAttempt()) {
          const live = findFileTab(workspaceTabsRef.current, type, node.path);
          if (live && live.currentFile?.viewer === 'loading') {
            commitOpenFile(
              {
                type,
                id: node.path,
                name: node.name,
                viewer: 'unsupported',
                lastModified: node.lastModified,
              },
              '',
              { activate: false },
            );
          }
        }
      } catch (e) {
        console.error('Failed to settle loading viewer:', e);
      }
    }
  }, [
    navigate,
    webdavReady,
    webdavConfig,
    getS3Client,
    s3Creds.bucket,
    flushSessionEditorToWorkspace,
    applySessionFileToEditor,
    commitOpenFile,
    activateWorkspaceTab,
    showToast,
    localVaultFsPath,
    getBackendForType,
  ]);

  const toSelectKey = (storageType, path) => `${storageType}:${path}`;

  const saveCurrentMarkdownBeforeSwitch = useCallback(
    (storageType, node) => {
      const cur = currentFileRef.current;
      if (!cur?.id) return;
      if (cur.type === storageType && cur.id === node.path) return;

      const viewer = cur.viewer || 'markdown';
      if (!['markdown', 'json', 'raw', 'html', 'svg'].includes(viewer)) return;

      if (cur.type === SESSION_STORAGE_TYPE) {
        flushSessionEditorToWorkspace();
        return;
      }

      // Flush mirrors so tab baseline/dirty match the editor.
      const flushed = flushEditorIntoActiveFileTab(workspaceTabsRef.current, {
        editorContent: editorContentRef.current ?? '',
        currentFile: currentFileRef.current,
        editedFileName: editedFileNameRef.current ?? '',
      });
      workspaceTabsRef.current = flushed;
      setWorkspaceTabs(flushed);

      const leaving = getActiveFileTab(flushed);
      if (!leaving || !isFileTabDirty(leaving)) return;

      // Fire-and-forget when onFocusChange: navigate continues immediately.
      maybeAutoSaveOnFocusChange(leaving.currentFile, leaving.editorContent);
    },
    [flushSessionEditorToWorkspace, maybeAutoSaveOnFocusChange],
  );

  const handleTreeNodeSelect = useCallback(
    async (storageType, node, modifiers = {}) => {
      const { ctrlKey = false, metaKey = false, shiftKey = false } = modifiers;
      const isRange = shiftKey;

      const tree =
        storageType === 's3'
          ? s3Tree
          : storageType === 'webdav'
            ? webdavTree
            : storageType === SESSION_STORAGE_TYPE
              ? sessionWorkspace
                ? buildSessionTree(sessionWorkspace)
                : []
              : localTree;
      const flatPaths = flattenTreeToPaths(tree);
      const path = node.path;
      const key = toSelectKey(storageType, path);

      if (isRange && lastSelectedIdRef.current != null) {
        const lastKey = lastSelectedIdRef.current;
        const colonIdx = lastKey.indexOf(':');
        const lastType = colonIdx >= 0 ? lastKey.slice(0, colonIdx) : storageType;
        const lastPath = colonIdx >= 0 ? lastKey.slice(colonIdx + 1) : lastKey;
        if (lastType === storageType) {
          const anchorIdx = flatPaths.indexOf(lastPath);
          const clickIdx = flatPaths.indexOf(path);
          if (anchorIdx >= 0 && clickIdx >= 0) {
            setSelectedIds((prev) => {
              const next = new Set(prev);
              const [lo, hi] = anchorIdx <= clickIdx ? [anchorIdx, clickIdx] : [clickIdx, anchorIdx];
              for (let i = lo; i <= hi; i++) {
                next.add(toSelectKey(storageType, flatPaths[i]));
              }
              return next;
            });
            lastSelectedIdRef.current = key;
            if (node.type === 'file') {
              if (!confirmAndCancelEditorImageUpload()) return;
              if (isMobile) setSidebarOpen(false);
              saveCurrentMarkdownBeforeSwitch(storageType, node);
              await selectFileRaw(storageType, node);
            }
            return;
          }
        }
      }

      if (ctrlKey || metaKey) {
        setSelectedIds((prev) => {
          const next = new Set(prev);
          if (next.has(key)) next.delete(key);
          else next.add(key);
          return next;
        });
        lastSelectedIdRef.current = key;
      } else {
        setSelectedIds(new Set([key]));
        lastSelectedIdRef.current = key;
      }

      if (node.type === 'file') {
        if (!confirmAndCancelEditorImageUpload()) return;
        if (isMobile) setSidebarOpen(false);
        saveCurrentMarkdownBeforeSwitch(storageType, node);
        await selectFileRaw(storageType, node);
      }
    },
    [isMobile, s3Tree, localTree, webdavTree, sessionWorkspace, selectFileRaw, saveCurrentMarkdownBeforeSwitch, confirmAndCancelEditorImageUpload]
  );

  const selectFile = useCallback(
    (type, node) => {
      handleTreeNodeSelect(type, node, {});
    },
    [handleTreeNodeSelect]
  );

  const openAdvancedSearchFile = useCallback(
    async (path) => {
      if (!path) return;
      const type = storageMode;
      const slash = path.lastIndexOf('/');
      const parentPath = slash >= 0 ? path.slice(0, slash + 1) : '';
      const parentPaths = getParentPathsToExpand(parentPath);
      if (parentPaths.length) {
        expandPathsRef.current?.(type, parentPaths);
      }
      let node = null;
      if (type === STORAGE_MODE_LOCAL) {
        node =
          findFileNodeByPath(localTree, path) ||
          findNodeByPath(localTree, path) ||
          (localRootHandle
            ? await resolveLocalFileNode(localRootHandle, path)
            : null);
      } else if (type === STORAGE_MODE_WEBDAV) {
        node =
          findFileNodeByPath(webdavTree, path) || findNodeByPath(webdavTree, path);
      } else if (type === STORAGE_MODE_S3) {
        node = findFileNodeByPath(s3Tree, path) || findNodeByPath(s3Tree, path);
      }
      if (node?.type === 'file') {
        selectFile(type, node);
      } else {
        navigate(`/view/${path}`);
      }
    },
    [
      storageMode,
      localTree,
      webdavTree,
      s3Tree,
      localRootHandle,
      selectFile,
      navigate,
    ],
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

  // Persist open workspace tabs (+ legacy lastFile mirror)
  useEffect(() => {
    if (!isUnlocked) return;
    // Cold start opens the active tab first; defer writes until siblings are restored.
    if (workspaceTabsEnabledRef.current && !hasRestoredPersistedWorkspaceTabsRef.current) {
      return;
    }
    const flushed = flushEditorIntoActiveFileTab(workspaceTabs, {
      editorContent: editorContentRef.current ?? '',
      currentFile: currentFileRef.current,
      editedFileName: editedFileNameRef.current ?? '',
    });
    const payload = toPersistedWorkspaceTabs(
      flushed.tabs.map((t) =>
        t.kind === 'chat'
          ? { kind: 'chat' }
          : t.kind === 'settings'
            ? { kind: 'settings' }
            : { kind: 'file', storageType: t.storageType, path: t.path },
      ),
      flushed.activeId,
    );
    if (payload.tabs.length === 0) {
      clearPersistedWorkspaceTabs();
      return;
    }
    savePersistedWorkspaceTabs(payload);
    // Keep last-open snapshot for Ctrl+Shift+T after restart. Do not shrink it while
    // the cold-start path has only reopened the active tab (pagehide writes the truth).
    const prevSnap = loadLastOpenTabsSnapshot();
    if (!prevSnap || payload.tabs.length >= prevSnap.tabs.length) {
      saveLastOpenTabsSnapshot(payload);
    }
  }, [isUnlocked, workspaceTabs, currentFile, editorContent]);

  // Save last-open snapshot on leave so Ctrl+Shift+T can restore siblings after restart
  // (live workspaceTabs key is reduced to the auto-opened active tab on next boot).
  useEffect(() => {
    if (!isUnlocked) return undefined;
    const persistLastOpenSnapshot = () => {
      if (!workspaceTabsEnabledRef.current) return;
      const flushed = flushEditorIntoActiveFileTab(workspaceTabsRef.current, {
        editorContent: editorContentRef.current ?? '',
        currentFile: currentFileRef.current,
        editedFileName: editedFileNameRef.current ?? '',
      });
      const payload = toPersistedWorkspaceTabs(
        flushed.tabs.map((t) =>
          t.kind === 'chat'
            ? { kind: 'chat' }
            : t.kind === 'settings'
              ? { kind: 'settings' }
              : { kind: 'file', storageType: t.storageType, path: t.path },
        ),
        flushed.activeId,
      );
      saveLastOpenTabsSnapshot(payload);
    };
    const onVisibilityHidden = () => {
      if (document.visibilityState === 'hidden') persistLastOpenSnapshot();
    };
    window.addEventListener('pagehide', persistLastOpenSnapshot);
    window.addEventListener('beforeunload', persistLastOpenSnapshot);
    document.addEventListener('visibilitychange', onVisibilityHidden);
    return () => {
      window.removeEventListener('pagehide', persistLastOpenSnapshot);
      window.removeEventListener('beforeunload', persistLastOpenSnapshot);
      document.removeEventListener('visibilitychange', onVisibilityHidden);
    };
  }, [isUnlocked]);

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

  const beginTreeTransferBusy = useCallback((entry) => {
    setTreeTransferBusy((prev) => upsertTreeTransferBusy(prev, entry));
  }, []);

  const endTreeTransferBusy = useCallback((storageType, path) => {
    setTreeTransferBusy((prev) => removeTreeTransferBusy(prev, storageType, path));
  }, []);

  /** Reload editor when an open file was overwritten by move/copy into its path. */
  const reloadOpenFileIfPath = useCallback(
    async (storageType, filePath) => {
      const cur = currentFileRef.current;
      if (!cur || !filePath) return;
      if (cur.type !== storageType || cur.id !== filePath) return;
      const tree =
        storageType === 's3'
          ? s3Tree
          : storageType === 'webdav'
            ? webdavTree
            : localTree;
      let node = findNodeByPath(tree, filePath) || findFileNodeByPath(tree, filePath);
      if ((!node || node.type !== 'file') && storageType === 'local') {
        node = await resolveLocalFileNode(localRootHandle, filePath);
      }
      if (!node || node.type !== 'file') {
        node = {
          path: filePath,
          id: filePath,
          name: String(filePath).split('/').filter(Boolean).pop() || 'file',
          type: 'file',
        };
      }
      await selectFileRawRef.current?.(storageType, node, { skipNavigate: true });
    },
    [s3Tree, webdavTree, localTree, localRootHandle],
  );

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
  }, [isUnlocked, storageMode, localRootHandle]);

  // Restore Tauri local vault tree from persisted absolute path
  useEffect(() => {
    if (!isUnlocked || !isDesktopApp()) return;
    if (storageMode !== STORAGE_MODE_LOCAL) return;
    const abs = localVaultFsPath || loadLocalVaultFsPath();
    if (!abs) return;
    if (localVaultFsPath !== abs) setLocalVaultFsPath(abs);
    let cancelled = false;
    (async () => {
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


  const moveS3FileToFolder = async (file, destFolderPath, destFileName) => {
    const client = getS3Client();
    if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
    const bucket = s3Creds.bucket;
    const fileName = destFileName || file.name;
    const destPrefix = destFolderPath || '';
    const newKey = `${destPrefix}${fileName}`;
    const oldKey = file.id;
    if (newKey === oldKey) return file;

    await copyObject(client, bucket, oldKey, newKey);
    await deleteObject(client, bucket, oldKey);

    await loadS3Files();

    return { ...file, id: newKey, name: fileName };
  };

  const moveLocalFileToFolder = async (file, destDirHandle, destDirPath, destFileName) => {
    const sourceDir = file.parentHandle || localRootHandle;
    if (!sourceDir) throw new Error('원본 폴더를 찾을 수 없습니다.');
    if (!destDirHandle) throw new Error('대상 폴더를 찾을 수 없습니다.');

    const fileName = destFileName || file.name;
    const oldPath = file.id ?? file.path;
    const newPath = `${destDirPath || ''}${fileName}`;
    if (!oldPath) throw new Error('원본 파일 경로를 찾을 수 없습니다.');
    if (newPath === oldPath) return file;

    const srcFile = await file.handle.getFile();
    const newFileHandle = await destDirHandle.getFileHandle(fileName, { create: true });
    const writable = await newFileHandle.createWritable();
    await writable.write(await srcFile.arrayBuffer());
    await writable.close();

    const oldName = file.name || String(oldPath).split('/').filter(Boolean).pop();
    if (oldName && (getParentFolderPath(oldPath) !== (destDirPath || '') || oldName !== fileName)) {
      await sourceDir.removeEntry(oldName, { recursive: false });
    }

    await refreshLocalTree();

    return {
      ...file,
      id: newPath,
      name: fileName,
      handle: newFileHandle,
      parentHandle: destDirHandle,
      size: typeof srcFile.size === 'number' ? srcFile.size : file.size ?? null,
    };
  };

  const moveS3FolderToFolder = async (folderNode, destParentPath, newFolderName) => {
    const client = getS3Client();
    if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
    const bucket = s3Creds.bucket;
    const prefix = folderNode.path;
    if (!prefix) return;

    const folderName = newFolderName ?? folderNode.name;
    const destPrefix = destParentPath || '';
    const newFolderPrefix = `${destPrefix}${folderName}/`;
    if (newFolderPrefix === prefix) return;
    if (newFolderPrefix.startsWith(prefix) || prefix.startsWith(newFolderPrefix)) {
      throw new Error('폴더를 자기 자신 또는 하위 폴더 안으로 이동할 수 없습니다.');
    }

    const contents = await listObjectsV2(client, bucket, prefix);
    if (contents.length === 0) return;

    const keysToDelete = [];
    for (const { Key } of contents) {
      const relative = Key.slice(prefix.length);
      const newKey = newFolderPrefix + relative;
      if (newKey === Key) continue;
      await copyObject(client, bucket, Key, newKey);
      keysToDelete.push({ Key });
    }
    if (keysToDelete.length > 0) {
      await deleteObjects(client, bucket, keysToDelete);
    }
    await loadS3Files();
  };

  const moveLocalFolderToFolder = async (folderNode, destDirHandle, destDirPath, newFolderName) => {
    const sourceDir = folderNode.parentHandle || localRootHandle;
    if (!sourceDir) throw new Error('원본 폴더를 찾을 수 없습니다.');
    if (!destDirHandle) throw new Error('대상 폴더를 찾을 수 없습니다.');
    const nameToUse = newFolderName != null ? newFolderName : folderNode.name;
    const destFolderPath = `${destDirPath || ''}${nameToUse}/`;
    if (destFolderPath === folderNode.path) return;
    if (
      folderNode.path &&
      (destFolderPath.startsWith(folderNode.path) || folderNode.path.startsWith(destFolderPath))
    ) {
      throw new Error('폴더를 자기 자신 또는 하위 폴더 안으로 이동할 수 없습니다.');
    }

    const newFolderHandle = await destDirHandle.getDirectoryHandle(nameToUse, { create: true });
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
    await copyDirRecursive(folderNode.handle, newFolderHandle);
    await sourceDir.removeEntry(folderNode.name, { recursive: true });
    await refreshLocalTree();
  };

  const moveWebdavFileToFolder = async (file, destFolderPath, destFileName) => {
    const backend = createWebdavBackend(webdavConfig);
    const fileName = destFileName || file.name;
    const destPrefix = destFolderPath || '';
    const newKey = `${destPrefix}${fileName}`;
    const oldKey = file.id;
    if (newKey === oldKey) return file;
    await backend.move(oldKey, newKey);
    await refreshWebdavTree();
    return { ...file, id: newKey, name: fileName };
  };

  const moveWebdavFolderToFolder = async (folderNode, destParentPath, newFolderName) => {
    const backend = createWebdavBackend(webdavConfig);
    const prefix = folderNode.path;
    if (!prefix) return;
    const folderName = newFolderName ?? folderNode.name;
    const destPrefix = `${destParentPath || ''}${folderName}/`;
    if (destPrefix === prefix) return;
    if (destPrefix.startsWith(prefix) || prefix.startsWith(destPrefix)) {
      throw new Error('폴더를 자기 자신 또는 하위 폴더 안으로 이동할 수 없습니다.');
    }
    const entries = await webdavPropfindDeep(webdavConfig, prefix);
    const fileKeys = entries
      .filter((e) => e.key && !e.isCollection && e.key !== prefix)
      .map((e) => e.key)
      .sort((a, b) => b.length - a.length);
    for (const key of fileKeys) {
      const relative = key.startsWith(prefix) ? key.slice(prefix.length) : key;
      await backend.move(key, destPrefix + relative);
    }
    try {
      await backend.deletePrefix(prefix);
    } catch (_) {
      /* folder marker may already be gone */
    }
    await refreshWebdavTree();
  };

  const copyS3FileToFolder = async (file, destFolderPath, destFileName) => {
    const client = getS3Client();
    if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
    const bucket = s3Creds.bucket;
    const fileName = destFileName || file.name;
    const newKey = `${destFolderPath || ''}${fileName}`;
    const oldKey = file.id;
    if (newKey === oldKey) return file;
    await copyObject(client, bucket, oldKey, newKey);
    await loadS3Files();
    return { ...file, id: newKey };
  };

  const copyLocalFileToFolder = async (file, destDirHandle, destDirPath, destFileName) => {
    if (!destDirHandle) throw new Error('대상 폴더를 찾을 수 없습니다.');
    if (!file.handle) throw new Error('원본 파일을 찾을 수 없습니다.');
    const fileName = destFileName || file.name;
    const oldPath = file.id ?? file.path;
    const newPath = `${destDirPath || ''}${fileName}`;
    if (!oldPath) throw new Error('원본 파일 경로를 찾을 수 없습니다.');
    if (newPath === oldPath) return file;

    const srcFile = await file.handle.getFile();
    const newFileHandle = await destDirHandle.getFileHandle(fileName, { create: true });
    const writable = await newFileHandle.createWritable();
    await writable.write(await srcFile.arrayBuffer());
    await writable.close();
    await refreshLocalTree();
    return {
      ...file,
      id: newPath,
      handle: newFileHandle,
      parentHandle: destDirHandle,
      size: typeof srcFile.size === 'number' ? srcFile.size : file.size ?? null,
    };
  };

  const copyS3FolderToFolder = async (folderNode, destParentPath, newFolderName) => {
    const client = getS3Client();
    if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
    const bucket = s3Creds.bucket;
    const prefix = folderNode.path;
    if (!prefix) return;
    const folderName = newFolderName ?? folderNode.name;
    const newFolderPrefix = `${destParentPath || ''}${folderName}/`;
    if (newFolderPrefix === prefix) return;
    if (newFolderPrefix.startsWith(prefix) || prefix.startsWith(newFolderPrefix)) {
      throw new Error('폴더를 자기 자신 또는 하위 폴더 안으로 복제할 수 없습니다.');
    }
    await putObject(client, { Bucket: bucket, Key: newFolderPrefix, Body: '' });
    const contents = await listObjectsV2(client, bucket, prefix);
    for (const { Key } of contents) {
      const relative = Key.slice(prefix.length);
      const newKey = newFolderPrefix + relative;
      if (!relative || newKey === Key) continue;
      await copyObject(client, bucket, Key, newKey);
    }
    await loadS3Files();
  };

  const copyLocalFolderToFolder = async (folderNode, destDirHandle, destDirPath, newFolderName) => {
    if (!destDirHandle) throw new Error('대상 폴더를 찾을 수 없습니다.');
    if (!folderNode.handle) throw new Error('원본 폴더를 찾을 수 없습니다.');
    const nameToUse = newFolderName != null ? newFolderName : folderNode.name;
    const destFolderPath = `${destDirPath || ''}${nameToUse}/`;
    if (destFolderPath === folderNode.path) return;
    if (
      folderNode.path &&
      (destFolderPath.startsWith(folderNode.path) || folderNode.path.startsWith(destFolderPath))
    ) {
      throw new Error('폴더를 자기 자신 또는 하위 폴더 안으로 복제할 수 없습니다.');
    }
    const newFolderHandle = await destDirHandle.getDirectoryHandle(nameToUse, { create: true });
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
    await copyDirRecursive(folderNode.handle, newFolderHandle);
    await refreshLocalTree();
  };

  const copyWebdavFileToFolder = async (file, destFolderPath, destFileName) => {
    const backend = createWebdavBackend(webdavConfig);
    const fileName = destFileName || file.name;
    const newKey = `${destFolderPath || ''}${fileName}`;
    const oldKey = file.id;
    if (newKey === oldKey) return file;
    await backend.copy(oldKey, newKey);
    await refreshWebdavTree();
    return { ...file, id: newKey };
  };

  const copyWebdavFolderToFolder = async (folderNode, destParentPath, newFolderName) => {
    const backend = createWebdavBackend(webdavConfig);
    const prefix = folderNode.path;
    if (!prefix) return;
    const folderName = newFolderName ?? folderNode.name;
    const destPrefix = `${destParentPath || ''}${folderName}/`;
    if (destPrefix === prefix) return;
    if (destPrefix.startsWith(prefix) || prefix.startsWith(destPrefix)) {
      throw new Error('폴더를 자기 자신 또는 하위 폴더 안으로 복제할 수 없습니다.');
    }
    try {
      await backend.mkdir(destPrefix);
    } catch {
      /* destination may already exist or be created implicitly */
    }
    const entries = await webdavPropfindDeep(webdavConfig, prefix);
    const fileKeys = entries
      .filter((e) => e.key && !e.isCollection && e.key !== prefix)
      .map((e) => e.key)
      .sort((a, b) => a.length - b.length);
    for (const key of fileKeys) {
      const relative = key.startsWith(prefix) ? key.slice(prefix.length) : key;
      await backend.copy(key, destPrefix + relative);
    }
    await refreshWebdavTree();
  };

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

  const handleDownloadNode = async (storageType, node) => {
    const downloadedName = normalizeUnicodeNfc(
      node?.name || node?.path?.split('/').filter(Boolean).pop() || (node?.type === 'folder' ? '폴더' : '파일'),
    );
    const showDownloadCompleteModal = (title, message) => {
      setDownloadResultModal({
        isOpen: true,
        title,
        message,
      });
    };

    if (node.type === 'folder') {
      const shouldUseZipFallback = isAndroidBrowser() || !('showDirectoryPicker' in window);
      const ensureDirReadWritePermission = async (dirHandle) => {
        const ok = await ensureDirectoryReadWritePermission(dirHandle);
        if (!ok) {
          throw new Error('선택한 폴더에 쓰기 권한이 필요합니다.');
        }
      };
      try {
        const fallbackRootName = storageType === 's3' ? 's3-root' : 'local-root';
        const folderName = normalizeUnicodeNfc((node.name || '').trim() || fallbackRootName);
        const indicatorId = addIndicator({
          type: ActivityTypes.DOWNLOAD,
          label: `폴더 다운로드 중: ${folderName}`,
        });

        try {
          if (shouldUseZipFallback) {
            await downloadFolderAsZip(storageType, node, folderName, indicatorId);
          } else {
            const selectedDirHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
            await ensureDirReadWritePermission(selectedDirHandle);
            const targetRootDirHandle = await selectedDirHandle.getDirectoryHandle(folderName, { create: true });
            await ensureDirReadWritePermission(targetRootDirHandle);

            if (storageType === 's3') {
              const client = getS3Client();
              if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
              const bucket = s3Creds.bucket;
              const prefix = node.path || '';
              const contents = await listObjectsV2(client, bucket, prefix);
              const fileObjects = (contents || []).filter((item) => item.Key && !item.Key.endsWith('/'));
              const totalFiles = fileObjects.length;
              if (totalFiles === 0) {
                setOperationStatus(`다운로드 완료: ${folderName} (빈 폴더)`);
                showDownloadCompleteModal('다운로드 완료', `폴더 다운로드가 완료되었습니다.\n대상: ${folderName}`);
                return;
              }

              let completed = 0;
              for (const { Key } of fileObjects) {
                const relativeKey = prefix ? Key.slice(prefix.length) : Key;
                if (!relativeKey) continue;

                const segments = normalizePathToNfc(relativeKey).split('/').filter(Boolean);
                if (segments.length === 0) continue;

                const fileName = segments.pop();
                let currentDirHandle = targetRootDirHandle;
                for (const seg of segments) {
                  currentDirHandle = await currentDirHandle.getDirectoryHandle(seg, { create: true });
                }

                const { body } = await getObjectBody(client, bucket, Key);
                const fileHandle = await currentDirHandle.getFileHandle(fileName, { create: true });
                const writable = await fileHandle.createWritable();
                await writable.write(body);
                await writable.close();

                completed += 1;
                updateIndicator(indicatorId, {
                  progress: Math.min(100, Math.round((completed / totalFiles) * 100)),
                  detail: `${completed}/${totalFiles}`,
                });
              }
            } else if (storageType === 'local') {
              const sourceDirHandle = node.handle || (node.path === '' ? localRootHandle : null);
              if (!sourceDirHandle) throw new Error('원본 폴더 핸들을 찾을 수 없습니다.');

              const copyLocalDirRecursive = async (srcDirHandle, destDirHandle) => {
                for await (const entry of srcDirHandle.values()) {
                  const nfcName = normalizeUnicodeNfc(entry.name);
                  if (entry.kind === 'file') {
                    const file = await entry.getFile();
                    const destFileHandle = await destDirHandle.getFileHandle(nfcName, { create: true });
                    const writable = await destFileHandle.createWritable();
                    await writable.write(await file.arrayBuffer());
                    await writable.close();
                  } else if (entry.kind === 'directory') {
                    const childDestDir = await destDirHandle.getDirectoryHandle(nfcName, { create: true });
                    await copyLocalDirRecursive(entry, childDestDir);
                  }
                }
              };

              await copyLocalDirRecursive(sourceDirHandle, targetRootDirHandle);
              updateIndicator(indicatorId, { progress: 100 });
            }
          }

          setOperationStatus(`폴더 다운로드 완료: ${folderName}`);
          const fallbackNotice = shouldUseZipFallback
            ? '\n\n브라우저 제한으로 폴더를 ZIP 파일로 대체 다운로드했습니다.'
            : '';
          showDownloadCompleteModal('다운로드 완료', `폴더 다운로드가 완료되었습니다.\n대상: ${folderName}${fallbackNotice}`);
        } finally {
          removeIndicator(indicatorId);
        }
      } catch (e) {
        if (e?.name === 'AbortError') return;
        const message = String(e?.message || e || '');
        if (message.toLowerCase().includes('state chached') || message.toLowerCase().includes('state cached')) {
          try {
            const fallbackRootName = storageType === 's3' ? 's3-root' : 'local-root';
            const folderName = normalizeUnicodeNfc((node.name || '').trim() || fallbackRootName);
            const indicatorId = addIndicator({
              type: ActivityTypes.DOWNLOAD,
              label: `폴더 다운로드 중: ${folderName}`,
            });
            try {
              await downloadFolderAsZip(storageType, node, folderName, indicatorId);
              setOperationStatus(`폴더 다운로드 완료: ${folderName}`);
              showDownloadCompleteModal(
                '다운로드 완료',
                `폴더 다운로드가 완료되었습니다.\n대상: ${folderName}\n\n브라우저 제한으로 폴더를 ZIP 파일로 대체 다운로드했습니다.`
              );
            } finally {
              removeIndicator(indicatorId);
            }
            return;
          } catch (_) {
            openUnsupportedFolderDownloadModal();
            return;
          }
        }
        console.error('폴더 다운로드 실패:', e);
        alert('폴더 다운로드에 실패했습니다: ' + (e?.message || e));
      }
      return;
    }
    const fileName = normalizeUnicodeNfc(
      node.name || node.path?.split('/').filter(Boolean).pop() || 'download',
    );
    try {
      if (isMarkdownFileName(fileName)) {
        const backend = getBackendForType(storageType);
        const { text } = await backend.readText(node.path);
        const bundled = await downloadMarkdownImageZip(storageType, node.path, fileName, text);
        if (bundled) {
          const zipName = zipFileNameForMarkdown(fileName);
          setOperationStatus(`다운로드: ${zipName}`);
          showDownloadCompleteModal('다운로드 완료', `파일 다운로드가 완료되었습니다.\n대상: ${zipName}`);
          return;
        }
        triggerBlobDownload(new Blob([text], { type: 'text/markdown;charset=utf-8' }), fileName);
        setOperationStatus(`다운로드: ${downloadedName}`);
        showDownloadCompleteModal('다운로드 완료', `파일 다운로드가 완료되었습니다.\n대상: ${downloadedName}`);
        return;
      }

      if (storageType === 's3') {
        const body = await readBackendBytes(storageType, node.path);
        triggerBlobDownload(new Blob([body]), fileName);
        setOperationStatus(`다운로드: ${downloadedName}`);
        showDownloadCompleteModal('다운로드 완료', `파일 다운로드가 완료되었습니다.\n대상: ${downloadedName}`);
        return;
      }
      if (storageType === 'local' && node.handle) {
        const file = await node.handle.getFile();
        triggerBlobDownload(file, normalizeUnicodeNfc(node.name || file.name));
        setOperationStatus(`다운로드: ${downloadedName}`);
        showDownloadCompleteModal('다운로드 완료', `파일 다운로드가 완료되었습니다.\n대상: ${downloadedName}`);
        return;
      }
      if (storageType === 'webdav') {
        const body = await readBackendBytes(storageType, node.path);
        triggerBlobDownload(new Blob([body]), fileName);
        setOperationStatus(`다운로드: ${downloadedName}`);
        showDownloadCompleteModal('다운로드 완료', `파일 다운로드가 완료되었습니다.\n대상: ${downloadedName}`);
      }
    } catch (e) {
      console.error('파일 다운로드 실패:', e);
      alert('파일 다운로드에 실패했습니다: ' + (e?.message || e));
    }
  };

  const getParentPath = (path) => {
    const trimmed = (path || '').replace(/\/$/, '');
    const parts = trimmed.split('/').filter(Boolean);
    parts.pop();
    return parts.length ? parts.join('/') + '/' : '';
  };

  const handleDuplicateNode = async (storageType, node) => {
    const parentPath = getParentPath(node.path);
    const copySuffix = ' (복사본)';
    beginTreeTransferBusy({
      storageType,
      path: node.path,
      nodeType: node.type === 'folder' ? 'folder' : 'file',
      destFolderPath: parentPath || '',
      action: 'copy',
    });
    try {
      if (node.type === 'file') {
        if (storageType === 's3') {
          const client = getS3Client();
          if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
          const lastDot = (node.name || '').lastIndexOf('.');
          const baseName = lastDot > 0 ? node.name.slice(0, lastDot) : node.name || 'file';
          const ext = lastDot > 0 ? node.name.slice(lastDot) : '.md';
          let newName = baseName + copySuffix + ext;
          let newPath = parentPath + newName;
          const bucket = s3Creds.bucket;
          const contents = await listObjectsV2(client, bucket, parentPath);
          const existingNames = new Set((contents || []).map((c) => c.Key?.replace(parentPath, '').replace(/\/$/, '')).filter(Boolean));
          let counter = 1;
          while (existingNames.has(newName)) {
            newName = baseName + copySuffix + ` (${counter})` + ext;
            newPath = parentPath + newName;
            counter++;
          }
          const { body } = await getObjectBody(client, bucket, node.path);
          await putObject(client, { Bucket: bucket, Key: newPath, Body: body });
          loadS3Files();
          const parentPaths = parentPath ? [parentPath.replace(/\/$/, '')].filter(Boolean).map((p) => p + '/') : [];
          expandPathsRef.current?.(storageType, parentPaths);
          setOperationStatus(`복제 완료: ${newName}`);
        } else if (storageType === 'local') {
          const pHandle = node.parentHandle || localRootHandle;
          if (!pHandle) throw new Error('루트 폴더를 먼저 열어주세요.');
          const lastDot = (node.name || '').lastIndexOf('.');
          const baseName = lastDot > 0 ? node.name.slice(0, lastDot) : node.name || 'file';
          const ext = lastDot > 0 ? node.name.slice(lastDot) : '.md';
          let newName = baseName + copySuffix + ext;
          try {
            await pHandle.getFileHandle(newName);
            let counter = 1;
            while (true) {
              newName = baseName + copySuffix + ` (${counter})` + ext;
              try {
                await pHandle.getFileHandle(newName);
                counter++;
              } catch {
                break;
              }
            }
          } catch {
            // name is free
          }
          const file = await node.handle.getFile();
          const newFileHandle = await pHandle.getFileHandle(newName, { create: true });
          const writable = await newFileHandle.createWritable();
          await writable.write(await file.arrayBuffer());
          await writable.close();
          await refreshLocalTree();
          setOperationStatus(`복제 완료: ${newName}`);
        }
      } else if (node.type === 'folder') {
        if (storageType === 's3') {
          const client = getS3Client();
          if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
          const bucket = s3Creds.bucket;
          const prefix = node.path;
          const folderName = (node.name || '').replace(/\/$/, '');
          let destFolderName = folderName + copySuffix;
          const parentContents = await listObjectsV2(client, bucket, parentPath);
          const existingDirs = new Set(
            (parentContents || [])
              .filter((c) => c.Key?.endsWith('/'))
              .map((c) => c.Key?.slice(parentPath.length).split('/')[0])
              .filter(Boolean)
          );
          let counter = 1;
          while (existingDirs.has(destFolderName)) {
            destFolderName = folderName + copySuffix + ` (${counter})`;
            counter++;
          }
          const destPrefix = parentPath + destFolderName + '/';
          await putObject(client, { Bucket: bucket, Key: destPrefix, Body: '' });
          const contents = await listObjectsV2(client, bucket, prefix);
          for (const { Key } of contents) {
            const relative = Key.slice(prefix.length);
            const newKey = destPrefix + relative;
            await copyObject(client, bucket, Key, newKey);
          }
          loadS3Files();
          expandPathsRef.current?.(storageType, [parentPath.replace(/\/$/, '')].filter(Boolean).map((p) => p + '/'));
          setOperationStatus(`폴더 복제 완료: ${destFolderName}`);
        } else if (storageType === 'local') {
          const pHandle = node.parentHandle || localRootHandle;
          if (!pHandle) throw new Error('루트 폴더를 먼저 열어주세요.');
          const folderName = node.name || 'folder';
          let destFolderName = folderName + copySuffix;
          try {
            await pHandle.getDirectoryHandle(destFolderName);
            let counter = 1;
            while (true) {
              destFolderName = folderName + copySuffix + ` (${counter})`;
              try {
                await pHandle.getDirectoryHandle(destFolderName);
                counter++;
              } catch {
                break;
              }
            }
          } catch {
            // name is free
          }
          const newDirHandle = await pHandle.getDirectoryHandle(destFolderName, { create: true });
          const copyDirRecursive = async (srcHandle, destHandle) => {
            for await (const entry of srcHandle.values()) {
              if (entry.kind === 'file') {
                const file = await entry.getFile();
                const newFileHandle = await destHandle.getFileHandle(entry.name, { create: true });
                const writable = await newFileHandle.createWritable();
                await writable.write(await file.arrayBuffer());
                await writable.close();
              } else if (entry.kind === 'directory') {
                const newSubDir = await destHandle.getDirectoryHandle(entry.name, { create: true });
                await copyDirRecursive(entry, newSubDir);
              }
            }
          };
          await copyDirRecursive(node.handle, newDirHandle);
          await refreshLocalTree();
          setOperationStatus(`폴더 복제 완료: ${destFolderName}`);
        }
      }
    } catch (e) {
      alert('복제 실패: ' + (e?.message || e));
    } finally {
      endTreeTransferBusy(storageType, node.path);
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

  const isAbortOrNetworkError = (e) => {
    if (!e) return false;
    const name = (e?.name || '').toLowerCase();
    const msg = (e?.message || '').toLowerCase();
    const code = e?.code || '';
    return (
      name === 'aborterror' ||
      name === 'networkerror' ||
      msg.includes('abort') ||
      msg.includes('network') ||
      msg.includes('fetch') ||
      msg.includes('econnreset') ||
      msg.includes('econnrefused') ||
      msg.includes('timeout') ||
      code === 'ECONNABORTED' ||
      code === 'ETIMEDOUT' ||
      code === 'ENOTFOUND'
    );
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

  /**
   * Unlock ciphertext for editor; prompts when session has no password.
   * @returns {Promise<string|null>} plaintext or null if cancelled
   */
  const unlockEncMdOrPrompt = useCallback(
    async (path, ciphertext) => {
      const first = await tryUnlockEncMdContent(path, ciphertext);
      if (first.status !== 'need-password') return first.text;

      return new Promise((resolve) => {
        const run = (password) => {
          void (async () => {
            try {
              const plain = await decryptEncMdContent(ciphertext, password);
              setEncMdPassword(path, password);
              setEncMdPrompt(null);
              resolve(plain);
            } catch {
              setEncMdPrompt((prev) =>
                prev
                  ? {
                      ...prev,
                      error:
                        '비밀번호가 올바르지 않거나 파일을 열 수 없습니다.',
                    }
                  : null,
              );
            }
          })();
        };
        setEncMdPrompt({
          title: '암호화된 노트 잠금 해제',
          message: '이 노트를 열 때 사용한 비밀번호를 입력하세요.',
          confirmLabel: '잠금 해제',
          error: '',
          resolve: run,
          reject: () => {
            setEncMdPrompt(null);
            resolve(null);
          },
        });
      });
    },
    [],
  );

  const saveFile = useCallback(async (fileOverride = null, options = {}) => {
    const {
      skipSuffixCheck = false,
      skipCoverChangeCheck = false,
      lastInputAt: inputModifiedAt,
      contentOverride,
      background = false,
    } = options;
    const fileToSave = fileOverride ?? currentFile;
    if (!fileToSave) return;
    if (!skipSuffixCheck && !fileOverride && hasSuffixChange()) {
      setSuffixConfirmAction('renameAndSave');
      setShowSuffixChangeConfirmModal(true);
      return;
    }
    const viewer = fileToSave.viewer || 'markdown';
    const editableViewers = ['markdown', 'json', 'raw', 'html', 'svg'];
    if (!editableViewers.includes(viewer)) return;

    const textToSave =
      contentOverride != null ? String(contentOverride) : editorContentRef.current;

    if (
      !skipCoverChangeCheck
      && viewer === 'markdown'
      && noteCoverCommentChanged(
        String(fileToSave.content ?? ''),
        String(textToSave ?? ''),
      )
    ) {
      pendingCoverSaveRef.current = { fileOverride, options };
      setShowCoverChangeConfirmModal(true);
      return;
    }

    if (fileToSave.type === SESSION_STORAGE_TYPE) {
      const binding = sessionVaultBindingsRef.current[fileToSave.id];
      const bindingOk =
        Boolean(binding?.destPath) && binding.storageType === connectedHaimStorageType();
      if (!bindingOk) {
        if (fileOverride || background) return;
        handleRequestSessionSaveChooser();
        return;
      }
    }

    const touchesActiveEditor =
      !background &&
      currentFileRef.current?.id === fileToSave.id &&
      currentFileRef.current?.type === fileToSave.type;
    if (touchesActiveEditor) setIsSaving(true);

    const tabId =
      fileToSave.type && fileToSave.id ? `${fileToSave.type}:${fileToSave.id}` : null;
    const manageSavingBadge = Boolean(tabId) && !savingTabIdsRef.current.has(tabId);
    if (tabId && manageSavingBadge) {
      savingTabIdsRef.current.add(tabId);
      setSavingTabIds([...savingTabIdsRef.current]);
    }

    const indicatorId = addIndicator({
      id: background ? `note-save-bg:${fileToSave.type}:${fileToSave.id}` : 'note-save',
      type: ActivityTypes.NOTE_PROCESSING,
      label: '필기 저장 중',
      detail: fileToSave.name,
    });
    const contentTypeForViewer =
      viewer === 'json'
        ? 'application/json'
        : viewer === 'raw'
          ? 'text/plain'
          : viewer === 'html'
            ? 'text/html'
            : viewer === 'svg'
              ? 'image/svg+xml'
              : 'text/markdown';

    let vaultBody = textToSave;
    if (isEncMdPath(fileToSave.id) || isEncMdPath(fileToSave.name)) {
      try {
        let pw = getEncMdPassword(fileToSave.id);
        if (!pw) {
          pw = await requestEncMdPassword({
            title: '암호화된 노트 저장',
            message: '저장하려면 비밀번호를 입력하세요.',
            confirmLabel: '암호화 저장',
          });
        }
        vaultBody = await prepareEncMdVaultBody(fileToSave.id, textToSave, pw);
      } catch (e) {
        removeIndicator(indicatorId);
        if (touchesActiveEditor) setIsSaving(false);
        if (tabId && manageSavingBadge) {
          savingTabIdsRef.current.delete(tabId);
          setSavingTabIds([...savingTabIdsRef.current]);
        }
        if (e?.message !== 'cancelled') {
          alert(e?.message || '암호화 저장 실패');
        }
        return;
      }
    }

    const applySavedContentToTab = (extraFileFields = {}) => {
      const existing = findFileTab(workspaceTabsRef.current, fileToSave.type, fileToSave.id);
      if (!existing) return;
      const tabId = `${fileToSave.type}:${fileToSave.id}`;
      const patch = {
        currentFile: {
          ...existing.currentFile,
          content: textToSave,
          ...extraFileFields,
        },
        baselineContent: textToSave,
      };
      // Keep newer in-tab edits if the user typed while this save was in flight.
      if (existing.editorContent === textToSave) {
        patch.editorContent = textToSave;
      }
      const patched = patchFileTab(workspaceTabsRef.current, tabId, patch);
      workspaceTabsRef.current = patched;
      setWorkspaceTabs(patched);
    };

    try {
      if (fileToSave.type === 's3') {
        const client = getS3Client();
        if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
        await putObject(client, {
          Bucket: s3Creds.bucket,
          Key: fileToSave.id,
          Body: vaultBody,
          ContentType: contentTypeForViewer,
        });
        await deleteMemoDraft(getDraftKey('s3', fileToSave.id));
        loadS3Files();
        const savedByteLength = new TextEncoder().encode(vaultBody).length;
        setCurrentFile((prev) => {
          if (prev?.id !== fileToSave.id || prev?.type !== fileToSave.type) return prev;
          const next = { ...prev, content: textToSave, size: savedByteLength };
          currentFileRef.current = next;
          return next;
        });
        applySavedContentToTab({ size: savedByteLength });
        notifyAdvancedSearchChange({
          type: 'file',
          path: fileToSave.id,
          content: isEncMdPath(fileToSave.id) ? '' : textToSave,
        });
      } else if (fileToSave.type === 'local') {
        const writable = await fileToSave.handle.createWritable();
        await writable.write(vaultBody);
        await writable.close();
        await deleteMemoDraft(getDraftKey('local', fileToSave.id));
        const file = await fileToSave.handle.getFile();
        setCurrentFile((prev) => {
          if (prev?.id !== fileToSave.id || prev?.type !== fileToSave.type) return prev;
          const next = {
            ...prev,
            content: textToSave,
            size: typeof file.size === 'number' ? file.size : prev?.size ?? null,
            lastModified: file.lastModified,
          };
          currentFileRef.current = next;
          return next;
        });
        applySavedContentToTab({
          ...(typeof file.size === 'number' ? { size: file.size } : {}),
          lastModified: file.lastModified,
        });
        notifyAdvancedSearchChange({
          type: 'file',
          path: fileToSave.id,
          content: isEncMdPath(fileToSave.id) ? '' : textToSave,
        });
      } else if (fileToSave.type === SESSION_STORAGE_TYPE) {
        const binding = sessionVaultBindingsRef.current[fileToSave.id];
        if (!binding?.destPath) {
          throw new Error('저장 위치를 찾지 못했습니다.');
        }
        await writeSessionFileToHaimRef.current?.({
          destPath: binding.destPath,
          sessionFile: fileToSave,
          content: vaultBody,
        });
      } else if (fileToSave.type === 'webdav') {
        const backend = createWebdavBackend(webdavConfig);
        await backend.writeText(fileToSave.id, vaultBody, contentTypeForViewer);
        await deleteMemoDraft(getDraftKey('webdav', fileToSave.id));
        await refreshWebdavTree();
        const savedByteLength = new TextEncoder().encode(vaultBody).length;
        setCurrentFile((prev) => {
          if (prev?.id !== fileToSave.id || prev?.type !== fileToSave.type) return prev;
          const next = { ...prev, content: textToSave, size: savedByteLength };
          currentFileRef.current = next;
          return next;
        });
        applySavedContentToTab({ size: savedByteLength });
        notifyAdvancedSearchChange({
          type: 'file',
          path: fileToSave.id,
          content: isEncMdPath(fileToSave.id) ? '' : textToSave,
        });
      }
    } catch (e) {
      const encNote =
        isEncMdPath(fileToSave.id) || isEncMdPath(fileToSave.name);
      // Never park plaintext (or password) in IndexedDB for encrypted notes.
      if (encNote) {
        alert('저장 실패: ' + (e?.message || String(e)));
      } else if (fileToSave.type === 's3' && isAbortOrNetworkError(e)) {
        try {
          await savePendingUpload({
            key: fileToSave.id,
            content: textToSave,
            modifiedAt: inputModifiedAt ?? Date.now(),
            contentType: contentTypeForViewer,
          });
          alert('업로드가 중단되었습니다. 연결이 복구되면 다시 로그인하면 자동으로 동기화됩니다.');
        } catch (dbErr) {
          console.error('저장 실패 및 IndexedDB 임시 저장 실패:', dbErr);
          alert('저장 실패: ' + e.message);
        }
      } else if (fileToSave.type === 'webdav' && isAbortOrNetworkError(e)) {
        try {
          await saveMemoDraft({
            key: getDraftKey('webdav', fileToSave.id),
            content: textToSave,
            originalLastModified: Date.now(),
          });
          alert('저장에 실패했습니다. 임시 초안이 로컬에 보관되었습니다.');
        } catch (dbErr) {
          console.error('WebDAV save failed and draft save failed:', dbErr);
          alert('저장 실패: ' + e.message);
        }
      } else if (fileToSave.type === 'local') {
        try {
          await saveMemoDraft({
            key: getDraftKey('local', fileToSave.id),
            content: textToSave,
            originalLastModified: Date.now(),
          });
          alert('저장에 실패했습니다. 임시 초안이 로컬에 보관되었습니다.');
        } catch (dbErr) {
          console.error('Local save failed and draft save failed:', dbErr);
          alert('저장 실패: ' + e.message);
        }
      } else {
        alert('저장 실패: ' + e.message);
      }
    } finally {
      removeIndicator(indicatorId);
      if (touchesActiveEditor) setIsSaving(false);
      if (tabId && manageSavingBadge) {
        savingTabIdsRef.current.delete(tabId);
        setSavingTabIds([...savingTabIdsRef.current]);
      }
    }
  }, [
    currentFile,
    hasSuffixChange,
    getS3Client,
    s3Creds.bucket,
    loadS3Files,
    webdavConfig,
    refreshWebdavTree,
    addIndicator,
    removeIndicator,
    requestEncMdPassword,
  ]);

  useEffect(() => {
    saveFileRef.current = saveFile;
  }, [saveFile]);

  const refreshLocalFileFromDisk = async () => {
    const fileToRefresh = currentFileRef.current;
    if (!fileToRefresh || fileToRefresh.type !== 'local' || !fileToRefresh.handle) return;
    const viewer = fileToRefresh.viewer || 'markdown';
    const editableViewers = ['markdown', 'json', 'raw', 'html', 'svg'];
    if (!editableViewers.includes(viewer)) return;

    setIsRefreshingFromDisk(true);
    const indicatorId = addIndicator({
      id: 'note-refresh-local',
      type: ActivityTypes.NOTE_PROCESSING,
      label: '디스크에서 새로고침 중',
      detail: fileToRefresh.name,
    });
    try {
      const diskFile = await fileToRefresh.handle.getFile();
      let diskText = await diskFile.text();
      if (viewer === 'json' && diskText.length <= 100000) {
        try {
          diskText = JSON.stringify(JSON.parse(diskText), null, 2);
        } catch {
          // keep raw json text
        }
      }

      const base = typeof fileToRefresh.content === 'string' ? fileToRefresh.content : '';
      const ours = editorContentRef.current ?? '';
      const merge = rebaseMergeTexts(base, ours, diskText);

      let nextEditorText = diskText;
      let backupName = null;
      if (merge.status === 'conflict') {
        if (!localRootHandle) throw new Error('로컬 폴더가 열려 있지 않습니다.');
        const backend = createLocalBackend(localRootHandle);
        const fileId = String(fileToRefresh.id || '');
        const lastSlash = fileId.lastIndexOf('/');
        const dirPrefix = lastSlash >= 0 ? fileId.slice(0, lastSlash + 1) : '';
        const now = new Date();
        let disambiguator = 1;
        let candidate = buildTimestampedCopyName(fileToRefresh.name || 'note', now, disambiguator);
        while (await backend.head(`${dirPrefix}${candidate}`)) {
          disambiguator += 1;
          candidate = buildTimestampedCopyName(fileToRefresh.name || 'note', now, disambiguator);
        }
        await backend.writeText(`${dirPrefix}${candidate}`, ours);
        backupName = candidate;
        await refreshLocalTree();
      } else {
        nextEditorText = merge.text;
      }

      setCurrentFile((prev) => {
        if (prev?.id !== fileToRefresh.id) return prev;
        const next = {
          ...prev,
          content: diskText,
          size: typeof diskFile.size === 'number' ? diskFile.size : prev?.size ?? null,
          lastModified: diskFile.lastModified,
        };
        currentFileRef.current = next;
        return next;
      });
      setEditorContent(nextEditorText);
      editorContentRef.current = nextEditorText;
      await deleteMemoDraft(getDraftKey('local', fileToRefresh.id));

      if (backupName) {
        setOperationStatus(`충돌: 현재 문서를 ${backupName}으로 저장하고 디스크 내용으로 교체했습니다`);
        showAlert({
          title: '새로고침 충돌',
          message:
            '디스크 내용과 현재 문서가 충돌하여, 현재 문서를 새 파일로 저장한 뒤 디스크 내용으로 교체했습니다.',
          detail: backupName,
        });
      } else if (nextEditorText === diskText && ours === diskText) {
        setOperationStatus('디스크 내용과 동일합니다');
      } else if (nextEditorText === diskText) {
        setOperationStatus('디스크 내용으로 새로고침했습니다');
      } else {
        setOperationStatus('디스크 변경 위에 로컬 수정을 적용했습니다. 저장하면 반영됩니다.');
      }
    } catch (e) {
      console.error('Local refresh failed:', e);
      showAlert({
        title: '새로고침 실패',
        message: e?.message || String(e),
      });
    } finally {
      removeIndicator(indicatorId);
      setIsRefreshingFromDisk(false);
    }
  };

  const refreshRemoteFile = async () => {
    const fileToRefresh = currentFileRef.current;
    if (!fileToRefresh || (fileToRefresh.type !== 's3' && fileToRefresh.type !== 'webdav')) return;
    if (isEncMdPath(fileToRefresh.id) || isEncMdPath(fileToRefresh.name)) return;
    const viewer = fileToRefresh.viewer || 'markdown';
    const editableViewers = ['markdown', 'json', 'raw', 'html', 'svg'];
    if (!editableViewers.includes(viewer)) return;

    const backend = getBackendForType(fileToRefresh.type);
    if (!backend) return;

    setIsPullingFromRemote(true);
    const indicatorId = addIndicator({
      id: 'note-pull-remote',
      type: ActivityTypes.NOTE_PROCESSING,
      label: '원격에서 가져오는 중',
      detail: fileToRefresh.name,
    });
    try {
      const { text: rawRemoteText } = await backend.readText(fileToRefresh.id);
      let remoteText = rawRemoteText;
      if (viewer === 'json' && remoteText.length <= 100000) {
        try {
          remoteText = JSON.stringify(JSON.parse(remoteText), null, 2);
        } catch {
          // keep raw json text
        }
      }

      const base = typeof fileToRefresh.content === 'string' ? fileToRefresh.content : '';
      const ours = editorContentRef.current ?? '';
      const merge = rebaseMergeTexts(base, ours, remoteText);

      let nextEditorText = remoteText;
      let backupName = null;
      let backupPath = null;
      if (merge.status === 'conflict') {
        const fileId = String(fileToRefresh.id || '');
        const lastSlash = fileId.lastIndexOf('/');
        const dirPrefix = lastSlash >= 0 ? fileId.slice(0, lastSlash + 1) : '';
        const now = new Date();
        let disambiguator = 1;
        let candidate = buildTimestampedCopyName(fileToRefresh.name || 'note', now, disambiguator);
        while (await backend.head(`${dirPrefix}${candidate}`)) {
          disambiguator += 1;
          candidate = buildTimestampedCopyName(fileToRefresh.name || 'note', now, disambiguator);
        }
        backupPath = `${dirPrefix}${candidate}`;
        await backend.writeText(backupPath, ours);
        backupName = candidate;
        if (fileToRefresh.type === 's3') await loadS3Files();
        else await refreshWebdavTree();
      } else {
        nextEditorText = merge.text;
      }

      const remoteByteLength = new TextEncoder().encode(remoteText).length;
      setCurrentFile((prev) => {
        if (prev?.id !== fileToRefresh.id || prev?.type !== fileToRefresh.type) return prev;
        const next = {
          ...prev,
          content: remoteText,
          size: remoteByteLength,
        };
        currentFileRef.current = next;
        return next;
      });
      setEditorContent(nextEditorText);
      editorContentRef.current = nextEditorText;
      await deleteMemoDraft(getDraftKey(fileToRefresh.type, fileToRefresh.id));
      setLastAutoSyncAt(Date.now());

      const active = getActiveFileTab(workspaceTabsRef.current);
      if (active) {
        const tabPatch = {
          editorContent: nextEditorText,
          currentFile: {
            ...active.currentFile,
            content: remoteText,
            size: remoteByteLength,
          },
        };
        if (backupName) {
          tabPatch.baselineContent = remoteText;
        }
        const nextTabs = patchFileTab(workspaceTabsRef.current, active.id, tabPatch);
        workspaceTabsRef.current = nextTabs;
        setWorkspaceTabs(nextTabs);
      }

      if (backupName && backupPath && workspaceTabsEnabledRef.current) {
        const backupByteLength = new TextEncoder().encode(ours).length;
        const backupFile = {
          type: fileToRefresh.type,
          id: backupPath,
          name: backupName,
          content: ours,
          viewer,
          size: backupByteLength,
          lastModified: Date.now(),
        };
        const opened = commitOpenFile(backupFile, ours, {
          activate: false,
          baselineContent: ours,
        });
        if (opened) {
          showToast({ message: `「${backupName}」 백업 탭 열림`, durationMs: 2200 });
        }
      }

      if (backupName) {
        setOperationStatus(`충돌: 현재 문서를 ${backupName}으로 저장하고 원격 내용으로 교체했습니다`);
        showAlert({
          title: '가져오기 충돌',
          message:
            '원격 내용과 현재 문서가 충돌하여, 현재 문서를 새 파일로 저장한 뒤 원격 내용으로 교체했습니다.',
          detail: backupName,
        });
      } else if (nextEditorText === remoteText && ours === remoteText) {
        setOperationStatus('원격 내용과 동일합니다');
      } else if (nextEditorText === remoteText) {
        setOperationStatus('원격 내용으로 가져왔습니다');
      } else {
        setOperationStatus('원격 변경 위에 로컬 수정을 적용했습니다. 저장하면 반영됩니다.');
      }
    } catch (e) {
      console.error('Remote pull failed:', e);
      showAlert({
        title: '가져오기 실패',
        message: e?.message || String(e),
      });
    } finally {
      removeIndicator(indicatorId);
      setIsPullingFromRemote(false);
    }
  };

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

  const applyOpenFileIdentityChange = (updated, options = {}) => {
    if (!updated) return null;
    const { oldPath = null, retargetTabs = true } = options;
    const prev = currentFileRef.current;
    const fromPath =
      typeof oldPath === 'string' && oldPath
        ? oldPath
        : typeof prev?.id === 'string'
          ? prev.id
          : null;
    const storageType = updated.type || prev?.type;
    const nextPath = updated.id;

    if (
      retargetTabs &&
      workspaceTabsEnabledRef.current &&
      storageType &&
      fromPath &&
      typeof nextPath === 'string' &&
      nextPath
    ) {
      applyWorkspaceFilePathRetarget(storageType, fromPath, nextPath, updated);
    }

    currentFileRef.current = updated;
    setCurrentFile(updated);
    if (typeof updated.name === 'string' && updated.name) {
      setEditedFileName(updated.name);
    }
    if (typeof nextPath !== 'string' || !nextPath) return updated;
    if (parseOpenNotePathFromAppPathname(location.pathname) === nextPath) return updated;
    suppressUnsavedNavGuardRef.current = true;
    try {
      const onExport = isExportPdfAppPathname(location.pathname);
      navigate(
        onExport ? exportPdfPathnameForStoragePath(nextPath) : `/view/${nextPath}`,
        { replace: true },
      );
    } finally {
      suppressUnsavedNavGuardRef.current = false;
    }
    return updated;
  };

  const renameCurrentFileFullName = async (newFullName) => {
    if (!currentFile) return null;
    const trimmed = newFullName.trim();
    if (!trimmed) return null;

    try {
      let updated = null;
      if (currentFile.type === 's3') {
        const hasUnsaved = currentFile.content !== editorContent;
        const contentOverride = hasUnsaved ? editorContent : null;
        updated = await renameS3File(currentFile, trimmed, contentOverride);
      } else if (currentFile.type === 'local') {
        updated = await renameLocalFile(currentFile, trimmed);
      } else if (currentFile.type === SESSION_STORAGE_TYPE) {
        const ws = flushSessionEditorToWorkspace() ?? sessionWorkspaceRef.current;
        if (!ws) return null;
        const nextWs = renameSessionFile(ws, currentFile.id, trimmed);
        sessionWorkspaceRef.current = nextWs;
        setSessionWorkspace(nextWs);
        const lastSlash = String(currentFile.id || '').lastIndexOf('/');
        const dirPrefix = lastSlash >= 0 ? currentFile.id.slice(0, lastSlash + 1) : '';
        const newKey = dirPrefix + trimmed;
        const prevBinding = sessionVaultBindingsRef.current[currentFile.id];
        if (prevBinding && newKey !== currentFile.id) {
          const nextBindings = { ...sessionVaultBindingsRef.current };
          delete nextBindings[currentFile.id];
          nextBindings[newKey] = prevBinding;
          sessionVaultBindingsRef.current = nextBindings;
        }
        updated = { ...currentFile, id: newKey, name: trimmed, content: editorContent };
      } else if (currentFile.type === 'webdav') {
        const backend = createWebdavBackend(webdavConfig);
        const oldKey = currentFile.id;
        const lastSlash = oldKey.lastIndexOf('/');
        const dirPrefix = lastSlash >= 0 ? oldKey.slice(0, lastSlash + 1) : '';
        const newKey = dirPrefix + trimmed;
        if (newKey !== oldKey) {
          const hasUnsaved = currentFile.content !== editorContent;
          if (hasUnsaved) {
            await backend.writeText(newKey, editorContent, 'text/markdown');
            await backend.delete(oldKey);
          } else {
            await backend.move(oldKey, newKey);
          }
          await refreshWebdavTree();
          updated = {
            ...currentFile,
            id: newKey,
            name: trimmed,
            ...(hasUnsaved ? { content: editorContent } : {}),
          };
        }
      }
      if (updated) {
        return applyOpenFileIdentityChange(updated);
      }
      return updated ?? null;
    } catch (e) {
      alert("이름 변경 실패: " + e.message);
      return null;
    }
  };

  // 6. Create & Delete
  const createItem = async (storageType, parentPath, parentDirHandle, type, nameInput) => {
    const resolved = resolveCreateItemPath(parentPath, nameInput, type === 'folder' ? 'folder' : 'file');
    if (!resolved.ok) {
      if (resolved.reason === 'outside-root') {
        throw new Error('루트 밖으로 나갈 수 없습니다.');
      }
      return;
    }

    const { path: newPath, parentDirPath, baseName: finalName } = resolved;
    const expandParent = parentDirPath || parentPath || '';

    let initialBody = '';
    let openContent = '';
    if (type !== 'folder' && isEncMdPath(newPath)) {
      let password;
      try {
        password = await requestEncMdPassword({
          title: '암호화해서 만들기',
          message:
            '이 노트를 암호화할 비밀번호를 입력하세요.\n같은 비밀번호로만 다시 열 수 있습니다.',
          confirmLabel: '암호화 생성',
        });
      } catch {
        return;
      }
      initialBody = await encryptEncMdContent('', password);
      setEncMdPassword(newPath, password);
      openContent = '';
    }

    const openCreatedFile = (file) => {
      const content =
        typeof file.content === 'string' ? file.content : openContent;
      if (commitOpenFile({ ...file, ...(isEncMdPath(newPath) ? { encMd: true } : {}) }, content)) {
        navigate(`/view/${file.id}`);
      }
    };

    const ensureLocalDir = async (dirPath) => {
      if (!localRootHandle) throw new Error('루트 폴더를 먼저 열어주세요.');
      const parts = String(dirPath || '')
        .replace(/\/$/, '')
        .split('/')
        .filter(Boolean);
      // Prefer walking from vault root so `..` / nested paths stay consistent.
      let dir = localRootHandle;
      for (const part of parts) {
        dir = await dir.getDirectoryHandle(part, { create: true });
      }
      return dir;
    };

    try {
      if (storageType === 's3') {
        const client = getS3Client();
        if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
        if (type === 'folder') {
          await putObject(client, { Bucket: s3Creds.bucket, Key: newPath, Body: '' });
          loadS3Files();
          const parentPaths = getParentPathsToExpand(expandParent);
          expandPathsRef.current?.(storageType, parentPaths);
        } else {
          await putObject(client, { Bucket: s3Creds.bucket, Key: newPath, Body: initialBody });
          loadS3Files();
          const parentPaths = getParentPathsToExpand(expandParent);
          expandPathsRef.current?.(storageType, parentPaths);
          openCreatedFile({ type: 's3', id: newPath, name: finalName, content: openContent });
        }
      } else if (storageType === 'local') {
        if (!localRootHandle && !parentDirHandle) {
          return alert('루트 폴더를 먼저 열어주세요.');
        }

        const targetDirHandle = localRootHandle
          ? await ensureLocalDir(parentDirPath)
          : parentDirHandle;

        if (!targetDirHandle) return alert('루트 폴더를 먼저 열어주세요.');

        if (type === 'folder') {
          await targetDirHandle.getDirectoryHandle(finalName, { create: true });
          const parentPaths = getParentPathsToExpand(expandParent);
          expandPathsRef.current?.(storageType, parentPaths);
        } else {
          const newFileHandle = await targetDirHandle.getFileHandle(finalName, { create: true });
          if (initialBody) {
            const writable = await newFileHandle.createWritable();
            await writable.write(initialBody);
            await writable.close();
          }
          const parentPaths = getParentPathsToExpand(expandParent);
          expandPathsRef.current?.(storageType, parentPaths);
          openCreatedFile({
            type: 'local',
            id: newPath,
            name: finalName,
            content: openContent,
            handle: newFileHandle,
          });
        }
        refreshLocalTree();
      } else if (storageType === 'webdav') {
        const backend = createWebdavBackend(webdavConfig);
        if (type === 'folder') {
          await backend.mkdir(newPath);
          await refreshWebdavTree();
          const parentPaths = getParentPathsToExpand(expandParent);
          expandPathsRef.current?.(storageType, parentPaths);
        } else {
          await backend.writeText(newPath, initialBody, 'text/markdown');
          await refreshWebdavTree();
          const parentPaths = getParentPathsToExpand(expandParent);
          expandPathsRef.current?.(storageType, parentPaths);
          openCreatedFile({
            type: 'webdav',
            id: newPath,
            name: finalName,
            content: openContent,
            viewer: 'markdown',
          });
        }
      }
    } catch (e) {
      alert('생성 실패: ' + e.message);
      throw e;
    }
  };

  const requestCreateItem = (storageType, parentPath, parentDirHandle, type) => {
    setCreateModalContext({ storageType, parentPath, parentDirHandle, type });
    setCreateModalOpen(true);
  };

  const requestAdvancedSearchCreateItem = useCallback(
    (type, parentPath) => {
      const path = String(parentPath || '').replace(/^\/+/, '').replace(/\\/g, '/');
      const normalized =
        path && !path.endsWith('/') ? `${path}/` : path;
      let parentDirHandle = null;
      if (storageMode === STORAGE_MODE_LOCAL) {
        if (!normalized) {
          parentDirHandle = localRootHandle;
        } else {
          const node =
            findNodeByPath(localTree, normalized) ||
            findNodeByPath(localTree, normalized.replace(/\/$/, '')) ||
            findNodeByPath(localTree, `${normalized.replace(/\/$/, '')}/`);
          parentDirHandle = node?.handle || null;
        }
      }
      requestCreateItem(storageMode, normalized, parentDirHandle, type);
    },
    [storageMode, localRootHandle, localTree],
  );

  const newFileDefaultParentPath = useMemo(
    () =>
      resolveNewFileDefaultParentPath({
        pathname: location.pathname,
        chatSurfaceActive,
        workspaceTabsEnabled,
        activeTab: activeWorkspaceTab,
        currentFilePath: currentFile?.id,
      }),
    [
      location.pathname,
      chatSurfaceActive,
      workspaceTabsEnabled,
      activeWorkspaceTab,
      currentFile?.id,
    ],
  );

  /** Cmd/Ctrl+N (PWA / Tauri) / empty-session create — parent of focused file, or vault root on chat/settings. */
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

  const requestNewFile = useCallback(() => {
    if (loadNewFileAsTempEnabled()) {
      requestNewTempFile();
      return;
    }
    requestAdvancedSearchCreateItem('file', newFileDefaultParentPath);
  }, [requestAdvancedSearchCreateItem, newFileDefaultParentPath, requestNewTempFile]);

  usePwaNewFileShortcut({
    enabled: isUnlocked && canScanStorageUsage,
    onNewFile: requestNewFile,
  });

  const requestUploadFile = (storageType, parentPath, parentDirHandle) => {
    setUploadTarget({ storageType, parentPath, parentDirHandle });
    uploadFileInputRef.current.value = '';
    uploadFileInputRef.current?.click();
  };

  const requestUploadFolder = (storageType, parentPath, parentDirHandle) => {
    setUploadTarget({ storageType, parentPath, parentDirHandle });
    uploadFolderInputRef.current.value = '';
    uploadFolderInputRef.current?.click();
  };

  const askTreeNameConflict = useCallback((payload) => {
    return new Promise((resolve) => {
      treeNameConflictResolverRef.current = resolve;
      setTreeNameConflict(payload);
    });
  }, []);

  const settleTreeNameConflict = useCallback((choice) => {
    const resolve = treeNameConflictResolverRef.current;
    treeNameConflictResolverRef.current = null;
    setTreeNameConflict(null);
    resolve?.(choice);
  }, []);

  /** Upload flow: same modal, without text compare. */
  const askUploadNameConflict = useCallback(
    (fileName, renameAs) =>
      askTreeNameConflict({
        name: fileName,
        renameAs,
        kind: 'file',
        action: 'upload',
      }),
    [askTreeNameConflict],
  );

  const getUploadTreeForStorage = useCallback(
    (storageType) => {
      if (storageType === 's3') return s3Tree;
      if (storageType === 'webdav') return webdavTree;
      return localTree;
    },
    [s3Tree, webdavTree, localTree],
  );

  const readVaultFileBytes = useCallback(
    async (storageType, path, nodeHint = null) => {
      const key = String(path || '');
      if (!key) return null;
      if (storageType === 's3') {
        const client = getS3Client();
        if (!client) return null;
        const { body } = await getObjectBody(client, s3Creds.bucket, key);
        return body instanceof Uint8Array ? body : new Uint8Array(body);
      }
      if (storageType === 'webdav') {
        const backend = createWebdavBackend(webdavConfig);
        const result = await backend.readBytes(key);
        return result?.body || null;
      }
      const node =
        nodeHint ||
        findNodeByPath(localTree, key) ||
        findFileNodeByPath(localTree, key);
      if (!node?.handle) return null;
      const file = await node.handle.getFile();
      return new Uint8Array(await file.arrayBuffer());
    },
    [getS3Client, s3Creds.bucket, webdavConfig, localTree],
  );

  const loadFileCompareForDest = useCallback(
    async ({
      storageType,
      destFolderPath,
      fileName,
      incomingPath,
      incomingNode,
      existingLabel,
      incomingLabel,
    }) => {
      const existingPath = `${destFolderPath || ''}${fileName}`;
      const existingNode =
        findNodeByPath(getUploadTreeForStorage(storageType), existingPath) ||
        findFileNodeByPath(getUploadTreeForStorage(storageType), existingPath);
      const [existingBytes, incomingBytes] = await Promise.all([
        readVaultFileBytes(storageType, existingPath, existingNode),
        readVaultFileBytes(storageType, incomingPath, incomingNode),
      ]);
      return buildFileComparePayload({
        existingBytes,
        incomingBytes,
        existingLabel: existingLabel || `대상: ${existingPath}`,
        incomingLabel: incomingLabel || `가져올 파일: ${incomingPath}`,
      });
    },
    [getUploadTreeForStorage, readVaultFileBytes],
  );

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
      if (treeNameConflictResolverRef.current) {
        settleTreeNameConflict('cancel');
      }
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

  const handleCreateItemSubmit = async (nameInput) => {
    if (!createModalContext) return;
    const {
      storageType,
      parentPath,
      parentDirHandle,
      type,
      fromMoveModal,
      fromAddToNoteModal,
      fromSaveSessionModal,
    } = createModalContext;
    setIsCreateSubmitting(true);
    try {
      await createItem(storageType, parentPath, parentDirHandle, type, nameInput);
      if (type === 'folder') {
        const resolved = resolveCreateItemPath(parentPath, nameInput, 'folder');
        if (resolved.ok) {
          if (fromMoveModal) setMoveModalSelectPath(resolved.path);
          if (fromAddToNoteModal) setAddToNoteSelectPath(resolved.path);
          if (fromSaveSessionModal) setSaveSessionToNoteSelectPath(resolved.path);
        }
      }
      setCreateModalOpen(false);
      setCreateModalContext(null);
    } catch (_e) {
      // createItem already shows alert
    } finally {
      setIsCreateSubmitting(false);
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

  const renameTreeItem = async (storageType, node, newTitle) => {
    const trimmed = newTitle.trim();
    if (!trimmed) return;
    try {
      if (node.type === 'folder') {
        if (storageType === 's3') {
          const prefix = node.path;
          const parentPath = prefix.slice(0, prefix.length - (node.name?.length ?? 0) - 1);
          const destPrefix = `${parentPath}${trimmed}/`;
          await moveS3FolderToFolder(node, parentPath, trimmed);
          await loadS3Files();
          applyWorkspaceFolderPathRetarget('s3', prefix, destPrefix);
          if (currentFile && currentFile.type === 's3' && currentFile.id.startsWith(node.path)) {
            const newPath = currentFile.id.replace(prefix, destPrefix);
            applyOpenFileIdentityChange(
              { ...currentFile, id: newPath },
              { oldPath: currentFile.id, retargetTabs: false },
            );
          }
        } else if (storageType === 'local') {
          const parentHandle = node.parentHandle || localRootHandle;
          if (!parentHandle) throw new Error('루트 폴더를 먼저 열어주세요.');
          const oldPrefix = node.path.endsWith('/') ? node.path : `${node.path}/`;
          const newPrefix =
            node.path.slice(0, -(node.name?.length ?? 0) - 1) + trimmed + '/';
          await moveLocalFolderToFolder(node, parentHandle, '', trimmed);
          applyWorkspaceFolderPathRetarget('local', oldPrefix, newPrefix);
          if (currentFile && currentFile.type === 'local' && (currentFile.id === node.path || currentFile.id.startsWith(oldPrefix) || currentFile.id.startsWith(node.path))) {
            const newPathForFile = currentFile.id.startsWith(oldPrefix)
              ? newPrefix + currentFile.id.slice(oldPrefix.length)
              : currentFile.id.startsWith(node.path)
                ? newPrefix + currentFile.id.slice(node.path.length)
                : currentFile.id;
            applyOpenFileIdentityChange(
              { ...currentFile, id: newPathForFile },
              { oldPath: currentFile.id, retargetTabs: false },
            );
          }
        } else if (storageType === 'webdav') {
          const oldPrefix = node.path.endsWith('/') ? node.path : `${node.path}/`;
          const destPrefix = node.path.slice(0, -(node.name?.length ?? 0) - 1) + trimmed + '/';
          await moveWebdavFolderToFolder(node, '', trimmed);
          applyWorkspaceFolderPathRetarget('webdav', oldPrefix, destPrefix);
          if (currentFile && currentFile.type === 'webdav' && currentFile.id.startsWith(node.path)) {
            const newPathForFile = currentFile.id.startsWith(oldPrefix)
              ? destPrefix + currentFile.id.slice(oldPrefix.length)
              : destPrefix + currentFile.id.slice(node.path.length);
            applyOpenFileIdentityChange(
              { ...currentFile, id: newPathForFile },
              { oldPath: currentFile.id, retargetTabs: false },
            );
          }
        }
        return;
      }
      if (storageType === 's3') {
        const originalName = node.name || '';
        const lastDot = originalName.lastIndexOf('.');
        const ext = lastDot > 0 ? originalName.slice(lastDot) : '';
        const newName = `${trimmed}${ext}`;
        const oldPath = node.path;

        const isCurrentFile = currentFile?.type === 's3' && currentFile?.id === node.path;
        const fileToRename = isCurrentFile ? { ...currentFile, viewer: currentFile.viewer } : { id: node.path, name: node.name };
        const hasUnsaved = isCurrentFile && currentFile.content !== editorContent;
        const contentOverride = hasUnsaved ? editorContent : null;

        const updated = await renameS3File(fileToRename, newName, contentOverride);
        if (isCurrentFile) {
          applyOpenFileIdentityChange(updated, { oldPath });
        } else {
          applyWorkspaceFilePathRetarget('s3', oldPath, updated.id, {
            ...updated,
            name: newName,
          });
        }
      } else if (storageType === 'local') {
        const pHandle = node.parentHandle || localRootHandle;
        if (!pHandle) throw new Error('루트 폴더를 먼저 열어주세요.');

        const oldPath = node.path;
        const lastSlash = oldPath.lastIndexOf('/');
        const dirPrefix = lastSlash >= 0 ? oldPath.slice(0, lastSlash + 1) : '';
        const originalName = node.name || '';
        const nameLastDot = originalName.lastIndexOf('.');
        const ext = nameLastDot > 0 ? originalName.slice(nameLastDot) : '';
        const newName = `${trimmed}${ext}`;
        const newPath = dirPrefix + newName;

        if (newPath === oldPath) return;

        const file = await node.handle.getFile();
        const newFileHandle = await pHandle.getFileHandle(newName, { create: true });
        const writable = await newFileHandle.createWritable();
        await writable.write(await file.arrayBuffer());
        await writable.close();

        await pHandle.removeEntry(node.name, { recursive: false });

        await refreshLocalTree();

        if (currentFile && currentFile.type === 'local' && currentFile.id === node.path) {
          applyOpenFileIdentityChange(
            {
              ...currentFile,
              id: newPath,
              name: newName,
              handle: newFileHandle,
            },
            { oldPath },
          );
        } else {
          applyWorkspaceFilePathRetarget('local', oldPath, newPath, {
            id: newPath,
            name: newName,
            handle: newFileHandle,
          });
        }
      } else if (storageType === 'webdav') {
        const backend = createWebdavBackend(webdavConfig);
        const oldPath = node.path;
        const lastSlash = oldPath.lastIndexOf('/');
        const dirPrefix = lastSlash >= 0 ? oldPath.slice(0, lastSlash + 1) : '';
        const originalName = node.name || '';
        const nameLastDot = originalName.lastIndexOf('.');
        const ext = nameLastDot > 0 ? originalName.slice(nameLastDot) : '';
        const newName = `${trimmed}${ext}`;
        const newPath = dirPrefix + newName;
        if (newPath === oldPath) return;

        const isCurrentFile = currentFile?.type === 'webdav' && currentFile?.id === node.path;
        const hasUnsaved = isCurrentFile && currentFile.content !== editorContent;
        if (hasUnsaved) {
          await backend.writeText(newPath, editorContent, 'text/markdown');
          await backend.delete(oldPath);
        } else {
          await backend.move(oldPath, newPath);
        }
        await refreshWebdavTree();
        if (isCurrentFile) {
          applyOpenFileIdentityChange(
            { ...currentFile, id: newPath, name: newName },
            { oldPath },
          );
        } else {
          applyWorkspaceFilePathRetarget('webdav', oldPath, newPath, {
            id: newPath,
            name: newName,
          });
        }
      }
    } catch (e) {
      alert("이름 변경 실패: " + e.message);
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

  const handleRequestMoveFolder = (node, storageType) => {
    if (!node || node.type !== 'folder') return;
    setMoveFolderTarget({ node, storageType });
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

  const handleDropOnFolder = async (targetNode, targetStorageType, action, payload) => {
    if (action === 'dragOver') {
      if (!targetNode) return;
      setDropTarget({ folderPath: targetNode.path, storageType: targetStorageType });
      return;
    }
    if (action === 'dragLeave') {
      setDropTarget(null);
      return;
    }
    if (action !== 'drop' || !targetNode || targetNode.type !== 'folder') return;

    setDropTarget(null);

    const destPath = targetNode.path || '';
    let destHandle = null;
    if (targetStorageType === 'local') {
      destHandle = targetNode.handle || null;
      if (!destHandle) {
        if (!destPath) {
          destHandle = localRootHandle;
        } else {
          destHandle = findNodeByPath(localTree, destPath)?.handle || localRootHandle;
        }
      }
    }

    const rawItems = Array.isArray(payload?.items) && payload.items.length
      ? payload.items
      : (payload?.storageType !== undefined && payload?.path
        ? [{ storageType: payload.storageType, path: payload.path, nodeType: payload.nodeType }]
        : null);

    if (rawItems) {
      const isCopy = Boolean(payload?.copy);
      const verb = isCopy ? '복제' : '이동';
      const items = pruneNestedMovePaths(rawItems).filter((item) => {
        if (item.storageType !== targetStorageType) return false;
        if (item.path === destPath) return false;
        if (item.nodeType === 'folder' && (destPath === item.path || destPath.startsWith(item.path))) {
          return false;
        }
        return true;
      });

      if (!items.length) return;

      const tree =
        targetStorageType === 's3'
          ? s3Tree
          : targetStorageType === 'webdav'
            ? webdavTree
            : localTree;
      const usedDestNames = new Set(getTreeChildNames(tree, destPath, findNodeByPath));
      let successCount = 0;
      let failCount = 0;
      let lastError = null;
      let lastSuccessName = null;

      if (items.length > 1) {
        setOperationStatus(`${items.length}개 항목 ${verb} 중…`);
      }

      for (const item of items) {
        const { storageType: srcStorageType, path: srcPath, nodeType } = item;
        const srcNode = findNodeByPath(tree, srcPath);
        if (!srcNode) {
          failCount += 1;
          lastError = new Error(`${verb}할 항목을 트리에서 찾을 수 없습니다.`);
          continue;
        }

        if (!isCopy) {
          if (nodeType === 'file') {
            const destFilePath = `${destPath || ''}${srcNode.name}`;
            if (destFilePath === srcPath) continue;
          } else if (nodeType === 'folder') {
            const destFolderPrefix = `${destPath || ''}${srcNode.name}/`;
            if (destFolderPrefix === srcPath) continue;
            if (destFolderPrefix.startsWith(srcPath) || srcPath.startsWith(destFolderPrefix)) continue;
          }
        }

        try {
          const isFolder = nodeType === 'folder';
          const sameFolderCopy = isCopy && getParentFolderPath(srcPath) === destPath;
          let destName = srcNode.name;

          if (sameFolderCopy) {
            destName = allocateUniqueCopyName(srcNode.name, usedDestNames, {
              forceSuffix: true,
              isFolder,
            });
          } else if (treeChildNameTaken(usedDestNames, srcNode.name)) {
            const resolved = await resolveTreeDestName({
              name: srcNode.name,
              usedNames: usedDestNames,
              kind: isFolder ? 'folder' : 'file',
              action: isCopy ? 'copy' : 'move',
              askConflict: askTreeNameConflict,
              loadCompare: isFolder
                ? undefined
                : () =>
                    loadFileCompareForDest({
                      storageType: srcStorageType,
                      destFolderPath: destPath,
                      fileName: srcNode.name,
                      incomingPath: srcPath,
                      incomingNode: srcNode,
                      existingLabel: `대상 폴더의 "${srcNode.name}"`,
                      incomingLabel: isCopy
                        ? `복제할 "${srcNode.name}"`
                        : `이동할 "${srcNode.name}"`,
                    }),
            });
            if (!resolved) {
              continue;
            }
            destName = resolved;
          }

          if (srcStorageType === 'local' && destHandle && destName !== srcNode.name) {
            const existing = new Set(usedDestNames);
            while (true) {
              try {
                if (isFolder) await destHandle.getDirectoryHandle(destName);
                else await destHandle.getFileHandle(destName);
                existing.add(destName);
                destName = allocateUniqueCopyName(srcNode.name, existing, {
                  forceSuffix: true,
                  isFolder,
                });
              } catch {
                break;
              }
            }
          }

          usedDestNames.add(destName);
          const destFilePath = `${destPath || ''}${destName}`;

          beginTreeTransferBusy({
            storageType: srcStorageType,
            path: srcPath,
            nodeType: isFolder ? 'folder' : 'file',
            destFolderPath: destPath || '',
            action: isCopy ? 'copy' : 'move',
          });

          try {
            if (isCopy) {
              if (nodeType === 'file') {
                const fileNode = srcStorageType === 's3'
                  ? { id: srcPath, name: srcNode.name }
                  : { ...srcNode, id: srcNode.path };
                if (srcStorageType === 's3') {
                  await copyS3FileToFolder(fileNode, destPath, destName);
                } else if (srcStorageType === 'webdav') {
                  await copyWebdavFileToFolder(fileNode, destPath, destName);
                } else {
                  await copyLocalFileToFolder(fileNode, destHandle, destPath, destName);
                }
                await reloadOpenFileIfPath(srcStorageType, destFilePath);
              } else if (srcStorageType === 's3') {
                await copyS3FolderToFolder(srcNode, destPath, destName);
              } else if (srcStorageType === 'webdav') {
                await copyWebdavFolderToFolder(srcNode, destPath, destName);
              } else {
                await copyLocalFolderToFolder(srcNode, destHandle, destPath, destName);
              }
              lastSuccessName = destName;
            } else if (nodeType === 'file') {
              const fileNode = srcStorageType === 's3'
                ? { id: srcPath, name: srcNode.name }
                : { ...srcNode, id: srcNode.path };
              if (srcStorageType === 's3') {
                await moveS3FileToFolder(fileNode, destPath, destName);
                if (currentFileRef.current?.type === 's3' && currentFileRef.current.id === srcPath) {
                  applyOpenFileIdentityChange(
                    { ...currentFileRef.current, id: destFilePath, name: destName },
                    { oldPath: srcPath },
                  );
                } else {
                  applyWorkspaceFilePathRetarget(srcStorageType, srcPath, destFilePath, {
                    id: destFilePath,
                    name: destName,
                  });
                  await reloadOpenFileIfPath(srcStorageType, destFilePath);
                }
              } else if (srcStorageType === 'webdav') {
                const updated = await moveWebdavFileToFolder(fileNode, destPath, destName);
                if (currentFileRef.current?.type === 'webdav' && currentFileRef.current.id === srcPath) {
                  applyOpenFileIdentityChange(updated, { oldPath: srcPath });
                } else {
                  applyWorkspaceFilePathRetarget(srcStorageType, srcPath, destFilePath, {
                    id: destFilePath,
                    name: destName,
                  });
                  await reloadOpenFileIfPath(srcStorageType, destFilePath);
                }
              } else {
                const updated = await moveLocalFileToFolder(fileNode, destHandle, destPath, destName);
                if (currentFileRef.current?.type === 'local' && currentFileRef.current.id === srcPath) {
                  applyOpenFileIdentityChange(updated, { oldPath: srcPath });
                } else {
                  applyWorkspaceFilePathRetarget(srcStorageType, srcPath, destFilePath, {
                    id: destFilePath,
                    name: destName,
                    ...(updated?.handle ? { handle: updated.handle } : {}),
                  });
                  await reloadOpenFileIfPath(srcStorageType, destFilePath);
                }
              }
              lastSuccessName = destName;
            } else {
              if (srcStorageType === 's3') {
                await moveS3FolderToFolder(srcNode, destPath, destName);
              } else if (srcStorageType === 'webdav') {
                await moveWebdavFolderToFolder(srcNode, destPath, destName);
              } else {
                await moveLocalFolderToFolder(srcNode, destHandle, destPath, destName);
              }
              const oldPrefix = srcNode.path.endsWith('/') ? srcNode.path : `${srcNode.path}/`;
              const newPrefix = `${destPath}${destName}/`;
              applyWorkspaceFolderPathRetarget(srcStorageType, oldPrefix, newPrefix);
              if (
                currentFileRef.current &&
                currentFileRef.current.type === srcStorageType &&
                (currentFileRef.current.id.startsWith(oldPrefix) ||
                  currentFileRef.current.id.startsWith(srcNode.path))
              ) {
                const cur = currentFileRef.current;
                const newPath = cur.id.startsWith(oldPrefix)
                  ? newPrefix + cur.id.slice(oldPrefix.length)
                  : newPrefix + cur.id.slice(srcNode.path.length);
                applyOpenFileIdentityChange(
                  { ...cur, id: newPath },
                  { oldPath: cur.id, retargetTabs: false },
                );
              }
              lastSuccessName = destName;
            }
            successCount += 1;
          } finally {
            endTreeTransferBusy(srcStorageType, srcPath);
          }
        } catch (e) {
          failCount += 1;
          lastError = e;
          endTreeTransferBusy(srcStorageType, srcPath);
        }
      }

      if (successCount === 0 && failCount === 0) return;

      if (successCount > 0 && !isCopy) {
        setSelectedIds(new Set());
      }
      if (successCount > 0 && isCopy) {
        const parentPaths = getParentPathsToExpand(destPath);
        expandPathsRef.current?.(targetStorageType, parentPaths);
      }

      if (failCount === 0) {
        setOperationStatus(
          successCount > 1
            ? `${successCount}개 항목 ${verb} 완료`
            : `${items[0].nodeType === 'folder' ? '폴더' : '파일'} ${verb} 완료: ${lastSuccessName || items[0].name || items[0].path}`,
        );
      } else if (successCount === 0) {
        alert(`${verb} 실패: ` + (lastError?.message || '알 수 없는 오류'));
        setOperationStatus(`${verb} 실패: ${lastError?.message || ''}`);
      } else {
        alert(`${successCount}개 ${verb} 완료, ${failCount}개 실패` + (lastError ? `: ${lastError.message}` : ''));
        setOperationStatus(`${successCount}개 ${verb}, ${failCount}개 실패`);
      }
      return;
    }

    if (payload?.files?.length > 0 || payload?.dirHandles?.length > 0) {
      const { files = [], dirHandles = [] } = payload;
      const totalItems = files.length + dirHandles.length;
      const indicatorId = addIndicator({
        id: 'drop-upload',
        type: ActivityTypes.FILE_UPLOAD,
        label: totalItems > 1 ? `${totalItems}개 항목 업로드 중` : '업로드 중',
      });
      try {
        const usedNames = new Set(
          getTreeChildNames(
            getUploadTreeForStorage(targetStorageType),
            destPath || '',
            findNodeByPath,
          ),
        );
        let uploadedCount = 0;
        let skippedCount = 0;

        if (targetStorageType === 's3') {
          const client = getS3Client();
          if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
          const uploadFile = async (file, prefix, destName = normalizeUnicodeNfc(file.name)) => {
            const key = prefix + normalizeUnicodeNfc(destName);
            const body = await file.arrayBuffer();
            await putObject(client, {
              Bucket: s3Creds.bucket,
              Key: key,
              Body: new Uint8Array(body),
              ContentType: file.type || 'application/octet-stream',
            });
          };
          const uploadDir = async (dirHandle, prefix) => {
            for await (const entry of dirHandle.values()) {
              const nfcName = normalizeUnicodeNfc(entry.name);
              if (entry.kind === 'file') {
                const file = await entry.getFile();
                await uploadFile(file, prefix, nfcName);
              } else if (entry.kind === 'directory') {
                await uploadDir(entry, `${prefix}${nfcName}/`);
              }
            }
          };
          for (const file of files) {
            const destName = await resolveUploadDestFileName(
              file.name,
              usedNames,
              askUploadNameConflict,
            );
            if (!destName) {
              skippedCount += 1;
              continue;
            }
            await uploadFile(file, destPath, destName);
            usedNames.add(destName);
            uploadedCount += 1;
            await reloadOpenFileIfPath(targetStorageType, `${destPath || ''}${destName}`);
          }
          for (const handle of dirHandles) {
            const nfcDirName = normalizeUnicodeNfc(handle.name || '');
            await uploadDir(handle, `${destPath}${nfcDirName}/`);
            uploadedCount += 1;
          }
          loadS3Files();
          const parentPaths = getParentPathsToExpand(destPath);
          expandPathsRef.current?.(targetStorageType, parentPaths);
        } else if (targetStorageType === 'webdav') {
          const backend = createWebdavBackend(webdavConfig);
          const uploadFile = async (file, prefix, destName = normalizeUnicodeNfc(file.name)) => {
            const key = prefix + normalizeUnicodeNfc(destName);
            const body = new Uint8Array(await file.arrayBuffer());
            await backend.writeBytes(key, body, file.type || 'application/octet-stream');
          };
          const uploadDir = async (dirHandle, prefix) => {
            for await (const entry of dirHandle.values()) {
              const nfcName = normalizeUnicodeNfc(entry.name);
              if (entry.kind === 'file') {
                const file = await entry.getFile();
                await uploadFile(file, prefix, nfcName);
              } else if (entry.kind === 'directory') {
                await uploadDir(entry, `${prefix}${nfcName}/`);
              }
            }
          };
          for (const file of files) {
            const destName = await resolveUploadDestFileName(
              file.name,
              usedNames,
              askUploadNameConflict,
            );
            if (!destName) {
              skippedCount += 1;
              continue;
            }
            await uploadFile(file, destPath, destName);
            usedNames.add(destName);
            uploadedCount += 1;
            await reloadOpenFileIfPath(targetStorageType, `${destPath || ''}${destName}`);
          }
          for (const handle of dirHandles) {
            const nfcDirName = normalizeUnicodeNfc(handle.name || '');
            await uploadDir(handle, `${destPath}${nfcDirName}/`);
            uploadedCount += 1;
          }
          await refreshWebdavTree();
          const parentPaths = getParentPathsToExpand(destPath);
          expandPathsRef.current?.(targetStorageType, parentPaths);
        } else {
          const targetDirHandle = destHandle || localRootHandle;
          if (!targetDirHandle) throw new Error('루트 폴더를 먼저 열어주세요.');
          const copyFile = async (file, dirHandle, destName = normalizeUnicodeNfc(file.name)) => {
            const nfcName = normalizeUnicodeNfc(destName);
            const newFileHandle = await dirHandle.getFileHandle(nfcName, { create: true });
            const writable = await newFileHandle.createWritable();
            await writable.write(await file.arrayBuffer());
            await writable.close();
          };
          const copyDir = async (dirHandle, destDirHandle) => {
            const nfcDirName = normalizeUnicodeNfc(dirHandle.name);
            const newDir = await destDirHandle.getDirectoryHandle(nfcDirName, { create: true });
            for await (const entry of dirHandle.values()) {
              const nfcName = normalizeUnicodeNfc(entry.name);
              if (entry.kind === 'file') {
                const file = await entry.getFile();
                const fh = await newDir.getFileHandle(nfcName, { create: true });
                const w = await fh.createWritable();
                await w.write(await file.arrayBuffer());
                await w.close();
              } else if (entry.kind === 'directory') {
                await copyDir(entry, newDir);
              }
            }
          };
          for (const file of files) {
            const destName = await resolveUploadDestFileName(
              file.name,
              usedNames,
              askUploadNameConflict,
            );
            if (!destName) {
              skippedCount += 1;
              continue;
            }
            await copyFile(file, targetDirHandle, destName);
            usedNames.add(destName);
            uploadedCount += 1;
            await reloadOpenFileIfPath(targetStorageType, `${destPath || ''}${destName}`);
          }
          for (const handle of dirHandles) {
            await copyDir(handle, targetDirHandle);
            uploadedCount += 1;
          }
          refreshLocalTree();
          const parentPaths = getParentPathsToExpand(destPath);
          expandPathsRef.current?.(targetStorageType, parentPaths);
        }
        if (uploadedCount === 0 && skippedCount > 0) {
          setOperationStatus('업로드 취소됨');
        } else if (skippedCount > 0) {
          setOperationStatus(`업로드 완료 (${skippedCount}개 취소)`);
        } else {
          setOperationStatus('업로드 완료');
        }
      } catch (e) {
        alert('업로드 실패: ' + e.message);
        setOperationStatus(`업로드 실패: ${e.message}`);
      } finally {
        if (treeNameConflictResolverRef.current) {
          settleTreeNameConflict('cancel');
        }
        removeIndicator(indicatorId);
      }
    }
  };

  const handleDragEndNode = () => {
    setDropTarget(null);
  };

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

  // 7. Auto Save (S3, local, WebDAV — 5s debounce)
  // `.enc.md`: manual save only — never debounce-write plaintext or prompt for password.
  useEffect(() => {
    const editableTypes = ['s3', 'local', 'webdav'];
    if (!currentFile || !editableTypes.includes(currentFile.type)) return;
    if (currentFile.viewer !== 'markdown') return;
    if (isEncMdPath(currentFile.id) || isEncMdPath(currentFile.name)) return;
    if (!lastInputAt) return;

    const now = Date.now();
    const timeout = setTimeout(async () => {
      if (currentFile.content === editorContent) return;
      if (!currentFile || !editableTypes.includes(currentFile.type)) return;
      if (isEncMdPath(currentFile.id) || isEncMdPath(currentFile.name)) return;
      try {
        await saveFile(null, { lastInputAt });
        setLastAutoSaveAt(now);
      } catch (_e) {
        // saveFile handles alerts
      }
    }, 5000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastInputAt, currentFile, editorContent]);

  // 8. Auto Sync (S3 + WebDAV, pull when idle >= 30s)
  // Skip `.enc.md`: remote body is ciphertext; never pull it into the plaintext editor.
  useEffect(() => {
    if (!currentFile || (currentFile.type !== 's3' && currentFile.type !== 'webdav')) return;
    if (currentFile.viewer !== 'markdown') return;
    if (isEncMdPath(currentFile.id) || isEncMdPath(currentFile.name)) return;

    const interval = setInterval(async () => {
      if (!lastInputAt) return;
      const idleMs = Date.now() - lastInputAt;
      if (idleMs < 30000) return;
      // 로컬에 미저장 내용이 있으면 덮어쓰지 않음
      if (currentFile.content !== editorContent) return;
      if (isEncMdPath(currentFile.id) || isEncMdPath(currentFile.name)) return;

      const backend = getBackendForType(currentFile.type);
      if (!backend) return;

      try {
        const { text } = await backend.readText(currentFile.id);
        setCurrentFile((prev) => {
          if (!prev || prev.type !== currentFile.type || prev.id !== currentFile.id) return prev;
          return { ...prev, content: text };
        });
        setEditorContent((prev) => {
          if (prev !== editorContent) return prev;
          return text;
        });
        setLastAutoSyncAt(Date.now());
      } catch (err) {
        console.error('Auto sync read error:', err);
      }
    }, 5000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFile, editorContent, lastInputAt]);

  useEffect(() => {
    editorContentRef.current = editorContent;
  }, [editorContent]);

  useEffect(() => {
    if (currentFile?.id) prevEditorContentRef.current = editorContent;
  }, [currentFile?.id, editorContent]);

  const handleEditorChange = (value) => {
    editorContentRef.current = value;
    if (isRecording && currentFile?.viewer === 'markdown') {
      const prevLines = prevEditorContentRef.current.split('\n');
      const newLines = value.split('\n');
      const lineCountDiff = newLines.length - prevLines.length;
      let line = Math.max(0, newLines.length - 1);
      const maxLen = Math.max(prevLines.length, newLines.length);
      for (let i = 0; i < maxLen; i++) {
        if ((prevLines[i] ?? null) !== (newLines[i] ?? null)) {
          line = i;
          break;
        }
      }
      const text = newLines[line] ?? '';
      const isNewLineInserted = lineCountDiff === 1;
      captureSync(line, text, { insert: isNewLineInserted });
    }
    prevEditorContentRef.current = value;
    setEditorContent(value);
    setLastInputAt(Date.now());
    const active = getActiveFileTab(workspaceTabsRef.current);
    if (active) {
      const next = patchFileTab(workspaceTabsRef.current, active.id, {
        editorContent: value,
      });
      workspaceTabsRef.current = next;
      setWorkspaceTabs(next);
    }
  };

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
  const hasUnsavedChanges =
    isEditableStorage && currentFile && currentFile.content !== editorContent;
  const hasAutoSaved = isEditableStorage && !!lastAutoSaveAt;

  const autoSaveIndicatorClass = !isEditableStorage
    ? 'bg-gray-300'
    : hasUnsavedChanges
    ? 'bg-yellow-400 animate-pulse'
    : hasAutoSaved
    ? 'bg-green-500'
    : 'bg-gray-400';

  if (!scriptsLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 text-gray-500 dark:bg-odp-bgSofter dark:text-odp-fg">
        로딩 중...
      </div>
    );
  }

  if (isExportPdfAppPathname(location.pathname)) {
    const routeExportPath = parseExportPdfPathFromAppPathname(location.pathname);
    const navState = location.state && typeof location.state === 'object' ? location.state : null;
    const documentFile = navState?.currentFile ?? currentFile;
    const documentValue =
      typeof navState?.value === 'string'
        ? navState.value
        : typeof editorContent === 'string'
          ? editorContent
          : '';
    const waitingForRouteDoc =
      Boolean(routeExportPath)
      && !navState?.value
      && documentFile?.id !== routeExportPath;

    return (
      <div className="export-pdf-layout h-dvh min-h-0 overflow-hidden print:h-auto print:min-h-0 print:overflow-visible max-w-screen bg-neutral-200 dark:bg-neutral-800 print:bg-white print:dark:bg-white">
        <UserWebfontStyles />
        <Suspense fallback={<RouteSuspenseFallback />}>
          <ExportPDFPage
            documentValue={documentValue}
            documentFile={documentFile}
            openCoverEdit={Boolean(navState?.openCoverEdit)}
            isDocumentLoading={waitingForRouteDoc}
            hasNavigationSession={Boolean(navState) || Boolean(routeExportPath)}
          />
        </Suspense>
        <AdvancedSearchHost
          getTrees={() =>
            storageMode === STORAGE_MODE_LOCAL
              ? [localTree]
              : storageMode === STORAGE_MODE_WEBDAV
                ? [webdavTree]
                : [s3Tree]
          }
          onOpenFile={openAdvancedSearchFile}
          preferPrintActions
          snippetConfig={snippetConfig}
        />
        <AuthModal
          isOpen={showAuthModal && !shareBlockingAuth}
          onUnlock={handleUnlock}
          fileInputRef={fileInputRef}
          onCloseWithoutUnlock={() => {
            proceedWithoutStoredCreds();
            openSettingsWorkspaceTab();
          }}
          canUnlockWithWebAuthn={
            webauthnAvailable &&
            !!getStoredWebAuthn() &&
            (isStoredWithWebAuthn() || !!getStoredWebAuthn()?.encryptedPassword)
          }
          onUnlockWithWebAuthn={handleUnlockWithWebAuthn}
          isPasswordMode={!isStoredWithWebAuthn()}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex min-h-0 bg-gray-50 dark:bg-odp-bgSofter text-gray-800 dark:text-odp-fg font-sans ${
        lockChatViewport
          ? 'fixed inset-x-0 z-0 flex-col overflow-hidden'
          : 'relative h-screen'
      }`}
      style={
        lockChatViewport
          ? {
              top: 'var(--app-vv-top, 0px)',
              height: 'var(--app-vv-height, 100dvh)',
              maxHeight: 'var(--app-vv-height, 100dvh)',
            }
          : undefined
      }
    >
      <UserWebfontStyles />
      {/* Hidden file input for import */}
      <input type="file" ref={fileInputRef} onChange={handleImportCreds} accept=".json" className="hidden" />

      {/* Hidden file input for upload */}
      <input
        type="file"
        ref={uploadFileInputRef}
        onChange={handleUploadFileSelect}
        multiple
        className="hidden"
      />
      {/* Hidden folder input for upload */}
      <input
        type="file"
        ref={uploadFolderInputRef}
        onChange={handleUploadFolderSelect}
        webkitdirectory=""
        directory=""
        className="hidden"
      />

      {needRefresh && !hidePwaUpdateToast && (
        <div className="fixed right-3 bottom-10 z-11000 w-[min(92vw,360px)] rounded-xl border border-blue-200 bg-white p-3 shadow-xl dark:border-blue-900/60 dark:bg-odp-bgSoft md:right-4 md:bottom-12">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-odp-fgStrong">
                새 버전이 준비되었습니다
              </p>
              <p className="mt-1 text-xs text-gray-600 dark:text-odp-muted">
                저장 중인 작업을 확인한 뒤 업데이트를 적용하세요.
              </p>
            </div>
            <button
              type="button"
              className="shrink-0 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:text-odp-muted dark:hover:bg-odp-focusBg dark:hover:text-odp-fg"
              aria-label="업데이트 토스트 닫기"
              onClick={() => setHidePwaUpdateToast(true)}
            >
              <IconX size={16} />
            </button>
          </div>
          <div className="mt-3 flex items-center justify-end gap-2">
            <button
              type="button"
              className="rounded-md px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg"
              onClick={() => setHidePwaUpdateToast(true)}
              disabled={isApplyingPwaUpdate}
            >
              나중에
            </button>
            <button
              type="button"
              className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={handleApplyPwaUpdate}
              disabled={isApplyingPwaUpdate}
            >
              {isApplyingPwaUpdate ? '업데이트 중...' : '지금 업데이트'}
            </button>
          </div>
        </div>
      )}

      {/* Share target chooser — above lock blur; defers AuthModal while open */}
      <ShareTargetGate
        isUnlocked={isUnlocked}
        storageReady={chatStorageReady}
        chatCtx={chatStorageCtx}
        onBlockingChange={handleShareBlockingChange}
        onComposeClaimed={handleShareComposeClaimed}
        onOpenAsSession={handleOpenSessionFiles}
      />

      {isUnlocked ? (
        <AdvancedSearchHost
          getTrees={getAdvancedSearchTrees}
          onOpenFile={openAdvancedSearchFile}
          ensureBrowseFolderLoaded={ensureAdvancedSearchBrowseFolder}
          onRequestCreateItem={requestAdvancedSearchCreateItem}
          getChatGroups={getAdvancedSearchChatGroups}
          getPresignedUrl={getChatImageUrlForPath}
          currentFile={currentFile}
          defaultCreateParentPath={newFileDefaultParentPath}
          editorContent={editorContent}
          snippetConfig={snippetConfig}
          theme={theme}
        />
      ) : null}

      {/* Auth Modal (Lock Screen) */}
      <AuthModal
        isOpen={showAuthModal && !shareBlockingAuth}
        onUnlock={handleUnlock}
        fileInputRef={fileInputRef}
        onCloseWithoutUnlock={() => {
          proceedWithoutStoredCreds();
          openSettingsWorkspaceTab();
        }}
        canUnlockWithWebAuthn={
          webauthnAvailable &&
          !!getStoredWebAuthn() &&
          (isStoredWithWebAuthn() || !!getStoredWebAuthn()?.encryptedPassword)
        }
        onUnlockWithWebAuthn={handleUnlockWithWebAuthn}
        isPasswordMode={!isStoredWithWebAuthn()}
      />

      {/* Main UI (Blurred if locked) */}
      <div
        className={`flex min-h-0 flex-1 w-full flex-col overflow-hidden transition-all duration-300 ${
          !isUnlocked ? 'blur-md pointer-events-none select-none' : ''
        }`}
      >
        <div className="relative flex min-h-0 flex-1">
          {/* Mobile: backdrop when sidebar open */}
          {isMobile && sidebarOpen && (
            <button
              type="button"
              aria-label="사이드바 닫기"
              className="fixed inset-0 z-55 bg-black/30 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar: mobile open z-60 above main z-50; closed z-40 + pointer-events-none */}
          <ResizableSidebarPanel
            isMobile={isMobile}
            collapsed={sidebarCollapsed}
            open={sidebarOpen}
            onRequestCollapse={() => setSidebarCollapsed(true)}
            mobileHeader={
              isMobile ? (
                <div className="sticky top-0 z-20 flex shrink-0 justify-end border-b border-gray-200 dark:border-odp-bgSofter bg-white dark:bg-odp-bgSoft pt-[max(0.5rem,env(safe-area-inset-top))] px-2 pb-2 md:hidden">
                  <button
                    type="button"
                    aria-label="사이드바 닫기"
                    onClick={() => setSidebarOpen(false)}
                    className="p-2.5 text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded-lg transition touch-manipulation"
                  >
                    <IconX size={22} />
                  </button>
                </div>
              ) : null
            }
          >
            <Sidebar
              isMobileLayout={isMobile}
              fileTabContextMenuRef={fileTabContextMenuRef}
              appName={appName}
              onBrandClick={handleBrandClick}
              onStorageModeChange={setStorageMode}
              storageMode={storageMode}
              s3Tree={s3Tree}
              s3Bucket={s3Creds.bucket}
              localTree={localTree}
              localRootHandle={localRootHandle}
              isLocalTreeLoading={isLocalTreeLoading}
              localFolderLoadingPath={localFolderLoadingPath}
              webdavTree={webdavTree}
              webdavReady={webdavReady}
              isWebdavTreeLoading={isWebdavTreeLoading}
              webdavFolderLoadingPath={webdavFolderLoadingPath}
              onLoadWebdavFolderChildren={loadWebdavFolderChildren}
              onRefreshWebdav={refreshWebdavTree}
              onLoadLocalFolderChildren={loadLocalFolderChildren}
              onRefreshLocal={refreshLocalTree}
              currentFile={currentFile}
              selectedIds={selectedIds}
              onSelectFile={handleTreeNodeSelect}
              onClearSelection={() => setSelectedIds(new Set())}
              onCreateItem={requestCreateItem}
              onRequestUploadFile={requestUploadFile}
              onRequestUploadFolder={requestUploadFolder}
              onRequestMoveFolder={handleRequestMoveFolder}
              onDropOnFolder={handleDropOnFolder}
              onDragEndNode={handleDragEndNode}
              dropTarget={dropTarget}
              transferBusyItems={treeTransferBusy}
              onOpenLocalFolder={openLocalFolder}
              onSetDeleteTarget={setDeleteTarget}
              onRequestEmptyTrash={(_node, storageType) => {
                setEmptyTrashTarget({ storageType });
              }}
              onOpenSettings={() => {
                if (isMobile) setSidebarOpen(false);
                openSettingsWorkspaceTab();
              }}
              theme={theme}
              onToggleTheme={() =>
                setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
              }
              onRenameItem={renameTreeItem}
              showHiddenFolders={showHiddenFolders}
              showTrashFolder={showTrashFolder}
              hideRecordingCompanions={hideRecordingCompanions}
              treeStickyFolderPathEnabled={treeStickyFolderPathEnabled}
              showTreeModifiedDate={showTreeModifiedDate}
              hoverExpandDelayMs={treeHoverExpandSettingsToMs(treeHoverExpandSettings)}
              onRequestCollapseSidebar={!isMobile ? () => setSidebarCollapsed(true) : undefined}
              deletingFolderPath={deletingFolderPath}
              isDeletingFolder={isDeletingFolder}
              expandPathsRef={expandPathsRef}
              onRefreshS3={loadS3Files}
              onDownloadNode={handleDownloadNode}
              onDuplicateNode={handleDuplicateNode}
              onRequestMoveFile={handleRequestMoveFileFromSidebar}
              onOpenInNewWindow={handleOpenInNewWindow}
              onShareToChatWithMyself={handleShareNodeToChatWithMyself}
              onOpenChatWithMyself={() => {
                if (isMobile) setSidebarOpen(false);
                if (workspaceTabsEnabled) openChatWorkspaceTab();
                else navigate('/chat');
              }}
              chatWithMyselfActive={chatSurfaceActive}
              chatAttachDropHost={chatAttachDropHost}
              onDropToChatAttach={handleDropToChatAttach}
              sessionWorkspace={sessionWorkspace}
              sessionTree={sessionWorkspace ? buildSessionTree(sessionWorkspace) : []}
              onCloseSessionWorkspace={closeSessionWorkspace}
            />
          </ResizableSidebarPanel>

          {!isMobile && (
            <button
              type="button"
              aria-label="사이드바 펼치기"
              title="사이드바 펼치기"
              onClick={() => setSidebarCollapsed(false)}
              className={`hidden md:inline-flex absolute left-3 top-3 z-55 p-1.5 shrink-0 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-odp-focusBg rounded transition-all duration-300 ease-in-out ${
                sidebarCollapsed
                  ? 'opacity-100 translate-x-0 pointer-events-auto'
                  : 'opacity-0 -translate-x-2 pointer-events-none'
              }`}
              tabIndex={sidebarCollapsed ? 0 : -1}
              aria-hidden={!sidebarCollapsed}
            >
              <ChevronsRight size={18} aria-hidden />
            </button>
          )}

                    {/* Main Content Routes (z-50: above closed mobile sidebar z-40 so toolbar buttons receive taps) */}
          <div className="relative z-50 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <Routes>
            <Route
              path="*"
              element={
                <WorkspaceMainPanels
                  tabs={workspaceTabs.tabs}
                  activeId={workspaceTabs.activeId}
                  savingTabIds={savingTabIds}
                  tabsEnabled={workspaceTabsEnabled}
                  isChatRoute={isChatRoute}
                  isSettingsRoute={isSettingsRoute}
                  isMobileLayout={isMobile}
                  onActivateTab={(id) => activateWorkspaceTab(id)}
                  onCloseTab={(id) => {
                    closeWorkspaceTabById(id);
                  }}
                  onReorderTabs={reorderWorkspaceTabs}
                  onFileTabContextMenu={(tab, point) => {
                    fileTabContextMenuRef.current?.open?.({
                      storageType: tab.storageType,
                      path: tab.path,
                      name: tab.editedFileName || tab.currentFile?.name,
                      currentFile: tab.currentFile,
                      clientX: point.clientX,
                      clientY: point.clientY,
                      onCloseTab: () => closeWorkspaceTabById(tab.id),
                    });
                  }}
                  mirrors={{
                    currentFile,
                    editorContent,
                    editedFileName,
                    setEditedFileName,
                    onChangeEditor: handleEditorChange,
                    onInactiveEditorChange: (tabId, value) => {
                      const next = patchFileTab(workspaceTabsRef.current, tabId, {
                        editorContent: value,
                      });
                      workspaceTabsRef.current = next;
                      setWorkspaceTabs(next);
                    },
                    onInactiveEditedFileName: (tabId, name) => {
                      const next = patchFileTab(workspaceTabsRef.current, tabId, {
                        editedFileName: name,
                      });
                      workspaceTabsRef.current = next;
                      setWorkspaceTabs(next);
                    },
                  }}
                  settingsPaneProps={{
                    s3Creds,
                    masterPassword,
                    onSaveS3Creds: handleSaveS3Creds,
                    storageMode,
                    onStorageModeChange: setStorageMode,
                    localFolderName:
                      localRootHandle?.name || pendingLocalFolderName || loadLastLocalFolderName(),
                    onOpenLocalFolder: openLocalFolder,
                    webdavConfig,
                    onSaveWebdavConfig: async (next) => {
                      setWebdavConfig(next);
                      await saveWebdavConfig(next, masterPassword || undefined);
                      if (storageMode === STORAGE_MODE_WEBDAV) {
                        await refreshWebdavTree();
                      }
                      showAlert({
                        title: '연결 정보',
                        message: '연결 정보 업데이트가 완료되었습니다.',
                      });
                    },
                    onExportCreds: handleExportCreds,
                    onImportClick: () => fileInputRef.current?.click(),
                    showHiddenFolders,
                    onToggleHiddenFolders: () =>
                      setSettingsToggle('settings-show-hidden', !showHiddenFolders),
                    showTrashFolder,
                    onToggleTrashFolder: () =>
                      setSettingsToggle('settings-show-trash', !showTrashFolder),
                    hideRecordingCompanions,
                    treeStickyFolderPathEnabled,
                    showTreeModifiedDate,
                    treeHoverExpandSettings,
                    onTreeHoverExpandSettingsChange: setTreeHoverExpandSettings,
                    onToggleHideRecordingCompanions: () =>
                      setSettingsToggle('settings-hide-recording', !hideRecordingCompanions),
                    onToggleTreeStickyFolderPath: () =>
                      setSettingsToggle('settings-tree-sticky', !treeStickyFolderPathEnabled),
                    onToggleShowTreeModifiedDate: () =>
                      setSettingsToggle('settings-tree-modified-date', !showTreeModifiedDate),
                    onRequestClose: handleSettingsClose,
                    webauthnSupported: webauthnPRFSupported,
                    webauthnEnabled: isStoredWithWebAuthn() || !!getStoredWebAuthn()?.encryptedPassword,
                    webauthnStorageOnly: isStoredWithWebAuthn(),
                    onEnableWebAuthn: enableWebAuthnUnlock,
                    onDisableWebAuthn: disableWebAuthnUnlock,
                    snippetConfig,
                    onChangeSnippetConfig: handleChangeSnippetConfig,
                    onSaveSnippetConfig: handleSaveSnippetConfig,
                    isSavingSnippets,
                    snippetConfigLoaded:
                      snippetLoadedFromS3 || snippetLoadedFromLocal || snippetLoadedFromWebdav,
                    editorType,
                    onEditorTypeChange: handleEditorTypeChange,
                    isMobileLayout: isMobile,
                    sidebarOpen,
                    sidebarCollapsed,
                    onOpenSidebar: () => setSidebarOpen(true),
                    onCheckAppUpdate: handleCheckAppUpdate,
                    isCheckingAppUpdate,
                    latestAppBuildId: appBuildRemoteId,
                    onScanStorageUsage: scanActiveStorageUsageTree,
                    canScanStorageUsage,
                    onOpenStorageUsageFile: handleOpenStorageUsageFile,
                    onReadUnusedImageText: handleReadUnusedImageText,
                    onReadUnusedImageBytes: handleReadUnusedImageBytes,
                    onDeleteUnusedImagePaths: handleDeleteUnusedImagePaths,
                  }}
                  editorPaneProps={({
                    currentFile: paneFile,
                    editorContent: paneContent,
                    editedFileName: paneEditedName,
                    setEditedFileName: paneSetEditedName,
                    onChangeEditor,
                    isActiveFile,
                  }) => ({
                    currentFile: paneFile,
                    editorType,
                    editorContent: paneContent,
                    onChangeEditor,
                    onSave: saveFile,
                    isSaving,
                    onRefreshFromDisk:
                      paneFile?.type === 'local' ? refreshLocalFileFromDisk : undefined,
                    isRefreshingFromDisk,
                    onPullFromRemote:
                      (paneFile?.type === 's3' || paneFile?.type === 'webdav') &&
                      !isEncMdPath(paneFile?.id) &&
                      !isEncMdPath(paneFile?.name)
                        ? refreshRemoteFile
                        : undefined,
                    isPullingFromRemote,
                    editedFileName: paneEditedName,
                    setEditedFileName: paneSetEditedName,
                    onRenameFullName: renameCurrentFileFullName,
                    onRequestSuffixChangeConfirmForBlur: () => {
                      setSuffixConfirmAction('renameOnly');
                      setShowSuffixChangeConfirmModal(true);
                    },
                    onRequestClose: handleRequestCloseEditor,
                    onRequestMove: handleRequestMove,
                    onViewUnsupportedAsText: handleViewUnsupportedAsText,
                    onRequestDownload: handleRequestDownload,
                    onShareToChatWithMyself:
                      paneFile && paneFile.type !== SESSION_STORAGE_TYPE
                        ? handleShareNoteToChatWithMyself
                        : undefined,
                    theme,
                    previewOnly: false,
                    isMobileLayout: isMobile,
                    sidebarOpen,
                    sidebarCollapsed,
                    onOpenSidebar: () => {
                      if (isMobile) setSidebarOpen(true);
                      else setSidebarCollapsed(false);
                    },
                    onRequestCreateFile: requestNewFile,
                    onOpenChatWithMyself: () => {
                      if (workspaceTabsEnabledRef.current) openChatWorkspaceTab();
                      else navigate('/chat');
                    },
                    onSaveSessionToNote: handleRequestSaveSessionToNote,
                    onRequestSessionTransformDownload: handleRequestSessionTransformDownload,
                    onOpenSessionFiles: handleOpenSessionFiles,
                    onOpenSessionDirectory:
                      typeof window !== 'undefined' && 'showDirectoryPicker' in window
                        ? handleOpenSessionDirectory
                        : undefined,
                    onDropSessionTransfer: handleDropSessionTransfer,
                    isOpeningSession,
                    hideRecordingCompanions,
                    isRecording: isActiveFile ? isRecording : false,
                    audioLevel: isActiveFile ? audioLevel : 0,
                    onToggleRecording:
                      !isActiveFile || paneFile?.type === SESSION_STORAGE_TYPE
                        ? undefined
                        : handleToggleRecording,
                    recordingPipelineStatus,
                    recordingsList: isActiveFile ? recordingsList : [],
                    selectedRecordingKey: isActiveFile ? selectedRecordingKey : '',
                    onSelectRecording: setSelectedRecordingKey,
                    recordingAudioUrl: isActiveFile ? recordingAudioUrl : '',
                    recordingSyncData: isActiveFile ? recordingSyncData : null,
                    onUploadImage: handleUploadEditorImage,
                    isUploadingEditorImage,
                    uploadImagePercent: editorImageUploadPercent,
                    onCancelUploadImage: cancelEditorImageUpload,
                    onResolveWikiImageUrl: getPresignedUrlForPath,
                    onOpenViewPath: handleOpenNoteFromChat,
                    snippetConfig,
                    llmProviderProfiles,
                    getImgbbApiKey,
                    onRequestDelete: () =>
                      setDeleteTarget(
                        paneFile
                          ? {
                              node: {
                                path: paneFile?.id,
                                name: paneFile?.name,
                                type: 'file',
                                handle: paneFile?.handle,
                                parentHandle: paneFile?.parentHandle,
                              },
                              type: paneFile?.type,
                            }
                          : null,
                      ),
                  })}
                  chatPaneProps={{
                    storageMode,
                    getS3Client,
                    s3Bucket: s3Creds.bucket,
                    localRootHandle,
                    webdavConfig,
                    theme,
                    isMobileLayout: isMobile,
                    sidebarOpen,
                    onOpenSidebar: () => setSidebarOpen(true),
                    s3Tree,
                    localTree,
                    webdavTree,
                    shareGroupSend,
                    onShareGroupSendConsumed: handleShareGroupSendConsumed,
                    onOpenNote: handleOpenNoteFromChat,
                    selectPathAfterCreateFolder: addToNoteSelectPath,
                    onSelectPathAfterCreateFolderApplied: () => setAddToNoteSelectPath(null),
                    onRequestCreateFolderForNote: (parentPath, parentDirHandle) => {
                      setCreateModalContext({
                        storageType:
                          storageMode === 'local' || storageMode === 'webdav' || storageMode === 's3'
                            ? storageMode
                            : 's3',
                        parentPath,
                        parentDirHandle,
                        type: 'folder',
                        fromAddToNoteModal: true,
                      });
                      setCreateModalOpen(true);
                    },
                    onRequestMoveFolder: handleRequestMoveFolder,
                    onCreateNoteFromMessage: handleCreateNoteFromChatMessage,
                    getPresignedUrlForPath: getChatImageUrlForPath,
                    onDropOnFolder: handleDropOnFolder,
                    dropTarget,
                    onLoadLocalFolderChildren: loadLocalFolderChildren,
                    localFolderLoadingPath,
                    onAttachDropHostChange: setChatAttachDropHost,
                    onRegisterTreeAttachDrop: handleRegisterChatAttachDrop,
                  }}
                />
              }
            />
          </Routes>
          </div>
        </div>

        {/* Status Bar — z above editor chrome (z-10100) so novel/md layers do not cover it on mobile */}
        <div
          data-app-status-bar=""
          className="relative z-10200 flex h-6 shrink-0 items-center justify-between gap-2 border-t border-gray-200 bg-white/90 px-2 pb-[max(0px,env(safe-area-inset-bottom))] text-[10px] dark:border-odp-borderSoft dark:bg-odp-bgSoft/95 md:h-7 md:gap-3 md:px-3 md:text-[11px]"
        >
          <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1 overflow-hidden">
            <ActivityIndicatorBar />
            {!hideRecordingCompanions &&
              (recordingQueueStats.pending > 0 ||
                recordingQueueStats.uploading > 0 ||
                recordingQueueStats.failed > 0) && (
              <span
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-gray-100 dark:bg-odp-bgSofter text-gray-700 dark:text-odp-fgStrong text-[10px] md:text-[11px] shrink-0"
                title={`녹음 업로드 큐 - 대기 ${recordingQueueStats.pending}, 업로드중 ${recordingQueueStats.uploading}, 실패 ${recordingQueueStats.failed}`}
              >
                <span className="truncate max-w-40 md:max-w-55">
                  녹음 업로드:{" "}
                  {recordingQueueStats.uploading > 0 || recordingPipelineStatus === '업로드 중'
                    ? "업로드 중"
                    : recordingQueueStats.pending > 0
                      ? `대기 ${recordingQueueStats.pending}`
                      : "재시도 대기"}
                </span>
                <span className="text-gray-500 dark:text-odp-muted shrink-0">
                  실패 {recordingQueueStats.failed}
                </span>
              </span>
            )}
            {!chatSurfaceActive ? (
              <>
                <span className="truncate shrink-0 max-w-12 md:max-w-none" title={
                  currentFile?.type === 's3'
                    ? `S3 (${s3Creds.bucket || '-'})`
                    : currentFile?.type === 'local'
                      ? '로컬'
                    : currentFile?.type === 'webdav'
                      ? 'WebDAV'
                      : currentFile?.type === SESSION_STORAGE_TYPE
                        ? '다운로드 세션'
                        : '없음'
                }>
                  <span className="md:hidden">
                    {currentFile?.type === 's3'
                      ? 'S3'
                      : currentFile?.type === 'local'
                        ? '로컬'
                        : currentFile?.type === 'webdav'
                          ? 'WebDAV'
                          : currentFile?.type === SESSION_STORAGE_TYPE
                            ? '세션'
                            : '없음'}
                  </span>
                  <span className="hidden md:inline">
                    저장소:{' '}
                    {currentFile?.type === 's3'
                      ? `S3 (${s3Creds.bucket || '-'})`
                      : currentFile?.type === 'local'
                        ? '로컬'
                        : currentFile?.type === 'webdav'
                          ? 'WebDAV'
                          : currentFile?.type === SESSION_STORAGE_TYPE
                            ? '다운로드 세션'
                            : '없음'}
                  </span>
                </span>
                {currentFile && (
                  <>
                    <span className="truncate min-w-0" title={currentFile.type === 's3' ? currentFile.id : currentFile.id || currentFile.name}>
                      {currentFile.type === 's3' ? currentFile.id : currentFile.id || currentFile.name}
                    </span>
                    <span className="hidden md:inline truncate text-gray-500 dark:text-odp-muted shrink-0">
                      크기: {currentFile.size != null ? formatFileSize(currentFile.size) : '알 수 없음'}
                    </span>
                  </>
                )}
                {operationStatus && (
                  <span className="truncate text-gray-500 dark:text-odp-muted hidden md:inline">
                    상태: {operationStatus}
                  </span>
                )}
              </>
            ) : (
              <span className="truncate text-gray-500 dark:text-odp-muted shrink-0">
                나와의 채팅
                {storageMode === 's3'
                  ? ` · S3${s3Creds.bucket ? ` (${s3Creds.bucket})` : ''}`
                  : storageMode === 'local'
                    ? ' · 로컬'
                    : storageMode === 'webdav'
                      ? ' · WebDAV'
                      : ''}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            {location.pathname === '/chat' || location.pathname.endsWith('/chat') ? (
              <span
                className="flex items-center gap-1 md:gap-1.5"
                title={
                  storageMode === 's3'
                    ? '채팅 메시지는 S3에 저장·동기화됩니다'
                    : storageMode === 'local'
                      ? '채팅 메시지는 로컬 폴더에 저장됩니다'
                      : storageMode === 'webdav'
                        ? '채팅 메시지는 WebDAV에 저장·동기화됩니다'
                        : '저장소 미연결'
                }
              >
                <span
                  className={`h-2 w-2 shrink-0 rounded-full md:h-2.5 md:w-2.5 ${
                    (storageMode === 's3' && s3Creds.bucket) ||
                    (storageMode === 'local' && localRootHandle) ||
                    (storageMode === 'webdav' && webdavReady)
                      ? 'bg-emerald-500'
                      : 'bg-amber-400'
                  }`}
                  aria-hidden="true"
                />
                <span className="md:hidden">
                  {(storageMode === 's3' && s3Creds.bucket) ||
                  (storageMode === 'local' && localRootHandle) ||
                  (storageMode === 'webdav' && webdavReady)
                    ? '동기화'
                    : '대기'}
                </span>
                <span className="hidden md:inline">
                  채팅 동기화:{' '}
                  {(storageMode === 's3' && s3Creds.bucket) ||
                  (storageMode === 'local' && localRootHandle) ||
                  (storageMode === 'webdav' && webdavReady)
                    ? storageMode === 's3'
                      ? 'S3 연결됨'
                      : storageMode === 'webdav'
                        ? 'WebDAV 연결됨'
                        : '로컬 준비됨'
                    : '연결 필요'}
                </span>
              </span>
            ) : (
              <>
                <span className="flex items-center gap-1 md:gap-1.5" title={isEditableStorage ? (lastAutoSaveAt ? `저장 ${formatTime(lastAutoSaveAt)}` : '대기 중') : '대상 아님'}>
                  <span
                    className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full shrink-0 ${autoSaveIndicatorClass}`}
                    aria-hidden="true"
                  />
                  <span className="md:hidden">
                    {isEditableStorage
                      ? lastAutoSaveAt
                        ? formatTime(lastAutoSaveAt)
                        : '대기'
                      : '-'}
                  </span>
                  <span className="hidden md:inline">
                    자동저장:{' '}
                    {isEditableStorage
                      ? lastAutoSaveAt
                        ? `마지막 ${formatTime(lastAutoSaveAt)}`
                        : '대기 중 (입력 후 5초)'
                      : '대상 아님'}
                  </span>
                </span>
                <span
                  className="hidden md:inline"
                  title={
                    currentFile?.type === 's3' || currentFile?.type === 'webdav'
                      ? lastAutoSyncAt
                        ? `동기화 ${formatTime(lastAutoSyncAt)}`
                        : '대기 중'
                      : '대상 아님'
                  }
                >
                  자동동기화:{' '}
                  {currentFile?.type === 's3' || currentFile?.type === 'webdav'
                    ? lastAutoSyncAt
                      ? `마지막 ${formatTime(lastAutoSyncAt)}`
                      : '대기 중 (입력 후 30초)'
                    : '대상 아님'}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Set Password Modal */}
      <SaveMethodModal
        isOpen={showSaveMethodModal}
        onClose={() => {
          setShowSaveMethodModal(false);
          setSaveMethodModalCreds(null);
        }}
        creds={saveMethodModalCreds}
        webauthnSupported={webauthnPRFSupported}
        onSaveWithWebAuthn={handleSaveWithWebAuthn}
        onSaveWithPassword={handleSaveWithPasswordFromModal}
      />

      <SetPasswordModal
        isOpen={showSetPasswordModal}
        masterPassword={masterPassword}
        onCancel={() => setShowSetPasswordModal(false)}
        onSubmit={(password) => requestSaveEncryptedSettings(s3Creds, password, { stayOnSettings: true })}
      />

      <ConfirmModal
        isOpen={showCoverChangeConfirmModal}
        title="표지 수정 감지"
        message={
          '표지(note-cover) 부분이 변경되었습니다.\n의도치 않은 수정이라면 표지 부분만 되돌린 뒤 다시 저장할 수 있습니다.'
        }
        confirmLabel="그대로 저장"
        cancelLabel="취소"
        discardLabel="표지 부분 편집 되돌리기"
        onConfirm={() => {
          const pending = pendingCoverSaveRef.current;
          pendingCoverSaveRef.current = null;
          setShowCoverChangeConfirmModal(false);
          void saveFile(pending?.fileOverride ?? null, {
            ...(pending?.options ?? {}),
            skipCoverChangeCheck: true,
          });
        }}
        onCancel={() => {
          pendingCoverSaveRef.current = null;
          setShowCoverChangeConfirmModal(false);
        }}
        onDiscard={() => {
          const file = currentFileRef.current;
          if (!file) {
            pendingCoverSaveRef.current = null;
            setShowCoverChangeConfirmModal(false);
            return;
          }
          const next = revertNoteCoverComment(
            String(editorContentRef.current ?? ''),
            String(file.content ?? ''),
          );
          editorContentRef.current = next;
          setEditorContent(next);
          pendingCoverSaveRef.current = null;
          setShowCoverChangeConfirmModal(false);
        }}
      />

      <ConfirmModal
        isOpen={showRestoreLocalFolderModal}
        title="로컬 폴더 다시 열기"
        message={`이전에 열었던 로컬 폴더 "${pendingLocalFolderName}"을(를) 다시 열까요?`}
        confirmLabel="다시 열기"
        cancelLabel="나중에"
        onConfirm={() => {
          void handleConfirmRestoreLocalFolder();
        }}
        onCancel={() => {
          setShowRestoreLocalFolderModal(false);
          setLocalFolderRestoreSettled(true);
        }}
      />

      <ConfirmModal
        isOpen={showAppUpdateConfirmModal}
        title="앱 업데이트"
        message={(() => {
          const localLabel = appBuildLocalId || '알 수 없음';
          const remoteLabel = appBuildRemoteId;
          if (appUpdateCheckError && !appUpdateAvailable) {
            return [
              '최신 버전을 확인할 수 없습니다.',
              `현재 버전: ${localLabel}`,
              `사유: ${appUpdateCheckError}`,
              '',
              '그래도 앱을 다시 로드해 최신 상태를 적용할 수 있습니다.',
            ].join('\n');
          }
          if (appUpdateAvailable) {
            return [
              '새 버전이 준비되었습니다. 저장 중인 작업을 확인한 뒤 최신 버전으로 업데이트하세요.',
              `현재 버전: ${localLabel}`,
              remoteLabel ? `최신 버전: ${remoteLabel}` : null,
            ].filter(Boolean).join('\n');
          }
          return [
            '현재 최신 버전입니다.',
            `현재 버전: ${localLabel}`,
            remoteLabel ? `확인된 버전: ${remoteLabel}` : null,
            '',
            '그래도 앱을 다시 로드할 수 있습니다.',
          ].filter(Boolean).join('\n');
        })()}
        confirmLabel={
          isApplyingPwaUpdate
            ? '업데이트 중...'
            : appUpdateAvailable
              ? '최신 버전으로 업데이트'
              : '다시 로드'
        }
        cancelLabel="취소"
        onConfirm={() => {
          if (isApplyingPwaUpdate) return;
          void handleConfirmAppUpdate();
        }}
        onCancel={() => {
          if (isApplyingPwaUpdate) return;
          setShowAppUpdateConfirmModal(false);
        }}
      />

      <ConfirmModal
        isOpen={showOverwriteCredsConfirmModal}
        title="기존 연결 정보 대체"
        message="기존에 저장된 연결 정보가 있습니다. 새로 저장하면 기존 정보가 대체됩니다. 계속하시겠습니까?"
        confirmLabel="계속"
        cancelLabel="취소"
        onConfirm={handleOverwriteCredsConfirm}
        onCancel={() => {
          setShowOverwriteCredsConfirmModal(false);
          setPendingWebAuthnSave(null);
          setPendingPasswordSave(null);
        }}
      />

      <TreeNameConflictModal
        isOpen={Boolean(treeNameConflict)}
        name={treeNameConflict?.name || ''}
        renameAs={treeNameConflict?.renameAs || ''}
        kind={treeNameConflict?.kind || 'file'}
        action={treeNameConflict?.action || 'move'}
        existingText={treeNameConflict?.existingText}
        incomingText={treeNameConflict?.incomingText}
        existingLabel={treeNameConflict?.existingLabel}
        incomingLabel={treeNameConflict?.incomingLabel}
        binary={Boolean(treeNameConflict?.binary)}
        truncated={Boolean(treeNameConflict?.truncated)}
        theme={theme === 'dark' ? 'dark' : 'light'}
        onResolve={settleTreeNameConflict}
      />

      <ConfirmModal
        isOpen={showUnsavedConfirmModal}
        title="설정을 나가시겠습니까?"
        message="저장하지 않으면 입력한 정보가 사라질 수 있습니다."
        confirmLabel="나가기"
        cancelLabel="취소"
        onConfirm={handleUnsavedConfirmLeave}
        onCancel={() => setShowUnsavedConfirmModal(false)}
      />

      <ConfirmModal
        isOpen={showSuffixChangeConfirmModal}
        title="확장자 변경"
        message="확장자가 변경되었습니다. 저장 시 새 파일명으로 저장됩니다. 계속하시겠습니까?"
        confirmLabel="계속"
        cancelLabel="취소"
        onConfirm={handleSuffixChangeConfirm}
        onCancel={handleSuffixChangeCancel}
      />

      <ConfirmModal
        isOpen={showCloseFileConfirmModal}
        title="파일 닫기"
        message={(() => {
          const tab =
            (pendingCloseTabId &&
              workspaceTabs.tabs.find((t) => t.id === pendingCloseTabId)) ||
            getActiveFileTab(workspaceTabs);
          const name = isFileTab(tab)
            ? tab.editedFileName || tab.path
            : '';
          return name
            ? `「${name}」에 저장하지 않은 변경사항이 있습니다. 저장 후 닫으시겠습니까?`
            : '저장하지 않은 변경사항이 있습니다. 저장 후 닫으시겠습니까?';
        })()}
        confirmLabel="저장 후 닫기"
        cancelLabel="취소"
        discardLabel="저장 안 하고 닫기"
        onConfirm={handleCloseFileConfirmSave}
        onCancel={() => {
          setShowCloseFileConfirmModal(false);
          setPendingCloseTabId(null);
        }}
        onDiscard={handleCloseFileConfirmDiscard}
      />

      <ConfirmModal
        isOpen={navGuard.isBlocked}
        title="저장하지 않은 변경사항"
        message="저장하지 않은 변경사항이 있습니다. 이동하면 변경사항이 사라집니다."
        confirmLabel="저장 후 이동"
        cancelLabel="취소"
        discardLabel="저장 안 하고 이동"
        onConfirm={handleNavGuardConfirmSave}
        onCancel={navGuard.reset}
        onDiscard={handleNavGuardConfirmDiscard}
      />

      <ExportPasswordModal
        isOpen={showExportPasswordModal}
        onConfirm={handleExportConfirm}
        onCancel={() => setShowExportPasswordModal(false)}
      />

      <ImportPasswordModal
        isOpen={showImportPasswordModal}
        onConfirm={handleImportConfirm}
        onCancel={() => {
          setShowImportPasswordModal(false);
          setImportFileContent(null);
        }}
      />

      <DownloadMethodModal
        isOpen={showDownloadMethodModal}
        title={
          downloadModalMode === 'session-transform'
            ? '변형 다운로드'
            : downloadModalMode === 'session-save'
              ? '저장 방식 선택'
              : '다운로드 방식 선택'
        }
        fileName={currentFile?.name || currentFile?.id?.split('/').filter(Boolean).pop()}
        markdownText={editorContent}
        showImageHandling={isMarkdownFileName(
          currentFile?.name || currentFile?.id?.split('/').filter(Boolean).pop(),
        )}
        showDeliveryMethods={downloadModalMode !== 'session-transform'}
        confirmLabel="다운로드"
        onSelectLegacy={handleDownloadCurrentFile}
        onSelectStorageApi={handleDownloadToFolder}
        onSelectHaim={
          currentFile?.type === SESSION_STORAGE_TYPE && downloadModalMode !== 'session-transform'
            ? handleSelectHaimFromDownload
            : undefined
        }
        onSelectClipboard={handleCopyCurrentFileToClipboard}
        onCancel={() => {
          setShowDownloadMethodModal(false);
          setDownloadModalMode('default');
        }}
        isDownloading={downloadProgress > 0 && downloadProgress < 100 && !downloadComplete}
        downloadProgress={downloadProgress}
        downloadComplete={downloadComplete}
        onCloseComplete={() => {
          setShowDownloadMethodModal(false);
          setDownloadProgress(0);
          setDownloadComplete(false);
          setDownloadModalMode('default');
        }}
      />

      <SaveSessionToNoteModal
        isOpen={showSaveSessionToNoteModal}
        storageType={storageMode}
        s3Tree={s3Tree}
        localTree={localTree}
        webdavTree={webdavTree}
        localRootHandle={localRootHandle}
        defaultFileName={currentFile?.name || 'untitled.md'}
        isSaving={isSavingSessionToNote}
        onClose={() => setShowSaveSessionToNoteModal(false)}
        onConfirm={handleConfirmSaveSessionToNote}
        onRequestCreateFolder={(parentPath, parentDirHandle) => {
          setCreateModalContext({
            storageType: storageMode,
            parentPath,
            parentDirHandle,
            type: 'folder',
            fromSaveSessionModal: true,
          });
          setCreateModalOpen(true);
        }}
        selectPathAfterCreate={saveSessionToNoteSelectPath}
        onSelectPathAfterCreateApplied={() => setSaveSessionToNoteSelectPath(null)}
      />

      <Modal
        isOpen={downloadResultModal.isOpen}
        onClose={closeDownloadResultModal}
        onConfirm={closeDownloadResultModal}
      >
        <div className="p-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-odp-fgStrong mb-2">
            {downloadResultModal.title || '다운로드 완료'}
          </h2>
          <p className="text-sm whitespace-pre-line text-gray-600 dark:text-gray-400 mb-4">
            {downloadResultModal.message}
          </p>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeDownloadResultModal}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 rounded transition"
            >
              확인
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <DeleteConfirmModal
        target={deleteTarget}
        associatedRecordings={associatedRecordings}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        isProcessing={isDeleting}
      />

      <EmptyTrashConfirmModal
        isOpen={Boolean(emptyTrashTarget)}
        storageType={emptyTrashTarget?.storageType}
        isProcessing={isEmptyingTrash}
        onCancel={() => {
          if (isEmptyingTrash) return;
          setEmptyTrashTarget(null);
        }}
        onConfirm={confirmEmptyTrash}
      />

      {/* Move File Modal (editor current file or sidebar-selected file) */}
      <MoveFileModal
        isOpen={isMoveModalOpen}
        storageType={moveFileTarget ? moveFileTarget.storageType : currentFile?.type}
        s3Tree={s3Tree}
        localTree={localTree}
        webdavTree={webdavTree}
        localRootHandle={localRootHandle}
        currentFile={moveFileTarget ? null : currentFile}
        fileToMove={moveFileTarget?.node}
        onClose={() => {
          setIsMoveModalOpen(false);
          setMoveModalSelectPath(null);
          setMoveFileTarget(null);
        }}
        onConfirm={moveFileTarget ? handleConfirmMoveFileFromSidebar : handleConfirmMove}
        onRequestCreateFolder={
          (moveFileTarget || currentFile)
            ? (parentPath, parentDirHandle) => {
                const st = moveFileTarget ? moveFileTarget.storageType : currentFile.type;
                setCreateModalContext({
                  storageType: st,
                  parentPath,
                  parentDirHandle,
                  type: 'folder',
                  fromMoveModal: true,
                });
                setCreateModalOpen(true);
              }
            : undefined
        }
        selectPathAfterCreate={moveModalSelectPath}
        onSelectPathAfterCreateApplied={() => setMoveModalSelectPath(null)}
      />

      {/* Move Folder Modal */}
      <MoveFolderModal
        isOpen={!!moveFolderTarget}
        storageType={moveFolderTarget?.storageType}
        s3Tree={s3Tree}
        localTree={localTree}
        webdavTree={webdavTree}
        localRootHandle={localRootHandle}
        folderNode={moveFolderTarget?.node}
        onClose={() => setMoveFolderTarget(null)}
        onConfirm={handleConfirmMoveFolder}
      />

      {/* Create File/Folder Modal */}
      <CreateItemModal
        isOpen={createModalOpen}
        type={createModalContext?.type}
        storageType={createModalContext?.storageType}
        parentPath={createModalContext?.parentPath || ''}
        tree={createModalTree}
        ensureFolderLoaded={ensureCreateModalFolderLoaded}
        parentLabel={
          createModalContext
            ? createModalContext.storageType === 's3'
              ? createModalContext.parentPath
                ? `S3: ${createModalContext.parentPath}`
                : 'S3 루트'
              : createModalContext.storageType === 'webdav'
                ? createModalContext.parentPath
                  ? `WebDAV: ${createModalContext.parentPath}`
                  : 'WebDAV 루트'
                : createModalContext.parentPath
                  ? `로컬: ${createModalContext.parentPath}`
                  : '로컬 루트'
            : ''
        }
        onClose={() => {
          if (!isCreateSubmitting) {
            setCreateModalOpen(false);
            setCreateModalContext(null);
          }
        }}
        onSubmit={handleCreateItemSubmit}
        isSubmitting={isCreateSubmitting}
      />

      <PromptModal
        isOpen={Boolean(encMdPrompt)}
        title={encMdPrompt?.title || '비밀번호'}
        message={encMdPrompt?.message || ''}
        placeholder="비밀번호"
        confirmLabel={encMdPrompt?.confirmLabel || '확인'}
        cancelLabel="취소"
        inputType="password"
        error={encMdPrompt?.error || ''}
        onCancel={() => {
          encMdPrompt?.reject?.();
        }}
        onConfirm={(password) => {
          encMdPrompt?.resolve?.(password);
        }}
      />

    </div>
  );
}

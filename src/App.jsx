import { useState, useEffect, useCallback, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router';
import { IconFile, IconX } from '@/components/icons';
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
import { pruneNestedMovePaths } from '@/utils/treeMove';
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
import EditorPane from '@/components/EditorPane';
import ChatWithMyselfPane from '@/components/chatWithMyself/ChatWithMyselfPane';
import {
  detectTimeZone,
  formatChatMessageAsNoteMarkdown,
} from '@/utils/chatWithMyself';
import { AuthModal } from '@/components/modals/AuthModal';
import { SetPasswordModal } from '@/components/modals/SetPasswordModal';
import { SaveMethodModal } from '@/components/modals/SaveMethodModal';
import { ExportPasswordModal } from '@/components/modals/ExportPasswordModal';
import { ImportPasswordModal } from '@/components/modals/ImportPasswordModal';
import { DeleteConfirmModal } from '@/components/modals/DeleteConfirmModal';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import Modal from '@/components/modals/Modal';
import { MoveFileModal } from '@/components/modals/MoveFileModal';
import { MoveFolderModal } from '@/components/modals/MoveFolderModal';
import { CreateItemModal } from '@/components/modals/CreateItemModal';
import { DownloadMethodModal } from '@/components/modals/DownloadMethodModal';
import SettingsPage from '@/pages/SettingsPage';
import ExportPDFPage from '@/pages/ExportPDFPage';
import LlmAssistPopoutPage from '@/pages/LlmAssistPopoutPage';
import { useRecording } from '@/hooks/useRecording';
import { getSyncKeyForRecording } from '@/utils/recordingPipeline';
import { decodeSyncData } from '@/utils/syncProto';
import { savePendingUpload, getPendingUploads } from '@/utils/pendingUploadsDb';
import { syncPendingUploads } from '@/utils/syncPendingUploads';
import { isFileProbablyImage, uploadEditorImage, buildEditorImagePathPrefix } from '@/utils/editorImageUpload';
import { uploadLocalEditorImage, getLocalWikiImageObjectUrl } from '@/utils/localEditorImage';
import { dbgClipboard, fileSummaries } from '@/utils/clipboardImageDebug';
import { drainRecordingUploadQueue } from '@/utils/recordingUploadQueue';
import { setPrintSettingsStore } from '@/utils/printSettingsStore';
import { getRecordingQueueStats } from '@/utils/recordingDb';
import { loadEditorType, saveEditorType } from '@/utils/editorTypeSettings';
import {
  DEFAULT_STORAGE_MODE,
  getAppNameByStorageMode,
  loadStorageMode,
  loadWebdavConfig,
  saveStorageMode,
  saveWebdavConfig,
  STORAGE_MODE_LOCAL,
} from '@/utils/storageSettings';
import { readLocalDirectoryLevel, readLocalDirectoryTree, patchLocalTreeChildren } from '@/utils/localTree';
import {
  hasStoredLocalRootHandle,
  loadLastLocalFolderName,
  saveLocalRootHandle,
  tryRestoreLocalRootHandle,
} from '@/utils/localFolderStore';
import { loadHideRecordingCompanions, saveHideRecordingCompanions } from '@/utils/recordingVisibilitySettings';
import {
  loadTreeStickyFolderPathEnabled,
  saveTreeStickyFolderPathEnabled,
} from '@/utils/treeStickySettings';
import { consumePendingPrintReturnState } from '@/utils/printNavigationState';
import {
  getDraftKey,
  saveMemoDraft,
  getMemoDraft,
  deleteMemoDraft,
} from '@/utils/memoDraftsDb';
import { buildZipBlob } from '@/utils/zipBuilder';
import { useActivityIndicator, ActivityTypes } from '@/contexts/ActivityIndicatorContext';
import { useAuth } from '@/contexts/AuthContext';
import ActivityIndicatorBar from '@/components/ActivityIndicatorBar';
import { clearGeminiApiKeySession } from '@/utils/geminiApiKeySession';
import { tryRestoreAuthSession } from '@/utils/authSession';
import { applyDocumentTheme } from '@/utils/documentTheme';
import { checkServiceWorkerUpdate } from '@/utils/pwaUpdate';
import { useRegisterSW } from 'virtual:pwa-register/react';

export default function App() {
  const location = useLocation();
  if (location.pathname === '/export-pdf') {
    return (
      <div className="export-pdf-layout min-h-screen print:min-h-0 max-w-screen bg-white dark:bg-odp-bgSofter print:bg-white print:dark:bg-white">
        <ExportPDFPage />
      </div>
    );
  }
  if (location.pathname === '/llm-assist-popout') {
    return (
      <div className="llm-assist-popout-layout min-h-screen max-w-screen bg-white dark:bg-odp-bgSofter">
        <LlmAssistPopoutPage />
      </div>
    );
  }
  return <MainApp />;
}

function MainApp() {
  const LAST_FILE_KEY = 's3haim_lastFile';
  const { addIndicator, removeIndicator, updateIndicator } = useActivityIndicator();
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

  const getGeminiApiKey = useCallback(
    () => (s3Creds?.googleAiStudioApiKey || '').trim(),
    [s3Creds?.googleAiStudioApiKey],
  );

  useEffect(() => {
    const onUnload = () => clearGeminiApiKeySession();
    window.addEventListener('beforeunload', onUnload);
    return () => window.removeEventListener('beforeunload', onUnload);
  }, []);

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
  const [localRootHandle, setLocalRootHandle] = useState(null);
  const [isLocalTreeLoading, setIsLocalTreeLoading] = useState(false);
  const [localFolderLoadingPath, setLocalFolderLoadingPath] = useState(null);
  const [showRestoreLocalFolderModal, setShowRestoreLocalFolderModal] = useState(false);
  const [pendingLocalFolderName, setPendingLocalFolderName] = useState('');
  
  // Editor State
  const [currentFile, setCurrentFile] = useState(null);
  const [editorContent, setEditorContent] = useState('');
  /** 저장 시점의 최신 문자열 (Novel 디바운스 onChange 직후에도 동기 반영) */
  const editorContentRef = useRef('');
  const [isSaving, setIsSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [lastInputAt, setLastInputAt] = useState(null);
  const [lastAutoSaveAt, setLastAutoSaveAt] = useState(null);
  const [lastAutoSyncAt, setLastAutoSyncAt] = useState(null);
  const [showHiddenFolders, setShowHiddenFolders] = useState(false);
  const [editorType, setEditorType] = useState(() => loadEditorType());
  const [storageMode, setStorageMode] = useState(() => loadStorageMode());
  const [webdavConfig, setWebdavConfig] = useState(() => loadWebdavConfig());

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
  const [addToNoteSelectPath, setAddToNoteSelectPath] = useState(null);
  const [isCreateSubmitting, setIsCreateSubmitting] = useState(false);
  const [showExportPasswordModal, setShowExportPasswordModal] = useState(false);
  const [showImportPasswordModal, setShowImportPasswordModal] = useState(false);
  const [importFileContent, setImportFileContent] = useState(null);
  const [showSaveMethodModal, setShowSaveMethodModal] = useState(false);
  const [saveMethodModalCreds, setSaveMethodModalCreds] = useState(null);
  const [showUnsavedConfirmModal, setShowUnsavedConfirmModal] = useState(false);
  const [editedFileName, setEditedFileName] = useState('');
  const [showSuffixChangeConfirmModal, setShowSuffixChangeConfirmModal] = useState(false);
  const [suffixConfirmAction, setSuffixConfirmAction] = useState('renameOnly'); // 'renameOnly' | 'renameAndSave'
  const [showCloseFileConfirmModal, setShowCloseFileConfirmModal] = useState(false);
  const [showOverwriteCredsConfirmModal, setShowOverwriteCredsConfirmModal] = useState(false);
  const [pendingWebAuthnSave, setPendingWebAuthnSave] = useState(null);
  const [pendingPasswordSave, setPendingPasswordSave] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);
  const expandPathsRef = useRef(null);
  const [showDownloadMethodModal, setShowDownloadMethodModal] = useState(false);
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
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  }, []);
  const downloadFolderAsZip = useCallback(async (storageType, node, folderName, indicatorId) => {
    const entries = [];

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
          path: `${folderName}/${relativeKey}`.replace(/\\/g, '/'),
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
              path: `${folderName}/${basePath}${entry.name}`.replace(/\\/g, '/'),
              data: new Uint8Array(await file.arrayBuffer()),
            });
          } else if (entry.kind === 'directory') {
            await collectLocalFiles(entry, `${basePath}${entry.name}/`);
          }
        }
      };
      await collectLocalFiles(sourceDirHandle);
      updateIndicator(indicatorId, { progress: 100 });
    }

    const zipBlob = await buildZipBlob(entries);
    triggerBlobDownload(zipBlob, `${folderName}.zip`);
  }, [localRootHandle, s3Creds, triggerBlobDownload, updateIndicator]);
  const [selectedIds, setSelectedIds] = useState(() => new Set());
  const lastSelectedIdRef = useRef(null);

  // Snippet settings (VSCode-style JSON, synced to .settings/snippets.json)
  const [snippetConfig, setSnippetConfig] = useState({ snippets: [] });
  const [snippetLoadedFromS3, setSnippetLoadedFromS3] = useState(false);
  const [snippetLoadedFromLocal, setSnippetLoadedFromLocal] = useState(false);
  const [isSavingSnippets, setIsSavingSnippets] = useState(false);

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
  const currentFileRef = useRef(null);
  const hasRestoredLastFileRef = useRef(false);
  const hasProcessedOpenFromUrlRef = useRef(false);
  const hasRestoredFromPrintRef = useRef(false);
  const hasPromptedLocalFolderRestoreRef = useRef(false);
  const saveFileRef = useRef(null);
  const prevEditorContentRef = useRef('');

  const saveLastOpenedFile = useCallback((value) => {
    try {
      const serialized = JSON.stringify(value);
      window.sessionStorage.setItem(LAST_FILE_KEY, serialized);
      // Backward compatibility for older tabs/windows.
      window.localStorage.setItem(LAST_FILE_KEY, serialized);
    } catch (_) {}
  }, []);

  const loadLastOpenedFile = useCallback(() => {
    try {
      const sessionValue = window.sessionStorage.getItem(LAST_FILE_KEY);
      if (sessionValue) return JSON.parse(sessionValue);
    } catch (_) {}
    try {
      const localValue = window.localStorage.getItem(LAST_FILE_KEY);
      if (localValue) return JSON.parse(localValue);
    } catch (_) {}
    return null;
  }, []);

  const clearLastOpenedFile = useCallback(() => {
    try {
      window.sessionStorage.removeItem(LAST_FILE_KEY);
    } catch (_) {}
    try {
      window.localStorage.removeItem(LAST_FILE_KEY);
    } catch (_) {}
  }, []);

  const handleEditorTypeChange = useCallback((next) => {
    saveEditorType(next);
    setEditorType(next);
  }, []);

  useEffect(() => {
    s3TreeRef.current = s3Tree;
  }, [s3Tree]);
  useEffect(() => {
    currentFileRef.current = currentFile;
  }, [currentFile]);

  useEffect(() => {
    const onChat =
      location.pathname === '/chat' || location.pathname.endsWith('/chat');
    if (onChat) {
      document.title = `${appName} - 나와의 채팅`;
      return;
    }
    if (currentFile) {
      const fileName = currentFile.name
        || (typeof currentFile.id === 'string' && currentFile.id.split('/').filter(Boolean).pop())
        || 'Untitled';
      document.title = `${appName} - ${fileName}`;
    } else {
      document.title = appName;
    }
  }, [appName, currentFile, location.pathname]);

  useEffect(() => {
    saveStorageMode(storageMode);
    setSelectedIds(new Set());
    setCurrentFile(null);
    setEditorContent('');
  }, [storageMode]);

  useEffect(() => {
    setEditedFileName(currentFile?.name ?? '');
  }, [currentFile?.id, currentFile?.name]);

  const getExt = (fileName) => {
    if (!fileName || typeof fileName !== 'string') return '';
    const lastDot = fileName.lastIndexOf('.');
    return lastDot > 0 ? fileName.slice(lastDot) : '';
  };

  const hasSuffixChange = () => {
    if (!currentFile?.name) return false;
    const trimmed = (editedFileName ?? '').trim();
    return trimmed !== currentFile.name && getExt(trimmed) !== getExt(currentFile.name);
  };

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const handler = () => setIsMobile(mql.matches);
    handler();
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!swRegistration) return undefined;
    const interval = setInterval(() => {
      swRegistration.update().catch((error) => {
        console.warn('PWA update check failed:', error);
      });
    }, 60 * 60 * 1000);
    return () => clearInterval(interval);
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
      const found = await checkServiceWorkerUpdate(swRegistration);
      setAppUpdateAvailable(Boolean(found || needRefresh || swRegistration?.waiting));
    } catch (error) {
      console.warn('App update check failed:', error);
      setAppUpdateAvailable(Boolean(needRefresh || swRegistration?.waiting));
    } finally {
      setIsCheckingAppUpdate(false);
      setShowAppUpdateConfirmModal(true);
    }
  }, [needRefresh, swRegistration]);

  const handleConfirmAppUpdate = useCallback(async () => {
    setShowAppUpdateConfirmModal(false);
    setHidePwaUpdateToast(true);
    try {
      setIsApplyingPwaUpdate(true);
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
  }, [appUpdateAvailable, needRefresh, swRegistration, updateServiceWorker]);

  useEffect(() => {
    try {
      window.localStorage.setItem('s3haim_sidebar_collapsed', sidebarCollapsed ? '1' : '0');
    } catch {
      // ignore
    }
  }, [sidebarCollapsed]);

  useEffect(() => {
    saveHideRecordingCompanions(hideRecordingCompanions);
  }, [hideRecordingCompanions]);

  useEffect(() => {
    saveTreeStickyFolderPathEnabled(treeStickyFolderPathEnabled);
  }, [treeStickyFolderPathEnabled]);

  useEffect(() => {
    applyDocumentTheme(theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  // 1. Init (marked & S3 client are from npm modules; no script loading)
  // Same-tab reload: restore unlock from sessionStorage before showing AuthModal.
  useEffect(() => {
    setScriptsLoaded(true);
    if (isUnlocked) return;

    let cancelled = false;
    (async () => {
      const session = await tryRestoreAuthSession();
      if (cancelled) return;
      if (session) {
        unlock(session.creds, session.password);
        return;
      }
      const stored = localStorage.getItem('s3NotesEncrypted');
      if (stored) {
        setShowAuthModal(true);
      } else {
        proceedWithoutStoredCreds();
        navigate('/settings');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isUnlocked, setShowAuthModal, unlock, proceedWithoutStoredCreds, navigate]);

  useEffect(() => {
    Promise.all([isWebAuthnPRFSupported(), browserSupportsWebAuthn()]).then(([prf, basic]) => {
      setWebauthnPRFSupported(prf);
      setWebauthnAvailable(prf || basic);
    });
  }, []);

  // 2. Auth Actions
  const handleUnlock = async (password) => {
    try {
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
      unlock(creds, password);
    } catch (e) {
      alert(e?.message || "비밀번호가 틀렸거나 데이터가 손상되었습니다.");
      console.error(e);
    }
  };

  const handleUnlockWithWebAuthn = async () => {
    if (isStoredWithWebAuthn()) {
      const creds = await loadCredsWithWebAuthn();
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
      if (!stayOnSettings) navigate('/');
    } catch (e) {
      alert("설정 저장 중 오류가 발생했습니다: " + e.message);
    }
  };

  const isCredsDirty = (formCreds, savedCreds) => {
    if (!formCreds || !savedCreds) return !!formCreds !== !!savedCreds;
    return JSON.stringify(formCreds) !== JSON.stringify(savedCreds);
  };

  const handleSaveS3Creds = (creds) => {
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
  };

  const handleSaveWithPasswordFromModal = () => {
    setShowSaveMethodModal(false);
    setSaveMethodModalCreds(null);
    setShowSetPasswordModal(true);
  };

  const hasStoredCreds = () =>
    typeof localStorage !== 'undefined' &&
    (!!localStorage.getItem('s3NotesEncrypted') || !!getStoredWebAuthn());

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
      } else if (pendingPasswordSave) {
        await saveEncryptedSettings(
          pendingPasswordSave.creds,
          pendingPasswordSave.password,
          pendingPasswordSave.options
        );
        setPendingPasswordSave(null);
      }
    } finally {
      setShowOverwriteCredsConfirmModal(false);
    }
  };

  const handleExportCreds = () => {
    if (!s3Creds?.bucket && !localStorage.getItem('s3NotesEncrypted')) return alert("내보낼 데이터가 없습니다.");
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
      if (webauthnPRFSupported) {
        await saveCredsWithWebAuthn(creds);
        setS3Creds(creds);
        setMasterPassword('');
        loadS3Files(creds);
        navigate('/');
        alert("복원되었습니다. 이 기기에서는 보안 키로 잠금 해제됩니다.");
      } else {
        await saveEncryptedSettings(creds, importPassword);
      }
    } catch (e) {
      alert("비밀번호가 틀렸거나 파일이 손상되었습니다.");
    }
  };

  const handleSettingsClose = (formCreds) => {
    if (!isUnlocked && localStorage.getItem('s3NotesEncrypted')) {
      alert("저장소 잠금 해제 후 닫을 수 있습니다.");
      return;
    }
    if (formCreds != null && isCredsDirty(formCreds, s3Creds)) {
      setShowUnsavedConfirmModal(true);
      return;
    }
    navigate('/');
  };

  const handleUnsavedConfirmLeave = () => {
    setShowUnsavedConfirmModal(false);
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
    const file = currentFileRef.current;
    if (!file) return false;
    const editable = ['markdown', 'json', 'raw', 'html', 'svg'].includes(file.viewer || 'markdown');
    return editable && file.content !== editorContentRef.current;
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!hasUnsavedEditorChanges()) return;
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedEditorChanges]);

  const closeCurrentFile = () => {
    setCurrentFile(null);
    clearLastOpenedFile();
    navigate('/');
  };

  const handleRequestCloseEditor = () => {
    if (hasUnsavedEditorChanges()) {
      setShowCloseFileConfirmModal(true);
    } else {
      closeCurrentFile();
    }
  };

  const handleCloseFileConfirmSave = async () => {
    setShowCloseFileConfirmModal(false);
    await saveFile(null, { skipSuffixCheck: true });
    closeCurrentFile();
  };

  const handleCloseFileConfirmDiscard = () => {
    setShowCloseFileConfirmModal(false);
    closeCurrentFile();
  };

  // 3. S3 Actions (using @aws-sdk/client-s3)
  const getS3Client = useCallback((creds = s3Creds) => createS3Client(creds), [s3Creds]);

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

  // IndexedDB에 저장된 녹음 업로드 재시도: 앱 시작/인터넷 복구 시
  useEffect(() => {
    if (!isUnlocked) return;
    const client = getS3Client();
    const bucket = s3Creds.bucket;
    if (!client || !bucket) return;

    const refreshStats = () => getRecordingQueueStats().then(setRecordingQueueStats).catch(() => {});

    const kick = () =>
      drainRecordingUploadQueue({ client, bucket }).then((r) => {
        refreshStats();
        if (r?.processed > 0) loadS3Files();
      }).catch(() => {
        refreshStats();
      });

    refreshStats();
    kick();
    const onOnline = () => kick();
    window.addEventListener('online', onOnline);
    const pollId = window.setInterval(refreshStats, 2000);
    
    // 페이지 언로드 전 최종 업로드 시도
    const beforeUnload = () => {
      try {
        drainRecordingUploadQueue({ client, bucket }).catch(() => {});
      } catch (_) {}
    };
    window.addEventListener('beforeunload', beforeUnload);
    
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('beforeunload', beforeUnload);
      window.clearInterval(pollId);
    };
  }, [isUnlocked, getS3Client, s3Creds.bucket, loadS3Files]);

  useEffect(() => {
    setPrintSettingsStore({ getS3Client, s3Creds, localRootHandle });
  }, [getS3Client, s3Creds, localRootHandle]);

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
    } catch (e) {
      // 없으면 무시
      setSnippetLoadedFromLocal(true);
    }
  }, [localRootHandle]);

  // Snippet 설정 자동 로딩: S3 우선, 없으면(또는 S3 미설정이면) 로컬에서 시도
  useEffect(() => {
    if (!snippetLoadedFromS3 && scriptsLoaded && isUnlocked && s3Creds.bucket) {
      loadSnippetConfigFromS3();
    }
  }, [snippetLoadedFromS3, scriptsLoaded, isUnlocked, s3Creds.bucket, loadSnippetConfigFromS3]);

  useEffect(() => {
    if (!snippetLoadedFromLocal && !s3Creds.bucket && localRootHandle) {
      loadSnippetConfigFromLocal();
    }
  }, [snippetLoadedFromLocal, s3Creds.bucket, localRootHandle, loadSnippetConfigFromLocal]);

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
      const client = getS3Client();
      if (!isLocalUpload && (!client || !s3Creds.bucket)) {
        dbgClipboard('app:upload:abort', { reason: 'no S3 client or bucket' });
        setOperationStatus('이미지 업로드는 S3 연결 후 사용할 수 있습니다.');
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
        (currentFile?.type === 's3' || currentFile?.type === 'local') && currentFile?.id
          ? buildEditorImagePathPrefix(currentFile.id)
          : '.images/note';
      const paths = [];
      const totalBytes = imageFiles.reduce((acc, file) => acc + (file.size || 0), 0);
      let uploadedBytes = 0;
      try {
        for (const file of imageFiles) {
          if (editorImageUploadCancelRequestedRef.current) break;
          const uploadController = new AbortController();
          editorImageUploadAbortControllerRef.current = uploadController;
          const path = isLocalUpload
            ? await uploadLocalEditorImage(localRootHandle, file, {
                imagePathPrefix,
                signal: uploadController.signal,
                onProgress: (percent) => {
                  const currentUploaded = (file.size || 0) * (Math.max(0, Math.min(100, percent)) / 100);
                  const overallPercent =
                    totalBytes > 0 ? ((uploadedBytes + currentUploaded) / totalBytes) * 100 : percent;
                  const normalized = Math.max(0, Math.min(100, Math.round(overallPercent)));
                  setEditorImageUploadPercent(normalized);
                  updateIndicator(indicatorId, {
                    progress: normalized,
                    detail: `${normalized}%`,
                  });
                },
              })
            : await uploadEditorImage(client, s3Creds.bucket, file, {
                imagePathPrefix,
                signal: uploadController.signal,
                onProgress: (percent) => {
                  const currentUploaded = (file.size || 0) * (Math.max(0, Math.min(100, percent)) / 100);
                  const overallPercent =
                    totalBytes > 0 ? ((uploadedBytes + currentUploaded) / totalBytes) * 100 : percent;
                  const normalized = Math.max(0, Math.min(100, Math.round(overallPercent)));
                  setEditorImageUploadPercent(normalized);
                  updateIndicator(indicatorId, {
                    progress: normalized,
                    detail: `${normalized}%`,
                  });
                },
              });
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
    [getS3Client, s3Creds, currentFile, localRootHandle, addIndicator, removeIndicator, updateIndicator]
  );

  /** Preview용 ![[path]] 이미지 URL 반환 (S3: Pre-signed, 로컬: blob URL) */
  const getPresignedUrlForPath = useCallback(
    async (path) => {
      if (currentFile?.type === 'local' && localRootHandle) {
        const url = await getLocalWikiImageObjectUrl(localRootHandle, path);
        if (url) {
          console.log('[wiki-image] getPresignedUrlForPath: local ok', { path, urlLength: url.length });
          return url;
        }
        console.warn('[wiki-image] getPresignedUrlForPath: local failed', { path });
        return null;
      }
      const client = getS3Client();
      if (!client || !s3Creds.bucket) {
        console.log('[wiki-image] getPresignedUrlForPath: no client or bucket', { path });
        return null;
      }
      try {
        const url = await getSignedGetUrl(client, s3Creds.bucket, path, 3600);
        console.log('[wiki-image] getPresignedUrlForPath: ok', { path, urlLength: url?.length });
        return url;
      } catch (err) {
        console.warn('[wiki-image] getPresignedUrlForPath: failed', { path, err });
        return null;
      }
    },
    [getS3Client, s3Creds, currentFile, localRootHandle]
  );

  /** Chat with Myself: resolve by storageMode (not current editor file). */
  const getChatImageUrlForPath = useCallback(
    async (path) => {
      if (storageMode === 'local' && localRootHandle) {
        return getLocalWikiImageObjectUrl(localRootHandle, path);
      }
      const client = getS3Client();
      if (!client || !s3Creds.bucket) return null;
      try {
        return await getSignedGetUrl(client, s3Creds.bucket, path, 3600);
      } catch {
        return null;
      }
    },
    [storageMode, localRootHandle, getS3Client, s3Creds.bucket],
  );

  useEffect(() => {
    if (!scriptsLoaded || !isUnlocked || !s3Creds.bucket) return;
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
  }, [scriptsLoaded, isUnlocked, s3Creds.bucket, loadS3Files, getS3Client, addIndicator, removeIndicator]);

  // 녹음 목록 및 선택된 녹음 URL/sync 로드 (hideRecordingCompanions는 사이드바 표시용이므로 목록 비우지 않음)
  useEffect(() => {
    if (!currentFile || currentFile.type !== 's3' || currentFile.viewer !== 'markdown') {
      setRecordingsList([]);
      setSelectedRecordingKey(null);
      setRecordingAudioUrl('');
      setRecordingSyncData([]);
      return;
    }
    const noteKey = currentFile.id;
    const list = getRecordingKeysFromTree(s3Tree, noteKey);
    setRecordingsList(list);
    setSelectedRecordingKey(list.length > 0 ? list[0].key : null);
  }, [currentFile?.id, currentFile?.type, currentFile?.viewer, s3Tree]);

  useEffect(() => {
    if (!selectedRecordingKey || !s3Creds.bucket) {
      setRecordingAudioUrl('');
      setRecordingSyncData([]);
      return;
    }
    const client = getS3Client();
    if (!client) return;

    let revoked = false;
    (async () => {
      try {
        const url = await getSignedGetUrl(client, s3Creds.bucket, selectedRecordingKey, 3600);
        if (!revoked) setRecordingAudioUrl(url);
      } catch {
        if (!revoked) setRecordingAudioUrl('');
      }
    })();

    const syncKey = getSyncKeyForRecording(selectedRecordingKey);
    if (syncKey) {
      (async () => {
        try {
          const { body } = await getObjectBody(client, s3Creds.bucket, syncKey);
          const data = decodeSyncData(body);
          if (!revoked && Array.isArray(data)) setRecordingSyncData(data);
        } catch {
          try {
            const jsonKey = syncKey.replace(/\.sync\.pb$/, '.sync.json');
            const { body } = await getObjectBody(client, s3Creds.bucket, jsonKey);
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
  }, [selectedRecordingKey, s3Creds.bucket, getS3Client]);

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

  // 4. Local Folder Load
  const attachLocalRootFolder = useCallback(async (dirHandle, { fullScan = false } = {}) => {
    setIsLocalTreeLoading(true);
    setLocalRootHandle(dirHandle);
    try {
      await saveLocalRootHandle(dirHandle);
      const tree = fullScan
        ? await readLocalDirectoryTree(dirHandle, '', dirHandle)
        : await readLocalDirectoryLevel(dirHandle, '', dirHandle);
      setLocalTree(tree);
    } finally {
      setIsLocalTreeLoading(false);
    }
  }, []);

  const loadLocalFolderChildren = useCallback(async (folderNode) => {
    if (!folderNode?.handle || folderNode.childrenLoaded === true) return;
    setLocalFolderLoadingPath(folderNode.path);
    try {
      const children = await readLocalDirectoryLevel(
        folderNode.handle,
        folderNode.path,
        folderNode.handle,
      );
      setLocalTree((prev) => patchLocalTreeChildren(prev, folderNode.path, children));
    } finally {
      setLocalFolderLoadingPath((current) => (current === folderNode.path ? null : current));
    }
  }, []);

  const openLocalFolder = async () => {
    try {
      const dirHandle = await window.showDirectoryPicker();
      setStorageMode(STORAGE_MODE_LOCAL);
      await attachLocalRootFolder(dirHandle);
    } catch (e) {
      console.error('Local folder selection cancelled or failed:', e);
    }
  };

  const refreshLocalTree = async () => {
    if (!localRootHandle) return;
    setIsLocalTreeLoading(true);
    try {
      const tree = await readLocalDirectoryTree(localRootHandle, '', localRootHandle);
      setLocalTree(tree);
    } finally {
      setIsLocalTreeLoading(false);
    }
  };

  const handleConfirmRestoreLocalFolder = async () => {
    setShowRestoreLocalFolderModal(false);
    try {
      const handle = await tryRestoreLocalRootHandle();
      if (!handle) {
        alert('폴더 접근 권한이 없습니다. 사이드바에서 폴더를 다시 선택해 주세요.');
        return;
      }
      setStorageMode(STORAGE_MODE_LOCAL);
      await attachLocalRootFolder(handle);
    } catch (e) {
      alert(`폴더를 다시 열지 못했습니다: ${e?.message || e}`);
    }
  };

  // 5. File Read & Save
  const selectFileRaw = async (type, node) => {
    if (node.type === 'folder') return;
    const ext = (node.name.split('.').pop() || '').toLowerCase();

    if (type === 's3') {
      const client = getS3Client();
      if (!client) return;

      const imageExts = ['png', 'jpg', 'jpeg', 'gif', 'webp'];

      if (imageExts.includes(ext)) {
        try {
          const { body, ContentLength } = await getObjectBody(client, s3Creds.bucket, node.path);
          const mime = `image/${ext === 'jpg' ? 'jpeg' : ext}`;
          const blob = new Blob([body], { type: mime });
          const url = URL.createObjectURL(blob);
          setCurrentFile((prev) => {
            if (prev && (prev.viewer === 'image' || prev.viewer === 'pdf' || prev.viewer === 'audio' || prev.viewer === 'video') && prev.objectUrl) {
              URL.revokeObjectURL(prev.objectUrl);
            }
            return {
              type: 's3',
              id: node.path,
              name: node.name,
              viewer: 'image',
              objectUrl: url,
              size: typeof ContentLength === 'number' ? ContentLength : null,
              lastModified: node.lastModified,
            };
          });
          setEditorContent('');
          navigate(`/view/${node.path}`);
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
          setCurrentFile((prev) => {
            if (prev && (prev.viewer === 'image' || prev.viewer === 'pdf' || prev.viewer === 'audio' || prev.viewer === 'video') && prev.objectUrl) {
              URL.revokeObjectURL(prev.objectUrl);
            }
            return {
              type: 's3',
              id: node.path,
              name: node.name,
              viewer: 'pdf',
              objectUrl: url,
              size: typeof ContentLength === 'number' ? ContentLength : null,
              lastModified: node.lastModified,
            };
          });
          setEditorContent('');
          navigate(`/view/${node.path}`);
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
          const draft = await getMemoDraft(draftKey);

          let contentToUse = serverText;
          if (draft) {
            if (serverLastModTs > draft.originalLastModified) {
              const useServer = window.confirm(
                '서버에 더 최신 버전이 있습니다. 기존 내용을 버리고 서버 버전으로 교체할까요?'
              );
              if (useServer) {
                contentToUse = serverText;
                await deleteMemoDraft(draftKey);
              } else {
                contentToUse = draft.content;
              }
            } else {
              contentToUse = draft.content;
            }
          }

          setCurrentFile({
            type: 's3',
            id: node.path,
            name: node.name,
            content: contentToUse,
            viewer: 'markdown',
            size: typeof ContentLength === 'number' ? ContentLength : null,
            lastModified: serverLastModified ?? node.lastModified,
          });
          setEditorContent(contentToUse);
          navigate(`/view/${node.path}`);
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
          setCurrentFile({
            type: 's3',
            id: node.path,
            name: node.name,
            content: display,
            viewer: 'json',
            size: typeof ContentLength === 'number' ? ContentLength : null,
            lastModified: node.lastModified,
          });
          setEditorContent(display);
          navigate(`/view/${node.path}`);
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
          setCurrentFile({
            type: 's3',
            id: node.path,
            name: node.name,
            content: text,
            viewer,
            size: typeof ContentLength === 'number' ? ContentLength : null,
            lastModified: node.lastModified,
          });
          setEditorContent(text);
          navigate(`/view/${node.path}`);
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
          setCurrentFile((prev) => {
            if (prev && (prev.viewer === 'image' || prev.viewer === 'pdf' || prev.viewer === 'audio' || prev.viewer === 'video') && prev.objectUrl) {
              URL.revokeObjectURL(prev.objectUrl);
            }
            return {
              type: 's3',
              id: node.path,
              name: node.name,
              viewer: 'audio',
              objectUrl: url,
              size: typeof ContentLength === 'number' ? ContentLength : null,
              lastModified: node.lastModified,
            };
          });
          setEditorContent('');
          navigate(`/view/${node.path}`);
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
          setCurrentFile((prev) => {
            if (prev && (prev.viewer === 'image' || prev.viewer === 'pdf' || prev.viewer === 'audio' || prev.viewer === 'video') && prev.objectUrl) {
              URL.revokeObjectURL(prev.objectUrl);
            }
            return {
              type: 's3',
              id: node.path,
              name: node.name,
              viewer: 'video',
              objectUrl: url,
              size: typeof ContentLength === 'number' ? ContentLength : null,
              lastModified: node.lastModified,
            };
          });
          setEditorContent('');
          navigate(`/view/${node.path}`);
        } catch (err) {
          console.error('S3 Read Error:', err);
        }
        return;
      }

      setCurrentFile({
        type: 's3',
        id: node.path,
        name: node.name,
        viewer: 'unsupported',
        size: null,
        lastModified: node.lastModified,
      });
      setEditorContent('');
      navigate(`/view/${node.path}`);
    } else if (type === 'local') {
      const file = await node.handle.getFile();
      const serverLastModTs = file.lastModified ?? 0;

      const imageExts = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
      const audioExts = ['m4a', 'mp3', 'wav', 'ogg', 'aac', 'flac', 'weba'];
      const videoExts = ['mp4', 'webm', 'ogv', 'mov'];

      const openLocalBlobViewer = (viewer, mime) => {
        const blob = new Blob([file], { type: mime || file.type || undefined });
        const url = URL.createObjectURL(blob);
        setCurrentFile((prev) => {
          if (prev && (prev.viewer === 'image' || prev.viewer === 'pdf' || prev.viewer === 'audio' || prev.viewer === 'video') && prev.objectUrl) {
            URL.revokeObjectURL(prev.objectUrl);
          }
          return {
            type: 'local',
            id: node.path,
            name: node.name,
            viewer,
            objectUrl: url,
            handle: node.handle,
            parentHandle: node.parentHandle,
            size: typeof file.size === 'number' ? file.size : null,
            lastModified: file.lastModified,
          };
        });
        setEditorContent('');
        navigate(`/view/${node.path}`);
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
        setCurrentFile({
          type: 'local',
          id: node.path,
          name: node.name,
          content: display,
          handle: node.handle,
          parentHandle: node.parentHandle,
          viewer: 'json',
          size: typeof file.size === 'number' ? file.size : null,
          lastModified: file.lastModified,
        });
        setEditorContent(display);
        navigate(`/view/${node.path}`);
        return;
      }

      if (ext === 'html' || ext === 'htm' || ext === 'svg') {
        const text = await file.text();
        const viewer = ext === 'svg' ? 'svg' : 'html';
        setCurrentFile({
          type: 'local',
          id: node.path,
          name: node.name,
          content: text,
          handle: node.handle,
          parentHandle: node.parentHandle,
          viewer,
          size: typeof file.size === 'number' ? file.size : null,
          lastModified: file.lastModified,
        });
        setEditorContent(text);
        navigate(`/view/${node.path}`);
        return;
      }

      if (ext !== 'md' && ext !== 'markdown' && ext !== '') {
        setCurrentFile({
          type: 'local',
          id: node.path,
          name: node.name,
          handle: node.handle,
          parentHandle: node.parentHandle,
          viewer: 'unsupported',
          size: typeof file.size === 'number' ? file.size : null,
          lastModified: file.lastModified,
        });
        setEditorContent('');
        navigate(`/view/${node.path}`);
        return;
      }

      const serverText = await file.text();
      const draftKey = getDraftKey('local', node.path);
      const draft = await getMemoDraft(draftKey);

      let contentToUse = serverText;
      if (draft) {
        if (serverLastModTs > draft.originalLastModified) {
          const useServer = window.confirm(
            '더 최신 버전이 있습니다. 기존 내용을 버리고 최신 버전으로 교체할까요?'
          );
          if (useServer) {
            contentToUse = serverText;
            await deleteMemoDraft(draftKey);
          } else {
            contentToUse = draft.content;
          }
        } else {
          contentToUse = draft.content;
        }
      }

      setCurrentFile({
        type: 'local',
        id: node.path,
        name: node.name,
        content: contentToUse,
        handle: node.handle,
        parentHandle: node.parentHandle,
        viewer: 'markdown',
        size: typeof file.size === 'number' ? file.size : null,
        lastModified: file.lastModified,
      });
      setEditorContent(contentToUse);
      navigate(`/view/${node.path}`);
    }
  };

  const toSelectKey = (storageType, path) => `${storageType}:${path}`;

  const saveCurrentMarkdownBeforeSwitch = useCallback(
    async (storageType, node) => {
      const cur = currentFileRef.current;
      if (!cur?.viewer || cur.viewer !== 'markdown') return;
      if (cur.type === storageType && cur.id === node.path) return;
      const draftKey = getDraftKey(cur.type, cur.id);
      const origLastMod = cur.lastModified;
      const ts =
        origLastMod instanceof Date
          ? origLastMod.getTime()
          : typeof origLastMod === 'number'
            ? origLastMod
            : 0;
      try {
        await saveMemoDraft({
          key: draftKey,
          content: editorContent,
          originalLastModified: ts,
        });
        saveFileRef.current?.(null, { skipSuffixCheck: true }).catch(() => {});
      } catch (e) {
        console.error('memoDraft save before switch:', e);
      }
    },
    [editorContent]
  );

  const handleTreeNodeSelect = useCallback(
    async (storageType, node, modifiers = {}) => {
      const { ctrlKey = false, metaKey = false, shiftKey = false } = modifiers;
      const isRange = shiftKey;

      const tree = storageType === 's3' ? s3Tree : localTree;
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
              await saveCurrentMarkdownBeforeSwitch(storageType, node);
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
        await saveCurrentMarkdownBeforeSwitch(storageType, node);
        await selectFileRaw(storageType, node);
      }
    },
    [isMobile, s3Tree, localTree, selectFileRaw, saveCurrentMarkdownBeforeSwitch, confirmAndCancelEditorImageUpload]
  );

  const selectFile = useCallback(
    (type, node) => {
      handleTreeNodeSelect(type, node, {});
    },
    [handleTreeNodeSelect]
  );

  const handleOpenInNewWindow = useCallback(
    async (storageType, node) => {
      if (node?.type !== 'file' || !node?.path) return;

      const path = node.path;
      const ext = (path.split('.').pop() || '').toLowerCase();

      const imageExts = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'ico', 'avif'];
      const videoExts = ['mp4', 'webm', 'ogv', 'mov', 'mkv'];
      const audioExts = ['m4a', 'mp3', 'wav', 'ogg', 'aac', 'flac', 'weba'];
      const isS3Media = storageType === 's3' && (ext === 'pdf' || imageExts.includes(ext) || videoExts.includes(ext) || audioExts.includes(ext));

      // Popup blocker 방지를 위해 signedURL 요청 전에 새 창을 먼저 띄웁니다.
      if (isS3Media) {
        const win = window.open('about:blank', '_blank');
        if (!win) {
          alert('팝업이 차단되어 새 창을 열 수 없습니다.');
          return;
        }

        try {
          const client = getS3Client();
          const bucket = s3Creds.bucket;
          if (!client || !bucket) throw new Error('S3 클라이언트 또는 버킷이 초기화되지 않았습니다.');

          const signedUrl = await getSignedGetUrl(client, bucket, path, 3600);
          win.location.href = signedUrl.toString();
        } catch (e) {
          console.error('Open media signedURL failed:', e);
          alert('미디어 열기에 실패했습니다.');
        }
        return;
      }

      const url = new URL(window.location.href);
      url.searchParams.set('open', `${storageType}:${path}`);
      window.open(url.toString(), '_blank');
    },
    [getS3Client, s3Creds.bucket]
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

  // Persist last opened file or chat for restore on next load
  useEffect(() => {
    if (!isUnlocked) return;
    const onChat =
      location.pathname === '/chat' || location.pathname.endsWith('/chat');
    if (onChat) {
      saveLastOpenedFile({ type: 'chat' });
      return;
    }
    if (!currentFile) return;
    if (currentFile.type !== 's3' && currentFile.type !== 'local') return;
    saveLastOpenedFile({ type: currentFile.type, path: currentFile.id });
  }, [isUnlocked, currentFile, location.pathname, saveLastOpenedFile]);

  // Open file from URL ?open=storageType:path (e.g. from "새 창에서 열기")
  useEffect(() => {
    if (!isUnlocked || hasProcessedOpenFromUrlRef.current) return;
    const openParam = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('open') : null;
    if (!openParam) return;
    const colonIdx = openParam.indexOf(':');
    const type = colonIdx >= 0 ? openParam.slice(0, colonIdx) : null;
    const path = colonIdx >= 0 ? openParam.slice(colonIdx + 1) : null;
    if ((type !== 's3' && type !== 'local') || !path) {
      hasProcessedOpenFromUrlRef.current = true;
      return;
    }
    const tree = type === 's3' ? s3Tree : localTree;
    if (!tree || tree.length === 0) return;
    const node = findFileNodeByPath(tree, path);
    if (node) {
      selectFile(type, node);
    }
    hasProcessedOpenFromUrlRef.current = true;
  }, [isUnlocked, s3Tree, localTree, selectFile]);

  // Restore last opened file or chat once unlocked (trees needed for files)
  useEffect(() => {
    if (!isUnlocked || hasRestoredLastFileRef.current) return;
    if (hasProcessedOpenFromUrlRef.current) return;
    if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('open')) return;
    const saved = loadLastOpenedFile();
    if (!saved) return;
    if (typeof saved !== 'object' || saved == null) {
      hasRestoredLastFileRef.current = true;
      return;
    }
    const { type, path } = saved;
    if (type === 'chat') {
      hasRestoredLastFileRef.current = true;
      if (location.pathname !== '/chat' && !location.pathname.endsWith('/chat')) {
        navigate('/chat');
      }
      return;
    }
    if (type !== 's3' && type !== 'local') {
      hasRestoredLastFileRef.current = true;
      return;
    }
    const tree = type === 's3' ? s3Tree : localTree;
    if (!tree || tree.length === 0) {
      if (type === 'local') hasRestoredLastFileRef.current = true;
      return;
    }
    const node = findFileNodeByPath(tree, path);
    if (node) selectFile(type, node);
    hasRestoredLastFileRef.current = true;
  }, [isUnlocked, s3Tree, localTree, selectFile, loadLastOpenedFile, navigate, location.pathname]);

  // Prompt to restore last local folder when returning in local mode
  useEffect(() => {
    if (!isUnlocked || hasPromptedLocalFolderRestoreRef.current) return;
    if (storageMode !== STORAGE_MODE_LOCAL || localRootHandle) return;

    let cancelled = false;
    (async () => {
      const stored = await hasStoredLocalRootHandle();
      const name = loadLastLocalFolderName();
      if (cancelled || !stored || !name) return;
      hasPromptedLocalFolderRestoreRef.current = true;
      setPendingLocalFolderName(name);
      setShowRestoreLocalFolderModal(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [isUnlocked, storageMode, localRootHandle]);

  const moveS3FileToFolder = async (file, destFolderPath) => {
    const client = getS3Client();
    if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
    const bucket = s3Creds.bucket;
    const fileName = file.name;
    const destPrefix = destFolderPath || '';
    const newKey = `${destPrefix}${fileName}`;
    const oldKey = file.id;
    if (newKey === oldKey) return file;

    await copyObject(client, bucket, oldKey, newKey);
    await deleteObject(client, bucket, oldKey);

    await loadS3Files();

    return { ...file, id: newKey };
  };

  const moveLocalFileToFolder = async (file, destDirHandle, destDirPath) => {
    const sourceDir = file.parentHandle || localRootHandle;
    if (!sourceDir) throw new Error('원본 폴더를 찾을 수 없습니다.');
    if (!destDirHandle) throw new Error('대상 폴더를 찾을 수 없습니다.');

    const fileName = file.name;
    const oldPath = file.id ?? file.path;
    const newPath = `${destDirPath || ''}${fileName}`;
    if (!oldPath) throw new Error('원본 파일 경로를 찾을 수 없습니다.');
    if (newPath === oldPath) return file;

    const srcFile = await file.handle.getFile();
    const newFileHandle = await destDirHandle.getFileHandle(fileName, { create: true });
    const writable = await newFileHandle.createWritable();
    await writable.write(await srcFile.arrayBuffer());
    await writable.close();

    await sourceDir.removeEntry(fileName, { recursive: false });

    await refreshLocalTree();

    return {
      ...file,
      id: newPath,
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
    }
  };

  const handleRequestDownload = () => {
    setShowDownloadMethodModal(true);
    setDownloadProgress(0);
    setDownloadComplete(false);
  };

  /** Object URL 방식: 메모리 제한 ~100–200MB. presigned URL 인코딩 이슈 회피 */
  const handleDownloadCurrentFile = async () => {
    if (!currentFile) return;
    if (currentFile.type === 's3') {
      try {
        const client = getS3Client();
        if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
        const { body } = await getObjectBody(client, s3Creds.bucket, currentFile.id);
        const blob = new Blob([body]);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = currentFile.name || currentFile.id.split('/').filter(Boolean).pop() || 'download';
        a.click();
        URL.revokeObjectURL(url);
      } catch (e) {
        console.error('S3 다운로드 실패:', e);
        alert('파일 다운로드에 실패했습니다: ' + (e?.message || e));
      }
      setShowDownloadMethodModal(false);
    } else if (currentFile.type === 'local' && currentFile.handle) {
      try {
        const file = await currentFile.handle.getFile();
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = currentFile.name || file.name;
        a.click();
        URL.revokeObjectURL(url);
      } catch (e) {
        console.error('로컬 파일 다운로드 실패:', e);
        alert('다운로드에 실패했습니다.');
      }
      setShowDownloadMethodModal(false);
    }
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

  const handleSaveSnippetConfig = async (config) => {
    const toSave = config ?? snippetConfig;
    setIsSavingSnippets(true);
    try {
      await Promise.all([saveSnippetConfigToS3(toSave), saveSnippetConfigToLocal(toSave)]);
      setOperationStatus('스니펫 설정이 저장되었습니다.');
    } catch (e) {
      alert('스니펫 설정 저장에 실패했습니다: ' + (e?.message || e));
    } finally {
      setIsSavingSnippets(false);
    }
  };

  /** Storage API: 폴더 선택 후 스트리밍 저장. 진행률 표시 */
  const handleDownloadToFolder = async () => {
    if (!currentFile) return;
    if (currentFile.type === 's3') {
      try {
        if (!('showDirectoryPicker' in window)) {
          openUnsupportedFolderDownloadModal();
          setShowDownloadMethodModal(false);
          return;
        }
        const dirHandle = await window.showDirectoryPicker();
        const fileName = currentFile.name || currentFile.id.split('/').filter(Boolean).pop() || 'download';
        const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
        const writable = await fileHandle.createWritable();

        const client = getS3Client();
        if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');

        await streamS3ObjectToWritable(
          client,
          s3Creds.bucket,
          currentFile.id,
          writable,
          (percent) => setDownloadProgress(percent),
        );
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
    } else if (currentFile.type === 'local' && currentFile.handle) {
      try {
        if (!('showDirectoryPicker' in window)) {
          openUnsupportedFolderDownloadModal();
          setShowDownloadMethodModal(false);
          return;
        }
        const dirHandle = await window.showDirectoryPicker();
        const file = await currentFile.handle.getFile();
        const fileName = currentFile.name || file.name;
        const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
        const writable = await fileHandle.createWritable();
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
    }
  };

  const handleDownloadNode = async (storageType, node) => {
    const downloadedName =
      node?.name || node?.path?.split('/').filter(Boolean).pop() || (node?.type === 'folder' ? '폴더' : '파일');
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
        if (!dirHandle?.queryPermission || !dirHandle?.requestPermission) return;
        const permissionDesc = { mode: 'readwrite' };
        const current = await dirHandle.queryPermission(permissionDesc);
        if (current === 'granted') return;
        const requested = await dirHandle.requestPermission(permissionDesc);
        if (requested !== 'granted') {
          throw new Error('선택한 폴더에 쓰기 권한이 필요합니다.');
        }
      };
      try {
        const fallbackRootName = storageType === 's3' ? 's3-root' : 'local-root';
        const folderName = (node.name || '').trim() || fallbackRootName;
        const indicatorId = addIndicator({
          type: ActivityTypes.DOWNLOAD,
          label: `폴더 다운로드 중: ${folderName}`,
        });

        try {
          if (shouldUseZipFallback) {
            await downloadFolderAsZip(storageType, node, folderName, indicatorId);
          } else {
            const selectedDirHandle = await window.showDirectoryPicker();
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

                const segments = relativeKey.split('/').filter(Boolean);
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
                  if (entry.kind === 'file') {
                    const file = await entry.getFile();
                    const destFileHandle = await destDirHandle.getFileHandle(entry.name, { create: true });
                    const writable = await destFileHandle.createWritable();
                    await writable.write(await file.arrayBuffer());
                    await writable.close();
                  } else if (entry.kind === 'directory') {
                    const childDestDir = await destDirHandle.getDirectoryHandle(entry.name, { create: true });
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
            const folderName = (node.name || '').trim() || fallbackRootName;
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
    if (storageType === 's3') {
      try {
        const client = getS3Client();
        if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
        const { body } = await getObjectBody(client, s3Creds.bucket, node.path);
        const blob = new Blob([body]);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = node.name || node.path.split('/').filter(Boolean).pop() || 'download';
        a.click();
        URL.revokeObjectURL(url);
        setOperationStatus(`다운로드: ${downloadedName}`);
        showDownloadCompleteModal('다운로드 완료', `파일 다운로드가 완료되었습니다.\n대상: ${downloadedName}`);
      } catch (e) {
        console.error('S3 다운로드 실패:', e);
        alert('파일 다운로드에 실패했습니다: ' + (e?.message || e));
      }
    } else if (storageType === 'local' && node.handle) {
      try {
        const file = await node.handle.getFile();
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = node.name || file.name;
        a.click();
        URL.revokeObjectURL(url);
        setOperationStatus(`다운로드: ${downloadedName}`);
        showDownloadCompleteModal('다운로드 완료', `파일 다운로드가 완료되었습니다.\n대상: ${downloadedName}`);
      } catch (e) {
        console.error('로컬 파일 다운로드 실패:', e);
        alert('다운로드에 실패했습니다.');
      }
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
    }
  };

  const handleRequestMoveFileFromSidebar = (node, storageType) => {
    setMoveFileTarget({ node, storageType });
    setIsMoveModalOpen(true);
  };

  const handleConfirmMoveFileFromSidebar = async (dest) => {
    if (!moveFileTarget || !dest) return;
    const { node, storageType } = moveFileTarget;
    const fileToMove =
      storageType === 's3'
        ? { id: node.path, name: node.name }
        : { ...node, handle: node.handle, parentHandle: node.parentHandle || localRootHandle };
    try {
      if (storageType === 's3') {
        await moveS3FileToFolder(fileToMove, dest.path || '');
        if (currentFile?.type === 's3' && currentFile.id === node.path) {
          setCurrentFile((prev) =>
            prev && prev.id === node.path ? { ...prev, id: (dest.path || '') + node.name } : prev,
          );
        }
      } else {
        const updated = await moveLocalFileToFolder(fileToMove, dest.handle || localRootHandle, dest.path || '');
        if (currentFile?.type === 'local' && currentFile.id === node.path) {
          setCurrentFile(updated);
        }
      }
      setMoveFileTarget(null);
      setIsMoveModalOpen(false);
      setOperationStatus(`파일 이동 완료: ${node.name}`);
    } catch (e) {
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

  const saveFile = async (fileOverride = null, options = {}) => {
    const { skipSuffixCheck = false, lastInputAt: inputModifiedAt } = options;
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
    setIsSaving(true);
    const indicatorId = addIndicator({
      id: 'note-save',
      type: ActivityTypes.NOTE_PROCESSING,
      label: '필기 저장 중',
      detail: fileToSave.name,
    });
    const textToSave = editorContentRef.current;
    try {
      if (fileToSave.type === 's3') {
        const client = getS3Client();
        if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
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
          Key: fileToSave.id,
          Body: textToSave,
          ContentType: contentType,
        });
        await deleteMemoDraft(getDraftKey('s3', fileToSave.id));
        loadS3Files();
        const savedByteLength = new TextEncoder().encode(textToSave).length;
        setCurrentFile((prev) => {
          if (prev?.id !== fileToSave.id) return prev;
          const next = { ...prev, content: textToSave, size: savedByteLength };
          currentFileRef.current = next;
          return next;
        });
      } else if (fileToSave.type === 'local') {
        const writable = await fileToSave.handle.createWritable();
        await writable.write(textToSave);
        await writable.close();
        await deleteMemoDraft(getDraftKey('local', fileToSave.id));
        const file = await fileToSave.handle.getFile();
        setCurrentFile((prev) => {
          if (prev?.id !== fileToSave.id) return prev;
          const next = {
            ...prev,
            content: textToSave,
            size: typeof file.size === 'number' ? file.size : prev?.size ?? null,
          };
          currentFileRef.current = next;
          return next;
        });
        setIsSaving(false);
        return;
      }
    } catch (e) {
      if (fileToSave.type === 's3' && isAbortOrNetworkError(e)) {
        try {
          await savePendingUpload({
            key: fileToSave.id,
            content: textToSave,
            modifiedAt: inputModifiedAt ?? Date.now(),
            contentType:
              viewer === 'json'
                ? 'application/json'
                : viewer === 'raw'
                  ? 'text/plain'
                  : viewer === 'html'
                    ? 'text/html'
                    : viewer === 'svg'
                      ? 'image/svg+xml'
                      : 'text/markdown',
          });
          alert('업로드가 중단되었습니다. 연결이 복구되면 다시 로그인하면 자동으로 동기화됩니다.');
        } catch (dbErr) {
          console.error('저장 실패 및 IndexedDB 임시 저장 실패:', dbErr);
          alert('저장 실패: ' + e.message);
        }
      } else {
        alert('저장 실패: ' + e.message);
      }
    } finally {
      removeIndicator(indicatorId);
      setIsSaving(false);
    }
  };

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

    return { ...file, id: newPath, name: newName, handle: newFileHandle };
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
      }
      if (updated) {
        setCurrentFile(updated);
      }
      return updated ?? null;
    } catch (e) {
      alert("이름 변경 실패: " + e.message);
      return null;
    }
  };

  const renameCurrentFileTitle = async (newTitle) => {
    if (!currentFile) return;
    const trimmedBase = newTitle.trim();
    if (!trimmedBase) return;

    const name = currentFile.name || '';
    const lastDot = name.lastIndexOf('.');
    const ext = lastDot > 0 ? name.slice(lastDot) : '';
    const newFullName = `${trimmedBase}${ext}`;

    if (newFullName === name) return;

    try {
      await renameCurrentFileFullName(newFullName);
    } catch (e) {
      alert("이름 변경 실패: " + e.message);
    }
  };

  // 6. Create & Delete
  const getParentPathsToExpand = (parentPath) => {
    if (!parentPath || parentPath === '') return [];
    const parts = parentPath.replace(/\/$/, '').split('/').filter(Boolean);
    const result = [];
    let acc = '';
    for (const p of parts) {
      acc += p + '/';
      result.push(acc);
    }
    return result;
  };

  const createItem = async (storageType, parentPath, parentDirHandle, type, nameInput) => {
    const name = (nameInput || '').trim();
    if (!name) return;

    let finalName = name;
    if (type === 'file' && !finalName.endsWith('.md')) finalName += '.md';
    const newPath = parentPath + finalName + (type === 'folder' ? '/' : '');

    try {
      if (storageType === 's3') {
        const client = getS3Client();
        if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
        if (type === 'folder') {
          await putObject(client, { Bucket: s3Creds.bucket, Key: newPath, Body: '' });
          loadS3Files();
          const parentPaths = getParentPathsToExpand(parentPath);
          expandPathsRef.current?.(storageType, parentPaths);
        } else {
          await putObject(client, { Bucket: s3Creds.bucket, Key: newPath, Body: '' });
          loadS3Files();
          const parentPaths = getParentPathsToExpand(parentPath);
          expandPathsRef.current?.(storageType, parentPaths);
          setCurrentFile({ type: 's3', id: newPath, name: finalName, content: '' });
          setEditorContent('');
          navigate(`/view/${newPath}`);
        }
      } else if (storageType === 'local') {
        const targetDirHandle = parentDirHandle || localRootHandle;
        if (!targetDirHandle) return alert("루트 폴더를 먼저 열어주세요.");

        if (type === 'folder') {
          await targetDirHandle.getDirectoryHandle(finalName, { create: true });
          const parentPaths = getParentPathsToExpand(parentPath);
          expandPathsRef.current?.(storageType, parentPaths);
        } else {
          const newFileHandle = await targetDirHandle.getFileHandle(finalName, { create: true });
          const parentPaths = getParentPathsToExpand(parentPath);
          expandPathsRef.current?.(storageType, parentPaths);
          setCurrentFile({
            type: 'local',
            id: newPath,
            name: finalName,
            content: '',
            handle: newFileHandle,
          });
          setEditorContent('');
          navigate(`/view/${newPath}`);
        }
        refreshLocalTree();
      }
    } catch (e) {
      alert("생성 실패: " + e.message);
      throw e;
    }
  };

  const requestCreateItem = (storageType, parentPath, parentDirHandle, type) => {
    setCreateModalContext({ storageType, parentPath, parentDirHandle, type });
    setCreateModalOpen(true);
  };

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
      if (storageType === 's3') {
        const client = getS3Client();
        if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const key = parentPath + file.name;
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
          const newFileHandle = await targetDirHandle.getFileHandle(file.name, { create: true });
          const writable = await newFileHandle.createWritable();
          await writable.write(await file.arrayBuffer());
          await writable.close();
        }
        refreshLocalTree();
      }
      const parentPaths = getParentPathsToExpand(parentPath);
      expandPathsRef.current?.(storageType, parentPaths);
      setOperationStatus(files.length > 1 ? `${files.length}개 파일 업로드 완료` : '업로드 완료');
    } catch (err) {
      alert('업로드 실패: ' + err.message);
    } finally {
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
          const relPath = file.webkitRelativePath || file.name;
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
          const relPath = file.webkitRelativePath || file.name;
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
    } = createModalContext;
    setIsCreateSubmitting(true);
    try {
      await createItem(storageType, parentPath, parentDirHandle, type, nameInput);
      if (type === 'folder') {
        const trimmed = (nameInput || '').trim();
        const newPath = parentPath + trimmed + '/';
        if (fromMoveModal) setMoveModalSelectPath(newPath);
        if (fromAddToNoteModal) setAddToNoteSelectPath(newPath);
      }
      setCreateModalOpen(false);
      setCreateModalContext(null);
    } catch (e) {
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
    if (!deleteTarget || deleteTarget.type !== 's3' || deleteTarget.node.type !== 'file') return [];
    return getRecordingKeysFromTree(s3Tree, deleteTarget.node.path);
  })();

  const confirmDelete = async (options = {}) => {
    if (!deleteTarget) return;
    const { node, type } = deleteTarget;
    const { deleteWithRecordings = false } = options;
    const isInTrash = node.path.startsWith('.trash/');
    const isFolder = node.type === 'folder';
    const isTrashRoot = node.path === '.trash/';

    const closeModal = () => setDeleteTarget(null);
    let closeTimer = null;

    const recordingKeysToMove = deleteWithRecordings
      ? associatedRecordings.flatMap((r) => {
          const syncKey = getSyncKeyForRecording(r.key);
          return syncKey ? [r.key, syncKey] : [r.key];
        })
      : [];

    // 쓰레기통 루트는 실제 삭제 수행하지 않음
    if (isTrashRoot) {
      setOperationStatus('쓰레기통 비우기 요청: 실제 파일은 삭제되지 않습니다.');
      closeModal();
      return;
    }

    if (isFolder && isDeletingFolder) return;

    setIsDeleting(true);
    if (isFolder) {
      setIsDeletingFolder(true);
      setDeletingFolderPath(node.path);
      setOperationStatus(`폴더 삭제 중: ${node.path}`);
    } else {
      setOperationStatus(isInTrash ? `영구 삭제 중: ${node.path}` : `삭제 중: ${node.path}`);
    }

    closeTimer = setTimeout(closeModal, 3000);

    let deleteSucceeded = false;
    try {
      if (type === 's3') {
        const client = getS3Client();
        if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');

        if (isInTrash) {
          if (node.type === 'folder') {
            const contents = await listObjectsV2(client, s3Creds.bucket, node.path);
            if (contents.length > 0) {
              await deleteObjects(client, s3Creds.bucket, contents.map(({ Key }) => ({ Key })));
            }
          } else {
            const keysToDelete =
              deleteWithRecordings && recordingKeysToMove.length > 0
                ? [node.path, ...recordingKeysToMove]
                : [node.path];
            await deleteObjects(client, s3Creds.bucket, keysToDelete.map((Key) => ({ Key })));
          }
        } else {
          await moveS3EntryToTrash(node, recordingKeysToMove);
        }
        loadS3Files();
      } else if (type === 'local') {
        if (!localRootHandle) throw new Error('루트 폴더를 먼저 열어주세요.');

        if (isInTrash) {
          const pHandle = node.parentHandle || localRootHandle;
          await pHandle.removeEntry(node.name, { recursive: true });
        } else {
          await moveLocalEntryToTrash(node);
        }
        await refreshLocalTree();
      }

      if (currentFile && currentFile.id.startsWith(node.path)) {
        setCurrentFile(null);
        setEditorContent('');
        navigate('/');
      }
      deleteSucceeded = true;
    } catch (e) {
      alert("삭제 실패: " + e.message);
      setOperationStatus(`삭제 실패: ${e.message}`);
    } finally {
      if (closeTimer) clearTimeout(closeTimer);
      closeModal();
      setIsDeleting(false);
      if (isFolder) {
        setIsDeletingFolder(false);
        setDeletingFolderPath(null);
      }
      if (deleteSucceeded) {
        setOperationStatus(isFolder ? `폴더 삭제 완료: ${node.path}` : `삭제 완료: ${node.path}`);
      }
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
          if (currentFile && currentFile.type === 's3' && currentFile.id.startsWith(node.path)) {
            const newPath = currentFile.id.replace(prefix, destPrefix);
            setCurrentFile((prev) => (prev && prev.type === 's3' ? { ...prev, id: newPath } : prev));
          }
        } else if (storageType === 'local') {
          const parentHandle = node.parentHandle || localRootHandle;
          if (!parentHandle) throw new Error('루트 폴더를 먼저 열어주세요.');
          await moveLocalFolderToFolder(node, parentHandle, '', trimmed);
          if (currentFile && currentFile.type === 'local' && (currentFile.id === node.path || currentFile.id.startsWith(node.path))) {
            const newPath = node.path.slice(0, -(node.name?.length ?? 0) - 1) + trimmed + '/';
            const newPathForFile = currentFile.id.startsWith(node.path)
              ? newPath + currentFile.id.slice(node.path.length)
              : currentFile.id;
            setCurrentFile((prev) => (prev && prev.type === 'local' ? { ...prev, id: newPathForFile } : prev));
          }
        }
        return;
      }
      if (storageType === 's3') {
        const originalName = node.name || '';
        const lastDot = originalName.lastIndexOf('.');
        const ext = lastDot > 0 ? originalName.slice(lastDot) : '';
        const newName = `${trimmed}${ext}`;

        const isCurrentFile = currentFile?.type === 's3' && currentFile?.id === node.path;
        const fileToRename = isCurrentFile ? { ...currentFile, viewer: currentFile.viewer } : { id: node.path, name: node.name };
        const hasUnsaved = isCurrentFile && currentFile.content !== editorContent;
        const contentOverride = hasUnsaved ? editorContent : null;

        const updated = await renameS3File(fileToRename, newName, contentOverride);
        if (isCurrentFile) setCurrentFile(updated);
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
          setCurrentFile({
            ...currentFile,
            id: newPath,
            name: newName,
            handle: newFileHandle,
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
  }) => {
    let finalName = String(fileName || '').trim();
    if (!finalName) throw new Error('파일명이 비어 있습니다.');
    if (!finalName.endsWith('.md')) finalName += '.md';
    if (finalName.includes('/') || finalName.includes('\\')) {
      throw new Error('파일명에 / 를 넣을 수 없습니다.');
    }
    const newPath = `${parentPath || ''}${finalName}`;
    const body = formatChatMessageAsNoteMarkdown(message, detectTimeZone());

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
    } else {
      const targetDir = parentHandle || localRootHandle;
      if (!targetDir) throw new Error('루트 폴더를 먼저 열어주세요.');
      const newFileHandle = await targetDir.getFileHandle(finalName, { create: true });
      const writable = await newFileHandle.createWritable();
      await writable.write(body);
      await writable.close();
      await refreshLocalTree();
    }
    setOperationStatus(`노트 생성 완료: ${newPath}`);
  };

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
    const destHandle = targetStorageType === 'local' ? (targetNode.handle || localRootHandle) : null;

    const rawItems = Array.isArray(payload?.items) && payload.items.length
      ? payload.items
      : (payload?.storageType !== undefined && payload?.path
        ? [{ storageType: payload.storageType, path: payload.path, nodeType: payload.nodeType }]
        : null);

    if (rawItems) {
      const items = pruneNestedMovePaths(rawItems).filter((item) => {
        if (item.storageType !== targetStorageType) return false;
        if (item.path === destPath) return false;
        if (item.nodeType === 'folder' && (destPath === item.path || destPath.startsWith(item.path))) {
          return false;
        }
        return true;
      });

      if (!items.length) return;

      const tree = targetStorageType === 's3' ? s3Tree : localTree;
      let successCount = 0;
      let failCount = 0;
      let lastError = null;
      let lastSuccessName = null;

      if (items.length > 1) {
        setOperationStatus(`${items.length}개 항목 이동 중…`);
      }

      for (const item of items) {
        const { storageType: srcStorageType, path: srcPath, nodeType } = item;
        const srcNode = findNodeByPath(tree, srcPath);
        if (!srcNode) {
          failCount += 1;
          lastError = new Error('이동할 항목을 트리에서 찾을 수 없습니다.');
          continue;
        }

        if (nodeType === 'file') {
          const destFilePath = `${destPath || ''}${srcNode.name}`;
          if (destFilePath === srcPath) continue;
        } else if (nodeType === 'folder') {
          const destFolderPrefix = `${destPath || ''}${srcNode.name}/`;
          if (destFolderPrefix === srcPath) continue;
          if (destFolderPrefix.startsWith(srcPath) || srcPath.startsWith(destFolderPrefix)) continue;
        }

        try {
          if (nodeType === 'file') {
            const fileNode = srcStorageType === 's3'
              ? { id: srcPath, name: srcNode.name }
              : { ...srcNode, id: srcNode.path };
            if (srcStorageType === 's3') {
              await moveS3FileToFolder(fileNode, destPath);
              if (currentFile?.type === 's3' && currentFile.id === srcPath) {
                setCurrentFile((prev) => (prev && prev.id === srcPath ? { ...prev, id: destPath + srcNode.name } : prev));
              }
            } else {
              const updated = await moveLocalFileToFolder(fileNode, destHandle, destPath);
              if (currentFile?.type === 'local' && currentFile.id === srcPath) {
                setCurrentFile(updated);
              }
            }
          } else {
            if (srcStorageType === 's3') {
              await moveS3FolderToFolder(srcNode, destPath);
            } else {
              await moveLocalFolderToFolder(srcNode, destHandle, destPath);
            }
          }
          successCount += 1;
          lastSuccessName = srcNode.name;
        } catch (e) {
          failCount += 1;
          lastError = e;
        }
      }

      if (successCount === 0 && failCount === 0) return;

      if (successCount > 0) {
        setSelectedIds(new Set());
      }

      if (failCount === 0) {
        setOperationStatus(
          successCount > 1
            ? `${successCount}개 항목 이동 완료`
            : `${items[0].nodeType === 'folder' ? '폴더' : '파일'} 이동 완료: ${lastSuccessName || items[0].name || items[0].path}`,
        );
      } else if (successCount === 0) {
        alert('이동 실패: ' + (lastError?.message || '알 수 없는 오류'));
        setOperationStatus(`이동 실패: ${lastError?.message || ''}`);
      } else {
        alert(`${successCount}개 이동 완료, ${failCount}개 실패` + (lastError ? `: ${lastError.message}` : ''));
        setOperationStatus(`${successCount}개 이동, ${failCount}개 실패`);
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
        if (targetStorageType === 's3') {
          const client = getS3Client();
          if (!client) throw new Error('S3 클라이언트를 초기화하지 못했습니다.');
          const uploadFile = async (file, prefix) => {
            const key = prefix + file.name;
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
              if (entry.kind === 'file') {
                const file = await entry.getFile();
                await uploadFile(file, prefix);
              } else if (entry.kind === 'directory') {
                await uploadDir(entry, prefix + entry.name + '/');
              }
            }
          };
          for (const file of files) {
            await uploadFile(file, destPath);
          }
          for (const handle of dirHandles) {
            await uploadDir(handle, destPath + (handle.name || '') + '/');
          }
          loadS3Files();
          const parentPaths = getParentPathsToExpand(destPath);
          expandPathsRef.current?.(targetStorageType, parentPaths);
        } else {
          const targetDirHandle = destHandle || localRootHandle;
          if (!targetDirHandle) throw new Error('루트 폴더를 먼저 열어주세요.');
          const copyFile = async (file, dirHandle) => {
            const newFileHandle = await dirHandle.getFileHandle(file.name, { create: true });
            const writable = await newFileHandle.createWritable();
            await writable.write(await file.arrayBuffer());
            await writable.close();
          };
          const copyDir = async (dirHandle, destDirHandle) => {
            const newDir = await destDirHandle.getDirectoryHandle(dirHandle.name, { create: true });
            for await (const entry of dirHandle.values()) {
              if (entry.kind === 'file') {
                const file = await entry.getFile();
                const fh = await newDir.getFileHandle(entry.name, { create: true });
                const w = await fh.createWritable();
                await w.write(await file.arrayBuffer());
                await w.close();
              } else if (entry.kind === 'directory') {
                await copyDir(entry, await newDir.getDirectoryHandle(entry.name, { create: true }));
              }
            }
          };
          for (const file of files) {
            await copyFile(file, targetDirHandle);
          }
          for (const handle of dirHandles) {
            const subDir = await targetDirHandle.getDirectoryHandle(handle.name, { create: true });
            await copyDir(handle, subDir);
          }
          refreshLocalTree();
          const parentPaths = getParentPathsToExpand(destPath);
          expandPathsRef.current?.(targetStorageType, parentPaths);
        }
        setOperationStatus(`업로드 완료`);
      } catch (e) {
        alert('업로드 실패: ' + e.message);
        setOperationStatus(`업로드 실패: ${e.message}`);
      } finally {
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
    try {
      if (storageType === 's3') {
        await moveS3FolderToFolder(node, dest.path || '');
      } else {
        const destHandle = dest.handle || localRootHandle;
        if (!destHandle) throw new Error('대상 폴더를 찾을 수 없습니다.');
        await moveLocalFolderToFolder(node, destHandle, dest.path || '');
      }
      setMoveFolderTarget(null);
      setOperationStatus(`폴더 이동 완료: ${node.name}`);
    } catch (e) {
      alert('폴더 이동 실패: ' + e.message);
      setOperationStatus(`폴더 이동 실패: ${e.message}`);
    }
  };

  const handleConfirmMove = async (dest) => {
    if (!currentFile || !dest) return;
    try {
      if (currentFile.type === 's3') {
        const updated = await moveS3FileToFolder(currentFile, dest.path || '');
        if (updated) {
          setCurrentFile((prev) =>
            prev && prev.type === 's3' ? { ...prev, id: updated.id } : prev,
          );
        }
      } else if (currentFile.type === 'local') {
        const updated = await moveLocalFileToFolder(
          currentFile,
          dest.handle,
          dest.path || '',
        );
        if (updated) {
          setCurrentFile(updated);
        }
      }
      setIsMoveModalOpen(false);
      setOperationStatus(`파일 이동 완료: ${dest.path || ''}${currentFile.name}`);
    } catch (e) {
      alert('파일 이동 실패: ' + e.message);
      setOperationStatus(`파일 이동 실패: ${e.message}`);
    }
  };

  // 7. Auto Save (S3 & local, 5s debounce)
  useEffect(() => {
    if (!currentFile || (currentFile.type !== 's3' && currentFile.type !== 'local')) return;
    if (currentFile.viewer !== 'markdown') return;
    if (!lastInputAt) return;

    const now = Date.now();
    const timeout = setTimeout(async () => {
      // 입력 이후 내용이 변경된 상태만 자동 저장
      if (currentFile.content === editorContent) return;
      if (!currentFile || (currentFile.type !== 's3' && currentFile.type !== 'local')) return;
      try {
        await saveFile(null, { lastInputAt });
        setLastAutoSaveAt(now);
      } catch (e) {
        // saveFile 내부에서 alert 처리
      }
    }, 5000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastInputAt, currentFile, editorContent]);

  // 8. Auto Sync (S3 only, pull when idle >= 30s, checked 주기적으로)
  useEffect(() => {
    if (!currentFile || currentFile.type !== 's3') return;
    if (currentFile.viewer !== 'markdown') return;

    const interval = setInterval(async () => {
      if (!lastInputAt) return;
      const idleMs = Date.now() - lastInputAt;
      if (idleMs < 30000) return;
      // 로컬에 미저장 내용이 있으면 덮어쓰지 않음
      if (currentFile.content !== editorContent) return;

      const client = getS3Client();
      if (!client) return;

      try {
        const { body } = await getObjectBody(client, s3Creds.bucket, currentFile.id);
        const text = new TextDecoder('utf-8').decode(body);
        setCurrentFile((prev) => {
          if (!prev || prev.type !== 's3' || prev.id !== currentFile.id) return prev;
          return { ...prev, content: text };
        });
        setEditorContent((prev) => {
          if (prev !== editorContent) return prev;
          return text;
        });
        setLastAutoSyncAt(Date.now());
      } catch (err) {
        console.error('Auto sync S3 Read Error:', err);
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
  }, [currentFile?.id]);

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
  };

  const handleToggleRecording = async () => {
    if (isRecording) {
      const noteKey = currentFile?.type === 's3' ? currentFile.id : '';
      const result = await stopRecording({
        noteKey,
        markdown: editorContent,
      });
      if (result && currentFile?.type === 's3' && noteKey) {
        const client = getS3Client();
        if (client && s3Creds.bucket) {
          const indicatorId = addIndicator({
            id: 'recording-upload',
            type: ActivityTypes.RECORDING,
            label: '녹음 업로드 중',
          });
          try {
            setRecordingPipelineStatus('업로드 중');
            await drainRecordingUploadQueue({
              client,
              bucket: s3Creds.bucket,
              onStatus: setRecordingPipelineStatus,
            });
            loadS3Files();
          } catch (e) {
            alert('녹음 업로드 실패: ' + (e?.message || e));
          } finally {
            removeIndicator(indicatorId);
            setRecordingPipelineStatus('');
          }
        }
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

  const isS3Current = currentFile?.type === 's3';
  const isEditableStorage = currentFile?.type === 's3' || currentFile?.type === 'local';
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

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-odp-bgSofter text-gray-800 dark:text-odp-fg font-sans relative">
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

      {/* Auth Modal (Lock Screen) */}
      <AuthModal
        isOpen={showAuthModal}
        onUnlock={handleUnlock}
        fileInputRef={fileInputRef}
        onCloseWithoutUnlock={() => {
          proceedWithoutStoredCreds();
          navigate('/settings');
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
              appName={appName}
              storageMode={storageMode}
              s3Tree={s3Tree}
              s3Bucket={s3Creds.bucket}
              localTree={localTree}
              localRootHandle={localRootHandle}
              isLocalTreeLoading={isLocalTreeLoading}
              localFolderLoadingPath={localFolderLoadingPath}
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
              onOpenLocalFolder={openLocalFolder}
              onSetDeleteTarget={setDeleteTarget}
              onOpenSettings={() => {
                if (isMobile) setSidebarOpen(false);
                navigate('/settings');
              }}
              theme={theme}
              onToggleTheme={() =>
                setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
              }
              onRenameItem={renameTreeItem}
              showHiddenFolders={showHiddenFolders}
              hideRecordingCompanions={hideRecordingCompanions}
              treeStickyFolderPathEnabled={treeStickyFolderPathEnabled}
              onRequestCollapseSidebar={!isMobile ? () => setSidebarCollapsed(true) : undefined}
              deletingFolderPath={deletingFolderPath}
              isDeletingFolder={isDeletingFolder}
              expandPathsRef={expandPathsRef}
              onRefreshS3={loadS3Files}
              onDownloadNode={handleDownloadNode}
              onDuplicateNode={handleDuplicateNode}
              onRequestMoveFile={handleRequestMoveFileFromSidebar}
              onOpenInNewWindow={handleOpenInNewWindow}
              onOpenChatWithMyself={() => {
                if (isMobile) setSidebarOpen(false);
                navigate('/chat');
              }}
              chatWithMyselfActive={location.pathname === '/chat' || location.pathname.endsWith('/chat')}
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
              path="/chat"
              element={
                <ChatWithMyselfPane
                  storageMode={storageMode}
                  getS3Client={getS3Client}
                  s3Bucket={s3Creds.bucket}
                  localRootHandle={localRootHandle}
                  theme={theme}
                  isMobileLayout={isMobile}
                  sidebarOpen={sidebarOpen}
                  onOpenSidebar={() => setSidebarOpen(true)}
                  s3Tree={s3Tree}
                  localTree={localTree}
                  selectPathAfterCreateFolder={addToNoteSelectPath}
                  onSelectPathAfterCreateFolderApplied={() => setAddToNoteSelectPath(null)}
                  onRequestCreateFolderForNote={(parentPath, parentDirHandle) => {
                    setCreateModalContext({
                      storageType: storageMode === 'local' ? 'local' : 's3',
                      parentPath,
                      parentDirHandle,
                      type: 'folder',
                      fromAddToNoteModal: true,
                    });
                    setCreateModalOpen(true);
                  }}
                  onRequestMoveFolder={handleRequestMoveFolder}
                  onCreateNoteFromMessage={handleCreateNoteFromChatMessage}
                  getPresignedUrlForPath={getChatImageUrlForPath}
                />
              }
            />
            <Route
              path="/settings"
              element={
                <SettingsPage
                  s3Creds={s3Creds}
                  masterPassword={masterPassword}
                  onSaveS3Creds={handleSaveS3Creds}
                  storageMode={storageMode}
                  onStorageModeChange={setStorageMode}
                  webdavConfig={webdavConfig}
                  onSaveWebdavConfig={(next) => {
                    setWebdavConfig(next);
                    saveWebdavConfig(next);
                  }}
                  onExportCreds={handleExportCreds}
                  onImportClick={() => fileInputRef.current?.click()}
                  showHiddenFolders={showHiddenFolders}
                  onToggleHiddenFolders={() =>
                    setShowHiddenFolders((prev) => !prev)
                  }
                  hideRecordingCompanions={hideRecordingCompanions}
                  treeStickyFolderPathEnabled={treeStickyFolderPathEnabled}
                  onToggleHideRecordingCompanions={() =>
                    setHideRecordingCompanions((prev) => !prev)
                  }
                  onToggleTreeStickyFolderPath={() =>
                    setTreeStickyFolderPathEnabled((prev) => !prev)
                  }
                  onRequestClose={handleSettingsClose}
                  webauthnSupported={webauthnPRFSupported}
                  webauthnEnabled={isStoredWithWebAuthn() || !!getStoredWebAuthn()?.encryptedPassword}
                  webauthnStorageOnly={isStoredWithWebAuthn()}
                  onEnableWebAuthn={enableWebAuthnUnlock}
                  onDisableWebAuthn={disableWebAuthnUnlock}
                  snippetConfig={snippetConfig}
                  onChangeSnippetConfig={handleChangeSnippetConfig}
                  onSaveSnippetConfig={handleSaveSnippetConfig}
                  isSavingSnippets={isSavingSnippets}
                  snippetConfigLoaded={snippetLoadedFromS3 || snippetLoadedFromLocal}
                  editorType={editorType}
                  onEditorTypeChange={handleEditorTypeChange}
                  isMobileLayout={isMobile}
                  sidebarOpen={sidebarOpen}
                  sidebarCollapsed={sidebarCollapsed}
                  onOpenSidebar={() => setSidebarOpen(true)}
                  getGeminiApiKey={getGeminiApiKey}
                  onCheckAppUpdate={handleCheckAppUpdate}
                  isCheckingAppUpdate={isCheckingAppUpdate}
                />
              }
            />
            <Route
              path="/view/*"
              element={
                <EditorPane
                  currentFile={currentFile}
                  editorType={editorType}
                  editorContent={editorContent}
                  onChangeEditor={handleEditorChange}
                  onSave={saveFile}
                  isSaving={isSaving}
                  editedFileName={editedFileName}
                  setEditedFileName={setEditedFileName}
                  onRenameFullName={renameCurrentFileFullName}
                  onRequestSuffixChangeConfirmForBlur={() => {
                    setSuffixConfirmAction('renameOnly');
                    setShowSuffixChangeConfirmModal(true);
                  }}
                  onRequestClose={handleRequestCloseEditor}
                  onRequestMove={handleRequestMove}
                  onViewUnsupportedAsText={handleViewUnsupportedAsText}
                  onRequestDownload={handleRequestDownload}
                  theme={theme}
                  previewOnly={false}
                  isMobileLayout={isMobile}
                  sidebarOpen={sidebarOpen}
                  sidebarCollapsed={sidebarCollapsed}
                  onOpenSidebar={() => setSidebarOpen(true)}
                  hideRecordingCompanions={hideRecordingCompanions}
                  isRecording={isRecording}
                  audioLevel={audioLevel}
                  onToggleRecording={handleToggleRecording}
                  recordingPipelineStatus={recordingPipelineStatus}
                  recordingsList={recordingsList}
                  selectedRecordingKey={selectedRecordingKey}
                  onSelectRecording={setSelectedRecordingKey}
                  recordingAudioUrl={recordingAudioUrl}
                  recordingSyncData={recordingSyncData}
                  onUploadImage={handleUploadEditorImage}
                  isUploadingEditorImage={isUploadingEditorImage}
                  uploadImagePercent={editorImageUploadPercent}
                  onCancelUploadImage={cancelEditorImageUpload}
                  onResolveWikiImageUrl={getPresignedUrlForPath}
                  snippetConfig={snippetConfig}
                  getGeminiApiKey={getGeminiApiKey}
                  onRequestDelete={() =>
                    setDeleteTarget({
                      node: {
                        path: currentFile?.id,
                        name: currentFile?.name,
                        type: 'file',
                        handle: currentFile?.handle,
                        parentHandle: currentFile?.parentHandle,
                      },
                      type: currentFile?.type,
                    })
                  }
                />
              }
            />
            <Route
              path="/"
              element={
                <EditorPane
                  currentFile={currentFile}
                  editorType={editorType}
                  editorContent={editorContent}
                  onChangeEditor={handleEditorChange}
                  onSave={saveFile}
                  isSaving={isSaving}
                  editedFileName={editedFileName}
                  setEditedFileName={setEditedFileName}
                  onRenameFullName={renameCurrentFileFullName}
                  onRequestSuffixChangeConfirmForBlur={() => {
                    setSuffixConfirmAction('renameOnly');
                    setShowSuffixChangeConfirmModal(true);
                  }}
                  onRequestClose={handleRequestCloseEditor}
                  onRequestMove={handleRequestMove}
                  onViewUnsupportedAsText={handleViewUnsupportedAsText}
                  onRequestDownload={handleRequestDownload}
                  theme={theme}
                  previewOnly={false}
                  isMobileLayout={isMobile}
                  sidebarOpen={sidebarOpen}
                  sidebarCollapsed={sidebarCollapsed}
                  onOpenSidebar={() => setSidebarOpen(true)}
                  hideRecordingCompanions={hideRecordingCompanions}
                  isRecording={isRecording}
                  audioLevel={audioLevel}
                  onToggleRecording={handleToggleRecording}
                  recordingPipelineStatus={recordingPipelineStatus}
                  recordingsList={recordingsList}
                  selectedRecordingKey={selectedRecordingKey}
                  onSelectRecording={setSelectedRecordingKey}
                  recordingAudioUrl={recordingAudioUrl}
                  recordingSyncData={recordingSyncData}
                  onUploadImage={handleUploadEditorImage}
                  isUploadingEditorImage={isUploadingEditorImage}
                  uploadImagePercent={editorImageUploadPercent}
                  onCancelUploadImage={cancelEditorImageUpload}
                  onResolveWikiImageUrl={getPresignedUrlForPath}
                  snippetConfig={snippetConfig}
                  getGeminiApiKey={getGeminiApiKey}
                  onRequestDelete={() =>
                    setDeleteTarget(
                      currentFile
                        ? {
                            node: {
                              path: currentFile?.id,
                              name: currentFile?.name,
                              type: 'file',
                              handle: currentFile?.handle,
                              parentHandle: currentFile?.parentHandle,
                            },
                            type: currentFile?.type,
                          }
                        : null,
                    )
                  }
                />
              }
            />
          </Routes>
          </div>
        </div>

        {/* Status Bar — z above editor chrome (z-10100) so novel/md layers do not cover it on mobile */}
        <div className="relative z-10200 flex h-6 shrink-0 items-center justify-between gap-2 border-t border-gray-200 bg-white/90 px-2 pb-[max(0px,env(safe-area-inset-bottom))] text-[10px] dark:border-odp-borderSoft dark:bg-odp-bgSoft/95 md:h-7 md:gap-3 md:px-3 md:text-[11px]">
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
                <span className="truncate max-w-[160px] md:max-w-[220px]">
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
            {!(location.pathname === '/chat' || location.pathname.endsWith('/chat')) ? (
              <>
                <span className="truncate shrink-0 max-w-12 md:max-w-none" title={currentFile?.type === 's3' ? `S3 (${s3Creds.bucket || '-'})` : currentFile?.type === 'local' ? '로컬' : '없음'}>
                  <span className="md:hidden">{currentFile?.type === 's3' ? 'S3' : currentFile?.type === 'local' ? '로컬' : '없음'}</span>
                  <span className="hidden md:inline">저장소: {currentFile?.type === 's3' ? `S3 (${s3Creds.bucket || '-'})` : currentFile?.type === 'local' ? '로컬' : '없음'}</span>
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
                      : '저장소 미연결'
                }
              >
                <span
                  className={`h-2 w-2 shrink-0 rounded-full md:h-2.5 md:w-2.5 ${
                    (storageMode === 's3' && s3Creds.bucket) ||
                    (storageMode === 'local' && localRootHandle)
                      ? 'bg-emerald-500'
                      : 'bg-amber-400'
                  }`}
                  aria-hidden="true"
                />
                <span className="md:hidden">
                  {(storageMode === 's3' && s3Creds.bucket) ||
                  (storageMode === 'local' && localRootHandle)
                    ? '동기화'
                    : '대기'}
                </span>
                <span className="hidden md:inline">
                  채팅 동기화:{' '}
                  {(storageMode === 's3' && s3Creds.bucket) ||
                  (storageMode === 'local' && localRootHandle)
                    ? storageMode === 's3'
                      ? 'S3 연결됨'
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
                <span className="hidden md:inline" title={currentFile?.type === 's3' ? (lastAutoSyncAt ? `동기화 ${formatTime(lastAutoSyncAt)}` : '대기 중') : '대상 아님'}>
                  자동동기화(S3):{' '}
                  {currentFile?.type === 's3'
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
        isOpen={showRestoreLocalFolderModal}
        title="로컬 폴더 다시 열기"
        message={`이전에 열었던 로컬 폴더 "${pendingLocalFolderName}"을(를) 다시 열까요?`}
        confirmLabel="다시 열기"
        cancelLabel="나중에"
        onConfirm={() => {
          void handleConfirmRestoreLocalFolder();
        }}
        onCancel={() => setShowRestoreLocalFolderModal(false)}
      />

      <ConfirmModal
        isOpen={showAppUpdateConfirmModal}
        title="앱 업데이트"
        message={
          appUpdateAvailable
            ? '새 버전이 준비되었습니다. 저장 중인 작업을 확인한 뒤 최신 버전으로 업데이트하세요.'
            : '새 업데이트를 찾지 못했습니다. 그래도 앱을 다시 로드해 최신 상태를 적용할 수 있습니다.'
        }
        confirmLabel={isApplyingPwaUpdate ? '업데이트 중...' : '최신 버전으로 업데이트'}
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
        message="저장하지 않은 변경사항이 있습니다. 저장 후 닫으시겠습니까?"
        confirmLabel="저장 후 닫기"
        cancelLabel="취소"
        discardLabel="저장 안 하고 닫기"
        onConfirm={handleCloseFileConfirmSave}
        onCancel={() => setShowCloseFileConfirmModal(false)}
        onDiscard={handleCloseFileConfirmDiscard}
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
        fileName={currentFile?.name || currentFile?.id?.split('/').filter(Boolean).pop()}
        onSelectLegacy={handleDownloadCurrentFile}
        onSelectStorageApi={handleDownloadToFolder}
        onCancel={() => setShowDownloadMethodModal(false)}
        isDownloading={downloadProgress > 0 && downloadProgress < 100 && !downloadComplete}
        downloadProgress={downloadProgress}
        downloadComplete={downloadComplete}
        onCloseComplete={() => {
          setShowDownloadMethodModal(false);
          setDownloadProgress(0);
          setDownloadComplete(false);
        }}
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

      {/* Move File Modal (editor current file or sidebar-selected file) */}
      <MoveFileModal
        isOpen={isMoveModalOpen}
        storageType={moveFileTarget ? moveFileTarget.storageType : currentFile?.type}
        s3Tree={s3Tree}
        localTree={localTree}
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
        parentLabel={
          createModalContext
            ? createModalContext.storageType === 's3'
              ? createModalContext.parentPath
                ? `S3: ${createModalContext.parentPath}`
                : 'S3 루트'
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

    </div>
  );
}

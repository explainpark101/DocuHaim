import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from 'react';
import { triggerAppBlobDownload } from '@/utils/tauriBlobDownload';

export type ModalsOwnedApi = {
  showRestoreLocalFolderModal: boolean;
  setShowRestoreLocalFolderModal: (v: boolean | ((p: boolean) => boolean)) => void;
  pendingLocalFolderName: string;
  setPendingLocalFolderName: (v: string | ((p: string) => string)) => void;
  localFolderRestoreSettled: boolean;
  setLocalFolderRestoreSettled: (v: boolean | ((p: boolean) => boolean)) => void;
  showExportPasswordModal: boolean;
  setShowExportPasswordModal: (v: boolean | ((p: boolean) => boolean)) => void;
  showImportPasswordModal: boolean;
  setShowImportPasswordModal: (v: boolean | ((p: boolean) => boolean)) => void;
  importFileContent: any;
  setImportFileContent: (v: any) => void;
  showSaveMethodModal: boolean;
  setShowSaveMethodModal: (v: boolean | ((p: boolean) => boolean)) => void;
  saveMethodModalCreds: any;
  setSaveMethodModalCreds: (v: any) => void;
  showUnsavedConfirmModal: boolean;
  setShowUnsavedConfirmModal: (v: boolean | ((p: boolean) => boolean)) => void;
  showSuffixChangeConfirmModal: boolean;
  setShowSuffixChangeConfirmModal: (v: boolean | ((p: boolean) => boolean)) => void;
  suffixConfirmAction: string;
  setSuffixConfirmAction: (v: string | ((p: string) => string)) => void;
  showCloseFileConfirmModal: boolean;
  setShowCloseFileConfirmModal: (v: boolean | ((p: boolean) => boolean)) => void;
  pendingCloseTabId: string | null;
  setPendingCloseTabId: (v: string | null) => void;
  showOverwriteCredsConfirmModal: boolean;
  setShowOverwriteCredsConfirmModal: (v: boolean | ((p: boolean) => boolean)) => void;
  showCoverChangeConfirmModal: boolean;
  setShowCoverChangeConfirmModal: (v: boolean | ((p: boolean) => boolean)) => void;
  pendingCoverSaveRef: MutableRefObject<any>;
  pendingWebAuthnSave: any;
  setPendingWebAuthnSave: (v: any) => void;
  pendingPasswordSave: any;
  setPendingPasswordSave: (v: any) => void;
  showDownloadMethodModal: boolean;
  setShowDownloadMethodModal: (v: boolean | ((p: boolean) => boolean)) => void;
  downloadModalMode: string;
  setDownloadModalMode: (v: string | ((p: string) => string)) => void;
  showSaveSessionToNoteModal: boolean;
  setShowSaveSessionToNoteModal: (v: boolean | ((p: boolean) => boolean)) => void;
  saveSessionToNoteSelectPath: any;
  setSaveSessionToNoteSelectPath: (v: any) => void;
  isSavingSessionToNote: boolean;
  setIsSavingSessionToNote: (v: boolean | ((p: boolean) => boolean)) => void;
  downloadProgress: number;
  setDownloadProgress: (v: number | ((p: number) => number)) => void;
  downloadComplete: boolean;
  setDownloadComplete: (v: boolean | ((p: boolean) => boolean)) => void;
  downloadResultModal: { isOpen: boolean; title: string; message: string };
  setDownloadResultModal: (v: any) => void;
  closeDownloadResultModal: () => void;
  openUnsupportedFolderDownloadModal: () => void;
  triggerBlobDownload: (blob: Blob, fileName: string) => void | Promise<boolean>;
  addToNoteSelectPath: any;
  setAddToNoteSelectPath: (v: any) => void;
  webauthnPRFSupported: boolean;
  setWebauthnPRFSupported: (v: boolean | ((p: boolean) => boolean)) => void;
  webauthnAvailable: boolean;
  setWebauthnAvailable: (v: boolean | ((p: boolean) => boolean)) => void;
};

const ModalsOwnedContext = createContext<ModalsOwnedApi | null>(null);

export function useModalsOwned(): ModalsOwnedApi {
  const ctx = useContext(ModalsOwnedContext);
  if (!ctx) throw new Error('useModalsOwned must be used within AppModalsStateProvider');
  return ctx;
}

/** Owns modal open flags / download progress outside AppLogic compose. */
export function AppModalsStateProvider({ children }: { children: ReactNode }) {
  const [showRestoreLocalFolderModal, setShowRestoreLocalFolderModal] = useState(false);
  const [pendingLocalFolderName, setPendingLocalFolderName] = useState('');
  const [localFolderRestoreSettled, setLocalFolderRestoreSettled] = useState(false);
  const [showExportPasswordModal, setShowExportPasswordModal] = useState(false);
  const [showImportPasswordModal, setShowImportPasswordModal] = useState(false);
  const [importFileContent, setImportFileContent] = useState<any>(null);
  const [showSaveMethodModal, setShowSaveMethodModal] = useState(false);
  const [saveMethodModalCreds, setSaveMethodModalCreds] = useState<any>(null);
  const [showUnsavedConfirmModal, setShowUnsavedConfirmModal] = useState(false);
  const [showSuffixChangeConfirmModal, setShowSuffixChangeConfirmModal] = useState(false);
  const [suffixConfirmAction, setSuffixConfirmAction] = useState('renameOnly');
  const [showCloseFileConfirmModal, setShowCloseFileConfirmModal] = useState(false);
  const [pendingCloseTabId, setPendingCloseTabId] = useState<string | null>(null);
  const [showOverwriteCredsConfirmModal, setShowOverwriteCredsConfirmModal] = useState(false);
  const [showCoverChangeConfirmModal, setShowCoverChangeConfirmModal] = useState(false);
  const pendingCoverSaveRef = useRef<any>(null);
  const [pendingWebAuthnSave, setPendingWebAuthnSave] = useState<any>(null);
  const [pendingPasswordSave, setPendingPasswordSave] = useState<any>(null);
  const [showDownloadMethodModal, setShowDownloadMethodModal] = useState(false);
  const [downloadModalMode, setDownloadModalMode] = useState('default');
  const [showSaveSessionToNoteModal, setShowSaveSessionToNoteModal] = useState(false);
  const [saveSessionToNoteSelectPath, setSaveSessionToNoteSelectPath] = useState<any>(null);
  const [isSavingSessionToNote, setIsSavingSessionToNote] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [downloadResultModal, setDownloadResultModal] = useState({
    isOpen: false,
    title: '',
    message: '',
  });
  const [addToNoteSelectPath, setAddToNoteSelectPath] = useState<any>(null);
  const [webauthnPRFSupported, setWebauthnPRFSupported] = useState(false);
  const [webauthnAvailable, setWebauthnAvailable] = useState(false);

  const closeDownloadResultModal = useCallback(() => {
    setDownloadResultModal({ isOpen: false, title: '', message: '' });
  }, []);

  const openUnsupportedFolderDownloadModal = useCallback(() => {
    setDownloadResultModal({
      isOpen: true,
      title: '폴더 다운로드',
      message: '이 브라우저에서 폴더 다운로드는 지원하지 않습니다',
    });
  }, []);

  const triggerBlobDownload = useCallback((blob: Blob, fileName: string) => {
    return triggerAppBlobDownload(blob, fileName);
  }, []);

  const value = useMemo(
    () => ({
      showRestoreLocalFolderModal,
      setShowRestoreLocalFolderModal,
      pendingLocalFolderName,
      setPendingLocalFolderName,
      localFolderRestoreSettled,
      setLocalFolderRestoreSettled,
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
      addToNoteSelectPath,
      setAddToNoteSelectPath,
      webauthnPRFSupported,
      setWebauthnPRFSupported,
      webauthnAvailable,
      setWebauthnAvailable,
    }),
    [
      showRestoreLocalFolderModal,
      pendingLocalFolderName,
      localFolderRestoreSettled,
      showExportPasswordModal,
      showImportPasswordModal,
      importFileContent,
      showSaveMethodModal,
      saveMethodModalCreds,
      showUnsavedConfirmModal,
      showSuffixChangeConfirmModal,
      suffixConfirmAction,
      showCloseFileConfirmModal,
      pendingCloseTabId,
      showOverwriteCredsConfirmModal,
      showCoverChangeConfirmModal,
      pendingWebAuthnSave,
      pendingPasswordSave,
      showDownloadMethodModal,
      downloadModalMode,
      showSaveSessionToNoteModal,
      saveSessionToNoteSelectPath,
      isSavingSessionToNote,
      downloadProgress,
      downloadComplete,
      downloadResultModal,
      closeDownloadResultModal,
      openUnsupportedFolderDownloadModal,
      triggerBlobDownload,
      addToNoteSelectPath,
      webauthnPRFSupported,
      webauthnAvailable,
    ],
  );

  return (
    <ModalsOwnedContext.Provider value={value}>{children}</ModalsOwnedContext.Provider>
  );
}

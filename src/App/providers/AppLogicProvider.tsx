import { useMemo, type ReactNode } from 'react';
import { AppBootstrapProvider } from '@/App/providers/AppBootstrapProvider';
import { AutoSaveProvider } from '@/App/providers/AutoSaveProvider';
import { AppModalsProvider } from '@/App/providers/AppModalsProvider';
import { AppShellContext } from '@/App/context/AppShellContext';
import { useAutoSave } from '@/App/hooks/useAutoSave';
import { useAppBootstrap } from '@/App/hooks/useAppBootstrap';
import { useAppOrchestration } from '@/App/providers/useAppOrchestration';

function AppShellMerge({
  controller,
  children,
}: {
  controller: Record<string, unknown>;
  children: ReactNode;
}) {
  const autoSave = useAutoSave();
  const bootstrap = useAppBootstrap();
  const value = useMemo(
    () => ({
      ...controller,
      ...autoSave,
      theme: bootstrap.theme,
      setTheme: bootstrap.setTheme,
      scriptsLoaded: bootstrap.scriptsLoaded,
      shareBlockingAuth: bootstrap.shareBlockingAuth,
      setShareBlockingAuth: bootstrap.setShareBlockingAuth,
    }),
    [controller, autoSave, bootstrap],
  );
  return <AppShellContext.Provider value={value}>{children}</AppShellContext.Provider>;
}

/**
 * Runs cross-domain orchestration (handlers still in useAppOrchestration) and fans out
 * typed domain slices. Domain React state lives in *StateProvider / RecordingProvider wrappers.
 */
export function AppLogicProvider({ children }: { children: ReactNode }) {
  const c = useAppOrchestration() as Record<string, any>;

  const bootstrapLogic = useMemo(
    () => ({
      showAuthModal: c.showAuthModal,
      handleUnlock: c.handleUnlock,
      handleUnlockWithWebAuthn: c.handleUnlockWithWebAuthn,
      canUnlockWithWebAuthnForModal: c.canUnlockWithWebAuthnForModal,
      autoPromptWebAuthnForModal: c.autoPromptWebAuthnForModal,
      proceedWithoutStoredCreds: c.proceedWithoutStoredCreds,
      fileInputRef: c.fileInputRef,
      openSettingsWorkspaceTab: c.openSettingsWorkspaceTab,
    }),
    [c],
  );

  const modals = useMemo(
    () => ({
      showSaveMethodModal: c.showSaveMethodModal,
      setShowSaveMethodModal: c.setShowSaveMethodModal,
      saveMethodModalCreds: c.saveMethodModalCreds,
      setSaveMethodModalCreds: c.setSaveMethodModalCreds,
      webauthnPRFSupported: c.webauthnPRFSupported,
      handleSaveWithWebAuthn: c.handleSaveWithWebAuthn,
      handleSaveWithPasswordFromModal: c.handleSaveWithPasswordFromModal,
      showSetPasswordModal: c.showSetPasswordModal,
      setShowSetPasswordModal: c.setShowSetPasswordModal,
      masterPassword: c.masterPassword,
      requestSaveEncryptedSettings: c.requestSaveEncryptedSettings,
      s3Creds: c.s3Creds,
      showCoverChangeConfirmModal: c.showCoverChangeConfirmModal,
      setShowCoverChangeConfirmModal: c.setShowCoverChangeConfirmModal,
      pendingCoverSaveRef: c.pendingCoverSaveRef,
      showRestoreLocalFolderModal: c.showRestoreLocalFolderModal,
      setShowRestoreLocalFolderModal: c.setShowRestoreLocalFolderModal,
      pendingLocalFolderName: c.pendingLocalFolderName,
      handleConfirmRestoreLocalFolder: c.handleConfirmRestoreLocalFolder,
      setLocalFolderRestoreSettled: c.setLocalFolderRestoreSettled,
      showAppUpdateConfirmModal: c.showAppUpdateConfirmModal,
      setShowAppUpdateConfirmModal: c.setShowAppUpdateConfirmModal,
      appBuildLocalId: c.appBuildLocalId,
      appBuildRemoteId: c.appBuildRemoteId,
      appUpdateCheckError: c.appUpdateCheckError,
      appUpdateAvailable: c.appUpdateAvailable,
      isApplyingPwaUpdate: c.isApplyingPwaUpdate,
      handleConfirmAppUpdate: c.handleConfirmAppUpdate,
      showOverwriteCredsConfirmModal: c.showOverwriteCredsConfirmModal,
      setShowOverwriteCredsConfirmModal: c.setShowOverwriteCredsConfirmModal,
      handleOverwriteCredsConfirm: c.handleOverwriteCredsConfirm,
      setPendingWebAuthnSave: c.setPendingWebAuthnSave,
      setPendingPasswordSave: c.setPendingPasswordSave,
      showUnsavedConfirmModal: c.showUnsavedConfirmModal,
      setShowUnsavedConfirmModal: c.setShowUnsavedConfirmModal,
      handleUnsavedConfirmLeave: c.handleUnsavedConfirmLeave,
      showSuffixChangeConfirmModal: c.showSuffixChangeConfirmModal,
      handleSuffixChangeConfirm: c.handleSuffixChangeConfirm,
      handleSuffixChangeCancel: c.handleSuffixChangeCancel,
      showCloseFileConfirmModal: c.showCloseFileConfirmModal,
      setShowCloseFileConfirmModal: c.setShowCloseFileConfirmModal,
      pendingCloseTabId: c.pendingCloseTabId,
      setPendingCloseTabId: c.setPendingCloseTabId,
      handleCloseFileConfirmSave: c.handleCloseFileConfirmSave,
      handleCloseFileConfirmDiscard: c.handleCloseFileConfirmDiscard,
      navGuard: c.navGuard,
      handleNavGuardConfirmSave: c.handleNavGuardConfirmSave,
      handleNavGuardConfirmDiscard: c.handleNavGuardConfirmDiscard,
      showExportPasswordModal: c.showExportPasswordModal,
      setShowExportPasswordModal: c.setShowExportPasswordModal,
      handleExportConfirm: c.handleExportConfirm,
      showImportPasswordModal: c.showImportPasswordModal,
      setShowImportPasswordModal: c.setShowImportPasswordModal,
      handleImportConfirm: c.handleImportConfirm,
      setImportFileContent: c.setImportFileContent,
      showDownloadMethodModal: c.showDownloadMethodModal,
      setShowDownloadMethodModal: c.setShowDownloadMethodModal,
      downloadModalMode: c.downloadModalMode,
      setDownloadModalMode: c.setDownloadModalMode,
      handleDownloadCurrentFile: c.handleDownloadCurrentFile,
      handleDownloadToFolder: c.handleDownloadToFolder,
      handleSelectHaimFromDownload: c.handleSelectHaimFromDownload,
      handleCopyCurrentFileToClipboard: c.handleCopyCurrentFileToClipboard,
      downloadProgress: c.downloadProgress,
      setDownloadProgress: c.setDownloadProgress,
      downloadComplete: c.downloadComplete,
      setDownloadComplete: c.setDownloadComplete,
      showSaveSessionToNoteModal: c.showSaveSessionToNoteModal,
      setShowSaveSessionToNoteModal: c.setShowSaveSessionToNoteModal,
      newFileDefaultParentPath: c.newFileDefaultParentPath,
      isSavingSessionToNote: c.isSavingSessionToNote,
      handleConfirmSaveSessionToNote: c.handleConfirmSaveSessionToNote,
      saveSessionToNoteSelectPath: c.saveSessionToNoteSelectPath,
      setSaveSessionToNoteSelectPath: c.setSaveSessionToNoteSelectPath,
      downloadResultModal: c.downloadResultModal,
      closeDownloadResultModal: c.closeDownloadResultModal,
      associatedRecordings: c.associatedRecordings,
      confirmDelete: c.confirmDelete,
      confirmEmptyTrash: c.confirmEmptyTrash,
      handleConfirmMoveFileFromSidebar: c.handleConfirmMoveFileFromSidebar,
      handleConfirmMove: c.handleConfirmMove,
      handleConfirmMoveFolder: c.handleConfirmMoveFolder,
      createModalTree: c.createModalTree,
      ensureCreateModalFolderLoaded: c.ensureCreateModalFolderLoaded,
      handleCreateItemSubmit: c.handleCreateItemSubmit,
    }),
    [c],
  );

  return (
    <AppBootstrapProvider logic={bootstrapLogic}>
      <AppModalsProvider value={modals}>
        <AutoSaveProvider>
          <AppShellMerge controller={c}>{children}</AppShellMerge>
        </AutoSaveProvider>
      </AppModalsProvider>
    </AppBootstrapProvider>
  );
}

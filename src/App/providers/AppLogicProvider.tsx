import { useMemo, type ReactNode } from 'react';
import { AppBootstrapProvider } from '@/App/providers/AppBootstrapProvider';
import { AutoSaveProvider } from '@/App/providers/AutoSaveProvider';
import { AppModalsProvider } from '@/App/providers/AppModalsProvider';
import { AppChromeProvider } from '@/App/providers/AppChromeProvider';
import { AppShellContext } from '@/App/context/AppShellContext';
import { AppHandlersContext } from '@/App/context/AppHandlersContext';
import type { AppChromeValue } from '@/App/context/AppChromeContext';
import { APP_HANDLER_KEYS } from '@/App/context/appHandlerKeys';
import { useAppOrchestration } from '@/App/providers/useAppOrchestration';

const CHROME_KEYS = [
  'sidebarOpen',
  'setSidebarOpen',
  'sidebarCollapsed',
  'setSidebarCollapsed',
  'isMobile',
  'chatSurfaceActive',
  'lockChatViewport',
  'isChatRoute',
  'isSettingsRoute',
  'appName',
  'handleBrandClick',
  'chatAttachDropHost',
  'setChatAttachDropHost',
  'handleDropToChatAttach',
  'handleRegisterChatAttachDrop',
  'fileTabContextMenuRef',
  'expandPathsRef',
  'showHiddenFolders',
  'showTrashFolder',
  'hideRecordingCompanions',
  'treeStickyFolderPathEnabled',
  'showTreeModifiedDate',
  'treeHoverExpandSettings',
  'setTreeHoverExpandSettings',
  'uploadFileInputRef',
  'uploadFolderInputRef',
  'handleUploadFileSelect',
  'handleUploadFolderSelect',
] as const;

function pickChrome(c: Record<string, any>): AppChromeValue {
  const chrome = {} as AppChromeValue;
  for (const key of CHROME_KEYS) {
    (chrome as any)[key] = c[key];
  }
  return chrome;
}

function pickHandlers(c: Record<string, any>): Record<string, any> {
  const handlers: Record<string, any> = {};
  for (const key of APP_HANDLER_KEYS) {
    handlers[key] = c[key];
  }
  return handlers;
}

function AppChromeAndHandlers({
  controller,
  children,
}: {
  controller: Record<string, any>;
  children: ReactNode;
}) {
  const chrome = useMemo(() => pickChrome(controller), [controller]);
  const handlers = useMemo(() => pickHandlers(controller), [controller]);

  return (
    <AppChromeProvider value={chrome}>
      <AppShellContext.Provider value={chrome}>
        <AppHandlersContext.Provider value={handlers}>
          {children}
        </AppHandlersContext.Provider>
      </AppShellContext.Provider>
    </AppChromeProvider>
  );
}

/**
 * Fans out modals + chrome/handlers. Vault/File/Tree contexts are owned above.
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
      handleSaveS3Creds: c.handleSaveS3Creds,
      handleExportCreds: c.handleExportCreds,
      handleImportCreds: c.handleImportCreds,
      handleSettingsClose: c.handleSettingsClose,
      webauthnPRFSupported: c.webauthnPRFSupported,
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
          <AppChromeAndHandlers controller={c}>{children}</AppChromeAndHandlers>
        </AutoSaveProvider>
      </AppModalsProvider>
    </AppBootstrapProvider>
  );
}

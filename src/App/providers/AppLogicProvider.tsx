import { useMemo, type ReactNode } from 'react';
import { AppBootstrapProvider } from '@/App/providers/AppBootstrapProvider';
import { AutoSaveProvider } from '@/App/providers/AutoSaveProvider';
import { AppModalsProvider } from '@/App/providers/AppModalsProvider';
import { AppChromeProvider } from '@/App/providers/AppChromeProvider';
import { RecordingToggleBridge } from '@/App/providers/RecordingProvider';
import type { AppChromeValue } from '@/App/context/AppChromeContext';
import {
  SessionWorkspaceContext,
  SESSION_WORKSPACE_KEYS,
  type SessionWorkspaceValue,
} from '@/App/context/SessionWorkspaceContext';
import {
  ChatIntegrationContext,
  CHAT_INTEGRATION_KEYS,
  type ChatIntegrationValue,
} from '@/App/context/ChatIntegrationContext';
import {
  AppEditorExtrasContext,
  APP_EDITOR_EXTRAS_KEYS,
  type AppEditorExtrasValue,
} from '@/App/context/AppEditorExtrasContext';
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
  'isContentSearchRoute',
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
  'operationStatus',
] as const;

function pickKeys<T extends Record<string, any>>(
  c: Record<string, any>,
  keys: readonly (keyof T)[],
): T {
  const out = {} as T;
  for (const key of keys) {
    (out as any)[key] = c[key as string];
  }
  return out;
}

function pickChrome(c: Record<string, any>): AppChromeValue {
  return pickKeys<AppChromeValue>(c, CHROME_KEYS);
}

function AppChromeAndThinContexts({
  controller,
  children,
}: {
  controller: Record<string, any>;
  children: ReactNode;
}) {
  const chrome = useMemo(() => pickChrome(controller), [controller]);
  const session = useMemo(
    () => pickKeys<SessionWorkspaceValue>(controller, SESSION_WORKSPACE_KEYS),
    [controller],
  );
  const chat = useMemo(
    () => pickKeys<ChatIntegrationValue>(controller, CHAT_INTEGRATION_KEYS),
    [controller],
  );
  const editorExtras = useMemo(
    () => pickKeys<AppEditorExtrasValue>(controller, APP_EDITOR_EXTRAS_KEYS),
    [controller],
  );

  return (
    <AppChromeProvider value={chrome}>
      <RecordingToggleBridge handleToggleRecording={controller.handleToggleRecording}>
        <SessionWorkspaceContext.Provider value={session}>
          <ChatIntegrationContext.Provider value={chat}>
            <AppEditorExtrasContext.Provider value={editorExtras}>
              {children}
            </AppEditorExtrasContext.Provider>
          </ChatIntegrationContext.Provider>
        </SessionWorkspaceContext.Provider>
      </RecordingToggleBridge>
    </AppChromeProvider>
  );
}

/**
 * Fans out modals + chrome + thin domain contexts. Vault/File/Tree contexts are owned above.
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
      setShowSuffixChangeConfirmModal: c.setShowSuffixChangeConfirmModal,
      setSuffixConfirmAction: c.setSuffixConfirmAction,
      handleSuffixChangeConfirm: c.handleSuffixChangeConfirm,
      handleSuffixChangeCancel: c.handleSuffixChangeCancel,
      addToNoteSelectPath: c.addToNoteSelectPath,
      setAddToNoteSelectPath: c.setAddToNoteSelectPath,
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
          <AppChromeAndThinContexts controller={c}>{children}</AppChromeAndThinContexts>
        </AutoSaveProvider>
      </AppModalsProvider>
    </AppBootstrapProvider>
  );
}

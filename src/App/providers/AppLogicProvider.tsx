import { useMemo, type ReactNode } from 'react';
import { AppBootstrapProvider } from '@/App/providers/AppBootstrapProvider';
import { VaultProvider } from '@/App/providers/VaultProvider';
import { FileSessionProvider } from '@/App/providers/FileSessionProvider';
import { TreeOpsProvider } from '@/App/providers/TreeOpsProvider';
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

  const vault = useMemo(
    () => ({
      storageMode: c.storageMode,
      setStorageMode: c.setStorageMode,
      s3Tree: c.s3Tree,
      localTree: c.localTree,
      webdavTree: c.webdavTree,
      sessionWorkspace: c.sessionWorkspace,
      localRootHandle: c.localRootHandle,
      localVaultFsPath: c.localVaultFsPath,
      webdavConfig: c.webdavConfig,
      setWebdavConfig: c.setWebdavConfig,
      isLocalTreeLoading: c.isLocalTreeLoading,
      isWebdavTreeLoading: c.isWebdavTreeLoading,
      localFolderLoadingPath: c.localFolderLoadingPath,
      webdavFolderLoadingPath: c.webdavFolderLoadingPath,
      getBackendForType: c.getBackendForType,
      getS3Client: c.getS3Client,
      loadS3Files: c.loadS3Files,
      refreshLocalTree: c.refreshLocalTree,
      refreshWebdavTree: c.refreshWebdavTree,
      loadLocalFolderChildren: c.loadLocalFolderChildren,
      loadWebdavFolderChildren: c.loadWebdavFolderChildren,
      openLocalFolder: c.openLocalFolder,
      webdavReady: c.webdavReady,
    }),
    [c],
  );

  const fileSession = useMemo(
    () => ({
      currentFile: c.currentFile,
      setCurrentFile: c.setCurrentFile,
      editorContent: c.editorContent,
      setEditorContent: c.setEditorContent,
      editorContentRef: c.editorContentRef,
      prevEditorContentRef: c.prevEditorContentRef,
      currentFileRef: c.currentFileRef,
      editedFileName: c.editedFileName,
      setEditedFileName: c.setEditedFileName,
      saveFile: c.saveFile,
      isSaving: c.isSaving,
      savingTabIds: c.savingTabIds,
      editorType: c.editorType,
      handleEditorTypeChange: c.handleEditorTypeChange,
      isRefreshingFromDisk: c.isRefreshingFromDisk,
      isPullingFromRemote: c.isPullingFromRemote,
      refreshLocalFileFromDisk: c.refreshLocalFileFromDisk,
      refreshRemoteFile: c.refreshRemoteFile,
      handleRequestCloseEditor: c.handleRequestCloseEditor,
      openAdvancedSearchFile: c.openAdvancedSearchFile,
      encMdPrompt: c.encMdPrompt,
    }),
    [c],
  );

  const treeOps = useMemo(
    () => ({
      selectedIds: c.selectedIds,
      setSelectedIds: c.setSelectedIds,
      deleteTarget: c.deleteTarget,
      setDeleteTarget: c.setDeleteTarget,
      emptyTrashTarget: c.emptyTrashTarget,
      setEmptyTrashTarget: c.setEmptyTrashTarget,
      createModalOpen: c.createModalOpen,
      setCreateModalOpen: c.setCreateModalOpen,
      createModalContext: c.createModalContext,
      setCreateModalContext: c.setCreateModalContext,
      requestCreateItem: c.requestCreateItem,
      requestNewFile: c.requestNewFile,
      requestUploadFile: c.requestUploadFile,
      requestUploadFolder: c.requestUploadFolder,
      handleTreeNodeSelect: c.handleTreeNodeSelect,
      handleDragEndNode: c.handleDragEndNode,
      handleDropOnFolder: c.handleDropOnFolder,
      handleDownloadNode: c.handleDownloadNode,
      handleDuplicateNode: c.handleDuplicateNode,
      renameTreeItem: c.renameTreeItem,
      dropTarget: c.dropTarget,
      treeNameConflict: c.treeNameConflict,
      settleTreeNameConflict: c.settleTreeNameConflict,
      treeTransferBusy: c.treeTransferBusy,
      isDeleting: c.isDeleting,
      isDeletingFolder: c.isDeletingFolder,
      deletingFolderPath: c.deletingFolderPath,
      isEmptyingTrash: c.isEmptyingTrash,
      isCreateSubmitting: c.isCreateSubmitting,
      isMoveModalOpen: c.isMoveModalOpen,
      setIsMoveModalOpen: c.setIsMoveModalOpen,
      moveFileTarget: c.moveFileTarget,
      setMoveFileTarget: c.setMoveFileTarget,
      moveFolderTarget: c.moveFolderTarget,
      setMoveFolderTarget: c.setMoveFolderTarget,
      moveModalSelectPath: c.moveModalSelectPath,
      setMoveModalSelectPath: c.setMoveModalSelectPath,
      handleRequestMoveFolder: c.handleRequestMoveFolder,
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
      <VaultProvider value={vault}>
        <FileSessionProvider value={fileSession}>
          <TreeOpsProvider value={treeOps}>
            <AppModalsProvider value={modals}>
              <AutoSaveProvider>
                <AppShellMerge controller={c}>{children}</AppShellMerge>
              </AutoSaveProvider>
            </AppModalsProvider>
          </TreeOpsProvider>
        </FileSessionProvider>
      </VaultProvider>
    </AppBootstrapProvider>
  );
}

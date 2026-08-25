// @ts-nocheck — domain fan-out from useMainAppController
import { useMemo, type ReactNode } from 'react';
import { AppBootstrapProvider } from '@/App/providers/AppBootstrapProvider';
import { VaultProvider } from '@/App/providers/VaultProvider';
import { FileSessionProvider } from '@/App/providers/FileSessionProvider';
import { TreeOpsProvider } from '@/App/providers/TreeOpsProvider';
import { AutoSaveProvider } from '@/App/providers/AutoSaveProvider';
import { AppShellContext } from '@/App/context/AppShellContext';
import { WorkspaceTabsContext } from '@/App/context/WorkspaceTabsContext';
import { useWorkspaceTabsCtx } from '@/App/hooks/useWorkspaceTabsCtx';
import { useMainAppController } from '@/App/providers/useMainAppController';

/**
 * Runs the main app controller (inside WorkspaceTabsProvider) and fans out
 * domain slices into Bootstrap / Vault / FileSession / TreeOps / AutoSave contexts.
 */
export function AppLogicProvider({ children }: { children: ReactNode }) {
  const tabs = useWorkspaceTabsCtx();
  const c = useMainAppController();

  const bootstrap = useMemo(
    () => ({
      scriptsLoaded: c.scriptsLoaded,
      theme: c.theme,
      setTheme: c.setTheme,
      shareBlockingAuth: c.shareBlockingAuth,
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
      moveFolderTarget: c.moveFolderTarget,
      moveModalSelectPath: c.moveModalSelectPath,
    }),
    [c],
  );

  const autoSave = useMemo(
    () => ({
      handleEditorChange: c.handleEditorChange,
      lastInputAt: c.lastInputAt,
      lastAutoSaveAt: c.lastAutoSaveAt,
      lastAutoSyncAt: c.lastAutoSyncAt,
      autoSaveIndicatorClass: c.autoSaveIndicatorClass,
    }),
    [c],
  );

  const tabsWithActions = useMemo(
    () => ({
      ...tabs,
      activateWorkspaceTab: c.activateWorkspaceTab,
      closeWorkspaceTabById: c.closeWorkspaceTabById,
      openChatWorkspaceTab: c.openChatWorkspaceTab,
      openSettingsWorkspaceTab: c.openSettingsWorkspaceTab,
      reorderWorkspaceTabs: c.reorderWorkspaceTabs,
    }),
    [
      tabs,
      c.activateWorkspaceTab,
      c.closeWorkspaceTabById,
      c.openChatWorkspaceTab,
      c.openSettingsWorkspaceTab,
      c.reorderWorkspaceTabs,
    ],
  );

  return (
    <AppBootstrapProvider value={bootstrap}>
      <VaultProvider value={vault}>
        <WorkspaceTabsContext.Provider value={tabsWithActions}>
          <FileSessionProvider value={fileSession}>
            <TreeOpsProvider value={treeOps}>
              <AutoSaveProvider value={autoSave}>
                <AppShellContext.Provider value={c}>{children}</AppShellContext.Provider>
              </AutoSaveProvider>
            </TreeOpsProvider>
          </FileSessionProvider>
        </WorkspaceTabsContext.Provider>
      </VaultProvider>
    </AppBootstrapProvider>
  );
}

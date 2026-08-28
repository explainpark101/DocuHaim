import Sidebar, { type SidebarProps } from '@/components/shell/Sidebar';
import { useVault } from '@/App/hooks/useVault';
import { useTreeOps } from '@/App/hooks/useTreeOps';
import { useFileSession } from '@/App/hooks/useFileSession';
import { useAppBootstrap } from '@/App/hooks/useAppBootstrap';
import { buildSessionTree } from '@/utils/sessionWorkspace';

export type ChromeProps = Pick<
  SidebarProps,
  | 'isMobileLayout'
  | 'appName'
  | 's3Bucket'
  | 'showHiddenFolders'
  | 'showTrashFolder'
  | 'hideRecordingCompanions'
  | 'treeStickyFolderPathEnabled'
  | 'showTreeModifiedDate'
  | 'hoverExpandDelayMs'
  | 'fileTabContextMenuRef'
> & {
  onBrandClick?: SidebarProps['onBrandClick'];
  onOpenSettings?: SidebarProps['onOpenSettings'];
  onRequestCollapseSidebar?: SidebarProps['onRequestCollapseSidebar'];
  onRequestCloseSidebar?: SidebarProps['onRequestCloseSidebar'];
  expandPathsRef?: SidebarProps['expandPathsRef'];
  onRequestMoveFile?: SidebarProps['onRequestMoveFile'];
  onOpenInNewWindow?: SidebarProps['onOpenInNewWindow'];
  onShareToChatWithMyself?: SidebarProps['onShareToChatWithMyself'];
  onOpenChatWithMyself?: SidebarProps['onOpenChatWithMyself'];
  chatSurfaceActive?: boolean;
  chatAttachDropHost?: SidebarProps['chatAttachDropHost'];
  onDropToChatAttach?: SidebarProps['onDropToChatAttach'];
  onCloseSessionWorkspace?: SidebarProps['onCloseSessionWorkspace'];
};

/**
 * Sidebar wired to Vault / TreeOps / FileSession / Bootstrap contexts.
 * AppLayout only passes chrome + cross-domain action handlers.
 */
export default function SidebarConnected(props: ChromeProps) {
  const vault = useVault();
  const treeOps = useTreeOps();
  const file = useFileSession();
  const bootstrap = useAppBootstrap();

  const {
    chatSurfaceActive,
    ...chrome
  } = props;

  return (
    <Sidebar
      {...({
        ...chrome,
        storageMode: vault.storageMode,
        onStorageModeChange: vault.setStorageMode,
        s3Tree: vault.s3Tree,
        localTree: vault.localTree,
        localRootHandle: vault.localRootHandle,
        localVaultFsPath: vault.localVaultFsPath,
        isLocalTreeLoading: vault.isLocalTreeLoading,
        localFolderLoadingPath: vault.localFolderLoadingPath,
        webdavTree: vault.webdavTree,
        webdavReady: vault.webdavReady,
        isWebdavTreeLoading: vault.isWebdavTreeLoading,
        webdavFolderLoadingPath: vault.webdavFolderLoadingPath,
        onLoadWebdavFolderChildren: vault.loadWebdavFolderChildren,
        onRefreshWebdav: vault.refreshWebdavTree,
        onLoadLocalFolderChildren: vault.loadLocalFolderChildren,
        onRefreshLocal: vault.refreshLocalTree,
        onOpenLocalFolder: vault.openLocalFolder,
        onRefreshS3: vault.loadS3Files,
        sessionWorkspace: vault.sessionWorkspace,
        sessionTree:
          vault.sessionWorkspace ? buildSessionTree(vault.sessionWorkspace) : [],
        currentFile: file.currentFile,
        selectedIds: treeOps.selectedIds,
        onSelectFile: treeOps.handleTreeNodeSelect,
        onClearSelection: () => treeOps.setSelectedIds(new Set()),
        onCreateItem: treeOps.requestCreateItem,
        onRequestUploadFile: treeOps.requestUploadFile,
        onRequestUploadFolder: treeOps.requestUploadFolder,
        onRequestMoveFolder: treeOps.handleRequestMoveFolder,
        onDropOnFolder: treeOps.handleDropOnFolder,
        onDragEndNode: treeOps.handleDragEndNode,
        dropTarget: treeOps.dropTarget,
        transferBusyItems: treeOps.treeTransferBusy,
        onSetDeleteTarget: treeOps.setDeleteTarget,
        onRequestEmptyTrash: (_node, storageType) => {
          treeOps.setEmptyTrashTarget({ storageType });
        },
        onRenameItem: treeOps.renameTreeItem,
        deletingFolderPath: treeOps.deletingFolderPath,
        isDeletingFolder: treeOps.isDeletingFolder,
        onDownloadNode: treeOps.handleDownloadNode,
        onDuplicateNode: treeOps.handleDuplicateNode,
        theme: bootstrap.theme,
        onToggleTheme: () =>
          bootstrap.setTheme(bootstrap.theme === 'dark' ? 'light' : 'dark'),
        chatWithMyselfActive: Boolean(chatSurfaceActive),
      } as SidebarProps)}
    />
  );
}

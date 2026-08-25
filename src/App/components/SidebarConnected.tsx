/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck — connects shell Sidebar to domain contexts
import Sidebar from '@/components/shell/Sidebar.jsx';
import { useVault } from '@/App/hooks/useVault';
import { useTreeOps } from '@/App/hooks/useTreeOps';
import { useFileSession } from '@/App/hooks/useFileSession';
import { useAppBootstrap } from '@/App/hooks/useAppBootstrap';
import { buildSessionTree } from '@/utils/sessionWorkspace';

type ChromeProps = {
  isMobileLayout?: boolean;
  fileTabContextMenuRef?: any;
  appName?: string;
  onBrandClick?: (...args: any[]) => any;
  s3Bucket?: string;
  onOpenSettings?: (...args: any[]) => any;
  showHiddenFolders?: boolean;
  showTrashFolder?: boolean;
  hideRecordingCompanions?: boolean;
  treeStickyFolderPathEnabled?: boolean;
  showTreeModifiedDate?: boolean;
  hoverExpandDelayMs?: number;
  onRequestCollapseSidebar?: (...args: any[]) => any;
  expandPathsRef?: any;
  onRequestMoveFile?: (...args: any[]) => any;
  onOpenInNewWindow?: (...args: any[]) => any;
  onShareToChatWithMyself?: (...args: any[]) => any;
  onOpenChatWithMyself?: (...args: any[]) => any;
  chatSurfaceActive?: boolean;
  chatAttachDropHost?: any;
  onDropToChatAttach?: (...args: any[]) => any;
  onCloseSessionWorkspace?: (...args: any[]) => any;
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
      {...chrome}
      storageMode={vault.storageMode}
      onStorageModeChange={vault.setStorageMode}
      s3Tree={vault.s3Tree}
      localTree={vault.localTree}
      localRootHandle={vault.localRootHandle}
      localVaultFsPath={vault.localVaultFsPath}
      isLocalTreeLoading={vault.isLocalTreeLoading}
      localFolderLoadingPath={vault.localFolderLoadingPath}
      webdavTree={vault.webdavTree}
      webdavReady={vault.webdavReady}
      isWebdavTreeLoading={vault.isWebdavTreeLoading}
      webdavFolderLoadingPath={vault.webdavFolderLoadingPath}
      onLoadWebdavFolderChildren={vault.loadWebdavFolderChildren}
      onRefreshWebdav={vault.refreshWebdavTree}
      onLoadLocalFolderChildren={vault.loadLocalFolderChildren}
      onRefreshLocal={vault.refreshLocalTree}
      onOpenLocalFolder={vault.openLocalFolder}
      onRefreshS3={vault.loadS3Files}
      sessionWorkspace={vault.sessionWorkspace}
      sessionTree={
        vault.sessionWorkspace ? buildSessionTree(vault.sessionWorkspace) : []
      }
      currentFile={file.currentFile}
      selectedIds={treeOps.selectedIds}
      onSelectFile={treeOps.handleTreeNodeSelect}
      onClearSelection={() => treeOps.setSelectedIds(new Set())}
      onCreateItem={treeOps.requestCreateItem}
      onRequestUploadFile={treeOps.requestUploadFile}
      onRequestUploadFolder={treeOps.requestUploadFolder}
      onRequestMoveFolder={treeOps.handleRequestMoveFolder}
      onDropOnFolder={treeOps.handleDropOnFolder}
      onDragEndNode={treeOps.handleDragEndNode}
      dropTarget={treeOps.dropTarget}
      transferBusyItems={treeOps.treeTransferBusy}
      onSetDeleteTarget={treeOps.setDeleteTarget}
      onRequestEmptyTrash={(_node: any, storageType: string) => {
        treeOps.setEmptyTrashTarget({ storageType });
      }}
      onRenameItem={treeOps.renameTreeItem}
      deletingFolderPath={treeOps.deletingFolderPath}
      isDeletingFolder={treeOps.isDeletingFolder}
      onDownloadNode={treeOps.handleDownloadNode}
      onDuplicateNode={treeOps.handleDuplicateNode}
      theme={bootstrap.theme}
      onToggleTheme={() =>
        bootstrap.setTheme(bootstrap.theme === 'dark' ? 'light' : 'dark')
      }
      chatWithMyselfActive={Boolean(chatSurfaceActive)}
    />
  );
}

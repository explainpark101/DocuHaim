/* eslint-disable @typescript-eslint/no-explicit-any */
import Sidebar from '@/components/shell/Sidebar.jsx';
import { useVault } from '@/App/hooks/useVault';
import { useTreeOps } from '@/App/hooks/useTreeOps';
import { useFileSession } from '@/App/hooks/useFileSession';
import { useAppBootstrap } from '@/App/hooks/useAppBootstrap';
import { buildSessionTree } from '@/utils/vault/sessionWorkspace';

/** Untyped Sidebar.jsx — accept wide props until Sidebar is typed. */
const SidebarAny = Sidebar as any;

export type ChromeProps = {
  isMobileLayout?: boolean | undefined;
  fileTabContextMenuRef?: any;
  appName?: string | undefined;
  onBrandClick?: ((...args: any[]) => any) | undefined;
  s3Bucket?: string | undefined;
  onOpenSettings?: ((...args: any[]) => any) | undefined;
  showHiddenFolders?: boolean | undefined;
  showTrashFolder?: boolean | undefined;
  hideRecordingCompanions?: boolean | undefined;
  treeStickyFolderPathEnabled?: boolean | undefined;
  showTreeModifiedDate?: boolean | undefined;
  hoverExpandDelayMs?: number | undefined;
  onRequestCollapseSidebar?: ((...args: any[]) => any) | undefined;
  expandPathsRef?: any;
  onRequestMoveFile?: ((...args: any[]) => any) | undefined;
  onOpenInNewWindow?: ((...args: any[]) => any) | undefined;
  onShareToChatWithMyself?: ((...args: any[]) => any) | undefined;
  onOpenChatWithMyself?: ((...args: any[]) => any) | undefined;
  chatSurfaceActive?: boolean | undefined;
  chatAttachDropHost?: any;
  onDropToChatAttach?: ((...args: any[]) => any) | undefined;
  onCloseSessionWorkspace?: ((...args: any[]) => any) | undefined;
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
    <SidebarAny
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

import {
  useMemo,
  type ReactNode,
} from 'react';
import { TreeOpsContext } from '@/App/context/TreeOpsContext';
import { useTreeOpsOwned } from '@/App/providers/AppTreeOpsStateProvider';
import { useTreeOpsDomain } from '@/App/hooks/useTreeOpsDomain';

type Props = { children: ReactNode };

/**
 * Owns tree-ops context + CRUD/DnD/select actions (useTreeOpsDomain).
 */
export function TreeOpsProvider({ children }: Props) {
  const owned = useTreeOpsOwned();
  const domain = useTreeOpsDomain();

  const value = useMemo(
    () => ({
      ...owned,
      requestCreateItem: domain.requestCreateItem,
      requestNewFile: domain.requestNewFile,
      requestAdvancedSearchCreateItem: domain.requestAdvancedSearchCreateItem,
      requestCreateFileWithContent: domain.requestCreateFileWithContent,
      newFileDefaultParentPath: domain.newFileDefaultParentPath,
      requestUploadFile: domain.requestUploadFile,
      requestUploadFolder: domain.requestUploadFolder,
      handleUploadFileSelect: domain.handleUploadFileSelect,
      handleUploadFolderSelect: domain.handleUploadFolderSelect,
      handleRequestMoveFileFromSidebar: domain.handleRequestMoveFileFromSidebar,
      handleConfirmMoveFileFromSidebar: domain.handleConfirmMoveFileFromSidebar,
      handleRequestMove: domain.handleRequestMove,
      handleConfirmMove: domain.handleConfirmMove,
      handleConfirmMoveFolder: domain.handleConfirmMoveFolder,
      confirmDelete: domain.confirmDelete,
      confirmEmptyTrash: domain.confirmEmptyTrash,
      associatedRecordings: domain.associatedRecordings,
      applyWorkspaceFilePathRetarget: domain.applyWorkspaceFilePathRetarget,
      applyWorkspaceFolderPathRetarget: domain.applyWorkspaceFolderPathRetarget,
      handleTreeNodeSelect: domain.handleTreeNodeSelect,
      handleDragEndNode: domain.handleDragEndNode,
      handleDropOnFolder: domain.handleDropOnFolder,
      handleDownloadNode: domain.handleDownloadNode,
      handleDuplicateNode: domain.handleDuplicateNode,
      renameTreeItem: domain.renameTreeItem,
      settleTreeNameConflict: domain.settleTreeNameConflict,
      askTreeNameConflict: domain.askTreeNameConflict,
      askUploadNameConflict: domain.askUploadNameConflict,
      getUploadTreeForStorage: domain.getUploadTreeForStorage,
      loadFileCompareForDest: domain.loadFileCompareForDest,
      handleRequestMoveFolder: domain.handleRequestMoveFolder,
      handleCreateItemSubmit: domain.handleCreateItemSubmit,
      beginTreeTransferBusy: domain.beginTreeTransferBusy,
      endTreeTransferBusy: domain.endTreeTransferBusy,
      reloadOpenFileIfPath: domain.reloadOpenFileIfPath,
      moveS3FileToFolder: domain.moveS3FileToFolder,
      moveLocalFileToFolder: domain.moveLocalFileToFolder,
      moveS3FolderToFolder: domain.moveS3FolderToFolder,
      moveLocalFolderToFolder: domain.moveLocalFolderToFolder,
      moveWebdavFileToFolder: domain.moveWebdavFileToFolder,
      moveWebdavFolderToFolder: domain.moveWebdavFolderToFolder,
      copyS3FileToFolder: domain.copyS3FileToFolder,
      copyLocalFileToFolder: domain.copyLocalFileToFolder,
      copyS3FolderToFolder: domain.copyS3FolderToFolder,
      copyLocalFolderToFolder: domain.copyLocalFolderToFolder,
      copyWebdavFileToFolder: domain.copyWebdavFileToFolder,
      copyWebdavFolderToFolder: domain.copyWebdavFolderToFolder,
      lastSelectedIdRef: domain.lastSelectedIdRef,
      toSelectKey: domain.toSelectKey,
    }),
    [owned, domain],
  );

  return <TreeOpsContext.Provider value={value}>{children}</TreeOpsContext.Provider>;
}

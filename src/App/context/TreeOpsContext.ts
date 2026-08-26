import { createContext } from 'react';

/** §6 tree CRUD / DnD / upload / download. */
export type TreeOpsValue = {
  selectedIds: Set<string>;
  setSelectedIds: (...args: any[]) => any;
  deleteTarget: any;
  setDeleteTarget: (...args: any[]) => any;
  emptyTrashTarget: any;
  setEmptyTrashTarget: (...args: any[]) => any;
  createModalOpen: boolean;
  setCreateModalOpen: (...args: any[]) => any;
  createModalContext: any;
  setCreateModalContext: (...args: any[]) => any;
  requestCreateItem: (...args: any[]) => any;
  requestNewFile: (...args: any[]) => any;
  requestAdvancedSearchCreateItem: (...args: any[]) => any;
  newFileDefaultParentPath: string;
  requestUploadFile: (...args: any[]) => any;
  requestUploadFolder: (...args: any[]) => any;
  handleUploadFileSelect: (...args: any[]) => any;
  handleUploadFolderSelect: (...args: any[]) => any;
  handleRequestMoveFileFromSidebar: (...args: any[]) => any;
  handleConfirmMoveFileFromSidebar: (...args: any[]) => any;
  handleRequestMove: (...args: any[]) => any;
  handleConfirmMove: (...args: any[]) => any;
  handleConfirmMoveFolder: (...args: any[]) => any;
  confirmDelete: (...args: any[]) => any;
  confirmEmptyTrash: (...args: any[]) => any;
  associatedRecordings: any[];
  applyWorkspaceFilePathRetarget: (...args: any[]) => any;
  applyWorkspaceFolderPathRetarget: (...args: any[]) => any;
  handleTreeNodeSelect: (...args: any[]) => any;
  handleDragEndNode: (...args: any[]) => any;
  handleDropOnFolder: (...args: any[]) => any;
  handleDownloadNode: (...args: any[]) => any;
  handleDuplicateNode: (...args: any[]) => any;
  renameTreeItem: (...args: any[]) => any;
  dropTarget: any;
  treeNameConflict: any;
  settleTreeNameConflict: (...args: any[]) => any;
  askTreeNameConflict: (...args: any[]) => any;
  askUploadNameConflict: (...args: any[]) => any;
  getUploadTreeForStorage: (...args: any[]) => any;
  loadFileCompareForDest: (...args: any[]) => any;
  treeTransferBusy: any[];
  isDeleting: boolean;
  isDeletingFolder: boolean;
  deletingFolderPath: string | null;
  isEmptyingTrash: boolean;
  isCreateSubmitting: boolean;
  isMoveModalOpen: boolean;
  setIsMoveModalOpen: (...args: any[]) => any;
  moveFileTarget: any;
  setMoveFileTarget: (...args: any[]) => any;
  moveFolderTarget: any;
  setMoveFolderTarget: (...args: any[]) => any;
  moveModalSelectPath: any;
  setMoveModalSelectPath: (...args: any[]) => any;
  handleRequestMoveFolder: (...args: any[]) => any;
  handleCreateItemSubmit: (...args: any[]) => any;
  beginTreeTransferBusy: (...args: any[]) => any;
  endTreeTransferBusy: (...args: any[]) => any;
  reloadOpenFileIfPath: (...args: any[]) => any;
  moveS3FileToFolder: (...args: any[]) => any;
  moveLocalFileToFolder: (...args: any[]) => any;
  moveS3FolderToFolder: (...args: any[]) => any;
  moveLocalFolderToFolder: (...args: any[]) => any;
  moveWebdavFileToFolder: (...args: any[]) => any;
  moveWebdavFolderToFolder: (...args: any[]) => any;
  copyS3FileToFolder: (...args: any[]) => any;
  copyLocalFileToFolder: (...args: any[]) => any;
  copyS3FolderToFolder: (...args: any[]) => any;
  copyLocalFolderToFolder: (...args: any[]) => any;
  copyWebdavFileToFolder: (...args: any[]) => any;
  copyWebdavFolderToFolder: (...args: any[]) => any;
  lastSelectedIdRef: { current: any };
  toSelectKey: (storageType: string, path: string) => string;
};

/** Keys that TreeOpsProvider spreads from useTreeOpsDomain (excludes owned-only state). */
export type TreeOpsDomainValue = Pick<
  TreeOpsValue,
  | 'requestCreateItem'
  | 'requestNewFile'
  | 'requestAdvancedSearchCreateItem'
  | 'newFileDefaultParentPath'
  | 'requestUploadFile'
  | 'requestUploadFolder'
  | 'handleUploadFileSelect'
  | 'handleUploadFolderSelect'
  | 'handleRequestMoveFileFromSidebar'
  | 'handleConfirmMoveFileFromSidebar'
  | 'handleRequestMove'
  | 'handleConfirmMove'
  | 'handleConfirmMoveFolder'
  | 'confirmDelete'
  | 'confirmEmptyTrash'
  | 'associatedRecordings'
  | 'applyWorkspaceFilePathRetarget'
  | 'applyWorkspaceFolderPathRetarget'
  | 'handleTreeNodeSelect'
  | 'handleDragEndNode'
  | 'handleDropOnFolder'
  | 'handleDownloadNode'
  | 'handleDuplicateNode'
  | 'renameTreeItem'
  | 'settleTreeNameConflict'
  | 'askTreeNameConflict'
  | 'askUploadNameConflict'
  | 'getUploadTreeForStorage'
  | 'loadFileCompareForDest'
  | 'handleRequestMoveFolder'
  | 'handleCreateItemSubmit'
  | 'beginTreeTransferBusy'
  | 'endTreeTransferBusy'
  | 'reloadOpenFileIfPath'
  | 'moveS3FileToFolder'
  | 'moveLocalFileToFolder'
  | 'moveS3FolderToFolder'
  | 'moveLocalFolderToFolder'
  | 'moveWebdavFileToFolder'
  | 'moveWebdavFolderToFolder'
  | 'copyS3FileToFolder'
  | 'copyLocalFileToFolder'
  | 'copyS3FolderToFolder'
  | 'copyLocalFolderToFolder'
  | 'copyWebdavFileToFolder'
  | 'copyWebdavFolderToFolder'
  | 'lastSelectedIdRef'
  | 'toSelectKey'
>;

export const TreeOpsContext = createContext<TreeOpsValue | null>(null);

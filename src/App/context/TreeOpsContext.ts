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
  requestUploadFile: (...args: any[]) => any;
  requestUploadFolder: (...args: any[]) => any;
  handleTreeNodeSelect: (...args: any[]) => any;
  handleDragEndNode: (...args: any[]) => any;
  handleDropOnFolder: (...args: any[]) => any;
  handleDownloadNode: (...args: any[]) => any;
  handleDuplicateNode: (...args: any[]) => any;
  renameTreeItem: (...args: any[]) => any;
  dropTarget: any;
  treeNameConflict: any;
  settleTreeNameConflict: (...args: any[]) => any;
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
};

export const TreeOpsContext = createContext<TreeOpsValue | null>(null);

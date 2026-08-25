import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type TreeOpsOwnedApi = {
  selectedIds: Set<string>;
  setSelectedIds: (ids: Set<string> | ((prev: Set<string>) => Set<string>)) => void;
  deleteTarget: any;
  setDeleteTarget: (t: any | ((prev: any) => any)) => void;
  emptyTrashTarget: any;
  setEmptyTrashTarget: (t: any | ((prev: any) => any)) => void;
  isEmptyingTrash: boolean;
  setIsEmptyingTrash: (v: boolean | ((prev: boolean) => boolean)) => void;
  deletingFolderPath: string | null;
  setDeletingFolderPath: (p: string | null | ((prev: string | null) => string | null)) => void;
  isDeletingFolder: boolean;
  setIsDeletingFolder: (v: boolean | ((prev: boolean) => boolean)) => void;
  isDeleting: boolean;
  setIsDeleting: (v: boolean | ((prev: boolean) => boolean)) => void;
  isMoveModalOpen: boolean;
  setIsMoveModalOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  moveFolderTarget: any;
  setMoveFolderTarget: (t: any | ((prev: any) => any)) => void;
  moveFileTarget: any;
  setMoveFileTarget: (t: any | ((prev: any) => any)) => void;
  createModalOpen: boolean;
  setCreateModalOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  createModalContext: any;
  setCreateModalContext: (c: any | ((prev: any) => any)) => void;
  moveModalSelectPath: any;
  setMoveModalSelectPath: (p: any | ((prev: any) => any)) => void;
  isCreateSubmitting: boolean;
  setIsCreateSubmitting: (v: boolean | ((prev: boolean) => boolean)) => void;
  dropTarget: any;
  setDropTarget: (t: any | ((prev: any) => any)) => void;
  treeNameConflict: any;
  setTreeNameConflict: (t: any | ((prev: any) => any)) => void;
  treeTransferBusy: any[];
  setTreeTransferBusy: (b: any[] | ((prev: any[]) => any[])) => void;
  uploadTarget: any;
  setUploadTarget: (t: any | ((prev: any) => any)) => void;
};

const TreeOpsOwnedContext = createContext<TreeOpsOwnedApi | null>(null);

export function useTreeOpsOwned(): TreeOpsOwnedApi {
  const ctx = useContext(TreeOpsOwnedContext);
  if (!ctx) throw new Error('useTreeOpsOwned must be used within AppTreeOpsStateProvider');
  return ctx;
}

/** Owns tree CRUD / DnD / selection React state outside the main controller. */
export function AppTreeOpsStateProvider({ children }: { children: ReactNode }) {
  const [selectedIds, setSelectedIds] = useState(() => new Set<string>());
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [emptyTrashTarget, setEmptyTrashTarget] = useState<any>(null);
  const [isEmptyingTrash, setIsEmptyingTrash] = useState(false);
  const [deletingFolderPath, setDeletingFolderPath] = useState<string | null>(null);
  const [isDeletingFolder, setIsDeletingFolder] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [moveFolderTarget, setMoveFolderTarget] = useState<any>(null);
  const [moveFileTarget, setMoveFileTarget] = useState<any>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createModalContext, setCreateModalContext] = useState<any>(null);
  const [moveModalSelectPath, setMoveModalSelectPath] = useState<any>(null);
  const [isCreateSubmitting, setIsCreateSubmitting] = useState(false);
  const [dropTarget, setDropTarget] = useState<any>(null);
  const [treeNameConflict, setTreeNameConflict] = useState<any>(null);
  const [treeTransferBusy, setTreeTransferBusy] = useState<any[]>([]);
  const [uploadTarget, setUploadTarget] = useState<any>(null);

  const value = useMemo(
    () => ({
      selectedIds,
      setSelectedIds,
      deleteTarget,
      setDeleteTarget,
      emptyTrashTarget,
      setEmptyTrashTarget,
      isEmptyingTrash,
      setIsEmptyingTrash,
      deletingFolderPath,
      setDeletingFolderPath,
      isDeletingFolder,
      setIsDeletingFolder,
      isDeleting,
      setIsDeleting,
      isMoveModalOpen,
      setIsMoveModalOpen,
      moveFolderTarget,
      setMoveFolderTarget,
      moveFileTarget,
      setMoveFileTarget,
      createModalOpen,
      setCreateModalOpen,
      createModalContext,
      setCreateModalContext,
      moveModalSelectPath,
      setMoveModalSelectPath,
      isCreateSubmitting,
      setIsCreateSubmitting,
      dropTarget,
      setDropTarget,
      treeNameConflict,
      setTreeNameConflict,
      treeTransferBusy,
      setTreeTransferBusy,
      uploadTarget,
      setUploadTarget,
    }),
    [
      selectedIds,
      deleteTarget,
      emptyTrashTarget,
      isEmptyingTrash,
      deletingFolderPath,
      isDeletingFolder,
      isDeleting,
      isMoveModalOpen,
      moveFolderTarget,
      moveFileTarget,
      createModalOpen,
      createModalContext,
      moveModalSelectPath,
      isCreateSubmitting,
      dropTarget,
      treeNameConflict,
      treeTransferBusy,
      uploadTarget,
    ],
  );

  return (
    <TreeOpsOwnedContext.Provider value={value}>{children}</TreeOpsOwnedContext.Provider>
  );
}

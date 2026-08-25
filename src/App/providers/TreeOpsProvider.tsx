import { useCallback, useMemo, useRef, type ReactNode } from 'react';
import { TreeOpsContext } from '@/App/context/TreeOpsContext';
import { useTreeOpsOwned } from '@/App/providers/AppTreeOpsStateProvider';

type TreeOpsActions = {
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
  settleTreeNameConflict: (...args: any[]) => any;
  handleRequestMoveFolder: (...args: any[]) => any;
};

const noop = (..._args: any[]) => {};

/** Owns tree-ops context; heavy CRUD/DnD bodies register from orchestration. */
export function TreeOpsProvider({ children }: { children: ReactNode }) {
  const owned = useTreeOpsOwned();
  const actionsRef = useRef<TreeOpsActions>({
    requestCreateItem: noop,
    requestNewFile: noop,
    requestUploadFile: noop,
    requestUploadFolder: noop,
    handleTreeNodeSelect: noop,
    handleDragEndNode: noop,
    handleDropOnFolder: noop,
    handleDownloadNode: noop,
    handleDuplicateNode: noop,
    renameTreeItem: noop,
    settleTreeNameConflict: noop,
    handleRequestMoveFolder: noop,
  });

  const registerTreeOpsActions = useCallback((actions: Partial<TreeOpsActions>) => {
    actionsRef.current = { ...actionsRef.current, ...actions };
  }, []);

  const value = useMemo(
    () => ({
      ...owned,
      registerTreeOpsActions,
      requestCreateItem: (...args: any[]) =>
        actionsRef.current.requestCreateItem(...args),
      requestNewFile: (...args: any[]) => actionsRef.current.requestNewFile(...args),
      requestUploadFile: (...args: any[]) =>
        actionsRef.current.requestUploadFile(...args),
      requestUploadFolder: (...args: any[]) =>
        actionsRef.current.requestUploadFolder(...args),
      handleTreeNodeSelect: (...args: any[]) =>
        actionsRef.current.handleTreeNodeSelect(...args),
      handleDragEndNode: (...args: any[]) =>
        actionsRef.current.handleDragEndNode(...args),
      handleDropOnFolder: (...args: any[]) =>
        actionsRef.current.handleDropOnFolder(...args),
      handleDownloadNode: (...args: any[]) =>
        actionsRef.current.handleDownloadNode(...args),
      handleDuplicateNode: (...args: any[]) =>
        actionsRef.current.handleDuplicateNode(...args),
      renameTreeItem: (...args: any[]) => actionsRef.current.renameTreeItem(...args),
      settleTreeNameConflict: (...args: any[]) =>
        actionsRef.current.settleTreeNameConflict(...args),
      handleRequestMoveFolder: (...args: any[]) =>
        actionsRef.current.handleRequestMoveFolder(...args),
    }),
    [owned, registerTreeOpsActions],
  );

  return <TreeOpsContext.Provider value={value}>{children}</TreeOpsContext.Provider>;
}

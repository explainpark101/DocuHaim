import {
  useCallback,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import { FileSessionContext } from '@/App/context/FileSessionContext';
import { useFileSessionOwned } from '@/App/providers/AppFileSessionStateProvider';
import { saveEditorType } from '@/utils/editorTypeSettings';

type FileSessionActions = {
  saveFile: (...args: any[]) => any;
  refreshLocalFileFromDisk: (...args: any[]) => any;
  refreshRemoteFile: (...args: any[]) => any;
  handleRequestCloseEditor: (...args: any[]) => any;
  openAdvancedSearchFile: (...args: any[]) => any;
};

const noop = async (..._args: any[]) => {};

/**
 * Owns file-session context. Lightweight handlers live here; heavy open/save
 * bodies register via registerFileSessionActions from orchestration (H2 bridge).
 */
export function FileSessionProvider({ children }: { children: ReactNode }) {
  const owned = useFileSessionOwned();
  const {
    currentFile,
    setCurrentFile,
    editorContent,
    setEditorContent,
    editorContentRef,
    prevEditorContentRef,
    currentFileRef,
    editedFileName,
    setEditedFileName,
    isSaving,
    setIsSaving,
    savingTabIds,
    setSavingTabIds,
    editorType,
    setEditorType,
    encMdPrompt,
    setEncMdPrompt,
    isRefreshingFromDisk,
    setIsRefreshingFromDisk,
    isPullingFromRemote,
    setIsPullingFromRemote,
  } = owned;

  const actionsRef = useRef<FileSessionActions>({
    saveFile: noop,
    refreshLocalFileFromDisk: noop,
    refreshRemoteFile: noop,
    handleRequestCloseEditor: noop,
    openAdvancedSearchFile: noop,
  });

  const registerFileSessionActions = useCallback(
    (actions: Partial<FileSessionActions>) => {
      actionsRef.current = { ...actionsRef.current, ...actions };
    },
    [],
  );

  const handleEditorTypeChange = useCallback((next: string) => {
    saveEditorType(next);
    setEditorType(next);
  }, [setEditorType]);

  const value = useMemo(
    () => ({
      currentFile,
      setCurrentFile,
      editorContent,
      setEditorContent,
      editorContentRef,
      prevEditorContentRef,
      currentFileRef,
      editedFileName,
      setEditedFileName,
      isSaving,
      setIsSaving,
      savingTabIds,
      setSavingTabIds,
      editorType,
      handleEditorTypeChange,
      isRefreshingFromDisk,
      setIsRefreshingFromDisk,
      isPullingFromRemote,
      setIsPullingFromRemote,
      encMdPrompt,
      setEncMdPrompt,
      registerFileSessionActions,
      saveFile: (...args: any[]) => actionsRef.current.saveFile(...args),
      refreshLocalFileFromDisk: (...args: any[]) =>
        actionsRef.current.refreshLocalFileFromDisk(...args),
      refreshRemoteFile: (...args: any[]) =>
        actionsRef.current.refreshRemoteFile(...args),
      handleRequestCloseEditor: (...args: any[]) =>
        actionsRef.current.handleRequestCloseEditor(...args),
      openAdvancedSearchFile: (...args: any[]) =>
        actionsRef.current.openAdvancedSearchFile(...args),
    }),
    [
      currentFile,
      setCurrentFile,
      editorContent,
      setEditorContent,
      editedFileName,
      setEditedFileName,
      isSaving,
      setIsSaving,
      savingTabIds,
      setSavingTabIds,
      editorType,
      handleEditorTypeChange,
      isRefreshingFromDisk,
      setIsRefreshingFromDisk,
      isPullingFromRemote,
      setIsPullingFromRemote,
      encMdPrompt,
      setEncMdPrompt,
      registerFileSessionActions,
    ],
  );

  return (
    <FileSessionContext.Provider value={value}>{children}</FileSessionContext.Provider>
  );
}

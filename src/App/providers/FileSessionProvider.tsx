import {
  useCallback,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import { FileSessionContext } from '@/App/context/FileSessionContext';
import { useFileSessionOwned } from '@/App/providers/AppFileSessionStateProvider';
import {
  useFileSessionDomain,
  type FileSessionBridgeDeps,
} from '@/App/hooks/useFileSessionDomain';
import { saveEditorType } from '@/utils/editorTypeSettings';

type Props = { children: ReactNode };

/**
 * Owns file-session context + open/save/refresh actions (useFileSessionDomain).
 * Bridge deps (modals, session write, tree select) inject from orchestration.
 */
export function FileSessionProvider({ children }: Props) {
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

  const bridgeDepsRef = useRef<FileSessionBridgeDeps>({});

  const registerFileSessionBridgeDeps = useCallback(
    (deps: Partial<FileSessionBridgeDeps>) => {
      bridgeDepsRef.current = { ...bridgeDepsRef.current, ...deps };
    },
    [],
  );

  const domain = useFileSessionDomain({ bridgeDepsRef });

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
      registerFileSessionBridgeDeps,
      saveFile: domain.saveFile,
      refreshLocalFileFromDisk: domain.refreshLocalFileFromDisk,
      refreshRemoteFile: domain.refreshRemoteFile,
      handleRequestCloseEditor: domain.handleRequestCloseEditor,
      openAdvancedSearchFile: domain.openAdvancedSearchFile,
      selectFileRaw: domain.selectFileRaw,
      commitOpenFile: domain.commitOpenFile,
      saveCurrentMarkdownBeforeSwitch: domain.saveCurrentMarkdownBeforeSwitch,
      applyOpenFileIdentityChange: domain.applyOpenFileIdentityChange,
      renameCurrentFileFullName: domain.renameCurrentFileFullName,
    }),
    [
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
      registerFileSessionBridgeDeps,
      domain,
    ],
  );

  return (
    <FileSessionContext.Provider value={value}>{children}</FileSessionContext.Provider>
  );
}

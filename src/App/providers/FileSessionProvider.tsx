import {
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import { FileSessionContext } from '@/App/context/FileSessionContext';
import { useFileSessionOwned } from '@/App/providers/AppFileSessionStateProvider';
import { useFileSessionDomain } from '@/App/hooks/useFileSessionDomain';
import { saveEditorType } from '@/utils/editorTypeSettings';

type Props = { children: ReactNode };

/**
 * Owns file-session context + open/save/refresh actions (useFileSessionDomain).
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

  const domain = useFileSessionDomain();

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
      renameS3File: domain.renameS3File,
      renameLocalFile: domain.renameLocalFile,
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
      domain,
    ],
  );

  return (
    <FileSessionContext.Provider value={value}>{children}</FileSessionContext.Provider>
  );
}

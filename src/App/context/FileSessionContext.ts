import { createContext } from 'react';

/** §5 file open/save / editor bridge (owned by FileSessionProvider). */
export type FileSessionValue = {
  currentFile: any;
  setCurrentFile: (...args: any[]) => any;
  editorContent: string;
  setEditorContent: (...args: any[]) => any;
  editorContentRef: { current: string };
  prevEditorContentRef: { current: string };
  currentFileRef: { current: any };
  editedFileName: string;
  setEditedFileName: (name: string) => void;
  saveFile: (...args: any[]) => any;
  isSaving: boolean;
  setIsSaving: (...args: any[]) => any;
  savingTabIds: string[];
  setSavingTabIds: (...args: any[]) => any;
  editorType: string;
  handleEditorTypeChange: (...args: any[]) => any;
  isRefreshingFromDisk: boolean;
  setIsRefreshingFromDisk: (...args: any[]) => any;
  isPullingFromRemote: boolean;
  setIsPullingFromRemote: (...args: any[]) => any;
  refreshLocalFileFromDisk: (...args: any[]) => any;
  refreshRemoteFile: (...args: any[]) => any;
  handleRequestCloseEditor: (...args: any[]) => any;
  openAdvancedSearchFile: (...args: any[]) => any;
  selectFileRaw: (...args: any[]) => any;
  commitOpenFile: (...args: any[]) => any;
  saveCurrentMarkdownBeforeSwitch: (...args: any[]) => any;
  applyOpenFileIdentityChange: (...args: any[]) => any;
  renameCurrentFileFullName: (...args: any[]) => any;
  renameS3File: (...args: any[]) => any;
  renameLocalFile: (...args: any[]) => any;
  encMdPrompt: any;
  setEncMdPrompt: (...args: any[]) => any;
};

export const FileSessionContext = createContext<FileSessionValue | null>(null);

import { createContext } from 'react';

/** §5 file open/save / editor bridge. */
export type FileSessionValue = {
  currentFile: any;
  setCurrentFile: (...args: any[]) => any;
  editorContent: string;
  setEditorContent: (...args: any[]) => any;
  editorContentRef: { current: string };
  /** Shared with AutoSave for recording line-diff / restore handoff. */
  prevEditorContentRef: { current: string };
  currentFileRef: { current: any };
  editedFileName: string;
  setEditedFileName: (name: string) => void;
  saveFile: (...args: any[]) => any;
  isSaving: boolean;
  savingTabIds: string[];
  editorType: string;
  handleEditorTypeChange: (...args: any[]) => any;
  isRefreshingFromDisk: boolean;
  isPullingFromRemote: boolean;
  refreshLocalFileFromDisk: (...args: any[]) => any;
  refreshRemoteFile: (...args: any[]) => any;
  handleRequestCloseEditor: (...args: any[]) => any;
  openAdvancedSearchFile: (...args: any[]) => any;
};

export const FileSessionContext = createContext<FileSessionValue | null>(null);

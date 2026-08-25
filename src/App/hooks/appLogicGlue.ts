/**
 * Shared late-bound APIs across AppLogic domain hooks (avoid reverse provider imports).
 */
export type AppLogicGlue = {
  setOperationStatus?: (status: string) => void;
  selectFile?: (...args: any[]) => any;
  closeCurrentFile?: () => void;
  hasUnsavedEditorChanges?: () => boolean;
  flushSessionEditorToWorkspace?: () => any;
  applySessionFileToEditor?: (...args: any[]) => boolean;
  openSessionWorkspace?: (...args: any[]) => any;
  confirmAndCancelEditorImageUpload?: () => boolean;
  requestEncMdPassword?: (opts?: any) => Promise<string>;
  renameS3File?: (...args: any[]) => Promise<any>;
  renameLocalFile?: (...args: any[]) => Promise<any>;
  readBackendBytes?: (...args: any[]) => Promise<Uint8Array>;
  downloadMarkdownImageZip?: (...args: any[]) => Promise<boolean>;
  expandPathsRef?: { current: ((type: string, paths: string[]) => void) | null };
  uploadFileInputRef?: { current: any };
  uploadFolderInputRef?: { current: any };
  setSidebarOpen?: (open: boolean) => void;
  isMobile?: boolean;
  chatSurfaceActive?: boolean;
  setDownloadResultModal?: (modal: any) => void;
  setAddToNoteSelectPath?: (p: any) => void;
  setSaveSessionToNoteSelectPath?: (p: any) => void;
  writeSessionFileToHaim?: (...args: any[]) => Promise<any>;
  sessionWorkspaceRef?: { current: any };
  sessionVaultBindingsRef?: { current: any };
  savingTabIdsRef?: { current: Set<string> };
  suppressUnsavedNavGuardRef?: { current: boolean };
  pendingCoverSaveRef?: { current: any };
  setShowCoverChangeConfirmModal?: (open: boolean) => void;
  setShowCloseFileConfirmModal?: (open: boolean) => void;
  setPendingCloseTabId?: (id: string | null) => void;
  hasSuffixChange?: () => boolean;
  setSuffixConfirmAction?: (action: string) => void;
  setShowSuffixChangeConfirmModal?: (open: boolean) => void;
  maybeAutoSaveOnFocusChange?: (...args: any[]) => void;
  connectedHaimStorageType?: () => string;
  handleRequestSessionSaveChooser?: () => void;
};

export function createAppLogicGlue(): AppLogicGlue {
  return {};
}

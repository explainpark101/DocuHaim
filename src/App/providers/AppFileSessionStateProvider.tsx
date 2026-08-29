import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from 'react';
import type { SessionWorkspacesMap } from '@/utils/sessionWorkspace';
import { loadEditorType } from '@/utils/editorTypeSettings';

export type FileSessionOwnedApi = {
  currentFile: any;
  setCurrentFile: (file: any | ((prev: any) => any)) => void;
  editorContent: string;
  setEditorContent: (content: string | ((prev: string) => string)) => void;
  editorContentRef: MutableRefObject<string>;
  prevEditorContentRef: MutableRefObject<string>;
  currentFileRef: MutableRefObject<any>;
  editedFileName: string;
  setEditedFileName: (name: string | ((prev: string) => string)) => void;
  editedFileNameRef: MutableRefObject<string>;
  isSaving: boolean;
  setIsSaving: (v: boolean | ((prev: boolean) => boolean)) => void;
  savingTabIds: string[];
  setSavingTabIds: (ids: string[] | ((prev: string[]) => string[])) => void;
  savingTabIdsRef: MutableRefObject<Set<string>>;
  editorType: string;
  setEditorType: (t: string | ((prev: string) => string)) => void;
  encMdPrompt: any;
  setEncMdPrompt: (p: any | ((prev: any) => any)) => void;
  isRefreshingFromDisk: boolean;
  setIsRefreshingFromDisk: (v: boolean | ((prev: boolean) => boolean)) => void;
  isPullingFromRemote: boolean;
  setIsPullingFromRemote: (v: boolean | ((prev: boolean) => boolean)) => void;
  sessionWorkspacesRef: MutableRefObject<SessionWorkspacesMap>;
  sessionObjectUrlsRef: MutableRefObject<Map<string, string>>;
  sessionVaultBindingsRef: MutableRefObject<Record<string, any>>;
  writeSessionFileToHaimRef: MutableRefObject<any>;
  isOpeningSession: boolean;
  setIsOpeningSession: (v: boolean | ((prev: boolean) => boolean)) => void;
  saveFileRef: MutableRefObject<any>;
  selectFileRawRef: MutableRefObject<any>;
  /** Filled by AppLogic / FileOpenRouting (TreeOps is below FileSession). */
  selectFileRef: MutableRefObject<((type: string, node: any) => void | Promise<void>) | null>;
  /** Filled by TreeOpsProvider when applyWorkspaceFilePathRetarget mounts. */
  applyWorkspaceFilePathRetargetRef: MutableRefObject<
    ((...args: any[]) => void) | null
  >;
  suppressUnsavedNavGuardRef: MutableRefObject<boolean>;
  /** Late-bound AppLogic session helpers (domains below FileSession fill these). */
  flushSessionEditorToWorkspaceRef: MutableRefObject<(() => any) | null>;
  applySessionFileToEditorRef: MutableRefObject<
    ((fileKey: string, workspace: any, options?: any) => boolean | Promise<boolean>) | null
  >;
  handleRequestSessionSaveChooserRef: MutableRefObject<(() => void) | null>;
  connectedHaimStorageTypeRef: MutableRefObject<(() => string) | null>;
  hasUnsavedEditorChangesRef: MutableRefObject<(() => boolean) | null>;
  quizHasUnsavedProgressRef: MutableRefObject<(() => boolean) | null>;
  quizFlushBeforeSaveRef: MutableRefObject<(() => void) | null>;
  closeCurrentFileRef: MutableRefObject<(() => void) | null>;
  maybeAutoSaveOnFocusChangeRef: MutableRefObject<
    ((file: any, content: string) => void) | null
  >;
  requestEncMdPasswordRef: MutableRefObject<((opts?: any) => Promise<string>) | null>;
  /** Late-bound bootstrap / session / routing helpers filled by AppLogic domains. */
  clearOpenFileStateRef: MutableRefObject<(() => void) | null>;
  revokeOpenFileObjectUrlRef: MutableRefObject<((file: any) => void) | null>;
  openSessionWorkspaceRef: MutableRefObject<((...args: any[]) => any) | null>;
  downloadSessionWorkspaceRef: MutableRefObject<(() => Promise<void>) | null>;
  getSessionObjectUrlRef: MutableRefObject<
    ((path: string, bytes: Uint8Array, mime?: string) => string) | null
  >;
  revokeSessionObjectUrlsRef: MutableRefObject<(() => void) | null>;
  navGuardRef: MutableRefObject<any>;
  restorePersistedWorkspaceTabsRef: MutableRefObject<((...args: any[]) => any) | null>;
  loadLastOpenedFileRef: MutableRefObject<(() => any) | null>;
  clearLastOpenedFileRef: MutableRefObject<(() => void) | null>;
  /** Shared orchestration flags / tree mirrors (owned here so domains + setup share). */
  s3TreeRef: MutableRefObject<any[]>;
  webdavTreeRef: MutableRefObject<any[]>;
  prevHistoryViewPathRef: MutableRefObject<string | undefined>;
  hasRestoredLastFileRef: MutableRefObject<boolean>;
  hasProcessedOpenFromUrlRef: MutableRefObject<boolean>;
  hasRestoredFromPrintRef: MutableRefObject<boolean>;
  hasPromptedLocalFolderRestoreRef: MutableRefObject<boolean>;
  hasSeededTabsRestoreQueueRef: MutableRefObject<boolean>;
  restoringWorkspaceTabsRef: MutableRefObject<boolean>;
};

const FileSessionOwnedContext = createContext<FileSessionOwnedApi | null>(null);

export function useFileSessionOwned(): FileSessionOwnedApi {
  const ctx = useContext(FileSessionOwnedContext);
  if (!ctx) throw new Error('useFileSessionOwned must be used within AppFileSessionStateProvider');
  return ctx;
}

/** Owns editor/file session React state outside the main controller. */
export function AppFileSessionStateProvider({ children }: { children: ReactNode }) {
  const [currentFile, setCurrentFile] = useState<any>(null);
  const [editorContent, setEditorContent] = useState('');
  const editorContentRef = useRef('');
  const prevEditorContentRef = useRef('');
  const currentFileRef = useRef<any>(null);
  const [editedFileName, setEditedFileName] = useState('');
  const editedFileNameRef = useRef('');
  const [isSaving, setIsSaving] = useState(false);
  const [savingTabIds, setSavingTabIds] = useState<string[]>([]);
  const savingTabIdsRef = useRef(new Set<string>());
  const [editorType, setEditorType] = useState(() => loadEditorType());
  const [encMdPrompt, setEncMdPrompt] = useState<any>(null);
  const [isRefreshingFromDisk, setIsRefreshingFromDisk] = useState(false);
  const [isPullingFromRemote, setIsPullingFromRemote] = useState(false);
  const sessionWorkspacesRef = useRef<SessionWorkspacesMap>({});
  const sessionObjectUrlsRef = useRef(new Map<string, string>());
  const sessionVaultBindingsRef = useRef(Object.create(null) as Record<string, any>);
  const writeSessionFileToHaimRef = useRef<any>(null);
  const [isOpeningSession, setIsOpeningSession] = useState(false);
  const saveFileRef = useRef<any>(null);
  const selectFileRawRef = useRef<any>(null);
  const selectFileRef = useRef<((type: string, node: any) => void | Promise<void>) | null>(null);
  const applyWorkspaceFilePathRetargetRef = useRef<((...args: any[]) => void) | null>(null);
  const suppressUnsavedNavGuardRef = useRef(false);
  const flushSessionEditorToWorkspaceRef = useRef<(() => any) | null>(null);
  const applySessionFileToEditorRef = useRef<
    ((fileKey: string, workspace: any, options?: any) => boolean | Promise<boolean>) | null
  >(null);
  const handleRequestSessionSaveChooserRef = useRef<(() => void) | null>(null);
  const connectedHaimStorageTypeRef = useRef<(() => string) | null>(null);
  const hasUnsavedEditorChangesRef = useRef<(() => boolean) | null>(null);
  const quizHasUnsavedProgressRef = useRef<(() => boolean) | null>(null);
  const quizFlushBeforeSaveRef = useRef<(() => void) | null>(null);
  const closeCurrentFileRef = useRef<(() => void) | null>(null);
  const maybeAutoSaveOnFocusChangeRef = useRef<
    ((file: any, content: string) => void) | null
  >(null);
  const requestEncMdPasswordRef = useRef<((opts?: any) => Promise<string>) | null>(null);
  const clearOpenFileStateRef = useRef<(() => void) | null>(null);
  const revokeOpenFileObjectUrlRef = useRef<((file: any) => void) | null>(null);
  const openSessionWorkspaceRef = useRef<((...args: any[]) => any) | null>(null);
  const downloadSessionWorkspaceRef = useRef<(() => Promise<void>) | null>(null);
  const getSessionObjectUrlRef = useRef<
    ((path: string, bytes: Uint8Array, mime?: string) => string) | null
  >(null);
  const revokeSessionObjectUrlsRef = useRef<(() => void) | null>(null);
  const navGuardRef = useRef<any>(null);
  const restorePersistedWorkspaceTabsRef = useRef<((...args: any[]) => any) | null>(null);
  const loadLastOpenedFileRef = useRef<(() => any) | null>(null);
  const clearLastOpenedFileRef = useRef<(() => void) | null>(null);
  const s3TreeRef = useRef<any[]>([]);
  const webdavTreeRef = useRef<any[]>([]);
  const prevHistoryViewPathRef = useRef<string | undefined>(undefined);
  const hasRestoredLastFileRef = useRef(false);
  const hasProcessedOpenFromUrlRef = useRef(false);
  const hasRestoredFromPrintRef = useRef(false);
  const hasPromptedLocalFolderRestoreRef = useRef(false);
  const hasSeededTabsRestoreQueueRef = useRef(false);
  const restoringWorkspaceTabsRef = useRef(false);

  editedFileNameRef.current = editedFileName;

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
      editedFileNameRef,
      isSaving,
      setIsSaving,
      savingTabIds,
      setSavingTabIds,
      savingTabIdsRef,
      editorType,
      setEditorType,
      encMdPrompt,
      setEncMdPrompt,
      isRefreshingFromDisk,
      setIsRefreshingFromDisk,
      isPullingFromRemote,
      setIsPullingFromRemote,
      sessionWorkspacesRef,
      sessionObjectUrlsRef,
      sessionVaultBindingsRef,
      writeSessionFileToHaimRef,
      isOpeningSession,
      setIsOpeningSession,
      saveFileRef,
      selectFileRawRef,
      selectFileRef,
      applyWorkspaceFilePathRetargetRef,
      suppressUnsavedNavGuardRef,
      flushSessionEditorToWorkspaceRef,
      applySessionFileToEditorRef,
      handleRequestSessionSaveChooserRef,
      connectedHaimStorageTypeRef,
      hasUnsavedEditorChangesRef,
      quizHasUnsavedProgressRef,
      quizFlushBeforeSaveRef,
      closeCurrentFileRef,
      maybeAutoSaveOnFocusChangeRef,
      requestEncMdPasswordRef,
      clearOpenFileStateRef,
      revokeOpenFileObjectUrlRef,
      openSessionWorkspaceRef,
      downloadSessionWorkspaceRef,
      getSessionObjectUrlRef,
      revokeSessionObjectUrlsRef,
      navGuardRef,
      restorePersistedWorkspaceTabsRef,
      loadLastOpenedFileRef,
      clearLastOpenedFileRef,
      s3TreeRef,
      webdavTreeRef,
      prevHistoryViewPathRef,
      hasRestoredLastFileRef,
      hasProcessedOpenFromUrlRef,
      hasRestoredFromPrintRef,
      hasPromptedLocalFolderRestoreRef,
      hasSeededTabsRestoreQueueRef,
      restoringWorkspaceTabsRef,
    }),
    [
      currentFile,
      editorContent,
      editedFileName,
      isSaving,
      savingTabIds,
      editorType,
      encMdPrompt,
      isRefreshingFromDisk,
      isPullingFromRemote,
      isOpeningSession,
    ],
  );

  return (
    <FileSessionOwnedContext.Provider value={value}>
      {children}
    </FileSessionOwnedContext.Provider>
  );
}

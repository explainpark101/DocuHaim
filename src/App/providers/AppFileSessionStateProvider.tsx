import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from 'react';
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
  sessionWorkspaceRef: MutableRefObject<any>;
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
    ((path: string, workspace: any, options?: any) => boolean) | null
  >;
  handleRequestSessionSaveChooserRef: MutableRefObject<(() => void) | null>;
  connectedHaimStorageTypeRef: MutableRefObject<(() => string) | null>;
  hasUnsavedEditorChangesRef: MutableRefObject<(() => boolean) | null>;
  closeCurrentFileRef: MutableRefObject<(() => void) | null>;
  maybeAutoSaveOnFocusChangeRef: MutableRefObject<
    ((file: any, content: string) => void) | null
  >;
  requestEncMdPasswordRef: MutableRefObject<((opts?: any) => Promise<string>) | null>;
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
  const sessionWorkspaceRef = useRef<any>(null);
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
    ((path: string, workspace: any, options?: any) => boolean) | null
  >(null);
  const handleRequestSessionSaveChooserRef = useRef<(() => void) | null>(null);
  const connectedHaimStorageTypeRef = useRef<(() => string) | null>(null);
  const hasUnsavedEditorChangesRef = useRef<(() => boolean) | null>(null);
  const closeCurrentFileRef = useRef<(() => void) | null>(null);
  const maybeAutoSaveOnFocusChangeRef = useRef<
    ((file: any, content: string) => void) | null
  >(null);
  const requestEncMdPasswordRef = useRef<((opts?: any) => Promise<string>) | null>(null);

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
      sessionWorkspaceRef,
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
      closeCurrentFileRef,
      maybeAutoSaveOnFocusChangeRef,
      requestEncMdPasswordRef,
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

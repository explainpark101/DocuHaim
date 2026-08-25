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

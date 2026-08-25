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
  isSaving: boolean;
  setIsSaving: (v: boolean | ((prev: boolean) => boolean)) => void;
  savingTabIds: string[];
  setSavingTabIds: (ids: string[] | ((prev: string[]) => string[])) => void;
  editorType: string;
  setEditorType: (t: string | ((prev: string) => string)) => void;
  encMdPrompt: any;
  setEncMdPrompt: (p: any | ((prev: any) => any)) => void;
  isRefreshingFromDisk: boolean;
  setIsRefreshingFromDisk: (v: boolean | ((prev: boolean) => boolean)) => void;
  isPullingFromRemote: boolean;
  setIsPullingFromRemote: (v: boolean | ((prev: boolean) => boolean)) => void;
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
  const [isSaving, setIsSaving] = useState(false);
  const [savingTabIds, setSavingTabIds] = useState<string[]>([]);
  const [editorType, setEditorType] = useState(() => loadEditorType());
  const [encMdPrompt, setEncMdPrompt] = useState<any>(null);
  const [isRefreshingFromDisk, setIsRefreshingFromDisk] = useState(false);
  const [isPullingFromRemote, setIsPullingFromRemote] = useState(false);

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
      setEditorType,
      encMdPrompt,
      setEncMdPrompt,
      isRefreshingFromDisk,
      setIsRefreshingFromDisk,
      isPullingFromRemote,
      setIsPullingFromRemote,
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
    ],
  );

  return (
    <FileSessionOwnedContext.Provider value={value}>
      {children}
    </FileSessionOwnedContext.Provider>
  );
}

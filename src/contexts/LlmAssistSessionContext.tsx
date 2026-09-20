import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
import {
  loadLlmAssistPresentation,
  saveLlmAssistPresentation,
  type LlmAssistPresentation,
} from '@/utils/llm/llmAssistPresentation';

export type LlmAssistEditorBridge = {
  editorRef: RefObject<unknown>;
  /** Prefer over reading editorRef.current (md-editor-rt ref shape varies). */
  getEditorApi?: () => {
    getEditorView?: () => import('@codemirror/view').EditorView | null | undefined;
    getSelectedText?: () => string | undefined;
  } | null;
  onChange?: (markdown: string) => void;
  getMarkdown?: () => string;
};

export type LlmAssistSplitWorkspaceHandlers = {
  /** Ensure the LLM Assist workspace tab is open (split mode). */
  open: () => void;
  /** Remove the LLM Assist workspace tab without changing presentation. */
  close: () => void;
};

type LlmAssistSessionContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openAssist: () => void;
  closeAssist: () => void;
  toggleAssist: () => void;
  presentation: LlmAssistPresentation;
  setPresentation: (next: LlmAssistPresentation) => void;
  dockToRight: () => void;
  undockToFloating: () => void;
  openAsSplit: () => void;
  /** Register App-side workspace tab open/close for split presentation. */
  registerSplitWorkspaceHandlers: (handlers: LlmAssistSplitWorkspaceHandlers | null) => void;
  editorBridge: LlmAssistEditorBridge | null;
  registerEditorBridge: (bridge: LlmAssistEditorBridge) => () => void;
  canInsertIntoDocument: boolean;
};

const LlmAssistSessionContext = createContext<LlmAssistSessionContextValue | null>(null);

export function LlmAssistSessionProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [presentation, setPresentationState] = useState<LlmAssistPresentation>(() =>
    loadLlmAssistPresentation(),
  );
  const [editorBridge, setEditorBridge] = useState<LlmAssistEditorBridge | null>(null);
  const bridgeOwnerRef = useRef(0);
  const nextOwnerIdRef = useRef(1);
  const splitHandlersRef = useRef<LlmAssistSplitWorkspaceHandlers | null>(null);
  const presentationRef = useRef(presentation);
  const openRef = useRef(open);
  presentationRef.current = presentation;
  openRef.current = open;

  const setPresentation = useCallback((next: LlmAssistPresentation) => {
    setPresentationState(next);
    saveLlmAssistPresentation(next);
  }, []);

  const openAssist = useCallback(() => {
    setOpen(true);
  }, []);

  const closeAssist = useCallback(() => {
    setOpen(false);
  }, []);

  const toggleAssist = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const dockToRight = useCallback(() => {
    setPresentation('docked');
    setOpen(true);
  }, [setPresentation]);

  const undockToFloating = useCallback(() => {
    setPresentation('floating');
    setOpen(true);
  }, [setPresentation]);

  const openAsSplit = useCallback(() => {
    setPresentation('split');
    setOpen(true);
  }, [setPresentation]);

  const registerSplitWorkspaceHandlers = useCallback(
    (handlers: LlmAssistSplitWorkspaceHandlers | null) => {
      splitHandlersRef.current = handlers;
      if (!handlers) return;
      if (presentationRef.current === 'split' && openRef.current) {
        handlers.open();
      } else {
        handlers.close();
      }
    },
    [],
  );

  // Keep the workspace LLM tab in sync with split presentation + open.
  useEffect(() => {
    const handlers = splitHandlersRef.current;
    if (!handlers) return;
    if (presentation === 'split' && open) {
      handlers.open();
    } else {
      handlers.close();
    }
  }, [open, presentation]);

  const registerEditorBridge = useCallback((bridge: LlmAssistEditorBridge) => {
    const ownerId = nextOwnerIdRef.current++;
    bridgeOwnerRef.current = ownerId;
    setEditorBridge(bridge);
    return () => {
      if (bridgeOwnerRef.current === ownerId) {
        bridgeOwnerRef.current = 0;
        setEditorBridge(null);
      }
    };
  }, []);

  const value = useMemo<LlmAssistSessionContextValue>(
    () => ({
      open,
      setOpen,
      openAssist,
      closeAssist,
      toggleAssist,
      presentation,
      setPresentation,
      dockToRight,
      undockToFloating,
      openAsSplit,
      registerSplitWorkspaceHandlers,
      editorBridge,
      registerEditorBridge,
      canInsertIntoDocument: Boolean(editorBridge),
    }),
    [
      open,
      openAssist,
      closeAssist,
      toggleAssist,
      presentation,
      setPresentation,
      dockToRight,
      undockToFloating,
      openAsSplit,
      registerSplitWorkspaceHandlers,
      editorBridge,
      registerEditorBridge,
    ],
  );

  return (
    <LlmAssistSessionContext.Provider value={value}>
      {children}
    </LlmAssistSessionContext.Provider>
  );
}

export function useLlmAssistSession(): LlmAssistSessionContextValue {
  const ctx = useContext(LlmAssistSessionContext);
  if (!ctx) {
    throw new Error('useLlmAssistSession must be used within LlmAssistSessionProvider');
  }
  return ctx;
}

/** Optional access when provider may be missing (e.g. popout page). */
export function useLlmAssistSessionOptional(): LlmAssistSessionContextValue | null {
  return useContext(LlmAssistSessionContext);
}

import {
  createContext,
  useCallback,
  useContext,
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
  onChange?: (markdown: string) => void;
  getMarkdown?: () => string;
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
      editorBridge,
      registerEditorBridge,
      canInsertIntoDocument: Boolean(editorBridge?.editorRef),
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

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
  EMPTY_LLM_ASSIST_BRIDGE_PICK_MEMORY,
  pickLlmAssistEditorBridge,
  type LlmAssistBridgePickMemory,
} from '@/utils/llm/llmAssistEditorBridgePick';
import {
  loadLlmAssistPresentation,
  saveLlmAssistPresentation,
  type LlmAssistPresentation,
} from '@/utils/llm/llmAssistPresentation';

export type LlmAssistSelectionSnapshot = {
  text: string;
  from: number;
  to: number;
};

export type LlmAssistEditorBridge = {
  editorRef: RefObject<unknown>;
  /** Prefer over reading editorRef.current (md-editor-rt ref shape varies). */
  getEditorApi?: () => {
    getEditorView?: () => import('@codemirror/view').EditorView | null | undefined;
    getSelectedText?: () => string | undefined;
  } | null;
  /**
   * Non-CM editors (Haim TipTap / source). When set, LLM Assist reads
   * selection from here instead of md-editor-rt CodeMirror helpers.
   */
  getSelection?: () => LlmAssistSelectionSnapshot;
  /**
   * Replace last selection (or append) for editors that are not md-editor CM.
   * When set, apply/append skip `applyLlmResultToEditor`.
   */
  applyResult?: (
    result: string,
    options?: { forceAppendAtEnd?: boolean },
  ) => boolean;
  /** Optional live selection subscription (TipTap / CM). */
  subscribeSelection?: (
    onChange: (snapshot: LlmAssistSelectionSnapshot) => void,
  ) => () => void;
  onChange?: (markdown: string) => void;
  getMarkdown?: () => string;
  /** Durable source-focus key (`storageType:path`) for demoted panes. */
  documentKey?: string;
  /**
   * True only while this editor's caret has keyboard focus.
   * Hover re-registration must not become the insert target.
   */
  hasKeyboardFocus?: () => boolean;
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
  const bridgeHostMountedRef = useRef(true);
  const bridgeEntriesRef = useRef(new Map<number, LlmAssistEditorBridge>());
  const bridgePickMemoryRef = useRef<LlmAssistBridgePickMemory>(
    EMPTY_LLM_ASSIST_BRIDGE_PICK_MEMORY,
  );
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

  const publishEditorBridge = useCallback(() => {
    if (!bridgeHostMountedRef.current) return;
    const candidates = [...bridgeEntriesRef.current.entries()].map(([ownerId, bridge]) => ({
      ownerId,
      bridge,
      documentKey: bridge.documentKey ?? null,
      editorRef: bridge.editorRef,
      keyboardFocused: Boolean(bridge.hasKeyboardFocus?.()),
    }));
    const picked = pickLlmAssistEditorBridge(candidates, bridgePickMemoryRef.current);
    bridgePickMemoryRef.current = picked.memory;
    setEditorBridge((prev) => (prev === picked.bridge ? prev : picked.bridge));
  }, []);

  const registerEditorBridge = useCallback((bridge: LlmAssistEditorBridge) => {
    const ownerId = nextOwnerIdRef.current++;
    bridgeEntriesRef.current.set(ownerId, bridge);
    publishEditorBridge();
    return () => {
      if (bridgeEntriesRef.current.get(ownerId) === bridge) {
        bridgeEntriesRef.current.delete(ownerId);
      }
      // Defer so a demoted replacement bridge can register in the same commit
      // before we retarget. Hover re-register publishes immediately on setup.
      queueMicrotask(() => {
        publishEditorBridge();
      });
    };
  }, [publishEditorBridge]);

  useEffect(() => {
    bridgeHostMountedRef.current = true;
    return () => {
      bridgeHostMountedRef.current = false;
    };
  }, []);

  // Caret focus (click / keyboard), not hover, retargets insert.
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const onFocusIn = () => {
      publishEditorBridge();
    };
    document.addEventListener('focusin', onFocusIn, true);
    return () => document.removeEventListener('focusin', onFocusIn, true);
  }, [publishEditorBridge]);

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

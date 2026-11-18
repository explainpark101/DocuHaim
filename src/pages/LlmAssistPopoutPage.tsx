import { useCallback, useEffect, useRef, useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import LlmAssistPanel from '@/components/LlmAssistPanel';
import LlmAssistChatPanel from '@/components/llm/LlmAssistChatPanel';
import LlmAssistImageDropZone from '@/components/llm/LlmAssistImageDropZone';
import LlmAssistUiModeToggle from '@/components/llm/LlmAssistUiModeToggle';
import { LLM_ASSIST_MSG } from '@/utils/llmAssistBridge';
import { readImageFilesAsAttachments } from '@/utils/llmAssistImages';
import {
  closeCurrentLlmAssistTauriPopout,
  isLlmAssistTauriMainWindowOpen,
  isLlmAssistTauriPopoutWindow,
  postLlmAssistPopoutAction,
  postLlmAssistPopoutReady,
  subscribeLlmAssistPopoutFromParent,
} from '@/utils/llm/llmAssistPopoutHost';
import {
  applyDocumentTheme,
  loadStoredTheme,
  type DocumentTheme,
} from '@/utils/documentTheme';
import {
  LLM_ASSIST_DEFAULT_REQUEST_OPTIONS,
  normalizeRequestOptions,
} from '@/utils/llm/llmAssistRequestOptions';
import { getDefaultLlmAssistSystemPrompt } from '@/utils/llm/llmAssistBaseSystemPrompt';
import {
  isLlmAssistUiMode,
  type LlmAssistUiMode,
} from '@/utils/llm/llmAssistUiMode';
import type { LlmChatMessage } from '@/utils/llm/llmChatStream';
import type { LlmAssistResultViewMode } from '@/components/llm/LlmAssistPanel';

if (typeof document !== 'undefined') {
  applyDocumentTheme(loadStoredTheme());
}

type PopoutRemoteState = {
  selectedText: string;
  selectionRange: { from: number; to: number };
  attachedImages: unknown[];
  instruction: string;
  systemPrompt: string;
  requestOptions: Record<string, unknown>;
  result: string;
  resultViewMode: LlmAssistResultViewMode;
  loading: boolean;
  error: string;
  templates: unknown[];
  selectedTemplateId: string;
  templateName: string;
  editingTemplateId: string | null;
  profiles: Array<{ id: string; name: string; kind: string; baseUrl?: string; apiKey?: string }>;
  selectedProfileId: string;
  model: string;
  theme: DocumentTheme;
  uiMode: LlmAssistUiMode;
  chatMessages: LlmChatMessage[];
  chatDraft: string;
  chatLoading: boolean;
  chatError: string;
};

const EMPTY_STATE: PopoutRemoteState = {
  selectedText: '',
  selectionRange: { from: 0, to: 0 },
  attachedImages: [],
  instruction: '',
  systemPrompt: getDefaultLlmAssistSystemPrompt(),
  requestOptions: { ...LLM_ASSIST_DEFAULT_REQUEST_OPTIONS },
  result: '',
  resultViewMode: 'text',
  loading: false,
  error: '',
  templates: [],
  selectedTemplateId: '',
  templateName: '',
  editingTemplateId: null,
  profiles: [],
  selectedProfileId: '',
  model: '',
  theme: loadStoredTheme(),
  uiMode: 'edit',
  chatMessages: [],
  chatDraft: '',
  chatLoading: false,
  chatError: '',
};

function normalizeChatMessages(value: unknown): LlmChatMessage[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const rec = item as Record<string, unknown>;
      const role = rec.role === 'assistant' ? 'assistant' : rec.role === 'user' ? 'user' : null;
      if (!role) return null;
      return {
        id: typeof rec.id === 'string' ? rec.id : `msg-${Math.random().toString(36).slice(2)}`,
        role,
        content: typeof rec.content === 'string' ? rec.content : '',
      };
    })
    .filter((msg): msg is LlmChatMessage => msg !== null);
}

export default function LlmAssistPopoutPage() {
  const [remoteState, setRemoteState] = useState<PopoutRemoteState>(EMPTY_STATE);
  const [instruction, setInstruction] = useState('');
  const [systemPrompt, setSystemPrompt] = useState(() => getDefaultLlmAssistSystemPrompt());
  const [requestOptions, setRequestOptions] = useState(() => ({
    ...LLM_ASSIST_DEFAULT_REQUEST_OPTIONS,
  }));
  const [templateName, setTemplateName] = useState('');
  const [result, setResult] = useState('');
  const [resultViewMode, setResultViewMode] = useState<LlmAssistResultViewMode>('text');
  const [model, setModel] = useState('');
  const [selectedProfileId, setSelectedProfileId] = useState('');
  const [uiMode, setUiMode] = useState<LlmAssistUiMode>('edit');
  const [chatDraft, setChatDraft] = useState('');
  const [connected, setConnected] = useState(false);
  const [tauriPopout, setTauriPopout] = useState(false);
  const readySentRef = useRef(false);

  useEffect(() => {
    document.documentElement.classList.add('llm-assist-popout-window');
    return () => {
      document.documentElement.classList.remove('llm-assist-popout-window');
    };
  }, []);

  useEffect(() => {
    void isLlmAssistTauriPopoutWindow().then(setTauriPopout);
  }, []);

  useEffect(() => {
    applyDocumentTheme(remoteState.theme);
  }, [remoteState.theme]);

  const sendAction = useCallback((action: string, payload: Record<string, unknown> = {}) => {
    postLlmAssistPopoutAction(action, payload);
  }, []);

  const applyRemoteState = useCallback((state: Record<string, unknown>) => {
    const next: PopoutRemoteState = {
      ...EMPTY_STATE,
      ...state,
      resultViewMode:
        state.resultViewMode === 'preview' || state.resultViewMode === 'text'
          ? state.resultViewMode
          : 'text',
      uiMode: isLlmAssistUiMode(state.uiMode) ? state.uiMode : 'edit',
      chatMessages: normalizeChatMessages(state.chatMessages),
      chatDraft: typeof state.chatDraft === 'string' ? state.chatDraft : '',
      chatLoading: Boolean(state.chatLoading),
      chatError: typeof state.chatError === 'string' ? state.chatError : '',
      profiles: Array.isArray(state.profiles)
        ? (state.profiles as PopoutRemoteState['profiles'])
        : [],
      attachedImages: Array.isArray(state.attachedImages) ? state.attachedImages : [],
      templates: Array.isArray(state.templates) ? state.templates : [],
      theme: state.theme === 'dark' || state.theme === 'light' ? state.theme : loadStoredTheme(),
      systemPrompt:
        typeof state.systemPrompt === 'string'
          ? state.systemPrompt
          : getDefaultLlmAssistSystemPrompt(),
      requestOptions: normalizeRequestOptions(state.requestOptions),
      instruction: typeof state.instruction === 'string' ? state.instruction : '',
      result: typeof state.result === 'string' ? state.result : '',
      selectedText: typeof state.selectedText === 'string' ? state.selectedText : '',
      selectedProfileId:
        typeof state.selectedProfileId === 'string' ? state.selectedProfileId : '',
      model: typeof state.model === 'string' ? state.model : '',
      templateName: typeof state.templateName === 'string' ? state.templateName : '',
      selectedTemplateId:
        typeof state.selectedTemplateId === 'string' ? state.selectedTemplateId : '',
      editingTemplateId:
        typeof state.editingTemplateId === 'string' ? state.editingTemplateId : null,
      loading: Boolean(state.loading),
      error: typeof state.error === 'string' ? state.error : '',
      selectionRange:
        state.selectionRange &&
        typeof state.selectionRange === 'object' &&
        typeof (state.selectionRange as { from?: unknown }).from === 'number' &&
        typeof (state.selectionRange as { to?: unknown }).to === 'number'
          ? (state.selectionRange as { from: number; to: number })
          : { from: 0, to: 0 },
    };
    setRemoteState(next);
    setInstruction(next.instruction);
    setSystemPrompt(next.systemPrompt);
    setRequestOptions(normalizeRequestOptions(next.requestOptions));
    setTemplateName(next.templateName);
    setResult(next.result);
    setResultViewMode(next.resultViewMode);
    setModel(next.model || '');
    setSelectedProfileId(next.selectedProfileId || '');
    setUiMode(next.uiMode);
    setChatDraft(next.chatDraft);
    setConnected(true);
  }, []);

  useEffect(() => {
    let unsubBridge = () => {};
    let cancelled = false;

    void subscribeLlmAssistPopoutFromParent((message) => {
      if (message.type === LLM_ASSIST_MSG.SYNC && message.state) {
        applyRemoteState(message.state);
        return;
      }

      if (message.type === LLM_ASSIST_MSG.PARENT_CLOSING) {
        if (tauriPopout) {
          void closeCurrentLlmAssistTauriPopout();
        } else {
          window.close();
        }
      }
    }).then((unsub) => {
      if (cancelled) {
        unsub();
        return;
      }
      unsubBridge = unsub;
    });

    return () => {
      cancelled = true;
      unsubBridge();
    };
  }, [applyRemoteState, tauriPopout]);

  useEffect(() => {
    if (readySentRef.current) return;

    if (tauriPopout) {
      readySentRef.current = true;
      postLlmAssistPopoutReady();
      return;
    }

    if (!window.opener || window.opener.closed) return;
    readySentRef.current = true;
    postLlmAssistPopoutReady();
  }, [tauriPopout]);

  useEffect(() => {
    if (tauriPopout) {
      const interval = setInterval(() => {
        void isLlmAssistTauriMainWindowOpen().then((mainOpen) => {
          if (!mainOpen) void closeCurrentLlmAssistTauriPopout();
        });
      }, 500);
      return () => clearInterval(interval);
    }

    const interval = setInterval(() => {
      if (!window.opener || window.opener.closed) {
        window.close();
      }
    }, 500);
    return () => clearInterval(interval);
  }, [tauriPopout]);

  const handleInstructionChange = useCallback(
    (value: string) => {
      setInstruction(value);
      sendAction('set-instruction', { value });
    },
    [sendAction],
  );

  const handleSystemPromptChange = useCallback(
    (value: string) => {
      setSystemPrompt(value);
      sendAction('set-system-prompt', { value });
    },
    [sendAction],
  );

  const handleRequestOptionsChange = useCallback(
    (value: Record<string, unknown>) => {
      const next = normalizeRequestOptions(value);
      setRequestOptions(next);
      sendAction('set-request-options', { value: next });
    },
    [sendAction],
  );

  const handleTemplateNameChange = useCallback(
    (value: string) => {
      setTemplateName(value);
      sendAction('set-template-name', { value });
    },
    [sendAction],
  );

  const handleResultChange = useCallback(
    (value: string) => {
      setResult(value);
      sendAction('set-result', { value });
    },
    [sendAction],
  );

  const handleUiModeChange = useCallback(
    (value: LlmAssistUiMode) => {
      setUiMode(value);
      sendAction('set-ui-mode', { value });
    },
    [sendAction],
  );

  const handleChatDraftChange = useCallback(
    (value: string) => {
      setChatDraft(value);
      sendAction('set-chat-draft', { value });
    },
    [sendAction],
  );

  const handleClose = () => {
    sendAction('close');
    if (tauriPopout) {
      void closeCurrentLlmAssistTauriPopout();
    } else {
      window.close();
    }
  };

  const selectedProfile =
    (remoteState.profiles || []).find((p) => p.id === selectedProfileId) || null;

  return (
    <LlmAssistImageDropZone
      className="llm-assist-popout-page flex min-h-0 flex-1 flex-col overflow-hidden bg-white dark:bg-odp-bgSofter"
      onFilesDrop={async (files) => {
        try {
          const images = await readImageFilesAsAttachments(files);
          if (images.length) sendAction('add-images', { images });
        } catch {
          /* ignore non-image drops */
        }
      }}
    >
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-x-2 gap-y-1.5 border-b border-violet-200/60 bg-violet-50/90 px-4 py-2.5 dark:border-violet-800/50 dark:bg-violet-950/40">
        <div className="flex min-w-0 flex-wrap items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100">
          <Sparkles size={16} className="shrink-0" aria-hidden />
          <span className="truncate">AI 도우미</span>
          <LlmAssistUiModeToggle value={uiMode} onChange={handleUiModeChange} />
          {!connected && (
            <span className="text-[10px] font-normal text-violet-600 dark:text-violet-300">
              연결 중…
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50"
          aria-label="닫기"
        >
          <X size={16} />
        </button>
      </header>

      <main
        className={`min-h-0 flex-1 p-4 ${
          uiMode === 'chat' ? 'flex flex-col overflow-hidden' : 'overflow-y-auto'
        }`}
      >
        {uiMode === 'chat' ? (
          <LlmAssistChatPanel
            profiles={remoteState.profiles as never[]}
            selectedProfileId={selectedProfileId}
            onSelectedProfileIdChange={(value) => {
              setSelectedProfileId(value);
              sendAction('set-llm-profile-id', { value });
            }}
            selectedProfile={selectedProfile as never}
            model={model}
            onModelChange={(value) => {
              setModel(value);
              sendAction('set-model', { value });
            }}
            systemPrompt={systemPrompt}
            onSystemPromptChange={handleSystemPromptChange}
            requestOptions={requestOptions}
            onRequestOptionsChange={handleRequestOptionsChange}
            messages={remoteState.chatMessages}
            draft={chatDraft}
            onDraftChange={handleChatDraftChange}
            loading={remoteState.chatLoading}
            error={remoteState.chatError}
            onSend={() => sendAction('send-chat')}
            onCancel={() => sendAction('cancel-chat')}
            onClearMessages={() => sendAction('clear-chat')}
            modelSelectAutoLoad={false}
          />
        ) : (
          <LlmAssistPanel
            theme={remoteState.theme}
            profiles={remoteState.profiles as never[]}
            selectedProfileId={selectedProfileId}
            onSelectedProfileIdChange={(value) => {
              setSelectedProfileId(value);
              sendAction('set-llm-profile-id', { value });
            }}
            selectedProfile={selectedProfile as never}
            model={model}
            onModelChange={(value) => {
              setModel(value);
              sendAction('set-model', { value });
            }}
            selectedText={remoteState.selectedText}
            onSelectedTextChange={(value) => sendAction('set-selected-text', { value })}
            onRefreshSelection={() => sendAction('refresh-selection')}
            attachedImages={(remoteState.attachedImages || []) as never[]}
            onAddImages={async (images) => sendAction('add-images', { images })}
            onRemoveImage={(id) => sendAction('remove-image', { id })}
            instruction={instruction}
            onInstructionChange={handleInstructionChange}
            systemPrompt={systemPrompt}
            onSystemPromptChange={handleSystemPromptChange}
            requestOptions={requestOptions}
            onRequestOptionsChange={handleRequestOptionsChange}
            result={result}
            onResultChange={handleResultChange}
            resultViewMode={resultViewMode}
            onResultViewModeChange={(value) => {
              setResultViewMode(value);
              sendAction('set-result-view-mode', { value });
            }}
            loading={remoteState.loading}
            error={remoteState.error}
            templates={remoteState.templates as never[]}
            selectedTemplateId={remoteState.selectedTemplateId}
            onLoadTemplate={(id) => sendAction('load-template', { id })}
            templateName={templateName}
            onTemplateNameChange={handleTemplateNameChange}
            editingTemplateId={remoteState.editingTemplateId}
            onSaveTemplate={() => sendAction('save-template')}
            onNewTemplate={() => sendAction('new-template')}
            onDeleteTemplate={() => sendAction('delete-template')}
            onRun={() => sendAction('run')}
            onCancelGeneration={() => sendAction('cancel-run')}
            onApplyResult={() => sendAction('apply-result')}
            onAppendResult={() => sendAction('append-result')}
            onCopyResult={() => sendAction('copy-result')}
            onCreateNoteFromResult={() => sendAction('create-note-from-result')}
            remoteMode
            modelSelectAutoLoad={false}
            enableImageDropZone={false}
          />
        )}
      </main>
    </LlmAssistImageDropZone>
  );
}

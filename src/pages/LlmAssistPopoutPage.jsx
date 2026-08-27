import { useCallback, useEffect, useRef, useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import LlmAssistPanel from '@/components/LlmAssistPanel';
import LlmAssistImageDropZone from '@/components/llm/LlmAssistImageDropZone';
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
import { applyDocumentTheme, loadStoredTheme } from '@/utils/documentTheme';
import {
  LLM_ASSIST_DEFAULT_REQUEST_OPTIONS,
  normalizeRequestOptions,
} from '@/utils/llm/llmAssistRequestOptions';
import { getDefaultLlmAssistSystemPrompt } from '@/utils/llm/llmAssistBaseSystemPrompt';

if (typeof document !== 'undefined') {
  applyDocumentTheme(loadStoredTheme());
}

const EMPTY_STATE = {
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
};

export default function LlmAssistPopoutPage() {
  const [remoteState, setRemoteState] = useState(EMPTY_STATE);
  const [instruction, setInstruction] = useState('');
  const [systemPrompt, setSystemPrompt] = useState(() => getDefaultLlmAssistSystemPrompt());
  const [requestOptions, setRequestOptions] = useState(() => ({
    ...LLM_ASSIST_DEFAULT_REQUEST_OPTIONS,
  }));
  const [templateName, setTemplateName] = useState('');
  const [result, setResult] = useState('');
  const [resultViewMode, setResultViewMode] = useState('text');
  const [model, setModel] = useState('');
  const [selectedProfileId, setSelectedProfileId] = useState('');
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

  const sendAction = useCallback((action, payload = {}) => {
    postLlmAssistPopoutAction(action, payload);
  }, []);

  const applyRemoteState = useCallback((state) => {
    const next = { ...EMPTY_STATE, ...state };
    setRemoteState(next);
    setInstruction(next.instruction);
    setSystemPrompt(
      typeof next.systemPrompt === 'string'
        ? next.systemPrompt
        : getDefaultLlmAssistSystemPrompt(),
    );
    setRequestOptions(normalizeRequestOptions(next.requestOptions));
    setTemplateName(next.templateName);
    setResult(next.result);
    setResultViewMode(next.resultViewMode);
    setModel(next.model || '');
    setSelectedProfileId(next.selectedProfileId || '');
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
    (value) => {
      setInstruction(value);
      sendAction('set-instruction', { value });
    },
    [sendAction],
  );

  const handleSystemPromptChange = useCallback(
    (value) => {
      setSystemPrompt(value);
      sendAction('set-system-prompt', { value });
    },
    [sendAction],
  );

  const handleRequestOptionsChange = useCallback(
    (value) => {
      const next = normalizeRequestOptions(value);
      setRequestOptions(next);
      sendAction('set-request-options', { value: next });
    },
    [sendAction],
  );

  const handleTemplateNameChange = useCallback(
    (value) => {
      setTemplateName(value);
      sendAction('set-template-name', { value });
    },
    [sendAction],
  );

  const handleResultChange = useCallback(
    (value) => {
      setResult(value);
      sendAction('set-result', { value });
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
      <header className="flex shrink-0 items-center justify-between gap-2 border-b border-violet-200/60 bg-violet-50/90 px-4 py-2.5 dark:border-violet-800/50 dark:bg-violet-950/40">
        <div className="flex min-w-0 items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100">
          <Sparkles size={16} className="shrink-0" aria-hidden />
          <span className="truncate">AI 도우미</span>
          {!connected && (
            <span className="text-[10px] font-normal text-violet-600 dark:text-violet-300">연결 중…</span>
          )}
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50"
          title="닫기"
          aria-label="닫기"
        >
          <X size={16} />
        </button>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto p-4">
        <LlmAssistPanel
          theme={remoteState.theme}
          profiles={remoteState.profiles || []}
          selectedProfileId={selectedProfileId}
          onSelectedProfileIdChange={(value) => {
            setSelectedProfileId(value);
            sendAction('set-llm-profile-id', { value });
          }}
          selectedProfile={(remoteState.profiles || []).find((p) => p.id === selectedProfileId) || null}
          model={model}
          onModelChange={(value) => {
            setModel(value);
            sendAction('set-model', { value });
          }}
          selectedText={remoteState.selectedText}
          onRefreshSelection={() => sendAction('refresh-selection')}
          attachedImages={remoteState.attachedImages || []}
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
          templates={remoteState.templates}
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
      </main>
    </LlmAssistImageDropZone>
  );
}

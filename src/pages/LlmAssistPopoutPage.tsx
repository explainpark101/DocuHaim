import { useCallback, useEffect, useRef, useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import LlmAssistPanel from '@/components/llm/LlmAssistPanel';
import {
  isLlmAssistMessage,
  LLM_ASSIST_MSG,
  postLlmAssistMessage,
} from '@/utils/llm/llmAssistBridge';
import { applyDocumentTheme, loadStoredTheme } from '@/utils/documentTheme';

if (typeof document !== 'undefined') {
  applyDocumentTheme(loadStoredTheme());
}

const EMPTY_STATE = {
  selectedText: '',
  selectionRange: { from: 0, to: 0 },
  attachedImages: [],
  instruction: '',
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

function postActionToOpener(action: any, payload = {}) {
  if (!window.opener || window.opener.closed) return;
  postLlmAssistMessage(window.opener, LLM_ASSIST_MSG.ACTION, { action, payload });
}

export default function LlmAssistPopoutPage() {
  const [remoteState, setRemoteState] = useState(EMPTY_STATE);
  const [instruction, setInstruction] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [result, setResult] = useState('');
  const [resultViewMode, setResultViewMode] = useState('text');
  const [model, setModel] = useState('');
  const [selectedProfileId, setSelectedProfileId] = useState('');
  const [connected, setConnected] = useState(false);
  const readySentRef = useRef(false);

  useEffect(() => {
    applyDocumentTheme(remoteState.theme);
  }, [remoteState.theme]);

  const sendAction = useCallback((action: any, payload = {}) => {
    postActionToOpener(action, payload);
  }, []);

  useEffect(() => {
    const onMessage = (event: any) => {
      if (event.origin !== window.location.origin) return;
      if (!isLlmAssistMessage(event.data)) return;

      if (event.data.type === LLM_ASSIST_MSG.SYNC && event.data.state) {
        const next = { ...EMPTY_STATE, ...event.data.state };
        setRemoteState(next);
        setInstruction(next.instruction);
        setTemplateName(next.templateName);
        setResult(next.result);
        setResultViewMode(next.resultViewMode);
        setModel(next.model || '');
        setSelectedProfileId(next.selectedProfileId || '');
        setConnected(true);
        return;
      }

      if (event.data.type === LLM_ASSIST_MSG.PARENT_CLOSING) {
        window.close();
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  useEffect(() => {
    if (readySentRef.current) return;
    if (!window.opener || window.opener.closed) return;
    readySentRef.current = true;
    postLlmAssistMessage(window.opener, LLM_ASSIST_MSG.READY);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!window.opener || window.opener.closed) {
        window.close();
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleInstructionChange = useCallback(
    (value: any) => {
      setInstruction(value);
      sendAction('set-instruction', { value });
    },
    [sendAction],
  );

  const handleTemplateNameChange = useCallback(
    (value: any) => {
      setTemplateName(value);
      sendAction('set-template-name', { value });
    },
    [sendAction],
  );

  const handleResultChange = useCallback(
    (value: any) => {
      setResult(value);
      sendAction('set-result', { value });
    },
    [sendAction],
  );

  const handleClose = () => {
    sendAction('close');
    window.close();
  };

  return (
    <div className="llm-assist-popout-page flex min-h-screen flex-col bg-white dark:bg-odp-bgSofter">
      // @ts-expect-error TS(2339): Property 'header' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'header' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'header' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'header' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      <header className="flex shrink-0 items-center justify-between gap-2 border-b border-violet-200/60 bg-violet-50/90 px-4 py-2.5 dark:border-violet-800/50 dark:bg-violet-950/40">
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        <div className="flex min-w-0 items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100">
          <Sparkles size={16} className="shrink-0" aria-hidden />
          // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          // @ts-expect-error TS(2339): Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          // @ts-expect-error TS(2339) FIXME: Property 'span' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
          <span className="truncate">AI 도우미</span>
          {!connected && (
            <span className="text-[10px] font-normal text-violet-600 dark:text-violet-300">연결 중…</span>
          )}
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
        </div>
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        <button
          type="button"
          onClick={handleClose}
          className="rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50"
          title="닫기"
          aria-label="닫기"
        >
          <X size={16} />
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339): Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        // @ts-expect-error TS(2339) FIXME: Property 'button' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
        </button>
      // @ts-expect-error TS(2339): Property 'header' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'header' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'header' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'header' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      </header>

      // @ts-expect-error TS(2339): Property 'main' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'main' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'main' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'main' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      <main className="min-h-0 flex-1 overflow-y-auto p-4">
        <LlmAssistPanel
          theme={remoteState.theme}
          profiles={remoteState.profiles || []}
          selectedProfileId={selectedProfileId}
          onSelectedProfileIdChange={(value: any) => {
            setSelectedProfileId(value);
            sendAction('set-llm-profile-id', { value });
          }}
          // @ts-expect-error TS(2339) FIXME: Property 'id' does not exist on type 'never'.
          selectedProfile={(remoteState.profiles || []).find((p) => p.id === selectedProfileId) || null}
          model={model}
          onModelChange={(value: any) => {
            setModel(value);
            sendAction('set-model', { value });
          }}
          selectedText={remoteState.selectedText}
          onRefreshSelection={() => sendAction('refresh-selection')}
          attachedImages={remoteState.attachedImages || []}
          onAddImages={async (images: any) => sendAction('add-images', { images })}
          onRemoveImage={(id: any) => sendAction('remove-image', { id })}
          instruction={instruction}
          onInstructionChange={handleInstructionChange}
          result={result}
          onResultChange={handleResultChange}
          resultViewMode={resultViewMode}
          onResultViewModeChange={(value: any) => {
            setResultViewMode(value);
            sendAction('set-result-view-mode', { value });
          }}
          loading={remoteState.loading}
          error={remoteState.error}
          templates={remoteState.templates}
          selectedTemplateId={remoteState.selectedTemplateId}
          onLoadTemplate={(id: any) => sendAction('load-template', { id })}
          templateName={templateName}
          onTemplateNameChange={handleTemplateNameChange}
          editingTemplateId={remoteState.editingTemplateId}
          onSaveTemplate={() => sendAction('save-template')}
          onNewTemplate={() => sendAction('new-template')}
          onDeleteTemplate={() => sendAction('delete-template')}
          onRun={() => sendAction('run')}
          onApplyResult={() => sendAction('apply-result')}
          remoteMode
          modelSelectAutoLoad={false}
        />
      // @ts-expect-error TS(2339): Property 'main' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'main' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      // @ts-expect-error TS(2339): Property 'main' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      // @ts-expect-error TS(2339) FIXME: Property 'main' does not exist on type 'JSX.Intrin... Remove this comment to see the full error message
      </main>
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339): Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    // @ts-expect-error TS(2339) FIXME: Property 'div' does not exist on type 'JSX.Intrins... Remove this comment to see the full error message
    </div>
  );
}

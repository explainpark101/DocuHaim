import { useCallback, useEffect, useRef, useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import LlmAssistPanel from '@/components/llm/LlmAssistPanel';
import {
  isLlmAssistMessage,
  LLM_ASSIST_MSG,
  postLlmAssistMessage,
} from '@/utils/llm/llmAssistBridge';
import { applyDocumentTheme, loadStoredTheme } from '@/utils/documentTheme';
import type { LlmProviderProfile } from '@/utils/llm/llmProviderProfiles';

if (typeof document !== 'undefined') {
  applyDocumentTheme(loadStoredTheme());
}

type LlmRemoteProfile = Pick<LlmProviderProfile, 'id' | 'name' | 'kind' | 'baseUrl'> & {
  apiKey?: string;
};

type LlmRemoteState = {
  selectedText: string;
  selectionRange: { from: number; to: number };
  attachedImages: Array<{
    id: string;
    name: string;
    mimeType: string;
    dataBase64: string;
    previewDataUrl: string;
  }>;
  instruction: string;
  result: string;
  resultViewMode: 'text' | 'preview';
  loading: boolean;
  error: string;
  templates: Array<{ id: string; name: string }>;
  selectedTemplateId: string;
  templateName: string;
  editingTemplateId: string | null;
  profiles: LlmRemoteProfile[];
  selectedProfileId: string;
  model: string;
  theme: string;
};

const EMPTY_STATE: LlmRemoteState = {
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

function postActionToOpener(action: string, payload: Record<string, unknown> = {}) {
  if (!window.opener || window.opener.closed) return;
  postLlmAssistMessage(window.opener, LLM_ASSIST_MSG.ACTION, { action, payload });
}

export default function LlmAssistPopoutPage() {
  const [remoteState, setRemoteState] = useState<LlmRemoteState>(EMPTY_STATE);
  const [instruction, setInstruction] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [result, setResult] = useState('');
  const [resultViewMode, setResultViewMode] = useState<'text' | 'preview'>('text');
  const [model, setModel] = useState('');
  const [selectedProfileId, setSelectedProfileId] = useState('');
  const [connected, setConnected] = useState(false);
  const readySentRef = useRef(false);

  useEffect(() => {
    applyDocumentTheme(remoteState.theme);
  }, [remoteState.theme]);

  const sendAction = useCallback((action: string, payload: Record<string, unknown> = {}) => {
    postActionToOpener(action, payload);
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (!isLlmAssistMessage(event.data)) return;

      if (event.data.type === LLM_ASSIST_MSG.SYNC && event.data.state) {
        const next = { ...EMPTY_STATE, ...event.data.state } as LlmRemoteState;
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
    (value: string) => {
      setInstruction(value);
      sendAction('set-instruction', { value });
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

  const handleClose = () => {
    sendAction('close');
    window.close();
  };

  const remoteProfiles: LlmProviderProfile[] = (remoteState.profiles || []).map((p) => ({
    id: p.id,
    name: p.name,
    kind: p.kind,
    baseUrl: p.baseUrl || '',
    apiKey: p.apiKey || '',
  }));

  const selectedProfile =
    remoteProfiles.find((p) => p.id === selectedProfileId) || null;

  return (
    <div className="llm-assist-popout-page flex min-h-screen flex-col bg-white dark:bg-odp-bgSofter">
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
          profiles={remoteProfiles}
          selectedProfileId={selectedProfileId}
          onSelectedProfileIdChange={(value) => {
            setSelectedProfileId(value);
            sendAction('set-llm-profile-id', { value });
          }}
          selectedProfile={selectedProfile}
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
          onApplyResult={() => sendAction('apply-result')}
          remoteMode
          modelSelectAutoLoad={false}
        />
      </main>
    </div>
  );
}

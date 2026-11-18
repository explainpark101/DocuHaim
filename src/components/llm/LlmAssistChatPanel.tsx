import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react';
import {
  Bot,
  BrainCircuit,
  ChevronUp,
  Eraser,
  Loader2,
  ScrollText,
  SendHorizontal,
  Square,
} from 'lucide-react';
import GeminiModelSelect from '@/components/GeminiModelSelect';
import OpenAiCompatibleModelSelect from '@/components/OpenAiCompatibleModelSelect';
import LlmProviderSelect from '@/components/LlmProviderSelect';
import LlmAssistAdvancedOptions from '@/components/llm/LlmAssistAdvancedOptions';
import LlmAssistCollapsible from '@/components/llm/LlmAssistCollapsible';
import LlamaCppModelSelect from '@/components/llm/LlamaCppModelSelect';
import MlxVlmModelSelect from '@/components/llm/MlxVlmModelSelect';
import { getDefaultLlmAssistSystemPrompt } from '@/utils/llm/llmAssistBaseSystemPrompt';
import {
  LLM_PROVIDER_EXAONE,
  LLM_PROVIDER_LLAMA_CPP,
  LLM_PROVIDER_MLX_VLM,
  LLM_PROVIDER_OPENAI_COMPATIBLE,
  resolveOpenAiCompatibleProfileBaseUrl,
  type LlmProviderProfile,
} from '@/utils/llm/llmProviderProfiles';
import { listExaoneModels } from '@/utils/exaoneSettings';
import { isTauriDesktopPlatform } from '@/utils/tauriPlatform';
import type { LlmChatMessage } from '@/utils/llm/llmChatStream';

export type LlmAssistChatPanelProps = {
  profiles?: LlmProviderProfile[];
  selectedProfileId?: string;
  onSelectedProfileIdChange?: (profileId: string) => void;
  selectedProfile?: LlmProviderProfile | null;
  model?: string;
  onModelChange?: (modelId: string) => void;
  systemPrompt?: string;
  onSystemPromptChange?: (value: string) => void;
  requestOptions?: Record<string, unknown>;
  onRequestOptionsChange?: (value: Record<string, unknown>) => void;
  messages: LlmChatMessage[];
  draft: string;
  onDraftChange?: (value: string) => void;
  loading?: boolean;
  error?: string;
  onSend?: () => void;
  onCancel?: () => void;
  onClearMessages?: () => void;
  modelSelectAutoLoad?: boolean;
};

export default function LlmAssistChatPanel({
  profiles = [],
  selectedProfileId = '',
  onSelectedProfileIdChange = () => {},
  selectedProfile = null,
  model = '',
  onModelChange = () => {},
  systemPrompt = '',
  onSystemPromptChange,
  requestOptions = { temperature: 0.4 },
  onRequestOptionsChange,
  messages,
  draft,
  onDraftChange,
  loading = false,
  error = '',
  onSend,
  onCancel,
  onClearMessages,
  modelSelectAutoLoad = true,
}: LlmAssistChatPanelProps) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [systemPromptOpen, setSystemPromptOpen] = useState(false);
  const isDefaultSystemPrompt =
    systemPrompt.trim() === getDefaultLlmAssistSystemPrompt();

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  const canSend = Boolean(selectedProfile) && draft.trim().length > 0 && !loading;

  const handleSubmit = useCallback(
    (event?: FormEvent) => {
      event?.preventDefault();
      if (!canSend) return;
      onSend?.();
    },
    [canSend, onSend],
  );

  const handleDraftKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key !== 'Enter' || event.nativeEvent.isComposing) return;
      if (!(event.metaKey || event.ctrlKey)) return;
      event.preventDefault();
      if (!canSend) return;
      onSend?.();
    },
    [canSend, onSend],
  );

  return (
    <div className="flex h-full min-h-0 flex-col gap-2 text-xs">
      <div className="shrink-0 space-y-2">
        <div>
          <label className="mb-1 flex items-center gap-1 font-semibold text-gray-700 dark:text-odp-fgStrong">
            <Bot size={13} className="opacity-70" aria-hidden />
            제공자
          </label>
          <LlmProviderSelect
            profiles={profiles}
            value={selectedProfileId}
            onChange={onSelectedProfileIdChange}
          />
        </div>

        {selectedProfile ? (
          <div>
            <label className="mb-1 flex items-center gap-1 font-semibold text-gray-700 dark:text-odp-fgStrong">
              <BrainCircuit size={13} className="opacity-70" aria-hidden />
              모델
            </label>
            {selectedProfile.kind === LLM_PROVIDER_OPENAI_COMPATIBLE ||
            selectedProfile.kind === LLM_PROVIDER_EXAONE ? (
              <OpenAiCompatibleModelSelect
                key={`${selectedProfile.id}-${selectedProfile.kind}`}
                reloadKey={`${selectedProfile.id}:${resolveOpenAiCompatibleProfileBaseUrl(selectedProfile)}`}
                getBaseUrl={() => resolveOpenAiCompatibleProfileBaseUrl(selectedProfile)}
                getApiKey={() => selectedProfile.apiKey || ''}
                {...(selectedProfile.kind === LLM_PROVIDER_EXAONE
                  ? {
                      listModels: ({ apiKey }: { apiKey: string }) => listExaoneModels(apiKey),
                      placeholder: '모델 ID (예: k-exaone_v2.5)',
                      helpText: '채팅 모델을 고르세요. Tabular 모델은 채팅 모드에서 사용할 수 없습니다.',
                    }
                  : {})}
                value={model}
                onChange={onModelChange}
                autoLoad={modelSelectAutoLoad}
              />
            ) : selectedProfile.kind === LLM_PROVIDER_LLAMA_CPP ? (
              isTauriDesktopPlatform() ? (
                <LlamaCppModelSelect
                  key={`${selectedProfile.id}-llama-cpp`}
                  value={model}
                  onChange={onModelChange}
                  autoLoad={modelSelectAutoLoad}
                />
              ) : (
                <OpenAiCompatibleModelSelect
                  key={`${selectedProfile.id}-llama-cpp-remote`}
                  reloadKey={`${selectedProfile.id}:${selectedProfile.baseUrl || ''}`}
                  getBaseUrl={() => selectedProfile.baseUrl || ''}
                  getApiKey={() => selectedProfile.apiKey || ''}
                  value={model}
                  onChange={onModelChange}
                  autoLoad={modelSelectAutoLoad}
                  aliasScope="llama-cpp"
                />
              )
            ) : selectedProfile.kind === LLM_PROVIDER_MLX_VLM ? (
              <MlxVlmModelSelect
                key={`${selectedProfile.id}-mlx`}
                value={model}
                onChange={onModelChange}
                autoLoad={modelSelectAutoLoad}
                autoLoadModelOnSelect={false}
              />
            ) : (
              <GeminiModelSelect
                key={`${selectedProfile.id}-gemini`}
                getGeminiApiKey={() => selectedProfile.apiKey || ''}
                profileId={selectedProfile.id}
                value={model}
                onChange={onModelChange}
                autoLoad={modelSelectAutoLoad}
              />
            )}
          </div>
        ) : null}

        <div>
          <button
            type="button"
            onClick={() => setSystemPromptOpen((v) => !v)}
            className={`mb-1 flex w-full items-center justify-between gap-x-2 gap-y-1 rounded px-2 py-1.5 text-left font-semibold text-gray-700 dark:text-odp-fgStrong ${
              systemPromptOpen
                ? 'bg-transparent'
                : 'bg-slate-300/90 dark:bg-slate-950/40'
            }`}
            aria-expanded={systemPromptOpen}
          >
            <span className="inline-flex min-w-0 items-center gap-1 whitespace-nowrap">
              <ScrollText size={13} className="opacity-70" aria-hidden />
              시스템 프롬프트
              {!systemPromptOpen && systemPrompt.trim() ? (
                <span className="ml-1 font-normal text-gray-500 dark:text-odp-muted">
                  {isDefaultSystemPrompt ? '(기본)' : '(수정됨)'}
                </span>
              ) : null}
            </span>
            <ChevronUp
              size={14}
              aria-hidden
              className={`shrink-0 opacity-70 transition-transform ${systemPromptOpen ? 'rotate-180' : ''}`}
            />
          </button>
          <LlmAssistCollapsible open={systemPromptOpen}>
            <div className="space-y-1.5">
              <textarea
                value={systemPrompt}
                onChange={(e) => onSystemPromptChange?.(e.target.value)}
                rows={3}
                className="w-full resize-y rounded border border-gray-200 bg-white px-2 py-1.5 text-[11px] leading-relaxed text-gray-800 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg"
              />
              <button
                type="button"
                disabled={isDefaultSystemPrompt}
                onClick={() => onSystemPromptChange?.(getDefaultLlmAssistSystemPrompt())}
                className="inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[10px] text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft"
              >
                기본값으로 되돌리기
              </button>
            </div>
          </LlmAssistCollapsible>
        </div>

        <LlmAssistAdvancedOptions
          value={requestOptions}
          onChange={(next) => onRequestOptionsChange?.(next)}
        />
      </div>

      <div
        ref={listRef}
        className="min-h-0 flex-1 space-y-2 overflow-y-auto rounded-md border border-violet-200/60 bg-violet-50/40 p-2 dark:border-violet-800/50 dark:bg-violet-950/20"
        aria-live="polite"
      >
        {messages.length === 0 && !loading ? (
          <p className="px-1 py-6 text-center text-[11px] text-gray-500 dark:text-odp-muted">
            메시지를 보내 대화를 시작하세요.
          </p>
        ) : null}
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[92%] whitespace-pre-wrap break-words rounded-2xl px-3 py-2 text-[11px] leading-relaxed ${
                  isUser
                    ? 'rounded-br-md bg-violet-600 text-white dark:bg-violet-500'
                    : 'rounded-bl-md border border-violet-200/70 bg-white text-gray-800 dark:border-violet-800/60 dark:bg-odp-surface dark:text-odp-fg'
                }`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
        {loading ? (
          <div className="flex items-center gap-1.5 px-1 text-[11px] text-violet-700 dark:text-violet-300">
            <Loader2 size={12} className="animate-spin" aria-hidden />
            응답 생성 중…
          </div>
        ) : null}
      </div>

      {error ? (
        <p className="shrink-0 whitespace-pre-wrap rounded border border-red-300 bg-red-50 px-2 py-1.5 text-[11px] text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </p>
      ) : null}

      <form onSubmit={handleSubmit} className="shrink-0 space-y-1.5">
        <textarea
          value={draft}
          onChange={(e) => onDraftChange?.(e.target.value)}
          onKeyDown={handleDraftKeyDown}
          rows={3}
          placeholder="메시지 입력 (Ctrl/Cmd+Enter 전송)"
          className="w-full resize-y rounded border border-gray-200 bg-white px-2 py-1.5 text-[11px] leading-relaxed text-gray-800 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg"
          disabled={loading}
        />
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <button
            type="button"
            onClick={() => onClearMessages?.()}
            disabled={loading || messages.length === 0}
            className="inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-1.5 text-[11px] text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft"
          >
            <Eraser size={13} aria-hidden />
            대화 지우기
          </button>
          {loading ? (
            <button
              type="button"
              onClick={() => onCancel?.()}
              className="inline-flex items-center gap-1.5 rounded border border-red-400 bg-red-50 px-3 py-1.5 text-[11px] font-medium text-red-700 hover:bg-red-100 dark:border-red-700 dark:bg-red-950/40 dark:text-red-200 dark:hover:bg-red-900/50"
            >
              <Square size={13} aria-hidden />
              중단
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canSend}
              className="inline-flex items-center gap-1.5 rounded border border-violet-400 bg-violet-50 px-3 py-1.5 text-[11px] font-medium text-violet-800 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-violet-600 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/60"
            >
              <SendHorizontal size={13} aria-hidden />
              전송
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

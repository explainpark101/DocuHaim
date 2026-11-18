import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react';
import {
  ArrowDownToLine,
  Bot,
  BrainCircuit,
  ChevronUp,
  Copy,
  CornerLeftDown,
  FilePlus,
  FileStack,
  History,
  ImagePlus,
  Loader2,
  MessageSquarePlus,
  RefreshCw,
  ScrollText,
  SendHorizontal,
  Settings2,
  Square,
  Trash2,
  X,
} from 'lucide-react';
import { DropdownMenu, Tooltip } from 'radix-ui';
import GeminiModelSelect from '@/components/GeminiModelSelect';
import OpenAiCompatibleModelSelect from '@/components/OpenAiCompatibleModelSelect';
import LlmProviderSelect from '@/components/LlmProviderSelect';
import LlmAssistAdvancedOptions from '@/components/llm/LlmAssistAdvancedOptions';
import LlmAssistCollapsible from '@/components/llm/LlmAssistCollapsible';
import LlmAssistIconTooltipButton from '@/components/llm/LlmAssistIconTooltipButton';
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
import {
  formatLlmChatUserContent,
  type LlmChatImageAttachment,
  type LlmChatMessage,
} from '@/utils/llm/llmChatStream';
import LlmAssistChatReferenceList from '@/components/llm/LlmAssistChatReferenceList';
import type { LlmAssistChatReference } from '@/utils/llm/llmAssistChatReferences';
import type { LlmAssistChatThread } from '@/utils/llm/llmAssistChatThreads';

const LlmAssistChatHaimPreview = lazy(
  () => import('@/components/llm/LlmAssistChatHaimPreview'),
);

const TOOLTIP_CLASS =
  'z-100051 max-w-[min(92vw,280px)] rounded-md border border-violet-200/80 bg-white px-2 py-1 text-xs text-violet-950 shadow-md dark:border-violet-800/60 dark:bg-odp-surface dark:text-violet-50';

const DROPDOWN_CONTENT_CLASS =
  'z-100051 max-h-[min(60vh,320px)] min-w-[220px] overflow-y-auto rounded-md border border-violet-200/80 bg-white p-1 shadow-lg dark:border-violet-800/60 dark:bg-odp-surface';

const LINE_HEIGHT_PX = 18;
const MAX_INPUT_LINES = 5;

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
  references?: LlmAssistChatReference[];
  onRemoveReference?: (id: string) => void;
  onReorderReferences?: (next: LlmAssistChatReference[]) => void;
  /** Register the chat surface as a tree/tab file-reference drop host. */
  dropHostRef?: (node: HTMLDivElement | null) => void;
  autoActiveTabReference?: boolean;
  onAutoActiveTabReferenceChange?: (enabled: boolean) => void;
  /** Live label for the focused file tab (e.g. `note.md`). */
  activeTabBadgeLabel?: string | null;
  onAddActiveTabReference?: () => void;
  attachedImages?: LlmChatImageAttachment[];
  onAddImages?: (files: FileList | File[] | null) => void | Promise<void>;
  onRemoveImage?: (id: string) => void;
  threads?: LlmAssistChatThread[];
  activeThreadId?: string | null;
  onSelectThread?: (threadId: string) => void;
  onDeleteThread?: (threadId: string) => void;
  onNewThread?: () => void;
  loading?: boolean;
  error?: string;
  onSend?: () => void;
  onCancel?: () => void;
  canInsertIntoDocument?: boolean;
  onCopyMessage?: (message: LlmChatMessage) => void;
  onResendMessage?: (messageId: string) => void;
  onRegenerateMessage?: (messageId: string) => void;
  onApplyResult?: (content: string) => void;
  onAppendResult?: (content: string) => void;
  onCreateNoteFromResult?: (content: string) => void;
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
  references = [],
  onRemoveReference,
  onReorderReferences,
  dropHostRef,
  autoActiveTabReference = false,
  onAutoActiveTabReferenceChange,
  activeTabBadgeLabel = null,
  onAddActiveTabReference,
  attachedImages = [],
  onAddImages,
  onRemoveImage,
  threads = [],
  activeThreadId = null,
  onSelectThread,
  onDeleteThread,
  onNewThread,
  loading = false,
  error = '',
  onSend,
  onCancel,
  canInsertIntoDocument = true,
  onCopyMessage,
  onResendMessage,
  onRegenerateMessage,
  onApplyResult,
  onAppendResult,
  onCreateNoteFromResult,
  modelSelectAutoLoad = true,
}: LlmAssistChatPanelProps) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const draftRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [systemPromptOpen, setSystemPromptOpen] = useState(false);
  const isDefaultSystemPrompt =
    systemPrompt.trim() === getDefaultLlmAssistSystemPrompt();

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, loading, references, attachedImages]);

  useLayoutEffect(() => {
    const el = draftRef.current;
    if (!el) return;
    el.style.height = 'auto';
    const max = LINE_HEIGHT_PX * MAX_INPUT_LINES + 16;
    const next = Math.min(Math.max(el.scrollHeight, LINE_HEIGHT_PX + 16), max);
    el.style.height = `${next}px`;
  }, [draft]);

  const canSend =
    Boolean(selectedProfile) &&
    !loading &&
    (draft.trim().length > 0 ||
      references.some((r) => r.text.trim()) ||
      attachedImages.length > 0 ||
      (autoActiveTabReference && Boolean(activeTabBadgeLabel)));

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
      if (event.shiftKey) return;
      event.preventDefault();
      if (!canSend) return;
      onSend?.();
    },
    [canSend, onSend],
  );

  return (
    <div
      ref={dropHostRef}
      className="relative flex h-full min-h-0 flex-col gap-2 text-xs"
    >
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-1.5">
        <div className="flex min-w-0 flex-wrap items-center gap-1">
          <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  type="button"
                  onClick={() => setSettingsOpen((v) => !v)}
                  className={`inline-flex items-center gap-1 rounded border px-2 py-1.5 text-[11px] ${
                    settingsOpen
                      ? 'border-violet-400 bg-violet-50 text-violet-800 dark:border-violet-600 dark:bg-violet-950/50 dark:text-violet-100'
                      : 'border-gray-300 text-gray-600 hover:bg-gray-50 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft'
                  }`}
                  aria-expanded={settingsOpen}
                  aria-label="채팅 설정"
                >
                  <Settings2 size={13} aria-hidden />
                  설정
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content side="bottom" sideOffset={6} className={TOOLTIP_CLASS}>
                  제공자·모델·시스템 프롬프트
                  <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>

          <DropdownMenu.Root>
            <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <DropdownMenu.Trigger asChild>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-1.5 text-[11px] text-gray-600 hover:bg-gray-50 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft"
                      aria-label="대화 목록"
                    >
                      <History size={13} aria-hidden />
                      대화
                    </button>
                  </DropdownMenu.Trigger>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content side="bottom" sideOffset={6} className={TOOLTIP_CLASS}>
                    저장된 대화 스레드
                    <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
            <DropdownMenu.Portal>
              <DropdownMenu.Content align="start" sideOffset={6} className={DROPDOWN_CONTENT_CLASS}>
                {threads.length === 0 ? (
                  <div className="px-2 py-3 text-[11px] text-gray-500 dark:text-odp-muted">
                    저장된 대화가 없습니다.
                  </div>
                ) : (
                  threads.map((thread) => {
                    const active = thread.id === activeThreadId;
                    return (
                      <div
                        key={thread.id}
                        className={`flex items-center gap-1 rounded px-1 py-0.5 ${
                          active ? 'bg-violet-50 dark:bg-violet-950/40' : ''
                        }`}
                      >
                        <DropdownMenu.Item
                          className="min-w-0 flex-1 cursor-pointer rounded px-2 py-1.5 text-left text-[11px] outline-none hover:bg-violet-100 dark:hover:bg-violet-900/40"
                          onSelect={() => onSelectThread?.(thread.id)}
                        >
                          <div className="truncate font-medium text-gray-800 dark:text-odp-fg">
                            {thread.title || '새 대화'}
                          </div>
                          <div className="text-[10px] text-gray-500 dark:text-odp-muted">
                            {new Date(thread.updatedAt).toLocaleString()}
                          </div>
                        </DropdownMenu.Item>
                        <button
                          type="button"
                          className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
                          aria-label="대화 삭제"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onDeleteThread?.(thread.id);
                          }}
                        >
                          <Trash2 size={12} aria-hidden />
                        </button>
                      </div>
                    );
                  })
                )}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>

        <button
          type="button"
          onClick={() => onNewThread?.()}
          disabled={loading}
          className="inline-flex items-center gap-1 rounded border border-violet-400 bg-violet-50 px-2 py-1.5 text-[11px] font-medium text-violet-800 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-violet-600 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/60"
        >
          <MessageSquarePlus size={13} aria-hidden />
          새 대화
        </button>
      </div>

      {settingsOpen ? (
        <div className="shrink-0 space-y-2 rounded-md border border-violet-200/70 bg-violet-50/50 p-2 dark:border-violet-800/50 dark:bg-violet-950/20">
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
                        helpText:
                          '채팅 모델을 고르세요. Tabular 모델은 채팅 모드에서 사용할 수 없습니다.',
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
      ) : null}

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
          const isStreamingAssistant =
            !isUser && loading && !msg.content.trim() && messages[messages.length - 1]?.id === msg.id;
          return (
            <div
              key={msg.id}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[min(100%,36rem)] min-w-0 space-y-1.5 rounded-2xl px-3 py-2 text-[11px] leading-relaxed ${
                  isUser
                    ? 'rounded-br-md bg-violet-600 text-white dark:bg-violet-500'
                    : 'rounded-bl-md border border-violet-200/70 bg-white text-gray-800 dark:border-violet-800/60 dark:bg-odp-surface dark:text-odp-fg'
                }`}
              >
                {msg.references?.length ? (
                  <LlmAssistChatReferenceList
                    references={msg.references}
                    tone={isUser ? 'user' : 'composer'}
                    className={isUser ? 'opacity-95' : ''}
                  />
                ) : null}
                {msg.images?.length ? (
                  <div className="flex flex-wrap gap-1">
                    {msg.images.map((img, idx) => (
                      <img
                        key={img.id || `${msg.id}-img-${idx}`}
                        src={
                          img.previewDataUrl ||
                          `data:${img.mimeType};base64,${img.dataBase64}`
                        }
                        alt={img.name || 'attachment'}
                        className="h-14 w-14 rounded object-cover"
                      />
                    ))}
                  </div>
                ) : null}

                {isUser ? (
                  <div className="whitespace-pre-wrap break-words">{msg.content}</div>
                ) : isStreamingAssistant ? (
                  <div className="flex items-center gap-1.5 text-violet-700 dark:text-violet-300">
                    <Loader2 size={12} className="animate-spin" aria-hidden />
                    응답 생성 중…
                  </div>
                ) : (
                  <Suspense
                    fallback={
                      <div className="whitespace-pre-wrap break-words text-[12px]">
                        {msg.content}
                      </div>
                    }
                  >
                    <LlmAssistChatHaimPreview markdown={msg.content} />
                  </Suspense>
                )}

                {!loading || messages[messages.length - 1]?.id !== msg.id ? (
                  <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
                    <div
                      className={`flex flex-wrap items-center gap-1 pt-0.5 ${
                        isUser ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {isUser ? (
                        <>
                          <LlmAssistIconTooltipButton
                            label="요청 내용 복사"
                            onClick={() => onCopyMessage?.(msg)}
                            disabled={!formatLlmChatUserContent(msg).trim()}
                            className="border-white/30 bg-white/15 text-white hover:bg-white/25 dark:border-white/20"
                          >
                            <Copy size={13} aria-hidden />
                          </LlmAssistIconTooltipButton>
                          <LlmAssistIconTooltipButton
                            label="다시 보내기"
                            onClick={() => onResendMessage?.(msg.id)}
                            disabled={loading}
                            className="border-white/30 bg-white/15 text-white hover:bg-white/25 dark:border-white/20"
                          >
                            <RefreshCw size={13} aria-hidden />
                          </LlmAssistIconTooltipButton>
                        </>
                      ) : (
                        <>
                          <LlmAssistIconTooltipButton
                            label="응답 복사"
                            onClick={() => onCopyMessage?.(msg)}
                            disabled={!msg.content.trim()}
                          >
                            <Copy size={13} aria-hidden />
                          </LlmAssistIconTooltipButton>
                          <LlmAssistIconTooltipButton
                            label="새로고침"
                            onClick={() => onRegenerateMessage?.(msg.id)}
                            disabled={loading || !msg.content.trim()}
                          >
                            <RefreshCw size={13} aria-hidden />
                          </LlmAssistIconTooltipButton>
                          {canInsertIntoDocument ? (
                            <>
                              <LlmAssistIconTooltipButton
                                label="대체하기"
                                onClick={() => onApplyResult?.(msg.content)}
                                disabled={!msg.content.trim()}
                              >
                                <CornerLeftDown size={13} aria-hidden />
                              </LlmAssistIconTooltipButton>
                              <LlmAssistIconTooltipButton
                                label="아래에 추가"
                                onClick={() => onAppendResult?.(msg.content)}
                                disabled={!msg.content.trim()}
                              >
                                <ArrowDownToLine size={13} aria-hidden />
                              </LlmAssistIconTooltipButton>
                            </>
                          ) : null}
                          <LlmAssistIconTooltipButton
                            label="새 노트로"
                            onClick={() => onCreateNoteFromResult?.(msg.content)}
                            disabled={!msg.content.trim()}
                          >
                            <FilePlus size={13} aria-hidden />
                          </LlmAssistIconTooltipButton>
                        </>
                      )}
                    </div>
                  </Tooltip.Provider>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {error ? (
        <p className="shrink-0 whitespace-pre-wrap rounded border border-red-300 bg-red-50 px-2 py-1.5 text-[11px] text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </p>
      ) : null}

      <div className="flex shrink-0 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-1">
          <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  type="button"
                  onClick={() =>
                    onAutoActiveTabReferenceChange?.(!autoActiveTabReference)
                  }
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                    autoActiveTabReference
                      ? 'border-amber-400 bg-amber-50 text-amber-900 dark:border-amber-600 dark:bg-amber-950/50 dark:text-amber-100'
                      : 'border-gray-300 text-gray-600 hover:bg-gray-50 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft'
                  }`}
                  aria-pressed={autoActiveTabReference}
                  aria-label="현재 탭 자동 참고"
                >
                  <FileStack size={11} aria-hidden />
                  현재 탭 자동
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content side="top" sideOffset={6} className={TOOLTIP_CLASS}>
                  전송 시 보고 있는 노트 전체를 레퍼런스에 포함
                  <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
          {activeTabBadgeLabel ? (
            <button
              type="button"
              onClick={() => onAddActiveTabReference?.()}
              disabled={loading}
              className="inline-flex max-w-[min(100%,12rem)] items-center gap-1 rounded-full border border-sky-300 bg-sky-50 px-2 py-0.5 text-[10px] font-medium text-sky-900 hover:bg-sky-100 disabled:opacity-50 dark:border-sky-700 dark:bg-sky-950/40 dark:text-sky-100 dark:hover:bg-sky-900/50"
              title="현재 탭을 파일 레퍼런스로 추가"
            >
              <span className="truncate">{activeTabBadgeLabel} · 전체</span>
              <span className="shrink-0 opacity-70">+</span>
            </button>
          ) : null}
        </div>
        {autoActiveTabReference && activeTabBadgeLabel ? (
          <div className="inline-flex max-w-full items-center gap-1 rounded-full border border-amber-300/80 bg-amber-50/90 px-2 py-0.5 text-[10px] font-medium text-amber-950 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-100">
            <FileStack size={11} className="shrink-0 opacity-80" aria-hidden />
            <span className="truncate">자동 · {activeTabBadgeLabel}</span>
          </div>
        ) : null}
        {references.length > 0 ? (
          <LlmAssistChatReferenceList
            references={references}
            editable
            tone="composer"
            onRemove={(id) => onRemoveReference?.(id)}
            onReorder={(next) => onReorderReferences?.(next)}
          />
        ) : null}
      </div>

      {attachedImages.length > 0 ? (
        <div className="flex shrink-0 flex-wrap gap-1.5">
          {attachedImages.map((img) => (
            <div key={img.id || img.previewDataUrl} className="relative">
              <img
                src={
                  img.previewDataUrl || `data:${img.mimeType};base64,${img.dataBase64}`
                }
                alt={img.name || 'attachment'}
                className="h-14 w-14 rounded border border-violet-200 object-cover dark:border-violet-800"
              />
              <button
                type="button"
                className="absolute -right-1 -top-1 rounded-full bg-black/70 p-0.5 text-white"
                aria-label="이미지 제거"
                onClick={() => img.id && onRemoveImage?.(img.id)}
              >
                <X size={10} aria-hidden />
              </button>
            </div>
          ))}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="shrink-0 space-y-1.5">
        <textarea
          ref={draftRef}
          value={draft}
          onChange={(e) => onDraftChange?.(e.target.value)}
          onKeyDown={handleDraftKeyDown}
          rows={1}
          placeholder="메시지 입력 (Enter 전송 · Shift+Enter 줄바꿈)"
          className="w-full resize-none overflow-y-auto rounded border border-gray-200 bg-white px-2 py-1.5 text-[11px] leading-[18px] text-gray-800 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg"
          disabled={loading}
        />
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <div className="flex items-center gap-1">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                void onAddImages?.(e.target.files);
                e.target.value = '';
              }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={loading || !onAddImages}
              className="inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-1.5 text-[11px] text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft"
              aria-label="이미지 첨부"
            >
              <ImagePlus size={13} aria-hidden />
              이미지
            </button>
          </div>
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

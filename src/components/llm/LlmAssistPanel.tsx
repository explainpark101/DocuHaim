import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowDownToLine,
  Bookmark,
  Bot,
  BrainCircuit,
  ClipboardPaste,
  Copy,
  Image as ImageIcon,
  ImageOff,
  ImagePlus,
  Loader2,
  MessageSquareText,
  Plus,
  RefreshCw,
  RotateCcw,
  Save,
  ScrollText,
  Sparkles,
  Eye,
  FilePlus,
  FileText,
  TextCursorInput,
  Trash2,
  X,
  ChevronUp,
  TextCursor,
  CornerLeftDown,
  ZoomIn,
} from 'lucide-react';
import { MdPreview } from 'md-editor-rt';
import { Tooltip } from 'radix-ui';
import '@/styles/md-editor-rt/style.css';
import { MD_EDITOR_CODE_THEME } from '@/utils/mdEditorCodeTheme';
import { MD_EDITOR_CUSTOM_ICONS } from '@/utils/mdEditorCustomIcons';
import { useLazyMermaidRender } from '@/hooks/useLazyMermaidRender';
import GeminiModelSelect from '@/components/GeminiModelSelect';
import OpenAiCompatibleModelSelect from '@/components/OpenAiCompatibleModelSelect';
import LlmProviderSelect from '@/components/LlmProviderSelect';
import { LLM_PROVIDER_LLAMA_CPP, LLM_PROVIDER_MLX_VLM, LLM_PROVIDER_OPENAI_COMPATIBLE } from '@/utils/llmProviderProfiles';
import MlxVlmModelSelect from '@/components/llm/MlxVlmModelSelect';
import {
  extractImageFilesFromClipboard,
  readImageFilesAsAttachments,
  readImageFilesFromClipboardApi,
} from '@/utils/llmAssistImages';
import LlmAssistAdvancedOptions from '@/components/llm/LlmAssistAdvancedOptions';
import LlmAssistCollapsible from '@/components/llm/LlmAssistCollapsible';
import LlmAssistImageDropZone from '@/components/llm/LlmAssistImageDropZone';
import LlmAssistImageLightbox from '@/components/llm/LlmAssistImageLightbox';
import { useReliableButtonAction } from '@/components/llm/useReliableButtonAction';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { getDefaultLlmAssistSystemPrompt } from '@/utils/llm/llmAssistBaseSystemPrompt';
import type { LlmAssistPresentation } from '@/utils/llm/llmAssistPresentation';
import type { LlmProviderProfile } from '@/utils/llm/llmProviderProfiles';

const RESULT_PREVIEW_ID = 'llm-assist-result-preview';

const LABEL_ICON_CLASS = 'shrink-0 opacity-70';

export type LlmAssistImageAttachment = {
  id: string;
  name: string;
  mimeType: string;
  dataBase64: string;
  previewDataUrl: string;
};

export type LlmAssistPromptTemplate = {
  id: string;
  name: string;
  instruction: string;
  systemPrompt?: string;
  requestOptions?: Record<string, unknown>;
  updatedAt: number;
};

export type LlmAssistResultViewMode = 'text' | 'preview';

export type LlmAssistPanelProps = {
  theme?: string;
  profiles?: LlmProviderProfile[];
  selectedProfileId?: string;
  onSelectedProfileIdChange?: (profileId: string) => void;
  selectedProfile?: LlmProviderProfile | null;
  model?: string;
  onModelChange?: (modelId: string) => void;
  selectedText: string;
  onRefreshSelection?: () => void;
  attachedImages?: LlmAssistImageAttachment[];
  onAddImages?: (images: LlmAssistImageAttachment[]) => void | Promise<void>;
  onRemoveImage?: (imageId: string) => void;
  onClearImages?: () => void;
  instruction: string;
  onInstructionChange?: (value: string) => void;
  systemPrompt?: string;
  onSystemPromptChange?: (value: string) => void;
  requestOptions?: Record<string, unknown>;
  onRequestOptionsChange?: (value: Record<string, unknown>) => void;
  result: string;
  onResultChange?: (value: string) => void;
  resultViewMode?: LlmAssistResultViewMode;
  onResultViewModeChange?: (mode: LlmAssistResultViewMode) => void;
  loading?: boolean;
  error?: string;
  templates?: LlmAssistPromptTemplate[];
  selectedTemplateId?: string;
  onLoadTemplate?: (templateId: string) => void;
  templateName?: string;
  onTemplateNameChange?: (value: string) => void;
  editingTemplateId?: string | null;
  onSaveTemplate?: () => void;
  onNewTemplate?: () => void;
  onDeleteTemplate?: () => void;
  onRun?: () => void;
  onCancelGeneration?: () => void;
  onApplyResult?: () => void;
  onAppendResult?: () => void;
  onCopyResult?: () => void;
  onCreateNoteFromResult?: () => void;
  presentation?: LlmAssistPresentation;
  canInsertIntoDocument?: boolean;
  remoteMode?: boolean;
  modelSelectAutoLoad?: boolean;
  /** When false, parent chrome owns OS image drop (dock / floating shell). */
  enableImageDropZone?: boolean;
};

type PanelLabelProps = {
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
};

function PanelLabel({ icon: Icon, children, className = '' }: PanelLabelProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold text-gray-700 dark:text-odp-fgStrong ${className}`}
    >
      {Icon ? <Icon size={13} className={LABEL_ICON_CLASS} aria-hidden /> : null}
      {children}
    </span>
  );
}

export default function LlmAssistPanel({
  theme = 'light',
  profiles = [],
  selectedProfileId = '',
  onSelectedProfileIdChange = () => {},
  selectedProfile = null,
  model = '',
  onModelChange = () => {},
  selectedText,
  onRefreshSelection,
  attachedImages = [],
  onAddImages,
  onRemoveImage,
  onClearImages,
  instruction,
  onInstructionChange,
  systemPrompt = '',
  onSystemPromptChange,
  requestOptions = { temperature: 0.4 },
  onRequestOptionsChange,
  result,
  onResultChange,
  resultViewMode = 'text',
  onResultViewModeChange,
  loading = false,
  error = '',
  templates = [],
  selectedTemplateId = '',
  onLoadTemplate,
  templateName = '',
  onTemplateNameChange,
  editingTemplateId = null,
  onSaveTemplate,
  onNewTemplate,
  onDeleteTemplate,
  onRun,
  onCancelGeneration,
  onApplyResult,
  onAppendResult,
  onCopyResult,
  onCreateNoteFromResult,
  presentation = 'floating',
  canInsertIntoDocument = true,
  remoteMode = false,
  modelSelectAutoLoad = true,
  enableImageDropZone = true,
}: LlmAssistPanelProps) {
  const resultReadOnly = loading || (remoteMode ? false : !result);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const resultPreviewRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageError, setImageError] = useState('');
  const [addingImages, setAddingImages] = useState(false);
  const [systemPromptOpen, setSystemPromptOpen] = useState(false);
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<LlmAssistImageAttachment | null>(null);

  useEffect(() => {
    if (!loading) setCancelConfirmOpen(false);
  }, [loading]);

  useLazyMermaidRender(resultPreviewRef, {
    layoutKey: `${theme}|${result || ''}|${resultViewMode}`,
  });

  const handlePickImages = useCallback(async (fileList: FileList | File[] | null) => {
    if (!fileList?.length || !onAddImages) return;
    setImageError('');
    setAddingImages(true);
    try {
      const next = await readImageFilesAsAttachments(fileList);
      await onAddImages(next);
    } catch (err: unknown) {
      setImageError(err instanceof Error ? err.message : '이미지를 추가할 수 없습니다.');
    } finally {
      setAddingImages(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }, [onAddImages]);

  const handlePasteFromClipboard = useCallback(async () => {
    if (!onAddImages || addingImages) return;
    setImageError('');
    setAddingImages(true);
    try {
      const files = await readImageFilesFromClipboardApi();
      if (!files.length) {
        setImageError('클립보드에 이미지가 없습니다. Ctrl/Cmd+V로 붙여넣을 수도 있습니다.');
        return;
      }
      const next = await readImageFilesAsAttachments(files);
      await onAddImages(next);
    } catch (err: unknown) {
      setImageError(err instanceof Error ? err.message : '클립보드 이미지를 붙여넣을 수 없습니다.');
    } finally {
      setAddingImages(false);
    }
  }, [onAddImages, addingImages]);

  useEffect(() => {
    const onPaste = async (e: ClipboardEvent) => {
      if (!onAddImages || !panelRef.current) return;
      if (!(e.target instanceof Node) || !panelRef.current.contains(e.target)) return;
      if (addingImages) return;

      const files = extractImageFilesFromClipboard(e.clipboardData ?? null);
      if (!files.length) return;

      e.preventDefault();
      setImageError('');
      setAddingImages(true);
      try {
        const next = await readImageFilesAsAttachments(files);
        await onAddImages(next);
      } catch (err:any) {
        setImageError(err?.message || '클립보드 이미지를 붙여넣을 수 없습니다.');
      } finally {
        setAddingImages(false);
      }
    };

    document.addEventListener('paste', onPaste);
    return () => document.removeEventListener('paste', onPaste);
  }, [onAddImages, addingImages]);

  const isDefaultSystemPrompt =
    systemPrompt.trim() === getDefaultLlmAssistSystemPrompt();

  const resultActionsDisabled = !result;
  const applyResultPress = useReliableButtonAction(onApplyResult, resultActionsDisabled);
  const copyResultPress = useReliableButtonAction(onCopyResult, resultActionsDisabled);
  const appendResultPress = useReliableButtonAction(onAppendResult, resultActionsDisabled);
  const createNotePress = useReliableButtonAction(onCreateNoteFromResult, resultActionsDisabled);
  const runPress = useReliableButtonAction(
    () => onRun?.(),
    Boolean(loading || !selectedProfile),
  );

  const handleInstructionKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key !== 'Enter' || event.nativeEvent.isComposing) return;
      if (!(event.metaKey || event.ctrlKey)) return;
      event.preventDefault();
      if (loading || !selectedProfile) return;
      onRun?.();
    },
    [loading, onRun, selectedProfile],
  );

  const restoreDefaultSystemPromptButton = (
    <button
      type="button"
      disabled={isDefaultSystemPrompt}
      onClick={() => onSystemPromptChange?.(getDefaultLlmAssistSystemPrompt())}
      className="inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[10px] text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft dark:disabled:hover:bg-transparent"
      aria-label="기본값으로 되돌리기"
    >
      <RotateCcw size={11} aria-hidden />
      기본값으로 되돌리기
    </button>
  );

  const panelBody = (
      <div ref={panelRef} className="space-y-3 text-xs">
      <div>
        <label className="mb-1 block">
          <PanelLabel icon={Bot}>제공자</PanelLabel>
        </label>
        <LlmProviderSelect
          profiles={profiles}
          value={selectedProfileId}
          onChange={onSelectedProfileIdChange}
        />
      </div>

      {selectedProfile ? (
        <div>
          <label className="mb-1 block">
            <PanelLabel icon={BrainCircuit}>모델</PanelLabel>
          </label>
          {selectedProfile.kind === LLM_PROVIDER_OPENAI_COMPATIBLE ||
          selectedProfile.kind === LLM_PROVIDER_LLAMA_CPP ? (
            <OpenAiCompatibleModelSelect
              key={`${selectedProfile.id}-openai`}
              reloadKey={`${selectedProfile.id}:${selectedProfile.baseUrl || ''}`}
              getBaseUrl={() => selectedProfile.baseUrl || ''}
              getApiKey={() => selectedProfile.apiKey || ''}
              value={model}
              onChange={onModelChange}
              autoLoad={modelSelectAutoLoad}
              {...(selectedProfile.kind === LLM_PROVIDER_LLAMA_CPP
                ? { aliasScope: 'llama-cpp' as const }
                : {})}
            />
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
        <div className="mb-1 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
          <label className="shrink-0 whitespace-nowrap">
            <PanelLabel icon={TextCursorInput}>선택된 텍스트</PanelLabel>
          </label>
          <button
            type="button"
            onClick={onRefreshSelection}
            className="inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft"
          >
            <RefreshCw size={12} aria-hidden />
            새로고침
          </button>
        </div>
        <textarea
          readOnly
          value={selectedText}
          rows={4}
          className="w-full resize-y rounded border border-gray-200 bg-gray-50 px-2 py-1.5 text-[11px] leading-relaxed text-gray-800 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg"
          placeholder="선택된 텍스트가 없어도, 입력한 지시사항으로 실행할 수 있습니다."
        />
      </div>

      <div>
        <div className="mb-1 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
          <label className="shrink-0 whitespace-nowrap">
            <PanelLabel icon={ImageIcon}>
              입력 이미지
              {attachedImages.length > 0 ? (
                <span className="ml-1 font-normal text-gray-500 dark:text-odp-muted">
                  ({attachedImages.length})
                </span>
              ) : null}
            </PanelLabel>
          </label>
          <div className="flex min-w-0 flex-wrap items-center justify-end gap-1">
            <button
              type="button"
              onClick={() => void handlePasteFromClipboard()}
              disabled={addingImages}
              className="inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[11px] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft"
            >
              {addingImages ? <Loader2 size={12} className="animate-spin" /> : <ClipboardPaste size={12} />}
              클립보드에서 붙여넣기
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={addingImages}
              className="inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[11px] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft"
            >
              {addingImages ? <Loader2 size={12} className="animate-spin" /> : <ImagePlus size={12} />}
              추가
            </button>
            <button
              type="button"
              onClick={() => onClearImages?.()}
              disabled={!attachedImages.length || addingImages}
              className="inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[11px] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft"
              title="첨부 이미지 모두 제거"
            >
              <ImageOff size={12} aria-hidden />
              초기화
            </button>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="hidden"
          onChange={(e) => void handlePickImages(e.target.files)}
        />
        <div
          className={`rounded border border-dashed p-2 dark:border-odp-borderSoft ${
            attachedImages.length ? 'border-gray-200 bg-gray-50/50 dark:bg-odp-bgSoft/40' : 'border-gray-300 bg-gray-50 dark:bg-odp-bgSoft'
          }`}
        >
          {attachedImages.length ? (
            <div className="grid grid-cols-2 gap-2">
              {attachedImages.map((img) => (
                <div
                  key={img.id}
                  className="relative overflow-hidden rounded border border-gray-200 bg-white dark:border-odp-borderSoft dark:bg-odp-bgSoft"
                >
                  <button
                    type="button"
                    onClick={() => setPreviewImage(img)}
                    className="group relative block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-violet-500"
                    aria-label={`${img.name} 크게 보기`}
                  >
                    <img
                      src={img.previewDataUrl}
                      alt=""
                      className="h-24 w-full object-cover"
                    />
                    <span
                      className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/25"
                      aria-hidden
                    >
                      <ZoomIn
                        size={22}
                        className="text-white opacity-0 drop-shadow-md transition-opacity group-hover:opacity-100"
                      />
                    </span>
                  </button>
                  <div className="truncate px-1.5 py-0.5 text-[10px] text-gray-600 dark:text-odp-muted" title={img.name}>
                    {img.name}
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveImage?.(img.id)}
                    className="absolute right-1 top-1 z-1 rounded bg-black/55 p-0.5 text-white hover:bg-black/75"
                    title="이미지 제거"
                    aria-label="이미지 제거"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-3 text-center text-[11px] text-gray-500 dark:text-odp-muted">
              AI 도우미 어디에든 이미지를 놓거나 「추가」로 선택하세요.
              <br />
              「클립보드에서 붙여넣기」또는 Ctrl+V로 붙여넣을 수 있습니다.
            </p>
          )}
        </div>
        {imageError && (
          <p className="mt-1 text-[10px] text-red-600 dark:text-red-400">{imageError}</p>
        )}
      </div>

      <div className="space-y-2 rounded border border-gray-200 p-2 dark:border-odp-borderSoft">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
          <label className="shrink-0 whitespace-nowrap">
            <PanelLabel icon={Bookmark}>템플릿</PanelLabel>
          </label>
          <select
            value={selectedTemplateId}
            onChange={(e) => onLoadTemplate?.(e.target.value)}
            className="min-w-0 flex-1 basis-48 rounded border border-gray-300 bg-white px-2 py-1 text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          >
            <option value="">— 불러오기 —</option>
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <p className="text-[10px] leading-snug text-gray-500 dark:text-odp-muted">
          원격 저장소{' '}
          <code className="rounded bg-gray-100 px-1 dark:bg-odp-bgSoft">.settings/llm-prompt-templates.json</code>
          에 동기화됩니다.
        </p>
        <input
          type="text"
          value={templateName}
          onChange={(e) => onTemplateNameChange?.(e.target.value)}
          placeholder="템플릿 이름"
          className="w-full rounded border border-gray-300 bg-white px-2 py-1 text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft"
        />
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
            <span className="min-w-0 shrink-0 whitespace-nowrap">
              <PanelLabel icon={ScrollText}>시스템 프롬프트</PanelLabel>
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
              <p className="text-[10px] leading-snug text-gray-500 dark:text-odp-muted">
                템플릿마다 다르게 저장할 수 있습니다. 비우면 시스템 프롬프트 없이 실행됩니다.
              </p>
              <textarea
                value={systemPrompt}
                onChange={(e) => onSystemPromptChange?.(e.target.value)}
                rows={10}
                placeholder={getDefaultLlmAssistSystemPrompt()}
                className="w-full resize-y rounded border border-gray-300 bg-white px-2 py-1.5 text-[11px] leading-relaxed dark:border-odp-borderStrong dark:bg-odp-bgSoft"
              />
              <div className="flex justify-end">
                {isDefaultSystemPrompt ? (
                  <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <span className="inline-flex cursor-not-allowed">
                          {restoreDefaultSystemPromptButton}
                        </span>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          side="top"
                          sideOffset={6}
                          className="z-100010 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-[10px] leading-snug text-gray-700 shadow-md dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fgStrong"
                        >
                          이미 기본값입니다.
                          <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                ) : (
                  restoreDefaultSystemPromptButton
                )}
              </div>
            </div>
          </LlmAssistCollapsible>
        </div>
        <div>
          <label className="mb-1 block">
            <PanelLabel icon={MessageSquareText}>지시사항</PanelLabel>
          </label>
          <textarea
            value={instruction}
            onChange={(e) => onInstructionChange?.(e.target.value)}
            onKeyDown={handleInstructionKeyDown}
            rows={4}
            placeholder="지시사항 (예: 이미지를 설명하거나, 선택한 텍스트를 다시 써 주세요)"
            className="w-full resize-y rounded border border-gray-300 bg-white px-2 py-1.5 text-[11px] leading-relaxed dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          />
        </div>
        <div className="flex flex-wrap gap-1.5 justify-end">
          <button
            type="button"
            onClick={onNewTemplate}
            className="inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-1 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft"
          >
            <Plus size={12} aria-hidden />
            새 템플릿
          </button>
          <button
            type="button"
            onClick={onSaveTemplate}
            className="inline-flex items-center gap-1 rounded bg-violet-600 px-2 py-1 text-[11px] text-white hover:bg-violet-700"
          >
            <Save size={12} aria-hidden />
            템플릿 저장
          </button>

          {editingTemplateId && (
            <button
              type="button"
              onClick={onDeleteTemplate}
              className="inline-flex items-center gap-1 rounded border border-red-300 px-2 py-1 text-[11px] text-red-600 hover:bg-red-50 dark:border-red-500/40 dark:text-red-400"
            >
              <Trash2 size={12} aria-hidden />
              삭제
            </button>
          )}
        </div>
        <LlmAssistAdvancedOptions
          value={requestOptions}
          onChange={(next) => onRequestOptionsChange?.(next)}
        />
      </div>

      {loading ? (
        <button
          type="button"
          onClick={() => setCancelConfirmOpen(true)}
          disabled={!selectedProfile}
          className="flex w-full items-center justify-center gap-2 rounded bg-violet-700 px-3 py-2 text-sm font-medium text-white hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-60"
          aria-label="생성 중 — 클릭하여 취소"
        >
          <Loader2 size={16} className="animate-spin" aria-hidden />
          생성 중…
        </button>
      ) : (
        <button
          type="button"
          {...runPress}
          disabled={!selectedProfile}
          className="flex w-full items-center justify-center gap-2 rounded bg-violet-600 px-3 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Sparkles size={16} aria-hidden />
          실행
        </button>
      )}

      {typeof document !== 'undefined'
        ? createPortal(
            <ConfirmModal
              isOpen={cancelConfirmOpen}
              title="생성 취소"
              message="진행 중인 생성을 취소할까요? 지금까지 받은 결과는 유지됩니다."
              confirmLabel="생성 취소"
              cancelLabel="계속 생성"
              variant="danger"
              onConfirm={() => {
                setCancelConfirmOpen(false);
                onCancelGeneration?.();
              }}
              onCancel={() => setCancelConfirmOpen(false)}
            />,
            document.body,
          )
        : null}

      {error && (
        <p className="rounded border border-red-200 bg-red-50 px-2 py-1.5 text-[11px] whitespace-pre-line text-red-700 dark:border-red-500/40 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </p>
      )}

      <div>
        <div className="mb-1 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
          <label className="shrink-0 whitespace-nowrap">
            <PanelLabel icon={Sparkles}>결과</PanelLabel>
          </label>
          <div className="inline-flex rounded border border-gray-300 dark:border-odp-borderStrong">
            <button
              type="button"
              onClick={() => onResultViewModeChange?.('text')}
              className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] ${
                resultViewMode === 'text'
                  ? 'bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-100'
                  : 'text-gray-600 hover:bg-gray-50 dark:text-odp-muted dark:hover:bg-odp-bgSoft'
              }`}
              aria-pressed={resultViewMode === 'text'}
            >
              <FileText size={11} aria-hidden />
              텍스트
            </button>
            <button
              type="button"
              onClick={() => onResultViewModeChange?.('preview')}
              className={`inline-flex items-center gap-1 border-l border-gray-300 px-2 py-0.5 text-[10px] dark:border-odp-borderStrong ${
                resultViewMode === 'preview'
                  ? 'bg-violet-100 text-violet-800 dark:bg-violet-900/60 dark:text-violet-100'
                  : 'text-gray-600 hover:bg-gray-50 dark:text-odp-muted dark:hover:bg-odp-bgSoft'
              }`}
              aria-pressed={resultViewMode === 'preview'}
            >
              <Eye size={11} aria-hidden />
              미리보기
            </button>
          </div>
        </div>

        {resultViewMode === 'preview' ? (
          <div
            ref={resultPreviewRef}
            className="min-h-32 max-h-64 overflow-auto rounded border border-gray-200 bg-gray-50 dark:border-odp-borderSoft dark:bg-odp-bgSoft"
          >
            {result ? (
              <MdPreview
                id={RESULT_PREVIEW_ID}
                theme={theme === 'dark' ? 'dark' : 'light'}
                language="ko-KR"
                codeTheme={MD_EDITOR_CODE_THEME}
                customIcon={MD_EDITOR_CUSTOM_ICONS}
                value={result}
                noMermaid
                codeFoldable={false}
                showCodeRowNumber={false}
              />
            ) : (
              <p className="px-2 py-3 text-[11px] text-gray-500 dark:text-odp-muted">
                실행 후 결과가 여기에 표시됩니다.
              </p>
            )}
          </div>
        ) : (
          <textarea
            readOnly={resultReadOnly}
            value={result}
            onChange={(e) => onResultChange?.(e.target.value)}
            rows={6}
            className="w-full resize-y rounded border border-gray-200 bg-gray-50 px-2 py-1.5 text-[11px] leading-relaxed text-gray-800 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg"
            placeholder="실행 후 결과가 여기에 표시됩니다."
          />
        )}

        <div className="mt-2 flex flex-wrap gap-1.5">
          {canInsertIntoDocument ? (
            <>
              <button
                type="button"
                disabled={resultActionsDisabled}
                {...applyResultPress}
                className={[
                  'inline-flex items-center gap-1.5 rounded border px-3 py-1.5 text-[11px] font-medium disabled:cursor-not-allowed disabled:opacity-50',
                  presentation === 'docked'
                    ? selectedText.trim()
                      ? 'border-violet-400 bg-violet-50 text-violet-800 hover:bg-violet-100 dark:border-violet-600 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/60'
                      : 'border-sky-400 bg-sky-50 text-sky-800 hover:bg-sky-100 dark:border-sky-600 dark:bg-sky-950/50 dark:text-sky-100 dark:hover:bg-sky-900/60'
                    : 'border-violet-400 bg-violet-50 text-violet-800 hover:bg-violet-100 dark:border-violet-600 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/60',
                ].join(' ')}
              >
                {presentation === 'docked' ? (
                  selectedText.trim() ? (
                    <>
                      <CornerLeftDown size={14} aria-hidden />
                      대체하기
                    </>
                  ) : (
                    <>
                      <TextCursor size={14} aria-hidden />
                      삽입하기
                    </>
                  )
                ) : (
                  <>
                    <CornerLeftDown size={14} aria-hidden />
                    선택 영역 바꿔치기
                  </>
                )}
              </button>
              <button
                type="button"
                disabled={resultActionsDisabled}
                {...appendResultPress}
                className="inline-flex items-center gap-1.5 rounded border border-violet-400 bg-violet-50 px-3 py-1.5 text-[11px] font-medium text-violet-800 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-violet-600 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/60"
              >
                <ArrowDownToLine size={14} aria-hidden />
                문서 가장 하단에 삽입
              </button>
            </>
          ) : null}
          {presentation === 'docked' ? (
            <button
              type="button"
              disabled={resultActionsDisabled}
              {...copyResultPress}
              className="inline-flex items-center gap-1.5 rounded border border-violet-400 bg-violet-50 px-3 py-1.5 text-[11px] font-medium text-violet-800 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-violet-600 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/60"
            >
              <Copy size={14} aria-hidden />
              복사하기
            </button>
          ) : null}
          <button
            type="button"
            disabled={resultActionsDisabled}
            {...createNotePress}
            className="inline-flex items-center gap-1.5 rounded border border-emerald-400 bg-emerald-50 px-3 py-1.5 text-[11px] font-medium text-emerald-800 hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-100 dark:hover:bg-emerald-900/60"
          >
            <FilePlus size={14} aria-hidden />
            새 노트로
          </button>
        </div>
      </div>
      </div>
  );

  const imageLightbox = (
    <LlmAssistImageLightbox
      src={previewImage?.previewDataUrl ?? null}
      alt={previewImage?.name ?? ''}
      open={Boolean(previewImage)}
      onClose={() => setPreviewImage(null)}
    />
  );

  if (!enableImageDropZone) {
    return (
      <>
        {panelBody}
        {imageLightbox}
      </>
    );
  }

  return (
    <LlmAssistImageDropZone
      className="min-h-0"
      disabled={!onAddImages || addingImages}
      onFilesDrop={(files) => void handlePickImages(files)}
    >
      {panelBody}
      {imageLightbox}
    </LlmAssistImageDropZone>
  );
}

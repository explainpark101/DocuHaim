import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowDownToLine,
  ChevronDown,
  ClipboardPaste,
  Copy,
  ImageOff,
  ImagePlus,
  Loader2,
  RefreshCw,
  Replace,
  Sparkles,
  Eye,
  FileText,
  X,
  ChevronUp,
} from 'lucide-react';
import { MdPreview } from 'md-editor-rt';
import '@/styles/md-editor-rt/style.css';
import { MD_EDITOR_CODE_THEME } from '@/utils/mdEditorCodeTheme';
import { MD_EDITOR_CUSTOM_ICONS } from '@/utils/mdEditorCustomIcons';
import { useLazyMermaidRender } from '@/hooks/useLazyMermaidRender';
import GeminiModelSelect from '@/components/GeminiModelSelect';
import OpenAiCompatibleModelSelect from '@/components/OpenAiCompatibleModelSelect';
import LlmProviderSelect from '@/components/LlmProviderSelect';
import { LLM_PROVIDER_OPENAI_COMPATIBLE } from '@/utils/llmProviderProfiles';
import {
  extractImageFilesFromClipboard,
  readImageFilesAsAttachments,
  readImageFilesFromClipboardApi,
} from '@/utils/llmAssistImages';
import LlmAssistAdvancedOptions from '@/components/llm/LlmAssistAdvancedOptions';

const RESULT_PREVIEW_ID = 'llm-assist-result-preview';

export default function LlmAssistPanel({
  theme = 'light',
  profiles = [],
  selectedProfileId = '',
  onSelectedProfileIdChange = () => {},
  selectedProfile = null,
  model = '',
  onModelChange,
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
  onApplyResult,
  onAppendResult,
  onCopyResult,
  presentation = 'floating',
  canInsertIntoDocument = true,
  remoteMode = false,
  modelSelectAutoLoad = true,
}) {
  const resultReadOnly = loading || (remoteMode ? false : !result);
  const panelRef = useRef(null);
  const resultPreviewRef = useRef(null);
  const fileInputRef = useRef(null);
  const [imageError, setImageError] = useState('');
  const [addingImages, setAddingImages] = useState(false);
  const [systemPromptOpen, setSystemPromptOpen] = useState(false);

  useLazyMermaidRender(resultPreviewRef, {
    layoutKey: `${theme}|${result || ''}|${resultViewMode}`,
  });

  const handlePickImages = useCallback(async (fileList) => {
    if (!fileList?.length || !onAddImages) return;
    setImageError('');
    setAddingImages(true);
    try {
      const next = await readImageFilesAsAttachments(fileList);
      await onAddImages(next);
    } catch (err) {
      setImageError(err?.message || '이미지를 추가할 수 없습니다.');
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
    } catch (err) {
      setImageError(err?.message || '클립보드 이미지를 붙여넣을 수 없습니다.');
    } finally {
      setAddingImages(false);
    }
  }, [onAddImages, addingImages]);

  const handleImageDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await handlePickImages(e.dataTransfer?.files);
  };

  useEffect(() => {
    const onPaste = async (e) => {
      if (!onAddImages || !panelRef.current) return;
      if (!panelRef.current.contains(e.target)) return;
      if (addingImages) return;

      const files = extractImageFilesFromClipboard(e.clipboardData);
      if (!files.length) return;

      e.preventDefault();
      setImageError('');
      setAddingImages(true);
      try {
        const next = await readImageFilesAsAttachments(files);
        await onAddImages(next);
      } catch (err) {
        setImageError(err?.message || '클립보드 이미지를 붙여넣을 수 없습니다.');
      } finally {
        setAddingImages(false);
      }
    };

    document.addEventListener('paste', onPaste);
    return () => document.removeEventListener('paste', onPaste);
  }, [onAddImages, addingImages]);

  return (
    <div ref={panelRef} className="space-y-3 text-xs">
      <div>
        <label className="mb-1 block font-semibold text-gray-700 dark:text-odp-fgStrong">제공자</label>
        <LlmProviderSelect
          profiles={profiles}
          value={selectedProfileId}
          onChange={onSelectedProfileIdChange}
        />
      </div>

      {selectedProfile ? (
        <div>
          <label className="mb-1 block font-semibold text-gray-700 dark:text-odp-fgStrong">모델</label>
          {selectedProfile.kind === LLM_PROVIDER_OPENAI_COMPATIBLE ? (
            <OpenAiCompatibleModelSelect
              key={`${selectedProfile.id}-openai`}
              reloadKey={`${selectedProfile.id}:${selectedProfile.baseUrl || ''}`}
              getBaseUrl={() => selectedProfile.baseUrl || ''}
              getApiKey={() => selectedProfile.apiKey || ''}
              value={model}
              onChange={onModelChange}
              autoLoad={modelSelectAutoLoad}
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
        <div className="mb-1 flex items-center justify-between gap-2">
          <label className="font-semibold text-gray-700 dark:text-odp-fgStrong">선택된 텍스트</label>
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
        <div className="mb-1 flex items-center justify-between gap-2">
          <label className="font-semibold text-gray-700 dark:text-odp-fgStrong">
            입력 이미지
            {attachedImages.length > 0 ? (
              <span className="ml-1 font-normal text-gray-500 dark:text-odp-muted">
                ({attachedImages.length})
              </span>
            ) : null}
          </label>
          <div className="flex shrink-0 flex-wrap items-center justify-end gap-1">
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
          onChange={(e) => handlePickImages(e.target.files)}
        />
        <div
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={handleImageDrop}
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
                  <img
                    src={img.previewDataUrl}
                    alt={img.name}
                    className="h-24 w-full object-cover"
                  />
                  <div className="truncate px-1.5 py-0.5 text-[10px] text-gray-600 dark:text-odp-muted" title={img.name}>
                    {img.name}
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveImage?.(img.id)}
                    className="absolute right-1 top-1 rounded bg-black/55 p-0.5 text-white hover:bg-black/75"
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
              이미지를 드래그하거나 「추가」로 선택하세요.
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
        <div className="flex items-center gap-2">
          <label className="shrink-0 font-semibold text-gray-700 dark:text-odp-fgStrong">템플릿</label>
          <select
            value={selectedTemplateId}
            onChange={(e) => onLoadTemplate?.(e.target.value)}
            className="min-w-0 flex-1 rounded border border-gray-300 bg-white px-2 py-1 text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft"
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
            className="mb-1 flex w-full items-center justify-between gap-2 text-left font-semibold text-gray-700 dark:text-odp-fgStrong"
            aria-expanded={systemPromptOpen}
          >
            <span>
              시스템 프롬프트
              {!systemPromptOpen && systemPrompt.trim() ? (
                <span className="ml-1 font-normal text-gray-500 dark:text-odp-muted">(설정됨)</span>
              ) : null}
            </span>
            <ChevronUp
              size={14}
              aria-hidden
              className={`shrink-0 opacity-70 transition-transform ${systemPromptOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {systemPromptOpen ? (
            <textarea
              value={systemPrompt}
              onChange={(e) => onSystemPromptChange?.(e.target.value)}
              rows={3}
              placeholder="선택 사항. 모델의 역할·톤·제약 등 (system instruction)"
              className="w-full resize-y rounded border border-gray-300 bg-white px-2 py-1.5 text-[11px] leading-relaxed dark:border-odp-borderStrong dark:bg-odp-bgSoft"
            />
          ) : null}
        </div>
        <div>
          <label className="mb-1 block font-semibold text-gray-700 dark:text-odp-fgStrong">
            지시사항
          </label>
          <textarea
            value={instruction}
            onChange={(e) => onInstructionChange?.(e.target.value)}
            rows={4}
            placeholder="지시사항 (예: 이미지를 설명하거나, 선택한 텍스트를 다시 써 주세요)"
            className="w-full resize-y rounded border border-gray-300 bg-white px-2 py-1.5 text-[11px] leading-relaxed dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          />
        </div>
        <div className="flex flex-wrap gap-1.5 justify-end">
          <button
            type="button"
            onClick={onSaveTemplate}
            className="rounded bg-violet-600 px-2 py-1 text-[11px] text-white hover:bg-violet-700"
          >
            템플릿 저장
          </button>
          <button
            type="button"
            onClick={onNewTemplate}
            className="rounded border border-gray-300 px-2 py-1 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft"
          >
            새 템플릿
          </button>
          {editingTemplateId && (
            <button
              type="button"
              onClick={onDeleteTemplate}
              className="rounded border border-red-300 px-2 py-1 text-[11px] text-red-600 hover:bg-red-50 dark:border-red-500/40 dark:text-red-400"
            >
              삭제
            </button>
          )}
        </div>
        <LlmAssistAdvancedOptions
          value={requestOptions}
          onChange={(next) => onRequestOptionsChange?.(next)}
        />
      </div>

      <button
        type="button"
        onClick={onRun}
        disabled={loading || !selectedProfile}
        className="flex w-full items-center justify-center gap-2 rounded bg-violet-600 px-3 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
        {loading ? '생성 중…' : 'Gemini 실행'}
      </button>

      {error && (
        <p className="rounded border border-red-200 bg-red-50 px-2 py-1.5 text-[11px] whitespace-pre-line text-red-700 dark:border-red-500/40 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </p>
      )}

      <div>
        <div className="mb-1 flex items-center justify-between gap-2">
          <label className="font-semibold text-gray-700 dark:text-odp-fgStrong">결과</label>
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
                theme={theme}
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
          {presentation === 'docked' ? (
            <>
              {canInsertIntoDocument ? (
                <button
                  type="button"
                  onClick={onApplyResult}
                  disabled={!result}
                  className="inline-flex items-center gap-1.5 rounded border border-violet-400 bg-violet-50 px-3 py-1.5 text-[11px] font-medium text-violet-800 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-violet-600 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/60"
                >
                  <Replace size={14} aria-hidden />
                  삽입하기
                </button>
              ) : null}
              <button
                type="button"
                onClick={onCopyResult}
                disabled={!result}
                className="inline-flex items-center gap-1.5 rounded border border-violet-400 bg-violet-50 px-3 py-1.5 text-[11px] font-medium text-violet-800 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-violet-600 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/60"
              >
                <Copy size={14} aria-hidden />
                복사하기
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onApplyResult}
                disabled={!result}
                className="inline-flex items-center gap-1.5 rounded border border-violet-400 bg-violet-50 px-3 py-1.5 text-[11px] font-medium text-violet-800 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-violet-600 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/60"
              >
                <Replace size={14} aria-hidden />
                선택 영역 바꿔치기
              </button>
              <button
                type="button"
                onClick={onAppendResult}
                disabled={!result}
                className="inline-flex items-center gap-1.5 rounded border border-violet-400 bg-violet-50 px-3 py-1.5 text-[11px] font-medium text-violet-800 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-violet-600 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/60"
              >
                <ArrowDownToLine size={14} aria-hidden />
                문서 가장 하단에 삽입
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

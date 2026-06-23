import { useCallback, useEffect, useRef, useState } from 'react';
import { ImagePlus, Loader2, RefreshCw, Replace, Sparkles, Eye, FileText, X } from 'lucide-react';
import { MdPreview } from 'md-editor-rt';
import '@/styles/md-editor-rt/style.css';
import GeminiModelSelect from '@/components/GeminiModelSelect';
import {
  extractImageFilesFromClipboard,
  LLM_ASSIST_MAX_IMAGES,
  readImageFilesAsAttachments,
} from '@/utils/llmAssistImages';

const RESULT_PREVIEW_ID = 'llm-assist-result-preview';

export default function LlmAssistPanel({
  theme = 'light',
  getGeminiApiKey,
  geminiModel,
  onGeminiModelChange,
  selectedText,
  onRefreshSelection,
  attachedImages = [],
  onAddImages,
  onRemoveImage,
  instruction,
  onInstructionChange,
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
  remoteMode = false,
  modelSelectAutoLoad = true,
}) {
  const resultReadOnly = remoteMode ? false : !result;
  const panelRef = useRef(null);
  const fileInputRef = useRef(null);
  const attachedCountRef = useRef(attachedImages.length);
  const [imageError, setImageError] = useState('');
  const [addingImages, setAddingImages] = useState(false);

  useEffect(() => {
    attachedCountRef.current = attachedImages.length;
  }, [attachedImages.length]);

  const handlePickImages = useCallback(async (fileList) => {
    if (!fileList?.length || !onAddImages) return;
    setImageError('');
    setAddingImages(true);
    try {
      const next = await readImageFilesAsAttachments(fileList, attachedCountRef.current);
      await onAddImages(next);
    } catch (err) {
      setImageError(err?.message || '이미지를 추가할 수 없습니다.');
    } finally {
      setAddingImages(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }, [onAddImages]);

  const handleImageDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await handlePickImages(e.dataTransfer?.files);
  };

  useEffect(() => {
    const onPaste = async (e) => {
      if (!onAddImages || !panelRef.current) return;
      if (!panelRef.current.contains(e.target)) return;
      if (addingImages || attachedCountRef.current >= LLM_ASSIST_MAX_IMAGES) return;

      const files = extractImageFilesFromClipboard(e.clipboardData);
      if (!files.length) return;

      e.preventDefault();
      setImageError('');
      setAddingImages(true);
      try {
        const next = await readImageFilesAsAttachments(files, attachedCountRef.current);
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
        <label className="mb-1 block font-semibold text-gray-700 dark:text-odp-fgStrong">모델</label>
        <GeminiModelSelect
          getGeminiApiKey={getGeminiApiKey}
          value={geminiModel}
          onChange={onGeminiModelChange}
          autoLoad={modelSelectAutoLoad}
        />
      </div>

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
          placeholder="에디터에서 텍스트를 선택하거나 아래에 이미지를 추가하세요."
        />
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between gap-2">
          <label className="font-semibold text-gray-700 dark:text-odp-fgStrong">
            입력 이미지
            <span className="ml-1 font-normal text-gray-500 dark:text-odp-muted">
              ({attachedImages.length}/{LLM_ASSIST_MAX_IMAGES})
            </span>
          </label>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={addingImages || attachedImages.length >= LLM_ASSIST_MAX_IMAGES}
            className="inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-0.5 text-[11px] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft"
          >
            {addingImages ? <Loader2 size={12} className="animate-spin" /> : <ImagePlus size={12} />}
            추가
          </button>
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
              Ctrl+V로 클립보드 이미지를 붙여넣을 수 있습니다.
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
        <input
          type="text"
          value={templateName}
          onChange={(e) => onTemplateNameChange?.(e.target.value)}
          placeholder="템플릿 이름"
          className="w-full rounded border border-gray-300 bg-white px-2 py-1 text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft"
        />
        <textarea
          value={instruction}
          onChange={(e) => onInstructionChange?.(e.target.value)}
          rows={4}
          placeholder="지시사항 (예: 이미지를 설명하거나, 선택한 텍스트를 다시 써 주세요)"
          className="w-full resize-y rounded border border-gray-300 bg-white px-2 py-1.5 text-[11px] leading-relaxed dark:border-odp-borderStrong dark:bg-odp-bgSoft"
        />
        <div className="flex flex-wrap gap-1.5">
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
      </div>

      <button
        type="button"
        onClick={onRun}
        disabled={loading}
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
          <div className="min-h-32 max-h-64 overflow-auto rounded border border-gray-200 bg-gray-50 dark:border-odp-borderSoft dark:bg-odp-bgSoft">
            {result ? (
              <MdPreview
                id={RESULT_PREVIEW_ID}
                theme={theme}
                language="ko-KR"
                value={result}
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

        <button
          type="button"
          onClick={onApplyResult}
          disabled={!result}
          className="mt-2 inline-flex items-center gap-1.5 rounded border border-violet-400 bg-violet-50 px-3 py-1.5 text-[11px] font-medium text-violet-800 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-violet-600 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/60"
        >
          <Replace size={14} aria-hidden />
          선택 영역 바꿔치기
        </button>
      </div>
    </div>
  );
}

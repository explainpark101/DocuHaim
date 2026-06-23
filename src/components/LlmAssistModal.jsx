import { useCallback, useEffect, useRef, useState } from 'react';
import { GripHorizontal, Loader2, Sparkles, X, EyeOff, RefreshCw, Replace } from 'lucide-react';
import {
  createEmptyLlmPromptTemplate,
  deleteLlmPromptTemplate,
  listLlmPromptTemplates,
  saveLlmPromptTemplate,
} from '@/utils/llmPromptTemplatesDb';
import { withGeminiApiKey } from '@/utils/geminiApiKeySession';
import { generateGeminiTransform } from '@/utils/geminiClient';
import {
  loadLlmModalHidden,
  loadLlmModalPosition,
  saveLlmModalHidden,
  saveLlmModalPosition,
} from '@/utils/llmModalPosition';
import { getEditorSelectionFromRef, replaceEditorRange } from '@/utils/editorSelection';
import GeminiModelSelect, { useGeminiModelState } from '@/components/GeminiModelSelect';
import { loadLastUsedGeminiModel, saveLastUsedGeminiModel } from '@/utils/geminiModelSettings';
import { isFreeTierBlockedModel } from '@/utils/geminiError';

export default function LlmAssistModal({
  editorRef,
  onChange,
  getGeminiApiKey,
  open,
  onOpenChange,
}) {
  const [position, setPosition] = useState(() => loadLlmModalPosition());
  const [hidden, setHidden] = useState(() => loadLlmModalHidden());
  const [selectedText, setSelectedText] = useState('');
  const [selectionRange, setSelectionRange] = useState({ from: 0, to: 0 });
  const [instruction, setInstruction] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [editingTemplateId, setEditingTemplateId] = useState(null);
  const [geminiModel, setGeminiModel] = useGeminiModelState();

  const dragRef = useRef({ active: false, startX: 0, startY: 0, startLeftVw: 0, startTopVh: 0 });
  const DRAG_THRESHOLD_PX = 5;

  const startPositionDrag = useCallback((e, { onTap } = {}) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    let dragged = false;

    dragRef.current = {
      active: true,
      startX,
      startY,
      startLeftVw: position.leftVw,
      startTopVh: position.topVh,
    };

    const onMove = (ev) => {
      if (!dragRef.current.active) return;
      if (
        Math.hypot(ev.clientX - startX, ev.clientY - startY) > DRAG_THRESHOLD_PX
      ) {
        dragged = true;
      }
      const vw = window.innerWidth || 1;
      const vh = window.innerHeight || 1;
      const dxVw = ((ev.clientX - dragRef.current.startX) / vw) * 100;
      const dyVh = ((ev.clientY - dragRef.current.startY) / vh) * 100;
      setPosition({
        leftVw: Math.min(92, Math.max(0, dragRef.current.startLeftVw + dxVw)),
        topVh: Math.min(90, Math.max(0, dragRef.current.startTopVh + dyVh)),
      });
    };

    const onUp = () => {
      if (!dragRef.current.active) return;
      dragRef.current.active = false;
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      setPosition((prev) => {
        saveLlmModalPosition(prev);
        return prev;
      });
      if (!dragged) onTap?.();
    };

    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  }, [position.leftVw, position.topVh]);

  const refreshSelection = useCallback(() => {
    const { text, from, to } = getEditorSelectionFromRef(editorRef);
    setSelectedText(text);
    setSelectionRange({ from, to });
    return text;
  }, [editorRef]);

  const loadTemplates = useCallback(async () => {
    const list = await listLlmPromptTemplates();
    setTemplates(list);
    return list;
  }, []);

  useEffect(() => {
    if (!open) return;
    setHidden(false);
    saveLlmModalHidden(false);
    setGeminiModel(loadLastUsedGeminiModel());
    refreshSelection();
    loadTemplates();
    setError('');
  }, [open, refreshSelection, loadTemplates, setGeminiModel]);

  useEffect(() => {
    if (!open || hidden) return undefined;
    const onSelectionChange = () => refreshSelection();
    const interval = setInterval(onSelectionChange, 600);
    return () => clearInterval(interval);
  }, [open, hidden, refreshSelection]);

  const handleHide = () => {
    setHidden(true);
    saveLlmModalHidden(true);
  };

  const handleShow = () => {
    setHidden(false);
    saveLlmModalHidden(false);
    refreshSelection();
  };

  const handleClose = () => {
    onOpenChange?.(false);
  };

  const handleRun = async () => {
    setError('');
    setLoading(true);
    try {
      const text = refreshSelection();
      if (!text.trim()) throw new Error('에디터에서 변환할 텍스트를 선택하세요.');
      if (isFreeTierBlockedModel(geminiModel)) {
        throw new Error(
          '선택한 모델은 무료 플랜에서 사용할 수 없습니다.\nGemini 2.0 Flash 또는 Gemini 2.5 Flash로 변경해 주세요.',
        );
      }
      saveLastUsedGeminiModel(geminiModel);
      const output = await withGeminiApiKey(getGeminiApiKey, (apiKey) =>
        generateGeminiTransform({ apiKey, model: geminiModel, instruction, selectedText: text }),
      );
      setResult(output);
    } catch (err) {
      setError(err?.message || 'Gemini 요청에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyResult = () => {
    if (!result) return;
    const { view } = getEditorSelectionFromRef(editorRef);
    const { from, to } = selectionRange;
    const ok = replaceEditorRange(view, from, to, result, onChange);
    if (!ok) {
      setError('에디터에 결과를 적용할 수 없습니다. 선택 영역을 다시 확인하세요.');
      return;
    }
    refreshSelection();
  };

  const handleLoadTemplate = (id) => {
    setSelectedTemplateId(id);
    const tpl = templates.find((t) => t.id === id);
    if (tpl) {
      setInstruction(tpl.instruction);
      setTemplateName(tpl.name);
      setEditingTemplateId(tpl.id);
    }
  };

  const handleSaveTemplate = async () => {
    const name = templateName.trim();
    const inst = instruction.trim();
    if (!name || !inst) {
      alert('템플릿 이름과 지시사항을 모두 입력하세요.');
      return;
    }
    const saved = await saveLlmPromptTemplate({
      id: editingTemplateId || createEmptyLlmPromptTemplate().id,
      name,
      instruction: inst,
      updatedAt: Date.now(),
    });
    setEditingTemplateId(saved.id);
    setSelectedTemplateId(saved.id);
    await loadTemplates();
  };

  const handleNewTemplate = () => {
    setEditingTemplateId(null);
    setSelectedTemplateId('');
    setTemplateName('');
    setInstruction('');
  };

  const handleDeleteTemplate = async () => {
    if (!editingTemplateId) return;
    if (!window.confirm('이 지시사항 템플릿을 삭제할까요?')) return;
    await deleteLlmPromptTemplate(editingTemplateId);
    handleNewTemplate();
    await loadTemplates();
  };

  if (!open) return null;

  if (hidden) {
    return (
      <div
        role="button"
        tabIndex={0}
        onPointerDown={(e) => startPositionDrag(e, { onTap: handleShow })}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleShow();
          }
        }}
        className="fixed z-80 flex touch-none cursor-grab select-none items-center gap-1.5 rounded-full border border-violet-300/70 bg-violet-950/90 px-3 py-1.5 text-xs font-medium text-violet-50 shadow-lg backdrop-blur-sm hover:bg-violet-900/95 active:cursor-grabbing"
        style={{ left: `${position.leftVw}vw`, top: `${position.topVh}vh` }}
        title="드래그: 이동 · 클릭: AI 도우미 표시"
        aria-label="AI 도우미 표시"
      >
        <Sparkles size={14} aria-hidden />
        AI
      </div>
    );
  }

  return (
    <div
      className="fixed z-80 w-[min(92vw,420px)] rounded-lg border border-violet-300/50 bg-white/95 shadow-2xl backdrop-blur-md dark:border-violet-700/60 dark:bg-odp-surface/95"
      style={{ left: `${position.leftVw}vw`, top: `${position.topVh}vh` }}
      role="dialog"
      aria-modal="false"
      aria-label="AI 텍스트 도우미"
    >
      <div
        className="flex cursor-grab active:cursor-grabbing items-center justify-between gap-2 border-b border-violet-200/60 bg-violet-50/90 px-3 py-2 dark:border-violet-800/50 dark:bg-violet-950/40"
        onPointerDown={(e) => startPositionDrag(e)}
      >
        <div className="flex min-w-0 items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100">
          <GripHorizontal size={16} className="shrink-0 opacity-60" aria-hidden />
          <Sparkles size={16} className="shrink-0" aria-hidden />
          <span className="truncate">Gemini AI</span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={handleHide}
            className="rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50"
            title="숨기기"
            aria-label="숨기기"
          >
            <EyeOff size={15} />
          </button>
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={handleClose}
            className="rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50"
            title="닫기"
            aria-label="닫기"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      <div className="max-h-[min(70vh,560px)] overflow-y-auto p-3 space-y-3 text-xs">
        <div>
          <label className="mb-1 block font-semibold text-gray-700 dark:text-odp-fgStrong">모델</label>
          <GeminiModelSelect
            getGeminiApiKey={getGeminiApiKey}
            value={geminiModel}
            onChange={setGeminiModel}
            autoLoad
          />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between gap-2">
            <label className="font-semibold text-gray-700 dark:text-odp-fgStrong">선택된 텍스트</label>
            <button
              type="button"
              onClick={refreshSelection}
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
            placeholder="에디터에서 텍스트를 선택하세요."
          />
        </div>

        <div className="space-y-2 rounded border border-gray-200 p-2 dark:border-odp-borderSoft">
          <div className="flex items-center gap-2">
            <label className="shrink-0 font-semibold text-gray-700 dark:text-odp-fgStrong">템플릿</label>
            <select
              value={selectedTemplateId}
              onChange={(e) => handleLoadTemplate(e.target.value)}
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
            onChange={(e) => setTemplateName(e.target.value)}
            placeholder="템플릿 이름"
            className="w-full rounded border border-gray-300 bg-white px-2 py-1 text-[11px] dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          />
          <textarea
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            rows={4}
            placeholder="지시사항 (예: 선택한 텍스트를 더 간결하게 다시 써 주세요)"
            className="w-full resize-y rounded border border-gray-300 bg-white px-2 py-1.5 text-[11px] leading-relaxed dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          />
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={handleSaveTemplate}
              className="rounded bg-violet-600 px-2 py-1 text-[11px] text-white hover:bg-violet-700"
            >
              템플릿 저장
            </button>
            <button
              type="button"
              onClick={handleNewTemplate}
              className="rounded border border-gray-300 px-2 py-1 text-[11px] hover:bg-gray-50 dark:border-odp-borderStrong dark:hover:bg-odp-bgSoft"
            >
              새 템플릿
            </button>
            {editingTemplateId && (
              <button
                type="button"
                onClick={handleDeleteTemplate}
                className="rounded border border-red-300 px-2 py-1 text-[11px] text-red-600 hover:bg-red-50 dark:border-red-500/40 dark:text-red-400"
              >
                삭제
              </button>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleRun}
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
          <label className="mb-1 block font-semibold text-gray-700 dark:text-odp-fgStrong">결과</label>
          <textarea
            readOnly={!result}
            value={result}
            onChange={(e) => setResult(e.target.value)}
            rows={6}
            className="w-full resize-y rounded border border-gray-200 bg-gray-50 px-2 py-1.5 text-[11px] leading-relaxed text-gray-800 dark:border-odp-borderSoft dark:bg-odp-bgSoft dark:text-odp-fg"
            placeholder="실행 후 결과가 여기에 표시됩니다."
          />
          <button
            type="button"
            onClick={handleApplyResult}
            disabled={!result}
            className="mt-2 inline-flex items-center gap-1.5 rounded border border-violet-400 bg-violet-50 px-3 py-1.5 text-[11px] font-medium text-violet-800 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-violet-600 dark:bg-violet-950/50 dark:text-violet-100 dark:hover:bg-violet-900/60"
          >
            <Replace size={14} aria-hidden />
            선택 영역 바꿔치기
          </button>
        </div>
      </div>
    </div>
  );
}

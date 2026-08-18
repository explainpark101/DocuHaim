import { useCallback, useEffect, useRef, useState } from 'react';
import { GripHorizontal, Sparkles, X, EyeOff, SquareArrowOutUpRight } from 'lucide-react';
import {
  createEmptyLlmPromptTemplate,
  deleteLlmPromptTemplate,
  listLlmPromptTemplates,
  LLM_PROMPT_TEMPLATES_SCOPE_EVENT,
  saveLlmPromptTemplate,
} from '@/utils/llmPromptTemplatesDb';
import { withGeminiApiKey, withOpenAiCompatibleApiKey } from '@/utils/llmApiKeySession';
import { generateGeminiTransform } from '@/utils/geminiClient';
import { generateOpenAiCompatibleTransform } from '@/utils/openaiCompatibleClient';
import {
  loadLlmModalHidden,
  loadLlmModalPosition,
  saveLlmModalHidden,
  saveLlmModalPosition,
} from '@/utils/llmModalPosition';
import { getEditorSelectionFromRef, replaceEditorRange } from '@/utils/editorSelection';
import { useGeminiModelState } from '@/components/GeminiModelSelect';
import { useOpenAiCompatibleModelState } from '@/components/OpenAiCompatibleModelSelect';
import { useLlmProviderState } from '@/components/LlmProviderSelect';
import { saveLastUsedGeminiModel } from '@/utils/geminiModelSettings';
import { saveLastUsedOpenAiCompatibleModel } from '@/utils/openaiCompatibleSettings';
import { LLM_PROVIDER_OPENAI_COMPATIBLE } from '@/utils/llmProviderSettings';
import { isFreeTierBlockedModel } from '@/utils/geminiError';
import {
  getLlmAssistPopoutUrl,
  isLlmAssistMessage,
  LLM_ASSIST_MSG,
  LLM_ASSIST_POPOUT_FEATURES,
  LLM_ASSIST_POPOUT_NAME,
  postLlmAssistMessage,
} from '@/utils/llmAssistBridge';
import LlmAssistPanel from '@/components/LlmAssistPanel';
import { LLM_ASSIST_MAX_IMAGES, normalizeImageAttachment } from '@/utils/llmAssistImages';

export default function LlmAssistModal({
  editorRef,
  onChange,
  getGeminiApiKey,
  getOpenAiCompatibleBaseUrl,
  getOpenAiCompatibleApiKey,
  open,
  onOpenChange,
  theme = 'light',
}) {
  const [position, setPosition] = useState(() => loadLlmModalPosition());
  const [hidden, setHidden] = useState(() => loadLlmModalHidden());
  const [popoutActive, setPopoutActive] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [selectionRange, setSelectionRange] = useState({ from: 0, to: 0 });
  const [attachedImages, setAttachedImages] = useState([]);
  const [instruction, setInstruction] = useState('');
  const [result, setResult] = useState('');
  const [resultViewMode, setResultViewMode] = useState('text');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [editingTemplateId, setEditingTemplateId] = useState(null);
  const [geminiModel, setGeminiModel, syncGeminiModel] = useGeminiModelState();
  const [openaiCompatibleModel, setOpenaiCompatibleModel, syncOpenaiCompatibleModel] =
    useOpenAiCompatibleModelState();
  const [llmProvider, setLlmProvider, syncLlmProvider] = useLlmProviderState();

  const popoutRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, startY: 0, startLeftVw: 0, startTopVh: 0 });
  const DRAG_THRESHOLD_PX = 5;

  const buildSyncPayload = useCallback(
    () => ({
      selectedText,
      selectionRange,
      attachedImages,
      instruction,
      result,
      resultViewMode,
      loading,
      error,
      templates,
      selectedTemplateId,
      templateName,
      editingTemplateId,
      geminiModel,
      openaiCompatibleModel,
      llmProvider,
      theme,
    }),
    [
      selectedText,
      selectionRange,
      attachedImages,
      instruction,
      result,
      resultViewMode,
      loading,
      error,
      templates,
      selectedTemplateId,
      templateName,
      editingTemplateId,
      geminiModel,
      openaiCompatibleModel,
      llmProvider,
      theme,
    ],
  );

  const syncToPopout = useCallback(() => {
    const win = popoutRef.current;
    if (!win || win.closed) return;
    postLlmAssistMessage(win, LLM_ASSIST_MSG.SYNC, { state: buildSyncPayload() });
  }, [buildSyncPayload]);

  const closePopout = useCallback(() => {
    const win = popoutRef.current;
    if (win && !win.closed) {
      try {
        win.close();
      } catch {
        // ignore
      }
    }
    popoutRef.current = null;
    setPopoutActive(false);
  }, []);

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
      if (Math.hypot(ev.clientX - startX, ev.clientY - startY) > DRAG_THRESHOLD_PX) {
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
    syncGeminiModel();
    syncOpenaiCompatibleModel();
    syncLlmProvider();
    refreshSelection();
    loadTemplates();
    setError('');
  }, [
    open,
    refreshSelection,
    loadTemplates,
    syncGeminiModel,
    syncOpenaiCompatibleModel,
    syncLlmProvider,
  ]);

  useEffect(() => {
    const onScopeChange = () => {
      setSelectedTemplateId('');
      setEditingTemplateId(null);
      void loadTemplates();
    };
    window.addEventListener(LLM_PROMPT_TEMPLATES_SCOPE_EVENT, onScopeChange);
    return () => {
      window.removeEventListener(LLM_PROMPT_TEMPLATES_SCOPE_EVENT, onScopeChange);
    };
  }, [loadTemplates]);

  useEffect(() => {
    if (!open || hidden || popoutActive) return undefined;
    const onSelectionChange = () => refreshSelection();
    const interval = setInterval(onSelectionChange, 600);
    return () => clearInterval(interval);
  }, [open, hidden, popoutActive, refreshSelection]);

  useEffect(() => {
    syncToPopout();
  }, [syncToPopout]);

  useEffect(() => {
    if (!popoutActive) return undefined;
    const interval = setInterval(() => {
      const win = popoutRef.current;
      if (!win || win.closed) {
        popoutRef.current = null;
        setPopoutActive(false);
      }
    }, 400);
    return () => clearInterval(interval);
  }, [popoutActive]);

  useEffect(() => {
    if (!open) {
      closePopout();
      return undefined;
    }

    const onBeforeUnload = () => {
      const win = popoutRef.current;
      if (win && !win.closed) {
        postLlmAssistMessage(win, LLM_ASSIST_MSG.PARENT_CLOSING);
        try {
          win.close();
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [open, closePopout]);

  const handleRun = useCallback(async () => {
    setError('');
    setLoading(true);
    try {
      const text = refreshSelection();
      const hasText = Boolean(text.trim());
      const hasImages = attachedImages.length > 0;
      if (!hasText && !hasImages) {
        throw new Error('에디터에서 텍스트를 선택하거나 이미지를 추가하세요.');
      }

      if (llmProvider === LLM_PROVIDER_OPENAI_COMPATIBLE) {
        const baseUrl =
          (await Promise.resolve(
            typeof getOpenAiCompatibleBaseUrl === 'function'
              ? getOpenAiCompatibleBaseUrl()
              : '',
          ))?.trim() ?? '';
        if (!baseUrl) {
          throw new Error('OpenAI 호환 Endpoint를 설정 페이지에서 입력하세요.');
        }
        saveLastUsedOpenAiCompatibleModel(openaiCompatibleModel);
        const output = await withOpenAiCompatibleApiKey(
          getOpenAiCompatibleApiKey ?? (() => ''),
          (apiKey) =>
            generateOpenAiCompatibleTransform({
              baseUrl,
              apiKey,
              model: openaiCompatibleModel,
              instruction,
              selectedText: text,
              images: attachedImages,
            }),
        );
        setResult(output);
        return;
      }

      if (isFreeTierBlockedModel(geminiModel)) {
        throw new Error(
          '선택한 모델은 무료 플랜에서 사용할 수 없습니다.\nGemini 2.0 Flash 또는 Gemini 2.5 Flash로 변경해 주세요.',
        );
      }
      saveLastUsedGeminiModel(geminiModel);
      const output = await withGeminiApiKey(getGeminiApiKey, (apiKey) =>
        generateGeminiTransform({
          apiKey,
          model: geminiModel,
          instruction,
          selectedText: text,
          images: attachedImages,
        }),
      );
      setResult(output);
    } catch (err) {
      setError(err?.message || 'LLM 요청에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [
    refreshSelection,
    attachedImages,
    geminiModel,
    openaiCompatibleModel,
    llmProvider,
    getGeminiApiKey,
    getOpenAiCompatibleBaseUrl,
    getOpenAiCompatibleApiKey,
    instruction,
  ]);

  const handleApplyResult = useCallback(() => {
    if (!result) return;
    const { view } = getEditorSelectionFromRef(editorRef);
    const { from, to } = selectionRange;
    const ok = replaceEditorRange(view, from, to, result, onChange);
    if (!ok) {
      setError('에디터에 결과를 적용할 수 없습니다. 선택 영역을 다시 확인하세요.');
      return;
    }
    refreshSelection();
  }, [result, editorRef, selectionRange, onChange, refreshSelection]);

  const handleLoadTemplate = useCallback(
    (id) => {
      setSelectedTemplateId(id);
      const tpl = templates.find((t) => t.id === id);
      if (tpl) {
        setInstruction(tpl.instruction);
        setTemplateName(tpl.name);
        setEditingTemplateId(tpl.id);
      }
    },
    [templates],
  );

  const handleSaveTemplate = useCallback(async () => {
    const name = templateName.trim();
    const inst = instruction.trim();
    if (!name || !inst) {
      alert('템플릿 이름과 지시사항을 모두 입력하세요.');
      return;
    }
    try {
      const saved = await saveLlmPromptTemplate({
        id: editingTemplateId || createEmptyLlmPromptTemplate().id,
        name,
        instruction: inst,
        updatedAt: Date.now(),
      });
      setEditingTemplateId(saved.id);
      setSelectedTemplateId(saved.id);
      await loadTemplates();
    } catch (err) {
      alert(err?.message || '템플릿 저장에 실패했습니다.');
    }
  }, [templateName, instruction, editingTemplateId, loadTemplates]);

  const handleNewTemplate = useCallback(() => {
    setEditingTemplateId(null);
    setSelectedTemplateId('');
    setTemplateName('');
    setInstruction('');
  }, []);

  const handleDeleteTemplate = useCallback(async () => {
    if (!editingTemplateId) return;
    if (!window.confirm('이 지시사항 템플릿을 삭제할까요?')) return;
    try {
      await deleteLlmPromptTemplate(editingTemplateId);
      handleNewTemplate();
      await loadTemplates();
    } catch (err) {
      alert(err?.message || '템플릿 삭제에 실패했습니다.');
    }
  }, [editingTemplateId, handleNewTemplate, loadTemplates]);

  const handleAddImages = useCallback(async (images) => {
    if (!Array.isArray(images) || !images.length) return;
    setAttachedImages((prev) => {
      const remaining = LLM_ASSIST_MAX_IMAGES - prev.length;
      if (remaining <= 0) return prev;
      return [...prev, ...images.slice(0, remaining)];
    });
  }, []);

  const handleRemoveImage = useCallback((id) => {
    if (!id) return;
    setAttachedImages((prev) => prev.filter((img) => img.id !== id));
  }, []);

  const handlePopoutAction = useCallback(
    async (action, payload = {}) => {
      switch (action) {
        case 'refresh-selection':
          refreshSelection();
          break;
        case 'run':
          await handleRun();
          break;
        case 'apply-result':
          handleApplyResult();
          break;
        case 'set-instruction':
          setInstruction(typeof payload.value === 'string' ? payload.value : '');
          break;
        case 'set-result':
          setResult(typeof payload.value === 'string' ? payload.value : '');
          break;
        case 'set-gemini-model':
          if (typeof payload.value === 'string') setGeminiModel(payload.value);
          break;
        case 'set-openai-compatible-model':
          if (typeof payload.value === 'string') setOpenaiCompatibleModel(payload.value);
          break;
        case 'set-llm-provider':
          if (payload.value === 'gemini' || payload.value === 'openai-compatible') {
            setLlmProvider(payload.value);
          }
          break;
        case 'load-template':
          handleLoadTemplate(payload.id ?? '');
          break;
        case 'save-template':
          await handleSaveTemplate();
          break;
        case 'new-template':
          handleNewTemplate();
          break;
        case 'delete-template':
          await handleDeleteTemplate();
          break;
        case 'set-template-name':
          setTemplateName(typeof payload.value === 'string' ? payload.value : '');
          break;
        case 'set-result-view-mode':
          if (payload.value === 'preview' || payload.value === 'text') {
            setResultViewMode(payload.value);
          }
          break;
        case 'add-images': {
          const incoming = (Array.isArray(payload.images) ? payload.images : [])
            .map(normalizeImageAttachment)
            .filter(Boolean);
          if (incoming.length) await handleAddImages(incoming);
          break;
        }
        case 'remove-image':
          handleRemoveImage(payload.id);
          break;
        case 'close':
          onOpenChange?.(false);
          break;
        default:
          break;
      }
    },
    [
      refreshSelection,
      handleRun,
      handleApplyResult,
      setGeminiModel,
      setOpenaiCompatibleModel,
      setLlmProvider,
      handleLoadTemplate,
      handleSaveTemplate,
      handleNewTemplate,
      handleDeleteTemplate,
      handleAddImages,
      handleRemoveImage,
      onOpenChange,
    ],
  );

  useEffect(() => {
    if (!open) return undefined;

    const onMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      if (!isLlmAssistMessage(event.data)) return;

      if (event.data.type === LLM_ASSIST_MSG.READY) {
        if (event.source && typeof event.source.postMessage === 'function') {
          popoutRef.current = event.source;
          setPopoutActive(true);
          postLlmAssistMessage(event.source, LLM_ASSIST_MSG.SYNC, { state: buildSyncPayload() });
        }
        return;
      }

      if (event.data.type === LLM_ASSIST_MSG.ACTION) {
        handlePopoutAction(event.data.action, event.data.payload);
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [open, buildSyncPayload, handlePopoutAction]);

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
    closePopout();
    onOpenChange?.(false);
  };

  const handleOpenPopout = () => {
    let win = popoutRef.current;
    if (win && !win.closed) {
      win.focus();
      syncToPopout();
      setPopoutActive(true);
      return;
    }

    const url = getLlmAssistPopoutUrl();
    win = window.open(url, LLM_ASSIST_POPOUT_NAME, LLM_ASSIST_POPOUT_FEATURES);
    if (!win) {
      alert('팝업이 차단되어 새 창을 열 수 없습니다.');
      return;
    }
    popoutRef.current = win;
    setPopoutActive(true);
  };

  const panelProps = {
    theme,
    getGeminiApiKey,
    getOpenAiCompatibleBaseUrl: getOpenAiCompatibleBaseUrl ?? (() => ''),
    getOpenAiCompatibleApiKey: getOpenAiCompatibleApiKey ?? (() => ''),
    llmProvider,
    onLlmProviderChange: setLlmProvider,
    geminiModel,
    onGeminiModelChange: setGeminiModel,
    openaiCompatibleModel,
    onOpenaiCompatibleModelChange: setOpenaiCompatibleModel,
    selectedText,
    onRefreshSelection: refreshSelection,
    attachedImages,
    onAddImages: handleAddImages,
    onRemoveImage: handleRemoveImage,
    instruction,
    onInstructionChange: setInstruction,
    result,
    onResultChange: setResult,
    resultViewMode,
    onResultViewModeChange: setResultViewMode,
    loading,
    error,
    templates,
    selectedTemplateId,
    onLoadTemplate: handleLoadTemplate,
    templateName,
    onTemplateNameChange: setTemplateName,
    editingTemplateId,
    onSaveTemplate: handleSaveTemplate,
    onNewTemplate: handleNewTemplate,
    onDeleteTemplate: handleDeleteTemplate,
    onRun: handleRun,
    onApplyResult: handleApplyResult,
  };

  if (!open) return null;

  if (hidden || popoutActive) {
    const chipLabel = popoutActive ? 'AI (새창)' : 'AI';
    const chipTitle = popoutActive
      ? '드래그: 이동 · 클릭: AI 도우미 표시 (새 창 닫으면 복귀)'
      : '드래그: 이동 · 클릭: AI 도우미 표시';

    return (
      <div
        role="button"
        tabIndex={0}
        onPointerDown={(e) => startPositionDrag(e, { onTap: popoutActive ? undefined : handleShow })}
        onKeyDown={(e) => {
          if (popoutActive) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleShow();
          }
        }}
        className="fixed z-[10050] flex touch-none cursor-grab select-none items-center gap-1.5 rounded-full border border-violet-300/70 bg-violet-950/90 px-3 py-1.5 text-xs font-medium text-violet-50 shadow-lg backdrop-blur-sm hover:bg-violet-900/95 active:cursor-grabbing"
        style={{ left: `${position.leftVw}vw`, top: `${position.topVh}vh` }}
        title={chipTitle}
        aria-label={chipLabel}
      >
        <Sparkles size={14} aria-hidden />
        {chipLabel}
      </div>
    );
  }

  return (
    <div
      className="fixed z-[10050] w-[min(92vw,420px)] rounded-lg border border-violet-300/50 bg-white/95 shadow-2xl backdrop-blur-md dark:border-violet-700/60 dark:bg-odp-surface/95"
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
          <span className="truncate">AI 도우미</span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={handleOpenPopout}
            disabled={popoutActive}
            className="rounded p-1 text-violet-700 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-violet-200 dark:hover:bg-violet-900/50"
            title={popoutActive ? '새 창에서 열려 있음' : '새 창으로 열기'}
            aria-label="새 창으로 열기"
          >
            <SquareArrowOutUpRight size={15} />
          </button>
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

      <div className="max-h-[min(70vh,560px)] overflow-y-auto p-3">
        <LlmAssistPanel {...panelProps} />
      </div>
    </div>
  );
}

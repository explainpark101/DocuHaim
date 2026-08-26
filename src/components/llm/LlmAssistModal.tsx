import { useCallback, useEffect, useRef, useState } from 'react';
import { GripHorizontal, Sparkles, X, EyeOff, SquareArrowOutUpRight } from 'lucide-react';
import {
  createEmptyLlmPromptTemplate,
  deleteLlmPromptTemplate,
  listLlmPromptTemplates,
  LLM_PROMPT_TEMPLATES_SCOPE_EVENT,
  saveLlmPromptTemplate,
} from '@/utils/llm/llmPromptTemplatesDb';
import { withLlmProfileApiKey } from '@/utils/llm/llmApiKeySession';
import { generateGeminiTransform } from '@/utils/llm/geminiClient';
import { generateOpenAiCompatibleTransform } from '@/utils/llm/openaiCompatibleClient';
import { loadLlmModalHidden, saveLlmModalHidden } from '@/utils/llm/llmModalLayout';
import { useLlmAssistModalLayout } from '@/hooks/useLlmAssistModalLayout';
import { applyLlmResultToEditor, getEditorSelectionFromRef } from '@/utils/editorSelection';
import { useLlmProfileIdState } from '@/components/llm/LlmProviderSelect';
import { saveLastUsedGeminiModel } from '@/utils/llm/geminiModelSettings';
import { saveLastUsedOpenAiCompatibleModel } from '@/utils/llm/openaiCompatibleSettings';
import {
  LLM_PROVIDER_GEMINI,
  LLM_PROVIDER_OPENAI_COMPATIBLE,
  loadLastUsedModelForProfile,
  resolveSelectedLlmProfile,
  saveLastUsedModelForProfile,
} from '@/utils/llm/llmProviderProfiles';
import { isFreeTierBlockedModel } from '@/utils/llm/geminiError';
import {
  getLlmAssistPopoutUrl,
  isLlmAssistMessage,
  LLM_ASSIST_MSG,
  LLM_ASSIST_POPOUT_FEATURES,
  LLM_ASSIST_POPOUT_NAME,
  postLlmAssistMessage,
} from '@/utils/llm/llmAssistBridge';
import LlmAssistPanel from '@/components/llm/LlmAssistPanel';
import { LLM_ASSIST_MAX_IMAGES, normalizeImageAttachment } from '@/utils/llm/llmAssistImages';

export default function LlmAssistModal({
  editorRef,
  onChange,
  getMarkdown,
  llmProviderProfiles = [],
  open,
  onOpenChange,
  theme = 'light'
}: any) {
  const profiles = Array.isArray(llmProviderProfiles) ? llmProviderProfiles : [];
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
  const [profileId, setProfileId, syncProfileId] = useLlmProfileIdState(profiles);
  const selectedProfile = resolveSelectedLlmProfile(profiles, profileId);
  const [model, setModel] = useState(() =>
    selectedProfile
      ? loadLastUsedModelForProfile(selectedProfile.id, selectedProfile.kind)
      : '',
  );

  const popoutRef = useRef(null);
  const {
    panelRef,
    panelStyle,
    startPositionDrag,
    startPositionTouchDrag,
    startCornerResize,
    refreshBounds,
  } = useLlmAssistModalLayout(editorRef, { enabled: open });

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
      profiles: profiles.map((p) => ({
        id: p.id,
        name: p.name,
        kind: p.kind,
        baseUrl: p.baseUrl,
      })),
      selectedProfileId: profileId,
      model,
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
      profiles,
      profileId,
      model,
      theme,
    ],
  );

  const syncToPopout = useCallback(() => {
    const win = popoutRef.current;
    // @ts-expect-error TS(2339): Property 'closed' does not exist on type 'never'.
    if (!win || win.closed) return;
    postLlmAssistMessage(win, LLM_ASSIST_MSG.SYNC, { state: buildSyncPayload() });
  }, [buildSyncPayload]);

  const closePopout = useCallback(() => {
    const win = popoutRef.current;
    // @ts-expect-error TS(2339): Property 'closed' does not exist on type 'never'.
    if (win && !win.closed) {
      try {
        // @ts-expect-error TS(2339): Property 'close' does not exist on type 'never'.
        win.close();
      } catch {
        // ignore
      }
    }
    popoutRef.current = null;
    setPopoutActive(false);
  }, []);

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
    refreshBounds();
    syncProfileId();
    refreshSelection();
    loadTemplates();
    setError('');
  }, [open, refreshBounds, refreshSelection, loadTemplates, syncProfileId]);

  useEffect(() => {
    if (!selectedProfile?.id || !selectedProfile?.kind) {
      setModel('');
      return;
    }
    setModel(loadLastUsedModelForProfile(selectedProfile.id, selectedProfile.kind));
  }, [selectedProfile?.id, selectedProfile?.kind]);

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
      // @ts-expect-error TS(2339): Property 'closed' does not exist on type 'never'.
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
      // @ts-expect-error TS(2339): Property 'closed' does not exist on type 'never'.
      if (win && !win.closed) {
        postLlmAssistMessage(win, LLM_ASSIST_MSG.PARENT_CLOSING);
        try {
          // @ts-expect-error TS(2339): Property 'close' does not exist on type 'never'.
          win.close();
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [open, closePopout]);

  const handleModelChange = useCallback(
    (nextId: any) => {
      const next = String(nextId || '').trim();
      setModel(next);
      if (!selectedProfile) return;
      saveLastUsedModelForProfile(selectedProfile.id, next);
      if (selectedProfile.kind === LLM_PROVIDER_GEMINI) saveLastUsedGeminiModel(next);
      else saveLastUsedOpenAiCompatibleModel(next);
    },
    [selectedProfile],
  );

  const handleRun = useCallback(async () => {
    setError('');
    setLoading(true);
    try {
      const text = refreshSelection();
      if (!selectedProfile) {
        throw new Error('설정에서 AI 제공자를 추가한 뒤 선택하세요.');
      }

      if (selectedProfile.kind === LLM_PROVIDER_OPENAI_COMPATIBLE) {
        const baseUrl = (selectedProfile.baseUrl || '').trim();
        if (!baseUrl) {
          throw new Error('선택한 제공자의 Endpoint URL이 없습니다. 설정에서 수정하세요.');
        }
        saveLastUsedModelForProfile(selectedProfile.id, model);
        saveLastUsedOpenAiCompatibleModel(model);
        const output = await withLlmProfileApiKey(
          selectedProfile.id,
          () => selectedProfile.apiKey || '',
          (apiKey) =>
            generateOpenAiCompatibleTransform({
              baseUrl,
              apiKey,
              model,
              instruction,
              selectedText: text,
              images: attachedImages,
            }),
          {
            allowEmpty: true,
            missingKeyMessage: 'OpenAI 호환 API 키가 없습니다. 설정에서 입력하세요.',
          },
        );
        setResult(output);
        return;
      }

      if (isFreeTierBlockedModel(model)) {
        throw new Error(
          '선택한 모델은 무료 플랜에서 사용할 수 없습니다.\nGemini 2.0 Flash 또는 Gemini 2.5 Flash로 변경해 주세요.',
        );
      }
      saveLastUsedModelForProfile(selectedProfile.id, model);
      saveLastUsedGeminiModel(model);
      const output = await withLlmProfileApiKey(
        selectedProfile.id,
        () => selectedProfile.apiKey || '',
        (apiKey) =>
          generateGeminiTransform({
            apiKey,
            model,
            instruction,
            selectedText: text,
            images: attachedImages,
          }),
        {
          missingKeyMessage:
            'Google AI Studio API 키가 설정되지 않았습니다. 설정 페이지에서 입력하세요.',
        },
      );
      setResult(output);
    } catch (err) {
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      setError(err?.message || 'LLM 요청에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [refreshSelection, attachedImages, selectedProfile, model, instruction]);

  const handleApplyResult = useCallback(() => {
    if (!result) return;
    const { from, to } = selectionRange;
    const ok = applyLlmResultToEditor({
      editorRef,
      from,
      to,
      result,
      onChange,
      getMarkdown,
    });
    if (!ok) {
      setError('에디터에 결과를 적용할 수 없습니다. 선택 영역을 다시 확인하세요.');
      return;
    }
    refreshSelection();
  }, [result, editorRef, selectionRange, onChange, getMarkdown, refreshSelection]);

  const handleLoadTemplate = useCallback(
    (id: any) => {
      setSelectedTemplateId(id);
      // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
      const tpl = templates.find((t) => t.id === id);
      if (tpl) {
        // @ts-expect-error TS(2339): Property 'instruction' does not exist on type 'nev... Remove this comment to see the full error message
        setInstruction(tpl.instruction);
        // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
        setTemplateName(tpl.name);
        // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
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
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
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
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      alert(err?.message || '템플릿 삭제에 실패했습니다.');
    }
  }, [editingTemplateId, handleNewTemplate, loadTemplates]);

  const handleAddImages = useCallback(async (images: any) => {
    if (!Array.isArray(images) || !images.length) return;
    // @ts-expect-error TS(2345): Argument of type '(prev: never[]) => any[]' is not... Remove this comment to see the full error message
    setAttachedImages((prev) => {
      const remaining = LLM_ASSIST_MAX_IMAGES - prev.length;
      if (remaining <= 0) return prev;
      return [...prev, ...images.slice(0, remaining)];
    });
  }, []);

  const handleRemoveImage = useCallback((id: any) => {
    if (!id) return;
    // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
    setAttachedImages((prev) => prev.filter((img) => img.id !== id));
  }, []);

  const handlePopoutAction = useCallback(
    async (action: any, payload = {}) => {
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
          // @ts-expect-error TS(2339): Property 'value' does not exist on type '{}'.
          setInstruction(typeof payload.value === 'string' ? payload.value : '');
          break;
        case 'set-result':
          // @ts-expect-error TS(2339): Property 'value' does not exist on type '{}'.
          setResult(typeof payload.value === 'string' ? payload.value : '');
          break;
        case 'set-model':
          // @ts-expect-error TS(2339): Property 'value' does not exist on type '{}'.
          if (typeof payload.value === 'string') handleModelChange(payload.value);
          break;
        case 'set-llm-profile-id':
          // @ts-expect-error TS(2339): Property 'value' does not exist on type '{}'.
          if (typeof payload.value === 'string') setProfileId(payload.value);
          break;
        case 'load-template':
          // @ts-expect-error TS(2339): Property 'id' does not exist on type '{}'.
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
          // @ts-expect-error TS(2339): Property 'value' does not exist on type '{}'.
          setTemplateName(typeof payload.value === 'string' ? payload.value : '');
          break;
        case 'set-result-view-mode':
          // @ts-expect-error TS(2339): Property 'value' does not exist on type '{}'.
          if (payload.value === 'preview' || payload.value === 'text') {
            // @ts-expect-error TS(2339): Property 'value' does not exist on type '{}'.
            setResultViewMode(payload.value);
          }
          break;
        case 'add-images': {
          // @ts-expect-error TS(2339): Property 'images' does not exist on type '{}'.
          const incoming = (Array.isArray(payload.images) ? payload.images : [])
            .map(normalizeImageAttachment)
            .filter(Boolean);
          if (incoming.length) await handleAddImages(incoming);
          break;
        }
        case 'remove-image':
          // @ts-expect-error TS(2339): Property 'id' does not exist on type '{}'.
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
      handleModelChange,
      setProfileId,
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

    const onMessage = (event: any) => {
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
    // @ts-expect-error TS(2339): Property 'closed' does not exist on type 'never'.
    if (win && !win.closed) {
      // @ts-expect-error TS(2339): Property 'focus' does not exist on type 'never'.
      win.focus();
      syncToPopout();
      setPopoutActive(true);
      return;
    }

    const url = getLlmAssistPopoutUrl();
    // @ts-expect-error TS(2322): Type 'Window | null' is not assignable to type 'nu... Remove this comment to see the full error message
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
    profiles,
    selectedProfileId: profileId,
    onSelectedProfileIdChange: setProfileId,
    selectedProfile,
    model,
    onModelChange: handleModelChange,
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
        // @ts-expect-error TS(2379): Argument of type '{ onTap: (() => void) | undefine... Remove this comment to see the full error message
        onPointerDown={(e: any) => startPositionDrag(e, { onTap: popoutActive ? undefined : handleShow })}
        // @ts-expect-error TS(2379): Argument of type '{ onTap: (() => void) | undefine... Remove this comment to see the full error message
        onTouchStart={(e: any) => startPositionTouchDrag(e, { onTap: popoutActive ? undefined : handleShow })}
        onKeyDown={(e: any) => {
          if (popoutActive) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleShow();
          }
        }}
        className="fixed z-10050 flex touch-none cursor-grab select-none items-center gap-1.5 rounded-full border border-violet-300/70 bg-violet-950/90 px-3 py-1.5 text-xs font-medium text-violet-50 shadow-lg backdrop-blur-sm hover:bg-violet-900/95 active:cursor-grabbing"
        style={{ left: panelStyle.left, top: panelStyle.top }}
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
      ref={panelRef}
      className="fixed z-10050 flex flex-col rounded-lg border border-violet-300/50 bg-white/95 shadow-2xl backdrop-blur-md dark:border-violet-700/60 dark:bg-odp-surface/95"
      style={panelStyle}
      role="dialog"
      aria-modal="false"
      aria-label="AI 텍스트 도우미"
    >
      <div
        className="flex touch-none cursor-grab active:cursor-grabbing items-center justify-between gap-2 border-b border-violet-200/60 bg-violet-50/90 px-3 py-2 dark:border-violet-800/50 dark:bg-violet-950/40"
        onPointerDown={(e: any) => startPositionDrag(e)}
        onTouchStart={(e: any) => startPositionTouchDrag(e)}
      >
        <div className="flex min-w-0 items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100">
          <GripHorizontal size={16} className="shrink-0 opacity-60" aria-hidden />
          <Sparkles size={16} className="shrink-0" aria-hidden />
          <span className="truncate">AI 도우미</span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onPointerDown={(e: any) => e.stopPropagation()}
            onTouchStart={(e: any) => e.stopPropagation()}
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
            onPointerDown={(e: any) => e.stopPropagation()}
            onTouchStart={(e: any) => e.stopPropagation()}
            onClick={handleHide}
            className="rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50"
            title="숨기기"
            aria-label="숨기기"
          >
            <EyeOff size={15} />
          </button>
          <button
            type="button"
            onPointerDown={(e: any) => e.stopPropagation()}
            onTouchStart={(e: any) => e.stopPropagation()}
            onClick={handleClose}
            className="rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50"
            title="닫기"
            aria-label="닫기"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        <LlmAssistPanel {...panelProps} />
      </div>

      <div
        role="separator"
        aria-orientation="horizontal"
        aria-label="크기 조절"
        className="absolute bottom-0 left-0 z-20 h-6 w-6 touch-none opacity-0 cursor-nesw-resize!"
        onPointerDown={(e: any) => startCornerResize('sw', e)}
      />
      <div
        role="separator"
        aria-orientation="horizontal"
        aria-label="크기 조절"
        className="absolute bottom-0 right-0 z-20 h-6 w-6 touch-none opacity-0 cursor-nwse-resize!"
        onPointerDown={(e: any) => startCornerResize('se', e)}
      />
    </div>
  );
}

import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { GripHorizontal, PanelRight, Sparkles, X, EyeOff, SquareArrowOutUpRight, PanelTop } from 'lucide-react';
import {
  createEmptyLlmPromptTemplate,
  deleteLlmPromptTemplate,
  listLlmPromptTemplates,
  LLM_PROMPT_TEMPLATES_SCOPE_EVENT,
  saveLlmPromptTemplate,
} from '@/utils/llmPromptTemplatesDb';
import { withLlmProfileApiKey } from '@/utils/llmApiKeySession';
import { generateGeminiTransform } from '@/utils/geminiClient';
import { generateOpenAiCompatibleTransform } from '@/utils/openaiCompatibleClient';
import { loadLlmModalHidden, saveLlmModalHidden } from '@/utils/llmModalLayout';
import { useLlmAssistModalLayout } from '@/hooks/useLlmAssistModalLayout';
import { applyLlmResultToEditor, getEditorSelectionFromRef, subscribeEditorSelectionFromRef, type EditorRefLike } from '@/utils/editorSelection';
import { useLlmProfileIdState } from '@/components/LlmProviderSelect';
import { saveLastUsedGeminiModel } from '@/utils/geminiModelSettings';
import { saveLastUsedOpenAiCompatibleModel } from '@/utils/openaiCompatibleSettings';
import {
  LLM_PROVIDER_GEMINI,
  LLM_PROVIDER_MLX_VLM,
  LLM_PROVIDER_OPENAI_COMPATIBLE,
  loadLastUsedModelForProfile,
  resolveSelectedLlmProfile,
  saveLastUsedModelForProfile,
} from '@/utils/llmProviderProfiles';
import { isFreeTierBlockedModel } from '@/utils/geminiError';
import { isDesktopApp } from '@/utils/isDesktopApp';
import { loadMlxVlmSettings } from '@/utils/mlxVlmSettingsStore';
import { generateMlxVlmTransform } from '@/utils/llm/mlxVlmGenerateClient';
import { getMlxVlmServerStatus } from '@/utils/mlxVlmShell';
import { LLM_ASSIST_MSG } from '@/utils/llmAssistBridge';
import {
  closeLlmAssistPopoutWindow,
  focusLlmAssistPopoutWindow,
  isLlmAssistPopoutWindowOpen,
  notifyLlmAssistPopoutParentClosing,
  openLlmAssistPopoutWindow,
  subscribeLlmAssistPopoutFromChild,
  syncLlmAssistPopoutWindow,
  type LlmAssistBridgePayload,
} from '@/utils/llm/llmAssistPopoutHost';
import LlmAssistPanel, {
  type LlmAssistImageAttachment,
  type LlmAssistPanelProps,
  type LlmAssistPromptTemplate,
  type LlmAssistResultViewMode,
} from '@/components/llm/LlmAssistPanel';
import LlmAssistDockShell from '@/components/llm/LlmAssistDockShell';
import LlmAssistImageDropZone from '@/components/llm/LlmAssistImageDropZone';
import { AnimatePresence, motion as Motion } from 'motion/react';
import { normalizeImageAttachment, readImageFilesAsAttachments } from '@/utils/llmAssistImages';
import { copyText } from '@/utils/copyText';
import { useLlmAssistSessionOptional } from '@/contexts/LlmAssistSessionContext';
import { useTreeOps } from '@/App/hooks/useTreeOps';
import {
  LLM_ASSIST_DEFAULT_REQUEST_OPTIONS,
  normalizeRequestOptions,
} from '@/utils/llm/llmAssistRequestOptions';
import { getDefaultLlmAssistSystemPrompt } from '@/utils/llm/llmAssistBaseSystemPrompt';
import {
  createLlmAssistAbortError,
  isLlmAssistAbortError,
} from '@/utils/llm/llmAssistAbort';
import type { LlmProviderProfile } from '@/utils/llm/llmProviderProfiles';

const FLOAT_EASE = [0.4, 0, 0.2, 1] as const;
const FLOAT_TRANSITION = { duration: 0.28, ease: FLOAT_EASE };

type PopoutActionPayload = Record<string, unknown>;

export type LlmAssistModalProps = {
  editorRef?: RefObject<unknown> | null;
  onChange?: (markdown: string) => void;
  getMarkdown?: () => string;
  llmProviderProfiles?: LlmProviderProfile[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  theme?: string;
};

/**
 * Global LLM Assist host: floating modal or right dock.
 * Prefer mounting once under AppLayout with LlmAssistSessionProvider.
 */
export default function LlmAssistModal({
  editorRef: editorRefProp = null,
  onChange: onChangeProp,
  getMarkdown: getMarkdownProp,
  llmProviderProfiles,
  open: openProp,
  onOpenChange: onOpenChangeProp,
  theme = 'light',
}: LlmAssistModalProps) {
  const session = useLlmAssistSessionOptional();
  const { requestCreateFileWithContent } = useTreeOps();
  const open = session ? session.open : Boolean(openProp);
  const onOpenChange = session ? session.setOpen : onOpenChangeProp;
  const presentation = session?.presentation ?? 'floating';
  const dockToRight = session?.dockToRight;
  const undockToFloating = session?.undockToFloating;
  const canInsertIntoDocument = session
    ? session.canInsertIntoDocument
    : Boolean(editorRefProp);

  const editorRef = (session?.editorBridge?.editorRef ?? editorRefProp) as EditorRefLike | null | undefined;
  const editorBridge = session?.editorBridge ?? null;
  const onChange = session?.editorBridge?.onChange ?? onChangeProp;
  const getMarkdown = session?.editorBridge?.getMarkdown ?? getMarkdownProp;

  const profiles = useMemo(
    (): LlmProviderProfile[] => (Array.isArray(llmProviderProfiles) ? llmProviderProfiles : []),
    [llmProviderProfiles],
  );
  const [hidden, setHidden] = useState(() => loadLlmModalHidden());
  const [popoutActive, setPopoutActive] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [selectionRange, setSelectionRange] = useState({ from: 0, to: 0 });
  const [attachedImages, setAttachedImages] = useState<LlmAssistImageAttachment[]>([]);
  const [instruction, setInstruction] = useState('');
  const [systemPrompt, setSystemPrompt] = useState(() => getDefaultLlmAssistSystemPrompt());
  const [requestOptions, setRequestOptions] = useState(() => ({
    ...LLM_ASSIST_DEFAULT_REQUEST_OPTIONS,
  }));
  const [result, setResult] = useState('');
  const [resultViewMode, setResultViewMode] = useState<LlmAssistResultViewMode>('text');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [templates, setTemplates] = useState<LlmAssistPromptTemplate[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null);
  const [profileId, setProfileId, syncProfileId] = useLlmProfileIdState(profiles);
  const selectedProfile = resolveSelectedLlmProfile(profiles, profileId);
  const [model, setModel] = useState(() =>
    selectedProfile
      ? loadLastUsedModelForProfile(selectedProfile.id, selectedProfile.kind)
      : '',
  );

  const popoutRef = useRef<Window | null>(null);
  const popoutUsesTauriRef = useRef(false);
  const runAbortRef = useRef<AbortController | null>(null);
  const {
    panelRef,
    panelStyle,
    startPositionDrag,
    startPositionTouchDrag,
    startCornerResize,
    startEdgeResize,
    refreshBounds,
  } = useLlmAssistModalLayout(editorRef, {
    enabled: open && presentation === 'floating',
  });

  const buildSyncPayload = useCallback(
    () => ({
      selectedText,
      selectionRange,
      attachedImages,
      instruction,
      systemPrompt,
      requestOptions,
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
      systemPrompt,
      requestOptions,
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
    if (popoutUsesTauriRef.current) {
      syncLlmAssistPopoutWindow(null, buildSyncPayload());
      return;
    }
    const win = popoutRef.current;
    if (!win || win.closed) return;
    syncLlmAssistPopoutWindow(win, buildSyncPayload());
  }, [buildSyncPayload]);

  const closePopout = useCallback(() => {
    const win = popoutUsesTauriRef.current ? null : popoutRef.current;
    popoutRef.current = null;
    popoutUsesTauriRef.current = false;
    void closeLlmAssistPopoutWindow(win).finally(() => {
      setPopoutActive(false);
    });
  }, []);

  const refreshSelection = useCallback(() => {
    if (!editorRef) return '';
    const { text, from, to } = getEditorSelectionFromRef(editorRef);
    setSelectedText((prev) => (prev === text ? prev : text));
    setSelectionRange((prev) => (prev.from === from && prev.to === to ? prev : { from, to }));
    return text;
  }, [editorRef]);

  const loadTemplates = useCallback(async () => {
    const list = await listLlmPromptTemplates();
    setTemplates(list);
    return list;
  }, []);

  useEffect(() => {
    if (!open || presentation === 'docked') return;
    setHidden(false);
    saveLlmModalHidden(false);
    refreshBounds();
    syncProfileId();
    refreshSelection();
    loadTemplates();
    setError('');
  }, [open, presentation, refreshBounds, refreshSelection, loadTemplates, syncProfileId]);

  useEffect(() => {
    if (!open || presentation !== 'docked') return;
    syncProfileId();
    refreshSelection();
    loadTemplates();
    setError('');
  }, [open, presentation, refreshSelection, loadTemplates, syncProfileId]);

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
    if (!open) return;
    refreshSelection();
  }, [open, editorBridge, refreshSelection]);

  useEffect(() => {
    if (!open || hidden || popoutActive || !editorRef) return undefined;
    return subscribeEditorSelectionFromRef(editorRef, ({ text, from, to }) => {
      setSelectedText((prev) => (prev === text ? prev : text));
      setSelectionRange((prev) =>
        prev.from === from && prev.to === to ? prev : { from, to },
      );
    });
  }, [open, hidden, popoutActive, editorRef]);

  useEffect(() => {
    syncToPopout();
  }, [syncToPopout]);

  useEffect(() => {
    if (!popoutActive) return undefined;
    const interval = setInterval(() => {
      void isLlmAssistPopoutWindowOpen(
        popoutUsesTauriRef.current ? null : popoutRef.current,
      ).then((open) => {
        if (!open) {
          popoutRef.current = null;
          popoutUsesTauriRef.current = false;
          setPopoutActive(false);
        }
      });
    }, 400);
    return () => clearInterval(interval);
  }, [popoutActive]);

  useEffect(() => {
    if (!open) {
      closePopout();
      return undefined;
    }

    const onBeforeUnload = () => {
      notifyLlmAssistPopoutParentClosing(
        popoutUsesTauriRef.current ? null : popoutRef.current,
      );
    };

    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [open, closePopout]);

  const handleModelChange = useCallback(
    (nextId: string) => {
      const next = String(nextId || '').trim();
      setModel(next);
      if (!selectedProfile) return;
      saveLastUsedModelForProfile(selectedProfile.id, next);
      if (selectedProfile.kind === LLM_PROVIDER_GEMINI) saveLastUsedGeminiModel(next);
      else saveLastUsedOpenAiCompatibleModel(next);
    },
    [selectedProfile],
  );

  const handleCancelGeneration = useCallback(() => {
    const controller = runAbortRef.current;
    if (!controller || controller.signal.aborted) return;
    controller.abort(createLlmAssistAbortError());
  }, []);

  const handleRun = useCallback(async () => {
    if (runAbortRef.current) {
      runAbortRef.current.abort(createLlmAssistAbortError());
      runAbortRef.current = null;
    }
    const controller = new AbortController();
    runAbortRef.current = controller;

    setError('');
    setResult('');
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
              systemPrompt,
              selectedText: text,
              images: attachedImages,
              requestOptions,
              onChunk: setResult,
              signal: controller.signal,
            }),
          {
            allowEmpty: true,
            missingKeyMessage: 'OpenAI 호환 API 키가 없습니다. 설정에서 입력하세요.',
          },
        );
        setResult(output);
        return;
      }

      if (selectedProfile.kind === LLM_PROVIDER_MLX_VLM) {
        const mlxSettings = loadMlxVlmSettings();
        const status = await getMlxVlmServerStatus(mlxSettings);
        if (!status.running) {
          throw new Error(
            'MLX-VLM 모델이 로드되어 있지 않습니다.\n설정 > MLX-VLM (Tauri macOS)에서 모델을 선택한 뒤 Load model을 실행하세요.',
          );
        }
        const resolvedModel = model.trim() || mlxSettings.selectedModelId || status.models[0] || '';
        if (!resolvedModel) {
          throw new Error('사용할 MLX 모델을 선택하세요.');
        }
        saveLastUsedModelForProfile(selectedProfile.id, resolvedModel);
        const output = await generateMlxVlmTransform({
          instruction,
          systemPrompt,
          selectedText: text,
          images: attachedImages,
          requestOptions,
          onChunk: setResult,
          signal: controller.signal,
        });
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
            systemPrompt,
            selectedText: text,
            images: attachedImages,
            requestOptions,
            onChunk: setResult,
            signal: controller.signal,
          }),
        {
          missingKeyMessage:
            'Google AI Studio API 키가 설정되지 않았습니다. 설정 페이지에서 입력하세요.',
        },
      );
      setResult(output);
    } catch (err) {
      if (isLlmAssistAbortError(err)) {
        setError('생성이 취소되었습니다.');
        return;
      }
      setError(err instanceof Error ? err.message : 'LLM 요청에 실패했습니다.');
    } finally {
      if (runAbortRef.current === controller) {
        runAbortRef.current = null;
      }
      setLoading(false);
    }
  }, [refreshSelection, attachedImages, selectedProfile, model, instruction, systemPrompt, requestOptions]);

  const handleApplyResult = useCallback(() => {
    if (!result) return;
    if (!editorRef || !canInsertIntoDocument) {
      setError('삽입할 문서 에디터가 열려 있지 않습니다.');
      return;
    }
    const ok = applyLlmResultToEditor({
      editorRef,
      result,
      ...(onChange ? { onChange } : {}),
      ...(getMarkdown ? { getMarkdown } : {}),
    });
    if (!ok) {
      setError('에디터에 결과를 적용할 수 없습니다. 선택 영역을 다시 확인하세요.');
      return;
    }
    refreshSelection();
  }, [result, editorRef, canInsertIntoDocument, onChange, getMarkdown, refreshSelection]);

  const handleAppendResult = useCallback(() => {
    if (!result) return;
    if (!editorRef || !canInsertIntoDocument) {
      setError('삽입할 문서 에디터가 열려 있지 않습니다.');
      return;
    }
    const ok = applyLlmResultToEditor({
      editorRef,
      result,
      ...(onChange ? { onChange } : {}),
      ...(getMarkdown ? { getMarkdown } : {}),
      forceAppendAtEnd: true,
    });
    if (!ok) {
      setError('에디터에 결과를 삽입할 수 없습니다.');
      return;
    }
    refreshSelection();
  }, [result, editorRef, canInsertIntoDocument, onChange, getMarkdown, refreshSelection]);

  const handleCopyResult = useCallback(async () => {
    if (!result) return;
    const ok = await copyText(result, { message: '결과를 복사했습니다' });
    if (!ok) setError('클립보드에 복사하지 못했습니다.');
  }, [result]);

  const handleCreateNoteFromResult = useCallback(() => {
    if (!result) return;
    requestCreateFileWithContent(result);
  }, [result, requestCreateFileWithContent]);

  const handleLoadTemplate = useCallback(
    (id: string) => {
      setSelectedTemplateId(id);
      const tpl = templates.find((t) => t.id === id);
      if (tpl) {
        setInstruction(tpl.instruction);
        setSystemPrompt(
          typeof tpl.systemPrompt === 'string' && tpl.systemPrompt.trim()
            ? tpl.systemPrompt
            : getDefaultLlmAssistSystemPrompt(),
        );
        setRequestOptions(normalizeRequestOptions(tpl.requestOptions));
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
        systemPrompt: systemPrompt.trim(),
        requestOptions: normalizeRequestOptions(requestOptions),
        updatedAt: Date.now(),
      });
      setEditingTemplateId(saved.id);
      setSelectedTemplateId(saved.id);
      await loadTemplates();
    } catch (err) {
      alert(err instanceof Error ? err.message : '템플릿 저장에 실패했습니다.');
    }
  }, [templateName, instruction, systemPrompt, requestOptions, editingTemplateId, loadTemplates]);

  const handleNewTemplate = useCallback(() => {
    setEditingTemplateId(null);
    setSelectedTemplateId('');
    setTemplateName('');
    setInstruction('');
    setSystemPrompt(getDefaultLlmAssistSystemPrompt());
    setRequestOptions({ ...LLM_ASSIST_DEFAULT_REQUEST_OPTIONS });
  }, []);

  const handleDeleteTemplate = useCallback(async () => {
    if (!editingTemplateId) return;
    if (!window.confirm('이 지시사항 템플릿을 삭제할까요?')) return;
    try {
      await deleteLlmPromptTemplate(editingTemplateId);
      handleNewTemplate();
      await loadTemplates();
    } catch (err) {
      alert(err instanceof Error ? err.message : '템플릿 삭제에 실패했습니다.');
    }
  }, [editingTemplateId, handleNewTemplate, loadTemplates]);

  const handleAddImages = useCallback(async (images: LlmAssistImageAttachment[]) => {
    if (!images.length) return;
    setAttachedImages((prev) => [...prev, ...images]);
  }, []);

  const handleRemoveImage = useCallback((id: string) => {
    if (!id) return;
    setAttachedImages((prev) => prev.filter((img) => img.id !== id));
  }, []);

  const handleClearImages = useCallback(() => {
    setAttachedImages([]);
  }, []);

  const handleOsImageFilesDrop = useCallback(
    async (files: FileList) => {
      try {
        const next = await readImageFilesAsAttachments(files);
        await handleAddImages(next);
      } catch (err) {
        setError(err instanceof Error ? err.message : '이미지를 추가할 수 없습니다.');
      }
    },
    [handleAddImages],
  );

  const handlePopoutAction = useCallback(
    async (action: string, payload: PopoutActionPayload = {}) => {
      switch (action) {
        case 'refresh-selection':
          refreshSelection();
          break;
        case 'run':
          await handleRun();
          break;
        case 'cancel-run':
          handleCancelGeneration();
          break;
        case 'apply-result':
          handleApplyResult();
          break;
        case 'append-result':
          handleAppendResult();
          break;
        case 'copy-result':
          void handleCopyResult();
          break;
        case 'create-note-from-result':
          handleCreateNoteFromResult();
          break;
        case 'set-instruction':
          setInstruction(typeof payload.value === 'string' ? payload.value : '');
          break;
        case 'set-system-prompt':
          setSystemPrompt(typeof payload.value === 'string' ? payload.value : '');
          break;
        case 'set-request-options':
          setRequestOptions(normalizeRequestOptions(payload.value));
          break;
        case 'set-result':
          setResult(typeof payload.value === 'string' ? payload.value : '');
          break;
        case 'set-model':
          if (typeof payload.value === 'string') handleModelChange(payload.value);
          break;
        case 'set-llm-profile-id':
          if (typeof payload.value === 'string') setProfileId(payload.value);
          break;
        case 'load-template':
          handleLoadTemplate(String(payload.id ?? ''));
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
            .filter((img): img is LlmAssistImageAttachment => img !== null);
          if (incoming.length) await handleAddImages(incoming);
          break;
        }
        case 'remove-image':
          handleRemoveImage(String(payload.id ?? ''));
          break;
        case 'clear-images':
          handleClearImages();
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
      handleCancelGeneration,
      handleApplyResult,
      handleAppendResult,
      handleCopyResult,
      handleCreateNoteFromResult,
      handleModelChange,
      setProfileId,
      handleLoadTemplate,
      handleSaveTemplate,
      handleNewTemplate,
      handleDeleteTemplate,
      handleAddImages,
      handleRemoveImage,
      handleClearImages,
      onOpenChange,
    ],
  );

  useEffect(() => {
    if (!open) return undefined;

    let unsubBridge = () => {};
    let cancelled = false;

    void subscribeLlmAssistPopoutFromChild((message: LlmAssistBridgePayload) => {
      if (message.type === LLM_ASSIST_MSG.READY) {
        if (message.source && typeof message.source.postMessage === 'function') {
          popoutRef.current = message.source;
          popoutUsesTauriRef.current = false;
        } else if (isDesktopApp()) {
          popoutRef.current = null;
          popoutUsesTauriRef.current = true;
        }
        setPopoutActive(true);
        syncLlmAssistPopoutWindow(
          popoutUsesTauriRef.current ? null : popoutRef.current,
          buildSyncPayload(),
        );
        return;
      }

      if (message.type === LLM_ASSIST_MSG.ACTION && message.action) {
        void handlePopoutAction(message.action, message.payload ?? {});
      }
    }).then((unsub) => {
      if (cancelled) {
        unsub();
        return;
      }
      unsubBridge = unsub;
    });

    return () => {
      cancelled = true;
      unsubBridge();
    };
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
    handleCancelGeneration();
    closePopout();
    onOpenChange?.(false);
  };

  const handleOpenPopout = () => {
    void (async () => {
      if (isDesktopApp()) {
        const alreadyOpen = await isLlmAssistPopoutWindowOpen(null);
        if (alreadyOpen) {
          popoutUsesTauriRef.current = true;
          popoutRef.current = null;
          await focusLlmAssistPopoutWindow(null);
          syncToPopout();
          setPopoutActive(true);
          return;
        }
      }

      const win = popoutRef.current;
      if (win && !win.closed) {
        await focusLlmAssistPopoutWindow(win);
        syncToPopout();
        setPopoutActive(true);
        return;
      }

      const opened = await openLlmAssistPopoutWindow();
      if (!opened) {
        alert('팝업이 차단되어 새 창을 열 수 없습니다.');
        return;
      }

      if (opened === 'tauri') {
        popoutUsesTauriRef.current = true;
        popoutRef.current = null;
      } else {
        popoutUsesTauriRef.current = false;
        popoutRef.current = opened;
      }
      setPopoutActive(true);
    })();
  };

  const panelProps: LlmAssistPanelProps = {
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
    onClearImages: handleClearImages,
    instruction,
    onInstructionChange: setInstruction,
    systemPrompt,
    onSystemPromptChange: setSystemPrompt,
    requestOptions,
    onRequestOptionsChange: setRequestOptions,
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
    onCancelGeneration: handleCancelGeneration,
    onApplyResult: handleApplyResult,
    onAppendResult: handleAppendResult,
    onCopyResult: handleCopyResult,
    onCreateNoteFromResult: handleCreateNoteFromResult,
    presentation,
    canInsertIntoDocument,
  };

  const headerActions = (
    <div className="flex shrink-0 flex-wrap items-center justify-end gap-1">
      {presentation === 'floating' && typeof dockToRight === 'function' ? (
        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onClick={() => dockToRight()}
          className="rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50"
          title="우측에 고정"
          aria-label="우측에 고정"
        >
          <PanelRight size={15} />
        </button>
      ) : null}
      {presentation === 'docked' && typeof undockToFloating === 'function' ? (
        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onClick={() => undockToFloating()}
          className="rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50"
          title="플로팅 창으로"
          aria-label="플로팅 창으로"
        >
          <PanelTop size={15} />
        </button>
      ) : null}
      {presentation === 'floating' ? (
        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onClick={handleOpenPopout}
          disabled={popoutActive}
          className="rounded p-1 text-violet-700 hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-violet-200 dark:hover:bg-violet-900/50"
          title={popoutActive ? '새 창에서 열려 있음' : '새 창으로 열기'}
          aria-label="새 창으로 열기"
        >
          <SquareArrowOutUpRight size={15} />
        </button>
      ) : null}
      {presentation === 'floating' ? (
        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onClick={handleHide}
          className="rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50"
          title="숨기기"
          aria-label="숨기기"
        >
          <EyeOff size={15} />
        </button>
      ) : null}
      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onClick={handleClose}
        className="rounded p-1 text-violet-700 hover:bg-violet-100 dark:text-violet-200 dark:hover:bg-violet-900/50"
        title="닫기"
        aria-label="닫기"
      >
        <X size={15} />
      </button>
    </div>
  );

  const dockOpen = Boolean(open && presentation === 'docked');
  const floatingVisible = Boolean(
    open && presentation === 'floating' && !hidden && !popoutActive,
  );
  const chipVisible = Boolean(
    open && presentation === 'floating' && (hidden || popoutActive),
  );
  const chipLabel = popoutActive ? 'AI (새창)' : 'AI';
  const chipTitle = popoutActive
    ? '드래그: 이동 · 클릭: AI 도우미 표시 (새 창 닫으면 복귀)'
    : '드래그: 이동 · 클릭: AI 도우미 표시';

  const dockBody = (
    <LlmAssistImageDropZone
      className="flex h-full min-h-0 flex-col"
      disabled={!open}
      onFilesDrop={handleOsImageFilesDrop}
    >
      <div className="flex h-full min-h-0 flex-col" role="complementary" aria-label="AI 텍스트 도우미">
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-2 gap-y-1.5 border-b border-violet-200/60 bg-violet-50/90 px-3 py-2 dark:border-violet-800/50 dark:bg-violet-950/40">
          <div className="flex min-w-0 shrink-0 items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100">
            <Sparkles size={16} className="shrink-0" aria-hidden />
            <span className="whitespace-nowrap">AI 도우미</span>
          </div>
          {headerActions}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-3">
          <LlmAssistPanel {...panelProps} enableImageDropZone={false} />
        </div>
      </div>
    </LlmAssistImageDropZone>
  );

  return (
    <>
      <LlmAssistDockShell open={dockOpen} onClose={handleClose}>
        {dockBody}
      </LlmAssistDockShell>

      <AnimatePresence>
        {chipVisible ? (
          <Motion.div
            key="llm-assist-chip"
            role="button"
            tabIndex={0}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={FLOAT_TRANSITION}
            onPointerDown={(e) =>
              startPositionDrag(e, popoutActive ? {} : { onTap: handleShow })
            }
            onTouchStart={(e) =>
              startPositionTouchDrag(e, popoutActive ? {} : { onTap: handleShow })
            }
            onKeyDown={(e) => {
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
          </Motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {floatingVisible ? (
          <Motion.div
            key="llm-assist-floating"
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={FLOAT_TRANSITION}
            className="fixed z-10050 flex flex-col rounded-lg border border-violet-300/50 bg-white/95 shadow-2xl backdrop-blur-md dark:border-violet-700/60 dark:bg-odp-surface/95 origin-center"
            style={panelStyle}
            role="dialog"
            aria-modal="false"
            aria-label="AI 텍스트 도우미"
          >
            <LlmAssistImageDropZone
              className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg"
              disabled={!open}
              onFilesDrop={handleOsImageFilesDrop}
            >
              <div
                className="flex flex-wrap touch-none cursor-grab active:cursor-grabbing items-center justify-between gap-x-2 gap-y-1.5 border-b border-violet-200/60 bg-violet-50/90 px-3 py-2 dark:border-violet-800/50 dark:bg-violet-950/40"
                onPointerDown={(e) => startPositionDrag(e)}
                onTouchStart={(e) => startPositionTouchDrag(e)}
              >
                <div className="flex min-w-0 shrink-0 items-center gap-2 text-sm font-semibold text-violet-900 dark:text-violet-100">
                  <GripHorizontal size={16} className="shrink-0 opacity-60" aria-hidden />
                  <Sparkles size={16} className="shrink-0" aria-hidden />
                  <span className="whitespace-nowrap">AI 도우미</span>
                </div>
                {headerActions}
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto p-3">
                <LlmAssistPanel {...panelProps} enableImageDropZone={false} />
              </div>
            </LlmAssistImageDropZone>

            <div
              role="separator"
              aria-orientation="vertical"
              aria-label="너비 조절 (왼쪽)"
              className="absolute top-0 bottom-0 left-0 z-20 w-2 touch-none cursor-ew-resize!"
              onPointerDown={(e) => startEdgeResize('w', e)}
            />
            <div
              role="separator"
              aria-orientation="vertical"
              aria-label="너비 조절 (오른쪽)"
              className="absolute top-0 bottom-0 right-0 z-20 w-2 touch-none cursor-ew-resize!"
              onPointerDown={(e) => startEdgeResize('e', e)}
            />
            <div
              role="separator"
              aria-orientation="horizontal"
              aria-label="크기 조절"
              className="absolute bottom-0 left-0 z-30 h-6 w-6 touch-none opacity-0 cursor-nesw-resize!"
              onPointerDown={(e) => startCornerResize('sw', e)}
            />
            <div
              role="separator"
              aria-orientation="horizontal"
              aria-label="크기 조절"
              className="absolute bottom-0 right-0 z-30 h-6 w-6 touch-none opacity-0 cursor-nwse-resize!"
              onPointerDown={(e) => startCornerResize('se', e)}
            />
          </Motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

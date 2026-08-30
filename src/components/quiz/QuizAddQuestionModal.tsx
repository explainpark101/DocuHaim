import { useCallback, useEffect, useMemo, useRef, useState, type ClipboardEvent } from 'react';
import { ClipboardPaste, ImagePlus, Loader2, Wand2, X, ZoomIn } from 'lucide-react';
import Modal from '@/components/modals/Modal';
import Button from '@/components/Button';
import { IconCheck, IconPlus } from '@/components/icons';
import QuizSourcePathsChips from '@/components/quiz/QuizSourcePathsChips';
import QuizMarkdownCopyButton from '@/components/quiz/QuizMarkdownCopyButton';
import QuizLlmStreamPreview from '@/components/quiz/QuizLlmStreamPreview';
import QuizMdPreview from '@/components/quiz/QuizMdPreview';
import LlmAssistImageDropZone from '@/components/llm/LlmAssistImageDropZone';
import {
  formToQuizQuestion,
  validateAddQuestionForm,
} from '@/utils/quiz/buildQuestionMarkdown';
import {
  CHOICE_COUNT_MAX,
  CHOICE_COUNT_MIN,
  clampChoiceCount,
} from '@/utils/quiz/quizFileConfig';
import {
  resizeChoiceOptions,
  resolveQuestionChoiceCount,
} from '@/utils/quiz/quizQuestionStyle';
import type { QuizAddQuestionForm, QuizQuestion } from '@/utils/quiz/quizTypes';
import type { QuizQuestionStyleTemplate } from '@/utils/quiz/quizQuestionStyle';
import {
  extractImageFilesFromClipboard,
  readImageFilesAsAttachments,
  readImageFilesFromClipboardApi,
} from '@/utils/llmAssistImages';

export type QuizImageAttachment = {
  id: string;
  name: string;
  mimeType: string;
  dataBase64: string;
  previewDataUrl: string;
};

export type QuizImageGenerateResult =
  | { mode: 'form'; form: QuizAddQuestionForm }
  | { mode: 'bulk'; count: number };

type QuizAddQuestionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  styleTemplate: QuizQuestionStyleTemplate;
  initial?: QuizQuestion | null;
  nextLabel: string;
  onSubmit: (
    question: QuizQuestion,
    choiceAnalyses?: Record<string, string>,
  ) => void;
  /** Per-option analysis markdown (`"1"`, `"2"`, …) when editing a choice question. */
  initialChoiceAnalyses?: Record<string, string>;
  onOpenSourcePicker: (paths: string[], onDone: (next: string[]) => void) => void;
  onFixWithAi?: (
    params: { instructions: string; form: QuizAddQuestionForm },
  ) => Promise<QuizAddQuestionForm | null>;
  fixStreamText?: string;
  onGenerateFromImage?: (
    params: {
      image: { mimeType: string; dataBase64: string };
      answerKeyText?: string;
      answerKeyImage?: { mimeType: string; dataBase64: string };
      instructions: string;
      form: QuizAddQuestionForm;
      choiceCount: number;
    },
  ) => Promise<QuizImageGenerateResult | null>;
  imageGenStreamText?: string;
};

function applyFormPatch(
  patch: QuizAddQuestionForm,
  choiceCount: number,
): {
  kind: 'choice' | 'subjective';
  answerStyle: 'short' | 'essay';
  question: string;
  options: string[];
  answer: number;
  modelAnswer: string;
  point: string;
  explanation: string;
  choiceCount: number;
} {
  const kind = patch.kind || 'choice';
  const answerStyle = patch.answerStyle === 'essay' ? 'essay' : 'short';
  const resolvedCount =
    kind === 'choice'
      ? clampChoiceCount(
          Math.max(choiceCount, (patch.options || []).filter(Boolean).length),
        )
      : choiceCount;
  const options =
    kind === 'choice' ? resizeChoiceOptions(patch.options || [], resolvedCount) : [];
  return {
    kind,
    answerStyle,
    question: patch.question ?? '',
    options,
    answer:
      patch.answer && patch.answer >= 1
        ? Math.min(resolvedCount, patch.answer)
        : 1,
    modelAnswer: patch.modelAnswer ?? '',
    point: patch.point ?? '',
    explanation: patch.explanation ?? '',
    choiceCount: resolvedCount,
  };
}

export default function QuizAddQuestionModal({
  isOpen,
  onClose,
  styleTemplate,
  initial,
  nextLabel,
  onSubmit,
  onOpenSourcePicker,
  onFixWithAi,
  fixStreamText = '',
  onGenerateFromImage,
  imageGenStreamText = '',
  initialChoiceAnalyses = {},
}: QuizAddQuestionModalProps) {
  const editing = Boolean(initial);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [kind, setKind] = useState<'choice' | 'subjective'>(
    initial?.kind || styleTemplate.kind,
  );
  const [answerStyle, setAnswerStyle] = useState<'short' | 'essay'>(
    initial?.answerStyle || styleTemplate.answerStyle,
  );
  const [choiceCount, setChoiceCount] = useState(() =>
    initial
      ? resolveQuestionChoiceCount(initial, styleTemplate.choiceCount)
      : styleTemplate.choiceCount,
  );
  const [question, setQuestion] = useState(initial?.question || '');
  const [options, setOptions] = useState<string[]>(() =>
    resizeChoiceOptions(
      initial?.options || [],
      initial
        ? resolveQuestionChoiceCount(initial, styleTemplate.choiceCount)
        : styleTemplate.choiceCount,
    ),
  );
  const [answer, setAnswer] = useState(initial?.answer || 1);
  const [modelAnswer, setModelAnswer] = useState(initial?.modelAnswer || '');
  const [point, setPoint] = useState(initial?.point || '');
  const [explanation, setExplanation] = useState(initial?.explanation || '');
  const [sourcePaths, setSourcePaths] = useState<string[]>(
    initial?.sourcePaths || [],
  );
  const [error, setError] = useState('');
  const [fixPanelOpen, setFixPanelOpen] = useState(false);
  const [fixInstructions, setFixInstructions] = useState('');
  const [fixBusy, setFixBusy] = useState(false);
  const [imageAttachment, setImageAttachment] = useState<QuizImageAttachment | null>(null);
  const [answerKeyImage, setAnswerKeyImage] = useState<QuizImageAttachment | null>(null);
  const [answerKeyText, setAnswerKeyText] = useState('');
  const [imageInstructions, setImageInstructions] = useState('');
  const [imageBusy, setImageBusy] = useState(false);
  const [addingImage, setAddingImage] = useState(false);
  const [addingAnswerKeyImage, setAddingAnswerKeyImage] = useState(false);
  const answerKeyFileInputRef = useRef<HTMLInputElement>(null);
  const [imagePanelOpen, setImagePanelOpen] = useState(false);
  const [choiceAnalyses, setChoiceAnalyses] = useState<Record<string, string>>({});

  const handleChoiceCountChange = useCallback((nextRaw: number) => {
    const next = clampChoiceCount(nextRaw);
    setChoiceCount(next);
    setOptions((prev) => resizeChoiceOptions(prev, next));
    setAnswer((prev) => Math.min(Math.max(1, prev), next));
    setChoiceAnalyses((prev) => {
      const out: Record<string, string> = {};
      for (let i = 1; i <= next; i++) {
        const key = String(i);
        if (prev[key] !== undefined) out[key] = prev[key]!;
      }
      return out;
    });
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setFixPanelOpen(false);
      setFixInstructions('');
      setFixBusy(false);
      setImageAttachment(null);
      setAnswerKeyImage(null);
      setAnswerKeyText('');
      setImageInstructions('');
      setImageBusy(false);
      setAddingImage(false);
      setAddingAnswerKeyImage(false);
      setImagePanelOpen(false);
      setError('');
      return;
    }
    if (initial) {
      const cc = resolveQuestionChoiceCount(initial, styleTemplate.choiceCount);
      setKind(initial.kind);
      setAnswerStyle(initial.answerStyle === 'essay' ? 'essay' : 'short');
      setChoiceCount(cc);
      setQuestion(initial.question || '');
      setOptions(resizeChoiceOptions(initial.options || [], cc));
      setAnswer(initial.answer || 1);
      setModelAnswer(initial.modelAnswer || '');
      setPoint(initial.point || '');
      setExplanation(initial.explanation || '');
      setSourcePaths(initial.sourcePaths || []);
      setChoiceAnalyses(
        initial.kind === 'choice' ? { ...initialChoiceAnalyses } : {},
      );
    } else {
      setKind(styleTemplate.kind);
      setAnswerStyle(styleTemplate.answerStyle);
      setChoiceCount(styleTemplate.choiceCount);
      setQuestion('');
      setOptions(resizeChoiceOptions([], styleTemplate.choiceCount));
      setAnswer(1);
      setModelAnswer('');
      setPoint('');
      setExplanation('');
      setSourcePaths([]);
      setChoiceAnalyses({});
    }
    setFixPanelOpen(false);
    setFixInstructions('');
    setImageAttachment(null);
    setAnswerKeyImage(null);
    setAnswerKeyText('');
    setImageInstructions('');
    setImagePanelOpen(false);
    setChoiceAnalyses({});
    setError('');
  }, [isOpen, initial, initialChoiceAnalyses, styleTemplate]);

  const applyAnswerKeyImageAttachment = useCallback(async (files: FileList | File[]) => {
    const list = [...files].filter((f) => f.type.startsWith('image/'));
    if (!list.length) {
      setError('정답표 이미지 파일을 선택하세요.');
      return;
    }
    setAddingAnswerKeyImage(true);
    setError('');
    try {
      const [next] = await readImageFilesAsAttachments([list[0]!]);
      if (next) setAnswerKeyImage(next);
    } catch (err) {
      setError((err instanceof Error ? err.message : '') || '정답표 이미지를 불러올 수 없습니다.');
    } finally {
      setAddingAnswerKeyImage(false);
    }
  }, []);

  const busy = fixBusy || imageBusy;
  const imageAttachBusy = addingImage || addingAnswerKeyImage;

  const applyImageAttachment = useCallback(async (files: FileList | File[]) => {
    const list = [...files].filter((f) => f.type.startsWith('image/'));
    if (!list.length) {
      setError('이미지 파일을 선택하세요.');
      return;
    }
    setAddingImage(true);
    setError('');
    try {
      const [next] = await readImageFilesAsAttachments([list[0]!]);
      if (next) setImageAttachment(next);
    } catch (err) {
      setError((err instanceof Error ? err.message : '') || '이미지를 불러올 수 없습니다.');
    } finally {
      setAddingImage(false);
    }
  }, []);

  const handlePasteImage = useCallback(async () => {
    setAddingImage(true);
    setError('');
    try {
      const files = await readImageFilesFromClipboardApi();
      if (!files.length) {
        setError('클립보드에 이미지가 없습니다.');
        return;
      }
      const [next] = await readImageFilesAsAttachments(files);
      if (next) setImageAttachment(next);
    } catch (err) {
      setError((err instanceof Error ? err.message : '') || '클립보드에서 이미지를 읽을 수 없습니다.');
    } finally {
      setAddingImage(false);
    }
  }, []);

  const handleModalPaste = useCallback(
    (event: ClipboardEvent) => {
      if (editing || !imagePanelOpen || imageAttachBusy || imageBusy) return;
      const files = extractImageFilesFromClipboard(event.clipboardData);
      if (!files.length) return;
      event.preventDefault();
      void applyImageAttachment(files);
    },
    [applyImageAttachment, editing, imageAttachBusy, imageBusy, imagePanelOpen],
  );

  const form: QuizAddQuestionForm = useMemo(() => {
    const base: QuizAddQuestionForm = {
      kind,
      displayLabel: initial?.displayLabel || nextLabel,
      question,
      point,
      explanation,
      sourcePaths,
    };
    if (kind === 'subjective') {
      return { ...base, answerStyle, modelAnswer };
    }
    return { ...base, options: resizeChoiceOptions(options, choiceCount), answer };
  }, [
    kind,
    answerStyle,
    initial?.displayLabel,
    nextLabel,
    question,
    options,
    choiceCount,
    answer,
    modelAnswer,
    point,
    explanation,
    sourcePaths,
  ]);

  const handleSave = () => {
    const err = validateAddQuestionForm(form);
    if (err) {
      setError(err);
      return;
    }
    const q = formToQuizQuestion(form, nextLabel);
    if (initial) {
      q.id = initial.id;
      q.displayLabel = initial.displayLabel;
    }
    const trimmedAnalyses: Record<string, string> = {};
    if (editing && kind === 'choice') {
      for (let i = 1; i <= choiceCount; i++) {
        const key = String(i);
        const trimmed = String(choiceAnalyses[key] || '').trim();
        if (trimmed) trimmedAnalyses[key] = trimmed;
      }
      onSubmit(q, trimmedAnalyses);
    } else {
      onSubmit(q);
    }
    onClose();
  };

  const handleFixWithAi = async () => {
    if (!onFixWithAi || fixBusy) return;
    setError('');
    setFixBusy(true);
    try {
      const patched = await onFixWithAi({
        instructions: fixInstructions,
        form,
      });
      if (!patched) return;
      const next = applyFormPatch(patched, choiceCount);
      setKind(next.kind);
      setAnswerStyle(next.answerStyle);
      setChoiceCount(next.choiceCount);
      setQuestion(next.question);
      setOptions(next.options);
      setAnswer(next.answer);
      setModelAnswer(next.modelAnswer);
      setPoint(next.point);
      setExplanation(next.explanation);
      setFixPanelOpen(false);
    } catch (err) {
      setError(
        (err instanceof Error ? err.message : '') || '문제 고치기에 실패했습니다.',
      );
    } finally {
      setFixBusy(false);
    }
  };

  const handleGenerateFromImage = async () => {
    if (!onGenerateFromImage || imageBusy || !imageAttachment) return;
    setError('');
    setImageBusy(true);
    try {
      const result = await onGenerateFromImage({
        image: {
          mimeType: imageAttachment.mimeType,
          dataBase64: imageAttachment.dataBase64,
        },
        ...(answerKeyText.trim() ? { answerKeyText: answerKeyText.trim() } : {}),
        ...(answerKeyImage
          ? {
              answerKeyImage: {
                mimeType: answerKeyImage.mimeType,
                dataBase64: answerKeyImage.dataBase64,
              },
            }
          : {}),
        instructions: imageInstructions,
        form,
        choiceCount,
      });
      if (!result) return;
      if (result.mode === 'bulk') {
        onClose();
        return;
      }
      const next = applyFormPatch(result.form, choiceCount);
      setKind(next.kind);
      setAnswerStyle(next.answerStyle);
      setChoiceCount(next.choiceCount);
      setQuestion(next.question);
      setOptions(next.options);
      setAnswer(next.answer);
      setModelAnswer(next.modelAnswer);
      setPoint(next.point);
      setExplanation(next.explanation);
    } catch (err) {
      setError(
        (err instanceof Error ? err.message : '') || '이미지 분석에 실패했습니다.',
      );
    } finally {
      setImageBusy(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} contentClassName="quiz-pane max-w-2xl max-h-[90vh]">
      <div
        className="flex max-h-[min(80vh,720px)] flex-col gap-3 overflow-y-auto p-4 text-sm"
        onPaste={handleModalPaste}
      >
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h2 className="text-base font-bold text-gray-900 dark:text-odp-fgStrong">
            {editing ? '문제 수정' : '문제 추가'}
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            {!editing && onGenerateFromImage ? (
              <Button
                type="button"
                variant={imagePanelOpen ? 'primary' : 'secondary'}
                size="sm"
                aria-pressed={imagePanelOpen}
                disabled={busy}
                onClick={() => setImagePanelOpen((v) => !v)}
              >
                <ImagePlus size={14} />
                이미지로 출제
              </Button>
            ) : null}
            {editing && onFixWithAi ? (
              <Button
                type="button"
                variant={fixPanelOpen ? 'primary' : 'secondary'}
                size="sm"
                aria-pressed={fixPanelOpen}
                disabled={busy}
                onClick={() => setFixPanelOpen((v) => !v)}
              >
                <Wand2 size={14} />
                문제 고치기
              </Button>
            ) : null}
          </div>
        </div>

        {!editing && imagePanelOpen && onGenerateFromImage ? (
          <LlmAssistImageDropZone
            className="rounded-xl"
            disabled={busy || imageAttachBusy}
            onFilesDrop={(files) => void applyImageAttachment(files)}
          >
            <div className="space-y-2 rounded-xl border border-sky-200 bg-sky-50/80 p-3 dark:border-sky-900/60 dark:bg-sky-950/25">
              <p className="text-xs text-sky-900 dark:text-sky-100">
                시험지·교재·도표 이미지를 첨부하면 AI가 내용을 분석해 문항을 채웁니다.
                여러 문항이 있으면 한 번에 인식해 일괄 추가할 수 있습니다.
                정답표를 텍스트로 붙여넣거나 사진으로 첨부하면 객관식 정답 번호를 자동 입력합니다.
                Gemini, MLX-VLM, OpenAI 호환 비전, 또는 llama.cpp 멀티모달(VL) 모델이 필요합니다.
              </p>
              <div className="flex flex-wrap items-center gap-1">
                <button
                  type="button"
                  onClick={() => void handlePasteImage()}
                  disabled={busy || imageAttachBusy}
                  className="inline-flex items-center gap-1 rounded border border-sky-300 bg-white px-2 py-0.5 text-[11px] hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-sky-800 dark:bg-odp-bgSoft dark:hover:bg-odp-bg"
                >
                  {addingImage ? (
                    <Loader2 size={12} className="animate-spin" aria-hidden />
                  ) : (
                    <ClipboardPaste size={12} aria-hidden />
                  )}
                  클립보드 붙여넣기
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={busy || imageAttachBusy}
                  className="inline-flex items-center gap-1 rounded border border-sky-300 bg-white px-2 py-0.5 text-[11px] hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-sky-800 dark:bg-odp-bgSoft dark:hover:bg-odp-bg"
                >
                  {addingImage ? (
                    <Loader2 size={12} className="animate-spin" aria-hidden />
                  ) : (
                    <ImagePlus size={12} aria-hidden />
                  )}
                  파일 선택
                </button>
                {imageAttachment ? (
                  <button
                    type="button"
                    onClick={() => setImageAttachment(null)}
                    disabled={busy || imageAttachBusy}
                    className="inline-flex items-center gap-1 rounded border border-sky-300 bg-white px-2 py-0.5 text-[11px] hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-sky-800 dark:bg-odp-bgSoft dark:hover:bg-odp-bg"
                  >
                    <X size={12} aria-hidden />
                    이미지 제거
                  </button>
                ) : null}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files?.length) void applyImageAttachment(files);
                  e.target.value = '';
                }}
              />
              {imageAttachment ? (
                <div className="relative overflow-hidden rounded-lg border border-sky-200 bg-white dark:border-sky-800 dark:bg-odp-bgSoft">
                  <img
                    src={imageAttachment.previewDataUrl}
                    alt=""
                    className="max-h-48 w-full object-contain"
                  />
                  <div className="truncate px-2 py-1 text-[10px] text-gray-600 dark:text-odp-muted">
                    {imageAttachment.name}
                  </div>
                  <ZoomIn
                    size={16}
                    className="pointer-events-none absolute right-2 top-2 text-white drop-shadow"
                    aria-hidden
                  />
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-sky-300 bg-white/70 px-3 py-6 text-center text-xs text-sky-800 dark:border-sky-800 dark:bg-odp-bgSoft/60 dark:text-sky-100">
                  시험지 이미지를 끌어다 놓거나, 붙여넣기·파일 선택을 사용하세요.
                </div>
              )}
              {kind === 'choice' ? (
                <div className="space-y-2 rounded-lg border border-sky-200/80 bg-white/70 p-2.5 dark:border-sky-800 dark:bg-odp-bgSoft/50">
                  <p className="text-[11px] font-semibold text-sky-900 dark:text-sky-100">
                    정답표 (선택)
                  </p>
                  <p className="text-[10px] text-sky-800 dark:text-sky-200">
                    `1 3` · `1→③` · 탭 구분 표 형식을 붙여넣거나, 정답표 사진을 첨부하세요.
                  </p>
                  <textarea
                    className="min-h-16 w-full rounded-lg border border-sky-200 bg-white p-2 font-mono text-[11px] dark:border-sky-800 dark:bg-odp-bgSoft"
                    placeholder={'1\t3\n2\t1\n3\t4'}
                    value={answerKeyText}
                    onChange={(e) => setAnswerKeyText(e.target.value)}
                    disabled={busy}
                  />
                  <div className="flex flex-wrap items-center gap-1">
                    <button
                      type="button"
                      onClick={() => answerKeyFileInputRef.current?.click()}
                      disabled={busy || imageAttachBusy}
                      className="inline-flex items-center gap-1 rounded border border-sky-300 bg-white px-2 py-0.5 text-[11px] hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-sky-800 dark:bg-odp-bgSoft dark:hover:bg-odp-bg"
                    >
                      {addingAnswerKeyImage ? (
                        <Loader2 size={12} className="animate-spin" aria-hidden />
                      ) : (
                        <ImagePlus size={12} aria-hidden />
                      )}
                      정답표 사진
                    </button>
                    {answerKeyImage ? (
                      <button
                        type="button"
                        onClick={() => setAnswerKeyImage(null)}
                        disabled={busy || imageAttachBusy}
                        className="inline-flex items-center gap-1 rounded border border-sky-300 bg-white px-2 py-0.5 text-[11px] hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-sky-800 dark:bg-odp-bgSoft dark:hover:bg-odp-bg"
                      >
                        <X size={12} aria-hidden />
                        정답표 이미지 제거
                      </button>
                    ) : null}
                  </div>
                  <input
                    ref={answerKeyFileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files?.length) void applyAnswerKeyImageAttachment(files);
                      e.target.value = '';
                    }}
                  />
                  {answerKeyImage ? (
                    <div className="relative overflow-hidden rounded-lg border border-sky-200 bg-white dark:border-sky-800 dark:bg-odp-bgSoft">
                      <img
                        src={answerKeyImage.previewDataUrl}
                        alt=""
                        className="max-h-32 w-full object-contain"
                      />
                      <div className="truncate px-2 py-1 text-[10px] text-gray-600 dark:text-odp-muted">
                        {answerKeyImage.name}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
              <label className="block space-y-1">
                <span className="text-xs font-semibold text-sky-900 dark:text-sky-100">
                  추가 지시 (선택)
                </span>
                <textarea
                  className="min-h-14 w-full rounded-lg border border-sky-200 bg-white p-2 text-xs dark:border-sky-800 dark:bg-odp-bgSoft"
                  placeholder="예: 객관식으로 내고, 계산보다 개념 이해를 묻게 해 주세요."
                  value={imageInstructions}
                  onChange={(e) => setImageInstructions(e.target.value)}
                  disabled={busy}
                />
              </label>
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  disabled={busy || !imageAttachment}
                  onClick={() => void handleGenerateFromImage()}
                >
                  {imageBusy ? (
                    <Loader2 size={14} className="animate-spin" aria-hidden />
                  ) : (
                    <Wand2 size={14} />
                  )}
                  {imageBusy ? '분석 중…' : 'AI로 문항 생성'}
                </Button>
              </div>
              {imageBusy ? (
                <div className="rounded-lg border border-sky-200 bg-white/80 p-2 dark:border-sky-800 dark:bg-odp-bgSoft">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-200">
                    모델 응답
                  </p>
                  <QuizLlmStreamPreview
                    text={imageGenStreamText}
                    previewId="quiz-image-gen-stream"
                    emptyLabel="이미지를 분석하는 중…"
                  />
                </div>
              ) : null}
            </div>
          </LlmAssistImageDropZone>
        ) : null}

        {editing && fixPanelOpen && onFixWithAi ? (
          <div className="space-y-2 rounded-xl border border-violet-200 bg-violet-50/80 p-3 dark:border-violet-900/60 dark:bg-violet-950/25">
            <p className="text-xs text-violet-900 dark:text-violet-100">
              현재 문항을 불완전하거나 오류가 있는 것으로 보고 AI가 교정합니다. 요구사항을
              적으면 문항 방향·주제·난이도를 조정할 수 있습니다.
            </p>
            <label className="block space-y-1">
              <span className="text-xs font-semibold text-violet-900 dark:text-violet-100">
                수정 요구사항 (선택)
              </span>
              <textarea
                className="min-h-16 w-full rounded-lg border border-violet-200 bg-white p-2 text-xs dark:border-violet-800 dark:bg-odp-bgSoft"
                placeholder="예: 계산 과정을 단순화하고, 오답 보기를 더 그럴듯하게 바꿔 주세요."
                value={fixInstructions}
                onChange={(e) => setFixInstructions(e.target.value)}
                disabled={fixBusy}
              />
            </label>
            <div className="flex justify-end">
              <Button
                type="button"
                variant="primary"
                size="sm"
                disabled={fixBusy}
                onClick={() => void handleFixWithAi()}
              >
                {fixBusy ? (
                  <Loader2 size={14} className="animate-spin" aria-hidden />
                ) : (
                  <Wand2 size={14} />
                )}
                {fixBusy ? '고치는 중…' : 'AI로 고치기'}
              </Button>
            </div>
            {fixBusy ? (
              <div className="rounded-lg border border-violet-200 bg-white/80 p-2 dark:border-violet-800 dark:bg-odp-bgSoft">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-200">
                  모델 응답
                </p>
                <QuizLlmStreamPreview
                  text={fixStreamText}
                  previewId="quiz-fix-ai-stream"
                  emptyLabel="교정 결과를 생성하는 중…"
                />
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              ['choice', '객관식'],
              ['subjective-short', '단답형'],
              ['subjective-essay', '서술형'],
            ] as const
          ).map(([id, label]) => {
            const active =
              id === 'choice'
                ? kind === 'choice'
                : kind === 'subjective' &&
                  answerStyle === (id === 'subjective-short' ? 'short' : 'essay');
            return (
              <button
                key={id}
                type="button"
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                  active
                    ? 'border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-100'
                    : 'border-gray-200 bg-white text-gray-700 dark:border-odp-borderSoft dark:bg-odp-surface dark:text-odp-fg'
                }`}
                onClick={() => {
                  if (id === 'choice') setKind('choice');
                  else {
                    setKind('subjective');
                    setAnswerStyle(id === 'subjective-short' ? 'short' : 'essay');
                  }
                }}
              >
                {label}
              </button>
            );
          })}
          {kind === 'choice' ? (
            <label className="ml-auto flex items-center gap-1.5 text-xs text-gray-600 dark:text-odp-muted">
              보기
              <select
                className="rounded-lg border border-gray-300 bg-white px-2 py-1 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft"
                value={choiceCount}
                onChange={(e) =>
                  handleChoiceCountChange(Number(e.target.value) || choiceCount)
                }
              >
                {Array.from(
                  { length: CHOICE_COUNT_MAX - CHOICE_COUNT_MIN + 1 },
                  (_, i) => CHOICE_COUNT_MIN + i,
                ).map((n) => (
                  <option key={n} value={n}>
                    {n}지선다
                  </option>
                ))}
              </select>
            </label>
          ) : null}
        </div>

        <label className="block space-y-1">
          <span className="text-xs font-semibold text-gray-700 dark:text-odp-fgStrong">
            질문 (Markdown)
          </span>
          <textarea
            className="min-h-24 w-full rounded-lg border border-gray-300 bg-white p-2 font-mono text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          {question.trim() ? (
            <QuizMdPreview text={question} previewId="quiz-add-q-preview" className="rounded border border-gray-100 p-2 text-xs dark:border-odp-borderSoft" />
          ) : null}
        </label>

        {kind === 'choice' ? (
          <div className="space-y-2">
            <span className="text-xs font-semibold text-gray-700 dark:text-odp-fgStrong">
              선택지 ({choiceCount}지선다)
            </span>
            {options.map((opt, i) => (
              <div key={i} className="flex items-start gap-2">
                <input
                  type="radio"
                  name="quiz-add-answer"
                  checked={answer === i + 1}
                  onChange={() => setAnswer(i + 1)}
                  className="mt-2"
                  aria-label={`${i + 1}번 정답`}
                />
                <textarea
                  className="min-h-10 flex-1 rounded-lg border border-gray-300 bg-white p-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft"
                  value={opt}
                  placeholder={`${i + 1}번`}
                  onChange={(e) => {
                    const next = [...options];
                    next[i] = e.target.value;
                    setOptions(next);
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <label className="block space-y-1">
            <span className="text-xs font-semibold text-gray-700 dark:text-odp-fgStrong">
              {answerStyle === 'essay' ? '모범 답안' : '정답'}
            </span>
            {answerStyle === 'essay' ? (
              <textarea
                className="min-h-20 w-full rounded-lg border border-gray-300 bg-white p-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft"
                value={modelAnswer}
                onChange={(e) => setModelAnswer(e.target.value)}
              />
            ) : (
              <input
                className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft"
                value={modelAnswer}
                onChange={(e) => setModelAnswer(e.target.value)}
              />
            )}
          </label>
        )}

        {editing && kind === 'choice' ? (
          <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/80 p-3 dark:border-odp-borderSoft dark:bg-odp-bgSoft/60">
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-odp-fgStrong">
                보기별 분석 (Markdown)
              </div>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-odp-muted">
                정답·오답 분석을 직접 편집할 수 있습니다. 비우면 해당 보기 분석이
                삭제됩니다.
              </p>
            </div>
            {Array.from({ length: choiceCount }, (_, i) => {
              const n = i + 1;
              const isCorrect = n === answer;
              const label = isCorrect ? `${n}번 정답 분석` : `${n}번 오답 분석`;
              const value = choiceAnalyses[String(n)] || '';
              const borderClass = isCorrect
                ? 'border-emerald-200 dark:border-emerald-900/50'
                : 'border-rose-200 dark:border-rose-900/50';
              const labelClass = isCorrect
                ? 'text-emerald-800 dark:text-emerald-200'
                : 'text-rose-800 dark:text-rose-200';
              return (
                <label
                  key={n}
                  className={`block space-y-1.5 rounded-lg border ${borderClass} bg-white p-2.5 dark:bg-odp-surface`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs font-semibold ${labelClass}`}>{label}</span>
                    <QuizMarkdownCopyButton text={value} label={label} disabled={busy} />
                  </div>
                  <textarea
                    className="min-h-20 w-full rounded-lg border border-gray-300 bg-white p-2 font-mono text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft"
                    value={value}
                    placeholder={`${label} Markdown…`}
                    disabled={busy}
                    onChange={(e) => {
                      const nextVal = e.target.value;
                      setChoiceAnalyses((prev) => ({
                        ...prev,
                        [String(n)]: nextVal,
                      }));
                    }}
                  />
                  {value.trim() ? (
                    <QuizMdPreview
                      text={value}
                      previewId={`quiz-edit-analysis-${initial?.id ?? 'new'}-${n}`}
                      className="rounded border border-gray-100 p-2 text-xs dark:border-odp-borderSoft"
                    />
                  ) : null}
                </label>
              );
            })}
          </div>
        ) : null}

        <label className="block space-y-1">
          <span className="text-xs font-semibold text-gray-700 dark:text-odp-fgStrong">
            접근 Point (선택)
          </span>
          <textarea
            className="min-h-14 w-full rounded-lg border border-gray-300 bg-white p-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft"
            value={point}
            onChange={(e) => setPoint(e.target.value)}
          />
        </label>
        <label className="block space-y-1">
          <span className="text-xs font-semibold text-gray-700 dark:text-odp-fgStrong">
            해설 (선택)
          </span>
          <textarea
            className="min-h-14 w-full rounded-lg border border-gray-300 bg-white p-2 text-xs dark:border-odp-borderSoft dark:bg-odp-bgSoft"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
          />
        </label>

        <QuizSourcePathsChips
          paths={sourcePaths}
          onRemove={(p) => setSourcePaths((prev) => prev.filter((x) => x !== p))}
          onOpenPicker={() =>
            onOpenSourcePicker(sourcePaths, (next) => setSourcePaths(next))
          }
          label="문항 근거 문서 (선택)"
        />

        {error ? (
          <p className="text-xs font-medium text-rose-600">{error}</p>
        ) : null}

        <div className="flex justify-end gap-2 border-t border-gray-100 pt-3 dark:border-odp-borderSoft">
          <Button type="button" variant="secondary" onClick={onClose} disabled={busy}>
            취소
          </Button>
          <Button type="button" variant="primary" onClick={handleSave} disabled={busy}>
            {editing ? <IconCheck size={14} /> : <IconPlus size={14} />}
            {editing ? '저장' : '추가'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

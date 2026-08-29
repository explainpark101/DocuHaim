import { useCallback, useEffect, useMemo, useState } from 'react';
import { Loader2, Wand2 } from 'lucide-react';
import Modal from '@/components/modals/Modal';
import Button from '@/components/Button';
import { IconCheck, IconPlus } from '@/components/icons';
import QuizSourcePathsChips from '@/components/quiz/QuizSourcePathsChips';
import QuizMdPreview from '@/components/quiz/QuizMdPreview';
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

type QuizAddQuestionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  styleTemplate: QuizQuestionStyleTemplate;
  initial?: QuizQuestion | null;
  nextLabel: string;
  onSubmit: (question: QuizQuestion) => void;
  onOpenSourcePicker: (paths: string[], onDone: (next: string[]) => void) => void;
  onFixWithAi?: (
    params: { instructions: string; form: QuizAddQuestionForm },
  ) => Promise<QuizAddQuestionForm | null>;
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
}: QuizAddQuestionModalProps) {
  const editing = Boolean(initial);
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

  const handleChoiceCountChange = useCallback((nextRaw: number) => {
    const next = clampChoiceCount(nextRaw);
    setChoiceCount(next);
    setOptions((prev) => resizeChoiceOptions(prev, next));
    setAnswer((prev) => Math.min(Math.max(1, prev), next));
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setFixPanelOpen(false);
      setFixInstructions('');
      setFixBusy(false);
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
    }
    setFixPanelOpen(false);
    setFixInstructions('');
    setError('');
  }, [isOpen, initial, styleTemplate]);

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
    onSubmit(q);
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} contentClassName="quiz-pane max-w-2xl max-h-[90vh]">
      <div className="flex max-h-[min(80vh,720px)] flex-col gap-3 overflow-y-auto p-4 text-sm">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h2 className="text-base font-bold text-gray-900 dark:text-odp-fgStrong">
            {editing ? '문제 수정' : '문제 추가'}
          </h2>
          {editing && onFixWithAi ? (
            <Button
              type="button"
              variant={fixPanelOpen ? 'primary' : 'secondary'}
              size="sm"
              aria-pressed={fixPanelOpen}
              disabled={fixBusy}
              onClick={() => setFixPanelOpen((v) => !v)}
            >
              <Wand2 size={14} />
              문제 고치기
            </Button>
          ) : null}
        </div>

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
          <Button type="button" variant="secondary" onClick={onClose} disabled={fixBusy}>
            취소
          </Button>
          <Button type="button" variant="primary" onClick={handleSave} disabled={fixBusy}>
            {editing ? <IconCheck size={14} /> : <IconPlus size={14} />}
            {editing ? '저장' : '추가'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

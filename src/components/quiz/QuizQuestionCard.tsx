import { memo, useMemo } from 'react';
import { motion as Motion } from 'motion/react';
import {
  BookOpen,
  CheckCheck,
  GitBranch,
  PenLine,
  RotateCcw,
  Sparkles,
  Wand2,
} from 'lucide-react';
import Button from '@/components/Button';
import QuizMdPreview from '@/components/quiz/QuizMdPreview';
import QuizExamGradeButton from '@/components/quiz/QuizExamGradeButton';
import QuizQuestionSectionsPanel, {
  type QuizQuestionSectionsTarget,
} from '@/components/quiz/QuizQuestionSectionsPanel';
import QuizWrongChoiceAnalysisPanel from '@/components/quiz/QuizWrongChoiceAnalysisPanel';
import QuizQuestionMemoPanel from '@/components/quiz/QuizQuestionMemoPanel';
import type { QuizChoiceAnalysisDockMode } from '@/components/quiz/QuizChoiceAnalysisDock';
import { useQuizSubjectiveAnswerDraft } from '@/hooks/useQuizSubjectiveAnswerDraft';
import { QUIZ_QUESTION_TRACK_ATTR } from '@/hooks/useQuizQuestionTimeLog';
import type { QuizQuestion, SubjectiveGradeResult } from '@/utils/quiz/quizTypes';

export type QuizQuestionCardProps = {
  question: QuizQuestion;
  userAnswer: number | string | undefined;
  isSubmitted: boolean;
  isQuestionGraded: boolean;
  subjectiveGrade: SubjectiveGradeResult | undefined;
  showExplanation: boolean;
  wrongExpsForQuestion: Record<string, string>;
  wrongExpFocusOption: number;
  questionMemo: string;
  busyId: string | null;
  examInProgress: boolean;
  isFresh: boolean;
  onClearFresh: () => void;
  onAnswerCommit: (questionId: string, value: string) => void;
  onSelectOption: (questionId: string, option: number) => void;
  onEditQuestion: (question: QuizQuestion) => void;
  onGradeChoice: (question: QuizQuestion) => void;
  onGradeSubjective: (question: QuizQuestion, answer: string) => void;
  onRetry: (question: QuizQuestion) => void;
  onToggleExplanation: (questionId: string) => void;
  onSimilar: (question: QuizQuestion) => void;
  onDerived: (question: QuizQuestion) => void;
  onGenerateSections: (
    question: QuizQuestion,
    target: QuizQuestionSectionsTarget,
  ) => void;
  onWrongExpFocusChange: (questionId: string, option: number) => void;
  onOpenAnalysisDock: (
    questionId: string,
    option: number,
    mode: QuizChoiceAnalysisDockMode,
  ) => void;
  onMemoSave: (questionId: string, value: string) => void;
};

function QuizQuestionCardInner({
  question: q,
  userAnswer,
  isSubmitted,
  isQuestionGraded,
  subjectiveGrade,
  showExplanation,
  wrongExpsForQuestion,
  wrongExpFocusOption,
  questionMemo,
  busyId,
  examInProgress,
  isFresh,
  onClearFresh,
  onAnswerCommit,
  onSelectOption,
  onEditQuestion,
  onGradeChoice,
  onGradeSubjective,
  onRetry,
  onToggleExplanation,
  onSimilar,
  onDerived,
  onGenerateSections,
  onWrongExpFocusChange,
  onOpenAnalysisDock,
  onMemoSave,
}: QuizQuestionCardProps) {
  const committedAnswer = String(userAnswer ?? '');
  const { draft, handleChange, flush } = useQuizSubjectiveAnswerDraft(
    q.id,
    committedAnswer,
    onAnswerCommit,
  );

  const answered =
    userAnswer !== undefined && String(userAnswer).trim() !== '';
  const isGraded = isSubmitted || isQuestionGraded;

  const { isWrong, isCorrect, gradeLabel } = useMemo(() => {
    let wrong = false;
    let correct = false;
    let label: string | null = null;

    if (q.kind === 'choice' && isGraded && answered) {
      correct = userAnswer === q.answer;
      wrong = !correct;
    }
    if (q.kind === 'subjective' && isGraded) {
      correct = subjectiveGrade?.verdict === 'correct';
      wrong = subjectiveGrade?.verdict === 'wrong';
    }

    if (isGraded) {
      if (q.kind === 'choice') {
        if (!answered) label = '미채점';
        else if (correct) label = '정답';
        else label = '오답';
      } else {
        const verdict = subjectiveGrade?.verdict;
        if (verdict === 'correct') label = '정답';
        else if (verdict === 'partial') label = '부분정답';
        else if (verdict === 'wrong') label = '오답';
      }
    }

    return { isWrong: wrong, isCorrect: correct, gradeLabel: label };
  }, [
    answered,
    isGraded,
    q.answer,
    q.kind,
    subjectiveGrade?.verdict,
    userAnswer,
  ]);

  const selected = userAnswer;
  const cardClassName = [
    'relative rounded-2xl border bg-white p-5 pr-16 shadow-xs dark:bg-odp-surface',
    isGraded
      ? isCorrect
        ? 'border-emerald-300'
        : isWrong
          ? 'border-rose-300'
          : 'border-slate-200 dark:border-odp-borderSoft'
      : 'border-slate-200 dark:border-odp-borderSoft',
    q.isGenerated ? 'border-purple-300 dark:border-purple-700' : '',
    isFresh ? 'ring-2 ring-purple-300/70 dark:ring-purple-500/50' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const cardBody = (
    <>
      <Button
        type="button"
        variant="tertiary"
        size="sm"
        className="absolute top-3 right-3 z-10"
        onClick={() => onEditQuestion(q)}
      >
        <PenLine size={14} />
        수정
      </Button>
      <div className="mb-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-odp-fgStrong">
          <span className="mr-1.5 inline-flex items-center gap-1.5 align-middle">
            <span>{q.displayLabel}.</span>
            {gradeLabel ? (
              <span
                className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                  gradeLabel === '정답'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200'
                    : gradeLabel === '오답'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-200'
                      : gradeLabel === '부분정답'
                        ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200'
                        : 'bg-slate-100 text-slate-700 dark:bg-odp-bgSoft dark:text-odp-muted'
                }`}
              >
                {gradeLabel}
              </span>
            ) : null}
          </span>
          {q.kind === 'subjective'
            ? q.answerStyle === 'essay'
              ? '[주관식] '
              : '[단답형] '
            : ''}
          <span className="font-medium">
            <QuizMdPreview
              text={q.question}
              previewId={`qq-${q.id}`}
              className="inline"
            />
          </span>
        </h3>
      </div>

      {q.kind === 'choice' ? (
        <div className="space-y-2">
          {(q.options || []).map((opt, idx) => {
            const n = idx + 1;
            const isSel = selected === n;
            const reveal = isGraded;
            const isRight = q.answer === n;
            let cls =
              'border-slate-200 bg-white hover:bg-slate-50 dark:border-odp-borderSoft dark:bg-odp-bgSoft';
            if (isSel && !reveal) {
              cls =
                'border-blue-500 bg-blue-50 ring-1 ring-blue-500 dark:bg-blue-950/30';
            }
            if (reveal && isRight) {
              cls =
                'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500 dark:bg-emerald-950/30';
            } else if (reveal && isSel && !isRight) {
              cls = 'border-rose-400 bg-rose-50 dark:bg-rose-950/30';
            }
            return (
              <button
                key={n}
                type="button"
                className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left text-sm ${cls}`}
                onClick={() => onSelectOption(q.id, n)}
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold">
                  {n}
                </span>
                <div className="min-w-0 flex-1">
                  <QuizMdPreview text={opt} previewId={`qo-${q.id}-${n}`} />
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {q.answerStyle === 'essay' ? (
            <textarea
              className="quiz-body-field min-h-24 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft"
              value={draft}
              disabled={isGraded}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={flush}
              placeholder="답안을 입력하세요"
            />
          ) : (
            <input
              className="quiz-body-field w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-odp-borderSoft dark:bg-odp-bgSoft"
              value={draft}
              disabled={isGraded}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={flush}
              placeholder="단답 입력"
            />
          )}
          {subjectiveGrade ? (
            <div
              className={`rounded-xl border p-3 text-xs ${
                subjectiveGrade.verdict === 'correct'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-800/70 dark:bg-emerald-950/45 dark:text-emerald-100'
                  : subjectiveGrade.verdict === 'partial'
                    ? 'border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-800/70 dark:bg-amber-950/45 dark:text-amber-100'
                    : 'border-rose-200 bg-rose-50 text-rose-950 dark:border-rose-800/70 dark:bg-rose-950/45 dark:text-rose-100'
              }`}
            >
              <div className="mb-1 font-bold">
                {subjectiveGrade.verdict} · {subjectiveGrade.score}점
              </div>
              <div className="[&_.md-editor-preview]:text-inherit [&_.md-editor-preview]:!bg-transparent [&_.md-editor]:!bg-transparent">
                <QuizMdPreview
                  text={subjectiveGrade.feedback || ''}
                  previewId={`qg-${q.id}`}
                />
              </div>
            </div>
          ) : null}
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {!isGraded ? (
          q.kind === 'choice' ? (
            <QuizExamGradeButton
              examInProgress={examInProgress}
              size="sm"
              disabled={!answered}
              onClick={() => onGradeChoice(q)}
              className="!bg-emerald-600 !text-white hover:!bg-emerald-700 dark:!bg-emerald-600 dark:hover:!bg-emerald-700"
            >
              <CheckCheck size={14} />
              채점
            </QuizExamGradeButton>
          ) : (
            <QuizExamGradeButton
              examInProgress={examInProgress}
              size="sm"
              disabled={busyId === q.id || !draft.trim()}
              onClick={() => {
                flush();
                onGradeSubjective(q, draft);
              }}
              className="!bg-emerald-600 !text-white hover:!bg-emerald-700 dark:!bg-emerald-600 dark:hover:!bg-emerald-700"
            >
              <Sparkles size={14} />
              AI 채점
            </QuizExamGradeButton>
          )
        ) : (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => onRetry(q)}
          >
            <RotateCcw size={14} />
            다시풀기
          </Button>
        )}
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => onToggleExplanation(q.id)}
        >
          <BookOpen size={14} />
          {showExplanation ? '해설 접기' : '해설 보기'}
        </Button>
        {q.kind === 'choice' ? (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={busyId === `sim-${q.id}`}
            onClick={() => onSimilar(q)}
          >
            <Wand2 size={14} />
            유사문제
          </Button>
        ) : null}
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={busyId === `derived-${q.id}`}
          onClick={() => onDerived(q)}
        >
          <GitBranch size={14} />
          파생문제 생성
        </Button>
      </div>

      {isGraded ? (
        <QuizQuestionSectionsPanel
          question={q}
          busyKey={busyId}
          showContent={showExplanation}
          onGenerate={(target) => onGenerateSections(q, target)}
        />
      ) : null}

      {isGraded && q.kind === 'choice' ? (
        <QuizWrongChoiceAnalysisPanel
          question={q}
          focusOption={wrongExpFocusOption}
          onFocusOptionChange={(option) => onWrongExpFocusChange(q.id, option)}
          wrongExps={wrongExpsForQuestion}
          busyKey={busyId}
          onOpenAnalysisDock={(option, mode) =>
            onOpenAnalysisDock(q.id, option, mode)
          }
        />
      ) : null}

      <QuizQuestionMemoPanel
        questionId={q.id}
        value={questionMemo}
        onSave={(next) => onMemoSave(q.id, next)}
      />
    </>
  );

  if (isFresh) {
    return (
      <Motion.div
        id={`q-card-${q.id}`}
        {...{ [QUIZ_QUESTION_TRACK_ATTR]: q.id }}
        initial={{ opacity: 0, y: 36, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 340, damping: 26 }}
        onAnimationComplete={onClearFresh}
        className={cardClassName}
      >
        {cardBody}
      </Motion.div>
    );
  }

  return (
    <div
      id={`q-card-${q.id}`}
      {...{ [QUIZ_QUESTION_TRACK_ATTR]: q.id }}
      className={cardClassName}
    >
      {cardBody}
    </div>
  );
}

const QuizQuestionCard = memo(QuizQuestionCardInner);
export default QuizQuestionCard;

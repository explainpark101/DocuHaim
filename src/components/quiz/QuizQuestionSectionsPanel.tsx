import Button from '@/components/Button';
import QuizMarkdownCopyButton from '@/components/quiz/QuizMarkdownCopyButton';
import QuizMdPreview from '@/components/quiz/QuizMdPreview';
import {
  isWeakSimilarQuestionExplanation,
  isWeakSimilarQuestionPoint,
} from '@/utils/quiz/similarQuestionAnalysis';
import type { QuizQuestion } from '@/utils/quiz/quizTypes';
import { Sparkles } from 'lucide-react';

export type QuizQuestionSectionsTarget = 'point' | 'explanation' | 'both';

type QuizQuestionSectionsPanelProps = {
  question: QuizQuestion;
  busyKey: string | null;
  /** When false, only the generate affordance is shown if sections are missing. */
  showContent?: boolean;
  onGenerate: (target: QuizQuestionSectionsTarget) => void;
};

export default function QuizQuestionSectionsPanel({
  question,
  busyKey,
  showContent = true,
  onGenerate,
}: QuizQuestionSectionsPanelProps) {
  const missingPoint = isWeakSimilarQuestionPoint(question.point || '');
  const missingExplanation = isWeakSimilarQuestionExplanation(question.explanation || '');
  const hasMissing = missingPoint || missingExplanation;

  if (!showContent && !hasMissing) return null;

  const sectionBusyKey = `sections-${question.id}`;
  const isBusy = busyKey === sectionBusyKey;

  const generateButtons = hasMissing ? (
    <div className="flex justify-end gap-2">
      {missingPoint && missingExplanation ? (
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={isBusy}
          onClick={() => onGenerate('both')}
        >
          <Sparkles size={14} />
          {isBusy ? '생성 중…' : '접근 Point·해설 생성'}
        </Button>
      ) : null}
      {missingPoint && !missingExplanation ? (
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={isBusy}
          onClick={() => onGenerate('point')}
        >
          <Sparkles size={14} />
          {isBusy ? '생성 중…' : '접근 Point 생성'}
        </Button>
      ) : null}
      {missingExplanation && !missingPoint ? (
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={isBusy}
          onClick={() => onGenerate('explanation')}
        >
          <Sparkles size={14} />
          {isBusy ? '생성 중…' : '해설 생성'}
        </Button>
      ) : null}
    </div>
  ) : null;

  if (!showContent) {
    return (
      <div className="mt-3 flex flex-col rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-950 dark:border-amber-800/70 dark:bg-amber-950/45 dark:text-amber-100">
        <div className="mb-2 font-bold text-amber-800 dark:text-amber-200">
          접근 Point · 해설
        </div>
        <p className="mb-3 text-[11px] text-amber-700/90 dark:text-amber-200/80">
          {missingPoint && missingExplanation
            ? '접근 Point와 해설이 아직 생성되지 않았습니다.'
            : missingPoint
              ? '접근 Point가 아직 생성되지 않았습니다.'
              : '해설이 아직 생성되지 않았습니다.'}
        </p>
        {generateButtons}
      </div>
    );
  }

  return (
    <div className="mt-2 flex flex-col space-y-2 rounded-xl bg-slate-50 p-3 text-xs dark:bg-odp-bgSoft">
      <div className="font-bold text-slate-800 dark:text-odp-fgStrong">접근 Point · 해설</div>
      <div>
        <div className="mb-1 flex items-center justify-between gap-2">
          <div className="font-bold text-amber-800">접근 Point!</div>
          {!missingPoint ? (
            <QuizMarkdownCopyButton text={question.point} label="접근 Point" />
          ) : null}
        </div>
        {missingPoint ? (
          <p className="text-[11px] italic text-slate-500 dark:text-odp-muted">
            아직 생성되지 않았습니다.
          </p>
        ) : (
          <QuizMdPreview text={question.point} previewId={`qp-${question.id}`} />
        )}
      </div>
      <div>
        <div className="mb-1 flex items-center justify-between gap-2">
          <div className="font-bold text-slate-800 dark:text-odp-fgStrong">해설</div>
          {!missingExplanation ? (
            <QuizMarkdownCopyButton text={question.explanation} label="해설" />
          ) : null}
        </div>
        {missingExplanation ? (
          <p className="text-[11px] italic text-slate-500 dark:text-odp-muted">
            아직 생성되지 않았습니다.
          </p>
        ) : (
          <QuizMdPreview text={question.explanation} previewId={`qe-${question.id}`} />
        )}
      </div>
      {question.kind === 'subjective' && question.modelAnswer ? (
        <div>
          <div className="mb-1 flex items-center justify-between gap-2">
            <div className="font-bold">모범 답안</div>
            <QuizMarkdownCopyButton text={question.modelAnswer} label="모범 답안" />
          </div>
          <QuizMdPreview text={question.modelAnswer} previewId={`qm-${question.id}`} />
        </div>
      ) : null}
      {generateButtons}
    </div>
  );
}

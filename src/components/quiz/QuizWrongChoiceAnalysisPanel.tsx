import Button from '@/components/Button';
import QuizMarkdownCopyButton from '@/components/quiz/QuizMarkdownCopyButton';
import QuizMdPreview from '@/components/quiz/QuizMdPreview';
import type { QuizChoiceAnalysisDockMode } from '@/components/quiz/QuizChoiceAnalysisDock';
import { wrongChoiceExplanationKey } from '@/utils/quiz/quizWrongChoiceExplanations';
import type { QuizQuestion } from '@/utils/quiz/quizTypes';
import { MessageCircle, RefreshCw, Sparkles, Wand2 } from 'lucide-react';
import { RadioGroup } from 'radix-ui';

type QuizWrongChoiceAnalysisPanelProps = {
  question: QuizQuestion;
  focusOption: number;
  onFocusOptionChange: (option: number) => void;
  wrongExps: Record<string, string>;
  busyKey: string | null;
  onOpenAnalysisDock: (option: number, mode: QuizChoiceAnalysisDockMode) => void;
};

const RADIO_ITEM_ROSE =
  'relative flex h-8 min-w-8 items-center justify-center rounded-lg border text-xs font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-rose-400 data-[state=checked]:border-rose-500 data-[state=checked]:bg-rose-500 data-[state=checked]:text-white border-rose-200 bg-white text-rose-800 hover:bg-rose-50 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-100 dark:hover:bg-rose-950/50 dark:data-[state=checked]:border-rose-500 dark:data-[state=checked]:bg-rose-600';

const RADIO_ITEM_EMERALD =
  'relative flex h-8 min-w-8 items-center justify-center rounded-lg border text-xs font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500 data-[state=checked]:text-white border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-100 dark:hover:bg-emerald-950/50 dark:data-[state=checked]:border-emerald-500 dark:data-[state=checked]:bg-emerald-600';

export default function QuizWrongChoiceAnalysisPanel({
  question,
  focusOption,
  onFocusOptionChange,
  wrongExps,
  busyKey,
  onOpenAnalysisDock,
}: QuizWrongChoiceAnalysisPanelProps) {
  const optionCount = question.options?.length || 0;
  if (optionCount <= 0) return null;

  const focusKey = wrongChoiceExplanationKey(question.id, focusOption);
  const focusText = wrongExps[focusKey];
  const hasFocusExp = focusText !== undefined;
  const isBusy = busyKey === focusKey;
  const isCorrectOption = focusOption === question.answer;
  const panelTitle = isCorrectOption ? '정답 분석' : '오답 분석';
  const panelClass = isCorrectOption
    ? 'mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-950 dark:border-emerald-800/70 dark:bg-emerald-950/45 dark:text-emerald-100'
    : 'mt-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-950 dark:border-rose-800/70 dark:bg-rose-950/45 dark:text-rose-100';
  const titleClass = isCorrectOption
    ? 'font-bold text-emerald-800 dark:text-emerald-200'
    : 'font-bold text-rose-800 dark:text-rose-200';
  const subtitleClass = isCorrectOption
    ? 'text-[11px] font-semibold text-emerald-700 dark:text-emerald-200'
    : 'text-[11px] font-semibold text-rose-700 dark:text-rose-200';
  const hintClass = isCorrectOption
    ? 'text-[11px] text-emerald-700/90 dark:text-emerald-200/80'
    : 'text-[11px] text-rose-700/90 dark:text-rose-200/80';
  const busyClass = isCorrectOption
    ? 'text-[10px] font-medium text-emerald-500 dark:text-emerald-300'
    : 'text-[10px] font-medium text-rose-500 dark:text-rose-300';
  const busyDotClass = isCorrectOption ? 'bg-emerald-500 dark:bg-emerald-300' : 'bg-rose-500 dark:bg-rose-300';
  const savedDotRing = isCorrectOption
    ? 'ring-emerald-50 dark:ring-emerald-950'
    : 'ring-rose-50 dark:ring-rose-950';

  return (
    <div className={panelClass}>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <div className={titleClass}>{panelTitle}</div>
          {hasFocusExp && String(focusText || '').trim() ? (
            <QuizMarkdownCopyButton
              text={focusText}
              label={isCorrectOption ? '정답 분석' : '오답 분석'}
              disabled={isBusy}
            />
          ) : null}
        </div>
        <RadioGroup.Root
          className="flex flex-wrap items-center gap-1"
          value={String(focusOption)}
          onValueChange={(value) => {
            const n = Number.parseInt(value, 10);
            if (Number.isFinite(n) && n >= 1) onFocusOptionChange(n);
          }}
          aria-label={`${question.displayLabel}번 보기 선택`}
        >
          {Array.from({ length: optionCount }, (_, i) => {
            const n = i + 1;
            const key = wrongChoiceExplanationKey(question.id, n);
            const saved = wrongExps[key] !== undefined && String(wrongExps[key] || '').trim();
            const isAnswer = n === question.answer;
            const radioClass = isAnswer ? RADIO_ITEM_EMERALD : RADIO_ITEM_ROSE;
            return (
              <RadioGroup.Item
                key={n}
                value={String(n)}
                className={`${radioClass} ${saved ? 'pr-2 pl-2' : ''}`}
                aria-label={`${n}번${isAnswer ? ' (정답)' : ''}${saved ? ', 분석 저장됨' : ''}`}
              >
                <span>{n}</span>
                {saved ? (
                  <span
                    className={`absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ${savedDotRing}`}
                    aria-hidden
                  />
                ) : null}
              </RadioGroup.Item>
            );
          })}
        </RadioGroup.Root>
      </div>

      {hasFocusExp ? (
        <div>
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <span className={subtitleClass}>
              {focusOption}번
              {isCorrectOption ? ' · 정답 보기' : ' · 오답 보기'}
            </span>
            {isBusy ? (
              <span className={`inline-flex items-center gap-1 ${busyClass}`}>
                <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${busyDotClass}`} />
                생성 중
              </span>
            ) : null}
          </div>
          <div className="[&_.md-editor-preview]:text-inherit [&_.md-editor-preview]:!bg-transparent [&_.md-editor]:!bg-transparent">
            {focusText ? (
              <QuizMdPreview text={focusText} previewId={`wx-${question.id}-${focusOption}`} />
            ) : (
              <p className={`${hintClass} opacity-80`}>분석을 생성하는 중…</p>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              disabled={isBusy}
              onClick={() => onOpenAnalysisDock(focusOption, 'followup')}
            >
              <MessageCircle size={14} />
              추가질문
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              disabled={isBusy}
              onClick={() => onOpenAnalysisDock(focusOption, 'regenerate')}
            >
              <RefreshCw size={14} />
              재생성
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className={hintClass}>{focusOption}번 보기 분석을 생성합니다.</p>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={isBusy}
            onClick={() => onOpenAnalysisDock(focusOption, 'create')}
          >
            {isBusy ? <Sparkles size={14} className="animate-pulse" /> : <Wand2 size={14} />}
            분석 생성
          </Button>
        </div>
      )}
    </div>
  );
}

import { useCallback, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import {
  Check,
  ChevronDown,
  ChevronUp,
  GitBranch,
  GripHorizontal,
  Loader2,
  Minus,
  Sparkles,
  Wand2,
  X,
} from 'lucide-react';
import Button from '@/components/Button';
import { IconCheck } from '@/components/icons';
import type { QuizGenPanelSize } from '@/hooks/useQuizGenerationQueue';
import { QUIZ_FLOATING_PANEL_TRANSITION } from '@/utils/quiz/quizDockMotion';
import type {
  QuizGenJob,
  QuizGenStep,
  QuizGenStepStatus,
} from '@/utils/quiz/quizGenerationQueueTypes';

type QuizGenerationQueuePanelProps = {
  jobs: QuizGenJob[];
  isOpen: boolean;
  size: QuizGenPanelSize;
  onClose: () => void;
  onResize: (size: QuizGenPanelSize) => void;
  onRemoveJob: (jobId: string) => void;
  onClearFinished: () => void;
  onUserEngage?: () => void;
  onPointerEngageChange?: (engaged: boolean) => void;
  onFocusEngageChange?: (engaged: boolean) => void;
};

function stepStatusIcon(status: QuizGenStepStatus) {
  switch (status) {
    case 'running':
      return <Loader2 size={13} className="animate-spin text-violet-600 dark:text-violet-300" />;
    case 'done':
      return <Check size={13} className="text-emerald-600 dark:text-emerald-400" />;
    case 'error':
      return <X size={13} className="text-rose-600 dark:text-rose-400" />;
    case 'skipped':
      return <Minus size={13} className="text-slate-400 dark:text-odp-muted" />;
    default:
      return (
        <span
          className="inline-block h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600"
          aria-hidden
        />
      );
  }
}

function LogBlock({ title, body }: { title: string; body: string }) {
  if (!body.trim()) return null;
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-odp-muted">
        {title}
      </p>
      <pre
        className="max-h-40 overflow-auto rounded border border-slate-200 bg-slate-50 p-2 font-mono text-[10px] leading-snug text-slate-800 dark:border-odp-borderSoft dark:bg-odp-bg dark:text-odp-fg"
      >
        {body}
      </pre>
    </div>
  );
}

function StepDetailPanel({ step }: { step: QuizGenStep }) {
  const hasDetail =
    Boolean(step.systemPrompt?.trim()) ||
    Boolean(step.llmInstruction?.trim()) ||
    Boolean(step.llmResponse?.trim()) ||
    Boolean(step.error?.trim());

  if (!hasDetail) {
    return (
      <p className="text-[10px] text-slate-400 dark:text-odp-muted">
        저장된 프롬프트/응답 없음
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <LogBlock title="System prompt" body={step.systemPrompt || ''} />
      <LogBlock title="Instruction / input" body={step.llmInstruction || ''} />
      <LogBlock title="Model response / artifact" body={step.llmResponse || ''} />
      {step.error ? <LogBlock title="Error" body={step.error} /> : null}
    </div>
  );
}

function StepRow({ step, showDetail }: { step: QuizGenStep; showDetail: boolean }) {
  const detail = step.error || step.detail;
  return (
    <li className="space-y-1.5 py-0.5">
      <div className="flex items-start gap-2">
        <span className="mt-0.5 shrink-0">{stepStatusIcon(step.status)}</span>
        <div className="min-w-0 flex-1">
          <p
            className={`text-[11px] font-medium leading-snug ${
              step.status === 'error'
                ? 'text-rose-700 dark:text-rose-300'
                : step.status === 'skipped'
                  ? 'text-slate-400 dark:text-odp-muted'
                  : 'text-slate-700 dark:text-odp-fg'
            }`}
          >
            {step.label}
            {step.status === 'running' ? (
              <span className="ml-1 font-normal text-violet-600 dark:text-violet-300">
                진행 중
              </span>
            ) : null}
          </p>
          {detail ? (
            <p
              className={`mt-0.5 truncate text-[10px] leading-snug ${
                step.status === 'error'
                  ? 'text-rose-600 dark:text-rose-400'
                  : 'text-slate-500 dark:text-odp-muted'
              }`}
              title={detail}
            >
              {detail}
            </p>
          ) : null}
        </div>
      </div>
      {showDetail ? (
        <div className="ml-5 rounded-md border border-slate-100 bg-slate-50/80 p-2 dark:border-odp-borderSoft dark:bg-odp-bg/60">
          <StepDetailPanel step={step} />
        </div>
      ) : null}
    </li>
  );
}

function JobCard({
  job,
  detailOpen,
  onToggleDetail,
  onRemove,
}: {
  job: QuizGenJob;
  detailOpen: boolean;
  onToggleDetail: () => void;
  onRemove: () => void;
}) {
  const kindLabel =
    job.kind === 'similar'
      ? '유사문제'
      : job.kind === 'derived'
        ? '파생문제'
        : '근거 출제';
  const kindIcon =
    job.kind === 'similar' ? (
      <Wand2 size={14} className="shrink-0 text-violet-600 dark:text-violet-300" />
    ) : job.kind === 'derived' ? (
      <GitBranch size={14} className="shrink-0 text-violet-600 dark:text-violet-300" />
    ) : (
      <Sparkles size={14} className="shrink-0 text-violet-600 dark:text-violet-300" />
    );

  return (
    <article
      className={`rounded-lg border px-2.5 py-2 ${
        job.status === 'error'
          ? 'border-rose-200 bg-rose-50/80 dark:border-rose-900/50 dark:bg-rose-950/30'
          : job.status === 'done'
            ? 'border-emerald-200/80 bg-emerald-50/50 dark:border-emerald-900/40 dark:bg-emerald-950/20'
            : 'border-slate-200 bg-white/90 dark:border-odp-borderSoft dark:bg-odp-bgSoft/90'
      }`}
    >
      <div className="mb-1.5 flex items-start gap-2">
        {kindIcon}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-slate-900 dark:text-odp-fgStrong">
            {kindLabel}
            {job.questionLabel ? (
              <span className="font-semibold text-violet-700 dark:text-violet-300">
                {' '}
                · {job.questionLabel}
              </span>
            ) : null}
            {job.status === 'running' ? (
              <span className="ml-1 text-[10px] font-medium text-violet-600 dark:text-violet-300">
                진행 중
              </span>
            ) : null}
            {job.status === 'done' && job.resultLabel ? (
              <span className="ml-1 text-[10px] font-medium text-emerald-700 dark:text-emerald-300">
                → {job.resultLabel}
              </span>
            ) : null}
          </p>
          <p
            className="truncate text-[11px] text-slate-600 dark:text-odp-muted"
            title={job.questionPreview}
          >
            {job.questionPreview}
          </p>
          {job.status === 'error' && job.error ? (
            <p className="mt-1 text-[10px] leading-snug text-rose-700 dark:text-rose-300">
              {job.error}
            </p>
          ) : null}
          {job.logPath ? (
            <p
              className="mt-1 truncate font-mono text-[10px] text-slate-500 dark:text-odp-muted"
              title={job.logPath}
            >
              log: {job.logPath}
            </p>
          ) : null}
        </div>
        <div className="flex shrink-0 flex-col gap-0.5">
          <button
            type="button"
            onClick={onToggleDetail}
            className="rounded p-1 text-slate-500 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg"
            aria-expanded={detailOpen}
            aria-label={detailOpen ? '자세히 보기 접기' : '자세히 보기'}
          >
            {detailOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          {job.status !== 'running' ? (
            <button
              type="button"
              onClick={onRemove}
              className="rounded p-1 text-slate-500 hover:bg-slate-100 dark:text-odp-muted dark:hover:bg-odp-focusBg"
              aria-label="목록에서 제거"
            >
              <X size={14} />
            </button>
          ) : null}
        </div>
      </div>

      <div className="mb-1.5 flex justify-end">
        <Button type="button" variant="tertiary" size="sm" onClick={onToggleDetail}>
          {detailOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {detailOpen ? '접기' : '자세히 보기'}
        </Button>
      </div>

      <ul className="space-y-0.5 border-t border-slate-100 pt-1.5 dark:border-odp-borderSoft">
        {job.steps.map((step) => (
          <StepRow key={step.id} step={step} showDetail={detailOpen} />
        ))}
      </ul>
    </article>
  );
}

export default function QuizGenerationQueuePanel({
  jobs,
  isOpen,
  size,
  onClose,
  onResize,
  onRemoveJob,
  onClearFinished,
  onUserEngage,
  onPointerEngageChange,
  onFocusEngageChange,
}: QuizGenerationQueuePanelProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [detailOpenIds, setDetailOpenIds] = useState<Record<string, true>>({});
  const resizeRef = useRef<{
    mode: 'width' | 'height' | 'both' | null;
    startX: number;
    startY: number;
    startW: number;
    startH: number;
  }>({ mode: null, startX: 0, startY: 0, startW: 0, startH: 0 });

  const toggleDetail = (jobId: string) => {
    setDetailOpenIds((prev) => {
      const next = { ...prev };
      if (next[jobId]) delete next[jobId];
      else next[jobId] = true;
      return next;
    });
  };

  const startResize = useCallback(
    (mode: 'width' | 'height' | 'both', event: ReactPointerEvent) => {
      event.preventDefault();
      event.stopPropagation();
      resizeRef.current = {
        mode,
        startX: event.clientX,
        startY: event.clientY,
        startW: size.width,
        startH: size.height,
      };

      const onMove = (ev: PointerEvent) => {
        const r = resizeRef.current;
        if (!r.mode) return;
        const dx = r.startX - ev.clientX;
        const dy = r.startY - ev.clientY;
        let width = r.startW;
        let height = r.startH;
        if (r.mode === 'width' || r.mode === 'both') {
          width = r.startW + dx;
        }
        if (r.mode === 'height' || r.mode === 'both') {
          height = r.startH + dy;
        }
        onResize({ width, height });
      };

      const onUp = () => {
        resizeRef.current.mode = null;
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerup', onUp);
      };

      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp);
    },
    [onResize, size.height, size.width],
  );

  const runningCount = jobs.filter((j) => j.status === 'running').length;
  const doneCount = jobs.filter((j) => j.status === 'done').length;
  const errorCount = jobs.filter((j) => j.status === 'error').length;
  const hasFinished = jobs.some((j) => j.status !== 'running');

  return (
    <AnimatePresence>
      {isOpen ? (
        <Motion.div
          ref={panelRef}
          key="quiz-gen-queue-panel"
          role="dialog"
          aria-modal="false"
          aria-label="문제 생성 대기열"
          className="fixed bottom-4 right-4 z-10050 flex flex-col overflow-hidden rounded-xl border border-violet-300/60 bg-white/95 shadow-2xl backdrop-blur-md dark:border-violet-800/50 dark:bg-odp-bgSoft/95"
          style={{ width: size.width, height: size.height }}
          initial={{ y: 48, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 48, opacity: 0, scale: 0.98 }}
          transition={QUIZ_FLOATING_PANEL_TRANSITION}
          onMouseEnter={() => onPointerEngageChange?.(true)}
          onMouseLeave={() => onPointerEngageChange?.(false)}
          onFocusCapture={() => onFocusEngageChange?.(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              onFocusEngageChange?.(false);
            }
          }}
          onPointerDown={() => onUserEngage?.()}
        >
          <div
            className="absolute left-0 top-0 z-20 h-3 w-3 cursor-nwse-resize touch-none"
            aria-hidden
            onPointerDown={(e) => startResize('both', e)}
          />
          <div
            className="absolute left-0 right-0 top-0 z-10 h-2 cursor-ns-resize touch-none"
            aria-hidden
            onPointerDown={(e) => startResize('height', e)}
          />
          <div
            className="absolute bottom-0 left-0 top-0 z-10 w-2 cursor-ew-resize touch-none"
            aria-hidden
            onPointerDown={(e) => startResize('width', e)}
          />

          <div className="flex shrink-0 items-center justify-between gap-2 border-b border-violet-200/70 bg-violet-50/90 px-3 py-2 dark:border-violet-900/40 dark:bg-violet-950/40">
            <div className="flex min-w-0 items-center gap-2 text-sm font-semibold text-violet-950 dark:text-violet-100">
              <GripHorizontal size={16} className="shrink-0 opacity-50" aria-hidden />
              <Sparkles size={16} className="shrink-0" aria-hidden />
              <span className="truncate">문제 생성 대기열</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded p-1 text-violet-900 hover:bg-violet-100 dark:text-violet-100 dark:hover:bg-violet-900/50"
              aria-label="패널 닫기"
            >
              <X size={15} />
            </button>
          </div>

          <div className="shrink-0 border-b border-slate-200/80 px-3 py-1.5 text-[11px] text-slate-600 dark:border-odp-borderSoft dark:text-odp-muted">
            {jobs.length === 0
              ? '진행 중인 생성 작업이 없습니다'
              : `진행 ${runningCount} · 완료 ${doneCount}${errorCount > 0 ? ` · 실패 ${errorCount}` : ''}`}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-3">
            {jobs.length === 0 ? (
              <p className="py-6 text-center text-xs text-slate-500 dark:text-odp-muted">
                유사문제 또는 근거 출제·파생문제 생성을 실행하면
                <br />
                단계별 진행 상황이 여기에 표시됩니다.
              </p>
            ) : (
              <ul className="space-y-2">
                {jobs.map((job) => (
                  <li key={job.id}>
                    <JobCard
                      job={job}
                      detailOpen={Boolean(detailOpenIds[job.id])}
                      onToggleDetail={() => toggleDetail(job.id)}
                      onRemove={() => onRemoveJob(job.id)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex shrink-0 justify-end gap-2 border-t border-slate-200/80 px-3 py-2 dark:border-odp-borderSoft">
            {hasFinished ? (
              <Button type="button" variant="tertiary" size="sm" onClick={onClearFinished}>
                <X size={14} />
                완료 항목 비우기
              </Button>
            ) : null}
            <Button type="button" variant="secondary" size="sm" onClick={onClose}>
              <IconCheck size={14} />
              닫기
            </Button>
          </div>
        </Motion.div>
      ) : null}
    </AnimatePresence>
  );
}

import { useMemo } from 'react';
import {
  formatQuizElapsedMs,
  formatQuizTimeLogAt,
  QUIZ_TIME_LOG_EVENT_LABEL,
  type QuizQuestionTimeEntry,
  type QuizTimeLog,
  type QuizTimeLogEvent,
} from '@/utils/quiz/quizTimeLog';

type QuizTimeLogPanelProps = {
  log: QuizTimeLog | null | undefined;
};

type TimelineItem =
  | { kind: 'event'; at: string; data: QuizTimeLogEvent }
  | { kind: 'question'; at: string; data: QuizQuestionTimeEntry };

export default function QuizTimeLogPanel({ log }: QuizTimeLogPanelProps) {
  const events = log?.events ?? [];
  const questionEntries = log?.questionEntries ?? [];

  const timeline = useMemo(() => {
    const items: TimelineItem[] = [
      ...events.map((ev) => ({ kind: 'event' as const, at: ev.at, data: ev })),
      ...questionEntries.map((entry) => ({
        kind: 'question' as const,
        at: entry.at,
        data: entry,
      })),
    ];
    items.sort((a, b) => a.at.localeCompare(b.at));
    return items;
  }, [events, questionEntries]);

  if (!timeline.length) return null;

  return (
    <div className="space-y-2 border-t border-slate-100 pt-3 dark:border-odp-borderSoft">
      <h4 className="text-xs font-semibold text-slate-700 dark:text-odp-fgStrong">
        풀이 시간 기록
      </h4>
      <ol className="max-h-40 space-y-1 overflow-y-auto text-[11px] text-slate-600 dark:text-odp-muted">
        {timeline.map((item, i) => {
          if (item.kind === 'event') {
            const ev = item.data;
            return (
              <li key={`ev-${ev.at}-${ev.type}-${i}`} className="font-mono leading-relaxed">
                <span className="text-slate-500 dark:text-odp-muted">
                  {formatQuizTimeLogAt(ev.at)}
                </span>
                {' · '}
                <span className="font-semibold text-slate-700 dark:text-odp-fgStrong">
                  {QUIZ_TIME_LOG_EVENT_LABEL[ev.type]}
                </span>
                {' · '}
                <span className="tabular-nums text-blue-600 dark:text-blue-400">
                  {formatQuizElapsedMs(ev.elapsedMs)}
                </span>
              </li>
            );
          }

          const entry = item.data;
          return (
            <li
              key={`q-${entry.questionId}-${entry.at}-${i}`}
              className="font-mono leading-relaxed"
            >
              <span className="text-slate-500 dark:text-odp-muted">
                {formatQuizTimeLogAt(entry.at)}
              </span>
              {' · '}
              <span className="font-semibold text-violet-700 dark:text-violet-300">
                문제 {entry.displayLabel}
              </span>
              {' · '}
              <span className="tabular-nums text-blue-600 dark:text-blue-400">
                {formatQuizElapsedMs(entry.durationMs)}
              </span>
              <span className="text-slate-400 dark:text-odp-muted">
                {' '}
                (~{formatQuizTimeLogAt(entry.endedAt)})
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

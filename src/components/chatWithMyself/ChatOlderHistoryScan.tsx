import { History, Loader2 } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useChatTimeline } from '@/components/chatWithMyself/ChatTimelineContext';

/**
 * Floating status while a group view keeps walking older day files.
 * Subscribes only to the scan slice so message rows stay still.
 */
export default function ChatOlderHistoryScan() {
  const scan = useChatTimeline((state) => state.olderScan);
  const reduceMotion = useReducedMotion();
  const total = Math.max(scan?.total ?? 1, 1);
  const pct = scan
    ? Math.min(100, Math.round(((scan.index + 1) / total) * 100))
    : 0;

  return (
    <AnimatePresence>
      {scan ? (
        <motion.div
          key="older-history-scan"
          initial={reduceMotion ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute inset-x-0 top-12 z-40 flex justify-center px-3"
          role="status"
          aria-live="polite"
          aria-label={`${scan.groupLabel} 이전 기록을 찾는 중. ${scan.label}`}
        >
          <div className="w-[min(100%,17.5rem)] overflow-hidden rounded-2xl border border-white/80 bg-white/92 px-3 py-2 shadow-[0_8px_24px_rgba(15,23,42,0.12)] backdrop-blur-md dark:border-white/10 dark:bg-[#152033]/92 dark:shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-100">
              <Loader2 size={14} className="shrink-0 animate-spin text-sky-600 dark:text-sky-300" aria-hidden />
              <History size={14} className="shrink-0 text-sky-700/80 dark:text-sky-200/80" aria-hidden />
              <span className="min-w-0 truncate">이전 기록을 찾고 있어요</span>
            </div>
            <p className="mt-1 truncate text-[11px] text-slate-500 dark:text-slate-300">
              <span className="font-medium text-slate-600 dark:text-slate-200">{scan.groupLabel}</span>
              <span aria-hidden> · </span>
              {scan.label}
            </p>
            <div
              className="mt-2 h-1 overflow-hidden rounded-full bg-slate-200/90 dark:bg-white/10"
              aria-hidden
            >
              <div
                className={`h-full rounded-full bg-sky-500/85 dark:bg-sky-400/80 ${
                  reduceMotion ? '' : 'transition-[width] duration-300 ease-out'
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function ChatTimelineEmptyHint({ hint }: { hint?: string | null | undefined }) {
  const seeking = useChatTimeline((state) => state.olderScan != null);
  const text = seeking
    ? '이전 날짜를 살펴보고 있어요'
    : hint || '아직 채팅이 없습니다';
  return (
    <div
      className="mx-auto w-full max-w-full px-3 py-16 text-center text-sm text-gray-400 md:max-w-[min(100%,50vw)]"
      role="status"
    >
      {text}
    </div>
  );
}

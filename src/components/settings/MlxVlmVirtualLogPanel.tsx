import { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { VList, type VListHandle } from 'virtua';
import SettingsCollapsibleContent from '@/components/settings/SettingsCollapsibleContent';
import type { MlxVlmLogLine } from '@/utils/llm/mlxVlmRawLogBuffer';

const LOG_LIST_HEIGHT_PX = 256;

type MlxVlmVirtualLogPanelProps = {
  title: string;
  subtitle?: string;
  lines: readonly MlxVlmLogLine[];
  emptyHint: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClear?: () => void;
  clearDisabled?: boolean;
  headerExtra?: ReactNode;
  beforeLog?: ReactNode;
  className?: string;
};

export default function MlxVlmVirtualLogPanel({
  title,
  subtitle,
  lines,
  emptyHint,
  open,
  onOpenChange,
  onClear,
  clearDisabled = false,
  headerExtra,
  beforeLog,
  className = '',
}: MlxVlmVirtualLogPanelProps) {
  const listRef = useRef<VListHandle | null>(null);
  const stickToBottomRef = useRef(true);

  const handleScroll = useCallback((offset: number) => {
    const handle = listRef.current;
    if (!handle) return;
    const scrollSize = handle.scrollSize;
    const viewportSize = handle.viewportSize;
    stickToBottomRef.current = scrollSize - offset - viewportSize < 24;
  }, []);

  useEffect(() => {
    if (!open || lines.length === 0 || !stickToBottomRef.current) return;
    listRef.current?.scrollToIndex(lines.length - 1, { align: 'end' });
  }, [lines, open]);

  return (
    <div
      className={[
        'overflow-hidden rounded border border-gray-200 bg-white dark:border-odp-borderStrong dark:bg-odp-bgSoft/40',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1 border-b border-gray-100 px-2.5 py-2 dark:border-odp-borderSoft">
        <button
          type="button"
          onClick={() => onOpenChange(!open)}
          aria-expanded={open}
          className="flex min-w-0 flex-1 items-start gap-1.5 text-left"
        >
          {open ? (
            <ChevronDown size={14} className="mt-0.5 shrink-0 text-gray-500 dark:text-odp-muted" />
          ) : (
            <ChevronRight size={14} className="mt-0.5 shrink-0 text-gray-500 dark:text-odp-muted" />
          )}
          <span className="min-w-0">
            <span className="block text-[11px] font-semibold text-gray-700 dark:text-odp-fg">
              {title}
            </span>
            {subtitle ? (
              <span className="mt-0.5 block truncate text-[10px] text-gray-500 dark:text-odp-muted">
                {subtitle}
              </span>
            ) : null}
          </span>
        </button>
        <div className="flex flex-wrap items-center gap-2">
          {headerExtra}
          {onClear ? (
            <button
              type="button"
              disabled={clearDisabled || lines.length === 0}
              onClick={() => {
                onClear();
                stickToBottomRef.current = true;
              }}
              className="rounded border border-gray-200 px-2 py-0.5 text-[10px] text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-odp-borderStrong dark:text-odp-muted dark:hover:bg-odp-bgSoft"
            >
              Clear
            </button>
          ) : null}
        </div>
      </div>

      <SettingsCollapsibleContent open={open} contentKey={title}>
        <div className="space-y-2 p-2.5">
          {beforeLog}
          {lines.length === 0 ? (
            <p className="font-mono text-[10px] text-gray-400 dark:text-odp-muted">{emptyHint}</p>
          ) : (
            <VList
              ref={listRef}
              className="overscroll-contain rounded border border-gray-200 bg-gray-950/95 px-2.5 py-1.5 font-mono text-[10px] leading-relaxed text-emerald-100 dark:border-odp-borderStrong"
              style={{ height: LOG_LIST_HEIGHT_PX }}
              data={lines}
              onScroll={handleScroll}
              aria-live="polite"
              aria-relevant="additions"
            >
              {(line) => (
                <div
                  key={line.id}
                  className={[
                    'whitespace-pre-wrap break-all',
                    line.text.startsWith('[error]') ? 'text-red-300' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {line.text}
                </div>
              )}
            </VList>
          )}
        </div>
      </SettingsCollapsibleContent>
    </div>
  );
}

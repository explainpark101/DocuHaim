import { CalendarDays, X } from 'lucide-react';
import { formatChatDayListLabel } from '@/utils/chatWithMyself';

/**
 * List of chat day files. Click jumps the main list to that day's first message.
 */
export default function ChatDatePanel({
  dayKeys = [],

  /** @type {Record<string, number>} */
  dayCounts = {},

  activeDate = null,
  timeZone,
  onSelectDate,
  onClose,
  className = ''
}: any) {
  return (
    <div
      className={`flex h-full min-h-0 w-full flex-col bg-white dark:bg-odp-bgSoft ${className}`}
    >
      <div className="flex min-w-0 items-center gap-2 border-b border-gray-200 px-3 py-2 dark:border-odp-borderSoft">
        <CalendarDays size={16} className="shrink-0 text-ink dark:text-odp-fgStrong" />
        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
          날짜
        </span>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-odp-focusBg"
            aria-label="날짜 목록 닫기"
          >
            <X size={16} />
          </button>
        ) : null}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto py-1">
        {dayKeys.length === 0 ? (
          <p className="px-3 py-4 text-xs text-gray-400">전송된 날짜가 없습니다.</p>
        ) : (
          dayKeys.map((dateStr: any) => {
            const active = activeDate === dateStr;
            const label = formatChatDayListLabel(dateStr, timeZone);
            const count = dayCounts[dateStr];
            const countLabel =
              typeof count === 'number' && Number.isFinite(count)
                ? String(count)
                : '·';
            return (
              <button
                key={dateStr}
                type="button"
                onClick={() => onSelectDate?.(dateStr)}
                className={`flex w-full items-center gap-2 px-3 py-2.5 text-left transition ${
                  active
                    ? 'bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
                    : 'text-gray-700 hover:bg-gray-50 dark:text-odp-fg dark:hover:bg-odp-focusBg'
                }`}
              >
                <span className="min-w-0 flex-1 truncate text-sm font-medium tracking-tight">
                  {label}
                </span>
                <span
                  className={`shrink-0 tabular-nums text-base font-semibold leading-none ${
                    active
                      ? 'text-blue-700 dark:text-blue-200'
                      : 'text-gray-800 dark:text-odp-fgStrong'
                  }`}
                  aria-label={`메시지 ${countLabel}개`}
                >
                  {countLabel}
                </span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

import { useMemo } from 'react';
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
} from 'react-aria-components';
import { parseDateTime } from '@internationalized/date';
import { CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-react';

const labelClass = 'text-[11px] text-gray-500 dark:text-odp-muted';

const groupClass =
  'flex w-full min-w-0 items-center rounded-md border border-gray-300 bg-transparent px-1 py-1 text-xs text-gray-800 outline-none focus-within:ring-2 focus-within:ring-blue-400 dark:border-odp-borderStrong dark:text-odp-fgStrong';

const inputClass =
  'flex min-w-0 flex-1 flex-wrap items-center gap-y-0.5 px-0.5 text-xs tabular-nums outline-none';

const segmentClass =
  'rounded px-0.5 outline-none data-[placeholder]:text-gray-400 data-[focused]:bg-blue-100 data-[focused]:text-blue-900 dark:data-[placeholder]:text-gray-500 dark:data-[focused]:bg-blue-900/50 dark:data-[focused]:text-blue-100';

const iconBtnClass =
  'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded text-gray-500 hover:bg-gray-100 dark:hover:bg-odp-focusBg';

const popoverClass =
  'z-[220] rounded-xl border border-gray-200 bg-white p-3 shadow-lg outline-none dark:border-odp-borderStrong dark:bg-odp-bgSoft';

const cellClass =
  'flex h-8 w-8 items-center justify-center rounded-full text-xs outline-none data-[disabled]:text-gray-300 data-[unavailable]:text-gray-300 data-[unavailable]:line-through data-[outside-month]:text-gray-300 data-[hovered]:bg-gray-100 data-[selected]:bg-blue-600 data-[selected]:text-white data-[focused]:ring-2 data-[focused]:ring-blue-400 dark:data-[disabled]:text-gray-600 dark:data-[unavailable]:text-gray-600 dark:data-[outside-month]:text-gray-600 dark:data-[hovered]:bg-odp-focusBg';

function pad2(n: any) {
  return String(n).padStart(2, '0');
}

function toDateTimeLocalString(value: any) {
  if (!value) return '';
  return `${value.year}-${pad2(value.month)}-${pad2(value.day)}T${pad2(value.hour)}:${pad2(value.minute)}`;
}

function parseDateTimeLocal(value: any) {
  if (!value) return null;
  const raw = String(value).trim();
  if (!raw) return null;
  try {
    // datetime-local: YYYY-MM-DDTHH:mm — parseDateTime accepts that form.
    return parseDateTime(raw.length === 16 ? `${raw}:00` : raw);
  } catch {
    return null;
  }
}

/**
 * Date+time picker (CalendarDateTime, minute granularity).
 * Value is a datetime-local string: YYYY-MM-DDTHH:mm
 * @param {(date: import('@internationalized/date').DateValue) => boolean} [isDateUnavailable]
 */
export default function ChatDateTimePicker({
  label,
  value = '',
  onChange,
  className = '',
  isDisabled = false,
  isDateUnavailable
}: any) {
  const dateValue = useMemo(() => parseDateTimeLocal(value), [value]);

  return (
    <DatePicker
      className={`flex flex-col gap-0.5 ${className}`}
      value={dateValue}
      onChange={(next: any) => onChange?.(toDateTimeLocalString(next))}
      isDisabled={isDisabled}
      isDateUnavailable={isDateUnavailable}
      granularity="minute"
      hourCycle={24}
    >
      {label ? <Label className={labelClass}>{label}</Label> : null}
      <Group className={groupClass}>
        <DateInput className={inputClass}>
          {(segment: any) => <DateSegment segment={segment} className={segmentClass} />}
        </DateInput>
        {dateValue ? (
          <button
            type="button"
            className={iconBtnClass}
            aria-label="날짜·시간 지우기"
            onClick={(e: any) => {
              e.preventDefault();
              e.stopPropagation();
              onChange?.('');
            }}
          >
            <X size={14} />
          </button>
        ) : null}
        <Button className={iconBtnClass} aria-label="달력 열기">
          <CalendarDays size={14} />
        </Button>
      </Group>
      <Popover className={popoverClass} placement="bottom start">
        <Dialog className="outline-none">
          <Calendar className="w-fit">
            <header className="mb-2 flex items-center gap-1">
              <Button slot="previous" className={iconBtnClass} aria-label="이전 달">
                <ChevronLeft size={16} />
              </Button>
              <Heading className="flex-1 text-center text-sm font-semibold text-gray-800 dark:text-odp-fgStrong" />
              <Button slot="next" className={iconBtnClass} aria-label="다음 달">
                <ChevronRight size={16} />
              </Button>
            </header>
            <CalendarGrid className="border-separate border-spacing-1">
              <CalendarGridHeader>
                {(day: any) => <CalendarHeaderCell className="text-[10px] font-medium text-gray-400">
                  {day}
                </CalendarHeaderCell>}
              </CalendarGridHeader>
              <CalendarGridBody>
                {(date: any) => <CalendarCell date={date} className={cellClass} />}
              </CalendarGridBody>
            </CalendarGrid>
          </Calendar>
        </Dialog>
      </Popover>
    </DatePicker>
  );
}

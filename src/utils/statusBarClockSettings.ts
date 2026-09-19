const ENABLED_STORAGE_KEY = 's3haim_status_bar_clock';
const SHOW_DATE_STORAGE_KEY = 's3haim_status_bar_clock_show_date';
const FORMAT_STORAGE_KEY = 's3haim_status_bar_clock_format';
const CUSTOM_PATTERN_STORAGE_KEY = 's3haim_status_bar_clock_custom_pattern';

export type StatusBarClockFormat = '24h' | '12h' | 'custom';

export type StatusBarClockDisplay = {
  format: StatusBarClockFormat;
  showDate: boolean;
  customPattern: string;
};

export const STATUS_BAR_CLOCK_DISPLAY_CHANGED_EVENT =
  's3haim-status-bar-clock-display-changed';

/** @deprecated Prefer STATUS_BAR_CLOCK_DISPLAY_CHANGED_EVENT */
export const STATUS_BAR_CLOCK_FORMAT_CHANGED_EVENT =
  STATUS_BAR_CLOCK_DISPLAY_CHANGED_EVENT;

export const DEFAULT_STATUS_BAR_CLOCK_CUSTOM_PATTERN = 'yyyy-MM-dd HH:mm:ss';

export const STATUS_BAR_CLOCK_FORMAT_OPTIONS = [
  {
    value: '24h' as const,
    label: '24시간제',
    description: 'HH:mm:ss (날짜 켜면 yyyy-MM-dd HH:mm:ss)',
  },
  {
    value: '12h' as const,
    label: '12시간제 (AM/PM)',
    description: 'hh:mm:ss AM/PM (날짜 켜면 앞에 yyyy-MM-dd)',
  },
  {
    value: 'custom' as const,
    label: '직접 입력',
    description: '패턴 토큰으로 표시 형식을 직접 지정',
  },
] as const;

export const STATUS_BAR_CLOCK_PATTERN_TOKEN_HELP =
  'yyyy MM dd HH(24) hh(12) mm ss A(AM/PM) a(am/pm)';

/** Token reference rows for settings helper UI. */
export const STATUS_BAR_CLOCK_PATTERN_TOKEN_ROWS = [
  { token: 'yyyy', meaning: '4-digit year', example: '2026' },
  { token: 'MM', meaning: 'Month (01-12)', example: '01' },
  { token: 'dd', meaning: 'Day of month (01-31)', example: '15' },
  { token: 'HH', meaning: 'Hour 24h (00-23)', example: '15' },
  { token: 'hh', meaning: 'Hour 12h (01-12)', example: '03' },
  { token: 'mm', meaning: 'Minute (00-59)', example: '04' },
  { token: 'ss', meaning: 'Second (00-59)', example: '05' },
  { token: 'A', meaning: 'AM/PM (uppercase)', example: 'PM' },
  { token: 'a', meaning: 'am/pm (lowercase)', example: 'pm' },
] as const;

export const STATUS_BAR_CLOCK_PATTERN_EXAMPLES = [
  { pattern: 'HH:mm:ss', result: '15:04:05' },
  { pattern: 'hh:mm:ss A', result: '03:04:05 PM' },
  { pattern: 'yyyy-MM-dd HH:mm:ss', result: '2026-01-15 15:04:05' },
  { pattern: 'MM/dd hh:mm a', result: '01/15 03:04 pm' },
] as const;

/** Default: on. Only disabled when explicitly set to '0'. */
export function loadStatusBarClockEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    return window.localStorage.getItem(ENABLED_STORAGE_KEY) !== '0';
  } catch {
    return true;
  }
}

export function saveStatusBarClockEnabled(value: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(ENABLED_STORAGE_KEY, value ? '1' : '0');
  } catch {
    // ignore
  }
}

/** Default: off. Only enabled when explicitly set to '1'. */
export function loadStatusBarClockShowDate(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(SHOW_DATE_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function saveStatusBarClockShowDate(value: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SHOW_DATE_STORAGE_KEY, value ? '1' : '0');
  } catch {
    // ignore
  }
}

export function setStatusBarClockShowDate(value: boolean): void {
  saveStatusBarClockShowDate(value);
  notifyStatusBarClockDisplayChanged();
}

export function isStatusBarClockFormat(value: unknown): value is StatusBarClockFormat {
  return value === '24h' || value === '12h' || value === 'custom';
}

/** Default: 24h. */
export function loadStatusBarClockFormat(): StatusBarClockFormat {
  if (typeof window === 'undefined') return '24h';
  try {
    const raw = window.localStorage.getItem(FORMAT_STORAGE_KEY);
    if (isStatusBarClockFormat(raw)) return raw;
  } catch {
    // ignore
  }
  return '24h';
}

export function saveStatusBarClockFormat(format: StatusBarClockFormat): void {
  if (typeof window === 'undefined') return;
  if (!isStatusBarClockFormat(format)) return;
  try {
    window.localStorage.setItem(FORMAT_STORAGE_KEY, format);
  } catch {
    // ignore
  }
}

export function setStatusBarClockFormat(format: StatusBarClockFormat): void {
  if (!isStatusBarClockFormat(format)) return;
  saveStatusBarClockFormat(format);
  notifyStatusBarClockDisplayChanged();
}

export function loadStatusBarClockCustomPattern(): string {
  if (typeof window === 'undefined') return DEFAULT_STATUS_BAR_CLOCK_CUSTOM_PATTERN;
  try {
    const raw = window.localStorage.getItem(CUSTOM_PATTERN_STORAGE_KEY);
    if (typeof raw === 'string') return raw;
  } catch {
    // ignore
  }
  return DEFAULT_STATUS_BAR_CLOCK_CUSTOM_PATTERN;
}

export function saveStatusBarClockCustomPattern(pattern: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CUSTOM_PATTERN_STORAGE_KEY, String(pattern ?? ''));
  } catch {
    // ignore
  }
}

export function setStatusBarClockCustomPattern(pattern: string): void {
  saveStatusBarClockCustomPattern(pattern);
  notifyStatusBarClockDisplayChanged();
}

export function loadStatusBarClockDisplay(): StatusBarClockDisplay {
  return {
    format: loadStatusBarClockFormat(),
    showDate: loadStatusBarClockShowDate(),
    customPattern: loadStatusBarClockCustomPattern(),
  };
}

export function notifyStatusBarClockDisplayChanged(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(STATUS_BAR_CLOCK_DISPLAY_CHANGED_EVENT, {
      detail: loadStatusBarClockDisplay(),
    }),
  );
}

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

/** Apply a small set of date-fns-like tokens to a Date. */
export function formatStatusBarClockPattern(date: Date, pattern: string): string {
  const h24 = date.getHours();
  const h12 = h24 % 12 || 12;
  const ampm = h24 < 12 ? 'AM' : 'PM';
  const tokens: Record<string, string> = {
    yyyy: String(date.getFullYear()),
    MM: pad2(date.getMonth() + 1),
    dd: pad2(date.getDate()),
    HH: pad2(h24),
    hh: pad2(h12),
    mm: pad2(date.getMinutes()),
    ss: pad2(date.getSeconds()),
    A: ampm,
    a: ampm.toLowerCase(),
  };
  return pattern.replace(/yyyy|MM|dd|HH|hh|mm|ss|A|a/g, (token) => tokens[token] ?? token);
}

export function resolveStatusBarClockPattern(
  display: StatusBarClockDisplay = loadStatusBarClockDisplay(),
): string {
  if (display.format === 'custom') {
    return display.customPattern.trim() || DEFAULT_STATUS_BAR_CLOCK_CUSTOM_PATTERN;
  }
  if (display.format === '12h') {
    return display.showDate ? 'yyyy-MM-dd hh:mm:ss A' : 'hh:mm:ss A';
  }
  return display.showDate ? 'yyyy-MM-dd HH:mm:ss' : 'HH:mm:ss';
}

/** Format a timestamp for the status-bar clock. */
export function formatStatusBarClock(
  ts: number = Date.now(),
  display: StatusBarClockDisplay = loadStatusBarClockDisplay(),
): string {
  return formatStatusBarClockPattern(new Date(ts), resolveStatusBarClockPattern(display));
}

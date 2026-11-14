/**
 * Retention for OS "open with default app" temp cache files (Tauri desktop).
 * Default: 3 months.
 */

export type OpenWithAppCacheRetentionUnit = 'hour' | 'day' | 'month' | 'year';

export type OpenWithAppCacheRetentionSettings = {
  value: number;
  unit: OpenWithAppCacheRetentionUnit;
};

const LOCAL_STORAGE_KEY = 's3haim_open_with_app_cache_retention';

export const DEFAULT_OPEN_WITH_APP_CACHE_RETENTION: OpenWithAppCacheRetentionSettings = {
  value: 3,
  unit: 'month',
};

export const OPEN_WITH_APP_CACHE_RETENTION_UNIT_OPTIONS: readonly {
  value: OpenWithAppCacheRetentionUnit;
  label: string;
}[] = [
  { value: 'hour', label: '시간' },
  { value: 'day', label: '일' },
  { value: 'month', label: '월' },
  { value: 'year', label: '년' },
] as const;

const MS_PER_HOUR = 60 * 60 * 1000;
const MS_PER_DAY = 24 * MS_PER_HOUR;
/** Calendar-ish month for TTL (30 days). */
const MS_PER_MONTH = 30 * MS_PER_DAY;
const MS_PER_YEAR = 365 * MS_PER_DAY;

export function isOpenWithAppCacheRetentionUnit(
  value: unknown,
): value is OpenWithAppCacheRetentionUnit {
  return value === 'hour' || value === 'day' || value === 'month' || value === 'year';
}

export function normalizeOpenWithAppCacheRetentionSettings(
  raw: unknown,
): OpenWithAppCacheRetentionSettings {
  const obj = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : null;
  const unit: OpenWithAppCacheRetentionUnit = isOpenWithAppCacheRetentionUnit(obj?.unit)
    ? obj.unit
    : DEFAULT_OPEN_WITH_APP_CACHE_RETENTION.unit;
  const parsed =
    typeof obj?.value === 'number'
      ? obj.value
      : typeof obj?.value === 'string'
        ? Number(obj.value)
        : Number.NaN;
  const value =
    Number.isFinite(parsed) && parsed > 0
      ? parsed
      : DEFAULT_OPEN_WITH_APP_CACHE_RETENTION.value;
  return { value, unit };
}

export function loadOpenWithAppCacheRetentionSettings(): OpenWithAppCacheRetentionSettings {
  if (typeof window === 'undefined') {
    return { ...DEFAULT_OPEN_WITH_APP_CACHE_RETENTION };
  }
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_OPEN_WITH_APP_CACHE_RETENTION };
    return normalizeOpenWithAppCacheRetentionSettings(JSON.parse(raw) as unknown);
  } catch {
    return { ...DEFAULT_OPEN_WITH_APP_CACHE_RETENTION };
  }
}

/** Fired on `window` when retention preference changes (same tab). */
export const OPEN_WITH_APP_CACHE_RETENTION_CHANGED_EVENT =
  's3haim-open-with-app-cache-retention';

export function saveOpenWithAppCacheRetentionSettings(
  settings: OpenWithAppCacheRetentionSettings,
): void {
  if (typeof window === 'undefined') return;
  try {
    const normalized = normalizeOpenWithAppCacheRetentionSettings(settings);
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(normalized));
    window.dispatchEvent(
      new CustomEvent(OPEN_WITH_APP_CACHE_RETENTION_CHANGED_EVENT, {
        detail: normalized,
      }),
    );
  } catch {
    // ignore
  }
}

export function openWithAppCacheRetentionToMs(
  settings: OpenWithAppCacheRetentionSettings,
): number {
  const { value, unit } = normalizeOpenWithAppCacheRetentionSettings(settings);
  const n = Math.max(0, value);
  switch (unit) {
    case 'hour':
      return Math.round(n * MS_PER_HOUR);
    case 'day':
      return Math.round(n * MS_PER_DAY);
    case 'month':
      return Math.round(n * MS_PER_MONTH);
    case 'year':
      return Math.round(n * MS_PER_YEAR);
    default:
      return Math.round(n * MS_PER_MONTH);
  }
}

/** Convert displayed value when switching unit (keep approximately the same duration). */
export function convertOpenWithAppCacheRetentionValue(
  value: number,
  fromUnit: OpenWithAppCacheRetentionUnit,
  toUnit: OpenWithAppCacheRetentionUnit,
): number {
  if (fromUnit === toUnit) return value;
  const ms = openWithAppCacheRetentionToMs({ value, unit: fromUnit });
  const divisor =
    toUnit === 'hour'
      ? MS_PER_HOUR
      : toUnit === 'day'
        ? MS_PER_DAY
        : toUnit === 'year'
          ? MS_PER_YEAR
          : MS_PER_MONTH;
  const next = ms / divisor;
  // Prefer whole numbers when close; otherwise 1 decimal.
  const rounded = Math.round(next * 10) / 10;
  return rounded > 0 ? rounded : DEFAULT_OPEN_WITH_APP_CACHE_RETENTION.value;
}

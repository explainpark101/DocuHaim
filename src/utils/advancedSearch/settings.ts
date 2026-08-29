/** Advanced Search inverted-index preferences (localStorage). */

const ENABLED_KEY = 's3haim_advanced_search_index_enabled';
const INCLUDE_OTHER_FILES_KEY = 's3haim_advanced_search_include_other_files';
const UI_ANIMATION_KEY = 's3haim_advanced_search_ui_animation';
const LIVE_SCAN_LIMITS_KEY = 's3haim_advanced_search_live_scan_limits';

/** Default ON. Explicit `'0'` disables. */
export function loadAdvancedSearchIndexEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const raw = window.localStorage.getItem(ENABLED_KEY);
    if (raw === '0') return false;
    return true;
  } catch {
    return true;
  }
}

export function saveAdvancedSearchIndexEnabled(value: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(ENABLED_KEY, value ? '1' : '0');
  } catch {
    // ignore
  }
}

/**
 * Include non-Markdown text files (txt, json, html, …) in the inverted index.
 * Default OFF — Markdown (+ chat days) only until the user opts in.
 */
export function loadAdvancedSearchIncludeOtherFiles(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(INCLUDE_OTHER_FILES_KEY) === '1';
  } catch {
    return false;
  }
}

export function saveAdvancedSearchIncludeOtherFiles(value: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(INCLUDE_OTHER_FILES_KEY, value ? '1' : '0');
  } catch {
    // ignore
  }
}

/** Spotlight open/close motion. Default ON. Explicit `'0'` disables. */
export function loadAdvancedSearchUiAnimationEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const raw = window.localStorage.getItem(UI_ANIMATION_KEY);
    if (raw === '0') return false;
    return true;
  } catch {
    return true;
  }
}

export function saveAdvancedSearchUiAnimationEnabled(value: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(UI_ANIMATION_KEY, value ? '1' : '0');
  } catch {
    // ignore
  }
}

/** Caps for web live vault body scan when Lucivy is unavailable. */
export type AdvancedSearchLiveScanLimits = {
  /** Max note/other files to read per query. `-1` = no limit. */
  maxFiles: number;
  /** Max chat day files to read per query (newest first). `-1` = no limit. */
  maxChatDays: number;
  /** Max content hits returned from the live scan. `-1` = no limit. */
  maxHits: number;
};

export const DEFAULT_LIVE_SCAN_LIMITS: AdvancedSearchLiveScanLimits = {
  maxFiles: 200,
  maxChatDays: 60,
  maxHits: 50,
};

/** Sentinel: no cap for that live-scan dimension. */
export const LIVE_SCAN_UNLIMITED = -1;

export const LIVE_SCAN_LIMIT_BOUNDS = {
  maxFiles: { min: 10, max: 2000 },
  maxChatDays: { min: 1, max: 365 },
  maxHits: { min: 5, max: 200 },
} as const;

export function isLiveScanUnlimited(value: number): boolean {
  return value === LIVE_SCAN_UNLIMITED;
}

function clampLiveScanLimit(
  value: unknown,
  fallback: number,
  min: number,
  max: number,
): number {
  const n = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(n)) return fallback;
  const rounded = Math.round(n);
  if (rounded === LIVE_SCAN_UNLIMITED) return LIVE_SCAN_UNLIMITED;
  return Math.min(max, Math.max(min, rounded));
}

export function normalizeLiveScanLimits(
  partial: Partial<AdvancedSearchLiveScanLimits> | null | undefined,
): AdvancedSearchLiveScanLimits {
  const d = DEFAULT_LIVE_SCAN_LIMITS;
  return {
    maxFiles: clampLiveScanLimit(
      partial?.maxFiles,
      d.maxFiles,
      LIVE_SCAN_LIMIT_BOUNDS.maxFiles.min,
      LIVE_SCAN_LIMIT_BOUNDS.maxFiles.max,
    ),
    maxChatDays: clampLiveScanLimit(
      partial?.maxChatDays,
      d.maxChatDays,
      LIVE_SCAN_LIMIT_BOUNDS.maxChatDays.min,
      LIVE_SCAN_LIMIT_BOUNDS.maxChatDays.max,
    ),
    maxHits: clampLiveScanLimit(
      partial?.maxHits,
      d.maxHits,
      LIVE_SCAN_LIMIT_BOUNDS.maxHits.min,
      LIVE_SCAN_LIMIT_BOUNDS.maxHits.max,
    ),
  };
}

export function loadAdvancedSearchLiveScanLimits(): AdvancedSearchLiveScanLimits {
  if (typeof window === 'undefined') return { ...DEFAULT_LIVE_SCAN_LIMITS };
  try {
    const raw = window.localStorage.getItem(LIVE_SCAN_LIMITS_KEY);
    if (!raw) return { ...DEFAULT_LIVE_SCAN_LIMITS };
    const parsed = JSON.parse(raw) as Partial<AdvancedSearchLiveScanLimits>;
    return normalizeLiveScanLimits(parsed);
  } catch {
    return { ...DEFAULT_LIVE_SCAN_LIMITS };
  }
}

export function saveAdvancedSearchLiveScanLimits(
  value: Partial<AdvancedSearchLiveScanLimits>,
): AdvancedSearchLiveScanLimits {
  const next = normalizeLiveScanLimits({
    ...loadAdvancedSearchLiveScanLimits(),
    ...value,
  });
  if (typeof window === 'undefined') return next;
  try {
    window.localStorage.setItem(LIVE_SCAN_LIMITS_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
  return next;
}

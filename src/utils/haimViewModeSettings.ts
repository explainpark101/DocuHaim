/**
 * Haim Editor view mode:
 * - wysiwyg: TipTap only
 * - double: TipTap + markdown source side-by-side
 * - source: markdown source only
 */

export const HAIM_VIEW_MODE_WYSIWYG = 'wysiwyg';
export const HAIM_VIEW_MODE_DOUBLE = 'double';
export const HAIM_VIEW_MODE_SOURCE = 'source';

/** @deprecated Use HAIM_VIEW_MODE_DOUBLE */
export const HAIM_VIEW_MODE_DUAL = HAIM_VIEW_MODE_DOUBLE;

export type HaimViewMode =
  | typeof HAIM_VIEW_MODE_WYSIWYG
  | typeof HAIM_VIEW_MODE_DOUBLE
  | typeof HAIM_VIEW_MODE_SOURCE;

const LOCAL_STORAGE_KEY = 's3haim_haim_view_mode';

export const HAIM_VIEW_MODE_DEFAULT: HaimViewMode = HAIM_VIEW_MODE_WYSIWYG;

/** Fired on `window` when the preference changes. */
export const HAIM_VIEW_MODE_CHANGED_EVENT = 's3haim-haim-view-mode';

export type HaimViewModeOption = {
  value: HaimViewMode;
  /** Short label for toolbar segment */
  label: string;
  /** Settings / tooltip copy */
  description: string;
};

export const HAIM_VIEW_MODE_OPTIONS: readonly HaimViewModeOption[] = [
  {
    value: HAIM_VIEW_MODE_WYSIWYG,
    label: 'WYSIWYG',
    description: '시각 편집만 사용합니다. 가장 가볍습니다.',
  },
  {
    value: HAIM_VIEW_MODE_DOUBLE,
    label: 'double',
    description:
      '마크다운 소스와 TipTap을 나란히 두고 양방향 동기화합니다. 큰 문서에서는 비용이 큽니다.',
  },
  {
    value: HAIM_VIEW_MODE_SOURCE,
    label: 'source',
    description: '마크다운 소스만 편집합니다.',
  },
] as const;

export function isHaimViewMode(value: unknown): value is HaimViewMode {
  return (
    value === HAIM_VIEW_MODE_WYSIWYG ||
    value === HAIM_VIEW_MODE_DOUBLE ||
    value === HAIM_VIEW_MODE_SOURCE
  );
}

/** Normalize legacy `dual` storage value to `double`. */
export function normalizeHaimViewMode(raw: unknown): HaimViewMode | null {
  if (raw === 'dual') return HAIM_VIEW_MODE_DOUBLE;
  if (isHaimViewMode(raw)) return raw;
  return null;
}

export function loadHaimViewMode(): HaimViewMode {
  if (typeof window === 'undefined') return HAIM_VIEW_MODE_DEFAULT;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    const normalized = normalizeHaimViewMode(raw);
    if (normalized) {
      if (raw === 'dual') {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, normalized);
      }
      return normalized;
    }
  } catch {
    // ignore
  }
  return HAIM_VIEW_MODE_DEFAULT;
}

export function saveHaimViewMode(
  mode: HaimViewMode,
  options?: { broadcast?: boolean },
): void {
  if (typeof window === 'undefined') return;
  if (!isHaimViewMode(mode)) return;
  const broadcast = options?.broadcast !== false;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, mode);
    if (broadcast) {
      window.dispatchEvent(
        new CustomEvent(HAIM_VIEW_MODE_CHANGED_EVENT, { detail: { mode } }),
      );
    }
  } catch {
    // ignore
  }
}

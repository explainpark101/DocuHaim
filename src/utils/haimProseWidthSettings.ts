/**
 * Haim note WYSIWYG: optional max-width clamp on the prose column.
 * Default: clamp off (full width); when on, default 800px.
 */

const CLAMP_STORAGE_KEY = 's3haim_haim_prose_width_clamp';
const MAX_WIDTH_STORAGE_KEY = 's3haim_haim_prose_max_width_px';

const DOM_ATTR = 'data-haim-prose-width-clamp';
const CSS_VAR = '--haim-prose-max-width';

/** Fired on `window` when clamp or max-width changes. */
export const HAIM_PROSE_WIDTH_CHANGED_EVENT = 's3haim-haim-prose-width';

export const HAIM_PROSE_WIDTH_CLAMP_DEFAULT = false;
export const HAIM_PROSE_MAX_WIDTH_PX_DEFAULT = 800;
export const HAIM_PROSE_MAX_WIDTH_PX_MIN = 400;
export const HAIM_PROSE_MAX_WIDTH_PX_MAX = 1600;

export type HaimProseWidthSettings = {
  enabled: boolean;
  maxWidthPx: number;
};

export function clampHaimProseMaxWidthPx(value: number): number {
  if (!Number.isFinite(value)) return HAIM_PROSE_MAX_WIDTH_PX_DEFAULT;
  return Math.min(
    HAIM_PROSE_MAX_WIDTH_PX_MAX,
    Math.max(HAIM_PROSE_MAX_WIDTH_PX_MIN, Math.round(value)),
  );
}

export function applyHaimProseWidthDom(settings: HaimProseWidthSettings): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.setAttribute(DOM_ATTR, settings.enabled ? '1' : '0');
  root.style.setProperty(CSS_VAR, `${clampHaimProseMaxWidthPx(settings.maxWidthPx)}px`);
}

function dispatchChanged(settings: HaimProseWidthSettings): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(HAIM_PROSE_WIDTH_CHANGED_EVENT, {
      detail: settings,
    }),
  );
}

export function loadHaimProseWidthClampEnabled(): boolean {
  if (typeof window === 'undefined') return HAIM_PROSE_WIDTH_CLAMP_DEFAULT;
  try {
    const raw = window.localStorage.getItem(CLAMP_STORAGE_KEY);
    if (raw === '0' || raw === 'false') return false;
    if (raw === '1' || raw === 'true') return true;
  } catch {
    // ignore
  }
  return HAIM_PROSE_WIDTH_CLAMP_DEFAULT;
}

export function loadHaimProseMaxWidthPx(): number {
  if (typeof window === 'undefined') return HAIM_PROSE_MAX_WIDTH_PX_DEFAULT;
  try {
    const raw = window.localStorage.getItem(MAX_WIDTH_STORAGE_KEY);
    if (raw == null || raw === '') return HAIM_PROSE_MAX_WIDTH_PX_DEFAULT;
    return clampHaimProseMaxWidthPx(Number(raw));
  } catch {
    // ignore
  }
  return HAIM_PROSE_MAX_WIDTH_PX_DEFAULT;
}

export function loadHaimProseWidthSettings(): HaimProseWidthSettings {
  return {
    enabled: loadHaimProseWidthClampEnabled(),
    maxWidthPx: loadHaimProseMaxWidthPx(),
  };
}

export function saveHaimProseWidthClampEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CLAMP_STORAGE_KEY, enabled ? '1' : '0');
    const settings: HaimProseWidthSettings = {
      enabled,
      maxWidthPx: loadHaimProseMaxWidthPx(),
    };
    applyHaimProseWidthDom(settings);
    dispatchChanged(settings);
  } catch {
    // ignore
  }
}

export function saveHaimProseMaxWidthPx(maxWidthPx: number): void {
  if (typeof window === 'undefined') return;
  const next = clampHaimProseMaxWidthPx(maxWidthPx);
  try {
    window.localStorage.setItem(MAX_WIDTH_STORAGE_KEY, String(next));
    const settings: HaimProseWidthSettings = {
      enabled: loadHaimProseWidthClampEnabled(),
      maxWidthPx: next,
    };
    applyHaimProseWidthDom(settings);
    dispatchChanged(settings);
  } catch {
    // ignore
  }
}

/** Call once at app boot. */
export function initHaimProseWidthDom(): void {
  applyHaimProseWidthDom(loadHaimProseWidthSettings());
}

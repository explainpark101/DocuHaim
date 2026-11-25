/**
 * App-wide UI font size scale (percent of browser default root size).
 * 100 = leave html font-size unset so OS / browser text scale still applies.
 */

const STORAGE_KEY = 's3haim_ui_font_size_percent';

const CSS_VAR = '--app-ui-font-scale';

/** Fired on `window` when the scale changes. */
export const UI_FONT_SIZE_CHANGED_EVENT = 's3haim-ui-font-size-changed';

export const UI_FONT_SIZE_PERCENT_DEFAULT = 100;
export const UI_FONT_SIZE_PERCENT_MIN = 80;
export const UI_FONT_SIZE_PERCENT_MAX = 150;

export function clampUiFontSizePercent(value: number): number {
  if (!Number.isFinite(value)) return UI_FONT_SIZE_PERCENT_DEFAULT;
  return Math.min(
    UI_FONT_SIZE_PERCENT_MAX,
    Math.max(UI_FONT_SIZE_PERCENT_MIN, Math.round(value)),
  );
}

export function loadUiFontSizePercent(): number {
  if (typeof window === 'undefined') return UI_FONT_SIZE_PERCENT_DEFAULT;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw == null || raw === '') return UI_FONT_SIZE_PERCENT_DEFAULT;
    return clampUiFontSizePercent(Number(raw));
  } catch {
    return UI_FONT_SIZE_PERCENT_DEFAULT;
  }
}

/** Apply scale to `:root` CSS var + html font-size (%). */
export function applyUiFontSizePercent(percent: number): void {
  if (typeof document === 'undefined') return;
  const next = clampUiFontSizePercent(percent);
  const scale = next / 100;
  const root = document.documentElement;
  root.style.setProperty(CSS_VAR, String(scale));
  if (next === UI_FONT_SIZE_PERCENT_DEFAULT) {
    // Leave browser / OS text scale in control at 100%.
    root.style.removeProperty('font-size');
  } else {
    root.style.fontSize = `${next}%`;
  }
}

export function saveUiFontSizePercent(percent: number): void {
  if (typeof window === 'undefined') return;
  const next = clampUiFontSizePercent(percent);
  try {
    if (next === UI_FONT_SIZE_PERCENT_DEFAULT) {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, String(next));
    }
  } catch {
    // ignore
  }
  applyUiFontSizePercent(next);
  window.dispatchEvent(
    new CustomEvent(UI_FONT_SIZE_CHANGED_EVENT, { detail: { percent: next } }),
  );
}

/** Call once at app boot. */
export function initUiFontSizeSettings(): void {
  applyUiFontSizePercent(loadUiFontSizePercent());
}

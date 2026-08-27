import { withFontFallback } from '@/utils/fontFallback';

const LOCAL_STORAGE_KEY = 's3haim_ui_font_family';

export const UI_FONT_CHANGED_EVENT = 's3haim-ui-font-changed';

/** Empty string = app default (Paperozi / A2z from index.css). */
export function loadUiFontFamily(): string {
  if (typeof window === 'undefined') return '';
  try {
    return window.localStorage.getItem(LOCAL_STORAGE_KEY)?.trim() ?? '';
  } catch {
    return '';
  }
}

export function saveUiFontFamily(family: string): void {
  if (typeof window === 'undefined') return;
  const trimmed = family.trim();
  try {
    if (trimmed) {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, trimmed);
    } else {
      window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  } catch {
    // ignore
  }
  applyUiFontFamily(trimmed);
  window.dispatchEvent(new CustomEvent(UI_FONT_CHANGED_EVENT));
}

/** Apply --font-sans / --font-display from a primary family (empty restores CSS defaults). */
export function applyUiFontFamily(family: string): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const trimmed = family.trim();
  if (!trimmed) {
    root.style.removeProperty('--font-sans');
    root.style.removeProperty('--font-display');
    return;
  }
  const stack = withFontFallback(trimmed, 'sans');
  root.style.setProperty('--font-sans', stack);
  root.style.setProperty('--font-display', stack);
}

export function initUiFontSettings(): void {
  applyUiFontFamily(loadUiFontFamily());
}

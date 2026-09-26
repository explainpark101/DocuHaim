/**
 * Haim WYSIWYG: line numbers on lowlight code blocks and raw-markdown blocks.
 * Both default on.
 */

const CODE_STORAGE_KEY = 's3haim_haim_code_line_numbers';
const RAW_STORAGE_KEY = 's3haim_haim_raw_line_numbers';

const CODE_DOM_ATTR = 'data-haim-code-line-numbers';
const RAW_DOM_ATTR = 'data-haim-raw-line-numbers';

/** Fired on `window` when the code-block preference changes. */
export const HAIM_CODE_LINE_NUMBERS_CHANGED_EVENT = 's3haim-haim-code-line-numbers';

/** Fired on `window` when the raw-block preference changes. */
export const HAIM_RAW_LINE_NUMBERS_CHANGED_EVENT = 's3haim-haim-raw-line-numbers';

export const HAIM_CODE_LINE_NUMBERS_DEFAULT = true;
export const HAIM_RAW_LINE_NUMBERS_DEFAULT = true;

function readBoolPref(key: string, fallback: boolean): boolean {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === '0' || raw === 'false') return false;
    if (raw === '1' || raw === 'true') return true;
  } catch {
    // ignore
  }
  return fallback;
}

function writeBoolPref(
  key: string,
  enabled: boolean,
  domAttr: string,
  eventName: string,
): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, enabled ? '1' : '0');
    applyDomAttr(domAttr, enabled);
    window.dispatchEvent(
      new CustomEvent(eventName, {
        detail: { enabled },
      }),
    );
  } catch {
    // ignore
  }
}

function applyDomAttr(attr: string, enabled: boolean): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute(attr, enabled ? '1' : '0');
}

export function applyHaimCodeLineNumbersDom(enabled: boolean): void {
  applyDomAttr(CODE_DOM_ATTR, enabled);
}

export function applyHaimRawLineNumbersDom(enabled: boolean): void {
  applyDomAttr(RAW_DOM_ATTR, enabled);
}

export function loadHaimCodeLineNumbersEnabled(): boolean {
  return readBoolPref(CODE_STORAGE_KEY, HAIM_CODE_LINE_NUMBERS_DEFAULT);
}

export function saveHaimCodeLineNumbersEnabled(enabled: boolean): void {
  writeBoolPref(
    CODE_STORAGE_KEY,
    enabled,
    CODE_DOM_ATTR,
    HAIM_CODE_LINE_NUMBERS_CHANGED_EVENT,
  );
}

export function loadHaimRawLineNumbersEnabled(): boolean {
  return readBoolPref(RAW_STORAGE_KEY, HAIM_RAW_LINE_NUMBERS_DEFAULT);
}

export function saveHaimRawLineNumbersEnabled(enabled: boolean): void {
  writeBoolPref(
    RAW_STORAGE_KEY,
    enabled,
    RAW_DOM_ATTR,
    HAIM_RAW_LINE_NUMBERS_CHANGED_EVENT,
  );
}

/** Call once at app boot. */
export function initHaimWysiwygLineNumbersDom(): void {
  applyHaimCodeLineNumbersDom(loadHaimCodeLineNumbersEnabled());
  applyHaimRawLineNumbersDom(loadHaimRawLineNumbersEnabled());
}

/** Display line count for gutters (empty → 1). */
export function countHaimDisplayLines(text: string): number {
  if (!text) return 1;
  return text.split('\n').length;
}

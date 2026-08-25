/** Advanced Search inverted-index preferences (localStorage). */

const ENABLED_KEY = 's3haim_advanced_search_index_enabled';
const INCLUDE_OTHER_FILES_KEY = 's3haim_advanced_search_include_other_files';
const UI_ANIMATION_KEY = 's3haim_advanced_search_ui_animation';

/** Default ON. Explicit `'0'` disables. Forced OFF on Tauri Android (no lucivy index). */
export function loadAdvancedSearchIndexEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    // Lazy import avoided — keep sync for engine ctor. UA heuristic matches isTauriAndroid().
    if (
      ('__TAURI_INTERNALS__' in window || '__TAURI__' in window) &&
      /Android/i.test(navigator.userAgent || '')
    ) {
      return false;
    }
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

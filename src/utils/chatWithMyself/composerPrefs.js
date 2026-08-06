/** Prefixed localStorage keys for chat-with-myself UI prefs. */
export const CHAT_PREF_PREFIX = 's3haim_chat_';

export const CHAT_PREF_KEYS = {
  composerToolbar: `${CHAT_PREF_PREFIX}composer_toolbar`,
  composerLineNumbers: `${CHAT_PREF_PREFIX}composer_line_numbers`,
  composerHelperText: `${CHAT_PREF_PREFIX}composer_helper_text`,
  openLinksInNewWindow: `${CHAT_PREF_PREFIX}open_links_new_window`,
  /**
   * Performance: when true, disable message-list layout / popLayout / exit blur.
   * Safari defaults on; other browsers default off.
   */
  perfReduceLayoutAnim: `${CHAT_PREF_PREFIX}perf_reduce_layout_anim`,
  /**
   * Performance: when true, disable bubble will-change + brightness filter.
   * Safari defaults on; other browsers default off.
   */
  perfReduceBubblePressFx: `${CHAT_PREF_PREFIX}perf_reduce_bubble_press_fx`,
  /**
   * Performance: when true, use textarea instead of MdEditor/CodeMirror.
   * Safari defaults on; other browsers default off.
   */
  composerLightweight: `${CHAT_PREF_PREFIX}composer_lightweight`,
  railGroupOpen: `${CHAT_PREF_PREFIX}rail_group_open`,
  railDateOpen: `${CHAT_PREF_PREFIX}rail_date_open`,
  railSearchOpen: `${CHAT_PREF_PREFIX}rail_search_open`,
  railPinnedOpen: `${CHAT_PREF_PREFIX}rail_pinned_open`,
};

/**
 * True for Safari (macOS / iOS), not Chrome/Edge/Firefox/CriOS etc.
 * Used only for unset localStorage defaults.
 */
export function isSafariBrowser() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  if (!/Safari/i.test(ua)) return false;
  return !/Chrome|Chromium|CriOS|Edg|FxiOS|OPiOS|Android/i.test(ua);
}

function readBoolPref(key) {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === '1' || raw === 'true') return true;
    if (raw === '0' || raw === 'false') return false;
    return null;
  } catch {
    return null;
  }
}

function writeBoolPref(key, value) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, value ? '1' : '0');
  } catch {
    /* ignore */
  }
}

/** Landscape → true, portrait → false. */
export function defaultComposerToolbarVisible() {
  if (typeof window === 'undefined') return true;
  try {
    return window.matchMedia('(orientation: landscape)').matches;
  } catch {
    return window.innerWidth >= window.innerHeight;
  }
}

/** Stored preference, or null if unset. */
export function readComposerToolbarPref() {
  return readBoolPref(CHAT_PREF_KEYS.composerToolbar);
}

export function writeComposerToolbarPref(visible) {
  writeBoolPref(CHAT_PREF_KEYS.composerToolbar, Boolean(visible));
}

/**
 * Effective toolbar visibility: localStorage override, else orientation default.
 */
export function getComposerToolbarVisible() {
  const stored = readComposerToolbarPref();
  if (stored != null) return stored;
  return defaultComposerToolbarVisible();
}

/** Stored line-numbers preference, or null if unset. */
export function readComposerLineNumbersPref() {
  return readBoolPref(CHAT_PREF_KEYS.composerLineNumbers);
}

export function writeComposerLineNumbersPref(visible) {
  writeBoolPref(CHAT_PREF_KEYS.composerLineNumbers, Boolean(visible));
}

/** Effective line-numbers visibility (default off). */
export function getComposerLineNumbersVisible() {
  return readComposerLineNumbersPref() === true;
}

/** Stored helper-text preference, or null if unset. */
export function readComposerHelperTextPref() {
  return readBoolPref(CHAT_PREF_KEYS.composerHelperText);
}

export function writeComposerHelperTextPref(visible) {
  writeBoolPref(CHAT_PREF_KEYS.composerHelperText, Boolean(visible));
}

/** Effective composer shortcut helper text (default shown). */
export function getComposerHelperTextVisible() {
  const stored = readComposerHelperTextPref();
  if (stored != null) return stored;
  return true;
}

/** Stored "open links in new window" preference, or null if unset. */
export function readOpenLinksInNewWindowPref() {
  return readBoolPref(CHAT_PREF_KEYS.openLinksInNewWindow);
}

export function writeOpenLinksInNewWindowPref(enabled) {
  writeBoolPref(CHAT_PREF_KEYS.openLinksInNewWindow, Boolean(enabled));
}

/** Effective: open http(s) links in a new window/tab (default off). */
export function getOpenLinksInNewWindow() {
  return readOpenLinksInNewWindowPref() === true;
}

/**
 * Default for performance toggles that strip heavy motion: on in Safari, off elsewhere.
 * Stored preference wins when set.
 */
export function defaultChatPerfReduceEnabled() {
  return isSafariBrowser();
}

/** Stored layout-anim reduction preference, or null if unset. */
export function readPerfReduceLayoutAnimPref() {
  return readBoolPref(CHAT_PREF_KEYS.perfReduceLayoutAnim);
}

export function writePerfReduceLayoutAnimPref(enabled) {
  writeBoolPref(CHAT_PREF_KEYS.perfReduceLayoutAnim, Boolean(enabled));
}

/**
 * Effective: reduce list layout / popLayout / exit blur (Safari default on).
 * When true, performance improves by skipping those animations.
 */
export function getPerfReduceLayoutAnimEnabled() {
  const stored = readPerfReduceLayoutAnimPref();
  if (stored != null) return stored;
  return defaultChatPerfReduceEnabled();
}

/** Stored bubble-press-fx reduction preference, or null if unset. */
export function readPerfReduceBubblePressFxPref() {
  return readBoolPref(CHAT_PREF_KEYS.perfReduceBubblePressFx);
}

export function writePerfReduceBubblePressFxPref(enabled) {
  writeBoolPref(CHAT_PREF_KEYS.perfReduceBubblePressFx, Boolean(enabled));
}

/**
 * Effective: reduce bubble will-change + brightness (Safari default on).
 * When true, performance improves by skipping those effects.
 */
export function getPerfReduceBubblePressFxEnabled() {
  const stored = readPerfReduceBubblePressFxPref();
  if (stored != null) return stored;
  return defaultChatPerfReduceEnabled();
}

/** Stored lightweight-composer preference, or null if unset. */
export function readComposerLightweightPref() {
  return readBoolPref(CHAT_PREF_KEYS.composerLightweight);
}

export function writeComposerLightweightPref(enabled) {
  writeBoolPref(CHAT_PREF_KEYS.composerLightweight, Boolean(enabled));
}

/**
 * Effective: textarea composer instead of CodeMirror (Safari default on).
 * When true, performance improves by skipping md-editor-rt.
 */
export function getComposerLightweightEnabled() {
  const stored = readComposerLightweightPref();
  if (stored != null) return stored;
  return defaultChatPerfReduceEnabled();
}

/** @typedef {'group'|'date'|'search'|'pinned'} ChatRailId */

const RAIL_OPEN_KEYS = {
  group: CHAT_PREF_KEYS.railGroupOpen,
  date: CHAT_PREF_KEYS.railDateOpen,
  search: CHAT_PREF_KEYS.railSearchOpen,
  pinned: CHAT_PREF_KEYS.railPinnedOpen,
};

/** Stored rail open preference, or null if unset. */
export function readChatRailOpenPref(railId) {
  const key = RAIL_OPEN_KEYS[railId];
  if (!key) return null;
  return readBoolPref(key);
}

export function writeChatRailOpenPref(railId, open) {
  const key = RAIL_OPEN_KEYS[railId];
  if (!key) return;
  writeBoolPref(key, Boolean(open));
}

/**
 * Effective rail open state.
 * Unset → desktop default open for group only; date/search default closed.
 */
export function getChatRailOpen(railId, { isMobileLayout = false } = {}) {
  if (isMobileLayout) return false;
  const stored = readChatRailOpenPref(railId);
  if (stored != null) return stored;
  return railId === 'group';
}

/** Prefixed localStorage keys for chat-with-myself UI prefs. */
export const CHAT_PREF_PREFIX = 's3haim_chat_';

export const CHAT_PREF_KEYS = {
  composerToolbar: `${CHAT_PREF_PREFIX}composer_toolbar`,
  composerLineNumbers: `${CHAT_PREF_PREFIX}composer_line_numbers`,
  railGroupOpen: `${CHAT_PREF_PREFIX}rail_group_open`,
  railDateOpen: `${CHAT_PREF_PREFIX}rail_date_open`,
  railSearchOpen: `${CHAT_PREF_PREFIX}rail_search_open`,
  railPinnedOpen: `${CHAT_PREF_PREFIX}rail_pinned_open`,
};

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
  const stored = readChatRailOpenPref(railId);
  if (stored != null) return stored;
  if (isMobileLayout) return false;
  return railId === 'group';
}

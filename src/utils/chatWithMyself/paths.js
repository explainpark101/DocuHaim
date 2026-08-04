export const CHAT_FOLDER = '.chat-with-myself';
export const META_FILE = 'meta.json';
export const OG_FOLDER = 'og';
export const IMAGES_FOLDER = 'images';
export const FILES_FOLDER = 'files';
export const GROUP_ICONS_FOLDER = 'group-icons';
export const SELF_GROUP = '나';
/** Select sentinel: show inline group-name input (not a real group). */
export const ADD_GROUP_VALUE = '__add_group__';

export function chatFolderPrefix() {
  return `${CHAT_FOLDER}/`;
}

export function metaKey() {
  return `${CHAT_FOLDER}/${META_FILE}`;
}

export function dayFileKey(dateStr) {
  return `${CHAT_FOLDER}/${dateStr}.md`;
}

export function ogArchiveKey(urlHash) {
  return `${CHAT_FOLDER}/${OG_FOLDER}/${urlHash}.json`;
}

/** Prefix for chat-attached images: `.chat-with-myself/images/YYYY-MM-DD/` */
export function chatImagePathPrefix(dateStr) {
  const day = dateStr || localDateString(new Date());
  return `${CHAT_FOLDER}/${IMAGES_FOLDER}/${day}/`;
}

/** Prefix for chat-attached files: `.chat-with-myself/files/YYYY-MM-DD/` */
export function chatFilePathPrefix(dateStr) {
  const day = dateStr || localDateString(new Date());
  return `${CHAT_FOLDER}/${FILES_FOLDER}/${day}/`;
}

/** Prefix for group avatar icons: `.chat-with-myself/group-icons/` */
export function groupIconPathPrefix() {
  return `${CHAT_FOLDER}/${GROUP_ICONS_FOLDER}/`;
}

/** Local calendar date YYYY-MM-DD */
export function localDateString(date = new Date(), timeZone) {
  try {
    const fmt = new Intl.DateTimeFormat('en-CA', {
      timeZone: timeZone || undefined,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return fmt.format(date);
  } catch {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}

export function detectTimeZone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    return 'UTC';
  }
}

export function formatMessageTime(isoAt, timeZone) {
  try {
    const d = new Date(isoAt);
    return new Intl.DateTimeFormat(undefined, {
      timeZone: timeZone || undefined,
      hour: 'numeric',
      minute: '2-digit',
    }).format(d);
  } catch {
    return '';
  }
}

export function formatMessageDateLabel(isoAt, timeZone) {
  try {
    const d = new Date(isoAt);
    return new Intl.DateTimeFormat(undefined, {
      timeZone: timeZone || undefined,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    }).format(d);
  } catch {
    return localDateString(new Date(isoAt), timeZone);
  }
}

/**
 * Day-list row label: `yyyy년 mm월 dd일 (요일)`.
 * @param {string} dateStr YYYY-MM-DD
 */
export function formatChatDayListLabel(dateStr, timeZone) {
  const raw = String(dateStr || '');
  const m = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return raw;
  const [, y, mo, d] = m;
  let weekday = '';
  try {
    weekday = new Intl.DateTimeFormat('ko-KR', {
      timeZone: timeZone || undefined,
      weekday: 'short',
    }).format(new Date(`${raw}T12:00:00`));
  } catch {
    weekday = '';
  }
  const wd = weekday ? ` (${weekday})` : '';
  return `${y}년 ${mo}월 ${d}일${wd}`;
}

/**
 * Default note filename base from message timestamp (no .md).
 * Example: 2026-08-04_03-57-12
 */
export function formatMessageFileNameBase(isoAt, timeZone) {
  try {
    const d = new Date(isoAt);
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: timeZone || undefined,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).formatToParts(d);
    const get = (type) => parts.find((p) => p.type === type)?.value || '00';
    const date = `${get('year')}-${get('month')}-${get('day')}`;
    const time = `${get('hour')}-${get('minute')}-${get('second')}`;
    return `${date}_${time}`;
  } catch {
    return localDateString(new Date(), timeZone).replace(/:/g, '-');
  }
}

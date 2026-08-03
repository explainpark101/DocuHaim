export const CHAT_FOLDER = '.chat-with-myself';
export const META_FILE = 'meta.json';
export const OG_FOLDER = 'og';
export const SELF_GROUP = '나';
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

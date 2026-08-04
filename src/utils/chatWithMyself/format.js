import { SELF_GROUP } from './paths.js';

const MSG_START =
  /<!--\s*chat-msg\s+([^>]*?)-->\s*/g;

const MSG_DELETED =
  /<!--\s*chat-msg-deleted\s+([^>]*?)-->/g;

const EDITS_BLOCK =
  /\n*<!--\s*chat-edits\s+id="([^"]*)"\s*-->\s*([\s\S]*?)\s*<!--\s*\/chat-edits\s*-->\s*$/;

const MAX_MERGE_TS = (msg) => {
  const a = Date.parse(msg?.editedAt || '') || 0;
  const b = Date.parse(msg?.at || '') || 0;
  return Math.max(a, b);
};

function parseAttrs(attrStr) {
  const attrs = {};
  const re = /([\w-]+)="([^"]*)"/g;
  let m;
  while ((m = re.exec(attrStr))) {
    attrs[m[1]] = m[2];
  }
  return attrs;
}

function escapeAttr(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/\r\n/g, '\n')
    .replace(/\n/g, '&#10;')
    .replace(/\r/g, '');
}

function unescapeAttr(value) {
  return String(value ?? '')
    .replace(/&#10;/g, '\n')
    .replace(/&lt;/g, '<')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&');
}

/**
 * @typedef {Object} ChatMessage
 * @property {string} id
 * @property {string} at - ISO UTC
 * @property {string} [tz]
 * @property {string} [source]
 * @property {string} group
 * @property {string} body
 * @property {string} [replyTo]
 * @property {string} [replySnippet]
 * @property {string} [replyGroup]
 * @property {string} [dateStr]
 * @property {string} [editedAt]
 * @property {string} [pinnedAt]
 * @property {string} [notePath]
 * @property {{ at: string, body: string, group: string }[]} [editHistory]
 */

/**
 * @param {string} raw
 * @returns {{ at: string, body: string, group: string }[]}
 */
function parseEditHistoryPayload(raw) {
  try {
    const decoded = decodeURIComponent(String(raw || '').trim());
    const parsed = JSON.parse(decoded);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((e) => e && typeof e === 'object')
      .map((e) => ({
        at: String(e.at || ''),
        body: String(e.body ?? ''),
        group: String(e.group || SELF_GROUP),
      }));
  } catch {
    return [];
  }
}

/**
 * @param {string} content
 * @returns {{ messages: ChatMessage[], deletedIds: string[], deletedAtById: Record<string, string> }}
 */
export function parseDayFile(content) {
  if (!content || !String(content).trim()) {
    return { messages: [], deletedIds: [], deletedAtById: {} };
  }
  const text = String(content);
  const deletedAtById = {};
  for (const match of text.matchAll(MSG_DELETED)) {
    const attrs = parseAttrs(match[1] || '');
    const id = attrs.id;
    if (!id) continue;
    deletedAtById[id] = attrs.at || new Date(0).toISOString();
  }
  const deletedIds = Object.keys(deletedAtById);

  const messages = [];
  const matches = [...text.matchAll(MSG_START)];
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const attrs = parseAttrs(match[1] || '');
    const start = match.index + match[0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index : text.length;
    let body = text.slice(start, end).replace(/^\n/, '').replace(/\n+$/, '');
    // Strip interleaved tombstones from body slice
    body = body
      .replace(/<!--\s*chat-msg-deleted\s+([^>]*?)-->/g, '')
      .replace(/^\n/, '')
      .replace(/\n+$/, '');
    let editHistory = [];
    const editsMatch = body.match(EDITS_BLOCK);
    if (editsMatch) {
      const editsId = editsMatch[1] || '';
      const msgId = attrs.id || '';
      if (!msgId || !editsId || editsId === msgId) {
        editHistory = parseEditHistoryPayload(editsMatch[2]);
      }
      body = body.slice(0, editsMatch.index).replace(/\n+$/, '');
    }
    const id = attrs.id || `msg-${i}-${attrs.at || start}`;
    if (deletedAtById[id]) continue;
    messages.push({
      id,
      at: attrs.at || new Date(0).toISOString(),
      tz: attrs.tz || '',
      source: attrs.source || 'compose',
      group: attrs.group || SELF_GROUP,
      replyTo: attrs.replyTo || '',
      replySnippet: unescapeAttr(attrs.replySnippet || ''),
      replyGroup: unescapeAttr(attrs.replyGroup || ''),
      editedAt: attrs.editedAt || '',
      pinnedAt: attrs.pinnedAt || '',
      notePath: attrs.notePath || '',
      editHistory,
      body,
    });
  }
  return { messages, deletedIds, deletedAtById };
}

/**
 * Serialize a deletion tombstone line.
 * @param {string} id
 * @param {string} [at]
 */
export function serializeDeletedMarker(id, at = new Date().toISOString()) {
  return `<!-- chat-msg-deleted id="${escapeAttr(id)}" at="${escapeAttr(at)}" -->\n`;
}

/**
 * @param {ChatMessage} msg
 * @returns {string}
 */
export function serializeMessage(msg) {
  const id = escapeAttr(msg.id);
  const at = escapeAttr(msg.at);
  const tz = escapeAttr(msg.tz || '');
  const source = escapeAttr(msg.source || 'compose');
  const group = escapeAttr(msg.group || SELF_GROUP);
  const replyTo = escapeAttr(msg.replyTo || '');
  const replySnippet = escapeAttr(String(msg.replySnippet || ''));
  const replyGroup = escapeAttr(msg.replyGroup || '');
  const editedAt = escapeAttr(msg.editedAt || '');
  const pinnedAt = escapeAttr(msg.pinnedAt || '');
  const notePath = escapeAttr(msg.notePath || '');
  const body = String(msg.body ?? '').replace(/\n+$/, '');
  const replyAttrs = replyTo
    ? ` replyTo="${replyTo}" replySnippet="${replySnippet}" replyGroup="${replyGroup}"`
    : '';
  const editedAttr = editedAt ? ` editedAt="${editedAt}"` : '';
  const pinnedAttr = pinnedAt ? ` pinnedAt="${pinnedAt}"` : '';
  const notePathAttr = notePath ? ` notePath="${notePath}"` : '';
  const out = `<!-- chat-msg id="${id}" at="${at}" tz="${tz}" source="${source}" group="${group}"${replyAttrs}${editedAttr}${pinnedAttr}${notePathAttr} -->\n${body}\n\n`;
  // Edit history is stored under `.chat-with-myself/edits/<id>/` (not inline).
  return out;
}

/**
 * @param {ChatMessage[]} messages
 * @param {string[] | Record<string, string>} [deletedIdsOrMap]
 * @returns {string}
 */
export function serializeDayFile(messages, deletedIdsOrMap = []) {
  const tombstones = [];
  if (Array.isArray(deletedIdsOrMap)) {
    for (const id of deletedIdsOrMap) {
      if (id) tombstones.push(serializeDeletedMarker(id));
    }
  } else if (deletedIdsOrMap && typeof deletedIdsOrMap === 'object') {
    for (const [id, at] of Object.entries(deletedIdsOrMap)) {
      if (id) tombstones.push(serializeDeletedMarker(id, at));
    }
  }
  const live = (messages || []).map(serializeMessage).join('');
  return tombstones.join('') + live;
}

/**
 * Merge two day-file parses (local vs remote).
 * @param {{ messages?: ChatMessage[], deletedIds?: string[], deletedAtById?: Record<string, string> }} local
 * @param {{ messages?: ChatMessage[], deletedIds?: string[], deletedAtById?: Record<string, string> }} remote
 * @returns {{ messages: ChatMessage[], deletedIds: string[], deletedAtById: Record<string, string> }}
 */
export function mergeDayMessages(local, remote) {
  const deletedAtById = {
    ...(local?.deletedAtById || {}),
    ...(remote?.deletedAtById || {}),
  };
  for (const id of local?.deletedIds || []) {
    if (!deletedAtById[id]) deletedAtById[id] = new Date(0).toISOString();
  }
  for (const id of remote?.deletedIds || []) {
    if (!deletedAtById[id]) deletedAtById[id] = new Date(0).toISOString();
  }

  /** @type {Map<string, ChatMessage>} */
  const byId = new Map();
  for (const msg of [...(local?.messages || []), ...(remote?.messages || [])]) {
    if (!msg?.id || deletedAtById[msg.id]) continue;
    const prev = byId.get(msg.id);
    if (!prev || MAX_MERGE_TS(msg) >= MAX_MERGE_TS(prev)) {
      byId.set(msg.id, msg);
    }
  }

  const messages = [...byId.values()].sort(
    (a, b) => (Date.parse(a.at) || 0) - (Date.parse(b.at) || 0),
  );
  return {
    messages,
    deletedIds: Object.keys(deletedAtById),
    deletedAtById,
  };
}

export function appendMessageToContent(existingContent, msg) {
  const base = existingContent ? String(existingContent).replace(/\s*$/, '\n\n') : '';
  return base + serializeMessage(msg);
}

/** Append several messages to day-file content in order. */
export function appendMessagesToContent(existingContent, msgs) {
  let next = existingContent || '';
  for (const msg of msgs || []) {
    next = appendMessageToContent(next, msg);
  }
  return next;
}

export function createMessageId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function isSelfGroup(group) {
  return !group || group === SELF_GROUP;
}

export function makeReplySnippet(body) {
  return String(body || '')
    .replace(/\r\n/g, '\n')
    .replace(/[^\S\n]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, 280);
}

/** Chat deep-link hash for a message bubble. */
export function chatMessageHash(messageId) {
  const id = String(messageId || '').trim();
  return id ? `#msg-${id}` : '';
}

/** Build /chat URL that scrolls to a message. */
export function chatMessageUrl(messageId) {
  const hash = chatMessageHash(messageId);
  return hash ? `/chat${hash}` : '/chat';
}

/**
 * Plain text for clipboard (strips attachment tokens to readable labels).
 */
export function formatChatMessagePlainText(msg) {
  const raw = String(msg?.body ?? '');
  if (!raw) return '';
  return raw
    .replace(/!\[\[([^\]]+)\]\]/g, '[image: $1]')
    .replace(/\[\[file:([^|\]]+)(?:\|([^|\]]*?)(?:\|(\d+))?)?\]\]/g, (_, _path, name) => {
      const label = String(name || '').trim() || 'file';
      return `[file: ${label}]`;
    })
    .trim();
}

/** Raw markdown body for clipboard. */
export function formatChatMessageMarkdownCopy(msg) {
  return String(msg?.body ?? '').replace(/\n+$/, '');
}

/**
 * Parse `<!-- chat-with-myself ... -->` metadata from a note body.
 * @returns {{ id: string, at: string, group: string, href: string, notePath: string } | null}
 */
export function parseChatWithMyselfNoteMeta(markdown) {
  const text = String(markdown ?? '');
  const match = text.match(/<!--\s*chat-with-myself\s+([^>]*?)-->/);
  if (!match) return null;
  const attrs = parseAttrs(match[1] || '');
  const id = attrs.id || '';
  if (!id && !attrs.href) return null;
  const href = attrs.href || chatMessageUrl(id);
  return {
    id,
    at: attrs.at || '',
    group: unescapeAttr(attrs.group || ''),
    href,
    notePath: unescapeAttr(attrs.notePath || attrs['note-path'] || ''),
  };
}

/**
 * React Router location for a chat message deep-link.
 * Path is basename-relative (`/chat`); Router applies Vite `BASE_URL`.
 * @param {{ id?: string, href?: string } | null | undefined} meta
 */
export function chatSavedNoteLinkTo(meta) {
  const raw = String(meta?.href || chatMessageUrl(meta?.id) || '/chat');
  try {
    const url = new URL(raw, 'https://s3haim.local');
    const path = url.pathname || '/chat';
    const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || '';
    const pathname =
      base && path.startsWith(`${base}/`)
        ? path.slice(base.length) || '/chat'
        : path.startsWith('/')
          ? path
          : `/${path}`;
    const hash = (url.hash || '').replace(/^#/, '');
    return hash ? { pathname, hash } : pathname;
  } catch {
    const hashMatch = raw.match(/#(.+)$/);
    if (hashMatch) {
      return { pathname: '/chat', hash: hashMatch[1] };
    }
    return '/chat';
  }
}

/**
 * Markdown body for a note created from a chat message.
 * Comment + optional quote + link are folded into one preview card by md-editor-rt.
 */
export function formatChatMessageAsNoteMarkdown(msg, timeZone, notePath = '') {
  const group = msg?.group || '나';
  const at = msg?.at || '';
  const msgId = msg?.id || '';
  const chatHref = chatMessageUrl(msgId);
  let when = at;
  try {
    when = new Intl.DateTimeFormat(undefined, {
      timeZone: timeZone || undefined,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(at));
  } catch {
    /* keep iso */
  }
  const body = String(msg?.body ?? '').replace(/\n+$/, '');
  const notePathAttr = notePath ? ` notePath="${escapeAttr(notePath)}"` : '';
  return [
    `<!-- chat-with-myself id="${escapeAttr(msgId)}" at="${escapeAttr(at)}" group="${escapeAttr(group)}" href="${escapeAttr(chatHref)}"${notePathAttr} -->`,
    '',
    `> ${group} · ${when}`,
    '',
    `[채팅에서 저장된 노트](${chatHref})`,
    '',
    body,
    '',
  ].join('\n');
}

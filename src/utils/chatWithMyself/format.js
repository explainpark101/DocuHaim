import { SELF_GROUP } from './paths.js';

const MSG_START =
  /<!--\s*chat-msg\s+([^>]*?)-->\s*/g;

const EDITS_BLOCK =
  /\n*<!--\s*chat-edits\s+id="([^"]*)"\s*-->\s*([\s\S]*?)\s*<!--\s*\/chat-edits\s*-->\s*$/;

function parseAttrs(attrStr) {
  const attrs = {};
  const re = /(\w+)="([^"]*)"/g;
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
 * @returns {ChatMessage[]}
 */
export function parseDayFile(content) {
  if (!content || !String(content).trim()) return [];
  const text = String(content);
  const messages = [];
  const matches = [...text.matchAll(MSG_START)];
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const attrs = parseAttrs(match[1] || '');
    const start = match.index + match[0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index : text.length;
    let body = text.slice(start, end).replace(/^\n/, '').replace(/\n+$/, '');
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
    messages.push({
      id: attrs.id || `msg-${i}-${attrs.at || start}`,
      at: attrs.at || new Date(0).toISOString(),
      tz: attrs.tz || '',
      source: attrs.source || 'compose',
      group: attrs.group || SELF_GROUP,
      replyTo: attrs.replyTo || '',
      replySnippet: unescapeAttr(attrs.replySnippet || ''),
      replyGroup: unescapeAttr(attrs.replyGroup || ''),
      editedAt: attrs.editedAt || '',
      editHistory,
      body,
    });
  }
  return messages;
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
  const body = String(msg.body ?? '').replace(/\n+$/, '');
  const replyAttrs = replyTo
    ? ` replyTo="${replyTo}" replySnippet="${replySnippet}" replyGroup="${replyGroup}"`
    : '';
  const editedAttr = editedAt ? ` editedAt="${editedAt}"` : '';
  let out = `<!-- chat-msg id="${id}" at="${at}" tz="${tz}" source="${source}" group="${group}"${replyAttrs}${editedAttr} -->\n${body}\n\n`;
  const history = Array.isArray(msg.editHistory) ? msg.editHistory : [];
  if (history.length > 0) {
    const payload = encodeURIComponent(
      JSON.stringify(
        history.map((e) => ({
          at: String(e?.at || ''),
          body: String(e?.body ?? ''),
          group: String(e?.group || SELF_GROUP),
        })),
      ),
    );
    out += `<!-- chat-edits id="${id}" -->\n${payload}\n<!-- /chat-edits -->\n\n`;
  }
  return out;
}

/**
 * @param {ChatMessage[]} messages
 * @returns {string}
 */
export function serializeDayFile(messages) {
  return (messages || []).map(serializeMessage).join('');
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

/**
 * Markdown body for a note created from a chat message.
 */
export function formatChatMessageAsNoteMarkdown(msg, timeZone) {
  const group = msg?.group || '나';
  const at = msg?.at || '';
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
  return [
    `<!-- chat-with-myself id="${msg?.id || ''}" at="${at}" group="${group}" -->`,
    '',
    `> ${group} · ${when}`,
    '',
    body,
    '',
  ].join('\n');
}

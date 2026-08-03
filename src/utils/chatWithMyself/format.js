import { SELF_GROUP } from './paths.js';

const MSG_START =
  /<!--\s*chat-msg\s+([^>]*?)-->\s*/g;

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
    .replace(/</g, '&lt;');
}

function unescapeAttr(value) {
  return String(value ?? '')
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
 */

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
    const body = text.slice(start, end).replace(/^\n/, '').replace(/\n+$/, '');
    messages.push({
      id: attrs.id || `msg-${i}-${attrs.at || start}`,
      at: attrs.at || new Date(0).toISOString(),
      tz: attrs.tz || '',
      source: attrs.source || 'compose',
      group: attrs.group || SELF_GROUP,
      replyTo: attrs.replyTo || '',
      replySnippet: unescapeAttr(attrs.replySnippet || ''),
      replyGroup: unescapeAttr(attrs.replyGroup || ''),
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
  const replySnippet = escapeAttr(
    String(msg.replySnippet || '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 120),
  );
  const replyGroup = escapeAttr(msg.replyGroup || '');
  const body = String(msg.body ?? '').replace(/\n+$/, '');
  const replyAttrs = replyTo
    ? ` replyTo="${replyTo}" replySnippet="${replySnippet}" replyGroup="${replyGroup}"`
    : '';
  return `<!-- chat-msg id="${id}" at="${at}" tz="${tz}" source="${source}" group="${group}"${replyAttrs} -->\n${body}\n\n`;
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
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120);
}

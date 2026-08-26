import { SELF_GROUP } from '@/utils/chatWithMyself/paths';
import {
  parseReactionsAttr,
  serializeReactionsAttr,
} from '@/utils/chatWithMyself/reactions';

const MSG_START =
  /<!--\s*chat-msg\s+([^>]*?)-->\s*/g;

const MSG_DELETED =
  /<!--\s*chat-msg-deleted\s+([^>]*?)-->/g;

const EDITS_BLOCK =
  /\n*<!--\s*chat-edits\s+id="([^"]*)"\s*-->\s*([\s\S]*?)\s*<!--\s*\/chat-edits\s*-->\s*$/;

const MAX_MERGE_TS = (msg: any) => {
  const a = Date.parse(msg?.editedAt || '') || 0;
  const b = Date.parse(msg?.at || '') || 0;
  const c = Date.parse(msg?.reactionsAt || '') || 0;
  const d = Date.parse(msg?.pinnedAt || '') || 0;
  return Math.max(a, b, c, d);
};

function parseAttrs(attrStr: any) {
  const attrs = {};
  const re = /([\w-]+)="([^"]*)"/g;
  let m;
  while ((m = re.exec(attrStr))) {
    // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
    attrs[m[1]] = m[2];
  }
  return attrs;
}

function escapeAttr(value: any) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/\r\n/g, '\n')
    .replace(/\n/g, '&#10;')
    .replace(/\r/g, '');
}

function unescapeAttr(value: any) {
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
 * @property {boolean} [markdown] - render body as markdown (default false)
 * @property {boolean} [encrypted] - body is password-encrypted JSON (default false)
 * @property {string} [replyTo]
 * @property {string} [replySnippet]
 * @property {string} [replyGroup]
 * @property {string} [dateStr]
 * @property {string} [editedAt]
 * @property {string} [pinnedAt]
 * @property {string} [notePath]
 * @property {string} [collapsed] - "1" when folded; empty when expanded
 * @property {import('@/utils/chatWithMyself/reactions').ChatReaction[]} [reactions]
 * @property {string} [reactionsAt] - ISO when reactions last changed (merge)
 * @property {{ at: string, body: string, group: string }[]} [editHistory]
 */

/**
 * Per-message markdown render flag. Missing / legacy messages → false.
 * @param {{ markdown?: unknown } | null | undefined} msg
 */
export function isChatMessageMarkdown(msg: any) {
  const v = msg?.markdown;
  return v === true || v === '1' || v === 'true';
}

/**
 * Per-message encrypted flag. Missing / legacy → false.
 * Body holds `{ ciphertext, iv, salt }` JSON from encryptData.
 * @param {{ encrypted?: unknown } | null | undefined} msg
 */
export function isChatMessageEncrypted(msg: any) {
  const v = msg?.encrypted;
  return v === true || v === '1' || v === 'true';
}

/**
 * @param {string} raw
 * @returns {{ at: string, body: string, group: string }[]}
 */
function parseEditHistoryPayload(raw: any) {
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
export function parseDayFile(content: any) {
  if (!content || !String(content).trim()) {
    return { messages: [], deletedIds: [], deletedAtById: {} };
  }
  const text = String(content);
  const deletedAtById = {};
  for (const match of text.matchAll(MSG_DELETED)) {
    const attrs = parseAttrs(match[1] || '');
    // @ts-expect-error TS(2339): Property 'id' does not exist on type '{}'.
    const id = attrs.id;
    if (!id) continue;
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    deletedAtById[id] = attrs.at || new Date(0).toISOString();
  }
  const deletedIds = Object.keys(deletedAtById);

  const messages = [];
  const matches = [...text.matchAll(MSG_START)];
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    const attrs = parseAttrs(match[1] || '');
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    const start = match.index + match[0].length;
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    const end = i + 1 < matches.length ? matches[i + 1].index : text.length;
    let body = text.slice(start, end).replace(/^\n/, '').replace(/\n+$/, '');
    // Strip interleaved tombstones from body slice
    body = body
      .replace(/<!--\s*chat-msg-deleted\s+([^>]*?)-->/g, '')
      .replace(/^\n/, '')
      .replace(/\n+$/, '');
    let editHistory: any = [];
    const editsMatch = body.match(EDITS_BLOCK);
    if (editsMatch) {
      const editsId = editsMatch[1] || '';
      // @ts-expect-error TS(2339): Property 'id' does not exist on type '{}'.
      const msgId = attrs.id || '';
      if (!msgId || !editsId || editsId === msgId) {
        editHistory = parseEditHistoryPayload(editsMatch[2]);
      }
      body = body.slice(0, editsMatch.index).replace(/\n+$/, '');
    }
    // @ts-expect-error TS(2339): Property 'id' does not exist on type '{}'.
    const id = attrs.id || `msg-${i}-${attrs.at || start}`;
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (deletedAtById[id]) continue;
    messages.push({
      id,
      // @ts-expect-error TS(2339): Property 'at' does not exist on type '{}'.
      at: attrs.at || new Date(0).toISOString(),
      // @ts-expect-error TS(2339): Property 'tz' does not exist on type '{}'.
      tz: attrs.tz || '',
      // @ts-expect-error TS(2339): Property 'source' does not exist on type '{}'.
      source: attrs.source || 'compose',
      // @ts-expect-error TS(2339): Property 'group' does not exist on type '{}'.
      group: attrs.group || SELF_GROUP,
      // @ts-expect-error TS(2339): Property 'replyTo' does not exist on type '{}'.
      replyTo: attrs.replyTo || '',
      // @ts-expect-error TS(2339): Property 'replySnippet' does not exist on type '{}... Remove this comment to see the full error message
      replySnippet: unescapeAttr(attrs.replySnippet || ''),
      // @ts-expect-error TS(2339): Property 'replyGroup' does not exist on type '{}'.
      replyGroup: unescapeAttr(attrs.replyGroup || ''),
      // @ts-expect-error TS(2339): Property 'editedAt' does not exist on type '{}'.
      editedAt: attrs.editedAt || '',
      // @ts-expect-error TS(2339): Property 'pinnedAt' does not exist on type '{}'.
      pinnedAt: attrs.pinnedAt || '',
      // @ts-expect-error TS(2339): Property 'notePath' does not exist on type '{}'.
      notePath: attrs.notePath || '',
      // @ts-expect-error TS(2339): Property 'collapsed' does not exist on type '{}'.
      collapsed: attrs.collapsed === '1' || attrs.collapsed === 'true' ? '1' : '',
      markdown:
        // @ts-expect-error TS(2339): Property 'markdown' does not exist on type '{}'.
        attrs.markdown === '1' || attrs.markdown === 'true',
      encrypted:
        // @ts-expect-error TS(2339): Property 'encrypted' does not exist on type '{}'.
        attrs.encrypted === '1' || attrs.encrypted === 'true',
      // @ts-expect-error TS(2339): Property 'reactions' does not exist on type '{}'.
      reactions: parseReactionsAttr(attrs.reactions || ''),
      // @ts-expect-error TS(2339): Property 'reactionsAt' does not exist on type '{}'... Remove this comment to see the full error message
      reactionsAt: attrs.reactionsAt || '',
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
export function serializeDeletedMarker(id: any, at = new Date().toISOString()) {
  return `<!-- chat-msg-deleted id="${escapeAttr(id)}" at="${escapeAttr(at)}" -->\n`;
}

/**
 * @param {ChatMessage} msg
 * @returns {string}
 */
export function serializeMessage(msg: any) {
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
  const collapsed =
    msg.collapsed === '1' || msg.collapsed === true || msg.collapsed === 'true'
      ? '1'
      : '';
  const markdown = isChatMessageMarkdown(msg) ? '1' : '';
  const encrypted = isChatMessageEncrypted(msg) ? '1' : '';
  const reactionsRaw = serializeReactionsAttr(msg.reactions);
  const reactions = escapeAttr(reactionsRaw);
  const reactionsAt = escapeAttr(msg.reactionsAt || '');
  const body = String(msg.body ?? '').replace(/\n+$/, '');
  const replyAttrs = replyTo
    ? ` replyTo="${replyTo}" replySnippet="${replySnippet}" replyGroup="${replyGroup}"`
    : '';
  const editedAttr = editedAt ? ` editedAt="${editedAt}"` : '';
  const pinnedAttr = pinnedAt ? ` pinnedAt="${pinnedAt}"` : '';
  const notePathAttr = notePath ? ` notePath="${notePath}"` : '';
  const collapsedAttr = collapsed ? ` collapsed="${collapsed}"` : '';
  const markdownAttr = markdown ? ` markdown="${markdown}"` : '';
  const encryptedAttr = encrypted ? ` encrypted="${encrypted}"` : '';
  const reactionsAttr = reactions ? ` reactions="${reactions}"` : '';
  const reactionsAtAttr =
    reactions && reactionsAt ? ` reactionsAt="${reactionsAt}"` : '';
  const out = `<!-- chat-msg id="${id}" at="${at}" tz="${tz}" source="${source}" group="${group}"${replyAttrs}${editedAttr}${pinnedAttr}${notePathAttr}${collapsedAttr}${markdownAttr}${encryptedAttr}${reactionsAttr}${reactionsAtAttr} -->\n${body}\n\n`;
  // Edit history is stored under `.chat-with-myself/edits/<id>/` (not inline).
  return out;
}

/**
 * @param {ChatMessage[]} messages
 * @param {string[] | Record<string, string>} [deletedIdsOrMap]
 * @returns {string}
 */
export function serializeDayFile(messages: any, deletedIdsOrMap = []) {
  const tombstones = [];
  if (Array.isArray(deletedIdsOrMap)) {
    for (const id of deletedIdsOrMap) {
      if (id) tombstones.push(serializeDeletedMarker(id));
    }
  } else if (deletedIdsOrMap && typeof deletedIdsOrMap === 'object') {
    for (const [id, at] of Object.entries(deletedIdsOrMap)) {
      // @ts-expect-error TS(2345): Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
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
export function mergeDayMessages(local: any, remote: any) {
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

/** Drop later copies so React list keys (`msg.id`) stay unique. */
export function dedupeMessagesById(messages: any) {
  const seen = new Set();
  const out = [];
  for (const msg of messages || []) {
    const id = msg?.id;
    if (!id || seen.has(id)) continue;
    seen.add(id);
    out.push(msg);
  }
  return out;
}

export function prependUniqueMessages(head: any, tail: any) {
  const existing = new Set(
    (tail || []).map((m: any) => m?.id).filter(Boolean),
  );
  const uniqueHead = (head || []).filter((m: any) => m?.id && !existing.has(m.id));
  if (!uniqueHead.length) return tail || [];
  return [...uniqueHead, ...(tail || [])];
}

export function appendUniqueMessages(head: any, more: any) {
  const existing = new Set(
    (head || []).map((m: any) => m?.id).filter(Boolean),
  );
  const uniqueMore = (more || []).filter((m: any) => m?.id && !existing.has(m.id));
  if (!uniqueMore.length) return head || [];
  return [...(head || []), ...uniqueMore];
}

export function appendMessageToContent(existingContent: any, msg: any) {
  const base = existingContent ? String(existingContent).replace(/\s*$/, '\n\n') : '';
  return base + serializeMessage(msg);
}

/** Append several messages to day-file content in order. */
export function appendMessagesToContent(existingContent: any, msgs: any) {
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

export function isSelfGroup(group: any) {
  return !group || group === SELF_GROUP;
}

export function makeReplySnippet(body: any) {
  return String(body || '')
    .replace(/\r\n/g, '\n')
    .replace(/[^\S\n]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, 280);
}

/** Chat deep-link hash for a message bubble. */
export function chatMessageHash(messageId: any) {
  const id = String(messageId || '').trim();
  return id ? `#msg-${id}` : '';
}

/** Build /chat URL that scrolls to a message. */
export function chatMessageUrl(messageId: any) {
  const hash = chatMessageHash(messageId);
  return hash ? `/chat${hash}` : '/chat';
}

/**
 * App-relative href for opening a note in the editor (`/view/...`).
 * @param {string} notePath
 */
export function noteViewHref(notePath: any) {
  const p = String(notePath || '').replace(/^\/+/, '');
  return p ? `/view/${p}` : '/view/';
}

/**
 * Chat message body that renders as a shared-note card.
 * @param {{ path?: string, name?: string }} input
 */
export function formatNoteShareChatBody(input = {}) {
  // @ts-expect-error TS(2339): Property 'path' does not exist on type '{}'.
  const notePath = String(input.path || '')
    .replace(/^\/+/, '')
    .replace(/[[\]|]/g, '_');
  const rawName =
    // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
    String(input.name || '').trim() ||
    notePath.split('/').filter(Boolean).pop() ||
    'note';
  const label = rawName.replace(/[[\]|]/g, '_').trim() || 'note';
  if (!notePath) return `[[note:${label}|${label}]]`;
  return `[[note:${notePath}|${label}]]`;
}

/**
 * Chat message body that renders as a shared-folder card.
 * Path is normalized to end with `/`.
 * @param {{ path?: string, name?: string }} input
 */
export function formatFolderShareChatBody(input = {}) {
  // @ts-expect-error TS(2339): Property 'path' does not exist on type '{}'.
  let folderPath = String(input.path || '')
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')
    .replace(/[[\]|]/g, '_');
  if (folderPath && !folderPath.endsWith('/')) folderPath = `${folderPath}/`;
  const rawName =
    // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
    String(input.name || '').trim() ||
    folderPath.replace(/\/+$/, '').split('/').filter(Boolean).pop() ||
    'folder';
  const label = rawName.replace(/[[\]|]/g, '_').trim() || 'folder';
  if (!folderPath) return `[[folder:${label}/|${label}]]`;
  return `[[folder:${folderPath}|${label}]]`;
}

/**
 * If href points at this app's `/view/...` note route, return the storage path.
 * @param {string} href
 * @returns {string | null}
 */
export function parseAppViewPath(href: any) {
  const raw = String(href || '').trim();
  if (!raw) return null;
  try {
    const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || '';
    let pathname = raw;
    if (/^https?:\/\//i.test(raw)) {
      const u = new URL(raw);
      if (
        typeof window !== 'undefined' &&
        window.location?.origin &&
        u.origin !== window.location.origin
      ) {
        return null;
      }
      pathname = u.pathname || '';
    }
    if (base && (pathname === base || pathname.startsWith(`${base}/`))) {
      pathname = pathname.slice(base.length) || '/';
    }
    if (!pathname.startsWith('/')) pathname = `/${pathname}`;
    const m = pathname.match(/^\/view\/(.+)$/);
    if (!m) return null;
    try {
      // @ts-expect-error TS(2769): No overload matches this call.
      return decodeURIComponent(m[1]);
    } catch {
      return m[1];
    }
  } catch {
    return null;
  }
}

/**
 * Plain text for clipboard (strips attachment tokens to readable labels).
 */
export function formatChatMessagePlainText(msg: any) {
  if (isChatMessageEncrypted(msg)) {
    return '암호화된 메시지';
  }
  const raw = String(msg?.body ?? '');
  if (!raw) return '';
  return raw
    .replace(/!\[\[([^\]]+)\]\]/g, '[image: $1]')
    .replace(/\[\[file:([^|\]]+)(?:\|([^|\]]*?)(?:\|(\d+))?)?\]\]/g, (_, _path, name) => {
      const label = String(name || '').trim() || 'file';
      return `[file: ${label}]`;
    })
    .replace(/\[\[note:([^|\]]+)(?:\|([^\]]*?))?\]\]/g, (_, path, name) => {
      const label =
        String(name || '').trim() ||
        String(path || '')
          .split('/')
          .filter(Boolean)
          .pop() ||
        'note';
      return `[note: ${label}]`;
    })
    .replace(/\[\[folder:([^|\]]+)(?:\|([^\]]*?))?\]\]/g, (_, path, name) => {
      const label =
        String(name || '').trim() ||
        String(path || '')
          .replace(/\/+$/, '')
          .split('/')
          .filter(Boolean)
          .pop() ||
        'folder';
      return `[folder: ${label}]`;
    })
    .replace(
      /\[([^\]]+)\]\(((?:\/view\/[^)\s]+|https?:\/\/[^)\s]+))\)/g,
      (_, label) => String(label || '').trim() || 'link',
    )
    .trim();
}

/** Raw markdown body for clipboard. */
export function formatChatMessageMarkdownCopy(msg: any) {
  if (isChatMessageEncrypted(msg)) {
    return '암호화된 메시지';
  }
  return String(msg?.body ?? '').replace(/\n+$/, '');
}

/**
 * Parse `<!-- chat-with-myself ... -->` metadata from a note body.
 * @returns {{ id: string, at: string, group: string, href: string, notePath: string } | null}
 */
export function parseChatWithMyselfNoteMeta(markdown: any) {
  const text = String(markdown ?? '');
  const match = text.match(/<!--\s*chat-with-myself\s+([^>]*?)-->/);
  if (!match) return null;
  const attrs = parseAttrs(match[1] || '');
  // @ts-expect-error TS(2339): Property 'id' does not exist on type '{}'.
  const id = attrs.id || '';
  // @ts-expect-error TS(2339): Property 'href' does not exist on type '{}'.
  if (!id && !attrs.href) return null;
  // @ts-expect-error TS(2339): Property 'href' does not exist on type '{}'.
  const href = attrs.href || chatMessageUrl(id);
  return {
    id,
    // @ts-expect-error TS(2339): Property 'at' does not exist on type '{}'.
    at: attrs.at || '',
    // @ts-expect-error TS(2339): Property 'group' does not exist on type '{}'.
    group: unescapeAttr(attrs.group || ''),
    href,
    // @ts-expect-error TS(2339): Property 'notePath' does not exist on type '{}'.
    notePath: unescapeAttr(attrs.notePath || attrs['note-path'] || ''),
  };
}

/**
 * React Router location for a chat message deep-link.
 * Path is basename-relative (`/chat`); Router applies Vite `BASE_URL`.
 * @param {{ id?: string, href?: string } | null | undefined} meta
 */
export function chatSavedNoteLinkTo(meta: any) {
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
 * @param {ChatMessage} msg
 * @param {string} [timeZone]
 * @param {string} [notePath]
 * @param {{ threadMessages?: ChatMessage[] }} [options]
 */
export function formatChatMessageAsNoteMarkdown(
  msg: any,
  timeZone: any,
  notePath = '',
  options = {},
) {
  const group = msg?.group || '나';
  const at = msg?.at || '';
  const msgId = msg?.id || '';
  const chatHref = chatMessageUrl(msgId);
  const when = formatNoteDateTime(at, timeZone);
  const body = String(msg?.body ?? '').replace(/\n+$/, '');
  const notePathAttr = notePath ? ` notePath="${escapeAttr(notePath)}"` : '';
  // @ts-expect-error TS(2339): Property 'threadMessages' does not exist on type '... Remove this comment to see the full error message
  const threadMessages = Array.isArray(options.threadMessages)
    // @ts-expect-error TS(2339): Property 'threadMessages' does not exist on type '... Remove this comment to see the full error message
    ? options.threadMessages.filter(Boolean)
    : [];

  /** @type {string[]} */
  const threadParts = [];
  if (threadMessages.length > 0) {
    threadParts.push('### 원본 메시지', '');
    for (let i = 0; i < threadMessages.length; i += 1) {
      if (i > 0) threadParts.push('', '---', '');
      threadParts.push(formatNoteThreadMessageBlock(threadMessages[i], timeZone));
    }
    threadParts.push('', '### 답장', '');
  }

  return [
    `<!-- chat-with-myself id="${escapeAttr(msgId)}" at="${escapeAttr(at)}" group="${escapeAttr(group)}" href="${escapeAttr(chatHref)}"${notePathAttr} -->`,
    '',
    `> ${group} · ${when}`,
    '',
    `[채팅에서 저장된 노트](${chatHref})`,
    '',
    ...threadParts,
    body,
    '',
  ].join('\n');
}

/**
 * @param {string} at
 * @param {string} [timeZone]
 */
function formatNoteDateTime(at: any, timeZone: any) {
  if (!at) return '';
  try {
    return new Intl.DateTimeFormat(undefined, {
      timeZone: timeZone || undefined,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(at));
  } catch {
    return String(at);
  }
}

/**
 * @param {ChatMessage} msg
 * @param {string} [timeZone]
 */
function formatNoteThreadMessageBlock(msg: any, timeZone: any) {
  const group = msg?.group || '나';
  const when = formatNoteDateTime(msg?.at || '', timeZone);
  const body = String(msg?.body ?? '').replace(/\n+$/, '');
  const header = when ? `**${group}** · ${when}` : `**${group}**`;
  return [header, '', body].join('\n');
}

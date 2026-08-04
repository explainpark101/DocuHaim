import {
  ChatPreconditionFailedError,
  createChatBackend,
} from './backends/index.js';
import {
  CHAT_FOLDER,
  dayFileKey,
  detectTimeZone,
  localDateString,
  metaKey,
  messageEditsFolder,
  messageEditVersionKey,
  editVersionAtFromFileName,
  SELF_GROUP,
} from './paths.js';
import {
  createMessageId,
  mergeDayMessages,
  parseDayFile,
  serializeDayFile,
} from './format.js';
import {
  parseEditVersion,
  serializeEditVersion,
} from './editHistory.js';
import { cacheDay, getCachedDay, savePendingMessage } from './chatDb.js';

const MAX_WRITE_RETRIES = 5;

/**
 * @typedef {Object} ChatStorageCtx
 * @property {'s3'|'local'|'webdav'} mode
 * @property {import('@aws-sdk/client-s3').S3Client} [client]
 * @property {string} [bucket]
 * @property {FileSystemDirectoryHandle} [localRootHandle]
 * @property {{ endpoint: string, username: string, password: string, basePath: string }} [webdavConfig]
 */

/**
 * @param {ChatStorageCtx} ctx
 */
function backend(ctx) {
  return createChatBackend(ctx);
}

async function readText(ctx, key) {
  return backend(ctx).getText(key);
}

async function writeTextUnconditional(ctx, key, content, contentType) {
  const b = backend(ctx);
  await b.ensureChatFolder();
  if (ctx.mode === 'local') {
    return b.putTextIfMatch(key, content, contentType, null);
  }
  const meta = await b.headMeta(key);
  try {
    return await b.putTextIfMatch(
      key,
      content,
      contentType,
      meta?.etag || null,
    );
  } catch (e) {
    if (e instanceof ChatPreconditionFailedError) throw e;
    // Conditional headers unsupported → plain overwrite
    return b.putTextOverwrite(key, content, contentType);
  }
}

/**
 * Conditional day-file write with merge retry.
 * @param {ChatStorageCtx} ctx
 * @param {string} dateStr
 * @param {(parsed: ReturnType<typeof parseDayFile>) => ReturnType<typeof parseDayFile>} mutator
 */
async function mutateDayFile(ctx, dateStr, mutator) {
  const key = dayFileKey(dateStr);
  const b = backend(ctx);
  await b.ensureChatFolder();
  let lastErr;

  for (let attempt = 0; attempt < MAX_WRITE_RETRIES; attempt++) {
    const meta = await b.headMeta(key);
    const raw = (await b.getText(key)) || '';
    const parsed = parseDayFile(raw);
    const next = mutator(parsed);
    const content = serializeDayFile(next.messages, next.deletedAtById);
    // Avoid no-op puts (also reduces stale-poll races after conflict retries)
    if (content === raw) {
      await cacheDay(key, content);
      return next;
    }
    try {
      if (ctx.mode === 'local') {
        await b.putTextIfMatch(key, content, 'text/markdown; charset=utf-8', null);
      } else {
        await b.putTextIfMatch(
          key,
          content,
          'text/markdown; charset=utf-8',
          meta?.etag || null,
        );
      }
      await cacheDay(key, content);
      return next;
    } catch (e) {
      if (!(e instanceof ChatPreconditionFailedError)) throw e;
      lastErr = e;
    }
  }
  throw lastErr || new ChatPreconditionFailedError('Day file write conflict');
}

/**
 * Conditional meta write with retry (last-write-wins on groups union).
 * @param {ChatStorageCtx} ctx
 * @param {(meta: { timezone: string, groups: ChatGroup[] }) => { timezone: string, groups: ChatGroup[] }} mutator
 */
async function mutateMeta(ctx, mutator) {
  const key = metaKey();
  const b = backend(ctx);
  await b.ensureChatFolder();
  let lastErr;

  for (let attempt = 0; attempt < MAX_WRITE_RETRIES; attempt++) {
    const fileMeta = await b.headMeta(key);
    const existing = (await b.getText(key)) || '';
    const current = readMetaFromRaw(existing);
    const next = mutator(current);
    const payload = {
      timezone: next.timezone || detectTimeZone(),
      groups: sortGroupsKo(next.groups || []).map(serializeGroup),
    };
    const content = `${JSON.stringify(payload, null, 2)}\n`;
    if (content === existing) {
      return payload;
    }
    try {
      if (ctx.mode === 'local') {
        await b.putTextIfMatch(key, content, 'application/json', null);
      } else {
        await b.putTextIfMatch(
          key,
          content,
          'application/json',
          fileMeta?.etag || null,
        );
      }
      return payload;
    } catch (e) {
      if (!(e instanceof ChatPreconditionFailedError)) throw e;
      lastErr = e;
    }
  }
  throw lastErr || new ChatPreconditionFailedError('Meta write conflict');
}

/**
 * @typedef {{ id: string, name: string, iconPath?: string, aliases?: string[] }} ChatGroup
 */

/** @param {string} name */
export function stableGroupIdFromName(name) {
  let h = 2166136261;
  const s = String(name || '');
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return `g_${(h >>> 0).toString(16).padStart(8, '0')}`;
}

/** Random hash id for a new group (used as the stable link key). */
export function createGroupId() {
  const uuid =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID().replace(/-/g, '')
      : `${Date.now().toString(16)}${Math.random().toString(16).slice(2)}`;
  return `g_${uuid.slice(0, 16)}`;
}

/** @param {ChatGroup} g */
function serializeGroup(g) {
  /** @type {{ id: string, name: string, iconPath?: string, aliases?: string[] }} */
  const row = { id: g.id, name: g.name };
  if (g.iconPath) row.iconPath = g.iconPath;
  if (Array.isArray(g.aliases) && g.aliases.length) {
    row.aliases = [...g.aliases];
  }
  return row;
}

/**
 * Normalize legacy string[] / nameless objects from meta.json into { id, name, ... }.
 * @param {unknown} raw
 * @returns {ChatGroup[]}
 */
export function normalizeGroups(raw) {
  if (!Array.isArray(raw)) return [];
  const seenIds = new Set();
  const seenNames = new Set();
  /** @type {ChatGroup[]} */
  const out = [];
  for (const item of raw) {
    let name = '';
    /** @type {string|undefined} */
    let id;
    /** @type {string|undefined} */
    let iconPath;
    /** @type {string[]} */
    let aliases = [];
    if (typeof item === 'string') {
      name = item.trim();
    } else if (item && typeof item === 'object') {
      const obj = /** @type {{ id?: unknown, name?: unknown, iconPath?: unknown, aliases?: unknown }} */ (
        item
      );
      name = String(obj.name || '').trim();
      if (typeof obj.id === 'string' && obj.id.trim()) id = obj.id.trim();
      if (typeof obj.iconPath === 'string' && obj.iconPath.trim()) {
        iconPath = obj.iconPath.trim();
      }
      if (Array.isArray(obj.aliases)) {
        aliases = obj.aliases
          .map((a) => String(a || '').trim())
          .filter((a) => a && a !== SELF_GROUP && a !== name);
      }
    }
    if (!name || name === SELF_GROUP) continue;
    if (seenNames.has(name)) continue;
    const resolvedId = id || stableGroupIdFromName(name);
    if (seenIds.has(resolvedId)) continue;
    seenIds.add(resolvedId);
    seenNames.add(name);
    /** @type {ChatGroup} */
    const row = { id: resolvedId, name };
    if (iconPath) row.iconPath = iconPath;
    if (aliases.length) row.aliases = [...new Set(aliases)];
    out.push(row);
  }
  return out;
}

/**
 * @param {ChatGroup[]|string[]|unknown} groups
 * @param {string} key group id, display name, or legacy alias
 * @returns {ChatGroup|null}
 */
export function findGroup(groups, key) {
  const raw = String(key || '').trim();
  if (!raw || raw === SELF_GROUP) return null;
  const list = normalizeGroups(groups);
  return (
    list.find((g) => g.id === raw) ||
    list.find((g) => g.name === raw) ||
    list.find((g) => (g.aliases || []).includes(raw)) ||
    null
  );
}

/** @param {ChatGroup[]|string[]|unknown} groups @param {string} key */
export function resolveGroupLabel(groups, key) {
  const raw = String(key || '').trim();
  if (!raw || raw === SELF_GROUP) return SELF_GROUP;
  return findGroup(groups, raw)?.name || raw;
}

/** @param {ChatGroup[]|string[]|unknown} groups @param {string} key */
export function resolveGroupId(groups, key) {
  const raw = String(key || '').trim();
  if (!raw || raw === SELF_GROUP) return SELF_GROUP;
  return findGroup(groups, raw)?.id || raw;
}

/**
 * @param {ChatGroup[]|string[]|unknown} groups
 * @param {string} messageGroup
 * @param {string} filterKey
 */
export function groupMatches(groups, messageGroup, filterKey) {
  return resolveGroupId(groups, messageGroup) === resolveGroupId(groups, filterKey);
}

function readMetaFromRaw(raw) {
  if (!raw) {
    return { timezone: detectTimeZone(), groups: [] };
  }
  try {
    const parsed = JSON.parse(raw);
    return {
      timezone:
        typeof parsed.timezone === 'string' ? parsed.timezone : detectTimeZone(),
      groups: normalizeGroups(parsed.groups),
    };
  } catch {
    return { timezone: detectTimeZone(), groups: [] };
  }
}

export async function readMeta(ctx) {
  const raw = await readText(ctx, metaKey());
  return readMetaFromRaw(raw);
}

/**
 * @param {ChatGroup[]|string[]|unknown} groups
 * @returns {ChatGroup[]}
 */
export function sortGroupsKo(groups) {
  return [...normalizeGroups(groups)].sort((a, b) =>
    a.name.localeCompare(b.name, 'ko'),
  );
}

/** @param {ChatGroup[]|string[]|unknown} groups */
export function groupNames(groups) {
  return sortGroupsKo(groups).map((g) => g.name);
}

/** @param {ChatGroup[]|string[]|unknown} groups @returns {Map<string, string>} id|name|alias → iconPath */
export function groupIconMap(groups) {
  /** @type {Map<string, string>} */
  const map = new Map();
  for (const g of normalizeGroups(groups)) {
    if (!g.iconPath) continue;
    map.set(g.id, g.iconPath);
    map.set(g.name, g.iconPath);
    for (const a of g.aliases || []) map.set(a, g.iconPath);
  }
  return map;
}

/** @param {ChatGroup[]|string[]|unknown} groups @returns {Map<string, string>} id|name|alias → display name */
export function groupLabelMap(groups) {
  /** @type {Map<string, string>} */
  const map = new Map();
  map.set(SELF_GROUP, SELF_GROUP);
  for (const g of normalizeGroups(groups)) {
    map.set(g.id, g.name);
    map.set(g.name, g.name);
    for (const a of g.aliases || []) map.set(a, g.name);
  }
  return map;
}

export async function writeMeta(ctx, meta) {
  return mutateMeta(ctx, (current) => ({
    timezone: meta.timezone || current.timezone || detectTimeZone(),
    // Prefer explicit groups from caller; fall back to freshly read groups on retry
    groups: meta.groups != null ? normalizeGroups(meta.groups) : current.groups || [],
  }));
}

export async function touchTimezone(ctx) {
  const meta = await readMeta(ctx);
  const tz = detectTimeZone();
  if (meta.timezone === tz) return meta;
  // Only bump timezone; keep concurrent group edits from other devices
  return mutateMeta(ctx, (current) => ({
    timezone: tz,
    groups: current.groups || [],
  }));
}

/**
 * @param {ChatStorageCtx} ctx
 * @param {string} name
 * @param {{ iconPath?: string }} [options]
 * @returns {Promise<ChatGroup[]>}
 */
export async function addGroup(ctx, name, options = {}) {
  const trimmed = String(name || '').trim();
  if (!trimmed || trimmed === SELF_GROUP) {
    throw new Error('Invalid group name');
  }
  const iconPath =
    typeof options.iconPath === 'string' && options.iconPath.trim()
      ? options.iconPath.trim()
      : undefined;
  const payload = await mutateMeta(ctx, (meta) => {
    const groups = normalizeGroups(meta.groups);
    const existing = groups.find(
      (g) => g.name === trimmed || (g.aliases || []).includes(trimmed),
    );
    if (existing) {
      if (iconPath) {
        existing.iconPath = iconPath;
      }
      return { timezone: detectTimeZone(), groups };
    }
    /** @type {ChatGroup} */
    const row = { id: createGroupId(), name: trimmed };
    if (iconPath) row.iconPath = iconPath;
    groups.push(row);
    return { timezone: detectTimeZone(), groups };
  });
  return sortGroupsKo(payload.groups);
}

/**
 * @param {ChatStorageCtx} ctx
 * @param {string} groupId
 * @param {string} iconPath
 * @returns {Promise<ChatGroup[]>}
 */
export async function setGroupIcon(ctx, groupId, iconPath) {
  const id = String(groupId || '').trim();
  if (!id || id === SELF_GROUP) {
    throw new Error('Invalid group id');
  }
  const path = String(iconPath || '').trim();
  if (!path) {
    throw new Error('Invalid icon path');
  }
  const payload = await mutateMeta(ctx, (meta) => {
    const groups = normalizeGroups(meta.groups);
    const idx = groups.findIndex(
      (g) => g.id === id || g.name === id || (g.aliases || []).includes(id),
    );
    if (idx < 0) {
      throw new Error('Group not found');
    }
    groups[idx] = { ...groups[idx], iconPath: path };
    return { timezone: detectTimeZone(), groups };
  });
  return sortGroupsKo(payload.groups);
}

/**
 * Rename a group by id. Previous name is kept in aliases so legacy messages still resolve.
 * @param {ChatStorageCtx} ctx
 * @param {string} groupId
 * @param {string} newName
 * @returns {Promise<ChatGroup[]>}
 */
export async function renameGroup(ctx, groupId, newName) {
  const id = String(groupId || '').trim();
  const trimmed = String(newName || '').trim();
  if (!id || id === SELF_GROUP) {
    throw new Error('Invalid group id');
  }
  if (!trimmed || trimmed === SELF_GROUP) {
    throw new Error('Invalid group name');
  }
  const payload = await mutateMeta(ctx, (meta) => {
    const groups = normalizeGroups(meta.groups);
    const idx = groups.findIndex(
      (g) => g.id === id || g.name === id || (g.aliases || []).includes(id),
    );
    if (idx < 0) {
      throw new Error('Group not found');
    }
    const prev = groups[idx];
    if (prev.name === trimmed) {
      return { timezone: detectTimeZone(), groups };
    }
    if (
      groups.some(
        (g, i) =>
          i !== idx &&
          (g.name === trimmed || (g.aliases || []).includes(trimmed)),
      )
    ) {
      throw new Error('Group name already exists');
    }
    const aliases = new Set(prev.aliases || []);
    aliases.add(prev.name);
    aliases.delete(trimmed);
    groups[idx] = {
      ...prev,
      name: trimmed,
      aliases: [...aliases],
    };
    return { timezone: detectTimeZone(), groups };
  });
  return sortGroupsKo(payload.groups);
}

export async function listDayKeys(ctx) {
  return backend(ctx).listDayKeys();
}

/**
 * @returns {Promise<import('./format.js').ChatMessage[]>}
 */
export async function readDayMessages(ctx, dateStr) {
  const key = dayFileKey(dateStr);
  const cached = await getCachedDay(key);
  let content = await readText(ctx, key);
  if (content == null && cached?.content) content = cached.content;
  if (content == null) return [];
  await cacheDay(key, content);
  return parseDayFile(content).messages.map((m) => ({ ...m, dateStr }));
}

/**
 * Full day parse including tombstones (for sync/merge).
 */
export async function readDayFileParsed(ctx, dateStr) {
  const key = dayFileKey(dateStr);
  const content = (await readText(ctx, key)) || '';
  const parsed = parseDayFile(content);
  return {
    ...parsed,
    messages: parsed.messages.map((m) => ({ ...m, dateStr })),
    content,
  };
}

export async function appendChatMessage(
  ctx,
  { body, group, source = 'compose', replyTo = '', replySnippet = '', replyGroup = '' },
) {
  const result = await appendChatMessages(ctx, [
    { body, group, source, replyTo, replySnippet, replyGroup },
  ]);
  return {
    msg: result.msgs[0],
    dateStr: result.dateStr,
    key: result.key,
  };
}

/**
 * Append one or more messages with conditional day-file write.
 * @param {ChatStorageCtx} ctx
 * @param {Array<{ id?: string, body: string, group?: string, source?: string, replyTo?: string, replySnippet?: string, replyGroup?: string, at?: string, tz?: string }>} items
 */
export async function appendChatMessages(ctx, items = []) {
  const list = Array.isArray(items) ? items.filter(Boolean) : [];
  if (!list.length) return { msgs: [], dateStr: null, key: null };

  const tz = detectTimeZone();
  const dateStr = localDateString(new Date(), tz);
  const key = dayFileKey(dateStr);
  const baseMs = Date.now();
  const msgs = list.map((item, i) => ({
    id: item.id || createMessageId(),
    at: item.at || new Date(baseMs + i).toISOString(),
    tz: item.tz || tz,
    source: item.source || 'compose',
    group: item.group || SELF_GROUP,
    body: String(item.body ?? ''),
    replyTo: item.replyTo || '',
    replySnippet: item.replySnippet || '',
    replyGroup: item.replyGroup || '',
    dateStr,
  }));

  try {
    await mutateDayFile(ctx, dateStr, (parsed) => {
      const remoteLike = {
        messages: msgs,
        deletedIds: [],
        deletedAtById: {},
      };
      return mergeDayMessages(parsed, remoteLike);
    });
    try {
      await touchTimezone(ctx);
    } catch {
      /* ignore */
    }
    return { msgs, dateStr, key };
  } catch (err) {
    for (const msg of msgs) {
      try {
        await savePendingMessage({
          dayKey: key,
          dateStr,
          message: msg,
          error: String(err?.message || err),
        });
      } catch {
        /* ignore */
      }
    }
    throw err;
  }
}

/**
 * Remove a message from its day file (adds tombstone).
 * @returns {Promise<boolean>} true if removed or already tombstoned
 */
export async function deleteChatMessage(ctx, dateStr, messageId) {
  if (!dateStr || !messageId) return false;
  let removed = false;
  await mutateDayFile(ctx, dateStr, (parsed) => {
    removed = false;
    const hadLive = parsed.messages.some((m) => m.id === messageId);
    const hadTomb = Boolean(parsed.deletedAtById?.[messageId]);
    if (!hadLive && !hadTomb) return parsed;
    removed = true;
    const deletedAtById = {
      ...(parsed.deletedAtById || {}),
      [messageId]: new Date().toISOString(),
    };
    return {
      messages: parsed.messages.filter((m) => m.id !== messageId),
      deletedIds: Object.keys(deletedAtById),
      deletedAtById,
    };
  });
  return removed;
}

/**
 * Patch message metadata without creating edit history (pin, note link, etc.).
 * @returns {Promise<object | null>}
 */
export async function patchChatMessageMeta(ctx, dateStr, messageId, fields = {}) {
  if (!dateStr || !messageId) return null;
  /** @type {object | null} */
  let updated = null;
  await mutateDayFile(ctx, dateStr, (parsed) => {
    updated = null;
    const idx = parsed.messages.findIndex((m) => m.id === messageId);
    if (idx < 0) return parsed;
    const prev = parsed.messages[idx];
    const next = { ...prev, dateStr };
    if (fields.pinnedAt !== undefined) {
      next.pinnedAt = fields.pinnedAt ? String(fields.pinnedAt) : '';
    }
    if (fields.notePath !== undefined) {
      next.notePath = fields.notePath ? String(fields.notePath) : '';
    }
    updated = next;
    const messages = parsed.messages.slice();
    messages[idx] = next;
    return {
      messages,
      deletedIds: parsed.deletedIds,
      deletedAtById: parsed.deletedAtById,
    };
  });
  return updated;
}

/**
 * Update an existing message body/group in its day file.
 * Preserves original `at`; sets `editedAt`.
 * Previous body/group is archived under `.chat-with-myself/edits/<id>/<editedAt>.md`.
 * @returns {Promise<object | null>} updated message or null
 */
export async function updateChatMessage(ctx, dateStr, messageId, patch = {}) {
  if (!dateStr || !messageId) return null;
  /** @type {object | null} */
  let updated = null;
  /** @type {{ at: string, body: string, group: string } | null} */
  let archived = null;
  await mutateDayFile(ctx, dateStr, (parsed) => {
    updated = null;
    archived = null;
    const idx = parsed.messages.findIndex((m) => m.id === messageId);
    if (idx < 0) return parsed;
    const prev = parsed.messages[idx];
    const nextBody =
      patch.body !== undefined ? String(patch.body ?? '') : prev.body;
    const nextGroup =
      patch.group !== undefined ? patch.group || SELF_GROUP : prev.group;
    const bodyChanged = nextBody !== prev.body;
    const groupChanged = nextGroup !== (prev.group || SELF_GROUP);
    if (bodyChanged || groupChanged) {
      archived = {
        at: prev.editedAt || prev.at,
        body: prev.body,
        group: prev.group || SELF_GROUP,
      };
    }
    updated = {
      ...prev,
      body: nextBody,
      group: nextGroup,
      editedAt: new Date().toISOString(),
      // Stop embedding history in the day file; keep empty for serializers.
      editHistory: [],
      dateStr,
    };
    const messages = parsed.messages.slice();
    messages[idx] = updated;
    return {
      messages,
      deletedIds: parsed.deletedIds,
      deletedAtById: parsed.deletedAtById,
    };
  });

  if (archived && messageId) {
    try {
      await writeMessageEditVersion(ctx, messageId, archived);
    } catch {
      // Day file already updated; history write is best-effort.
    }
  }
  return updated;
}

/**
 * Archive one previous message version as markdown under the message edits folder.
 * @param {ChatStorageCtx} ctx
 * @param {string} messageId
 * @param {{ at?: string, body?: string, group?: string }} entry
 */
export async function writeMessageEditVersion(ctx, messageId, entry) {
  const id = String(messageId || '').trim();
  if (!id) throw new Error('Invalid message id');
  const at = entry?.at || new Date().toISOString();
  const key = messageEditVersionKey(id, at);
  const content = serializeEditVersion({
    at,
    body: entry?.body ?? '',
    group: entry?.group || SELF_GROUP,
  });
  const b = backend(ctx);
  await b.ensureChatFolder();
  await b.putTextOverwrite(key, content, 'text/markdown; charset=utf-8');
  return key;
}

/**
 * List edit-version object keys for a message (newest filename first).
 * @param {ChatStorageCtx} ctx
 * @param {string} messageId
 * @returns {Promise<string[]>}
 */
export async function listMessageEditVersionKeys(ctx, messageId) {
  const id = String(messageId || '').trim();
  if (!id) return [];
  const prefix = messageEditsFolder(id);
  try {
    const keys = await backend(ctx).listKeys(prefix);
    return keys
      .filter((k) => k.toLowerCase().endsWith('.md'))
      .sort((a, b) => b.localeCompare(a));
  } catch {
    return [];
  }
}

/**
 * Load edit versions with pagination (newest first).
 * Also surfaces legacy inline `editHistory` after file-backed versions when provided.
 *
 * @param {ChatStorageCtx} ctx
 * @param {string} messageId
 * @param {{
 *   offset?: number,
 *   limit?: number,
 *   legacyEntries?: Array<{ at?: string, body?: string, group?: string }>,
 * }} [options]
 * @returns {Promise<{ entries: Array<{ at: string, body: string, group: string, key?: string }>, nextOffset: number, hasMore: boolean, total: number }>}
 */
export async function loadMessageEditHistoryPage(
  ctx,
  messageId,
  options = {},
) {
  const offset = Math.max(0, Number(options.offset) || 0);
  const limit = Math.min(50, Math.max(1, Number(options.limit) || 10));
  const keys = await listMessageEditVersionKeys(ctx, messageId);

  const legacyRaw = Array.isArray(options.legacyEntries)
    ? options.legacyEntries
    : [];
  const keyAts = new Set(
    keys.map((k) => editVersionAtFromFileName(k)).filter(Boolean),
  );
  const legacy = legacyRaw
    .map((e) => ({
      at: String(e?.at || ''),
      body: String(e?.body ?? ''),
      group: String(e?.group || SELF_GROUP),
    }))
    .filter((e) => e.at && !keyAts.has(e.at))
    .sort((a, b) => String(b.at).localeCompare(String(a.at)));

  const total = keys.length + legacy.length;
  if (offset >= total) {
    return { entries: [], nextOffset: offset, hasMore: false, total };
  }

  /** @type {Array<{ at: string, body: string, group: string, key?: string }>} */
  const entries = [];
  let cursor = offset;

  while (entries.length < limit && cursor < total) {
    if (cursor < keys.length) {
      const key = keys[cursor];
      cursor += 1;
      const raw = await readText(ctx, key);
      if (raw == null) continue;
      const parsed = parseEditVersion(raw, { key });
      if (!parsed) continue;
      if (!parsed.at) {
        parsed.at = editVersionAtFromFileName(key) || '';
      }
      entries.push(parsed);
    } else {
      const legacyIdx = cursor - keys.length;
      cursor += 1;
      const item = legacy[legacyIdx];
      if (item) entries.push(item);
    }
  }

  return {
    entries,
    nextOffset: cursor,
    hasMore: cursor < total,
    total,
  };
}

/**
 * Find a message by id, scanning day files newest-first.
 * @returns {Promise<{ msg: object, dateStr: string } | null>}
 */
export async function findMessageById(ctx, messageId, { maxDays = 90 } = {}) {
  if (!messageId) return null;
  const keys = await listDayKeys(ctx);
  const limit = Math.min(keys.length, maxDays);
  for (let i = 0; i < limit; i++) {
    const dateStr = keys[i];
    const msgs = await readDayMessages(ctx, dateStr);
    const found = msgs.find((m) => m.id === messageId);
    if (found) return { msg: found, dateStr };
  }
  return null;
}

export async function readOgArchive(ctx, key) {
  const raw = await readText(ctx, key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function writeOgArchive(ctx, key, data) {
  await writeTextUnconditional(
    ctx,
    key,
    `${JSON.stringify(data, null, 2)}\n`,
    'application/json',
  );
}

export function createOgStorageAdapters(ctx) {
  return {
    readArchive: (key) => readOgArchive(ctx, key),
    writeArchive: (key, data) => writeOgArchive(ctx, key, data),
  };
}

/** Rewrite entire day file (e.g. after merges) — preserves tombstones when provided */
export async function writeDayMessages(ctx, dateStr, messages, deletedAtById = {}) {
  await mutateDayFile(ctx, dateStr, (parsed) =>
    mergeDayMessages(parsed, {
      messages: messages || [],
      deletedIds: Object.keys(deletedAtById || {}),
      deletedAtById: deletedAtById || {},
    }),
  );
}

/**
 * Flush pending IndexedDB messages with conditional append.
 * Writes into the original day file when `dateStr`/`dayKey` is known (not always today).
 * Does not re-queue via appendChatMessages (avoids duplicate pending rows on failure).
 * @param {ChatStorageCtx} ctx
 * @param {{ getPendingMessages: () => Promise<any[]>, deletePendingMessage: (id: number) => Promise<void> }} db
 */
export async function flushPendingMessages(ctx, db) {
  const pending = await db.getPendingMessages();
  if (!pending?.length) return { flushed: 0, dateStrs: [] };
  let flushed = 0;
  const dateStrs = new Set();
  for (const row of pending) {
    const msg = row.message;
    if (!msg?.id) {
      await db.deletePendingMessage(row.id);
      continue;
    }
    const tz = msg.tz || detectTimeZone();
    let dateStr = row.dateStr || msg.dateStr || '';
    if (!dateStr && typeof row.dayKey === 'string') {
      const m = row.dayKey.match(/(\d{4}-\d{2}-\d{2})/);
      if (m) dateStr = m[1];
    }
    if (!dateStr) {
      dateStr = localDateString(new Date(msg.at || Date.now()), tz);
    }
    try {
      await mutateDayFile(ctx, dateStr, (parsed) =>
        mergeDayMessages(parsed, {
          messages: [{ ...msg, dateStr }],
          deletedIds: [],
          deletedAtById: {},
        }),
      );
      await db.deletePendingMessage(row.id);
      flushed += 1;
      dateStrs.add(dateStr);
    } catch {
      /* keep pending */
    }
  }
  return { flushed, dateStrs: [...dateStrs] };
}

export { ChatPreconditionFailedError, createChatBackend, CHAT_FOLDER };
export { mergeDayMessages, parseDayFile, serializeDeletedMarker } from './format.js';

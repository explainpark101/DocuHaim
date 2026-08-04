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
  SELF_GROUP,
} from './paths.js';
import {
  createMessageId,
  mergeDayMessages,
  parseDayFile,
  serializeDayFile,
} from './format.js';
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
 * @param {(meta: { timezone: string, groups: string[] }) => { timezone: string, groups: string[] }} mutator
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
      groups: sortGroupsKo(
        (next.groups || []).filter((g) => g && g !== SELF_GROUP),
      ),
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

function readMetaFromRaw(raw) {
  if (!raw) {
    return { timezone: detectTimeZone(), groups: [] };
  }
  try {
    const parsed = JSON.parse(raw);
    return {
      timezone:
        typeof parsed.timezone === 'string' ? parsed.timezone : detectTimeZone(),
      groups: Array.isArray(parsed.groups)
        ? parsed.groups.filter(
            (g) => typeof g === 'string' && g.trim() && g !== SELF_GROUP,
          )
        : [],
    };
  } catch {
    return { timezone: detectTimeZone(), groups: [] };
  }
}

export async function readMeta(ctx) {
  const raw = await readText(ctx, metaKey());
  return readMetaFromRaw(raw);
}

export function sortGroupsKo(groups) {
  return [...groups].sort((a, b) => a.localeCompare(b, 'ko'));
}

export async function writeMeta(ctx, meta) {
  return mutateMeta(ctx, (current) => ({
    timezone: meta.timezone || current.timezone || detectTimeZone(),
    // Prefer explicit groups from caller; fall back to freshly read groups on retry
    groups: meta.groups != null ? meta.groups : current.groups || [],
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

export async function addGroup(ctx, name) {
  const trimmed = String(name || '').trim();
  if (!trimmed || trimmed === SELF_GROUP) {
    throw new Error('Invalid group name');
  }
  const payload = await mutateMeta(ctx, (meta) => {
    const groups = [...(meta.groups || [])];
    if (!groups.includes(trimmed)) groups.push(trimmed);
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
 * Update an existing message body/group in its day file.
 * Preserves original `at`; sets `editedAt`.
 * @returns {Promise<object | null>} updated message or null
 */
export async function updateChatMessage(ctx, dateStr, messageId, patch = {}) {
  if (!dateStr || !messageId) return null;
  /** @type {object | null} */
  let updated = null;
  await mutateDayFile(ctx, dateStr, (parsed) => {
    updated = null;
    const idx = parsed.messages.findIndex((m) => m.id === messageId);
    if (idx < 0) return parsed;
    const prev = parsed.messages[idx];
    const nextBody =
      patch.body !== undefined ? String(patch.body ?? '') : prev.body;
    const nextGroup =
      patch.group !== undefined ? patch.group || SELF_GROUP : prev.group;
    const prevHistory = Array.isArray(prev.editHistory) ? prev.editHistory : [];
    const bodyChanged = nextBody !== prev.body;
    const groupChanged = nextGroup !== (prev.group || SELF_GROUP);
    const editHistory =
      bodyChanged || groupChanged
        ? [
            ...prevHistory,
            {
              at: prev.editedAt || prev.at,
              body: prev.body,
              group: prev.group || SELF_GROUP,
            },
          ]
        : prevHistory;
    updated = {
      ...prev,
      body: nextBody,
      group: nextGroup,
      editedAt: new Date().toISOString(),
      editHistory,
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
  return updated;
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

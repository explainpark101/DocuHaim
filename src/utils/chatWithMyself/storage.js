import { getObjectBody, listObjectsV2, putObject } from '@/utils/s3Client';
import {
  getLocalDirectoryHandleForPath,
  getLocalFileHandleForPath,
} from '@/utils/localEditorImage';
import {
  CHAT_FOLDER,
  chatFolderPrefix,
  dayFileKey,
  detectTimeZone,
  localDateString,
  metaKey,
  SELF_GROUP,
} from './paths.js';
import {
  appendMessageToContent,
  createMessageId,
  parseDayFile,
  serializeDayFile,
} from './format.js';
import { cacheDay, getCachedDay, savePendingMessage } from './chatDb.js';

function decodeBody(body) {
  if (typeof body === 'string') return body;
  return new TextDecoder().decode(body);
}

/**
 * @typedef {Object} ChatStorageCtx
 * @property {'s3'|'local'} mode
 * @property {import('@aws-sdk/client-s3').S3Client} [client]
 * @property {string} [bucket]
 * @property {FileSystemDirectoryHandle} [localRootHandle]
 */

async function ensureChatFolder(ctx) {
  if (ctx.mode === 's3') {
    await putObject(ctx.client, {
      Bucket: ctx.bucket,
      Key: chatFolderPrefix(),
      Body: '',
      ContentType: 'application/x-directory',
    });
    return;
  }
  if (!ctx.localRootHandle) throw new Error('Local folder not open');
  await ctx.localRootHandle.getDirectoryHandle(CHAT_FOLDER, { create: true });
}

async function readText(ctx, key) {
  if (ctx.mode === 's3') {
    try {
      const { body } = await getObjectBody(ctx.client, ctx.bucket, key);
      return decodeBody(body);
    } catch (e) {
      if (
        e?.name === 'NoSuchKey' ||
        e?.$metadata?.httpStatusCode === 404 ||
        e?.Code === 'NoSuchKey'
      ) {
        return null;
      }
      throw e;
    }
  }
  try {
    const handle = await getLocalFileHandleForPath(ctx.localRootHandle, key, {
      create: false,
    });
    const file = await handle.getFile();
    return await file.text();
  } catch {
    return null;
  }
}

async function writeText(ctx, key, content, contentType = 'text/plain; charset=utf-8') {
  await ensureChatFolder(ctx);
  if (ctx.mode === 's3') {
    // ensure og/ parent marker when writing nested keys
    if (key.includes('/og/')) {
      await putObject(ctx.client, {
        Bucket: ctx.bucket,
        Key: `${CHAT_FOLDER}/og/`,
        Body: '',
      });
    }
    await putObject(ctx.client, {
      Bucket: ctx.bucket,
      Key: key,
      Body: content,
      ContentType: contentType,
    });
    return;
  }
  const handle = await getLocalFileHandleForPath(ctx.localRootHandle, key, {
    create: true,
  });
  const writable = await handle.createWritable();
  try {
    await writable.write(content);
  } finally {
    await writable.close();
  }
}

export async function readMeta(ctx) {
  const raw = await readText(ctx, metaKey());
  if (!raw) {
    return { timezone: detectTimeZone(), groups: [] };
  }
  try {
    const parsed = JSON.parse(raw);
    return {
      timezone: typeof parsed.timezone === 'string' ? parsed.timezone : detectTimeZone(),
      groups: Array.isArray(parsed.groups)
        ? parsed.groups.filter((g) => typeof g === 'string' && g.trim() && g !== SELF_GROUP)
        : [],
    };
  } catch {
    return { timezone: detectTimeZone(), groups: [] };
  }
}

export function sortGroupsKo(groups) {
  return [...groups].sort((a, b) => a.localeCompare(b, 'ko'));
}

export async function writeMeta(ctx, meta) {
  const payload = {
    timezone: meta.timezone || detectTimeZone(),
    groups: sortGroupsKo(
      (meta.groups || []).filter((g) => g && g !== SELF_GROUP),
    ),
  };
  await writeText(ctx, metaKey(), `${JSON.stringify(payload, null, 2)}\n`, 'application/json');
  return payload;
}

export async function touchTimezone(ctx) {
  const meta = await readMeta(ctx);
  const tz = detectTimeZone();
  if (meta.timezone === tz) return meta;
  return writeMeta(ctx, { ...meta, timezone: tz });
}

export async function addGroup(ctx, name) {
  const trimmed = String(name || '').trim();
  if (!trimmed || trimmed === SELF_GROUP) {
    throw new Error('Invalid group name');
  }
  const meta = await readMeta(ctx);
  if (!meta.groups.includes(trimmed)) {
    meta.groups.push(trimmed);
  }
  meta.timezone = detectTimeZone();
  await writeMeta(ctx, meta);
  return sortGroupsKo(meta.groups);
}

export async function listDayKeys(ctx) {
  const prefix = chatFolderPrefix();
  if (ctx.mode === 's3') {
    const contents = await listObjectsV2(ctx.client, ctx.bucket, prefix);
    return contents
      .map((c) => c.Key)
      .filter((k) => k && /^\.chat-with-myself\/\d{4}-\d{2}-\d{2}\.md$/.test(k))
      .map((k) => k.slice(prefix.length, -3))
      .sort()
      .reverse();
  }
  try {
    const dir = await getLocalDirectoryHandleForPath(ctx.localRootHandle, CHAT_FOLDER, {
      create: false,
    });
    const days = [];
    for await (const [name, handle] of dir.entries()) {
      if (handle.kind === 'file' && /^\d{4}-\d{2}-\d{2}\.md$/.test(name)) {
        days.push(name.slice(0, -3));
      }
    }
    return days.sort().reverse();
  } catch {
    return [];
  }
}

export async function readDayMessages(ctx, dateStr) {
  const key = dayFileKey(dateStr);
  const cached = await getCachedDay(key);
  let content = await readText(ctx, key);
  if (content == null && cached?.content) content = cached.content;
  if (content == null) return [];
  await cacheDay(key, content);
  return parseDayFile(content).map((m) => ({ ...m, dateStr }));
}

export async function appendChatMessage(
  ctx,
  { body, group, source = 'compose', replyTo = '', replySnippet = '', replyGroup = '' },
) {
  const tz = detectTimeZone();
  const dateStr = localDateString(new Date(), tz);
  const key = dayFileKey(dateStr);
  const msg = {
    id: createMessageId(),
    at: new Date().toISOString(),
    tz,
    source,
    group: group || SELF_GROUP,
    body: String(body ?? ''),
    replyTo: replyTo || '',
    replySnippet: replySnippet || '',
    replyGroup: replyGroup || '',
    dateStr,
  };

  try {
    await ensureChatFolder(ctx);
    const existing = (await readText(ctx, key)) || '';
    const next = appendMessageToContent(existing, msg);
    await writeText(ctx, key, next, 'text/markdown; charset=utf-8');
    await cacheDay(key, next);
    try {
      const meta = await readMeta(ctx);
      if (meta.timezone !== tz) await writeMeta(ctx, { ...meta, timezone: tz });
    } catch {
      /* ignore */
    }
    return { msg, dateStr, key };
  } catch (err) {
    await savePendingMessage({
      dayKey: key,
      dateStr,
      message: msg,
      error: String(err?.message || err),
    });
    throw err;
  }
}

/**
 * Remove a message from its day file.
 * @returns {Promise<boolean>} true if removed
 */
export async function deleteChatMessage(ctx, dateStr, messageId) {
  if (!dateStr || !messageId) return false;
  const messages = await readDayMessages(ctx, dateStr);
  const next = messages.filter((m) => m.id !== messageId);
  if (next.length === messages.length) return false;
  await writeDayMessages(ctx, dateStr, next);
  return true;
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
  await writeText(ctx, key, `${JSON.stringify(data, null, 2)}\n`, 'application/json');
}

export function createOgStorageAdapters(ctx) {
  return {
    readArchive: (key) => readOgArchive(ctx, key),
    writeArchive: (key, data) => writeOgArchive(ctx, key, data),
  };
}

/** Rewrite entire day file (e.g. after merges) */
export async function writeDayMessages(ctx, dateStr, messages) {
  const key = dayFileKey(dateStr);
  const content = serializeDayFile(messages);
  await writeText(ctx, key, content, 'text/markdown; charset=utf-8');
  await cacheDay(key, content);
}

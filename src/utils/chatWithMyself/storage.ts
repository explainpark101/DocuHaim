import {
  ChatPreconditionFailedError,
  createChatBackend,
  type ChatStorageCtx,
} from '@/utils/chatWithMyself/backends';
import {
  CHAT_FOLDER,
  dayFileKey,
  detectTimeZone,
  localDateString,
  metaKey,
  messageEditsFolder,
  messageEditVersionKey,
  SELF_GROUP,
} from '@/utils/chatWithMyself/paths.js';
import {
  createMessageId,
  mergeDayMessages,
  parseDayFile,
  serializeDayFile,
} from '@/utils/chatWithMyself/format.js';
import {
  serializeEditVersion,
  type ChatEditVersion,
} from '@/utils/chatWithMyself/editHistory.js';
import { cacheDay, getCachedDay, savePendingMessage } from '@/utils/chatWithMyself/chatDb.js';
import {
  messageNeedsNoteUnlink,
  pathAffectedByDelete,
} from '@/utils/chatWithMyself/noteRefs.js';
import { getStorageScopeId } from '@/utils/storageScope';
import { notifyAdvancedSearchChange } from '@/utils/advancedSearch/notify';
import {
  archiveChatEditVersion,
  deleteVersions,
  listVersions,
  loadVersionHistoryEnabled,
  purgeAllForTarget,
  readChatVersionDetails,
} from '@/utils/versionHistory';
import { versionHistoryContextFromChat } from '@/utils/versionHistory/fromChatCtx';

export type { ChatStorageCtx };

const MAX_WRITE_RETRIES = 5;

export type ChatGroup = {
  id: string;
  name: string;
  iconPath?: string;
  aliases?: string[];
};

export type ChatMeta = {
  timezone: string;
  groups: ChatGroup[];
};

export type ChatMessage = {
  id: string;
  at: string;
  body: string;
  group: string;
  tz?: string;
  source?: string;
  markdown?: boolean | string;
  encrypted?: boolean | string;
  replyTo?: string;
  replySnippet?: string;
  replyGroup?: string;
  dateStr?: string;
  editedAt?: string;
  pinnedAt?: string;
  notePath?: string;
  collapsed?: string;
  reactions?: unknown[];
  reactionsAt?: string;
  editHistory?: Array<{ at: string; body: string; group: string }>;
};

export type DayParsed = {
  messages: ChatMessage[];
  deletedIds: string[];
  deletedAtById: Record<string, string>;
};

export type AppendChatItem = {
  id?: string;
  body: string;
  group?: string;
  source?: string;
  replyTo?: string;
  replySnippet?: string;
  replyGroup?: string;
  at?: string;
  tz?: string;
  markdown?: boolean | string;
  encrypted?: boolean | string;
};

export type ChatEditVersionEntry = {
  at?: string;
  body?: string;
  group?: string;
  key?: string;
  id?: string;
};

export type PatchChatMessageMetaFields = {
  pinnedAt?: string | null;
  notePath?: string | null;
  collapsed?: boolean | string | null;
  reactions?: unknown[] | null;
  reactionsAt?: string | null;
};

export type UpdateChatMessagePatch = {
  body?: string;
  group?: string;
  markdown?: boolean | string;
  encrypted?: boolean | string;
};

function backend(ctx: ChatStorageCtx) {
  return createChatBackend(ctx);
}

function scopeOf(ctx: ChatStorageCtx) {
  const input: Parameters<typeof getStorageScopeId>[0] = { mode: ctx.mode };
  if (ctx.bucket) input.bucket = ctx.bucket;
  if (ctx.localRootHandle) input.localRootHandle = ctx.localRootHandle;
  if (ctx.webdavConfig) input.webdavConfig = ctx.webdavConfig;
  return getStorageScopeId(input);
}

function asDayParsed(raw: unknown): DayParsed {
  const p = raw as Partial<DayParsed> | null | undefined;
  return {
    messages: Array.isArray(p?.messages) ? (p.messages as ChatMessage[]) : [],
    deletedIds: Array.isArray(p?.deletedIds) ? p.deletedIds.map(String) : [],
    deletedAtById:
      p?.deletedAtById && typeof p.deletedAtById === 'object'
        ? (p.deletedAtById as Record<string, string>)
        : {},
  };
}

async function readText(ctx: ChatStorageCtx, key: string) {
  return backend(ctx).getText(key);
}

async function writeTextUnconditional(
  ctx: ChatStorageCtx,
  key: string,
  content: string,
  contentType: string,
) {
  const b = backend(ctx);
  await b.ensureChatFolder();
  if (ctx.mode === 'local' || ctx.mode === 'idb') {
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

/** Conditional day-file write with merge retry. */
async function mutateDayFile(
  ctx: ChatStorageCtx,
  dateStr: string,
  mutator: (parsed: DayParsed) => DayParsed,
) {
  const key = dayFileKey(dateStr);
  const b = backend(ctx);
  await b.ensureChatFolder();
  let lastErr: unknown;

  for (let attempt = 0; attempt < MAX_WRITE_RETRIES; attempt++) {
    const meta = await b.headMeta(key);
    const raw = (await b.getText(key)) || '';
    const parsed = asDayParsed(parseDayFile(raw));
    const next = mutator(parsed);
    const content = serializeDayFile(
      next.messages as never,
      next.deletedAtById,
    );
    // Avoid no-op puts (also reduces stale-poll races after conflict retries)
    if (content === raw) {
      await cacheDay(scopeOf(ctx), key, content);
      return next;
    }
    try {
      if (ctx.mode === 'local' || ctx.mode === 'idb') {
        await b.putTextIfMatch(key, content, 'text/markdown; charset=utf-8', null);
      } else {
        await b.putTextIfMatch(
          key,
          content,
          'text/markdown; charset=utf-8',
          meta?.etag || null,
        );
      }
      await cacheDay(scopeOf(ctx), key, content);
      notifyAdvancedSearchChange({
        type: 'chatDay',
        dateStr,
        content,
      });
      return next;
    } catch (e) {
      if (!(e instanceof ChatPreconditionFailedError)) throw e;
      lastErr = e;
    }
  }
  throw lastErr || new ChatPreconditionFailedError('Day file write conflict');
}

/** Conditional meta write with retry (last-write-wins on groups union). */
async function mutateMeta(
  ctx: ChatStorageCtx,
  mutator: (meta: ChatMeta) => ChatMeta,
) {
  const key = metaKey();
  const b = backend(ctx);
  await b.ensureChatFolder();
  let lastErr: unknown;

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
      if (ctx.mode === 'local' || ctx.mode === 'idb') {
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

export function stableGroupIdFromName(name: string) {
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

function serializeGroup(g: ChatGroup): ChatGroup {
  const row: ChatGroup = { id: g.id, name: g.name };
  if (g.iconPath) row.iconPath = g.iconPath;
  if (Array.isArray(g.aliases) && g.aliases.length) {
    row.aliases = [...g.aliases];
  }
  return row;
}

/** Normalize legacy string[] / nameless objects from meta.json into { id, name, ... }. */
export function normalizeGroups(raw: unknown): ChatGroup[] {
  if (!Array.isArray(raw)) return [];
  const seenIds = new Set<string>();
  const seenNames = new Set<string>();
  const out: ChatGroup[] = [];
  for (const item of raw) {
    let name = '';
    let id: string | undefined;
    let iconPath: string | undefined;
    let aliases: string[] = [];
    if (typeof item === 'string') {
      name = item.trim();
    } else if (item && typeof item === 'object') {
      const obj = item as {
        id?: unknown;
        name?: unknown;
        iconPath?: unknown;
        aliases?: unknown;
      };
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
    const row: ChatGroup = { id: resolvedId, name };
    if (iconPath) row.iconPath = iconPath;
    if (aliases.length) row.aliases = [...new Set(aliases)];
    out.push(row);
  }
  return out;
}

/** Find group by id, display name, or legacy alias. */
export function findGroup(
  groups: ChatGroup[] | string[] | unknown,
  key: string,
): ChatGroup | null {
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

export function resolveGroupLabel(
  groups: ChatGroup[] | string[] | unknown,
  key: string,
): string {
  const raw = String(key || '').trim();
  if (!raw || raw === SELF_GROUP) return SELF_GROUP;
  return findGroup(groups, raw)?.name || raw;
}

export function resolveGroupId(
  groups: ChatGroup[] | string[] | unknown,
  key: string,
): string {
  const raw = String(key || '').trim();
  if (!raw || raw === SELF_GROUP) return SELF_GROUP;
  return findGroup(groups, raw)?.id || raw;
}

export function groupMatches(
  groups: ChatGroup[] | string[] | unknown,
  messageGroup: string,
  filterKey: string,
): boolean {
  return resolveGroupId(groups, messageGroup) === resolveGroupId(groups, filterKey);
}

function readMetaFromRaw(raw: string | null | undefined): ChatMeta {
  if (!raw) {
    return { timezone: detectTimeZone(), groups: [] };
  }
  try {
    const parsed = JSON.parse(raw) as { timezone?: unknown; groups?: unknown };
    return {
      timezone:
        typeof parsed.timezone === 'string' ? parsed.timezone : detectTimeZone(),
      groups: normalizeGroups(parsed.groups),
    };
  } catch {
    return { timezone: detectTimeZone(), groups: [] };
  }
}

export async function readMeta(ctx: ChatStorageCtx): Promise<ChatMeta> {
  const raw = await readText(ctx, metaKey());
  return readMetaFromRaw(raw);
}

export function sortGroupsKo(
  groups: ChatGroup[] | string[] | unknown,
): ChatGroup[] {
  return [...normalizeGroups(groups)].sort((a, b) =>
    a.name.localeCompare(b.name, 'ko'),
  );
}

export function groupNames(groups: ChatGroup[] | string[] | unknown): string[] {
  return sortGroupsKo(groups).map((g) => g.name);
}

/** id|name|alias → iconPath */
export function groupIconMap(
  groups: ChatGroup[] | string[] | unknown,
): Map<string, string> {
  const map = new Map<string, string>();
  for (const g of normalizeGroups(groups)) {
    if (!g.iconPath) continue;
    map.set(g.id, g.iconPath);
    map.set(g.name, g.iconPath);
    for (const a of g.aliases || []) map.set(a, g.iconPath);
  }
  return map;
}

/** id|name|alias → display name */
export function groupLabelMap(
  groups: ChatGroup[] | string[] | unknown,
): Map<string, string> {
  const map = new Map<string, string>();
  map.set(SELF_GROUP, SELF_GROUP);
  for (const g of normalizeGroups(groups)) {
    map.set(g.id, g.name);
    map.set(g.name, g.name);
    for (const a of g.aliases || []) map.set(a, g.name);
  }
  return map;
}

export async function writeMeta(
  ctx: ChatStorageCtx,
  meta: { timezone?: string; groups?: unknown },
): Promise<{ timezone: string; groups: ChatGroup[] }> {
  return mutateMeta(ctx, (current) => ({
    timezone: meta.timezone || current.timezone || detectTimeZone(),
    // Prefer explicit groups from caller; fall back to freshly read groups on retry
    groups: meta.groups != null ? normalizeGroups(meta.groups) : current.groups || [],
  }));
}

export async function touchTimezone(ctx: ChatStorageCtx) {
  const meta = await readMeta(ctx);
  const tz = detectTimeZone();
  if (meta.timezone === tz) return meta;
  // Only bump timezone; keep concurrent group edits from other devices
  return mutateMeta(ctx, (current) => ({
    timezone: tz,
    groups: current.groups || [],
  }));
}

export async function addGroup(
  ctx: ChatStorageCtx,
  name: string,
  options: { iconPath?: string } = {},
): Promise<ChatGroup[]> {
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
    const row: ChatGroup = { id: createGroupId(), name: trimmed };
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
export async function setGroupIcon(
  ctx: ChatStorageCtx,
  groupId: string,
  iconPath: string,
): Promise<ChatGroup[]> {
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
    const prev = groups[idx];
    if (!prev) throw new Error('Group not found');
    groups[idx] = serializeGroup({ ...prev, iconPath: path });
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
export async function renameGroup(
  ctx: ChatStorageCtx,
  groupId: string,
  newName: string,
): Promise<ChatGroup[]> {
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
    if (!prev) throw new Error('Group not found');
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
    groups[idx] = serializeGroup({
      ...prev,
      name: trimmed,
      aliases: [...aliases],
    });
    return { timezone: detectTimeZone(), groups };
  });
  return sortGroupsKo(payload.groups);
}

export async function listDayKeys(ctx: ChatStorageCtx): Promise<string[]> {
  return backend(ctx).listDayKeys();
}

/**
 * @returns {Promise<import('@/utils/chatWithMyself/format.js').ChatMessage[]>}
 */
export async function readDayMessages(
  ctx: ChatStorageCtx,
  dateStr: string,
): Promise<ChatMessage[]> {
  const key = dayFileKey(dateStr);
  const scope = scopeOf(ctx);
  const cached = await getCachedDay(scope, key);
  let content = await readText(ctx, key);
  if (content == null && cached?.content) content = cached.content;
  if (content == null) return [];
  await cacheDay(scope, key, content);
  return asDayParsed(parseDayFile(content)).messages.map((m) => ({ ...m, dateStr }));
}

/**
 * Full day parse including tombstones (for sync/merge).
 */
export async function readDayFileParsed(
  ctx: ChatStorageCtx,
  dateStr: string,
): Promise<DayParsed & { content: string }> {
  const key = dayFileKey(dateStr);
  const content = (await readText(ctx, key)) || '';
  const parsed = asDayParsed(parseDayFile(content));
  return {
    ...parsed,
    messages: parsed.messages.map((m) => ({ ...m, dateStr })),
    content,
  };
}

export async function appendChatMessage(
  ctx: ChatStorageCtx,
  {
    body,
    group,
    source = 'compose',
    replyTo = '',
    replySnippet = '',
    replyGroup = '',
  }: AppendChatItem,
) {
  const item: AppendChatItem = {
    body,
    source,
    replyTo,
    replySnippet,
    replyGroup,
  };
  if (group !== undefined) item.group = group;
  const result = await appendChatMessages(ctx, [item]);
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
export async function appendChatMessages(
  ctx: ChatStorageCtx,
  items: AppendChatItem[] = [],
) {
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
    markdown: item.markdown === true || item.markdown === '1' || item.markdown === 'true',
    encrypted:
      item.encrypted === true ||
      item.encrypted === '1' ||
      item.encrypted === 'true',
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
      return asDayParsed(mergeDayMessages(parsed as never, remoteLike as never));
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
          scope: scopeOf(ctx),
          dayKey: key,
          dateStr,
          message: msg,
          error: String((err as { message?: string })?.message || err),
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
export async function deleteChatMessage(
  ctx: ChatStorageCtx,
  dateStr: string,
  messageId: string,
): Promise<boolean> {
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
export async function patchChatMessageMeta(
  ctx: ChatStorageCtx,
  dateStr: string,
  messageId: string,
  fields: PatchChatMessageMetaFields = {},
): Promise<ChatMessage | null> {
  if (!dateStr || !messageId) return null;
  let updated: ChatMessage | null = null;
  await mutateDayFile(ctx, dateStr, (parsed) => {
    updated = null;
    const idx = parsed.messages.findIndex((m) => m.id === messageId);
    if (idx < 0) return parsed;
    const prev = parsed.messages[idx];
    if (!prev) return parsed;
    const next: ChatMessage = { ...prev, dateStr };
    if (fields.pinnedAt !== undefined) {
      next.pinnedAt = fields.pinnedAt ? String(fields.pinnedAt) : '';
    }
    if (fields.notePath !== undefined) {
      next.notePath = fields.notePath ? String(fields.notePath) : '';
    }
    if (fields.collapsed !== undefined) {
      next.collapsed =
        fields.collapsed === '1' ||
        fields.collapsed === true ||
        fields.collapsed === 'true'
          ? '1'
          : '';
    }
    if (fields.reactions !== undefined) {
      next.reactions = Array.isArray(fields.reactions) ? fields.reactions : [];
      next.reactionsAt =
        fields.reactionsAt !== undefined
          ? fields.reactionsAt
            ? String(fields.reactionsAt)
            : ''
          : next.reactions.length > 0
            ? new Date().toISOString()
            : '';
    } else if (fields.reactionsAt !== undefined) {
      next.reactionsAt = fields.reactionsAt ? String(fields.reactionsAt) : '';
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
export async function updateChatMessage(
  ctx: ChatStorageCtx,
  dateStr: string,
  messageId: string,
  patch: UpdateChatMessagePatch = {},
): Promise<ChatMessage | null> {
  if (!dateStr || !messageId) return null;
  let updated: ChatMessage | null = null;
  let archived: { at: string; body: string; group: string } | null = null;
  await mutateDayFile(ctx, dateStr, (parsed) => {
    updated = null;
    archived = null;
    const idx = parsed.messages.findIndex((m) => m.id === messageId);
    if (idx < 0) return parsed;
    const prev = parsed.messages[idx];
    if (!prev) return parsed;
    const nextBody =
      patch.body !== undefined ? String(patch.body ?? '') : prev.body;
    const nextGroup =
      patch.group !== undefined ? patch.group || SELF_GROUP : prev.group;
    const nextMarkdown =
      patch.markdown !== undefined
        ? patch.markdown === true ||
          patch.markdown === '1' ||
          patch.markdown === 'true'
        : prev.markdown === true ||
          prev.markdown === '1' ||
          prev.markdown === 'true';
    const nextEncrypted =
      patch.encrypted !== undefined
        ? patch.encrypted === true ||
          patch.encrypted === '1' ||
          patch.encrypted === 'true'
        : prev.encrypted === true ||
          prev.encrypted === '1' ||
          prev.encrypted === 'true';
    const bodyChanged = nextBody !== prev.body;
    const groupChanged = nextGroup !== (prev.group || SELF_GROUP);
    const prevMarkdown =
      prev.markdown === true ||
      prev.markdown === '1' ||
      prev.markdown === 'true';
    const markdownChanged = nextMarkdown !== prevMarkdown;
    const prevEncrypted =
      prev.encrypted === true ||
      prev.encrypted === '1' ||
      prev.encrypted === 'true';
    const encryptedChanged = nextEncrypted !== prevEncrypted;
    if (bodyChanged || groupChanged || markdownChanged || encryptedChanged) {
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
      markdown: nextMarkdown,
      encrypted: nextEncrypted,
      editedAt: new Date().toISOString(),
      // Stop embedding history in the day file; keep empty for serializers.
      editHistory: [],
      dateStr,
    } as ChatMessage;
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
 * Archive one previous message version (S3 native current.md or app ISO file).
 * @param {ChatStorageCtx} ctx
 * @param {string} messageId
 * @param {{ at?: string, body?: string, group?: string }} entry
 */
export async function writeMessageEditVersion(
  ctx: ChatStorageCtx,
  messageId: string,
  entry: ChatEditVersionEntry,
): Promise<string | null> {
  const id = String(messageId || '').trim();
  if (!id) throw new Error('Invalid message id');
  if (!loadVersionHistoryEnabled()) return null;
  const vh = versionHistoryContextFromChat(ctx);
  const key = await archiveChatEditVersion(vh, id, {
    at: entry?.at || new Date().toISOString(),
    body: entry?.body ?? '',
    group: entry?.group || SELF_GROUP,
  });
  if (key) return key;
  // Unexpected archive failure: fall back to ISO file write.
  const at = entry?.at || new Date().toISOString();
  const legacyKey = messageEditVersionKey(id, at);
  const content = serializeEditVersion({
    at,
    body: entry?.body ?? '',
    group: entry?.group || SELF_GROUP,
  });
  const b = backend(ctx);
  await b.ensureChatFolder();
  await b.putTextOverwrite(legacyKey, content, 'text/markdown; charset=utf-8');
  return legacyKey;
}

/**
 * List edit-version object keys for a message (newest filename first).
 * @param {ChatStorageCtx} ctx
 * @param {string} messageId
 * @returns {Promise<string[]>}
 */
export async function listMessageEditVersionKeys(
  ctx: ChatStorageCtx,
  messageId: string,
): Promise<string[]> {
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
  ctx: ChatStorageCtx,
  messageId: string,
  options: {
    offset?: number;
    limit?: number;
    legacyEntries?: Array<{ at?: string; body?: string; group?: string }>;
  } = {},
): Promise<{
  entries: ChatEditVersion[];
  nextOffset: number;
  hasMore: boolean;
  total: number;
}> {
  const offset = Math.max(0, Number(options.offset) || 0);
  const limit = Math.min(50, Math.max(1, Number(options.limit) || 10));
  const vh = versionHistoryContextFromChat(ctx);
  const versionEntries = await listVersions(vh, {
    kind: 'chatEdit',
    messageId: String(messageId || '').trim(),
  });

  const legacyRaw = Array.isArray(options.legacyEntries)
    ? options.legacyEntries
    : [];
  const keyAts = new Set(
    versionEntries.map((e) => e.at).filter(Boolean),
  );
  const legacy: ChatEditVersion[] = legacyRaw
    .map((e) => {
      const row: ChatEditVersion = {
        at: String(e?.at || ''),
        body: String(e?.body ?? ''),
        group: String(e?.group || SELF_GROUP),
        source: 'legacy-app',
      };
      if (e?.at) row.id = `inline:${e.at}`;
      return row;
    })
    .filter((e) => e.at && !keyAts.has(e.at))
    .sort((a, b) => String(b.at).localeCompare(String(a.at)));

  type CombinedMeta =
    | { kind: 'file'; entry: (typeof versionEntries)[number] }
    | { kind: 'inline'; entry: ChatEditVersion };
  const combinedMeta: CombinedMeta[] = [
    ...versionEntries.map((e) => ({ kind: 'file' as const, entry: e })),
    ...legacy.map((e) => ({ kind: 'inline' as const, entry: e })),
  ];
  const total = combinedMeta.length;
  if (offset >= total) {
    return { entries: [], nextOffset: offset, hasMore: false, total };
  }

  const entries: ChatEditVersion[] = [];
  let cursor = offset;

  while (entries.length < limit && cursor < total) {
    const row = combinedMeta[cursor];
    cursor += 1;
    if (!row) continue;
    if (row.kind === 'inline') {
      entries.push(row.entry);
      continue;
    }
    const ve = row.entry;
    try {
      const details = await readChatVersionDetails(
        vh,
        messageId,
        String(ve.id || ''),
      );
      const out: ChatEditVersion = {
        at: details.at || ve.at || '',
        body: details.body,
        group: details.group || SELF_GROUP,
        source: ve.source,
      };
      if (ve.key) out.key = ve.key;
      if (ve.id) out.id = ve.id;
      entries.push(out);
    } catch {
      /* skip unreadable */
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
 * Delete one file-backed edit version by object key.
 * @param {ChatStorageCtx} ctx
 * @param {string} key
 */
export async function deleteMessageEditVersion(
  ctx: ChatStorageCtx,
  key: string,
): Promise<void> {
  const path = String(key || '').trim();
  if (!path) return;
  try {
    await backend(ctx).deleteKey(path);
  } catch (e) {
    const status =
      (e as { status?: number; $metadata?: { httpStatusCode?: number } })?.status ??
      (e as { $metadata?: { httpStatusCode?: number } })?.$metadata?.httpStatusCode;
    if (status === 404) return;
    throw e;
  }
}

/**
 * Remove a legacy inline editHistory entry (no file key) from the day file.
 * @param {ChatStorageCtx} ctx
 * @param {string} dateStr
 * @param {string} messageId
 * @param {string} at
 * @returns {Promise<object | null>} updated message or null
 */
export async function removeLegacyEditHistoryEntry(
  ctx: ChatStorageCtx,
  dateStr: string,
  messageId: string,
  at: string,
): Promise<ChatMessage | null> {
  if (!dateStr || !messageId || !at) return null;
  let updated: ChatMessage | null = null;
  await mutateDayFile(ctx, dateStr, (parsed) => {
    updated = null;
    const idx = parsed.messages.findIndex((m) => m.id === messageId);
    if (idx < 0) return parsed;
    const prev = parsed.messages[idx];
    if (!prev) return parsed;
    const prevHist = Array.isArray(prev.editHistory) ? prev.editHistory : [];
    const nextHist = prevHist.filter((e) => String(e?.at || '') !== String(at));
    if (nextHist.length === prevHist.length) return parsed;
    updated = { ...prev, editHistory: nextHist, dateStr };
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
 * Clear all legacy inline editHistory on a message.
 * @param {ChatStorageCtx} ctx
 * @param {string} dateStr
 * @param {string} messageId
 * @returns {Promise<object | null>}
 */
export async function clearLegacyEditHistory(
  ctx: ChatStorageCtx,
  dateStr: string,
  messageId: string,
): Promise<ChatMessage | null> {
  if (!dateStr || !messageId) return null;
  let updated: ChatMessage | null = null;
  await mutateDayFile(ctx, dateStr, (parsed) => {
    updated = null;
    const idx = parsed.messages.findIndex((m) => m.id === messageId);
    if (idx < 0) return parsed;
    const prev = parsed.messages[idx];
    if (!prev) return parsed;
    const prevHist = Array.isArray(prev.editHistory) ? prev.editHistory : [];
    if (prevHist.length === 0) return parsed;
    updated = { ...prev, editHistory: [], dateStr };
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
 * Delete one history entry (file-backed and/or legacy).
 * @param {ChatStorageCtx} ctx
 * @param {string} messageId
 * @param {{ key?: string, at?: string }} entry
 * @param {{ dateStr?: string }} [options]
 * @returns {Promise<{ updatedMessage: object | null }>}
 */
export async function deleteMessageEditHistoryEntry(
  ctx: ChatStorageCtx,
  messageId: string,
  entry: ChatEditVersionEntry,
  options: { dateStr?: string } = {},
): Promise<{ updatedMessage: ChatMessage | null }> {
  const id = String(messageId || '').trim();
  if (!id) return { updatedMessage: null };

  const vh = versionHistoryContextFromChat(ctx);
  let entryId = entry?.id || null;
  if (!entryId && entry?.key) {
    entryId = String(entry.key).endsWith('/current.md')
      ? null
      : `legacy:${entry.key}`;
  }

  if (entryId) {
    await deleteVersions(vh, { kind: 'chatEdit', messageId: id }, [entryId]);
  } else if (entry?.key) {
    // Native current.md without entry id: purge is via delete-all; single delete by key.
    await deleteMessageEditVersion(ctx, entry.key);
  }

  let updatedMessage: ChatMessage | null = null;
  if (!entry?.key && !entry?.id && entry?.at && options.dateStr) {
    updatedMessage = await removeLegacyEditHistoryEntry(
      ctx,
      options.dateStr,
      id,
      entry.at,
    );
  }
  return { updatedMessage };
}

/**
 * Delete every edit version for a message (files + legacy inline history).
 * @param {ChatStorageCtx} ctx
 * @param {string} messageId
 * @param {{ dateStr?: string }} [options]
 * @returns {Promise<{ deletedKeys: number, updatedMessage: object | null }>}
 */
export async function deleteAllMessageEditHistory(
  ctx: ChatStorageCtx,
  messageId: string,
  options: { dateStr?: string } = {},
): Promise<{ deletedKeys: number; updatedMessage: ChatMessage | null }> {
  const id = String(messageId || '').trim();
  if (!id) return { deletedKeys: 0, updatedMessage: null };

  const vh = versionHistoryContextFromChat(ctx);
  const result = await purgeAllForTarget(vh, {
    kind: 'chatEdit',
    messageId: id,
  });
  const deletedKeys = result.deletedIds?.length || 0;

  let updatedMessage: ChatMessage | null = null;
  if (options.dateStr) {
    updatedMessage = await clearLegacyEditHistory(ctx, options.dateStr, id);
  }
  return { deletedKeys, updatedMessage };
}

/**
 * Find a message by id, scanning day files newest-first.
 * @returns {Promise<{ msg: object, dateStr: string } | null>}
 */
export async function findMessageById(
  ctx: ChatStorageCtx,
  messageId: string,
  { maxDays = 90 }: { maxDays?: number } = {},
): Promise<{ msg: ChatMessage; dateStr: string } | null> {
  if (!messageId) return null;
  const keys = await listDayKeys(ctx);
  const limit = Math.min(keys.length, maxDays);
  for (let i = 0; i < limit; i++) {
    const dateStr = keys[i];
    if (!dateStr) continue;
    const msgs = await readDayMessages(ctx, dateStr);
    const found = msgs.find((m) => m.id === messageId);
    if (found) return { msg: found, dateStr };
  }
  return null;
}

/**
 * Walk replyTo parents (oldest first) for note export.
 * Falls back to replySnippet when a parent cannot be loaded.
 * @returns {Promise<object[]>}
 */
export async function resolveReplyThreadMessages(
  ctx: ChatStorageCtx,
  message: ChatMessage | null | undefined,
  { maxDepth = 32 }: { maxDepth?: number } = {},
): Promise<ChatMessage[]> {
  if (!message?.replyTo) return [];
  const newestFirst: ChatMessage[] = [];
  let replyToId = String(message.replyTo || '');
  let fallbackSnippet = String(message.replySnippet || '');
  let fallbackGroup = String(message.replyGroup || '');
  const seen = new Set([String(message.id || '')].filter(Boolean));

  while (replyToId && !seen.has(replyToId) && newestFirst.length < maxDepth) {
    seen.add(replyToId);
    const hit = ctx ? await findMessageById(ctx, replyToId) : null;
    if (hit?.msg) {
      newestFirst.push(hit.msg);
      replyToId = String(hit.msg.replyTo || '');
      fallbackSnippet = String(hit.msg.replySnippet || '');
      fallbackGroup = String(hit.msg.replyGroup || '');
      continue;
    }
    if (fallbackSnippet) {
      newestFirst.push({
        id: replyToId,
        at: '',
        group: fallbackGroup || '나',
        body: fallbackSnippet,
      });
    }
    break;
  }

  return newestFirst.reverse();
}

export async function readOgArchive(
  ctx: ChatStorageCtx,
  key: string,
): Promise<unknown> {
  const raw = await readText(ctx, key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function writeOgArchive(
  ctx: ChatStorageCtx,
  key: string,
  data: unknown,
): Promise<void> {
  await writeTextUnconditional(
    ctx,
    key,
    `${JSON.stringify(data, null, 2)}\n`,
    'application/json',
  );
}

export function createOgStorageAdapters(ctx: ChatStorageCtx) {
  return {
    readArchive: (key: string) => readOgArchive(ctx, key),
    writeArchive: (key: string, data: unknown) => writeOgArchive(ctx, key, data),
  };
}

/** Rewrite entire day file (e.g. after merges) — preserves tombstones when provided */
export async function writeDayMessages(
  ctx: ChatStorageCtx,
  dateStr: string,
  messages: ChatMessage[],
  deletedAtById: Record<string, string> = {},
): Promise<void> {
  await mutateDayFile(ctx, dateStr, (parsed) =>
    asDayParsed(
      mergeDayMessages(parsed as never, {
        messages: messages || [],
        deletedIds: Object.keys(deletedAtById || {}),
        deletedAtById: deletedAtById || {},
      } as never),
    ),
  );
}

/**
 * Flush pending IndexedDB messages with conditional append.
 * Writes into the original day file when `dateStr`/`dayKey` is known (not always today).
 * Does not re-queue via appendChatMessages (avoids duplicate pending rows on failure).
 * @param {ChatStorageCtx} ctx
 * @param {{ getPendingMessages: () => Promise<any[]>, deletePendingMessage: (id: number) => Promise<void> }} db
 */
export async function flushPendingMessages(
  ctx: ChatStorageCtx,
  db: {
    getPendingMessages: () => Promise<
      Array<{
        id: number;
        message?: ChatMessage;
        dateStr?: string;
        dayKey?: string;
      }>
    >;
    deletePendingMessage: (id: number) => Promise<void>;
  },
) {
  const pending = await db.getPendingMessages();
  if (!pending?.length) return { flushed: 0, dateStrs: [] };
  let flushed = 0;
  const dateStrs = new Set<string>();
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
      if (m?.[1]) dateStr = m[1];
    }
    if (!dateStr) {
      dateStr = localDateString(new Date(msg.at || Date.now()), tz);
    }
    try {
      await mutateDayFile(ctx, dateStr, (parsed) =>
        asDayParsed(
          mergeDayMessages(parsed as never, {
            messages: [{ ...msg, dateStr }],
            deletedIds: [],
            deletedAtById: {},
          } as never),
        ),
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

/**
 * Clear chat → note links for deleted (or trashed) note paths.
 * Only clears `notePath` meta (messages saved as notes from chat).
 * Does not remove `[[note:...]]` share tokens — those stay and show disabled in UI.
 * Does not create edit-history versions (system cleanup).
 *
 * @param {ChatStorageCtx} ctx
 * @param {{ exact?: string[], prefixes?: string[] }} scope
 * @returns {Promise<{ dateStrs: string[], updatedCount: number }>}
 */
export async function unlinkChatNotesForDeletedPaths(
  ctx: ChatStorageCtx,
  scope: { exact?: string[]; prefixes?: string[] },
): Promise<{ dateStrs: string[]; updatedCount: number }> {
  const deleted = {
    exact: Array.isArray(scope?.exact) ? scope.exact : [],
    prefixes: Array.isArray(scope?.prefixes) ? scope.prefixes : [],
  };
  if (!deleted.exact.length && !deleted.prefixes.length) {
    return { dateStrs: [], updatedCount: 0 };
  }

  const keys = await listDayKeys(ctx);
  const dateStrs: string[] = [];
  let updatedCount = 0;

  for (const dateStr of keys) {
    const messages = await readDayMessages(ctx, dateStr);
    if (!messages.some((m) => messageNeedsNoteUnlink(m, deleted))) continue;

    await mutateDayFile(ctx, dateStr, (parsed) => {
      let dayUpdated = 0;
      const nextMessages = parsed.messages.map((msg) => {
        if (!pathAffectedByDelete(msg.notePath, deleted)) return msg;
        dayUpdated += 1;
        return { ...msg, notePath: '' };
      });
      updatedCount += dayUpdated;
      return {
        messages: nextMessages,
        deletedIds: parsed.deletedIds,
        deletedAtById: parsed.deletedAtById,
      };
    });
    dateStrs.push(dateStr);
  }

  return { dateStrs, updatedCount };
}

export { ChatPreconditionFailedError, createChatBackend, CHAT_FOLDER };
export { mergeDayMessages, parseDayFile, serializeDeletedMarker } from '@/utils/chatWithMyself/format.js';

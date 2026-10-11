import {
  editVersionAtFromFileName,
  messageEditVersionKey,
  messageEditsFolder,
} from '@/utils/chatWithMyself/paths.js';
import {
  parseEditVersion,
  serializeEditVersion,
} from '@/utils/chatWithMyself/editHistory.js';
import { chatEditNativeCurrentKey } from '@/utils/versionHistory/paths';
import {
  deleteNativeVersions,
  listNativeVersions,
  purgeAllNativeVersions,
  readNativeVersion,
} from '@/utils/versionHistory/s3NativeAdapter';
import type {
  VersionDeleteResult,
  VersionEntry,
  VersionHistoryContext,
  VersionHistoryMode,
} from '@/utils/versionHistory/types';

export type ChatEditArchiveEntry = {
  at?: string;
  body?: string;
  group?: string;
};

function requireChat(ctx: VersionHistoryContext) {
  const b = ctx.chatBackend;
  if (!b) throw new Error('Chat backend is not ready');
  return b;
}

function legacyEntryId(key: string): string {
  return `legacy:${key}`;
}

function parseLegacyId(id: string): string | null {
  if (!id.startsWith('legacy:')) return null;
  return id.slice(7);
}

async function listLegacyIsoFiles(
  ctx: VersionHistoryContext,
  messageId: string,
): Promise<VersionEntry[]> {
  const b = requireChat(ctx);
  const prefix = messageEditsFolder(messageId);
  let keys: string[] = [];
  try {
    keys = await b.listKeys(prefix);
  } catch {
    return [];
  }
  return keys
    .filter((k) => k.toLowerCase().endsWith('.md') && !k.endsWith('/current.md'))
    .sort((a, b) => b.localeCompare(a))
    .map((key) => {
      const at = editVersionAtFromFileName(key) || '';
      return {
        id: legacyEntryId(key),
        source: 'legacy-app' as const,
        at,
        size: 0,
        key,
      };
    });
}

export async function listChatEditVersions(
  ctx: VersionHistoryContext,
  messageId: string,
  mode: VersionHistoryMode,
): Promise<VersionEntry[]> {
  const id = String(messageId || '').trim();
  if (!id) return [];

  if (mode === 'native') {
    let native: VersionEntry[] = [];
    try {
      native = await listNativeVersions(ctx, {
        kind: 'chatEdit',
        messageId: id,
      });
      // Chat archive current.md: IsLatest is the newest archive (previous body), not the live message.
      native = native.map((e) => ({
        ...e,
        protectCurrent: false,
        isLatest: false,
      }));
    } catch {
      native = [];
    }
    const legacy = await listLegacyIsoFiles(ctx, id);
    return [...native, ...legacy];
  }

  // App mode: ISO files only (same as historical behavior).
  const iso = await listLegacyIsoFiles(ctx, id);
  return iso.map((e) => ({ ...e, source: 'app' as const }));
}

export async function readChatEditVersion(
  ctx: VersionHistoryContext,
  messageId: string,
  entryId: string,
  _mode: VersionHistoryMode,
): Promise<{ at: string; body: string; group: string }> {
  void _mode;
  if (entryId.startsWith('s3:')) {
    const raw = await readNativeVersion(
      ctx,
      { kind: 'chatEdit', messageId },
      entryId,
    );
    const parsed = parseEditVersion(raw, { key: entryId });
    if (!parsed) throw new Error('Failed to parse version');
    return { at: parsed.at, body: parsed.body, group: parsed.group };
  }

  const key = parseLegacyId(entryId);
  if (!key) throw new Error('Invalid chat version id');
  const b = requireChat(ctx);
  const raw = await b.getText(key);
  if (raw == null) throw new Error('Version file not found');
  const parsed = parseEditVersion(raw, { key });
  if (!parsed) throw new Error('Failed to parse version');
  return { at: parsed.at, body: parsed.body, group: parsed.group };
}

export async function archiveChatEdit(
  ctx: VersionHistoryContext,
  messageId: string,
  entry: ChatEditArchiveEntry,
  mode: VersionHistoryMode,
): Promise<string | null> {
  const id = String(messageId || '').trim();
  if (!id) return null;
  const at = entry?.at || new Date().toISOString();
  const content = serializeEditVersion({
    at,
    body: entry?.body ?? '',
    ...(entry?.group != null ? { group: entry.group } : {}),
  });
  const b = requireChat(ctx);
  await b.ensureChatFolder();

  if (mode === 'native') {
    const key = chatEditNativeCurrentKey(id);
    await b.putTextOverwrite(key, content, 'text/markdown; charset=utf-8');
    return key;
  }

  const key = messageEditVersionKey(id, at);
  await b.putTextOverwrite(key, content, 'text/markdown; charset=utf-8');
  return key;
}

export async function deleteChatEditVersions(
  ctx: VersionHistoryContext,
  messageId: string,
  entryIds: string[],
  mode: VersionHistoryMode,
): Promise<VersionDeleteResult> {
  const deletedIds: string[] = [];
  const failed: VersionDeleteResult['failed'] = [];
  const nativeIds = entryIds.filter((id) => id.startsWith('s3:'));
  const legacyIds = entryIds.filter((id) => id.startsWith('legacy:') || id.startsWith('app:'));

  if (nativeIds.length && mode === 'native') {
    const result = await deleteNativeVersions(
      ctx,
      { kind: 'chatEdit', messageId },
      nativeIds,
      { allowLatest: true },
    );
    deletedIds.push(...result.deletedIds);
    failed.push(...result.failed);
  }

  const b = ctx.chatBackend;
  for (const id of legacyIds) {
    const key =
      parseLegacyId(id) ||
      (id.startsWith('app:') ? id.replace(/^app:/, '') : '');
    // app: for chat ISO we used legacy: prefix; also accept raw key in id after legacy:
    const path = key || (id.startsWith('legacy:') ? id.slice(7) : '');
    if (!path || !b) {
      failed.push({ id, message: 'Invalid legacy version id' });
      continue;
    }
    try {
      await b.deleteKey(path);
      deletedIds.push(id);
    } catch (e: unknown) {
      const status = (e as { status?: number; $metadata?: { httpStatusCode?: number } })
        ?.$metadata?.httpStatusCode;
      if (status === 404 || (e as { status?: number }).status === 404) {
        deletedIds.push(id);
      } else {
        failed.push({
          id,
          message: e instanceof Error ? e.message : 'Delete failed',
        });
      }
    }
  }

  return { deletedIds, failed };
}

export async function purgeAllChatEditVersions(
  ctx: VersionHistoryContext,
  messageId: string,
  mode: VersionHistoryMode,
): Promise<VersionDeleteResult> {
  const deletedIds: string[] = [];
  const failed: VersionDeleteResult['failed'] = [];

  if (mode === 'native') {
    try {
      const r = await purgeAllNativeVersions(ctx, {
        kind: 'chatEdit',
        messageId,
      });
      deletedIds.push(...r.deletedIds);
      failed.push(...r.failed);
    } catch (e: unknown) {
      failed.push({
        id: messageId,
        message: e instanceof Error ? e.message : 'Native purge failed',
      });
    }
  }

  const legacy = await listLegacyIsoFiles(ctx, messageId);
  const r2 = await deleteChatEditVersions(
    ctx,
    messageId,
    legacy.map((e) => e.id),
    'app',
  );
  deletedIds.push(...r2.deletedIds);
  failed.push(...r2.failed);
  return { deletedIds, failed };
}

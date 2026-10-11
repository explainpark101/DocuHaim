/**
 * Note + chat edit version history (S3 native or app-managed fallback).
 */

import {
  archiveAppNoteSnapshot,
  deleteAppNoteVersions,
  listAppNoteVersions,
  purgeAllAppNoteVersions,
  readAppNoteVersion,
  restoreAppNoteVersion,
} from '@/utils/versionHistory/appManagedNoteAdapter';
import {
  archiveChatEdit,
  deleteChatEditVersions,
  listChatEditVersions,
  purgeAllChatEditVersions,
  readChatEditVersion,
  type ChatEditArchiveEntry,
} from '@/utils/versionHistory/chatEditAdapter';
import { resolveVersionHistoryMode } from '@/utils/versionHistory/probe';
import {
  isNoteVersionExcludedPath,
  normalizeVaultPath,
} from '@/utils/versionHistory/paths';
import { loadVersionHistoryEnabled } from '@/utils/versionHistory/settings';
import {
  deleteNativeVersions,
  listNativeVersions,
  purgeAllNativeVersions,
  readNativeVersion,
  restoreNativeVersionToKey,
} from '@/utils/versionHistory/s3NativeAdapter';
import type {
  VersionDeleteResult,
  VersionEntry,
  VersionHistoryContext,
  VersionHistoryMode,
  VersionHistoryTarget,
} from '@/utils/versionHistory/types';

export type {
  VersionDeleteResult,
  VersionEntry,
  VersionHistoryContext,
  VersionHistoryMode,
  VersionHistoryTarget,
  VersionHistoryVaultBackend,
  VersionSource,
} from '@/utils/versionHistory/types';

export {
  VERSIONS_FOLDER,
  isNoteVersionExcludedPath,
  isVersionsPath,
  normalizeVaultPath,
  chatEditNativeCurrentKey,
} from '@/utils/versionHistory/paths';

export {
  loadVersionHistoryEnabled,
  saveVersionHistoryEnabled,
  loadNoteVersionMax,
  saveNoteVersionMax,
  subscribeVersionHistorySettings,
} from '@/utils/versionHistory/settings';

export { clearVersionHistoryProbeCache, resolveVersionHistoryMode } from '@/utils/versionHistory/probe';

export {
  openNoteVersionHistory,
  closeNoteVersionHistory,
  subscribeNoteVersionHistory,
  getNoteVersionHistoryRequest,
  notifyNoteVersionHistoryAfterSave,
  subscribeNoteVersionHistoryAfterSave,
  type NoteVersionHistoryRequest,
} from '@/utils/versionHistory/openRequest';

export type { ChatEditArchiveEntry };

async function activeMode(
  ctx: VersionHistoryContext,
): Promise<VersionHistoryMode> {
  if (!loadVersionHistoryEnabled()) {
    // Master off: still allow reading/deleting existing history, but archive skips.
    // Listing uses probe so native remains visible when bucket versioning is on.
  }
  return resolveVersionHistoryMode(ctx);
}

export async function listVersions(
  ctx: VersionHistoryContext,
  target: VersionHistoryTarget,
): Promise<VersionEntry[]> {
  const mode = await activeMode(ctx);
  if (target.kind === 'chatEdit') {
    return listChatEditVersions(ctx, target.messageId, mode);
  }
  const path = normalizeVaultPath(target.path);
  if (isNoteVersionExcludedPath(path)) return [];
  if (mode === 'native') {
    return listNativeVersions(ctx, { kind: 'note', path });
  }
  return listAppNoteVersions(ctx, path);
}

export async function readVersion(
  ctx: VersionHistoryContext,
  target: VersionHistoryTarget,
  entryId: string,
): Promise<string> {
  const mode = await activeMode(ctx);
  if (target.kind === 'chatEdit') {
    const parsed = await readChatEditVersion(
      ctx,
      target.messageId,
      entryId,
      mode,
    );
    return parsed.body;
  }
  if (entryId.startsWith('s3:') || mode === 'native') {
    return readNativeVersion(ctx, target, entryId);
  }
  return readAppNoteVersion(ctx, entryId);
}

/** Chat edit: return parsed body/group/at. */
export async function readChatVersionDetails(
  ctx: VersionHistoryContext,
  messageId: string,
  entryId: string,
) {
  const mode = await activeMode(ctx);
  return readChatEditVersion(ctx, messageId, entryId, mode);
}

export async function deleteVersions(
  ctx: VersionHistoryContext,
  target: VersionHistoryTarget,
  entryIds: string[],
): Promise<VersionDeleteResult> {
  const mode = await activeMode(ctx);
  const ids = entryIds.filter(Boolean);
  if (target.kind === 'chatEdit') {
    return deleteChatEditVersions(ctx, target.messageId, ids, mode);
  }

  // Notes: refuse deleting protectCurrent / IsLatest in history UI.
  const listed = await listVersions(ctx, target);
  const protectedIds = new Set(
    listed.filter((e) => e.protectCurrent).map((e) => e.id),
  );
  const allowed = ids.filter((id) => !protectedIds.has(id));
  const failed: VersionDeleteResult['failed'] = ids
    .filter((id) => protectedIds.has(id))
    .map((id) => ({ id, message: 'Current version cannot be deleted here' }));

  if (mode === 'native') {
    const result = await deleteNativeVersions(ctx, target, allowed);
    return {
      deletedIds: result.deletedIds,
      failed: [...failed, ...result.failed],
    };
  }
  const result = await deleteAppNoteVersions(ctx, allowed);
  return {
    deletedIds: result.deletedIds,
    failed: [...failed, ...result.failed],
  };
}

export async function purgeAllForTarget(
  ctx: VersionHistoryContext,
  target: VersionHistoryTarget,
): Promise<VersionDeleteResult> {
  const mode = await activeMode(ctx);
  if (target.kind === 'chatEdit') {
    return purgeAllChatEditVersions(ctx, target.messageId, mode);
  }
  if (mode === 'native') {
    return purgeAllNativeVersions(ctx, target);
  }
  return purgeAllAppNoteVersions(ctx, target.path);
}

/**
 * Restore note body to path, or return chat body for caller to apply via updateChatMessage.
 * Product UI must show VersionRestoreDiffModal before calling this.
 */
export async function restoreVersion(
  ctx: VersionHistoryContext,
  target: VersionHistoryTarget,
  entryId: string,
): Promise<string> {
  const mode = await activeMode(ctx);
  if (target.kind === 'chatEdit') {
    const details = await readChatEditVersion(
      ctx,
      target.messageId,
      entryId,
      mode,
    );
    return details.body;
  }
  if (mode === 'native') {
    return restoreNativeVersionToKey(ctx, target, entryId);
  }
  return restoreAppNoteVersion(ctx, target.path, entryId);
}

/**
 * Archive previous content after a successful note save (app mode only).
 * No-op when native versioning is active or master toggle is off.
 */
export async function maybeArchiveNoteOnSave(
  ctx: VersionHistoryContext,
  path: string,
  previousBody: string | null | undefined,
): Promise<void> {
  if (!loadVersionHistoryEnabled()) return;
  if (previousBody == null) return;
  const mode = await resolveVersionHistoryMode(ctx);
  if (mode === 'native') return;
  try {
    await archiveAppNoteSnapshot(ctx, path, previousBody);
  } catch (e) {
    console.warn('[versionHistory] note snapshot failed', e);
  }
}

/**
 * Archive previous chat message body (native overwrite or app ISO file).
 */
export async function archiveChatEditVersion(
  ctx: VersionHistoryContext,
  messageId: string,
  entry: ChatEditArchiveEntry,
): Promise<string | null> {
  if (!loadVersionHistoryEnabled()) return null;
  const mode = await resolveVersionHistoryMode(ctx);
  try {
    return await archiveChatEdit(ctx, messageId, entry, mode);
  } catch (e) {
    console.warn('[versionHistory] chat archive failed', e);
    return null;
  }
}

/** Build VersionHistoryContext from vault + optional chat backend. */
export function createVersionHistoryContext(args: {
  storageMode: string;
  getS3Client?: (() => unknown) | null;
  bucket?: string;
  getVaultBackend: VersionHistoryContext['getVaultBackend'];
  chatBackend?: VersionHistoryContext['chatBackend'];
}): VersionHistoryContext {
  const s3ClientFn = args.getS3Client;
  return {
    storageMode: args.storageMode,
    s3:
      args.storageMode === 's3' && s3ClientFn && args.bucket
        ? { getClient: () => s3ClientFn() ?? null, bucket: args.bucket }
        : null,
    getVaultBackend: args.getVaultBackend,
    chatBackend: args.chatBackend ?? null,
  };
}

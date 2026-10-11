import { hashTextContent } from '@/utils/versionHistory/contentHash';
import {
  APP_NOTE_VERSION_MAX,
  hashVaultPath,
  isNoteVersionExcludedPath,
  newNoteVersionEntryId,
  normalizeVaultPath,
  noteVersionBodyKey,
  noteVersionMetaKey,
  noteVersionPathPrefix,
  VERSIONS_FOLDER,
} from '@/utils/versionHistory/paths';
import { loadNoteVersionMax } from '@/utils/versionHistory/settings';
import type {
  VersionDeleteResult,
  VersionEntry,
  VersionHistoryContext,
  VersionHistoryVaultBackend,
} from '@/utils/versionHistory/types';

type NoteMeta = {
  path: string;
  createdAt: string;
  size: number;
  contentHash: string;
  source: 'app';
};

function requireBackend(ctx: VersionHistoryContext): VersionHistoryVaultBackend {
  const b = ctx.getVaultBackend?.();
  if (!b || (typeof b.isReady === 'function' && !b.isReady())) {
    throw new Error('Vault backend is not ready');
  }
  return b;
}

async function listEntryIdsForPath(
  ctx: VersionHistoryContext,
  backend: VersionHistoryVaultBackend,
  pathHash: string,
): Promise<string[]> {
  const prefix = noteVersionPathPrefix(pathHash);
  const ids = new Set<string>();

  if (ctx.storageMode === 's3' && ctx.s3?.getClient && ctx.s3.bucket) {
    try {
      const { listObjectsV2 } = await import('@/utils/vault/s3Client');
      const client = ctx.s3.getClient();
      if (client) {
        const contents = await listObjectsV2(
          client as Parameters<typeof listObjectsV2>[0],
          ctx.s3.bucket,
          prefix,
        );
        for (const item of contents) {
          const key = String(item.Key || '');
          if (!key.startsWith(prefix)) continue;
          const entryId = key.slice(prefix.length).split('/')[0];
          if (entryId) ids.add(entryId);
        }
        return [...ids].sort((a, b) => b.localeCompare(a));
      }
    } catch {
      // fall through
    }
  }

  if (typeof backend.listKeys === 'function') {
    const keys = await backend.listKeys(prefix);
    for (const key of keys) {
      const rest = key.slice(prefix.length);
      const entryId = rest.split('/')[0];
      if (entryId) ids.add(entryId);
    }
    return [...ids].sort((a, b) => b.localeCompare(a));
  }

  const tree = (await backend.listAll?.()) as
    | Array<{ path?: string; type?: string; children?: unknown[] }>
    | null
    | undefined;
  if (!tree) return [];

  const walk = (nodes: unknown[]) => {
    for (const raw of nodes) {
      if (!raw || typeof raw !== 'object') continue;
      const n = raw as { path?: string; type?: string; children?: unknown[] };
      const p = String(n.path || '');
      if (p.startsWith(prefix)) {
        const entryId = p.slice(prefix.length).replace(/\/$/, '').split('/')[0];
        if (entryId && !entryId.includes('/')) ids.add(entryId);
      }
      if (Array.isArray(n.children)) walk(n.children);
    }
  };
  walk(Array.isArray(tree) ? tree : []);
  return [...ids].sort((a, b) => b.localeCompare(a));
}

async function readMeta(
  backend: VersionHistoryVaultBackend,
  pathHash: string,
  entryId: string,
): Promise<NoteMeta | null> {
  try {
    const { text } = await backend.readText(noteVersionMetaKey(pathHash, entryId));
    const parsed = JSON.parse(text) as NoteMeta;
    if (!parsed?.path) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function listAppNoteVersions(
  ctx: VersionHistoryContext,
  path: string,
): Promise<VersionEntry[]> {
  const normalized = normalizeVaultPath(path);
  if (isNoteVersionExcludedPath(normalized)) return [];
  const backend = requireBackend(ctx);
  const pathHash = await hashVaultPath(normalized);
  const entryIds = await listEntryIdsForPath(ctx, backend, pathHash);
  const out: VersionEntry[] = [];
  for (const entryId of entryIds) {
    const meta = await readMeta(backend, pathHash, entryId);
    if (!meta || normalizeVaultPath(meta.path) !== normalized) continue;
    out.push({
      id: `app:${pathHash}/${entryId}`,
      source: 'app',
      at: meta.createdAt || '',
      size: meta.size || 0,
      key: noteVersionBodyKey(pathHash, entryId),
    });
  }
  out.sort((a, b) => String(b.at).localeCompare(String(a.at)));
  return out;
}

function parseAppEntryId(id: string): { pathHash: string; entryId: string } | null {
  if (!id.startsWith('app:')) return null;
  const rest = id.slice(4);
  const slash = rest.indexOf('/');
  if (slash < 0) return null;
  return { pathHash: rest.slice(0, slash), entryId: rest.slice(slash + 1) };
}

export async function readAppNoteVersion(
  ctx: VersionHistoryContext,
  entryId: string,
): Promise<string> {
  const parsed = parseAppEntryId(entryId);
  if (!parsed) throw new Error('Invalid app version id');
  const backend = requireBackend(ctx);
  const { text } = await backend.readText(
    noteVersionBodyKey(parsed.pathHash, parsed.entryId),
  );
  return text;
}

export async function deleteAppNoteVersions(
  ctx: VersionHistoryContext,
  entryIds: string[],
): Promise<VersionDeleteResult> {
  const backend = requireBackend(ctx);
  const deletedIds: string[] = [];
  const failed: VersionDeleteResult['failed'] = [];

  for (const id of entryIds) {
    const parsed = parseAppEntryId(id);
    if (!parsed) {
      failed.push({ id, message: 'Invalid app version id' });
      continue;
    }
    const dir = `${VERSIONS_FOLDER}/${parsed.pathHash}/${parsed.entryId}`;
    try {
      if (typeof backend.deletePrefix === 'function') {
        await backend.deletePrefix(`${dir}/`);
      } else {
        try {
          await backend.delete(noteVersionMetaKey(parsed.pathHash, parsed.entryId));
        } catch {
          /* ignore */
        }
        try {
          await backend.delete(noteVersionBodyKey(parsed.pathHash, parsed.entryId));
        } catch {
          /* ignore */
        }
      }
      deletedIds.push(id);
    } catch (e: unknown) {
      failed.push({
        id,
        message: e instanceof Error ? e.message : 'Delete failed',
      });
    }
  }
  return { deletedIds, failed };
}

export async function purgeAllAppNoteVersions(
  ctx: VersionHistoryContext,
  path: string,
): Promise<VersionDeleteResult> {
  const entries = await listAppNoteVersions(ctx, path);
  return deleteAppNoteVersions(
    ctx,
    entries.map((e) => e.id),
  );
}

/**
 * Archive previous note body before/after a successful save (app-managed mode).
 */
export async function archiveAppNoteSnapshot(
  ctx: VersionHistoryContext,
  path: string,
  previousBody: string,
  options: { max?: number } = {},
): Promise<VersionEntry | null> {
  const normalized = normalizeVaultPath(path);
  if (isNoteVersionExcludedPath(normalized)) return null;
  const body = String(previousBody ?? '');
  if (!body) return null;

  const backend = requireBackend(ctx);
  const contentHash = await hashTextContent(body);
  const pathHash = await hashVaultPath(normalized);

  // Skip if latest snapshot already has same hash.
  const existing = await listAppNoteVersions(ctx, normalized);
  if (existing[0]) {
    const parsed = parseAppEntryId(existing[0].id);
    if (parsed) {
      const meta = await readMeta(backend, parsed.pathHash, parsed.entryId);
      if (meta?.contentHash === contentHash) return null;
    }
  }

  const entryId = newNoteVersionEntryId();
  const createdAt = new Date().toISOString();
  const meta: NoteMeta = {
    path: normalized,
    createdAt,
    size: new TextEncoder().encode(body).byteLength,
    contentHash,
    source: 'app',
  };

  try {
    await backend.mkdir?.(VERSIONS_FOLDER);
    await backend.mkdir?.(`${VERSIONS_FOLDER}/${pathHash}`);
    await backend.mkdir?.(`${VERSIONS_FOLDER}/${pathHash}/${entryId}`);
  } catch {
    // mkdir may be a no-op on S3-like backends
  }

  await backend.writeText(
    noteVersionMetaKey(pathHash, entryId),
    `${JSON.stringify(meta, null, 2)}\n`,
    'application/json; charset=utf-8',
  );
  await backend.writeText(
    noteVersionBodyKey(pathHash, entryId),
    body,
    'text/markdown; charset=utf-8',
  );

  const max = options.max ?? loadNoteVersionMax() ?? APP_NOTE_VERSION_MAX;
  const after = await listAppNoteVersions(ctx, normalized);
  if (after.length > max) {
    const overflow = after.slice(max);
    await deleteAppNoteVersions(
      ctx,
      overflow.map((e) => e.id),
    );
  }

  return {
    id: `app:${pathHash}/${entryId}`,
    source: 'app',
    at: createdAt,
    size: meta.size,
    key: noteVersionBodyKey(pathHash, entryId),
  };
}

export async function restoreAppNoteVersion(
  ctx: VersionHistoryContext,
  path: string,
  entryId: string,
): Promise<string> {
  const body = await readAppNoteVersion(ctx, entryId);
  const backend = requireBackend(ctx);
  // Snapshot current before overwrite
  try {
    const { text: current } = await backend.readText(path);
    await archiveAppNoteSnapshot(ctx, path, current);
  } catch {
    // missing current is fine
  }
  await backend.writeText(path, body, 'text/markdown; charset=utf-8');
  return body;
}

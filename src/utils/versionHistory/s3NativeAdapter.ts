import {
  deleteObjects,
  getObjectBody,
  listObjectVersions,
  putObject,
} from '@/utils/vault/s3Client';
import { chatEditNativeCurrentKey } from '@/utils/versionHistory/paths';
import type {
  VersionDeleteResult,
  VersionEntry,
  VersionHistoryContext,
  VersionHistoryTarget,
} from '@/utils/versionHistory/types';

function requireS3(ctx: VersionHistoryContext) {
  const client = ctx.s3?.getClient?.();
  const bucket = ctx.s3?.bucket || '';
  if (!client || !bucket) throw new Error('S3 is not connected');
  return {
    client: client as Parameters<typeof listObjectVersions>[0],
    bucket,
  };
}

function targetKey(target: VersionHistoryTarget): string {
  if (target.kind === 'note') return target.path;
  return chatEditNativeCurrentKey(target.messageId);
}

function entryIdFromVersion(
  key: string,
  versionId: string | undefined,
  isDeleteMarker: boolean,
): string {
  const vid = versionId || 'null';
  return `s3:${isDeleteMarker ? 'dm:' : ''}${key}@${vid}`;
}

function parseEntryId(id: string): {
  key: string;
  versionId: string;
  isDeleteMarker: boolean;
} | null {
  if (!id.startsWith('s3:')) return null;
  const rest = id.slice(3);
  const dm = rest.startsWith('dm:');
  const body = dm ? rest.slice(3) : rest;
  const at = body.lastIndexOf('@');
  if (at < 0) return null;
  return {
    key: body.slice(0, at),
    versionId: body.slice(at + 1),
    isDeleteMarker: dm,
  };
}

export async function listNativeVersions(
  ctx: VersionHistoryContext,
  target: VersionHistoryTarget,
): Promise<VersionEntry[]> {
  const { client, bucket } = requireS3(ctx);
  const key = targetKey(target);
  const { versions } = await listObjectVersions(client, bucket, key, {
    exactKey: true,
  });

  return versions
    .filter((v) => !v.isDeleteMarker)
    .map((v) => {
      const isLatest = Boolean(v.IsLatest);
      const at = v.LastModified
        ? new Date(v.LastModified).toISOString()
        : '';
      const entry: VersionEntry = {
        id: entryIdFromVersion(v.Key, v.VersionId, false),
        source: 's3-native',
        at,
        size: typeof v.Size === 'number' ? v.Size : 0,
        isLatest,
        key: v.Key,
        protectCurrent: isLatest && target.kind === 'note',
      };
      if (v.VersionId) entry.versionId = v.VersionId;
      return entry;
    });
}

export async function readNativeVersion(
  ctx: VersionHistoryContext,
  target: VersionHistoryTarget,
  entryId: string,
): Promise<string> {
  const { client, bucket } = requireS3(ctx);
  const parsed = parseEntryId(entryId);
  if (!parsed || parsed.isDeleteMarker) {
    throw new Error('Invalid version id');
  }
  const expectedKey = targetKey(target);
  if (parsed.key !== expectedKey) {
    throw new Error('Version does not belong to this target');
  }
  const versionId =
    parsed.versionId === 'null' ? undefined : parsed.versionId;
  const { body } = await getObjectBody(
    client,
    bucket,
    parsed.key,
    versionId ? { versionId } : {},
  );
  return new TextDecoder('utf-8').decode(body);
}

export async function deleteNativeVersions(
  ctx: VersionHistoryContext,
  target: VersionHistoryTarget,
  entryIds: string[],
  options: { allowLatest?: boolean } = {},
): Promise<VersionDeleteResult> {
  const { client, bucket } = requireS3(ctx);
  const expectedKey = targetKey(target);
  const deletedIds: string[] = [];
  const failed: VersionDeleteResult['failed'] = [];
  const objects: { Key: string; VersionId: string }[] = [];
  const idByObject: string[] = [];

  for (const id of entryIds) {
    const parsed = parseEntryId(id);
    if (!parsed || parsed.key !== expectedKey) {
      failed.push({ id, message: 'Invalid version id' });
      continue;
    }
    if (!options.allowLatest) {
      // Protect note current version in history UI — caller filters protectCurrent.
    }
    if (!parsed.versionId || parsed.versionId === 'null') {
      failed.push({
        id,
        message: 'Missing VersionId (bucket versioning may be off)',
      });
      continue;
    }
    objects.push({ Key: parsed.key, VersionId: parsed.versionId });
    idByObject.push(id);
  }

  if (objects.length === 0) return { deletedIds, failed };

  try {
    const result = await deleteObjects(client, bucket, objects);
    const errSet = new Set(
      (result.errors || []).map(
        (e) => `${e.Key || ''}@${e.VersionId || ''}`,
      ),
    );
    for (let i = 0; i < objects.length; i++) {
      const obj = objects[i]!;
      const id = idByObject[i]!;
      const k = `${obj.Key}@${obj.VersionId}`;
      if (errSet.has(k)) {
        const err = result.errors.find(
          (e) => e.Key === obj.Key && e.VersionId === obj.VersionId,
        );
        failed.push({
          id,
          message: err?.Message || err?.Code || 'Delete failed',
        });
      } else {
        deletedIds.push(id);
      }
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Delete failed';
    for (const id of idByObject) failed.push({ id, message: msg });
  }

  return { deletedIds, failed };
}

/**
 * Permanently delete every version (and delete markers) for the target key.
 * Used when permanently deleting a file with deleteWithVersions.
 */
export async function purgeAllNativeVersions(
  ctx: VersionHistoryContext,
  target: VersionHistoryTarget,
): Promise<VersionDeleteResult> {
  const { client, bucket } = requireS3(ctx);
  const key = targetKey(target);
  const { versions } = await listObjectVersions(client, bucket, key, {
    exactKey: true,
  });
  const objects = versions
    .filter((v) => v.VersionId && v.VersionId !== 'null')
    .map((v) => ({ Key: v.Key, VersionId: v.VersionId as string }));

  if (objects.length === 0) {
    // No version ids — fall back to key-only delete of current object.
    try {
      await deleteObjects(client, bucket, [{ Key: key }]);
      return { deletedIds: [`s3:${key}@current`], failed: [] };
    } catch (e: unknown) {
      return {
        deletedIds: [],
        failed: [
          {
            id: key,
            message: e instanceof Error ? e.message : 'Purge failed',
          },
        ],
      };
    }
  }

  const ids = objects.map(
    (o) =>
      entryIdFromVersion(
        o.Key,
        o.VersionId,
        Boolean(versions.find((v) => v.VersionId === o.VersionId)?.isDeleteMarker),
      ),
  );
  return deleteNativeVersions(ctx, target, ids, { allowLatest: true });
}

export async function restoreNativeVersionToKey(
  ctx: VersionHistoryContext,
  target: VersionHistoryTarget,
  entryId: string,
): Promise<string> {
  const body = await readNativeVersion(ctx, target, entryId);
  if (target.kind !== 'note') return body;
  const { client, bucket } = requireS3(ctx);
  await putObject(client, {
    Bucket: bucket,
    Key: target.path,
    Body: body,
    ContentType: 'text/markdown; charset=utf-8',
  });
  return body;
}

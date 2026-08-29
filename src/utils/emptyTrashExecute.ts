import { listObjectsV2, deleteObjects, putObject } from '@/utils/s3Client';
import { webdavPropfindDeep } from '@/utils/webdavClient';
import { createWebdavBackend } from '@/utils/storage/webdavBackend.js';
import {
  filterTrashEntries,
  isTrashRootKey,
  matchesEmptyTrashFilter,
  type EmptyTrashOptions,
  type TrashFileEntry,
} from '@/utils/emptyTrash';

type LocalTrashEntry = TrashFileEntry & {
  parentHandle: FileSystemDirectoryHandle;
  entryName: string;
};

async function collectLocalTrashEntries(
  rootHandle: FileSystemDirectoryHandle,
): Promise<LocalTrashEntry[]> {
  let trashHandle: FileSystemDirectoryHandle;
  try {
    trashHandle = await rootHandle.getDirectoryHandle('.trash', { create: false });
  } catch {
    return [];
  }

  const out: LocalTrashEntry[] = [];

  const walk = async (dir: FileSystemDirectoryHandle, basePath: string) => {
    const dirAny = dir as FileSystemDirectoryHandle & {
      values: () => AsyncIterableIterator<FileSystemHandle & { kind: string; getFile?: () => Promise<File> }>;
    };
    for await (const entry of dirAny.values()) {
      const path = `${basePath}${entry.name}`;
      if (entry.kind === 'file') {
        let size: number | null = null;
        try {
          const file = await entry.getFile?.();
          size = file?.size ?? null;
        } catch {
          size = null;
        }
        out.push({
          path,
          name: entry.name,
          size,
          isFolder: false,
          parentHandle: dir,
          entryName: entry.name,
        });
      } else if (entry.kind === 'directory') {
        out.push({
          path: `${path}/`,
          name: entry.name,
          size: null,
          isFolder: true,
          parentHandle: dir,
          entryName: entry.name,
        });
        await walk(entry as FileSystemDirectoryHandle, `${path}/`);
      }
    }
  };

  await walk(trashHandle, '.trash/');
  return out;
}

async function collectS3TrashEntries(
  client: import('@aws-sdk/client-s3').S3Client,
  bucket: string,
): Promise<TrashFileEntry[]> {
  const contents = await listObjectsV2(client, bucket, '.trash/');
  const entries: TrashFileEntry[] = [];
  for (const item of contents) {
    const key = item?.Key;
    if (!key || isTrashRootKey(key)) continue;
    const isFolder = key.endsWith('/');
    entries.push({
      path: key,
      name: key.replace(/\/$/, '').split('/').pop() || key,
      size: isFolder ? null : typeof item.Size === 'number' ? item.Size : null,
      isFolder,
    });
  }
  return entries;
}

async function collectWebdavTrashEntries(config: {
  endpoint: string;
  username: string;
  password: string;
  basePath: string;
}): Promise<TrashFileEntry[]> {
  const raw = await webdavPropfindDeep(config, '.trash/');
  const entries: TrashFileEntry[] = [];
  for (const item of raw) {
    const key = String(item.key || '').replace(/^\/+/, '');
    if (!key || isTrashRootKey(key)) continue;
    entries.push({
      path: item.isCollection ? (key.endsWith('/') ? key : `${key}/`) : key,
      name: key.replace(/\/$/, '').split('/').pop() || key,
      size: typeof item.size === 'number' ? item.size : null,
      isFolder: Boolean(item.isCollection),
    });
  }
  return entries;
}

/**
 * Permanently delete trash entries matching the given options.
 * @returns number of deleted entries
 */
export async function executeEmptyTrash(args: {
  storageType: 's3' | 'local' | 'webdav';
  options: EmptyTrashOptions;
  getS3Client?: () => import('@aws-sdk/client-s3').S3Client | null;
  bucket?: string;
  localRootHandle?: FileSystemDirectoryHandle | null;
  webdavConfig?: {
    endpoint: string;
    username: string;
    password: string;
    basePath: string;
  } | null;
}): Promise<{ deletedCount: number; deletedPaths: string[]; emptiedAll: boolean }> {
  const { storageType, options } = args;

  if (storageType === 's3') {
    const client = args.getS3Client?.() ?? null;
    const bucket = args.bucket;
    if (!client || !bucket) throw new Error('S3가 연결되지 않았습니다.');

    const entries = await collectS3TrashEntries(client, bucket);
    const matched = filterTrashEntries(entries, options);

    if (options.mode === 'all') {
      const keys = entries.map((e) => e.path).filter(Boolean);
      if (keys.length) {
        await deleteObjects(
          client,
          bucket,
          keys.map((Key) => ({ Key })),
        );
      }
      await putObject(client, { Bucket: bucket, Key: '.trash/', Body: '' });
      return { deletedCount: keys.length, deletedPaths: keys, emptiedAll: true };
    }

    const fileKeys = matched.filter((e) => !e.isFolder).map((e) => e.path);
    if (fileKeys.length) {
      await deleteObjects(
        client,
        bucket,
        fileKeys.map((Key) => ({ Key })),
      );
    }
    return { deletedCount: fileKeys.length, deletedPaths: fileKeys, emptiedAll: false };
  }

  if (storageType === 'local') {
    const root = args.localRootHandle;
    if (!root) throw new Error('로컬 폴더가 열려 있지 않습니다.');

    if (options.mode === 'all') {
      let trashHandle: FileSystemDirectoryHandle;
      try {
        trashHandle = await root.getDirectoryHandle('.trash', { create: false });
      } catch {
        return { deletedCount: 0, deletedPaths: [], emptiedAll: true };
      }
      const names: string[] = [];
      const trashAny = trashHandle as FileSystemDirectoryHandle & {
        entries: () => AsyncIterableIterator<[string, FileSystemHandle]>;
      };
      for await (const [name] of trashAny.entries()) {
        names.push(name);
      }
      for (const name of names) {
        await trashHandle.removeEntry(name, { recursive: true });
      }
      return {
        deletedCount: names.length,
        deletedPaths: names.map((n) => `.trash/${n}`),
        emptiedAll: true,
      };
    }

    const entries = await collectLocalTrashEntries(root);
    const matched = entries.filter(
      (e) => !e.isFolder && matchesEmptyTrashFilter(e, options),
    );
    const deletedPaths: string[] = [];
    for (const entry of matched) {
      try {
        await entry.parentHandle.removeEntry(entry.entryName, { recursive: false });
        deletedPaths.push(entry.path);
      } catch {
        /* skip missing */
      }
    }
    return {
      deletedCount: deletedPaths.length,
      deletedPaths,
      emptiedAll: false,
    };
  }

  if (storageType === 'webdav') {
    const cfg = args.webdavConfig;
    if (!cfg?.endpoint || !cfg?.username) throw new Error('WebDAV가 연결되지 않았습니다.');
    const backend = createWebdavBackend(cfg);

    if (options.mode === 'all') {
      const entries = await collectWebdavTrashEntries(cfg);
      // Delete deepest paths first so parents can be removed cleanly.
      const sorted = [...entries].sort((a, b) => b.path.length - a.path.length);
      const deletedPaths: string[] = [];
      for (const entry of sorted) {
        try {
          if (entry.isFolder) await backend.deletePrefix(entry.path);
          else await backend.delete(entry.path);
          deletedPaths.push(entry.path);
        } catch {
          /* missing ok */
        }
      }
      try {
        await backend.mkdir('.trash');
      } catch {
        /* ignore */
      }
      return {
        deletedCount: deletedPaths.length,
        deletedPaths,
        emptiedAll: true,
      };
    }

    const entries = await collectWebdavTrashEntries(cfg);
    const matched = filterTrashEntries(entries, options).filter((e) => !e.isFolder);
    const deletedPaths: string[] = [];
    for (const entry of matched) {
      try {
        await backend.delete(entry.path);
        deletedPaths.push(entry.path);
      } catch {
        /* missing ok */
      }
    }
    return {
      deletedCount: deletedPaths.length,
      deletedPaths,
      emptiedAll: false,
    };
  }

  throw new Error(`지원하지 않는 저장소: ${storageType}`);
}

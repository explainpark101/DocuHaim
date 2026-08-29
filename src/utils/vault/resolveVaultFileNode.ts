import { findFileNodeByPath, findNodeByPath } from '@/utils/s3Tree';
import { resolveLocalFileNode } from '@/utils/localFileNode';
import { STORAGE_MODE_LOCAL, STORAGE_MODE_WEBDAV } from '@/utils/storageSettings';
import { vaultPathBasename } from '@/utils/vault/vaultPathBasename';

export type VaultStorageType = 's3' | 'local' | 'webdav';

export type VaultFileNode = {
  type: 'file';
  path: string;
  name: string;
  lastModified?: Date | number;
};

type ResolveVaultFileNodeOptions = {
  storageType: VaultStorageType;
  localTree: unknown[] | null | undefined;
  webdavTree: unknown[] | null | undefined;
  s3Tree: unknown[] | null | undefined;
  localRootHandle?: FileSystemDirectoryHandle | null;
};

export async function resolveVaultFileNode(
  path: string,
  options: ResolveVaultFileNodeOptions,
): Promise<VaultFileNode | null> {
  const trimmed = String(path || '').trim();
  if (!trimmed) return null;

  const { storageType, localTree, webdavTree, s3Tree, localRootHandle } = options;
  let node: { type?: string; path?: string; name?: string; lastModified?: Date | number } | null =
    null;

  if (storageType === STORAGE_MODE_LOCAL) {
    node =
      findFileNodeByPath(localTree as never, trimmed) ||
      findNodeByPath(localTree as never, trimmed) ||
      (localRootHandle ? await resolveLocalFileNode(localRootHandle, trimmed) : null);
  } else if (storageType === STORAGE_MODE_WEBDAV) {
    node =
      findFileNodeByPath(webdavTree as never, trimmed) ||
      findNodeByPath(webdavTree as never, trimmed);
  } else {
    node =
      findFileNodeByPath(s3Tree as never, trimmed) ||
      findNodeByPath(s3Tree as never, trimmed);
  }

  if (node?.type !== 'file') {
    return {
      type: 'file',
      path: trimmed,
      name: vaultPathBasename(trimmed),
    };
  }

  return {
    type: 'file',
    path: String(node.path || trimmed),
    name: String(node.name || vaultPathBasename(trimmed)),
    ...(node.lastModified != null ? { lastModified: node.lastModified } : {}),
  };
}

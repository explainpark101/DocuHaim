import type { FileUploadQueueContextValue } from '@/contexts/FileUploadQueueContext';

export class UploadQueueCancelledError extends Error {
  constructor(message = 'Upload cancelled') {
    super(message);
    this.name = 'UploadQueueCancelledError';
  }
}

export type VaultUploadEntry = {
  key: string;
  name: string;
  relativePath?: string;
};

export type VaultUploadRunner = {
  batchId: string;
  itemId: (key: string) => string;
  register: (key: string, name: string, relativePath?: string) => string;
  run: <T>(key: string, fn: () => Promise<T>) => Promise<T | undefined>;
  markSkipped: (key: string) => void;
  finish: () => void;
};

function resolveVaultKey<T>(result: T): string | undefined {
  if (typeof result === 'string' && result.trim()) return result;
  if (result && typeof result === 'object' && 'vaultKey' in result) {
    const key = (result as { vaultKey?: string }).vaultKey;
    if (typeof key === 'string' && key.trim()) return key;
  }
  return undefined;
}

export function createVaultUploadRunner(
  queue: FileUploadQueueContextValue,
  meta: { storageType: string; destPath?: string; label?: string },
  entries: VaultUploadEntry[] = [],
): VaultUploadRunner {
  const batchId = queue.beginBatch({
    storageType: meta.storageType,
    destPath: meta.destPath ?? '',
    ...(meta.label !== undefined ? { label: meta.label } : {}),
  });

  const idByKey = new Map<string, string>();
  const relativePathByKey = new Map<string, string>();

  const register = (key: string, name: string, relativePath?: string) => {
    const existing = idByKey.get(key);
    if (existing) return existing;
    const rel = relativePath ?? name;
    relativePathByKey.set(key, rel);
    const id = queue.enqueueItem(batchId, {
      name,
      relativePath: rel,
    });
    idByKey.set(key, id);
    return id;
  };

  for (const entry of entries) {
    register(entry.key, entry.name, entry.relativePath);
  }

  const itemId = (key: string) => {
    const existing = idByKey.get(key);
    if (existing) return existing;
    return register(key, key, key);
  };

  return {
    batchId,
    itemId,
    register,
    async run<T>(key: string, fn: () => Promise<T>): Promise<T | undefined> {
      const id = itemId(key);
      if (queue.isItemCancelled(id)) {
        return undefined;
      }
      queue.markUploading(id);
      try {
        const result = await fn();
        if (queue.isItemCancelled(id)) {
          return undefined;
        }
        const vaultKey =
          resolveVaultKey(result) ??
          `${meta.destPath ?? ''}${relativePathByKey.get(key) ?? key}`;
        queue.markDone(id, vaultKey);
        return result;
      } catch (error) {
        if (queue.isItemCancelled(id)) {
          return undefined;
        }
        const message = error instanceof Error ? error.message : String(error);
        queue.markError(id, message);
        throw error;
      }
    },
    markSkipped(key: string) {
      queue.markSkipped(itemId(key));
    },
    finish() {
      queue.finishBatch(batchId);
    },
  };
}

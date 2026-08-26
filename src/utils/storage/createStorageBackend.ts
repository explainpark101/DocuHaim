import { createS3Backend } from '@/utils/storage/s3Backend';
import { createLocalBackend } from '@/utils/storage/localBackend';
import { createWebdavBackend } from '@/utils/storage/webdavBackend';
import { createTauriLocalBackend } from '@/utils/storage/tauriLocalBackend';
import { getStorageCapabilities } from '@/utils/storage/capabilities';

/**
 * @typedef {Object} StorageBackendDeps
 * @property {'s3'|'local'|'webdav'} mode
 * @property {() => import('@aws-sdk/client-s3').S3Client | null} [getS3Client]
 * @property {{ bucket?: string } | null} [s3Creds]
 * @property {FileSystemDirectoryHandle | null} [localRootHandle]
 * @property {string} [localVaultFsPath] Absolute vault root (Tauri desktop)
 * @property {{ endpoint: string, username: string, password: string, basePath: string } | null} [webdavConfig]
 */

/**
 * @param {StorageBackendDeps} deps
 */
export function createStorageBackend(deps: any) {
  const mode = deps?.mode || 's3';
  if (mode === 'local') {
    const vaultPath = String(deps.localVaultFsPath || '').trim();
    if (vaultPath) {
      return createTauriLocalBackend(vaultPath);
    }
    return createLocalBackend(deps.localRootHandle ?? null);
  }
  if (mode === 'webdav') {
    return createWebdavBackend(deps.webdavConfig ?? null);
  }
  return createS3Backend({
    getClient: deps.getS3Client || (() => null),
    bucket: deps.s3Creds?.bucket || '',
  });
}

/**
 * Resolve backend for a file/node storage type (may differ from UI storageMode briefly).
 * @param {string} storageType
 * @param {Omit<StorageBackendDeps, 'mode'>} deps
 */
export function createStorageBackendForType(storageType: any, deps: any) {
  return createStorageBackend({ ...deps, mode: storageType || 's3' });
}

export { getStorageCapabilities };
export { supportsRemoteSync } from '@/utils/storage/capabilities';

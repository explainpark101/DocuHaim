import { createS3Backend } from './s3Backend.js';
import { createLocalBackend } from './localBackend.js';
import { createWebdavBackend } from './webdavBackend.js';
import { getStorageCapabilities } from './capabilities.js';

/**
 * @typedef {Object} StorageBackendDeps
 * @property {'s3'|'local'|'webdav'} mode
 * @property {() => import('@aws-sdk/client-s3').S3Client | null} [getS3Client]
 * @property {{ bucket?: string } | null} [s3Creds]
 * @property {FileSystemDirectoryHandle | null} [localRootHandle]
 * @property {{ endpoint: string, username: string, password: string, basePath: string } | null} [webdavConfig]
 */

/**
 * @param {StorageBackendDeps} deps
 */
export function createStorageBackend(deps) {
  const mode = deps?.mode || 's3';
  if (mode === 'local') {
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
export function createStorageBackendForType(storageType, deps) {
  return createStorageBackend({ ...deps, mode: storageType || 's3' });
}

export { getStorageCapabilities };
export { supportsRemoteSync } from './capabilities.js';

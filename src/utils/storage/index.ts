import { createS3Backend } from '@/utils/storage/s3Backend';
import { createLocalBackend } from '@/utils/storage/localBackend';
import { createWebdavBackend } from '@/utils/storage/webdavBackend';
import { createTauriLocalBackend } from '@/utils/storage/tauriLocalBackend';
import {
  getStorageCapabilities,
  supportsRemoteSync,
  STORAGE_CAPABILITIES,
} from '@/utils/storage/capabilities';
import { createStorageBackend, createStorageBackendForType } from '@/utils/storage/createStorageBackend';

export {
  createS3Backend,
  createLocalBackend,
  createWebdavBackend,
  createTauriLocalBackend,
  createStorageBackend,
  createStorageBackendForType,
  getStorageCapabilities,
  supportsRemoteSync,
  STORAGE_CAPABILITIES,
};

import { createS3Backend } from '@/utils/storage/s3Backend.js';
import { createLocalBackend } from '@/utils/storage/localBackend.js';
import { createWebdavBackend } from '@/utils/storage/webdavBackend.js';
import { createTauriLocalBackend } from '@/utils/storage/tauriLocalBackend';
import {
  getStorageCapabilities,
  supportsRemoteSync,
  STORAGE_CAPABILITIES,
} from '@/utils/storage/capabilities.js';
import { createStorageBackend, createStorageBackendForType } from '@/utils/storage/createStorageBackend.js';

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

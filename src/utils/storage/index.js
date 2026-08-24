import { createS3Backend } from './s3Backend.js';
import { createLocalBackend } from './localBackend.js';
import { createWebdavBackend } from './webdavBackend.js';
import { createTauriLocalBackend } from './tauriLocalBackend';
import {
  getStorageCapabilities,
  supportsRemoteSync,
  STORAGE_CAPABILITIES,
} from './capabilities.js';
import { createStorageBackend, createStorageBackendForType } from './createStorageBackend.js';

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

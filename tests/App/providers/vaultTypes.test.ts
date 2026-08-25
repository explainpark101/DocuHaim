import { describe, expect, it } from 'vitest';
import {
  isVaultPathStorageType,
  VAULT_PATH_STORAGE_TYPES,
} from '@/App/context/VaultContext';
import { createStorageBackendForType } from '@/utils/storage';

describe('Vault domain types', () => {
  it('lists vault-backed storage modes', () => {
    expect(VAULT_PATH_STORAGE_TYPES).toEqual(['s3', 'local', 'webdav']);
  });

  it('classifies vault path storage types', () => {
    expect(isVaultPathStorageType('s3')).toBe(true);
    expect(isVaultPathStorageType('local')).toBe(true);
    expect(isVaultPathStorageType('webdav')).toBe(true);
    expect(isVaultPathStorageType('session')).toBe(false);
    expect(isVaultPathStorageType(undefined)).toBe(false);
  });

  it('builds a backend for each vault storage type', () => {
    const deps = {
      getS3Client: () => null,
      s3Creds: { bucket: 'b' },
      localRootHandle: null,
      localVaultFsPath: '/tmp/vault',
      webdavConfig: { endpoint: 'https://example.com', username: 'u' },
    };
    for (const type of VAULT_PATH_STORAGE_TYPES) {
      expect(createStorageBackendForType(type, deps)).toBeTruthy();
    }
  });
});

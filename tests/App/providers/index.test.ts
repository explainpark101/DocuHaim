import { describe, expect, it } from 'vitest';
import {
  isVaultPathStorageType,
  VAULT_PATH_STORAGE_TYPES,
} from '@/App/context/VaultContext';
import { createAutoSaveSyncHandlers } from '@/App/providers/createAutoSaveSyncHandlers';
import { APP_PROVIDER_ORDER } from '@/App/providers/providerOrder';

describe('App provider public API', () => {
  it('documents fixed provider nesting order', () => {
    expect(APP_PROVIDER_ORDER).toEqual([
      'AppBootstrapStateProvider',
      'AppVaultStateProvider',
      'VaultProvider',
      'WorkspaceTabsProvider',
      'AppFileSessionStateProvider',
      'FileSessionProvider',
      'AppTreeOpsStateProvider',
      'TreeOpsProvider',
      'AppPwaSnippetsStateProvider',
      'RecordingProvider',
      'AppBootstrapProvider',
      'AppModalsProvider',
      'AutoSaveProvider',
    ]);
  });

  it('classifies vault path storage types', () => {
    expect(VAULT_PATH_STORAGE_TYPES).toEqual(['s3', 'local', 'webdav']);
    expect(isVaultPathStorageType('s3')).toBe(true);
    expect(isVaultPathStorageType('session')).toBe(false);
  });

  it('exports createAutoSaveSyncHandlers factory', () => {
    expect(typeof createAutoSaveSyncHandlers).toBe('function');
  });
});

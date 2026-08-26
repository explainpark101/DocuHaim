import { describe, expect, it } from 'vitest';
import {
  isVaultPathStorageType,
  VAULT_PATH_STORAGE_TYPES,
} from '@/App/context/VaultContext';
import { createAutoSaveSyncHandlers } from '@/App/providers/createAutoSaveSyncHandlers';
import { APP_LOGIC_PROVIDER_ORDER, APP_PROVIDER_ORDER } from '@/App/providers/providerOrder';

describe('App provider public API', () => {
  it('documents fixed provider nesting order (AppProviders.tsx)', () => {
    expect(APP_PROVIDER_ORDER).toEqual([
      'AppBootstrapStateProvider',
      'AppVaultStateProvider',
      'VaultProvider',
      'AppFileSessionStateProvider',
      'AppModalsStateProvider',
      'WorkspaceTabsProvider',
      'AppChromeStateProvider',
      'FileSessionProvider',
      'AppTreeOpsStateProvider',
      'TreeOpsProvider',
      'AppPwaSnippetsStateProvider',
      'RecordingProvider',
      'AppLogicProvider',
    ]);
  });

  it('documents AppLogicProvider inner nest order', () => {
    expect(APP_LOGIC_PROVIDER_ORDER).toEqual([
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

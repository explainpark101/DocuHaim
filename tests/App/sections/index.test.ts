import { describe, expect, it } from 'vitest';
import {
  APP_AUTH_ACTIONS_SECTION,
  APP_FILE_SESSION_SECTION,
  APP_INIT_SECTION,
  APP_LOCAL_FOLDER_SECTION,
  APP_STORAGE_BACKEND_SECTION,
  APP_TREE_CRUD_SECTION,
  createAutoSaveSyncHandlers,
  isVaultPathStorageType,
  VAULT_PATH_STORAGE_TYPES,
} from '@/App/sections';

describe('App/sections public API', () => {
  it('exports §1–6 section markers', () => {
    expect(APP_INIT_SECTION).toContain('Init');
    expect(APP_AUTH_ACTIONS_SECTION).toContain('Auth');
    expect(APP_STORAGE_BACKEND_SECTION).toContain('Storage');
    expect(APP_LOCAL_FOLDER_SECTION).toContain('Local');
    expect(APP_FILE_SESSION_SECTION).toContain('File');
    expect(APP_TREE_CRUD_SECTION).toContain('Tree');
  });

  it('classifies vault path storage types', () => {
    expect(VAULT_PATH_STORAGE_TYPES).toEqual(['s3', 'local', 'webdav']);
    expect(isVaultPathStorageType('s3')).toBe(true);
    expect(isVaultPathStorageType('local')).toBe(true);
    expect(isVaultPathStorageType('webdav')).toBe(true);
    expect(isVaultPathStorageType('session')).toBe(false);
    expect(isVaultPathStorageType(null)).toBe(false);
  });

  it('exports createAutoSaveSyncHandlers factory', () => {
    expect(typeof createAutoSaveSyncHandlers).toBe('function');
  });
});

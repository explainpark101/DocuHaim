import { describe, expect, it } from 'vitest';
import { isAppInternalVaultPath } from '@/utils/vault/idbVaultStore';

describe('isAppInternalVaultPath', () => {
  it('treats empty path as internal', () => {
    expect(isAppInternalVaultPath('')).toBe(true);
  });

  it('treats dot-folder roots as internal', () => {
    expect(isAppInternalVaultPath('.settings')).toBe(true);
    expect(
      isAppInternalVaultPath('.settings/advanced-search-exclude-folders.json'),
    ).toBe(true);
    expect(isAppInternalVaultPath('.chat-with-myself/2026-01-01.md')).toBe(true);
    expect(isAppInternalVaultPath('.trash/note.md')).toBe(true);
    expect(isAppInternalVaultPath('.advanced-search/luce')).toBe(true);
  });

  it('treats user notes as not internal', () => {
    expect(isAppInternalVaultPath('hello.md')).toBe(false);
    expect(isAppInternalVaultPath('notes/hello.md')).toBe(false);
    expect(isAppInternalVaultPath('folder')).toBe(false);
  });
});

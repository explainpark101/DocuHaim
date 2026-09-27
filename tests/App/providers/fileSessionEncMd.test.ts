import { webcrypto } from 'node:crypto';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

// encryptData uses window.crypto (browser); Vitest unit env is node.
(globalThis as { window?: { crypto: Crypto } }).window = {
  crypto: webcrypto as unknown as Crypto,
};

const {
  clearAllEncMdPasswords,
  commitEncMdRenamePasswords,
  encryptEncMdContent,
  getEncMdPassword,
  getEncMdRenameKind,
  isEncMdPath,
  prepareEncMdRenameWrite,
  reencryptEncMdContent,
  setEncMdPassword,
  decryptEncMdContent,
} = await import('@/utils/encMd');

describe('FileSession enc.md helpers', () => {
  beforeAll(() => {
    (globalThis as { window?: { crypto: Crypto } }).window = {
      crypto: webcrypto as unknown as Crypto,
    };
  });

  afterEach(() => {
    clearAllEncMdPasswords();
  });

  it('detects enc.md paths for skip/open gating', () => {
    expect(isEncMdPath('notes/secret.enc.md')).toBe(true);
    expect(isEncMdPath('notes/secret.md')).toBe(false);
    expect(isEncMdPath('secret.ENC.MD')).toBe(true);
  });

  it('detects .md <-> .enc.md rename transitions', () => {
    expect(getEncMdRenameKind('a.md', 'a.enc.md')).toBe('encrypt');
    expect(getEncMdRenameKind('a.enc.md', 'a.md')).toBe('decrypt');
    expect(getEncMdRenameKind('a.md', 'b.md')).toBe('none');
    expect(getEncMdRenameKind('a.enc.md', 'b.enc.md')).toBe('none');
  });

  it('prompts and encrypts when renaming .md -> .enc.md', async () => {
    const requestPassword = vi.fn(async () => 'secret-pw');
    const result = await prepareEncMdRenameWrite({
      oldPath: 'notes/a.md',
      newPath: 'notes/a.enc.md',
      plaintext: '# hello',
      readVaultText: async () => {
        throw new Error('should not read vault when plaintext is given');
      },
      requestPassword,
    });
    expect(requestPassword).toHaveBeenCalledOnce();
    expect(result?.kind).toBe('encrypt');
    expect(result?.plaintext).toBe('# hello');
    expect(result?.vaultBody).toContain('"ciphertext"');
    // Password is applied only after a successful vault write.
    expect(getEncMdPassword('notes/a.enc.md')).toBeNull();
    commitEncMdRenamePasswords(result!, 'notes/a.md', 'notes/a.enc.md');
    expect(getEncMdPassword('notes/a.enc.md')).toBe('secret-pw');
  });

  it('prompts and decrypts when renaming .enc.md -> .md', async () => {
    const ciphertext = await encryptEncMdContent('# secret note', 'pw123');
    setEncMdPassword('notes/a.enc.md', 'pw123');
    const requestPassword = vi.fn(async () => 'pw123');
    const result = await prepareEncMdRenameWrite({
      oldPath: 'notes/a.enc.md',
      newPath: 'notes/a.md',
      plaintext: null,
      readVaultText: async () => ciphertext,
      requestPassword,
    });
    expect(requestPassword).toHaveBeenCalledOnce();
    expect(result?.kind).toBe('decrypt');
    expect(result?.vaultBody).toBe('# secret note');
    expect(result?.plaintext).toBe('# secret note');
    // Still cached until commit
    expect(getEncMdPassword('notes/a.enc.md')).toBe('pw123');
    commitEncMdRenamePasswords(result!, 'notes/a.enc.md', 'notes/a.md');
    expect(getEncMdPassword('notes/a.enc.md')).toBeNull();
  });

  it('prefers editor plaintext on decrypt when open with unsaved edits', async () => {
    const ciphertext = await encryptEncMdContent('# vault', 'pw123');
    const requestPassword = vi.fn(async () => 'pw123');
    const result = await prepareEncMdRenameWrite({
      oldPath: 'notes/a.enc.md',
      newPath: 'notes/a.md',
      plaintext: '# editor dirty',
      readVaultText: async () => ciphertext,
      requestPassword,
    });
    expect(result?.vaultBody).toBe('# editor dirty');
    expect(result?.plaintext).toBe('# editor dirty');
  });

  it('re-encrypts enc.md body with a new password', async () => {
    const ciphertext = await encryptEncMdContent('# secret', 'old-pw');
    const { plaintext, vaultBody } = await reencryptEncMdContent(
      ciphertext,
      'old-pw',
      'new-pw',
    );
    expect(plaintext).toBe('# secret');
    expect(await decryptEncMdContent(vaultBody, 'new-pw')).toBe('# secret');
    await expect(decryptEncMdContent(vaultBody, 'old-pw')).rejects.toBeTruthy();
  });
});

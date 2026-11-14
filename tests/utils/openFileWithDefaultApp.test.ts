import { describe, expect, it } from 'vitest';
import { joinVaultAbsolutePath } from '@/utils/openFileWithDefaultApp';

describe('joinVaultAbsolutePath', () => {
  it('joins vault root and relative path with forward slashes', () => {
    expect(joinVaultAbsolutePath('C:/vault', 'notes/a.pdf')).toBe('C:/vault/notes/a.pdf');
    expect(joinVaultAbsolutePath('C:\\vault\\', '\\notes\\a.pdf')).toBe(
      'C:/vault/notes/a.pdf',
    );
  });

  it('returns root or relative alone when the other is empty', () => {
    expect(joinVaultAbsolutePath('C:/vault', '')).toBe('C:/vault');
    expect(joinVaultAbsolutePath('', 'a.pdf')).toBe('a.pdf');
  });
});

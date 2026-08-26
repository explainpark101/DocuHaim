import { describe, expect, it } from 'vitest';
import { isEncMdPath } from '@/utils/encMd';

describe('FileSession enc.md helpers', () => {
  it('detects enc.md paths for skip/open gating', () => {
    expect(isEncMdPath('notes/secret.enc.md')).toBe(true);
    expect(isEncMdPath('notes/secret.md')).toBe(false);
    expect(isEncMdPath('secret.ENC.MD')).toBe(true);
  });
});

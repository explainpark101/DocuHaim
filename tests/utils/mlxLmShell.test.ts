import { describe, expect, it } from 'bun:test';
import { buildUvBinCandidates, parseUvBinPath } from '@/utils/mlxLmShell';

describe('parseUvBinPath', () => {
  it('parses uv resolve output', () => {
    expect(parseUvBinPath('/Users/me/.local/bin/uv\n')).toBe('/Users/me/.local/bin/uv');
    expect(parseUvBinPath('  /opt/homebrew/bin/uv  ')).toBe('/opt/homebrew/bin/uv');
  });

  it('rejects invalid paths', () => {
    expect(parseUvBinPath('uv')).toBeNull();
    expect(parseUvBinPath('/tmp/evil\n/opt/homebrew/bin/uv')).toBe('/opt/homebrew/bin/uv');
    expect(parseUvBinPath('')).toBeNull();
  });
});

describe('buildUvBinCandidates', () => {
  it('includes homebrew and uv default install paths', () => {
    const candidates = buildUvBinCandidates('/Users/me');
    expect(candidates).toContain('/opt/homebrew/bin/uv');
    expect(candidates).toContain('/Users/me/.local/bin/uv');
    expect(candidates).toContain('/Users/me/.cargo/bin/uv');
  });
});

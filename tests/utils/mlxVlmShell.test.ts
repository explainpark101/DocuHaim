import { describe, expect, it } from 'vitest';
import { buildUvBinCandidates, hasInstalledModelsDelta, parseUvBinPath } from '@/utils/mlxVlmShell';

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

describe('hasInstalledModelsDelta', () => {
  it('detects newly discovered cache models', () => {
    const current = [
      { id: 'mlx-community/a', repoId: 'mlx-community/a', source: 'huggingface' as const, installedAt: 1 },
    ];
    const merged = [
      ...current,
      { id: 'mlx-community/b', repoId: 'mlx-community/b', source: 'huggingface' as const, installedAt: 0 },
    ];
    expect(hasInstalledModelsDelta(current, merged)).toBe(true);
    expect(hasInstalledModelsDelta(merged, merged)).toBe(false);
  });
});

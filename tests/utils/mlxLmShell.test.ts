import { describe, expect, it } from 'bun:test';
import { parseMlxLmServerBinPath } from '@/utils/mlxLmShell';

describe('parseMlxLmServerBinPath', () => {
  it('parses which output for mlx_lm.server', () => {
    expect(parseMlxLmServerBinPath('/opt/homebrew/bin/mlx_lm.server\n')).toBe(
      '/opt/homebrew/bin/mlx_lm.server',
    );
    expect(parseMlxLmServerBinPath('  /Users/me/.local/bin/mlx_lm.server  ')).toBe(
      '/Users/me/.local/bin/mlx_lm.server',
    );
  });

  it('rejects invalid paths', () => {
    expect(parseMlxLmServerBinPath('mlx_lm.server')).toBeNull();
    expect(parseMlxLmServerBinPath('/tmp/evil\n/opt/homebrew/bin/mlx_lm.server')).toBeNull();
    expect(parseMlxLmServerBinPath('')).toBeNull();
  });
});

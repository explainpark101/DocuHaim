import { describe, expect, it } from 'vitest';
import {
  buildLlamaServerBinCandidates,
  parseLlamaServerBinPath,
} from '@/utils/llm/llamaCppShell';

describe('parseLlamaServerBinPath', () => {
  it('parses unix llama-server path', () => {
    expect(parseLlamaServerBinPath('/opt/homebrew/bin/llama-server\n')).toBe(
      '/opt/homebrew/bin/llama-server',
    );
  });

  it('parses windows llama-server.exe path', () => {
    expect(parseLlamaServerBinPath('C:\\Tools\\llama-server.exe')).toBe('C:\\Tools\\llama-server.exe');
  });

  it('rejects invalid paths', () => {
    expect(parseLlamaServerBinPath('llama-server')).toBeNull();
  });
});

describe('buildLlamaServerBinCandidates', () => {
  it('includes homebrew and local install paths', () => {
    const candidates = buildLlamaServerBinCandidates('/Users/me');
    expect(candidates).toContain('/opt/homebrew/bin/llama-server');
    expect(candidates).toContain('/Users/me/.local/bin/llama-server');
  });
});

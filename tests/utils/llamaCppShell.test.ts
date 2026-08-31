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
  it('includes homebrew and local install paths on unix', () => {
    const candidates = buildLlamaServerBinCandidates('/Users/me', 'darwin');
    expect(candidates).toContain('/opt/homebrew/bin/llama-server');
    expect(candidates).toContain('/Users/me/.local/bin/llama-server');
  });

  it('includes LocalAppData llama-server.exe paths on windows', () => {
    const home = 'C:\\Users\\me';
    const candidates = buildLlamaServerBinCandidates(home, 'win32');
    expect(candidates).toContain(`${home}\\scoop\\shims\\llama-server.exe`);
    const localAppData = process.env.LOCALAPPDATA || `${home}\\AppData\\Local`;
    expect(candidates).toContain(`${localAppData}\\llama.cpp\\llama-server.exe`);
    expect(candidates).toContain(`${localAppData}\\Programs\\llama.cpp\\llama-server.exe`);
    expect(candidates).toContain('llama-server.exe');
  });
});

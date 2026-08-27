import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getLocalLlmModelAlias,
  localLlmModelDisplayName,
  normalizeLocalLlmModelAliasStore,
  setLocalLlmModelAlias,
  withLocalLlmModelAliases,
} from '@/utils/llm/localLlmModelAliases';

function installMemoryLocalStorage() {
  const map = new Map<string, string>();
  const storage = {
    getItem: (key: string) => (map.has(key) ? map.get(key)! : null),
    setItem: (key: string, value: string) => {
      map.set(key, String(value));
    },
    removeItem: (key: string) => {
      map.delete(key);
    },
    clear: () => {
      map.clear();
    },
  };
  vi.stubGlobal('localStorage', storage);
  vi.stubGlobal(
    'window',
    {
      ...(typeof window !== 'undefined' ? window : {}),
      localStorage: storage,
      dispatchEvent: () => true,
    } as unknown as Window & typeof globalThis,
  );
}

describe('localLlmModelAliases', () => {
  beforeEach(() => {
    installMemoryLocalStorage();
  });

  it('normalizes nested scope maps and drops empty aliases', () => {
    expect(
      normalizeLocalLlmModelAliasStore({
        'mlx-vlm': { 'org/a': ' Fast ', 'org/b': '  ' },
        'llama-cpp': { 'org/c': 'Tiny' },
        other: { x: 'y' },
      }),
    ).toEqual({
      'mlx-vlm': { 'org/a': 'Fast' },
      'llama-cpp': { 'org/c': 'Tiny' },
    });
  });

  it('persists aliases per scope in localStorage', () => {
    setLocalLlmModelAlias('mlx-vlm', 'mlx-community/Foo-4bit', 'Foo');
    setLocalLlmModelAlias('llama-cpp', 'org/Bar-Q4_K_M', 'Bar');
    expect(getLocalLlmModelAlias('mlx-vlm', 'mlx-community/Foo-4bit')).toBe('Foo');
    expect(getLocalLlmModelAlias('llama-cpp', 'org/Bar-Q4_K_M')).toBe('Bar');
    expect(getLocalLlmModelAlias('mlx-vlm', 'org/Bar-Q4_K_M')).toBe('');
  });

  it('clears alias when set to empty', () => {
    setLocalLlmModelAlias('llama-cpp', 'org/model', 'Nick');
    setLocalLlmModelAlias('llama-cpp', 'org/model', '  ');
    expect(getLocalLlmModelAlias('llama-cpp', 'org/model')).toBe('');
  });

  it('formats display names and option labels', () => {
    setLocalLlmModelAlias('llama-cpp', 'long/id', 'Short');
    expect(localLlmModelDisplayName('llama-cpp', 'long/id')).toBe('Short');
    expect(localLlmModelDisplayName('llama-cpp', 'other')).toBe('other');
    expect(
      withLocalLlmModelAliases('llama-cpp', [
        { id: 'long/id', displayName: 'long/id' },
        { id: 'other', displayName: 'other' },
      ]),
    ).toEqual([
      { id: 'long/id', displayName: 'Short' },
      { id: 'other', displayName: 'other' },
    ]);
  });
});

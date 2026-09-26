import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  isLlmAssistPresentation,
  loadLlmAssistPresentation,
  saveLlmAssistPresentation,
} from '@/utils/llm/llmAssistPresentation';

function createMemoryStorage(): Storage {
  const map = new Map<string, string>();
  return {
    get length() {
      return map.size;
    },
    clear() {
      map.clear();
    },
    getItem(key: string) {
      return map.has(key) ? map.get(key)! : null;
    },
    key(index: number) {
      return [...map.keys()][index] ?? null;
    },
    removeItem(key: string) {
      map.delete(key);
    },
    setItem(key: string, value: string) {
      map.set(key, String(value));
    },
  };
}

describe('llmAssistPresentation', () => {
  beforeEach(() => {
    const storage = createMemoryStorage();
    vi.stubGlobal('localStorage', storage);
    vi.stubGlobal('window', { localStorage: storage });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('accepts floating, docked, and split', () => {
    expect(isLlmAssistPresentation('floating')).toBe(true);
    expect(isLlmAssistPresentation('docked')).toBe(true);
    expect(isLlmAssistPresentation('split')).toBe(true);
    expect(isLlmAssistPresentation('popout')).toBe(false);
  });

  it('loads and saves split presentation', () => {
    saveLlmAssistPresentation('split');
    expect(loadLlmAssistPresentation()).toBe('split');
    saveLlmAssistPresentation('docked');
    expect(loadLlmAssistPresentation()).toBe('docked');
  });

  it('defaults to floating when missing or invalid', () => {
    expect(loadLlmAssistPresentation()).toBe('floating');
    localStorage.setItem('s3haim-llm-assist-presentation', 'nope');
    expect(loadLlmAssistPresentation()).toBe('floating');
  });
});

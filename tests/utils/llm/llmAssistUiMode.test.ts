import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  isLlmAssistUiMode,
  loadLlmAssistUiMode,
  saveLlmAssistUiMode,
} from '@/utils/llm/llmAssistUiMode';

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

describe('llmAssistUiMode', () => {
  beforeEach(() => {
    const storage = createMemoryStorage();
    vi.stubGlobal('localStorage', storage);
    vi.stubGlobal('window', { localStorage: storage });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('accepts edit and chat', () => {
    expect(isLlmAssistUiMode('edit')).toBe(true);
    expect(isLlmAssistUiMode('chat')).toBe(true);
    expect(isLlmAssistUiMode('transform')).toBe(false);
  });

  it('loads and saves ui mode', () => {
    saveLlmAssistUiMode('chat');
    expect(loadLlmAssistUiMode()).toBe('chat');
    saveLlmAssistUiMode('edit');
    expect(loadLlmAssistUiMode()).toBe('edit');
  });

  it('defaults to edit when missing or invalid', () => {
    expect(loadLlmAssistUiMode()).toBe('edit');
    localStorage.setItem('s3haim-llm-assist-ui-mode', 'nope');
    expect(loadLlmAssistUiMode()).toBe('edit');
  });
});

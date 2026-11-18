import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  deriveThreadTitle,
  loadLlmAssistChatThreads,
  saveLlmAssistChatThreads,
  upsertLlmAssistChatThread,
} from '@/utils/llm/llmAssistChatThreads';

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

describe('llmAssistChatThreads', () => {
  beforeEach(() => {
    const storage = createMemoryStorage();
    vi.stubGlobal('localStorage', storage);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('derives title from first user message', () => {
    expect(
      deriveThreadTitle([
        { id: '1', role: 'user', content: 'hello world this is a long message for title' },
      ]),
    ).toContain('hello world');
  });

  it('saves and loads threads', () => {
    const next = upsertLlmAssistChatThread([], {
      id: 't1',
      title: 'Hello',
      messages: [{ id: 'm1', role: 'user', content: 'Hello' }],
      createdAt: 1,
      updatedAt: 2,
    });
    saveLlmAssistChatThreads(next);
    expect(loadLlmAssistChatThreads()[0]?.id).toBe('t1');
  });
});

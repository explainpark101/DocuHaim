import { describe, expect, it } from 'vitest';
import { createLlmChatMessageId } from '@/utils/llm/llmChatStream';

describe('llmChatStream helpers', () => {
  it('creates non-empty message ids', () => {
    const a = createLlmChatMessageId();
    const b = createLlmChatMessageId();
    expect(a.length).toBeGreaterThan(4);
    expect(b.length).toBeGreaterThan(4);
    expect(a).not.toBe(b);
  });
});

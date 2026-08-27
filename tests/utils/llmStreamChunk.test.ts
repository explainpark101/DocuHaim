import { describe, expect, it } from 'vitest';
import { mergeLlmStreamChunk } from '@/utils/llm/llmStreamChunk';
import { mergeMlxVlmStreamChunk } from '@/utils/llm/mlxVlmRuntime';

describe('mergeLlmStreamChunk', () => {
  it('appends token deltas', () => {
    expect(mergeLlmStreamChunk('hel', 'lo')).toBe('hello');
    expect(mergeLlmStreamChunk('hello', ' world')).toBe('hello world');
  });

  it('accepts cumulative payloads without duplicating prefix', () => {
    expect(mergeLlmStreamChunk('hel', 'hello')).toBe('hello');
    expect(mergeLlmStreamChunk('hello', 'hello world')).toBe('hello world');
    expect(mergeLlmStreamChunk('hello world', 'hello world again')).toBe('hello world again');
  });

  it('ignores empty segments', () => {
    expect(mergeLlmStreamChunk('hello', '')).toBe('hello');
    expect(mergeLlmStreamChunk('', 'hi')).toBe('hi');
  });
});

describe('mergeMlxVlmStreamChunk', () => {
  it('matches mergeLlmStreamChunk', () => {
    expect(mergeMlxVlmStreamChunk('hello', 'hello world')).toBe('hello world');
  });
});

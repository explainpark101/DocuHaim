import { describe, expect, it } from 'vitest';
import { mergeMlxVlmStreamChunk } from '@/utils/llm/mlxVlmRuntime';

describe('mergeMlxVlmStreamChunk', () => {
  it('appends token deltas', () => {
    expect(mergeMlxVlmStreamChunk('hel', 'lo')).toBe('hello');
    expect(mergeMlxVlmStreamChunk('hello', ' world')).toBe('hello world');
  });

  it('accepts already-accumulated payloads', () => {
    expect(mergeMlxVlmStreamChunk('hel', 'hello')).toBe('hello');
    expect(mergeMlxVlmStreamChunk('hello', 'hello world')).toBe('hello world');
  });

  it('ignores empty segments', () => {
    expect(mergeMlxVlmStreamChunk('hello', '')).toBe('hello');
    expect(mergeMlxVlmStreamChunk('', 'hi')).toBe('hi');
  });
});

import { describe, expect, it } from 'vitest';
import {
  appendMlxVlmServerLogText,
  getMlxVlmServerLogLines,
  getMlxVlmServerLogText,
  resetMlxVlmServerLog,
} from '@/utils/llm/mlxVlmServerLog';

describe('mlxVlmServerLog', () => {
  it('appends raw log lines', () => {
    resetMlxVlmServerLog();
    appendMlxVlmServerLogText('line-1\n');
    appendMlxVlmServerLogText('line-2\n');
    expect(getMlxVlmServerLogText()).toBe('line-1\nline-2\n');
    expect(getMlxVlmServerLogLines().map((line) => line.text)).toEqual(['line-1', 'line-2']);
  });

  it('ignores empty chunks', () => {
    resetMlxVlmServerLog();
    appendMlxVlmServerLogText('ready\n');
    appendMlxVlmServerLogText('');
    expect(getMlxVlmServerLogText()).toBe('ready\n');
  });
});

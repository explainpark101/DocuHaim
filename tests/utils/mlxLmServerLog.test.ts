import { describe, expect, it } from 'vitest';
import {
  appendMlxLmServerLogText,
  getMlxLmServerLogText,
  resetMlxLmServerLog,
} from '@/utils/llm/mlxLmServerLog';

describe('mlxLmServerLog', () => {
  it('appends log text and trims when exceeding max size', () => {
    resetMlxLmServerLog();
    appendMlxLmServerLogText('line-1\n');
    appendMlxLmServerLogText('line-2\n');
    expect(getMlxLmServerLogText()).toBe('line-1\nline-2\n');

    resetMlxLmServerLog();
    appendMlxLmServerLogText('x'.repeat(130_000));
    expect(getMlxLmServerLogText().length).toBe(120_000);
    expect(getMlxLmServerLogText().endsWith('x')).toBe(true);
  });

  it('ignores empty chunks', () => {
    resetMlxLmServerLog();
    appendMlxLmServerLogText('ready\n');
    appendMlxLmServerLogText('');
    expect(getMlxLmServerLogText()).toBe('ready\n');
  });
});

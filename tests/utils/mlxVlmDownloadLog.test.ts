import { describe, expect, it } from 'vitest';
import { MlxVlmRawLogBuffer } from '@/utils/llm/mlxVlmRawLogBuffer';
import {
  appendMlxVlmDownloadLogText,
  getMlxVlmDownloadLogLines,
  getMlxVlmDownloadLogText,
  resetMlxVlmDownloadLog,
} from '@/utils/llm/mlxVlmDownloadLog';

describe('MlxVlmRawLogBuffer', () => {
  it('replaces the current line on carriage returns like tqdm', () => {
    const buffer = new MlxVlmRawLogBuffer();
    buffer.append('Fetching 11 files:   0%\rFetching 11 files:  64%');
    expect(buffer.getLines().map((line) => line.text)).toEqual(['Fetching 11 files:  64%']);

    buffer.reset();
    buffer.append('line-1\n\rpartial\rdone\n');
    expect(buffer.getLines().map((line) => line.text)).toEqual(['line-1', 'done']);
  });

  it('trims oldest lines when exceeding max lines', () => {
    const buffer = new MlxVlmRawLogBuffer(3);
    buffer.append('a\nb\nc\nd\n');
    expect(buffer.getLines().map((line) => line.text)).toEqual(['b', 'c', 'd']);
  });
});

describe('mlxVlmDownloadLog', () => {
  it('appends raw log lines', () => {
    resetMlxVlmDownloadLog();
    appendMlxVlmDownloadLogText('line-1\n');
    appendMlxVlmDownloadLogText('line-2\n');
    expect(getMlxVlmDownloadLogText()).toBe('line-1\nline-2\n');
    expect(getMlxVlmDownloadLogLines().map((line) => line.text)).toEqual(['line-1', 'line-2']);
  });
});

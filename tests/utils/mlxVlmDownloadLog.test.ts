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

  it('keeps the in-progress tqdm line when a chunk ends with trailing \\r', () => {
    const buffer = new MlxVlmRawLogBuffer();
    buffer.append('Downloading GGUF model: org/model\n  parallel workers: 16\n');
    buffer.append('Fetching 5 files:  20%|██        | 1/5 [00:01<00:04,  1.00s/it]\r');
    expect(buffer.getLines().map((line) => line.text)).toEqual([
      'Downloading GGUF model: org/model',
      '  parallel workers: 16',
      'Fetching 5 files:  20%|██        | 1/5 [00:01<00:04,  1.00s/it]',
    ]);

    buffer.append('Fetching 5 files:  80%|████████  | 4/5 [00:03<00:00,  1.20s/it]\r');
    expect(buffer.getLines().map((line) => line.text).at(-1)).toBe(
      'Fetching 5 files:  80%|████████  | 4/5 [00:03<00:00,  1.20s/it]',
    );
  });

  it('treats \\r\\n as a normal line ending without wiping the previous line', () => {
    const buffer = new MlxVlmRawLogBuffer();
    buffer.append('hello\r\nworld\r\n');
    expect(buffer.getLines().map((line) => line.text)).toEqual(['hello', 'world']);
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

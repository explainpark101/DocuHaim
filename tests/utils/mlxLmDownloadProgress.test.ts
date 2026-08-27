import { describe, expect, it } from 'bun:test';
import {
  formatMlxLmDownloadProgressLabel,
  mergeMlxLmDownloadProgressChunk,
  normalizeMlxLmDownloadOutputChunk,
  parseMlxLmDownloadProgressLine,
} from '@/utils/llm/mlxLmDownloadProgress';

describe('normalizeMlxLmDownloadOutputChunk', () => {
  it('keeps the latest carriage-return segment', () => {
    expect(normalizeMlxLmDownloadOutputChunk('\r 10%\r 20%\r 45%| 450M/1.00G')).toBe('45%| 450M/1.00G');
  });
});

describe('parseMlxLmDownloadProgressLine', () => {
  it('parses tqdm size progress', () => {
    const snapshot = parseMlxLmDownloadProgressLine(
      'Downloading model.safetensors:  45%|████▌     | 450M/1.00G [00:30<00:37, 15.0MB/s]',
    );
    expect(snapshot).not.toBeNull();
    expect(snapshot?.currentBytes).toBe(450_000_000);
    expect(snapshot?.totalBytes).toBe(1_000_000_000);
    expect(snapshot?.percent).toBe(45);
    expect(snapshot?.label).toBe('450.0 MB / 1.0 GB (45%)');
  });

  it('updates percent from later chunks', () => {
    const first = parseMlxLmDownloadProgressLine(' 10%|█ | 100M/1.00G');
    const second = mergeMlxLmDownloadProgressChunk(' 55%|█████ | 550M/1.00G', first);
    expect(second?.label).toBe('550.0 MB / 1.0 GB (55%)');
  });
});

describe('formatMlxLmDownloadProgressLabel', () => {
  it('formats size pair with percent', () => {
    expect(
      formatMlxLmDownloadProgressLabel({
        currentBytes: 1_200_000_000,
        totalBytes: 4_500_000_000,
        percent: 26.7,
      }),
    ).toBe('1.2 GB / 4.5 GB (27%)');
  });
});

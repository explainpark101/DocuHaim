import { describe, expect, it } from 'vitest';
import {
  buildMlxVlmDownloadProgressFromBytes,
  buildMlxVlmDownloadProgressFromCurrentBytes,
  extractMlxVlmDownloadStatusMessage,
  formatMlxVlmDownloadProgressLabel,
  isMlxVlmDownloadNoiseLine,
  mergeMlxVlmDownloadProgressChunk,
  normalizeMlxVlmDownloadOutputChunk,
  parseMlxVlmDownloadProgressLine,
  pickMlxVlmDownloadProgress,
} from '@/utils/llm/mlxVlmDownloadProgress';

describe('normalizeMlxVlmDownloadOutputChunk', () => {
  it('keeps the latest carriage-return segment', () => {
    expect(normalizeMlxVlmDownloadOutputChunk('\r 10%\r 20%\r 45%| 450M/1.00G')).toBe('45%| 450M/1.00G');
  });
});

describe('extractMlxVlmDownloadStatusMessage', () => {
  it('filters HF auth warnings and keeps meaningful status', () => {
    const chunk =
      'Warning: You are sending unauthenticated requests to the HF Hub. Please set a HF_TOKEN to enable higher rate limits and faster downloads.\nDownloading model.safetensors';
    expect(extractMlxVlmDownloadStatusMessage(chunk, 'Starting download…')).toBe(
      'Downloading model.safetensors',
    );
    expect(
      isMlxVlmDownloadNoiseLine(
        'Warning: You are sending unauthenticated requests to the HF Hub. Please set a HF_TOKEN to enable higher rate limits and faster downloads.',
      ),
    ).toBe(true);
  });
});

describe('parseMlxVlmDownloadProgressLine', () => {
  it('parses tqdm size progress', () => {
    const snapshot = parseMlxVlmDownloadProgressLine(
      'Downloading model.safetensors:  45%|████▌     | 450M/1.00G [00:30<00:37, 15.0MB/s]',
    );
    expect(snapshot).not.toBeNull();
    expect(snapshot?.currentBytes).toBe(450_000_000);
    expect(snapshot?.totalBytes).toBe(1_000_000_000);
    expect(snapshot?.percent).toBe(45);
    expect(snapshot?.label).toBe('450.0 MB / 1.0 GB (45%)');
  });

  it('updates percent from later chunks', () => {
    const first = parseMlxVlmDownloadProgressLine(' 10%|█ | 100M/1.00G');
    const second = mergeMlxVlmDownloadProgressChunk(' 55%|█████ | 550M/1.00G', first);
    expect(second?.label).toBe('550.0 MB / 1.0 GB (55%)');
  });
});

describe('formatMlxVlmDownloadProgressLabel', () => {
  it('formats size pair with percent', () => {
    expect(
      formatMlxVlmDownloadProgressLabel({
        currentBytes: 1_200_000_000,
        totalBytes: 4_500_000_000,
        percent: 26.7,
      }),
    ).toBe('1.2 GB / 4.5 GB (27%)');
  });
});

describe('buildMlxVlmDownloadProgressFromBytes', () => {
  it('builds a clamped progress snapshot', () => {
    const snapshot = buildMlxVlmDownloadProgressFromBytes(450_000_000, 1_000_000_000);
    expect(snapshot?.label).toBe('450.0 MB / 1.0 GB (45%)');
  });
});

describe('buildMlxVlmDownloadProgressFromCurrentBytes', () => {
  it('builds bytes-only progress when total size is unknown', () => {
    expect(buildMlxVlmDownloadProgressFromCurrentBytes(450_000_000)?.label).toBe('450.0 MB downloaded');
  });
});

describe('pickMlxVlmDownloadProgress', () => {
  it('keeps the furthest progress snapshot', () => {
    const first = buildMlxVlmDownloadProgressFromBytes(100_000_000, 1_000_000_000);
    const second = buildMlxVlmDownloadProgressFromBytes(550_000_000, 1_000_000_000);
    expect(pickMlxVlmDownloadProgress(first, second)?.label).toBe('550.0 MB / 1.0 GB (55%)');
    expect(pickMlxVlmDownloadProgress(second, first)?.label).toBe('550.0 MB / 1.0 GB (55%)');
  });
});

import { describe, expect, it } from 'vitest';
import {
  assessMlxModelFeasibility,
  estimateMlxRamBytes,
  formatByteSize,
  sumHfGgufRepoFileEntryBytes,
  sumHfSiblingBytes,
} from '@/utils/llm/mlxVlmModelSizing';
import { buildMlxVlmDownloadConfirmMessage } from '@/utils/mlxVlmHuggingFace';
import {
  formatHfGgufDiskSizeLabel,
  sumHfGgufSiblingBytes,
} from '@/utils/llm/llamaCppHuggingFace';

describe('mlxVlmModelSizing', () => {
  it('formats byte sizes', () => {
    expect(formatByteSize(4.2 * 1024 ** 3)).toBe('4.2 GB');
    expect(formatByteSize(512 * 1024 ** 2)).toBe('512 MB');
  });

  it('sums HF sibling sizes', () => {
    expect(
      sumHfSiblingBytes([
        { rfilename: 'a.safetensors', size: 1000 },
        { rfilename: 'b.safetensors', size: 2000 },
      ]),
    ).toBe(3000);
    expect(
      sumHfSiblingBytes([
        {
          rfilename: 'model.safetensors',
          size: 135,
          lfs: { size: 5_000_000_000, pointerSize: 135 },
        },
        { rfilename: 'config.json', size: 1200 },
      ]),
    ).toBe(5_000_001_200);
  });

  it('sums HF tree entries and gguf-only footprints', () => {
    const tree = [
      { path: '.gitattributes', size: 2842 },
      {
        path: 'Llama-3.2-3B-Instruct-IQ3_M.gguf',
        size: 135,
        lfs: { size: 1_599_668_768, pointerSize: 135 },
      },
      {
        path: 'Llama-3.2-3B-Instruct-IQ4_XS.gguf',
        size: 135,
        lfs: { size: 1_829_110_304, pointerSize: 135 },
      },
    ];
    expect(sumHfGgufRepoFileEntryBytes(tree)).toBe(3_428_779_072);
    expect(sumHfGgufSiblingBytes([{ rfilename: 'model.gguf' }])).toBeUndefined();
    expect(formatHfGgufDiskSizeLabel(3_428_779_072)).toBe('3.2 GB');
  });

  it('estimates RAM from disk bytes and model id heuristics', () => {
    const fromDisk = estimateMlxRamBytes('mlx-community/foo', 4 * 1024 ** 3);
    expect(fromDisk).toBeGreaterThan(4 * 1024 ** 3);
    const fromName = estimateMlxRamBytes('mlx-community/Llama-3.2-3B-Instruct-4bit');
    expect(fromName).toBeGreaterThan(1 * 1024 ** 3);
  });

  it('assesses feasibility against available memory budget', () => {
    const need = 8 * 1024 ** 3;
    expect(assessMlxModelFeasibility(need, 16 * 1024 ** 3)).toBe('ok');
    expect(assessMlxModelFeasibility(need, 9 * 1024 ** 3)).toBe('tight');
    expect(assessMlxModelFeasibility(need, 6 * 1024 ** 3)).toBe('unlikely');
  });
});

describe('buildMlxVlmDownloadConfirmMessage resources', () => {
  it('includes disk and RAM lines when hit metadata is present', () => {
    const msg = buildMlxVlmDownloadConfirmMessage('mlx-community/a', 'download', {
      diskBytes: 2 * 1024 ** 3,
      estimatedRamBytes: 2.5 * 1024 ** 3,
      feasibility: 'ok',
    });
    expect(msg.message).toContain('다운로드 용량');
    expect(msg.message).toContain('예상 RAM');
    expect(msg.message).toContain('실행 가능');
  });
});

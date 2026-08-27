import { describe, expect, it } from 'bun:test';
import {
  buildMlxLmDownloadConfirmMessage,
  cacheDirEntryToRepoId,
  isMlxCommunityRepoId,
  parseHuggingFaceModelUrl,
  resolveMlxLmDownloadMode,
} from '@/utils/mlxLmHuggingFace';
import { resolveMlxLmOpenAiBaseUrl } from '@/utils/mlxLmSettingsStore';

describe('mlxLmHuggingFace', () => {
  it('parses huggingface model URLs and repo ids', () => {
    expect(parseHuggingFaceModelUrl('mlx-community/Llama-3.2-3B-Instruct-4bit')).toBe(
      'mlx-community/Llama-3.2-3B-Instruct-4bit',
    );
    expect(
      parseHuggingFaceModelUrl(
        'https://huggingface.co/mlx-community/Llama-3.2-3B-Instruct-4bit/tree/main',
      ),
    ).toBe('mlx-community/Llama-3.2-3B-Instruct-4bit');
    expect(parseHuggingFaceModelUrl('https://example.com/foo/bar')).toBeNull();
  });

  it('maps HF cache directory names to repo ids', () => {
    expect(cacheDirEntryToRepoId('models--mlx-community--Llama-3.2-3B-Instruct-4bit')).toBe(
      'mlx-community/Llama-3.2-3B-Instruct-4bit',
    );
  });

  it('chooses download mode for mlx-community repos', () => {
    expect(isMlxCommunityRepoId('mlx-community/foo')).toBe(true);
    expect(resolveMlxLmDownloadMode('mlx-community/foo')).toBe('download');
    expect(resolveMlxLmDownloadMode('meta-llama/Llama-3.1-8B')).toBe('convert');
  });

  it('builds confirm copy for download vs convert', () => {
    expect(buildMlxLmDownloadConfirmMessage('mlx-community/a', 'download').title).toContain('MLX');
    expect(buildMlxLmDownloadConfirmMessage('meta-llama/a', 'convert').title).toContain('변환');
  });
});

describe('resolveMlxLmOpenAiBaseUrl', () => {
  it('builds OpenAI-compatible base URL', () => {
    expect(resolveMlxLmOpenAiBaseUrl({ host: '127.0.0.1', port: 8080 })).toBe(
      'http://127.0.0.1:8080/v1',
    );
  });
});

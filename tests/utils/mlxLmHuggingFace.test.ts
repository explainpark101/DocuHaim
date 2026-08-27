import { describe, expect, it } from 'bun:test';
import {
  buildMlxLmDownloadConfirmMessage,
  buildMlxLmRedownloadConfirmMessage,
  buildMlxLmDeleteConfirmMessage,
  cacheDirEntryToRepoId,
  isMlxCommunityRepoId,
  parseHuggingFaceModelUrl,
  repoIdToCacheDirEntryName,
  resolveMlxLmDownloadMode,
} from '@/utils/mlxLmHuggingFace';
import { isMlxLmRepoInstalled, removeInstalledModel, resolveMlxLmOpenAiBaseUrl } from '@/utils/mlxLmSettingsStore';
import { isMlxLmModelInUse } from '@/utils/mlxLmShell';

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
    expect(repoIdToCacheDirEntryName('mlx-community/Llama-3.2-3B-Instruct-4bit')).toBe(
      'models--mlx-community--Llama-3.2-3B-Instruct-4bit',
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
    expect(buildMlxLmRedownloadConfirmMessage('mlx-community/a', 'download').title).toContain('다시');
    expect(buildMlxLmDeleteConfirmMessage('mlx-community/a').message).toContain('mlx-community/a');
  });
});

describe('mlxLm model registry', () => {
  it('detects installed repo ids', () => {
    const models = [
      { id: 'mlx-community/a', repoId: 'mlx-community/a' },
      { id: 'mlx-community/b', repoId: 'mlx-community/b' },
    ];
    expect(isMlxLmRepoInstalled('mlx-community/a', models)).toBe(true);
    expect(isMlxLmRepoInstalled('mlx-community/c', models)).toBe(false);
  });

  it('clears selected model when removed', () => {
    const next = removeInstalledModel(
      {
        host: '127.0.0.1',
        port: 8080,
        adapterPath: '',
        selectedModelId: 'mlx-community/a',
        installedModels: [
          { id: 'mlx-community/a', repoId: 'mlx-community/a', source: 'huggingface', installedAt: 1 },
          { id: 'mlx-community/b', repoId: 'mlx-community/b', source: 'huggingface', installedAt: 2 },
        ],
      },
      'mlx-community/a',
    );
    expect(next.selectedModelId).toBe('mlx-community/b');
    expect(next.installedModels).toHaveLength(1);
  });

  it('detects models in use while server is running', () => {
    expect(
      isMlxLmModelInUse(
        'mlx-community/a',
        {
          host: '127.0.0.1',
          port: 8080,
          adapterPath: '',
          selectedModelId: 'mlx-community/a',
          installedModels: [],
        },
        { running: true, models: ['mlx-community/a'] },
      ),
    ).toBe(true);
    expect(
      isMlxLmModelInUse(
        'mlx-community/b',
        {
          host: '127.0.0.1',
          port: 8080,
          adapterPath: '',
          selectedModelId: 'mlx-community/a',
          installedModels: [],
        },
        { running: false, models: [] },
      ),
    ).toBe(false);
  });
});

describe('resolveMlxLmOpenAiBaseUrl', () => {
  it('builds OpenAI-compatible base URL', () => {
    expect(resolveMlxLmOpenAiBaseUrl({ host: '127.0.0.1', port: 8080, allowExternalAccess: false })).toBe(
      'http://127.0.0.1:8080/v1',
    );
  });

  it('uses localhost client URL when external access is enabled', () => {
    expect(resolveMlxLmOpenAiBaseUrl({ host: '0.0.0.0', port: 8080, allowExternalAccess: true })).toBe(
      'http://127.0.0.1:8080/v1',
    );
  });
});

import { describe, expect, it } from 'vitest';
import {
  buildMlxVlmDownloadConfirmMessage,
  buildMlxVlmRedownloadConfirmMessage,
  buildMlxVlmDeleteConfirmMessage,
  buildMlxVlmDownloadAbortConfirmMessage,
  cacheDirEntryToRepoId,
  huggingFaceCacheEntryMatchesRepo,
  isMlxCommunityRepoId,
  parseHuggingFaceModelUrl,
  repoIdToCacheDirEntryName,
  resolveMlxVlmDownloadMode,
} from '@/utils/mlxVlmHuggingFace';
import { isMlxVlmRepoInstalled, removeInstalledModel } from '@/utils/mlxVlmSettingsStore';
import { isMlxVlmModelInUse } from '@/utils/mlxVlmShell';

describe('mlxVlmHuggingFace', () => {
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
    expect(
      huggingFaceCacheEntryMatchesRepo(
        'models--lmstudio-community--gemma-4-E4B-it-MLX-8bit',
        'lmstudio-community/gemma-4-E4B-it-MLX-8bit',
      ),
    ).toBe(true);
    expect(
      huggingFaceCacheEntryMatchesRepo(
        'models--lmstudio-community--gemma-4-E4B-it-MLX-8bit.lock',
        'lmstudio-community/gemma-4-E4B-it-MLX-8bit',
      ),
    ).toBe(true);
  });

  it('chooses download mode for mlx-community repos', () => {
    expect(isMlxCommunityRepoId('mlx-community/foo')).toBe(true);
    expect(resolveMlxVlmDownloadMode('mlx-community/foo')).toBe('download');
    expect(resolveMlxVlmDownloadMode('meta-llama/Llama-3.1-8B')).toBe('convert');
  });

  it('builds confirm copy for download vs convert', () => {
    expect(buildMlxVlmDownloadConfirmMessage('mlx-community/a', 'download').title).toContain('MLX');
    expect(buildMlxVlmDownloadConfirmMessage('meta-llama/a', 'convert').title).toContain('변환');
    expect(buildMlxVlmRedownloadConfirmMessage('mlx-community/a', 'download').title).toContain('다시');
    expect(buildMlxVlmDeleteConfirmMessage('mlx-community/a').message).toContain('mlx-community/a');
    expect(buildMlxVlmDownloadAbortConfirmMessage('mlx-community/a', 'download').title).toContain('중단');
    expect(buildMlxVlmDownloadAbortConfirmMessage('meta-llama/a', 'convert').message).toContain('변환');
  });
});

describe('mlxVlm model registry', () => {
  it('detects installed repo ids', () => {
    const models = [
      { id: 'mlx-community/a', repoId: 'mlx-community/a' },
      { id: 'mlx-community/b', repoId: 'mlx-community/b' },
    ];
    expect(isMlxVlmRepoInstalled('mlx-community/a', models)).toBe(true);
    expect(isMlxVlmRepoInstalled('mlx-community/c', models)).toBe(false);
  });

  it('clears selected model when removed', () => {
    const next = removeInstalledModel(
      {
        adapterPath: '',
        hfToken: '',
        selectedModelId: 'mlx-community/a',
        installedModels: [
          { id: 'mlx-community/a', repoId: 'mlx-community/a', source: 'huggingface', installedAt: 1 },
          { id: 'mlx-community/b', repoId: 'mlx-community/b', source: 'huggingface', installedAt: 2 },
        ],
      },
      'mlx-community/a',
    );
    expect(next.selectedModelId).toBe('');
    expect(next.installedModels).toHaveLength(1);
  });

  it('removes by repo id and clears selected id matched via repoId', () => {
    const next = removeInstalledModel(
      {
        adapterPath: '',
        hfToken: '',
        selectedModelId: 'org/model',
        installedModels: [
          { id: 'custom-id', repoId: 'org/model', source: 'huggingface', installedAt: 1 },
        ],
      },
      'org/model',
    );
    expect(next.installedModels).toHaveLength(0);
    expect(next.selectedModelId).toBe('');
  });

  it('detects models in use while server is running', () => {
    expect(
      isMlxVlmModelInUse(
        'mlx-community/a',
        {
          adapterPath: '',
          hfToken: '',
          selectedModelId: 'mlx-community/a',
          installedModels: [],
        },
        { running: true, loaded: true, models: ['mlx-community/a'] },
      ),
    ).toBe(true);
    expect(
      isMlxVlmModelInUse(
        'mlx-community/b',
        {
          adapterPath: '',
          hfToken: '',
          selectedModelId: 'mlx-community/a',
          installedModels: [],
        },
        { running: false, loaded: false, models: [] },
      ),
    ).toBe(false);
  });
});

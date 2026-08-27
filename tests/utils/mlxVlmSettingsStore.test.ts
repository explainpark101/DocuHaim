import { describe, expect, it } from 'vitest';
import {
  normalizeMlxVlmSettings,
  normalizeMlxVlmHfDownloadMaxWorkers,
  DEFAULT_MLX_VLM_HF_DOWNLOAD_MAX_WORKERS,
  setSelectedMlxVlmModelId,
  removeInstalledModel,
  addInstalledModel,
  filterMlxVlmInstalledModels,
  isMlxVlmInstalledModelEntry,
} from '@/utils/llm/mlxVlmSettingsStore';

describe('normalizeMlxVlmSettings', () => {
  it('defaults to empty selected model id', () => {
    expect(normalizeMlxVlmSettings({})).toEqual({
      adapterPath: '',
      hfToken: '',
      selectedModelId: '',
      hfDownloadMaxWorkers: DEFAULT_MLX_VLM_HF_DOWNLOAD_MAX_WORKERS,
      installedModels: [],
    });
  });

  it('drops legacy host/port/external fields and keeps core settings', () => {
    const normalized = normalizeMlxVlmSettings({
      host: '0.0.0.0',
      port: 9090,
      allowExternalAccess: true,
      adapterPath: '/tmp/adapter',
      selectedModelId: 'mlx-community/test',
      installedModels: [
        {
          id: 'mlx-community/test',
          repoId: 'mlx-community/test',
          source: 'huggingface',
          installedAt: 1,
        },
      ],
    });

    expect(normalized).toEqual({
      adapterPath: '/tmp/adapter',
      hfToken: '',
      selectedModelId: 'mlx-community/test',
      hfDownloadMaxWorkers: DEFAULT_MLX_VLM_HF_DOWNLOAD_MAX_WORKERS,
      installedModels: [
        {
          id: 'mlx-community/test',
          repoId: 'mlx-community/test',
          source: 'huggingface',
          installedAt: 1,
        },
      ],
    });
  });

  it('keeps optional hf token', () => {
    const normalized = normalizeMlxVlmSettings({
      hfToken: 'hf_test_token',
      selectedModelId: 'mlx-community/test',
    });
    expect(normalized.hfToken).toBe('hf_test_token');
  });

  it('clears selected model id when not installed', () => {
    const normalized = normalizeMlxVlmSettings({
      selectedModelId: 'mlx-community/missing',
      installedModels: [],
    });
    expect(normalized.selectedModelId).toBe('');
  });

  it('defaults and clamps hf download workers', () => {
    expect(normalizeMlxVlmSettings({}).hfDownloadMaxWorkers).toBe(
      DEFAULT_MLX_VLM_HF_DOWNLOAD_MAX_WORKERS,
    );
    expect(normalizeMlxVlmHfDownloadMaxWorkers(64)).toBe(32);
    expect(normalizeMlxVlmHfDownloadMaxWorkers(0)).toBe(1);
    expect(normalizeMlxVlmHfDownloadMaxWorkers(12)).toBe(12);
  });
});

describe('mlxVlm model selection helpers', () => {
  const base = {
    adapterPath: '',
    hfToken: '',
    selectedModelId: '',
    hfDownloadMaxWorkers: DEFAULT_MLX_VLM_HF_DOWNLOAD_MAX_WORKERS,
    installedModels: [
      {
        id: 'mlx-community/a',
        repoId: 'mlx-community/a',
        source: 'huggingface' as const,
        installedAt: 1,
      },
    ],
  };

  it('allows clearing selected model id', () => {
    const next = setSelectedMlxVlmModelId(
      { ...base, selectedModelId: 'mlx-community/a' },
      '',
    );
    expect(next.selectedModelId).toBe('');
  });

  it('does not auto-select when adding installed model', () => {
    const next = addInstalledModel(base, {
      id: 'mlx-community/b',
      repoId: 'mlx-community/b',
      source: 'huggingface',
    });
    expect(next.selectedModelId).toBe('');
    expect(next.installedModels).toHaveLength(2);
  });

  it('clears selection when selected model is removed', () => {
    const next = removeInstalledModel(
      {
        ...base,
        selectedModelId: 'mlx-community/a',
        installedModels: [
          {
            id: 'mlx-community/a',
            repoId: 'mlx-community/a',
            source: 'huggingface',
            installedAt: 1,
          },
          {
            id: 'mlx-community/b',
            repoId: 'mlx-community/b',
            source: 'huggingface',
            installedAt: 2,
          },
        ],
      },
      'mlx-community/a',
    );
    expect(next.selectedModelId).toBe('');
    expect(next.installedModels).toHaveLength(1);
  });
});

describe('filterMlxVlmInstalledModels', () => {
  it('keeps mlx-community, explicit mlx downloads, and local models', () => {
    const models = [
      {
        id: 'mlx-community/a',
        repoId: 'mlx-community/a',
        source: 'huggingface' as const,
        installedAt: 0,
      },
      {
        id: 'meta-llama/Llama-3.1-8B',
        repoId: 'meta-llama/Llama-3.1-8B',
        source: 'huggingface' as const,
        installedAt: 42,
      },
      {
        id: '/tmp/local-mlx',
        source: 'local' as const,
        installedAt: 1,
      },
    ];
    expect(filterMlxVlmInstalledModels(models)).toHaveLength(3);
    expect(isMlxVlmInstalledModelEntry(models[0]!)).toBe(true);
    expect(isMlxVlmInstalledModelEntry(models[1]!)).toBe(true);
  });

  it('drops GGUF repos and unrelated HF cache auto-discovery stubs', () => {
    const models = [
      {
        id: 'bartowski/Llama-GGUF',
        repoId: 'bartowski/Llama-GGUF',
        source: 'huggingface' as const,
        installedAt: 0,
      },
      {
        id: 'random-org/some-model',
        repoId: 'random-org/some-model',
        source: 'huggingface' as const,
        installedAt: 0,
      },
    ];
    expect(filterMlxVlmInstalledModels(models)).toEqual([]);
    expect(isMlxVlmInstalledModelEntry(models[0]!)).toBe(false);
    expect(isMlxVlmInstalledModelEntry(models[1]!)).toBe(false);
  });
});

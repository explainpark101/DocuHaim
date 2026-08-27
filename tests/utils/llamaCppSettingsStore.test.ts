import { describe, expect, it } from 'vitest';
import {
  normalizeLlamaCppSettings,
  normalizeLlamaCppHfDownloadMaxWorkers,
  buildLlamaCppBaseUrl,
  DEFAULT_LLAMA_CPP_HF_DOWNLOAD_MAX_WORKERS,
  setSelectedLlamaCppModelId,
  removeInstalledLlamaCppModel,
  addInstalledLlamaCppModel,
} from '@/utils/llm/llamaCppSettingsStore';

describe('normalizeLlamaCppSettings', () => {
  it('keeps server connection fields with defaults', () => {
    const normalized = normalizeLlamaCppSettings({
      serverHost: '127.0.0.1',
      serverPort: 9090,
      selectedModelId: 'org/model',
      installedModels: [
        {
          id: 'org/model',
          repoId: 'org/model',
          source: 'huggingface',
          installedAt: 1,
        },
      ],
      binaryPath: '/opt/homebrew/bin/llama-server',
      ctxSize: 8192,
      nGpuLayers: 99,
    });

    expect(normalized.serverHost).toBe('127.0.0.1');
    expect(normalized.serverPort).toBe(9090);
    expect(normalized.selectedModelId).toBe('org/model');
    expect(normalized.binaryPath).toBe('/opt/homebrew/bin/llama-server');
    expect(normalized.ctxSize).toBe(8192);
    expect(normalized.nGpuLayers).toBe(99);
  });

  it('falls back invalid port to default', () => {
    const normalized = normalizeLlamaCppSettings({ serverPort: 0 });
    expect(normalized.serverPort).toBe(8080);
  });

  it('defaults and clamps hf download workers', () => {
    expect(normalizeLlamaCppSettings({}).hfDownloadMaxWorkers).toBe(
      DEFAULT_LLAMA_CPP_HF_DOWNLOAD_MAX_WORKERS,
    );
    expect(normalizeLlamaCppHfDownloadMaxWorkers(64)).toBe(32);
    expect(normalizeLlamaCppHfDownloadMaxWorkers(0)).toBe(1);
    expect(normalizeLlamaCppHfDownloadMaxWorkers(12)).toBe(12);
  });

  it('defaults to empty selected model id', () => {
    expect(normalizeLlamaCppSettings({}).selectedModelId).toBe('');
  });

  it('clears selected model id when not installed', () => {
    expect(
      normalizeLlamaCppSettings({
        selectedModelId: 'org/missing',
        installedModels: [],
      }).selectedModelId,
    ).toBe('');
  });

  it('keeps direct gguf path even when not in installed list', () => {
    expect(
      normalizeLlamaCppSettings({
        selectedModelId: '/tmp/model.gguf',
        installedModels: [],
      }).selectedModelId,
    ).toBe('/tmp/model.gguf');
  });
});

describe('llamaCpp model selection helpers', () => {
  const base = normalizeLlamaCppSettings({
    installedModels: [
      {
        id: 'model-a.gguf',
        localPath: '/tmp/model-a.gguf',
        source: 'local',
        installedAt: 1,
      },
    ],
  });

  it('allows clearing selected model id', () => {
    const next = setSelectedLlamaCppModelId(
      { ...base, selectedModelId: 'model-a.gguf' },
      '',
    );
    expect(next.selectedModelId).toBe('');
  });

  it('does not auto-select when adding installed model', () => {
    const next = addInstalledLlamaCppModel(base, {
      id: 'model-b.gguf',
      localPath: '/tmp/model-b.gguf',
      source: 'local',
    });
    expect(next.selectedModelId).toBe('');
  });

  it('clears selection when selected model is removed', () => {
    const next = removeInstalledLlamaCppModel(
      {
        ...base,
        selectedModelId: 'model-a.gguf',
        installedModels: [
          {
            id: 'model-a.gguf',
            localPath: '/tmp/model-a.gguf',
            source: 'local',
            installedAt: 1,
          },
          {
            id: 'model-b.gguf',
            localPath: '/tmp/model-b.gguf',
            source: 'local',
            installedAt: 2,
          },
        ],
      },
      'model-a.gguf',
    );
    expect(next.selectedModelId).toBe('');
  });
});

describe('buildLlamaCppBaseUrl', () => {
  it('builds OpenAI-compatible base URL', () => {
    expect(
      buildLlamaCppBaseUrl(
        normalizeLlamaCppSettings({ serverHost: '127.0.0.1', serverPort: 8080 }),
      ),
    ).toBe('http://127.0.0.1:8080/v1');
  });
});

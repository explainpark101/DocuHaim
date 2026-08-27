import { describe, expect, it } from 'vitest';
import { normalizeMlxVlmSettings } from '@/utils/llm/mlxVlmSettingsStore';

describe('normalizeMlxVlmSettings', () => {
  it('drops legacy host/port/external fields and keeps core settings', () => {
    const normalized = normalizeMlxVlmSettings({
      host: '0.0.0.0',
      port: 9090,
      allowExternalAccess: true,
      adapterPath: '/tmp/adapter',
      selectedModelId: 'mlx-community/test',
      installedModels: [],
    });

    expect(normalized).toEqual({
      adapterPath: '/tmp/adapter',
      hfToken: '',
      selectedModelId: 'mlx-community/test',
      installedModels: [],
    });
  });

  it('keeps optional hf token', () => {
    const normalized = normalizeMlxVlmSettings({
      hfToken: 'hf_test_token',
      selectedModelId: 'mlx-community/test',
    });
    expect(normalized.hfToken).toBe('hf_test_token');
  });
});

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { buildMlxVlmProviderSyncCreds } from '@/utils/llm/mlxVlmProviderAutoSync';

vi.mock('@/utils/tauriPlatform', () => ({
  isTauriMacOS: () => true,
}));

vi.mock('@/utils/llm/mlxVlmShell', () => ({
  getMlxVlmServerStatus: vi.fn(),
}));

vi.mock('@/utils/llm/mlxVlmSettingsStore', () => ({
  loadMlxVlmSettings: () => ({
    adapterPath: '',
    selectedModelId: 'mlx-community/Qwen2.5-0.5B-Instruct-4bit',
    installedModels: [],
  }),
}));

import { getMlxVlmServerStatus } from '@/utils/llm/mlxVlmShell';
import { AUTO_MLX_VLM_PROFILE_ID, LLM_PROVIDER_GEMINI } from '@/utils/llm/llmProviderProfiles';

describe('buildMlxVlmProviderSyncCreds', () => {
  beforeEach(() => {
    (getMlxVlmServerStatus as ReturnType<typeof vi.fn>).mockReset();
  });

  it('returns unchanged when server is not running', async () => {
    (getMlxVlmServerStatus as ReturnType<typeof vi.fn>).mockResolvedValue({ running: false, models: [] });

    const result = await buildMlxVlmProviderSyncCreds({
      llmProviderProfiles: [
        {
          id: 'gemini-1',
          name: 'Google Gemini',
          kind: LLM_PROVIDER_GEMINI,
          baseUrl: '',
          apiKey: 'key',
        },
      ],
    });

    expect(result.changed).toBe(false);
    expect(result.creds).toBeNull();
  });

  it('adds MLX-VLM profile when server is running', async () => {
    (getMlxVlmServerStatus as ReturnType<typeof vi.fn>).mockResolvedValue({
      running: true,
      models: ['mlx-community/Qwen2.5-0.5B-Instruct-4bit'],
    });

    const result = await buildMlxVlmProviderSyncCreds({
      llmProviderProfiles: [
        {
          id: 'gemini-1',
          name: 'Google Gemini',
          kind: LLM_PROVIDER_GEMINI,
          baseUrl: '',
          apiKey: 'key',
        },
      ],
    });

    expect(result.changed).toBe(true);
    expect(result.creds?.llmProviderProfiles).toEqual([
      {
        id: 'gemini-1',
        name: 'Google Gemini',
        kind: LLM_PROVIDER_GEMINI,
        baseUrl: '',
        apiKey: 'key',
      },
      {
        id: AUTO_MLX_VLM_PROFILE_ID,
        name: 'MLX-VLM (local)',
        kind: 'mlx-vlm',
        baseUrl: '',
        apiKey: '',
      },
    ]);
  });
});

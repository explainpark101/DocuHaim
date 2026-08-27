import { beforeEach, describe, expect, it, vi } from 'vitest';
import { buildMlxLmProviderSyncCreds } from '@/utils/llm/mlxLmProviderAutoSync';

vi.mock('@/utils/tauriPlatform', () => ({
  isTauriMacOS: () => true,
}));

vi.mock('@/utils/llm/mlxLmShell', () => ({
  getMlxLmServerStatus: vi.fn(),
}));

vi.mock('@/utils/llm/mlxLmSettingsStore', () => ({
  loadMlxLmSettings: () => ({
    host: '127.0.0.1',
    port: 8080,
    selectedModelId: 'mlx-community/Qwen2.5-0.5B-Instruct-4bit',
  }),
}));

import { getMlxLmServerStatus } from '@/utils/llm/mlxLmShell';
import { AUTO_MLX_LM_PROFILE_ID, LLM_PROVIDER_GEMINI } from '@/utils/llm/llmProviderProfiles';

describe('buildMlxLmProviderSyncCreds', () => {
  beforeEach(() => {
    (getMlxLmServerStatus as ReturnType<typeof vi.fn>).mockReset();
  });

  it('returns unchanged when server is not running', async () => {
    (getMlxLmServerStatus as ReturnType<typeof vi.fn>).mockResolvedValue({ running: false, models: [] });

    const result = await buildMlxLmProviderSyncCreds({
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

  it('adds MLX-LM profile when server is running', async () => {
    (getMlxLmServerStatus as ReturnType<typeof vi.fn>).mockResolvedValue({
      running: true,
      models: ['mlx-community/Qwen2.5-0.5B-Instruct-4bit'],
    });

    const result = await buildMlxLmProviderSyncCreds({
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
        id: AUTO_MLX_LM_PROFILE_ID,
        name: 'MLX-LM (local)',
        kind: 'mlx-lm',
        baseUrl: '',
        apiKey: '',
      },
    ]);
  });
});

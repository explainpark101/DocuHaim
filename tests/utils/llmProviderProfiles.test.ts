import { describe, expect, it } from 'vitest';
import {
  AUTO_MLX_VLM_PROFILE_ID,
  ensureMlxVlmProviderProfile,
  LLM_PROVIDER_GEMINI,
  LLM_PROVIDER_MLX_VLM,
  type LlmProviderProfile,
} from '@/utils/llm/llmProviderProfiles';

describe('ensureMlxVlmProviderProfile', () => {
  it('adds auto MLX-VLM profile when none exists', () => {
    const profiles: LlmProviderProfile[] = [
      {
        id: 'gemini-1',
        name: 'Google Gemini',
        kind: LLM_PROVIDER_GEMINI,
        baseUrl: '',
        apiKey: 'key',
      },
    ];

    const result = ensureMlxVlmProviderProfile(profiles);

    expect(result.changed).toBe(true);
    expect(result.profiles).toHaveLength(2);
    expect(result.profiles[1]).toEqual({
      id: AUTO_MLX_VLM_PROFILE_ID,
      name: 'MLX-VLM (local)',
      kind: LLM_PROVIDER_MLX_VLM,
      baseUrl: '',
      apiKey: '',
    });
  });

  it('does not duplicate an existing MLX-VLM profile', () => {
    const profiles: LlmProviderProfile[] = [
      {
        id: 'custom-mlx',
        name: 'Local MLX',
        kind: LLM_PROVIDER_MLX_VLM,
        baseUrl: '',
        apiKey: '',
      },
    ];

    const result = ensureMlxVlmProviderProfile(profiles);

    expect(result.changed).toBe(false);
    expect(result.profiles).toBe(profiles);
  });
});

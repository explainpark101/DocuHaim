import { describe, expect, it } from 'vitest';
import {
  AUTO_MLX_LM_PROFILE_ID,
  ensureMlxLmProviderProfile,
  LLM_PROVIDER_GEMINI,
  LLM_PROVIDER_MLX_LM,
  type LlmProviderProfile,
} from '@/utils/llm/llmProviderProfiles';

describe('ensureMlxLmProviderProfile', () => {
  it('adds auto MLX-LM profile when none exists', () => {
    const profiles: LlmProviderProfile[] = [
      {
        id: 'gemini-1',
        name: 'Google Gemini',
        kind: LLM_PROVIDER_GEMINI,
        baseUrl: '',
        apiKey: 'key',
      },
    ];

    const result = ensureMlxLmProviderProfile(profiles);

    expect(result.changed).toBe(true);
    expect(result.profiles).toHaveLength(2);
    expect(result.profiles[1]).toEqual({
      id: AUTO_MLX_LM_PROFILE_ID,
      name: 'MLX-LM (local)',
      kind: LLM_PROVIDER_MLX_LM,
      baseUrl: '',
      apiKey: '',
    });
  });

  it('does not duplicate an existing MLX-LM profile', () => {
    const profiles: LlmProviderProfile[] = [
      {
        id: 'custom-mlx',
        name: 'Local MLX',
        kind: LLM_PROVIDER_MLX_LM,
        baseUrl: '',
        apiKey: '',
      },
    ];

    const result = ensureMlxLmProviderProfile(profiles);

    expect(result.changed).toBe(false);
    expect(result.profiles).toBe(profiles);
  });
});

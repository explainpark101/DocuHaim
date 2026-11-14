import { describe, expect, it } from 'vitest';
import {
  AUTO_MLX_VLM_PROFILE_ID,
  defaultModelForKind,
  ensureMlxVlmProviderProfile,
  LLM_PROVIDER_EXAONE,
  LLM_PROVIDER_GEMINI,
  LLM_PROVIDER_MLX_VLM,
  normalizeLlmProviderProfile,
  resolveOpenAiCompatibleProfileBaseUrl,
  validateLlmProviderProfileDraft,
  type LlmProviderProfile,
} from '@/utils/llm/llmProviderProfiles';
import {
  DEFAULT_EXAONE_MODEL,
  EXAONE_API_BASE_URL,
} from '@/utils/llm/exaoneSettings';

describe('EXAONE provider profiles', () => {
  it('normalizes exaone kind with fixed base URL', () => {
    const profile = normalizeLlmProviderProfile({
      id: 'exaone-1',
      name: 'My EXAONE',
      kind: LLM_PROVIDER_EXAONE,
      apiKey: 'secret',
    });

    expect(profile).toEqual({
      id: 'exaone-1',
      name: 'My EXAONE',
      kind: LLM_PROVIDER_EXAONE,
      baseUrl: EXAONE_API_BASE_URL,
      apiKey: 'secret',
    });
    expect(resolveOpenAiCompatibleProfileBaseUrl(profile!)).toBe(EXAONE_API_BASE_URL);
    expect(defaultModelForKind(LLM_PROVIDER_EXAONE)).toBe(DEFAULT_EXAONE_MODEL);
  });

  it('requires API key for EXAONE drafts', () => {
    expect(
      validateLlmProviderProfileDraft({
        name: 'EXAONE',
        kind: LLM_PROVIDER_EXAONE,
        baseUrl: '',
        apiKey: '',
        hasStoredKey: false,
      }),
    ).toMatch(/API 키/);

    expect(
      validateLlmProviderProfileDraft({
        name: 'EXAONE',
        kind: LLM_PROVIDER_EXAONE,
        baseUrl: '',
        apiKey: 'key',
        hasStoredKey: false,
      }),
    ).toBeNull();
  });
});

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

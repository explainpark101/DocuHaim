import { describe, expect, it, vi, beforeEach } from 'vitest';
import {
  AUTO_LLAMA_CPP_PROFILE_ID,
  LLM_PROVIDER_LLAMA_CPP,
  ensureLlamaCppProviderProfile,
} from '@/utils/llm/llmProviderProfiles';

describe('ensureLlamaCppProviderProfile', () => {
  beforeEach(() => {
    vi.stubGlobal('window', {
      localStorage: {
        getItem: vi.fn(() => null),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      },
      dispatchEvent: vi.fn(),
    });
  });

  it('adds auto llama-cpp profile with base URL', () => {
    const result = ensureLlamaCppProviderProfile([], 'http://127.0.0.1:8080/v1');
    expect(result.changed).toBe(true);
    expect(result.profiles).toHaveLength(1);
    expect(result.profiles[0]?.id).toBe(AUTO_LLAMA_CPP_PROFILE_ID);
    expect(result.profiles[0]?.kind).toBe(LLM_PROVIDER_LLAMA_CPP);
    expect(result.profiles[0]?.baseUrl).toBe('http://127.0.0.1:8080/v1');
  });

  it('updates base URL when profile already exists', () => {
    const existing = ensureLlamaCppProviderProfile([], 'http://127.0.0.1:8080/v1').profiles;
    const updated = ensureLlamaCppProviderProfile(existing, 'http://127.0.0.1:9090/v1');
    expect(updated.changed).toBe(true);
    expect(updated.profiles[0]?.baseUrl).toBe('http://127.0.0.1:9090/v1');
  });
});

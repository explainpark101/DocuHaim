export const LLM_PROVIDER_GEMINI = 'gemini';
export const LLM_PROVIDER_OPENAI_COMPATIBLE = 'openai-compatible';

export type LlmProviderId =
  | typeof LLM_PROVIDER_GEMINI
  | typeof LLM_PROVIDER_OPENAI_COMPATIBLE;

const STORAGE_KEY = 's3haim_llm_provider';

export const LLM_PROVIDER_CHANGED_EVENT = 's3haim-llm-provider-changed';

export const DEFAULT_LLM_PROVIDER: LlmProviderId = LLM_PROVIDER_GEMINI;

function isLlmProviderId(value: string): value is LlmProviderId {
  return value === LLM_PROVIDER_GEMINI || value === LLM_PROVIDER_OPENAI_COMPATIBLE;
}

export function loadLlmProvider(): LlmProviderId {
  if (typeof window === 'undefined') return DEFAULT_LLM_PROVIDER;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)?.trim() ?? '';
    return isLlmProviderId(stored) ? stored : DEFAULT_LLM_PROVIDER;
  } catch {
    return DEFAULT_LLM_PROVIDER;
  }
}

export function saveLlmProvider(provider: LlmProviderId): void {
  if (typeof window === 'undefined') return;
  const next = isLlmProviderId(provider) ? provider : DEFAULT_LLM_PROVIDER;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(
      new CustomEvent(LLM_PROVIDER_CHANGED_EVENT, { detail: { provider: next } }),
    );
  } catch {
    // ignore
  }
}

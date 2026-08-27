export {
  LLM_PROVIDER_GEMINI,
  LLM_PROVIDER_MLX_VLM,
  LLM_PROVIDER_OPENAI_COMPATIBLE,
  isLlmProviderKind,
  type LlmProviderKind,
} from '@/utils/llmProviderProfiles';

/** @deprecated Use LlmProviderKind / profile id. Kept for old localStorage values. */
export type LlmProviderId =
  | typeof import('@/utils/llmProviderProfiles').LLM_PROVIDER_GEMINI
  | typeof import('@/utils/llmProviderProfiles').LLM_PROVIDER_OPENAI_COMPATIBLE;

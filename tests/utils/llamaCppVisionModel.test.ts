import { describe, expect, test } from 'vitest';
import { isLikelyLlamaCppMultimodalModel } from '@/utils/llm/llamaCppVisionModel';

describe('llamaCppVisionModel', () => {
  test('detects common VL model ids and paths', () => {
    expect(isLikelyLlamaCppMultimodalModel('models/llava-v1.6-mistral-7b.Q4_K_M.gguf')).toBe(
      true,
    );
    expect(isLikelyLlamaCppMultimodalModel('Qwen2-VL-7B-Instruct-Q4_K_M.gguf')).toBe(true);
    expect(isLikelyLlamaCppMultimodalModel('/vault/.models/moondream2.gguf')).toBe(true);
    expect(isLikelyLlamaCppMultimodalModel('Llama-3.1-8B-Instruct-Q4_K_M.gguf')).toBe(false);
    expect(isLikelyLlamaCppMultimodalModel('')).toBe(false);
  });
});

import { describe, expect, it } from 'vitest';
import {
  LLM_ASSIST_BASE_SYSTEM_PROMPT,
  getDefaultLlmAssistSystemPrompt,
} from '@/utils/llm/llmAssistBaseSystemPrompt';

describe('getDefaultLlmAssistSystemPrompt', () => {
  it('returns the trimmed base prompt', () => {
    expect(getDefaultLlmAssistSystemPrompt()).toBe(LLM_ASSIST_BASE_SYSTEM_PROMPT.trim());
    expect(getDefaultLlmAssistSystemPrompt().length).toBeGreaterThan(0);
  });
});

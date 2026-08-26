import { describe, expect, it } from 'vitest';
import {
  LLM_ASSIST_BASE_SYSTEM_PROMPT,
  mergeLlmAssistSystemPrompt,
} from '@/utils/llm/llmAssistBaseSystemPrompt';

describe('mergeLlmAssistSystemPrompt', () => {
  it('returns the base prompt when template prompt is empty', () => {
    expect(mergeLlmAssistSystemPrompt('')).toBe(LLM_ASSIST_BASE_SYSTEM_PROMPT);
    expect(mergeLlmAssistSystemPrompt('   ')).toBe(LLM_ASSIST_BASE_SYSTEM_PROMPT);
  });

  it('prepends the base prompt before a template system prompt', () => {
    expect(mergeLlmAssistSystemPrompt('Be concise.')).toBe(
      `${LLM_ASSIST_BASE_SYSTEM_PROMPT}\n\nBe concise.`,
    );
  });
});

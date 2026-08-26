import { describe, expect, it } from 'vitest';
import {
  LLM_ASSIST_DEFAULT_REQUEST_OPTIONS,
  normalizeRequestOptions,
  parseRequestOptionValueText,
  parseRequestOptionsJsonText,
  requestOptionsFromEntries,
  toGeminiGenerationConfig,
  toOpenAiCompatibleRequestExtras,
} from '@/utils/llm/llmAssistRequestOptions';

describe('llmAssistRequestOptions', () => {
  it('defaults to temperature only', () => {
    expect(normalizeRequestOptions(null)).toEqual(LLM_ASSIST_DEFAULT_REQUEST_OPTIONS);
    expect(normalizeRequestOptions({})).toEqual(LLM_ASSIST_DEFAULT_REQUEST_OPTIONS);
  });

  it('parses value text as JSON when possible', () => {
    expect(parseRequestOptionValueText('0.4')).toBe(0.4);
    expect(parseRequestOptionValueText('true')).toBe(true);
    expect(parseRequestOptionValueText('[1,2]')).toEqual([1, 2]);
    expect(parseRequestOptionValueText('hello')).toBe('hello');
  });

  it('builds options from entries and strips reserved keys', () => {
    const options = requestOptionsFromEntries([
      { id: '1', key: 'temperature', valueText: '0.2' },
      { id: '2', key: 'messages', valueText: '[]' },
      { id: '3', key: 'typical_p', valueText: '0.9' },
    ]);
    expect(options).toEqual({ temperature: 0.2, typical_p: 0.9 });
  });

  it('maps Gemini aliases', () => {
    expect(
      toGeminiGenerationConfig({
        temperature: 0.1,
        top_p: 0.8,
        max_tokens: 512,
      }),
    ).toEqual({
      temperature: 0.1,
      topP: 0.8,
      maxOutputTokens: 512,
    });
  });

  it('keeps custom OpenAI extras', () => {
    expect(
      toOpenAiCompatibleRequestExtras({
        temperature: 0.3,
        foo_bar: 1,
        stream: false,
      }),
    ).toEqual({ temperature: 0.3, foo_bar: 1 });
  });

  it('parses JSON text objects', () => {
    const parsed = parseRequestOptionsJsonText('{"top_k": 40, "temperature": 0.5}');
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.options).toEqual({ top_k: 40, temperature: 0.5 });
    }
  });
});

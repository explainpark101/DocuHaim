import { describe, expect, test } from 'vitest';
import {
  extractJsonObject,
  isQuizVisionCapableProfile,
  parseSubjectiveGradeResult,
} from '@/utils/quiz/quizLlmService';
import {
  LLM_PROVIDER_GEMINI,
  LLM_PROVIDER_LLAMA_CPP,
  LLM_PROVIDER_MLX_VLM,
  LLM_PROVIDER_OPENAI_COMPATIBLE,
  type LlmProviderProfile,
} from '@/utils/llmProviderProfiles';

function profile(kind: LlmProviderProfile['kind']): LlmProviderProfile {
  return {
    id: `p-${kind}`,
    name: kind,
    kind,
    apiKey: '',
    baseUrl: '',
  };
}

describe('quizLlmService JSON helpers', () => {
  test('extractJsonObject parses fenced object', () => {
    const raw = 'Here is JSON:\n{"verdict":"correct","score":95}\n';
    expect(extractJsonObject(raw)).toEqual({ verdict: 'correct', score: 95 });
  });

  test('parseSubjectiveGradeResult maps short vs essay verdicts', () => {
    expect(
      parseSubjectiveGradeResult({
        verdict: 'correct',
        score: 92,
        feedback: 'ok',
        rationale: 'match',
      }),
    ).toEqual({
      verdict: 'correct',
      score: 92,
      feedback: 'ok',
      rationale: 'match',
    });

    expect(
      parseSubjectiveGradeResult({
        verdict: 'partial',
        feedback: 'missing keyword',
      }),
    ).toMatchObject({
      verdict: 'partial',
      score: 50,
      feedback: 'missing keyword',
    });

    expect(parseSubjectiveGradeResult({ verdict: 'nope' }).verdict).toBe('wrong');
  });

  test('isQuizVisionCapableProfile accepts vision providers', () => {
    expect(isQuizVisionCapableProfile(profile(LLM_PROVIDER_GEMINI))).toBe(true);
    expect(isQuizVisionCapableProfile(profile(LLM_PROVIDER_MLX_VLM))).toBe(true);
    expect(isQuizVisionCapableProfile(profile(LLM_PROVIDER_OPENAI_COMPATIBLE))).toBe(
      true,
    );
    expect(isQuizVisionCapableProfile(profile(LLM_PROVIDER_LLAMA_CPP))).toBe(true);
  });
});

import { describe, expect, test } from 'vitest';
import {
  buildQuizGenJsonParseStepFields,
  buildQuizLlmRequestOptions,
  extractJsonObject,
  isQuizLlmJsonParseError,
  isQuizVisionCapableProfile,
  parseSubjectiveGradeResult,
  QUIZ_LLM_JSON_RESPONSE_FORMAT,
  runWithQuizLlmJsonParseRetry,
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

  test('isQuizLlmJsonParseError detects parse failures', () => {
    expect(isQuizLlmJsonParseError(new Error('JSON 파싱 실패'))).toBe(true);
    expect(isQuizLlmJsonParseError(new Error('빈 LLM 응답'))).toBe(true);
    expect(isQuizLlmJsonParseError(new Error('network down'))).toBe(false);
  });

  test('buildQuizLlmRequestOptions adds strict JSON response_format', () => {
    expect(buildQuizLlmRequestOptions({ temperature: 0.5 })).toEqual({
      temperature: 0.5,
    });
    expect(buildQuizLlmRequestOptions({ temperature: 0.5, expectJson: true })).toEqual({
      temperature: 0.5,
      response_format: QUIZ_LLM_JSON_RESPONSE_FORMAT,
    });
  });

  test('buildQuizGenJsonParseStepFields includes raw response and parse error', () => {
    const fields = buildQuizGenJsonParseStepFields({
      attempt: 2,
      maxAttempts: 3,
      error: new Error('JSON 파싱 실패'),
      rawResponse: '{"broken":',
      willRetry: true,
    });
    expect(fields.status).toBe('running');
    expect(fields.error).toBe('JSON 파싱 실패');
    expect(fields.llmResponse).toBe('{"broken":');

    const finalFields = buildQuizGenJsonParseStepFields({
      attempt: 3,
      maxAttempts: 3,
      error: new Error('JSON 파싱 실패'),
      rawResponse: 'not json at all',
      willRetry: false,
    });
    expect(finalFields.status).toBe('error');
    expect(finalFields.llmResponse).toBe('not json at all');
  });

  test('runWithQuizLlmJsonParseRetry retries on JSON parse failure', async () => {
    let calls = 0;
    const failures: string[] = [];
    const retries: string[] = [];
    const { parsed } = await runWithQuizLlmJsonParseRetry(
      async () => {
        calls += 1;
        return calls === 1 ? 'not json' : '{"ok":true}';
      },
      {
        onParseFailure: (detail) => {
          failures.push(`${detail.attempt}:${detail.rawResponse}:${detail.error.message}`);
        },
        onRetryAttempt: (detail) => {
          retries.push(`${detail.attempt}/${detail.maxAttempts}`);
        },
      },
    );
    expect(calls).toBe(2);
    expect(parsed).toEqual({ ok: true });
    expect(failures).toEqual(['1:not json:JSON 파싱 실패']);
    expect(retries).toEqual(['2/3']);
  });

  test('runWithQuizLlmJsonParseRetry throws after max attempts', async () => {
    let calls = 0;
    await expect(
      runWithQuizLlmJsonParseRetry(
        async () => {
          calls += 1;
          return 'still not json';
        },
        { maxAttempts: 2 },
      ),
    ).rejects.toThrow('JSON 파싱 실패');
    expect(calls).toBe(2);
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

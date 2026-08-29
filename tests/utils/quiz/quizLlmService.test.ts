import { describe, expect, test } from 'bun:test';
import {
  extractJsonObject,
  parseSubjectiveGradeResult,
} from '@/utils/quiz/quizLlmService';

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
});

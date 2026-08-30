import { describe, expect, test } from 'bun:test';
import {
  extractStreamingJsonStringField,
  parseStreamingQuestionSections,
  parseStreamingSubjectiveGrade,
} from '@/utils/quiz/quizStreamingJson';

describe('quizStreamingJson', () => {
  test('extractStreamingJsonStringField reads partial JSON strings', () => {
    const partial = '{"feedback":"채점 중';
    expect(extractStreamingJsonStringField(partial, 'feedback')).toBe('채점 중');
  });

  test('extractStreamingJsonStringField unescapes newlines', () => {
    const partial = '{"point":"line1\\nline2';
    expect(extractStreamingJsonStringField(partial, 'point')).toBe('line1\nline2');
  });

  test('parseStreamingSubjectiveGrade surfaces feedback and score', () => {
    const partial =
      '{"verdict":"partial","score":72,"feedback":"핵심은 맞지만';
    expect(parseStreamingSubjectiveGrade(partial)).toEqual({
      feedback: '핵심은 맞지만',
      verdict: 'partial',
      score: 72,
    });
  });

  test('parseStreamingQuestionSections reads point and explanation', () => {
    const partial =
      '{"point":"접근","explanation":"해설 본문';
    expect(parseStreamingQuestionSections(partial)).toEqual({
      point: '접근',
      explanation: '해설 본문',
    });
  });
});

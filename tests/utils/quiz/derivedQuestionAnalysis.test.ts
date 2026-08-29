import { describe, expect, it } from 'vitest';
import {
  buildDerivedGenerationInstruction,
  describeDerivedQuestionTarget,
  nextDerivedDisplayLabel,
} from '@/utils/quiz/derivedQuestionAnalysis';

describe('derivedQuestionAnalysis', () => {
  it('describes target types', () => {
    expect(describeDerivedQuestionTarget({ kind: 'choice', choiceCount: 5 })).toBe(
      '5지선다 객관식',
    );
    expect(
      describeDerivedQuestionTarget({
        kind: 'subjective',
        choiceCount: 4,
        answerStyle: 'short',
      }),
    ).toBe('단답형 주관식');
  });

  it('includes user prompt in generation instruction', () => {
    const text = buildDerivedGenerationInstruction({
      question: 'Q?',
      options: ['A', 'B'],
      answer: 1,
      point: 'p',
      sourceKind: 'choice',
      target: {
        kind: 'subjective',
        choiceCount: 4,
        answerStyle: 'essay',
        userPrompt: '더 어렵게',
      },
      complexity: '[계산 난이도: 손으로 계산 가능]',
      analysisBlock: 'analysis',
      sampledBlock: '',
    });
    expect(text).toContain('서술형 주관식');
    expect(text).toContain('더 어렵게');
    expect(text).toContain('"answerStyle":"essay"');
  });

  it('allocates next derived display label', () => {
    expect(
      nextDerivedDisplayLabel(
        [{ displayLabel: '3-파생1' }, { displayLabel: '3-파생2' }],
        '3',
      ),
    ).toBe('3-파생3');
  });
});

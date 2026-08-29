import { describe, expect, test } from 'vitest';
import {
  buildQuestionSectionsInstruction,
  buildSimilarGenerationInstruction,
  formatSampledVariablesForPrompt,
  hasCompleteSimilarQuestionSections,
  isWeakSimilarQuestionExplanation,
  isWeakSimilarQuestionPoint,
  parseSimilarQuestionAnalysis,
  randomizeSimilarVariables,
} from '@/utils/quiz/similarQuestionAnalysis';

describe('parseSimilarQuestionAnalysis', () => {
  test('normalizes calculation analysis with variables', () => {
    const analysis = parseSimilarQuestionAnalysis({
      coreCategory: 'Ohm law',
      isCalculation: true,
      variables: [
        {
          id: 'V',
          description: 'voltage',
          originalValue: 12,
          min: 6,
          max: 18,
          step: 2,
          unit: 'V',
        },
      ],
    });
    expect(analysis.coreCategory).toBe('Ohm law');
    expect(analysis.isCalculation).toBe(true);
    expect(analysis.variables).toHaveLength(1);
    expect(analysis.variables[0]?.id).toBe('V');
    expect(analysis.variables[0]?.min).toBe(6);
    expect(analysis.variables[0]?.max).toBe(18);
  });

  test('clears variables when not a calculation problem', () => {
    const analysis = parseSimilarQuestionAnalysis({
      coreCategory: 'definitions',
      isCalculation: false,
      variables: [{ id: 'x', originalValue: 1, min: 0, max: 2 }],
    });
    expect(analysis.isCalculation).toBe(false);
    expect(analysis.variables).toEqual([]);
  });
});

describe('randomizeSimilarVariables', () => {
  test('samples within range and prefers a value different from original', () => {
    const samples = randomizeSimilarVariables([
      {
        id: 'R',
        description: 'resistance',
        originalValue: 10,
        min: 4,
        max: 16,
        step: 2,
      },
    ]);
    expect(samples).toHaveLength(1);
    const value = samples[0]?.value;
    expect(typeof value).toBe('number');
    expect(value as number).toBeGreaterThanOrEqual(4);
    expect(value as number).toBeLessThanOrEqual(16);
    expect((value as number) % 2).toBe(0);
  });

  test('formatSampledVariablesForPrompt includes sampled values', () => {
    const text = formatSampledVariablesForPrompt([
      {
        id: 'I',
        description: 'current',
        value: 3,
        originalValue: 2,
        unit: 'A',
      },
    ]);
    expect(text).toContain('무작위 샘플링');
    expect(text).toContain('3 A');
    expect(text).toContain('원본: 2 A');
  });
});

describe('similar question point / explanation requirements', () => {
  test('detects placeholder point and explanation', () => {
    expect(isWeakSimilarQuestionPoint('핵심 개념을 파악하세요.')).toBe(true);
    expect(isWeakSimilarQuestionPoint('- 법칙 적용 전 단위를 먼저 통일한다')).toBe(false);
    expect(isWeakSimilarQuestionExplanation('해설이 제공되지 않았습니다.')).toBe(true);
    expect(
      isWeakSimilarQuestionExplanation(
        '정답은 2번이다. 1번은 단위 환산을 빠뜨린 함정이고, 3·4번은 공식을 잘못 적용했다.',
      ),
    ).toBe(false);
  });

  test('hasCompleteSimilarQuestionSections requires both fields', () => {
    expect(
      hasCompleteSimilarQuestionSections({
        point: '- 개념 정의를 먼저 떠올린다',
        explanation: '정답은 2번이며, 선택지 함정과 근거를 설명한다.',
      }),
    ).toBe(true);
    expect(
      hasCompleteSimilarQuestionSections({
        point: '핵심 개념을 파악하세요.',
        explanation: '정답은 2번이며, 선택지 함정과 근거를 설명한다.',
      }),
    ).toBe(false);
  });

  test('buildSimilarGenerationInstruction requires point and explanation together', () => {
    const text = buildSimilarGenerationInstruction({
      question: 'Q?',
      options: ['A', 'B'],
      answer: 1,
      point: 'old point',
      explanation: 'old explanation',
      choiceCount: 2,
      targetAnswer: 2,
      complexity: '[계산 난이도: 손으로 계산 가능]',
      analysisBlock: '[문항 분석 결과]',
      sampledBlock: '',
    });
    expect(text).toContain('point와 explanation을 반드시 함께');
    expect(text).toContain('출제 의도를 매우 간결하게');
    expect(text).toContain('"point":"..."');
    expect(text).toContain('"explanation":"..."');
  });

  test('buildQuestionSectionsInstruction requests missing sections for existing item', () => {
    const text = buildQuestionSectionsInstruction({
      question: {
        id: 'q1',
        displayLabel: '1',
        kind: 'choice',
        question: 'Q?',
        options: ['A', 'B', 'C', 'D'],
        answer: 2,
        point: '문항 핵심 접근법을 확인하세요.',
        explanation: '해설이 제공되지 않았습니다.',
      },
      missingPoint: true,
      missingExplanation: true,
    });
    expect(text).toContain('point(접근 Point)');
    expect(text).toContain('explanation(해설)');
    expect(text).toContain('정답: 2번');
    expect(text).toContain('"point":"..."');
    expect(text).toContain('"explanation":"..."');
  });
});

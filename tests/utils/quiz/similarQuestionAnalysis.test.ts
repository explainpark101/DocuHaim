import { describe, expect, test } from 'bun:test';
import {
  formatSampledVariablesForPrompt,
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

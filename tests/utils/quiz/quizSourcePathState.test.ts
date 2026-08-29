import { describe, expect, it } from 'vitest';
import {
  countQuizSourcePathUsage,
  getActiveSourcePaths,
  isQuizSourcePathEnabled,
  removeQuizSourcePathFromConfig,
  setQuizSourcePathEnabled,
} from '@/utils/quiz/quizSourcePathState';
import { normalizeQuizFileConfig } from '@/utils/quiz/quizFileConfig';
import { resolveEffectiveSourcePaths } from '@/utils/quiz/parseQuizDocument';

const baseConfig = normalizeQuizFileConfig({
  choiceCount: 4,
  sourcePaths: ['a.md', 'b.md', 'c.md'],
  disabledSourcePaths: ['b.md'],
});

describe('quizSourcePathState', () => {
  it('returns active paths excluding disabled entries', () => {
    expect(getActiveSourcePaths(baseConfig)).toEqual(['a.md', 'c.md']);
    expect(countQuizSourcePathUsage(baseConfig)).toEqual({ active: 2, total: 3 });
  });

  it('toggles enable state and omits empty disabledSourcePaths', () => {
    const disabled = setQuizSourcePathEnabled(baseConfig, 'a.md', false);
    expect(disabled.disabledSourcePaths).toEqual(['a.md', 'b.md']);

    const reenabled = setQuizSourcePathEnabled(disabled, 'a.md', true);
    expect(reenabled.disabledSourcePaths).toEqual(['b.md']);

    const allEnabled = setQuizSourcePathEnabled(reenabled, 'b.md', true);
    expect(allEnabled.disabledSourcePaths).toBeUndefined();
    expect(getActiveSourcePaths(allEnabled)).toEqual(['a.md', 'b.md', 'c.md']);
  });

  it('checks per-path enabled state', () => {
    expect(isQuizSourcePathEnabled(baseConfig, 'a.md')).toBe(true);
    expect(isQuizSourcePathEnabled(baseConfig, 'b.md')).toBe(false);
  });

  it('removes path from source and disabled lists', () => {
    const next = removeQuizSourcePathFromConfig(baseConfig, 'b.md');
    expect(next.sourcePaths).toEqual(['a.md', 'c.md']);
    expect(next.disabledSourcePaths).toBeUndefined();
  });

  it('normalizes disabled paths not in sourcePaths', () => {
    const config = normalizeQuizFileConfig({
      sourcePaths: ['a.md'],
      disabledSourcePaths: ['a.md', 'orphan.md'],
    });
    expect(config.disabledSourcePaths).toEqual(['a.md']);
  });
});

describe('resolveEffectiveSourcePaths', () => {
  it('uses active file-level sources when question has none', () => {
    expect(resolveEffectiveSourcePaths(baseConfig, null)).toEqual(['a.md', 'c.md']);
  });

  it('keeps question-level sources even when file-level disabled', () => {
    expect(
      resolveEffectiveSourcePaths(baseConfig, { sourcePaths: ['b.md', 'x.md'] }),
    ).toEqual(['b.md', 'x.md']);
  });
});

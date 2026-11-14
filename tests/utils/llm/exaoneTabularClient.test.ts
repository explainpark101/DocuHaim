import { describe, expect, it } from 'vitest';
import {
  formatExaoneTabularMarkdown,
  resolveExaoneTabularRequestFromModel,
} from '@/utils/llm/exaoneTabularClient';
import {
  EXAONE_TABULAR_CLASSIFICATION_MODEL,
  EXAONE_TABULAR_REGRESSION_MODEL,
} from '@/utils/llm/exaoneSettings';

describe('resolveExaoneTabularRequestFromModel', () => {
  it('maps classification and regression pseudo-models', () => {
    expect(resolveExaoneTabularRequestFromModel(EXAONE_TABULAR_CLASSIFICATION_MODEL)).toEqual({
      task: 'classification',
      defaultOutputType: 'class',
    });
    expect(resolveExaoneTabularRequestFromModel(EXAONE_TABULAR_REGRESSION_MODEL)).toEqual({
      task: 'regression',
      defaultOutputType: 'point',
    });
    expect(resolveExaoneTabularRequestFromModel('k-exaone_v2.5')).toBeNull();
  });
});

describe('formatExaoneTabularMarkdown', () => {
  it('formats classification class labels as a markdown table', () => {
    const md = formatExaoneTabularMarkdown('classification', 'class', {
      result_code: 200,
      data: {
        target_columns: ['churn'],
        labels: [['yes'], ['no']],
      },
    });
    expect(md).toContain('| row | churn |');
    expect(md).toContain('| 1 | yes |');
    expect(md).toContain('| 2 | no |');
  });

  it('formats classification probabilities with class headers', () => {
    const md = formatExaoneTabularMarkdown('classification', 'probability', {
      result_code: 200,
      data: {
        target_columns: ['churn'],
        classes: [['no', 'yes']],
        probabilities: [
          [[0.2, 0.8]],
          [[0.9, 0.1]],
        ],
      },
    });
    expect(md).toContain('| row | no | yes |');
    expect(md).toContain('| 1 | 0.2 | 0.8 |');
  });

  it('formats regression point predictions', () => {
    const md = formatExaoneTabularMarkdown('regression', 'point', {
      result_code: 200,
      data: {
        target_columns: ['price'],
        predictions: [[12.5], [30]],
      },
    });
    expect(md).toContain('| row | price |');
    expect(md).toContain('| 1 | 12.5 |');
    expect(md).toContain('| 2 | 30 |');
  });

  it('summarizes regression full quantiles to p05/p50/p95', () => {
    const levels = Array.from({ length: 999 }, (_, i) => (i + 1) / 1000);
    const dist = levels.map((level) => level * 100);
    const md = formatExaoneTabularMarkdown('regression', 'full', {
      result_code: 200,
      data: {
        target_columns: ['price'],
        quantiles: [[dist]],
        quantile_levels: [levels],
      },
    });
    expect(md).toContain('| row | p05 | p50 | p95 |');
    expect(md).toContain('| 1 |');
    expect(md).toContain('p05 / p50 / p95');
  });
});

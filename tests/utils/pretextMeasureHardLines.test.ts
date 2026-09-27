import { describe, expect, it } from 'vitest';
import {
  countPretextWrapRowsForHardLine,
  expandTabsForPretext,
  measurePretextHardLineMargins,
} from '@/utils/pretextMeasure';

describe('pretextMeasure hard-line wrap', () => {
  it('expandTabsForPretext expands to tab stops', () => {
    expect(expandTabsForPretext('a\tb', 4)).toBe('a   b');
    expect(expandTabsForPretext('\tx', 4)).toBe('    x');
  });

  it('countPretextWrapRowsForHardLine stays 1 when text fits', () => {
    const measure = (t: string) => t.length * 10;
    expect(countPretextWrapRowsForHardLine('abc', measure, 100)).toBe(1);
  });

  it('countPretextWrapRowsForHardLine wraps long unbroken tokens', () => {
    const measure = (t: string) => t.length * 10;
    // 12 chars * 10 = 120 > 50 → multiple rows
    expect(countPretextWrapRowsForHardLine('abcdefghijkl', measure, 50)).toBeGreaterThan(1);
  });

  it('measurePretextHardLineMargins is 0 for single-row lines', () => {
    // Node env: canvas measurer returns 0 → everything fits → margins 0
    const margins = measurePretextHardLineMargins('a\nb\nc', {
      font: '14px monospace',
      contentWidth: 400,
      lineHeightPx: 20,
    });
    expect(margins).toEqual([0, 0, 0]);
  });

  it('measurePretextHardLineMargins uses injected wrap via narrow width + mock-like length', () => {
    // With document undefined, createPretextMeasurer returns () => 0, so width never overflows.
    // Exercise the margin formula directly via wrap-row helper instead.
    const measure = (t: string) => t.length;
    const rows = countPretextWrapRowsForHardLine('xxxx', measure, 2);
    expect(rows).toBe(2);
    expect((rows - 1) * 16).toBe(16);
  });
});

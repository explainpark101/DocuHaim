import { describe, expect, it } from 'vitest';
import {
  packLineHeightsIntoChunks,
  remainingHeightOnPage,
} from '@/utils/exportPdf/splitExportPdfCodeBlocksByPageHeight';

describe('packLineHeightsIntoChunks', () => {
  it('keeps lines that fit in one chunk', () => {
    expect(packLineHeightsIntoChunks([10, 10, 10], 100, { chromePx: 8 })).toEqual([
      [0, 1, 2],
    ]);
  });

  it('splits when the next line would exceed the budget', () => {
    expect(packLineHeightsIntoChunks([40, 40, 40], 100, { chromePx: 10 })).toEqual([
      [0, 1],
      [2],
    ]);
  });

  it('allows a single oversized line as its own chunk', () => {
    expect(packLineHeightsIntoChunks([200, 10], 100, { chromePx: 0 })).toEqual([
      [0],
      [1],
    ]);
  });

  it('uses a dynamic first-chunk budget from remaining page space', () => {
    expect(
      packLineHeightsIntoChunks([20, 20, 20, 20, 20], 100, {
        chromePx: 0,
        firstMaxHeightPx: 70,
      }),
    ).toEqual([[0, 1, 2], [3, 4]]);
  });
});

describe('remainingHeightOnPage', () => {
  it('returns full page when prefix is empty or exact multiples', () => {
    expect(remainingHeightOnPage(0, 800)).toBe(800);
    expect(remainingHeightOnPage(1600, 800)).toBe(800);
  });

  it('returns leftover after partial page use', () => {
    expect(remainingHeightOnPage(200, 800)).toBe(600);
    expect(remainingHeightOnPage(750, 800)).toBe(50);
  });
});

import { describe, expect, it } from 'vitest';
import {
  DEFAULT_PRINT_FONTS,
  normalizePrintBaseFontSizePx,
  normalizePrintLineHeight,
  parsePrintFonts,
} from '@/utils/print/printFonts';

describe('printFonts', () => {
  it('fills line-heights and base size when loading legacy fonts', () => {
    const fonts = parsePrintFonts({ body: 'Paperozi', heading: 'A2z' });
    expect(fonts.body).toBe('Paperozi');
    expect(fonts.heading).toBe('A2z');
    expect(fonts.bodyLineHeight).toBe(DEFAULT_PRINT_FONTS.bodyLineHeight);
    expect(fonts.headingLineHeight).toBe(DEFAULT_PRINT_FONTS.headingLineHeight);
    expect(fonts.baseFontSizePx).toBe(DEFAULT_PRINT_FONTS.baseFontSizePx);
  });

  it('clamps unitless line-heights', () => {
    expect(normalizePrintLineHeight('0.5', '1.7')).toBe('1');
    expect(normalizePrintLineHeight('4', '1.7')).toBe('3');
    expect(normalizePrintLineHeight('1.55', '1.7')).toBe('1.55');
    expect(normalizePrintLineHeight('nope', '1.7')).toBe('1.7');
  });

  it('clamps base font-size px', () => {
    expect(normalizePrintBaseFontSizePx('8')).toBe('10');
    expect(normalizePrintBaseFontSizePx('40')).toBe('28');
    expect(normalizePrintBaseFontSizePx('18px')).toBe('18');
    expect(normalizePrintBaseFontSizePx('nope')).toBe(DEFAULT_PRINT_FONTS.baseFontSizePx);
  });
});

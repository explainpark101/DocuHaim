import { describe, expect, it } from 'vitest';
import {
  DEFAULT_PRINT_PAGE_MARGINS_MM,
  PRINT_PAGE_MARGIN_MM,
  buildPrintLayoutCssVars,
  buildPrintPageAtRule,
  getPrintPageInnerSizeMm,
  getPrintPageInnerSizePx,
  getPrintPageMarginMm,
  getPrintPageMarginsMm,
  type PrintPageLayout,
} from '@/utils/print/printPageLayout';

const baseLayout = (zeroPageMargin: boolean): PrintPageLayout => ({
  pageSizeId: 'a4',
  imageMaxWidth: '718px',
  imageMaxHeight: '1047px',
  zeroPageMargin,
  marginsMm: zeroPageMargin
    ? { top: 0, right: 0, bottom: 0, left: 0 }
    : { ...DEFAULT_PRINT_PAGE_MARGINS_MM },
});

describe('printPageLayout margins', () => {
  it('uses Chromium default margin unless zeroPageMargin is on', () => {
    expect(getPrintPageMarginMm()).toBe(PRINT_PAGE_MARGIN_MM);
    expect(getPrintPageMarginMm(false)).toBe(10);
    expect(getPrintPageMarginMm(true)).toBe(0);
  });

  it('computes full-page inner size when margin is 0', () => {
    const withMargin = getPrintPageInnerSizeMm('a4', 10);
    const full = getPrintPageInnerSizeMm('a4', 0);
    expect(withMargin.widthMm).toBe(190);
    expect(withMargin.heightMm).toBe(277);
    expect(full.widthMm).toBe(210);
    expect(full.heightMm).toBe(297);
    expect(getPrintPageInnerSizePx('a4', 0).widthPx).toBeGreaterThan(
      getPrintPageInnerSizePx('a4', 10).widthPx,
    );
  });

  it('supports asymmetric margins for inner size and @page', () => {
    const margins = { top: 10, right: 15, bottom: 20, left: 25 };
    const inner = getPrintPageInnerSizeMm('a4', margins);
    expect(inner.widthMm).toBe(210 - 15 - 25);
    expect(inner.heightMm).toBe(297 - 10 - 20);
    const css = buildPrintPageAtRule('a4', margins);
    expect(css).toContain('margin: 10mm 15mm 20mm 25mm');
  });

  it('emits @page margin 0 and full cover-fit when zeroPageMargin', () => {
    const css = buildPrintPageAtRule('a4', 0);
    expect(css).toContain('size: A4');
    expect(css).toContain('margin: 0mm');

    const vars = buildPrintLayoutCssVars(baseLayout(true));
    expect(vars['--print-page-margin']).toBe('0mm');
    expect(vars['--print-page-inner-width']).toBe('210mm');
    expect(vars['--print-page-inner-height']).toBe('297mm');
    expect(vars['--print-cover-fit-width']).toBe('210mm');
    expect(vars['--print-cover-fit-height']).toBe('297mm');
    expect(getPrintPageMarginsMm(baseLayout(true))).toEqual({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    });
  });

  it('keeps default 10mm margin vars when zeroPageMargin is off', () => {
    const css = buildPrintPageAtRule('a4');
    expect(css).toContain('margin: 10mm');
    const vars = buildPrintLayoutCssVars(baseLayout(false));
    expect(vars['--print-page-margin']).toBe('10mm');
    expect(vars['--print-page-margin-top']).toBe('10mm');
    expect(vars['--print-page-inner-width']).toBe('190mm');
  });
});

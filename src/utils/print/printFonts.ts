/** Shared print font / line-height / base size settings (`.settings/print.json`). */

export type PrintFonts = {
  bold: string;
  heading: string;
  body: string;
  code: string;
  /** Unitless CSS line-height for body text (e.g. "1.7"). */
  bodyLineHeight: string;
  /** Unitless CSS line-height for headings (e.g. "1.35"). */
  headingLineHeight: string;
  /**
   * Root font-size in px for print body (e.g. "16").
   * Headings use em, so they scale with this base.
   */
  baseFontSizePx: string;
};

export const DEFAULT_PRINT_FONTS: PrintFonts = {
  bold: '',
  heading: '',
  body: '',
  code: '',
  bodyLineHeight: '1.7',
  headingLineHeight: '1.35',
  baseFontSizePx: '16',
};

const LINE_HEIGHT_MIN = 1;
const LINE_HEIGHT_MAX = 3;
const BASE_FONT_SIZE_MIN = 10;
const BASE_FONT_SIZE_MAX = 28;

/** Clamp / normalize a unitless line-height string. Invalid → fallback. */
export function normalizePrintLineHeight(
  raw: unknown,
  fallback: string,
): string {
  const fallbackNum = Number(fallback);
  const safeFallback =
    Number.isFinite(fallbackNum) && fallbackNum > 0 ? String(fallbackNum) : '1.5';
  if (typeof raw === 'number' && Number.isFinite(raw)) {
    return String(clampLineHeight(raw));
  }
  if (typeof raw !== 'string') return safeFallback;
  const trimmed = raw.trim().replace(/,$/, '');
  if (!trimmed) return safeFallback;
  const num = Number(trimmed);
  if (!Number.isFinite(num)) return safeFallback;
  return String(clampLineHeight(num));
}

function clampLineHeight(value: number): number {
  const rounded = Math.round(value * 100) / 100;
  return Math.min(LINE_HEIGHT_MAX, Math.max(LINE_HEIGHT_MIN, rounded));
}

/** Normalize base font-size px string (10–28). Invalid → fallback. */
export function normalizePrintBaseFontSizePx(
  raw: unknown,
  fallback: string = DEFAULT_PRINT_FONTS.baseFontSizePx,
): string {
  const fallbackNum = Number(String(fallback).replace(/px$/i, ''));
  const safeFallback =
    Number.isFinite(fallbackNum) && fallbackNum > 0
      ? String(Math.round(fallbackNum))
      : DEFAULT_PRINT_FONTS.baseFontSizePx;
  let num: number | null = null;
  if (typeof raw === 'number' && Number.isFinite(raw)) {
    num = raw;
  } else if (typeof raw === 'string') {
    const trimmed = raw.trim().replace(/px$/i, '');
    if (!trimmed) return safeFallback;
    const parsed = Number(trimmed);
    if (Number.isFinite(parsed)) num = parsed;
  }
  if (num == null) return safeFallback;
  const clamped = Math.min(
    BASE_FONT_SIZE_MAX,
    Math.max(BASE_FONT_SIZE_MIN, Math.round(num)),
  );
  return String(clamped);
}

export function parsePrintFonts(parsed: unknown): PrintFonts {
  if (!parsed || typeof parsed !== 'object') return { ...DEFAULT_PRINT_FONTS };
  const obj = parsed as Record<string, unknown>;
  return {
    bold: typeof obj.bold === 'string' ? obj.bold : DEFAULT_PRINT_FONTS.bold,
    heading: typeof obj.heading === 'string' ? obj.heading : DEFAULT_PRINT_FONTS.heading,
    body: typeof obj.body === 'string' ? obj.body : DEFAULT_PRINT_FONTS.body,
    code: typeof obj.code === 'string' ? obj.code : DEFAULT_PRINT_FONTS.code,
    bodyLineHeight: normalizePrintLineHeight(
      obj.bodyLineHeight,
      DEFAULT_PRINT_FONTS.bodyLineHeight,
    ),
    headingLineHeight: normalizePrintLineHeight(
      obj.headingLineHeight,
      DEFAULT_PRINT_FONTS.headingLineHeight,
    ),
    baseFontSizePx: normalizePrintBaseFontSizePx(
      obj.baseFontSizePx,
      DEFAULT_PRINT_FONTS.baseFontSizePx,
    ),
  };
}

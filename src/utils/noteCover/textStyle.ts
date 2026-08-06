import type { CSSProperties } from 'react';
import type { CoverTextElement } from '@/utils/noteCover/types';

/** Multiplies absolute design px so print fit-size covers keep editor proportions. */
export const COVER_FONT_SCALE_CSS = 'var(--cover-font-scale, 1)';

export function coverFontSizeCss(fontSizePx: number): string {
  const size = Number.isFinite(fontSizePx) ? fontSizePx : 16;
  return `calc(${size}px * ${COVER_FONT_SCALE_CSS})`;
}

type CoverPlainTextStyleOptions = {
  /**
   * Editor-only: inset clip so partially visible glyphs (common screen/print
   * mismatch) are fully hidden rather than half-shown.
   */
  strictClip?: boolean;
};

/** Shared plain text-box typography + overflow (CoverSlide / CoverEditor). */
export function coverPlainTextStyle(
  el: Pick<
    CoverTextElement,
    'color' | 'fontSize' | 'fontWeight' | 'textAlign' | 'fontFamily'
  >,
  options?: CoverPlainTextStyleOptions,
): CSSProperties {
  return {
    boxSizing: 'border-box',
    color: el.color,
    fontSize: coverFontSizeCss(el.fontSize),
    fontWeight: el.fontWeight,
    textAlign: el.textAlign,
    fontFamily: el.fontFamily || undefined,
    overflow: 'hidden',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    lineHeight: 1.25,
    ...(options?.strictClip
      ? {
          // Slightly stricter than the layout box so borderline last glyphs
          // disappear in the editor instead of looking fine until print.
          clipPath: 'inset(0 0.2em 0.16em 0)',
        }
      : null),
  };
}

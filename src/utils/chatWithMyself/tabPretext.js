/**
 * Canvas-based text width measurement ("pretext").
 * @param {string} font CSS font shorthand from getComputedStyle
 */
export function createPretextMeasurer(font) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return () => 0;
  }
  ctx.font = font || '11px sans-serif';
  /** @param {string} text */
  return (text) => {
    if (!text) return 0;
    return ctx.measureText(text).width;
  };
}

/**
 * @param {string} label
 * @returns {string[]} grapheme-ish units (spread is enough for Korean syllables)
 */
export function splitLabelChars(label) {
  return Array.from(String(label || ''));
}

/**
 * @typedef {'full' | 'activeLabel' | 'iconOnly'} TabDensity
 */

/**
 * Decide collapse density from available width vs pretext natural widths.
 * @param {{
 *   available: number,
 *   fullTotal: number,
 *   activeLabelTotal: number,
 *   iconOnlyTotal: number,
 * }} widths
 * @returns {TabDensity | 'close'}
 */
export function decideTabDensity({
  available,
  fullTotal,
  activeLabelTotal,
  iconOnlyTotal,
}) {
  const slack = 2;
  if (available <= 0) return 'close';
  if (fullTotal <= available + slack) return 'full';
  if (activeLabelTotal <= available + slack) return 'activeLabel';
  if (iconOnlyTotal <= available + slack) return 'iconOnly';
  return 'close';
}

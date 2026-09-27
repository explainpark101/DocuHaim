/**
 * Measure soft-wrap height bands for each hard newline line.
 * Primary path: canvas pretext (no DOM reflow).
 */

import {
  fontShorthandFromElement,
  measurePretextHardLineHeights,
  measurePretextHardLineMargins,
} from '@/utils/pretextMeasure';

function parseLineHeightPx(el: HTMLElement): number {
  const raw = getComputedStyle(el).lineHeight;
  const n = Number.parseFloat(raw);
  if (Number.isFinite(n) && n > 0) return n;
  const fs = Number.parseFloat(getComputedStyle(el).fontSize);
  return Number.isFinite(fs) && fs > 0 ? fs * 1.55 : 20;
}

function parseTabSize(el: HTMLElement): number {
  const raw =
    getComputedStyle(el).tabSize ||
    getComputedStyle(el).getPropertyValue('tab-size');
  const n = Number.parseFloat(raw);
  return Number.isFinite(n) && n > 0 ? n : 4;
}

/**
 * Prefer the <pre> content box width (minus padding) so TipTap's inline
 * NodeViewContent shrink-wrap does not under-report wrap width.
 */
function resolveContentWidthPx(el: HTMLElement): number {
  const pre = el.closest('pre');
  if (pre) {
    const cs = getComputedStyle(pre);
    const padX =
      (Number.parseFloat(cs.paddingLeft) || 0) +
      (Number.parseFloat(cs.paddingRight) || 0);
    const w = pre.clientWidth - padX;
    if (w > 0) return w;
  }
  return el.clientWidth;
}

function normalizeLineCount(
  values: number[],
  lineCount: number,
  fallback: number,
): number[] {
  const out = values.slice(0, lineCount);
  while (out.length < lineCount) out.push(fallback);
  return out;
}

/**
 * Pretext-based heights for each hard line (includes soft-wrap rows).
 */
export function measureHaimHardLineHeights(
  el: HTMLElement,
  text: string,
  lineCount: number,
): number[] {
  if (lineCount <= 0) return [];
  const fallback = parseLineHeightPx(el);
  const width = resolveContentWidthPx(el);
  if (width <= 0) {
    return Array.from({ length: lineCount }, () => fallback);
  }
  const heights = measurePretextHardLineHeights(text, {
    font: fontShorthandFromElement(el),
    contentWidth: width,
    lineHeightPx: fallback,
    tabSize: parseTabSize(el),
  });
  return normalizeLineCount(heights, lineCount, fallback);
}

/**
 * Pretext-based margin-bottom under each line number so digits stay synced
 * with soft-wrapped hard lines: margin = (wrapRows - 1) * lineHeight.
 */
export function measureHaimHardLineMargins(
  el: HTMLElement,
  text: string,
  lineCount: number,
): number[] {
  if (lineCount <= 0) return [];
  const fallbackLh = parseLineHeightPx(el);
  const width = resolveContentWidthPx(el);
  if (width <= 0) {
    return Array.from({ length: lineCount }, () => 0);
  }
  const margins = measurePretextHardLineMargins(text, {
    font: fontShorthandFromElement(el),
    contentWidth: width,
    lineHeightPx: fallbackLh,
    tabSize: parseTabSize(el),
  });
  return normalizeLineCount(margins, lineCount, 0);
}

/** True when the host soft-wraps hard lines. */
export function haimCodeHostSoftWraps(el: HTMLElement): boolean {
  if (el.closest('.haim-editor[data-haim-preview-only]')) return true;
  const ws = getComputedStyle(el).whiteSpace;
  if (ws === 'pre-wrap' || ws === 'pre-line' || ws === 'break-spaces') return true;
  // TipTap NodeViewContent defaults to inline pre-wrap even before our attr CSS.
  const styled = el.closest('[data-node-view-content]') as HTMLElement | null;
  if (styled?.style?.whiteSpace === 'pre-wrap') return true;
  return false;
}

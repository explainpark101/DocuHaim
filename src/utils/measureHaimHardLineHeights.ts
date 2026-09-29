/**
 * Hard-line height bands for Haim code / raw gutters.
 *
 * - Line count: TipTap DOM <br> hard breaks (not only text.split)
 * - Heights: painted Range band per hard line (includes soft-wrap);
 *   empty lines use br-to-br Y delta or CSS line-box height
 * - Fallback (no <br>, e.g. raw <pre>): pretext wrap-rows × line-box px
 */

import {
  countPretextHardLineWrapRows,
  fontShorthandFromElement,
} from '@/utils/pretextMeasure';
import { countHaimDisplayLines } from '@/utils/haimWysiwygLineNumberSettings';

function parseCssLineHeightPx(el: HTMLElement): number {
  const cs = getComputedStyle(el);
  const raw = cs.lineHeight;
  if (raw && raw !== 'normal') {
    const n = Number.parseFloat(raw);
    if (Number.isFinite(n) && n > 0) return n;
  }
  const fs = Number.parseFloat(cs.fontSize);
  return Number.isFinite(fs) && fs > 0 ? fs * 1.55 : 20;
}

/**
 * Used line-box height in px (CSS line-height), never glyph ink height.
 * Glyph getClientRects are shorter than the line box and caused gutter drift.
 * Cached per element until font / line-height CSS changes.
 */
const lineHeightProbeCache = new WeakMap<
  HTMLElement,
  { key: string; value: number }
>();

export function probeHaimLineHeightPx(el: HTMLElement): number {
  const cs = getComputedStyle(el);
  const cacheKey = `${cs.font}|${cs.fontSize}|${cs.lineHeight}|${cs.fontFamily}|${cs.fontWeight}`;
  const hit = lineHeightProbeCache.get(el);
  if (hit && hit.key === cacheKey) return hit.value;

  const cssLh = parseCssLineHeightPx(el);
  let value = cssLh;
  try {
    const mirror = document.createElement('div');
    mirror.setAttribute('aria-hidden', 'true');
    mirror.style.cssText = [
      'position:absolute',
      'visibility:hidden',
      'pointer-events:none',
      'left:0',
      'top:0',
      'width:auto',
      `font:${cs.font}`,
      `font-size:${cs.fontSize}`,
      `font-family:${cs.fontFamily}`,
      `font-weight:${cs.fontWeight}`,
      `font-style:${cs.fontStyle}`,
      `letter-spacing:${cs.letterSpacing}`,
      `line-height:${cs.lineHeight}`,
      'white-space:pre',
      'padding:0',
      'margin:0',
      'border:0',
    ].join(';');
    mirror.textContent = 'M';
    document.body.appendChild(mirror);
    const h = mirror.getBoundingClientRect().height || mirror.offsetHeight;
    mirror.remove();
    if (h > 0) value = h;
  } catch {
    // keep cssLh
  }
  lineHeightProbeCache.set(el, { key: cacheKey, value });
  return value;
}

function parseTabSize(el: HTMLElement): number {
  const raw =
    getComputedStyle(el).tabSize ||
    getComputedStyle(el).getPropertyValue('tab-size');
  const n = Number.parseFloat(raw);
  return Number.isFinite(n) && n > 0 ? n : 4;
}

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

function isTrailingBreak(br: Element): boolean {
  return br.classList.contains('ProseMirror-trailingBreak');
}

/** Hard breaks that separate display lines (exclude PM trailing widget). */
export function listHaimHardBreaks(el: HTMLElement): HTMLElement[] {
  return Array.from(el.querySelectorAll('br')).filter(
    (br) => !isTrailingBreak(br),
  ) as HTMLElement[];
}

/** Display line count from TipTap/ProseMirror hard breaks. */
export function countHaimDomHardLines(el: HTMLElement): number {
  return Math.max(1, listHaimHardBreaks(el).length + 1);
}

/**
 * Effective gutter line count: max(text newlines, DOM hard breaks).
 * TipTap may paint an extra blank via <br> that text.split misses (or vice versa).
 */
export function resolveHaimGutterLineCount(
  el: HTMLElement | null,
  text: string,
): number {
  const fromText = countHaimDisplayLines(text);
  if (!el) return fromText;
  return Math.max(fromText, countHaimDomHardLines(el));
}

function rangeBandHeight(range: Range, fallback: number): number {
  const rects = Array.from(range.getClientRects()).filter(
    (r) => r.height > 0 || r.width > 0,
  );
  if (rects.length === 0) return fallback;
  let top = Infinity;
  let bottom = -Infinity;
  for (const r of rects) {
    top = Math.min(top, r.top);
    bottom = Math.max(bottom, r.bottom);
  }
  const h = bottom - top;
  return h > 0.5 ? h : fallback;
}

function assignRangeForHardLine(
  range: Range,
  el: HTMLElement,
  breaks: HTMLElement[],
  lineIndex: number,
): void {
  if (lineIndex === 0) {
    range.selectNodeContents(el);
    if (breaks[0]) range.setEndBefore(breaks[0]);
    return;
  }
  const startBr = breaks[lineIndex - 1];
  if (!startBr) {
    range.selectNodeContents(el);
    range.collapse(false);
    return;
  }
  range.setStartAfter(startBr);
  const endBr = breaks[lineIndex];
  if (endBr) range.setEndBefore(endBr);
  else range.setEnd(el, el.childNodes.length);
}

/**
 * Empty hard-line height from br geometry (exact painted step).
 */
function emptyHardLineHeight(
  el: HTMLElement,
  breaks: HTMLElement[],
  lineIndex: number,
  lineHeightPx: number,
): number {
  const prev = lineIndex > 0 ? breaks[lineIndex - 1] : null;
  const next = breaks[lineIndex] ?? null;

  if (prev && next) {
    const h = next.getBoundingClientRect().top - prev.getBoundingClientRect().top;
    if (h > 0.5) return h;
  }
  if (!prev && next) {
    // Leading empty / first line empty: from content top to first br.
    const top = el.getBoundingClientRect().top;
    const h = next.getBoundingClientRect().top - top;
    if (h > 0.5) return h;
  }
  if (prev && !next) {
    const h =
      el.getBoundingClientRect().bottom - prev.getBoundingClientRect().top;
    if (h > 0.5) return h;
  }
  return lineHeightPx;
}

/**
 * TipTap / ProseMirror / lowlight: hard lines separated by <br>.
 */
function measureFromHardBreaks(
  el: HTMLElement,
  lineCount: number,
  lineHeightPx: number,
): number[] | null {
  const breaks = listHaimHardBreaks(el);
  if (breaks.length === 0 && lineCount > 1) return null;

  const heights: number[] = [];
  const range = document.createRange();

  try {
    for (let i = 0; i < lineCount; i += 1) {
      assignRangeForHardLine(range, el, breaks, i);
      if (range.collapsed) {
        heights.push(emptyHardLineHeight(el, breaks, i, lineHeightPx));
      } else {
        const band = rangeBandHeight(range, lineHeightPx);
        // Guard: never shorter than one line box (glyph-only rects).
        heights.push(Math.max(band, lineHeightPx * 0.95));
      }
    }
  } catch {
    return null;
  }

  return heights.length === lineCount ? heights : null;
}

function measureFromPretext(
  el: HTMLElement,
  text: string,
  lineCount: number,
  lineHeightPx: number,
): number[] {
  const width = resolveContentWidthPx(el);
  if (width <= 0) {
    return Array.from({ length: lineCount }, () => lineHeightPx);
  }
  const rows = countPretextHardLineWrapRows(
    text,
    fontShorthandFromElement(el),
    width,
    parseTabSize(el),
  );
  const heights = rows.map((n) => Math.max(1, n) * lineHeightPx);
  while (heights.length < lineCount) heights.push(lineHeightPx);
  return heights.slice(0, lineCount);
}

function measureFromMirror(
  el: HTMLElement,
  text: string,
  lineCount: number,
  lineHeightPx: number,
): number[] {
  const width = resolveContentWidthPx(el);
  if (width <= 0) {
    return Array.from({ length: lineCount }, () => lineHeightPx);
  }
  const lines = text.length === 0 ? [''] : String(text).split('\n');
  while (lines.length < lineCount) lines.push('');
  if (lines.length > lineCount) lines.length = lineCount;

  const cs = getComputedStyle(el);
  const whiteSpace =
    cs.whiteSpace === 'pre' || cs.whiteSpace === 'nowrap'
      ? 'pre-wrap'
      : cs.whiteSpace || 'pre-wrap';

  const mirror = document.createElement('div');
  mirror.setAttribute('aria-hidden', 'true');
  mirror.style.cssText = [
    'position:absolute',
    'visibility:hidden',
    'pointer-events:none',
    'left:0',
    'top:0',
    `width:${width}px`,
    `font:${cs.font}`,
    `font-size:${cs.fontSize}`,
    `font-family:${cs.fontFamily}`,
    `font-weight:${cs.fontWeight}`,
    `font-style:${cs.fontStyle}`,
    `letter-spacing:${cs.letterSpacing}`,
    `line-height:${cs.lineHeight}`,
    `white-space:${whiteSpace}`,
    `overflow-wrap:${cs.overflowWrap || 'break-word'}`,
    `word-break:${cs.wordBreak || 'normal'}`,
    `tab-size:${cs.tabSize || 4}`,
    'box-sizing:border-box',
    'padding:0',
    'margin:0',
    'border:0',
  ].join(';');

  for (const line of lines) {
    const row = document.createElement('div');
    row.style.whiteSpace = whiteSpace;
    row.style.overflowWrap = cs.overflowWrap || 'break-word';
    row.style.wordBreak = cs.wordBreak || 'normal';
    row.style.lineHeight = cs.lineHeight;
    row.textContent = line.length > 0 ? line : '\u00a0';
    mirror.appendChild(row);
  }

  document.body.appendChild(mirror);
  const heights: number[] = [];
  for (let i = 0; i < lineCount; i += 1) {
    const child = mirror.children[i] as HTMLElement | undefined;
    const h = child?.getBoundingClientRect().height || child?.offsetHeight || 0;
    heights.push(h > 0 ? h : lineHeightPx);
  }
  mirror.remove();
  return heights;
}

/**
 * Exact height (px) for each hard newline line, including soft-wrap bands.
 * Order: TipTap <br> DOM → same-style mirror rows → pretext.
 */
export function measureHaimHardLineHeights(
  el: HTMLElement,
  text: string,
  lineCount: number,
): number[] {
  if (lineCount <= 0) return [];
  const lineHeightPx = probeHaimLineHeightPx(el);
  const fromDom = measureFromHardBreaks(el, lineCount, lineHeightPx);
  if (fromDom) {
    return fromDom.map((h) => (h > 0 ? h : lineHeightPx));
  }
  // Plain / raw <pre> (no TipTap hard breaks): mirror matches painted wrap.
  if (el.closest('pre') || el.tagName === 'PRE') {
    return measureFromMirror(el, text, lineCount, lineHeightPx);
  }
  return measureFromPretext(el, text, lineCount, lineHeightPx);
}

/** True when the host soft-wraps hard lines. */
export function haimCodeHostSoftWraps(el: HTMLElement): boolean {
  if (el.closest('.haim-editor[data-haim-preview-only]')) return true;
  const ws = getComputedStyle(el).whiteSpace;
  if (ws === 'pre-wrap' || ws === 'pre-line' || ws === 'break-spaces') return true;
  const styled = el.closest('[data-node-view-content]') as HTMLElement | null;
  if (styled?.style?.whiteSpace === 'pre-wrap') return true;
  return false;
}

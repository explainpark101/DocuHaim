/**
 * Measure rendered height of each hard newline line inside `el`, including
 * soft-wrap continuation rows.
 *
 * Prefer live DOM (TipTap uses <br> hard breaks). Fall back to a same-width
 * mirror for plain text hosts (raw-md <pre>).
 */

function parseLineHeightPx(el: HTMLElement): number {
  const raw = getComputedStyle(el).lineHeight;
  const n = Number.parseFloat(raw);
  if (Number.isFinite(n) && n > 0) return n;
  const fs = Number.parseFloat(getComputedStyle(el).fontSize);
  return Number.isFinite(fs) && fs > 0 ? fs * 1.55 : 20;
}

function isTrailingBreak(br: Element): boolean {
  return br.classList.contains('ProseMirror-trailingBreak');
}

function rangeHeight(range: Range, fallback: number): number {
  const rects = Array.from(range.getClientRects()).filter(
    (r) => r.width > 0 || r.height > 0,
  );
  if (rects.length === 0) return fallback;
  let top = Infinity;
  let bottom = -Infinity;
  for (const r of rects) {
    top = Math.min(top, r.top);
    bottom = Math.max(bottom, r.bottom);
  }
  const h = bottom - top;
  return h > 0 ? h : fallback;
}

/**
 * TipTap / ProseMirror code blocks: hard lines separated by <br>.
 */
function measureFromHardBreaks(el: HTMLElement, lineCount: number): number[] | null {
  const breaks = Array.from(el.querySelectorAll('br')).filter((br) => !isTrailingBreak(br));
  // No <br> → not a TipTap hard-break host (or single empty line).
  if (breaks.length === 0 && lineCount > 1) return null;

  const fallback = parseLineHeightPx(el);
  const heights: number[] = [];
  const range = document.createRange();

  try {
    // Line 0: start of el → first br (or end of el)
    for (let i = 0; i < lineCount; i += 1) {
      if (i === 0) {
        range.selectNodeContents(el);
        if (breaks[0]) {
          range.setEndBefore(breaks[0]);
        }
      } else if (i <= breaks.length) {
        const startBr = breaks[i - 1];
        if (!startBr) {
          heights.push(fallback);
          continue;
        }
        range.setStartAfter(startBr);
        const endBr = breaks[i];
        if (endBr) {
          range.setEndBefore(endBr);
        } else {
          range.setEnd(el, el.childNodes.length);
        }
      } else {
        heights.push(fallback);
        continue;
      }

      // Empty hard line (e.g. blank line = consecutive brs) → one line-box.
      if (range.collapsed) {
        heights.push(fallback);
      } else {
        heights.push(rangeHeight(range, fallback));
      }
    }
  } catch {
    return null;
  }

  return heights.length === lineCount ? heights : null;
}

/**
 * Plain text in a wrapping <pre>/<code> (no <br>).
 */
function measureFromMirror(
  el: HTMLElement,
  text: string,
  lineCount: number,
): number[] {
  const width = el.clientWidth;
  const fallback = parseLineHeightPx(el);
  if (width <= 0) {
    return Array.from({ length: lineCount }, () => fallback);
  }

  const lines = text.length === 0 ? [''] : text.split('\n');
  while (lines.length < lineCount) lines.push('');
  if (lines.length > lineCount) lines.length = lineCount;

  const cs = getComputedStyle(el);
  // Force wrapping metrics that match Export / wrap-on CSS, even if the
  // measure host's computed style briefly lags TipTap inline styles.
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
    `font-size:${cs.fontSize}`,
    `font-family:${cs.fontFamily}`,
    `font-weight:${cs.fontWeight}`,
    `font-style:${cs.fontStyle}`,
    `letter-spacing:${cs.letterSpacing}`,
    `line-height:${cs.lineHeight}`,
    `white-space:${whiteSpace}`,
    'overflow-wrap:anywhere',
    'word-break:break-word',
    `tab-size:${cs.tabSize}`,
    'box-sizing:border-box',
    'padding:0',
    'margin:0',
    'border:0',
  ].join(';');

  for (const line of lines) {
    const row = document.createElement('div');
    row.style.whiteSpace = whiteSpace;
    row.style.overflowWrap = 'anywhere';
    row.style.wordBreak = 'break-word';
    row.textContent = line.length > 0 ? line : '\u00a0';
    mirror.appendChild(row);
  }

  document.body.appendChild(mirror);
  const heights: number[] = [];
  for (let i = 0; i < lineCount; i += 1) {
    const child = mirror.children[i] as HTMLElement | undefined;
    heights.push(child?.offsetHeight || fallback);
  }
  mirror.remove();
  return heights;
}

export function measureHaimHardLineHeights(
  el: HTMLElement,
  text: string,
  lineCount: number,
): number[] {
  if (lineCount <= 0) return [];
  const fromDom = measureFromHardBreaks(el, lineCount);
  if (fromDom) return fromDom;
  return measureFromMirror(el, text, lineCount);
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

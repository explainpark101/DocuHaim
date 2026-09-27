/**
 * Measure rendered height of each hard newline line inside `el`, including
 * soft-wrap continuation rows. Uses a same-width mirror so TipTap/br DOM
 * does not need to be walked.
 */
export function measureHaimHardLineHeights(
  el: HTMLElement,
  text: string,
  lineCount: number,
): number[] {
  if (lineCount <= 0) return [];
  const width = el.clientWidth;
  if (width <= 0) {
    return Array.from({ length: lineCount }, () => 0);
  }

  const lines = text.length === 0 ? [''] : text.split('\n');
  while (lines.length < lineCount) lines.push('');
  if (lines.length > lineCount) lines.length = lineCount;

  const cs = getComputedStyle(el);
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
    `letter-spacing:${cs.letterSpacing}`,
    `line-height:${cs.lineHeight}`,
    `white-space:${cs.whiteSpace}`,
    `word-break:${cs.wordBreak}`,
    `overflow-wrap:${cs.overflowWrap}`,
    `tab-size:${cs.tabSize}`,
    'box-sizing:border-box',
    'padding:0',
    'margin:0',
    'border:0',
  ].join(';');

  for (const line of lines) {
    const row = document.createElement('div');
    row.style.whiteSpace = cs.whiteSpace;
    row.style.wordBreak = cs.wordBreak;
    row.style.overflowWrap = cs.overflowWrap;
    // Empty lines still need one line-box.
    row.textContent = line.length > 0 ? line : '\u00a0';
    mirror.appendChild(row);
  }

  document.body.appendChild(mirror);
  const heights: number[] = [];
  for (let i = 0; i < lineCount; i += 1) {
    const child = mirror.children[i] as HTMLElement | undefined;
    heights.push(child?.offsetHeight ?? 0);
  }
  mirror.remove();
  return heights;
}

/**
 * Detect CommonMark-style inline / fenced code so plain-text linkify
 * can leave URLs inside those spans as literal text.
 */

function isEscaped(text: string, index: number): boolean {
  let backslashes = 0;
  for (let i = index - 1; i >= 0 && text[i] === '\\'; i -= 1) {
    backslashes += 1;
  }
  return backslashes % 2 === 1;
}

/**
 * Pairs backtick runs before `matchIndex` by length (CommonMark).
 * An unmatched opener means the index sits inside an inline code span.
 */
export function isInsideInlineCodeSpan(text: string, matchIndex: number): boolean {
  let openRunLength = 0;
  let index = 0;
  const end = Math.max(0, Math.min(matchIndex, text.length));

  while (index < end) {
    if (text[index] !== '`') {
      index += 1;
      continue;
    }

    if (openRunLength === 0 && isEscaped(text, index)) {
      index += 1;
      continue;
    }

    let runLength = 0;
    while (index < end && text[index] === '`') {
      runLength += 1;
      index += 1;
    }

    if (openRunLength === 0) {
      openRunLength = runLength;
    } else if (runLength === openRunLength) {
      openRunLength = 0;
    }
  }

  return openRunLength > 0;
}

type FenceOpen = { ch: string; len: number };

/**
 * Collect [start, end) ranges for fenced code blocks (``` / ~~~),
 * including opener/closer lines. Unclosed fences run to EOF.
 */
export function findFencedCodeRanges(
  text: string,
): Array<{ start: number; end: number }> {
  const ranges: Array<{ start: number; end: number }> = [];
  let open: FenceOpen | null = null;
  let openStart = 0;
  let lineStart = 0;

  while (lineStart <= text.length) {
    const nl = text.indexOf('\n', lineStart);
    const lineEnd = nl < 0 ? text.length : nl;
    const line = text.slice(lineStart, lineEnd);
    const fence = /^( {0,3})(`{3,}|~{3,})(.*)$/.exec(line);

    if (fence) {
      const marker = fence[2] ?? '';
      const info = (fence[3] ?? '').trim();
      const ch = marker[0] ?? '';
      if (!open) {
        open = { ch, len: marker.length };
        openStart = lineStart;
      } else if (
        ch &&
        open.ch === ch &&
        marker.length >= open.len &&
        !info
      ) {
        const end = nl < 0 ? text.length : nl + 1;
        ranges.push({ start: openStart, end });
        open = null;
      }
    }

    if (nl < 0) break;
    lineStart = nl + 1;
  }

  if (open) {
    ranges.push({ start: openStart, end: text.length });
  }
  return ranges;
}

export function isInsideFencedCode(text: string, matchIndex: number): boolean {
  if (matchIndex < 0 || matchIndex > text.length) return false;
  for (const range of findFencedCodeRanges(text)) {
    if (matchIndex >= range.start && matchIndex < range.end) return true;
  }
  return false;
}

/** True when `matchIndex` is inside inline code or a fenced code block. */
export function isInsideMarkdownCodeLiteral(
  text: string,
  matchIndex: number,
): boolean {
  if (matchIndex < 0 || matchIndex > text.length) return false;
  if (isInsideFencedCode(text, matchIndex)) return true;
  return isInsideInlineCodeSpan(text, matchIndex);
}

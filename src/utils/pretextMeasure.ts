/**
 * Canvas-based text width measurement ("pretext").
 * Shared by chat adaptive tabs, print toolbar fit-width, and Haim code gutters.
 */

export function createPretextMeasurer(font: string): (text: string) => number {
  if (typeof document === 'undefined') {
    return () => 0;
  }
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return () => 0;
  }
  ctx.font = font || '14px sans-serif';
  return (text: string) => {
    if (!text) return 0;
    return ctx.measureText(text).width;
  };
}

export function fontShorthandFromElement(el: Element): string {
  if (typeof window === 'undefined') return '14px sans-serif';
  const cs = window.getComputedStyle(el);
  const weight = cs.fontWeight || '400';
  const size = cs.fontSize || '14px';
  const family = cs.fontFamily || 'sans-serif';
  return `${weight} ${size} ${family}`;
}

export function measurePretextWidth(text: string, font: string): number {
  return createPretextMeasurer(font)(text);
}

export type PretextBlockMeasureOptions = {
  font: string;
  contentWidth: number;
  lineHeightPx: number;
  paddingY?: number;
  minHeight?: number;
  maxHeight?: number;
};

export type PretextHardLineMeasureOptions = {
  font: string;
  contentWidth: number;
  lineHeightPx: number;
  /** CSS tab-size (default 4). Expanded before measuring. */
  tabSize?: number;
};

/** Expand tabs to spaces using CSS-like tab stops (1-based columns). */
export function expandTabsForPretext(text: string, tabSize = 4): string {
  const size = Math.max(1, Math.floor(tabSize) || 4);
  let out = '';
  let col = 0;
  for (const ch of text) {
    if (ch === '\t') {
      const spaces = size - (col % size);
      out += ' '.repeat(spaces);
      col += spaces;
      continue;
    }
    if (ch === '\n') {
      out += ch;
      col = 0;
      continue;
    }
    out += ch;
    col += 1;
  }
  return out;
}

/**
 * Visual wrap count for one hard line (no embedded \\n), matching
 * white-space:pre-wrap + overflow-wrap:anywhere / word-break:break-word.
 */
export function countPretextWrapRowsForHardLine(
  hardLine: string,
  measure: (text: string) => number,
  maxWidth: number,
): number {
  if (maxWidth <= 0) return 1;
  const paragraph = hardLine;
  if (!paragraph) return 1;
  if (measure(paragraph) <= maxWidth) return 1;

  const tokens = paragraph.split(/(\s+)/).filter((part) => part.length > 0);
  let lines = 0;
  let current = '';

  const pushLine = (line: string) => {
    if (!line) return;
    lines += 1;
  };

  const pushLongToken = (token: string) => {
    let chunk = '';
    for (const ch of token) {
      const trial = chunk + ch;
      if (!chunk || measure(trial) <= maxWidth) {
        chunk = trial;
        continue;
      }
      pushLine(chunk);
      chunk = ch;
    }
    current = chunk;
  };

  for (const token of tokens) {
    const trial = current + token;
    if (measure(trial) <= maxWidth) {
      current = trial;
      continue;
    }
    if (current.length > 0) {
      pushLine(current);
      current = '';
    }
    if (measure(token) > maxWidth) {
      pushLongToken(token);
      continue;
    }
    current = token;
  }

  if (current.length > 0 || lines === 0) pushLine(current || paragraph);
  return Math.max(1, lines);
}

function wrapParagraphLineCount(
  paragraph: string,
  measure: (text: string) => number,
  maxWidth: number,
): number {
  return countPretextWrapRowsForHardLine(paragraph, measure, maxWidth);
}

export function countPretextWrappedLines(
  text: string,
  font: string,
  contentWidth: number,
): number {
  const measure = createPretextMeasurer(font);
  const paragraphs = String(text || '').split('\n');
  if (paragraphs.length === 0) return 1;
  return paragraphs.reduce(
    (sum, para) => sum + wrapParagraphLineCount(para, measure, contentWidth),
    0,
  );
}

/**
 * Per hard-newline line: how many soft-wrap visual rows that line occupies.
 * Empty document → `[1]`.
 */
export function countPretextHardLineWrapRows(
  text: string,
  font: string,
  contentWidth: number,
  tabSize = 4,
): number[] {
  const measure = createPretextMeasurer(font);
  const raw = text.length === 0 ? [''] : String(text).split('\n');
  return raw.map((line) =>
    countPretextWrapRowsForHardLine(
      expandTabsForPretext(line, tabSize),
      measure,
      contentWidth,
    ),
  );
}

/**
 * Pixel height band for each hard line (wrapRows * lineHeight).
 * Use as `height` / `minHeight`, or derive margin-bottom as height - lineHeight.
 */
export function measurePretextHardLineHeights(
  text: string,
  options: PretextHardLineMeasureOptions,
): number[] {
  const { font, contentWidth, lineHeightPx, tabSize = 4 } = options;
  const lh = lineHeightPx > 0 ? lineHeightPx : 1;
  return countPretextHardLineWrapRows(text, font, contentWidth, tabSize).map(
    (rows) => Math.max(1, rows) * lh,
  );
}

/**
 * Extra space under each line-number digit so the next number starts on the
 * next hard line (marginBottom = (wrapRows - 1) * lineHeight).
 */
export function measurePretextHardLineMargins(
  text: string,
  options: PretextHardLineMeasureOptions,
): number[] {
  const { font, contentWidth, lineHeightPx, tabSize = 4 } = options;
  const lh = lineHeightPx > 0 ? lineHeightPx : 1;
  return countPretextHardLineWrapRows(text, font, contentWidth, tabSize).map(
    (rows) => Math.max(0, rows - 1) * lh,
  );
}

/** Total block height for wrapped plain text (textarea body). */
export function measurePretextBlockHeight(
  text: string,
  options: PretextBlockMeasureOptions,
): number {
  const {
    font,
    contentWidth,
    lineHeightPx,
    paddingY = 0,
    minHeight = 0,
    maxHeight,
  } = options;
  const lines = countPretextWrappedLines(text, font, contentWidth);
  let height = lines * lineHeightPx + paddingY;
  if (minHeight > 0) height = Math.max(minHeight, height);
  if (typeof maxHeight === 'number' && maxHeight > 0) {
    height = Math.min(maxHeight, height);
  }
  return Math.ceil(height);
}

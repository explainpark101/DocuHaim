/**
 * Canvas-based text width measurement ("pretext").
 * Shared by chat adaptive tabs and print toolbar fit-width controls.
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

function wrapParagraphLineCount(
  paragraph: string,
  measure: (text: string) => number,
  maxWidth: number,
): number {
  if (maxWidth <= 0) return 1;
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
    if (current.trim()) {
      pushLine(current);
      current = '';
    }
    if (measure(token) > maxWidth) {
      pushLongToken(token);
      continue;
    }
    current = token;
  }

  if (current.trim() || lines === 0) pushLine(current || paragraph);
  return Math.max(1, lines);
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

import { visibleInlineTextFromMarkdown } from '@/utils/printMarkdownVisibleText';

const PG_BR_RE = /^<pgbr\s*\/?\s*>$/i;

function isFenceStart(line: string): boolean {
  return /^\s*(```+|~~~+)/.test(line);
}

function normalizeWs(value: string): string {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function isSkippablePreviewText(node: Node): boolean {
  const el = node.parentElement;
  if (!el) return true;
  if (el.closest('[aria-hidden="true"], .md-pgbr, .export-pdf-paper-metric')) return true;
  return false;
}

type LineFragment = {
  top: number;
  bottom: number;
  left: number;
  right: number;
  text: string;
};

function collectLineFragments(root: HTMLElement): LineFragment[] {
  const fragments: LineFragment[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.textContent) return NodeFilter.FILTER_REJECT;
      if (isSkippablePreviewText(node)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const range = document.createRange();
  let current = walker.nextNode();
  while (current) {
    const textNode = current as Text;
    const text = textNode.textContent ?? '';
    range.selectNodeContents(textNode);
    const lineRects = [...range.getClientRects()].filter((rect) => rect.height >= 2 && rect.width >= 1);
    if (lineRects.length === 0) {
      current = walker.nextNode();
      continue;
    }
    if (lineRects.length === 1) {
      const rect = lineRects[0];
      if (rect) {
        fragments.push({
          top: rect.top,
          bottom: rect.bottom,
          left: rect.left,
          right: rect.right,
          text,
        });
      }
      current = walker.nextNode();
      continue;
    }

    let charIndex = 0;
    for (const lineRect of lineRects) {
      let start = -1;
      let end = -1;
      for (let i = charIndex; i < text.length; i += 1) {
        range.setStart(textNode, i);
        range.setEnd(textNode, i + 1);
        const rect = range.getBoundingClientRect();
        if (rect.height < 1 && rect.width < 1) continue;
        const overlap = Math.min(rect.bottom, lineRect.bottom) - Math.max(rect.top, lineRect.top);
        const sameLine = overlap > Math.min(rect.height || lineRect.height, lineRect.height) * 0.45;
        if (sameLine) {
          if (start < 0) start = i;
          end = i + 1;
          continue;
        }
        if (start >= 0) break;
      }
      if (start >= 0 && end >= 0) {
        fragments.push({
          top: lineRect.top,
          bottom: lineRect.bottom,
          left: lineRect.left,
          right: lineRect.right,
          text: text.slice(start, end),
        });
        charIndex = end;
      }
    }
    current = walker.nextNode();
  }
  return fragments;
}

function clusterFragmentsIntoLines(fragments: LineFragment[]): LineFragment[][] {
  const sorted = [...fragments].sort((a, b) => a.top - b.top || a.left - b.left);
  const lines: LineFragment[][] = [];
  for (const fragment of sorted) {
    const last = lines[lines.length - 1];
    const seed = last?.[0];
    if (seed && Math.abs(fragment.top - seed.top) <= 3) {
      last.push(fragment);
      continue;
    }
    lines.push([fragment]);
  }
  for (const line of lines) {
    line.sort((a, b) => a.left - b.left);
  }
  return lines;
}

export function getVisualLineAtPoint(
  root: HTMLElement,
  clientX: number,
  clientY: number,
): { lineText: string; occurrence: number; top: number; left: number; right: number; bottom: number } | null {
  const lines = clusterFragmentsIntoLines(collectLineFragments(root));
  if (!lines.length) return null;

  let lineIndex = lines.findIndex((line) => (
    line.some((fragment) => (
      clientX >= fragment.left
      && clientX <= fragment.right
      && clientY >= fragment.top
      && clientY <= fragment.bottom
    ))
  ));
  if (lineIndex < 0) {
    lineIndex = lines.findIndex((line) => {
      const top = Math.min(...line.map((fragment) => fragment.top));
      const bottom = Math.max(...line.map((fragment) => fragment.bottom));
      return clientY >= top && clientY <= bottom;
    });
  }
  if (lineIndex < 0) {
    let bestDist = Infinity;
    lines.forEach((line, index) => {
      const top = Math.min(...line.map((fragment) => fragment.top));
      const bottom = Math.max(...line.map((fragment) => fragment.bottom));
      const dist = clientY < top ? top - clientY : clientY > bottom ? clientY - bottom : 0;
      if (dist < bestDist) {
        bestDist = dist;
        lineIndex = index;
      }
    });
  }

  const line = lineIndex >= 0 ? lines[lineIndex] : null;
  if (!line) return null;
  const lineText = normalizeWs(line.map((fragment) => fragment.text).join(''));
  if (!lineText) return null;

  let occurrence = 0;
  for (let i = 0; i < lineIndex; i += 1) {
    const prev = normalizeWs((lines[i] ?? []).map((fragment) => fragment.text).join(''));
    if (prev === lineText) occurrence += 1;
  }
  return {
    lineText,
    occurrence,
    top: Math.min(...line.map((fragment) => fragment.top)),
    left: Math.min(...line.map((fragment) => fragment.left)),
    right: Math.max(...line.map((fragment) => fragment.right)),
    bottom: Math.max(...line.map((fragment) => fragment.bottom)),
  };
}

function insertPgbrBeforeSourceLine(lines: string[], lineIndex: number): string {
  let prevIdx = lineIndex - 1;
  while (prevIdx >= 0 && !lines[prevIdx]?.trim()) prevIdx -= 1;
  if (prevIdx >= 0 && PG_BR_RE.test((lines[prevIdx] ?? '').trim())) {
    return lines.join('\n');
  }
  const insertion = ['<pgbr/>', ''];
  if (lineIndex > 0 && (lines[lineIndex - 1] ?? '').trim() !== '') {
    insertion.unshift('');
  }
  const next = [...lines];
  next.splice(lineIndex, 0, ...insertion);
  return next.join('\n');
}

function markdownStructuralPrefixLength(rawLine: string): number {
  let index = 0;
  while (index < rawLine.length) {
    const quote = rawLine.slice(index).match(/^ {0,3}>\s?/);
    if (!quote?.[0]) break;
    index += quote[0].length;
  }
  const list = rawLine.slice(index).match(/^(?:[-*+]|\d+[.)])\s+(?:\[[ xX]\]\s+)?/);
  if (list?.[0]) index += list[0].length;
  return index;
}

function findRawIndexOfVisibleNeedle(rawLine: string, needle: string, fromRaw = 0): number {
  const slice = rawLine.slice(fromRaw);
  if (!slice.trim()) return -1;
  const direct = slice.indexOf(needle);
  if (direct >= 0) return fromRaw + direct;

  const collapsedNeedle = normalizeWs(needle);
  if (!collapsedNeedle) return -1;

  // Prefer markdown-stripped visible text (DOM textContent style).
  const stripped = visibleInlineTextFromMarkdown(slice);
  if (
    stripped.length >= 8
    && (stripped.includes(collapsedNeedle) || collapsedNeedle.includes(stripped))
  ) {
    return fromRaw;
  }

  let visible = '';
  const visibleToRaw: number[] = [];
  for (let i = 0; i < slice.length; i += 1) {
    const ch = slice[i] ?? '';
    if (/\s/.test(ch)) {
      if (visible.endsWith(' ') || visible.length === 0) continue;
      visible += ' ';
      visibleToRaw.push(fromRaw + i);
      continue;
    }
    visible += ch;
    visibleToRaw.push(fromRaw + i);
  }
  const idx = visible.indexOf(collapsedNeedle);
  if (idx < 0) return -1;
  return visibleToRaw[idx] ?? -1;
}

export function insertPgbrBeforeVisualLine(
  markdown: string,
  lineText: string,
  occurrence: number,
): { markdown: string; updated: boolean } {
  const needle = normalizeWs(lineText);
  if (!needle || !Number.isInteger(occurrence) || occurrence < 0) {
    return { markdown, updated: false };
  }

  const lines = String(markdown ?? '').split('\n');
  let inFence = false;
  let seen = -1;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i] ?? '';
    if (isFenceStart(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const prefixLen = markdownStructuralPrefixLength(line);
    const visibleFull = visibleInlineTextFromMarkdown(line);
    const visibleAfterPrefix = visibleInlineTextFromMarkdown(line.slice(prefixLen));
    const exact = visibleFull === needle || visibleAfterPrefix === needle;
    // Soft-wrapped preview lines: DOM fragment is a substring of the source line.
    const contains =
      !exact
      && needle.length >= 8
      && (visibleFull.includes(needle) || visibleAfterPrefix.includes(needle));
    const rawIndex = exact || contains
      ? (visibleAfterPrefix === needle || visibleAfterPrefix.includes(needle) ? prefixLen : 0)
      : findRawIndexOfVisibleNeedle(line, needle);
    if (rawIndex < 0 && !exact && !contains) continue;

    seen += 1;
    if (seen !== occurrence) continue;

    // Always insert on the line above this source line (blank line + <pgbr/>).
    // Never splice <pgbr/> into the middle of the line / sentence.
    const alreadyPgbrAbove = (() => {
      let prevIdx = i - 1;
      while (prevIdx >= 0 && !(lines[prevIdx] ?? '').trim()) prevIdx -= 1;
      return prevIdx >= 0 && PG_BR_RE.test((lines[prevIdx] ?? '').trim());
    })();
    if (alreadyPgbrAbove) return { markdown, updated: false };
    const nextMarkdown = insertPgbrBeforeSourceLine(lines, i);
    return { markdown: nextMarkdown, updated: nextMarkdown !== markdown };
  }

  return { markdown, updated: false };
}

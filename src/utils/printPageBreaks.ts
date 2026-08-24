export type PrintUnbreakableBlock = {
  top: number;
  bottom: number;
};

/** Tall fenced code: last line band + full block bottom for page-break display snap. */
type PrintCodeBlockRegion = {
  top: number;
  bottom: number;
  lastLineTop: number;
  lastLineBottom: number;
};

const PGBR_SELECTOR = '.md-pgbr[data-md-pgbr="1"], .md-pgbr';

/** Offset of `el` top edge from `root` content origin (layout px, scroll-aware). */
export function getOffsetTopInRoot(el: HTMLElement, root: HTMLElement): number {
  const rootRect = root.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return elRect.top - rootRect.top + root.scrollTop;
}

function getElementHeight(el: HTMLElement): number {
  return Math.max(el.offsetHeight, el.getBoundingClientRect().height, 1);
}

function getElementBottomInRoot(el: HTMLElement, root: HTMLElement): number {
  return getOffsetTopInRoot(el, root) + getElementHeight(el);
}

/** End offset (exclusive) of the page band that contains `offset`. */
export function getPageBoundaryForOffset(
  offset: number,
  pageStarts: number[],
  contentHeight: number,
): number {
  for (let i = 0; i < pageStarts.length; i += 1) {
    const start = pageStarts[i] ?? 0;
    const end = pageStarts[i + 1] ?? contentHeight;
    if (offset >= start - 0.5 && offset < end - 0.5) return end;
  }
  return contentHeight;
}

export function clearPrintPgbrSpacers(root: HTMLElement): void {
  for (const el of root.querySelectorAll<HTMLElement>('.md-pgbr')) {
    el.style.paddingBottom = '';
  }
}

/**
 * Pad each preview `<pgbr/>` marker to the DOM page boundary from `pageStarts`
 * (not fixed modulo page height).
 */
export function applyPrintPgbrSpacers(
  root: HTMLElement,
  pageStarts: number[],
  contentHeight: number,
): void {
  clearPrintPgbrSpacers(root);
  if (pageStarts.length === 0) return;

  for (const el of root.querySelectorAll<HTMLElement>(PGBR_SELECTOR)) {
    const top = getOffsetTopInRoot(el, root);
    const pageEnd = getPageBoundaryForOffset(top, pageStarts, contentHeight);
    const marker = getElementHeight(el);
    const fill = Math.max(0, pageEnd - top - marker);
    if (fill > 0.5) {
      el.style.paddingBottom = `${fill}px`;
    }
  }
}

/** Bottom edges of `<pgbr/>` markers — mandatory segment boundaries (after spacer padding). */
function collectPrintPgbrSegmentBreaks(root: HTMLElement): number[] {
  const breaks: number[] = [];
  for (const el of root.querySelectorAll<HTMLElement>(PGBR_SELECTOR)) {
    const bottom = getElementBottomInRoot(el, root);
    if (bottom > 0.5) breaks.push(bottom);
  }
  return [...new Set(breaks.map((value) => Math.round(value * 10) / 10))].sort(
    (a, b) => a - b,
  );
}

function buildSegmentBounds(
  pgbrBreaks: number[],
  contentHeight: number,
): number[] {
  const bounds = [0];
  for (const point of pgbrBreaks) {
    if (point > (bounds[bounds.length - 1] ?? 0) + 0.5 && point < contentHeight - 0.5) {
      bounds.push(point);
    }
  }
  if ((bounds[bounds.length - 1] ?? 0) < contentHeight - 0.5) {
    bounds.push(contentHeight);
  }
  return bounds;
}

function uniqueBlocks(blocks: PrintUnbreakableBlock[]): PrintUnbreakableBlock[] {
  const next: PrintUnbreakableBlock[] = [];
  for (const block of blocks) {
    if (block.bottom - block.top < 0.5) continue;
    const prev = next[next.length - 1];
    if (
      prev &&
      Math.abs(prev.top - block.top) < 0.5 &&
      Math.abs(prev.bottom - block.bottom) < 0.5
    ) {
      continue;
    }
    next.push(block);
  }
  return next;
}

function mergeOverlappingBands(blocks: PrintUnbreakableBlock[]): PrintUnbreakableBlock[] {
  const sorted = uniqueBlocks(
    [...blocks].sort((a, b) => a.top - b.top || a.bottom - b.bottom),
  );
  const merged: PrintUnbreakableBlock[] = [];
  for (const block of sorted) {
    const prev = merged[merged.length - 1];
    if (!prev) {
      merged.push({ ...block });
      continue;
    }
    const overlap = Math.min(prev.bottom, block.bottom) - Math.max(prev.top, block.top);
    const minHeight = Math.min(prev.bottom - prev.top, block.bottom - block.top);
    if (overlap > Math.max(1, minHeight * 0.45)) {
      prev.top = Math.min(prev.top, block.top);
      prev.bottom = Math.max(prev.bottom, block.bottom);
      continue;
    }
    merged.push(block);
  }
  return merged;
}

function isSkippableTextContext(node: Node): boolean {
  const parent = node.parentElement;
  if (!parent) return true;
  if (
    parent.closest(
      '[aria-hidden="true"], .md-pgbr, .md-editor-code-head, .md-editor-code, pre, code, .md-editor-mermaid',
    )
  ) {
    return true;
  }
  const figure = parent.closest('figure');
  if (figure?.querySelector('img')) return true;
  return false;
}

export function collectPrintImageBlocks(root: HTMLElement): PrintUnbreakableBlock[] {
  const blocks = [...root.querySelectorAll('img')].map((img) => {
    const host = (img.closest('figure') ?? img) as HTMLElement;
    const top = getOffsetTopInRoot(host, root);
    return { top, bottom: top + getElementHeight(host) };
  });
  return mergeOverlappingBands(blocks);
}

/** Mermaid charts as atomic bands (skip SVG text line solids separately). */
export function collectPrintMermaidBlocks(root: HTMLElement): PrintUnbreakableBlock[] {
  const blocks = [...root.querySelectorAll<HTMLElement>('.md-editor-mermaid')].map((host) => {
    const svg = host.querySelector('svg');
    const top = getOffsetTopInRoot(host, root);
    const hostH = getElementHeight(host);
    const svgH = svg ? svg.getBoundingClientRect().height : 0;
    const height = Math.max(hostH, svgH);
    return { top, bottom: top + height };
  });
  return mergeOverlappingBands(blocks);
}

export function collectPrintTextLineBlocks(root: HTMLElement): PrintUnbreakableBlock[] {
  const blocks: PrintUnbreakableBlock[] = [];
  const rootTop = root.getBoundingClientRect().top;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.textContent?.trim()) return NodeFilter.FILTER_REJECT;
      if (isSkippableTextContext(node)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const range = document.createRange();
  let current = walker.nextNode();
  while (current) {
    range.selectNodeContents(current);
    const rects = range.getClientRects();
    for (let i = 0; i < rects.length; i += 1) {
      const rect = rects.item(i);
      if (!rect || rect.height < 2 || rect.width < 1) continue;
      blocks.push({
        top: rect.top - rootTop + root.scrollTop,
        bottom: rect.bottom - rootTop + root.scrollTop,
      });
    }
    current = walker.nextNode();
  }
  return mergeOverlappingBands(blocks);
}

function getCodeBlockHeadHeight(codeRoot: HTMLElement): number {
  const head = codeRoot.querySelector<HTMLElement>('.md-editor-code-head');
  if (!head) return 0;
  return getElementHeight(head);
}

/** Printable body of a fenced code block (language bar excluded — hidden in print). */
function getPrintableCodeBlockBounds(
  codeRoot: HTMLElement,
  root: HTMLElement,
): { top: number; bottom: number; height: number } {
  const top = getOffsetTopInRoot(codeRoot, root);
  const headHeight = getCodeBlockHeadHeight(codeRoot);
  const height = Math.max(1, getElementHeight(codeRoot) - headHeight);
  return { top, bottom: top + height, height };
}

function collectPrintCodeLineBlocks(
  codeRoot: HTMLElement,
  root: HTMLElement,
): PrintUnbreakableBlock[] {
  const lines = [...codeRoot.querySelectorAll<HTMLElement>('pre code .md-editor-code-block')];
  if (lines.length > 0) {
    return lines.map((line) => {
      const top = getOffsetTopInRoot(line, root);
      return { top, bottom: top + getElementHeight(line) };
    });
  }

  const pre = codeRoot.querySelector('pre');
  const code = pre?.querySelector('code');
  if (!code) return [];

  const blocks: PrintUnbreakableBlock[] = [];
  const rootTop = root.getBoundingClientRect().top;
  const range = document.createRange();
  const walker = document.createTreeWalker(code, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.textContent) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  let current = walker.nextNode();
  while (current) {
    range.selectNodeContents(current);
    const rects = range.getClientRects();
    for (let i = 0; i < rects.length; i += 1) {
      const rect = rects.item(i);
      if (!rect || rect.height < 2 || rect.width < 1) continue;
      blocks.push({
        top: rect.top - rootTop + root.scrollTop,
        bottom: rect.bottom - rootTop + root.scrollTop,
      });
    }
    current = walker.nextNode();
  }
  return blocks;
}

function collectPrintCodeBlockRegions(root: HTMLElement): PrintCodeBlockRegion[] {
  const regions: PrintCodeBlockRegion[] = [];

  for (const codeRoot of root.querySelectorAll<HTMLElement>('.md-editor-code')) {
    const printable = getPrintableCodeBlockBounds(codeRoot, root);
    const lineBlocks = collectPrintCodeLineBlocks(codeRoot, root);
    if (lineBlocks.length === 0) continue;

    const lastLine = lineBlocks[lineBlocks.length - 1]!;
    regions.push({
      top: printable.top,
      bottom: printable.bottom,
      lastLineTop: lastLine.top,
      lastLineBottom: lastLine.bottom,
    });
  }

  return regions;
}

/**
 * When a break inside a code block targets the last line, show it below the whole block
 * (pre padding / chrome), not on the last line band.
 */
function snapPageEndToCodeBlockBottomIfLastLine(
  pageEnd: number,
  codeRegions: PrintCodeBlockRegion[],
): number {
  for (const region of codeRegions) {
    if (pageEnd < region.top - 0.5 || pageEnd > region.bottom + 0.5) continue;
    if (pageEnd >= region.lastLineTop - 0.5) {
      return region.bottom;
    }
  }
  return pageEnd;
}

/** md-editor fenced code: short blocks stay atomic; tall blocks break only between lines. */
function collectPrintCodeBlocks(
  root: HTMLElement,
  pageInnerHeightPx: number,
): PrintUnbreakableBlock[] {
  const blocks: PrintUnbreakableBlock[] = [];

  for (const codeRoot of root.querySelectorAll<HTMLElement>('.md-editor-code')) {
    const printable = getPrintableCodeBlockBounds(codeRoot, root);

    if (printable.height <= pageInnerHeightPx + 0.5) {
      blocks.push({ top: printable.top, bottom: printable.bottom });
      continue;
    }

    blocks.push(...collectPrintCodeLineBlocks(codeRoot, root));
  }

  return mergeOverlappingBands(blocks);
}

export function collectPrintSolidBlocks(
  root: HTMLElement,
  pageInnerHeightPx: number,
): PrintUnbreakableBlock[] {
  const blockSelectors =
    'p, h1, h2, h3, h4, h5, h6, li, figure, table, blockquote, ul, ol, hr, [data-haim-table]';
  const flowBlocks = [...root.querySelectorAll(blockSelectors)]
    .filter((el) => !el.closest('.md-editor-code'))
    .map((el) => {
      const node = el as HTMLElement;
      const top = getOffsetTopInRoot(node, root);
      return { top, bottom: top + getElementHeight(node) };
    });

  return mergeOverlappingBands([
    ...collectPrintImageBlocks(root),
    ...collectPrintMermaidBlocks(root),
    ...collectPrintTextLineBlocks(root),
    ...collectPrintCodeBlocks(root, pageInnerHeightPx),
    ...flowBlocks,
  ]);
}

function previousSolidBottom(
  solids: PrintUnbreakableBlock[],
  hit: PrintUnbreakableBlock,
  pageStart: number,
): number {
  let prevBottom = pageStart;
  for (const block of solids) {
    if (block === hit) continue;
    if (block.bottom <= hit.top + 0.5 && block.bottom > prevBottom) {
      prevBottom = block.bottom;
    }
  }
  return prevBottom;
}

function snapBreakAboveSolid(
  naturalEnd: number,
  pageStart: number,
  solids: PrintUnbreakableBlock[],
  pageInnerHeightPx: number,
): number {
  const hit = solids.find(
    (block) =>
      block.top < naturalEnd - 0.5 &&
      block.bottom > naturalEnd + 0.5 &&
      block.bottom > pageStart + 0.5,
  );
  if (!hit) return naturalEnd;

  const blockHeight = hit.bottom - hit.top;
  const isAtomic = blockHeight <= pageInnerHeightPx + 0.5;

  // Keep atomic blocks (short code blocks, images, …) together — break after the block.
  if (isAtomic) {
    return hit.bottom;
  }

  // Splittable block starts on this page but the first fragment is too small — next page.
  if (hit.top > pageStart + 0.5 && blockHeight > naturalEnd - hit.top + 0.5) {
    return hit.top;
  }

  // Block begins at (or near) the page top and is taller than one page — break on line boundaries only.
  if (hit.top <= pageStart + 0.5 && blockHeight > pageInnerHeightPx + 0.5) {
    return naturalEnd;
  }

  if (hit.top <= pageStart + 0.5) return naturalEnd;

  const prevBottom = previousSolidBottom(solids, hit, pageStart);
  const gap = hit.top - prevBottom;
  if (gap >= 4) {
    return prevBottom + gap / 2;
  }
  return hit.top;
}

function appendPageStart(starts: number[], value: number): void {
  const prev = starts[starts.length - 1];
  if (prev != null && Math.abs(prev - value) < 0.5) return;
  starts.push(value);
}

function paginateSegment(
  segmentStart: number,
  segmentEnd: number,
  pageInnerHeightPx: number,
  solids: PrintUnbreakableBlock[],
  codeRegions: PrintCodeBlockRegion[],
  starts: number[],
): void {
  if (segmentEnd <= segmentStart + 0.5) return;

  appendPageStart(starts, segmentStart);

  let pageStart = segmentStart;
  while (pageStart + pageInnerHeightPx < segmentEnd - 0.5) {
    const naturalEnd = Math.min(pageStart + pageInnerHeightPx, segmentEnd);
    let pageEnd = snapBreakAboveSolid(
      naturalEnd,
      pageStart,
      solids,
      pageInnerHeightPx,
    );
    pageEnd = snapPageEndToCodeBlockBottomIfLastLine(pageEnd, codeRegions);
    if (pageEnd <= pageStart + 0.5) {
      pageEnd = naturalEnd;
    }
    if (pageEnd >= segmentEnd - 0.5) break;

    appendPageStart(starts, pageEnd);
    pageStart = pageEnd;
  }
}

/**
 * Page start offsets (including 0).
 * `<pgbr/>` ends a segment; pagination restarts with a full page height budget after each marker.
 */
export function computePrintPageStarts(
  root: HTMLElement,
  pageInnerHeightPx: number,
): number[] {
  if (pageInnerHeightPx <= 1) return [0];

  const contentHeight = root.scrollHeight;
  const solids = collectPrintSolidBlocks(root, pageInnerHeightPx);
  const codeRegions = collectPrintCodeBlockRegions(root);
  const pgbrBreaks = collectPrintPgbrSegmentBreaks(root);
  const segmentBounds = buildSegmentBounds(pgbrBreaks, contentHeight);

  const starts: number[] = [];

  for (let i = 0; i < segmentBounds.length - 1; i += 1) {
    const segStart = segmentBounds[i] ?? 0;
    const segEnd = segmentBounds[i + 1] ?? contentHeight;
    const forcedPgbrEnd = i < pgbrBreaks.length && Math.abs(segEnd - (pgbrBreaks[i] ?? 0)) < 1;

    paginateSegment(segStart, segEnd, pageInnerHeightPx, solids, codeRegions, starts);

    if (forcedPgbrEnd && segEnd < contentHeight - 0.5) {
      appendPageStart(starts, segEnd);
    }
  }

  if (starts.length === 0) starts.push(0);
  return starts;
}

/**
 * Measure page starts from laid-out preview DOM, iterating pgbr spacer fill until stable.
 */
export function measurePrintPagination(
  root: HTMLElement,
  pageInnerHeightPx: number,
  maxIterations = 8,
): { pageStarts: number[]; contentHeight: number } {
  if (pageInnerHeightPx <= 1) {
    return { pageStarts: [0], contentHeight: 0 };
  }

  clearPrintPgbrSpacers(root);
  let pageStarts = computePrintPageStarts(root, pageInnerHeightPx);
  let contentHeight = root.scrollHeight;

  for (let i = 0; i < maxIterations; i += 1) {
    applyPrintPgbrSpacers(root, pageStarts, contentHeight);
    const nextStarts = computePrintPageStarts(root, pageInnerHeightPx);
    const nextHeight = root.scrollHeight;
    const stable =
      nextStarts.length === pageStarts.length &&
      nextStarts.every((value, index) => Math.abs(value - (pageStarts[index] ?? 0)) < 0.5) &&
      Math.abs(nextHeight - contentHeight) < 0.5;
    pageStarts = nextStarts;
    contentHeight = nextHeight;
    if (stable) break;
  }

  return { pageStarts, contentHeight };
}

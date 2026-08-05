export type PrintUnbreakableBlock = {
  top: number;
  bottom: number;
};

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
    merged.push({ ...block });
  }
  return merged;
}

function isSkippableTextContext(node: Node): boolean {
  const parent = node.parentElement;
  if (!parent) return true;
  if (parent.closest('[aria-hidden="true"], .md-pgbr')) return true;
  const figure = parent.closest('figure');
  if (figure?.querySelector('img')) return true;
  return false;
}

export function collectPrintImageBlocks(root: HTMLElement): PrintUnbreakableBlock[] {
  const rootTop = root.getBoundingClientRect().top;
  const blocks = [...root.querySelectorAll('img')].map((img) => {
    const host = img.closest('figure') ?? img;
    const rect = host.getBoundingClientRect();
    return {
      top: rect.top - rootTop,
      bottom: rect.bottom - rootTop,
    };
  });
  return mergeOverlappingBands(blocks);
}

export function collectPrintTextLineBlocks(root: HTMLElement): PrintUnbreakableBlock[] {
  const rootTop = root.getBoundingClientRect().top;
  const blocks: PrintUnbreakableBlock[] = [];
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
        top: rect.top - rootTop,
        bottom: rect.bottom - rootTop,
      });
    }
    current = walker.nextNode();
  }
  return mergeOverlappingBands(blocks);
}

export function collectPrintSolidBlocks(root: HTMLElement): PrintUnbreakableBlock[] {
  return mergeOverlappingBands([
    ...collectPrintImageBlocks(root),
    ...collectPrintTextLineBlocks(root),
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
): number {
  const hit = solids.find(
    (block) =>
      block.top < naturalEnd - 0.5 &&
      block.bottom > naturalEnd + 0.5 &&
      block.bottom > pageStart + 0.5,
  );
  if (!hit) return naturalEnd;
  if (hit.top <= pageStart + 0.5) return naturalEnd;

  const prevBottom = previousSolidBottom(solids, hit, pageStart);
  const gap = hit.top - prevBottom;
  if (gap >= 4) {
    return prevBottom + gap / 2;
  }
  return hit.top;
}

/**
 * Page start offsets (including 0). Breaks never cut through photos or text
 * glyphs; they snap into the gap between the content above and the next
 * photo/line, then the next page is measured from that point.
 */
export function computePrintPageStarts(
  root: HTMLElement,
  pageInnerHeightPx: number,
): number[] {
  if (pageInnerHeightPx <= 1) return [0];

  const contentHeight = root.scrollHeight;
  const solids = collectPrintSolidBlocks(root);
  const starts = [0];
  let pageStart = 0;

  while (pageStart + pageInnerHeightPx < contentHeight - 0.5) {
    const naturalEnd = pageStart + pageInnerHeightPx;
    let pageEnd = snapBreakAboveSolid(naturalEnd, pageStart, solids);
    if (pageEnd <= pageStart + 0.5) {
      pageEnd = naturalEnd;
    }
    if (pageEnd >= contentHeight - 0.5) break;

    starts.push(pageEnd);
    pageStart = pageEnd;
  }

  return starts;
}

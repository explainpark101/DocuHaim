/**
 * Overflow-based print pagination: fixed page boxes filled unit-by-unit.
 * Staging MdPreview stays intact (clone into pages); preview and print share pages DOM.
 */

export const PRINT_PACK_LINE_CLASS = 'print-pack-line';
export const PRINT_PAGE_INNER_CLASS = 'export-pdf-page-inner';
export const PRINT_PAGES_HOST_ATTR = 'data-export-pdf-pages';
export const PRINT_BODY_PAGE_ATTR = 'data-print-body-page';

export type PrintPackUnit =
  | { type: 'page-break' }
  | { type: 'element'; element: HTMLElement };

function getElementHeight(el: HTMLElement): number {
  return Math.max(el.offsetHeight, el.getBoundingClientRect().height, 1);
}

function isPgbr(el: HTMLElement): boolean {
  return el.classList.contains('md-pgbr') || el.matches('.md-pgbr');
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

function caretRangeFromPoint(x: number, y: number): Range | null {
  const doc = document as Document & {
    caretRangeFromPoint?: (x: number, y: number) => Range | null;
    caretPositionFromPoint?: (x: number, y: number) => {
      offsetNode: Node;
      offset: number;
    } | null;
  };
  if (typeof doc.caretRangeFromPoint === 'function') {
    return doc.caretRangeFromPoint(x, y);
  }
  const pos = doc.caretPositionFromPoint?.(x, y);
  if (!pos?.offsetNode) return null;
  const range = document.createRange();
  try {
    range.setStart(pos.offsetNode, pos.offset);
    range.collapse(true);
    return range;
  } catch {
    return null;
  }
}

/** Unique visual line mid-Y positions inside `block` (viewport coords). */
function collectLineMidYs(block: HTMLElement): number[] {
  const tops: number[] = [];
  const range = document.createRange();
  const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.textContent?.trim()) return NodeFilter.FILTER_REJECT;
      if (isSkippableTextContext(node)) return NodeFilter.FILTER_REJECT;
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
      const top = Math.round(rect.top * 2) / 2;
      if (!tops.some((value) => Math.abs(value - top) < 1)) {
        tops.push(top);
      }
    }
    current = walker.nextNode();
  }

  tops.sort((a, b) => a - b);
  return tops.map((top, index) => {
    const next = tops[index + 1];
    const bottom = next != null ? next : top + 16;
    return (top + bottom) / 2;
  });
}

function rangeWithinBlock(
  block: HTMLElement,
  startMidY: number,
  endMidY: number | null,
): Range | null {
  const rect = block.getBoundingClientRect();
  const x = Math.min(rect.right - 2, rect.left + Math.max(4, rect.width * 0.02));
  const startCaret = caretRangeFromPoint(x, startMidY);
  if (!startCaret || !block.contains(startCaret.startContainer)) return null;

  const range = document.createRange();
  range.setStart(startCaret.startContainer, startCaret.startOffset);

  if (endMidY == null) {
    range.setEndAfter(block.lastChild ?? block);
    try {
      range.setEnd(block, block.childNodes.length);
    } catch {
      /* keep setEndAfter */
    }
    return range;
  }

  const endCaret = caretRangeFromPoint(x, endMidY);
  if (!endCaret || !block.contains(endCaret.startContainer)) {
    range.setEnd(block, block.childNodes.length);
    return range;
  }
  range.setEnd(endCaret.startContainer, endCaret.startOffset);
  return range;
}

function copyBlockTypography(source: HTMLElement, target: HTMLElement): void {
  const style = getComputedStyle(source);
  target.style.margin = '0';
  target.style.padding = '0';
  target.style.font = style.font;
  target.style.fontSize = style.fontSize;
  target.style.fontWeight = style.fontWeight;
  target.style.fontFamily = style.fontFamily;
  target.style.lineHeight = style.lineHeight;
  target.style.letterSpacing = style.letterSpacing;
  target.style.textAlign = style.textAlign;
  target.style.color = style.color;
  target.style.whiteSpace = style.whiteSpace;
  target.style.wordBreak = style.wordBreak;
  target.style.overflowWrap = style.overflowWrap;
}

function createLineWrapper(block: HTMLElement, lineIndex: number, lineCount: number): HTMLElement {
  const tag = /^H[1-6]$/i.test(block.tagName) ? block.tagName.toLowerCase() : 'div';
  const wrapper = document.createElement(tag);
  wrapper.className = PRINT_PACK_LINE_CLASS;
  wrapper.dataset.printPackLine = '1';
  wrapper.dataset.printPackSource = block.tagName.toLowerCase();
  if (lineIndex === 0 && block.id) {
    wrapper.id = block.id;
  }
  if (lineIndex === 0) {
    const mt = getComputedStyle(block).marginTop;
    if (mt && mt !== '0px') wrapper.style.marginTop = mt;
  }
  if (lineIndex === lineCount - 1) {
    const mb = getComputedStyle(block).marginBottom;
    if (mb && mb !== '0px') wrapper.style.marginBottom = mb;
  }
  copyBlockTypography(block, wrapper);
  if (/^H[1-6]$/i.test(block.tagName)) {
    wrapper.style.fontWeight = getComputedStyle(block).fontWeight;
  }
  if (block.tagName === 'LI') {
    const style = getComputedStyle(block);
    wrapper.style.paddingLeft = style.paddingLeft;
    wrapper.style.listStyleType = style.listStyleType;
    wrapper.style.display = 'list-item';
    wrapper.style.marginLeft = style.marginLeft;
  }
  return wrapper;
}

/** Split a prose / list-item block into one element per visual line (detached clones). */
export function materializeProseLineElements(block: HTMLElement): HTMLElement[] {
  const midYs = collectLineMidYs(block);
  if (midYs.length <= 1) {
    const clone = block.cloneNode(true) as HTMLElement;
    clone.classList.add(PRINT_PACK_LINE_CLASS);
    clone.dataset.printPackLine = '1';
    return [clone];
  }

  const lines: HTMLElement[] = [];
  for (let i = 0; i < midYs.length; i += 1) {
    const startMid = midYs[i]!;
    const endMid = midYs[i + 1] ?? null;
    const range = rangeWithinBlock(block, startMid, endMid);
    const wrapper = createLineWrapper(block, i, midYs.length);
    if (range && !range.collapsed) {
      try {
        wrapper.appendChild(range.cloneContents());
      } catch {
        wrapper.textContent = range.toString();
      }
    } else if (i === 0) {
      wrapper.appendChild(block.cloneNode(true));
    }
    if (wrapper.childNodes.length === 0 && i === 0) {
      wrapper.appendChild(block.cloneNode(true));
    }
    if (wrapper.childNodes.length > 0 || i === 0) {
      lines.push(wrapper);
    }
  }
  return lines.length > 0 ? lines : [block.cloneNode(true) as HTMLElement];
}

function getCodeBlockHeadHeight(codeRoot: HTMLElement): number {
  const head = codeRoot.querySelector<HTMLElement>('.md-editor-code-head');
  if (!head) return 0;
  return getElementHeight(head);
}

function getPrintableCodeHeight(codeRoot: HTMLElement): number {
  return Math.max(1, getElementHeight(codeRoot) - getCodeBlockHeadHeight(codeRoot));
}

/** One printable code shell containing a single line (or full block). */
function materializeCodeLineShell(codeRoot: HTMLElement, lineEl: HTMLElement | null): HTMLElement {
  const shell = codeRoot.cloneNode(true) as HTMLElement;
  const head = shell.querySelector('.md-editor-code-head');
  head?.remove();
  if (!lineEl) return shell;

  const code = shell.querySelector('pre code');
  if (!code) return shell;
  const lineClass = lineEl.className;
  const lineText = lineEl.textContent ?? '';
  const matchIndex = [...codeRoot.querySelectorAll('.md-editor-code-block')].indexOf(lineEl);
  code.replaceChildren();
  const lineClone = document.createElement('span');
  lineClone.className = lineClass || 'md-editor-code-block';
  lineClone.textContent = lineText;
  if (matchIndex >= 0) lineClone.dataset.line = String(matchIndex + 1);
  code.appendChild(lineClone);
  return shell;
}

function pushCodeUnits(
  codeRoot: HTMLElement,
  pageInnerHeightPx: number,
  units: PrintPackUnit[],
): void {
  const height = getPrintableCodeHeight(codeRoot);
  if (height <= pageInnerHeightPx + 0.5) {
    const shell = codeRoot.cloneNode(true) as HTMLElement;
    shell.querySelector('.md-editor-code-head')?.remove();
    units.push({ type: 'element', element: shell });
    return;
  }

  const lines = [...codeRoot.querySelectorAll<HTMLElement>('pre code .md-editor-code-block')];
  if (lines.length === 0) {
    const shell = codeRoot.cloneNode(true) as HTMLElement;
    shell.querySelector('.md-editor-code-head')?.remove();
    units.push({ type: 'element', element: shell });
    return;
  }

  for (const line of lines) {
    units.push({ type: 'element', element: materializeCodeLineShell(codeRoot, line) });
  }
}

function pushProseUnits(block: HTMLElement, units: PrintPackUnit[]): void {
  for (const line of materializeProseLineElements(block)) {
    units.push({ type: 'element', element: line });
  }
}

function walkPackBlocks(
  container: HTMLElement,
  pageInnerHeightPx: number,
  units: PrintPackUnit[],
): void {
  for (const child of Array.from(container.children)) {
    const el = child as HTMLElement;
    if (!(el instanceof HTMLElement)) continue;

    if (isPgbr(el)) {
      units.push({ type: 'page-break' });
      continue;
    }

    if (el.matches('.md-editor-code')) {
      pushCodeUnits(el, pageInnerHeightPx, units);
      continue;
    }

    if (el.matches('.md-editor-mermaid, table, [data-haim-table], hr')) {
      units.push({ type: 'element', element: el.cloneNode(true) as HTMLElement });
      continue;
    }

    if (el.matches('figure') || (el.matches('img') && !el.closest('figure'))) {
      const host = (el.matches('figure') ? el : el.closest('figure') ?? el) as HTMLElement;
      units.push({ type: 'element', element: host.cloneNode(true) as HTMLElement });
      continue;
    }

    if (el.matches('ul, ol')) {
      for (const li of el.querySelectorAll<HTMLElement>(':scope > li')) {
        pushProseUnits(li, units);
      }
      continue;
    }

    if (el.matches('blockquote')) {
      walkPackBlocks(el, pageInnerHeightPx, units);
      continue;
    }

    if (el.matches('p, h1, h2, h3, h4, h5, h6, li')) {
      pushProseUnits(el, units);
      continue;
    }

    if (el.children.length > 0 && !el.matches('pre, code, svg')) {
      walkPackBlocks(el, pageInnerHeightPx, units);
      continue;
    }

    units.push({ type: 'element', element: el.cloneNode(true) as HTMLElement });
  }
}

export function getPrintPreviewRoot(stagingRoot: HTMLElement): HTMLElement {
  return (
    stagingRoot.querySelector<HTMLElement>('.md-editor-preview')
    ?? stagingRoot.querySelector<HTMLElement>('[id$="-preview"]')
    ?? stagingRoot
  );
}

/** Ordered pack units from a laid-out staging preview (clones / detached nodes). */
export function extractPrintPackUnits(
  stagingRoot: HTMLElement,
  pageInnerHeightPx: number,
): PrintPackUnit[] {
  const preview = getPrintPreviewRoot(stagingRoot);
  const units: PrintPackUnit[] = [];
  walkPackBlocks(preview, pageInnerHeightPx, units);
  return units;
}

function createPageElement(
  pageInnerHeightPx: number,
  pageIndex: number,
  themeClass = '',
): HTMLElement {
  const page = document.createElement('div');
  page.className = 'export-pdf-page export-pdf-paper';
  page.setAttribute(PRINT_BODY_PAGE_ATTR, String(pageIndex));
  page.style.width = 'var(--print-page-width)';
  page.style.height = 'var(--print-page-height)';
  page.style.minHeight = 'var(--print-page-height)';
  page.style.maxHeight = 'var(--print-page-height)';
  page.style.padding = 'var(--print-page-margin)';
  page.style.boxSizing = 'border-box';
  page.style.overflow = 'hidden';
  page.style.background = '#ffffff';
  page.style.color = '#111827';

  const inner = document.createElement('div');
  inner.className = [PRINT_PAGE_INNER_CLASS, 'md-editor-preview', themeClass]
    .filter(Boolean)
    .join(' ');
  inner.setAttribute('data-export-pdf-preview', '1');
  inner.style.height = `${Math.max(1, pageInnerHeightPx)}px`;
  inner.style.maxHeight = `${Math.max(1, pageInnerHeightPx)}px`;
  inner.style.overflow = 'hidden';
  inner.style.position = 'relative';
  page.appendChild(inner);
  return page;
}

function pageInner(page: HTMLElement): HTMLElement {
  const inner = page.querySelector<HTMLElement>(`.${PRINT_PAGE_INNER_CLASS}`);
  if (!inner) throw new Error('export-pdf-page missing inner');
  return inner;
}

function overflows(inner: HTMLElement, pageInnerHeightPx: number): boolean {
  return inner.scrollHeight > pageInnerHeightPx + 1;
}

function stripDuplicateIds(root: HTMLElement): void {
  for (const el of root.querySelectorAll('[id]')) {
    // Mermaid SVG theme/marker CSS is keyed by id; rewrite separately.
    if (el.closest('.md-editor-mermaid')) continue;
    el.removeAttribute('id');
  }
}

let printMermaidIdSeq = 0;

/**
 * Mermaid embeds theme rules as `#svgId .node rect { fill:… }`. Packing used to
 * strip those ids, so clones fell back to black fills under html.dark. Remap every
 * id inside each cloned diagram (and url(#…) / style references) to unique values.
 */
export function rewriteMermaidIdsInClone(root: HTMLElement): void {
  const hosts = root.classList?.contains('md-editor-mermaid')
    ? [root]
    : [...root.querySelectorAll<HTMLElement>('.md-editor-mermaid')];

  for (const host of hosts) {
    const svg = host.querySelector('svg');
    if (!svg) continue;

    printMermaidIdSeq += 1;
    const prefix = `pm${printMermaidIdSeq}-`;
    const idMap = new Map<string, string>();
    const withIds = [svg, ...svg.querySelectorAll('[id]')];
    for (const el of withIds) {
      const oldId = el.id;
      if (!oldId) continue;
      const next = `${prefix}${oldId}`;
      idMap.set(oldId, next);
      el.id = next;
    }
    if (idMap.size === 0) continue;

    const replaceIds = (text: string): string => {
      let out = text;
      // Longest-first so shorter ids are not partial matches of longer ones.
      const entries = [...idMap.entries()].sort((a, b) => b[0].length - a[0].length);
      for (const [oldId, newId] of entries) {
        out = out.split(oldId).join(newId);
      }
      return out;
    };

    for (const styleEl of svg.querySelectorAll('style')) {
      if (styleEl.textContent) styleEl.textContent = replaceIds(styleEl.textContent);
    }
    for (const el of [svg, ...svg.querySelectorAll('*')]) {
      for (const attr of [...el.attributes]) {
        if (!attr.value.includes('#')) continue;
        const next = replaceIds(attr.value);
        if (next !== attr.value) el.setAttribute(attr.name, next);
      }
    }
  }
}

/**
 * Pack staging content into fixed-height page boxes under `pagesHost`.
 * Returns body page count (at least 1).
 */
export function packPrintPages(options: {
  stagingRoot: HTMLElement;
  pagesHost: HTMLElement;
  pageInnerHeightPx: number;
}): { pageCount: number } {
  const { stagingRoot, pagesHost, pageInnerHeightPx } = options;
  if (pageInnerHeightPx <= 1) {
    pagesHost.replaceChildren();
    pagesHost.appendChild(createPageElement(1, 0));
    return { pageCount: 1 };
  }

  const preview = getPrintPreviewRoot(stagingRoot);
  const themeClass = [...preview.classList].find((name) => name.endsWith('-theme')) ?? '';

  const units = extractPrintPackUnits(stagingRoot, pageInnerHeightPx);
  pagesHost.replaceChildren();

  let pageIndex = 0;
  let page = createPageElement(pageInnerHeightPx, pageIndex, themeClass);
  let inner = pageInner(page);
  pagesHost.appendChild(page);

  const startNewPage = () => {
    pageIndex += 1;
    page = createPageElement(pageInnerHeightPx, pageIndex, themeClass);
    inner = pageInner(page);
    pagesHost.appendChild(page);
  };

  for (const unit of units) {
    if (unit.type === 'page-break') {
      if (inner.childNodes.length > 0) {
        startNewPage();
      }
      continue;
    }

    const node = unit.element.cloneNode(true) as HTMLElement;
    stripDuplicateIds(node);
    rewriteMermaidIdsInClone(node);
    // Preserve heading id on first line only (already set in materialize).
    if (unit.element.id && node.classList.contains(PRINT_PACK_LINE_CLASS)) {
      node.id = unit.element.id;
    } else if (unit.element.id && /^H[1-6]$/i.test(unit.element.tagName)) {
      node.id = unit.element.id;
    }

    inner.appendChild(node);
    if (!overflows(inner, pageInnerHeightPx)) continue;

    inner.removeChild(node);
    if (inner.childNodes.length === 0) {
      // Unit taller than one page: force-place, then continue on a fresh page.
      inner.appendChild(node);
      startNewPage();
      continue;
    }

    startNewPage();
    inner.appendChild(node);
    if (overflows(inner, pageInnerHeightPx) && inner.childNodes.length === 1) {
      // Still oversized on a fresh page — leave as the sole content.
      continue;
    }
    if (overflows(inner, pageInnerHeightPx)) {
      // Should not happen for normal lines; force keep.
    }
  }

  // Drop a trailing empty page created after a forced tall unit.
  const last = pagesHost.lastElementChild as HTMLElement | null;
  if (
    last
    && pagesHost.children.length > 1
    && pageInner(last).childNodes.length === 0
  ) {
    last.remove();
  }

  if (pagesHost.children.length === 0) {
    pagesHost.appendChild(createPageElement(pageInnerHeightPx, 0, themeClass));
  }

  // Re-index body page attributes after possible removals.
  [...pagesHost.children].forEach((child, index) => {
    if (child instanceof HTMLElement) {
      child.setAttribute(PRINT_BODY_PAGE_ATTR, String(index));
    }
  });

  // Move heading ids onto packed pages so getElementById / TOC hit the visible DOM.
  const packedIds = new Set<string>();
  for (const el of pagesHost.querySelectorAll<HTMLElement>('[id]')) {
    if (el.id) packedIds.add(el.id);
  }
  for (const el of stagingRoot.querySelectorAll<HTMLElement>('[id]')) {
    if (packedIds.has(el.id)) el.removeAttribute('id');
  }

  return { pageCount: pagesHost.children.length };
}

/** Synthetic pageStarts (0, H, 2H, …) for callers that still expect offsets. */
export function pageStartsFromCount(pageCount: number, pageInnerHeightPx: number): number[] {
  const count = Math.max(1, pageCount);
  const h = Math.max(1, pageInnerHeightPx);
  return Array.from({ length: count }, (_, i) => i * h);
}

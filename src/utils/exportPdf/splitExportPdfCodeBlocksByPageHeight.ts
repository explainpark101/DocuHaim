/**
 * Pre-split tall fenced code blocks into sibling fences so paged.js does not
 * resume mid-fence (Layout repeated drops the remainder).
 *
 * The first chunk height is derived from measured leftover space on the current
 * page (prefix content before the fence), so a heading + code pair fills the
 * bottom of the page instead of leaving a large empty gap.
 * Later chunks are near full-page height for dense fill.
 */

import { EXPORT_PDF_CODE_BLOCK_ID_ATTR } from '@/utils/exportPdf/applyExportPdfCodeBlockFragmentChrome';
import {
  findHeadingImmediatelyBeforeCode,
  protectHeadingBeforeCodeFence,
} from '@/utils/exportPdf/protectExportPdfHeadingBeforeCode';

export const EXPORT_PDF_CODE_PAGE_CHUNK_CLASS = 'export-pdf-code-page-chunk';
export const EXPORT_PDF_CODE_PAGE_CHUNK_FIRST_CLASS =
  'export-pdf-code-page-chunk-first';
export const EXPORT_PDF_CODE_PAGE_CHUNK_OVERSIZED_CLASS =
  'export-pdf-code-page-chunk-oversized';

const FRAG_CONTINUE_CLASS = 'export-pdf-code-frag-continue';
const FRAG_BREAK_CLASS = 'export-pdf-code-frag-break';

/**
 * Subsequent chunk height as a fraction of the page content box.
 * Near-full so continuation pages fill densely.
 */
export const CODE_PAGE_CHUNK_FILL_RATIO = 0.88;

/**
 * Safety factor applied to measured leftover space (margins / chrome drift).
 * Keep conservative so the first avoid-sized pack never outgrows leftover after
 * a heading (Unable to layout then skips the heading via nodeAfter).
 */
export const CODE_PAGE_REMAINING_SAFETY = 0.85;

/** Extra height reserved for fence padding/border when packing lines. */
const CHUNK_CHROME_PX = 24;

/** Minimum first-chunk budget so at least ~2 short lines can land after a heading. */
const MIN_FIRST_CHUNK_PX = 48;

export type PackLineHeightsOptions = {
  chromePx?: number;
  /** Budget for the first chunk only (defaults to maxHeightPx). */
  firstMaxHeightPx?: number;
};

/**
 * Pack line heights into index groups.
 * First group uses `firstMaxHeightPx` (or maxHeightPx); later groups use maxHeightPx.
 */
export function packLineHeightsIntoChunks(
  heights: readonly number[],
  maxHeightPx: number,
  options: PackLineHeightsOptions = {},
): number[][] {
  const chromePx = Math.max(0, options.chromePx ?? 0);
  const firstBudget = Math.max(
    1,
    (options.firstMaxHeightPx ?? maxHeightPx) - chromePx,
  );
  const laterBudget = Math.max(1, maxHeightPx - chromePx);
  const chunks: number[][] = [];
  let current: number[] = [];
  let used = 0;
  let isFirstChunk = true;

  const budget = () => (isFirstChunk ? firstBudget : laterBudget);

  heights.forEach((rawHeight, index) => {
    const height = Math.max(1, rawHeight);
    if (current.length === 0) {
      current.push(index);
      used = height;
      return;
    }
    if (used + height <= budget()) {
      current.push(index);
      used += height;
      return;
    }
    chunks.push(current);
    isFirstChunk = false;
    current = [index];
    used = height;
  });

  if (current.length) chunks.push(current);
  return chunks;
}

/**
 * How much of the page content box remains after `prefixHeightPx` of flow.
 * When prefix lands exactly on a page boundary, the full page is remaining.
 */
export function remainingHeightOnPage(
  prefixHeightPx: number,
  pageHeightPx: number,
): number {
  const page = Math.max(1, Math.floor(pageHeightPx));
  const prefix = Math.max(0, prefixHeightPx);
  const used = prefix % page;
  if (used < 0.5) return page;
  return Math.max(0, page - used);
}

function createMeasureHost(widthPx: number, measureCss: string): {
  host: HTMLDivElement;
  stage: HTMLDivElement;
} {
  const host = document.createElement('div');
  host.setAttribute('data-export-pdf-measure', '1');
  host.style.cssText = [
    'position:absolute',
    'left:-100000px',
    'top:0',
    `width:${Math.max(1, Math.floor(widthPx))}px`,
    'visibility:hidden',
    'pointer-events:none',
  ].join(';');

  const style = document.createElement('style');
  style.textContent = measureCss;
  host.append(style);

  const stage = document.createElement('div');
  stage.className = 'export-pdf-paged-source';
  host.append(stage);
  return { host, stage };
}

function measureLineHeights(
  lines: HTMLElement[],
  widthPx: number,
  measureCss: string,
): number[] {
  const { host, stage } = createMeasureHost(widthPx, measureCss);
  const code = document.createElement('div');
  code.className = 'md-editor-code export-pdf-code-paged';
  const pre = document.createElement('div');
  pre.className = 'export-pdf-code-pre';
  const body = document.createElement('div');
  body.className = 'export-pdf-code-body export-pdf-code-paged';
  const linesHost = document.createElement('div');
  linesHost.className = 'export-pdf-code-lines';

  const clones = lines.map((line) => {
    const clone = line.cloneNode(true) as HTMLElement;
    linesHost.append(clone);
    return clone;
  });

  body.append(linesHost);
  pre.append(body);
  code.append(pre);
  stage.append(code);
  document.body.append(host);

  const heights = clones.map((clone) => {
    const rect = clone.getBoundingClientRect();
    return Math.max(1, Math.ceil(rect.height));
  });

  host.remove();
  return heights;
}

/**
 * Measure content height in the paged source before `stopEl` (exclusive),
 * after the last `.md-pgbr` before it. Returns 0 when measurement is unavailable.
 */
export function measurePrefixHeightBeforeElement(
  stopEl: HTMLElement,
  widthPx: number,
  measureCss: string,
): number {
  const source = stopEl.closest('.export-pdf-paged-source');
  if (!source || typeof document === 'undefined') return 0;

  const { host, stage } = createMeasureHost(widthPx, measureCss);
  const clone = source.cloneNode(true) as HTMLElement;
  stage.append(clone);
  document.body.append(host);

  try {
    const originals = [
      ...(source as Element).querySelectorAll<HTMLElement>('*'),
    ];
    const clones = [...clone.querySelectorAll<HTMLElement>('*')];
    const index = originals.indexOf(stopEl);
    const target = index >= 0 ? clones[index] ?? null : null;
    if (!target) return 0;

    const breaks = [...clone.querySelectorAll<HTMLElement>('.md-pgbr')];
    let lastBreakBefore: HTMLElement | null = null;
    for (const br of breaks) {
      const pos = br.compareDocumentPosition(target);
      if (pos & Node.DOCUMENT_POSITION_FOLLOWING) {
        lastBreakBefore = br;
      }
    }
    if (lastBreakBefore) {
      const range = document.createRange();
      range.setStart(clone, 0);
      range.setEndBefore(lastBreakBefore);
      range.deleteContents();
      lastBreakBefore.remove();
    }

    const afterRange = document.createRange();
    afterRange.setStartBefore(target);
    afterRange.setEndAfter(clone.lastChild ?? target);
    afterRange.deleteContents();

    return Math.ceil(clone.getBoundingClientRect().height);
  } finally {
    host.remove();
  }
}

function measureElementHeightPx(
  el: HTMLElement,
  widthPx: number,
  measureCss: string,
): number {
  const { host, stage } = createMeasureHost(widthPx, measureCss);
  const clone = el.cloneNode(true) as HTMLElement;
  stage.append(clone);
  document.body.append(host);
  try {
    return Math.max(1, Math.ceil(clone.getBoundingClientRect().height));
  } finally {
    host.remove();
  }
}

/**
 * Measure flow height before `codeRoot` on the current page (after the last
 * forced page break), then return leftover px for the first code chunk.
 */
export function estimateFirstChunkMaxHeightPx(
  codeRoot: HTMLElement,
  pageHeightPx: number,
  widthPx: number,
  measureCss: string,
): number {
  const page = Math.max(1, Math.floor(pageHeightPx));
  const laterCap = Math.max(1, Math.floor(page * CODE_PAGE_CHUNK_FILL_RATIO));
  const prefixHeight = measurePrefixHeightBeforeElement(
    codeRoot,
    widthPx,
    measureCss,
  );
  const remaining = remainingHeightOnPage(prefixHeight, page);
  const withSafety = Math.floor(remaining * CODE_PAGE_REMAINING_SAFETY);
  if (withSafety < MIN_FIRST_CHUNK_PX) {
    return Math.max(1, withSafety);
  }
  return Math.min(laterCap, withSafety);
}

function cloneFenceShell(sourceRoot: HTMLElement): HTMLElement {
  const frag = sourceRoot.cloneNode(false) as HTMLElement;
  frag.classList.add(
    'export-pdf-code-paged',
    EXPORT_PDF_CODE_PAGE_CHUNK_CLASS,
  );
  return frag;
}

function buildChunkFromLines(
  sourceRoot: HTMLElement,
  lineNodes: HTMLElement[],
  options: { oversized: boolean; first: boolean },
): HTMLElement {
  const chunk = cloneFenceShell(sourceRoot);
  if (options.first) {
    // First fragment must be splittable so a preceding heading is not dropped
    // when the packed box is slightly taller than leftover space.
    chunk.classList.add(EXPORT_PDF_CODE_PAGE_CHUNK_FIRST_CLASS);
  }
  if (options.oversized) {
    chunk.classList.add(EXPORT_PDF_CODE_PAGE_CHUNK_OVERSIZED_CLASS);
  }

  const id = sourceRoot.getAttribute(EXPORT_PDF_CODE_BLOCK_ID_ATTR);
  if (id) chunk.setAttribute(EXPORT_PDF_CODE_BLOCK_ID_ATTR, id);

  const pre = document.createElement('div');
  pre.className = 'export-pdf-code-pre';
  const body = document.createElement('div');
  body.className = 'export-pdf-code-body export-pdf-code-paged';
  const linesHost = document.createElement('div');
  linesHost.className = 'export-pdf-code-lines';

  for (const line of lineNodes) {
    linesHost.append(line);
  }

  body.append(linesHost);
  pre.append(body);
  chunk.append(pre);
  return chunk;
}

function applyFragmentClasses(chunks: HTMLElement[]): void {
  const last = chunks.length - 1;
  chunks.forEach((chunk, index) => {
    chunk.classList.remove(FRAG_CONTINUE_CLASS, FRAG_BREAK_CLASS);
    if (index > 0) chunk.classList.add(FRAG_CONTINUE_CLASS);
    if (index < last) chunk.classList.add(FRAG_BREAK_CLASS);
  });
}

/**
 * Split each prepared `.md-editor-code` taller than one page into sibling
 * page chunks. Mutates `root` in place.
 */
export function splitExportPdfCodeBlocksByPageHeight(
  root: ParentNode,
  options: {
    maxHeightPx: number;
    widthPx: number;
    measureCss: string;
  },
): void {
  const pageHeightPx = Math.max(1, Math.floor(options.maxHeightPx));
  const laterChunkPx = Math.max(
    1,
    Math.floor(pageHeightPx * CODE_PAGE_CHUNK_FILL_RATIO),
  );

  const codeRoots = [
    ...root.querySelectorAll<HTMLElement>(
      '.md-editor-code.export-pdf-code-paged',
    ),
  ];

  for (const codeRoot of codeRoots) {
    if (codeRoot.classList.contains(EXPORT_PDF_CODE_PAGE_CHUNK_CLASS)) continue;

    const lines = [
      ...codeRoot.querySelectorAll<HTMLElement>(':scope .export-pdf-code-line'),
    ];
    if (lines.length <= 1) {
      codeRoot.classList.add(EXPORT_PDF_CODE_PAGE_CHUNK_CLASS);
      continue;
    }

    const heights = measureLineHeights(
      lines,
      options.widthPx,
      options.measureCss,
    );

    const laterCap = laterChunkPx;
    let firstChunkPx = estimateFirstChunkMaxHeightPx(
      codeRoot,
      pageHeightPx,
      options.widthPx,
      options.measureCss,
    );

    const heading = findHeadingImmediatelyBeforeCode(codeRoot);
    if (heading) {
      const prefixBeforeHeading = measurePrefixHeightBeforeElement(
        heading,
        options.widthPx,
        options.measureCss,
      );
      const remainingBeforeHeading = remainingHeightOnPage(
        prefixBeforeHeading,
        pageHeightPx,
      );
      const headingHeightPx = measureElementHeightPx(
        heading,
        options.widthPx,
        options.measureCss,
      );
      const { forcedBreakBefore } = protectHeadingBeforeCodeFence(codeRoot, {
        remainingBeforeHeadingPx: remainingBeforeHeading,
        headingHeightPx,
      });
      if (forcedBreakBefore) {
        // Heading+code start on a fresh page — pack first chunk under the heading.
        const afterHeading =
          pageHeightPx - headingHeightPx - CHUNK_CHROME_PX;
        firstChunkPx = Math.max(
          MIN_FIRST_CHUNK_PX,
          Math.min(
            laterCap,
            Math.floor(afterHeading * CODE_PAGE_REMAINING_SAFETY),
          ),
        );
      }
    }

    const groups = packLineHeightsIntoChunks(heights, laterChunkPx, {
      chromePx: CHUNK_CHROME_PX,
      firstMaxHeightPx: firstChunkPx,
    });

    if (groups.length <= 1) {
      const onlyHeight = heights.reduce((sum, h) => sum + h, 0) + CHUNK_CHROME_PX;
      codeRoot.classList.add(EXPORT_PDF_CODE_PAGE_CHUNK_CLASS);
      codeRoot.classList.add(EXPORT_PDF_CODE_PAGE_CHUNK_FIRST_CLASS);
      if (onlyHeight > pageHeightPx) {
        codeRoot.classList.add(EXPORT_PDF_CODE_PAGE_CHUNK_OVERSIZED_CLASS);
      }
      continue;
    }

    const chunks: HTMLElement[] = [];
    groups.forEach((group, groupIndex) => {
      const groupLines = group.map((i) => lines[i]!).filter(Boolean);
      const groupHeight =
        group.reduce((sum, i) => sum + (heights[i] ?? 0), 0) + CHUNK_CHROME_PX;
      const oversized = groupHeight > pageHeightPx;
      chunks.push(
        buildChunkFromLines(codeRoot, groupLines, {
          oversized,
          first: groupIndex === 0,
        }),
      );
    });

    applyFragmentClasses(chunks);

    const parent = codeRoot.parentNode;
    if (!parent) continue;
    for (const chunk of chunks) {
      parent.insertBefore(chunk, codeRoot);
    }
    codeRoot.remove();
  }
}

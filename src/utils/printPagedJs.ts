/**
 * Paged.js preview for Export PDF: CSS @page fragmentation instead of manual packing.
 */

import { buildPrintPageAtRule, getPrintPageInnerSizePx, type PrintPageSizeId } from '@/utils/printPageLayout';
import { renderAllLazyMermaidsInRoot } from '@/utils/lazyMermaid';
import {
  copyPrintMermaidCanvases,
  rasterizeAllPrintMermaidsToCanvas,
} from '@/utils/printMermaidCanvas';
import {
  waitForBrowserLayoutSettle,
  waitForPrintMermaidReady,
} from '@/utils/printStagingReady';
import { debugExportPdf, debugExportPdfError, capturePagedJsWarnings, pagedOutputStats, previewContentStats } from '@/utils/printExportDebug';

export const PRINT_PAGES_HOST_ATTR = 'data-export-pdf-pages';
export const PRINT_BODY_PAGE_ATTR = 'data-print-body-page';

const PAGEDJS_INLINE_SHEET_KEY = 'inline://s3haim-export-pdf';

/** Legacy selector used in ExportPDFPage printFontStyles before scoping. */
export const LEGACY_PRINT_PREVIEW_SELECTOR =
  ':is(#export-pdf-preview, [data-export-pdf-preview])';

/** Flow root passed to Previewer.preview() before pages exist. */
export const PRINT_PAGED_SOURCE_ATTR = 'data-export-pdf-paged-source';

/** Staging, source flow, Paged.js output, and flip-stage clones share print preview chrome. */
export const PRINT_PREVIEW_SELECTOR =
  ':is(#export-pdf-preview, [data-export-pdf-preview], [data-export-pdf-paged-source], .export-pdf-pages .pagedjs_page_content, .export-pdf-preview-stage .pagedjs_page_content, .export-pdf-page-slot-clone .pagedjs_page_content)';

/** Paged.js page slots (content may omit nested .md-editor-preview). */
export const PRINT_PAGED_CONTENT_SELECTOR =
  ':is(.export-pdf-pages .pagedjs_page_content, .export-pdf-preview-stage .pagedjs_page_content, .export-pdf-page-slot-clone .pagedjs_page_content)';

/** Pre-pagination measure root — must match layout rules before page breaks. */
export const PRINT_PAGED_SOURCE_SELECTOR = '[data-export-pdf-paged-source]';

/** Flat selectors for break-* rules (Paged.js splits selector lists on commas). */
function printFragmentationSelectors(suffix: string): string {
  return [
    `.md-editor-preview${suffix}`,
    `${PRINT_PAGED_SOURCE_SELECTOR}${suffix}`,
    '.pagedjs_page_content' + suffix,
  ].join(',\n    ');
}

export function scopeExportPdfPreviewStyles(css: string): string {
  return css.split(LEGACY_PRINT_PREVIEW_SELECTOR).join(PRINT_PREVIEW_SELECTOR);
}

/**
 * Light-theme `--md-theme-*` vars normally live on `.md-editor .md-editor-preview`.
 * Paged.js page slots omit the `.md-editor` shell — inject vars on print preview roots.
 */
export function buildPrintPreviewThemeVarsCss(): string {
  return `
    #export-pdf-preview,
    [data-export-pdf-preview],
    [data-export-pdf-paged-source],
    .export-pdf-pages .pagedjs_page_content,
    .export-pdf-preview-stage .pagedjs_page_content,
    .export-pdf-page-slot-clone .pagedjs_page_content {
      color-scheme: light;
      --md-theme-color: #111827;
      --md-theme-color-reverse: #e5e7eb;
      --md-theme-color-hover: #e5e7eb;
      --md-theme-color-hover-inset: #d1d5db;
      --md-theme-link-color: #6366f1;
      --md-theme-link-hover-color: #22c55e;
      --md-theme-border-color: #e5e7eb;
      --md-theme-border-color-reverse: #9ca3af;
      --md-theme-border-color-inset: #d1d5db;
      --md-theme-bg-color: #ffffff;
      --md-theme-bg-color-inset: #f3f4f6;
      --md-theme-code-copy-tips-color: inherit;
      --md-theme-code-copy-tips-bg-color: #ffffff;
      --md-theme-code-active-color: #0ea5e9;
      --md-theme-radius-s: var(--radius-sm, 0.25rem);
      --md-theme-radius-m: calc(var(--spacing, 4px) * 1.25);
      --md-theme-code-inline-color: #eb5757;
      --md-theme-code-inline-bg-color: rgba(135, 131, 120, 0.15);
      --md-theme-code-inline-radius: var(--md-theme-radius-s);
      --md-theme-code-block-color: #cbd5e1;
      --md-theme-code-block-bg-color: #1f2937;
      --md-theme-code-before-bg-color: var(--md-theme-code-block-bg-color);
      --md-theme-code-block-radius: var(--md-theme-radius-m);
      --md-theme-heading-color: var(--md-theme-color);
      --md-theme-heading-border: none;
      --md-theme-heading-1-color: var(--md-theme-heading-color);
      --md-theme-heading-1-border: var(--md-theme-heading-border);
      --md-theme-heading-2-color: var(--md-theme-heading-color);
      --md-theme-heading-2-border: var(--md-theme-heading-border);
      --md-theme-heading-3-color: var(--md-theme-heading-color);
      --md-theme-heading-3-border: var(--md-theme-heading-border);
      --md-theme-heading-4-color: var(--md-theme-heading-color);
      --md-theme-heading-4-border: var(--md-theme-heading-border);
      --md-theme-heading-5-color: var(--md-theme-heading-color);
      --md-theme-heading-5-border: var(--md-theme-heading-border);
      --md-theme-heading-6-color: var(--md-theme-heading-color);
      --md-theme-heading-6-border: var(--md-theme-heading-border);
      --md-theme-table-stripe-color: #f9fafb;
      --md-theme-table-tr-bg-color: #ffffff;
      --md-theme-table-td-border-color: #e5e7eb;
      --md-theme-table-td-border-color-horizontal: #cbd5e1;
      --md-theme-table-border-color: #e5e7eb;
      --md-theme-table-thead-bg-color: #f3f4f6;
      --md-theme-table-th-color: #f3f4f6;
      --md-theme-table-tht-color: #1e3a8a;
      --md-theme-table-tr-nc-color: #f8fafc;
      --md-theme-table-trh-color: #f3f4f6;
      --md-theme-table-color: #111827;
    }
  `;
}

export function getPrintPreviewRoot(stagingRoot: HTMLElement): HTMLElement {
  if (stagingRoot.classList.contains('md-editor-preview')) return stagingRoot;
  return (
    stagingRoot.querySelector<HTMLElement>('.md-editor-preview')
    ?? stagingRoot.querySelector<HTMLElement>('[id$="-preview"]')
    ?? stagingRoot
  );
}

let printMermaidIdSeq = 0;

/** Remap Mermaid SVG ids so cloned diagrams keep theme fills. */
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

export const PRINT_PAGING_ACTIVE_ATTR = 'data-export-pdf-paging';

/** Serialize Paged.js renders — overlapping preview() calls break page layout (null offsetParent). */
let pagedJsPreviewChain: Promise<unknown> = Promise.resolve();

function withPagedJsPreviewLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = pagedJsPreviewChain.then(fn, fn);
  pagedJsPreviewChain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

function setPrintPagingActive(pagesHost: HTMLElement, active: boolean): void {
  const coverStack = pagesHost.closest('.export-pdf-cover-stack');
  if (active) {
    pagesHost.setAttribute(PRINT_PAGING_ACTIVE_ATTR, '1');
    coverStack?.setAttribute(PRINT_PAGING_ACTIVE_ATTR, '1');
    return;
  }
  pagesHost.removeAttribute(PRINT_PAGING_ACTIVE_ATTR);
  coverStack?.removeAttribute(PRINT_PAGING_ACTIVE_ATTR);
}
/** Layout rules that must apply to the source flow before Previewer.preview() measures pages. */
export function buildPrePagedSourceLayoutCss(pageSizeId: PrintPageSizeId): string {
  return `
    .export-pdf-cover-stack[${PRINT_PAGING_ACTIVE_ATTR}="1"],
    [data-export-pdf-pages][${PRINT_PAGING_ACTIVE_ATTR}="1"] {
      visibility: hidden !important;
      opacity: 1 !important;
      pointer-events: none !important;
      position: relative !important;
      width: 100% !important;
      height: auto !important;
      overflow: visible !important;
    }

    ${buildPrintPreviewThemeVarsCss()}
    ${buildPrintPageAtRule(pageSizeId)}

    ${PRINT_PAGED_SOURCE_SELECTOR},
    ${PRINT_PAGED_SOURCE_SELECTOR}.md-editor-preview {
      background: #ffffff;
      color: #111827;
    }

    img[data-print-mermaid-img],
    ${PRINT_PAGED_SOURCE_SELECTOR} img[data-print-mermaid-img],
    ${PRINT_PAGED_SOURCE_SELECTOR} .md-editor-mermaid[data-print-mermaid-canvas="1"] {
      display: block !important;
      position: static !important;
      line-height: 0 !important;
      overflow: hidden;
      break-inside: avoid;
      page-break-inside: avoid;
      max-width: 100% !important;
      box-sizing: content-box;
    }

    ${printFragmentationSelectors(' .md-pgbr')} {
      border: none !important;
      background: transparent !important;
      box-shadow: none !important;
      width: 100% !important;
      height: 1px !important;
      max-height: 1px !important;
      min-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      break-after: page !important;
      page-break-after: always !important;
      break-inside: avoid !important;
      page-break-inside: avoid !important;
      display: block !important;
    }

    ${printFragmentationSelectors(' table')} {
      break-inside: auto;
      page-break-inside: auto;
      max-width: 100%;
    }

    ${printFragmentationSelectors(' table thead')} {
      display: table-header-group;
    }

    ${printFragmentationSelectors(' table tfoot')} {
      display: table-footer-group;
    }

    ${printFragmentationSelectors(' table tr')} {
      break-inside: avoid;
      page-break-inside: avoid;
    }

    ${printFragmentationSelectors(' .md-editor-code')} {
      break-inside: auto;
      page-break-inside: auto;
      border: 1px solid #3e4452;
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
    }

    .md-editor-preview .md-editor-code[data-page-break-avoid="1"],
    [data-export-pdf-paged-source] .md-editor-code[data-page-break-avoid="1"],
    .pagedjs_page_content .md-editor-code[data-page-break-avoid="1"],
    .md-editor-preview table[data-page-break-avoid="1"],
    [data-export-pdf-paged-source] table[data-page-break-avoid="1"],
    .pagedjs_page_content table[data-page-break-avoid="1"] {
      break-inside: avoid;
      page-break-inside: avoid;
    }

    ${printFragmentationSelectors(' .md-editor-code .md-editor-code-head')} {
      display: none !important;
    }
  `;
}

/** Inject print preview CSS on the measure root before layout / page breaks. */
export function buildPrePagedLayoutCss(
  pageSizeId: PrintPageSizeId,
  contentStyles: string,
): string {
  return `${scopeExportPdfPreviewStyles(contentStyles)}\n${buildPrePagedSourceLayoutCss(pageSizeId)}`;
}

export function preparePrintPreviewSourceForPaging(content: HTMLElement): void {
  content.setAttribute(PRINT_PAGED_SOURCE_ATTR, '1');
  content.setAttribute('data-export-pdf-preview', '1');
  if (!content.classList.contains('md-editor-preview')) {
    content.classList.add('md-editor-preview');
  }
}

export function injectPrintPreviewStylesForPaging(
  anchor: ParentNode,
  pageSizeId: PrintPageSizeId,
  contentStyles: string,
): HTMLStyleElement {
  const style = document.createElement('style');
  style.setAttribute('data-export-pdf-paged-source-styles', '1');
  style.textContent = buildPrePagedLayoutCss(pageSizeId, contentStyles);
  anchor.insertBefore(style, anchor.firstChild);
  return style;
}

/** Paged.js output chrome (after pages exist). Source layout lives in buildPrePagedSourceLayoutCss. */
export function buildPagedJsFragmentationCss(_pageSizeId: PrintPageSizeId): string {
  return `
    .export-pdf-pages {
      --pagedjs-width: var(--print-page-width);
      --pagedjs-height: var(--print-page-height);
      --pagedjs-pagebox-width: var(--print-page-width);
      --pagedjs-pagebox-height: var(--print-page-height);
      --pagedjs-width-right: var(--print-page-width);
      --pagedjs-height-right: var(--print-page-height);
      --pagedjs-width-left: var(--print-page-width);
      --pagedjs-height-left: var(--print-page-height);
      --pagedjs-margin-top: var(--print-page-margin);
      --pagedjs-margin-right: var(--print-page-margin);
      --pagedjs-margin-bottom: var(--print-page-margin);
      --pagedjs-margin-left: var(--print-page-margin);
    }

    .export-pdf-pages .pagedjs_page_content,
    .export-pdf-pages .pagedjs_page_content * {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* Paged.js sets height:inherit on the flow wrapper — do not stretch diagrams to the sheet. */
    .pagedjs_page_content > div {
      height: auto !important;
      min-height: 0 !important;
    }

    img[data-print-mermaid-img],
    .pagedjs_page_content img[data-print-mermaid-img],
    .md-editor-mermaid[data-print-mermaid-canvas="1"],
    .pagedjs_page_content .md-editor-mermaid[data-print-mermaid-canvas="1"] {
      display: block !important;
      position: static !important;
      line-height: 0 !important;
      overflow: hidden;
      break-inside: avoid;
      page-break-inside: avoid;
      max-width: 100% !important;
      box-sizing: content-box;
    }

    .md-editor-mermaid[data-print-mermaid-canvas-state="loading"] {
      min-height: 48px;
      background: #f3f4f6;
    }

    .md-editor-mermaid[data-print-mermaid-canvas-state="error"] .print-mermaid-canvas-error {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 12px;
      color: #b91c1c;
      background: #fef2f2;
      border: 1px dashed #fca5a5;
      box-sizing: border-box;
    }

    .md-editor-mermaid[data-print-mermaid-canvas="1"] canvas,
    .pagedjs_page_content .md-editor-mermaid[data-print-mermaid-canvas="1"] canvas {
      display: block !important;
      max-width: 100% !important;
      vertical-align: top;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    ${PRINT_PREVIEW_SELECTOR},
    ${PRINT_PREVIEW_SELECTOR} .md-editor-preview {
      background: #ffffff;
      color: #111827;
    }

    ${printFragmentationSelectors(' .md-pgbr')} {
      border: none !important;
      background: transparent !important;
      box-shadow: none !important;
      width: 100% !important;
      height: 1px !important;
      max-height: 1px !important;
      min-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      break-after: page !important;
      page-break-after: always !important;
      break-inside: avoid !important;
      page-break-inside: avoid !important;
      display: block !important;
    }

    ${printFragmentationSelectors(' table')} {
      break-inside: auto;
      page-break-inside: auto;
      max-width: 100%;
    }

    ${printFragmentationSelectors(' table thead')} {
      display: table-header-group;
    }

    ${printFragmentationSelectors(' table tfoot')} {
      display: table-footer-group;
    }

    ${printFragmentationSelectors(' table tr')} {
      break-inside: avoid;
      page-break-inside: avoid;
    }

    ${printFragmentationSelectors(' .md-editor-code')} {
      break-inside: auto;
      page-break-inside: auto;
      border: 1px solid #3e4452;
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
    }

    .md-editor-preview .md-editor-code[data-page-break-avoid="1"],
    [data-export-pdf-paged-source] .md-editor-code[data-page-break-avoid="1"],
    .pagedjs_page_content .md-editor-code[data-page-break-avoid="1"],
    .md-editor-preview table[data-page-break-avoid="1"],
    [data-export-pdf-paged-source] table[data-page-break-avoid="1"],
    .pagedjs_page_content table[data-page-break-avoid="1"] {
      break-inside: avoid;
      page-break-inside: avoid;
    }

    ${printFragmentationSelectors(' .md-editor-code .md-editor-code-head')} {
      display: none !important;
    }

    .export-pdf-pages .pagedjs_bleed,
    .export-pdf-pages .pagedjs_marks-crop,
    .export-pdf-pages .pagedjs_marks-cross,
    .export-pdf-pages .pagedjs_marks-middle {
      display: none !important;
    }
  `;
}

export function buildPagedJsStylesheet(
  pageSizeId: PrintPageSizeId,
  contentStyles: string,
): Record<string, string> {
  return {
    [PAGEDJS_INLINE_SHEET_KEY]: `${buildPrePagedLayoutCss(pageSizeId, contentStyles)}\n${buildPagedJsFragmentationCss(pageSizeId)}`,
  };
}

export function stampPagedJsBodyPages(pagesHost: HTMLElement): void {
  const pagesRoot = pagesHost.querySelector('.pagedjs_pages');
  if (pagesRoot instanceof HTMLElement) {
    pagesRoot.setAttribute('data-export-pdf-preview', '1');
  }
  const pages = pagesHost.querySelectorAll('.pagedjs_page');
  pages.forEach((page, index) => {
    if (page instanceof HTMLElement) {
      page.setAttribute(PRINT_BODY_PAGE_ATTR, String(index));
    }
  });
  // Paged.js fragments often drop the `.md-editor-preview` wrapper — restore so global preview.css applies.
  for (const slot of pagesHost.querySelectorAll('.pagedjs_page_content')) {
    if (slot instanceof HTMLElement) {
      slot.classList.add('md-editor-preview');
    }
  }
}

/** Prefer heading ids on visible paged output for TOC / scroll targets. */
export function transferHeadingIdsToPagedPages(
  stagingRoot: HTMLElement,
  pagesHost: HTMLElement,
): void {
  const packedIds = new Set<string>();
  for (const el of pagesHost.querySelectorAll<HTMLElement>('[id]')) {
    if (el.id) packedIds.add(el.id);
  }
  for (const el of stagingRoot.querySelectorAll<HTMLElement>('[id]')) {
    if (packedIds.has(el.id)) el.removeAttribute('id');
  }
}

/** Mount cloned preview flow as a direct child of pagesHost (live DOM — not innerHTML). */
export function mountPrintFlowInPagesHost(
  pagesHost: HTMLElement,
  stagingRoot: HTMLElement,
): HTMLElement {
  const flowRoot = clonePrintPreviewForPagedJs(stagingRoot);
  preparePrintPreviewSourceForPaging(flowRoot);
  pagesHost.appendChild(flowRoot);
  return flowRoot;
}

/** Remove source flow after Paged.js; keep `.pagedjs_pages` output. */
export function detachPrintFlowFromPagesHost(pagesHost: HTMLElement): void {
  for (const el of pagesHost.querySelectorAll(`[${PRINT_PAGED_SOURCE_ATTR}]`)) {
    el.remove();
  }
}

/** Flat clone for Paged.js — block children under one .md-editor-preview flow root (no nested shell). */
export function clonePrintPreviewForPagedJs(stagingRoot: HTMLElement): HTMLElement {
  const preview = getPrintPreviewRoot(stagingRoot);
  const root = document.createElement('div');
  root.setAttribute('data-export-pdf-preview', '1');
  root.className = preview.className;
  if (preview.id) root.id = preview.id;

  const clone = preview.cloneNode(true) as HTMLElement;
  while (clone.firstChild) {
    root.appendChild(clone.firstChild);
  }
  return root;
}

function resolvePrintMermaidMaxWidth(
  pageSizeId: PrintPageSizeId,
  imageMaxProbe: HTMLElement | null | undefined,
): number {
  const innerW = getPrintPageInnerSizePx(pageSizeId).widthPx;
  if (!imageMaxProbe) return innerW;
  const probeW = imageMaxProbe.getBoundingClientRect().width;
  if (probeW < 1) return innerW;
  return Math.min(innerW, Math.round(probeW));
}

export async function renderPagedJsPreview(options: {
  stagingRoot: HTMLElement;
  pagesHost: HTMLElement;
  pageSizeId: PrintPageSizeId;
  contentStyles: string;
  imageMaxProbe?: HTMLElement | null;
}): Promise<{ pageCount: number }> {
  return withPagedJsPreviewLock(async () => {
  const { stagingRoot, pagesHost, pageSizeId, contentStyles, imageMaxProbe } = options;
  const t0 = performance.now();
  debugExportPdf('pagedjs', 'render start', { pageSizeId });

  const { Previewer } = await import('pagedjs');

  pagesHost.replaceChildren();
  setPrintPagingActive(pagesHost, true);

  const maxWidth = resolvePrintMermaidMaxWidth(pageSizeId, imageMaxProbe);
  const maxHeight = getPrintPageInnerSizePx(pageSizeId).heightPx;

  const flowRoot = mountPrintFlowInPagesHost(pagesHost, stagingRoot);
  const clonePreview = getPrintPreviewRoot(pagesHost) ?? flowRoot;

  debugExportPdf('pagedjs', 'mermaid max box', {
    maxWidth,
    maxHeight,
    probeW: imageMaxProbe?.getBoundingClientRect().width,
    pagesHostW: Math.round(pagesHost.getBoundingClientRect().width),
  });

  const stagingPreview = getPrintPreviewRoot(stagingRoot);
  const stagingMermaidCount = stagingPreview?.querySelectorAll('.md-editor-mermaid').length ?? 0;
  const stagingSvgCount = stagingPreview?.querySelectorAll('.md-editor-mermaid svg').length ?? 0;
  debugExportPdf('pagedjs', 'staging before clone', {
    stagingMermaidCount,
    stagingSvgCount,
    staging: previewContentStats(stagingPreview),
  });

  const cloneMermaidBefore = clonePreview?.querySelectorAll('.md-editor-mermaid').length ?? 0;
  const cloneSvgBefore = clonePreview?.querySelectorAll('.md-editor-mermaid svg').length ?? 0;
  debugExportPdf('pagedjs', 'flow mounted in pagesHost', {
    cloneMermaidBefore,
    cloneSvgBefore,
    clone: previewContentStats(clonePreview),
    flowConnected: flowRoot.isConnected,
    pagesHostConnected: pagesHost.isConnected,
  });

  const prePagedStyle = injectPrintPreviewStylesForPaging(pagesHost, pageSizeId, contentStyles);
  pagesHost.style.width = `${Math.max(1, Math.round(maxWidth))}px`;
  // Force stylesheet parse before measure / rasterize / page breaks.
  void pagesHost.offsetHeight;

  try {
    if (clonePreview) {
      await renderAllLazyMermaidsInRoot(clonePreview);
      const svgReady = await waitForPrintMermaidReady(clonePreview, 'svg');
      debugExportPdf('pagedjs', 'clone mermaid svg ready', { svgReady });
      rewriteMermaidIdsInClone(clonePreview);
      debugExportPdf('pagedjs', 'mermaid ids remapped on clone');
    }

    if (clonePreview) {
      await rasterizeAllPrintMermaidsToCanvas(clonePreview, maxWidth, maxHeight);
      void pagesHost.offsetHeight;
      const imgReady = await waitForPrintMermaidReady(clonePreview, 'print-img');
      await waitForBrowserLayoutSettle();
      const states = [
        ...clonePreview.querySelectorAll('img[data-print-mermaid-img], .md-editor-mermaid'),
      ].map((el, i) => ({
        i,
        tag: el.tagName,
        state: el.getAttribute('data-print-mermaid-canvas-state'),
        hasImg: el.matches('img[data-print-mermaid-img]'),
        hasSvg: Boolean(el.querySelector('svg')),
        h: Math.round((el as HTMLElement).getBoundingClientRect().height),
      }));
      debugExportPdf('pagedjs', 'after rasterize + layout settle', {
        imgReady,
        states,
        clone: previewContentStats(clonePreview),
      });
    } else {
      debugExportPdf('pagedjs', 'no clone preview — skip rasterize');
      await waitForBrowserLayoutSettle();
    }

    const stylesheet = buildPagedJsStylesheet(pageSizeId, contentStyles);
    const previewer = new Previewer();
    debugExportPdf('pagedjs', 'Previewer.preview() start', {
      flowChildCount: flowRoot.childElementCount,
      pagesHostChildCount: pagesHost.childElementCount,
      flowConnected: flowRoot.isConnected,
      pagesHostConnected: pagesHost.isConnected,
    });

    let flow;
    try {
      // Pass live pagesHost DOM for both source + render target (never innerHTML string).
      flow = await capturePagedJsWarnings(() => previewer.preview(pagesHost, [stylesheet], pagesHost));
    } catch (err) {
      debugExportPdfError('pagedjs', 'Previewer.preview() threw', err, {
        elapsedMs: Math.round(performance.now() - t0),
      });
      throw err;
    }

    const pageCount = Math.max(1, flow.total);

    // Paged.js cloneNode() page fragments often drop/break sized SVG; re-copy from prepared source.
    if (clonePreview) {
      copyPrintMermaidCanvases(clonePreview, pagesHost);
      debugExportPdf('pagedjs', 'mermaid synced source→pages', pagedOutputStats(pagesHost));
    }

    debugExportPdf('pagedjs', 'Previewer.preview() done', {
      pageCount,
      elapsedMs: Math.round(performance.now() - t0),
      pagesInHost: pagesHost.querySelectorAll('.pagedjs_page').length,
      mermaidInOutput: pagesHost.querySelectorAll('img[data-print-mermaid-img], .md-editor-mermaid').length,
      ...pagedOutputStats(pagesHost),
    });

    stampPagedJsBodyPages(pagesHost);
    transferHeadingIdsToPagedPages(stagingRoot, pagesHost);

    return { pageCount };
  } finally {
    detachPrintFlowFromPagesHost(pagesHost);
    pagesHost.style.width = '';
    prePagedStyle.remove();
    setPrintPagingActive(pagesHost, false);
    debugExportPdf('pagedjs', 'flow detached from pagesHost', {
      pagesHostConnected: pagesHost.isConnected,
      pagesRemaining: pagesHost.querySelectorAll('.pagedjs_page').length,
    });
  }
  });
}

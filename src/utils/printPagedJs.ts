/**
 * Paged.js preview for Export PDF: CSS @page fragmentation instead of manual packing.
 */

import { buildPrintPageAtRule, getPrintPageInnerSizePx, type PrintPageSizeId } from '@/utils/printPageLayout';
import {
  copyPrintMermaidCanvases,
  rasterizeAllPrintMermaidsToCanvas,
} from '@/utils/printMermaidCanvas';

export const PRINT_PAGES_HOST_ATTR = 'data-export-pdf-pages';
export const PRINT_BODY_PAGE_ATTR = 'data-print-body-page';

const PAGEDJS_INLINE_SHEET_KEY = 'inline://s3haim-export-pdf';

/** Legacy selector used in ExportPDFPage printFontStyles before scoping. */
export const LEGACY_PRINT_PREVIEW_SELECTOR =
  ':is(#export-pdf-preview, [data-export-pdf-preview])';

/** Staging, Paged.js output, and flip-stage clones share the same print preview chrome. */
export const PRINT_PREVIEW_SELECTOR =
  ':is(#export-pdf-preview, [data-export-pdf-preview], .export-pdf-pages .pagedjs_page_content, .export-pdf-preview-stage .pagedjs_page_content, .export-pdf-page-slot-clone .pagedjs_page_content)';

export function scopeExportPdfPreviewStyles(css: string): string {
  return css.split(LEGACY_PRINT_PREVIEW_SELECTOR).join(PRINT_PREVIEW_SELECTOR);
}

export function getPrintPreviewRoot(stagingRoot: HTMLElement): HTMLElement {
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

/** Paged.js fragmentation + preview chrome (screen + print). */
export function buildPagedJsFragmentationCss(pageSizeId: PrintPageSizeId): string {
  return `
    ${buildPrintPageAtRule(pageSizeId)}

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

    .md-editor-mermaid[data-print-mermaid-canvas="1"],
    .pagedjs_page_content .md-editor-mermaid[data-print-mermaid-canvas="1"] {
      display: block !important;
      line-height: 0 !important;
      overflow: hidden;
      break-inside: avoid;
      page-break-inside: avoid;
      max-width: 100% !important;
      width: auto !important;
      height: auto !important;
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

    .md-editor-preview .md-pgbr,
    .pagedjs_page_content .md-pgbr {
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

    .md-editor-preview table,
    .pagedjs_page_content table {
      break-inside: auto;
      page-break-inside: auto;
      max-width: 100%;
    }

    .md-editor-preview table thead,
    .pagedjs_page_content table thead {
      display: table-header-group;
    }

    .md-editor-preview table tfoot,
    .pagedjs_page_content table tfoot {
      display: table-footer-group;
    }

    .md-editor-preview table tr,
    .pagedjs_page_content table tr {
      break-inside: avoid;
      page-break-inside: avoid;
    }

    .md-editor-preview .md-editor-code,
    .pagedjs_page_content .md-editor-code {
      break-inside: auto;
      page-break-inside: auto;
      border: 1px solid #3e4452;
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
    }

    .md-editor-preview .md-editor-code[data-page-break-avoid="1"],
    .pagedjs_page_content .md-editor-code[data-page-break-avoid="1"],
    .md-editor-preview table[data-page-break-avoid="1"],
    .pagedjs_page_content table[data-page-break-avoid="1"] {
      break-inside: avoid;
      page-break-inside: avoid;
    }

    .md-editor-preview .md-editor-code .md-editor-code-head,
    .pagedjs_page_content .md-editor-code .md-editor-code-head {
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
    [PAGEDJS_INLINE_SHEET_KEY]: `${scopeExportPdfPreviewStyles(contentStyles)}\n${buildPagedJsFragmentationCss(pageSizeId)}`,
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

export function clonePrintPreviewForPagedJs(stagingRoot: HTMLElement): HTMLElement {
  const preview = getPrintPreviewRoot(stagingRoot);
  const shell = document.createElement('div');
  shell.className = preview.className;
  shell.setAttribute('data-export-pdf-preview', '1');
  const clone = preview.cloneNode(true) as HTMLElement;
  shell.appendChild(clone);
  return shell;
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
  const { stagingRoot, pagesHost, pageSizeId, contentStyles, imageMaxProbe } = options;
  const { Previewer } = await import('pagedjs');

  pagesHost.replaceChildren();

  const stagingPreview = getPrintPreviewRoot(stagingRoot);
  if (!stagingPreview) {
    return { pageCount: 1 };
  }

  rewriteMermaidIdsInClone(stagingPreview);

  const maxWidth = resolvePrintMermaidMaxWidth(pageSizeId, imageMaxProbe);
  const maxHeight = getPrintPageInnerSizePx(pageSizeId).heightPx;

  await rasterizeAllPrintMermaidsToCanvas(stagingPreview, maxWidth, maxHeight);

  const content = clonePrintPreviewForPagedJs(stagingRoot);
  const clonePreview = getPrintPreviewRoot(content);
  if (clonePreview) {
    copyPrintMermaidCanvases(stagingPreview, clonePreview);
  }

  const stylesheet = buildPagedJsStylesheet(pageSizeId, contentStyles);
  const previewer = new Previewer();
  const flow = await previewer.preview(content, [stylesheet], pagesHost);

  stampPagedJsBodyPages(pagesHost);
  transferHeadingIdsToPagedPages(stagingRoot, pagesHost);

  return { pageCount: Math.max(1, flow.total) };
}

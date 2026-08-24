import { buildPrintPageAtRule, type PrintPageSizeId } from '@/utils/printPageLayout';

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

export const PRINT_PAGEDJS_WRAPPER_CLASS = 'pagedjs-wrapper';

export const PRINT_PAGING_ACTIVE_ATTR = 'data-export-pdf-paging';

/** Flat selectors for break-* rules (Paged.js splits selector lists on commas). */
function printFragmentationSelectors(suffix: string): string {
  return [
    `.md-editor-preview${suffix}`,
    `${PRINT_PAGED_SOURCE_SELECTOR}${suffix}`,
    `.${PRINT_PAGEDJS_WRAPPER_CLASS}${suffix}`,
    '.pagedjs_page_content' + suffix,
  ].join(',\n    ');
}

/** Break protection so Chunker does not split Mermaid / tables / code / hr mid-block. */
function buildPagedJsBreakProtectionCss(): string {
  return `
    ${printFragmentationSelectors(' .md-editor-mermaid')},
    ${printFragmentationSelectors(' .md-editor-mermaid svg')},
    ${printFragmentationSelectors(' svg')},
    ${printFragmentationSelectors(' img[data-print-mermaid-img]')} {
      break-inside: avoid !important;
      page-break-inside: avoid !important;
    }

    ${printFragmentationSelectors(' table')},
    ${printFragmentationSelectors(' blockquote')} {
      break-inside: avoid !important;
      page-break-inside: avoid !important;
    }

    ${printFragmentationSelectors(' pre')},
    ${printFragmentationSelectors(' .md-editor-code')} {
      break-inside: auto !important;
      page-break-inside: auto !important;
    }

    ${printFragmentationSelectors(' h1')},
    ${printFragmentationSelectors(' h2')},
    ${printFragmentationSelectors(' h3')},
    ${printFragmentationSelectors(' h4')},
    ${printFragmentationSelectors(' h5')},
    ${printFragmentationSelectors(' h6')} {
      break-after: avoid !important;
      page-break-after: avoid !important;
    }
  `;
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

/** Layout rules that must apply to the source flow before Previewer.preview() measures pages. */
export function buildPrePagedSourceLayoutCss(pageSizeId: PrintPageSizeId): string {
  return `
    .export-pdf-cover-stack[${PRINT_PAGING_ACTIVE_ATTR}="1"],
    [data-export-pdf-pages][${PRINT_PAGING_ACTIVE_ATTR}="1"] {
      visibility: visible !important;
      opacity: 0 !important;
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
      break-inside: avoid !important;
      page-break-inside: avoid !important;
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
      break-inside: avoid !important;
      page-break-inside: avoid !important;
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

    ${buildPagedJsBreakProtectionCss()}
  `;
}

/** Inject print preview CSS on the measure root before layout / page breaks. */
export function buildPrePagedLayoutCss(
  pageSizeId: PrintPageSizeId,
  contentStyles: string,
): string {
  return `${scopeExportPdfPreviewStyles(contentStyles)}\n${buildPrePagedSourceLayoutCss(pageSizeId)}`;
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
      break-inside: avoid !important;
      page-break-inside: avoid !important;
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
      break-inside: avoid !important;
      page-break-inside: avoid !important;
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

    ${buildPagedJsBreakProtectionCss()}

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

export function setPrintPagingActive(pagesHost: HTMLElement, active: boolean): void {
  const coverStack = pagesHost.closest('.export-pdf-cover-stack');
  if (active) {
    pagesHost.setAttribute(PRINT_PAGING_ACTIVE_ATTR, '1');
    coverStack?.setAttribute(PRINT_PAGING_ACTIVE_ATTR, '1');
    return;
  }
  pagesHost.removeAttribute(PRINT_PAGING_ACTIVE_ATTR);
  coverStack?.removeAttribute(PRINT_PAGING_ACTIVE_ATTR);
}

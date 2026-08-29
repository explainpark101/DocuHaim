export const EDITOR_ID = 'export-pdf-preview';
export const PRINT_TOC_WIDTH_KEY = 's3haim_print_toc_width';
export const PRINT_TOC_DEFAULT_WIDTH = 360;

export function headingId({ index }: { index: number }): string {
  return `pdf-ex-heading-${index}`;
}

/** TOC stays active until the next heading crosses this viewport ratio from the top. */
export const TOC_ACTIVE_SCAN_RATIO = 2 / 3;

export function getActiveHeadingId(
  headingEls: Array<HTMLElement | null | undefined>,
): string | null {
  const scanY = window.innerHeight * TOC_ACTIVE_SCAN_RATIO;
  let activeId: string | null = null;
  for (const el of headingEls) {
    if (!el?.id) continue;
    if (el.getBoundingClientRect().top <= scanY) {
      activeId = el.id;
    }
  }
  return activeId;
}

export const printFontStyles = `
  :is(#export-pdf-preview, [data-export-pdf-preview]),
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview {
    background: #ffffff;
    color: #111827;
    font-family: var(--print-font-body, var(--font-sans-builtin));
    color-scheme: light;
    font-size: var(--print-font-size, 16px);
    line-height: var(--print-line-height-body, 1.7);
    /* Force light table chrome even when html/app is .dark (preview.css). */
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
    --md-theme-border-color: #e5e7eb;
    --md-theme-bg-color: #ffffff;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview [class$="-theme"] {
    color-scheme: light;
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
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table tr,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table tr th,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table tr td {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table {
    max-width: 100%;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table tr {
    background-color: #ffffff !important;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table thead,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table thead tr,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table tr th {
    background-color: #f3f4f6 !important;
    color: #111827 !important;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table tr th,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview table tr td {
    border-color: #e5e7eb !important;
    color: #111827;
    word-break: break-word;
    overflow-wrap: anywhere;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h1,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h2,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h3,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h4,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h5,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h6 {
    font-family: var(--print-font-heading, var(--font-display-builtin));
    line-height: var(--print-line-height-heading, 1.35);
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview b,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview strong {
    font-family: var(--print-font-bold, var(--font-sans-builtin));
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview code,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview pre,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview .md-editor-code pre,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview .md-editor-code pre code {
    font-family: var(--print-font-code, var(--font-mono-builtin));
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview .md-editor-code {
    --md-theme-code-block-color: #383a42;
    --md-theme-code-block-bg-color: #fafafa;
    --md-theme-code-before-bg-color: #f0f0f0;
    margin: 1.25em 0;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: visible;
    box-shadow: none;
    background-color: #fafafa;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview .md-editor-code .md-editor-code-head {
    display: none !important;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview .md-editor-code pre {
    margin: 0;
    background-color: #fafafa;
    overflow: visible;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview .md-editor-code pre code {
    background-color: #fafafa;
    color: #383a42;
    border: none;
    border-radius: 0;
    padding: 1em 1.2em;
    line-height: 1.6;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview .md-editor-code pre code .md-editor-code-block {
    color: unset;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview :not(pre) > code {
    background-color: rgba(135, 131, 120, 0.15);
    color: #eb5757;
    border: none;
    border-radius: 4px;
    padding: 0.2em 0.4em;
    font-size: 0.92em;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview figure {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 0 0 1em;
  }
  /* Only processed hosts — flex on placeholders breaks lazy Mermaid source (white-space:pre). */
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-mermaid[data-processed],
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview .md-editor-mermaid[data-processed] {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-inline: auto;
    width: 100%;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-mermaid[data-processed] svg,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview .md-editor-mermaid[data-processed] svg {
    margin-inline: auto;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-mermaid[data-print-free-transform],
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-mermaid[data-mermaid-sized],
  [data-export-pdf-pages] .md-editor-mermaid[data-print-free-transform],
  [data-export-pdf-pages] .md-editor-mermaid[data-mermaid-sized],
  .export-pdf-preview-stage .md-editor-mermaid[data-print-free-transform],
  .export-pdf-preview-stage .md-editor-mermaid[data-mermaid-sized] {
    box-sizing: border-box;
    overflow: hidden;
    width: auto;
    max-width: none;
    margin-inline: 0;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-mermaid[data-print-free-transform],
  [data-export-pdf-pages] .md-editor-mermaid[data-print-free-transform],
  .export-pdf-preview-stage .md-editor-mermaid[data-print-free-transform] {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-mermaid[data-print-free-transform] svg,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-mermaid[data-mermaid-sized] svg,
  [data-export-pdf-pages] .md-editor-mermaid[data-print-free-transform] svg,
  [data-export-pdf-pages] .md-editor-mermaid[data-mermaid-sized] svg,
  .export-pdf-preview-stage .md-editor-mermaid[data-print-free-transform] svg,
  .export-pdf-preview-stage .md-editor-mermaid[data-mermaid-sized] svg {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-mermaid-action,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview .md-editor-mermaid-action {
    display: none !important;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview figure figcaption {
    text-align: left;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-mermaid svg,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-mermaid svg * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview .md-pgbr,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview hr,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h1,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h2,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h3,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h4,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h5,
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview h6 {
    cursor: pointer;
  }
  :is(#export-pdf-preview, [data-export-pdf-preview]) img:not([data-print-free-transform]),
  :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview img:not([data-print-free-transform]) {
    max-width: var(--print-img-max-width, 100%);
    max-height: var(--print-img-max-height, var(--print-page-inner-height, 100vh));
    object-fit: contain;
  }

  /*
   * paged.js moves nodes into .pagedjs_page_content — mirror content chrome here so
   * screen preview / Stage clones keep heading sizes, line-height, Notion inline code,
   * and fenced-code styling even if Previewer stylesheet scoping changes.
   */
  [data-export-pdf-pages] .pagedjs_page_content,
  [data-export-pdf-pages] .export-pdf-page,
  .export-pdf-preview-stage .export-pdf-page-slot-clone,
  .export-pdf-preview-stage .export-pdf-page-slot-clone .pagedjs_page_content {
    color: #111827;
    font-family: var(--print-font-body, var(--font-sans-builtin));
    font-size: var(--print-font-size, 16px);
    line-height: var(--print-line-height-body, 1.7);
    word-break: break-word;
    overflow-wrap: anywhere;
  }
  [data-export-pdf-pages] .pagedjs_page_content p,
  [data-export-pdf-pages] .pagedjs_page_content li,
  .export-pdf-preview-stage .export-pdf-page-slot-clone p,
  .export-pdf-preview-stage .export-pdf-page-slot-clone li {
    line-height: var(--print-line-height-body, 1.7);
  }
  [data-export-pdf-pages] .pagedjs_page_content h1,
  [data-export-pdf-pages] .pagedjs_page_content h2,
  [data-export-pdf-pages] .pagedjs_page_content h3,
  [data-export-pdf-pages] .pagedjs_page_content h4,
  [data-export-pdf-pages] .pagedjs_page_content h5,
  [data-export-pdf-pages] .pagedjs_page_content h6,
  .export-pdf-preview-stage .export-pdf-page-slot-clone h1,
  .export-pdf-preview-stage .export-pdf-page-slot-clone h2,
  .export-pdf-preview-stage .export-pdf-page-slot-clone h3,
  .export-pdf-preview-stage .export-pdf-page-slot-clone h4,
  .export-pdf-preview-stage .export-pdf-page-slot-clone h5,
  .export-pdf-preview-stage .export-pdf-page-slot-clone h6 {
    font-family: var(--print-font-heading, var(--font-display-builtin));
    color: #111827;
    font-weight: 700;
    margin: 1em 0 0.8em;
    word-break: keep-all;
    overflow-wrap: break-word;
    line-height: var(--print-line-height-heading, 1.35);
  }
  [data-export-pdf-pages] .pagedjs_page_content h1,
  .export-pdf-preview-stage .export-pdf-page-slot-clone h1 { font-size: 1.75em; }
  [data-export-pdf-pages] .pagedjs_page_content h2,
  .export-pdf-preview-stage .export-pdf-page-slot-clone h2 { font-size: 1.5em; }
  [data-export-pdf-pages] .pagedjs_page_content h3,
  .export-pdf-preview-stage .export-pdf-page-slot-clone h3 { font-size: 1.25em; }
  [data-export-pdf-pages] .pagedjs_page_content h4,
  [data-export-pdf-pages] .pagedjs_page_content h5,
  [data-export-pdf-pages] .pagedjs_page_content h6,
  .export-pdf-preview-stage .export-pdf-page-slot-clone h4,
  .export-pdf-preview-stage .export-pdf-page-slot-clone h5,
  .export-pdf-preview-stage .export-pdf-page-slot-clone h6 { font-size: 1em; }
  [data-export-pdf-pages] .pagedjs_page_content b,
  [data-export-pdf-pages] .pagedjs_page_content strong,
  .export-pdf-preview-stage .export-pdf-page-slot-clone b,
  .export-pdf-preview-stage .export-pdf-page-slot-clone strong {
    font-family: var(--print-font-bold, var(--font-sans-builtin));
  }
  [data-export-pdf-pages] .pagedjs_page_content code,
  [data-export-pdf-pages] .pagedjs_page_content pre,
  .export-pdf-preview-stage .export-pdf-page-slot-clone code,
  .export-pdf-preview-stage .export-pdf-page-slot-clone pre {
    font-family: var(--print-font-code, var(--font-mono-builtin));
  }
  [data-export-pdf-pages] .pagedjs_page_content :not(pre) > code,
  .export-pdf-preview-stage .export-pdf-page-slot-clone :not(pre) > code {
    background-color: rgba(135, 131, 120, 0.15);
    color: #eb5757;
    border: none;
    border-radius: 4px;
    padding: 0.2em 0.4em;
    font-size: 0.92em;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  [data-export-pdf-pages] .pagedjs_page_content .md-editor-code,
  .export-pdf-preview-stage .export-pdf-page-slot-clone .md-editor-code {
    display: block;
    margin: 1.25em 0;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: visible;
    background-color: #fafafa;
    line-height: 1.6;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  [data-export-pdf-pages] .pagedjs_page_content .md-editor-code .md-editor-code-head,
  [data-export-pdf-pages] .pagedjs_page_content .md-editor-copy-button,
  [data-export-pdf-pages] .pagedjs_page_content .md-editor-code-action,
  [data-export-pdf-pages] .pagedjs_page_content .md-editor-mermaid-action,
  .export-pdf-preview-stage .export-pdf-page-slot-clone .md-editor-code-head,
  .export-pdf-preview-stage .export-pdf-page-slot-clone .md-editor-copy-button,
  .export-pdf-preview-stage .export-pdf-page-slot-clone .md-editor-code-action,
  .export-pdf-preview-stage .export-pdf-page-slot-clone .md-editor-mermaid-action {
    display: none !important;
  }
  [data-export-pdf-pages] .pagedjs_page_content .md-editor-mermaid[data-processed],
  .export-pdf-preview-stage .export-pdf-page-slot-clone .md-editor-mermaid[data-processed] {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-inline: auto;
    width: 100%;
  }
  [data-export-pdf-pages] .pagedjs_page_content .md-editor-mermaid[data-processed] svg,
  .export-pdf-preview-stage .export-pdf-page-slot-clone .md-editor-mermaid[data-processed] svg {
    margin-inline: auto;
  }
  [data-export-pdf-pages] .pagedjs_page_content .md-editor-code pre,
  .export-pdf-preview-stage .export-pdf-page-slot-clone .md-editor-code pre {
    margin: 0;
    background-color: #fafafa;
    overflow: visible;
  }
  [data-export-pdf-pages] .pagedjs_page_content .md-editor-code pre code,
  .export-pdf-preview-stage .export-pdf-page-slot-clone .md-editor-code pre code {
    display: block;
    background-color: #fafafa;
    color: #383a42;
    border: none;
    border-radius: 0;
    padding: 1em 1.2em;
    line-height: 1.6;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .export-pdf-paper .md-pgbr {
    height: auto;
    min-height: 1px;
    margin: 0;
    padding: 0;
    border: none;
    border-block-start: 2px dashed #ef4444;
    background-color: #f3f4f6;
    background-image: repeating-linear-gradient(
      -45deg,
      #f9fafb,
      #f9fafb 6px,
      #f3f4f6 6px,
      #f3f4f6 12px
    );
  }
  .export-pdf-pages {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  .export-pdf-pages .export-pdf-page,
  .export-pdf-pages .pagedjs_page {
    box-shadow: 0 8px 28px rgba(15, 23, 42, 0.12);
  }
  .export-pdf-pages .pagedjs_pages {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
  }
  .export-pdf-pages .print-pack-line {
    display: block;
  }
  .export-pdf-paper-metric {
    height: var(--print-page-inner-height);
  }
  .export-pdf-cover {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    break-after: page;
    page-break-after: always;
    /* Prefer cover hit-testing if paper box ever overlaps the cover sibling. */
    position: relative;
    z-index: 2;
    --cover-font-scale: 1;
  }
  .export-pdf-cover [data-cover-el],
  .export-pdf-cover [data-cover-shape] {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .export-pdf-cover-stack {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  .export-pdf-source-measure {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    /* Prefer visibility over opacity so print engines still paint with @media print. */
    visibility: hidden;
    pointer-events: none;
    z-index: -1;
  }
  .export-pdf-preview-stage .export-pdf-page-slot-clone .md-editor,
  .export-pdf-preview-stage .export-pdf-page-slot-clone .md-editor-content,
  .export-pdf-preview-stage .export-pdf-page-slot-clone .md-editor-preview-wrapper,
  .export-pdf-preview-stage .export-pdf-page-slot-clone .md-editor-preview {
    height: auto !important;
    max-height: none !important;
    min-height: 0 !important;
  }
  .export-pdf-paper :is(#export-pdf-preview, [data-export-pdf-preview]),
  .export-pdf-paper :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor,
  .export-pdf-paper :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-content,
  .export-pdf-paper :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview-wrapper,
  .export-pdf-paper :is(#export-pdf-preview, [data-export-pdf-preview]) .md-editor-preview {
    height: auto !important;
    max-height: none !important;
    min-height: 0 !important;
  }
  @media print {
    .export-pdf-preview-scroll {
      overflow: visible !important;
      max-height: none !important;
      background: #ffffff !important;
      padding: 0 !important;
    }
    .export-pdf-preview-stage {
      display: none !important;
    }
    .export-pdf-source-measure {
      position: static !important;
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
      z-index: auto !important;
      width: auto !important;
    }
    .export-pdf-staging {
      display: none !important;
    }
    .export-pdf-pages {
      gap: 0 !important;
      align-items: stretch !important;
      zoom: 1 !important;
    }
    .export-pdf-pages .pagedjs_pages {
      gap: 0 !important;
      align-items: stretch !important;
    }
    .export-pdf-pages .pagedjs_page {
      box-shadow: none !important;
      margin: 0 !important;
      break-after: page !important;
      page-break-after: always !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .export-pdf-pages .pagedjs_page:last-child {
      break-after: auto !important;
      page-break-after: auto !important;
    }
    .export-pdf-pages .export-pdf-page:not(.pagedjs_page) {
      display: block !important;
      width: var(--print-page-width) !important;
      height: var(--print-page-height) !important;
      min-height: var(--print-page-height) !important;
      max-height: var(--print-page-height) !important;
      margin: 0 !important;
      padding: var(--print-page-margin) !important;
      box-shadow: none !important;
      overflow: hidden !important;
      background: #ffffff !important;
      break-after: page !important;
      page-break-after: always !important;
    }
    .export-pdf-pages .export-pdf-page:not(.pagedjs_page):last-child {
      break-after: auto !important;
      page-break-after: auto !important;
    }
    .export-pdf-cover-stack {
      gap: 0 !important;
      align-items: stretch !important;
      /* Preview CSS zoom must not scale print layout / paper size. */
      zoom: 1 !important;
    }
    .export-pdf-cover {
      /* Same aspect as editor full page, fitted inside @page margins so the
         print dialog keeps the named paper size (e.g. A4) instead of Custom. */
      width: var(--print-cover-fit-width) !important;
      max-width: none !important;
      height: var(--print-cover-fit-height) !important;
      min-height: var(--print-cover-fit-height) !important;
      max-height: var(--print-cover-fit-height) !important;
      /* Keep design px fonts proportional to the smaller print cover box. */
      --cover-font-scale: calc(var(--print-cover-fit-height) / var(--print-page-height)) !important;
      margin: 0 !important;
      box-shadow: none !important;
      overflow: hidden !important;
      break-after: page !important;
      page-break-after: always !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .export-pdf-paper .md-pgbr {
      background: transparent !important;
      background-image: none !important;
      border: none !important;
    }
  }
`;

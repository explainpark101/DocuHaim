import {
  PRINT_PAGE_MARGIN_MM,
  getCssPageSizeDescriptor,
  type PrintPageSizeId,
} from '@/utils/printPageLayout';
import { DEFAULT_PRINT_FONTS } from '@/utils/print/printFonts';

export type ExportPdfPagedStyleOptions = {
  bodyLineHeight?: string;
  headingLineHeight?: string;
  baseFontSizePx?: string;
};

/**
 * CSS for paged.js Previewer.
 *
 * After chunking, nodes live under `.pagedjs_page_content` (not under
 * `.export-pdf-paged-source`), so content rules must target the page box.
 * Keep free of `@media print` / app-shell selectors — those break css-tree.
 * Line-heights are inlined (scratch mounts off the shell, so CSS vars may miss).
 */
export function buildExportPdfPagedStyles(
  pageSizeId: PrintPageSizeId,
  options: ExportPdfPagedStyleOptions = {},
): string {
  const size = getCssPageSizeDescriptor(pageSizeId);
  const bodyLh = options.bodyLineHeight || DEFAULT_PRINT_FONTS.bodyLineHeight;
  const headingLh = options.headingLineHeight || DEFAULT_PRINT_FONTS.headingLineHeight;
  const baseFs = options.baseFontSizePx || DEFAULT_PRINT_FONTS.baseFontSizePx;
  return `
@page {
  size: ${size};
  margin: ${PRINT_PAGE_MARGIN_MM}mm;
}

/* Content root before chunk + page boxes after chunk */
.export-pdf-paged-source,
.pagedjs_page_content,
.pagedjs_page {
  background: #ffffff;
  color: #111827;
  font-family: var(--print-font-body, var(--font-sans-builtin));
  font-size: ${baseFs}px;
  color-scheme: light;
  line-height: ${bodyLh};
  word-break: break-word;
  overflow-wrap: anywhere;
}

.export-pdf-paged-source p,
.pagedjs_page_content p {
  line-height: ${bodyLh};
  margin: 0.75em 0;
}

.export-pdf-paged-source li,
.pagedjs_page_content li {
  line-height: ${bodyLh};
}

.export-pdf-paged-source h1,
.export-pdf-paged-source h2,
.export-pdf-paged-source h3,
.export-pdf-paged-source h4,
.export-pdf-paged-source h5,
.export-pdf-paged-source h6,
.pagedjs_page_content h1,
.pagedjs_page_content h2,
.pagedjs_page_content h3,
.pagedjs_page_content h4,
.pagedjs_page_content h5,
.pagedjs_page_content h6 {
  font-family: var(--print-font-heading, var(--font-display-builtin));
  color: #111827;
  position: relative;
  word-break: keep-all;
  overflow-wrap: break-word;
  margin: 1em 0 0.8em;
  font-weight: 700;
  line-height: ${headingLh};
}

.export-pdf-paged-source h1,
.pagedjs_page_content h1 {
  font-size: 1.75em;
}

.export-pdf-paged-source h2,
.pagedjs_page_content h2 {
  font-size: 1.5em;
}

.export-pdf-paged-source h3,
.pagedjs_page_content h3 {
  font-size: 1.25em;
}

.export-pdf-paged-source h4,
.export-pdf-paged-source h5,
.export-pdf-paged-source h6,
.pagedjs_page_content h4,
.pagedjs_page_content h5,
.pagedjs_page_content h6 {
  font-size: 1em;
}

.export-pdf-paged-source b,
.export-pdf-paged-source strong,
.pagedjs_page_content b,
.pagedjs_page_content strong {
  font-family: var(--print-font-bold, var(--font-sans-builtin));
}

.export-pdf-paged-source code,
.export-pdf-paged-source pre,
.export-pdf-paged-source .md-editor-code pre,
.export-pdf-paged-source .md-editor-code pre code,
.pagedjs_page_content code,
.pagedjs_page_content pre,
.pagedjs_page_content .md-editor-code pre,
.pagedjs_page_content .md-editor-code pre code {
  font-family: var(--print-font-code, var(--font-mono-builtin));
}

/* Notion-like inline code */
.export-pdf-paged-source :not(pre) > code,
.pagedjs_page_content :not(pre) > code {
  background-color: rgba(135, 131, 120, 0.15);
  color: #eb5757;
  border: none;
  border-radius: 4px;
  padding: 0.2em 0.4em;
  font-size: 0.92em;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* Fenced code block — light chrome; may fragment across pages */
.export-pdf-paged-source .md-editor-code,
.pagedjs_page_content .md-editor-code {
  --md-theme-code-block-color: #383a42;
  --md-theme-code-block-bg-color: #fafafa;
  --md-theme-code-before-bg-color: #f0f0f0;
  display: block;
  margin: 1.25em 0;
  padding: 0;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: visible;
  box-shadow: none;
  background-color: #fafafa;
  line-height: 1.6;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.export-pdf-paged-source .md-editor-code .md-editor-code-head,
.pagedjs_page_content .md-editor-code .md-editor-code-head,
.export-pdf-paged-source .md-editor-copy-button,
.pagedjs_page_content .md-editor-copy-button,
.export-pdf-paged-source .md-editor-code-action,
.pagedjs_page_content .md-editor-code-action {
  display: none !important;
}

.export-pdf-paged-source .md-editor-code pre,
.pagedjs_page_content .md-editor-code pre {
  margin: 0;
  padding: 0;
  background-color: #fafafa;
  overflow: visible;
}

.export-pdf-paged-source .md-editor-code pre code,
.pagedjs_page_content .md-editor-code pre code {
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

.export-pdf-paged-source .md-editor-code pre code .md-editor-code-block,
.pagedjs_page_content .md-editor-code pre code .md-editor-code-block {
  color: unset;
}

.export-pdf-paged-source table,
.pagedjs_page_content table {
  max-width: 100%;
  border-collapse: collapse;
}

.export-pdf-paged-source table tr,
.pagedjs_page_content table tr {
  background-color: #ffffff;
}

.export-pdf-paged-source table thead,
.export-pdf-paged-source table thead tr,
.export-pdf-paged-source table tr th,
.pagedjs_page_content table thead,
.pagedjs_page_content table thead tr,
.pagedjs_page_content table tr th {
  background-color: #f3f4f6;
  color: #111827;
}

.export-pdf-paged-source table tr th,
.export-pdf-paged-source table tr td,
.pagedjs_page_content table tr th,
.pagedjs_page_content table tr td {
  border: 1px solid #e5e7eb;
  color: #111827;
  padding: 0.4em 0.6em;
  word-break: break-word;
  overflow-wrap: anywhere;
}

.export-pdf-paged-source figure,
.pagedjs_page_content figure {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 0 0 1em;
}

.export-pdf-paged-source .md-editor-mermaid svg,
.export-pdf-paged-source .md-editor-mermaid svg *,
.pagedjs_page_content .md-editor-mermaid svg,
.pagedjs_page_content .md-editor-mermaid svg * {
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* Only processed hosts — flex on placeholders breaks lazy Mermaid source (white-space:pre). */
.export-pdf-paged-source .md-editor-mermaid[data-processed],
.pagedjs_page_content .md-editor-mermaid[data-processed] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-inline: auto;
  width: 100%;
}

.export-pdf-paged-source .md-editor-mermaid[data-processed] svg,
.pagedjs_page_content .md-editor-mermaid[data-processed] svg {
  margin-inline: auto;
}

.export-pdf-paged-source .md-editor-mermaid[data-mermaid-sized],
.export-pdf-paged-source .md-editor-mermaid[data-print-free-transform],
.pagedjs_page_content .md-editor-mermaid[data-mermaid-sized],
.pagedjs_page_content .md-editor-mermaid[data-print-free-transform] {
  box-sizing: border-box;
  overflow: hidden;
}

.export-pdf-paged-source .md-editor-mermaid[data-mermaid-sized] svg,
.export-pdf-paged-source .md-editor-mermaid[data-print-free-transform] svg,
.pagedjs_page_content .md-editor-mermaid[data-mermaid-sized] svg,
.pagedjs_page_content .md-editor-mermaid[data-print-free-transform] svg {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}

.export-pdf-paged-source .md-editor-mermaid-action,
.pagedjs_page_content .md-editor-mermaid-action {
  display: none !important;
}

.md-pgbr {
  break-before: page;
  page-break-before: always;
  height: 0 !important;
  min-height: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  background: transparent !important;
  visibility: hidden;
}

figure,
table,
.md-editor-mermaid {
  break-inside: avoid;
  page-break-inside: avoid;
}

/* Code fences may split across pages when taller than the page box. */
.md-editor-code,
.md-editor-code pre,
.md-editor-code pre code {
  break-inside: auto;
  page-break-inside: auto;
}

img {
  max-width: var(--print-img-max-width, 100%);
  max-height: var(--print-img-max-height, 100%);
  object-fit: contain;
}

.pagedjs_page {
  background: #ffffff;
  box-shadow: 0 8px 28px rgba(15, 23, 42, 0.12);
}

.pagedjs_pages {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
}
`;
}

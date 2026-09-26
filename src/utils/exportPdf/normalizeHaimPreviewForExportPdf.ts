/**
 * Map Haim TipTap preview DOM onto md-editor-rt class names expected by
 * ExportPDF paged.js / code-block / mermaid pipelines.
 * Safe no-op when the root has no Haim markers.
 */

const HAIM_CODE_SEL = '.haim-code-block';
const HAIM_MERMAID_SEL = '.haim-mermaid-block';

/**
 * Add md-editor-* alias classes on Haim preview nodes (live staging or clone).
 */
export function applyHaimPreviewExportPdfAliases(root: ParentNode): void {
  const codeBlocks = root.querySelectorAll<HTMLElement>(HAIM_CODE_SEL);
  for (const block of codeBlocks) {
    block.classList.add('md-editor-code');
    const code = block.querySelector<HTMLElement>('pre code');
    if (code) {
      code.classList.add('md-editor-code-block');
    }
  }

  const mermaidBlocks = root.querySelectorAll<HTMLElement>(HAIM_MERMAID_SEL);
  for (const block of mermaidBlocks) {
    block.classList.add('md-editor-mermaid');
    if (block.querySelector('svg')) {
      block.setAttribute('data-processed', '');
    }
  }
}

/**
 * Normalize a paged.js source clone so prepareExportPdfCodeBlocksForPaging
 * and mermaid fit hooks see md-editor-* selectors.
 */
export function normalizeHaimPreviewForExportPdf(root: ParentNode): void {
  const hasHaim =
    root.querySelector(HAIM_CODE_SEL) ||
    root.querySelector(HAIM_MERMAID_SEL) ||
    root.querySelector('.haim-markdown-preview') ||
    root.querySelector('.haim-editor');
  if (!hasHaim) return;
  applyHaimPreviewExportPdfAliases(root);

  // TipTap leaves contenteditable on the clone; strip for print layout.
  for (const el of root.querySelectorAll<HTMLElement>('[contenteditable]')) {
    el.removeAttribute('contenteditable');
  }
}

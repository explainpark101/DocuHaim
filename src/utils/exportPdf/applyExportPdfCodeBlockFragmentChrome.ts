export const EXPORT_PDF_CODE_BLOCK_ID_ATTR = 'data-export-pdf-code-id';

const FRAG_CONTINUE_CLASS = 'export-pdf-code-frag-continue';
const FRAG_BREAK_CLASS = 'export-pdf-code-frag-break';

/**
 * After paged.js splits a code block across pages, strip top/bottom border and
 * corner radius on continuation / break edges.
 */
export function applyExportPdfCodeBlockFragmentChrome(root: ParentNode): void {
  const pages = [...root.querySelectorAll<HTMLElement>('.pagedjs_page')];
  if (!pages.length) return;

  const fragmentsById = new Map<string, HTMLElement[]>();

  for (const page of pages) {
    for (const block of page.querySelectorAll<HTMLElement>(
      `.md-editor-code.export-pdf-code-paged[${EXPORT_PDF_CODE_BLOCK_ID_ATTR}]`,
    )) {
      block.classList.remove(FRAG_CONTINUE_CLASS, FRAG_BREAK_CLASS);
      const id = block.getAttribute(EXPORT_PDF_CODE_BLOCK_ID_ATTR);
      if (!id) continue;
      const list = fragmentsById.get(id) ?? [];
      list.push(block);
      fragmentsById.set(id, list);
    }
  }

  for (const fragments of fragmentsById.values()) {
    const lastIndex = fragments.length - 1;
    fragments.forEach((block, index) => {
      if (index > 0) block.classList.add(FRAG_CONTINUE_CLASS);
      if (index < lastIndex) block.classList.add(FRAG_BREAK_CLASS);
    });
  }
}

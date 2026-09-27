/**
 * Soft-break long unbreakable runs so paged.js can paginate without crashing
 * in createBreakToken / findElement (known with PRE / long tokens).
 * Skip fenced code: ZWSP would force mid-token wraps inside export code lines.
 */
const SOFT_HYPHEN = '\u200b';
const MAX_UNBROKEN_RUN = 48;

const CODE_SANITIZE_SKIP_SEL =
  '.export-pdf-code-content, .export-pdf-code-body, .md-editor-code-block, .haim-code-block code, pre code';

export function insertSoftBreaksInText(value: string, maxRun = MAX_UNBROKEN_RUN): string {
  if (!value || value.length < maxRun) return value;
  return value.replace(/[^\s\u200b]{49,}/g, (run) => {
    const parts: string[] = [];
    for (let i = 0; i < run.length; i += maxRun) {
      parts.push(run.slice(i, i + maxRun));
    }
    return parts.join(SOFT_HYPHEN);
  });
}

function isInsideExportPdfCode(node: Node): boolean {
  const el = node.parentElement;
  if (!el) return false;
  return Boolean(el.closest(CODE_SANITIZE_SKIP_SEL));
}

/** Walk text nodes under root and insert zero-width spaces in long runs. */
export function sanitizeExportPdfPagedSource(root: ParentNode): void {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) {
    nodes.push(walker.currentNode as Text);
  }
  for (const node of nodes) {
    if (isInsideExportPdfCode(node)) continue;
    const value = node.nodeValue ?? '';
    const next = insertSoftBreaksInText(value);
    if (next !== value) node.nodeValue = next;
  }
}

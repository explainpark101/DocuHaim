/**
 * Soft-break long unbreakable runs so paged.js can paginate without crashing
 * in createBreakToken / findElement (known with PRE / long tokens).
 */
const SOFT_HYPHEN = '\u200b';
const MAX_UNBROKEN_RUN = 48;

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

/** Walk text nodes under root and insert zero-width spaces in long runs. */
export function sanitizeExportPdfPagedSource(root: ParentNode): void {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) {
    nodes.push(walker.currentNode as Text);
  }
  for (const node of nodes) {
    const value = node.nodeValue ?? '';
    const next = insertSoftBreaksInText(value);
    if (next !== value) node.nodeValue = next;
  }
}

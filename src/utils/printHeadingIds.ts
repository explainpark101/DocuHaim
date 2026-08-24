export type PrintHeadingIdFn = (args: { index: number }) => string;

/** Export PDF default — matches md-editor-rt mdHeadingId on ExportPDFPage. */
export const defaultPrintHeadingId: PrintHeadingIdFn = ({ index }) => `pdf-ex-heading-${index}`;

/** Assign 1-based heading ids in document order (same contract as md-editor-rt mdHeadingId). */
export function assignPrintHeadingIds(
  root: HTMLElement,
  headingId: PrintHeadingIdFn = defaultPrintHeadingId,
): void {
  const headings = root.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let index = 0;
  for (const el of headings) {
    if (!(el instanceof HTMLElement)) continue;
    index += 1;
    el.id = headingId({ index });
  }
}

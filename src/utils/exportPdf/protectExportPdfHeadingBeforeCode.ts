/**
 * Keep headings that sit immediately before a fenced code block from vanishing
 * at page boundaries.
 *
 * paged.js can place the heading in leftover space, fail to place the following
 * avoid/auto code, then on Unable to layout call nodeAfter(heading) and skip
 * the heading entirely. Forcing break-before:page on the heading when the
 * leftover is too small moves heading+code to the next page together.
 */

export const EXPORT_PDF_HEADING_BEFORE_CODE_CLASS =
  'export-pdf-heading-before-code';
export const EXPORT_PDF_BREAK_BEFORE_PAGE_CLASS =
  'export-pdf-break-before-page';

/** Minimum px to keep with a heading for the start of a code fence. */
export const MIN_SPACE_AFTER_HEADING_FOR_CODE_PX = 96;

export function isExportPdfHeadingElement(
  el: Element | null | undefined,
): el is HTMLElement {
  return !!el && /^H[1-6]$/i.test(el.tagName);
}

/** Previous element sibling that is h1–h6 (skips forced page-break markers). */
export function findHeadingImmediatelyBeforeCode(
  codeRoot: HTMLElement,
): HTMLElement | null {
  let prev = codeRoot.previousElementSibling;
  while (prev) {
    if (prev.classList.contains('md-pgbr')) {
      prev = prev.previousElementSibling;
      continue;
    }
    if (isExportPdfHeadingElement(prev)) return prev;
    return null;
  }
  return null;
}

/**
 * True when leftover space before the heading cannot fit heading + a little code.
 * In that case the heading must start on the next page with the code.
 */
export function shouldForceBreakBeforeHeadingBeforeCode(options: {
  remainingBeforeHeadingPx: number;
  headingHeightPx: number;
  minCodePx?: number;
}): boolean {
  const minCode = options.minCodePx ?? MIN_SPACE_AFTER_HEADING_FOR_CODE_PX;
  const need = Math.max(1, options.headingHeightPx) + Math.max(0, minCode);
  return options.remainingBeforeHeadingPx < need;
}

/**
 * Mark heading before code; optionally force a page break when leftover is tight.
 * Returns whether a forced break was applied (caller should pack first chunk
 * for a fresh page).
 */
export function protectHeadingBeforeCodeFence(
  codeRoot: HTMLElement,
  options: {
    remainingBeforeHeadingPx: number;
    headingHeightPx: number;
  },
): { heading: HTMLElement | null; forcedBreakBefore: boolean } {
  const heading = findHeadingImmediatelyBeforeCode(codeRoot);
  if (!heading) {
    return { heading: null, forcedBreakBefore: false };
  }

  heading.classList.add(EXPORT_PDF_HEADING_BEFORE_CODE_CLASS);
  heading.classList.remove(EXPORT_PDF_BREAK_BEFORE_PAGE_CLASS);

  const forced = shouldForceBreakBeforeHeadingBeforeCode({
    remainingBeforeHeadingPx: options.remainingBeforeHeadingPx,
    headingHeightPx: options.headingHeightPx,
  });
  if (forced) {
    heading.classList.add(EXPORT_PDF_BREAK_BEFORE_PAGE_CLASS);
  }
  return { heading, forcedBreakBefore: forced };
}

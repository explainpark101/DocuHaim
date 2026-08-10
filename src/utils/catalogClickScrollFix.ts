/**
 * Fix md-editor-rt catalog click scroll.
 *
 * Built-in CatalogLink walks offsetParent/offsetTop, which drifts when preview
 * content has containment/transforms (note-cover, etc.). Also, keep-alive tabs
 * used to share heading ids — callers must pass a scoped mdHeadingId + editor root.
 *
 * Capture-phase handler replaces the library scroll with getBoundingClientRect math.
 */

import { findPreviewScrollContainer } from '@/utils/previewSelectionSync';

const CATALOG_LINK_SEL = '.md-editor-catalog-link';
const FOLDED_CLASS = 'md-preview-heading-folded';
const SECTION_HIDDEN_CLASS = 'md-preview-heading-section-hidden';
const SCROLL_OFFSET_TOP_PX = 2;

export type CatalogScrollFixOptions = {
  /** Editor root that owns this catalog (keep lookups scoped). */
  getEditorRoot: () => Element | null | undefined;
  /** Same builder passed to MdEditor `mdHeadingId`. */
  mdHeadingId: (args: { index: number }) => string;
};

function offsetTopWithinScroller(el: HTMLElement, scroller: HTMLElement): number {
  const elRect = el.getBoundingClientRect();
  const scrollerRect = scroller.getBoundingClientRect();
  return elRect.top - scrollerRect.top + scroller.scrollTop;
}

/** Expand folded ancestor sections so the target heading can layout/scroll. */
function expandFoldedAncestors(heading: HTMLElement): void {
  for (let guard = 0; guard < 8; guard += 1) {
    const style = getComputedStyle(heading);
    const stillHidden =
      heading.classList.contains(SECTION_HIDDEN_CLASS)
      || heading.hasAttribute('hidden')
      || style.display === 'none';
    if (!stillHidden) break;

    let expanded = false;
    let node: Element | null = heading;
    while (node && !expanded) {
      const hidden =
        node instanceof HTMLElement
        && (node.classList.contains(SECTION_HIDDEN_CLASS) || node.hasAttribute('hidden'));
      if (hidden) {
        let prev: Element | null = node.previousElementSibling;
        while (prev) {
          if (prev instanceof HTMLElement && prev.classList.contains(FOLDED_CLASS)) {
            const chevron = prev.querySelector(
              ':scope > .md-preview-heading-fold-chevron',
            );
            if (chevron instanceof HTMLButtonElement) {
              chevron.click();
              expanded = true;
            }
            break;
          }
          prev = prev.previousElementSibling;
        }
      }
      node = node.parentElement;
    }
    if (!expanded) break;
  }
}

/**
 * Bind capture-phase catalog click → reliable preview scroll.
 * Returns cleanup.
 */
export function bindCatalogClickScrollFix(
  catalogRoot: HTMLElement,
  options: CatalogScrollFixOptions,
): () => void {
  const onClickCapture = (event: MouseEvent) => {
    if (event.button !== 0) return;
    const target = event.target;
    if (!(target instanceof Element)) return;

    const link = target.closest(CATALOG_LINK_SEL);
    if (!(link instanceof HTMLElement) || !catalogRoot.contains(link)) return;

    const links = Array.from(
      catalogRoot.querySelectorAll(CATALOG_LINK_SEL),
    ) as HTMLElement[];
    const index = links.indexOf(link);
    if (index < 0) return;

    const headingId = options.mdHeadingId({ index: index + 1 });
    const editorRoot = options.getEditorRoot();
    const heading =
      (editorRoot?.querySelector?.(`#${CSS.escape(headingId)}`) as HTMLElement | null)
      ?? null;
    if (!heading || (editorRoot && !editorRoot.contains(heading))) return;

    event.preventDefault();
    event.stopPropagation();
    if (typeof event.stopImmediatePropagation === 'function') {
      event.stopImmediatePropagation();
    }

    expandFoldedAncestors(heading);

    const scroller = findPreviewScrollContainer(heading);
    if (!scroller) {
      heading.scrollIntoView({ block: 'start', behavior: 'smooth' });
      return;
    }

    const marginStart = heading.previousElementSibling
      ? 0
      : Number.parseFloat(getComputedStyle(heading).marginBlockStart || '0') || 0;
    const top =
      offsetTopWithinScroller(heading, scroller) - SCROLL_OFFSET_TOP_PX - marginStart;
    scroller.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  };

  catalogRoot.addEventListener('click', onClickCapture, true);
  return () => {
    catalogRoot.removeEventListener('click', onClickCapture, true);
  };
}

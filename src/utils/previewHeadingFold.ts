/**
 * Fold/unfold markdown headings in md-editor-rt preview DOM.
 * Hides following siblings until the next heading of the same or higher level.
 */
import { animate } from 'motion';

const HEADING_SELECTOR = 'h1, h2, h3, h4, h5, h6';
const CHEVRON_CLASS = 'md-preview-heading-fold-chevron';
const FOLDABLE_CLASS = 'md-preview-heading-foldable';
const FOLDED_CLASS = 'md-preview-heading-folded';
const SECTION_HIDDEN_CLASS = 'md-preview-heading-section-hidden';
const ENHANCED_ATTR = 'data-md-preview-heading-fold';

export type PreviewHeadingFoldOptions = {
  /** Heading element ids that should start collapsed. */
  collapsedIds?: Iterable<string>;
  /** Called whenever the collapsed id set changes. */
  onCollapsedChange?: (collapsedIds: string[]) => void;
};

function isHeadingElement(el: Element | null): el is HTMLElement {
  if (!el) return false;
  const tag = el.tagName;
  return tag === 'H1' || tag === 'H2' || tag === 'H3' || tag === 'H4' || tag === 'H5' || tag === 'H6';
}

function getHeadingLevel(el: HTMLElement): number {
  const dataLevel = el.getAttribute('data-heading-level');
  if (dataLevel) {
    const n = Number(dataLevel);
    if (Number.isFinite(n) && n >= 1) return n;
  }
  const fromTag = Number(el.tagName.slice(1));
  return Number.isFinite(fromTag) && fromTag >= 1 ? fromTag : 6;
}

function headingStableId(heading: HTMLElement, index: number): string {
  return heading.id || `md-preview-heading-${index}`;
}

function collectSectionElements(heading: HTMLElement): HTMLElement[] {
  const level = getHeadingLevel(heading);
  const nodes: HTMLElement[] = [];
  let el: Element | null = heading.nextElementSibling;
  while (el) {
    if (isHeadingElement(el) && getHeadingLevel(el) <= level) break;
    // Never fold the note-cover mount host away with a preceding heading.
    if (el.hasAttribute('data-note-cover-placeholder')) break;
    if (el instanceof HTMLElement) nodes.push(el);
    el = el.nextElementSibling;
  }
  return nodes;
}

function isSkippableHeading(el: HTMLElement): boolean {
  return Boolean(el.closest('[data-note-cover-placeholder], [data-note-cover-preview]'));
}

function listFoldableHeadings(previewRoot: ParentNode): HTMLElement[] {
  return Array.from(previewRoot.querySelectorAll(HEADING_SELECTOR)).filter(
    (el): el is HTMLElement => {
      if (!(el instanceof HTMLElement)) return false;
      if (isSkippableHeading(el)) return false;
      return true;
    },
  );
}

/**
 * True when the preview has foldable headings that are not enhanced yet
 * (e.g. after md-editor-rt rebuilds preview HTML).
 */
export function previewNeedsHeadingFoldEnhance(
  previewRoot: ParentNode | null | undefined,
): boolean {
  if (!previewRoot || typeof previewRoot.querySelectorAll !== 'function') return false;
  const headings = listFoldableHeadings(previewRoot);
  for (const heading of headings) {
    if (heading.getAttribute(ENHANCED_ATTR) === '1') continue;
    if (collectSectionElements(heading).length > 0) return true;
  }
  return false;
}

function createChevronButton(open: boolean): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `${CHEVRON_CLASS} cursor-pointer`;
  button.setAttribute('aria-label', open ? '헤딩 접기' : '헤딩 펼치기');
  button.title = open ? '헤딩 접기' : '헤딩 펼치기';
  button.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const svg = button.querySelector('svg');
  if (svg) {
    svg.style.transform = open ? 'rotate(0deg)' : 'rotate(-90deg)';
    svg.style.transformOrigin = '50% 50%';
  }
  return button;
}

function animateChevron(button: HTMLButtonElement, open: boolean): void {
  const svg = button.querySelector('svg');
  if (!(svg instanceof SVGElement)) return;
  void animate(
    svg,
    { transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' },
    { duration: 0.18, ease: 'easeInOut' },
  );
  button.setAttribute('aria-label', open ? '헤딩 접기' : '헤딩 펼치기');
  button.title = open ? '헤딩 접기' : '헤딩 펼치기';
}

function setSectionHidden(nodes: HTMLElement[], hidden: boolean): void {
  for (const node of nodes) {
    node.classList.toggle(SECTION_HIDDEN_CLASS, hidden);
    if (hidden) {
      node.setAttribute('hidden', '');
    } else {
      node.removeAttribute('hidden');
    }
  }
}

/**
 * Attach fold chevrons to preview headings. Returns a cleanup function.
 * Idempotent for headings already marked with data-md-preview-heading-fold.
 */
export function enhancePreviewHeadingFolds(
  previewRoot: ParentNode | null | undefined,
  options: PreviewHeadingFoldOptions = {},
): () => void {
  if (!previewRoot || typeof (previewRoot as ParentNode).querySelectorAll !== 'function') {
    return () => {};
  }

  const collapsed = new Set(
    Array.from(options.collapsedIds ?? []).filter((id) => typeof id === 'string' && id),
  );
  const cleanups: Array<() => void> = [];

  const headings = listFoldableHeadings(previewRoot);

  headings.forEach((heading, index) => {
    if (heading.getAttribute(ENHANCED_ATTR) === '1') return;

    const section = collectSectionElements(heading);
    if (section.length === 0) return;

    const id = headingStableId(heading, index);
    if (!heading.id) heading.id = id;

    heading.setAttribute(ENHANCED_ATTR, '1');
    heading.classList.add(FOLDABLE_CLASS);

    const existing = heading.querySelector(`:scope > .${CHEVRON_CLASS}`);
    existing?.remove();

    const initiallyOpen = !collapsed.has(id);
    const button = createChevronButton(initiallyOpen);
    heading.insertBefore(button, heading.firstChild);

    const applyCollapsed = (isCollapsed: boolean) => {
      heading.classList.toggle(FOLDED_CLASS, isCollapsed);
      setSectionHidden(section, isCollapsed);
      animateChevron(button, !isCollapsed);
    };

    if (!initiallyOpen) {
      heading.classList.add(FOLDED_CLASS);
      setSectionHidden(section, true);
    }

    const onClick = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      const nextCollapsed = !heading.classList.contains(FOLDED_CLASS);
      applyCollapsed(nextCollapsed);
      if (nextCollapsed) collapsed.add(id);
      else collapsed.delete(id);
      options.onCollapsedChange?.(Array.from(collapsed));
    };

    button.addEventListener('click', onClick);
    cleanups.push(() => {
      button.removeEventListener('click', onClick);
      button.remove();
      heading.classList.remove(FOLDABLE_CLASS, FOLDED_CLASS);
      heading.removeAttribute(ENHANCED_ATTR);
      setSectionHidden(section, false);
    });
  });

  return () => {
    for (const fn of cleanups) fn();
  };
}

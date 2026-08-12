/**
 * In-preview footnote navigation via data-md-footnote-to (not URL hash / path).
 * Avoids HashRouter and SPA path handling for #source-N links.
 */

import { findPreviewScrollContainer } from '@/utils/previewSelectionSync';

const FOOTNOTE_TO_ATTR = 'data-md-footnote-to';
const FOOTNOTE_BACK_BUTTON_ATTR = 'data-md-footnote-back-button';
const SOURCE_SCROLL_OFFSET_TOP_PX = 2;
const BACK_BUTTON_HIDDEN_CLASS = 'is-hidden';

let lastFootnoteReturnTargetId: string | null = null;
const footnoteReturnTargets = new WeakMap<object, string>();

export function isPreviewFootnoteHash(href: string): boolean {
  // Legacy hash form still recognized for scroll helpers.
  return /^#(?:source-\d+|fnref-\d+(?:-\d+)?)$/i.test(String(href || '').trim());
}

function findPreviewTarget(
  id: string,
  previewRoot: ParentNode | null | undefined,
): Element | null {
  try {
    const sel = `#${CSS.escape(id)}, [data-md-footnote-id="${CSS.escape(id)}"]`;
    const inRoot = previewRoot?.querySelector?.(sel);
    if (inRoot) return inRoot as Element;
  } catch {
    /* fall through */
  }
  return document.getElementById(id);
}

function isSourceFootnoteId(id: string): boolean {
  return /^source-\d+$/i.test(id);
}

/** Align `target` to the top of the preview scroller (as far up as content allows). */
function scrollPreviewTargetToStart(target: Element): void {
  const scroller = findPreviewScrollContainer(target);
  if (!scroller) {
    target.scrollIntoView({ block: 'start', behavior: 'smooth' });
    return;
  }
  const elRect = target.getBoundingClientRect();
  const scrollerRect = scroller.getBoundingClientRect();
  const top =
    scroller.scrollTop + (elRect.top - scrollerRect.top) - SOURCE_SCROLL_OFFSET_TOP_PX;
  scroller.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

/**
 * Scroll to the footnote target inside `previewRoot` (or document).
 * Sources align to the top of the preview pane; backrefs use nearest.
 * @returns true if handled
 */
export function scrollPreviewToFootnoteHash(
  hrefOrId: string,
  previewRoot: ParentNode | null | undefined,
): boolean {
  const raw = String(hrefOrId || '').trim();
  const id = raw.startsWith('#') ? raw.slice(1) : raw;
  if (!id) return false;

  const target = findPreviewTarget(id, previewRoot);
  if (!target) return false;

  if (isSourceFootnoteId(id)) {
    scrollPreviewTargetToStart(target);
  } else {
    target.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
  return true;
}

function getPreviewRootFromEventTarget(
  target: EventTarget | null,
  root: ParentNode,
): ParentNode {
  const fromTarget = (target as Element | null)?.closest?.('.md-editor-preview');
  if (fromTarget && root.contains(fromTarget)) return fromTarget;
  const inRoot = root.querySelector?.('.md-editor-preview');
  return inRoot ?? root;
}

function findBackButton(previewRoot: ParentNode | null | undefined): HTMLElement | null {
  if (!previewRoot?.querySelector) return null;
  return previewRoot.querySelector(`[${FOOTNOTE_BACK_BUTTON_ATTR}]`) as HTMLElement | null;
}

function syncBackButtonState(previewRoot: ParentNode | null | undefined): void {
  const button = findBackButton(previewRoot);
  if (!button) return;
  const hasTarget = Boolean(previewRoot && footnoteReturnTargets.get(previewRoot as object));
  button.classList.toggle(BACK_BUTTON_HIDDEN_CLASS, !hasTarget);
  button.toggleAttribute('aria-hidden', !hasTarget);
  button.toggleAttribute('disabled', !hasTarget);
  button.setAttribute(
    'data-footnote-return-target',
    (previewRoot && footnoteReturnTargets.get(previewRoot as object)) ?? '',
  );
}

function clearFootnoteReturnTarget(previewRoot: ParentNode | null | undefined): void {
  if (previewRoot) {
    footnoteReturnTargets.delete(previewRoot as object);
  }
  lastFootnoteReturnTargetId = null;
  syncBackButtonState(previewRoot);
}

function setFootnoteReturnTarget(previewRoot: ParentNode | null | undefined, targetId: string): void {
  if (previewRoot && targetId) {
    footnoteReturnTargets.set(previewRoot as object, targetId);
  } else if (previewRoot) {
    footnoteReturnTargets.delete(previewRoot as object);
  }
  lastFootnoteReturnTargetId = targetId || null;
  syncBackButtonState(previewRoot);
}

/**
 * Bind click handling for footnote links inside a preview host.
 * @returns cleanup
 */
export function bindPreviewFootnoteClick(
  root: ParentNode | null | undefined,
): (() => void) | undefined {
  if (!root || typeof root.addEventListener !== 'function') return undefined;

  const onClick = (event: Event) => {
    const mouse = event as MouseEvent;
    if (mouse.metaKey || mouse.ctrlKey || mouse.shiftKey || mouse.altKey) return;
    if (typeof mouse.button === 'number' && mouse.button !== 0) return;

    const backButton = (mouse.target as Element | null)?.closest?.(
      `[${FOOTNOTE_BACK_BUTTON_ATTR}]`,
    );
    if (backButton instanceof HTMLElement && root.contains(backButton)) {
      const previewRoot = getPreviewRootFromEventTarget(mouse.target, root);
      const targetId = (previewRoot && footnoteReturnTargets.get(previewRoot as object))
        || lastFootnoteReturnTargetId;
      if (!targetId) return;
      event.preventDefault();
      event.stopPropagation();
      scrollPreviewToFootnoteHash(targetId, previewRoot);
      clearFootnoteReturnTarget(previewRoot);
      return;
    }

    const anchor = (mouse.target as Element | null)?.closest?.('a[href], a[data-md-footnote-to]');
    if (!anchor || !root.contains(anchor)) return;

    const to = anchor.getAttribute(FOOTNOTE_TO_ATTR) || '';
    const href = anchor.getAttribute('href') || '';
    const targetId = to || (isPreviewFootnoteHash(href) ? href.slice(1) : '');
    if (!targetId) return;

    const previewRoot = getPreviewRootFromEventTarget(mouse.target, root);
    event.preventDefault();
    event.stopPropagation();
    if (targetId && targetId.startsWith('source-')) {
      const refTargetId = anchor.getAttribute('data-md-footnote-id') || anchor.id;
      if (refTargetId) setFootnoteReturnTarget(previewRoot, refTargetId);
      else clearFootnoteReturnTarget(previewRoot);
    } else {
      clearFootnoteReturnTarget(previewRoot);
    }
    scrollPreviewToFootnoteHash(targetId, previewRoot);
  };

  root.addEventListener('click', onClick, true);
  syncBackButtonState(root);
  return () => root.removeEventListener('click', onClick, true);
}

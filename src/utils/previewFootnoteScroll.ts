/**
 * In-preview footnote navigation via data-md-footnote-to (not URL hash / path).
 * Avoids HashRouter and SPA path handling for #source-N links.
 */

const FOOTNOTE_TO_ATTR = 'data-md-footnote-to';

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

/**
 * Scroll to the footnote target inside `previewRoot` (or document).
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

  target.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
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

    const anchor = (mouse.target as Element | null)?.closest?.('a[href], a[data-md-footnote-to]');
    if (!anchor || !root.contains(anchor)) return;

    const to = anchor.getAttribute(FOOTNOTE_TO_ATTR) || '';
    const href = anchor.getAttribute('href') || '';
    const targetId = to || (isPreviewFootnoteHash(href) ? href.slice(1) : '');
    if (!targetId) return;

    const previewRoot = getPreviewRootFromEventTarget(mouse.target, root);
    event.preventDefault();
    event.stopPropagation();
    scrollPreviewToFootnoteHash(targetId, previewRoot);
  };

  root.addEventListener('click', onClick, true);
  return () => root.removeEventListener('click', onClick, true);
}

/**
 * Keep the virtua / overflow scroller offset stable when an element above the
 * viewport changes height (OG cards, images). Pair with reserved aspect-ratio
 * so CLS stays minimal (modern-web-guidance: performance / css).
 */

export function findVerticalScrollParent(el: HTMLElement | null): HTMLElement | null {
  let node: HTMLElement | null = el?.parentElement ?? null;
  while (node && node !== document.body) {
    const style = getComputedStyle(node);
    const oy = style.overflowY;
    if (
      (oy === 'auto' || oy === 'scroll' || oy === 'overlay') &&
      node.scrollHeight > node.clientHeight + 1
    ) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
}

/**
 * Observe `el` height. When it changes and the element sits above the visible
 * area of its scroll parent, adjust scrollTop by the delta so the viewport
 * content does not jump.
 */
export function bindPreserveScrollOnHeightChange(
  el: HTMLElement,
  options?: { rootMarginTopPx?: number },
): () => void {
  if (typeof ResizeObserver === 'undefined') return () => {};

  const marginTop = options?.rootMarginTopPx ?? 0;
  let prevHeight = el.offsetHeight;

  const ro = new ResizeObserver(() => {
    const nextHeight = el.offsetHeight;
    const delta = nextHeight - prevHeight;
    prevHeight = nextHeight;
    if (delta === 0) return;

    const scroller = findVerticalScrollParent(el);
    if (!scroller) return;

    const elRect = el.getBoundingClientRect();
    const scrollerRect = scroller.getBoundingClientRect();
    // Element ends above (or straddles above) the visible top → size change
    // would shift everything the user is looking at unless we compensate.
    const aboveViewport = elRect.bottom <= scrollerRect.top + marginTop;
    if (!aboveViewport) return;

    scroller.scrollTop += delta;
  });

  ro.observe(el);
  return () => ro.disconnect();
}

/**
 * Scroll settings sections inside the page scroll container only.
 * scrollIntoView also scrolls outer ancestors/viewport and pushes the page header away.
 */

function offsetTopWithinScroller(el: HTMLElement, scroller: HTMLElement): number {
  const elRect = el.getBoundingClientRect();
  const scrollerRect = scroller.getBoundingClientRect();
  return elRect.top - scrollerRect.top + scroller.scrollTop;
}

export function scrollWithinContainer(
  scroller: HTMLElement,
  target: HTMLElement,
  options?: { behavior?: ScrollBehavior },
): void {
  const behavior = options?.behavior ?? 'smooth';
  const scrollMarginTop = Number.parseFloat(getComputedStyle(target).scrollMarginTop || '0') || 0;
  const top = offsetTopWithinScroller(target, scroller) - scrollMarginTop;
  scroller.scrollTo({ top: Math.max(0, top), behavior });
}

export function scrollSettingsPageSection(
  scrollContainer: HTMLElement | null | undefined,
  target: HTMLElement | null | undefined,
  options?: { behavior?: ScrollBehavior },
): boolean {
  if (!target) return false;
  if (scrollContainer) {
    scrollWithinContainer(scrollContainer, target, options);
    return true;
  }
  target.scrollIntoView({ block: 'start', behavior: options?.behavior ?? 'smooth' });
  return true;
}

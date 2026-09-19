import { useLayoutEffect, useState, type RefObject } from 'react';
import { MOBILE_LAYOUT_MAX_WIDTH_PX } from '@/utils/layoutBreakpoints';

/**
 * True when the element's content box width is at or below the mobile breakpoint.
 * Used so split panes can follow the same compact UI as a narrow viewport.
 */
export function useElementNarrowLayout(
  ref: RefObject<HTMLElement | null>,
  maxWidthPx: number = MOBILE_LAYOUT_MAX_WIDTH_PX,
): boolean {
  const [narrow, setNarrow] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;

    const update = (width: number) => {
      setNarrow(width > 0 && width <= maxWidthPx);
    };

    update(el.getBoundingClientRect().width);

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const width =
        entry.borderBoxSize?.[0]?.inlineSize ??
        entry.contentRect.width;
      update(width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, maxWidthPx]);

  return narrow;
}

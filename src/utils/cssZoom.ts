export type FixedOverlayRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type OverlayRect = FixedOverlayRect & {
  /** `zoom-root-absolute` = portal inside `.export-pdf-cover-stack`; `viewport-fixed` = body. */
  positioning: 'zoom-root-absolute' | 'viewport-fixed';
};

export const EXPORT_PDF_ZOOM_ROOT_SELECTOR = '.export-pdf-cover-stack';
export const EXPORT_PDF_OVERLAY_PORTAL_SELECTOR = '.export-pdf-overlay-portal';

/** Product of ancestor `zoom` values (layout → visual scale). */
export function getCumulativeCssZoom(element: Element | null): number {
  if (!element || typeof window === 'undefined') return 1;
  let zoom = 1;
  let el: Element | null = element;
  while (el) {
    const raw = window.getComputedStyle(el).zoom;
    if (raw && raw !== 'normal') {
      const parsed = Number.parseFloat(raw);
      if (Number.isFinite(parsed) && parsed > 0) zoom *= parsed;
    }
    el = el.parentElement;
  }
  return zoom;
}

/** Visual (getBoundingClientRect) size → CSS layout px for style.width/height. */
export function visualSizeToLayoutSize(visualPx: number, zoom: number): number {
  const scale = zoom > 0 ? zoom : 1;
  return visualPx / scale;
}

/** Screen-space pointer delta → layout px delta under cumulative zoom. */
export function visualDeltaToLayoutDelta(visualDelta: number, zoom: number): number {
  const scale = zoom > 0 ? zoom : 1;
  return visualDelta / scale;
}

/**
 * WebKit/Wry can report layout px in getBoundingClientRect while offsetWidth
 * stays unzoomed — compare both to detect which space rect dimensions use.
 */
export function rectDimensionsLookVisual(
  rectSize: number,
  layoutSize: number,
  zoom: number,
): boolean {
  if (layoutSize < 1) return true;
  const visual = layoutSize * (zoom > 0 ? zoom : 1);
  return Math.abs(rectSize - visual) <= Math.abs(rectSize - layoutSize);
}

export function findExportPdfZoomRoot(element: HTMLElement): HTMLElement | null {
  return element.closest(EXPORT_PDF_ZOOM_ROOT_SELECTOR) as HTMLElement | null;
}

export function findExportPdfOverlayPortal(
  container: ParentNode | null | undefined,
): HTMLElement | null {
  if (!container) return null;
  const scoped =
    container instanceof Element
      ? container.querySelector(EXPORT_PDF_OVERLAY_PORTAL_SELECTOR)
      : null;
  if (scoped instanceof HTMLElement) return scoped;
  if (container instanceof Element && container.matches(EXPORT_PDF_OVERLAY_PORTAL_SELECTOR)) {
    return container;
  }
  return null;
}

/**
 * Layout-space rect inside a CSS-zoom root for `position:absolute` overlays
 * portaled into the same root (so zoom applies to overlay + target together).
 */
export function getZoomRootLayoutOverlayRect(
  element: HTMLElement,
  zoomRoot: HTMLElement,
): FixedOverlayRect {
  const zoom = getCumulativeCssZoom(element);
  const scale = zoom > 0 ? zoom : 1;
  const elRect = element.getBoundingClientRect();
  const rootRect = zoomRoot.getBoundingClientRect();
  const layoutW = element.offsetWidth;
  const layoutH = element.offsetHeight;
  const dimsAreLayout = !rectDimensionsLookVisual(elRect.width, layoutW, zoom);

  if (dimsAreLayout) {
    return {
      left: elRect.left - rootRect.left,
      top: elRect.top - rootRect.top,
      width: layoutW,
      height: layoutH,
    };
  }

  return {
    left: (elRect.left - rootRect.left) / scale,
    top: (elRect.top - rootRect.top) / scale,
    width: layoutW,
    height: layoutH,
  };
}

/** Layout width/height for style.width/height under ancestor CSS zoom. */
export function getElementLayoutSize(element: HTMLElement): { width: number; height: number } {
  const zoom = getCumulativeCssZoom(element);
  const rect = element.getBoundingClientRect();
  const layoutW = element.offsetWidth;
  const layoutH = element.offsetHeight;

  const width = rectDimensionsLookVisual(rect.width, layoutW, zoom)
    ? visualSizeToLayoutSize(rect.width, zoom)
    : layoutW;
  const height = rectDimensionsLookVisual(rect.height, layoutH, zoom)
    ? visualSizeToLayoutSize(rect.height, zoom)
    : layoutH;

  return {
    width: Math.max(1, Math.round(width)),
    height: Math.max(1, Math.round(height)),
  };
}

/** Overlay rect in the coordinate space matching `positioning`. */
export function getOverlayRect(element: Element): OverlayRect {
  if (element instanceof HTMLElement) {
    const zoomRoot = findExportPdfZoomRoot(element);
    if (zoomRoot) {
      return {
        ...getZoomRootLayoutOverlayRect(element, zoomRoot),
        positioning: 'zoom-root-absolute',
      };
    }
  }

  const rect = element.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
    positioning: 'viewport-fixed',
  };
}

/** @deprecated Use {@link getOverlayRect}. */
export function getFixedOverlayRect(element: Element): FixedOverlayRect {
  const { left, top, width, height } = getOverlayRect(element);
  return { left, top, width, height };
}

type OverlayRectListener = (rect: OverlayRect | null) => void;

/**
 * Keep an overlay aligned while the target scrolls, zooms, or resizes.
 * Re-reads layout/viewport rect every animation frame.
 */
export function subscribeFixedOverlayRect(
  getElement: () => Element | null,
  onRect: OverlayRectListener,
): () => void {
  let rafId = 0;
  let cancelled = false;
  let last: OverlayRect | null = null;

  const publish = (next: OverlayRect | null) => {
    if (
      last
      && next
      && last.left === next.left
      && last.top === next.top
      && last.width === next.width
      && last.height === next.height
      && last.positioning === next.positioning
    ) {
      return;
    }
    last = next;
    onRect(next);
  };

  const measure = () => {
    if (cancelled) return;
    const el = getElement();
    if (!el?.isConnected) {
      publish(null);
      return;
    }
    const box = getOverlayRect(el);
    if (box.width < 1 || box.height < 1) {
      publish(null);
      return;
    }
    publish(box);
  };

  const tick = () => {
    if (cancelled) return;
    measure();
    rafId = requestAnimationFrame(tick);
  };

  const schedule = () => {
    if (cancelled) return;
    measure();
  };

  rafId = requestAnimationFrame(tick);
  window.addEventListener('scroll', schedule, true);
  window.addEventListener('resize', schedule);
  window.visualViewport?.addEventListener('scroll', schedule);
  window.visualViewport?.addEventListener('resize', schedule);

  return () => {
    cancelled = true;
    cancelAnimationFrame(rafId);
    window.removeEventListener('scroll', schedule, true);
    window.removeEventListener('resize', schedule);
    window.visualViewport?.removeEventListener('scroll', schedule);
    window.visualViewport?.removeEventListener('resize', schedule);
  };
}

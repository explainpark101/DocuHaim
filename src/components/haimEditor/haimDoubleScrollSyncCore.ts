/**
 * Pure helpers for Haim dual-pane line-based scroll sync.
 * Kept free of React / DOM listeners so math + policy stay unit-testable.
 */

export const HAIM_SCROLL_ALIGN_PAD_PX = 32;
export const HAIM_SCROLL_SYNC_LOCK_RELEASE_MS = 32;
/**
 * Layout-settle retries after images/RO — keep short; typing must not
 * schedule these (see shouldDeferScrollLayoutResync).
 */
export const HAIM_SCROLL_IMAGE_RETRY_MS = [0, 120, 360] as const;
/** Fallback when `scrollend` is unavailable (Baseline Newly Available). */
export const HAIM_SCROLL_END_FALLBACK_MS = 100;

export type HaimScrollDir = 'up' | 'down';
export type HaimScrollSyncSource = 'none' | 'cm' | 'wysiwyg';

export type HaimDataLineMarker = {
  line0: number;
  top: number;
  height: number;
  el: HTMLElement;
};

export function detectHaimScrollDir(
  prevTop: number,
  nextTop: number,
): HaimScrollDir {
  return nextTop >= prevTop ? 'down' : 'up';
}

export function haimMaxScrollTop(scroller: HTMLElement): number {
  return Math.max(0, scroller.scrollHeight - scroller.clientHeight);
}

export function haimAnchorY(
  scroller: HTMLElement,
  dir: HaimScrollDir,
  padPx: number = HAIM_SCROLL_ALIGN_PAD_PX,
): number {
  if (dir === 'down') {
    return scroller.scrollTop + scroller.clientHeight - padPx;
  }
  return scroller.scrollTop + padPx;
}

/** scrollTop that places `contentBottom` on the bottom sync pad. */
export function haimScrollTopForBottomAlign(
  scroller: HTMLElement,
  contentBottom: number,
  padPx: number = HAIM_SCROLL_ALIGN_PAD_PX,
): number {
  return Math.max(0, contentBottom - (scroller.clientHeight - padPx));
}

export function haimMarkersContentBottom(
  markers: ReadonlyArray<Pick<HaimDataLineMarker, 'top' | 'height'>>,
): number | null {
  const last = markers[markers.length - 1];
  if (!last) return null;
  return last.top + last.height;
}

/**
 * When the driver has scrolled past last-content align into bottom padding,
 * map that overscroll progress onto the follower's padding range.
 */
export function haimComputeBottomOverscrollTarget(
  driverScrollTop: number,
  driverEnd: number,
  driverMax: number,
  followerEnd: number,
  followerMax: number,
): number | null {
  if (driverMax <= driverEnd + 0.5) return null;
  if (driverScrollTop <= driverEnd + 0.5) return null;
  const progress = Math.min(
    1,
    (driverScrollTop - driverEnd) / (driverMax - driverEnd),
  );
  if (followerMax <= followerEnd) return followerMax;
  return followerEnd + progress * (followerMax - followerEnd);
}

/**
 * Interpolate between neighboring CM line tops / WYSIWYG marker tops.
 * Shared by both mapping directions (t in [0, 1]).
 */
export function haimLerpSpan(
  value: number,
  a: number,
  b: number,
  aOut: number,
  bOut: number,
): number {
  const span = Math.max(1, b - a);
  const t = Math.max(0, Math.min(1, (value - a) / span));
  return aOut + t * (bOut - aOut);
}

/**
 * Defer expensive layout remasure / follower scroll writes while:
 * - content sync is suppressing scroll echoes, or
 * - the user is typing in either pane (focus).
 *
 * Guidance: keep scroll-path work cheap; run layout work after settle
 * (`scrollend` / idle). See modern-web-guidance `defer-work-until-scroll-ends`.
 */
export function shouldDeferScrollLayoutResync(options: {
  suppressed: boolean;
  tipTapFocused: boolean;
  cmFocused: boolean;
}): boolean {
  if (options.suppressed) return true;
  if (options.tipTapFocused || options.cmFocused) return true;
  return false;
}

/** Feature-detect scrollend (Baseline Newly Available since 2025-12). */
export function supportsScrollEndEvent(
  target: EventTarget | null | undefined,
): boolean {
  if (!target) return false;
  return 'onscrollend' in target;
}

/**
 * Attach scrollend with a debounced-scroll fallback for older engines.
 * Returns a disposer.
 */
export function bindScrollEnd(
  scroller: HTMLElement,
  onScrollEnd: () => void,
  fallbackMs: number = HAIM_SCROLL_END_FALLBACK_MS,
): () => void {
  const win = typeof window !== 'undefined' ? window : null;
  if (supportsScrollEndEvent(scroller) || supportsScrollEndEvent(win)) {
    scroller.addEventListener('scrollend', onScrollEnd, { passive: true });
    return () => {
      scroller.removeEventListener('scrollend', onScrollEnd);
    };
  }
  let timer: ReturnType<typeof setTimeout> | null = null;
  const onScroll = () => {
    if (timer != null) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      onScrollEnd();
    }, fallbackMs);
  };
  scroller.addEventListener('scroll', onScroll, { passive: true });
  return () => {
    if (timer != null) clearTimeout(timer);
    scroller.removeEventListener('scroll', onScroll);
  };
}

/**
 * Pure helpers for Haim dual-pane line-based scroll sync.
 * Kept free of React / DOM listeners so math + policy stay unit-testable.
 */

export const HAIM_SCROLL_ALIGN_PAD_PX = 32;
/**
 * Distance from max scroll that still counts as the bottom edge.
 * Matches the slack CodeMirror uses for "scrolled to bottom", so a
 * subpixel max and the 50dvh padding overscroll stay pinned together.
 */
export const HAIM_SCROLL_BOTTOM_EDGE_PX = 4;
/**
 * Frames to re-apply a scroller pin after a programmatic doc replace.
 * Selection collapse and editor measure can scroll the caret into view
 * on a later frame; this stays inside the dual-sync suppress window.
 */
export const HAIM_SCROLL_PIN_RETAIN_FRAMES = 4;
/**
 * How long a programmatic follower scroll is treated as an echo.
 * Long enough for a late `scroll` event on a busy frame, short enough that
 * a later real gesture is not swallowed. This replaces the old exclusive
 * lock, which dropped the other pane's scroll while it was held.
 */
export const HAIM_SCROLL_ECHO_TTL_MS = 250;
export const HAIM_SCROLL_ECHO_TOLERANCE_PX = 1.5;
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

export type HaimScrollerPin = {
  top: number;
  left: number;
  /** Pixels between the captured scrollTop and the captured max. */
  fromBottom: number;
  /** True when the scroller was sitting on its bottom edge. */
  atBottom: boolean;
};

/**
 * Snapshot scroll before a doc replace. `atBottom` follows the new max
 * so bottom overscroll (50dvh padding) is not left behind a taller doc.
 */
export function captureHaimScrollerPin(
  scrollTop: number,
  maxScroll: number,
  scrollLeft = 0,
): HaimScrollerPin {
  const fromBottom = maxScroll - scrollTop;
  const atBottom =
    maxScroll > 0 &&
    fromBottom <= HAIM_SCROLL_BOTTOM_EDGE_PX &&
    fromBottom >= -1;
  return {
    top: scrollTop,
    left: scrollLeft,
    fromBottom: Math.max(0, fromBottom),
    atBottom,
  };
}

/** Scroll top to restore for the scroller's current max. */
export function haimScrollerPinTop(pin: HaimScrollerPin, maxScroll: number): number {
  if (pin.atBottom) {
    return Math.max(0, maxScroll - Math.min(pin.fromBottom, maxScroll));
  }
  return Math.max(0, Math.min(maxScroll, pin.top));
}

type PinRetainJob = {
  gen: number;
  anchor: string;
  active: boolean;
};

const pinRetainJobs = new WeakMap<HTMLElement, PinRetainJob>();

/** True while a post-replace pin is still being reapplied. */
export function isHaimScrollerPinActive(scroller: HTMLElement): boolean {
  return pinRetainJobs.get(scroller)?.active === true;
}

/**
 * Reapply `pin` now and for a few frames. Disables overflow anchoring
 * on this scroller so the browser does not drag the view off the pin
 * after the replaced DOM loses its scroll anchor.
 */
export function retainHaimScrollerPin(
  scroller: HTMLElement,
  pin: HaimScrollerPin,
  frames: number = HAIM_SCROLL_PIN_RETAIN_FRAMES,
): void {
  const previous = pinRetainJobs.get(scroller);
  const gen = (previous?.gen ?? 0) + 1;
  const anchor = previous?.anchor ?? scroller.style.overflowAnchor;
  pinRetainJobs.set(scroller, { gen, anchor, active: true });
  scroller.style.overflowAnchor = 'none';

  const apply = () => {
    if (scroller.isConnected === false) return;
    const write = () => {
      const top = haimScrollerPinTop(pin, haimMaxScrollTop(scroller));
      if (Math.abs(scroller.scrollTop - top) >= 0.5) scroller.scrollTop = top;
      if (scroller.scrollLeft !== pin.left) scroller.scrollLeft = pin.left;
    };
    // Setting scrollTop can run an editor measure() on the scroll event
    // and nudge the position. A second write sees a stable height.
    write();
    write();
  };

  const finish = () => {
    const job = pinRetainJobs.get(scroller);
    if (!job || job.gen !== gen) return;
    job.active = false;
    if (scroller.isConnected !== false) scroller.style.overflowAnchor = job.anchor;
  };

  apply();
  if (frames <= 0 || typeof requestAnimationFrame !== 'function') {
    finish();
    return;
  }

  let left = frames;
  const step = () => {
    const job = pinRetainJobs.get(scroller);
    if (!job || job.gen !== gen) return;
    apply();
    left -= 1;
    if (left <= 0) {
      finish();
      return;
    }
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
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
export function haimBottomAlignScrollTop(
  clientHeight: number,
  contentBottom: number,
  padPx: number = HAIM_SCROLL_ALIGN_PAD_PX,
): number {
  return Math.max(0, contentBottom - (clientHeight - padPx));
}

/** scrollTop that places `contentBottom` on the bottom sync pad. */
export function haimScrollTopForBottomAlign(
  scroller: HTMLElement,
  contentBottom: number,
  padPx: number = HAIM_SCROLL_ALIGN_PAD_PX,
): number {
  return haimBottomAlignScrollTop(scroller.clientHeight, contentBottom, padPx);
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
export type HaimScrollEcho = {
  top: number;
  armedAt: number;
};

/**
 * Follower scrollTop for one sync step.
 * The driver's bottom edge (within a few pixels of max scroll) maps onto
 * the follower's bottom edge before any content math, so layout resync
 * cannot pull a pane up out of the padding overscroll.
 * Otherwise overscroll mapping wins when the driver is past its
 * content-align end; else align `mappedContentY` to the same edge `dir`
 * used on the driver. Returns null when there is nothing to apply.
 * Both panes call this with the roles swapped.
 */
export function planHaimFollowerScrollTop(options: {
  dir: HaimScrollDir;
  driverScrollTop: number;
  driverClientHeight: number;
  driverContentBottom: number | null;
  driverMaxScroll: number;
  followerClientHeight: number;
  followerContentBottom: number | null;
  followerMaxScroll: number;
  mappedContentY: number | null;
  padPx?: number;
}): number | null {
  const pad = options.padPx ?? HAIM_SCROLL_ALIGN_PAD_PX;
  if (options.driverMaxScroll > 0) {
    const fromBottom = options.driverMaxScroll - options.driverScrollTop;
    // Bottom edge wins over line mapping. A content-bottom estimate that
    // runs past max scroll makes the padding-range check fail, and the
    // follower then jumps up out of the 50dvh overscroll on layout resync.
    if (fromBottom <= HAIM_SCROLL_BOTTOM_EDGE_PX && fromBottom >= -1) {
      return Math.max(
        0,
        options.followerMaxScroll - Math.max(0, fromBottom),
      );
    }
  }
  const driverBottom = options.driverContentBottom;
  const followerBottom = options.followerContentBottom;
  if (driverBottom != null && followerBottom != null) {
    const overscroll = haimComputeBottomOverscrollTarget(
      options.driverScrollTop,
      haimBottomAlignScrollTop(options.driverClientHeight, driverBottom, pad),
      options.driverMaxScroll,
      haimBottomAlignScrollTop(
        options.followerClientHeight,
        followerBottom,
        pad,
      ),
      options.followerMaxScroll,
    );
    if (overscroll != null) {
      return Math.max(0, Math.min(options.followerMaxScroll, overscroll));
    }
  }
  if (options.mappedContentY == null) return null;
  const raw =
    options.dir === 'down'
      ? options.mappedContentY - (options.followerClientHeight - pad)
      : options.mappedContentY - pad;
  return Math.max(0, Math.min(options.followerMaxScroll, raw));
}

/**
 * Layout resync must not yank the focused pane. A user scroll of the other
 * pane still writes, even when the follower holds the caret.
 */
export function shouldWriteFollowerScroll(options: {
  userGesture: boolean;
  followerFocused: boolean;
}): boolean {
  if (options.userGesture) return true;
  return !options.followerFocused;
}

/**
 * Classify a pane scroll as the echo of our own write, or a user gesture.
 * A matching top inside the TTL is an echo. Anything else (no arm, expired
 * arm, or a different top) is a user gesture so the other pane still follows.
 */
export function classifyHaimPaneScroll(options: {
  top: number;
  echo: HaimScrollEcho | null;
  now: number;
  ttlMs?: number;
  tolerancePx?: number;
}): 'echo' | 'user' {
  const echo = options.echo;
  if (!echo) return 'user';
  const ttl = options.ttlMs ?? HAIM_SCROLL_ECHO_TTL_MS;
  if (options.now - echo.armedAt > ttl) return 'user';
  const tolerance = options.tolerancePx ?? HAIM_SCROLL_ECHO_TOLERANCE_PX;
  if (Math.abs(options.top - echo.top) <= tolerance) return 'echo';
  return 'user';
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

/** Ratio scroll when the marker cache is missing or dirty. No layout reads. */
export function haimProportionalScrollTop(
  driverScrollTop: number,
  driverMaxScroll: number,
  followerMaxScroll: number,
): number {
  if (driverMaxScroll <= 0 || followerMaxScroll <= 0) return 0;
  const ratio = Math.max(0, Math.min(1, driverScrollTop / driverMaxScroll));
  return Math.max(0, Math.min(followerMaxScroll, ratio * followerMaxScroll));
}

/**
 * Scroll frames may use a cache from the same generation only.
 * A miss returns null so the caller does not measure.
 */
export function markersForScrollFrame<T>(
  cache: readonly T[] | null,
  cacheGeneration: number,
  currentGeneration: number,
): readonly T[] | null {
  if (!cache) return null;
  if (cacheGeneration !== currentGeneration) return null;
  return cache;
}

export type HaimEstimatedBlock = {
  line0: number;
  blockNewlines: number;
};

/**
 * Stack block tops from newline estimates, replacing heights that were
 * measured in the viewport.
 */
export function estimateBlockMarkerStack(options: {
  blocks: readonly HaimEstimatedBlock[];
  lineHeight: number;
  measuredHeightByIndex?: ReadonlyMap<number, number>;
}): Array<{ line0: number; top: number; height: number }> {
  let top = 0;
  const lineHeight = Math.max(1, options.lineHeight);
  return options.blocks.map((block, index) => {
    const measured = options.measuredHeightByIndex?.get(index);
    const lines = Math.max(1, (block.blockNewlines || 0) + 1);
    const height = measured && measured > 0 ? measured : lines * lineHeight;
    const row = { line0: block.line0, top, height };
    top += height;
    return row;
  });
}

/** Shift the whole stack so one measured block keeps its real content Y. */
export function alignStackToMeasuredTop<T extends { top: number }>(options: {
  markers: T[];
  index: number;
  measuredTop: number;
}): void {
  const row = options.markers[options.index];
  if (!row) return;
  const delta = options.measuredTop - row.top;
  if (delta === 0) return;
  for (const marker of options.markers) marker.top += delta;
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

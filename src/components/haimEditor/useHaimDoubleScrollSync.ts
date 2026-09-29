/**
 * Line-based scroll sync between Haim source (CM) and WYSIWYG panes.
 *
 * Uses [data-line] markers on TipTap top-level blocks (see HaimSourceLine).
 * Scroll direction picks the viewport edge used as the sync anchor:
 * - scrolling down → newly appearing content at the bottom
 * - scrolling up   → newly appearing content at the top
 *
 * Image-aware: tall wiki/markdown images sit between sparse data-line
 * markers — we interpolate between neighboring markers, and re-sync when
 * images load / resize (async hydration).
 *
 * Bottom padding overscroll (both panes use ~50vh padding-bottom so the last
 * lines can reach mid-viewport): once the driver scrolls past aligning the
 * last content block, map that remaining progress onto the follower's
 * padding region so both panes enter overscroll together.
 *
 * While a pane has focus (typing), never write its scrollTop — cross-pane
 * content sync + layout echoes must not flicker the active editor.
 */

import { useEffect, useRef } from 'react';
import type { EditorView } from '@codemirror/view';

type Options = {
  enabled: boolean;
  /** TipTap / WYSIWYG scroll container (overflow:auto). */
  wysiwygScrollRef: React.RefObject<HTMLElement | null>;
  /** CodeMirror EditorView ref (uses .scrollDOM). */
  cmViewRef: React.MutableRefObject<EditorView | null>;
  /**
   * Bump when the CM EditorView is created or destroyed so listeners
   * re-bind to the live scrollDOM (SourcePane remounts without toggling enabled).
   */
  cmRevision?: number;
  /**
   * Ignore scroll/layout-driven sync until this timestamp (ms since epoch).
   * Set by dual content sync around doc replaces.
   */
  suppressScrollSyncUntilRef?: React.MutableRefObject<number>;
};

const SCROLL_ALIGN_PAD_PX = 32;
const SYNC_LOCK_RELEASE_MS = 32;
/**
 * Fewer layout-settle retries than before; RO/image storms are coalesced
 * into one scheduleImageResync window (see below).
 */
const IMAGE_RETRY_MS = [0, 100, 320] as const;

type ScrollDir = 'up' | 'down';
type SyncSource = 'none' | 'cm' | 'wysiwyg';

type DataLineMarker = {
  line0: number;
  top: number;
  height: number;
  el: HTMLElement;
};

function cmScroller(view: EditorView | null): HTMLElement | null {
  if (!view) return null;
  return view.scrollDOM ?? null;
}

function offsetTopWithinScroller(
  el: HTMLElement,
  scroller: HTMLElement,
  scrollerRect?: DOMRect,
  scrollTop?: number,
): number {
  const elRect = el.getBoundingClientRect();
  const sRect = scrollerRect ?? scroller.getBoundingClientRect();
  const top = scrollTop ?? scroller.scrollTop;
  return elRect.top - sRect.top + top;
}

function maxScrollTop(scroller: HTMLElement): number {
  return Math.max(0, scroller.scrollHeight - scroller.clientHeight);
}

function setScrollerTop(scroller: HTMLElement, top: number): void {
  const max = maxScrollTop(scroller);
  const next = Math.max(0, Math.min(max, top));
  if (Math.abs(scroller.scrollTop - next) < 0.5) return;
  scroller.scrollTop = next;
  if (Math.abs(scroller.scrollTop - next) > 1) {
    scroller.scrollTo(0, next);
  }
}

function detectScrollDir(prevTop: number, nextTop: number): ScrollDir {
  return nextTop >= prevTop ? 'down' : 'up';
}

/** scrollTop that places `contentBottom` on the bottom sync pad. */
function scrollTopForBottomAlign(
  scroller: HTMLElement,
  contentBottom: number,
): number {
  return Math.max(
    0,
    contentBottom - (scroller.clientHeight - SCROLL_ALIGN_PAD_PX),
  );
}

function cmContentBottom(view: EditorView): number {
  const last = view.state.doc.line(view.state.doc.lines);
  const block = view.lineBlockAt(last.from);
  return block.top + block.height;
}

function markersContentBottom(markers: DataLineMarker[]): number | null {
  const last = markers[markers.length - 1];
  if (!last) return null;
  return last.top + last.height;
}

/**
 * When the driver has scrolled past last-content align into bottom padding,
 * map that overscroll progress onto the follower's padding range.
 * Returns true when overscroll mapping was applied (skip line sync).
 */
function applyBottomOverscrollFromDriver(
  driver: HTMLElement,
  follower: HTMLElement,
  driverContentBottom: number,
  followerContentBottom: number,
): boolean {
  const driverEnd = scrollTopForBottomAlign(driver, driverContentBottom);
  const driverMax = maxScrollTop(driver);
  if (driverMax <= driverEnd + 0.5) return false;
  if (driver.scrollTop <= driverEnd + 0.5) return false;

  const progress = Math.min(
    1,
    (driver.scrollTop - driverEnd) / (driverMax - driverEnd),
  );
  const followerEnd = scrollTopForBottomAlign(follower, followerContentBottom);
  const followerMax = maxScrollTop(follower);
  const target =
    followerMax <= followerEnd
      ? followerMax
      : followerEnd + progress * (followerMax - followerEnd);
  setScrollerTop(follower, target);
  return true;
}

/** Viewport Y (in scroller content coords) used as the sync anchor. */
function anchorY(scroller: HTMLElement, dir: ScrollDir): number {
  if (dir === 'down') {
    return scroller.scrollTop + scroller.clientHeight - SCROLL_ALIGN_PAD_PX;
  }
  return scroller.scrollTop + SCROLL_ALIGN_PAD_PX;
}

/**
 * Scroll so that contentY sits at the same edge used by `dir`
 * (top pad when up, bottom pad when down).
 */
function scrollToAlignContentY(
  scroller: HTMLElement,
  contentY: number,
  dir: ScrollDir,
): void {
  if (dir === 'down') {
    setScrollerTop(
      scroller,
      contentY - (scroller.clientHeight - SCROLL_ALIGN_PAD_PX),
    );
    return;
  }
  setScrollerTop(scroller, contentY - SCROLL_ALIGN_PAD_PX);
}

/**
 * Outermost [data-line] blocks under the WYSIWYG root
 * (skip nested table cells / figures that also carry data-line).
 */
function queryOutermostDataLineBlocks(root: Element): HTMLElement[] {
  const all: HTMLElement[] = [];
  for (const node of root.querySelectorAll('[data-line]')) {
    if (node instanceof HTMLElement) all.push(node);
  }
  const outermost = all.filter((el) => {
    let parent = el.parentElement;
    while (parent && parent !== root) {
      if (parent.hasAttribute('data-line')) return false;
      parent = parent.parentElement;
    }
    return true;
  });
  return outermost.length > 0 ? outermost : all;
}

function collectDataLineMarkers(
  root: Element,
  scroller: HTMLElement,
): DataLineMarker[] {
  const markers: DataLineMarker[] = [];
  const scrollerRect = scroller.getBoundingClientRect();
  const scrollTop = scroller.scrollTop;
  for (const el of queryOutermostDataLineBlocks(root)) {
    const line0 = Number(el.getAttribute('data-line'));
    if (!Number.isFinite(line0)) continue;
    markers.push({
      line0,
      top: offsetTopWithinScroller(el, scroller, scrollerRect, scrollTop),
      height: Math.max(1, el.offsetHeight),
      el,
    });
  }
  markers.sort((a, b) => a.line0 - b.line0 || a.top - b.top);
  return markers;
}

function markersCacheValid(markers: DataLineMarker[] | null): markers is DataLineMarker[] {
  if (markers == null) return false;
  if (markers.length === 0) return true;
  return markers.every((m) => m.el.isConnected);
}

function cmLineTop(view: EditorView, line0: number): number {
  const lineNumber = Math.min(
    Math.max(1, line0 + 1),
    view.state.doc.lines,
  );
  return view.lineBlockAt(view.state.doc.line(lineNumber).from).top;
}

/**
 * Interpolate between neighboring data-line markers so tall images (one
 * source line, large WYSIWYG height) scroll smoothly against CM.
 */
function mapCmYToWysiwygContentY(
  view: EditorView,
  markers: DataLineMarker[],
  cmY: number,
): number | null {
  if (markers.length === 0) return null;

  const lineBlock = view.lineBlockAtHeight(cmY);
  const line0 = view.state.doc.lineAt(lineBlock.from).number - 1;

  let lo = 0;
  for (let i = 0; i < markers.length; i += 1) {
    const m = markers[i];
    if (m && m.line0 <= line0) lo = i;
  }
  const a = markers[lo];
  if (!a) return null;
  const b = markers[lo + 1];

  if (!b) {
    // Past last marker — progress within the last block by CM line fraction.
    const within =
      lineBlock.height > 0
        ? Math.max(0, Math.min(1, (cmY - lineBlock.top) / lineBlock.height))
        : 0;
    return a.top + a.height * within;
  }

  const aCmTop = cmLineTop(view, a.line0);
  const bCmTop = cmLineTop(view, b.line0);
  const span = Math.max(1, bCmTop - aCmTop);
  const t = Math.max(0, Math.min(1, (cmY - aCmTop) / span));
  return a.top + t * (b.top - a.top);
}

function mapWysiwygYToCmContentY(
  view: EditorView,
  markers: DataLineMarker[],
  wysiwygY: number,
): number | null {
  if (markers.length === 0) return null;

  let lo = 0;
  for (let i = 0; i < markers.length; i += 1) {
    const m = markers[i];
    if (m && m.top <= wysiwygY) lo = i;
  }
  const a = markers[lo];
  if (!a) return null;
  const b = markers[lo + 1];

  if (!b) {
    const within = Math.max(
      0,
      Math.min(1, (wysiwygY - a.top) / a.height),
    );
    const block = view.lineBlockAt(
      view.state.doc.line(
        Math.min(Math.max(1, a.line0 + 1), view.state.doc.lines),
      ).from,
    );
    return block.top + block.height * within;
  }

  const span = Math.max(1, b.top - a.top);
  const t = Math.max(0, Math.min(1, (wysiwygY - a.top) / span));
  const aCmTop = cmLineTop(view, a.line0);
  const bCmTop = cmLineTop(view, b.line0);
  return aCmTop + t * (bCmTop - aCmTop);
}

function isImageEventTarget(target: EventTarget | null): boolean {
  return target instanceof HTMLImageElement;
}

function isWysiwygFocused(wysiwyg: HTMLElement): boolean {
  const ae = document.activeElement;
  return ae instanceof Node && wysiwyg.contains(ae);
}

function isCmFocused(view: EditorView): boolean {
  return view.hasFocus;
}

function isScrollSyncSuppressed(
  untilRef: React.MutableRefObject<number> | undefined,
): boolean {
  if (!untilRef) return false;
  return Date.now() < untilRef.current;
}

export function useHaimDoubleScrollSync({
  enabled,
  wysiwygScrollRef,
  cmViewRef,
  cmRevision = 0,
  suppressScrollSyncUntilRef,
}: Options): void {
  const syncingFromRef = useRef<SyncSource>('none');
  const lockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!enabled) return undefined;

    let disposed = false;
    let detach: (() => void) | null = null;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;
    let attachedWysiwyg: HTMLElement | null = null;
    let attachedCm: HTMLElement | null = null;
    let cmSyncRaf = 0;
    let wysiwygSyncRaf = 0;
    let lastCmTop = 0;
    let lastWysiwygTop = 0;
    let lastDir: ScrollDir = 'up';
    let lastDriver: Exclude<SyncSource, 'none'> = 'cm';
    let imageRetryTimers: ReturnType<typeof setTimeout>[] = [];
    let resizeObserver: ResizeObserver | null = null;
    /** Cached [data-line] geometry — invalidated on layout/image/content changes. */
    let markerCache: DataLineMarker[] | null = null;
    let imageResyncCoalesceRaf = 0;

    const invalidateMarkerCache = () => {
      markerCache = null;
    };

    const getMarkers = (wysiwyg: HTMLElement): DataLineMarker[] => {
      if (markersCacheValid(markerCache)) return markerCache;
      markerCache = collectDataLineMarkers(wysiwyg, wysiwyg);
      return markerCache;
    };

    const clearRetry = () => {
      if (retryTimer != null) {
        clearTimeout(retryTimer);
        retryTimer = null;
      }
    };

    const clearImageRetries = () => {
      for (const t of imageRetryTimers) clearTimeout(t);
      imageRetryTimers = [];
    };

    const clearLockTimer = () => {
      if (lockTimerRef.current != null) {
        clearTimeout(lockTimerRef.current);
        lockTimerRef.current = null;
      }
    };

    const releaseSyncLock = (source: Exclude<SyncSource, 'none'>) => {
      clearLockTimer();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          lockTimerRef.current = setTimeout(() => {
            lockTimerRef.current = null;
            if (syncingFromRef.current === source) {
              syncingFromRef.current = 'none';
            }
          }, SYNC_LOCK_RELEASE_MS);
        });
      });
    };

    /** CM scrolled → drive WYSIWYG (marker-pair interpolation + padding overscroll). */
    const syncWysiwygFromCm = (dir: ScrollDir) => {
      const view = cmViewRef.current;
      const wysiwyg = wysiwygScrollRef.current;
      if (!view || !wysiwyg) return;
      // Never move the pane the user is typing in.
      if (isWysiwygFocused(wysiwyg)) return;

      const scrollDom = view.scrollDOM;
      const markers = getMarkers(wysiwyg);
      const wysiwygBottom = markersContentBottom(markers);
      if (
        wysiwygBottom != null &&
        applyBottomOverscrollFromDriver(
          scrollDom,
          wysiwyg,
          cmContentBottom(view),
          wysiwygBottom,
        )
      ) {
        lastWysiwygTop = wysiwyg.scrollTop;
        return;
      }

      const y = anchorY(scrollDom, dir);
      const contentY = mapCmYToWysiwygContentY(view, markers, y);
      if (contentY == null) return;

      scrollToAlignContentY(wysiwyg, contentY, dir);
      lastWysiwygTop = wysiwyg.scrollTop;
    };

    /** WYSIWYG scrolled → drive CM (marker-pair interpolation + padding overscroll). */
    const syncCmFromWysiwyg = (dir: ScrollDir) => {
      const view = cmViewRef.current;
      const wysiwyg = wysiwygScrollRef.current;
      if (!view || !wysiwyg) return;
      // Never move the pane the user is typing in.
      if (isCmFocused(view)) return;

      const scrollDom = view.scrollDOM;
      const markers = getMarkers(wysiwyg);
      const wysiwygBottom = markersContentBottom(markers);
      if (
        wysiwygBottom != null &&
        applyBottomOverscrollFromDriver(
          wysiwyg,
          scrollDom,
          wysiwygBottom,
          cmContentBottom(view),
        )
      ) {
        lastCmTop = scrollDom.scrollTop;
        return;
      }

      const y = anchorY(wysiwyg, dir);
      const contentY = mapWysiwygYToCmContentY(view, markers, y);
      if (contentY == null) return;

      scrollToAlignContentY(scrollDom, contentY, dir);
      lastCmTop = scrollDom.scrollTop;
    };

    const applyDriverSync = (driver: Exclude<SyncSource, 'none'>, dir: ScrollDir) => {
      if (disposed) return;
      if (isScrollSyncSuppressed(suppressScrollSyncUntilRef)) return;
      syncingFromRef.current = driver;
      try {
        if (driver === 'cm') syncWysiwygFromCm(dir);
        else syncCmFromWysiwyg(dir);
      } finally {
        releaseSyncLock(driver);
      }
    };

    /** After images settle, re-align using the last active driver + direction. */
    const resyncAfterLayout = () => {
      if (disposed) return;
      if (syncingFromRef.current !== 'none') return;
      if (isScrollSyncSuppressed(suppressScrollSyncUntilRef)) return;
      applyDriverSync(lastDriver, lastDir);
    };

    /**
     * Coalesce RO / image-load storms into one rAF, then a short retry chain.
     * Always invalidate markers so the next sync remeasures.
     */
    const scheduleImageResync = () => {
      if (disposed) return;
      invalidateMarkerCache();
      if (imageResyncCoalesceRaf) return;
      imageResyncCoalesceRaf = requestAnimationFrame(() => {
        imageResyncCoalesceRaf = 0;
        if (disposed) return;
        clearImageRetries();
        for (const ms of IMAGE_RETRY_MS) {
          imageRetryTimers.push(
            setTimeout(() => {
              invalidateMarkerCache();
              resyncAfterLayout();
            }, ms),
          );
        }
      });
    };

    const onCmScroll = () => {
      if (disposed) return;
      if (syncingFromRef.current === 'wysiwyg') return;
      const view = cmViewRef.current;
      if (!view) return;
      const top = view.scrollDOM.scrollTop;
      const dir = detectScrollDir(lastCmTop, top);
      lastCmTop = top;
      // Still track position during suppress / focused-target skips.
      if (isScrollSyncSuppressed(suppressScrollSyncUntilRef)) return;
      lastDir = dir;
      lastDriver = 'cm';
      applyDriverSync('cm', dir);
    };

    const onWysiwygScroll = () => {
      if (disposed) return;
      if (syncingFromRef.current === 'cm') return;
      const wysiwyg = wysiwygScrollRef.current;
      if (!wysiwyg) return;
      const top = wysiwyg.scrollTop;
      const dir = detectScrollDir(lastWysiwygTop, top);
      lastWysiwygTop = top;
      if (isScrollSyncSuppressed(suppressScrollSyncUntilRef)) return;
      lastDir = dir;
      lastDriver = 'wysiwyg';
      applyDriverSync('wysiwyg', dir);
    };

    const requestCmSync = () => {
      if (disposed || syncingFromRef.current === 'wysiwyg') return;
      if (cmSyncRaf) return;
      cmSyncRaf = requestAnimationFrame(() => {
        cmSyncRaf = 0;
        onCmScroll();
      });
    };

    const requestWysiwygSync = () => {
      if (disposed || syncingFromRef.current === 'cm') return;
      if (wysiwygSyncRaf) return;
      wysiwygSyncRaf = requestAnimationFrame(() => {
        wysiwygSyncRaf = 0;
        onWysiwygScroll();
      });
    };

    const onImageSettled = (event: Event) => {
      if (!isImageEventTarget(event.target)) return;
      const wysiwyg = wysiwygScrollRef.current;
      if (!wysiwyg || !(event.target instanceof Node)) return;
      if (!wysiwyg.contains(event.target)) return;
      scheduleImageResync();
    };

    const attach = () => {
      if (disposed) return;
      const wysiwyg = wysiwygScrollRef.current;
      const cm = cmScroller(cmViewRef.current);
      if (!wysiwyg || !cm) {
        clearRetry();
        retryTimer = setTimeout(attach, 80);
        return;
      }

      if (wysiwyg === attachedWysiwyg && cm === attachedCm) return;

      detach?.();
      detach = null;

      const onCm = () => requestCmSync();
      const onWysiwyg = () => requestWysiwygSync();

      wysiwyg.addEventListener('scroll', onWysiwyg, { passive: true });
      cm.addEventListener('scroll', onCm, { passive: true });
      // Wiki / markdown images hydrate async — re-align when they settle.
      wysiwyg.addEventListener('load', onImageSettled, true);
      wysiwyg.addEventListener('error', onImageSettled, true);

      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => {
          scheduleImageResync();
        });
        // Observe content (not the scroller box) so image height changes fire.
        const content =
          wysiwyg.querySelector('.ProseMirror') ?? wysiwyg.firstElementChild;
        if (content instanceof Element) {
          resizeObserver.observe(content);
        } else {
          resizeObserver.observe(wysiwyg);
        }
      }

      attachedWysiwyg = wysiwyg;
      attachedCm = cm;
      lastCmTop = cm.scrollTop;
      lastWysiwygTop = wysiwyg.scrollTop;
      lastDir = 'up';
      lastDriver = 'cm';

      detach = () => {
        wysiwyg.removeEventListener('scroll', onWysiwyg);
        cm.removeEventListener('scroll', onCm);
        wysiwyg.removeEventListener('load', onImageSettled, true);
        wysiwyg.removeEventListener('error', onImageSettled, true);
        resizeObserver?.disconnect();
        resizeObserver = null;
        attachedWysiwyg = null;
        attachedCm = null;
      };

      // Align once on bind — treat as upward (top-edge) for a stable initial match.
      applyDriverSync('cm', 'up');
      lastWysiwygTop = wysiwyg.scrollTop;
      // Images may still be placeholders — retry after hydration.
      scheduleImageResync();
    };

    attach();

    return () => {
      disposed = true;
      clearRetry();
      clearImageRetries();
      clearLockTimer();
      if (cmSyncRaf) cancelAnimationFrame(cmSyncRaf);
      if (wysiwygSyncRaf) cancelAnimationFrame(wysiwygSyncRaf);
      if (imageResyncCoalesceRaf) cancelAnimationFrame(imageResyncCoalesceRaf);
      detach?.();
      syncingFromRef.current = 'none';
      markerCache = null;
    };
  }, [enabled, wysiwygScrollRef, cmViewRef, cmRevision, suppressScrollSyncUntilRef]);
}

/**
 * Line-based scroll sync between Haim source (CM) and WYSIWYG panes.
 *
 * Uses [data-line] markers on TipTap top-level blocks (see HaimSourceLine).
 * Scroll direction picks the viewport edge used as the sync anchor:
 * - scrolling down → newly appearing content at the bottom
 * - scrolling up   → newly appearing content at the top
 *
 * Perf contract (dual pane):
 * - Scroll path: rAF-coalesce + warm marker cache only (no full remasure).
 * - Layout path (RO / images): invalidate cache; defer remasure+resync until
 *   scrollend / idle when typing or content-sync suppress is active
 *   (modern-web-guidance: defer-work-until-scroll-ends).
 * - Never write scrollTop on the focused (typing) pane.
 */

import { useEffect, useRef } from 'react';
import type { EditorView } from '@codemirror/view';
import {
  HAIM_SCROLL_ALIGN_PAD_PX,
  HAIM_SCROLL_IMAGE_RETRY_MS,
  HAIM_SCROLL_SYNC_LOCK_RELEASE_MS,
  bindScrollEnd,
  detectHaimScrollDir,
  haimAnchorY,
  haimComputeBottomOverscrollTarget,
  haimLerpSpan,
  haimMarkersContentBottom,
  haimMaxScrollTop,
  haimScrollTopForBottomAlign,
  shouldDeferScrollLayoutResync,
  type HaimDataLineMarker,
  type HaimScrollDir,
  type HaimScrollSyncSource,
} from '@/components/haimEditor/haimDoubleScrollSyncCore';

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

type SyncSource = HaimScrollSyncSource;
type ScrollDir = HaimScrollDir;
type DataLineMarker = HaimDataLineMarker;

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

function setScrollerTop(scroller: HTMLElement, top: number): void {
  const max = haimMaxScrollTop(scroller);
  const next = Math.max(0, Math.min(max, top));
  if (Math.abs(scroller.scrollTop - next) < 0.5) return;
  scroller.scrollTop = next;
  if (Math.abs(scroller.scrollTop - next) > 1) {
    scroller.scrollTo(0, next);
  }
}

function cmContentBottom(view: EditorView): number {
  const last = view.state.doc.line(view.state.doc.lines);
  const block = view.lineBlockAt(last.from);
  return block.top + block.height;
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
  const driverEnd = haimScrollTopForBottomAlign(driver, driverContentBottom);
  const driverMax = haimMaxScrollTop(driver);
  const followerEnd = haimScrollTopForBottomAlign(
    follower,
    followerContentBottom,
  );
  const followerMax = haimMaxScrollTop(follower);
  const target = haimComputeBottomOverscrollTarget(
    driver.scrollTop,
    driverEnd,
    driverMax,
    followerEnd,
    followerMax,
  );
  if (target == null) return false;
  setScrollerTop(follower, target);
  return true;
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
      contentY - (scroller.clientHeight - HAIM_SCROLL_ALIGN_PAD_PX),
    );
    return;
  }
  setScrollerTop(scroller, contentY - HAIM_SCROLL_ALIGN_PAD_PX);
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
    const within =
      lineBlock.height > 0
        ? Math.max(0, Math.min(1, (cmY - lineBlock.top) / lineBlock.height))
        : 0;
    return a.top + a.height * within;
  }

  return haimLerpSpan(
    cmY,
    cmLineTop(view, a.line0),
    cmLineTop(view, b.line0),
    a.top,
    b.top,
  );
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

  return haimLerpSpan(
    wysiwygY,
    a.top,
    b.top,
    cmLineTop(view, a.line0),
    cmLineTop(view, b.line0),
  );
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
    /** Layout dirty while typing/suppress — flush on scrollend / idle. */
    let layoutDirty = false;
    let unbindScrollEnds: (() => void) | null = null;

    const invalidateMarkerCache = () => {
      markerCache = null;
    };

    const getMarkers = (wysiwyg: HTMLElement): DataLineMarker[] => {
      if (
        markerCache != null &&
        (markerCache.length === 0 ||
          markerCache.every((m) => m.el.isConnected))
      ) {
        return markerCache;
      }
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

    const readDeferFlags = () => {
      const view = cmViewRef.current;
      const wysiwyg = wysiwygScrollRef.current;
      return {
        suppressed: isScrollSyncSuppressed(suppressScrollSyncUntilRef),
        tipTapFocused: Boolean(wysiwyg && isWysiwygFocused(wysiwyg)),
        cmFocused: Boolean(view && isCmFocused(view)),
      };
    };

    /**
     * One rAF then a short timeout — enough for echo scroll events without
     * nesting a second rAF on every synced frame (was a dual-pane stutter source).
     */
    const releaseSyncLock = (source: Exclude<SyncSource, 'none'>) => {
      clearLockTimer();
      requestAnimationFrame(() => {
        if (disposed) return;
        lockTimerRef.current = setTimeout(() => {
          lockTimerRef.current = null;
          if (syncingFromRef.current === source) {
            syncingFromRef.current = 'none';
          }
        }, HAIM_SCROLL_SYNC_LOCK_RELEASE_MS);
      });
    };

    /** CM scrolled → drive WYSIWYG (marker-pair interpolation + padding overscroll). */
    const syncWysiwygFromCm = (dir: ScrollDir) => {
      const view = cmViewRef.current;
      const wysiwyg = wysiwygScrollRef.current;
      if (!view || !wysiwyg) return;
      if (isWysiwygFocused(wysiwyg)) return;

      const scrollDom = view.scrollDOM;
      const markers = getMarkers(wysiwyg);
      const wysiwygBottom = haimMarkersContentBottom(markers);
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

      const y = haimAnchorY(scrollDom, dir);
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
      if (isCmFocused(view)) return;

      const scrollDom = view.scrollDOM;
      const markers = getMarkers(wysiwyg);
      const wysiwygBottom = haimMarkersContentBottom(markers);
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

      const y = haimAnchorY(wysiwyg, dir);
      const contentY = mapWysiwygYToCmContentY(view, markers, y);
      if (contentY == null) return;

      scrollToAlignContentY(scrollDom, contentY, dir);
      lastCmTop = scrollDom.scrollTop;
    };

    const applyDriverSync = (
      driver: Exclude<SyncSource, 'none'>,
      dir: ScrollDir,
    ) => {
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
      if (shouldDeferScrollLayoutResync(readDeferFlags())) return;
      applyDriverSync(lastDriver, lastDir);
    };

    /**
     * Coalesce RO / image-load storms into one rAF, then a short retry chain.
     * Call only when not deferred (typing / content-sync suppress).
     */
    const runLayoutResyncChain = () => {
      if (disposed) return;
      if (shouldDeferScrollLayoutResync(readDeferFlags())) return;
      layoutDirty = false;
      if (imageResyncCoalesceRaf) return;
      imageResyncCoalesceRaf = requestAnimationFrame(() => {
        imageResyncCoalesceRaf = 0;
        if (disposed) return;
        if (shouldDeferScrollLayoutResync(readDeferFlags())) {
          layoutDirty = true;
          return;
        }
        clearImageRetries();
        for (const ms of HAIM_SCROLL_IMAGE_RETRY_MS) {
          imageRetryTimers.push(
            setTimeout(() => {
              invalidateMarkerCache();
              resyncAfterLayout();
            }, ms),
          );
        }
      });
    };

    /**
     * Always invalidate markers on layout change. While typing/suppress, only
     * mark dirty — remasure happens on next scroll or scrollend flush.
     */
    const scheduleImageResync = () => {
      if (disposed) return;
      layoutDirty = true;
      invalidateMarkerCache();
      if (shouldDeferScrollLayoutResync(readDeferFlags())) return;
      runLayoutResyncChain();
    };

    /** Flush deferred layout work once scrolling rests (or idle fallback). */
    const flushDeferredLayout = () => {
      if (disposed || !layoutDirty) return;
      if (shouldDeferScrollLayoutResync(readDeferFlags())) return;
      runLayoutResyncChain();
    };

    const onCmScroll = () => {
      if (disposed) return;
      if (syncingFromRef.current === 'wysiwyg') return;
      const view = cmViewRef.current;
      if (!view) return;
      const top = view.scrollDOM.scrollTop;
      const dir = detectHaimScrollDir(lastCmTop, top);
      lastCmTop = top;
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
      const dir = detectHaimScrollDir(lastWysiwygTop, top);
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
      wysiwyg.addEventListener('load', onImageSettled, true);
      wysiwyg.addEventListener('error', onImageSettled, true);

      const unbindWysiwygEnd = bindScrollEnd(wysiwyg, flushDeferredLayout);
      const unbindCmEnd = bindScrollEnd(cm, flushDeferredLayout);
      unbindScrollEnds = () => {
        unbindWysiwygEnd();
        unbindCmEnd();
      };

      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => {
          scheduleImageResync();
        });
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
        unbindScrollEnds?.();
        unbindScrollEnds = null;
        resizeObserver?.disconnect();
        resizeObserver = null;
        attachedWysiwyg = null;
        attachedCm = null;
      };

      applyDriverSync('cm', 'up');
      lastWysiwygTop = wysiwyg.scrollTop;
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
      layoutDirty = false;
    };
  }, [
    enabled,
    wysiwygScrollRef,
    cmViewRef,
    cmRevision,
    suppressScrollSyncUntilRef,
  ]);
}

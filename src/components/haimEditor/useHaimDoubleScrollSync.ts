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
 * - Layout resync never writes scrollTop on the focused pane.
 * - A user scroll still moves the other pane when that pane has focus.
 * - Programmatic follower writes are echo-tagged so they do not reverse-drive.
 */

import { useEffect, useRef } from 'react';
import type { EditorView } from '@codemirror/view';
import {
  HAIM_SCROLL_ECHO_TTL_MS,
  HAIM_SCROLL_IMAGE_RETRY_MS,
  alignStackToMeasuredTop,
  bindScrollEnd,
  classifyHaimPaneScroll,
  detectHaimScrollDir,
  estimateBlockMarkerStack,
  haimAnchorY,
  haimLerpSpan,
  haimMarkersContentBottom,
  haimMaxScrollTop,
  haimProportionalScrollTop,
  isHaimScrollerPinActive,
  markersForScrollFrame,
  planHaimFollowerScrollTop,
  shouldDeferScrollLayoutResync,
  shouldWriteFollowerScroll,
  type HaimDataLineMarker,
  type HaimEstimatedBlock,
  type HaimScrollDir,
  type HaimScrollEcho,
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
  /** Source-line index. Scroll frames never query the DOM for this. */
  readSourceLineEntries?: () => ReadonlyArray<{
    line0: number;
    blockNewlines: number;
    pos: number;
  }>;
  /** nodeDOM for a top-level block. Used on scrollend only. */
  blockElementAt?: (pos: number) => HTMLElement | null;
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
  readSourceLineEntries,
  blockElementAt,
}: Options): void {
  const readEntriesRef = useRef(readSourceLineEntries);
  const blockElementAtRef = useRef(blockElementAt);
  readEntriesRef.current = readSourceLineEntries;
  blockElementAtRef.current = blockElementAt;

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
    let markerGeneration = 0;
    let cacheGeneration = -1;
    let imageResyncCoalesceRaf = 0;
    /** Layout dirty while typing/suppress — flush on scrollend / idle. */
    let layoutDirty = false;
    let unbindScrollEnds: (() => void) | null = null;
    /** True while applying a follower write (sync scroll listeners re-enter). */
    let applying = false;
    let cmEcho: HaimScrollEcho | null = null;
    let wysiwygEcho: HaimScrollEcho | null = null;
    let cmEchoTimer: ReturnType<typeof setTimeout> | null = null;
    let wysiwygEchoTimer: ReturnType<typeof setTimeout> | null = null;

    const invalidateMarkerCache = () => {
      markerGeneration += 1;
      markerCache = null;
      cacheGeneration = -1;
    };

    const measureMarkers = (wysiwyg: HTMLElement): DataLineMarker[] => {
      const entries = readEntriesRef.current?.() ?? [];
      if (entries.length === 0) return [];
      const parsed = Number.parseFloat(getComputedStyle(wysiwyg).lineHeight);
      const lineHeight = Number.isFinite(parsed) && parsed > 0 ? parsed : 24;
      const blocks: HaimEstimatedBlock[] = entries.map((entry) => ({
        line0: entry.line0,
        blockNewlines: entry.blockNewlines,
      }));
      const estimated = estimateBlockMarkerStack({ blocks, lineHeight });
      const scrollTop = wysiwyg.scrollTop;
      const overscan = wysiwyg.clientHeight;
      const viewTop = scrollTop - overscan;
      const viewBottom = scrollTop + overscan * 2;
      const measuredHeights = new Map<number, number>();
      let anchorIndex = -1;
      let anchorTop = 0;
      for (let i = 0; i < estimated.length; i += 1) {
        const row = estimated[i];
        const entry = entries[i];
        if (!row || !entry) continue;
        if (row.top + row.height < viewTop || row.top > viewBottom) continue;
        const el = blockElementAtRef.current?.(entry.pos) ?? null;
        if (!el) continue;
        const top = offsetTopWithinScroller(el, wysiwyg);
        measuredHeights.set(i, Math.max(1, el.offsetHeight));
        if (anchorIndex < 0) {
          anchorIndex = i;
          anchorTop = top;
        }
      }
      const stacked = estimateBlockMarkerStack({
        blocks,
        lineHeight,
        measuredHeightByIndex: measuredHeights,
      });
      if (anchorIndex >= 0) {
        alignStackToMeasuredTop({
          markers: stacked,
          index: anchorIndex,
          measuredTop: anchorTop,
        });
      }
      return stacked.map((row) => ({
        line0: row.line0,
        top: row.top,
        height: row.height,
        el: wysiwyg,
      }));
    };

    const rememberMarkers = (wysiwyg: HTMLElement): DataLineMarker[] => {
      const measured = measureMarkers(wysiwyg);
      markerCache = measured;
      cacheGeneration = markerGeneration;
      return measured;
    };

    /** Scroll rAF: cached content-Y only. Dirty cache → null (ratio scroll). */
    const getMarkers = (_wysiwyg: HTMLElement): DataLineMarker[] | null => {
      const cached = markersForScrollFrame(
        markerCache,
        cacheGeneration,
        markerGeneration,
      );
      if (!cached) return null;
      return cached as DataLineMarker[];
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

    const clearEchoTimers = () => {
      if (cmEchoTimer != null) {
        clearTimeout(cmEchoTimer);
        cmEchoTimer = null;
      }
      if (wysiwygEchoTimer != null) {
        clearTimeout(wysiwygEchoTimer);
        wysiwygEchoTimer = null;
      }
    };

    const armEcho = (pane: Exclude<SyncSource, 'none'>, top: number) => {
      const echo: HaimScrollEcho = { top, armedAt: Date.now() };
      if (pane === 'cm') {
        cmEcho = echo;
        if (cmEchoTimer != null) clearTimeout(cmEchoTimer);
        cmEchoTimer = setTimeout(() => {
          cmEchoTimer = null;
          if (cmEcho === echo) cmEcho = null;
        }, HAIM_SCROLL_ECHO_TTL_MS);
        return;
      }
      wysiwygEcho = echo;
      if (wysiwygEchoTimer != null) clearTimeout(wysiwygEchoTimer);
      wysiwygEchoTimer = setTimeout(() => {
        wysiwygEchoTimer = null;
        if (wysiwygEcho === echo) wysiwygEcho = null;
      }, HAIM_SCROLL_ECHO_TTL_MS);
    };

    const writeFollower = (
      pane: Exclude<SyncSource, 'none'>,
      scroller: HTMLElement,
      top: number,
    ) => {
      // A doc replace is re-pinning this scroller. A layout resync in the
      // same frames would pull bottom overscroll back up to the caret.
      if (isHaimScrollerPinActive(scroller)) return;
      const max = haimMaxScrollTop(scroller);
      const next = Math.max(0, Math.min(max, top));
      if (Math.abs(scroller.scrollTop - next) < 0.5) return;
      // Arm before the write so a synchronous scroll listener sees the echo.
      armEcho(pane, next);
      setScrollerTop(scroller, next);
      const actual = scroller.scrollTop;
      if (Math.abs(actual - next) > 0.5) armEcho(pane, actual);
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

    /** CM scrolled → drive WYSIWYG (marker-pair interpolation + padding overscroll). */
    const syncWysiwygFromCm = (dir: ScrollDir, userGesture: boolean) => {
      const view = cmViewRef.current;
      const wysiwyg = wysiwygScrollRef.current;
      if (!view || !wysiwyg) return;
      if (
        !shouldWriteFollowerScroll({
          userGesture,
          followerFocused: isWysiwygFocused(wysiwyg),
        })
      ) {
        return;
      }

      const scrollDom = view.scrollDOM;
      const markers = getMarkers(wysiwyg);
      if (!markers) {
        writeFollower(
          'wysiwyg',
          wysiwyg,
          haimProportionalScrollTop(
            scrollDom.scrollTop,
            haimMaxScrollTop(scrollDom),
            haimMaxScrollTop(wysiwyg),
          ),
        );
        lastWysiwygTop = wysiwyg.scrollTop;
        return;
      }
      const wysiwygBottom = haimMarkersContentBottom(markers);
      const anchorY = haimAnchorY(scrollDom, dir);
      const top = planHaimFollowerScrollTop({
        dir,
        driverScrollTop: scrollDom.scrollTop,
        driverClientHeight: scrollDom.clientHeight,
        driverContentBottom: cmContentBottom(view),
        driverMaxScroll: haimMaxScrollTop(scrollDom),
        followerClientHeight: wysiwyg.clientHeight,
        followerContentBottom: wysiwygBottom,
        followerMaxScroll: haimMaxScrollTop(wysiwyg),
        mappedContentY: mapCmYToWysiwygContentY(view, markers, anchorY),
      });
      if (top == null) return;
      writeFollower('wysiwyg', wysiwyg, top);
      lastWysiwygTop = wysiwyg.scrollTop;
    };

    /** WYSIWYG scrolled → drive CM (marker-pair interpolation + padding overscroll). */
    const syncCmFromWysiwyg = (dir: ScrollDir, userGesture: boolean) => {
      const view = cmViewRef.current;
      const wysiwyg = wysiwygScrollRef.current;
      if (!view || !wysiwyg) return;
      if (
        !shouldWriteFollowerScroll({
          userGesture,
          followerFocused: isCmFocused(view),
        })
      ) {
        return;
      }

      const scrollDom = view.scrollDOM;
      const markers = getMarkers(wysiwyg);
      if (!markers) {
        writeFollower(
          'cm',
          scrollDom,
          haimProportionalScrollTop(
            wysiwyg.scrollTop,
            haimMaxScrollTop(wysiwyg),
            haimMaxScrollTop(scrollDom),
          ),
        );
        lastCmTop = scrollDom.scrollTop;
        return;
      }
      const wysiwygBottom = haimMarkersContentBottom(markers);
      const anchorY = haimAnchorY(wysiwyg, dir);
      const top = planHaimFollowerScrollTop({
        dir,
        driverScrollTop: wysiwyg.scrollTop,
        driverClientHeight: wysiwyg.clientHeight,
        driverContentBottom: wysiwygBottom,
        driverMaxScroll: haimMaxScrollTop(wysiwyg),
        followerClientHeight: scrollDom.clientHeight,
        followerContentBottom: cmContentBottom(view),
        followerMaxScroll: haimMaxScrollTop(scrollDom),
        mappedContentY: mapWysiwygYToCmContentY(view, markers, anchorY),
      });
      if (top == null) return;
      writeFollower('cm', scrollDom, top);
      lastCmTop = scrollDom.scrollTop;
    };

    const applyDriverSync = (
      driver: Exclude<SyncSource, 'none'>,
      dir: ScrollDir,
      userGesture: boolean,
    ) => {
      if (disposed || applying) return;
      if (isScrollSyncSuppressed(suppressScrollSyncUntilRef)) return;
      applying = true;
      try {
        if (driver === 'cm') syncWysiwygFromCm(dir, userGesture);
        else syncCmFromWysiwyg(dir, userGesture);
      } finally {
        applying = false;
      }
    };

    /** After images settle, re-align using the last active driver + direction. */
    const resyncAfterLayout = () => {
      if (disposed || applying) return;
      if (shouldDeferScrollLayoutResync(readDeferFlags())) return;
      applyDriverSync(lastDriver, lastDir, false);
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
              const wysiwyg = wysiwygScrollRef.current;
              if (wysiwyg) rememberMarkers(wysiwyg);
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
      const view = cmViewRef.current;
      if (!view) return;
      const top = view.scrollDOM.scrollTop;
      const kind = classifyHaimPaneScroll({
        top,
        echo: cmEcho,
        now: Date.now(),
      });
      const dir = detectHaimScrollDir(lastCmTop, top);
      lastCmTop = top;
      if (kind === 'echo') {
        cmEcho = null;
        return;
      }
      cmEcho = null;
      if (isScrollSyncSuppressed(suppressScrollSyncUntilRef)) return;
      lastDir = dir;
      lastDriver = 'cm';
      applyDriverSync('cm', dir, true);
    };

    const onWysiwygScroll = () => {
      if (disposed) return;
      const wysiwyg = wysiwygScrollRef.current;
      if (!wysiwyg) return;
      const top = wysiwyg.scrollTop;
      const kind = classifyHaimPaneScroll({
        top,
        echo: wysiwygEcho,
        now: Date.now(),
      });
      const dir = detectHaimScrollDir(lastWysiwygTop, top);
      lastWysiwygTop = top;
      if (kind === 'echo') {
        wysiwygEcho = null;
        return;
      }
      wysiwygEcho = null;
      if (isScrollSyncSuppressed(suppressScrollSyncUntilRef)) return;
      lastDir = dir;
      lastDriver = 'wysiwyg';
      applyDriverSync('wysiwyg', dir, true);
    };

    const requestCmSync = () => {
      if (disposed) return;
      if (cmSyncRaf) return;
      cmSyncRaf = requestAnimationFrame(() => {
        cmSyncRaf = 0;
        onCmScroll();
      });
    };

    const requestWysiwygSync = () => {
      if (disposed) return;
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

      requestAnimationFrame(() => {
        if (!disposed) rememberMarkers(wysiwyg);
      });

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

      applyDriverSync('cm', 'up', false);
      lastWysiwygTop = wysiwyg.scrollTop;
      scheduleImageResync();
    };

    attach();

    return () => {
      disposed = true;
      clearRetry();
      clearImageRetries();
      clearEchoTimers();
      if (cmSyncRaf) cancelAnimationFrame(cmSyncRaf);
      if (wysiwygSyncRaf) cancelAnimationFrame(wysiwygSyncRaf);
      if (imageResyncCoalesceRaf) cancelAnimationFrame(imageResyncCoalesceRaf);
      detach?.();
      cmEcho = null;
      wysiwygEcho = null;
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

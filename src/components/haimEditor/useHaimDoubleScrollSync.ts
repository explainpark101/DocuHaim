/**
 * Line-based scroll sync between Haim source (CM) and WYSIWYG panes.
 *
 * Uses [data-line] markers on TipTap top-level blocks (see HaimSourceLine).
 * Scroll direction picks the viewport edge used as the sync anchor:
 * - scrolling down → newly appearing content at the bottom
 * - scrolling up   → newly appearing content at the top
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
};

const SCROLL_ALIGN_PAD_PX = 32;
const SYNC_LOCK_RELEASE_MS = 32;

type ScrollDir = 'up' | 'down';

function cmScroller(view: EditorView | null): HTMLElement | null {
  if (!view) return null;
  return view.scrollDOM ?? null;
}

function offsetTopWithinScroller(el: HTMLElement, scroller: HTMLElement): number {
  const elRect = el.getBoundingClientRect();
  const scrollerRect = scroller.getBoundingClientRect();
  return elRect.top - scrollerRect.top + scroller.scrollTop;
}

function setScrollerTop(scroller: HTMLElement, top: number): void {
  const max = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
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

function findScrollDataLineBlock(
  root: Element,
  line0: number,
): HTMLElement | null {
  let best: HTMLElement | null = null;
  let bestLine = -1;
  for (const el of queryOutermostDataLineBlocks(root)) {
    const n = Number(el.getAttribute('data-line'));
    if (!Number.isFinite(n)) continue;
    if (n <= line0 && n >= bestLine) {
      best = el;
      bestLine = n;
    }
  }
  return best;
}

function findDataLineBlockAtScrollerY(
  root: Element,
  scroller: HTMLElement,
  y: number,
): { el: HTMLElement; line0: number } | null {
  let best: HTMLElement | null = null;
  let bestLine = -1;
  let bestTop = -Infinity;

  for (const node of queryOutermostDataLineBlocks(root)) {
    const n = Number(node.getAttribute('data-line'));
    if (!Number.isFinite(n)) continue;
    const top = offsetTopWithinScroller(node, scroller);
    if (top <= y && top >= bestTop) {
      best = node;
      bestLine = n;
      bestTop = top;
    }
  }

  if (!best || bestLine < 0) return null;
  return { el: best, line0: bestLine };
}

type SyncSource = 'none' | 'cm' | 'wysiwyg';

export function useHaimDoubleScrollSync({
  enabled,
  wysiwygScrollRef,
  cmViewRef,
  cmRevision = 0,
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

    const clearRetry = () => {
      if (retryTimer != null) {
        clearTimeout(retryTimer);
        retryTimer = null;
      }
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

    /** CM scrolled → drive WYSIWYG to the same edge/line. */
    const syncWysiwygFromCm = (dir: ScrollDir) => {
      const view = cmViewRef.current;
      const wysiwyg = wysiwygScrollRef.current;
      if (!view || !wysiwyg) return;

      const scrollDom = view.scrollDOM;
      const y = anchorY(scrollDom, dir);
      const lineBlock = view.lineBlockAtHeight(y);
      const line0 = view.state.doc.lineAt(lineBlock.from).number - 1;
      const el = findScrollDataLineBlock(wysiwyg, line0);
      if (!el) return;

      const within =
        lineBlock.height > 0
          ? Math.max(0, Math.min(1, (y - lineBlock.top) / lineBlock.height))
          : 0;
      const relativeTop = offsetTopWithinScroller(el, wysiwyg);
      const contentY = relativeTop + el.offsetHeight * within;
      scrollToAlignContentY(wysiwyg, contentY, dir);
      lastWysiwygTop = wysiwyg.scrollTop;
    };

    /** WYSIWYG scrolled → drive CM to the same edge/line. */
    const syncCmFromWysiwyg = (dir: ScrollDir) => {
      const view = cmViewRef.current;
      const wysiwyg = wysiwygScrollRef.current;
      if (!view || !wysiwyg) return;

      const scrollDom = view.scrollDOM;
      const y = anchorY(wysiwyg, dir);
      const hit = findDataLineBlockAtScrollerY(wysiwyg, wysiwyg, y);
      if (!hit) return;

      const { el, line0 } = hit;
      const lineNumber = Math.min(
        Math.max(1, line0 + 1),
        view.state.doc.lines,
      );
      const line = view.state.doc.line(lineNumber);
      const block = view.lineBlockAt(line.from);

      const relativeTop = offsetTopWithinScroller(el, wysiwyg);
      const within =
        el.offsetHeight > 0
          ? Math.max(0, Math.min(1, (y - relativeTop) / el.offsetHeight))
          : 0;
      const contentY = block.top + block.height * within;
      scrollToAlignContentY(scrollDom, contentY, dir);
      lastCmTop = scrollDom.scrollTop;
    };

    const onCmScroll = () => {
      if (disposed) return;
      if (syncingFromRef.current === 'wysiwyg') return;
      const view = cmViewRef.current;
      if (!view) return;
      const top = view.scrollDOM.scrollTop;
      const dir = detectScrollDir(lastCmTop, top);
      lastCmTop = top;
      syncingFromRef.current = 'cm';
      try {
        syncWysiwygFromCm(dir);
      } finally {
        releaseSyncLock('cm');
      }
    };

    const onWysiwygScroll = () => {
      if (disposed) return;
      if (syncingFromRef.current === 'cm') return;
      const wysiwyg = wysiwygScrollRef.current;
      if (!wysiwyg) return;
      const top = wysiwyg.scrollTop;
      const dir = detectScrollDir(lastWysiwygTop, top);
      lastWysiwygTop = top;
      syncingFromRef.current = 'wysiwyg';
      try {
        syncCmFromWysiwyg(dir);
      } finally {
        releaseSyncLock('wysiwyg');
      }
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

      attachedWysiwyg = wysiwyg;
      attachedCm = cm;
      lastCmTop = cm.scrollTop;
      lastWysiwygTop = wysiwyg.scrollTop;

      detach = () => {
        wysiwyg.removeEventListener('scroll', onWysiwyg);
        cm.removeEventListener('scroll', onCm);
        attachedWysiwyg = null;
        attachedCm = null;
      };

      // Align once on bind — treat as upward (top-edge) for a stable initial match.
      syncingFromRef.current = 'cm';
      try {
        syncWysiwygFromCm('up');
        lastWysiwygTop = wysiwyg.scrollTop;
      } finally {
        releaseSyncLock('cm');
      }
    };

    attach();

    return () => {
      disposed = true;
      clearRetry();
      clearLockTimer();
      if (cmSyncRaf) cancelAnimationFrame(cmSyncRaf);
      if (wysiwygSyncRaf) cancelAnimationFrame(wysiwygSyncRaf);
      detach?.();
      syncingFromRef.current = 'none';
    };
  }, [enabled, wysiwygScrollRef, cmViewRef, cmRevision]);
}

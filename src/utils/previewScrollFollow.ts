/**
 * Bidirectional scroll sync for md-editor-rt dual pane, plus caret follow.
 *
 * Built-in scrollAuto maps by stale [data-line] nodes and height ratios, which
 * jumps around tall / async-hydrated images. This module re-queries the live
 * preview DOM and scrolls by mapped data-line blocks.
 *
 * Each MarkdownEditor keep-alive tab owns its own controller — module-level
 * singletons break when multiple editors stay mounted.
 *
 * Directions:
 * - Editor scroll → preview: top visible editor line maps to a [data-line] block
 * - Preview scroll → editor: top visible [data-line] block maps back to CM
 * - Caret / doc updates → preview: keep the caret region visible (not reverse)
 *
 * A short sync lock prevents feedback loops when one side programmatically
 * scrolls the other.
 */

import type { EditorView } from '@codemirror/view';
import {
  findDataLineBlockForSourceLine,
  findPreviewScrollContainer,
  scrollPreviewToEditorSelection,
} from '@/utils/previewSelectionSync';

export type PreviewScrollFollowGetters = {
  getPreviewRoot: () => Element | null | undefined;
  getView: () => EditorView | null | undefined;
};

export type PreviewScrollFollowController = {
  schedule: (options?: { withRetries?: boolean }) => void;
  stop: () => void;
};

type SyncSource = 'none' | 'editor' | 'preview' | 'follow';

const RETRY_MS = [0, 16, 48, 120, 280] as const;
const BIND_RETRY_MS = 50;
const BIND_RETRY_MAX = 40;
/** Match the pad used when aligning preview to the editor top line. */
const SCROLL_ALIGN_PAD_PX = 32;

/** Element top relative to a scroll container (handles nested offsetParents). */
function offsetTopWithinScroller(el: HTMLElement, scroller: HTMLElement): number {
  const elRect = el.getBoundingClientRect();
  const scrollerRect = scroller.getBoundingClientRect();
  return elRect.top - scrollerRect.top + scroller.scrollTop;
}

/**
 * Last [data-line] block whose top is at or above `y` inside the scroller.
 * Mirrors findDataLineBlockForSourceLine, but by scroll offset instead of line.
 */
function findDataLineBlockAtScrollerY(
  previewRoot: Element,
  scroller: HTMLElement,
  y: number,
): { el: HTMLElement; line0: number } | null {
  let best: HTMLElement | null = null;
  let bestLine = -1;
  let bestTop = -Infinity;

  for (const node of previewRoot.querySelectorAll('[data-line]')) {
    if (!(node instanceof HTMLElement)) continue;
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

export function createPreviewScrollFollow(
  getters: PreviewScrollFollowGetters,
): PreviewScrollFollowController {
  let followQueued = false;
  let retryTimers: ReturnType<typeof setTimeout>[] = [];
  let bindRetryTimer: ReturnType<typeof setTimeout> | null = null;
  let bindRetryCount = 0;
  let boundScrollDom: HTMLElement | null = null;
  let boundPreviewScroller: HTMLElement | null = null;
  let imageListenerRoot: Element | null = null;
  let syncingFrom: SyncSource = 'none';
  let stopped = false;

  function clearRetryTimers(): void {
    for (const t of retryTimers) clearTimeout(t);
    retryTimers = [];
  }

  function clearBindRetryTimer(): void {
    if (bindRetryTimer != null) {
      clearTimeout(bindRetryTimer);
      bindRetryTimer = null;
    }
    bindRetryCount = 0;
  }

  function releaseSyncLock(source: Exclude<SyncSource, 'none'>): void {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (syncingFrom === source) syncingFrom = 'none';
      });
    });
  }

  function followNow(): boolean {
    if (stopped) return false;
    const previewRoot = getters.getPreviewRoot();
    const view = getters.getView();
    if (!previewRoot || !view) return false;
    if (syncingFrom === 'preview') return false;
    if (syncingFrom !== 'none' && syncingFrom !== 'follow') return false;

    syncingFrom = 'follow';
    const ok = scrollPreviewToEditorSelection(view, previewRoot);
    releaseSyncLock('follow');
    return ok;
  }

  function queueFollow(): void {
    if (followQueued || stopped) return;
    followQueued = true;
    requestAnimationFrame(() => {
      followQueued = false;
      followNow();
    });
  }

  function syncPreviewToEditorScrollTop(): void {
    const previewRoot = getters.getPreviewRoot();
    const view = getters.getView();
    if (!previewRoot || !view) return;

    const scrollDom = view.scrollDOM;
    const scroller = findPreviewScrollContainer(previewRoot);
    if (!scroller) return;

    const viewTop = scrollDom.scrollTop;
    const topBlock = view.lineBlockAtHeight(viewTop);
    const line0 = view.state.doc.lineAt(topBlock.from).number - 1;
    const el = findDataLineBlockForSourceLine(previewRoot, line0);
    if (!el) return;

    const within =
      topBlock.height > 0
        ? Math.max(0, Math.min(1, (viewTop - topBlock.top) / topBlock.height))
        : 0;
    const relativeTop = offsetTopWithinScroller(el, scroller);
    const target = relativeTop + el.offsetHeight * within - SCROLL_ALIGN_PAD_PX;
    scroller.scrollTop = Math.max(0, target);
  }

  function syncEditorToPreviewScrollTop(): void {
    const previewRoot = getters.getPreviewRoot();
    const view = getters.getView();
    if (!previewRoot || !view) return;

    const scrollDom = view.scrollDOM;
    const scroller = findPreviewScrollContainer(previewRoot);
    if (!scroller) return;

    const y = scroller.scrollTop + SCROLL_ALIGN_PAD_PX;
    const hit = findDataLineBlockAtScrollerY(previewRoot, scroller, y);
    if (!hit) return;

    const { el, line0 } = hit;
    const lineNumber = Math.min(Math.max(1, line0 + 1), view.state.doc.lines);
    const line = view.state.doc.line(lineNumber);
    const block = view.lineBlockAt(line.from);

    const relativeTop = offsetTopWithinScroller(el, scroller);
    const within =
      el.offsetHeight > 0
        ? Math.max(0, Math.min(1, (y - relativeTop) / el.offsetHeight))
        : 0;

    scrollDom.scrollTop = Math.max(0, block.top + block.height * within);
  }

  function onEditorScroll(): void {
    if (stopped || syncingFrom !== 'none') return;
    syncingFrom = 'editor';
    try {
      syncPreviewToEditorScrollTop();
    } finally {
      releaseSyncLock('editor');
    }
  }

  function onPreviewScroll(): void {
    if (stopped || syncingFrom !== 'none') return;
    syncingFrom = 'preview';
    try {
      syncEditorToPreviewScrollTop();
    } finally {
      releaseSyncLock('preview');
    }
  }

  function onPreviewImageSettled(event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLImageElement)) return;
    if (!imageListenerRoot?.contains(target)) return;
    queueFollow();
    clearRetryTimers();
    for (const ms of RETRY_MS) {
      retryTimers.push(setTimeout(() => followNow(), ms));
    }
  }

  function bindEditorScroll(view: EditorView): boolean {
    const scrollDom = view.scrollDOM;
    if (!(scrollDom instanceof HTMLElement)) return false;
    if (boundScrollDom === scrollDom) return true;
    if (boundScrollDom) {
      boundScrollDom.removeEventListener('scroll', onEditorScroll);
    }
    boundScrollDom = scrollDom;
    scrollDom.addEventListener('scroll', onEditorScroll, { passive: true });
    return true;
  }

  function bindPreviewScroll(previewRoot: Element): boolean {
    const scroller = findPreviewScrollContainer(previewRoot);
    if (!scroller) return false;
    if (boundPreviewScroller === scroller) return true;
    if (boundPreviewScroller) {
      boundPreviewScroller.removeEventListener('scroll', onPreviewScroll);
    }
    boundPreviewScroller = scroller;
    scroller.addEventListener('scroll', onPreviewScroll, { passive: true });
    return true;
  }

  function bindPreviewImageListeners(previewRoot: Element): void {
    if (imageListenerRoot === previewRoot) return;
    if (imageListenerRoot) {
      imageListenerRoot.removeEventListener('load', onPreviewImageSettled, true);
      imageListenerRoot.removeEventListener('error', onPreviewImageSettled, true);
    }
    imageListenerRoot = previewRoot;
    previewRoot.addEventListener('load', onPreviewImageSettled, true);
    previewRoot.addEventListener('error', onPreviewImageSettled, true);
  }

  function scheduleBindRetry(): void {
    if (stopped || bindRetryTimer != null) return;
    if (bindRetryCount >= BIND_RETRY_MAX) return;
    bindRetryTimer = setTimeout(() => {
      bindRetryTimer = null;
      bindRetryCount += 1;
      if (stopped) return;
      const ok = ensureBindings();
      if (!ok) scheduleBindRetry();
    }, BIND_RETRY_MS);
  }

  function ensureBindings(): boolean {
    if (stopped) return false;
    const view = getters.getView();
    const previewRoot = getters.getPreviewRoot();
    let ok = true;
    if (view) {
      if (!bindEditorScroll(view)) ok = false;
    } else {
      ok = false;
    }
    if (previewRoot) {
      if (!bindPreviewScroll(previewRoot)) ok = false;
      bindPreviewImageListeners(previewRoot);
    } else {
      ok = false;
    }
    return ok;
  }

  function schedule(options?: { withRetries?: boolean }): void {
    if (stopped) return;
    if (!ensureBindings()) scheduleBindRetry();
    followNow();

    if (!options?.withRetries) return;

    clearRetryTimers();
    for (const ms of RETRY_MS) {
      retryTimers.push(
        setTimeout(() => {
          if (stopped) return;
          if (!ensureBindings()) scheduleBindRetry();
          followNow();
        }, ms),
      );
    }
  }

  function stop(): void {
    stopped = true;
    clearRetryTimers();
    clearBindRetryTimer();
    if (boundScrollDom) {
      boundScrollDom.removeEventListener('scroll', onEditorScroll);
      boundScrollDom = null;
    }
    if (boundPreviewScroller) {
      boundPreviewScroller.removeEventListener('scroll', onPreviewScroll);
      boundPreviewScroller = null;
    }
    if (imageListenerRoot) {
      imageListenerRoot.removeEventListener('load', onPreviewImageSettled, true);
      imageListenerRoot.removeEventListener('error', onPreviewImageSettled, true);
      imageListenerRoot = null;
    }
    followQueued = false;
    syncingFrom = 'none';
  }

  clearBindRetryTimer();
  if (!ensureBindings()) scheduleBindRetry();
  schedule({ withRetries: true });

  return { schedule, stop };
}

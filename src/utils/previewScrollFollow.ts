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
 *
 * Safari often fires `scroll` on a nested/parent overflow node (or omits it
 * when native scrollbars are hidden). Capture-phase listeners on `.md-editor`
 * plus a wheel/touch rAF fallback keep both panes mapped.
 */

import type { EditorView } from '@codemirror/view';
import {
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
type ScrollPane = 'editor' | 'preview';

const RETRY_MS = [0, 16, 48, 120, 280] as const;
const BIND_RETRY_MS = 50;
const BIND_RETRY_MAX = 40;
/** Match the pad used when aligning preview to the editor top line. */
const SCROLL_ALIGN_PAD_PX = 32;
/** Safari may deliver the echo `scroll` after layout, past a double-rAF. */
const SYNC_LOCK_RELEASE_MS = 32;

function isConnectedElement(el: HTMLElement | null): el is HTMLElement {
  return Boolean(el?.isConnected);
}

/** Element top relative to a scroll container (handles nested offsetParents). */
function offsetTopWithinScroller(el: HTMLElement, scroller: HTMLElement): number {
  const elRect = el.getBoundingClientRect();
  const scrollerRect = scroller.getBoundingClientRect();
  return elRect.top - scrollerRect.top + scroller.scrollTop;
}

function setScrollerTop(scroller: HTMLElement, top: number): void {
  const next = Math.max(0, top);
  if (Math.abs(scroller.scrollTop - next) < 0.5) return;
  scroller.scrollTop = next;
  // Safari sometimes ignores the first scrollTop write on overflow:auto.
  if (Math.abs(scroller.scrollTop - next) > 1) {
    scroller.scrollTo(0, next);
  }
}

/**
 * Block-level [data-line] markers (skip nested table cells / figures).
 * Matches md-editor-rt scroll-auto, which only maps `.md-editor-preview > [data-line]`.
 */
function queryOutermostDataLineBlocks(previewRoot: Element): HTMLElement[] {
  const all: HTMLElement[] = [];
  for (const node of previewRoot.querySelectorAll('[data-line]')) {
    if (node instanceof HTMLElement) all.push(node);
  }
  const outermost = all.filter((el) => {
    let parent = el.parentElement;
    while (parent && parent !== previewRoot) {
      if (parent.hasAttribute('data-line')) return false;
      parent = parent.parentElement;
    }
    return true;
  });
  return outermost.length > 0 ? outermost : all;
}

function findScrollDataLineBlock(
  previewRoot: Element,
  line0: number,
): HTMLElement | null {
  let best: HTMLElement | null = null;
  let bestLine = -1;
  for (const el of queryOutermostDataLineBlocks(previewRoot)) {
    const n = Number(el.getAttribute('data-line'));
    if (!Number.isFinite(n)) continue;
    if (n <= line0 && n >= bestLine) {
      best = el;
      bestLine = n;
    }
  }
  return best;
}

/**
 * Last [data-line] block whose top is at or above `y` inside the scroller.
 * Mirrors findScrollDataLineBlock, but by scroll offset instead of line.
 */
function findDataLineBlockAtScrollerY(
  previewRoot: Element,
  scroller: HTMLElement,
  y: number,
): { el: HTMLElement; line0: number } | null {
  let best: HTMLElement | null = null;
  let bestLine = -1;
  let bestTop = -Infinity;

  for (const node of queryOutermostDataLineBlocks(previewRoot)) {
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

function findEditorHost(
  view: EditorView | null | undefined,
  previewRoot: Element | null | undefined,
): HTMLElement | null {
  const fromView = view?.dom?.closest('.md-editor');
  if (fromView instanceof HTMLElement) return fromView;
  const fromPreview = previewRoot?.closest('.md-editor');
  if (fromPreview instanceof HTMLElement) return fromPreview;
  return null;
}

export function createPreviewScrollFollow(
  getters: PreviewScrollFollowGetters,
): PreviewScrollFollowController {
  let followQueued = false;
  let retryTimers: ReturnType<typeof setTimeout>[] = [];
  let bindRetryTimer: ReturnType<typeof setTimeout> | null = null;
  let bindRetryCount = 0;
  let lockTimer: ReturnType<typeof setTimeout> | null = null;
  let editorSyncRaf = 0;
  let previewSyncRaf = 0;
  let boundScrollDom: HTMLElement | null = null;
  let boundPreviewScroller: HTMLElement | null = null;
  let boundHost: HTMLElement | null = null;
  let livePreviewScroller: HTMLElement | null = null;
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

  function clearLockTimer(): void {
    if (lockTimer != null) {
      clearTimeout(lockTimer);
      lockTimer = null;
    }
  }

  function cancelSyncRafs(): void {
    if (editorSyncRaf) cancelAnimationFrame(editorSyncRaf);
    if (previewSyncRaf) cancelAnimationFrame(previewSyncRaf);
    editorSyncRaf = 0;
    previewSyncRaf = 0;
  }

  function releaseSyncLock(source: Exclude<SyncSource, 'none'>): void {
    clearLockTimer();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        lockTimer = setTimeout(() => {
          lockTimer = null;
          if (syncingFrom === source) syncingFrom = 'none';
        }, SYNC_LOCK_RELEASE_MS);
      });
    });
  }

  function editorScroller(view: EditorView): HTMLElement {
    return view.scrollDOM;
  }

  function previewScroller(previewRoot: Element): HTMLElement | null {
    if (isConnectedElement(livePreviewScroller)) return livePreviewScroller;
    if (isConnectedElement(boundPreviewScroller)) return boundPreviewScroller;
    return findPreviewScrollContainer(previewRoot);
  }

  function paneFromEventTarget(target: EventTarget | null): ScrollPane | null {
    if (!(target instanceof Node)) return null;
    const view = getters.getView();
    const previewRoot = getters.getPreviewRoot();
    if (view && (target === view.scrollDOM || view.dom.contains(target))) {
      return 'editor';
    }
    if (previewRoot) {
      const wrap = previewRoot.closest('.md-editor-preview-wrapper') ?? previewRoot;
      if (target === wrap || wrap.contains(target)) return 'preview';
    }
    return null;
  }

  function rememberScroller(pane: ScrollPane, target: EventTarget | null): void {
    if (pane !== 'preview' || !(target instanceof HTMLElement)) return;
    const previewRoot = getters.getPreviewRoot();
    if (!previewRoot) return;
    const designated = findPreviewScrollContainer(previewRoot);
    if (!designated) return;
    // Ignore nested overflow (code blocks). Keep the pane scroller or its ancestor.
    if (target === designated || target.contains(designated)) {
      livePreviewScroller = target;
    }
  }

  function isPaneScrollerEvent(pane: ScrollPane, target: EventTarget | null): boolean {
    if (!(target instanceof HTMLElement)) return false;
    if (pane === 'editor') {
      const view = getters.getView();
      return Boolean(view && (target === view.scrollDOM || target.contains(view.scrollDOM)));
    }
    const previewRoot = getters.getPreviewRoot();
    const designated = previewRoot ? findPreviewScrollContainer(previewRoot) : null;
    return Boolean(designated && (target === designated || target.contains(designated)));
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

    const scrollDom = editorScroller(view);
    const scroller = previewScroller(previewRoot);
    if (!scroller) return;

    const viewTop = scrollDom.scrollTop;
    const topBlock = view.lineBlockAtHeight(viewTop);
    const line0 = view.state.doc.lineAt(topBlock.from).number - 1;
    const el = findScrollDataLineBlock(previewRoot, line0);
    if (!el) return;

    const within =
      topBlock.height > 0
        ? Math.max(0, Math.min(1, (viewTop - topBlock.top) / topBlock.height))
        : 0;
    const relativeTop = offsetTopWithinScroller(el, scroller);
    const target = relativeTop + el.offsetHeight * within - SCROLL_ALIGN_PAD_PX;
    setScrollerTop(scroller, target);
  }

  function syncEditorToPreviewScrollTop(): void {
    const previewRoot = getters.getPreviewRoot();
    const view = getters.getView();
    if (!previewRoot || !view) return;

    const scrollDom = editorScroller(view);
    const scroller = previewScroller(previewRoot);
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

    setScrollerTop(scrollDom, block.top + block.height * within);
  }

  function onEditorScroll(): void {
    if (stopped) return;
    if (syncingFrom === 'preview' || syncingFrom === 'follow') return;
    syncingFrom = 'editor';
    try {
      syncPreviewToEditorScrollTop();
    } finally {
      releaseSyncLock('editor');
    }
  }

  function onPreviewScroll(): void {
    if (stopped) return;
    if (syncingFrom === 'editor' || syncingFrom === 'follow') return;
    syncingFrom = 'preview';
    try {
      syncEditorToPreviewScrollTop();
    } finally {
      releaseSyncLock('preview');
    }
  }

  function requestEditorSync(): void {
    if (stopped || syncingFrom === 'preview' || syncingFrom === 'follow') return;
    if (editorSyncRaf) return;
    editorSyncRaf = requestAnimationFrame(() => {
      editorSyncRaf = 0;
      onEditorScroll();
    });
  }

  function requestPreviewSync(): void {
    if (stopped || syncingFrom === 'editor' || syncingFrom === 'follow') return;
    if (previewSyncRaf) return;
    previewSyncRaf = requestAnimationFrame(() => {
      previewSyncRaf = 0;
      onPreviewScroll();
    });
  }

  function onCapturedScroll(event: Event): void {
    const pane = paneFromEventTarget(event.target);
    if (!pane || !isPaneScrollerEvent(pane, event.target)) return;
    rememberScroller(pane, event.target);
    if (pane === 'editor') requestEditorSync();
    else requestPreviewSync();
  }

  function onCapturedWheelOrTouch(event: Event): void {
    const pane = paneFromEventTarget(event.target);
    if (!pane) return;
    // After the browser applies the wheel/touch delta, read the live scroller.
    requestAnimationFrame(() => {
      const view = getters.getView();
      const previewRoot = getters.getPreviewRoot();
      if (pane === 'editor' && view) {
        requestEditorSync();
      } else if (pane === 'preview' && previewRoot) {
        rememberScroller('preview', findPreviewScrollContainer(previewRoot));
        requestPreviewSync();
      }
    });
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
      boundScrollDom.removeEventListener('scroll', onCapturedScroll);
    }
    boundScrollDom = scrollDom;
    scrollDom.addEventListener('scroll', onCapturedScroll, { passive: true });
    return true;
  }

  function bindPreviewScroll(previewRoot: Element): boolean {
    const scroller = findPreviewScrollContainer(previewRoot);
    if (!scroller) return false;
    if (boundPreviewScroller === scroller) return true;
    if (boundPreviewScroller) {
      boundPreviewScroller.removeEventListener('scroll', onCapturedScroll);
    }
    boundPreviewScroller = scroller;
    livePreviewScroller = scroller;
    scroller.addEventListener('scroll', onCapturedScroll, { passive: true });
    return true;
  }

  function bindHost(view: EditorView | null | undefined, previewRoot: Element | null | undefined): boolean {
    const host = findEditorHost(view, previewRoot);
    if (!host) return false;
    if (boundHost === host) return true;
    if (boundHost) {
      boundHost.removeEventListener('scroll', onCapturedScroll, true);
      boundHost.removeEventListener('wheel', onCapturedWheelOrTouch, true);
      boundHost.removeEventListener('touchmove', onCapturedWheelOrTouch, true);
    }
    boundHost = host;
    // Capture: scroll does not bubble; Safari may fire on a child/parent of the
    // node we would have bound directly.
    host.addEventListener('scroll', onCapturedScroll, { capture: true, passive: true });
    host.addEventListener('wheel', onCapturedWheelOrTouch, { capture: true, passive: true });
    host.addEventListener('touchmove', onCapturedWheelOrTouch, { capture: true, passive: true });
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
    if (!bindHost(view, previewRoot)) ok = false;
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
    clearLockTimer();
    cancelSyncRafs();
    if (boundScrollDom) {
      boundScrollDom.removeEventListener('scroll', onCapturedScroll);
      boundScrollDom = null;
    }
    if (boundPreviewScroller) {
      boundPreviewScroller.removeEventListener('scroll', onCapturedScroll);
      boundPreviewScroller = null;
    }
    if (boundHost) {
      boundHost.removeEventListener('scroll', onCapturedScroll, true);
      boundHost.removeEventListener('wheel', onCapturedWheelOrTouch, true);
      boundHost.removeEventListener('touchmove', onCapturedWheelOrTouch, true);
      boundHost = null;
    }
    if (imageListenerRoot) {
      imageListenerRoot.removeEventListener('load', onPreviewImageSettled, true);
      imageListenerRoot.removeEventListener('error', onPreviewImageSettled, true);
      imageListenerRoot = null;
    }
    livePreviewScroller = null;
    followQueued = false;
    syncingFrom = 'none';
  }

  clearBindRetryTimer();
  if (!ensureBindings()) scheduleBindRetry();
  schedule({ withRetries: true });

  return { schedule, stop };
}

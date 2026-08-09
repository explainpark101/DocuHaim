/**
 * Keep md-editor-rt preview scrolled to the CodeMirror caret while typing.
 *
 * Built-in scrollAuto maps by stale [data-line] nodes and height ratios, which
 * jumps around tall / async-hydrated images. This module re-queries the live
 * preview DOM and scrolls to the mapped caret (or its data-line block).
 *
 * Editor scroll events always map by the top visible editor line (not caret),
 * so wheel/trackpad scrolling still moves the preview when the caret stays
 * inside the viewport.
 */

import type { EditorView } from '@codemirror/view';
import {
  findDataLineBlockForSourceLine,
  findPreviewScrollContainer,
  scrollPreviewToEditorSelection,
} from '@/utils/previewSelectionSync';

type Getters = {
  getPreviewRoot: () => Element | null | undefined;
  getView: () => EditorView | null | undefined;
};

const RETRY_MS = [0, 16, 48, 120, 280] as const;
const BIND_RETRY_MS = 50;
const BIND_RETRY_MAX = 40;

let getters: Getters | null = null;
let followQueued = false;
let retryTimers: ReturnType<typeof setTimeout>[] = [];
let bindRetryTimer: ReturnType<typeof setTimeout> | null = null;
let bindRetryCount = 0;
let boundScrollDom: HTMLElement | null = null;
let imageListenerRoot: Element | null = null;

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

function followNow(): boolean {
  if (!getters) return false;
  const previewRoot = getters.getPreviewRoot();
  const view = getters.getView();
  if (!previewRoot || !view) return false;
  return scrollPreviewToEditorSelection(view, previewRoot);
}

function queueFollow(): void {
  if (followQueued) return;
  followQueued = true;
  requestAnimationFrame(() => {
    followQueued = false;
    followNow();
  });
}

/** Element top relative to a scroll container (handles nested offsetParents). */
function offsetTopWithinScroller(el: HTMLElement, scroller: HTMLElement): number {
  const elRect = el.getBoundingClientRect();
  const scrollerRect = scroller.getBoundingClientRect();
  return elRect.top - scrollerRect.top + scroller.scrollTop;
}

/** Align preview to the top-most visible editor line (fresh DOM query). */
function syncPreviewToEditorScrollTop(): void {
  if (!getters) return;
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

  const within = topBlock.height > 0
    ? Math.max(0, Math.min(1, (viewTop - topBlock.top) / topBlock.height))
    : 0;
  const relativeTop = offsetTopWithinScroller(el, scroller);
  const target = relativeTop + el.offsetHeight * within - 32;
  scroller.scrollTop = Math.max(0, target);
}

function onEditorScroll(): void {
  syncPreviewToEditorScrollTop();
}

function onPreviewImageSettled(event: Event): void {
  const target = event.target;
  if (!(target instanceof HTMLImageElement)) return;
  if (!imageListenerRoot?.contains(target)) return;
  // Layout shifted after hydrate / decode — keep caret region visible.
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

function bindPreviewImageListeners(previewRoot: Element): void {
  if (imageListenerRoot === previewRoot) return;
  if (imageListenerRoot) {
    imageListenerRoot.removeEventListener('load', onPreviewImageSettled, true);
    imageListenerRoot.removeEventListener('error', onPreviewImageSettled, true);
  }
  imageListenerRoot = previewRoot;
  // Capture: wiki images may replace src after mount.
  previewRoot.addEventListener('load', onPreviewImageSettled, true);
  previewRoot.addEventListener('error', onPreviewImageSettled, true);
}

function scheduleBindRetry(): void {
  if (!getters || bindRetryTimer != null) return;
  if (bindRetryCount >= BIND_RETRY_MAX) return;
  bindRetryTimer = setTimeout(() => {
    bindRetryTimer = null;
    bindRetryCount += 1;
    if (!getters) return;
    const ok = ensureBindings();
    if (!ok) scheduleBindRetry();
  }, BIND_RETRY_MS);
}

/** @returns true when both editor scroll and preview root are bound */
function ensureBindings(): boolean {
  if (!getters) return false;
  const view = getters.getView();
  const previewRoot = getters.getPreviewRoot();
  let ok = true;
  if (view) {
    if (!bindEditorScroll(view)) ok = false;
  } else {
    ok = false;
  }
  if (previewRoot) {
    bindPreviewImageListeners(previewRoot);
  } else {
    ok = false;
  }
  return ok;
}

/** Call after CM selection/doc updates (caret follow). */
export function schedulePreviewScrollFollow(options?: {
  withRetries?: boolean;
}): void {
  if (!getters) return;
  if (!ensureBindings()) scheduleBindRetry();
  followNow();

  if (!options?.withRetries) return;

  clearRetryTimers();
  for (const ms of RETRY_MS) {
    retryTimers.push(
      setTimeout(() => {
        if (!ensureBindings()) scheduleBindRetry();
        followNow();
      }, ms),
    );
  }
}

export function startPreviewScrollFollow(next: Getters): void {
  getters = next;
  clearBindRetryTimer();
  if (!ensureBindings()) scheduleBindRetry();
  schedulePreviewScrollFollow({ withRetries: true });
}

export function stopPreviewScrollFollow(): void {
  clearRetryTimers();
  clearBindRetryTimer();
  if (boundScrollDom) {
    boundScrollDom.removeEventListener('scroll', onEditorScroll);
    boundScrollDom = null;
  }
  if (imageListenerRoot) {
    imageListenerRoot.removeEventListener('load', onPreviewImageSettled, true);
    imageListenerRoot.removeEventListener('error', onPreviewImageSettled, true);
    imageListenerRoot = null;
  }
  getters = null;
  followQueued = false;
}

/**
 * Keep md-editor-rt preview scrolled to the CodeMirror caret while typing.
 *
 * Built-in scrollAuto maps by stale [data-line] nodes and height ratios, which
 * jumps around tall / async-hydrated images. This module re-queries the live
 * preview DOM and scrolls to the mapped caret (or its data-line block).
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

let getters: Getters | null = null;
let followQueued = false;
let retryTimers: ReturnType<typeof setTimeout>[] = [];
let boundScrollDom: HTMLElement | null = null;
let imageListenerRoot: Element | null = null;

function clearRetryTimers(): void {
  for (const t of retryTimers) clearTimeout(t);
  retryTimers = [];
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

/** Align preview to the top-most visible editor line (fresh DOM query). */
function syncPreviewToEditorScrollTop(): void {
  if (!getters) return;
  const previewRoot = getters.getPreviewRoot();
  const view = getters.getView();
  if (!previewRoot || !view) return;

  const scrollDom = view.scrollDOM;
  const scroller = findPreviewScrollContainer(previewRoot);
  if (!scroller) return;

  // Prefer caret when it is still inside the editor viewport (typing / small moves).
  const head = view.state.selection.main.head;
  const caretBlock = view.lineBlockAt(head);
  const viewTop = scrollDom.scrollTop;
  const viewBottom = viewTop + scrollDom.clientHeight;
  if (caretBlock.bottom > viewTop && caretBlock.top < viewBottom) {
    scrollPreviewToEditorSelection(view, previewRoot);
    return;
  }

  const topBlock = view.lineBlockAtHeight(viewTop);
  const line0 = view.state.doc.lineAt(topBlock.from).number - 1;
  const el = findDataLineBlockForSourceLine(previewRoot, line0);
  if (!el) return;

  const within = topBlock.height > 0
    ? Math.max(0, Math.min(1, (viewTop - topBlock.top) / topBlock.height))
    : 0;
  const target = el.offsetTop + el.offsetHeight * within - 32;
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

function bindEditorScroll(view: EditorView): void {
  const scrollDom = view.scrollDOM;
  if (boundScrollDom === scrollDom) return;
  if (boundScrollDom) {
    boundScrollDom.removeEventListener('scroll', onEditorScroll);
  }
  boundScrollDom = scrollDom;
  scrollDom.addEventListener('scroll', onEditorScroll, { passive: true });
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

function ensureBindings(): void {
  if (!getters) return;
  const view = getters.getView();
  const previewRoot = getters.getPreviewRoot();
  if (view) bindEditorScroll(view);
  if (previewRoot) {
    bindPreviewImageListeners(previewRoot);
  }
}

/** Call after CM selection/doc updates. */
export function schedulePreviewScrollFollow(options?: {
  withRetries?: boolean;
}): void {
  if (!getters) return;
  ensureBindings();
  followNow();

  if (!options?.withRetries) return;

  clearRetryTimers();
  for (const ms of RETRY_MS) {
    retryTimers.push(
      setTimeout(() => {
        ensureBindings();
        followNow();
      }, ms),
    );
  }
}

export function startPreviewScrollFollow(next: Getters): void {
  getters = next;
  ensureBindings();
  schedulePreviewScrollFollow({ withRetries: true });
}

export function stopPreviewScrollFollow(): void {
  clearRetryTimers();
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

/**
 * Remirror CodeMirror caret/selection onto md-editor preview after DOM rebuilds.
 * Preview HTML is replaced on each keystroke; overlays must be reapplied after that.
 *
 * Per-editor controllers — keep-alive workspace tabs must not share one getters slot.
 */

import type { EditorView } from '@codemirror/view';
import { syncEditorSelectionToPreview } from '@/utils/previewSelectionSync';
import { isMirrorEditActiveIn } from '@/utils/previewMirrorEdit';

export type MirrorEditRemirrorGetters = {
  getPreviewRoot: () => Element | null | undefined;
  getView: () => EditorView | null | undefined;
};

export type MirrorEditRemirrorController = {
  schedule: (options?: { withRetries?: boolean }) => void;
  stop: () => void;
};

const RETRY_MS = [0, 16, 48, 100, 180, 320] as const;

export function createMirrorEditPreviewRemirror(
  getters: MirrorEditRemirrorGetters,
): MirrorEditRemirrorController {
  let retryTimers: ReturnType<typeof setTimeout>[] = [];
  let mutationObserver: MutationObserver | null = null;
  let observedRoot: Element | null = null;
  let remirrorQueued = false;
  let stopped = false;

  function clearRetryTimers(): void {
    for (const t of retryTimers) clearTimeout(t);
    retryTimers = [];
  }

  function remirrorNow(): boolean {
    if (stopped) return false;
    const previewRoot = getters.getPreviewRoot();
    const view = getters.getView();
    if (!previewRoot || !view) return false;
    if (isMirrorEditActiveIn(previewRoot)) return false;
    return syncEditorSelectionToPreview(view, previewRoot, { allowCollapsed: true });
  }

  function queueRemirrorFromMutation(): void {
    if (remirrorQueued || stopped) return;
    remirrorQueued = true;
    requestAnimationFrame(() => {
      remirrorQueued = false;
      remirrorNow();
    });
  }

  function ensureMutationObserver(previewRoot: Element): void {
    if (mutationObserver && observedRoot === previewRoot) return;

    mutationObserver?.disconnect();
    observedRoot = previewRoot;
    mutationObserver = new MutationObserver((mutations) => {
      const meaningful = mutations.some((m) => {
        const nodes = [...m.addedNodes, ...m.removedNodes];
        if (nodes.length === 0) return m.type === 'characterData' || m.type === 'attributes';
        return nodes.some((n) => {
          if (!(n instanceof Element)) return true;
          return !(
            n.hasAttribute('data-preview-caret-mirror') ||
            n.hasAttribute('data-preview-sel-mirror') ||
            n.classList?.contains('s3haim-preview-caret-mirror') ||
            n.classList?.contains('s3haim-preview-sel-mirror')
          );
        });
      });
      if (!meaningful) return;
      queueRemirrorFromMutation();
    });

    mutationObserver.observe(previewRoot, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  function schedule(options?: { withRetries?: boolean }): void {
    if (stopped) return;
    const previewRoot = getters.getPreviewRoot();
    if (previewRoot) ensureMutationObserver(previewRoot);

    remirrorNow();

    if (!options?.withRetries) return;

    clearRetryTimers();
    for (const ms of RETRY_MS) {
      retryTimers.push(
        setTimeout(() => {
          if (stopped) return;
          const root = getters.getPreviewRoot();
          if (root) ensureMutationObserver(root);
          remirrorNow();
        }, ms),
      );
    }
  }

  function stop(): void {
    stopped = true;
    clearRetryTimers();
    mutationObserver?.disconnect();
    mutationObserver = null;
    observedRoot = null;
    remirrorQueued = false;
  }

  const previewRoot = getters.getPreviewRoot();
  if (previewRoot) ensureMutationObserver(previewRoot);
  schedule({ withRetries: true });

  return { schedule, stop };
}

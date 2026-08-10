/**
 * Bridge: CodeMirror updateListener (registered in md-editor config) →
 * Mirror Edit / scroll-follow callbacks owned by each MarkdownEditor instance.
 *
 * Multiple keep-alive editors may be mounted; every registered handler runs and
 * should no-op unless `update.view` is its own EditorView.
 */

import type { EditorView, ViewUpdate } from '@codemirror/view';

export type MirrorEditCaretHandler = (view: EditorView, update: ViewUpdate) => void;

const handlers = new Set<MirrorEditCaretHandler>();

/** Register a caret/doc update handler. Returns unsubscribe. */
export function registerMirrorEditCaretHandler(handler: MirrorEditCaretHandler): () => void {
  handlers.add(handler);
  return () => {
    handlers.delete(handler);
  };
}

/** @deprecated Prefer registerMirrorEditCaretHandler for multi-tab keep-alive. */
export function setMirrorEditCaretHandler(next: MirrorEditCaretHandler | null): void {
  handlers.clear();
  if (next) handlers.add(next);
}

export function notifyMirrorEditCaretUpdate(update: ViewUpdate): void {
  if (!update.selectionSet && !update.docChanged) return;
  if (handlers.size === 0) return;
  for (const handler of handlers) {
    try {
      handler(update.view, update);
    } catch {
      // ignore
    }
  }
}

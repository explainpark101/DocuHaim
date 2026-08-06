/**
 * Bridge: CodeMirror updateListener (registered in md-editor config) →
 * Mirror Edit caret remirror callback owned by MarkdownEditor.
 */

import type { EditorView, ViewUpdate } from '@codemirror/view';

type MirrorEditCaretHandler = (view: EditorView, update: ViewUpdate) => void;

let handler: MirrorEditCaretHandler | null = null;

export function setMirrorEditCaretHandler(next: MirrorEditCaretHandler | null): void {
  handler = next;
}

export function notifyMirrorEditCaretUpdate(update: ViewUpdate): void {
  if (!handler) return;
  if (!update.selectionSet && !update.docChanged) return;
  try {
    handler(update.view, update);
  } catch {
    // ignore
  }
}

/**
 * Track last caret/selection while the md-editor-rt source CodeMirror pane has focus.
 * Used by LLM "replace selection" so apply can target the last Editor focus position
 * even after focus moves to the LLM panel.
 */

import type { EditorView } from '@codemirror/view';

export type MdEditorSourceFocusState = {
  from: number;
  to: number;
  everFocused: boolean;
};

const focusByView = new WeakMap<EditorView, MdEditorSourceFocusState>();

export function recordMdEditorSourceFocus(
  view: EditorView,
  from: number,
  to: number,
): void {
  focusByView.set(view, { from, to, everFocused: true });
}

export function getMdEditorSourceFocus(
  view: EditorView | null | undefined,
): MdEditorSourceFocusState | null {
  if (!view) return null;
  return focusByView.get(view) ?? null;
}

export function clearMdEditorSourceFocus(
  view: EditorView | null | undefined,
): void {
  if (!view) return;
  focusByView.delete(view);
}

function snapshotSelection(view: EditorView): void {
  const sel = view.state.selection.main;
  recordMdEditorSourceFocus(view, sel.from, sel.to);
}

/**
 * Listen on the source CM DOM only (not preview). Returns cleanup.
 */
export function attachMdEditorSourceFocusTracking(view: EditorView): () => void {
  const dom = view.dom;

  const onFocusIn = () => {
    snapshotSelection(view);
  };
  const onFocusOut = () => {
    snapshotSelection(view);
  };
  const onKeyUp = () => {
    if (view.hasFocus) snapshotSelection(view);
  };
  const onMouseUp = () => {
    if (view.hasFocus) snapshotSelection(view);
  };

  dom.addEventListener('focusin', onFocusIn);
  dom.addEventListener('focusout', onFocusOut);
  dom.addEventListener('keyup', onKeyUp);
  dom.addEventListener('mouseup', onMouseUp);

  return () => {
    dom.removeEventListener('focusin', onFocusIn);
    dom.removeEventListener('focusout', onFocusOut);
    dom.removeEventListener('keyup', onKeyUp);
    dom.removeEventListener('mouseup', onMouseUp);
  };
}

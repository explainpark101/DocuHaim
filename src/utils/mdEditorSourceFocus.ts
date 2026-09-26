/**
 * Track last caret/selection while the md-editor-rt source CodeMirror pane has focus.
 * Used by LLM "replace selection" so apply can target the last Editor focus position
 * even after focus moves to the LLM panel.
 *
 * View WeakMap covers the live CM instance; durableByDocKey survives demote/unmount.
 */

import type { EditorView } from '@codemirror/view';

export type MdEditorSourceFocusState = {
  from: number;
  to: number;
  everFocused: boolean;
};

const focusByView = new WeakMap<EditorView, MdEditorSourceFocusState>();
const durableByDocKey = new Map<string, MdEditorSourceFocusState>();

/** Last document key that recorded source focus (split: which file LLM targets). */
let lastFocusedDocumentKey: string | null = null;

export function getLastFocusedDocumentKey(): string | null {
  return lastFocusedDocumentKey;
}

export function recordMdEditorSourceFocus(
  view: EditorView,
  from: number,
  to: number,
  documentKey?: string | null,
): void {
  const state: MdEditorSourceFocusState = { from, to, everFocused: true };
  focusByView.set(view, state);
  if (documentKey) {
    durableByDocKey.set(documentKey, state);
    lastFocusedDocumentKey = documentKey;
  }
}

export function getMdEditorSourceFocus(
  view: EditorView | null | undefined,
): MdEditorSourceFocusState | null {
  if (!view) return null;
  return focusByView.get(view) ?? null;
}

export function getDurableMdEditorSourceFocus(
  documentKey: string | null | undefined,
): MdEditorSourceFocusState | null {
  if (!documentKey) return null;
  return durableByDocKey.get(documentKey) ?? null;
}

/** Prefer live view map, then durable document key. */
export function resolveMdEditorSourceFocus(
  view: EditorView | null | undefined,
  documentKey?: string | null,
): MdEditorSourceFocusState | null {
  return getMdEditorSourceFocus(view) ?? getDurableMdEditorSourceFocus(documentKey);
}

export function hydrateMdEditorSourceFocusFromDurable(
  view: EditorView,
  documentKey: string | null | undefined,
): void {
  if (!documentKey) return;
  const durable = durableByDocKey.get(documentKey);
  if (!durable?.everFocused) return;
  focusByView.set(view, { ...durable });
}

export function clearMdEditorSourceFocus(
  view: EditorView | null | undefined,
  documentKey?: string | null,
): void {
  if (view) focusByView.delete(view);
  if (documentKey) {
    durableByDocKey.delete(documentKey);
    if (lastFocusedDocumentKey === documentKey) {
      lastFocusedDocumentKey = null;
    }
  }
}

/** Test helper: wipe durable map. */
export function clearAllDurableMdEditorSourceFocus(): void {
  durableByDocKey.clear();
  lastFocusedDocumentKey = null;
}

function snapshotSelection(view: EditorView, documentKey?: string | null): void {
  const sel = view.state.selection.main;
  recordMdEditorSourceFocus(view, sel.from, sel.to, documentKey);
}

/**
 * Listen on the source CM DOM only (not preview). Returns cleanup.
 * When documentKey is set, focus is also stored durably across CM remounts.
 */
export function attachMdEditorSourceFocusTracking(
  view: EditorView,
  documentKey?: string | null,
): () => void {
  const dom = view.dom;
  hydrateMdEditorSourceFocusFromDurable(view, documentKey);

  const onFocusIn = () => {
    snapshotSelection(view, documentKey);
  };
  const onFocusOut = () => {
    snapshotSelection(view, documentKey);
  };
  const onKeyUp = () => {
    if (view.hasFocus) snapshotSelection(view, documentKey);
  };
  const onMouseUp = () => {
    if (view.hasFocus) snapshotSelection(view, documentKey);
  };

  dom.addEventListener('focusin', onFocusIn);
  dom.addEventListener('focusout', onFocusOut);
  dom.addEventListener('keyup', onKeyUp);
  dom.addEventListener('mouseup', onMouseUp);

  return () => {
    // Capture last range before view teardown (demote).
    try {
      snapshotSelection(view, documentKey);
    } catch {
      // view may already be destroyed
    }
    dom.removeEventListener('focusin', onFocusIn);
    dom.removeEventListener('focusout', onFocusOut);
    dom.removeEventListener('keyup', onKeyUp);
    dom.removeEventListener('mouseup', onMouseUp);
  };
}

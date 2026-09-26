/**
 * Read / replace CodeMirror selection via md-editor-rt ref.
 * When the source editor is not focused, prefer last source-focus memory
 * (view WeakMap + durable document key) over the live CM selection.
 */

import { Compartment, StateEffect } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import type { RefObject } from 'react';
import { isMdEditorPreviewOnlyUi } from '@/utils/previewMirrorEdit';
import {
  getDurableMdEditorSourceFocus,
  resolveMdEditorSourceFocus,
} from '@/utils/mdEditorSourceFocus';

type MdEditorApi = {
  root?: unknown;
  getEditorView?: () => EditorView | null | undefined;
  getSelectedText?: () => string | undefined;
  value?: MdEditorApi;
};

function isMdEditorApi(candidate: unknown): candidate is MdEditorApi {
  if (!candidate || typeof candidate !== 'object') return false;
  const api = candidate as MdEditorApi;
  return (
    typeof api.getEditorView === 'function'
    || typeof api.getSelectedText === 'function'
  );
}

/** Resolve md-editor-rt imperative API from a React ref (handles optional `.value` wrapper). */
export function resolveMdEditorApiFromRef(
  editorRef: EditorRefLike | null | undefined,
): MdEditorApi | null {
  const current: unknown = editorRef?.current;
  if (!current || typeof current !== 'object') return null;
  if (isMdEditorApi(current)) return current;
  const nested = (current as { value?: unknown }).value;
  if (isMdEditorApi(nested)) return nested;
  return null;
}

function getEditorApiFromRef(editorRef: EditorRefLike | null | undefined): MdEditorApi | null {
  return resolveMdEditorApiFromRef(editorRef);
}

export type EditorRefLike =
  | RefObject<MdEditorApi | null | undefined>
  | { current?: MdEditorApi | null | undefined | { value?: MdEditorApi | null } };

export type EditorSelectionSnapshot = {
  text: string;
  from: number;
  to: number;
  view: EditorView | null;
};

export type ApplyLlmResultToEditorOptions = {
  editorRef: EditorRefLike;
  result: string;
  onChange?: (markdown: string) => void;
  getMarkdown?: () => string;
  /** When true, always insert at document end (ignore source-Editor focus). */
  forceAppendAtEnd?: boolean;
  /** Durable focus key (`storageType:path`) when CM was demoted. */
  documentKey?: string | null;
};

const VIEW_ATTACH_RETRY_MS = [50, 200, 500, 1000] as const;

function getMdEditorRootFromRef(
  editorRef: EditorRefLike | null | undefined,
  view: EditorView | null = null,
): Element | null {
  if (view?.dom) {
    return view.dom.closest('.md-editor');
  }
  const api = getEditorApiFromRef(editorRef);
  if (
    typeof Element !== 'undefined'
    && api?.root instanceof Element
  ) {
    return api.root;
  }
  return null;
}

/**
 * When preview-only is shown or the source editor was never focused for this
 * document, LLM apply should append at document end.
 */
export function shouldAppendLlmResultAtDocEnd(
  editorRef: EditorRefLike | null | undefined,
  {
    view = null,
    documentKey = null,
  }: { view?: EditorView | null; documentKey?: string | null } = {},
): boolean {
  const resolvedView = view ?? getEditorSelectionFromRef(editorRef, { documentKey }).view;
  const root = getMdEditorRootFromRef(editorRef, resolvedView);
  if (isMdEditorPreviewOnlyUi(root)) return true;
  const focus = resolveMdEditorSourceFocus(resolvedView, documentKey);
  if (focus?.everFocused) return false;
  if (!resolvedView?.state) return true;
  return true;
}

function buildAppendInsertAtDocEnd(docText: string, chunk: string): string {
  if (!docText) return chunk;
  return docText.endsWith('\n') ? chunk : `\n${chunk}`;
}

function buildMarkdownAppendedAtDocEnd(docText: string, chunk: string): string {
  if (!docText) return chunk;
  const separator = docText.endsWith('\n') ? '' : '\n';
  return `${docText}${separator}${chunk}`;
}

function clampRange(
  docLength: number,
  from: number,
  to: number,
): { from: number; to: number } {
  const safeFrom = Math.max(0, Math.min(from, docLength));
  const safeTo = Math.max(safeFrom, Math.min(to, docLength));
  return { from: safeFrom, to: safeTo };
}

function applyViaOnChangeString(
  docText: string,
  from: number,
  to: number,
  insert: string,
  onChange?: (markdown: string) => void,
): boolean {
  if (typeof onChange !== 'function') return false;
  const clamped = clampRange(docText.length, from, to);
  const next =
    `${docText.slice(0, clamped.from)}${insert}${docText.slice(clamped.to)}`;
  onChange(next);
  return true;
}

/**
 * Apply LLM output: replace last source-Editor focus range, or append at
 * document end when preview-only, the source Editor was never focused, or
 * forceAppendAtEnd is set.
 *
 * When the source CM does not have keyboard focus, always use last-focus
 * memory (not the live selection that may have collapsed after panel focus).
 */
export function applyLlmResultToEditor({
  editorRef,
  result,
  onChange,
  getMarkdown,
  forceAppendAtEnd = false,
  documentKey = null,
}: ApplyLlmResultToEditorOptions): boolean {
  const snapshot = getEditorSelectionFromRef(editorRef, { documentKey });
  const { view } = snapshot;
  const appendAtEnd =
    forceAppendAtEnd || shouldAppendLlmResultAtDocEnd(editorRef, { view, documentKey });

  if (appendAtEnd) {
    const docText =
      view?.state?.doc?.toString?.()
      ?? (typeof getMarkdown === 'function' ? getMarkdown() : '');
    const insert = buildAppendInsertAtDocEnd(docText, result);
    if (view?.state) {
      const at = docText.length;
      return replaceEditorRange(view, at, at, insert, onChange);
    }
    if (typeof onChange === 'function') {
      onChange(buildMarkdownAppendedAtDocEnd(docText, result));
      return true;
    }
    return false;
  }

  const focus = resolveMdEditorSourceFocus(view, documentKey);
  let from = snapshot.from;
  let to = snapshot.to;
  const sourceHasFocus = Boolean(view?.hasFocus);

  if (!sourceHasFocus && focus?.everFocused) {
    from = focus.from;
    to = focus.to;
  } else if (from === to && focus?.everFocused) {
    from = focus.from;
    to = focus.to;
  }

  if (!focus?.everFocused && from === to && !snapshot.text.trim()) {
    return false;
  }

  if (view?.state) {
    const docLength = view.state.doc.length;
    const clamped = clampRange(docLength, from, to);
    return replaceEditorRange(view, clamped.from, clamped.to, result, onChange);
  }

  const docText = typeof getMarkdown === 'function' ? getMarkdown() : '';
  return applyViaOnChangeString(docText, from, to, result, onChange);
}

function readSelectionFromView(
  view: EditorView,
  api: MdEditorApi | null,
  documentKey?: string | null,
): EditorSelectionSnapshot {
  const sel = view.state.selection.main;
  const sourceHasFocus = Boolean(view.hasFocus);
  const focus = resolveMdEditorSourceFocus(view, documentKey);

  // Source CM focused: live selection wins.
  if (sourceHasFocus) {
    const liveText = view.state.doc.sliceString(sel.from, sel.to);
    if (liveText) {
      return { text: liveText, from: sel.from, to: sel.to, view };
    }
    if (focus?.everFocused) {
      const docLength = view.state.doc.length;
      const { from, to } = clampRange(docLength, focus.from, focus.to);
      return {
        text: view.state.doc.sliceString(from, to),
        from,
        to,
        view,
      };
    }
    const apiText = api?.getSelectedText?.() ?? '';
    if (apiText) {
      return { text: apiText, from: sel.from, to: sel.to, view };
    }
    return { text: '', from: sel.from, to: sel.to, view };
  }

  // Panel / other UI focused: always prefer last source-focus range.
  if (focus?.everFocused) {
    const docLength = view.state.doc.length;
    const { from, to } = clampRange(docLength, focus.from, focus.to);
    return {
      text: view.state.doc.sliceString(from, to),
      from,
      to,
      view,
    };
  }

  const liveText = view.state.doc.sliceString(sel.from, sel.to);
  if (liveText) {
    return { text: liveText, from: sel.from, to: sel.to, view };
  }

  const apiText = api?.getSelectedText?.() ?? '';
  if (apiText) {
    return { text: apiText, from: sel.from, to: sel.to, view };
  }

  return { text: liveText, from: sel.from, to: sel.to, view };
}

export function getEditorSelectionFromRef(
  editorRef: EditorRefLike | null | undefined,
  options?: {
    getEditorApi?: () => MdEditorApi | null;
    documentKey?: string | null;
  },
): EditorSelectionSnapshot {
  const documentKey = options?.documentKey ?? null;
  const api = options?.getEditorApi?.() ?? resolveMdEditorApiFromRef(editorRef);
  const view = api?.getEditorView?.() ?? null;
  if (view?.state) {
    return readSelectionFromView(view, api, documentKey);
  }

  const durable = getDurableMdEditorSourceFocus(documentKey);
  if (durable?.everFocused) {
    return { text: '', from: durable.from, to: durable.to, view: null };
  }

  const fallbackText = api?.getSelectedText?.() ?? '';
  return { text: fallbackText, from: 0, to: 0, view: null };
}

function getEditorViewFromRef(
  editorRef: EditorRefLike | null | undefined,
): EditorView | null {
  const api = getEditorApiFromRef(editorRef);
  return api?.getEditorView?.() ?? null;
}

/**
 * Subscribe to CodeMirror selection changes for an md-editor-rt ref.
 * Retries until the source view mounts; returns cleanup.
 */
export function subscribeEditorSelectionFromRef(
  editorRef: EditorRefLike | null | undefined,
  onChange: (snapshot: EditorSelectionSnapshot) => void,
  options?: { documentKey?: string | null },
): () => void {
  let disposed = false;
  let attachedView: EditorView | null = null;
  let detachListener: (() => void) | null = null;
  const retryTimers: ReturnType<typeof setTimeout>[] = [];
  const documentKey = options?.documentKey ?? null;

  const emit = () => {
    if (disposed) return;
    onChange(getEditorSelectionFromRef(editorRef, { documentKey }));
  };

  const detach = () => {
    detachListener?.();
    detachListener = null;
    attachedView = null;
  };

  let selectionCompartment: Compartment | null = null;
  let selectionCompartmentAttached = false;

  const tryAttach = (): boolean => {
    if (disposed) return true;
    const view = getEditorViewFromRef(editorRef);
    if (!view || view === attachedView) return Boolean(view);
    detach();
    attachedView = view;
    selectionCompartmentAttached = false;
    if (!selectionCompartment) {
      selectionCompartment = new Compartment();
    }
    const compartment = selectionCompartment;
    const extension = EditorView.updateListener.of((update) => {
      if (update.selectionSet) {
        emit();
      }
    });
    if (selectionCompartmentAttached) {
      try {
        view.dispatch({ effects: compartment.reconfigure(extension) });
      } catch {
        selectionCompartmentAttached = false;
      }
    }
    if (!selectionCompartmentAttached) {
      try {
        view.dispatch({
          effects: StateEffect.appendConfig.of(compartment.of(extension)),
        });
        selectionCompartmentAttached = true;
      } catch {
        emit();
        return true;
      }
    }
    detachListener = () => {
      if (!selectionCompartmentAttached) return;
      try {
        view.dispatch({ effects: compartment.reconfigure([]) });
      } catch {
        // view may already be destroyed
      }
      selectionCompartmentAttached = false;
    };
    emit();
    return true;
  };

  if (!tryAttach()) {
    for (const delay of VIEW_ATTACH_RETRY_MS) {
      retryTimers.push(
        setTimeout(() => {
          if (!disposed) tryAttach();
        }, delay),
      );
    }
  }

  return () => {
    disposed = true;
    for (const timer of retryTimers) clearTimeout(timer);
    detach();
  };
}

export function replaceEditorRange(
  view: EditorView | null | undefined,
  from: number,
  to: number,
  insert: string,
  onChange?: (markdown: string) => void,
): boolean {
  if (!view?.state) return false;
  view.dispatch({
    changes: { from, to, insert },
    selection: { anchor: from + insert.length },
  });
  view.focus?.();
  onChange?.(view.state.doc.toString());
  return true;
}

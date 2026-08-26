/**
 * Read / replace CodeMirror selection via md-editor-rt ref.
 */

import type { EditorView } from '@codemirror/view';
import type { RefObject } from 'react';
import { isMdEditorPreviewOnlyUi } from '@/utils/previewMirrorEdit';
import { getMdEditorSourceFocus } from '@/utils/mdEditorSourceFocus';

type MdEditorApi = {
  root?: unknown;
  getEditorView?: () => EditorView | null | undefined;
  value?: MdEditorApi;
};

type EditorRefLike =
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
};

function getEditorApiFromRef(editorRef: EditorRefLike | null | undefined): MdEditorApi | null {
  const current = editorRef?.current as
    | (MdEditorApi & { value?: MdEditorApi })
    | null
    | undefined;
  return current?.value ?? current ?? null;
}

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
  { view = null }: { view?: EditorView | null } = {},
): boolean {
  const resolvedView = view ?? getEditorSelectionFromRef(editorRef).view;
  const root = getMdEditorRootFromRef(editorRef, resolvedView);
  if (isMdEditorPreviewOnlyUi(root)) return true;
  if (!resolvedView?.state) return true;
  if (!getMdEditorSourceFocus(resolvedView)?.everFocused) return true;
  return false;
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

/**
 * Apply LLM output: replace last source-Editor focus range, or append at
 * document end when preview-only, the source Editor was never focused, or
 * forceAppendAtEnd is set.
 */
export function applyLlmResultToEditor({
  editorRef,
  result,
  onChange,
  getMarkdown,
  forceAppendAtEnd = false,
}: ApplyLlmResultToEditorOptions): boolean {
  const { view } = getEditorSelectionFromRef(editorRef);
  const appendAtEnd =
    forceAppendAtEnd || shouldAppendLlmResultAtDocEnd(editorRef, { view });

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

  const focus = getMdEditorSourceFocus(view);
  if (!focus?.everFocused || !view?.state) return false;

  const docLength = view.state.doc.length;
  const { from, to } = clampRange(docLength, focus.from, focus.to);
  return replaceEditorRange(view, from, to, result, onChange);
}

export function getEditorSelectionFromRef(
  editorRef: EditorRefLike | null | undefined,
): EditorSelectionSnapshot {
  const api = getEditorApiFromRef(editorRef);
  const view = api?.getEditorView?.() ?? null;
  if (!view?.state) {
    return { text: '', from: 0, to: 0, view: null };
  }
  const sel = view.state.selection.main;
  const text = view.state.doc.sliceString(sel.from, sel.to);
  return { text, from: sel.from, to: sel.to, view };
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

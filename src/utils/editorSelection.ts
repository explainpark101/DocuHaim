/**
 * Read / replace CodeMirror selection via md-editor-rt ref.
 */

import { isMdEditorPreviewOnlyUi } from '@/utils/previewMirrorEdit';

function getEditorApiFromRef(editorRef: any) {
  return editorRef?.current?.value ?? editorRef?.current ?? null;
}

import type { EditorView } from '@codemirror/view';

function getMdEditorRootFromRef(editorRef: any, view: EditorView | null = null) {
  if (view?.dom) {
    return view.dom.closest('.md-editor');
  }
  const api = getEditorApiFromRef(editorRef);
  if (api?.root instanceof Element) return api.root;
  return null;
}

/**
 * When preview-only is shown or the source editor has no focus/selection,
 * LLM apply should append at document end instead of replacing a stale range.
 */
export function shouldAppendLlmResultAtDocEnd(editorRef: any, { view = null, from = 0, to = 0 } = {}) {
  const resolvedView = view ?? getEditorSelectionFromRef(editorRef).view;
  const root = getMdEditorRootFromRef(editorRef, resolvedView);
  if (isMdEditorPreviewOnlyUi(root)) return true;
  if (!resolvedView?.state) return true;
  if (!resolvedView.hasFocus && from === to) return true;
  return false;
}

function buildAppendInsertAtDocEnd(docText: any, chunk: any) {
  if (!docText) return chunk;
  return docText.endsWith('\n') ? chunk : `\n${chunk}`;
}

function buildMarkdownAppendedAtDocEnd(docText: any, chunk: any) {
  if (!docText) return chunk;
  const separator = docText.endsWith('\n') ? '' : '\n';
  return `${docText}${separator}${chunk}`;
}

/**
 * Apply LLM output: replace selection, or append at document end when preview-only
 * or the editor is not focused with an empty selection.
 *
 * @param {{
 *   editorRef: import('react').RefObject<unknown>;
 *   from: number;
 *   to: number;
 *   result: string;
 *   onChange?: (markdown: string) => void;
 *   getMarkdown?: () => string;
 * }} opts
 */
export function applyLlmResultToEditor({
  editorRef,
  from,
  to,
  result,
  onChange,
  getMarkdown
}: any) {
  const { view } = getEditorSelectionFromRef(editorRef);
  const appendAtEnd = shouldAppendLlmResultAtDocEnd(editorRef, { view, from, to });

  if (appendAtEnd) {
    const docText =
      view?.state?.doc?.toString?.() ?? (typeof getMarkdown === 'function' ? getMarkdown() : '');
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

  return replaceEditorRange(view, from, to, result, onChange);
}

export function getEditorSelectionFromRef(editorRef: any) {
  const api = editorRef?.current?.value ?? editorRef?.current;
  const view = api?.getEditorView?.();
  if (!view?.state) {
    return { text: '', from: 0, to: 0, view: null };
  }
  const sel = view.state.selection.main;
  const text = view.state.doc.sliceString(sel.from, sel.to);
  return { text, from: sel.from, to: sel.to, view };
}

/**
 * @param {import('@codemirror/view').EditorView | null} view
 * @param {number} from
 * @param {number} to
 * @param {string} insert
 * @param {(markdown: string) => void} [onChange]
 */
export function replaceEditorRange(view: any, from: any, to: any, insert: any, onChange: any) {
  if (!view?.state) return false;
  view.dispatch({
    changes: { from, to, insert },
    selection: { anchor: from + insert.length },
  });
  view.focus?.();
  onChange?.(view.state.doc.toString());
  return true;
}

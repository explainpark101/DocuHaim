/**
 * Read / replace CodeMirror selection via md-editor-rt ref.
 */

export function getEditorSelectionFromRef(editorRef) {
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
export function replaceEditorRange(view, from, to, insert, onChange) {
  if (!view?.state) return false;
  view.dispatch({
    changes: { from, to, insert },
    selection: { anchor: from + insert.length },
  });
  view.focus?.();
  onChange?.(view.state.doc.toString());
  return true;
}

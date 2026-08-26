/**
 * Rebuild CodeMirror undo history from content checkpoints so Ctrl+Z
 * works after reopening a file (md-editor-rt resetHistory + replay).
 */
import { Transaction } from '@codemirror/state';
import { isolateHistory } from '@codemirror/commands';

/**
 * @param {import('@codemirror/view').EditorView | null | undefined} view
 * @param {string[]} stack oldest → newest (last item should match current doc)
 * @param {() => void} [resetHistory]
 * @returns {boolean}
 */
export function rebuildCmHistoryFromStack(view: any, stack: any, resetHistory: any) {
  if (!view?.state || !Array.isArray(stack) || stack.length === 0) {
    resetHistory?.();
    return false;
  }

  const target = stack[stack.length - 1] ?? '';

  if (stack.length === 1) {
    const doc = view.state.doc.toString();
    if (doc !== target) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: target },
        annotations: [Transaction.addToHistory.of(false)],
      });
    }
    resetHistory?.();
    return true;
  }

  // Base document (oldest checkpoint), not recorded in history.
  view.dispatch({
    changes: { from: 0, to: view.state.doc.length, insert: stack[0] ?? '' },
    annotations: [
      Transaction.addToHistory.of(false),
      isolateHistory.of('full'),
    ],
  });
  resetHistory?.();

  for (let i = 1; i < stack.length; i += 1) {
    const next = stack[i] ?? '';
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: next },
      annotations: [isolateHistory.of('full')],
    });
  }

  const finalDoc = view.state.doc.toString();
  if (finalDoc !== target) {
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: target },
      annotations: [Transaction.addToHistory.of(false)],
    });
  }

  return true;
}

/**
 * @param {object | null | undefined} editorApi md-editor-rt expose ref
 * @returns {(() => void) | null}
 */
export function getResetHistoryFn(editorApi: any) {
  if (!editorApi) return null;
  if (typeof editorApi.resetHistory === 'function') {
    return () => editorApi.resetHistory();
  }
  return null;
}

/**
 * @param {object | null | undefined} editorApi
 * @returns {import('@codemirror/view').EditorView | null}
 */
export function getEditorViewFromApi(editorApi: any) {
  if (!editorApi) return null;
  return editorApi.getEditorView?.() ?? null;
}

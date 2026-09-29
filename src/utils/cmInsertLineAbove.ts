/**
 * Insert a blank line above the primary caret (VS Code Ctrl/Cmd+Shift+Enter).
 */

import { Prec } from '@codemirror/state';
import { keymap, type EditorView, type KeyBinding } from '@codemirror/view';

/** Dispatch insert-above; returns true when handled (CodeMirror command contract). */
export function insertLineAboveInEditorView(view: EditorView | null | undefined): boolean {
  if (!view?.state) return false;
  const head = view.state.selection?.main?.head;
  if (typeof head !== 'number') return false;
  const line = view.state.doc.lineAt(head);
  view.dispatch({
    changes: { from: line.from, to: line.from, insert: '\n' },
    selection: { anchor: line.from },
    scrollIntoView: true,
  });
  return true;
}

/** True when the event is Ctrl/Cmd+Shift+Enter (incl. NumpadEnter). */
export function isInsertLineAboveKeyEvent(
  e: Pick<KeyboardEvent, 'key' | 'code' | 'ctrlKey' | 'metaKey' | 'shiftKey' | 'altKey'>,
): boolean {
  if (e.altKey || !e.shiftKey) return false;
  if (!(e.ctrlKey || e.metaKey)) return false;
  const key = (e.key || '').toLowerCase();
  if (key === 'enter') return true;
  return e.code === 'Enter' || e.code === 'NumpadEnter';
}

const INSERT_LINE_ABOVE_BINDING: KeyBinding = {
  key: 'Mod-Shift-Enter',
  preventDefault: true,
  run: insertLineAboveInEditorView,
};

/** High precedence so default Mod-Enter / Enter bindings do not swallow the chord. */
export const INSERT_LINE_ABOVE_KEYMAP = Prec.highest(keymap.of([INSERT_LINE_ABOVE_BINDING]));

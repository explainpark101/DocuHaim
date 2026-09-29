/**
 * Mod-Shift-Enter: insert an empty paragraph above the current textblock
 * (WYSIWYG counterpart to CodeMirror insert-line-above).
 */

import { Extension } from '@tiptap/core';
import { TextSelection, type Transaction } from '@tiptap/pm/state';
import type { Node as ProseMirrorNode, ResolvedPos } from '@tiptap/pm/model';
import type { EditorView } from '@tiptap/pm/view';

function textblockDepth($pos: ResolvedPos): number {
  for (let d = $pos.depth; d > 0; d -= 1) {
    if ($pos.node(d).isTextblock) return d;
  }
  return -1;
}

/**
 * Insert an empty paragraph before the current textblock; place caret inside it.
 * Returns true when a transaction was applied.
 */
export function insertParagraphAboveSelection(
  view: EditorView,
  dispatch?: (tr: Transaction) => void,
): boolean {
  const { state } = view;
  const paragraph = state.schema.nodes.paragraph;
  if (!paragraph) return false;

  const $head = state.selection.$head;
  const depth = textblockDepth($head);
  if (depth < 0) return false;

  const insertPos = $head.before(depth);
  const empty = paragraph.createAndFill();
  if (!empty) return false;

  let tr = state.tr.insert(insertPos, empty);
  try {
    tr = tr.setSelection(TextSelection.near(tr.doc.resolve(insertPos + 1)));
  } catch {
    return false;
  }
  tr.scrollIntoView();
  (dispatch ?? view.dispatch)(tr);
  return true;
}

/** Pure helper for unit tests — compute insert position for a head caret. */
export function paragraphAboveInsertPos(
  doc: ProseMirrorNode,
  head: number,
): number | null {
  try {
    const $head = doc.resolve(head);
    const depth = textblockDepth($head);
    if (depth < 0) return null;
    return $head.before(depth);
  } catch {
    return null;
  }
}

export const HaimInsertLineAbove = Extension.create({
  name: 'haimInsertLineAbove',
  priority: 1000,

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-Enter': ({ editor }) =>
        insertParagraphAboveSelection(editor.view),
    };
  },
});

export default HaimInsertLineAbove;

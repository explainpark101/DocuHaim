/**
 * Enter inside markdown fenced code bodies in HaimSourcePane:
 * insert newline + current line indent (matches WYSIWYG code-block Enter).
 * Does not exit the fence (source stays in markdown).
 */

import { EditorSelection, EditorState, Prec, type TransactionSpec } from '@codemirror/state';
import { keymap, type EditorView, type KeyBinding } from '@codemirror/view';
import { indentAtOffset } from '@/components/haimEditor/codeBlockEnterShared';
import { findCodeFenceBodyAt } from '@/components/haimEditor/cmCodeFenceIndent';

function isSelectionInsideSameCodeFence(state: EditorState): boolean {
  const { from, to, empty } = state.selection.main;
  const fenceFrom = findCodeFenceBodyAt(state, from);
  if (!fenceFrom) return false;
  if (empty) return true;
  const fenceTo = findCodeFenceBodyAt(state, Math.max(from, to - 1));
  if (!fenceTo || fenceTo.bodyFrom !== fenceFrom.bodyFrom) return false;
  if (from < fenceFrom.bodyFrom || to > fenceFrom.bodyTo) return false;
  return true;
}

export function buildCodeFenceIndentEnterTransaction(
  state: EditorState,
): TransactionSpec | null {
  if (!isSelectionInsideSameCodeFence(state)) return null;
  const { from, to } = state.selection.main;
  const fence = findCodeFenceBodyAt(state, from);
  if (!fence) return null;

  const bodyText = state.doc.sliceString(fence.bodyFrom, fence.bodyTo);
  const offsetInBody = from - fence.bodyFrom;
  const indent = indentAtOffset(bodyText, offsetInBody);
  const insert = `\n${indent}`;
  return {
    changes: { from, to, insert },
    selection: EditorSelection.cursor(from + insert.length),
    userEvent: 'input',
  };
}

export function indentEnterCodeFence(view: EditorView): boolean {
  const spec = buildCodeFenceIndentEnterTransaction(view.state);
  if (!spec) return false;
  view.dispatch(spec);
  return true;
}

const CODE_FENCE_ENTER_BINDING: KeyBinding = {
  key: 'Enter',
  run: indentEnterCodeFence,
};

/** High precedence so fence Enter wins over default newline. */
export const CODE_FENCE_ENTER_KEYMAP = Prec.high(
  keymap.of([CODE_FENCE_ENTER_BINDING]),
);

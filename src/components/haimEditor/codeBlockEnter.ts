/**
 * Enter / Shift-Enter inside TipTap code blocks:
 * - Enter: preserve current line indent on newline; exit after two blank lines
 * - Shift-Enter: insert a blank line above the current line (stay inside the block)
 */

import type { Editor } from '@tiptap/core';
import { TextSelection, type EditorState, type Transaction } from '@tiptap/pm/state';
import {
  endsWithTwoBlankCodeLines,
  indentAtOffset,
  trimCodeFenceBlankLines,
} from '@/components/haimEditor/codeBlockEnterShared';

function isInCodeBlock(state: EditorState): boolean {
  return state.selection.$from.parent.type.name === 'codeBlock';
}

/**
 * Build indent-preserving newline transaction, or null if not in a code block.
 */
export function buildCodeBlockIndentEnterTransaction(
  state: EditorState,
): Transaction | null {
  if (!isInCodeBlock(state)) return null;
  const { $from, from, to } = state.selection;
  const text = $from.parent.textContent;
  const indent = indentAtOffset(text, $from.parentOffset);
  const insert = `\n${indent}`;
  const tr = state.tr.insertText(insert, from, to);
  tr.setSelection(TextSelection.create(tr.doc, from + insert.length));
  return tr;
}

/**
 * Insert a blank line above the line containing the caret (CM insert-line-above parity).
 */
export function buildCodeBlockInsertLineAboveTransaction(
  state: EditorState,
): Transaction | null {
  if (!isInCodeBlock(state)) return null;
  const { $from } = state.selection;
  const text = $from.parent.textContent;
  const offset = $from.parentOffset;
  const lineStartInText = text.lastIndexOf('\n', offset - 1) + 1;
  const absLineStart = $from.start() + lineStartInText;
  const tr = state.tr.insertText('\n', absLineStart);
  tr.setSelection(TextSelection.create(tr.doc, absLineStart));
  return tr;
}

/**
 * When caret is at the end and the block already ends with two blank lines,
 * trim trailing blanks so exitCode leaves a clean fence body.
 */
export function buildCodeBlockExitTrimTransaction(
  state: EditorState,
): Transaction | null {
  if (!isInCodeBlock(state)) return null;
  const { $from, empty } = state.selection;
  if (!empty) return null;

  const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2;
  if (!isAtEnd) return null;

  const text = $from.parent.textContent;
  if (!endsWithTwoBlankCodeLines(text)) return null;

  const trimmed = trimCodeFenceBlankLines(text);
  const from = $from.start();
  const to = $from.end();
  const tr = state.tr.insertText(trimmed, from, to);
  tr.setSelection(TextSelection.create(tr.doc, from + trimmed.length));
  return tr;
}

function applyExitTrim(tr: Transaction, state: EditorState): boolean {
  const { $from, empty } = state.selection;
  if (!empty) return false;
  if ($from.parent.type.name !== 'codeBlock') return false;
  if ($from.parentOffset !== $from.parent.nodeSize - 2) return false;
  const text = $from.parent.textContent;
  if (!endsWithTwoBlankCodeLines(text)) return false;
  const trimmed = trimCodeFenceBlankLines(text);
  const from = $from.start();
  const to = $from.end();
  tr.insertText(trimmed, from, to);
  tr.setSelection(TextSelection.create(tr.doc, from + trimmed.length));
  return true;
}

/**
 * Handle Enter in a code block. Returns true when handled.
 */
export function tryHandleCodeBlockEnter(editor: Editor): boolean {
  const { state } = editor;
  if (!isInCodeBlock(state)) return false;

  if (buildCodeBlockExitTrimTransaction(state)) {
    return editor
      .chain()
      .command(({ tr, state: st }) => applyExitTrim(tr, st))
      .exitCode()
      .run();
  }

  const enterTr = buildCodeBlockIndentEnterTransaction(state);
  if (!enterTr) return false;
  editor.view.dispatch(enterTr);
  return true;
}

/**
 * Handle Shift-Enter in a code block: newline above current line (stay inside).
 * Prevents HardBreak from escaping the block.
 */
export function tryHandleCodeBlockShiftEnter(editor: Editor): boolean {
  const tr = buildCodeBlockInsertLineAboveTransaction(editor.state);
  if (!tr) return false;
  editor.view.dispatch(tr);
  return true;
}

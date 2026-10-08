/**
 * Ctrl/Cmd+/ toggle comment inside TipTap codeBlock nodes (language-aware).
 */

import { TextSelection, type EditorState, type Transaction } from '@tiptap/pm/state';
import type { Editor } from '@tiptap/core';
import { collectIntersectingCodeBlockLineStarts } from '@/components/haimEditor/codeBlockIndent';
import { resolveCodeBlockCommentTokens } from '@/components/haimEditor/codeBlockCommentTokens';
import {
  planToggleBlockCommentByLine,
  planToggleLineComment,
  sortCommentChangesDescending,
  type BlockLineRange,
  type CommentLineInfo,
  type CommentTextChange,
} from '@/components/haimEditor/codeBlockCommentTogglePlan';

function isInCodeBlock(state: EditorState): boolean {
  return state.selection.$from.parent.type.name === 'codeBlock';
}

function getCodeBlockLanguage(state: EditorState): string {
  const { $from } = state.selection;
  if ($from.parent.type.name !== 'codeBlock') return '';
  return String($from.parent.attrs.language || '');
}

function lineTextAt(state: EditorState, lineStart: number): string {
  const $pos = state.doc.resolve(lineStart);
  const codeEnd = $pos.end();
  const text = state.doc.textBetween(lineStart, codeEnd, '\n', '\n');
  const nl = text.indexOf('\n');
  return nl < 0 ? text : text.slice(0, nl);
}

function collectSelectedLines(state: EditorState): CommentLineInfo[] {
  const { from, to, empty } = state.selection;
  const $from = state.selection.$from;
  if ($from.parent.type.name !== 'codeBlock') return [];

  if (empty) {
    const codeStart = $from.start();
    const codeEnd = $from.end();
    const allText = state.doc.textBetween(codeStart, codeEnd, '\n', '\n');
    const lines = allText.split('\n');
    const relative = $from.pos - codeStart;
    let lineStart = codeStart;
    let charCount = 0;
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i] ?? '';
      if (charCount + line.length >= relative || i === lines.length - 1) {
        return [{ from: lineStart, text: line }];
      }
      charCount += line.length + 1;
      lineStart += line.length + 1;
    }
    return [];
  }

  const starts = collectIntersectingCodeBlockLineStarts(state, from, to);
  return starts.map((lineStart) => ({
    from: lineStart,
    text: lineTextAt(state, lineStart),
  }));
}

function toBlockRanges(lines: readonly CommentLineInfo[]): BlockLineRange[] {
  return lines.map((line) => {
    const lead = /^\s*/.exec(line.text)?.[0].length ?? 0;
    const from = line.from + lead;
    const to = line.from + line.text.length;
    return {
      from,
      to,
      content: line.text.slice(lead),
    };
  });
}

function applyChanges(
  state: EditorState,
  changes: CommentTextChange[],
): Transaction {
  const tr = state.tr;
  const ordered = sortCommentChangesDescending(changes);
  for (const ch of ordered) {
    if (ch.to != null && ch.to !== ch.from) {
      tr.insertText(ch.insert, ch.from, ch.to);
    } else {
      tr.insertText(ch.insert, ch.from);
    }
  }
  // Keep selection mapped; for empty caret, map the original position.
  const { from, to, empty } = state.selection;
  if (empty) {
    const mapped = tr.mapping.map(from, 1);
    tr.setSelection(TextSelection.create(tr.doc, mapped));
  } else {
    const newFrom = tr.mapping.map(from, -1);
    const newTo = tr.mapping.map(to, 1);
    tr.setSelection(
      TextSelection.create(tr.doc, newFrom, Math.max(newFrom, newTo)),
    );
  }
  return tr;
}

/** Build a toggle-comment transaction when the caret/selection is in a code block. */
export function buildCodeBlockToggleCommentTransaction(
  state: EditorState,
): Transaction | null {
  if (!isInCodeBlock(state)) return null;

  const lines = collectSelectedLines(state);
  if (lines.length === 0) return null;

  const tokens = resolveCodeBlockCommentTokens(getCodeBlockLanguage(state));
  let changes: CommentTextChange[] | null = null;

  if (tokens.line) {
    changes = planToggleLineComment(lines, tokens.line);
  } else if (tokens.block) {
    changes = planToggleBlockCommentByLine(
      toBlockRanges(lines),
      tokens.block.open,
      tokens.block.close,
    );
  }

  if (!changes || changes.length === 0) return null;
  return applyChanges(state, changes);
}

/** TipTap keyboard shortcut handler for Mod-/. */
export function tryHandleCodeBlockToggleComment(editor: Editor): boolean {
  const tr = buildCodeBlockToggleCommentTransaction(editor.state);
  if (!tr) return false;
  editor.view.dispatch(tr);
  return true;
}

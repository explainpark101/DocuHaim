/**
 * Mod-/ toggle comment inside markdown fenced code bodies (language-aware).
 * Outside fences returns false so defaultKeymap toggleComment (HTML) can run.
 */

import {
  EditorSelection,
  Prec,
  type ChangeSpec,
  type TransactionSpec,
} from '@codemirror/state';
import { keymap, type EditorView, type KeyBinding } from '@codemirror/view';
import {
  collectFenceBodyLineStarts,
  findCodeFenceBodyAt,
} from '@/components/haimEditor/cmCodeFenceIndent';
import { resolveCodeBlockCommentTokens } from '@/components/haimEditor/codeBlockCommentTokens';
import {
  planToggleBlockCommentByLine,
  planToggleLineComment,
  type BlockLineRange,
  type CommentLineInfo,
  type CommentTextChange,
} from '@/components/haimEditor/codeBlockCommentTogglePlan';

function collectSelectedFenceLines(
  state: EditorView['state'],
): { language: string; lines: CommentLineInfo[] } | null {
  const { from, to, empty } = state.selection.main;
  const fence = findCodeFenceBodyAt(state, from);
  if (!fence) return null;
  if (!empty) {
    const fenceTo = findCodeFenceBodyAt(state, Math.max(from, to - 1));
    if (!fenceTo || fenceTo.bodyFrom !== fence.bodyFrom) return null;
  }

  const lineStarts = empty
    ? (() => {
        const line = state.doc.lineAt(from);
        if (line.from < fence.bodyFrom || line.from >= fence.bodyTo) return [];
        return [line.from];
      })()
    : collectFenceBodyLineStarts(
        state,
        fence.bodyFrom,
        fence.bodyTo,
        from,
        to,
      );

  if (lineStarts.length === 0) return null;

  const lines: CommentLineInfo[] = lineStarts.map((lineFrom) => {
    const line = state.doc.lineAt(lineFrom);
    // Cap at fence body end (last line may extend past bodyTo conceptually).
    const end = Math.min(line.to, fence.bodyTo);
    return {
      from: line.from,
      text: state.doc.sliceString(line.from, end),
    };
  });

  return { language: fence.language, lines };
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

function toChangeSpecs(changes: CommentTextChange[]): ChangeSpec[] {
  return changes.map((ch) => {
    if (ch.to != null && ch.to !== ch.from) {
      return { from: ch.from, to: ch.to, insert: ch.insert };
    }
    return { from: ch.from, insert: ch.insert };
  });
}

export function buildCodeFenceToggleCommentTransaction(
  state: EditorView['state'],
): TransactionSpec | null {
  const selected = collectSelectedFenceLines(state);
  if (!selected) return null;

  const tokens = resolveCodeBlockCommentTokens(selected.language);
  let planned: CommentTextChange[] | null = null;

  if (tokens.line) {
    planned = planToggleLineComment(selected.lines, tokens.line);
  } else if (tokens.block) {
    planned = planToggleBlockCommentByLine(
      toBlockRanges(selected.lines),
      tokens.block.open,
      tokens.block.close,
    );
  }

  if (!planned || planned.length === 0) return null;

  const changes = toChangeSpecs(planned);
  const { from, to, empty } = state.selection.main;
  // Let CM map selection through changes (same as changeLineComment associate=1).
  const changeSet = state.changes(changes);
  if (empty) {
    return {
      changes: changeSet,
      selection: EditorSelection.cursor(changeSet.mapPos(from, 1)),
      userEvent: 'input.comment',
    };
  }
  return {
    changes: changeSet,
    selection: EditorSelection.range(
      changeSet.mapPos(from, -1),
      changeSet.mapPos(to, 1),
    ),
    userEvent: 'input.comment',
  };
}

export function toggleCodeFenceComment(view: EditorView): boolean {
  if (view.state.readOnly) return false;
  const spec = buildCodeFenceToggleCommentTransaction(view.state);
  if (!spec) return false;
  view.dispatch(spec);
  return true;
}

const CODE_FENCE_TOGGLE_COMMENT_BINDING: KeyBinding = {
  key: 'Mod-/',
  run: toggleCodeFenceComment,
};

/**
 * High precedence so fence language tokens win over markdown HTML comments.
 * Returns false outside fences → defaultKeymap toggleComment.
 */
export const CODE_FENCE_TOGGLE_COMMENT_KEYMAP = Prec.high(
  keymap.of([CODE_FENCE_TOGGLE_COMMENT_BINDING]),
);

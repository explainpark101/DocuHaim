import {
  codeFolding,
  foldEffect,
  foldService,
  foldedRanges,
  unfoldEffect,
} from '@codemirror/language';
import type { EditorState, Extension, Text } from '@codemirror/state';
import { EditorView, lineNumbers } from '@codemirror/view';
import { findNoteCoverCommentRange } from '@/utils/noteCover/parse';

function findNoteCoverDocRange(doc: Text): { from: number; to: number } | null {
  // Cover comment is always at the document start — scan a bounded prefix.
  const prefixLen = Math.min(doc.length, 2_000_000);
  return findNoteCoverCommentRange(doc.sliceString(0, prefixLen));
}

/** Range to hide when folding cover to a single visible line (end of first → end of comment). */
export function getNoteCoverFoldRange(
  state: EditorState,
): { from: number; to: number } | null {
  const cover = findNoteCoverDocRange(state.doc);
  if (!cover) return null;
  const firstLine = state.doc.lineAt(cover.from);
  if (firstLine.to >= cover.to) return null;
  return { from: firstLine.to, to: cover.to };
}

function isCoverRangeFolded(
  state: EditorState,
  fold: { from: number; to: number },
): boolean {
  let folded = false;
  foldedRanges(state).between(fold.from, fold.to, () => {
    folded = true;
  });
  return folded;
}

export function toggleNoteCoverFold(view: EditorView): boolean {
  const fold = getNoteCoverFoldRange(view.state);
  if (!fold) return false;
  const folded = isCoverRangeFolded(view.state, fold);
  view.dispatch({
    effects: folded ? unfoldEffect.of(fold) : foldEffect.of(fold),
  });
  return true;
}

/**
 * Code folding + line-number click to collapse note-cover JSON to one line.
 */
export function createNoteCoverFoldExtension(): Extension {
  return [
    codeFolding({
      placeholderText: '…표지…',
    }),
    foldService.of((state, lineStart) => {
      const cover = findNoteCoverDocRange(state.doc);
      if (!cover) return null;
      const firstLine = state.doc.lineAt(cover.from);
      if (lineStart !== firstLine.from) return null;
      return getNoteCoverFoldRange(state);
    }),
    lineNumbers({
      domEventHandlers: {
        mousedown(view, line, event) {
          if (!(event instanceof MouseEvent) || event.button !== 0) return false;
          const cover = findNoteCoverDocRange(view.state.doc);
          if (!cover) return false;
          if (line.from < cover.from || line.from >= cover.to) return false;
          if (!toggleNoteCoverFold(view)) return false;
          event.preventDefault();
          return true;
        },
      },
    }),
  ];
}

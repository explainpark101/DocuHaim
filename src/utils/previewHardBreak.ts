/**
 * Mirror Edit (caret from preview): Enter inserts an HTML hard break so the
 * preview keeps a real <br> inside the same [data-line] block.
 */

import { EditorSelection } from '@codemirror/state';
import { isMirrorEditCaretFromPreview } from '@/utils/previewImageCaretSync';

/** Canonical hard-break insertion for preview-driven Enter. */
import type { EditorView } from '@codemirror/view';
export const PREVIEW_HARD_BREAK_INSERT = '<br/>\n';

/**
 * Insert `<br/>\\n` at the main selection when Mirror Edit caret originated
 * from the preview. Returns false when the default Enter path should run.
 */
export function insertPreviewHardBreak(view: EditorView): boolean {
  if (!isMirrorEditCaretFromPreview()) return false;
  if (!view?.state) return false;

  const main = view.state.selection.main;
  const insert = PREVIEW_HARD_BREAK_INSERT;
  view.dispatch({
    changes: { from: main.from, to: main.to, insert },
    selection: EditorSelection.cursor(main.from + insert.length),
    scrollIntoView: true,
  });
  return true;
}

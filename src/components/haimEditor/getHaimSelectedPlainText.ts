import type { Editor } from '@tiptap/react';
import type { EditorView as CmEditorView } from '@codemirror/view';

/**
 * Plain text from the active Haim selection (TipTap and/or source CodeMirror).
 * Prefers the focused surface; otherwise the first non-empty selection.
 */
export function getHaimSelectedPlainText(
  editor: Editor | null | undefined,
  cmView: CmEditorView | null | undefined,
  options?: { sourceVisible?: boolean | undefined },
): string {
  const tipTapText = (() => {
    if (!editor) return '';
    const { from, to, empty } = editor.state.selection;
    if (empty) return '';
    return editor.state.doc.textBetween(from, to, '\n');
  })();

  const sourceVisible = options?.sourceVisible !== false;
  const cmText = (() => {
    if (!cmView || !sourceVisible) return '';
    const { from, to } = cmView.state.selection.main;
    if (from === to) return '';
    return cmView.state.doc.sliceString(from, to);
  })();

  if (cmView?.hasFocus && cmText) return cmText;
  if (editor?.isFocused && tipTapText) return tipTapText;
  return tipTapText || cmText;
}

/**
 * Run Haim toolbar / Advanced Search format commands against TipTap or CM source.
 */

import { undo, redo } from '@codemirror/commands';
import type { EditorView } from '@codemirror/view';
import type { Editor } from '@tiptap/core';
import {
  toggleBoldForSelection,
  toggleHeadingForSelection,
  toggleInlineMarkdownWrap,
  toggleItalicForSelection,
  toggleOrderedListForSelection,
  toggleQuoteForSelection,
  toggleStrikeForSelection,
  toggleSubForSelection,
  toggleSupForSelection,
  toggleTaskListForSelection,
  toggleUnderlineForSelection,
  toggleUnorderedListForSelection,
  wrapSelectionWithInlineCode,
} from '@/utils/editorMarkdownStyle';

export type HaimFormatCommand =
  | 'undo'
  | 'redo'
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strike'
  | 'code'
  | 'sub'
  | 'sup'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'h7'
  | 'h8'
  | 'h9'
  | 'h10'
  | 'bullet'
  | 'ordered'
  | 'task'
  | 'quote'
  | 'codeBlock';

function toggleCodeBlockForSelection(view: EditorView): boolean {
  const { from, to, empty } = view.state.selection.main;
  const doc = view.state.doc;
  if (empty) {
    const insert = '```\n\n```';
    view.dispatch({
      changes: { from, to, insert },
      selection: { anchor: from + 4 },
      scrollIntoView: true,
    });
    return true;
  }
  const selected = doc.sliceString(from, to);
  const trimmed = selected.replace(/^\n+|\n+$/g, '');
  if (
    trimmed.startsWith('```') &&
    trimmed.endsWith('```') &&
    trimmed.length >= 6
  ) {
    const inner = trimmed.replace(/^```[^\n]*\n?/, '').replace(/\n?```$/, '');
    view.dispatch({
      changes: { from, to, insert: inner },
      selection: { anchor: from, head: from + inner.length },
      scrollIntoView: true,
    });
    return true;
  }
  const insert = `\`\`\`\n${selected}\n\`\`\``;
  view.dispatch({
    changes: { from, to, insert },
    selection: { anchor: from, head: from + insert.length },
    scrollIntoView: true,
  });
  return true;
}

function runOnCm(view: EditorView, command: HaimFormatCommand): boolean {
  switch (command) {
    case 'undo':
      return undo(view);
    case 'redo':
      return redo(view);
    case 'bold':
      return toggleBoldForSelection(view);
    case 'italic':
      return toggleItalicForSelection(view);
    case 'underline':
      return toggleUnderlineForSelection(view);
    case 'strike':
      return toggleStrikeForSelection(view);
    case 'code':
      return wrapSelectionWithInlineCode(view) || toggleInlineMarkdownWrap(view, '`');
    case 'sub':
      return toggleSubForSelection(view);
    case 'sup':
      return toggleSupForSelection(view);
    case 'h1':
      return toggleHeadingForSelection(view, 1);
    case 'h2':
      return toggleHeadingForSelection(view, 2);
    case 'h3':
      return toggleHeadingForSelection(view, 3);
    case 'h4':
      return toggleHeadingForSelection(view, 4);
    case 'h5':
      return toggleHeadingForSelection(view, 5);
    case 'h6':
      return toggleHeadingForSelection(view, 6);
    case 'h7':
      return toggleHeadingForSelection(view, 7);
    case 'h8':
      return toggleHeadingForSelection(view, 8);
    case 'h9':
      return toggleHeadingForSelection(view, 9);
    case 'h10':
      return toggleHeadingForSelection(view, 10);
    case 'bullet':
      return toggleUnorderedListForSelection(view);
    case 'ordered':
      return toggleOrderedListForSelection(view);
    case 'task':
      return toggleTaskListForSelection(view);
    case 'quote':
      return toggleQuoteForSelection(view);
    case 'codeBlock':
      return toggleCodeBlockForSelection(view);
    default:
      return false;
  }
}

function runOnTipTap(editor: Editor, command: HaimFormatCommand): boolean {
  const chain = editor.chain().focus();
  switch (command) {
    case 'undo':
      return chain.undo().run();
    case 'redo':
      return chain.redo().run();
    case 'bold':
      return chain.toggleBold().run();
    case 'italic':
      return chain.toggleItalic().run();
    case 'underline':
      return chain.toggleUnderline().run();
    case 'strike':
      return chain.toggleStrike().run();
    case 'code':
      return chain.toggleCode().run();
    case 'sub':
      return chain.toggleSubscript().run();
    case 'sup':
      return chain.toggleSuperscript().run();
    case 'h1':
      return chain.toggleHeading({ level: 1 }).run();
    case 'h2':
      return chain.toggleHeading({ level: 2 }).run();
    case 'h3':
      return chain.toggleHeading({ level: 3 }).run();
    case 'h4':
      return chain.toggleHeading({ level: 4 }).run();
    case 'h5':
      return chain.toggleHeading({ level: 5 }).run();
    case 'h6':
      return chain.toggleHeading({ level: 6 }).run();
    case 'h7':
      return chain.toggleDeepHeading({ level: 7 }).run();
    case 'h8':
      return chain.toggleDeepHeading({ level: 8 }).run();
    case 'h9':
      return chain.toggleDeepHeading({ level: 9 }).run();
    case 'h10':
      return chain.toggleDeepHeading({ level: 10 }).run();
    case 'bullet':
      return chain.toggleBulletList().run();
    case 'ordered':
      return chain.toggleOrderedList().run();
    case 'task':
      return chain.toggleTaskList().run();
    case 'quote':
      return chain.toggleBlockquote().run();
    case 'codeBlock':
      return chain.toggleCodeBlock().run();
    default:
      return false;
  }
}

export type RunHaimFormatCommandOptions = {
  editor: Editor;
  cm: EditorView | null | undefined;
  preferSource: boolean;
  /** Called after a successful CM edit (e.g. flush dual sync). */
  onAfterCmEdit?: (() => void) | undefined;
};

/**
 * Apply a format command to the active surface (CM source or TipTap).
 * Returns true when the command was handled.
 */
export function runHaimFormatCommand(
  command: HaimFormatCommand,
  options: RunHaimFormatCommandOptions,
): boolean {
  const { editor, cm, preferSource, onAfterCmEdit } = options;

  if (preferSource && cm) {
    const ok = runOnCm(cm, command);
    if (ok) {
      cm.focus();
      onAfterCmEdit?.();
    }
    return ok;
  }

  return runOnTipTap(editor, command);
}

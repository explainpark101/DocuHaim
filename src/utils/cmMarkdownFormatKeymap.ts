/**
 * Shared CodeMirror markdown format shortcuts (bold / italic / underline / …).
 * Used by HaimSourcePane and MarkdownEditor so dual-source and legacy MD stay in sync.
 */

import { Prec } from '@codemirror/state';
import { keymap, type EditorView, type KeyBinding } from '@codemirror/view';
import {
  toggleBoldForSelection,
  toggleHeadingForSelection,
  toggleItalicForSelection,
  toggleOrderedListForSelection,
  toggleStrikeForSelection,
  toggleSubForSelection,
  toggleSupForSelection,
  toggleUnderlineForSelection,
  toggleUnorderedListForSelection,
  wrapSelectionWithInlineCode,
} from '@/utils/editorMarkdownStyle';
import { handleMdEditorSelectionWrapKeydown } from '@/utils/mdEditorSelectionWrap';

/** Inline / block markdown format key bindings (Ctrl/Cmd on both platforms). */
export const MARKDOWN_FORMAT_KEYBINDINGS: KeyBinding[] = [
  {
    key: 'Ctrl-b',
    mac: 'Cmd-b',
    preventDefault: true,
    run: toggleBoldForSelection,
  },
  {
    key: 'Ctrl-i',
    mac: 'Cmd-i',
    preventDefault: true,
    run: toggleItalicForSelection,
  },
  {
    key: 'Ctrl-u',
    mac: 'Cmd-u',
    preventDefault: true,
    run: toggleUnderlineForSelection,
    shift: toggleUnorderedListForSelection,
  },
  {
    key: 'Ctrl-o',
    mac: 'Cmd-o',
    preventDefault: true,
    run: toggleOrderedListForSelection,
  },
  {
    key: 'Shift-Ctrl-s',
    mac: 'Shift-Cmd-s',
    preventDefault: true,
    run: toggleStrikeForSelection,
  },
  {
    key: 'Ctrl-ArrowUp',
    mac: 'Cmd-ArrowUp',
    preventDefault: true,
    run: toggleSupForSelection,
  },
  {
    key: 'Ctrl-ArrowDown',
    mac: 'Cmd-ArrowDown',
    preventDefault: true,
    run: toggleSubForSelection,
  },
  ...([1, 2, 3, 4, 5, 6, 7, 8, 9] as const).map((level) => ({
    key: `Ctrl-${level}`,
    mac: `Cmd-${level}`,
    preventDefault: true,
    run: (view: EditorView) => toggleHeadingForSelection(view, level),
  })),
  {
    key: 'Ctrl-0',
    mac: 'Cmd-0',
    preventDefault: true,
    run: (view: EditorView) => toggleHeadingForSelection(view, 10),
  },
  {
    any: (view, event) => {
      if ((event.ctrlKey || event.metaKey) && event.altKey && event.code === 'KeyC') {
        return wrapSelectionWithInlineCode(view);
      }
      // Backtick / quotes / brackets wrap a non-empty selection (MarkdownEditor parity).
      return handleMdEditorSelectionWrapKeydown(event, view);
    },
  },
];

/** High precedence so defaultKeymap / browser chrome do not swallow Mod-b/i/u. */
export const MARKDOWN_FORMAT_KEYMAP = Prec.high(keymap.of(MARKDOWN_FORMAT_KEYBINDINGS));

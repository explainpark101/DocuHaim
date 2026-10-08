/**
 * Non-empty selection + backtick (or Apple KO Backquote) → toggle inline code mark.
 * Inside codeBlock: leave to codeBlockBracketPairs (literal ` wrap for JS-family).
 */

import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import type { EditorView } from '@tiptap/pm/view';
import { isInlineCodeFenceTriggerKey } from '@/utils/mdEditorSelectionWrap';

const pluginKey = new PluginKey('haimSelectionInlineCode');

type KeyLike = Pick<
  KeyboardEvent,
  | 'key'
  | 'code'
  | 'ctrlKey'
  | 'metaKey'
  | 'altKey'
  | 'shiftKey'
  | 'isComposing'
  | 'defaultPrevented'
>;

function isInsideCodeBlock(view: EditorView): boolean {
  const { $from, $to } = view.state.selection;
  return (
    $from.parent.type.name === 'codeBlock' ||
    $to.parent.type.name === 'codeBlock'
  );
}

/**
 * Try wrapping / unwrapping the current selection as inline code.
 * Returns true when the key was handled (caller should not insert a raw `).
 */
export function tryHandleSelectionInlineCodeKey(
  view: EditorView,
  event: KeyLike,
  toggleCode: () => boolean,
): boolean {
  if (event.defaultPrevented || event.isComposing) return false;
  if (!isInlineCodeFenceTriggerKey(event)) return false;
  if (view.state.selection.empty) return false;
  if (view.state.selection.$from.pos === view.state.selection.$to.pos) {
    return false;
  }
  if (isInsideCodeBlock(view)) return false;
  if (!view.state.schema.marks.code) return false;
  return toggleCode();
}

export const HaimSelectionInlineCode = Extension.create({
  name: 'haimSelectionInlineCode',
  // Win over default character insertion for backtick on a non-empty selection.
  priority: 1000,

  addProseMirrorPlugins() {
    const editor = this.editor;
    return [
      new Plugin({
        key: pluginKey,
        props: {
          handleKeyDown(view, event) {
            return tryHandleSelectionInlineCodeKey(view, event, () =>
              editor.commands.toggleCode(),
            );
          },
        },
      }),
    ];
  },
});

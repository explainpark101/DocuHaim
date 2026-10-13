import { NodeRange } from '@tiptap/extension-node-range';
import type { Editor } from '@tiptap/core';
import { TextSelection } from '@tiptap/pm/state';

type ShortcutMap = Record<string, (props: { editor: Editor }) => boolean>;

/**
 * Select the current textblock (Mod-a once). If that block is already fully
 * selected, select the whole document (Mod-a twice).
 */
export function selectHaimTextblockOrAll(editor: Editor): boolean {
  const { state, view } = editor;
  const { selection, doc } = state;
  const $from = selection.$anchor;
  let depth = $from.depth;
  while (depth > 0 && !$from.node(depth).isTextblock) {
    depth -= 1;
  }
  if (depth === 0) {
    return editor.commands.selectAll();
  }

  const blockFrom = $from.start(depth);
  const blockTo = $from.end(depth);
  const coversBlock =
    !selection.empty
    && selection.from <= blockFrom
    && selection.to >= blockTo;

  if (coversBlock) {
    return editor.commands.selectAll();
  }

  const next = TextSelection.create(doc, blockFrom, blockTo);
  view.dispatch(state.tr.setSelection(next).scrollIntoView());
  return true;
}

/**
 * TipTap stock NodeRange binds Shift-ArrowUp/Down to NodeRangeSelection
 * (block select), which breaks normal text selection across paragraphs.
 * Mod-a stock uses invisible NodeRangeSelection over the whole doc — replace
 * with visible TextSelection of the current textblock, then selectAll.
 * Keep Mod-mouse node-range behavior from the parent plugin.
 */
export const HaimNodeRange = NodeRange.extend({
  name: 'nodeRange',

  addKeyboardShortcuts() {
    const self = this as unknown as { parent?: () => ShortcutMap };
    const parentFns = self.parent?.() ?? {};
    const rest = { ...parentFns };
    delete rest['Shift-ArrowUp'];
    delete rest['Shift-ArrowDown'];
    rest['Mod-a'] = ({ editor }) => selectHaimTextblockOrAll(editor);
    return rest;
  },
});

export default HaimNodeRange;

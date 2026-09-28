import { NodeRange } from '@tiptap/extension-node-range';

/**
 * TipTap stock NodeRange binds Shift-ArrowUp/Down to NodeRangeSelection
 * (block select), which breaks normal text selection across paragraphs.
 * Keep Mod-mouse / Mod-a node-range behavior; leave Shift+Arrow to
 * HaimShiftArrowSelect (character/line TextSelection).
 */
export const HaimNodeRange = NodeRange.extend({
  name: 'nodeRange',

  addKeyboardShortcuts() {
    const parent = this.parent?.() ?? {};
    const rest = { ...parent } as Record<
      string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (props: any) => boolean
    >;
    delete rest['Shift-ArrowUp'];
    delete rest['Shift-ArrowDown'];
    return rest;
  },
});

export default HaimNodeRange;

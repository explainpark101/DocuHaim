import { NodeRange } from '@tiptap/extension-node-range';

type ShortcutMap = Record<string, (props: { editor: unknown }) => boolean>;

/**
 * TipTap stock NodeRange binds Shift-ArrowUp/Down to NodeRangeSelection
 * (block select), which breaks normal text selection across paragraphs.
 * Keep Mod-mouse / Mod-a node-range behavior; leave Shift+Arrow to
 * HaimShiftArrowSelect (character/line TextSelection).
 */
export const HaimNodeRange = NodeRange.extend({
  name: 'nodeRange',

  addKeyboardShortcuts() {
    const self = this as unknown as { parent?: () => ShortcutMap };
    const parentFns = self.parent?.() ?? {};
    const rest = { ...parentFns };
    delete rest['Shift-ArrowUp'];
    delete rest['Shift-ArrowDown'];
    return rest;
  },
});

export default HaimNodeRange;

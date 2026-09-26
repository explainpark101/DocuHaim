/**
 * TipTap decorations: set data-line on each top-level block for scroll sync.
 */

import { Decoration, Extension } from '@tiptap/core';
import type { Editor, JSONContent } from '@tiptap/core';
import { mapTopLevelBlocksToSourceLines } from '@/components/haimEditor/haimSourceLineMap';

export type HaimSourceLineOptions = {
  /** Leading vault meta comment prefix (note-cover, etc.). */
  getMetaPrefix?: () => string;
};

type MarkdownManager = {
  serialize: (doc: JSONContent) => string;
};

function getMarkdownSerialize(
  editor: Editor,
): ((doc: JSONContent) => string) | null {
  const md = editor.storage.markdown as { manager?: MarkdownManager } | undefined;
  const manager = md?.manager;
  if (!manager || typeof manager.serialize !== 'function') return null;
  return (doc: JSONContent) => manager.serialize(doc);
}

export const HaimSourceLine = Extension.create<HaimSourceLineOptions>({
  name: 'haimSourceLine',

  addOptions() {
    return {
      getMetaPrefix: () => '',
    };
  },

  addDecorations() {
    const getMetaPrefix = this.options.getMetaPrefix ?? (() => '');

    return {
      update: 'document',
      create: ({ editor, state }) => {
        const serialize = getMarkdownSerialize(editor);
        if (!serialize) return [];

        const metaPrefix = getMetaPrefix() || '';
        const entries = mapTopLevelBlocksToSourceLines(
          state.doc,
          serialize,
          metaPrefix,
        );

        return entries.map((entry) =>
          Decoration.Node(entry.pos, entry.to, {
            'data-line': String(entry.line0),
          }),
        );
      },
    };
  },
});

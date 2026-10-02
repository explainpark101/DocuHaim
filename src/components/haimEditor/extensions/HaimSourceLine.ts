/**
 * TipTap decorations: set data-line on each top-level block for scroll sync.
 *
 * Mapping serializes the doc (expensive). Gate with `isEnabled` so WYSIWYG-
 * only / scroll-sync-off modes skip the work. Dual + scroll sync should keep
 * it on so [data-line] markers stay fresh for useHaimDoubleScrollSync.
 */

import { Decoration, Extension } from '@tiptap/core';
import type { Editor, JSONContent } from '@tiptap/core';
import type { Node as PMNode } from '@tiptap/pm/model';
import { mapTopLevelBlocksToSourceLines } from '@/components/haimEditor/haimSourceLineMap';

export type HaimSourceLineOptions = {
  /** Leading vault meta comment prefix (note-cover, etc.). */
  getMetaPrefix?: () => string;
  /**
   * When false, skip line mapping (return no decorations).
   * Use a ref-backed getter so dual/scroll-sync toggles need no remount.
   */
  isEnabled?: () => boolean;
};

type MarkdownManager = {
  serialize: (doc: JSONContent) => string;
};

type SourceLineStorage = {
  lastDoc: PMNode | null;
  lastEntries: ReturnType<typeof mapTopLevelBlocksToSourceLines>;
};

function getMarkdownSerialize(
  editor: Editor,
): ((doc: JSONContent) => string) | null {
  const md = editor.storage.markdown as { manager?: MarkdownManager } | undefined;
  const manager = md?.manager;
  if (!manager || typeof manager.serialize !== 'function') return null;
  return (doc: JSONContent) => manager.serialize(doc);
}

export const HaimSourceLine = Extension.create<
  HaimSourceLineOptions,
  SourceLineStorage
>({
  name: 'haimSourceLine',

  addOptions() {
    return {
      getMetaPrefix: () => '',
      isEnabled: () => true,
    };
  },

  addStorage() {
    return {
      lastDoc: null,
      lastEntries: [],
    };
  },

  addDecorations() {
    const getMetaPrefix = this.options.getMetaPrefix ?? (() => '');
    const isEnabled = this.options.isEnabled ?? (() => true);

    return {
      update: 'document',
      create: ({ editor, state }) => {
        if (!isEnabled()) {
          this.storage.lastDoc = null;
          this.storage.lastEntries = [];
          return [];
        }

        const serialize = getMarkdownSerialize(editor);
        if (!serialize) return [];

        // Same immutable PM doc → reuse previous mapping (no re-serialize).
        if (
          this.storage.lastDoc === state.doc &&
          this.storage.lastEntries.length > 0
        ) {
          return this.storage.lastEntries.map((entry) =>
            Decoration.Node(entry.pos, entry.to, {
              'data-line': String(entry.line0),
            }),
          );
        }

        const metaPrefix = getMetaPrefix() || '';
        const entries = mapTopLevelBlocksToSourceLines(
          state.doc,
          serialize,
          metaPrefix,
        );
        this.storage.lastDoc = state.doc;
        this.storage.lastEntries = entries;

        return entries.map((entry) =>
          Decoration.Node(entry.pos, entry.to, {
            'data-line': String(entry.line0),
          }),
        );
      },
    };
  },
});

/**
 * TipTap decorations: set data-line on each top-level block for scroll sync.
 *
 * Mapping serializes the doc (expensive). Gate with `isEnabled` so WYSIWYG-
 * only / scroll-sync-off modes skip the work.
 *
 * While WYSIWYG is focused, `shouldUpdate` returns false so TipTap maps
 * existing decorations without N+1 serialize (scroll layout is already
 * deferred while typing). A short debounce then force-rebuilds accurate
 * line numbers for scroll sync.
 */

import { Decoration, Extension } from '@tiptap/core';
import type { Editor, JSONContent } from '@tiptap/core';
import type { Node as PMNode } from '@tiptap/pm/model';
import {
  remapTopLevelBlocksToSourceLines,
  shouldDeferSourceLineRemap,
  type HaimSourceLineEntry,
} from '@/components/haimEditor/haimSourceLineMap';

/** Idle debounce before force-remapping data-line while typing in WYSIWYG. */
export const HAIM_SOURCE_LINE_REMAP_DEBOUNCE_MS = 120;

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
  lastEntries: HaimSourceLineEntry[];
  pendingTimer: ReturnType<typeof setTimeout> | null;
};

function getMarkdownSerialize(
  editor: Editor,
): ((doc: JSONContent) => string) | null {
  const md = editor.storage.markdown as { manager?: MarkdownManager } | undefined;
  const manager = md?.manager;
  if (!manager || typeof manager.serialize !== 'function') return null;
  return (doc: JSONContent) => manager.serialize(doc);
}

function clearPendingTimer(storage: SourceLineStorage): void {
  if (storage.pendingTimer == null) return;
  clearTimeout(storage.pendingTimer);
  storage.pendingTimer = null;
}

function scheduleSourceLineRemap(
  editor: Editor,
  storage: SourceLineStorage,
): void {
  clearPendingTimer(storage);
  storage.pendingTimer = setTimeout(() => {
    storage.pendingTimer = null;
    if (editor.isDestroyed) return;
    try {
      editor.commands.updateDecorations('haimSourceLine');
    } catch {
      // ignore if command unavailable during teardown
    }
  }, HAIM_SOURCE_LINE_REMAP_DEBOUNCE_MS);
}

function entriesToDecorations(entries: HaimSourceLineEntry[]) {
  return entries.map((entry) =>
    Decoration.Node(entry.pos, entry.to, {
      'data-line': String(entry.line0),
    }),
  );
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
      pendingTimer: null,
    };
  },

  onDestroy() {
    clearPendingTimer(this.storage);
  },

  addDecorations() {
    const getMetaPrefix = this.options.getMetaPrefix ?? (() => '');
    const isEnabled = this.options.isEnabled ?? (() => true);
    const storage = this.storage;

    return {
      update: 'document',
      shouldUpdate: ({ editor, tr }) => {
        const enabled = isEnabled();
        if (!enabled) {
          clearPendingTimer(storage);
          return true;
        }
        if (
          shouldDeferSourceLineRemap({
            enabled,
            docChanged: tr.docChanged,
            tipTapFocused: Boolean(editor.view?.hasFocus?.()),
          })
        ) {
          scheduleSourceLineRemap(editor, storage);
          return false;
        }
        if (tr.docChanged) {
          clearPendingTimer(storage);
        }
        return tr.docChanged;
      },
      create: ({ editor, state }) => {
        if (!isEnabled()) {
          clearPendingTimer(storage);
          storage.lastDoc = null;
          storage.lastEntries = [];
          return [];
        }

        const serialize = getMarkdownSerialize(editor);
        if (!serialize) return [];

        // Same immutable PM doc → reuse previous mapping (no re-serialize).
        if (
          storage.lastDoc === state.doc &&
          storage.lastEntries.length > 0
        ) {
          return entriesToDecorations(storage.lastEntries);
        }

        const metaPrefix = getMetaPrefix() || '';
        const entries = remapTopLevelBlocksToSourceLines(
          state.doc,
          serialize,
          metaPrefix,
          storage.lastDoc,
          storage.lastEntries,
        );
        storage.lastDoc = state.doc;
        storage.lastEntries = entries;

        return entriesToDecorations(entries);
      },
    };
  },
});

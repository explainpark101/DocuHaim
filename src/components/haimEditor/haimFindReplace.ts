import type { Editor } from '@tiptap/core';
import type { Plugin } from '@tiptap/pm/state';

/** Runtime Plugin.key is a string. The public type only exposes spec.key. */
function pluginKeyName(plugin: Plugin): string {
  const runtimeKey = (plugin as { key?: unknown }).key;
  if (typeof runtimeKey === 'string') return runtimeKey;
  const specKey = plugin.spec.key as { key?: unknown } | undefined;
  return typeof specKey?.key === 'string' ? specKey.key : '';
}

export type HaimFindMeta = {
  searchTerm?: string;
  replaceTerm?: string;
  caseSensitive?: boolean;
};

export type HaimFindSummary = {
  count: number;
  /** 0-based index of the active match, or null when there is no match. */
  current: number | null;
};

function findAndReplacePlugin(editor: Editor): Plugin | undefined {
  return editor.state.plugins.find((plugin) => pluginKeyName(plugin).includes('findAndReplace'));
}

/**
 * Apply find/replace plugin meta on the transaction TipTap actually dispatches.
 * `setSearchTerm` only schedules a later dispatch, so the bar never saw matches.
 * The plugin is taken from editor state so the meta key matches the mounted instance.
 */
export function dispatchHaimFindMeta(editor: Editor, meta: HaimFindMeta): void {
  const plugin = findAndReplacePlugin(editor);
  if (!plugin) return;
  // Do not consult editor.isDestroyed: without a mounted view it is true
  // even though the headless proxy can still apply transactions.
  const tr = editor.state.tr.setMeta(plugin, meta);
  editor.view.dispatch(tr);
}

export function readHaimFindSummary(editor: Editor): HaimFindSummary {
  const storage = editor.storage.findAndReplace;
  if (!storage) return { count: 0, current: null };
  const count = storage.results?.length ?? 0;
  const current = count > 0 ? (storage.currentIndex ?? null) : null;
  return { count, current };
}

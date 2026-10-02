/**
 * Cache TipTap getMarkdown() by ProseMirror document identity.
 *
 * PM nodes are immutable: the same `editor.state.doc` reference means the
 * serialized markdown cannot have changed. Avoid getJSON() + JSON.stringify
 * equality (was a dual-pane stutter source on every parent render / sync tick).
 */

import type { Editor } from '@tiptap/react';
import type { Node as PMNode } from '@tiptap/pm/model';

type CacheEntry = {
  doc: PMNode;
  markdown: string;
};

const cacheByEditor = new WeakMap<Editor, CacheEntry>();

export function getCachedMarkdown(editor: Editor | null | undefined): string {
  if (!editor) return '';
  const doc = editor.state.doc;
  const prev = cacheByEditor.get(editor);
  if (prev && prev.doc === doc) {
    return prev.markdown;
  }
  const withMd = editor as Editor & { getMarkdown?: () => string };
  const markdown =
    typeof withMd.getMarkdown === 'function' ? withMd.getMarkdown() : '';
  cacheByEditor.set(editor, { doc, markdown });
  return markdown;
}

export function invalidateMarkdownCache(editor: Editor | null | undefined): void {
  if (!editor) return;
  cacheByEditor.delete(editor);
}

/** Test helper — whether the cache currently holds this doc identity. */
export function isMarkdownCacheHitForDoc(
  editor: Editor | null | undefined,
  doc: PMNode,
): boolean {
  if (!editor) return false;
  const prev = cacheByEditor.get(editor);
  return Boolean(prev && prev.doc === doc);
}

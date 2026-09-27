/**
 * Cache TipTap getMarkdown() by document JSON identity to avoid
 * re-serializing on every parent render / dual-pane tick.
 */

import type { Editor } from '@tiptap/react';
import type { JSONContent } from '@tiptap/core';

type CacheEntry = {
  json: JSONContent | null;
  markdown: string;
};

const cacheByEditor = new WeakMap<Editor, CacheEntry>();

function jsonEqual(a: JSONContent | null, b: JSONContent | null): boolean {
  if (a === b) return true;
  if (!a || !b) return false;
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
}

export function getCachedMarkdown(editor: Editor | null | undefined): string {
  if (!editor) return '';
  const json = editor.getJSON();
  const prev = cacheByEditor.get(editor);
  if (prev && jsonEqual(prev.json, json)) {
    return prev.markdown;
  }
  const withMd = editor as Editor & { getMarkdown?: () => string };
  const markdown =
    typeof withMd.getMarkdown === 'function' ? withMd.getMarkdown() : '';
  cacheByEditor.set(editor, { json, markdown });
  return markdown;
}

export function invalidateMarkdownCache(editor: Editor | null | undefined): void {
  if (!editor) return;
  cacheByEditor.delete(editor);
}

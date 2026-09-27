import type { Editor } from '@tiptap/react';

export type HaimTocItem = {
  /** Stable-ish key for React lists (pos can shift after edits). */
  id: string;
  level: number;
  text: string;
  /** Document position of the heading node. */
  pos: number;
};

/**
 * Walk TipTap doc for `heading` (1–6) and `deepHeading` (7–10).
 */
export function extractHaimTocItems(editor: Editor | null): HaimTocItem[] {
  if (!editor) return [];
  const items: HaimTocItem[] = [];
  editor.state.doc.descendants((node, pos) => {
    if (node.type.name === 'heading') {
      const level = Number(node.attrs.level) || 1;
      const text = node.textContent.trim() || '(제목 없음)';
      items.push({
        id: `h-${pos}-${level}`,
        level: Math.min(6, Math.max(1, level)),
        text,
        pos,
      });
      return false;
    }
    if (node.type.name === 'deepHeading') {
      const level = Number(node.attrs.level) || 7;
      const text = node.textContent.trim() || '(제목 없음)';
      items.push({
        id: `h-${pos}-${level}`,
        level: Math.min(10, Math.max(7, level)),
        text,
        pos,
      });
      return false;
    }
    return undefined;
  });
  return items;
}

import type { Editor } from '@tiptap/react';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';

export type HaimTocItem = {
  /** Stable-ish key for React lists (pos can shift after edits). */
  id: string;
  level: number;
  text: string;
  /** Document position of the heading node. */
  pos: number;
  /** True when the heading sits inside a blockquote. */
  inBlockquote: boolean;
};

function posInsideBlockquote(doc: ProseMirrorNode, pos: number): boolean {
  const $pos = doc.resolve(pos);
  for (let depth = $pos.depth; depth > 0; depth -= 1) {
    if ($pos.node(depth).type.name === 'blockquote') return true;
  }
  return false;
}

export function visibleHaimTocItems(
  items: HaimTocItem[],
  hideBlockquoteHeadings: boolean,
): HaimTocItem[] {
  if (!hideBlockquoteHeadings) return items;
  return items.filter((item) => !item.inBlockquote);
}

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
        inBlockquote: posInsideBlockquote(editor.state.doc, pos),
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
        inBlockquote: posInsideBlockquote(editor.state.doc, pos),
      });
      return false;
    }
    return undefined;
  });
  return items;
}

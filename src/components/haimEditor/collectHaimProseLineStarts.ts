import type { Editor } from '@tiptap/react';

export type HaimProseLineStart = {
  /** 1-based line number */
  n: number;
  /** Offset from the top of the scroll container's content box (px) */
  top: number;
};

/**
 * Collect WYSIWYG line-number anchors: start of each textblock / atom block,
 * plus each hard break. Soft-wrapped visual rows are not numbered (v1).
 */
export function collectHaimProseLineStarts(
  editor: Editor,
  scrollEl: HTMLElement,
): HaimProseLineStart[] {
  if (!editor || editor.isDestroyed) return [];
  const { view } = editor;
  const { doc } = view.state;
  const scrollRect = scrollEl.getBoundingClientRect();
  const scrollTop = scrollEl.scrollTop;
  const out: HaimProseLineStart[] = [];
  let n = 1;

  const pushAtPos = (pos: number) => {
    try {
      const max = doc.content.size;
      const safe = Math.max(0, Math.min(pos, max));
      const coords = view.coordsAtPos(safe);
      const top = coords.top - scrollRect.top + scrollTop;
      if (!Number.isFinite(top)) return;
      out.push({ n, top });
      n += 1;
    } catch {
      // ignore invalid pos
    }
  };

  doc.descendants((node, pos) => {
    // Code blocks keep their own gutter; only mark the block start here.
    if (node.type.name === 'codeBlock') {
      pushAtPos(pos + 1);
      return false;
    }
    if (node.isTextblock) {
      // Content starts after the opening token.
      pushAtPos(pos + 1);
      let offset = 0;
      node.forEach((child) => {
        if (child.type.name === 'hardBreak') {
          pushAtPos(pos + 1 + offset + 1);
        }
        offset += child.nodeSize;
      });
      return false;
    }
    if (node.isBlock && (node.isAtom || node.type.isLeaf)) {
      pushAtPos(pos);
      return false;
    }
    return true;
  });

  return out;
}

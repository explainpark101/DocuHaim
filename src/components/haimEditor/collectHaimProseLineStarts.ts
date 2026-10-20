import type { Editor } from '@tiptap/react';

export type HaimProseLineStart = {
  /** 1-based line number */
  n: number;
  /** Offset from the top of the scroll container's content box (px) */
  top: number;
};

const LINE_COLLECT_STOP = Symbol('haim-prose-line-budget');

/**
 * Collect WYSIWYG line-number anchors: start of each textblock / atom block,
 * plus each hard break. Soft-wrapped visual rows are not numbered (v1).
 * `budgetMs` stops the coordsAtPos walk so the caller can yield and finish later.
 */
export function collectHaimProseLineStarts(
  editor: Editor,
  scrollEl: HTMLElement,
  budgetMs = Number.POSITIVE_INFINITY,
): { lines: HaimProseLineStart[]; hitBudget: boolean } {
  if (!editor || editor.isDestroyed) return { lines: [], hitBudget: false };
  const { view } = editor;
  const { doc } = view.state;
  const scrollRect = scrollEl.getBoundingClientRect();
  const scrollTop = scrollEl.scrollTop;
  const out: HaimProseLineStart[] = [];
  let n = 1;
  const started = typeof performance !== 'undefined' ? performance.now() : 0;

  const pushAtPos = (pos: number) => {
    if (
      budgetMs < Number.POSITIVE_INFINITY &&
      typeof performance !== 'undefined' &&
      performance.now() - started > budgetMs
    ) {
      throw LINE_COLLECT_STOP;
    }
    try {
      const max = doc.content.size;
      const safe = Math.max(0, Math.min(pos, max));
      const coords = view.coordsAtPos(safe);
      const top = coords.top - scrollRect.top + scrollTop;
      if (!Number.isFinite(top)) return;
      out.push({ n, top });
      n += 1;
    } catch (error) {
      if (error === LINE_COLLECT_STOP) throw error;
    }
  };

  let hitBudget = false;
  try {
    doc.descendants((node, pos) => {
      if (node.type.name === 'codeBlock') {
        pushAtPos(pos + 1);
        return false;
      }
      if (node.isTextblock) {
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
  } catch (error) {
    if (error !== LINE_COLLECT_STOP) throw error;
    hitBudget = true;
  }

  return { lines: out, hitBudget };
}

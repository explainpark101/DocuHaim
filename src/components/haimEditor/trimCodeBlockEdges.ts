import type { Editor } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';

/** Strip leading/trailing blank lines from fenced code body. */
export function trimCodeFenceBlankLines(text: string): string {
  return String(text ?? '')
    .replace(/^(?:\r?\n)+/, '')
    .replace(/(?:\r?\n)+$/, '');
}

/**
 * Rewrite every codeBlock node's text to drop edge blank lines.
 * Skips the block that currently contains the selection (so typing a newline at
 * the edge is not immediately undone).
 */
export function trimCodeBlocksInEditor(
  editor: Editor,
  options?: { skipSelectionBlock?: boolean },
): boolean {
  const skipSelection = options?.skipSelectionBlock !== false;
  const { state } = editor;
  const sel = state.selection;
  let tr = state.tr;
  let modified = false;

  state.doc.descendants((node, pos) => {
    if (node.type.name !== 'codeBlock') return;
    if (skipSelection) {
      const from = pos;
      const to = pos + node.nodeSize;
      if (sel.from >= from && sel.to <= to) return;
    }
    const text = node.textContent;
    const trimmed = trimCodeFenceBlankLines(text);
    if (trimmed === text) return;
    const innerFrom = pos + 1;
    const innerTo = pos + node.nodeSize - 1;
    tr = tr.insertText(trimmed, tr.mapping.map(innerFrom), tr.mapping.map(innerTo));
    modified = true;
  });

  if (!modified) return false;
  tr.setMeta('addToHistory', false);
  tr.setMeta('haimTrimCodeEdges', true);
  editor.view.dispatch(tr);
  return true;
}

const trimCodeEdgesKey = new PluginKey('haimTrimCodeEdges');

/**
 * After the selection leaves a code block, trim that block's edge blank lines.
 */
export function createTrimCodeBlockEdgesPlugin(): Plugin {
  return new Plugin({
    key: trimCodeEdgesKey,
    appendTransaction(transactions, oldState, newState) {
      if (!transactions.some((t) => t.selectionSet || t.docChanged)) return null;
      if (transactions.some((t) => t.getMeta('haimTrimCodeEdges'))) return null;

      const oldPos = oldState.selection.$from;
      const newPos = newState.selection.$from;
      const oldInCode = oldPos.parent.type.name === 'codeBlock';
      const newInCode = newPos.parent.type.name === 'codeBlock';
      // Only act when leaving a code block
      if (!oldInCode || newInCode) return null;

      const codeDepth = oldPos.depth;
      const codeNode = oldPos.node(codeDepth);
      const codePos = oldPos.before(codeDepth);
      if (codeNode.type.name !== 'codeBlock') return null;

      const text = codeNode.textContent;
      const trimmed = trimCodeFenceBlankLines(text);
      if (trimmed === text) return null;

      const innerFrom = codePos + 1;
      const innerTo = codePos + codeNode.nodeSize - 1;
      // Map through intervening transactions
      let from = innerFrom;
      let to = innerTo;
      for (const t of transactions) {
        from = t.mapping.map(from);
        to = t.mapping.map(to);
      }
      return newState.tr
        .insertText(trimmed, from, to)
        .setMeta('addToHistory', false)
        .setMeta('haimTrimCodeEdges', true);
    },
  });
}

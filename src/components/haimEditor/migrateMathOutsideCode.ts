/**
 * Like TipTap migrateMathStrings, but skips text inside `code` marks and
 * `codeBlock` parents so `$…$` in inline/fenced code stays literal.
 */

import type { Editor } from '@tiptap/core';
import { mathMigrationRegex } from '@tiptap/extension-mathematics';

export function migrateMathStringsOutsideCode(
  editor: Editor,
  regex: RegExp = mathMigrationRegex,
): void {
  const { inlineMath } = editor.schema.nodes;
  if (!inlineMath) return;

  const tr = editor.state.tr;
  tr.doc.descendants((node, pos) => {
    if (!node.isText || !node.text || !node.text.includes('$')) return;
    if (node.marks.some((m) => m.type.name === 'code')) return;

    const { text } = node;
    const match = text.match(regex);
    if (!match) return;

    for (const mathMatch of match) {
      const start = text.indexOf(mathMatch);
      if (start < 0) continue;
      const end = start + mathMatch.length;
      const from = tr.mapping.map(pos + start);
      const $from = tr.doc.resolve(from);
      if ($from.parent.type.name === 'codeBlock') return;

      const parent = $from.parent;
      const index = $from.index();
      if (!parent.canReplaceWith(index, index + 1, inlineMath)) return;

      const latex = mathMatch.slice(1, -1);
      tr.replaceWith(
        tr.mapping.map(pos + start),
        tr.mapping.map(pos + end),
        inlineMath.create({ latex }),
      );
    }
  });

  tr.setMeta('addToHistory', false);
  if (tr.docChanged) {
    editor.view.dispatch(tr);
  }
}

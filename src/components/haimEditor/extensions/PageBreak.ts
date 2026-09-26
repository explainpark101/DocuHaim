import { Node, mergeAttributes } from '@tiptap/core';

/**
 * Page break token `<pgbr/>` (print / preview divider).
 * See docs/custom-markdown/page-break.md
 */
export const PageBreak = Node.create({
  name: 'pageBreak',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,

  parseHTML() {
    return [
      { tag: 'pgbr' },
      { tag: 'div[data-haim-pgbr]' },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-haim-pgbr': '1',
        class: 'haim-pgbr md-pgbr',
      }),
    ];
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderMarkdown: () => '<pgbr/>\n\n',
});

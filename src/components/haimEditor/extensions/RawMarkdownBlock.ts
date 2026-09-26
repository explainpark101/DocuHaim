import { Node, mergeAttributes } from '@tiptap/core';

/**
 * Opaque block that round-trips markdown the TipTap schema cannot model yet
 * (haim-table comments, plan frontmatter cards, mermaid fences, etc.).
 */
export const RawMarkdownBlock = Node.create({
  name: 'rawMarkdownBlock',
  group: 'block',
  atom: true,
  selectable: true,
  code: true,

  addAttributes() {
    return {
      text: { default: '' },
      kind: { default: 'raw' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'pre[data-haim-raw-md]',
        getAttrs: (el) => {
          if (!(el instanceof HTMLElement)) return false;
          return {
            text: el.textContent || '',
            kind: el.getAttribute('data-kind') || 'raw',
          };
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'pre',
      mergeAttributes(HTMLAttributes, {
        'data-haim-raw-md': '1',
        'data-kind': String(node.attrs.kind || 'raw'),
        class: 'haim-raw-md',
      }),
      String(node.attrs.text || ''),
    ];
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderMarkdown: (node: any) => {
    const text = String(node.attrs?.text || '');
    if (!text) return '';
    return text.endsWith('\n') ? text : `${text}\n`;
  },
});

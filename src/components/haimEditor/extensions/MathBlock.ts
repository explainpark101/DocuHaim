/**
 * KaTeX / math as a preserved raw block until a full math NodeView ships.
 * Inline `$…$` and block `$$…$$` are left to TipTap Markdown when possible;
 * this node holds fenced ```math / ```katex and display math HTML.
 */
import { Node, mergeAttributes } from '@tiptap/core';

export const MathBlock = Node.create({
  name: 'mathBlock',
  group: 'block',
  atom: true,
  code: true,

  addAttributes() {
    return {
      latex: { default: '' },
      display: { default: true },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-haim-math]',
        getAttrs: (el) => {
          if (!(el instanceof HTMLElement)) return false;
          return {
            latex: el.getAttribute('data-latex') || el.textContent || '',
            display: el.getAttribute('data-display') !== 'false',
          };
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-haim-math': '1',
        'data-latex': String(node.attrs.latex || ''),
        'data-display': node.attrs.display ? 'true' : 'false',
        class: 'haim-math-block',
      }),
      String(node.attrs.latex || ''),
    ];
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderMarkdown: (node: any) => {
    const latex = String(node.attrs?.latex || '').trim();
    if (!latex) return '';
    if (node.attrs?.display) return `$$\n${latex}\n$$\n\n`;
    return `$${latex}$\n\n`;
  },
});

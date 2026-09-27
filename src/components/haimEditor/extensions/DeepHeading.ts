import { Node } from '@tiptap/core';

/**
 * ATX headings ####### … ########## → h6 + data-heading-level (print/preview parity).
 * TipTap Heading only goes to 6; deeper levels use this node.
 * See docs/custom-markdown/heading-levels.md
 */
export const DeepHeading = Node.create({
  name: 'deepHeading',
  group: 'block',
  content: 'inline*',
  defining: true,

  addAttributes() {
    return {
      level: {
        default: 7,
        parseHTML: (el) => {
          const n = Number(el.getAttribute('data-heading-level') || '7');
          return Number.isFinite(n) ? Math.min(10, Math.max(7, n)) : 7;
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'h6[data-heading-level]',
        getAttrs: (el) => {
          if (!(el instanceof HTMLElement)) return false;
          const level = Number(el.getAttribute('data-heading-level') || '0');
          if (level < 7 || level > 10) return false;
          return { level };
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const level = Number(node.attrs.level) || 7;
    return [
      'h6',
      {
        ...HTMLAttributes,
        'data-heading-level': String(level),
        class: `haim-deep-heading haim-h${level}`,
      },
      0,
    ];
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderMarkdown: (node: any, helpers: any) => {
    const level = Number(node.attrs?.level) || 7;
    const prefix = '#'.repeat(Math.min(10, Math.max(7, level)));
    const content = helpers.renderChildren(node.content || []);
    return `${prefix} ${content}\n\n`;
  },
});

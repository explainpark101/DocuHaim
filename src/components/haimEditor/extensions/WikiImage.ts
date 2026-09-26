import { Node, mergeAttributes } from '@tiptap/core';

export type WikiImageAttrs = {
  path: string;
  options: string;
  alt: string;
};

/**
 * Obsidian-style wiki image `![[path|opts]]`.
 * See docs/custom-markdown/wiki-image.md
 */
export const WikiImage = Node.create({
  name: 'wikiImage',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      path: { default: '' },
      options: { default: '' },
      alt: { default: '' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'img[data-wiki-path]',
        getAttrs: (el) => {
          if (!(el instanceof HTMLElement)) return false;
          return {
            path: el.getAttribute('data-wiki-path') || '',
            options: el.getAttribute('data-wiki-options') || '',
            alt: el.getAttribute('alt') || '',
          };
        },
      },
      {
        tag: 'div[data-haim-wiki-image]',
        getAttrs: (el) => {
          if (!(el instanceof HTMLElement)) return false;
          return {
            path: el.getAttribute('data-wiki-path') || '',
            options: el.getAttribute('data-wiki-options') || '',
            alt: el.getAttribute('data-wiki-alt') || '',
          };
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const path = String(node.attrs.path || '');
    const options = String(node.attrs.options || '');
    const alt = String(node.attrs.alt || path);
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-haim-wiki-image': '1',
        'data-wiki-path': path,
        'data-wiki-options': options,
        'data-wiki-alt': alt,
        class: 'haim-wiki-image',
      }),
      [
        'span',
        { class: 'haim-wiki-image__label' },
        options ? `![[${path}|${options}]]` : `![[${path}]]`,
      ],
    ];
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderMarkdown: (node: any) => {
    const path = String(node.attrs?.path || '');
    const options = String(node.attrs?.options || '');
    if (!path) return '';
    return options ? `![[${path}|${options}]]\n\n` : `![[${path}]]\n\n`;
  },
});

import { Node, mergeAttributes } from '@tiptap/core';

/**
 * Editable caption inside WikiFigure (`<figcaption>`).
 * @see docs/custom-markdown/wiki-image.md § Caption post-process
 */
export const Figcaption = Node.create({
  name: 'figcaption',
  content: 'inline*',
  defining: true,
  selectable: false,

  parseHTML() {
    return [{ tag: 'figcaption' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['figcaption', mergeAttributes(HTMLAttributes), 0];
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderMarkdown: (node: any, helpers: any) => {
    return helpers.renderChildren(node.content || []);
  },
});

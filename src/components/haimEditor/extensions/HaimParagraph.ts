import Paragraph from '@tiptap/extension-paragraph';

/**
 * TipTap Paragraph that never emits `&nbsp;` for empty paragraphs.
 * Stock TipTap uses &nbsp; to round-trip blank lines; that leaks into vault
 * source as visible `\n &nbsp;` and is unwanted for DocuHaim notes.
 */
export const HaimParagraph = Paragraph.extend({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderMarkdown: (node: any, h: any) => {
    if (!node) return '';
    const content = Array.isArray(node.content) ? node.content : [];
    if (content.length === 0) return '';
    return h.renderChildren(content);
  },
});

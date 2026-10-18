import Paragraph from '@tiptap/extension-paragraph';

/**
 * TipTap Paragraph that never emits `&nbsp;` for empty paragraphs.
 * Stock TipTap uses &nbsp; to round-trip blank lines; that leaks into vault
 * source as visible `\n &nbsp;` and is unwanted for DocuHaim notes.
 */
const EMPTY_PARAGRAPH_MARKDOWN = '&nbsp;';
const NBSP_CHAR = '\u00A0';

export const HaimParagraph = Paragraph.extend({
  /**
   * Stock TipTap unwraps a paragraph that is only an image, assuming images
   * are blocks. Haim images are inline, so that unwrap leaves an image as a
   * direct child of `doc` and the document fails schema checks.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseMarkdown: (token: any, helpers: any) => {
    const tokens = Array.isArray(token?.tokens) ? token.tokens : [];
    const content = helpers.parseInline(tokens);
    const marker = tokens.length === 1 ? tokens[0] : null;
    const isEmptyMarker =
      marker?.type === 'text' &&
      (marker.raw === EMPTY_PARAGRAPH_MARKDOWN ||
        marker.text === EMPTY_PARAGRAPH_MARKDOWN ||
        marker.raw === NBSP_CHAR ||
        marker.text === NBSP_CHAR);
    if (
      isEmptyMarker &&
      content.length === 1 &&
      content[0]?.type === 'text' &&
      (content[0].text === EMPTY_PARAGRAPH_MARKDOWN || content[0].text === NBSP_CHAR)
    ) {
      return helpers.createNode('paragraph', undefined, []);
    }
    return helpers.createNode('paragraph', undefined, content);
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderMarkdown: (node: any, h: any) => {
    if (!node) return '';
    const content = Array.isArray(node.content) ? node.content : [];
    if (content.length === 0) return '';
    return h.renderChildren(content);
  },
});

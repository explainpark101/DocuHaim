import { Node, mergeAttributes } from '@tiptap/core';
import { wikiImageMarkupFromAttrs } from '@/utils/wikiImageSyntax';

/**
 * Wiki image + caption as `<figure data-haim-wiki-figure>`.
 * Vault form: `![[path]]` then caption on the next line (optional blank between).
 * @see docs/custom-markdown/wiki-image.md § Caption post-process
 */
export const WikiFigure = Node.create({
  name: 'wikiFigure',
  group: 'block',
  content: 'wikiImage figcaption',
  defining: true,
  isolating: true,

  parseHTML() {
    return [
      {
        tag: 'figure[data-haim-wiki-figure]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'figure',
      mergeAttributes(HTMLAttributes, {
        'data-haim-wiki-figure': '1',
        class: 'haim-wiki-figure',
      }),
      0,
    ];
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderMarkdown: (node: any, helpers: any) => {
    const kids = Array.isArray(node.content) ? node.content : [];
    const img = kids.find((c: { type?: string }) => c.type === 'wikiImage');
    const cap = kids.find((c: { type?: string }) => c.type === 'figcaption');

    let imageMd = '';
    if (img?.attrs) {
      const path = String(img.attrs.path || '');
      if (path) {
        const width = (img.attrs.width as string | null) || null;
        const height = (img.attrs.height as string | null) || null;
        const background = (img.attrs.background as string | null) || null;
        if (width || height || background) {
          imageMd = wikiImageMarkupFromAttrs({
            path,
            width,
            height,
            background,
          });
        } else {
          const options = String(img.attrs.options || '');
          imageMd = options ? `![[${path}|${options}]]` : `![[${path}]]`;
        }
      }
    }

    const captionMd = cap
      ? String(helpers.renderChildren(cap.content || []) || '').trim()
      : '';

    if (!imageMd) return captionMd ? `${captionMd}\n\n` : '';
    return captionMd ? `${imageMd}\n${captionMd}\n\n` : `${imageMd}\n\n`;
  },
});

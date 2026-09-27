import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import WikiImageView from '@/components/haimEditor/extensions/WikiImageView';
import { WIKI_IMAGE_PLACEHOLDER_SRC } from '@/components/haimEditor/extensions/wikiImageConstants';
import {
  buildWikiImageStyle,
  parseWikiImageOptions,
  wikiImageMarkupFromAttrs,
} from '@/utils/wikiImageSyntax';

export { WIKI_IMAGE_PLACEHOLDER_SRC } from '@/components/haimEditor/extensions/wikiImageConstants';

export type WikiImageAttrs = {
  path: string;
  options: string;
  alt: string;
  width: string | null;
  height: string | null;
  background: string | null;
};

function attrsFromPathAndOptions(
  path: string,
  options: string,
  alt = '',
): WikiImageAttrs {
  const parsed = options ? parseWikiImageOptions(options) : null;
  return {
    path,
    options: options || '',
    alt: alt || path,
    width: parsed?.width ?? null,
    height: parsed?.height ?? null,
    background: parsed?.background ?? null,
  };
}

/**
 * Obsidian-style wiki image `![[path|opts]]`.
 * Renders canonical <img data-wiki-path> for storage hydration.
 * @see docs/custom-markdown/wiki-image.md
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
      width: { default: null },
      height: { default: null },
      background: { default: null },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'img[data-wiki-path]',
        priority: 60,
        getAttrs: (el) => {
          if (!(el instanceof HTMLElement)) return false;
          const path = el.getAttribute('data-wiki-path') || '';
          if (!path) return false;
          const width = el.getAttribute('data-wiki-width');
          const height = el.getAttribute('data-wiki-height');
          const background = el.getAttribute('data-wiki-bg');
          const options =
            el.getAttribute('data-wiki-options') ||
            [
              width ? `w=${width}` : '',
              height ? `h=${height}` : '',
              background ? `bg=${background}` : '',
            ]
              .filter(Boolean)
              .join(' ');
          return {
            path,
            options,
            alt: el.getAttribute('alt') || path,
            width: width || null,
            height: height || null,
            background: background || null,
          };
        },
      },
      {
        tag: 'div[data-haim-wiki-image]',
        priority: 60,
        getAttrs: (el) => {
          if (!(el instanceof HTMLElement)) return false;
          const path = el.getAttribute('data-wiki-path') || '';
          if (!path) return false;
          const options = el.getAttribute('data-wiki-options') || '';
          return attrsFromPathAndOptions(
            path,
            options,
            el.getAttribute('data-wiki-alt') || path,
          );
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const path = String(node.attrs.path || '');
    const options = String(node.attrs.options || '');
    const alt = String(node.attrs.alt || path);
    const width = (node.attrs.width as string | null) || null;
    const height = (node.attrs.height as string | null) || null;
    const background = (node.attrs.background as string | null) || null;
    const style = buildWikiImageStyle({ width, height, background });
    return [
      'img',
      mergeAttributes(HTMLAttributes, {
        src: WIKI_IMAGE_PLACEHOLDER_SRC,
        alt,
        'data-wiki-path': path,
        ...(options ? { 'data-wiki-options': options } : {}),
        ...(width ? { 'data-wiki-width': width } : {}),
        ...(height ? { 'data-wiki-height': height } : {}),
        ...(background ? { 'data-wiki-bg': background } : {}),
        ...(style ? { style } : {}),
        class: 'haim-wiki-image',
      }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(WikiImageView);
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderMarkdown: (node: any) => {
    const path = String(node.attrs?.path || '');
    if (!path) return '';
    const width = (node.attrs?.width as string | null) || null;
    const height = (node.attrs?.height as string | null) || null;
    const background = (node.attrs?.background as string | null) || null;
    if (width || height || background) {
      return `${wikiImageMarkupFromAttrs({ path, width, height, background })}\n\n`;
    }
    const options = String(node.attrs?.options || '');
    return options ? `![[${path}|${options}]]\n\n` : `![[${path}]]\n\n`;
  },
});

/** Build HTML TipTap can parse for a wiki image mark. */
export function wikiImageToProtectedHtml(
  path: string,
  options = '',
  alt = '',
): string {
  const attrs = attrsFromPathAndOptions(path, options, alt);
  const style = buildWikiImageStyle({
    width: attrs.width,
    height: attrs.height,
    background: attrs.background,
  });
  const parts = [
    `src="${WIKI_IMAGE_PLACEHOLDER_SRC}"`,
    `alt="${escapeAttr(attrs.alt)}"`,
    `data-wiki-path="${escapeAttr(attrs.path)}"`,
    'class="haim-wiki-image"',
  ];
  if (attrs.options) parts.push(`data-wiki-options="${escapeAttr(attrs.options)}"`);
  if (attrs.width) parts.push(`data-wiki-width="${escapeAttr(attrs.width)}"`);
  if (attrs.height) parts.push(`data-wiki-height="${escapeAttr(attrs.height)}"`);
  if (attrs.background) parts.push(`data-wiki-bg="${escapeAttr(attrs.background)}"`);
  if (style) parts.push(`style="${escapeAttr(style)}"`);
  return `<img ${parts.join(' ')} />`;
}

function escapeAttr(s: string): string {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

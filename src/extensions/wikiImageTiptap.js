import { Node, mergeAttributes } from '@tiptap/core';
import { buildWikiImageStyle } from '@/utils/wikiImageSyntax';

/**
 * ![[path]] / ![[path|size]] 위키 이미지 — HTML은 <img data-wiki-path="..." /> 로 직렬화.
 * 미리보기 URL은 resolveWikiImageUrl + DOM 하이드레이션으로 채움.
 */
export const WikiImage = Node.create({
  name: 'wikiImage',
  group: 'inline',
  inline: true,
  atom: true,
  draggable: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      path: {
        default: null,
        parseHTML: (el) => el.getAttribute('data-wiki-path'),
        renderHTML: (attrs) => {
          if (!attrs.path) return {};
          return { 'data-wiki-path': attrs.path };
        },
      },
      width: {
        default: null,
        parseHTML: (el) => el.getAttribute('data-wiki-width'),
        renderHTML: (attrs) => (attrs.width ? { 'data-wiki-width': attrs.width } : {}),
      },
      height: {
        default: null,
        parseHTML: (el) => el.getAttribute('data-wiki-height'),
        renderHTML: (attrs) => (attrs.height ? { 'data-wiki-height': attrs.height } : {}),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'img[data-wiki-path]',
        priority: 65,
        getAttrs: (el) => {
          const path = el.getAttribute('data-wiki-path');
          if (!path) return false;
          return {
            path,
            width: el.getAttribute('data-wiki-width'),
            height: el.getAttribute('data-wiki-height'),
          };
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const sizeAttrs = {};
    if (node.attrs.width) sizeAttrs['data-wiki-width'] = node.attrs.width;
    if (node.attrs.height) sizeAttrs['data-wiki-height'] = node.attrs.height;
    const style = buildWikiImageStyle({ width: node.attrs.width, height: node.attrs.height });
    if (style) sizeAttrs.style = style;
    return [
      'img',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-wiki-path': node.attrs.path,
        ...sizeAttrs,
        alt: '',
        class: 'novel-wiki-image',
      }),
    ];
  },
});

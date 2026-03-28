import { Node, mergeAttributes } from '@tiptap/core';

/**
 * ![[path]] 위키 이미지 — HTML은 <img data-wiki-path="..." /> 로 직렬화.
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
    };
  },

  parseHTML() {
    return [
      {
        tag: 'img[data-wiki-path]',
        priority: 65,
        getAttrs: (el) => {
          const path = el.getAttribute('data-wiki-path');
          return path ? { path } : false;
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'img',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-wiki-path': node.attrs.path,
        alt: '',
        class: 'novel-wiki-image',
      }),
    ];
  },
});

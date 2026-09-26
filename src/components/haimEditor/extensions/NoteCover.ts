import { Node, mergeAttributes } from '@tiptap/core';
import { buildNoteCoverPlaceholderHtml } from '@/utils/noteCoverPlaceholderMarkdownIt';

/**
 * Leading `<!-- note-cover … -->` preview host in WYSIWYG.
 * Vault comment stays in metaPrefix; this node is display-only (empty markdown).
 * @see docs/custom-markdown/note-cover.md
 */
export const NoteCover = Node.create({
  name: 'noteCover',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: false,

  parseHTML() {
    return [
      {
        tag: 'div[data-note-cover-placeholder]',
        priority: 60,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    // TipTap needs a node array; expand placeholder DOM tree.
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        class:
          'md-note-cover-placeholder md-note-cover-placeholder--pending',
        'data-note-cover-placeholder': '1',
        role: 'button',
        tabindex: '0',
        title: '표지 편집으로 이동',
      }),
      [
        'div',
        {
          class: 'md-note-cover-placeholder__mount',
          'data-note-cover-mount': '1',
        },
      ],
      [
        'span',
        { class: 'md-note-cover-placeholder__fallback' },
        ['span', { class: 'md-note-cover-placeholder__spinner', 'aria-hidden': 'true' }],
        [
          'span',
          { class: 'md-note-cover-placeholder__fallback-text' },
          '표지 불러오는 중…',
        ],
      ],
    ];
  },

  // Cover JSON lives in leading meta comment — do not emit into body.
  renderMarkdown: () => '',
});

/** HTML string for setContent / protect inject. */
export function noteCoverPlaceholderProtectedHtml(): string {
  return `${buildNoteCoverPlaceholderHtml()}\n\n`;
}

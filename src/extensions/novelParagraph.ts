import { Paragraph } from '@tiptap/extension-paragraph';

const CAPTION_CLASS = 'novel-wiki-caption-line';

/**
 * 위키 이미지 캡션 쌍용 class(novel-wiki-image-line / novel-wiki-caption-line) 유지
 * 캡션 단락에서 Enter → 아래에 본문 단락(class 없음, 좌측 정렬은 CSS)
 */
export const NovelParagraph = Paragraph.extend({
  addAttributes() {
    return {
      class: {
        default: null,
        parseHTML: (element: any) => element.getAttribute('class'),
        renderHTML: (attributes: any) => {
          if (!attributes.class) return {};
          return { class: attributes.class };
        },
      },
    };
  },

  addKeyboardShortcuts() {
    return {
      Enter: ({
        editor
      }: any) => {
        const { $from } = editor.state.selection;
        if ($from.parent.type.name !== 'paragraph') return false;
        if ($from.parent.attrs.class !== CAPTION_CLASS) return false;

        return editor
          .chain()
          .focus()
          .splitBlock()
          .updateAttributes('paragraph', { class: null })
          .run();
      },
    };
  },
});

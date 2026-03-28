import {
  CheckSquare,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  List,
  ListOrdered,
  Minus,
  Subtitles,
  Text,
  TextQuote,
} from 'lucide-react';
import { createSuggestionItems } from 'novel';
import { wikiImageWithCaptionBlocksDocFromPaths } from '@/utils/wikiImageHtmlInject';

/**
 * @param {{ onUploadImage?: (files: File[]) => Promise<string[]> }} opts
 */
export function buildNovelSlashSuggestionItems({ onUploadImage } = {}) {
  return createSuggestionItems([
    {
      title: '본문',
      description: '일반 문단',
      searchTerms: ['p', 'paragraph', 'text'],
      icon: <Text className="h-4 w-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setParagraph().run();
      },
    },
    {
      title: '할 일',
      description: '체크리스트',
      searchTerms: ['todo', 'task', 'list', 'check', 'checkbox'],
      icon: <CheckSquare className="h-4 w-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleTaskList().run();
      },
    },
    {
      title: '제목 1',
      description: '큰 제목',
      searchTerms: ['title', 'h1', 'heading'],
      icon: <Heading1 className="h-4 w-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run();
      },
    },
    {
      title: '제목 2',
      description: '중간 제목',
      searchTerms: ['h2', 'subtitle'],
      icon: <Heading2 className="h-4 w-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run();
      },
    },
    {
      title: '제목 3',
      description: '작은 제목',
      searchTerms: ['h3', 'subtitle'],
      icon: <Heading3 className="h-4 w-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setHeading({ level: 3 }).run();
      },
    },
    {
      title: '글머리 목록',
      description: '순서 없는 목록',
      searchTerms: ['bullet', 'unordered', 'ul'],
      icon: <List className="h-4 w-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      title: '번호 목록',
      description: '순서 있는 목록',
      searchTerms: ['ordered', 'ol', 'number'],
      icon: <ListOrdered className="h-4 w-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      },
    },
    {
      title: '인용',
      description: '인용 블록',
      searchTerms: ['quote', 'blockquote'],
      icon: <TextQuote className="h-4 w-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBlockquote().run();
      },
    },
    {
      title: '코드 블록',
      description: '여러 줄 코드',
      searchTerms: ['code', 'codeblock', 'pre'],
      icon: <Code className="h-4 w-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
      },
    },
    {
      title: '구분선',
      description: '가로 구분선',
      searchTerms: ['hr', 'horizontal', 'rule', 'divider'],
      icon: <Minus className="h-4 w-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setHorizontalRule().run();
      },
    },
    {
      title: '이미지',
      description: onUploadImage ? 'S3에 올리고 ![[경로]] 삽입 (아래에 캡션 줄 포함)' : 'S3 연결 후 사용',
      searchTerms: ['img', 'image', 'photo', 'picture', 'upload'],
      icon: <ImageIcon className="h-4 w-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).run();
        if (typeof onUploadImage !== 'function') return;
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async () => {
          const file = input.files?.[0];
          if (!file) return;
          const paths = await onUploadImage([file]);
          if (!paths?.length) return;
          const blocks = wikiImageWithCaptionBlocksDocFromPaths(paths);
          if (blocks.length) editor.chain().focus().insertContent(blocks).run();
        };
        input.click();
      },
    },
    {
      title: '이미지 캡션',
      description: '바로 위 이미지 설명을 적을 줄 추가',
      searchTerms: ['caption', '캡션', '설명', 'subtitle', 'fig'],
      icon: <Subtitles className="h-4 w-4" />,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .insertContent('<p class="novel-wiki-caption-line"></p>')
          .run();
      },
    },
  ]);
}

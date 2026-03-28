import {
  CheckSquare,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Image as ImageIcon,
  List,
  ListOrdered,
  Minus,
  Printer,
  Save,
  ScrollText,
  Subtitles,
  Text,
  TextQuote,
} from 'lucide-react';
import { createSuggestionItems } from 'novel';
import { wikiImageWithCaptionBlocksDocFromPaths } from '@/utils/wikiImageHtmlInject';

/** 슬래시 «Lorem ipsum» — 여러 문단의 표준 더미 텍스트 */
const LOREM_IPSUM_PARAGRAPHS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.',
  'Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum.',
  'Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus vitae erat. Proin vitae lorem id felis porttitor viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus ultricies nulla feugiat sapien tincidunt laoreet.',
  'Morbi et risus vitae magna feugiat interdum. Nam vitae felis id lectus pharetra bibendum et quis felis. Suspendisse potenti. Aliquam erat volutpat. Integer ultrices lobortis eros, at vestibulum purus posuere id. Vivamus ac ante ut odio cursus faucibus at quis felis. Nulla facilisi.',
  'Fusce vehicula, augue eu pulvinar volutpat, felis est placerat libero, nec convallis ligula felis in tellus. Aenean nec erat at mi posuere aliquam. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.',
];

const LOREM_IPSUM_HTML = LOREM_IPSUM_PARAGRAPHS.map((p) => `<p>${p}</p>`).join('');

/**
 * @param {{
 *   onUploadImage?: (files: File[]) => Promise<string[]>;
 *   onExportPdf?: (editor: import('@tiptap/core').Editor) => void;
 *   onSave?: () => void;
 * }} opts
 * `onExportPdf`: `ExportPDF` 컴포넌트와 같이 `/export-pdf`로 본문·테마를 넘겨 인쇄 미리보기를 연다.
 */
export function buildNovelSlashSuggestionItems({ onUploadImage, onExportPdf, onSave } = {}) {
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
      title: 'Lorem ipsum',
      description: '더미 본문 여러 문단 삽입',
      searchTerms: ['lorem', 'ipsum', '/lorem', 'placeholder', 'dummy', '더미', '로렘'],
      icon: <ScrollText className="h-4 w-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).insertContent(LOREM_IPSUM_HTML).run();
      },
    },
    {
      title: '할 일',
      description: '체크리스트',
      searchTerms: ['todo', 'task', 'list', 'check'],
      icon: <CheckSquare className="h-4 w-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleTaskList().run();
      },
    },
    {
      title: '/checkbox',
      description: '체크리스트 (할 일과 동일)',
      searchTerms: ['checkbox', '/checkbox', '체크박스'],
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
      title: '제목 4',
      description: '4단계 제목',
      searchTerms: ['h4', 'heading'],
      icon: <Heading4 className="h-4 w-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setHeading({ level: 4 }).run();
      },
    },
    {
      title: '제목 5',
      description: '5단계 제목',
      searchTerms: ['h5', 'heading'],
      icon: <Heading5 className="h-4 w-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setHeading({ level: 5 }).run();
      },
    },
    {
      title: '제목 6',
      description: '6단계 제목',
      searchTerms: ['h6', 'heading'],
      icon: <Heading6 className="h-4 w-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setHeading({ level: 6 }).run();
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
      title: 'PDF로 내보내기',
      description: '인쇄 미리보기 페이지로 이동 (md-editor 툴바와 동일)',
      searchTerms: ['pdf', 'print', 'export', '인쇄', '프린트', '내보내기'],
      icon: <Printer className="h-4 w-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).run();
        if (typeof onExportPdf === 'function') onExportPdf(editor);
      },
    },
    {
      title: '저장',
      description: '현재 파일 저장',
      searchTerms: ['save', '/save', '저장'],
      icon: <Save className="h-4 w-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).run();
        if (typeof onSave === 'function') onSave();
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

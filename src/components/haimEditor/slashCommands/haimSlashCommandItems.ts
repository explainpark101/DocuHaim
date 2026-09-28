import type { Editor } from '@tiptap/core';
import type { LucideIcon } from 'lucide-react';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Heading,
  List,
  ListOrdered,
  ListTodo,
  Quote,
  Link2,
  Table,
  Undo2,
  Redo2,
  SeparatorHorizontal,
  Subscript,
  Superscript,
  ListTree,
  Printer,
  Sparkles,
  Image as ImageIcon,
  BarChart3,
  Sigma,
  Workflow,
  Search,
  Pilcrow,
  QrCode,
  FileCode2,
  Type,
} from 'lucide-react';

/** App-level actions the slash menu can invoke (modals / shell). */
export type HaimSlashAppActions = {
  onUrlLink?: (() => void) | undefined;
  onDocuhaimNoteLink?: (() => void) | undefined;
  onInsertPageBreak?: (() => void) | undefined;
  onInsertMermaid?: (() => void) | undefined;
  onInsertKatex?: (() => void) | undefined;
  onImageLink?: (() => void) | undefined;
  onImageUpload?: (() => void) | undefined;
  onImageClip?: (() => void) | undefined;
  onCreateWhiteboard?: (() => void) | undefined;
  onCreateQrCode?: (() => void) | undefined;
  onHeadingRemap?: (() => void) | undefined;
  onChecklistProgress?: (() => void) | undefined;
  onLlmAssist?: (() => void) | undefined;
  onExportPdf?: (() => void) | undefined;
  onFindReplaceToggle?: (() => void) | undefined;
  onInvisibleCharsToggle?: (() => void) | undefined;
  onTocToggle?: (() => void) | undefined;
};

export type HaimSlashRunContext = {
  editor: Editor;
  app: HaimSlashAppActions | null;
};

export type HaimSlashCommandGroup =
  | 'format'
  | 'heading'
  | 'block'
  | 'insert'
  | 'tool';

export type HaimSlashCommandItem = {
  id: string;
  /** Korean primary label (UI). */
  title: string;
  /** English label (UI secondary + search). */
  titleEn: string;
  keywords: string[];
  group: HaimSlashCommandGroup;
  groupLabel: string;
  Icon: LucideIcon;
  run: (ctx: HaimSlashRunContext) => void;
};

const GROUP_LABEL: Record<HaimSlashCommandGroup, string> = {
  format: '서식',
  heading: '제목',
  block: '블록',
  insert: '삽입',
  tool: '도구',
};

function toggleHeadingLevel(editor: Editor, level: number): void {
  if (level >= 1 && level <= 6) {
    editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run();
    return;
  }
  if (level >= 7 && level <= 10) {
    const cmds = editor.commands as typeof editor.commands & {
      toggleDeepHeading?: (attrs: { level: number }) => boolean;
    };
    if (typeof cmds.toggleDeepHeading === 'function') {
      cmds.toggleDeepHeading({ level });
      return;
    }
    editor
      .chain()
      .focus()
      .command(({ commands }) =>
        commands.toggleNode('deepHeading', 'paragraph', { level }),
      )
      .run();
  }
}

function headingItem(level: number, Icon: LucideIcon): HaimSlashCommandItem {
  return {
    id: `heading-${level}`,
    title: `제목 ${level}`,
    titleEn: `Heading ${level}`,
    keywords: [
      `h${level}`,
      `heading ${level}`,
      `heading${level}`,
      `제목${level}`,
      `제목 ${level}`,
      '#'.repeat(level),
    ],
    group: 'heading',
    groupLabel: GROUP_LABEL.heading,
    Icon,
    run: ({ editor }) => {
      toggleHeadingLevel(editor, level);
    },
  };
}

/**
 * Slash-command catalog mirroring Haim toolbar (+ h1–h10).
 * Searchable in Korean and English via title / titleEn / keywords.
 */
export const HAIM_SLASH_COMMANDS: readonly HaimSlashCommandItem[] = [
  {
    id: 'bold',
    title: '굵게',
    titleEn: 'Bold',
    keywords: ['bold', '굵게', '볼드', '강조', 'strong'],
    group: 'format',
    groupLabel: GROUP_LABEL.format,
    Icon: Bold,
    run: ({ editor }) => {
      editor.chain().focus().toggleBold().run();
    },
  },
  {
    id: 'italic',
    title: '기울임',
    titleEn: 'Italic',
    keywords: ['italic', '기울임', '이탤릭', 'em'],
    group: 'format',
    groupLabel: GROUP_LABEL.format,
    Icon: Italic,
    run: ({ editor }) => {
      editor.chain().focus().toggleItalic().run();
    },
  },
  {
    id: 'underline',
    title: '밑줄',
    titleEn: 'Underline',
    keywords: ['underline', '밑줄', '언더라인'],
    group: 'format',
    groupLabel: GROUP_LABEL.format,
    Icon: UnderlineIcon,
    run: ({ editor }) => {
      editor.chain().focus().toggleUnderline().run();
    },
  },
  {
    id: 'strike',
    title: '취소선',
    titleEn: 'Strikethrough',
    keywords: ['strike', 'strikethrough', '취소선', '삭제선'],
    group: 'format',
    groupLabel: GROUP_LABEL.format,
    Icon: Strikethrough,
    run: ({ editor }) => {
      editor.chain().focus().toggleStrike().run();
    },
  },
  {
    id: 'code',
    title: '인라인 코드',
    titleEn: 'Inline code',
    keywords: ['code', 'inline code', '인라인 코드', '코드'],
    group: 'format',
    groupLabel: GROUP_LABEL.format,
    Icon: Code,
    run: ({ editor }) => {
      editor.chain().focus().toggleCode().run();
    },
  },
  {
    id: 'subscript',
    title: '아래 첨자',
    titleEn: 'Subscript',
    keywords: ['sub', 'subscript', '아래첨자', '아래 첨자'],
    group: 'format',
    groupLabel: GROUP_LABEL.format,
    Icon: Subscript,
    run: ({ editor }) => {
      editor.chain().focus().toggleSubscript().run();
    },
  },
  {
    id: 'superscript',
    title: '위 첨자',
    titleEn: 'Superscript',
    keywords: ['sup', 'superscript', '위첨자', '위 첨자'],
    group: 'format',
    groupLabel: GROUP_LABEL.format,
    Icon: Superscript,
    run: ({ editor }) => {
      editor.chain().focus().toggleSuperscript().run();
    },
  },
  headingItem(1, Heading1),
  headingItem(2, Heading2),
  headingItem(3, Heading3),
  headingItem(4, Heading4),
  headingItem(5, Heading5),
  headingItem(6, Heading6),
  headingItem(7, Heading),
  headingItem(8, Heading),
  headingItem(9, Heading),
  headingItem(10, Heading),
  {
    id: 'paragraph',
    title: '본문',
    titleEn: 'Paragraph',
    keywords: ['paragraph', '본문', '텍스트', 'text', 'p'],
    group: 'block',
    groupLabel: GROUP_LABEL.block,
    Icon: Type,
    run: ({ editor }) => {
      editor.chain().focus().setParagraph().run();
    },
  },
  {
    id: 'bullet-list',
    title: '글머리 기호 목록',
    titleEn: 'Bullet list',
    keywords: ['ul', 'unordered', 'bullet', '목록', '리스트', '글머리'],
    group: 'block',
    groupLabel: GROUP_LABEL.block,
    Icon: List,
    run: ({ editor }) => {
      editor.chain().focus().toggleBulletList().run();
    },
  },
  {
    id: 'ordered-list',
    title: '번호 목록',
    titleEn: 'Ordered list',
    keywords: ['ol', 'ordered', 'numbered', '번호', '번호 목록'],
    group: 'block',
    groupLabel: GROUP_LABEL.block,
    Icon: ListOrdered,
    run: ({ editor }) => {
      editor.chain().focus().toggleOrderedList().run();
    },
  },
  {
    id: 'task-list',
    title: '할 일 목록',
    titleEn: 'Task list',
    keywords: ['task', 'todo', 'checkbox', '체크리스트', '할 일', '체크박스', 'check'],
    group: 'block',
    groupLabel: GROUP_LABEL.block,
    Icon: ListTodo,
    run: ({ editor }) => {
      editor.chain().focus().toggleTaskList().run();
    },
  },
  {
    id: 'status-task',
    title: '상태 할 일',
    titleEn: 'Status task',
    keywords: [
      'status',
      'doing',
      'in progress',
      '진행',
      '상태',
      '상태 체크박스',
      '~',
    ],
    group: 'block',
    groupLabel: GROUP_LABEL.block,
    Icon: ListTodo,
    run: ({ editor }) => {
      const ensureStatusAttrs = () => {
        editor
          .chain()
          .focus()
          .command(({ tr, state, dispatch }) => {
            if (!dispatch) return false;
            const $from = state.selection.$from;
            for (let d = $from.depth; d >= 0; d -= 1) {
              if ($from.node(d).type.name !== 'taskItem') continue;
              tr.setNodeMarkup($from.before(d), undefined, {
                ...$from.node(d).attrs,
                status: 'doing',
                checked: false,
                kind: 'status',
              });
              dispatch(tr);
              return true;
            }
            return false;
          })
          .run();
      };

      if (!editor.isActive('taskList')) {
        editor.chain().focus().toggleTaskList().run();
      }
      ensureStatusAttrs();
    },
  },
  {
    id: 'blockquote',
    title: '인용',
    titleEn: 'Quote',
    keywords: ['quote', 'blockquote', '인용'],
    group: 'block',
    groupLabel: GROUP_LABEL.block,
    Icon: Quote,
    run: ({ editor }) => {
      editor.chain().focus().toggleBlockquote().run();
    },
  },
  {
    id: 'code-block',
    title: '코드 블록',
    titleEn: 'Code block',
    keywords: ['code block', 'fence', '코드 블록', '펜스'],
    group: 'block',
    groupLabel: GROUP_LABEL.block,
    Icon: FileCode2,
    run: ({ editor }) => {
      editor.chain().focus().toggleCodeBlock().run();
    },
  },
  {
    id: 'link',
    title: '링크',
    titleEn: 'Link',
    keywords: ['link', 'url', '링크', '하이퍼링크'],
    group: 'insert',
    groupLabel: GROUP_LABEL.insert,
    Icon: Link2,
    run: ({ editor, app }) => {
      if (app?.onUrlLink) {
        app.onUrlLink();
        return;
      }
      const prev = editor.getAttributes('link').href as string | undefined;
      const url = window.prompt('URL', prev || 'https://');
      if (url === null) return;
      if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
        return;
      }
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    },
  },
  {
    id: 'docuhaim-link',
    title: '노트 링크',
    titleEn: 'Note link',
    keywords: [
      'docuhaim',
      'note link',
      '노트 링크',
      'vault link',
      '파일 링크',
    ],
    group: 'insert',
    groupLabel: GROUP_LABEL.insert,
    Icon: Link2,
    run: ({ app }) => {
      app?.onDocuhaimNoteLink?.();
    },
  },
  {
    id: 'table',
    title: '표',
    titleEn: 'Table',
    keywords: ['table', '표', '테이블'],
    group: 'insert',
    groupLabel: GROUP_LABEL.insert,
    Icon: Table,
    run: ({ editor }) => {
      editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run();
    },
  },
  {
    id: 'mermaid',
    title: 'Mermaid',
    titleEn: 'Mermaid diagram',
    keywords: ['mermaid', 'diagram', '다이어그램', 'flowchart', '그래프'],
    group: 'insert',
    groupLabel: GROUP_LABEL.insert,
    Icon: Workflow,
    run: ({ editor, app }) => {
      if (app?.onInsertMermaid) {
        app.onInsertMermaid();
        return;
      }
      editor
        .chain()
        .focus()
        .insertContent('```mermaid\ngraph TD\n  A-->B\n```\n', {
          contentType: 'markdown',
        } as never)
        .run();
    },
  },
  {
    id: 'katex',
    title: '수식',
    titleEn: 'Math / KaTeX',
    keywords: ['math', 'katex', 'latex', '수식', '공식', 'formula'],
    group: 'insert',
    groupLabel: GROUP_LABEL.insert,
    Icon: Sigma,
    run: ({ editor, app }) => {
      if (app?.onInsertKatex) {
        app.onInsertKatex();
        return;
      }
      const cmds = editor.commands as typeof editor.commands & {
        insertBlockMath?: (opts: { latex: string }) => boolean;
      };
      if (typeof cmds.insertBlockMath === 'function') {
        cmds.insertBlockMath({ latex: 'E=mc^2' });
        return;
      }
      editor
        .chain()
        .focus()
        .insertContent(
          '<div data-type="block-math" data-latex="E=mc^2"></div>',
        )
        .run();
    },
  },
  {
    id: 'page-break',
    title: '페이지 나눔',
    titleEn: 'Page break',
    keywords: ['pgbr', 'page break', '페이지 나눔', '인쇄'],
    group: 'insert',
    groupLabel: GROUP_LABEL.insert,
    Icon: SeparatorHorizontal,
    run: ({ editor, app }) => {
      if (app?.onInsertPageBreak) {
        app.onInsertPageBreak();
        return;
      }
      editor.chain().focus().setPageBreak().run();
    },
  },
  {
    id: 'image-link',
    title: '이미지 링크',
    titleEn: 'Image link',
    keywords: ['image', '이미지', 'wiki image', '이미지 링크', 'picture', 'pic'],
    group: 'insert',
    groupLabel: GROUP_LABEL.insert,
    Icon: ImageIcon,
    run: ({ app }) => {
      app?.onImageLink?.();
    },
  },
  {
    id: 'image-upload',
    title: '이미지 업로드',
    titleEn: 'Upload image',
    keywords: ['image', 'upload', '이미지', '업로드', '사진', 'picture', 'pic'],
    group: 'insert',
    groupLabel: GROUP_LABEL.insert,
    Icon: ImageIcon,
    run: ({ app }) => {
      app?.onImageUpload?.();
    },
  },
  {
    id: 'image-clip',
    title: '이미지 잘라서 업로드',
    titleEn: 'Crop & upload image',
    keywords: [
      'image',
      'crop',
      'clip',
      '자르기',
      '크롭',
      'picture',
      'pic',
    ],
    group: 'insert',
    groupLabel: GROUP_LABEL.insert,
    Icon: ImageIcon,
    run: ({ app }) => {
      app?.onImageClip?.();
    },
  },
  {
    id: 'whiteboard',
    title: '화이트보드 만들기',
    titleEn: 'Create whiteboard',
    keywords: ['whiteboard', '화이트보드', '캔버스', 'canvas', 'picture'],
    group: 'insert',
    groupLabel: GROUP_LABEL.insert,
    Icon: ImageIcon,
    run: ({ app }) => {
      app?.onCreateWhiteboard?.();
    },
  },
  {
    id: 'qrcode',
    title: 'QRCode 만들기',
    titleEn: 'Create QR code',
    keywords: ['qr', 'qrcode', '큐알', '큐알코드'],
    group: 'insert',
    groupLabel: GROUP_LABEL.insert,
    Icon: QrCode,
    run: ({ app }) => {
      app?.onCreateQrCode?.();
    },
  },
  {
    id: 'undo',
    title: '실행 취소',
    titleEn: 'Undo',
    keywords: ['undo', 'revoke', '실행취소', '되돌리기'],
    group: 'tool',
    groupLabel: GROUP_LABEL.tool,
    Icon: Undo2,
    run: ({ editor }) => {
      editor.chain().focus().undo().run();
    },
  },
  {
    id: 'redo',
    title: '다시 실행',
    titleEn: 'Redo',
    keywords: ['redo', 'next', '다시실행'],
    group: 'tool',
    groupLabel: GROUP_LABEL.tool,
    Icon: Redo2,
    run: ({ editor }) => {
      editor.chain().focus().redo().run();
    },
  },
  {
    id: 'heading-remap',
    title: '제목 수준 재매핑',
    titleEn: 'Remap heading levels',
    keywords: [
      'heading remap',
      '제목 변경',
      '헤딩',
      '제목리맵',
      '헤딩리매핑',
    ],
    group: 'tool',
    groupLabel: GROUP_LABEL.tool,
    Icon: Heading,
    run: ({ app }) => {
      app?.onHeadingRemap?.();
    },
  },
  {
    id: 'checklist-progress',
    title: '체크리스트 진행률',
    titleEn: 'Checklist progress',
    keywords: ['checklist', 'progress', '진행률', '체크리스트'],
    group: 'tool',
    groupLabel: GROUP_LABEL.tool,
    Icon: BarChart3,
    run: ({ app }) => {
      app?.onChecklistProgress?.();
    },
  },
  {
    id: 'llm-assist',
    title: 'AI 도우미',
    titleEn: 'AI assistant',
    keywords: ['ai', 'llm', 'gemini', 'openai', '인공지능', '도우미'],
    group: 'tool',
    groupLabel: GROUP_LABEL.tool,
    Icon: Sparkles,
    run: ({ app }) => {
      app?.onLlmAssist?.();
    },
  },
  {
    id: 'export-pdf',
    title: 'PDF로 내보내기',
    titleEn: 'Export PDF',
    keywords: ['export', 'pdf', '인쇄', 'print', '내보내기'],
    group: 'tool',
    groupLabel: GROUP_LABEL.tool,
    Icon: Printer,
    run: ({ app }) => {
      app?.onExportPdf?.();
    },
  },
  {
    id: 'find-replace',
    title: '찾기/바꾸기',
    titleEn: 'Find and replace',
    keywords: ['find', 'replace', 'search', '찾기', '바꾸기', '검색'],
    group: 'tool',
    groupLabel: GROUP_LABEL.tool,
    Icon: Search,
    run: ({ app }) => {
      app?.onFindReplaceToggle?.();
    },
  },
  {
    id: 'invisible-chars',
    title: '비가시 문자',
    titleEn: 'Invisible characters',
    keywords: [
      'invisible',
      'whitespace',
      '비가시',
      '공백',
      'pilcrow',
      '¶',
    ],
    group: 'tool',
    groupLabel: GROUP_LABEL.tool,
    Icon: Pilcrow,
    run: ({ app }) => {
      app?.onInvisibleCharsToggle?.();
    },
  },
  {
    id: 'toc',
    title: '목차',
    titleEn: 'Table of contents',
    keywords: ['toc', 'catalog', '목차', 'outline'],
    group: 'tool',
    groupLabel: GROUP_LABEL.tool,
    Icon: ListTree,
    run: ({ app }) => {
      app?.onTocToggle?.();
    },
  },
];

function normalizeSearchText(value: string): string {
  return value.normalize('NFKC').toLowerCase();
}

/** Filter slash commands by Korean/English query. Empty query → all items. */
export function filterHaimSlashCommands(
  query: string,
  items: readonly HaimSlashCommandItem[] = HAIM_SLASH_COMMANDS,
): HaimSlashCommandItem[] {
  const q = normalizeSearchText(query).trim();
  if (!q) return [...items];

  const parts = q.split(/\s+/).filter(Boolean);
  return items.filter((item) => {
    const hay = normalizeSearchText(
      [item.id, item.title, item.titleEn, ...item.keywords].join('\n'),
    );
    return parts.every((part) => hay.includes(part));
  });
}

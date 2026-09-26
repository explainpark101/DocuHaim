import StarterKit from '@tiptap/starter-kit';
import { Markdown } from '@tiptap/markdown';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Placeholder from '@tiptap/extension-placeholder';
import { PageBreak } from '@/components/haimEditor/extensions/PageBreak';
import { WikiImage } from '@/components/haimEditor/extensions/WikiImage';
import { RawMarkdownBlock } from '@/components/haimEditor/extensions/RawMarkdownBlock';
import { DeepHeading } from '@/components/haimEditor/extensions/DeepHeading';
import { MathBlock } from '@/components/haimEditor/extensions/MathBlock';

/** Shared TipTap extension list for Haim Editor (edit + read-only preview). */
export function createHaimExtensions(options?: {
  placeholder?: string;
}) {
  const placeholder = options?.placeholder ?? '내용을 입력하세요…';

  return [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3, 4, 5, 6],
      },
      // Custom Link config below
      link: false,
    }),
    Markdown,
    Link.configure({
      openOnClick: false,
      autolink: true,
      HTMLAttributes: {
        rel: 'noopener noreferrer',
        target: '_blank',
      },
    }),
    Image.configure({
      allowBase64: true,
    }),
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    Subscript,
    Superscript,
    Placeholder.configure({
      placeholder,
    }),
    PageBreak,
    WikiImage,
    RawMarkdownBlock,
    DeepHeading,
    MathBlock,
  ];
}

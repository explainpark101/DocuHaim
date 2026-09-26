import StarterKit from '@tiptap/starter-kit';
import { Markdown } from '@tiptap/markdown';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { TableKit } from '@tiptap/extension-table';
import { ListKit } from '@tiptap/extension-list';
import { TextStyleKit } from '@tiptap/extension-text-style';
import {
  CharacterCount,
  Focus,
  Placeholder,
  Selection,
  TrailingNode,
} from '@tiptap/extensions';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Typography from '@tiptap/extension-typography';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Youtube from '@tiptap/extension-youtube';
import { Audio } from '@tiptap/extension-audio';
import {
  Details,
  DetailsContent,
  DetailsSummary,
} from '@tiptap/extension-details';
import { Emoji, gitHubEmojis } from '@tiptap/extension-emoji';
import { FindAndReplace } from '@tiptap/extension-find-and-replace';
import InvisibleCharacters from '@tiptap/extension-invisible-characters';
import UniqueID from '@tiptap/extension-unique-id';
import {
  TableOfContents,
  getHierarchicalIndexes,
} from '@tiptap/extension-table-of-contents';
import { NodeRange } from '@tiptap/extension-node-range';
import { PageBreak } from '@/components/haimEditor/extensions/PageBreak';
import { WikiImage } from '@/components/haimEditor/extensions/WikiImage';
import { NoteCover } from '@/components/haimEditor/extensions/NoteCover';
import { RawMarkdownBlock } from '@/components/haimEditor/extensions/RawMarkdownBlock';
import { DeepHeading } from '@/components/haimEditor/extensions/DeepHeading';
import { MathBlock } from '@/components/haimEditor/extensions/MathBlock';
import {
  HaimBlockMath,
  HaimInlineMath,
} from '@/components/haimEditor/extensions/HaimMath';
import { HaimCodeBlock } from '@/components/haimEditor/extensions/HaimCodeBlock';
import { HaimParagraph } from '@/components/haimEditor/extensions/HaimParagraph';
import { HaimSourceLine } from '@/components/haimEditor/extensions/HaimSourceLine';
import type { Extensions } from '@tiptap/core';

export type HaimExtensionProfile = 'note' | 'composer';

export type CreateHaimExtensionsOptions = {
  placeholder?: string;
  /** note = full open-source set; composer = lean chat subset */
  profile?: HaimExtensionProfile;
  /** Leading vault meta prefix for [data-line] vault line offsets. */
  getMetaPrefix?: () => string;
};

/**
 * TipTap open-source extension set for Haim Editor.
 * Snapshot (Pro) intentionally omitted.
 * @see https://tiptap.dev/docs/editor/extensions/overview?filter=opensource
 */
export function createHaimExtensions(
  options?: CreateHaimExtensionsOptions,
): Extensions {
  const placeholder = options?.placeholder ?? '내용을 입력하세요…';
  const profile = options?.profile ?? 'note';
  const isNote = profile === 'note';
  const getMetaPrefix = options?.getMetaPrefix ?? (() => '');

  const starterKit = isNote
    ? StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
        paragraph: false,
        codeBlock: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        listKeymap: false,
        link: false,
        trailingNode: false,
      })
    : StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
        paragraph: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        listKeymap: false,
        link: false,
        trailingNode: false,
      });

  const base: Extensions = [
    starterKit,
    HaimParagraph,
    Markdown,
    HaimSourceLine.configure({ getMetaPrefix }),
    Link.configure({
      openOnClick: false,
      autolink: true,
      HTMLAttributes: {
        rel: 'noopener noreferrer',
        target: '_blank',
      },
    }),
    Image.extend({
      parseHTML() {
        return [
          {
            tag: 'img[src]:not([data-wiki-path])',
          },
        ];
      },
    }).configure({
      allowBase64: true,
    }),
    ListKit.configure({
      taskItem: { nested: true },
    }),
    TableKit.configure({
      table: { resizable: isNote },
    }),
    TextStyleKit,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Highlight.configure({ multicolor: true }),
    ...(isNote ? [HaimCodeBlock] : []),
    Subscript,
    Superscript,
    Typography,
    Placeholder.configure({ placeholder }),
    CharacterCount,
    Focus.configure({ className: 'haim-node-focused' }),
    Selection,
    TrailingNode,
    HaimBlockMath,
    HaimInlineMath,
    // DocuHaim custom
    PageBreak,
    WikiImage,
    ...(isNote ? [NoteCover] : []),
    RawMarkdownBlock,
    DeepHeading,
    MathBlock,
  ];

  if (!isNote) {
    return base;
  }

  // Note-only: heavier open-source nodes (DragHandle + Collaboration = lazy UI)
  return [
    ...base,
    Audio,
    Youtube.configure({
      controls: true,
      nocookie: true,
    }),
    Details.configure({ persist: true }),
    DetailsSummary,
    DetailsContent,
    Emoji.configure({
      emojis: gitHubEmojis,
      enableEmoticons: true,
    }),
    FindAndReplace,
    InvisibleCharacters.configure({
      injectCSS: true,
      visible: false,
    }),
    UniqueID.configure({
      types: ['heading', 'paragraph'],
    }),
    TableOfContents.configure({
      getIndex: getHierarchicalIndexes,
    }),
    NodeRange,
  ];
}

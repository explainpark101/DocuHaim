/**
 * md-editor-rt 전역 설정.
 * 앱 진입 시 main.jsx에서 로드되어, ExportPDFPage 등 MdPreview만 사용하는 페이지에서도
 * wiki image·미리보기 링크(외부만 target=_blank) 플러그인이 적용되도록 한다.
 */
import { config, XSSPlugin } from 'md-editor-rt';
import { EditorView } from '@codemirror/view';
import { closeCompletion, completionStatus } from '@codemirror/autocomplete';
import { wikiImagePlugin } from '@/utils/wikiImageMarkdownIt';
import { previewLinkTargetBlankPlugin } from '@/utils/previewLinkTargetBlankMarkdownIt';
import { pageBreakMarkdownItPlugin } from '@/utils/pageBreakMarkdownIt';
import { chatSavedNotePlugin } from '@/utils/chatSavedNoteMarkdownIt';
import { noteCoverPlaceholderMarkdownItPlugin } from '@/utils/noteCoverPlaceholderMarkdownIt';
import { headingLevelsMarkdownItPlugin } from '@/utils/markdownItHeadingLevels';
import { haimTableMarkdownItPlugin } from '@/utils/haimTable/markdownItPlugin';
import { planFrontmatterMarkdownItPlugin } from '@/utils/planFrontmatter/markdownItPlugin';
import { footnoteMarkdownItPlugin, disableCommonMarkLinkReferences } from '@/utils/footnoteMarkdownIt';
import { loadEditorAutocompleteEnabled } from '@/utils/editorAutocompleteSettings';
import { HLJS_ATOM_ONE_DARK_CSS } from '@/utils/mdEditorCodeTheme';
import '@/utils/markedHeadingLevels';
import '@/styles/md-editor-rt/chat-saved-note.css';
import '@/styles/md-editor-rt/note-cover-placeholder.css';
import '@/styles/md-editor-rt/plan-frontmatter.css';
import '@/styles/md-editor-rt/preview-heading-fold.css';
import '@/styles/md-editor-rt/footnotes.css';
import '@/styles/md-editor-rt/code-one-dark.css';
import '@/styles/md-editor-rt/code-copy.css';

const TABLE_XSS_ATTRS = ['style', 'class', 'colspan', 'rowspan', 'align', 'valign', 'width', 'height', 'data-haim-table', 'data-haim-r', 'data-haim-c', 'data-haim-section', 'data-haim-width', 'data-haim-align', 'data-haim-box-w', 'data-haim-box-h'];

const PGBR_XSS_EXTENDED_WHITELIST = {
  br: [],
  pgbr: [],
  div: [
    'class',
    'data-md-pgbr',
    'data-md-plan',
    'data-note-cover-placeholder',
    'data-note-cover-mount',
    'data-note-cover-preview',
    'data-color-mode',
    'role',
    'tabindex',
    'aria-label',
    'aria-level',
  ],
  span: [
    'class',
    'data-md-pgbr',
    'data-md-plan-project',
    'data-md-plan-progress',
    'aria-hidden',
    'data-note-cover-fallback',
  ],
  p: ['class'],
  ul: ['class'],
  li: ['class', 'id', 'data-status', 'data-md-footnote-id', 'data-md-footnote-label'],
  h6: ['id', 'class', 'data-heading-level'],
  a: [
    'href',
    'class',
    'id',
    'target',
    'rel',
    'data-chat-saved-note',
    'data-chat-href',
    'data-chat-id',
    'data-md-footnote-to',
    'data-md-footnote-id',
    'data-md-footnote-title',
    'aria-label',
    'title',
  ],
  sup: ['class'],
  sub: ['class'],
  section: ['class'],
  hr: ['class'],
  ol: ['class'],
  table: TABLE_XSS_ATTRS,
  thead: TABLE_XSS_ATTRS,
  tbody: TABLE_XSS_ATTRS,
  tfoot: TABLE_XSS_ATTRS,
  tr: ['class', 'style'],
  th: TABLE_XSS_ATTRS,
  td: TABLE_XSS_ATTRS,
  img: [
    'src',
    'alt',
    'title',
    'class',
    'style',
    'width',
    'height',
    'data-wiki-path',
    'data-wiki-width',
    'data-wiki-height',
    'data-md-src',
    'data-md-width',
    'data-md-height',
    'data-storage-image',
  ],
};

config({
  // Fenced ``` blocks: always Atom One Dark (comments + tokens stay visible).
  editorExtensions: {
    highlight: {
      css: {
        'one-dark': {
          light: HLJS_ATOM_ONE_DARK_CSS,
          dark: HLJS_ATOM_ONE_DARK_CSS,
        },
      },
    },
    // Stub: skip md-editor-rt CDN load of Cropper.js 1 (clip UI replaced by ImageToolbar).
    cropper: {
      instance: {},
    },
  },
  markdownItConfig(md) {
    XSSPlugin(md, {
      extendedWhiteList: PGBR_XSS_EXTENDED_WHITELIST,
    });
    // Footnotes first so core prepare runs before block parse; reference defs stay off.
    footnoteMarkdownItPlugin(md);
  },
  markdownItPlugins(plugins) {
    return [
      ...plugins,
      { type: 'heading_levels', plugin: headingLevelsMarkdownItPlugin, options: {} },
      { type: 'wiki_image', plugin: wikiImagePlugin, options: {} },
      { type: 'preview_link_target_blank', plugin: previewLinkTargetBlankPlugin, options: {} },
      { type: 'pgbr', plugin: pageBreakMarkdownItPlugin, options: {} },
      { type: 'chat_saved_note', plugin: chatSavedNotePlugin, options: {} },
      { type: 'note_cover_placeholder', plugin: noteCoverPlaceholderMarkdownItPlugin, options: {} },
      { type: 'haim_table', plugin: haimTableMarkdownItPlugin, options: {} },
      { type: 'plan_frontmatter', plugin: planFrontmatterMarkdownItPlugin, options: {} },
      // TEMP: re-disable after built-in plugins in case anything re-enables reference.
      {
        type: 'disable_commonmark_reference',
        plugin: disableCommonMarkLinkReferences,
        options: {},
      },
    ];
  },
  // Do not collapse long URLs/images to "..." in the editor (md-editor-rt linkShortener).
  // Gate built-in autocomplete when the per-device preference is off.
  codeMirrorExtensions(extensions) {
    const next = (extensions || []).filter((item) => item?.type !== 'linkShortener');
    if (next.some((item) => item?.type === 'autocompleteGate')) return next;
    return [
      ...next,
      {
        type: 'autocompleteGate',
        extension: EditorView.updateListener.of((update) => {
          if (loadEditorAutocompleteEnabled()) return;
          if (completionStatus(update.state) === 'active') {
            closeCompletion(update.view);
          }
        }),
      },
    ];
  },
});

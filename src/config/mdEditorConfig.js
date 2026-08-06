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
import { headingLevelsMarkdownItPlugin } from '@/utils/markdownItHeadingLevels';
import { loadEditorAutocompleteEnabled } from '@/utils/editorAutocompleteSettings';
import '@/utils/markedHeadingLevels';
import '@/styles/md-editor-rt/chat-saved-note.css';

const PGBR_XSS_EXTENDED_WHITELIST = {
  pgbr: [],
  div: ['class', 'data-md-pgbr'],
  span: ['class', 'data-md-pgbr', 'aria-hidden'],
  h6: ['id', 'class', 'data-heading-level'],
  a: ['href', 'class', 'target', 'rel', 'data-chat-saved-note', 'data-chat-href', 'data-chat-id', 'title'],
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
  markdownItConfig(md) {
    XSSPlugin(md, {
      extendedWhiteList: PGBR_XSS_EXTENDED_WHITELIST,
    });
  },
  markdownItPlugins(plugins) {
    return [
      ...plugins,
      { type: 'heading_levels', plugin: headingLevelsMarkdownItPlugin, options: {} },
      { type: 'wiki_image', plugin: wikiImagePlugin, options: {} },
      { type: 'preview_link_target_blank', plugin: previewLinkTargetBlankPlugin, options: {} },
      { type: 'pgbr', plugin: pageBreakMarkdownItPlugin, options: {} },
      { type: 'chat_saved_note', plugin: chatSavedNotePlugin, options: {} },
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

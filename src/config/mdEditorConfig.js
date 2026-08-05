/**
 * md-editor-rt 전역 설정.
 * 앱 진입 시 main.jsx에서 로드되어, ExportPDFPage 등 MdPreview만 사용하는 페이지에서도
 * wiki image·미리보기 링크(외부만 target=_blank) 플러그인이 적용되도록 한다.
 */
import { config, XSSPlugin } from 'md-editor-rt';
import { wikiImagePlugin } from '@/utils/wikiImageMarkdownIt';
import { previewLinkTargetBlankPlugin } from '@/utils/previewLinkTargetBlankMarkdownIt';
import { pageBreakMarkdownItPlugin } from '@/utils/pageBreakMarkdownIt';
import { chatSavedNotePlugin } from '@/utils/chatSavedNoteMarkdownIt';
import '@/styles/md-editor-rt/chat-saved-note.css';

const PGBR_XSS_EXTENDED_WHITELIST = {
  pgbr: [],
  div: ['class', 'data-md-pgbr'],
  span: ['class', 'data-md-pgbr', 'aria-hidden'],
  a: ['href', 'class', 'target', 'rel', 'data-chat-saved-note', 'data-chat-href', 'data-chat-id', 'title'],
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
      { type: 'wiki_image', plugin: wikiImagePlugin, options: {} },
      { type: 'preview_link_target_blank', plugin: previewLinkTargetBlankPlugin, options: {} },
      { type: 'pgbr', plugin: pageBreakMarkdownItPlugin, options: {} },
      { type: 'chat_saved_note', plugin: chatSavedNotePlugin, options: {} },
    ];
  },
  // Do not collapse long URLs/images to "..." in the editor (md-editor-rt linkShortener).
  codeMirrorExtensions(extensions) {
    return (extensions || []).filter((item) => item?.type !== 'linkShortener');
  },
});

/**
 * md-editor-rt 전역 설정.
 * 앱 진입 시 main.jsx에서 로드되어, ExportPDFPage 등 MdPreview만 사용하는 페이지에서도
 * wiki image 플러그인이 적용되도록 한다.
 */
import { config } from 'md-editor-rt';
import { wikiImagePlugin } from '@/utils/wikiImageMarkdownIt';

config({
  markdownItPlugins(plugins) {
    return [
      ...plugins,
      { type: 'wiki_image', plugin: wikiImagePlugin, options: {} },
    ];
  },
});

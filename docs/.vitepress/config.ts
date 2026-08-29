import { defineConfig } from 'vitepress';

/** App public base, e.g. `/` or `/DocuHaim/` (GitHub Pages). */
const appBase = (process.env.VITE_BASE_PATH || '/').replace(/\/?$/, '/');
/** Docs site lives at `{appBase}docs/`. */
const base = `${appBase}docs/`;

export default defineConfig({
  title: 'Docu Haim Docs',
  description: 'Docu Haim docs — custom Markdown, Advanced Search, and interop specs',
  lang: 'ko-KR',
  base,
  outDir: '../dist/docs',
  cleanUrls: false,
  ignoreDeadLinks: [
    /^https?:\/\/localhost/,
    /\.cursor\//,
  ],
  // Same asset as the app (`public/vite.svg` → `docs/public/vite.svg`).
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}vite.svg` }],
  ],
  themeConfig: {
    nav: [
      { text: 'Custom Markdown', link: '/custom-markdown/' },
      { text: 'Advanced Search', link: '/advanced-search' },
      // Relative: VitePress prepends `base` to absolute `/...` links, so `/` becomes `/docs/`.
      { text: '앱으로', link: '../' },
    ],
    sidebar: {
      '/': [
        {
          text: '문서',
          items: [
            { text: '홈', link: '/' },
            { text: 'Advanced Search', link: '/advanced-search' },
            { text: 'Custom Markdown', link: '/custom-markdown/' },
            { text: 'Desktop', link: '/desktop/code-signing' },
            { text: 'Android sideload', link: '/desktop/android-sideload' },
          ],
        },
        {
          text: 'Desktop',
          items: [
            { text: 'Code signing', link: '/desktop/code-signing' },
            { text: 'Android sideload', link: '/desktop/android-sideload' },
          ],
        },
      ],
      '/advanced-search': [
        {
          text: 'Advanced Search',
          items: [
            { text: '개요', link: '/advanced-search' },
          ],
        },
      ],
      '/custom-markdown/': [
        {
          text: 'Custom Markdown',
          items: [
            { text: '개요', link: '/custom-markdown/' },
            { text: 'Wiki image', link: '/custom-markdown/wiki-image' },
            { text: 'Remote image', link: '/custom-markdown/remote-image' },
            { text: 'Image attrs', link: '/custom-markdown/markdown-image-attrs' },
            { text: 'Page break', link: '/custom-markdown/page-break' },
            { text: 'Heading levels', link: '/custom-markdown/heading-levels' },
            { text: 'Chat file', link: '/custom-markdown/chat-file' },
            { text: 'Chat note', link: '/custom-markdown/chat-note' },
            { text: 'Chat folder', link: '/custom-markdown/chat-folder' },
            { text: 'Chat day-file comments', link: '/custom-markdown/chat-day-file-comments' },
            { text: 'Encrypted markdown (.enc.md)', link: '/custom-markdown/enc-md' },
            { text: 'Chat saved note', link: '/custom-markdown/chat-saved-note' },
            { text: 'Note cover', link: '/custom-markdown/note-cover' },
            { text: 'Haim table', link: '/custom-markdown/haim-table' },
            { text: 'Plan frontmatter', link: '/custom-markdown/plan-frontmatter' },
            { text: 'Footnotes / Sources', link: '/custom-markdown/footnotes' },
            { text: 'Document settings', link: '/custom-markdown/document-settings' },
            { text: 'Preview hard break', link: '/custom-markdown/preview-hard-break' },
            { text: 'Mermaid fence size', link: '/custom-markdown/mermaid-fence-size' },
          ],
        },
      ],
    },
    search: {
      provider: 'local',
    },
    outline: {
      level: [2, 3],
    },
  },
});

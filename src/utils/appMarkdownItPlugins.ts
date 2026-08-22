import type { MarkdownIt as MarkdownItInstance } from 'markdown-it';
import { XSSPlugin } from 'md-editor-rt';
import { wikiImagePlugin } from '@/utils/wikiImageMarkdownIt';
import { previewLinkTargetBlankPlugin } from '@/utils/previewLinkTargetBlankMarkdownIt';
import { pageBreakMarkdownItPlugin } from '@/utils/pageBreakMarkdownIt';
import { chatSavedNotePlugin } from '@/utils/chatSavedNoteMarkdownIt';
import { noteCoverPlaceholderMarkdownItPlugin } from '@/utils/noteCoverPlaceholderMarkdownIt';
import { headingLevelsMarkdownItPlugin } from '@/utils/markdownItHeadingLevels';
import { haimTableMarkdownItPlugin } from '@/utils/haimTable/markdownItPlugin';
import { planFrontmatterMarkdownItPlugin } from '@/utils/planFrontmatter/markdownItPlugin';
import { footnoteMarkdownItPlugin } from '@/utils/footnoteMarkdownIt';
import { markdownItTaskListPlugin } from '@/utils/markdownItTaskListPlugin';
import { betterMdMarkdownItPlugin } from '@/utils/betterMd/markdownItPlugin';

type MarkdownItPlugin = (md: MarkdownItInstance, options?: Record<string, unknown>) => void;

export type AppMarkdownItPluginEntry = {
  type: string;
  plugin: MarkdownItPlugin;
  options: Record<string, unknown>;
};

/** XSS whitelist shared by md-editor-rt preview and Export PDF. */
export const APP_MARKDOWN_IT_XSS_EXTENDED_WHITELIST = {
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
  b: [],
  section: ['class'],
  hr: ['class'],
  ol: ['class'],
  table: [
    'style',
    'class',
    'colspan',
    'rowspan',
    'align',
    'valign',
    'width',
    'height',
    'data-haim-table',
    'data-haim-r',
    'data-haim-c',
    'data-haim-section',
    'data-haim-width',
    'data-haim-align',
    'data-haim-box-w',
    'data-haim-box-h',
  ],
  thead: [
    'style',
    'class',
    'colspan',
    'rowspan',
    'align',
    'valign',
    'width',
    'height',
    'data-haim-table',
    'data-haim-r',
    'data-haim-c',
    'data-haim-section',
    'data-haim-width',
    'data-haim-align',
    'data-haim-box-w',
    'data-haim-box-h',
  ],
  tbody: [
    'style',
    'class',
    'colspan',
    'rowspan',
    'align',
    'valign',
    'width',
    'height',
    'data-haim-table',
    'data-haim-r',
    'data-haim-c',
    'data-haim-section',
    'data-haim-width',
    'data-haim-align',
    'data-haim-box-w',
    'data-haim-box-h',
  ],
  tfoot: [
    'style',
    'class',
    'colspan',
    'rowspan',
    'align',
    'valign',
    'width',
    'height',
    'data-haim-table',
    'data-haim-r',
    'data-haim-c',
    'data-haim-section',
    'data-haim-width',
    'data-haim-align',
    'data-haim-box-w',
    'data-haim-box-h',
  ],
  tr: ['class', 'style'],
  th: [
    'style',
    'class',
    'colspan',
    'rowspan',
    'align',
    'valign',
    'width',
    'height',
    'data-haim-table',
    'data-haim-r',
    'data-haim-c',
    'data-haim-section',
    'data-haim-width',
    'data-haim-align',
    'data-haim-box-w',
    'data-haim-box-h',
  ],
  td: [
    'style',
    'class',
    'colspan',
    'rowspan',
    'align',
    'valign',
    'width',
    'height',
    'data-haim-table',
    'data-haim-r',
    'data-haim-c',
    'data-haim-section',
    'data-haim-width',
    'data-haim-align',
    'data-haim-box-w',
    'data-haim-box-h',
  ],
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
  input: ['type', 'checked', 'disabled', 'class', 'id'],
  label: ['class', 'for'],
};

const APP_MARKDOWN_IT_PLUGIN_DEFS: AppMarkdownItPluginEntry[] = [
  { type: 'better_md', plugin: betterMdMarkdownItPlugin as unknown as MarkdownItPlugin, options: {} },
  { type: 'heading_levels', plugin: headingLevelsMarkdownItPlugin as unknown as MarkdownItPlugin, options: {} },
  { type: 'wiki_image', plugin: wikiImagePlugin as unknown as MarkdownItPlugin, options: {} },
  {
    type: 'preview_link_target_blank',
    plugin: previewLinkTargetBlankPlugin as unknown as MarkdownItPlugin,
    options: {},
  },
  { type: 'pgbr', plugin: pageBreakMarkdownItPlugin as unknown as MarkdownItPlugin, options: {} },
  { type: 'chat_saved_note', plugin: chatSavedNotePlugin as unknown as MarkdownItPlugin, options: {} },
  {
    type: 'note_cover_placeholder',
    plugin: noteCoverPlaceholderMarkdownItPlugin as unknown as MarkdownItPlugin,
    options: {},
  },
  { type: 'haim_table', plugin: haimTableMarkdownItPlugin as unknown as MarkdownItPlugin, options: {} },
  { type: 'plan_frontmatter', plugin: planFrontmatterMarkdownItPlugin as unknown as MarkdownItPlugin, options: {} },
];

export type ApplyAppMarkdownItConfigOptions = {
  xss?: boolean;
};

/** Match md-editor-rt preview defaults, with v15 linkify fuzzy-link parity. */
export function applyAppMarkdownItBaseOptions(md: MarkdownItInstance): void {
  md.set({
    html: true,
    breaks: true,
    linkify: true,
  });
  if (md.linkify) {
    md.linkify.set({ fuzzyLink: true });
  }
}

export function applyAppMarkdownItConfig(
  md: MarkdownItInstance,
  options: ApplyAppMarkdownItConfigOptions = {},
): void {
  applyAppMarkdownItBaseOptions(md);
  if (options.xss !== false) {
    XSSPlugin(md, {
      extendedWhiteList: APP_MARKDOWN_IT_XSS_EXTENDED_WHITELIST,
    });
  }
  footnoteMarkdownItPlugin(md as unknown as Parameters<typeof footnoteMarkdownItPlugin>[0]);
}

export function mergeAppMarkdownItPlugins(
  plugins: AppMarkdownItPluginEntry[],
): AppMarkdownItPluginEntry[] {
  let next = plugins;
  for (const def of APP_MARKDOWN_IT_PLUGIN_DEFS) {
    if (next.some((entry) => entry.type === def.type)) continue;
    next = [...next, def];
  }
  return next;
}

export function applyAppMarkdownItPlugins(md: MarkdownItInstance): void {
  for (const entry of APP_MARKDOWN_IT_PLUGIN_DEFS) {
    md.use(entry.plugin, entry.options);
  }
}

export function applyAppMarkdownItPluginsFromList(
  plugins: AppMarkdownItPluginEntry[],
): AppMarkdownItPluginEntry[] {
  return mergeAppMarkdownItPlugins(plugins);
}

export function applyNovelMarkdownItPlugins(md: MarkdownItInstance): void {
  headingLevelsMarkdownItPlugin(md);
  wikiImagePlugin(md as unknown as Parameters<typeof wikiImagePlugin>[0]);
  markdownItTaskListPlugin(md as unknown as Parameters<typeof markdownItTaskListPlugin>[0], {
    enabled: true,
  });
}

export function applySearchMarkdownItPlugins(md: MarkdownItInstance): void {
  headingLevelsMarkdownItPlugin(md);
}

export function applyPrintHeadingMarkdownItPlugins(md: MarkdownItInstance): void {
  headingLevelsMarkdownItPlugin(md);
  planFrontmatterMarkdownItPlugin(md);
}

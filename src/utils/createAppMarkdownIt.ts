import MarkdownIt from 'markdown-it';
import type { MarkdownIt as MarkdownItInstance } from 'markdown-it';
import {
  applyAppMarkdownItConfig,
  applyAppMarkdownItPlugins,
  applyNovelMarkdownItPlugins,
  applyPrintHeadingMarkdownItPlugins,
  applySearchMarkdownItPlugins,
} from '@/utils/appMarkdownItPlugins';

export type AppMarkdownItPreset =
  | 'preview'
  | 'novel'
  | 'search'
  | 'print-heading';

export type CreateAppMarkdownItOptions = {
  preset?: AppMarkdownItPreset;
};

let previewMarkdownIt: MarkdownItInstance | null = null;
let novelMarkdownIt: MarkdownItInstance | null = null;
let searchMarkdownIt: MarkdownItInstance | null = null;
let printHeadingMarkdownIt: MarkdownItInstance | null = null;

function buildMarkdownIt(preset: AppMarkdownItPreset): MarkdownItInstance {
  const md = new MarkdownIt();

  switch (preset) {
    case 'preview': {
      applyAppMarkdownItConfig(md);
      applyAppMarkdownItPlugins(md);
      return md;
    }
    case 'novel': {
      md.set({ html: true, breaks: true, linkify: false });
      applyNovelMarkdownItPlugins(md);
      return md;
    }
    case 'search': {
      md.set({ html: false, breaks: true, linkify: true });
      if (md.linkify) {
        md.linkify.set({ fuzzyLink: true });
      }
      applySearchMarkdownItPlugins(md);
      return md;
    }
    case 'print-heading': {
      md.set({ html: true, linkify: false });
      applyPrintHeadingMarkdownItPlugins(md);
      return md;
    }
    default: {
      const _exhaustive: never = preset;
      return _exhaustive;
    }
  }
}

export function createAppMarkdownIt(
  options: CreateAppMarkdownItOptions = {},
): MarkdownItInstance {
  const preset = options.preset ?? 'preview';
  return buildMarkdownIt(preset);
}

export function getAppMarkdownIt(preset: AppMarkdownItPreset = 'preview'): MarkdownItInstance {
  switch (preset) {
    case 'preview':
      previewMarkdownIt ??= buildMarkdownIt('preview');
      return previewMarkdownIt;
    case 'novel':
      novelMarkdownIt ??= buildMarkdownIt('novel');
      return novelMarkdownIt;
    case 'search':
      searchMarkdownIt ??= buildMarkdownIt('search');
      return searchMarkdownIt;
    case 'print-heading':
      printHeadingMarkdownIt ??= buildMarkdownIt('print-heading');
      return printHeadingMarkdownIt;
    default: {
      const _exhaustive: never = preset;
      return _exhaustive;
    }
  }
}

export function renderAppMarkdown(
  source: string,
  preset: AppMarkdownItPreset = 'preview',
  env: Record<string, unknown> = {},
): string {
  const md = getAppMarkdownIt(preset);
  const src = String(source ?? '');
  const renderEnv = {
    ...env,
    srcLines: Array.isArray(env.srcLines) ? env.srcLines : src.split('\n'),
  };
  return md.render(src, renderEnv);
}

/**
 * Mermaid fence → lazy placeholder for md-editor-rt.
 *
 * When `noMermaid` is set, md-editor-rt skips its mermaid fence plugin entirely,
 * so ```mermaid blocks would render as plain code. This plugin always emits
 * `div.md-editor-mermaid` placeholders for `useLazyMermaidRender`.
 *
 * Fences that embed exported Mermaid charts as `Mermaid![](data:…;base64,…)`
 * default to a collapsed source panel with a rendered image or diagram below.
 */
import type { MarkdownIt as MarkdownItInstance, Token } from 'markdown-it';
import { resolveMermaidThemeForHost } from '@/utils/mermaidTheme';
import {
  extractMermaidBase64ImageSrc,
  isMermaidBase64Fence,
  isMermaidLangToken,
  summarizeMermaidEmbedSource,
} from '@/utils/mermaidBase64Fence';

const PREFIX = 'md-editor';

type FenceEnv = {
  srcLines?: string[];
};

function isFenceClosed(token: Token, env: FenceEnv | undefined): boolean {
  if (!token.map || token.level !== 0) return true;
  const closeLine = token.map[1] - 1;
  const line = env?.srcLines?.[closeLine];
  return !!line?.trim()?.startsWith('```');
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

function buildMermaidAttrs(
  token: Token,
  fenceEnv: FenceEnv | undefined,
  theme: string,
): string {
  const attrs: string[] = [
    `class="${PREFIX}-mermaid"`,
    `data-mermaid-theme="${theme}"`,
    `data-haim-mermaid-lazy="1"`,
  ];
  if (token.map && token.level === 0) {
    attrs.push(`data-closed="${String(isFenceClosed(token, fenceEnv))}"`);
    attrs.push(`data-line="${String(token.map[0])}"`);
  }
  return attrs.join(' ');
}

function renderCollapsibleEmbed(
  md: MarkdownItInstance,
  langLabel: string,
  summary: string,
  source: string,
  renderHtml: string,
): string {
  const escapedSource = md.utils.escapeHtml(source);
  const escapedSummary = md.utils.escapeHtml(summary);
  return (
    `<div class="haim-mermaid-embed" data-haim-mermaid-embed="1">` +
    `<details class="md-editor-code haim-mermaid-embed-source">` +
    `<summary class="md-editor-code-head">` +
    `<span class="md-editor-code-lang">${md.utils.escapeHtml(langLabel)}</span>` +
    `<span class="haim-mermaid-embed-summary">${escapedSummary}</span>` +
    `</summary>` +
    `<pre class="haim-mermaid-embed-pre"><code>${escapedSource}</code></pre>` +
    `</details>` +
    `<div class="haim-mermaid-embed-render">${renderHtml}</div>` +
    `</div>`
  );
}

export function mermaidFenceMarkdownItPlugin(md: MarkdownItInstance): void {
  const defaultFence = md.renderer.rules.fence;

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    if (!token) {
      return defaultFence
        ? defaultFence(tokens, idx, options, env, self)
        : self.renderToken(tokens, idx, options);
    }

    const info = token.info.trim();
    const lang = info.split(/\s+/)[0] ?? '';
    const source = token.content;
    const trimmed = source.trim();
    const isMermaidLang = isMermaidLangToken(lang);
    const isBase64Embed = isMermaidBase64Fence(lang, trimmed);

    if (!isMermaidLang && !isBase64Embed) {
      return defaultFence
        ? defaultFence(tokens, idx, options, env, self)
        : self.renderToken(tokens, idx, options);
    }

    const fenceEnv = env as FenceEnv;
    const theme = resolveMermaidThemeForHost();
    const imageSrc = extractMermaidBase64ImageSrc(trimmed);
    const langLabel = isMermaidLang ? 'mermaid' : 'Mermaid';
    const summary = summarizeMermaidEmbedSource(trimmed);

    if (imageSrc) {
      const renderHtml =
        `<p class="${PREFIX}-mermaid haim-mermaid-image-embed" data-processed="" data-haim-mermaid-image="1">` +
        `<img src="${escapeAttr(imageSrc)}" alt="Mermaid" class="haim-mermaid-embed-img" />` +
        `</p>`;
      return renderCollapsibleEmbed(md, langLabel, summary, trimmed, renderHtml);
    }

    if (isBase64Embed) {
      const mermaidAttrs = buildMermaidAttrs(token, fenceEnv, theme);
      const renderHtml = `<div ${mermaidAttrs}></div>`;
      return renderCollapsibleEmbed(md, langLabel, summary, trimmed, renderHtml);
    }

    token.attrSet('class', `${PREFIX}-mermaid`);
    token.attrSet('data-mermaid-theme', theme);
    token.attrSet('data-haim-mermaid-lazy', '1');
    if (token.map && token.level === 0) {
      token.attrSet('data-closed', String(isFenceClosed(token, fenceEnv)));
      token.attrSet('data-line', String(token.map[0]));
    }

    return `<div ${self.renderAttrs(token)}>${md.utils.escapeHtml(trimmed)}</div>`;
  };
}

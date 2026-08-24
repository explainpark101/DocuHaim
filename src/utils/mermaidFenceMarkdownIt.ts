/**
 * Mermaid fence → lazy placeholder for md-editor-rt.
 *
 * When `noMermaid` is set, md-editor-rt skips its mermaid fence plugin entirely,
 * so ```mermaid blocks would render as plain code. This plugin always emits
 * `div.md-editor-mermaid` placeholders for `useLazyMermaidRender`.
 */
import type { MarkdownIt as MarkdownItInstance, Token } from 'markdown-it';

const PREFIX = 'md-editor';

type FenceEnv = {
  srcLines?: string[];
};

function resolveMermaidTheme(): 'dark' | 'default' {
  if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')) {
    return 'dark';
  }
  return 'default';
}

function isFenceClosed(token: Token, env: FenceEnv | undefined): boolean {
  if (!token.map || token.level !== 0) return true;
  const closeLine = token.map[1] - 1;
  const line = env?.srcLines?.[closeLine];
  return !!line?.trim()?.startsWith('```');
}

export function mermaidFenceMarkdownItPlugin(md: MarkdownItInstance): void {
  const defaultFence = md.renderer.rules.fence;

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    if (!token || token.info.trim().split(/\s+/)[0] !== 'mermaid') {
      return defaultFence
        ? defaultFence(tokens, idx, options, env, self)
        : self.renderToken(tokens, idx, options);
    }

    const source = token.content.trim();
    const fenceEnv = env as FenceEnv;
    token.attrSet('class', `${PREFIX}-mermaid`);
    token.attrSet('data-mermaid-theme', resolveMermaidTheme());
    token.attrSet('data-haim-mermaid-lazy', '1');
    if (token.map && token.level === 0) {
      token.attrSet('data-closed', String(isFenceClosed(token, fenceEnv)));
      token.attrSet('data-line', String(token.map[0]));
    }

    return `<div ${self.renderAttrs(token)}>${md.utils.escapeHtml(source)}</div>`;
  };
}

import { shouldOpenPreviewLinkInNewTab } from '@/utils/appHref';

type MarkdownItLike = {
  renderer: {
    rules: Record<
      string,
      | ((
          tokens: Array<{ attrGet: (name: string) => string | null; attrSet: (name: string, value: string) => void }>,
          idx: number,
          options: unknown,
          env: unknown,
          self: { renderToken: (tokens: unknown, idx: number, options: unknown) => string },
        ) => string)
      | undefined
    >;
  };
};

/**
 * Preview links: open cross-origin http(s) in a new tab.
 * Same-origin / relative / in-document anchors stay in-app (no target=_blank).
 */
export function previewLinkTargetBlankPlugin(md: MarkdownItLike) {
  const defaultRender =
    md.renderer.rules.link_open ||
    function render(tokens, idx, options, _env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.link_open = function linkOpen(tokens, idx, options, env, self) {
    const token = tokens[idx];
    if (!token) return defaultRender(tokens, idx, options, env, self);
    const href = token.attrGet('href') || '';
    const isChatSavedNote = token.attrGet('data-chat-saved-note') === '1';
    if (!isChatSavedNote && shouldOpenPreviewLinkInNewTab(href)) {
      token.attrSet('target', '_blank');
      token.attrSet('rel', 'noopener noreferrer');
    }
    return defaultRender(tokens, idx, options, env, self);
  };
}

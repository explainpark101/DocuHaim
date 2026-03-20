/**
 * markdown-it 플러그인: 미리보기에서 외부·절대 링크를 새 탭으로 엽니다.
 * 동일 문서 내 앵커(#heading)는 페이지 내 이동을 유지합니다.
 *
 * @param {import('markdown-it')} md
 */
export function previewLinkTargetBlankPlugin(md) {
  const defaultRender =
    md.renderer.rules.link_open ||
    function render(tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.link_open = function linkOpen(tokens, idx, options, env, self) {
    const token = tokens[idx];
    const href = token.attrGet('href') || '';
    if (!href.startsWith('#')) {
      token.attrSet('target', '_blank');
      token.attrSet('rel', 'noopener noreferrer');
    }
    return defaultRender(tokens, idx, options, env, self);
  };
}

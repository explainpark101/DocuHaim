/**
 * markdown-it 플러그인: ![[path]] 를 data-wiki-path 를 가진 img 로 변환.
 * Preview Hydration 단계에서 src 에 Pre-signed URL 이 채워짐.
 * src 에는 1x1 투명 placeholder 를 넣어 두어, sanitizer/빈 img 제거를 피함.
 *
 * @param {import('markdown-it')} md
 */
const DEBUG_WIKI_IMAGE_PLUGIN = true;
const PLACEHOLDER_SRC = 'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=';

export function wikiImagePlugin(md) {
  const WIKI_IMAGE_RE = /!\[\[([^[\]]+)\]\]/g;

  md.core.ruler.push('wiki-image', (state) => {
    let replaced = 0;
    const hasWikiLink = state.src && /!\[\[/.test(state.src);
    if (DEBUG_WIKI_IMAGE_PLUGIN && hasWikiLink) {
      console.log('[wiki-image] plugin: ruler run', { tokenCount: state.tokens.length });
    }
    state.tokens.forEach((blockToken) => {
      if (blockToken.type !== 'inline' || !blockToken.children) return;

      const children = [];

      blockToken.children.forEach((token) => {
        if (token.type !== 'text') {
          children.push(token);
          return;
        }

        const text = token.content;
        let lastIndex = 0;
        WIKI_IMAGE_RE.lastIndex = 0;
        let match;

        while ((match = WIKI_IMAGE_RE.exec(text)) !== null) {
          if (match.index > lastIndex) {
            const t = new state.Token('text', '', 0);
            t.content = text.slice(lastIndex, match.index);
            children.push(t);
          }

          const path = match[1].trim();
          const imgToken = new state.Token('wiki_image', 'img', 0);
          imgToken.attrSet('data-wiki-path', path);
          imgToken.attrSet('src', PLACEHOLDER_SRC);
          imgToken.attrSet('alt', '');
          children.push(imgToken);

          lastIndex = match.index + match[0].length;
        }

        if (lastIndex < text.length) {
          const t = new state.Token('text', '', 0);
          t.content = text.slice(lastIndex);
          children.push(t);
        }
      });

      if (children.length !== blockToken.children.length) replaced += 1;
      blockToken.children = children;
    });
    if (DEBUG_WIKI_IMAGE_PLUGIN && replaced > 0) {
      console.log('[wiki-image] plugin: replaced inline blocks', { replaced });
    }
  });

  md.renderer.rules.wiki_image = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    return '<img ' + self.renderAttrs(token) + '>';
  };
}

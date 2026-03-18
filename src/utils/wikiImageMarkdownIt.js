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

  // 이미지 바로 아랫줄 텍스트를 캡션으로 묶는 토큰 변환
  // 패턴:
  // paragraph_open
  //   inline (children: wiki_image)
  // paragraph_close
  // paragraph_open
  //   inline (children: text/softbreak ...)
  // paragraph_close
  //
  // 위 6개 토큰을 하나의 figure 블록으로 변환한다.
  md.core.ruler.after('wiki-image', 'wiki-image-caption', (state) => {
    const tokens = state.tokens;
    if (!tokens || tokens.length < 6) return;

    const newTokens = [];

    for (let i = 0; i < tokens.length; i += 1) {
      const t0 = tokens[i];
      const t1 = tokens[i + 1];
      const t2 = tokens[i + 2];
      const t3 = tokens[i + 3];
      const t4 = tokens[i + 4];
      const t5 = tokens[i + 5];

      const canTransform =
        t0 &&
        t1 &&
        t2 &&
        t3 &&
        t4 &&
        t5 &&
        t0.type === 'paragraph_open' &&
        t1.type === 'inline' &&
        t2.type === 'paragraph_close' &&
        t3.type === 'paragraph_open' &&
        t4.type === 'inline' &&
        t5.type === 'paragraph_close';

      if (!canTransform) {
        newTokens.push(t0);
        continue;
      }

      const imageChildren = t1.children || [];
      if (
        imageChildren.length !== 1 ||
        imageChildren[0].type !== 'wiki_image'
      ) {
        newTokens.push(t0);
        continue;
      }

      const captionTokens = t4.children || [];
      const captionText = captionTokens
        .filter((ct) => ct.type === 'text' && ct.content && ct.content.trim())
        .map((ct) => ct.content)
        .join('')
        .trim();

      if (!captionText) {
        newTokens.push(t0);
        continue;
      }

      // figure_open
      const figureOpen = new state.Token('figure_open', 'figure', 1);
      figureOpen.block = true;
      figureOpen.map = t0.map ? [...t0.map] : null;

      // 이미지 inline (그대로 재사용)
      const imageInline = new state.Token('inline', '', 0);
      imageInline.children = imageChildren;
      imageInline.level = (t0.level || 0) + 1;

      // figcaption_open
      const figcaptionOpen = new state.Token(
        'figcaption_open',
        'figcaption',
        1,
      );
      figcaptionOpen.block = true;
      figcaptionOpen.level = (t0.level || 0) + 1;

      // figcaption 내용
      const figcaptionInline = new state.Token('inline', '', 0);
      const captionTextToken = new state.Token('text', '', 0);
      captionTextToken.content = captionText;
      figcaptionInline.children = [captionTextToken];
      figcaptionInline.level = (t0.level || 0) + 2;

      // figcaption_close
      const figcaptionClose = new state.Token(
        'figcaption_close',
        'figcaption',
        -1,
      );
      figcaptionClose.block = true;
      figcaptionClose.level = (t0.level || 0) + 1;

      // figure_close
      const figureClose = new state.Token('figure_close', 'figure', -1);
      figureClose.block = true;
      figureClose.level = t0.level || 0;

      newTokens.push(
        figureOpen,
        imageInline,
        figcaptionOpen,
        figcaptionInline,
        figcaptionClose,
        figureClose,
      );

      i += 5;
    }

    if (newTokens.length && newTokens.length !== tokens.length) {
      if (DEBUG_WIKI_IMAGE_PLUGIN) {
        console.log('[wiki-image] caption plugin: transformed tokens', {
          before: tokens.length,
          after: newTokens.length,
        });
      }
      state.tokens = newTokens;
    }
  });

  md.renderer.rules.wiki_image = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    return '<img ' + self.renderAttrs(token) + '>';
  };
}

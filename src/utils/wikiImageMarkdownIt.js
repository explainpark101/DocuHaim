import {
  buildWikiImageStyle,
  parseMarkdownImageAttrsBlock,
  parseWikiImageInner,
} from '@/utils/wikiImageSyntax';
import { decodeMarkdownImageSrc, isStorageImageSrc } from '@/utils/storageImagePath';
import { peekResolvedWikiImageUrl } from '@/utils/wikiImageResolver';

const DEBUG_WIKI_IMAGE_PLUGIN = false;
const PLACEHOLDER_SRC = 'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=';

/** Prefer a stable remembered http(s) URL so rebuilds skip the placeholder flash.
 * blob: URLs stay out of markdown HTML — XSS filters often strip them; hydration
 * applies those synchronously after the DOM updates.
 */
function srcForStoragePath(path) {
  const url = peekResolvedWikiImageUrl(path);
  if (!url) return PLACEHOLDER_SRC;
  if (url.startsWith('blob:') || url.startsWith('data:')) return PLACEHOLDER_SRC;
  return url;
}

/**
 * markdown-it 플러그인: ![[path]] / ![[path|size]] / ![[path|bg=#hex]] 를 data-wiki-path 를 가진 img 로 변환.
 * Preview Hydration 단계에서 src 에 Pre-signed URL 이 채워짐.
 * src 에는 1x1 투명 placeholder 를 넣어 두어, sanitizer/빈 img 제거를 피함.
 *
 * @param {import('markdown-it')} md
 */
export function wikiImagePlugin(md) {
  // ![[path]] 또는 ![[path|size]] 형식 지원
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

          const parsed = parseWikiImageInner(match[1]);
          const path = parsed?.path;
          if (!path) {
            const t = new state.Token('text', '', 0);
            t.content = match[0];
            children.push(t);
            lastIndex = match.index + match[0].length;
            continue;
          }
          const imgToken = new state.Token('wiki_image', 'img', 0);
          imgToken.attrSet('data-wiki-path', path);
          if (parsed?.width) {
            imgToken.attrSet('data-wiki-width', parsed.width);
          }
          if (parsed?.height) {
            imgToken.attrSet('data-wiki-height', parsed.height);
          }
          if (parsed?.background) {
            imgToken.attrSet('data-wiki-bg', parsed.background);
          }
          const style = buildWikiImageStyle(parsed ?? {});
          if (style) imgToken.attrSet('style', style);
          imgToken.attrSet('src', srcForStoragePath(path));
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


  // 이미지 + softbreak/hardbreak + 캡션이 같은 단락에 있을 때 figure로 변환 (br 없이)
  // 패턴: paragraph_open / inline (wiki_image, softbreak|hardbreak, text) / paragraph_close
  md.core.ruler.after('wiki-image', 'wiki-image-caption-inline', (state) => {
    const tokens = state.tokens;
    if (!tokens || tokens.length < 3) return;

    const newTokens = [];

    for (let i = 0; i < tokens.length; i += 1) {
      const t0 = tokens[i];
      const t1 = tokens[i + 1];
      const t2 = tokens[i + 2];

      if (!t0 || !t1 || !t2) {
        newTokens.push(t0);
        continue;
      }

      if (
        t0.type !== 'paragraph_open' ||
        t1.type !== 'inline' ||
        t2.type !== 'paragraph_close'
      ) {
        newTokens.push(t0);
        continue;
      }

      const children = t1.children || [];
      if (children.length < 3) {
        newTokens.push(t0);
        continue;
      }

      const first = children[0];
      const second = children[1];
      const isBreak =
        second && (second.type === 'softbreak' || second.type === 'hardbreak');
      if (first?.type !== 'wiki_image' || !isBreak) {
        newTokens.push(t0);
        continue;
      }

      const allCaptionTokens = children.slice(2);
      
      // 캡션이 비어있지 않은지 확인 (text 타입 토큰이 있고, content가 있는지)
      const hasContent = allCaptionTokens.some(
        (ct) => ct.type === 'text' && ct.content && ct.content.trim(),
      );
      if (!hasContent) {
        newTokens.push(t0);
        continue;
      }

      const figureOpen = new state.Token('figure_open', 'figure', 1);
      figureOpen.block = true;
      figureOpen.map = t0.map ? [...t0.map] : null;

      const imageInline = new state.Token('inline', '', 0);
      imageInline.children = [first];
      imageInline.level = (t0.level || 0) + 1;

      const figcaptionOpen = new state.Token(
        'figcaption_open',
        'figcaption',
        1,
      );
      figcaptionOpen.block = true;
      figcaptionOpen.level = (t0.level || 0) + 1;

      const figcaptionInline = new state.Token('inline', '', 0);
      // 이미 파싱된 마크다운 토큰들을 그대로 사용 (bold, strong, code 등 포함)
      figcaptionInline.children = allCaptionTokens;
      figcaptionInline.level = (t0.level || 0) + 2;

      const figcaptionClose = new state.Token(
        'figcaption_close',
        'figcaption',
        -1,
      );
      figcaptionClose.block = true;
      figcaptionClose.level = (t0.level || 0) + 1;

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

      i += 2;
    }

    if (newTokens.length && newTokens.length !== tokens.length) {
      if (DEBUG_WIKI_IMAGE_PLUGIN) {
        console.log('[wiki-image] caption-inline plugin: transformed tokens', {
          before: tokens.length,
          after: newTokens.length,
        });
      }
      state.tokens = newTokens;
    }
  });

  // 이미지 바로 아랫줄 텍스트를 캡션으로 묶는 토큰 변환 (두 단락인 경우)
  // 패턴:
  // paragraph_open
  //   inline (children: wiki_image)
  // paragraph_close
  // paragraph_open
  //   inline (children: text/softbreak ...)
  // paragraph_close
  //
  // 위 6개 토큰을 하나의 figure 블록으로 변환한다.
  md.core.ruler.after('wiki-image-caption-inline', 'wiki-image-caption', (state) => {
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

      const allCaptionTokens = t4.children || [];
      
      // 캡션이 비어있지 않은지 확인
      const hasContent = allCaptionTokens.some(
        (ct) => ct.type === 'text' && ct.content && ct.content.trim(),
      );
      if (!hasContent) {
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

      // figcaption 내용 - 이미 파싱된 마크다운 토큰들을 그대로 사용
      const figcaptionInline = new state.Token('inline', '', 0);
      figcaptionInline.children = allCaptionTokens;
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

  md.core.ruler.after('wiki-image-caption', 'markdown-image-size-attrs', (state) => {
    state.tokens.forEach((blockToken) => {
      if (blockToken.type !== 'inline' || !blockToken.children?.length) return;
      const nextChildren = [];
      const children = blockToken.children;
      for (let i = 0; i < children.length; i += 1) {
        const token = children[i];
        if (token.type !== 'image') {
          nextChildren.push(token);
          continue;
        }

        const src = token.attrGet('src');
        if (src) token.attrSet('data-md-src', src);
        if (src && isStorageImageSrc(decodeMarkdownImageSrc(src))) {
          const decoded = decodeMarkdownImageSrc(src);
          token.attrSet('src', srcForStoragePath(decoded));
          token.attrSet('data-storage-image', '1');
        }

        const nextToken = children[i + 1];
        if (nextToken?.type === 'text') {
          const raw = nextToken.content || '';
          const attrMatch = raw.match(/^\{([^}\n]+)\}/);
          if (attrMatch) {
            const parsed = parseMarkdownImageAttrsBlock(`{${attrMatch[1]}}`);
            if (parsed.width) token.attrSet('data-md-width', parsed.width);
            if (parsed.height) token.attrSet('data-md-height', parsed.height);
            if (parsed.background) token.attrSet('data-md-bg', parsed.background);
            const style = buildWikiImageStyle(parsed);
            if (style) token.attrSet('style', style);

            const remain = raw.slice(attrMatch[0].length);
            if (remain) {
              const t = new state.Token('text', '', 0);
              t.content = remain;
              nextChildren.push(token, t);
            } else {
              nextChildren.push(token);
            }
            i += 1;
            continue;
          }
        }

        nextChildren.push(token);
      }
      blockToken.children = nextChildren;
    });
  });

  md.renderer.rules.wiki_image = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    return '<img ' + self.renderAttrs(token) + '>';
  };
}

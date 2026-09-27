import type {
  MarkdownIt as MarkdownItInstance,
  StateCore,
  Token,
} from 'markdown-it';
import {
  buildWikiImageStyle,
  parseMarkdownImageAttrsBlock,
  parseWikiImageInner,
} from '@/utils/wikiImageSyntax';
import { decodeMarkdownImageSrc, isStorageImageSrc } from '@/utils/storageImagePath';
import { peekResolvedWikiImageUrl } from '@/utils/wikiImageResolver';

const DEBUG_WIKI_IMAGE_PLUGIN = false;
const PLACEHOLDER_SRC =
  'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=';

/** Prefer a stable remembered http(s) URL so rebuilds skip the placeholder flash.
 * blob: URLs stay out of markdown HTML — XSS filters often strip them; hydration
 * applies those synchronously after the DOM updates.
 */
function srcForStoragePath(path: string): string {
  const url = peekResolvedWikiImageUrl(path);
  if (!url) return PLACEHOLDER_SRC;
  if (url.startsWith('blob:') || url.startsWith('data:')) return PLACEHOLDER_SRC;
  return url;
}

function copyTokenMap(map: Token['map']): [number, number] | null {
  if (!map) return null;
  return [map[0], map[1]];
}

/**
 * markdown-it plugin: `![[path]]` / `![[path|size]]` / `![[path|bg=#hex]]`
 * → `<img data-wiki-path>` (placeholder src; hydration fills the real URL).
 */
export function wikiImagePlugin(md: MarkdownItInstance): void {
  const WIKI_IMAGE_RE = /!\[\[([^[\]]+)\]\]/g;

  md.core.ruler.push('wiki-image', (state: StateCore) => {
    let replaced = 0;
    const hasWikiLink = Boolean(state.src && /!\[\[/.test(state.src));
    if (DEBUG_WIKI_IMAGE_PLUGIN && hasWikiLink) {
      console.log('[wiki-image] plugin: ruler run', {
        tokenCount: state.tokens.length,
      });
    }
    state.tokens.forEach((blockToken) => {
      if (blockToken.type !== 'inline' || !blockToken.children) return;

      const children: Token[] = [];

      blockToken.children.forEach((token) => {
        if (token.type !== 'text') {
          children.push(token);
          return;
        }

        const text = token.content;
        let lastIndex = 0;
        WIKI_IMAGE_RE.lastIndex = 0;
        let match: RegExpExecArray | null;

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

  // Image + softbreak/hardbreak + caption in the same paragraph → figure (no <br>)
  md.core.ruler.after(
    'wiki-image',
    'wiki-image-caption-inline',
    (state: StateCore) => {
      const tokens = state.tokens;
      if (!tokens || tokens.length < 3) return;

      const newTokens: Token[] = [];
      let changed = false;

      for (let i = 0; i < tokens.length; i += 1) {
        const t0 = tokens[i];
        const t1 = tokens[i + 1];
        const t2 = tokens[i + 2];

        if (!t0 || !t1 || !t2) {
          if (t0) newTokens.push(t0);
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
          second != null &&
          (second.type === 'softbreak' || second.type === 'hardbreak');
        if (!first || first.type !== 'wiki_image' || !isBreak) {
          newTokens.push(t0);
          continue;
        }

        const allCaptionTokens = children.slice(2);

        const hasContent = allCaptionTokens.some(
          (ct) => ct.type === 'text' && ct.content && ct.content.trim(),
        );
        if (!hasContent) {
          newTokens.push(t0);
          continue;
        }

        const figureOpen = new state.Token('figure_open', 'figure', 1);
        figureOpen.block = true;
        figureOpen.map = copyTokenMap(t0.map);

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
        // Keep already-parsed inline tokens (bold, strong, code, …)
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
        changed = true;

        i += 2;
      }

      // Do not gate on length: adjacent-paragraph fold is often 6→6
      if (changed) {
        if (DEBUG_WIKI_IMAGE_PLUGIN) {
          console.log('[wiki-image] caption-inline plugin: transformed tokens', {
            before: tokens.length,
            after: newTokens.length,
          });
        }
        state.tokens = newTokens;
      }
    },
  );

  // Adjacent paragraphs: image-only paragraph + caption paragraph → figure
  md.core.ruler.after(
    'wiki-image-caption-inline',
    'wiki-image-caption',
    (state: StateCore) => {
      const tokens = state.tokens;
      if (!tokens || tokens.length < 6) return;

      const newTokens: Token[] = [];
      let changed = false;

      for (let i = 0; i < tokens.length; i += 1) {
        const t0 = tokens[i];
        const t1 = tokens[i + 1];
        const t2 = tokens[i + 2];
        const t3 = tokens[i + 3];
        const t4 = tokens[i + 4];
        const t5 = tokens[i + 5];

        const canTransform =
          t0 != null &&
          t1 != null &&
          t2 != null &&
          t3 != null &&
          t4 != null &&
          t5 != null &&
          t0.type === 'paragraph_open' &&
          t1.type === 'inline' &&
          t2.type === 'paragraph_close' &&
          t3.type === 'paragraph_open' &&
          t4.type === 'inline' &&
          t5.type === 'paragraph_close';

        if (!canTransform || !t0 || !t1 || !t4) {
          if (t0) newTokens.push(t0);
          continue;
        }

        const imageChildren = t1.children || [];
        const imageOnly = imageChildren[0];
        if (
          imageChildren.length !== 1 ||
          !imageOnly ||
          imageOnly.type !== 'wiki_image'
        ) {
          newTokens.push(t0);
          continue;
        }

        const allCaptionTokens = t4.children || [];

        const hasContent = allCaptionTokens.some(
          (ct) => ct.type === 'text' && ct.content && ct.content.trim(),
        );
        if (!hasContent) {
          newTokens.push(t0);
          continue;
        }

        const figureOpen = new state.Token('figure_open', 'figure', 1);
        figureOpen.block = true;
        figureOpen.map = copyTokenMap(t0.map);

        const imageInline = new state.Token('inline', '', 0);
        imageInline.children = imageChildren;
        imageInline.level = (t0.level || 0) + 1;

        const figcaptionOpen = new state.Token(
          'figcaption_open',
          'figcaption',
          1,
        );
        figcaptionOpen.block = true;
        figcaptionOpen.level = (t0.level || 0) + 1;

        const figcaptionInline = new state.Token('inline', '', 0);
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
        changed = true;

        i += 5;
      }

      // Adjacent-paragraph fold is 6→6; compare by `changed`, not length
      if (changed) {
        if (DEBUG_WIKI_IMAGE_PLUGIN) {
          console.log('[wiki-image] caption plugin: transformed tokens', {
            before: tokens.length,
            after: newTokens.length,
          });
        }
        state.tokens = newTokens;
      }
    },
  );

  md.core.ruler.after(
    'wiki-image-caption',
    'markdown-image-size-attrs',
    (state: StateCore) => {
      state.tokens.forEach((blockToken) => {
        if (blockToken.type !== 'inline' || !blockToken.children?.length) return;
        const nextChildren: Token[] = [];
        const children = blockToken.children;
        for (let i = 0; i < children.length; i += 1) {
          const token = children[i];
          if (!token) continue;
          if (token.type !== 'image') {
            nextChildren.push(token);
            continue;
          }

          const srcRaw = token.attrGet('src');
          const src = srcRaw == null ? null : String(srcRaw);
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
              if (parsed.background) {
                token.attrSet('data-md-bg', parsed.background);
              }
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
    },
  );

  md.renderer.rules.wiki_image = (tokens, idx, _options, _env, self) => {
    const token = tokens[idx];
    if (!token) return '';
    return `<img ${self.renderAttrs(token)}>`;
  };
}

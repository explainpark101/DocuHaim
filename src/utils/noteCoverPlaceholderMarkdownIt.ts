/**
 * Preview placeholder for `<!-- note-cover ... -->` HTML comments.
 * Source keeps the comment; preview shows a clickable "표지" box.
 */

const NOTE_COVER_COMMENT_RE = /<!--\s*note-cover\b[\s\S]*?-->/i;

export function isNoteCoverHtmlBlockContent(content: string): boolean {
  return NOTE_COVER_COMMENT_RE.test(String(content ?? ''));
}

export function buildNoteCoverPlaceholderHtml(): string {
  return [
    '<div class="md-note-cover-placeholder" data-note-cover-placeholder="1" role="button" tabindex="0">',
    '<span class="md-note-cover-placeholder__label">표지</span>',
    '</div>',
  ].join('');
}

type MdToken = {
  type: string;
  content: string;
  block?: boolean;
};

type MdState = {
  tokens: MdToken[];
  Token: new (type: string, tag: string, nesting: number) => MdToken;
};

type MarkdownItLike = {
  core: {
    ruler: {
      push: (name: string, fn: (state: MdState) => boolean) => void;
    };
  };
};

/**
 * Replace note-cover HTML comment blocks with a preview-only placeholder card.
 */
export function noteCoverPlaceholderMarkdownItPlugin(md: MarkdownItLike): void {
  md.core.ruler.push('note-cover-placeholder', (state) => {
    const { tokens } = state;
    if (!tokens?.length) return true;

    state.tokens = tokens.map((token) => {
      if (
        (token.type === 'html_block' || token.type === 'html_inline')
        && isNoteCoverHtmlBlockContent(token.content)
      ) {
        const next = new state.Token('html_block', '', 0);
        next.content = buildNoteCoverPlaceholderHtml();
        next.block = true;
        return next;
      }
      return token;
    });
    return true;
  });
}

/**
 * Preview host for `<!-- note-cover ... -->` HTML comments.
 * Must run before md-editor-rt XSS (which strips HTML comments).
 * Source keeps the comment; preview mounts CoverSlide into the host.
 */

const NOTE_COVER_COMMENT_RE = /<!--\s*note-cover\b[\s\S]*?-->/i;

export function isNoteCoverHtmlBlockContent(content: string): boolean {
  return NOTE_COVER_COMMENT_RE.test(String(content ?? ''));
}

export function buildNoteCoverPlaceholderHtml(): string {
  return [
    '<div class="md-note-cover-placeholder" data-note-cover-placeholder="1" role="button" tabindex="0">',
    '<div class="md-note-cover-placeholder__mount" data-note-cover-mount="1"></div>',
    '<span class="md-note-cover-placeholder__fallback">표지</span>',
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
      before: (
        beforeName: string,
        name: string,
        fn: (state: MdState) => boolean | void,
      ) => void;
      push: (name: string, fn: (state: MdState) => boolean | void) => void;
    };
  };
};

function replaceNoteCoverHtmlTokens(state: MdState): boolean {
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
}

/**
 * Replace note-cover HTML comment blocks with a preview mount host.
 * Registers before `xss` so the comment is not stripped first.
 */
export function noteCoverPlaceholderMarkdownItPlugin(md: MarkdownItLike): void {
  try {
    md.core.ruler.before('xss', 'note-cover-placeholder', replaceNoteCoverHtmlTokens);
  } catch {
    // XSS plugin not registered yet (e.g. unit tests) — append instead.
    md.core.ruler.push('note-cover-placeholder', replaceNoteCoverHtmlTokens);
  }
}

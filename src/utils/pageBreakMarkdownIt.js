/**
 * Markdown `<pgbr/>`: preview shows an HR-like rule; in print, invisible page break only.
 *
 * @param {import('markdown-it')} md
 */
const PGBR_IN_TEXT_RE = /<pgbr\s*\/?\s*>/gi;

function isPgbrHtmlInline(content) {
  return /^<pgbr\s*\/?\s*>$/i.test(String(content ?? '').trim());
}

function isPgbrHtmlBlockContent(content) {
  return /^<pgbr\s*\/?\s*>$/i.test(String(content ?? '').trim());
}

function createPgbrHtmlInlineToken(state) {
  const t = new state.Token('html_inline', '', 0);
  t.content = '<span class="md-pgbr" data-md-pgbr="1"></span>';
  return t;
}

const PGBR_SPAN_MARKUP = /<span class="md-pgbr"/;

function countPgbrInInline(inlineToken) {
  let n = 0;
  for (const t of inlineToken.children || []) {
    if (t.type === 'html_inline' && (PGBR_SPAN_MARKUP.test(t.content) || isPgbrHtmlInline(t.content))) {
      n += 1;
    }
  }
  return n;
}

/** Inline pgbr inside `<p>` does not paginate; unwrap pgbr-only paragraphs to block html. */
function isPgbrOnlyParagraph(inlineToken) {
  if (inlineToken.type !== 'inline' || !inlineToken.children?.length) return false;
  for (const t of inlineToken.children) {
    if (t.type === 'softbreak' || t.type === 'hardbreak') continue;
    if (t.type === 'text' && !t.content.trim()) continue;
    if (t.type === 'html_inline' && (PGBR_SPAN_MARKUP.test(t.content) || isPgbrHtmlInline(t.content))) {
      continue;
    }
    return false;
  }
  return countPgbrInInline(inlineToken) > 0;
}

function createPgbrHtmlBlockToken(state) {
  const block = new state.Token('html_block', '', 0);
  block.content = '<div class="md-pgbr" data-md-pgbr="1"></div>';
  block.block = true;
  return block;
}

function transformInlineChildren(state, children) {
  if (!children?.length) return children;

  const next = [];

  for (const token of children) {
    if (token.type === 'html_inline' && isPgbrHtmlInline(token.content)) {
      next.push(createPgbrHtmlInlineToken(state));
      continue;
    }

    if (token.type !== 'text') {
      next.push(token);
      continue;
    }

    const text = token.content;
    PGBR_IN_TEXT_RE.lastIndex = 0;
    if (!PGBR_IN_TEXT_RE.test(text)) {
      next.push(token);
      continue;
    }
    let last = 0;
    PGBR_IN_TEXT_RE.lastIndex = 0;
    let match;

    while ((match = PGBR_IN_TEXT_RE.exec(text)) !== null) {
      if (match.index > last) {
        const t = new state.Token('text', '', 0);
        t.content = text.slice(last, match.index);
        next.push(t);
      }
      next.push(createPgbrHtmlInlineToken(state));
      last = match.index + match[0].length;
    }

    if (last < text.length) {
      const t = new state.Token('text', '', 0);
      t.content = text.slice(last);
      next.push(t);
    }
  }

  return next;
}

export function pageBreakMarkdownItPlugin(md) {
  md.core.ruler.push('pgbr-mark', (state) => {
    state.tokens.forEach((blockToken) => {
      if (blockToken.type !== 'inline' || !blockToken.children) return;
      blockToken.children = transformInlineChildren(state, blockToken.children);
    });
    return true;
  });

  md.core.ruler.after('pgbr-mark', 'pgbr-unwrap-paragraph', (state) => {
    const { tokens } = state;
    const out = [];
    let i = 0;
    while (i < tokens.length) {
      if (
        i + 2 < tokens.length
        && tokens[i].type === 'paragraph_open'
        && tokens[i + 1].type === 'inline'
        && tokens[i + 2].type === 'paragraph_close'
        && isPgbrOnlyParagraph(tokens[i + 1])
      ) {
        const n = countPgbrInInline(tokens[i + 1]);
        for (let k = 0; k < n; k += 1) {
          out.push(createPgbrHtmlBlockToken(state));
        }
        i += 3;
        continue;
      }
      out.push(tokens[i]);
      i += 1;
    }
    state.tokens = out;
    return true;
  });

  md.core.ruler.after('pgbr-unwrap-paragraph', 'pgbr-normalize-html-block', (state) => {
    state.tokens = state.tokens.map((t) => {
      if (t.type === 'html_block' && isPgbrHtmlBlockContent(t.content)) {
        return createPgbrHtmlBlockToken(state);
      }
      return t;
    });
    return true;
  });
}

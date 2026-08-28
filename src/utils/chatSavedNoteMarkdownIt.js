import { parseChatWithMyselfNoteMeta } from '@/utils/chatWithMyself/format.js';

const COMMENT_RE = /<!--\s*chat-with-myself\s+[^>]*?-->/i;
const CHAT_LINK_HREF_RE = /(?:^|\/)chat(?:\/)?(?:#|%23)msg-/i;
const CHAT_LINK_LABEL_RE = /채팅으로\s*이동|채팅에서\s*저장된\s*노트/;

/**
 * Escape text for use inside HTML attribute values and text nodes.
 * @param {unknown} value
 * @returns {string}
 */
function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * @param {string} content
 * @returns {ReturnType<typeof parseChatWithMyselfNoteMeta>}
 */
function metaFromHtmlContent(content) {
  if (!COMMENT_RE.test(content || '')) return null;
  return parseChatWithMyselfNoteMeta(content);
}

/**
 * @param {import('markdown-it/index.js').Token} token
 * @returns {boolean}
 */
function isChatCommentHtmlToken(token) {
  if (!token) return false;
  if (token.type !== 'html_block' && token.type !== 'html_inline') return false;
  return Boolean(metaFromHtmlContent(token.content));
}

/**
 * Find end index (exclusive) of a blockquote starting at `start`.
 * @param {import('markdown-it/index.js').Token[]} tokens
 * @param {number} start
 * @returns {number}
 */
function blockquoteEndExclusive(tokens, start) {
  if (tokens[start]?.type !== 'blockquote_open') return -1;
  let depth = 0;
  for (let i = start; i < tokens.length; i += 1) {
    const t = tokens[i];
    if (t.type === 'blockquote_open') depth += 1;
    else if (t.type === 'blockquote_close') {
      depth -= 1;
      if (depth === 0) return i + 1;
    }
  }
  return -1;
}

/**
 * Whether inline children are only a single chat deep-link (optional whitespace).
 * @param {import('markdown-it/index.js').Token | undefined} inline
 * @returns {boolean}
 */
function isChatLinkInline(inline) {
  if (!inline || inline.type !== 'inline' || !inline.children?.length) return false;
  let linkHref = '';
  let linkText = '';
  let sawLink = false;

  for (const child of inline.children) {
    if (child.type === 'softbreak' || child.type === 'hardbreak') continue;
    if (child.type === 'text' && !String(child.content || '').trim()) continue;
    if (child.type === 'link_open') {
      if (sawLink) return false;
      sawLink = true;
      linkHref = child.attrGet('href') || '';
      continue;
    }
    if (child.type === 'text' && sawLink && !linkText) {
      linkText = child.content || '';
      continue;
    }
    if (child.type === 'link_close') continue;
    return false;
  }

  if (!sawLink) return false;
  if (!CHAT_LINK_HREF_RE.test(linkHref) && !/#msg-/.test(linkHref)) return false;
  if (linkText && !CHAT_LINK_LABEL_RE.test(linkText)) {
    // Still accept /chat#msg- links even if label was customized.
    if (!CHAT_LINK_HREF_RE.test(linkHref) && !/#msg-/.test(linkHref)) return false;
  }
  return true;
}

/**
 * Find end index (exclusive) of a paragraph that is only a chat link.
 * @param {import('markdown-it/index.js').Token[]} tokens
 * @param {number} start
 * @returns {number}
 */
function chatLinkParagraphEndExclusive(tokens, start) {
  if (tokens[start]?.type !== 'paragraph_open') return -1;
  if (tokens[start + 1]?.type !== 'inline') return -1;
  if (tokens[start + 2]?.type !== 'paragraph_close') return -1;
  if (!isChatLinkInline(tokens[start + 1])) return -1;
  return start + 3;
}

/**
 * Build preview card HTML from note meta.
 * @param {{ id: string, at: string, group: string, href: string, notePath: string }} meta
 * @returns {string}
 */
export function buildChatSavedNoteCardHtml(meta) {
  const href = escapeHtml(meta.href || '/chat');
  const id = escapeHtml(meta.id || '');
  return [
    `<a class="md-chat-saved-note" href="${href}" data-chat-saved-note="1" data-chat-href="${href}" data-chat-id="${id}">`,
    '<span class="md-chat-saved-note__icon" aria-hidden="true"></span>',
    '<span class="md-chat-saved-note__body">',
    '<span class="md-chat-saved-note__title">채팅에서 저장된 노트</span>',
    '<span class="md-chat-saved-note__hint">탭하여 원본 채팅으로 이동</span>',
    '</span>',
    '<span class="md-chat-saved-note__arrow" aria-hidden="true">→</span>',
    '</a>',
  ].join('');
}

/**
 * Collapse `<!-- chat-with-myself -->` + optional blockquote + chat link into one preview card.
 * Source markdown keeps comment / quote / link; preview shows a single modern card.
 *
 * @param {import('markdown-it')} md
 * @returns {void}
 */
export function chatSavedNotePlugin(md) {
  // Must run after `inline` so link tokens exist inside paragraph inlines.
  md.core.ruler.after('inline', 'chat-saved-note', (state) => {
    const { tokens } = state;
    if (!tokens?.length) return;

    const next = [];
    let i = 0;
    while (i < tokens.length) {
      if (!isChatCommentHtmlToken(tokens[i])) {
        next.push(tokens[i]);
        i += 1;
        continue;
      }

      const meta = metaFromHtmlContent(tokens[i].content);
      let end = i + 1;

      const bqEnd = blockquoteEndExclusive(tokens, end);
      if (bqEnd > end) end = bqEnd;

      const linkEnd = chatLinkParagraphEndExclusive(tokens, end);
      if (linkEnd > end) end = linkEnd;

      const card = new state.Token('html_block', '', 0);
      card.content = buildChatSavedNoteCardHtml(meta);
      card.block = true;
      next.push(card);
      i = end;
    }

    state.tokens = next;
  });
}

import type { MarkdownIt as MarkdownItInstance, StateInline } from 'markdown-it';

const ASTERISK = 0x2a;

/**
 * Parse contiguous `**…**` runs before the core emphasis rule.
 * Renderer maps strong tokens to `<b>` (see strong_open / strong_close below).
 */
function betterStrong(state: StateInline, silent: boolean): boolean {
  const start = state.pos;
  const max = state.posMax;
  const src = state.src;

  if (start + 3 > max) return false;
  if (src.charCodeAt(start) !== ASTERISK) return false;
  if (src.charCodeAt(start + 1) !== ASTERISK) return false;

  const end = src.indexOf('**', start + 2);
  if (end === -1 || end === start + 2) return false;

  if (silent) return true;

  const open = state.push('strong_open', 'strong', 1);
  open.markup = '**';

  const text = state.push('text', '', 0);
  text.content = src.slice(start + 2, end);

  const close = state.push('strong_close', 'strong', -1);
  close.markup = '**';

  state.pos = end + 2;
  return true;
}

/** Preview / export PDF: `**bold**` → `<b>…</b>` via markdown-it 15 inline + renderer hooks. */
export function betterMdMarkdownItPlugin(md: MarkdownItInstance): void {
  md.inline.ruler.before('emphasis', 'better_strong', betterStrong);

  md.renderer.rules.strong_open = () => '<b>';
  md.renderer.rules.strong_close = () => '</b>';
}

export default betterMdMarkdownItPlugin;

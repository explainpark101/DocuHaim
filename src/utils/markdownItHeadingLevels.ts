import type MarkdownIt from 'markdown-it';
import type StateBlock from 'markdown-it/lib/rules_block/state_block.mjs';
import {
  MAX_APP_HEADING_LEVEL,
  MAX_EXPORT_HEADING_LEVEL,
} from '@/utils/markdownHeadings';

function isSpace(code: number): boolean {
  return code === 0x09 || code === 0x20;
}

/**
 * ATX headings through h10 (`#` … `##########`).
 * Levels 7–10 render as `h6[data-heading-level]` so HTML/XSS stay valid.
 */
function headingMax10(
  state: StateBlock,
  startLine: number,
  _endLine: number,
  silent: boolean,
): boolean {
  let pos = state.bMarks[startLine]! + state.tShift[startLine]!;
  let max = state.eMarks[startLine]!;

  if (state.sCount[startLine]! - state.blkIndent >= 4) return false;

  let ch = state.src.charCodeAt(pos);
  if (ch !== 0x23 || pos >= max) return false;

  let level = 1;
  ch = state.src.charCodeAt(++pos);
  while (ch === 0x23 && pos < max && level < MAX_APP_HEADING_LEVEL) {
    level += 1;
    ch = state.src.charCodeAt(++pos);
  }

  if (level > MAX_APP_HEADING_LEVEL || (pos < max && !isSpace(ch))) return false;
  if (silent) return true;

  max = state.skipSpacesBack(max, pos);
  const tmp = state.skipCharsBack(max, 0x23, pos);
  if (tmp > pos && isSpace(state.src.charCodeAt(tmp - 1))) {
    max = tmp;
  }

  state.line = startLine + 1;
  const markup = '#'.repeat(level);
  const htmlTag = level <= MAX_EXPORT_HEADING_LEVEL ? `h${level}` : 'h6';

  const open = state.push('heading_open', htmlTag, 1);
  open.markup = markup;
  open.map = [startLine, state.line];
  if (level > MAX_EXPORT_HEADING_LEVEL) {
    open.attrSet('data-heading-level', String(level));
    open.attrSet('class', `md-heading md-heading-${level}`);
  }

  const inline = state.push('inline', '', 0);
  inline.content = state.src.slice(pos, max).trim();
  inline.map = [startLine, state.line];
  inline.children = [];

  const close = state.push('heading_close', htmlTag, -1);
  close.markup = markup;

  return true;
}

export function headingLevelsMarkdownItPlugin(md: MarkdownIt): void {
  md.block.ruler.at('heading', headingMax10);
}

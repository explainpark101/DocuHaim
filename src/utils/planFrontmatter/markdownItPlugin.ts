import {
  extractLeadingYamlFrontmatter,
  parsePlanFrontmatterYaml,
} from './parse';
import { buildPlanFrontmatterHtml } from './renderHtml';

type MdStateBlock = {
  src: string;
  bMarks: number[];
  eMarks: number[];
  tShift: number[];
  line: number;
  lineMax: number;
  parentType: string;
  // Match markdown-it Nesting (-1 | 0 | 1) so real MarkdownIt is assignable to MarkdownItLike.
  push: (type: string, tag: string, nesting: -1 | 0 | 1) => {
    content: string;
    map: [number, number] | null;
    markup: string;
    block?: boolean;
  };
};

type MarkdownItLike = {
  block: {
    ruler: {
      before: (
        beforeName: string,
        name: string,
        fn: (state: MdStateBlock, startLine: number, endLine: number, silent: boolean) => boolean,
        // Prefer required `alt` so real markdown-it RuleOptions is assignable under exactOptionalPropertyTypes.
        options?: { alt: string[] },
      ) => void;
    };
  };
};

/** End line (exclusive) of a leading `---` … `---` fence, or -1. */
function frontmatterEndLineExclusive(state: MdStateBlock): number {
  if (state.lineMax < 2) return -1;
  const firstStart = state.bMarks[0]! + state.tShift[0]!;
  const firstEnd = state.eMarks[0]!;
  const firstLine = state.src.slice(firstStart, firstEnd);
  if (!/^---[ \t]*$/.test(firstLine)) return -1;

  for (let line = 1; line < state.lineMax; line += 1) {
    const start = state.bMarks[line]! + state.tShift[line]!;
    const end = state.eMarks[line]!;
    const text = state.src.slice(start, end);
    if (/^---[ \t]*$/.test(text)) return line + 1;
  }
  return -1;
}

/**
 * Document-leading YAML frontmatter with plan shape → status-icon card HTML.
 * Non-plan frontmatter is left for normal parsing (hr / paragraphs).
 */
function planFrontmatterBlock(
  state: MdStateBlock,
  startLine: number,
  _endLine: number,
  silent: boolean,
): boolean {
  if (startLine !== 0) return false;

  const endLine = frontmatterEndLineExclusive(state);
  if (endLine < 0) return false;

  const fenceStart = state.bMarks[0]!;
  let absEnd = state.eMarks[endLine - 1]!;
  if (state.src[absEnd] === '\r') absEnd += 1;
  if (state.src[absEnd] === '\n') absEnd += 1;

  const sliced = state.src.slice(fenceStart, absEnd);
  const extracted = extractLeadingYamlFrontmatter(sliced);
  if (!extracted) return false;
  const plan = parsePlanFrontmatterYaml(extracted.yaml);
  if (!plan) return false;

  if (silent) return true;

  const token = state.push('html_block', '', 0);
  token.content = buildPlanFrontmatterHtml(plan);
  token.map = [startLine, endLine];
  token.markup = '---';
  token.block = true;

  state.line = endLine;
  return true;
}

const BLOCK_ALT = ['paragraph', 'reference', 'blockquote', 'list'] as const;

/**
 * Render Cursor-style `*.plan.md` YAML frontmatter as a status-icon card.
 * Registered before `hr` so leading `---` is not eaten as a thematic break.
 */
export function planFrontmatterMarkdownItPlugin(md: MarkdownItLike): void {
  const rule = planFrontmatterBlock;
  const opts = { alt: [...BLOCK_ALT] };
  try {
    md.block.ruler.before('hr', 'plan_frontmatter', rule, opts);
  } catch {
    md.block.ruler.before('fence', 'plan_frontmatter', rule, opts);
  }
}

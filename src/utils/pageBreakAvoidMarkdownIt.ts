/**
 * markdown-it: `<!-- page-break-avoid -->` → data-page-break-avoid on following
 * table or fenced code (skips other HTML comment sidecars in between).
 */
import { isPageBreakAvoidComment } from '@/utils/pageBreakAvoid';

type MdToken = {
  type: string;
  tag: string;
  content: string;
  info?: string;
  hidden?: boolean;
  attrSet: (name: string, value: string) => void;
  attrGet: (name: string) => string | null;
};

type MdState = {
  tokens: MdToken[];
};

type MdLike = {
  core: {
    ruler: {
      after: (before: string, name: string, fn: (state: MdState) => void) => void;
    };
  };
  renderer: {
    rules: Record<
      string,
      | ((
          tokens: MdToken[],
          idx: number,
          options: unknown,
          env: unknown,
          self: { renderToken: (tokens: MdToken[], idx: number, options: unknown) => string },
        ) => string)
      | undefined
    >;
  };
};

function isPageBreakAvoidToken(token: MdToken | undefined): boolean {
  if (!token) return false;
  if (token.type !== 'html_block' && token.type !== 'html_inline') return false;
  return isPageBreakAvoidComment(String(token.content || ''));
}

function isSkippableBeforeTarget(token: MdToken): boolean {
  if (token.hidden) return true;
  if (token.type === 'paragraph_open' || token.type === 'paragraph_close') return true;
  if (token.type === 'inline' && !String(token.content || '').trim()) return true;
  if (token.type === 'html_block' || token.type === 'html_inline') return true;
  return false;
}

function findTargetAfter(
  tokens: MdToken[],
  from: number,
): { kind: 'table' | 'fence'; index: number } | null {
  for (let i = from; i < Math.min(tokens.length, from + 12); i += 1) {
    const t = tokens[i];
    if (!t) continue;
    if (t.type === 'table_open') return { kind: 'table', index: i };
    if (t.type === 'fence') {
      const lang = String(t.info || '').trim().split(/\s+/)[0]?.toLowerCase() || '';
      if (lang === 'mermaid') return null;
      return { kind: 'fence', index: i };
    }
    if (!isSkippableBeforeTarget(t)) return null;
  }
  return null;
}

function applyMarks(state: MdState): void {
  const { tokens } = state;
  for (let i = 0; i < tokens.length; i += 1) {
    if (!isPageBreakAvoidToken(tokens[i])) continue;
    const target = findTargetAfter(tokens, i + 1);
    if (!target) continue;
    const tok = tokens[target.index];
    if (!tok) continue;
    tok.attrSet('data-page-break-avoid', '1');
    const comment = tokens[i];
    if (comment) {
      comment.hidden = true;
      comment.content = '';
    }
  }
}

export function pageBreakAvoidMarkdownItPlugin(md: MdLike): void {
  md.core.ruler.after('block', 'page_break_avoid', (state) => {
    applyMarks(state);
  });

  // Ensure fence attrs survive md-editor-rt wrapper HTML (inject on <pre>).
  const originalFence = md.renderer.rules.fence;
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const html = originalFence
      ? originalFence(tokens, idx, options, env, self)
      : self.renderToken(tokens, idx, options);
    if (token?.attrGet('data-page-break-avoid') !== '1') return html;
    if (/data-page-break-avoid=/.test(html)) return html;
    return html
      .replace(/<pre\b/i, '<pre data-page-break-avoid="1"')
      .replace(
        /class="([^"]*\bmd-editor-code\b[^"]*)"/i,
        'class="$1" data-page-break-avoid="1"',
      );
  };
}

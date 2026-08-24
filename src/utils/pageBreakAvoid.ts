/**
 * Sidecar `<!-- page-break-avoid -->` for tables and fenced code blocks.
 * Stacks with other HTML comments (e.g. haim-table) immediately before the target.
 */

export const PAGE_BREAK_AVOID_COMMENT = '<!-- page-break-avoid -->';
export const PAGE_BREAK_AVOID_ATTR = 'data-page-break-avoid';

const PAGE_BREAK_AVOID_EXACT_RE = /^<!--\s*page-break-avoid\s*-->$/i;
const PAGE_BREAK_AVOID_IN_RE = /<!--\s*page-break-avoid\s*-->/i;
const FENCE_RE = /^```([^\n`]*)\r?\n([\s\S]*?)^```/gm;

export type PageBreakAvoidTargetKind = 'table' | 'code';

export type HtmlCommentSpan = {
  start: number;
  end: number;
  raw: string;
};

export function isPageBreakAvoidComment(raw: string): boolean {
  return PAGE_BREAK_AVOID_EXACT_RE.test(String(raw || '').trim());
}

export function commentContainsPageBreakAvoid(raw: string): boolean {
  return PAGE_BREAK_AVOID_IN_RE.test(String(raw || ''));
}

/** True when a markdown line is only a page-break-avoid comment (after trim). */
export function isPageBreakAvoidCommentLine(line: string): boolean {
  return isPageBreakAvoidComment(line);
}

/**
 * Collect consecutive HTML comments immediately before `targetStart`
 * (only whitespace between comments and before the target).
 */
export function findSidecarCommentStackBefore(
  markdown: string,
  targetStart: number,
): { stackStart: number; comments: HtmlCommentSpan[]; hasPageBreakAvoid: boolean } {
  const text = markdown.replace(/\r\n/g, '\n');
  const index = Math.max(0, Math.min(targetStart, text.length));
  let pos = index;
  while (pos > 0 && /[ \t\n\r]/.test(text[pos - 1] ?? '')) {
    pos -= 1;
  }

  const comments: HtmlCommentSpan[] = [];
  while (pos > 0) {
    const before = text.slice(0, pos);
    const match = before.match(/<!--[\s\S]*?-->[ \t]*$/);
    if (!match || match.index == null) break;
    const raw = match[0].replace(/[ \t]*$/, '');
    const start = match.index;
    const end = start + raw.length;
    comments.unshift({ start, end, raw });
    pos = start;
    while (pos > 0 && /[ \t\n\r]/.test(text[pos - 1] ?? '')) {
      pos -= 1;
    }
  }

  const stackStart = comments[0]?.start ?? index;
  return {
    stackStart,
    comments,
    hasPageBreakAvoid: comments.some((c) => isPageBreakAvoidComment(c.raw)),
  };
}

export type CodeFenceTarget = {
  index: number;
  length: number;
  occurrence: number;
  lang: string;
};

/** Collect fenced code blocks (non-mermaid) in document order. */
export function collectCodeFenceTargets(markdown: string): CodeFenceTarget[] {
  const text = markdown.replace(/\r\n/g, '\n');
  const out: CodeFenceTarget[] = [];
  const re = new RegExp(FENCE_RE.source, 'gm');
  let m: RegExpExecArray | null;
  let occurrence = 0;
  while ((m = re.exec(text)) !== null) {
    const info = (m[1] || '').trim();
    const lang = info.split(/\s+/)[0]?.toLowerCase() || '';
    if (lang === 'mermaid') continue;
    out.push({
      index: m.index,
      length: m[0].length,
      occurrence,
      lang,
    });
    occurrence += 1;
  }
  return out;
}

export function resolveCodeFenceFromPreview(
  markdown: string,
  codeEl: HTMLElement,
  previewRoot: Element,
): CodeFenceTarget | null {
  const targets = collectCodeFenceTargets(markdown);
  if (!targets.length) return null;
  const codes = [...previewRoot.querySelectorAll('.md-editor-code')].filter(
    (el) => !el.querySelector('.md-editor-mermaid') && !el.closest('.md-editor-mermaid'),
  );
  const index = codes.indexOf(codeEl);
  if (index < 0) return targets.length === 1 ? targets[0]! : null;
  return targets[index] ?? null;
}

export function hasPageBreakAvoidOnElement(el: HTMLElement): boolean {
  if (el.getAttribute(PAGE_BREAK_AVOID_ATTR) === '1') return true;
  return Boolean(el.querySelector(`[${PAGE_BREAK_AVOID_ATTR}="1"]`));
}

/**
 * Insert or remove `<!-- page-break-avoid -->` in the sidecar stack above a target.
 * Preserves other comments (haim-table, remote-image, …) in the stack.
 */
export function setPageBreakAvoidBeforeTarget(
  markdown: string,
  targetStart: number,
  enabled: boolean,
): string {
  const text = markdown.replace(/\r\n/g, '\n');
  const { stackStart, comments, hasPageBreakAvoid } = findSidecarCommentStackBefore(
    text,
    targetStart,
  );

  if (enabled && hasPageBreakAvoid) return text;
  if (!enabled && !hasPageBreakAvoid) return text;

  if (enabled) {
    const insertAt = stackStart;
    const chunk = `${PAGE_BREAK_AVOID_COMMENT}\n`;
    return `${text.slice(0, insertAt)}${chunk}${text.slice(insertAt)}`;
  }

  // Remove all exact page-break-avoid comments in the stack (and one following newline).
  let next = text;
  const toRemove = [...comments].filter((c) => isPageBreakAvoidComment(c.raw)).reverse();
  for (const c of toRemove) {
    let end = c.end;
    if (next[end] === '\n') end += 1;
    next = `${next.slice(0, c.start)}${next.slice(end)}`;
  }
  return next;
}

export function togglePageBreakAvoidForTable(
  markdown: string,
  tableStart: number,
  enabled: boolean,
): string {
  return setPageBreakAvoidBeforeTarget(markdown, tableStart, enabled);
}

export function togglePageBreakAvoidForCodeFence(
  markdown: string,
  fenceStart: number,
  enabled: boolean,
): string {
  return setPageBreakAvoidBeforeTarget(markdown, fenceStart, enabled);
}

/** Whether page-break-avoid is already stacked above this target. */
export function isPageBreakAvoidEnabledBefore(markdown: string, targetStart: number): boolean {
  return findSidecarCommentStackBefore(markdown, targetStart).hasPageBreakAvoid;
}

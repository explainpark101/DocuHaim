/**
 * Extract / restore leading vault meta HTML comments so TipTap does not
 * drop note-cover, print-chrome, footnotes, document-settings blocks.
 */

const META_COMMENT_RE =
  /^(\uFEFF?\s*(?:<!--\s*(?:note-cover|print-chrome|footnotes|document-settings)\b[\s\S]*?-->\s*)+)/;

export type SplitMetaResult = {
  prefix: string;
  body: string;
};

export function splitLeadingMetaComments(markdown: string): SplitMetaResult {
  const src = typeof markdown === 'string' ? markdown : '';
  const m = META_COMMENT_RE.exec(src);
  if (!m) return { prefix: '', body: src };
  const prefix = m[1] ?? '';
  return { prefix, body: src.slice(prefix.length) };
}

export function joinMetaPrefix(prefix: string, body: string): string {
  if (!prefix) return body;
  if (!body) return prefix;
  return prefix.endsWith('\n') ? `${prefix}${body}` : `${prefix}\n${body}`;
}

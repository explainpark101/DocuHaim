/**
 * Sidecar HTML comment that caches a public ImgBB (or other https) URL next to
 * a wiki image, markdown image, or mermaid fence — without changing the source.
 *
 * <!-- remote-image url="https://…" hash="…" -->
 */
import { hashText } from '@/utils/advancedSearch/hash';
import { WIKI_IMAGE_RE } from '@/utils/wikiImageSyntax';

export type RemoteImageKind = 'wiki' | 'markdown' | 'mermaid';

export type RemoteImageComment = {
  url: string;
  hash: string;
};

export type RemoteImageTarget = {
  kind: RemoteImageKind;
  /** Path / src / mermaid body used for hashing and occurrence match. */
  key: string;
  occurrence: number;
};

const ATTR_RE = /([\w-]+)="([^"]*)"/g;
const MERMAID_FENCE_RE = /^```mermaid[^\n]*\r?\n([\s\S]*?)^```/gm;
const MARKDOWN_IMAGE_RE = /!\[([^\]]*)\]\(([^)\n]+)\)(\{[^}\n]*\})?/g;
const COMMENT_AT_END_RE =
  /<!--\s*remote-image\s+([^>]*?)-->[ \t]*(?:\r?\n[ \t]*)*$/i;

function escapeAttr(value: string): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/\r\n/g, '\n')
    .replace(/\n/g, '&#10;')
    .replace(/\r/g, '');
}

function unescapeAttr(value: string): string {
  return String(value ?? '')
    .replace(/&#10;/g, '\n')
    .replace(/&lt;/g, '<')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&');
}

export function parseRemoteImageCommentAttrs(attrRegion: string): RemoteImageComment | null {
  const attrs: Record<string, string> = {};
  ATTR_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = ATTR_RE.exec(attrRegion)) !== null) {
    const key = m[1];
    const raw = m[2];
    if (!key || raw == null) continue;
    attrs[key] = unescapeAttr(raw);
  }
  const url = (attrs.url || '').trim();
  const hash = (attrs.hash || '').trim();
  if (!url || !hash) return null;
  if (!/^https:\/\//i.test(url)) return null;
  return { url, hash };
}

export function serializeRemoteImageComment(comment: RemoteImageComment): string {
  return `<!-- remote-image url="${escapeAttr(comment.url)}" hash="${escapeAttr(comment.hash)}" -->`;
}

export async function hashRemoteImageKey(key: string): Promise<string> {
  return hashText(String(key || ''));
}

/** Find remote-image comment immediately before `index` (optional blank lines). */
export function findPrecedingRemoteImageComment(
  markdown: string,
  index: number,
): { comment: RemoteImageComment; start: number; end: number } | null {
  if (index <= 0) return null;
  const before = markdown.slice(0, index);
  const match = before.match(COMMENT_AT_END_RE);
  if (!match || match.index == null || !match[1]) return null;
  const comment = parseRemoteImageCommentAttrs(match[1]);
  if (!comment) return null;
  return {
    comment,
    start: match.index,
    end: match.index + match[0].length,
  };
}

type FoundTarget = {
  kind: RemoteImageKind;
  key: string;
  index: number;
  length: number;
  occurrence: number;
};

function collectWikiTargets(markdown: string): FoundTarget[] {
  const out: FoundTarget[] = [];
  const counts = new Map<string, number>();
  const re = new RegExp(WIKI_IMAGE_RE.source, 'g');
  let m: RegExpExecArray | null;
  while ((m = re.exec(markdown)) !== null) {
    const inner = m[1] || '';
    const pipe = inner.lastIndexOf('|');
    const path =
      pipe >= 0
        ? inner.slice(0, pipe).trim() || inner.trim()
        : inner.trim();
    if (!path) continue;
    const occurrence = counts.get(path) ?? 0;
    counts.set(path, occurrence + 1);
    out.push({
      kind: 'wiki',
      key: path,
      index: m.index,
      length: m[0].length,
      occurrence,
    });
  }
  return out;
}

function collectMarkdownImageTargets(markdown: string): FoundTarget[] {
  const out: FoundTarget[] = [];
  const counts = new Map<string, number>();
  const re = new RegExp(MARKDOWN_IMAGE_RE.source, 'g');
  let m: RegExpExecArray | null;
  while ((m = re.exec(markdown)) !== null) {
    if (m[0].startsWith('![[')) continue;
    const src = (m[2] || '').trim();
    if (!src) continue;
    const occurrence = counts.get(src) ?? 0;
    counts.set(src, occurrence + 1);
    out.push({
      kind: 'markdown',
      key: src,
      index: m.index,
      length: m[0].length,
      occurrence,
    });
  }
  return out;
}

function collectMermaidTargets(markdown: string): FoundTarget[] {
  const out: FoundTarget[] = [];
  const counts = new Map<string, number>();
  const re = new RegExp(MERMAID_FENCE_RE.source, 'gm');
  let m: RegExpExecArray | null;
  while ((m = re.exec(markdown)) !== null) {
    const body = (m[1] || '').replace(/\s+$/, '');
    const occurrence = counts.get(body) ?? 0;
    counts.set(body, occurrence + 1);
    out.push({
      kind: 'mermaid',
      key: body,
      index: m.index,
      length: m[0].length,
      occurrence,
    });
  }
  return out;
}

export function findRemoteImageTarget(
  markdown: string,
  target: RemoteImageTarget,
): FoundTarget | null {
  const list =
    target.kind === 'wiki'
      ? collectWikiTargets(markdown)
      : target.kind === 'markdown'
        ? collectMarkdownImageTargets(markdown)
        : collectMermaidTargets(markdown);
  return (
    list.find(
      (t) => t.key === target.key && t.occurrence === (target.occurrence ?? 0),
    ) ?? null
  );
}

/**
 * Insert or replace the remote-image comment immediately before the target.
 * Leaves the target markup unchanged.
 */
export async function upsertRemoteImageComment(
  markdown: string,
  target: RemoteImageTarget,
  url: string,
): Promise<{ updated: boolean; markdown: string }> {
  const found = findRemoteImageTarget(markdown, target);
  if (!found) return { updated: false, markdown };

  const hash = await hashRemoteImageKey(target.key);
  const commentLine = serializeRemoteImageComment({ url: String(url).trim(), hash });
  const preceding = findPrecedingRemoteImageComment(markdown, found.index);

  if (preceding) {
    const next =
      markdown.slice(0, preceding.start) +
      commentLine +
      markdown.slice(preceding.end);
    return { updated: next !== markdown, markdown: next };
  }

  const needsLeadingNl = found.index > 0 && markdown[found.index - 1] !== '\n';
  const insert = `${needsLeadingNl ? '\n' : ''}${commentLine}\n`;
  const next =
    markdown.slice(0, found.index) + insert + markdown.slice(found.index);
  return { updated: true, markdown: next };
}

/**
 * If a matching remote-image sidecar exists for this target, return its URL.
 */
export async function lookupRemoteImageUrl(
  markdown: string,
  target: RemoteImageTarget,
): Promise<string | null> {
  const found = findRemoteImageTarget(markdown, target);
  if (!found) return null;
  const preceding = findPrecedingRemoteImageComment(markdown, found.index);
  if (!preceding) return null;
  const expected = await hashRemoteImageKey(target.key);
  if (preceding.comment.hash !== expected) return null;
  return preceding.comment.url;
}

/**
 * Apply many upserts from end-of-document so earlier indices stay stable.
 */
export async function batchUpsertRemoteImageComments(
  markdown: string,
  items: Array<RemoteImageTarget & { url: string }>,
): Promise<{ updated: boolean; markdown: string }> {
  let next = markdown;
  let updated = false;
  const resolved: Array<{ target: RemoteImageTarget; url: string; index: number }> = [];
  for (const item of items) {
    const found = findRemoteImageTarget(next, item);
    if (!found) continue;
    resolved.push({
      target: { kind: item.kind, key: item.key, occurrence: item.occurrence },
      url: item.url,
      index: found.index,
    });
  }
  resolved.sort((a, b) => b.index - a.index);
  for (const item of resolved) {
    const result = await upsertRemoteImageComment(next, item.target, item.url);
    if (result.updated) {
      updated = true;
      next = result.markdown;
    }
  }
  return { updated, markdown: next };
}

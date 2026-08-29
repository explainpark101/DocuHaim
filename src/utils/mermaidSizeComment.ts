/**
 * Sidecar HTML comment for explicit Mermaid diagram size in print/export.
 *
 * <!-- mermaid-size width="420px" height="280px" -->
 * ```mermaid
 * flowchart TD
 *   A --> B
 * ```
 */

import {
  type MermaidFenceSize,
  parseMermaidFenceInfoSize,
  updateMermaidFenceSizeInMarkdown,
} from '@/utils/mermaidFenceSize';
import { normalizeSizeValue } from '@/utils/wikiImageSyntax';

const ATTR_RE = /([\w-]+)="([^"]*)"/g;
const MERMAID_FENCE_OPEN_RE = /^```mermaid\b([^\n]*)\r?\n/gim;
const COMMENT_AT_END_RE =
  /<!--\s*mermaid-size\s+([^>]*?)-->[ \t]*(?:\r?\n[ \t]*)*$/i;
const COMMENT_LINE_RE = /^<!--\s*mermaid-size\s+([^>]*?)-->\s*$/i;

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

export function parseMermaidSizeCommentAttrs(attrRegion: string): MermaidFenceSize | null {
  const attrs: Record<string, string> = {};
  ATTR_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = ATTR_RE.exec(attrRegion)) !== null) {
    const key = m[1];
    const raw = m[2];
    if (!key || raw == null) continue;
    attrs[key] = unescapeAttr(raw);
  }
  const width = normalizeSizeValue(attrs.width || attrs.w || '');
  const height = normalizeSizeValue(attrs.height || attrs.h || '');
  if (!width && !height) return null;
  return { width, height };
}

export function serializeMermaidSizeComment(size: MermaidFenceSize): string {
  const parts = ['<!-- mermaid-size'];
  if (size.width) parts.push(`width="${escapeAttr(size.width)}"`);
  if (size.height) parts.push(`height="${escapeAttr(size.height)}"`);
  parts.push('-->');
  return parts.join(' ');
}

/** Find mermaid-size comment immediately before `index` (optional blank lines). */
export function findPrecedingMermaidSizeComment(
  markdown: string,
  index: number,
): { size: MermaidFenceSize; start: number; end: number } | null {
  if (index <= 0) return null;
  const before = markdown.slice(0, index);
  const match = before.match(COMMENT_AT_END_RE);
  if (!match || match.index == null || !match[1]) return null;
  const size = parseMermaidSizeCommentAttrs(match[1]);
  if (!size) return null;
  return {
    size,
    start: match.index,
    end: match.index + match[0].length,
  };
}

export function findMermaidFenceOpenPositions(markdown: string): number[] {
  const positions: number[] = [];
  const re = new RegExp(MERMAID_FENCE_OPEN_RE.source, MERMAID_FENCE_OPEN_RE.flags);
  let match: RegExpExecArray | null;
  while ((match = re.exec(markdown)) !== null) {
    positions.push(match.index);
  }
  return positions;
}

/** Read sidecar size on the lines above a mermaid fence (markdown-it env). */
export function readMermaidSizeCommentFromSrcLines(
  srcLines: string[],
  fenceLine: number,
): MermaidFenceSize | null {
  for (let i = fenceLine - 1; i >= 0; i -= 1) {
    const line = srcLines[i] ?? '';
    if (!line.trim()) continue;
    const m = COMMENT_LINE_RE.exec(line.trim());
    if (!m) break;
    return parseMermaidSizeCommentAttrs(m[1] ?? '');
  }
  return null;
}

/** Sidecar comment wins over fence info when both are present. */
export function mergeMermaidFenceSize(
  fenceInfo: string,
  comment: MermaidFenceSize | null,
): MermaidFenceSize {
  const fromInfo = parseMermaidFenceInfoSize(fenceInfo);
  if (!comment?.width && !comment?.height) return fromInfo;
  return {
    width: comment.width ?? fromInfo.width,
    height: comment.height ?? fromInfo.height,
  };
}

/**
 * Insert or replace the mermaid-size comment before the Nth ```mermaid fence.
 * Clears size keys from the fence info line so the comment is canonical.
 */
export function upsertMermaidSizeInMarkdown(
  markdown: string,
  {
    occurrence = 0,
    width = null,
    height = null,
  }: {
    occurrence?: number;
    width?: string | null;
    height?: string | null;
  },
): { markdown: string; updated: boolean } {
  const src = String(markdown ?? '');
  const positions = findMermaidFenceOpenPositions(src);
  const fenceIndex = positions[occurrence];
  if (fenceIndex == null) return { markdown: src, updated: false };

  const nextWidth = width ? normalizeSizeValue(width) : null;
  const nextHeight = height ? normalizeSizeValue(height) : null;

  let next = src;
  let updated = false;

  const stripped = updateMermaidFenceSizeInMarkdown(next, {
    occurrence,
    width: null,
    height: null,
  });
  if (stripped.updated) {
    next = stripped.markdown;
    updated = true;
  }

  const fenceIndexAfterStrip = findMermaidFenceOpenPositions(next)[occurrence];
  if (fenceIndexAfterStrip == null) return { markdown: next, updated };

  const preceding = findPrecedingMermaidSizeComment(next, fenceIndexAfterStrip);

  if (!nextWidth && !nextHeight) {
    if (preceding) {
      next = next.slice(0, preceding.start) + next.slice(preceding.end);
      updated = true;
    }
    return { markdown: next, updated };
  }

  const commentLine = serializeMermaidSizeComment({
    width: nextWidth,
    height: nextHeight,
  });

  if (preceding) {
    const replaced = next.slice(0, preceding.start) + commentLine + next.slice(preceding.end);
    if (replaced !== next) {
      next = replaced;
      updated = true;
    }
  } else {
    const needsLeadingNl = fenceIndexAfterStrip > 0 && next[fenceIndexAfterStrip - 1] !== '\n';
    const insert = `${needsLeadingNl ? '\n' : ''}${commentLine}\n`;
    next = next.slice(0, fenceIndexAfterStrip) + insert + next.slice(fenceIndexAfterStrip);
    updated = true;
  }

  return { markdown: next, updated };
}

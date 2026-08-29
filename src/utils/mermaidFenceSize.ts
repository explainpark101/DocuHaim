/**
 * Mermaid fence size options on the info line:
 * ```mermaid width=420px height=280px
 *
 * Used by Export PDF free-transform and markdown-it fence rendering.
 */

import { normalizeSizeValue } from '@/utils/wikiImageSyntax';

export type MermaidFenceSize = {
  width: string | null;
  height: string | null;
};

const MERMAID_FENCE_OPEN_RE = /^```mermaid\b([^\n]*)\r?\n/gim;

/** Parse size keys from fence info after the `mermaid` language token. */
export function parseMermaidFenceInfoSize(info: string): MermaidFenceSize {
  const raw = String(info ?? '').trim();
  if (!raw) return { width: null, height: null };

  let width: string | null = null;
  let height: string | null = null;

  // Drop leading language token if present.
  const tokens = raw.split(/\s+/).filter(Boolean);
  const start = /^mermaid$/i.test(tokens[0] ?? '') ? 1 : 0;

  for (let i = start; i < tokens.length; i += 1) {
    const token = tokens[i] ?? '';
    const dim = /^(\d+)x(\d+)$/i.exec(token);
    if (dim) {
      width = normalizeSizeValue(dim[1]);
      height = normalizeSizeValue(dim[2]);
      continue;
    }
    if (/^\d+$/.test(token) && width == null) {
      width = normalizeSizeValue(token);
      continue;
    }
    const kv = /^([a-zA-Z_]+)=(.*)$/.exec(token);
    if (!kv) continue;
    const key = (kv[1] ?? '').toLowerCase();
    const value = normalizeSizeValue(kv[2]);
    if (!value) continue;
    if (key === 'w' || key === 'width') width = value;
    else if (key === 'h' || key === 'height') height = value;
  }

  return { width, height };
}

/** Build fence info line (without leading ```). */
export function buildMermaidFenceInfo(size: MermaidFenceSize): string {
  const parts = ['mermaid'];
  if (size.width) parts.push(`width=${size.width}`);
  if (size.height) parts.push(`height=${size.height}`);
  return parts.join(' ');
}

export function buildMermaidSizeStyle(size: MermaidFenceSize): string | null {
  const parts: string[] = [];
  if (size.width) parts.push(`width:${size.width}`);
  if (size.height) parts.push(`height:${size.height}`);
  return parts.length ? `${parts.join(';')};` : null;
}

/**
 * Apply stored size onto a Mermaid host (placeholder or processed).
 * Clears auto-fit transform when explicit size is present.
 */
export function applyMermaidSizeToHost(
  host: HTMLElement,
  size: MermaidFenceSize,
): void {
  if (size.width) {
    host.setAttribute('data-mermaid-width', size.width);
    host.style.width = size.width;
  } else {
    host.removeAttribute('data-mermaid-width');
  }
  if (size.height) {
    host.setAttribute('data-mermaid-height', size.height);
    host.style.height = size.height;
  } else {
    host.removeAttribute('data-mermaid-height');
  }
  const style = buildMermaidSizeStyle(size);
  if (style) {
    // Keep any non-size styles if already present? Prefer overwrite size keys only.
    host.style.maxWidth = '100%';
    host.style.overflow = 'hidden';
  }
  if (size.width || size.height) {
    host.setAttribute('data-mermaid-sized', '1');
    host.style.transform = '';
    host.style.transformOrigin = '';
    host.style.marginRight = '';
    host.style.marginBottom = '';
    host.removeAttribute('data-print-mermaid-fit');
  } else {
    host.removeAttribute('data-mermaid-sized');
  }
}

export function readMermaidSizeFromHost(host: HTMLElement): MermaidFenceSize {
  return {
    width: host.getAttribute('data-mermaid-width'),
    height: host.getAttribute('data-mermaid-height'),
  };
}

export function getMermaidOccurrenceInContainer(
  container: ParentNode,
  host: Element,
): number {
  const unique: Element[] = [];
  for (const el of container.querySelectorAll('.md-editor-mermaid')) {
    if (el.closest('.haim-mermaid-embed-source')) continue;
    unique.push(el);
  }
  return unique.findIndex((el) => el === host);
}

/**
 * Update the Nth ```mermaid fence info with width/height.
 * Clears size keys when both width and height are empty.
 */
export function updateMermaidFenceSizeInMarkdown(
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
  const matches: Array<{ index: number; full: string; infoTail: string }> = [];
  MERMAID_FENCE_OPEN_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = MERMAID_FENCE_OPEN_RE.exec(src)) !== null) {
    matches.push({
      index: match.index,
      full: match[0],
      infoTail: match[1] ?? '',
    });
  }
  const target = matches[occurrence];
  if (!target) return { markdown: src, updated: false };

  const nextInfo = buildMermaidFenceInfo({
    width: width ? normalizeSizeValue(width) : null,
    height: height ? normalizeSizeValue(height) : null,
  });
  const nextOpen = `\`\`\`${nextInfo}\n`;
  if (nextOpen === target.full) return { markdown: src, updated: false };

  const next =
    src.slice(0, target.index) + nextOpen + src.slice(target.index + target.full.length);
  return { markdown: next, updated: true };
}

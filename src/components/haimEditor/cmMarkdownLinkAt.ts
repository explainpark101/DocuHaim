import { syntaxTree } from '@codemirror/language';
import type { EditorState } from '@codemirror/state';
import type { SyntaxNode } from '@lezer/common';

/**
 * Normalize a markdown destination / autolink URL slice
 * (`<https://…>`, bare `https://…`, optional surrounding whitespace).
 */
export function normalizeMarkdownLinkHref(raw: string): string {
  let s = String(raw || '').trim();
  if (s.startsWith('<') && s.endsWith('>') && s.length >= 2) {
    s = s.slice(1, -1).trim();
  }
  return s;
}

function hrefFromUrlNode(state: EditorState, urlNode: SyntaxNode): string {
  return normalizeMarkdownLinkHref(
    state.doc.sliceString(urlNode.from, urlNode.to),
  );
}

function findUrlChild(linkNode: SyntaxNode): SyntaxNode | null {
  for (let child = linkNode.firstChild; child; child = child.nextSibling) {
    if (child.name === 'URL') return child;
  }
  return null;
}

/**
 * Markdown `[label](href)` / `<url>` / GFM autolink at `pos`.
 * Returns null for images (`![…](…)`) and when no link destination is found.
 */
export function findMarkdownLinkHrefAt(
  state: EditorState,
  pos: number,
): string | null {
  if (pos < 0 || pos > state.doc.length) return null;

  const tree = syntaxTree(state);
  let node: SyntaxNode | null = tree.resolveInner(pos, 1);

  for (; node; node = node.parent) {
    if (node.name === 'Image') return null;

    if (node.name === 'Link' || node.name === 'Autolink') {
      const urlNode = findUrlChild(node);
      if (!urlNode) return null;
      const href = hrefFromUrlNode(state, urlNode);
      return href || null;
    }

    if (node.name === 'URL') {
      const parent = node.parent;
      if (parent?.name === 'Image') return null;
      const href = hrefFromUrlNode(state, node);
      return href || null;
    }
  }

  return null;
}

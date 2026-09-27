/**
 * Restructure fenced code blocks for paged.js:
 * - one block row per source line (gutter + highlighted content)
 * - long lines wrap via pre-wrap (no page-height pre-split)
 */

export type LineSplitNode =
  | { kind: 'text'; value: string }
  | { kind: 'element'; tag: string; attrs: Record<string, string>; children: LineSplitNode[] };

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Escape code text; keep spaces as &#32; so leading indent survives HTML parse. */
function escapeCodeText(text: string): string {
  return escapeHtml(text).replace(/ /g, '&#32;');
}

function isTipTapContentWrapper(node: LineSplitNode): boolean {
  if (node.kind !== 'element') return false;
  if (node.tag !== 'div' && node.tag !== 'span') return false;
  return (
    'data-node-view-content' in node.attrs ||
    'data-node-view-content-react' in node.attrs ||
    node.attrs.class === 'react-renderer' ||
    (node.attrs.class?.includes('node-view-content') ?? false)
  );
}

/** Split a lightweight HTML tree into per-line HTML fragments (preserves tags). */
export function splitLineSplitNodesIntoLines(nodes: readonly LineSplitNode[]): string[] {
  const lines: string[] = [''];

  const append = (lineIndex: number, chunk: string) => {
    while (lines.length <= lineIndex) lines.push('');
    lines[lineIndex] += chunk;
  };

  const walk = (node: LineSplitNode, lineIndex: number): number => {
    if (node.kind === 'text') {
      const parts = node.value.split('\n');
      for (let i = 0; i < parts.length; i += 1) {
        if (i > 0) lineIndex += 1;
        // Keep whitespace-only segments (indent); only skip empty split artifacts.
        const part = parts[i];
        if (part !== undefined && part.length > 0) {
          append(lineIndex, escapeCodeText(part));
        }
      }
      return lineIndex;
    }

    // TipTap hard breaks are line separators (not emitted into output HTML).
    if (node.tag === 'br') {
      return lineIndex + 1;
    }

    // Unwrap TipTap NodeViewContent chrome so it does not wrap every line.
    if (isTipTapContentWrapper(node)) {
      let idx = lineIndex;
      for (const child of node.children) {
        idx = walk(child, idx);
      }
      return idx;
    }

    const attrs = Object.entries(node.attrs)
      .map(([key, value]) => `${key}="${value.replace(/"/g, '&quot;')}"`)
      .join(' ');
    append(lineIndex, attrs ? `<${node.tag} ${attrs}>` : `<${node.tag}>`);

    let idx = lineIndex;
    for (const child of node.children) {
      idx = walk(child, idx);
    }
    append(idx, `</${node.tag}>`);
    return idx;
  };

  let lineIndex = 0;
  for (const node of nodes) {
    lineIndex = walk(node, lineIndex);
  }

  if (lines.length > 1 && lines[lines.length - 1] === '') {
    const endsWithNewline = nodes.some((node) => nodeEndsWithNewline(node));
    if (endsWithNewline) lines.pop();
  }

  if (lines.length === 1 && lines[0] === '') return [''];
  return lines;
}

function nodeEndsWithNewline(node: LineSplitNode): boolean {
  if (node.kind === 'text') return node.value.endsWith('\n');
  if (node.tag === 'br') return true;
  if (node.children.length === 0) return false;
  return nodeEndsWithNewline(node.children[node.children.length - 1]!);
}

function domNodeToLineSplitNodes(node: Node): LineSplitNode | null {
  if (node.nodeType === Node.TEXT_NODE) {
    return { kind: 'text', value: node.textContent ?? '' };
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return null;

  const el = node as HTMLElement;
  // Skip TipTap trailing-break decoration (empty visual line at end).
  if (
    el.tagName === 'BR' &&
    el.classList.contains('ProseMirror-trailingBreak')
  ) {
    return null;
  }

  const attrs: Record<string, string> = {};
  for (const attr of el.attributes) {
    attrs[attr.name] = attr.value;
  }
  const children: LineSplitNode[] = [];
  for (const child of el.childNodes) {
    const parsed = domNodeToLineSplitNodes(child);
    if (parsed) children.push(parsed);
  }
  return {
    kind: 'element',
    tag: el.tagName.toLowerCase(),
    attrs,
    children,
  };
}

/** Plain source lines with br → newline (TipTap) so leading indent is visible. */
function blockPlainLines(block: HTMLElement): string[] {
  const clone = block.cloneNode(true) as HTMLElement;
  for (const br of clone.querySelectorAll('br')) {
    br.replaceWith(document.createTextNode('\n'));
  }
  const text = clone.textContent ?? '';
  const lines = text.split('\n');
  if (lines.length > 1 && lines[lines.length - 1] === '') {
    lines.pop();
  }
  return lines;
}

function htmlLinePlainText(html: string): string {
  if (!html) return '';
  const box = document.createElement('div');
  box.innerHTML = html;
  return box.textContent ?? '';
}

function leadingWs(text: string): string {
  const match = text.match(/^[ \t]*/);
  return match?.[0] ?? '';
}

/**
 * Highlighters sometimes drop leading spaces on lines that start with a span.
 * Re-apply indent from the block's plain text when the HTML line is short.
 */
function restoreLeadingIndent(htmlLines: string[], plainLines: string[]): string[] {
  const count = Math.max(htmlLines.length, plainLines.length);
  const out: string[] = [];
  for (let i = 0; i < count; i += 1) {
    const html = htmlLines[i] ?? '';
    const plain = plainLines[i] ?? '';
    const need = leadingWs(plain);
    const have = leadingWs(htmlLinePlainText(html));
    if (need.length > have.length) {
      out.push(escapeCodeText(need.slice(have.length)) + html);
    } else {
      out.push(html);
    }
  }
  return out;
}

/** Split highlighted code HTML into per-line HTML fragments (preserves hljs spans). */
export function splitHighlightedCodeBlockIntoLines(block: HTMLElement): string[] {
  const nodes: LineSplitNode[] = [];
  for (const child of block.childNodes) {
    const parsed = domNodeToLineSplitNodes(child);
    if (parsed) nodes.push(parsed);
  }
  const htmlLines = splitLineSplitNodesIntoLines(nodes);
  return restoreLeadingIndent(htmlLines, blockPlainLines(block));
}

function buildPagedCodeLines(codeRoot: HTMLElement, block: HTMLElement): void {
  const pre = codeRoot.querySelector('pre');
  const code = pre?.querySelector('code');
  if (!pre || !code) return;

  const lineHtml = splitHighlightedCodeBlockIntoLines(block);
  const linesHost = document.createElement('div');
  linesHost.className = 'export-pdf-code-lines';

  lineHtml.forEach((html, index) => {
    const row = document.createElement('div');
    row.className = 'export-pdf-code-line';

    const gutter = document.createElement('span');
    gutter.className = 'export-pdf-code-gutter';
    gutter.setAttribute('aria-hidden', 'true');
    gutter.textContent = String(index + 1);

    const content = document.createElement('span');
    content.className = 'export-pdf-code-content';
    content.innerHTML = html || '\u00a0';

    row.append(gutter, content);
    linesHost.append(row);
  });

  // Replace <pre>/<code> with divs. paged.js treats PRE as a non-container and
  // often crashes in createBreakToken (findElement on null) on tall PRE trees.
  const preReplacement = document.createElement('div');
  preReplacement.className = 'export-pdf-code-pre';
  const codeReplacement = document.createElement('div');
  codeReplacement.className = 'export-pdf-code-body export-pdf-code-paged';
  for (const cls of code.classList) {
    if (cls && cls !== 'export-pdf-code-paged') codeReplacement.classList.add(cls);
  }
  codeReplacement.append(linesHost);
  preReplacement.append(codeReplacement);
  pre.replaceWith(preReplacement);
  codeRoot.classList.add('export-pdf-code-paged');
}

/** Transform `.md-editor-code` nodes inside a paged.js source root. */
export function prepareExportPdfCodeBlocksForPaging(root: ParentNode): void {
  const blocks = root.querySelectorAll<HTMLElement>('.md-editor-code');
  let codeBlockId = 0;
  for (const codeRoot of blocks) {
    // Never turn Mermaid chart hosts into paged fence lines.
    if (
      codeRoot.classList.contains('md-editor-mermaid') ||
      codeRoot.classList.contains('haim-mermaid-block')
    ) {
      continue;
    }
    const content = codeRoot.querySelector<HTMLElement>('.md-editor-code-block');
    if (!content) continue;
    codeBlockId += 1;
    codeRoot.setAttribute('data-export-pdf-code-id', String(codeBlockId));
    buildPagedCodeLines(codeRoot, content);
  }
}

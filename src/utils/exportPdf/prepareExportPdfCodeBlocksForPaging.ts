/**
 * Restructure fenced code blocks for paged.js:
 * - one flex row per source line (gutter + highlighted content)
 * - long lines wrap via pre-wrap
 * - rows may flow across pages; line numbers stay with each row
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
        if (parts[i]) append(lineIndex, escapeHtml(parts[i]!));
      }
      return lineIndex;
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
    const endsWithNewline = nodes.some(
      (node) => node.kind === 'text' && node.value.endsWith('\n'),
    );
    if (endsWithNewline) lines.pop();
  }

  if (lines.length === 1 && lines[0] === '') return [''];
  return lines;
}

function domNodeToLineSplitNodes(node: Node): LineSplitNode | null {
  if (node.nodeType === Node.TEXT_NODE) {
    return { kind: 'text', value: node.textContent ?? '' };
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return null;

  const el = node as HTMLElement;
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

/** Split highlighted code HTML into per-line HTML fragments (preserves hljs spans). */
export function splitHighlightedCodeBlockIntoLines(block: HTMLElement): string[] {
  const nodes: LineSplitNode[] = [];
  for (const child of block.childNodes) {
    const parsed = domNodeToLineSplitNodes(child);
    if (parsed) nodes.push(parsed);
  }
  return splitLineSplitNodesIntoLines(nodes);
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

  code.classList.add('export-pdf-code-paged');
  code.replaceChildren(linesHost);
  codeRoot.classList.add('export-pdf-code-paged');
}

/** Transform `.md-editor-code` nodes inside a paged.js source root. */
export function prepareExportPdfCodeBlocksForPaging(root: ParentNode): void {
  const blocks = root.querySelectorAll<HTMLElement>('.md-editor-code');
  let codeBlockId = 0;
  for (const codeRoot of blocks) {
    const content = codeRoot.querySelector<HTMLElement>('.md-editor-code-block');
    if (!content) continue;
    codeBlockId += 1;
    codeRoot.setAttribute('data-export-pdf-code-id', String(codeBlockId));
    buildPagedCodeLines(codeRoot, content);
  }
}

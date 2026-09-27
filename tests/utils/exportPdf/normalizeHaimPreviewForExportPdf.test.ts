import { describe, expect, it } from 'vitest';
import {
  applyHaimPreviewExportPdfAliases,
  normalizeHaimPreviewForExportPdf,
} from '@/utils/exportPdf/normalizeHaimPreviewForExportPdf';

/**
 * Minimal ParentNode stand-in (unit env is node — no jsdom).
 * Supports the selectors used by normalizeHaimPreviewForExportPdf.
 */
type FakeEl = {
  className: string;
  classList: {
    contains: (name: string) => boolean;
    add: (...names: string[]) => void;
  };
  children: FakeEl[];
  tagName: string;
  attrs: Record<string, string>;
  setAttribute: (name: string, value: string) => void;
  hasAttribute: (name: string) => boolean;
  querySelector: (sel: string) => FakeEl | null;
  querySelectorAll: (sel: string) => FakeEl[];
};

function collectDescendants(root: FakeEl): FakeEl[] {
  const out: FakeEl[] = [];
  const walk = (el: FakeEl) => {
    for (const child of el.children) {
      out.push(child);
      walk(child);
    }
  };
  walk(root);
  return out;
}

function classSel(sel: string): string | null {
  const t = sel.trim();
  if (t.startsWith('.') && !t.includes(' ') && !t.includes(',')) return t.slice(1);
  return null;
}

function fakeEl(tagName: string, className = ''): FakeEl {
  const classes = new Set(className.split(/\s+/).filter(Boolean));
  const attrs: Record<string, string> = {};
  const node: FakeEl = {
    tagName: tagName.toUpperCase(),
    className,
    classList: {
      contains: (name) => classes.has(name),
      add: (...names) => {
        for (const n of names) classes.add(n);
        node.className = [...classes].join(' ');
      },
    },
    children: [],
    attrs,
    setAttribute: (name, value) => {
      attrs[name] = value;
    },
    hasAttribute: (name) => Object.prototype.hasOwnProperty.call(attrs, name),
    querySelector(sel) {
      return node.querySelectorAll(sel)[0] ?? null;
    },
    querySelectorAll(sel) {
      const desc = collectDescendants(node);
      const trimmed = sel.trim();

      if (trimmed === 'pre code') {
        return desc.filter(
          (el) =>
            el.tagName === 'CODE' &&
            el !== node &&
            // parent chain includes PRE
            (() => {
              // Walk up via children ownership: find pre among ancestors by scanning
              // parents isn't stored; check any PRE descendant that has this CODE
              return desc.some(
                (pre) =>
                  pre.tagName === 'PRE' &&
                  pre.children.includes(el),
              );
            })(),
        );
      }

      if (trimmed.includes(',')) {
        const parts = trimmed.split(',').map((s) => s.trim());
        const seen = new Set<FakeEl>();
        const out: FakeEl[] = [];
        for (const part of parts) {
          for (const el of node.querySelectorAll(part)) {
            if (!seen.has(el)) {
              seen.add(el);
              out.push(el);
            }
          }
        }
        return out;
      }

      const cls = classSel(trimmed);
      if (cls) return desc.filter((el) => el.classList.contains(cls));

      const tag = trimmed.toUpperCase();
      return desc.filter((el) => el.tagName === tag);
    },
  };
  return node;
}

function append(parent: FakeEl, child: FakeEl): void {
  parent.children.push(child);
}

function makeHaimFixture(): FakeEl {
  const root = fakeEl('div', 'export-pdf-paged-source haim-markdown-preview');

  const codeBlock = fakeEl('div', 'haim-code-block');
  const pre = fakeEl('pre');
  const code = fakeEl('code', 'language-js');
  append(pre, code);
  append(codeBlock, pre);
  append(root, codeBlock);

  const mermaid = fakeEl('div', 'haim-code-block haim-mermaid-block');
  const chart = fakeEl('div', 'haim-mermaid-block__chart');
  const svg = fakeEl('svg');
  append(chart, svg);
  append(mermaid, chart);
  append(root, mermaid);

  return root;
}

describe('normalizeHaimPreviewForExportPdf', () => {
  it('adds md-editor-* aliases on Haim code and mermaid blocks', () => {
    const root = makeHaimFixture();
    normalizeHaimPreviewForExportPdf(root as unknown as ParentNode);

    const code = root.children[0]!;
    expect(code.classList.contains('md-editor-code')).toBe(true);
    const codeEl = code.children[0]!.children[0]!;
    expect(codeEl.classList.contains('md-editor-code-block')).toBe(true);

    const mermaid = root.children[1]!;
    expect(mermaid.classList.contains('md-editor-mermaid')).toBe(true);
    expect(mermaid.hasAttribute('data-processed')).toBe(true);
  });

  it('is a no-op for legacy md-editor-only DOM', () => {
    const root = fakeEl('div');
    const code = fakeEl('div', 'md-editor-code');
    const pre = fakeEl('pre');
    const inner = fakeEl('code', 'md-editor-code-block');
    append(pre, inner);
    append(code, pre);
    append(root, code);

    const before = `${code.className}|${inner.className}`;
    normalizeHaimPreviewForExportPdf(root as unknown as ParentNode);
    expect(`${code.className}|${inner.className}`).toBe(before);
  });

  it('applyHaimPreviewExportPdfAliases is idempotent', () => {
    const root = makeHaimFixture();
    applyHaimPreviewExportPdfAliases(root as unknown as ParentNode);
    applyHaimPreviewExportPdfAliases(root as unknown as ParentNode);
    expect(root.children[0]!.classList.contains('md-editor-code')).toBe(true);
    expect(root.children[1]!.classList.contains('md-editor-mermaid')).toBe(true);
  });
});

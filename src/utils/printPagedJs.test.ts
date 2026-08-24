import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { renderAppMarkdown } from '@/utils/createAppMarkdownIt';
import { assignPrintHeadingIds } from '@/utils/printHeadingIds';

const fixtureDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../test/fixtures');
const simpleMarkdown = readFileSync(path.join(fixtureDir, 'simple.md'), 'utf8');

describe('simple.md fixture', () => {
  it('renders to preview HTML with heading id', () => {
    const preview = document.createElement('div');
    preview.className = 'md-editor-preview';
    preview.innerHTML = renderAppMarkdown(simpleMarkdown, 'preview');
    assignPrintHeadingIds(preview);

    expect(preview.querySelector('h1')?.textContent).toBe('Hello');
    expect(preview.querySelector('h1')?.id).toBe('pdf-ex-heading-1');
    expect(preview.querySelector('p')?.textContent).toBe('Plain paragraph.');
  });

  it('renders without empty block nodes that break Paged.js', () => {
    const preview = document.createElement('div');
    preview.className = 'md-editor-preview';
    preview.innerHTML = renderAppMarkdown(simpleMarkdown, 'preview');

    const emptyBlocks = [...preview.querySelectorAll('p, div, span')].filter(
      (el) => !el.textContent?.trim() && el.children.length === 0,
    );
    expect(emptyBlocks).toEqual([]);

    const comments: Comment[] = [];
    const walker = document.createTreeWalker(preview, NodeFilter.SHOW_COMMENT);
    while (walker.nextNode()) comments.push(walker.currentNode as Comment);
    expect(comments).toEqual([]);
  });
});

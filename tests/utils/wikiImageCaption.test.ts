import { describe, expect, it } from 'vitest';
import MarkdownIt from 'markdown-it';
import { wikiImagePlugin } from '@/utils/wikiImageMarkdownIt';

function render(mdSrc: string): string {
  const md = new MarkdownIt({ html: false, breaks: false, linkify: false });
  md.use(wikiImagePlugin);
  return md.render(mdSrc);
}

describe('wikiImageMarkdownIt captions', () => {
  it('folds adjacent-paragraph caption into figure (6→6 token fix)', () => {
    // Blank line → two paragraphs; fold must apply even when token count stays 6
    const html = render('![[photos/a.png]]\n\nA scenic view\n');
    expect(html).toContain('<figure>');
    expect(html).toContain('<figcaption>');
    expect(html).toContain('A scenic view');
    expect(html).toContain('data-wiki-path="photos/a.png"');
  });

  it('folds same-paragraph softbreak caption into figure', () => {
    const html = render('![[photos/b.png]]\nSoft caption\n');
    expect(html).toContain('<figure>');
    expect(html).toContain('<figcaption>');
    expect(html).toContain('Soft caption');
  });
});

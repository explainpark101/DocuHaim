import { describe, expect, it } from 'vitest';
import {
  EDITOR_TYPE_HAIM,
  EDITOR_TYPE_MD_EDITOR_RT,
  editorTypeLabel,
  isEditorTypeId,
} from '@/utils/editorTypeSettings';
import {
  joinMetaPrefix,
  splitLeadingMetaComments,
} from '@/components/haimEditor/metaCommentGuard';
import {
  protectCustomMarkdown,
  restoreCustomMarkdown,
} from '@/components/haimEditor/protectCustomMarkdown';

describe('editorTypeSettings', () => {
  it('accepts haim and md-editor-rt', () => {
    expect(isEditorTypeId(EDITOR_TYPE_HAIM)).toBe(true);
    expect(isEditorTypeId(EDITOR_TYPE_MD_EDITOR_RT)).toBe(true);
    expect(isEditorTypeId('novel')).toBe(false);
  });

  it('uses product display names', () => {
    expect(editorTypeLabel(EDITOR_TYPE_MD_EDITOR_RT)).toBe('기존 에디터');
    expect(editorTypeLabel(EDITOR_TYPE_HAIM)).toBe('Haim Editor');
  });
});

describe('metaCommentGuard', () => {
  it('splits leading vault meta comments', () => {
    const md = `<!-- note-cover {"v":1} -->\n<!-- document-settings {"v":1} -->\n\n# Hello\n`;
    const { prefix, body } = splitLeadingMetaComments(md);
    expect(prefix).toContain('note-cover');
    expect(prefix).toContain('document-settings');
    expect(body.trimStart().startsWith('# Hello')).toBe(true);
    expect(joinMetaPrefix(prefix, body)).toContain('# Hello');
  });

  it('preserves remote-image leading meta', () => {
    const md = `<!-- remote-image {"v":1} -->\n\nBody\n`;
    const { prefix, body } = splitLeadingMetaComments(md);
    expect(prefix).toContain('remote-image');
    expect(body.trimStart().startsWith('Body')).toBe(true);
  });
});

describe('protectCustomMarkdown', () => {
  it('round-trips wiki images and pgbr', () => {
    const src = 'Hello\n\n![[img/a.png|w=50%]]\n\n<pgbr/>\n\nDone\n';
    const protectedMd = protectCustomMarkdown(src);
    expect(protectedMd).toContain('data-wiki-path');
    expect(protectedMd).toContain('img/a.png');
    expect(protectedMd).toContain('<pgbr/>');
    const restored = restoreCustomMarkdown(protectedMd);
    expect(restored).toContain('![[img/a.png|w=50%]]');
    expect(restored).toContain('<pgbr/>');
  });

  it('folds wiki image caption into figure and restores next-line caption', () => {
    const src = '![[photos/a.png|w=320px]]\nA scenic view\n';
    const protectedMd = protectCustomMarkdown(src);
    expect(protectedMd).toContain('data-haim-wiki-figure');
    expect(protectedMd).toContain('<figcaption>');
    expect(protectedMd).toContain('A scenic view');
    const restored = restoreCustomMarkdown(protectedMd);
    expect(restored).toContain('![[photos/a.png|w=320px]]');
    expect(restored).toContain('A scenic view');
    expect(restored).not.toContain('data-haim-wiki-figure');
  });

  it('folds caption after a blank line (adjacent paragraph)', () => {
    const src = '![[photos/b.png]]\n\nCaption with **stars**\n';
    const protectedMd = protectCustomMarkdown(src);
    expect(protectedMd).toContain('data-haim-wiki-figure');
    expect(protectedMd).toContain('<strong>stars</strong>');
    const restored = restoreCustomMarkdown(protectedMd);
    expect(restored).toMatch(/!\[\[photos\/b\.png\]\]\nCaption with \*\*stars\*\*/);
  });

  it('renders markdown links inside wiki image captions (not escaped text)', () => {
    const url = 'https://example.com/path?tkn=secret';
    const src = `![[photos/c.png]]\n[${url}](${url})\n`;
    const protectedMd = protectCustomMarkdown(src);
    expect(protectedMd).toContain('data-haim-wiki-figure');
    expect(protectedMd).toContain(`<a href="${url}">`);
    expect(protectedMd).not.toContain(`&lt;`);
    expect(protectedMd).not.toMatch(
      new RegExp(`\\[${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\]\\(`),
    );
    const restored = restoreCustomMarkdown(protectedMd);
    expect(restored).toContain(`![[photos/c.png]]`);
    expect(restored).toContain(`[${url}](${url})`);
  });

  it('does not treat a following heading as a caption', () => {
    const src = '![[photos/c.png]]\n\n# Next section\n';
    const protectedMd = protectCustomMarkdown(src);
    expect(protectedMd).not.toContain('data-haim-wiki-figure');
    expect(protectedMd).toContain('# Next section');
  });

  it('leaves plain mermaid fences for TipTap codeBlock chart view', () => {
    const src = '```mermaid\ngraph TD\nA-->B\n```\n';
    const protectedMd = protectCustomMarkdown(src);
    expect(protectedMd).toContain('```mermaid');
    expect(protectedMd).not.toContain('data-kind="mermaid"');
  });

  it('keeps mermaid-size comment + fence as raw block', () => {
    const src =
      '<!-- mermaid-size w=50% -->\n```mermaid\ngraph TD\nA-->B\n```\n';
    const protectedMd = protectCustomMarkdown(src);
    expect(protectedMd).toContain('data-kind="mermaid"');
    expect(restoreCustomMarkdown(protectedMd)).toContain('```mermaid');
  });

  it('wraps haim-table comment blocks', () => {
    const src =
      '<!-- haim-table {"v":1} -->\n| a | b |\n|---|---|\n| 1 | 2 |\n\nNext\n';
    const protectedMd = protectCustomMarkdown(src);
    expect(protectedMd).toContain('data-kind="haim-table"');
    const restored = restoreCustomMarkdown(protectedMd);
    expect(restored).toContain('haim-table');
    expect(restored).toContain('| a | b |');
  });

  it('wraps plan frontmatter', () => {
    const src = '---\ntitle: x\n---\n\n# Body\n';
    const protectedMd = protectCustomMarkdown(src);
    expect(protectedMd).toContain('data-kind="plan-frontmatter"');
    const restored = restoreCustomMarkdown(protectedMd);
    expect(restored.startsWith('---')).toBe(true);
    expect(restored).toContain('# Body');
  });

  it('maps deep headings', () => {
    const src = '####### Deep\n';
    const protectedMd = protectCustomMarkdown(src);
    expect(protectedMd).toContain('data-heading-level="7"');
    expect(restoreCustomMarkdown(protectedMd)).toContain('####### Deep');
  });

  it('restores legacy @@@haim-raw sentinels', () => {
    const legacy =
      '@@@haim-raw:mermaid\n```mermaid\ngraph TD\nA-->B\n```\n@@@/haim-raw\n';
    expect(restoreCustomMarkdown(legacy)).toContain('```mermaid');
  });

  it('leaves $$ display math as dollars for TipTap tokenizers', () => {
    const src = 'Before\n\n$$\nE = mc^2\n$$\n\nAfter\n';
    const protectedMd = protectCustomMarkdown(src);
    expect(protectedMd).toContain('$$\nE = mc^2\n$$');
    expect(protectedMd).not.toContain('data-type="block-math"');
    expect(restoreCustomMarkdown(protectedMd)).toContain('E = mc^2');
  });

  it('leaves $ inline math as dollars for TipTap tokenizers', () => {
    const src = 'Energy $E=mc^2$ is famous.\n';
    const protectedMd = protectCustomMarkdown(src);
    expect(protectedMd).toContain('$E=mc^2$');
    expect(protectedMd).not.toContain('data-type="inline-math"');
    expect(restoreCustomMarkdown(protectedMd)).toContain('$E=mc^2$');
  });

  it('does not rewrite currency-like $100$ during protect', () => {
    const src = 'Price $100$ only.\n';
    const protectedMd = protectCustomMarkdown(src);
    expect(protectedMd).not.toContain('data-type="inline-math"');
    expect(protectedMd).toContain('$100$');
  });

  it('does not rewrite $ inside inline or fenced code during protect', () => {
    const inlineSrc = 'Use `$x$` for vars and $y$ outside.\n';
    const inlineProtected = protectCustomMarkdown(inlineSrc);
    expect(inlineProtected).toContain('`$x$`');
    expect(inlineProtected).toContain('$y$');
    expect(inlineProtected).not.toContain('data-type="inline-math"');

    const fenceSrc = '```js\nconst s = "$x$";\n```\n\nReal $a$\n';
    const fenceProtected = protectCustomMarkdown(fenceSrc);
    expect(fenceProtected).toContain('const s = "$x$";');
    expect(fenceProtected).toContain('$a$');
    expect(fenceProtected).not.toContain('data-type="inline-math"');
  });

  it('does not swallow blockquote markers into math when protecting', () => {
    const src = '> $$\n> E=mc^2\n> $$\n';
    const protectedMd = protectCustomMarkdown(src);
    expect(protectedMd).toContain('> $$');
    expect(protectedMd).toContain('> E=mc^2');
    expect(protectedMd).not.toContain('data-type="block-math"');
    expect(protectedMd).not.toMatch(/data-latex=">/);
  });

  it('restores legacy math HTML from insertContent / older protects', () => {
    const legacy =
      'Energy <span data-type="inline-math" data-latex="E=mc^2"></span>\n';
    expect(restoreCustomMarkdown(legacy)).toContain('$E=mc^2$');
    const legacyBlock =
      '<div data-type="block-math" data-latex="E = mc^2"></div>\n';
    expect(restoreCustomMarkdown(legacyBlock)).toContain('$$\nE = mc^2\n$$');
  });

  it('restores math HTML attrs that escape > and newlines', () => {
    const legacy =
      '<span data-type="inline-math" data-latex="a &gt; b"></span>\n';
    expect(restoreCustomMarkdown(legacy)).toContain('$a > b$');
    const legacyBlock =
      '<div data-type="block-math" data-latex="x &gt; 0&#10;y &lt; 1"></div>\n';
    expect(restoreCustomMarkdown(legacyBlock)).toContain('x > 0\ny < 1');
  });
});

describe('scrubEmptyParagraphNbsp', () => {
  it('removes TipTap empty-paragraph &nbsp; lines from vault markdown', async () => {
    const { scrubEmptyParagraphNbsp } = await import(
      '@/components/haimEditor/markdownIo'
    );
    const dirty = 'Hello\n\n&nbsp;\n\nWorld\n\n\u00A0\n';
    const clean = scrubEmptyParagraphNbsp(dirty);
    expect(clean).not.toContain('&nbsp;');
    expect(clean).not.toContain('\u00A0');
    expect(clean).toContain('Hello');
    expect(clean).toContain('World');
  });
});

describe('HaimMarkdown serialize preserves raw text', () => {
  it('does not backslash-escape underscores, asterisks, or brackets', async () => {
    const { Editor } = await import('@tiptap/core');
    const StarterKit = (await import('@tiptap/starter-kit')).default;
    const { HaimMarkdown } = await import(
      '@/components/haimEditor/extensions/HaimMarkdown'
    );

    const src = 'hello_world use * for multiply array[0] a < b Tom & Jerry';
    const ed = new Editor({
      extensions: [StarterKit, HaimMarkdown],
      content: src,
      contentType: 'markdown',
    });
    try {
      const out = ed.getMarkdown();
      expect(out).toContain('hello_world');
      expect(out).toContain('use * for multiply');
      expect(out).toContain('array[0]');
      expect(out).not.toMatch(/hello\\_world/);
      expect(out).not.toContain('\\*');
      expect(out).not.toContain('\\[');
      expect(out).toContain('a < b');
      expect(out).toContain('Tom & Jerry');
      expect(out).not.toContain('&lt;');
      expect(out).not.toContain('&amp;');
    } finally {
      ed.destroy();
    }
  });
});

describe('markdownToEditorContent note-cover', () => {
  it('injects note-cover placeholder when leading meta has note-cover', async () => {
    const { markdownToEditorContent } = await import(
      '@/components/haimEditor/markdownIo'
    );
    const md = `<!-- note-cover\n{"v":2,"enabled":true}\n-->\n\n# Title\n`;
    const { prefix, content } = markdownToEditorContent(md);
    expect(prefix).toContain('note-cover');
    expect(content).toContain('data-note-cover-placeholder');
    expect(content).toContain('data-note-cover-mount');
    expect(content).toContain('# Title');
  });
});

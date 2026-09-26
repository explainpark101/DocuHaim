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
    expect(protectedMd).toContain('data-haim-wiki-image');
    expect(protectedMd).toContain('<pgbr>');
    const restored = restoreCustomMarkdown(protectedMd);
    expect(restored).toContain('![[img/a.png|w=50%]]');
    expect(restored).toContain('<pgbr/>');
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

  it('maps $$ display math to TipTap block-math HTML', () => {
    const src = 'Before\n\n$$\nE = mc^2\n$$\n\nAfter\n';
    const protectedMd = protectCustomMarkdown(src);
    expect(protectedMd).toContain('data-type="block-math"');
    expect(protectedMd).toContain('data-latex="E = mc^2"');
    expect(protectedMd).not.toContain('data-kind="math-display"');
    const restored = restoreCustomMarkdown(protectedMd);
    expect(restored).toContain('$$');
    expect(restored).toContain('E = mc^2');
  });

  it('maps $ inline math to TipTap inline-math HTML', () => {
    const src = 'Energy $E=mc^2$ is famous.\n';
    const protectedMd = protectCustomMarkdown(src);
    expect(protectedMd).toContain('data-type="inline-math"');
    expect(protectedMd).toContain('data-latex="E=mc^2"');
    expect(restoreCustomMarkdown(protectedMd)).toContain('$E=mc^2$');
  });

  it('does not treat currency-like $100$ as inline math', () => {
    const src = 'Price $100$ only.\n';
    const protectedMd = protectCustomMarkdown(src);
    expect(protectedMd).not.toContain('data-type="inline-math"');
    expect(protectedMd).toContain('$100$');
  });
});

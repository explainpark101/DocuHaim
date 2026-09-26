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

  it('wraps mermaid fences in sentinels', () => {
    const src = '```mermaid\ngraph TD\nA-->B\n```\n';
    const protectedMd = protectCustomMarkdown(src);
    expect(protectedMd).toContain('@@@haim-raw:mermaid');
    expect(restoreCustomMarkdown(protectedMd)).toContain('```mermaid');
  });

  it('maps deep headings', () => {
    const src = '####### Deep\n';
    const protectedMd = protectCustomMarkdown(src);
    expect(protectedMd).toContain('data-heading-level="7"');
    expect(restoreCustomMarkdown(protectedMd)).toContain('####### Deep');
  });
});

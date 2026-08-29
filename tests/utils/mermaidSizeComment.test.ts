import { describe, expect, it } from 'vitest';
import {
  findMermaidFenceOccurrenceBySource,
  findPrecedingMermaidSizeComment,
  mergeMermaidFenceSize,
  parseMermaidSizeCommentAttrs,
  serializeMermaidSizeComment,
  upsertMermaidSizeInMarkdown,
} from '@/utils/mermaidSizeComment';

describe('mermaidSizeComment', () => {
  it('parses width/height attrs', () => {
    expect(parseMermaidSizeCommentAttrs('width="420px" height="200px"')).toEqual({
      width: '420px',
      height: '200px',
    });
    expect(parseMermaidSizeCommentAttrs('w="100" h="50px"')).toEqual({
      width: '100px',
      height: '50px',
    });
  });

  it('serializes canonical comment', () => {
    expect(
      serializeMermaidSizeComment({ width: '420px', height: '200px' }),
    ).toBe('<!-- mermaid-size width="420px" height="200px" -->');
  });

  it('merges comment over fence info', () => {
    expect(
      mergeMermaidFenceSize('mermaid width=100px height=80px', {
        width: '420px',
        height: null,
      }),
    ).toEqual({
      width: '420px',
      height: '80px',
    });
  });

  it('upserts comment before fence and strips fence info size', () => {
    const md = [
      '```mermaid width=100px',
      'A --> B',
      '```',
    ].join('\n');
    const next = upsertMermaidSizeInMarkdown(md, {
      occurrence: 0,
      width: '300px',
      height: '150px',
    });
    expect(next.updated).toBe(true);
    expect(next.markdown).toContain('<!-- mermaid-size width="300px" height="150px" -->');
    expect(next.markdown).toContain('```mermaid\nA --> B');
    expect(next.markdown).not.toContain('width=100px');
    const preceding = findPrecedingMermaidSizeComment(
      next.markdown,
      next.markdown.indexOf('```mermaid'),
    );
    expect(preceding?.size).toEqual({ width: '300px', height: '150px' });
  });

  it('finds fence occurrence by mermaid source body', () => {
    const md = [
      '```mermaid',
      'A --> B',
      '```',
      '',
      '```mermaid',
      'C --> D',
      '```',
    ].join('\n');
    expect(findMermaidFenceOccurrenceBySource(md, 'C --> D')).toBe(1);
    expect(findMermaidFenceOccurrenceBySource(md, 'A --> B')).toBe(0);
  });

  it('replaces an existing sidecar comment', () => {
    const md = [
      '<!-- mermaid-size width="100px" height="80px" -->',
      '```mermaid',
      'A --> B',
      '```',
    ].join('\n');
    const next = upsertMermaidSizeInMarkdown(md, {
      occurrence: 0,
      width: '240px',
      height: '120px',
    });
    expect(next.updated).toBe(true);
    expect(next.markdown).not.toContain('width="100px"');
    expect(next.markdown).toContain('width="240px" height="120px"');
  });
});

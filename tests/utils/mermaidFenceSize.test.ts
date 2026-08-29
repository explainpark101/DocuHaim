import { describe, expect, it } from 'vitest';
import {
  buildMermaidFenceInfo,
  parseMermaidFenceInfoSize,
  updateMermaidFenceSizeInMarkdown,
} from '@/utils/mermaidFenceSize';

describe('mermaidFenceSize', () => {
  it('parses width/height tokens from fence info', () => {
    expect(parseMermaidFenceInfoSize('mermaid width=420px height=200')).toEqual({
      width: '420px',
      height: '200px',
    });
    expect(parseMermaidFenceInfoSize('mermaid 320x180')).toEqual({
      width: '320px',
      height: '180px',
    });
    expect(parseMermaidFenceInfoSize('mermaid w=100 h=50px')).toEqual({
      width: '100px',
      height: '50px',
    });
  });

  it('builds canonical fence info', () => {
    expect(buildMermaidFenceInfo({ width: '420px', height: '200px' })).toBe(
      'mermaid width=420px height=200px',
    );
    expect(buildMermaidFenceInfo({ width: null, height: null })).toBe('mermaid');
  });

  it('updates the Nth mermaid fence open line', () => {
    const md = [
      '```mermaid',
      'A --> B',
      '```',
      '',
      '```mermaid',
      'C --> D',
      '```',
      '',
    ].join('\n');
    const next = updateMermaidFenceSizeInMarkdown(md, {
      occurrence: 1,
      width: '300px',
      height: '150px',
    });
    expect(next.updated).toBe(true);
    expect(next.markdown).toContain('```mermaid width=300px height=150px\nC --> D');
    expect(next.markdown).toContain('```mermaid\nA --> B');
  });
});

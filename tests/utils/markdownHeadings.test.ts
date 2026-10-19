import { describe, expect, it } from 'vitest';
import {
  assignHeadingOutlineNumbers,
  detectMinOutlineStart,
  formatOutlineStartLabel,
  outlineStartSuffix,
  parseCustomOutlineStart,
  remapMarkdownHeadingLevels,
} from '@/utils/markdownHeadings';

describe('outline start numbers', () => {
  it('formats flat and nested suffixes from the target heading level', () => {
    expect(outlineStartSuffix('flat', 2)).toBe('.');
    expect(outlineStartSuffix('nested', 1)).toBe('.');
    expect(outlineStartSuffix('nested', 2)).toBe('.1.');
    expect(outlineStartSuffix('nested', 3)).toBe('.1.1.');
    expect(formatOutlineStartLabel(4, 'flat', 3)).toBe('4.');
    expect(formatOutlineStartLabel(4, 'nested', 2)).toBe('4.1.');
  });

  it('starts flat and nested outlines from any positive integer', () => {
    expect(assignHeadingOutlineNumbers([2, 2, 3], {
      style: 'flat',
      startNumber: 7,
      targetMax: 2,
    })).toEqual(['7. ', '8. ', '8.1. ']);

    expect(assignHeadingOutlineNumbers([2, 3, 2], {
      style: 'nested',
      startNumber: 4,
      targetMax: 2,
    })).toEqual(['4.1. ', '4.1.1. ', '4.2. ']);
  });

  it('uses the smallest first segment, not inner outline digits', () => {
    const markdown = [
      '## 8. Later',
      '### 8.1. Child',
      '## 3. Earlier',
      '## Plain',
    ].join('\n');
    expect(detectMinOutlineStart(markdown)).toBe(3);
    expect(detectMinOutlineStart('## Plain\n### Also plain')).toBeNull();
  });

  it('accepts a custom start only when it matches the active format', () => {
    expect(parseCustomOutlineStart('12', 'flat', 2)).toBe(12);
    expect(parseCustomOutlineStart('12.', 'flat', 2)).toBe(12);
    expect(parseCustomOutlineStart('12.1.', 'flat', 2)).toBeNull();

    expect(parseCustomOutlineStart('5', 'nested', 2)).toBe(5);
    expect(parseCustomOutlineStart('5.1.', 'nested', 2)).toBe(5);
    expect(parseCustomOutlineStart('5.2.3.', 'nested', 3)).toBe(5);
    expect(parseCustomOutlineStart('5.', 'nested', 2)).toBeNull();
    expect(parseCustomOutlineStart('0', 'flat', 1)).toBeNull();
  });

  it('renumbers markdown from a custom start', () => {
    const source = '## Old title\n### Nested\n## Next';
    expect(remapMarkdownHeadingLevels(source, 2, {
      renumberOutline: true,
      outlineStyle: 'nested',
      outlineStart: 3,
    })).toBe('## 3.1. Old title\n### 3.1.1. Nested\n## 3.2. Next');
  });
});

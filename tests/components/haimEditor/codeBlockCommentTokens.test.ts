import { describe, expect, it } from 'vitest';
import {
  normalizeCodeBlockLanguageId,
  resolveCodeBlockCommentTokens,
} from '@/components/haimEditor/codeBlockCommentTokens';

describe('codeBlockCommentTokens', () => {
  it('aliases js → javascript with //', () => {
    expect(normalizeCodeBlockLanguageId('js')).toBe('javascript');
    expect(resolveCodeBlockCommentTokens('js').line).toBe('//');
  });

  it('uses # for python and bash', () => {
    expect(resolveCodeBlockCommentTokens('python').line).toBe('#');
    expect(resolveCodeBlockCommentTokens('bash').line).toBe('#');
  });

  it('uses -- for sql and lua', () => {
    expect(resolveCodeBlockCommentTokens('sql').line).toBe('--');
    expect(resolveCodeBlockCommentTokens('lua').line).toBe('--');
  });

  it('uses block-only for css and xml', () => {
    expect(resolveCodeBlockCommentTokens('css').line).toBeUndefined();
    expect(resolveCodeBlockCommentTokens('css').block).toEqual({
      open: '/*',
      close: '*/',
    });
    expect(resolveCodeBlockCommentTokens('html').block).toEqual({
      open: '<!--',
      close: '-->',
    });
  });

  it('uses %% for mermaid', () => {
    expect(resolveCodeBlockCommentTokens('mermaid').line).toBe('%%');
  });

  it('defaults unknown / empty to //', () => {
    expect(resolveCodeBlockCommentTokens('').line).toBe('//');
    expect(resolveCodeBlockCommentTokens('unknownlang').line).toBe('//');
  });
});

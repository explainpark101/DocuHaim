import { describe, expect, it } from 'vitest';
import { rewriteWikiImagePathsInMarkdown } from '@/utils/unusedImageCleanup';

describe('rewriteWikiImagePathsInMarkdown', () => {
  it('rewrites all matching wiki image paths and keeps options', () => {
    const md = 'a ![[dup/a.png]] b ![[dup/b.png|320]]';
    const { markdown, updated } = rewriteWikiImagePathsInMarkdown(md, {
      'dup/a.png': 'keep/x.png',
      'dup/b.png': 'keep/x.png',
    });
    expect(updated).toBe(true);
    expect(markdown).toBe('a ![[keep/x.png]] b ![[keep/x.png|w=320px]]');
  });

  it('normalizes leading slashes when matching', () => {
    const { markdown, updated } = rewriteWikiImagePathsInMarkdown('![[/dup/a.png]]', {
      'dup/a.png': 'keep/x.png',
    });
    expect(updated).toBe(true);
    expect(markdown).toBe('![[keep/x.png]]');
  });

  it('leaves unrelated wiki images unchanged', () => {
    const md = '![[other.png]]';
    const { markdown, updated } = rewriteWikiImagePathsInMarkdown(md, {
      'dup/a.png': 'keep/x.png',
    });
    expect(updated).toBe(false);
    expect(markdown).toBe(md);
  });
});

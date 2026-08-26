import { describe, expect, it } from 'vitest';
import { getExt, getParentPathsToExpand } from '@/App/helpers';

describe('App/helpers', () => {
  describe('getParentPathsToExpand', () => {
    it('returns empty for nullish or empty parent', () => {
      expect(getParentPathsToExpand(null)).toEqual([]);
      expect(getParentPathsToExpand(undefined)).toEqual([]);
      expect(getParentPathsToExpand('')).toEqual([]);
    });

    it('expands nested folder paths with trailing slashes', () => {
      expect(getParentPathsToExpand('a/b/c')).toEqual(['a/', 'a/b/', 'a/b/c/']);
      expect(getParentPathsToExpand('notes/')).toEqual(['notes/']);
    });
  });

  describe('getExt', () => {
    it('returns empty for invalid names', () => {
      expect(getExt(null)).toBe('');
      expect(getExt('')).toBe('');
      expect(getExt('.gitignore')).toBe('');
    });

    it('returns the last extension including composite note suffixes', () => {
      expect(getExt('note.md')).toBe('.md');
      expect(getExt('secret.enc.md')).toBe('.md');
      expect(getExt('archive.tar.gz')).toBe('.gz');
    });
  });
});

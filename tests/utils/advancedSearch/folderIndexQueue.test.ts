import { describe, expect, it } from 'vitest';
import {
  enqueueFolderIndexPath,
  folderIndexRowTone,
  normalizeFolderIndexPath,
  removeFolderIndexPath,
} from '@/utils/advancedSearch/folderIndexQueue';

describe('normalizeFolderIndexPath', () => {
  it('strips slashes and backslashes', () => {
    expect(normalizeFolderIndexPath('/notes/work/')).toBe('notes/work');
    expect(normalizeFolderIndexPath('notes\\work')).toBe('notes/work');
  });
});

describe('enqueueFolderIndexPath', () => {
  it('appends new paths and skips duplicates / active', () => {
    expect(enqueueFolderIndexPath([], 'a')).toEqual(['a']);
    expect(enqueueFolderIndexPath(['a'], 'a')).toEqual(['a']);
    expect(enqueueFolderIndexPath(['a'], 'b')).toEqual(['a', 'b']);
    expect(enqueueFolderIndexPath(['a'], 'b', 'b')).toEqual(['a']);
  });
});

describe('removeFolderIndexPath', () => {
  it('removes by normalized path', () => {
    expect(removeFolderIndexPath(['a', 'b/c'], '/b/c/')).toEqual(['a']);
  });
});

describe('folderIndexRowTone', () => {
  it('prefers active over queued', () => {
    expect(folderIndexRowTone('a', 'a', ['a', 'b'])).toBe('active');
    expect(folderIndexRowTone('b', 'a', ['b'])).toBe('queued');
    expect(folderIndexRowTone('c', 'a', ['b'])).toBe('idle');
  });
});

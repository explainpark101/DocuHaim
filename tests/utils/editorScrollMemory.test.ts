import { describe, expect, it, beforeEach } from 'vitest';
import {
  clearAllEditorScrollMemory,
  clearEditorScroll,
  editorScrollMemoryKeyFromFile,
  recallEditorScroll,
  rememberEditorScroll,
} from '@/utils/editorScrollMemory';

describe('editorScrollMemory', () => {
  beforeEach(() => {
    clearAllEditorScrollMemory();
  });

  it('builds a stable key from currentFile', () => {
    expect(editorScrollMemoryKeyFromFile({ type: 's3', id: 'notes/a.md' })).toBe(
      's3:notes/a.md',
    );
    expect(editorScrollMemoryKeyFromFile(null)).toBeNull();
  });

  it('remembers and recalls a snapshot by key', () => {
    rememberEditorScroll('s3:a.md', {
      editorTop: 120,
      editorLeft: 0,
      previewTop: 80,
      previewLeft: 0,
    });
    expect(recallEditorScroll('s3:a.md')).toEqual({
      editorTop: 120,
      editorLeft: 0,
      previewTop: 80,
      previewLeft: 0,
    });
  });

  it('keeps per-file positions independent', () => {
    rememberEditorScroll('s3:a.md', {
      editorTop: 10,
      editorLeft: 0,
      previewTop: 20,
      previewLeft: 0,
    });
    rememberEditorScroll('s3:b.md', {
      editorTop: 99,
      editorLeft: 1,
      previewTop: 88,
      previewLeft: 2,
    });
    expect(recallEditorScroll('s3:a.md')?.editorTop).toBe(10);
    expect(recallEditorScroll('s3:b.md')?.editorTop).toBe(99);
  });

  it('clears one key without touching others', () => {
    rememberEditorScroll('s3:a.md', {
      editorTop: 1,
      editorLeft: 0,
      previewTop: 0,
      previewLeft: 0,
    });
    rememberEditorScroll('s3:b.md', {
      editorTop: 2,
      editorLeft: 0,
      previewTop: 0,
      previewLeft: 0,
    });
    clearEditorScroll('s3:a.md');
    expect(recallEditorScroll('s3:a.md')).toBeNull();
    expect(recallEditorScroll('s3:b.md')?.editorTop).toBe(2);
  });
});

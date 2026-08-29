import { describe, expect, it } from 'vitest';
import {
  FILE_INDEX_CHUNK_CHARS,
  countIndexChunksForLength,
  fileChunkDocId,
  orderFilePathsForIndexing,
  parseFileChunkIndex,
  splitTextIntoIndexChunks,
  vaultPathFromFileDocId,
} from '@/utils/advancedSearch/fileIndexChunking';

describe('fileIndexChunking', () => {
  it('splits long text near newlines', () => {
    const line = 'a'.repeat(1000);
    const text = Array.from({ length: 90 }, () => line).join('\n');
    const chunks = splitTextIntoIndexChunks(text, 10_000);
    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks.join('')).toBe(text);
    for (const chunk of chunks) {
      expect(chunk.length).toBeLessThanOrEqual(10_000);
    }
  });

  it('uses single doc id for one chunk', () => {
    expect(fileChunkDocId('notes/a.md', 0, 1)).toBe('file:notes/a.md');
    expect(fileChunkDocId('notes/a.md', 0, 3)).toBe('file:notes/a.md#c:0');
    expect(fileChunkDocId('notes/a.md', 2, 3)).toBe('file:notes/a.md#c:2');
  });

  it('parses vault path and chunk index from doc ids', () => {
    expect(vaultPathFromFileDocId('file:notes/a.md')).toBe('notes/a.md');
    expect(vaultPathFromFileDocId('file:notes/a.md#c:2')).toBe('notes/a.md');
    expect(parseFileChunkIndex('file:notes/a.md')).toBe(0);
    expect(parseFileChunkIndex('file:notes/a.md#c:2')).toBe(2);
  });

  it('counts chunks from length', () => {
    expect(countIndexChunksForLength(0)).toBe(1);
    expect(countIndexChunksForLength(FILE_INDEX_CHUNK_CHARS)).toBe(1);
    expect(countIndexChunksForLength(FILE_INDEX_CHUNK_CHARS + 1)).toBe(2);
  });

  it('orders small files before known large files', () => {
    const sizeMap = new Map<string, number>([
      ['big.log', 200_000],
      ['small.md', 100],
      ['mid.txt', 50_000],
    ]);
    const ordered = orderFilePathsForIndexing(
      ['big.log', 'small.md', 'mid.txt'],
      sizeMap,
    );
    expect(ordered[0]).toBe('small.md');
    expect(ordered[1]).toBe('mid.txt');
    expect(ordered[2]).toBe('big.log');
  });
});

import { describe, expect, test } from 'bun:test';
import { retrieveQuizContext, formatRagChunksForPrompt } from '@/utils/quiz/quizRagService';

describe('quizRagService', () => {
  test('returns empty chunks when sourcePaths empty', async () => {
    const result = await retrieveQuizContext({
      sourcePaths: [],
      query: 'MapReduce',
      readText: async () => 'unused',
    });
    expect(result.chunks).toEqual([]);
    expect(result.usedFallback).toBe(false);
  });

  test('ranks and truncates excerpts by query terms', async () => {
    const result = await retrieveQuizContext({
      sourcePaths: ['notes/a.md', 'notes/missing.md'],
      query: 'MapReduce shuffle',
      topK: 2,
      maxChars: 5000,
      readText: async (path) => {
        if (path === 'notes/a.md') {
          return [
            'Intro fluff without keywords. '.repeat(20),
            'MapReduce is a programming model. The shuffle stage moves data.',
            'More MapReduce content about shuffle and reduce.',
          ].join('\n\n');
        }
        throw new Error('missing');
      },
    });
    expect(result.chunks.length).toBeGreaterThan(0);
    expect(result.chunks[0]?.path).toBe('notes/a.md');
    expect((result.chunks[0]?.score || 0) >= 1).toBe(true);
  });

  test('formatRagChunksForPrompt includes path headers', () => {
    const text = formatRagChunksForPrompt([
      { path: 'notes/a.md', excerpt: 'hello' },
    ]);
    expect(text).toContain('[notes/a.md]');
    expect(text).toContain('hello');
  });
});

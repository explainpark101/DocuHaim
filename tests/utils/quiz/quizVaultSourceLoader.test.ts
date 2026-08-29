import { describe, expect, test } from 'bun:test';
import { loadQuizSourceTexts } from '@/utils/quiz/quizVaultSourceLoader';

describe('quizVaultSourceLoader', () => {
  test('skips failed reads and returns successful texts', async () => {
    const files = await loadQuizSourceTexts(
      ['ok.md', 'bad.md'],
      async (path) => {
        if (path === 'bad.md') throw new Error('fail');
        return `# ${path}\nbody`;
      },
    );
    expect(files).toEqual([{ path: 'ok.md', text: '# ok.md\nbody' }]);
  });
});

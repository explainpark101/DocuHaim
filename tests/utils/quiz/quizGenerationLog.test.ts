import { describe, expect, test } from 'vitest';
import {
  quizLogDirForQuizFile,
  quizLogFilePath,
  serializeQuizGenerationLogMarkdown,
} from '@/utils/quiz/quizGenerationLog';
import type { QuizGenJob } from '@/utils/quiz/quizGenerationQueueTypes';

describe('quizGenerationLog paths', () => {
  test('mirrors quiz file path under .quiz', () => {
    expect(quizLogDirForQuizFile('notes/ch1/exam.quiz.md')).toBe(
      '.quiz/notes/ch1/exam',
    );
    expect(quizLogFilePath('notes/ch1/exam.quiz.md', 'gen-123')).toBe(
      '.quiz/notes/ch1/exam/gen-123.md',
    );
  });
});

describe('serializeQuizGenerationLogMarkdown', () => {
  test('includes step instruction and response blocks', () => {
    const job: QuizGenJob = {
      id: 'job-1',
      kind: 'similar',
      questionLabel: '3',
      questionPreview: 'Sample question?',
      status: 'done',
      resultLabel: '3-유사1',
      resultQuestionId: 'gen-99',
      createdAt: Date.parse('2026-01-01T00:00:00.000Z'),
      steps: [
        {
          id: 'analysis',
          label: '문항 구조 분석',
          status: 'done',
          detail: 'Ohm law',
          llmInstruction: 'analyze this',
          llmResponse: '{"coreCategory":"Ohm"}',
          systemPrompt: 'JSON only',
        },
      ],
    };
    const md = serializeQuizGenerationLogMarkdown(job, 'course/a.quiz.md');
    expect(md).toContain('quiz file: course/a.quiz.md');
    expect(md).toContain('Instruction / input');
    expect(md).toContain('analyze this');
    expect(md).toContain('Model response / artifact');
    expect(md).toContain('{"coreCategory":"Ohm"}');
  });
});

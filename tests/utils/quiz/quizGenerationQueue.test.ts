import { describe, expect, it } from 'vitest';
import {
  buildSimilarJobSteps,
  patchQuizGenJobStep,
  type QuizGenJob,
} from '@/utils/quiz/quizGenerationQueueTypes';

function sampleJob(): QuizGenJob {
  return {
    id: 'job-1',
    kind: 'similar',
    questionPreview: 'preview',
    status: 'running',
    steps: buildSimilarJobSteps(false),
    createdAt: Date.now(),
  };
}

describe('patchQuizGenJobStep', () => {
  it('merges llmResponse without dropping prior fields on later updates', () => {
    const job = sampleJob();
    const running = patchQuizGenJobStep(job, {
      step: 'analysis',
      status: 'running',
      detail: 'working',
      llmInstruction: 'analyze this',
      systemPrompt: 'sys',
    });
    const done = patchQuizGenJobStep(running, {
      step: 'analysis',
      status: 'done',
      detail: 'ok',
      llmResponse: '{"coreCategory":"math"}',
    });
    const step = done.steps.find((s) => s.id === 'analysis');
    expect(step?.llmInstruction).toBe('analyze this');
    expect(step?.systemPrompt).toBe('sys');
    expect(step?.llmResponse).toBe('{"coreCategory":"math"}');
  });

  it('keeps llmResponse when a running update omits it', () => {
    const job = patchQuizGenJobStep(sampleJob(), {
      step: 'generate',
      status: 'done',
      llmResponse: '{"question":"hello"}',
      detail: 'done',
    });
    const runningAgain = patchQuizGenJobStep(job, {
      step: 'generate',
      status: 'running',
      detail: 'repairing',
    });
    const step = runningAgain.steps.find((s) => s.id === 'generate');
    expect(step?.llmResponse).toBe('{"question":"hello"}');
  });

  it('updates llmResponse on retry stream while keeping failureLog', () => {
    const job = patchQuizGenJobStep(sampleJob(), {
      step: 'generate',
      status: 'running',
      error: 'JSON 파싱 실패',
      failureLog: '### JSON parse failure (1/3)\n{"broken":',
      llmResponse: '{"broken":',
      detail: 'retry',
    });
    const retryStart = patchQuizGenJobStep(job, {
      step: 'generate',
      status: 'running',
      error: '',
      llmResponse: '',
      detail: '재시도 2/3',
    });
    const stepAfterRetryStart = retryStart.steps.find((s) => s.id === 'generate');
    expect(stepAfterRetryStart?.error).toBeUndefined();
    expect(stepAfterRetryStart?.failureLog).toContain('{"broken":');
    expect(stepAfterRetryStart?.llmResponse).toBe('');

    const streamingRetry = patchQuizGenJobStep(retryStart, {
      step: 'generate',
      status: 'running',
      detail: '재시도 2/3',
      llmResponse: '{"question":"partial stream',
    });
    const step = streamingRetry.steps.find((s) => s.id === 'generate');
    expect(step?.status).toBe('running');
    expect(step?.llmResponse).toBe('{"question":"partial stream');
    expect(step?.failureLog).toContain('{"broken":');
  });

  it('clears parse error and updates response on done', () => {
    const job = patchQuizGenJobStep(sampleJob(), {
      step: 'generate',
      status: 'running',
      error: 'JSON 파싱 실패',
      llmResponse: '{"broken":',
      detail: 'retrying',
    });
    const done = patchQuizGenJobStep(job, {
      step: 'generate',
      status: 'done',
      detail: 'ok',
      llmResponse: '{"question":"fixed"}',
    });
    const step = done.steps.find((s) => s.id === 'generate');
    expect(step?.error).toBeUndefined();
    expect(step?.llmResponse).toBe('{"question":"fixed"}');
  });
});

import { describe, expect, it } from 'vitest';
import {
  createLlmAssistAbortError,
  isLlmAssistAbortError,
  throwIfLlmAssistAborted,
} from '@/utils/llm/llmAssistAbort';

describe('llmAssistAbort', () => {
  it('detects AbortError from createLlmAssistAbortError', () => {
    const err = createLlmAssistAbortError();
    expect(isLlmAssistAbortError(err)).toBe(true);
  });

  it('throwIfLlmAssistAborted throws when aborted', () => {
    const controller = new AbortController();
    controller.abort(createLlmAssistAbortError());
    expect(() => throwIfLlmAssistAborted(controller.signal)).toThrow();
    try {
      throwIfLlmAssistAborted(controller.signal);
    } catch (err) {
      expect(isLlmAssistAbortError(err)).toBe(true);
    }
  });

  it('throwIfLlmAssistAborted is a no-op when not aborted', () => {
    const controller = new AbortController();
    expect(() => throwIfLlmAssistAborted(controller.signal)).not.toThrow();
  });
});

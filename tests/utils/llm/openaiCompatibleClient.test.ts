import { describe, expect, it } from 'vitest';
import { extractOpenAiCompletionText } from '@/utils/llm/openaiCompatibleClient';

describe('extractOpenAiCompletionText', () => {
  it('reads string message content', () => {
    expect(
      extractOpenAiCompletionText({
        choices: [{ message: { content: '{"ok":true}' } }],
      }),
    ).toBe('{"ok":true}');
  });

  it('reads multipart message content', () => {
    expect(
      extractOpenAiCompletionText({
        choices: [{ message: { content: [{ type: 'text', text: '{"a":1}' }] } }],
      }),
    ).toBe('{"a":1}');
  });
});

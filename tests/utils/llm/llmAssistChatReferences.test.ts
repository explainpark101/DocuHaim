import { describe, expect, it } from 'vitest';
import {
  formatLlmAssistReferenceBadge,
  offsetToLineNumber,
  parseLlmAssistDocumentKey,
  reorderLlmAssistChatReferences,
  resolveLineRangeFromMarkdown,
  createLlmAssistChatReference,
} from '@/utils/llm/llmAssistChatReferences';

describe('llmAssistChatReferences', () => {
  it('parses documentKey into path and fileName', () => {
    expect(parseLlmAssistDocumentKey('s3:notes/a/hello.md')).toEqual({
      path: 'notes/a/hello.md',
      fileName: 'hello.md',
    });
  });

  it('maps offsets to 1-based lines', () => {
    const doc = 'one\ntwo\nthree';
    expect(offsetToLineNumber(doc, 0)).toBe(1);
    expect(offsetToLineNumber(doc, 4)).toBe(2);
    expect(offsetToLineNumber(doc, doc.length)).toBe(3);
  });

  it('resolves line range from markdown offsets', () => {
    const doc = 'aaa\nbbb\nccc';
    expect(resolveLineRangeFromMarkdown(doc, 'bbb\nccc', 4, 11)).toEqual({
      lineStart: 2,
      lineEnd: 3,
    });
  });

  it('formats cursor-style badges', () => {
    const ref = createLlmAssistChatReference({
      text: 'hello',
      fileName: 'note.md',
      lineStart: 3,
      lineEnd: 5,
    });
    expect(ref).not.toBeNull();
    expect(formatLlmAssistReferenceBadge(ref!)).toBe('note.md:3-5');

    const fileRef = createLlmAssistChatReference({
      kind: 'file',
      text: 'one\ntwo',
      fileName: 'note.md',
      path: 'notes/note.md',
    });
    expect(fileRef).not.toBeNull();
    expect(formatLlmAssistReferenceBadge(fileRef!)).toBe('note.md · 전체');
    expect(fileRef!.lineStart).toBe(1);
    expect(fileRef!.lineEnd).toBe(2);
  });

  it('reorders references by id', () => {
    const a = createLlmAssistChatReference({ text: 'a', id: 'a' })!;
    const b = createLlmAssistChatReference({ text: 'b', id: 'b' })!;
    const c = createLlmAssistChatReference({ text: 'c', id: 'c' })!;
    expect(reorderLlmAssistChatReferences([a, b, c], 'c', 'a').map((r) => r.id)).toEqual([
      'c',
      'a',
      'b',
    ]);
  });
});

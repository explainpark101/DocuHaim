import { describe, expect, it } from 'vitest';
import {
  buildIndexedCoverage,
  isIndexedChatMessage,
  isIndexedFilePath,
} from '@/utils/advancedSearch/indexedCoverage';
import { emptyIndex } from '@/utils/advancedSearch/types';
import { fileDocId, chatDocId } from '@/utils/advancedSearch/paths';

describe('indexedCoverage', () => {
  it('tracks indexed file paths and chat messages for live-scan skip', () => {
    const index = emptyIndex();
    index.docs.set(fileDocId('notes/a.md'), {
      kind: 'file',
      path: 'notes/a.md',
      contentHash: '1',
    });
    index.docs.set(chatDocId('2026-01-01', 'msg-1'), {
      kind: 'chat',
      path: '.chat-with-myself/2026-01-01.md',
      contentHash: '2',
      dateStr: '2026-01-01',
      messageId: 'msg-1',
    });

    const coverage = buildIndexedCoverage(index);
    expect(isIndexedFilePath(coverage, 'notes/a.md')).toBe(true);
    expect(isIndexedFilePath(coverage, 'notes/b.md')).toBe(false);
    expect(isIndexedChatMessage(coverage, '2026-01-01', 'msg-1')).toBe(true);
    expect(isIndexedChatMessage(coverage, '2026-01-01', 'msg-2')).toBe(false);
  });
});

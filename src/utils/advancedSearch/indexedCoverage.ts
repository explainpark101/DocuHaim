import { chatDocId } from '@/utils/advancedSearch/paths';
import type { InMemoryIndex } from '@/utils/advancedSearch/types';

export type IndexedCoverage = {
  /** Vault-relative file paths present in the Lucivy index. */
  filePaths: ReadonlySet<string>;
  /** `dateStr:messageId` keys for indexed chat messages. */
  chatMessageKeys: ReadonlySet<string>;
};

function normalizeVaultPath(path: string): string {
  return String(path || '').replace(/^\/+/, '').replace(/\\/g, '/');
}

/** Paths/messages already covered by the inverted index (skip in live vault scan). */
export function buildIndexedCoverage(index: InMemoryIndex): IndexedCoverage {
  const filePaths = new Set<string>();
  const chatMessageKeys = new Set<string>();

  for (const [docId, meta] of index.docs) {
    if (meta.kind === 'file') {
      const path = normalizeVaultPath(meta.path);
      if (path) filePaths.add(path);
      continue;
    }

    const dateStr = meta.dateStr;
    const messageId = meta.messageId;
    if (dateStr && messageId) {
      chatMessageKeys.add(`${dateStr}:${messageId}`);
    }
    chatMessageKeys.add(docId);
    if (dateStr && messageId) {
      chatMessageKeys.add(chatDocId(dateStr, messageId));
    }
  }

  return { filePaths, chatMessageKeys };
}

export function isIndexedFilePath(coverage: IndexedCoverage, path: string): boolean {
  return coverage.filePaths.has(normalizeVaultPath(path));
}

export function isIndexedChatMessage(
  coverage: IndexedCoverage,
  dateStr: string,
  messageId: string,
): boolean {
  const id = String(messageId || '');
  const day = String(dateStr || '');
  if (!id || !day) return false;
  return (
    coverage.chatMessageKeys.has(`${day}:${id}`) ||
    coverage.chatMessageKeys.has(chatDocId(day, id))
  );
}

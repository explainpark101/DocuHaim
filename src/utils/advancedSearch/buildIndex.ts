import { parseDayFile } from '@/utils/chatWithMyself/format.js';
import { hashText } from './hash';
import { pathBasename, scrubTextForIndex } from './scrubText';
import { tokenizeForIndex, ensureGaru } from './tokenize';
import { chatDocId, fileDocId } from './paths';
import { recountManifest, type DocMeta, type InMemoryIndex } from './types';
import { chatDateFromPath } from './collectSources';
import type {
  ChatUpsertPatch,
  FileUpsertPatch,
} from './indexWorkerProtocol';

export type UpsertOptions = {
  /** Skip recountManifest (bulk rebuild should recount once at the end). */
  skipRecount?: boolean;
  /** Yield to the event loop every N chat messages (bulk rebuild). */
  yieldEvery?: number;
  yieldFn?: () => Promise<void>;
};

function removeDocFromPostings(
  postings: Map<string, Set<string>>,
  docId: string,
): void {
  for (const [term, set] of postings) {
    if (!set.delete(docId)) continue;
    if (set.size === 0) postings.delete(term);
  }
}

function addTermsToPostings(
  postings: Map<string, Set<string>>,
  docId: string,
  terms: string[],
): void {
  for (const term of terms) {
    let set = postings.get(term);
    if (!set) {
      set = new Set();
      postings.set(term, set);
    }
    set.add(docId);
  }
}

function previewFromText(text: string, max = 120): string {
  const t = String(text || '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max)}…`;
}

export async function upsertFileDocument(
  index: InMemoryIndex,
  path: string,
  content: string,
  options: UpsertOptions = {},
): Promise<boolean> {
  await ensureGaru();
  const docId = fileDocId(path);
  const contentHash = await hashText(content);
  const existing = index.docs.get(docId);
  if (existing?.contentHash === contentHash) return false;

  // Only scrub old postings when replacing an existing doc (avoid O(V) scan for new docs).
  if (existing) removeDocFromPostings(index.postings, docId);

  const scrubbed = scrubTextForIndex(content);
  const name = pathBasename(path);
  const terms = tokenizeForIndex(scrubbed.text, [
    ...scrubbed.extraTerms,
    name,
    path,
  ]);
  addTermsToPostings(index.postings, docId, terms);

  const meta: DocMeta = {
    kind: 'file',
    path,
    title: name,
    preview: previewFromText(scrubbed.text),
    contentHash,
  };
  index.docs.set(docId, meta);
  if (!options.skipRecount) recountManifest(index);
  return true;
}

export async function upsertChatDayDocuments(
  index: InMemoryIndex,
  dayPathOrDate: string,
  content: string,
  options: UpsertOptions = {},
): Promise<number> {
  await ensureGaru();
  const dateStr =
    chatDateFromPath(dayPathOrDate) ||
    (/^\d{4}-\d{2}-\d{2}$/.test(dayPathOrDate) ? dayPathOrDate : null);
  if (!dateStr) return 0;

  const { messages } = parseDayFile(content);
  let changed = 0;

  // Drop stale chat docs for this day that no longer exist
  for (const [docId, meta] of index.docs) {
    if (meta.kind !== 'chat' || meta.dateStr !== dateStr) continue;
    const still = messages.some((m: { id?: string }) => m.id === meta.messageId);
    if (!still) {
      removeDocFromPostings(index.postings, docId);
      index.docs.delete(docId);
      changed += 1;
    }
  }

  let msgIndex = 0;
  const yieldEvery = options.yieldEvery ?? 0;
  const yieldFn = options.yieldFn;
  for (const msg of messages) {
    msgIndex += 1;
    const messageId = String(msg.id || '');
    if (!messageId) continue;
    const docId = chatDocId(dateStr, messageId);

    const body = String(msg.body || '');
    const group = String(msg.group || '');
    const payload = `${group}\n${body}`;
    const contentHash = await hashText(payload);
    const existing = index.docs.get(docId);
    if (existing?.contentHash === contentHash) {
      if (yieldEvery > 0 && yieldFn && msgIndex % yieldEvery === 0) {
        await yieldFn();
      }
      continue;
    }

    if (existing) removeDocFromPostings(index.postings, docId);
    const scrubbed = scrubTextForIndex(body);
    const terms = tokenizeForIndex(
      `${group} ${scrubbed.text}`,
      scrubbed.extraTerms,
    );
    addTermsToPostings(index.postings, docId, terms);

    index.docs.set(docId, {
      kind: 'chat',
      path: `.chat-with-myself/${dateStr}.md`,
      title: group || 'chat',
      dateStr,
      messageId,
      group,
      preview: previewFromText(scrubbed.text || body),
      contentHash,
    });
    changed += 1;

    if (yieldEvery > 0 && yieldFn && msgIndex % yieldEvery === 0) {
      await yieldFn();
    }
  }

  if (changed > 0 && !options.skipRecount) recountManifest(index);
  return changed;
}

/**
 * Compute a file upsert patch without mutating an index (Worker incremental path).
 */
export async function computeFileUpsertPatch(
  path: string,
  content: string,
  existingHash?: string | null,
): Promise<FileUpsertPatch> {
  await ensureGaru();
  const docId = fileDocId(path);
  const contentHash = await hashText(content);
  if (existingHash && existingHash === contentHash) {
    return { changed: false, docId };
  }

  const scrubbed = scrubTextForIndex(content);
  const name = pathBasename(path);
  const terms = tokenizeForIndex(scrubbed.text, [
    ...scrubbed.extraTerms,
    name,
    path,
  ]);
  const meta: DocMeta = {
    kind: 'file',
    path,
    title: name,
    preview: previewFromText(scrubbed.text),
    contentHash,
  };
  return { changed: true, docId, meta, terms };
}

/**
 * Compute a chat-day upsert patch without mutating an index (Worker incremental).
 * `existingHashes` is docId → contentHash for chat docs already on this day.
 */
export async function computeChatUpsertPatch(
  dayPathOrDate: string,
  content: string,
  existingHashes: Record<string, string> = {},
): Promise<ChatUpsertPatch> {
  await ensureGaru();
  const dateStr =
    chatDateFromPath(dayPathOrDate) ||
    (/^\d{4}-\d{2}-\d{2}$/.test(dayPathOrDate) ? dayPathOrDate : null);
  if (!dateStr) {
    return {
      dateStr: null,
      changed: 0,
      keepDocIds: [],
      upserts: [],
      removedDocIds: [],
    };
  }

  const { messages } = parseDayFile(content);
  const keepDocIds: string[] = [];
  const upserts: ChatUpsertPatch['upserts'] = [];
  let changed = 0;

  for (const msg of messages) {
    const messageId = String(msg.id || '');
    if (!messageId) continue;
    const docId = chatDocId(dateStr, messageId);
    keepDocIds.push(docId);

    const body = String(msg.body || '');
    const group = String(msg.group || '');
    const payload = `${group}\n${body}`;
    const contentHash = await hashText(payload);
    if (existingHashes[docId] === contentHash) continue;

    const scrubbed = scrubTextForIndex(body);
    const terms = tokenizeForIndex(
      `${group} ${scrubbed.text}`,
      scrubbed.extraTerms,
    );
    upserts.push({
      docId,
      terms,
      meta: {
        kind: 'chat',
        path: `.chat-with-myself/${dateStr}.md`,
        title: group || 'chat',
        dateStr,
        messageId,
        group,
        preview: previewFromText(scrubbed.text || body),
        contentHash,
      },
    });
    changed += 1;
  }

  const keepSet = new Set(keepDocIds);
  const removedDocIds = Object.keys(existingHashes).filter((id) => !keepSet.has(id));
  changed += removedDocIds.length;

  return { dateStr, changed, keepDocIds, upserts, removedDocIds };
}

/** Apply a file patch produced by the Worker onto the main-thread index. */
export function applyFileUpsertPatch(
  index: InMemoryIndex,
  patch: FileUpsertPatch,
): boolean {
  if (!patch.changed || !patch.meta || !patch.terms) return false;
  if (index.docs.has(patch.docId)) {
    removeDocFromPostings(index.postings, patch.docId);
  }
  addTermsToPostings(index.postings, patch.docId, patch.terms);
  index.docs.set(patch.docId, patch.meta);
  recountManifest(index);
  return true;
}

/** Apply a chat-day patch produced by the Worker onto the main-thread index. */
export function applyChatUpsertPatch(
  index: InMemoryIndex,
  patch: ChatUpsertPatch,
): number {
  if (!patch.dateStr || patch.changed === 0) return 0;
  let applied = 0;

  for (const docId of patch.removedDocIds) {
    if (!index.docs.has(docId)) continue;
    removeDocFromPostings(index.postings, docId);
    index.docs.delete(docId);
    applied += 1;
  }

  for (const item of patch.upserts) {
    if (index.docs.has(item.docId)) {
      removeDocFromPostings(index.postings, item.docId);
    }
    addTermsToPostings(index.postings, item.docId, item.terms);
    index.docs.set(item.docId, item.meta);
    applied += 1;
  }

  if (applied > 0) recountManifest(index);
  return applied;
}

export function removeDocument(index: InMemoryIndex, docId: string): void {
  if (!index.docs.has(docId)) return;
  removeDocFromPostings(index.postings, docId);
  index.docs.delete(docId);
  recountManifest(index);
}

/**
 * Drop docs whose source path is no longer in the planned rebuild set.
 * Used when resuming a checkpoint after the vault tree changed.
 */
export function pruneIndexToPaths(
  index: InMemoryIndex,
  filePaths: string[],
  chatDayPaths: string[],
  options: { skipRecount?: boolean } = {},
): number {
  const files = new Set(filePaths);
  const chats = new Set(chatDayPaths);
  let removed = 0;
  for (const [docId, meta] of [...index.docs.entries()]) {
    if (meta.kind === 'file') {
      if (files.has(meta.path)) continue;
    } else {
      const dayPath =
        meta.path ||
        (meta.dateStr ? `.chat-with-myself/${meta.dateStr}.md` : '');
      if (dayPath && chats.has(dayPath)) continue;
    }
    removeDocFromPostings(index.postings, docId);
    index.docs.delete(docId);
    removed += 1;
  }
  if (removed > 0 && !options.skipRecount) recountManifest(index);
  return removed;
}

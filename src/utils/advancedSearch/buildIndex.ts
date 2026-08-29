import { parseDayFile } from '@/utils/chatWithMyself/format.js';
import { hashText } from '@/utils/advancedSearch/hash';
import { chatDocId, fileDocId } from '@/utils/advancedSearch/paths';
import { recountManifest, type DocMeta, type InMemoryIndex } from '@/utils/advancedSearch/types';
import { chatDateFromPath } from '@/utils/advancedSearch/collectSources';
import {
  allocateNumericId,
  getNumericId,
  releaseDocId,
  type DocIdMapState,
} from '@/utils/advancedSearch/docIdMap';
import type { LucivyDocFields } from '@/utils/advancedSearch/lucivyBackend';
import {
  prepareChatLucivyFieldsBatchOffThread,
  prepareFileLucivyFieldsOffThread,
} from '@/utils/advancedSearch/indexPrepWorker';
import { withIndexWriteLock } from '@/utils/advancedSearch/indexPathLock';
import { yieldToMain } from '@/utils/advancedSearch/yieldToMain';
import type { PreparedLucivyDoc } from '@/utils/advancedSearch/indexPrepWorker';

export type UpsertOptions = {
  /** Skip recountManifest (bulk rebuild should recount once at the end). */
  skipRecount?: boolean;
  /** Yield to the event loop every N chat messages (bulk rebuild). */
  yieldEvery?: number;
  yieldFn?: () => Promise<void>;
  /** When false, only update docs map (Lucivy already written). Default true. */
  writeLucivy?: boolean;
  /** Chat Lucivy upsert batch size (default 32). */
  lucivyBatchSize?: number;
};

const DEFAULT_CHAT_BATCH = 32;

async function lucivyApi() {
  return import('@/utils/advancedSearch/lucivyBackend');
}

async function removeLucivyNumericId(n: number) {
  const { lucivyRemove } = await lucivyApi();
  await lucivyRemove(n);
}

async function writeLucivyDoc(
  map: DocIdMapState,
  docId: string,
  fields: LucivyDocFields,
  existed: boolean,
): Promise<number> {
  const numericId = allocateNumericId(map, docId);
  const { lucivyAdd, lucivyUpdate } = await lucivyApi();
  if (existed) await lucivyUpdate(numericId, fields);
  else await lucivyAdd(numericId, fields);
  return numericId;
}

async function flushLucivyBatch(
  batch: Array<{
    numericId: number;
    fields: LucivyDocFields;
    update: boolean;
  }>,
): Promise<void> {
  if (batch.length === 0) return;
  const { lucivyUpsertBatch } = await lucivyApi();
  await lucivyUpsertBatch(batch);
  batch.length = 0;
}

export async function upsertFileDocument(
  index: InMemoryIndex,
  map: DocIdMapState,
  path: string,
  content: string,
  options: UpsertOptions = {},
): Promise<boolean> {
  const docId = fileDocId(path);
  const contentHash = await hashText(content);
  const existingEarly = index.docs.get(docId);
  if (existingEarly?.contentHash === contentHash) return false;

  // Prepare off-thread without holding the write lock (parallel workers).
  const prepared = await prepareFileLucivyFieldsOffThread(
    path,
    content,
    `${path}:${contentHash}`,
  );

  return withIndexWriteLock(async () => {
    const existing = index.docs.get(docId);
    if (existing?.contentHash === contentHash) return false;

    const writeLucivy = options.writeLucivy !== false;
    let numericId = existing?.numericId ?? getNumericId(map, docId) ?? undefined;
    if (writeLucivy) {
      numericId = await writeLucivyDoc(
        map,
        docId,
        prepared.fields,
        Boolean(existing),
      );
    } else if (numericId == null) {
      numericId = allocateNumericId(map, docId);
    }

    const meta: DocMeta = {
      kind: 'file',
      path,
      title: prepared.title,
      preview: prepared.preview,
      contentHash,
      numericId,
    };
    index.docs.set(docId, meta);
    index.manifest.nextNumericId = map.nextNumericId;
    if (!options.skipRecount) recountManifest(index);
    return true;
  });
}

export type PreparedFileUpsert = {
  path: string;
  contentHash: string;
  prepared: PreparedLucivyDoc;
  existed: boolean;
  skipped: boolean;
};

/**
 * Apply already-prepared file docs: update in-memory map + one Lucivy batch.
 * Used by Tauri parallel rebuild after concurrent read/prepare.
 */
export async function applyPreparedFileUpserts(
  index: InMemoryIndex,
  map: DocIdMapState,
  items: PreparedFileUpsert[],
  options: UpsertOptions = {},
): Promise<number> {
  return withIndexWriteLock(async () => {
    const writeLucivy = options.writeLucivy !== false;
    const lucivyBatch: Array<{
      numericId: number;
      fields: LucivyDocFields;
      update: boolean;
    }> = [];
    let changed = 0;

    for (const item of items) {
      if (item.skipped) continue;
      const docId = fileDocId(item.path);
      const existing = index.docs.get(docId);
      let numericId =
        existing?.numericId ?? getNumericId(map, docId) ?? undefined;
      if (writeLucivy) {
        numericId = allocateNumericId(map, docId);
        lucivyBatch.push({
          numericId,
          fields: item.prepared.fields,
          update: item.existed || Boolean(existing),
        });
      } else if (numericId == null) {
        numericId = allocateNumericId(map, docId);
      }
      index.docs.set(docId, {
        kind: 'file',
        path: item.path,
        title: item.prepared.title,
        preview: item.prepared.preview,
        contentHash: item.contentHash,
        numericId: numericId!,
      });
      changed += 1;
    }

    index.manifest.nextNumericId = map.nextNumericId;
    if (writeLucivy) await flushLucivyBatch(lucivyBatch);
    if (changed > 0 && !options.skipRecount) recountManifest(index);
    return changed;
  });
}

/**
 * Hash + prepare one file body (off-thread). Does not write Lucivy.
 */
export async function prepareFileUpsert(
  index: InMemoryIndex,
  path: string,
  content: string,
): Promise<PreparedFileUpsert> {
  const docId = fileDocId(path);
  const contentHash = await hashText(content);
  const existing = index.docs.get(docId);
  if (existing?.contentHash === contentHash) {
    return {
      path,
      contentHash,
      prepared: {
        fields: { title: '', body: '', path, kind: 'file' },
        preview: '',
        title: '',
      },
      existed: Boolean(existing),
      skipped: true,
    };
  }
  const prepared = await prepareFileLucivyFieldsOffThread(
    path,
    content,
    `${path}:${contentHash}`,
  );
  return {
    path,
    contentHash,
    prepared,
    existed: Boolean(existing),
    skipped: false,
  };
}

export async function upsertChatDayDocuments(
  index: InMemoryIndex,
  map: DocIdMapState,
  dayPathOrDate: string,
  content: string,
  options: UpsertOptions = {},
): Promise<number> {
  const dateStr =
    chatDateFromPath(dayPathOrDate) ||
    (/^\d{4}-\d{2}-\d{2}$/.test(dayPathOrDate) ? dayPathOrDate : null);
  if (!dateStr) return 0;

  const { messages } = parseDayFile(content);

  return withIndexWriteLock(async () => {
  let changed = 0;
  const writeLucivy = options.writeLucivy !== false;
  const yieldEvery = options.yieldEvery ?? 0;
  const yieldFn = options.yieldFn ?? yieldToMain;
  const batchSize = Math.max(1, options.lucivyBatchSize ?? DEFAULT_CHAT_BATCH);

  for (const [docId, meta] of index.docs) {
    if (meta.kind !== 'chat' || meta.dateStr !== dateStr) continue;
    const still = messages.some((m: { id?: string }) => m.id === meta.messageId);
    if (!still) {
      if (writeLucivy) {
        const n = releaseDocId(map, docId) ?? meta.numericId;
        if (typeof n === 'number') await removeLucivyNumericId(n);
      } else {
        releaseDocId(map, docId);
      }
      index.docs.delete(docId);
      changed += 1;
    }
  }

  type PendingMsg = {
    messageId: string;
    group: string;
    body: string;
    contentHash: string;
    existing: DocMeta | undefined;
    docId: string;
  };

  const pending: PendingMsg[] = [];
  let msgIndex = 0;

  const flushPending = async () => {
    if (pending.length === 0) return;
    const prepared = await prepareChatLucivyFieldsBatchOffThread(
      pending.map((p) => ({
        dateStr,
        messageId: p.messageId,
        group: p.group,
        body: p.body,
      })),
    );

    const lucivyBatch: Array<{
      numericId: number;
      fields: LucivyDocFields;
      update: boolean;
    }> = [];

    for (let i = 0; i < pending.length; i += 1) {
      const p = pending[i];
      const prep = prepared[i];
      if (!p || !prep) continue;
      const existed = Boolean(p.existing);
      let numericId =
        p.existing?.numericId ?? getNumericId(map, p.docId) ?? undefined;
      if (writeLucivy) {
        numericId = allocateNumericId(map, p.docId);
        lucivyBatch.push({
          numericId,
          fields: prep.fields,
          update: existed,
        });
      } else if (numericId == null) {
        numericId = allocateNumericId(map, p.docId);
      }

      index.docs.set(p.docId, {
        kind: 'chat',
        path: `.chat-with-myself/${dateStr}.md`,
        title: prep.title,
        dateStr,
        messageId: p.messageId,
        group: p.group,
        preview: prep.preview,
        contentHash: p.contentHash,
        numericId: numericId!,
      });
      changed += 1;

      if (writeLucivy && lucivyBatch.length >= batchSize) {
        await flushLucivyBatch(lucivyBatch);
        await yieldFn();
      }
    }

    if (writeLucivy) await flushLucivyBatch(lucivyBatch);
    pending.length = 0;
    await yieldFn();
  };

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
      if (yieldEvery > 0 && msgIndex % yieldEvery === 0) {
        await yieldFn();
      }
      continue;
    }

    pending.push({ messageId, group, body, contentHash, existing, docId });
    if (pending.length >= batchSize) {
      await flushPending();
    } else if (yieldEvery > 0 && msgIndex % yieldEvery === 0) {
      await yieldFn();
    }
  }

  await flushPending();

  index.manifest.nextNumericId = map.nextNumericId;
  if (changed > 0 && !options.skipRecount) recountManifest(index);
  return changed;
  });
}

export async function removeDocument(
  index: InMemoryIndex,
  map: DocIdMapState,
  docId: string,
  options: { writeLucivy?: boolean } = {},
): Promise<void> {
  const meta = index.docs.get(docId);
  if (!meta) return;
  if (options.writeLucivy !== false) {
    const n = releaseDocId(map, docId) ?? meta.numericId;
    if (typeof n === 'number') await removeLucivyNumericId(n);
  } else {
    releaseDocId(map, docId);
  }
  index.docs.delete(docId);
  recountManifest(index);
}

/**
 * Drop docs whose source path is no longer in the planned rebuild set.
 */
export async function pruneIndexToPaths(
  index: InMemoryIndex,
  map: DocIdMapState,
  filePaths: string[],
  chatDayPaths: string[],
  options: { skipRecount?: boolean; writeLucivy?: boolean } = {},
): Promise<number> {
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
    if (options.writeLucivy !== false) {
      const n = releaseDocId(map, docId) ?? meta.numericId;
      if (typeof n === 'number') await removeLucivyNumericId(n);
    } else {
      releaseDocId(map, docId);
    }
    index.docs.delete(docId);
    removed += 1;
    if (removed % 32 === 0) await yieldToMain();
  }
  if (removed > 0 && !options.skipRecount) recountManifest(index);
  return removed;
}

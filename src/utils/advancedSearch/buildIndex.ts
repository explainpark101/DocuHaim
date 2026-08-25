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
  prepareChatLucivyFields,
  prepareFileLucivyFields,
} from '@/utils/advancedSearch/prepareDocument';

export type UpsertOptions = {
  /** Skip recountManifest (bulk rebuild should recount once at the end). */
  skipRecount?: boolean;
  /** Yield to the event loop every N chat messages (bulk rebuild). */
  yieldEvery?: number;
  yieldFn?: () => Promise<void>;
  /** When false, only update docs map (Lucivy already written). Default true. */
  writeLucivy?: boolean;
};

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

export async function upsertFileDocument(
  index: InMemoryIndex,
  map: DocIdMapState,
  path: string,
  content: string,
  options: UpsertOptions = {},
): Promise<boolean> {
  const docId = fileDocId(path);
  const contentHash = await hashText(content);
  const existing = index.docs.get(docId);
  if (existing?.contentHash === contentHash) return false;

  const prepared = await prepareFileLucivyFields(path, content);
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
  let changed = 0;
  const writeLucivy = options.writeLucivy !== false;

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

    const prepared = await prepareChatLucivyFields({
      dateStr,
      messageId,
      group,
      body,
    });
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

    index.docs.set(docId, {
      kind: 'chat',
      path: `.chat-with-myself/${dateStr}.md`,
      title: prepared.title,
      dateStr,
      messageId,
      group,
      preview: prepared.preview,
      contentHash,
      numericId,
    });
    changed += 1;

    if (yieldEvery > 0 && yieldFn && msgIndex % yieldEvery === 0) {
      await yieldFn();
    }
  }

  index.manifest.nextNumericId = map.nextNumericId;
  if (changed > 0 && !options.skipRecount) recountManifest(index);
  return changed;
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
  }
  if (removed > 0 && !options.skipRecount) recountManifest(index);
  return removed;
}

/**
 * Main-thread client for indexPrep.worker — scrub/tokenize off the UI thread.
 * Uses a small worker pool; identical path+hash prepares coalesce via the
 * shared index claim table so workers never redo the same document body.
 * Falls back to in-process prepareDocument if workers cannot start.
 */

import {
  prepareChatLucivyFields,
  prepareFileChunkLucivyFields,
  prepareFileLucivyFields,
} from '@/utils/advancedSearch/prepareDocument';
import type { LucivyDocFields } from '@/utils/advancedSearch/lucivyBackend';
import { indexRebuildConcurrency } from '@/utils/advancedSearch/mapPool';
import { coalesceIndexWork } from '@/utils/advancedSearch/indexPathLock';
import type {
  IndexPrepPayload,
  IndexPrepWorkerRequest,
  IndexPrepWorkerResponse,
} from '@/utils/advancedSearch/indexPrep.worker';

export type PreparedLucivyDoc = {
  fields: LucivyDocFields;
  preview: string;
  title: string;
};

type Pending = {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
};

let pool: Worker[] = [];
let workerFailed = false;
let nextId = 1;
let rr = 0;
const pending = new Map<number, Pending>();

function rejectAll(reason: unknown): void {
  for (const p of pending.values()) {
    p.reject(reason);
  }
  pending.clear();
}

function poolSize(): number {
  return Math.min(4, indexRebuildConcurrency());
}

function attachWorker(w: Worker): void {
  w.onmessage = (event: MessageEvent<IndexPrepWorkerResponse>) => {
    const msg = event.data;
    if (!msg || typeof msg.id !== 'number') return;
    const p = pending.get(msg.id);
    if (!p) return;
    pending.delete(msg.id);
    if (msg.ok) p.resolve(msg.result);
    else p.reject(new Error(msg.error || 'Index prep worker error'));
  };
  w.onerror = (event) => {
    workerFailed = true;
    rejectAll(event.error || new Error('Index prep worker crashed'));
    for (const worker of pool) {
      try {
        worker.terminate();
      } catch {
        // ignore
      }
    }
    pool = [];
  };
}

function ensurePool(): Worker[] | null {
  if (workerFailed) return null;
  if (pool.length > 0) return pool;
  if (typeof Worker === 'undefined') {
    workerFailed = true;
    return null;
  }
  try {
    const size = poolSize();
    const next: Worker[] = [];
    for (let i = 0; i < size; i += 1) {
      const w = new Worker(new URL('./indexPrep.worker.ts', import.meta.url), {
        type: 'module',
      });
      attachWorker(w);
      next.push(w);
    }
    pool = next;
    return pool;
  } catch (err) {
    console.warn('[advancedSearch] index prep worker unavailable; using main thread', err);
    workerFailed = true;
    return null;
  }
}

function pickWorker(workers: Worker[]): Worker {
  const w = workers[rr % workers.length]!;
  rr += 1;
  return w;
}

function postWorker<T>(payload: IndexPrepPayload): Promise<T> {
  const workers = ensurePool();
  if (!workers || workers.length === 0) {
    return Promise.reject(new Error('Index prep worker unavailable'));
  }
  const id = nextId++;
  return new Promise<T>((resolve, reject) => {
    pending.set(id, {
      resolve: (v) => resolve(v as T),
      reject,
    });
    const msg: IndexPrepWorkerRequest = { ...payload, id };
    pickWorker(workers).postMessage(msg);
  });
}

export async function prepareFileChunkLucivyFieldsOffThread(
  path: string,
  chunkText: string,
  chunkIndex: number,
  totalChunks: number,
  coalesceKey?: string,
): Promise<PreparedLucivyDoc> {
  const run = async (): Promise<PreparedLucivyDoc> => {
    try {
      return await postWorker<PreparedLucivyDoc>({
        type: 'prepareFileChunk',
        path,
        chunkText,
        chunkIndex,
        totalChunks,
      });
    } catch {
      return prepareFileChunkLucivyFields(path, chunkText, chunkIndex, totalChunks);
    }
  };
  if (!coalesceKey) return run();
  return coalesceIndexWork(`prep:file-chunk:${coalesceKey}`, run);
}

export async function prepareFileLucivyFieldsOffThread(
  path: string,
  content: string,
  /** When set (e.g. path+contentHash), identical in-flight prepares share one job. */
  coalesceKey?: string,
): Promise<PreparedLucivyDoc> {
  const run = async (): Promise<PreparedLucivyDoc> => {
    try {
      return await postWorker<PreparedLucivyDoc>({
        type: 'prepareFile',
        path,
        content,
      });
    } catch {
      return prepareFileLucivyFields(path, content);
    }
  };
  if (!coalesceKey) return run();
  return coalesceIndexWork(`prep:file:${coalesceKey}`, run);
}

export async function prepareChatLucivyFieldsOffThread(options: {
  dateStr: string;
  messageId: string;
  group: string;
  body: string;
  coalesceKey?: string;
}): Promise<PreparedLucivyDoc> {
  const { coalesceKey, ...payload } = options;
  const run = async (): Promise<PreparedLucivyDoc> => {
    try {
      return await postWorker<PreparedLucivyDoc>({
        type: 'prepareChat',
        ...payload,
      });
    } catch {
      return prepareChatLucivyFields(payload);
    }
  };
  if (!coalesceKey) return run();
  return coalesceIndexWork(`prep:chat:${coalesceKey}`, run);
}

export async function prepareChatLucivyFieldsBatchOffThread(
  items: Array<{
    dateStr: string;
    messageId: string;
    group: string;
    body: string;
  }>,
): Promise<PreparedLucivyDoc[]> {
  if (items.length === 0) return [];
  // Split large batches across the pool for Tauri throughput.
  const workers = ensurePool();
  if (!workers || workers.length === 0) {
    const out: PreparedLucivyDoc[] = [];
    for (const item of items) {
      out.push(await prepareChatLucivyFields(item));
    }
    return out;
  }
  if (items.length <= 16 || workers.length === 1) {
    try {
      return await postWorker<PreparedLucivyDoc[]>({
        type: 'prepareChatBatch',
        items,
      });
    } catch {
      const out: PreparedLucivyDoc[] = [];
      for (const item of items) {
        out.push(await prepareChatLucivyFields(item));
      }
      return out;
    }
  }
  const chunkSize = Math.ceil(items.length / workers.length);
  const chunks: typeof items[] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    chunks.push(items.slice(i, i + chunkSize));
  }
  try {
    const parts = await Promise.all(
      chunks.map((chunk) =>
        postWorker<PreparedLucivyDoc[]>({
          type: 'prepareChatBatch',
          items: chunk,
        }),
      ),
    );
    return parts.flat();
  } catch {
    const out: PreparedLucivyDoc[] = [];
    for (const item of items) {
      out.push(await prepareChatLucivyFields(item));
    }
    return out;
  }
}

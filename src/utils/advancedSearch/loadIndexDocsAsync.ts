/**
 * Load docs.json.gz off the UI thread when possible (dedicated worker).
 */

import { gunzipBytesAsync } from '@/utils/advancedSearch/store';
import { yieldToMain } from '@/utils/advancedSearch/yieldToMain';
import type { DocMeta } from '@/utils/advancedSearch/types';
import type {
  IndexDocsLoadWorkerRequest,
  IndexDocsLoadWorkerResponse,
} from '@/utils/advancedSearch/indexDocsLoad.worker';
import { strFromU8 } from 'fflate';

let worker: Worker | null = null;
let workerFailed = false;
let nextId = 1;
const pending = new Map<
  number,
  {
    resolve: (value: Record<string, DocMeta> | null) => void;
    reject: (reason?: unknown) => void;
  }
>();

function ensureWorker(): Worker | null {
  if (workerFailed) return null;
  if (worker) return worker;
  try {
    worker = new Worker(new URL('./indexDocsLoad.worker.ts', import.meta.url), {
      type: 'module',
    });
    worker.onmessage = (event: MessageEvent<IndexDocsLoadWorkerResponse>) => {
      const msg = event.data;
      const p = pending.get(msg.id);
      if (!p) return;
      pending.delete(msg.id);
      if (!msg.ok) {
        p.resolve(null);
        return;
      }
      p.resolve(msg.result as Record<string, DocMeta>);
    };
    worker.onerror = () => {
      workerFailed = true;
      for (const p of pending.values()) {
        p.resolve(null);
      }
      pending.clear();
      try {
        worker?.terminate();
      } catch {
        // ignore
      }
      worker = null;
    };
    return worker;
  } catch {
    workerFailed = true;
    return null;
  }
}

function loadViaWorker(body: Uint8Array): Promise<Record<string, DocMeta> | null> {
  const w = ensureWorker();
  if (!w) return Promise.resolve(null);
  const id = nextId++;
  const payload = body.slice();
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    const msg: IndexDocsLoadWorkerRequest = { id, body: payload };
    w.postMessage(msg, [payload.buffer]);
  });
}

async function loadOnMainThread(
  body: Uint8Array,
): Promise<Record<string, DocMeta> | null> {
  await yieldToMain();
  try {
    const raw = await gunzipBytesAsync(body);
    await yieldToMain();
    return JSON.parse(strFromU8(raw)) as Record<string, DocMeta>;
  } catch {
    return null;
  }
}

/** Gunzip + parse docs map; prefers worker, falls back with yields on main thread. */
export async function loadDocsObjectFromGzip(
  body: Uint8Array,
): Promise<Record<string, DocMeta> | null> {
  const fromWorker = await loadViaWorker(body);
  if (fromWorker != null) return fromWorker;
  return loadOnMainThread(body);
}

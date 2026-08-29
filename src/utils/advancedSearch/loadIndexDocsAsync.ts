/**
 * Load docs.json.gz off the UI thread when possible (dedicated worker).
 * Applies doc entries in batches with yields so deserialization never spikes the UI.
 */

import { gunzipBytesAsync } from '@/utils/advancedSearch/store';
import { yieldToMain } from '@/utils/advancedSearch/yieldToMain';
import type { DocMeta } from '@/utils/advancedSearch/types';
import type {
  IndexDocsLoadWorkerRequest,
  IndexDocsLoadWorkerResponse,
} from '@/utils/advancedSearch/indexDocsLoad.worker';
import { strFromU8 } from 'fflate';

const APPLY_BATCH_YIELD_EVERY = 100;

let worker: Worker | null = null;
let workerFailed = false;
let nextId = 1;

type PendingLoad = {
  resolve: (value: Map<string, DocMeta> | null) => void;
  map: Map<string, DocMeta>;
};

const pendingLoads = new Map<number, PendingLoad>();

async function applyEntries(
  map: Map<string, DocMeta>,
  entries: Array<[string, DocMeta]>,
): Promise<void> {
  let i = 0;
  for (const [docId, meta] of entries) {
    map.set(docId, meta);
    i += 1;
    if (i % APPLY_BATCH_YIELD_EVERY === 0) {
      await yieldToMain();
    }
  }
}

function attachWorkerHandlers(w: Worker): void {
  w.onmessage = async (event: MessageEvent<IndexDocsLoadWorkerResponse>) => {
    const msg = event.data;
    const load = pendingLoads.get(msg.id);
    if (!load) return;

    if (msg.type === 'batch') {
      await applyEntries(load.map, msg.entries);
      await yieldToMain();
      return;
    }

    pendingLoads.delete(msg.id);
    if (msg.type === 'done') {
      load.resolve(load.map);
      return;
    }
    load.resolve(null);
  };
  w.onerror = () => {
    workerFailed = true;
    for (const load of pendingLoads.values()) {
      load.resolve(null);
    }
    pendingLoads.clear();
    try {
      w.terminate();
    } catch {
      // ignore
    }
    worker = null;
  };
}

function ensureWorker(): Worker | null {
  if (workerFailed) return null;
  if (worker) return worker;
  try {
    const w = new Worker(new URL('./indexDocsLoad.worker.ts', import.meta.url), {
      type: 'module',
    });
    attachWorkerHandlers(w);
    worker = w;
    return w;
  } catch {
    workerFailed = true;
    return null;
  }
}

function loadViaWorker(body: Uint8Array): Promise<Map<string, DocMeta> | null> {
  const w = ensureWorker();
  if (!w) return Promise.resolve(null);
  const id = nextId++;
  const payload = body.slice();
  return new Promise((resolve) => {
    pendingLoads.set(id, {
      resolve,
      map: new Map(),
    });
    const msg: IndexDocsLoadWorkerRequest = { id, body: payload };
    w.postMessage(msg, [payload.buffer]);
  });
}

async function loadOnMainThread(
  body: Uint8Array,
): Promise<Map<string, DocMeta> | null> {
  await yieldToMain();
  try {
    const raw = await gunzipBytesAsync(body);
    await yieldToMain();
    const parsed = JSON.parse(strFromU8(raw)) as Record<string, DocMeta>;
    const map = new Map<string, DocMeta>();
    const entries = Object.entries(parsed).filter(
      ([, meta]) => meta && typeof meta === 'object',
    ) as Array<[string, DocMeta]>;
    await applyEntries(map, entries);
    return map;
  } catch {
    return null;
  }
}

/** Gunzip + parse docs map; prefers worker batches, falls back with yields on main thread. */
export async function loadDocsMapFromGzip(
  body: Uint8Array,
): Promise<Map<string, DocMeta> | null> {
  await yieldToMain();
  const fromWorker = await loadViaWorker(body);
  if (fromWorker != null) return fromWorker;
  return loadOnMainThread(body);
}

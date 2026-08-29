/**
 * Dedicated worker: gunzip + JSON.parse for Advanced Search docs.json.gz.
 * Keeps large vault doc maps off the UI thread during startup load.
 */

import { gunzipSync, strFromU8 } from 'fflate';
import type { DocMeta } from '@/utils/advancedSearch/types';

const BATCH_SIZE = 250;

export type IndexDocsLoadWorkerRequest = {
  id: number;
  body: Uint8Array;
};

export type IndexDocsLoadWorkerBatchMessage = {
  id: number;
  type: 'batch';
  entries: Array<[string, DocMeta]>;
};

export type IndexDocsLoadWorkerDoneMessage = {
  id: number;
  type: 'done';
};

export type IndexDocsLoadWorkerErrorMessage = {
  id: number;
  type: 'error';
  error: string;
};

export type IndexDocsLoadWorkerResponse =
  | IndexDocsLoadWorkerBatchMessage
  | IndexDocsLoadWorkerDoneMessage
  | IndexDocsLoadWorkerErrorMessage;

self.onmessage = (event: MessageEvent<IndexDocsLoadWorkerRequest>) => {
  const msg = event.data;
  if (!msg || typeof msg.id !== 'number') return;
  const requestId = msg.id;

  try {
    const raw = gunzipSync(msg.body);
    const parsed = JSON.parse(strFromU8(raw)) as Record<string, DocMeta>;
    const entries = Object.entries(parsed).filter(
      ([, meta]) => meta && typeof meta === 'object',
    ) as Array<[string, DocMeta]>;

    for (let i = 0; i < entries.length; i += BATCH_SIZE) {
      const batch = entries.slice(i, i + BATCH_SIZE);
      const response: IndexDocsLoadWorkerBatchMessage = {
        id: requestId,
        type: 'batch',
        entries: batch,
      };
      self.postMessage(response);
    }

    const done: IndexDocsLoadWorkerDoneMessage = {
      id: requestId,
      type: 'done',
    };
    self.postMessage(done);
  } catch (err) {
    const response: IndexDocsLoadWorkerErrorMessage = {
      id: requestId,
      type: 'error',
      error: err instanceof Error ? err.message : String(err),
    };
    self.postMessage(response);
  }
};

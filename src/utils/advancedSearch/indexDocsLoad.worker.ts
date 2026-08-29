/**
 * Dedicated worker: gunzip + JSON.parse for Advanced Search docs.json.gz.
 * Keeps large vault doc maps off the UI thread during startup load.
 */

import { gunzipSync, strFromU8 } from 'fflate';

export type IndexDocsLoadWorkerRequest = {
  id: number;
  body: Uint8Array;
};

export type IndexDocsLoadWorkerResponse =
  | { id: number; ok: true; result: Record<string, unknown> }
  | { id: number; ok: false; error: string };

self.onmessage = (event: MessageEvent<IndexDocsLoadWorkerRequest>) => {
  const msg = event.data;
  if (!msg || typeof msg.id !== 'number') return;
  const requestId = msg.id;
  try {
    const raw = gunzipSync(msg.body);
    const result = JSON.parse(strFromU8(raw)) as Record<string, unknown>;
    const response: IndexDocsLoadWorkerResponse = {
      id: requestId,
      ok: true,
      result,
    };
    self.postMessage(response);
  } catch (err) {
    const response: IndexDocsLoadWorkerResponse = {
      id: requestId,
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
    self.postMessage(response);
  }
};

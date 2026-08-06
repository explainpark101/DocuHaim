/// <reference lib="webworker" />

import {
  upsertChatDayDocuments,
  upsertFileDocument,
  computeFileUpsertPatch,
  computeChatUpsertPatch,
} from './buildIndex';
import { ensureGaru } from './tokenize';
import {
  docsToObject,
  gzipJsonBytes,
  postingsToObject,
} from './store';
import {
  emptyIndex,
  recountManifest,
  type InMemoryIndex,
} from './types';
import type {
  IndexWorkerEvent,
  IndexWorkerRequest,
  IndexWorkerResponse,
} from './indexWorkerProtocol';

declare const self: DedicatedWorkerGlobalScope;

let rebuildIndex: InMemoryIndex | null = null;
let cancelled = false;

function reply(msg: IndexWorkerResponse, transfer?: Transferable[]): void {
  if (transfer?.length) {
    self.postMessage(msg, transfer);
  } else {
    self.postMessage(msg);
  }
}

function emit(event: IndexWorkerEvent): void {
  self.postMessage(event);
}

async function handle(req: IndexWorkerRequest): Promise<void> {
  const { id, type } = req;
  try {
    switch (type) {
      case 'init': {
        emit({ type: 'log', level: 'info', message: 'Worker: loading garu-ko…' });
        await ensureGaru();
        emit({ type: 'log', level: 'ok', message: 'Worker: tokenizer ready' });
        reply({ id, type: 'ok' });
        return;
      }
      case 'startRebuild': {
        cancelled = false;
        rebuildIndex = emptyIndex();
        reply({ id, type: 'ok' });
        return;
      }
      case 'cancel': {
        cancelled = true;
        rebuildIndex = null;
        reply({ id, type: 'ok' });
        return;
      }
      case 'processFile': {
        if (cancelled || !rebuildIndex) {
          reply({ id, type: 'processFileResult', ok: false });
          return;
        }
        await upsertFileDocument(rebuildIndex, req.path, req.content, {
          skipRecount: true,
        });
        reply({ id, type: 'processFileResult', ok: true });
        return;
      }
      case 'processChatDay': {
        if (cancelled || !rebuildIndex) {
          reply({ id, type: 'processChatDayResult', changed: 0 });
          return;
        }
        const changed = await upsertChatDayDocuments(
          rebuildIndex,
          req.path,
          req.content,
          { skipRecount: true },
        );
        reply({ id, type: 'processChatDayResult', changed });
        return;
      }
      case 'finalize': {
        if (cancelled || !rebuildIndex) {
          throw new Error('No rebuild in progress');
        }
        emit({ type: 'log', level: 'info', message: 'Worker: compressing index…' });
        recountManifest(rebuildIndex);
        rebuildIndex.manifest.initialized = true;
        const manifest = rebuildIndex.manifest;
        const postingsObj = postingsToObject(rebuildIndex.postings);
        const docsObj = docsToObject(rebuildIndex.docs);
        const [postingsGz, docsGz] = await Promise.all([
          gzipJsonBytes(postingsObj),
          gzipJsonBytes(docsObj),
        ]);
        // Copy into fresh ArrayBuffers so Transferable detach is safe.
        const postingsOut = postingsGz.slice();
        const docsOut = docsGz.slice();
        rebuildIndex = null;
        reply(
          {
            id,
            type: 'finalizeResult',
            result: { manifest, postingsGz: postingsOut, docsGz: docsOut },
          },
          [postingsOut.buffer as ArrayBuffer, docsOut.buffer as ArrayBuffer],
        );
        return;
      }
      case 'upsertFile': {
        const patch = await computeFileUpsertPatch(
          req.path,
          req.content,
          req.existingHash,
        );
        reply({ id, type: 'upsertFileResult', patch });
        return;
      }
      case 'upsertChatDay': {
        const patch = await computeChatUpsertPatch(
          req.path,
          req.content,
          req.existingHashes,
        );
        reply({ id, type: 'upsertChatDayResult', patch });
        return;
      }
      default: {
        const _exhaustive: never = type;
        throw new Error(`Unknown worker request: ${String(_exhaustive)}`);
      }
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    reply({ id, type: 'error', message });
  }
}

self.onmessage = (ev: MessageEvent<IndexWorkerRequest>) => {
  const data = ev.data;
  if (!data || typeof data !== 'object' || typeof data.id !== 'number') return;
  void handle(data);
};

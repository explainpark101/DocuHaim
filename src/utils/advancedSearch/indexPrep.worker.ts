/**
 * Dedicated worker: scrub + garu tokenize for Advanced Search indexing.
 * Keeps heavy text work off the UI thread during rebuild/upsert.
 */

import {
  prepareChatLucivyFields,
  prepareFileLucivyFields,
} from '@/utils/advancedSearch/prepareDocument';

export type IndexPrepFilePayload = {
  type: 'prepareFile';
  path: string;
  content: string;
};

export type IndexPrepChatPayload = {
  type: 'prepareChat';
  dateStr: string;
  messageId: string;
  group: string;
  body: string;
};

export type IndexPrepChatBatchPayload = {
  type: 'prepareChatBatch';
  items: Array<{
    dateStr: string;
    messageId: string;
    group: string;
    body: string;
  }>;
};

export type IndexPrepPayload =
  | IndexPrepFilePayload
  | IndexPrepChatPayload
  | IndexPrepChatBatchPayload;

export type IndexPrepWorkerRequest = IndexPrepPayload & { id: number };

export type IndexPrepWorkerResponse =
  | {
      id: number;
      ok: true;
      result: unknown;
    }
  | {
      id: number;
      ok: false;
      error: string;
    };

self.onmessage = async (event: MessageEvent<IndexPrepWorkerRequest>) => {
  const msg = event.data;
  if (!msg || typeof msg.id !== 'number') return;
  const requestId = msg.id;

  try {
    if (msg.type === 'prepareFile') {
      const result = await prepareFileLucivyFields(msg.path, msg.content);
      const response: IndexPrepWorkerResponse = {
        id: requestId,
        ok: true,
        result,
      };
      self.postMessage(response);
      return;
    }
    if (msg.type === 'prepareChat') {
      const result = await prepareChatLucivyFields({
        dateStr: msg.dateStr,
        messageId: msg.messageId,
        group: msg.group,
        body: msg.body,
      });
      const response: IndexPrepWorkerResponse = {
        id: requestId,
        ok: true,
        result,
      };
      self.postMessage(response);
      return;
    }
    if (msg.type === 'prepareChatBatch') {
      const result = [];
      for (const item of msg.items) {
        result.push(await prepareChatLucivyFields(item));
      }
      const response: IndexPrepWorkerResponse = {
        id: requestId,
        ok: true,
        result,
      };
      self.postMessage(response);
      return;
    }
    const response: IndexPrepWorkerResponse = {
      id: requestId,
      ok: false,
      error: 'Unknown index prep request',
    };
    self.postMessage(response);
  } catch (err) {
    const response: IndexPrepWorkerResponse = {
      id: requestId,
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
    self.postMessage(response);
  }
};

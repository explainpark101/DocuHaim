import type { DocMeta, IndexManifest } from './types';

export type WorkerLogLevel = 'info' | 'ok' | 'warn' | 'error';

/** Main → Worker */
export type IndexWorkerRequest =
  | { id: number; type: 'init' }
  | { id: number; type: 'startRebuild' }
  | {
      id: number;
      type: 'startRebuildFromCheckpoint';
      postingsGz: Uint8Array;
      docsGz: Uint8Array;
      filePaths: string[];
      chatDayPaths: string[];
    }
  | { id: number; type: 'processFile'; path: string; content: string }
  | { id: number; type: 'processChatDay'; path: string; content: string }
  | { id: number; type: 'exportCheckpoint' }
  | { id: number; type: 'finalize' }
  | {
      id: number;
      type: 'upsertFile';
      path: string;
      content: string;
      existingHash?: string | null;
    }
  | {
      id: number;
      type: 'upsertChatDay';
      path: string;
      content: string;
      /** docId → contentHash for existing chat docs on this day */
      existingHashes: Record<string, string>;
    }
  | { id: number; type: 'cancel' };

export type FileUpsertPatch = {
  changed: boolean;
  docId: string;
  meta?: DocMeta;
  terms?: string[];
};

export type ChatDocPatch = {
  docId: string;
  meta: DocMeta;
  terms: string[];
};

export type ChatUpsertPatch = {
  dateStr: string | null;
  changed: number;
  keepDocIds: string[];
  upserts: ChatDocPatch[];
  /** Doc IDs removed because messages disappeared */
  removedDocIds: string[];
};

export type FinalizeResult = {
  manifest: IndexManifest;
  postingsGz: Uint8Array;
  docsGz: Uint8Array;
};

export type CheckpointExportResult = {
  postingsGz: Uint8Array;
  docsGz: Uint8Array;
};

/** Worker → Main (correlated responses) */
export type IndexWorkerResponse =
  | { id: number; type: 'ok'; payload?: unknown }
  | { id: number; type: 'processFileResult'; ok: boolean }
  | { id: number; type: 'processChatDayResult'; changed: number }
  | { id: number; type: 'exportCheckpointResult'; result: CheckpointExportResult }
  | { id: number; type: 'finalizeResult'; result: FinalizeResult }
  | { id: number; type: 'upsertFileResult'; patch: FileUpsertPatch }
  | { id: number; type: 'upsertChatDayResult'; patch: ChatUpsertPatch }
  | { id: number; type: 'error'; message: string };

/** Worker → Main (fire-and-forget / progress) */
export type IndexWorkerEvent =
  | { type: 'log'; level: WorkerLogLevel; message: string }
  | { type: 'progress'; done: number; totalHint?: number };

export type IndexWorkerInbound = IndexWorkerResponse | IndexWorkerEvent;

export function isIndexWorkerResponse(
  msg: IndexWorkerInbound,
): msg is IndexWorkerResponse {
  return 'id' in msg && typeof (msg as IndexWorkerResponse).id === 'number';
}

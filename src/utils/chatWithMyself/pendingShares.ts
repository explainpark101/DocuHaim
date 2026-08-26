import {
  deletePendingShare,
  getPendingShares,
  savePendingShare,
} from '@/utils/chatWithMyself/chatDb.js';
import { SELF_GROUP } from '@/utils/chatWithMyself/paths.js';
import { sharePayloadFromSearch } from '@/utils/chatWithMyself/sharePayload.js';
import {
  appendShareChatMessage,
  normalizeShareFiles,
  sharePromptHasContent,
} from '@/utils/chatWithMyself/shareSend.js';
import { postChatLocalSyncEvent, postChatSyncEvent } from '@/utils/chatWithMyself/syncChannel.js';
import {
  SHARE_TARGET_FLAG,
  takeShareTargetFiles,
} from '@/utils/chatWithMyself/shareTargetCache.ts';

export type PendingShareIntent = 'choose' | 'sendSelf' | 'compose';

export type PendingShareFile = {
  name: string;
  type: string;
  size: number;
  blob: Blob;
};

export type PendingShareRow = {
  id?: number;
  body: string;
  files?: PendingShareFile[];
  intent?: PendingShareIntent;
  createdAt?: number;
};

export type SharePrompt = {
  id?: number;
  body: string;
  files?: File[];
};

/** Minimal storage context accepted by appendChatMessage. */
export type ChatStorageCtxLike =
  | { mode: 's3'; client: unknown; bucket: string }
  | { mode: 'local'; localRootHandle: unknown }
  | { mode: 'webdav'; webdavConfig: unknown };

type SearchLike =
  | string
  | URLSearchParams
  | { search?: string }
  | null
  | undefined;

/** Serialize flushes across Strict Mode / effect re-entry so the same row is never appended twice. */
const sendSelfFlushGate: { chain: Promise<unknown> } = {
  chain: Promise.resolve(),
};
const composeClaimGate: { chain: Promise<unknown> } = {
  chain: Promise.resolve(),
};

function enqueueExclusive<T>(
  gate: { chain: Promise<unknown> },
  task: () => Promise<T>,
): Promise<T> {
  const run = gate.chain.then(task, task) as Promise<T>;
  gate.chain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

function toSearchParams(input: SearchLike): URLSearchParams {
  if (input instanceof URLSearchParams) return input;
  if (typeof input === 'string') {
    return new URLSearchParams(input.startsWith('?') ? input.slice(1) : input);
  }
  if (input && typeof input === 'object' && typeof input.search === 'string') {
    return new URLSearchParams(
      input.search.startsWith('?') ? input.search.slice(1) : input.search,
    );
  }
  return new URLSearchParams();
}

function serializeShareFiles(files: unknown): PendingShareFile[] {
  return normalizeShareFiles(files).map((file) => ({
    name: file.name || 'shared-file',
    type: file.type || 'application/octet-stream',
    size: file.size || 0,
    blob: file,
  }));
}

function pendingRowHasContent(row: PendingShareRow | null | undefined): boolean {
  return sharePromptHasContent({
    body: row?.body || '',
    files: row?.files ?? [],
  });
}

export function hasShareTargetFlag(input: SearchLike): boolean {
  const params = toSearchParams(input);
  const value = params.get(SHARE_TARGET_FLAG);
  return value === '1' || value === 'true';
}

export function hasShareSearchParams(input: SearchLike): boolean {
  const params = toSearchParams(input);
  return (
    params.has('title') ||
    params.has('text') ||
    params.has('url') ||
    hasShareTargetFlag(params)
  );
}

export function shareBodyFromSearch(
  search: string | URLSearchParams | null | undefined,
): string | null {
  const { body } = sharePayloadFromSearch(search || '');
  return body || null;
}

export function readSharePromptFromWindow(): SharePrompt | null {
  if (typeof window === 'undefined') return null;
  const path = window.location.pathname || '';
  if (!path.endsWith('/chat')) return null;
  if (!hasShareSearchParams(window.location.search)) return null;
  const body = shareBodyFromSearch(window.location.search) || '';
  // Files are loaded async from Cache Storage after the SW redirect.
  return { body, files: [] };
}

/**
 * Consume share-target Cache Storage files (once) for the current intake.
 */
export async function loadShareTargetFiles(): Promise<File[]> {
  try {
    return await takeShareTargetFiles();
  } catch {
    return [];
  }
}

export function resolvePendingShareIntent(row: PendingShareRow): PendingShareIntent {
  const intent = row?.intent;
  if (intent === 'sendSelf' || intent === 'compose' || intent === 'choose') {
    return intent;
  }
  return 'choose';
}

export async function enqueuePendingShare(payload: {
  body?: string;
  files?: unknown[];
  intent?: PendingShareIntent;
}): Promise<number | null> {
  const body = String(payload?.body || '').trim();
  const files = serializeShareFiles(payload?.files);
  if (!body && !files.length) return null;
  return savePendingShare({
    body,
    files,
    intent: payload.intent || 'choose',
  });
}

export async function listPendingShares(): Promise<PendingShareRow[]> {
  return getPendingShares() as Promise<PendingShareRow[]>;
}

export async function removePendingShare(id: number | null | undefined): Promise<void> {
  if (id == null) return;
  await deletePendingShare(id);
}

export async function peekChoosePendingShare(): Promise<PendingShareRow | null> {
  const rows = (await getPendingShares()) as PendingShareRow[];
  return (
    rows.find(
      (row) =>
        resolvePendingShareIntent(row) === 'choose' && pendingRowHasContent(row),
    ) || null
  );
}

/**
 * Atomically claim compose rows (delete then return) so concurrent claimants
 * cannot both deliver the same seed.
 */
export async function claimComposePendingShares(): Promise<PendingShareRow[]> {
  return enqueueExclusive(composeClaimGate, async () => {
    const rows = (await getPendingShares()) as PendingShareRow[];
    const compose = rows.filter(
      (row) =>
        resolvePendingShareIntent(row) === 'compose' && pendingRowHasContent(row),
    );
    for (const row of compose) {
      if (row.id != null) {
        try {
          await deletePendingShare(row.id);
        } catch {
          /* ignore */
        }
      }
    }
    return compose;
  });
}

/**
 * Claim sendSelf rows before appending so overlapping flushes cannot double-send.
 * Failed appends are re-queued.
 */
export async function flushSendSelfPendingShares(
  ctx: ChatStorageCtxLike | null | undefined,
): Promise<{ flushed: number; dateStrs: string[] }> {
  return enqueueExclusive(sendSelfFlushGate, async () => {
    if (!ctx) return { flushed: 0, dateStrs: [] };

    const rows = (await getPendingShares()) as PendingShareRow[];
    const ready = rows.filter(
      (row) =>
        resolvePendingShareIntent(row) === 'sendSelf' && pendingRowHasContent(row),
    );
    if (!ready.length) return { flushed: 0, dateStrs: [] };

    const claimed: PendingShareRow[] = [];
    for (const row of ready) {
      if (row.id != null) {
        try {
          await deletePendingShare(row.id);
          claimed.push(row);
        } catch {
          /* leave for a later cycle if delete failed */
        }
      } else {
        claimed.push(row);
      }
    }

    const dateStrs: string[] = [];
    let flushed = 0;

    for (const row of claimed) {
      try {
        const { dateStr } = await appendShareChatMessage(ctx as never, {
          body: row.body,
          files: row.files ?? [],
          group: SELF_GROUP,
        });
        flushed += 1;
        if (dateStr) dateStrs.push(dateStr);
      } catch {
        try {
          await enqueuePendingShare({
            body: row.body,
            files: row.files ?? [],
            intent: 'sendSelf',
          });
        } catch {
          /* ignore */
        }
      }
    }

    for (const dateStr of [...new Set(dateStrs)]) {
      postChatSyncEvent('day', { dateStr });
      postChatLocalSyncEvent('day', { dateStr });
    }

    return { flushed, dateStrs };
  });
}

export { sharePromptHasContent, normalizeShareFiles };

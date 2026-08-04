import {
  deletePendingShare,
  getPendingShares,
  savePendingShare,
} from './chatDb.js';
import { appendChatMessage } from './storage.js';
import { SELF_GROUP } from './paths.js';
import { sharePayloadFromSearch } from './sharePayload.js';
import { postChatSyncEvent } from './syncChannel.js';

export type PendingShareIntent = 'choose' | 'sendSelf' | 'compose';

export type PendingShareRow = {
  id?: number;
  body: string;
  intent?: PendingShareIntent;
  createdAt?: number;
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

export function hasShareSearchParams(input: SearchLike): boolean {
  let params: URLSearchParams;
  if (input instanceof URLSearchParams) {
    params = input;
  } else if (typeof input === 'string') {
    params = new URLSearchParams(input.startsWith('?') ? input.slice(1) : input);
  } else if (input && typeof input === 'object' && typeof input.search === 'string') {
    params = new URLSearchParams(
      input.search.startsWith('?') ? input.search.slice(1) : input.search,
    );
  } else {
    return false;
  }
  return params.has('title') || params.has('text') || params.has('url');
}

export function shareBodyFromSearch(
  search: string | URLSearchParams | null | undefined,
): string | null {
  const { body } = sharePayloadFromSearch(search || '');
  return body || null;
}

export function readSharePromptFromWindow(): { body: string } | null {
  if (typeof window === 'undefined') return null;
  const path = window.location.pathname || '';
  if (!path.endsWith('/chat')) return null;
  if (!hasShareSearchParams(window.location.search)) return null;
  const body = shareBodyFromSearch(window.location.search);
  return body ? { body } : null;
}

export function resolvePendingShareIntent(row: PendingShareRow): PendingShareIntent {
  const intent = row?.intent;
  if (intent === 'sendSelf' || intent === 'compose' || intent === 'choose') {
    return intent;
  }
  return 'choose';
}

export async function enqueuePendingShare(payload: {
  body: string;
  intent?: PendingShareIntent;
}): Promise<number | null> {
  const body = String(payload?.body || '').trim();
  if (!body) return null;
  return savePendingShare({
    body,
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
    rows.find((row) => resolvePendingShareIntent(row) === 'choose' && row.body) ||
    null
  );
}

export async function claimComposePendingShares(): Promise<PendingShareRow[]> {
  const rows = (await getPendingShares()) as PendingShareRow[];
  const compose = rows.filter(
    (row) => resolvePendingShareIntent(row) === 'compose' && row.body,
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
}

export async function flushSendSelfPendingShares(
  ctx: ChatStorageCtxLike | null | undefined,
): Promise<{ flushed: number; dateStrs: string[] }> {
  if (!ctx) return { flushed: 0, dateStrs: [] };
  const rows = (await getPendingShares()) as PendingShareRow[];
  const ready = rows.filter(
    (row) => resolvePendingShareIntent(row) === 'sendSelf' && row.body,
  );
  const dateStrs: string[] = [];
  let flushed = 0;

  for (const row of ready) {
    try {
      // storage.js accepts the runtime ctx shape used across the app.
      const { dateStr } = await appendChatMessage(ctx as never, {
        body: row.body,
        group: SELF_GROUP,
        source: 'share',
      });
      if (row.id != null) await deletePendingShare(row.id);
      flushed += 1;
      if (dateStr) dateStrs.push(dateStr);
    } catch {
      // Keep row for retry on next storage-ready cycle.
    }
  }

  for (const dateStr of [...new Set(dateStrs)]) {
    postChatSyncEvent('day', { dateStr });
  }

  return { flushed, dateStrs };
}

/**
 * Tauri native Lucivy index bridge (lucivy-core via invoke).
 * Used when `isTauriApp()` — no SharedArrayBuffer / OPFS required.
 */

import { isTauriApp } from '@/utils/tauriPlatform';

export type TauriIndexFields = {
  title: string;
  body: string;
  path: string;
  kind: string;
  dateStr?: string;
};

export type TauriSearchHit = {
  docId: number;
  score: number;
};

type UnlistenFn = () => void;

let sessionId: string | null = null;
let logUnlisten: UnlistenFn | null = null;
let progressUnlisten: UnlistenFn | null = null;
let logListener: ((level: string, message: string) => void) | null = null;

async function coreApi() {
  return import('@tauri-apps/api/core');
}

async function eventApi() {
  return import('@tauri-apps/api/event');
}

export function isTauriIndexBackendAvailable(): boolean {
  return isTauriApp();
}

export function isTauriIndexOpen(): boolean {
  return sessionId != null;
}

export function setTauriIndexLogListener(
  listener: ((level: string, message: string) => void) | null,
): void {
  logListener = listener;
}

async function ensureEventListeners(): Promise<void> {
  if (logUnlisten && progressUnlisten) return;
  const { listen } = await eventApi();
  if (!logUnlisten) {
    logUnlisten = await listen<{ level: string; message: string }>(
      'as-index-log',
      (event) => {
        logListener?.(event.payload.level, event.payload.message);
      },
    );
  }
  if (!progressUnlisten) {
    progressUnlisten = await listen<{
      processed: number;
      total: number;
      phase: string;
    }>('as-index-progress', () => {
      // Progress is primarily driven by the JS engine loop; events are optional.
    });
  }
}

function fieldsRecord(fields: TauriIndexFields): Record<string, string> {
  const out: Record<string, string> = {
    title: fields.title,
    body: fields.body,
    path: fields.path,
    kind: fields.kind,
  };
  if (fields.dateStr) out.dateStr = fields.dateStr;
  return out;
}

export async function openTauriIndexSession(
  snapshot: Uint8Array | null,
): Promise<string> {
  await ensureEventListeners();
  if (sessionId) {
    try {
      await closeTauriIndexSession();
    } catch {
      // ignore
    }
  }
  const { invoke } = await coreApi();
  const snap =
    snapshot && snapshot.byteLength > 0 ? Array.from(snapshot) : null;
  const id = await invoke<string>('as_index_open', { snapshot: snap });
  sessionId = id;
  return id;
}

export async function requireTauriSessionId(): Promise<string> {
  if (sessionId) return sessionId;
  return openTauriIndexSession(null);
}

export async function closeTauriIndexSession(): Promise<void> {
  if (!sessionId) return;
  const id = sessionId;
  sessionId = null;
  const { invoke } = await coreApi();
  await invoke('as_index_close', { sessionId: id });
}

export async function tauriUpsertDoc(
  numericId: number,
  fields: TauriIndexFields,
): Promise<void> {
  const id = await requireTauriSessionId();
  const { invoke } = await coreApi();
  await invoke('as_index_upsert_batch', {
    sessionId: id,
    docs: [{ numericId: numericId, fields: fieldsRecord(fields) }],
  });
}

export async function tauriUpsertBatch(
  docs: Array<{ numericId: number; fields: TauriIndexFields }>,
): Promise<number> {
  if (docs.length === 0) return 0;
  const id = await requireTauriSessionId();
  const { invoke } = await coreApi();
  return invoke<number>('as_index_upsert_batch', {
    sessionId: id,
    docs: docs.map((d) => ({
      numericId: d.numericId,
      fields: fieldsRecord(d.fields),
    })),
  });
}

export async function tauriRemove(numericId: number): Promise<void> {
  const id = await requireTauriSessionId();
  const { invoke } = await coreApi();
  await invoke('as_index_remove', { sessionId: id, numericId });
}

export async function tauriCommit(): Promise<void> {
  const id = await requireTauriSessionId();
  const { invoke } = await coreApi();
  await invoke('as_index_commit', { sessionId: id });
}

export async function tauriExportSnapshot(): Promise<Uint8Array> {
  const id = await requireTauriSessionId();
  const { invoke } = await coreApi();
  const bytes = await invoke<number[]>('as_index_export_snapshot', {
    sessionId: id,
  });
  return new Uint8Array(bytes);
}

export async function tauriSearchContainsAnd(
  field: string,
  terms: string[],
  limit = 50,
): Promise<TauriSearchHit[]> {
  const id = await requireTauriSessionId();
  const { invoke } = await coreApi();
  const raw = await invoke<Array<{ docId: number; score: number }>>(
    'as_index_search',
    {
      sessionId: id,
      field,
      terms,
      limit,
    },
  );
  return (raw || []).map((r) => ({
    docId: Number(r.docId) || 0,
    score: Number(r.score) || 0,
  }));
}

export async function tauriCancelIndex(sessionIdOverride?: string): Promise<void> {
  const id = sessionIdOverride || sessionId;
  if (!id) return;
  const { invoke } = await coreApi();
  await invoke('as_index_cancel', { sessionId: id });
}

export function terminateTauriIndexRuntime(): void {
  const id = sessionId;
  sessionId = null;
  if (logUnlisten) {
    try {
      logUnlisten();
    } catch {
      // ignore
    }
    logUnlisten = null;
  }
  if (progressUnlisten) {
    try {
      progressUnlisten();
    } catch {
      // ignore
    }
    progressUnlisten = null;
  }
  if (id) {
    void (async () => {
      try {
        const { invoke } = await coreApi();
        await invoke('as_index_close', { sessionId: id });
      } catch {
        // ignore
      }
    })();
  }
}

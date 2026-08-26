import { useEffect, useRef } from 'react';
import {
  createChatBackend,
  listDayKeys,
  readMeta,
  readDayFileParsed,
} from '@/utils/chatWithMyself/storage.js';
import { dayFileKey, metaKey } from '@/utils/chatWithMyself/paths.js';
import { mergeDayMessages } from '@/utils/chatWithMyself/format.js';
import { cacheDay } from '@/utils/chatWithMyself/chatDb.js';
import {
  CHAT_LOCAL_SYNC_EVENT,
  getChatSyncTabId,
  openChatSyncChannel,
} from '@/utils/chatWithMyself/syncChannel.js';
import { getStorageScopeId } from '@/utils/vault/storageScope';

const POLL_MS = 10_000;

/**
 * Poll remote day/meta changes (S3 / WebDAV) and listen for BroadcastChannel.
 *
 * @param {{
 *   enabled: boolean,
 *   storageReady: boolean,
 *   ctx: import('@/utils/chatWithMyself/storage.js').ChatStorageCtx | null,
 *   remotePoll: boolean,
 *   getWatchedDateStrs: () => string[],
 *   onDayMerged: (dateStr: string, messages: object[], remoteParsed?: object) => void,
 *   onMeta: (meta: { timezone: string, groups: Array<{ name: string, iconPath?: string }> }) => void,
 *   onDayKeys: (keys: string[]) => void,
 *   syncApiRef?: { current: null | { invalidateDay: (dateStr: string) => void, invalidateMeta: () => void } },
 * }} options
 */
export function useChatRemoteSync({
  enabled,
  storageReady,
  ctx,
  remotePoll,
  getWatchedDateStrs,
  onDayMerged,
  onMeta,
  onDayKeys,
  syncApiRef,
}) {
  const metaStampRef = useRef(/** @type {{ etag: string | null, mtime: number | null } | null} */ (null));
  const dayStampRef = useRef(/** @type {Map<string, { etag: string | null, mtime: number | null }>} */ (new Map()));
  const busyRef = useRef(false);
  const queuedRef = useRef(/** @type {{ forceDays: boolean, forceMeta: boolean, extraDates: Set<string> } | null} */ (null));
  const pullGenerationRef = useRef(0);
  const callbacksRef = useRef({
    getWatchedDateStrs,
    onDayMerged,
    onMeta,
    onDayKeys,
  });
  callbacksRef.current = {
    getWatchedDateStrs,
    onDayMerged,
    onMeta,
    onDayKeys,
  };

  useEffect(() => {
    if (!enabled || !storageReady || !ctx) {
      if (syncApiRef) syncApiRef.current = null;
      return undefined;
    }

    metaStampRef.current = null;
    dayStampRef.current.clear();
    pullGenerationRef.current += 1;
    queuedRef.current = null;
    busyRef.current = false;

    const tabId = getChatSyncTabId();
    const scope = getStorageScopeId(ctx);

    const pullDay = async (dateStr, generation) => {
      const parsed = await readDayFileParsed(ctx, dateStr);
      // Drop stale pulls that finished after a newer local write invalidated the day
      if (generation !== pullGenerationRef.current) return null;
      await cacheDay(scope, dayFileKey(dateStr), parsed.content || '');
      callbacksRef.current.onDayMerged(
        dateStr,
        parsed.messages.map((m) => ({ ...m, dateStr })),
        parsed,
      );
      return parsed;
    };

    const runSync = async ({
      forceDays = false,
      forceMeta = false,
      extraDates = [],
    } = {}) => {
      const backend = createChatBackend(ctx);
      const generation = pullGenerationRef.current;

      if (remotePoll || forceMeta) {
        const metaHead = await backend.headMeta(metaKey());
        if (generation !== pullGenerationRef.current) return;
        const prev = metaStampRef.current;
        const metaChanged =
          forceMeta ||
          !prev ||
          prev.etag !== (metaHead?.etag ?? null) ||
          prev.mtime !== (metaHead?.mtime ?? null);
        if (metaChanged) {
          const meta = await readMeta(ctx);
          if (generation !== pullGenerationRef.current) return;
          metaStampRef.current = metaHead
            ? { etag: metaHead.etag, mtime: metaHead.mtime }
            : { etag: null, mtime: null };
          callbacksRef.current.onMeta(meta);
        }
      }

      if (remotePoll || forceDays) {
        try {
          const keys = await listDayKeys(ctx);
          if (generation !== pullGenerationRef.current) return;
          callbacksRef.current.onDayKeys(keys);
        } catch {
          /* ignore list errors */
        }
      }

      const watched = new Set(callbacksRef.current.getWatchedDateStrs?.() || []);
      for (const d of extraDates) {
        if (d) watched.add(d);
      }

      for (const dateStr of watched) {
        if (!dateStr) continue;
        if (generation !== pullGenerationRef.current) return;
        const key = dayFileKey(dateStr);
        let head = null;
        if (remotePoll) {
          head = await backend.headMeta(key);
          if (generation !== pullGenerationRef.current) return;
          const prev = dayStampRef.current.get(dateStr);
          const changed =
            forceDays ||
            extraDates.includes(dateStr) ||
            !prev ||
            prev.etag !== (head?.etag ?? null) ||
            prev.mtime !== (head?.mtime ?? null);
          if (!changed) continue;
        }
        const parsed = await pullDay(dateStr, generation);
        if (parsed == null) {
          // Generation bumped (local write) — abort this run; invalidate queues a follow-up.
          return;
        }
        if (remotePoll) {
          // Re-head after body read so stamp matches latest if a local write raced
          try {
            const head2 = await backend.headMeta(key);
            if (pullGenerationRef.current !== generation) return;
            dayStampRef.current.set(dateStr, {
              etag: head2?.etag ?? head?.etag ?? null,
              mtime: head2?.mtime ?? head?.mtime ?? null,
            });
            if (
              head &&
              head2 &&
              (head2.etag !== head.etag || head2.mtime !== head.mtime)
            ) {
              await pullDay(dateStr, pullGenerationRef.current);
            }
          } catch {
            if (pullGenerationRef.current === generation) {
              dayStampRef.current.set(dateStr, {
                etag: head?.etag ?? null,
                mtime: head?.mtime ?? null,
              });
            }
          }
        }
      }
    };

    const syncOnce = async (opts = {}) => {
      const forceDays = Boolean(opts.forceDays);
      const forceMeta = Boolean(opts.forceMeta);
      const extraDates = Array.isArray(opts.extraDates)
        ? opts.extraDates.filter(Boolean)
        : opts.dateStr
          ? [opts.dateStr]
          : [];

      if (busyRef.current) {
        const q = queuedRef.current || {
          forceDays: false,
          forceMeta: false,
          extraDates: new Set(),
        };
        q.forceDays = q.forceDays || forceDays;
        q.forceMeta = q.forceMeta || forceMeta;
        for (const d of extraDates) q.extraDates.add(d);
        queuedRef.current = q;
        return;
      }

      busyRef.current = true;
      try {
        await runSync({ forceDays, forceMeta, extraDates });
      } catch {
        /* ignore transient sync errors */
      } finally {
        busyRef.current = false;
        const queued = queuedRef.current;
        if (queued) {
          queuedRef.current = null;
          void syncOnce({
            forceDays: queued.forceDays,
            forceMeta: queued.forceMeta,
            extraDates: [...queued.extraDates],
          });
        }
      }
    };

    if (syncApiRef) {
      syncApiRef.current = {
        invalidateDay(dateStr) {
          if (!dateStr) return;
          dayStampRef.current.delete(dateStr);
          pullGenerationRef.current += 1;
          // Ensure a follow-up pull; otherwise an in-flight sync abort leaves UI stale
          void syncOnce({ forceDays: true, dateStr });
        },
        invalidateMeta() {
          metaStampRef.current = null;
          pullGenerationRef.current += 1;
          void syncOnce({ forceMeta: true });
        },
      };
    }

    const channel = openChatSyncChannel();
    const applySyncPayload = (data) => {
      if (!data) return;
      if (data.type === 'meta') {
        void syncOnce({ forceMeta: true });
      } else if (data.type === 'day') {
        void syncOnce({
          forceDays: true,
          dateStr: data.dateStr || undefined,
        });
      }
    };
    const onMessage = (ev) => {
      const data = ev?.data;
      if (!data || data.originTabId === tabId) return;
      applySyncPayload(data);
    };
    const onLocalSync = (ev) => {
      applySyncPayload(ev?.detail);
    };
    channel?.addEventListener('message', onMessage);
    window.addEventListener(CHAT_LOCAL_SYNC_EVENT, onLocalSync);

    let intervalId = null;
    const startInterval = () => {
      if (!remotePoll) return;
      if (intervalId != null) return;
      intervalId = window.setInterval(() => {
        if (document.hidden) return;
        void syncOnce();
      }, POLL_MS);
    };
    const stopInterval = () => {
      if (intervalId != null) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
    };

    const onVisibility = () => {
      if (document.hidden) {
        stopInterval();
      } else {
        void syncOnce({ forceDays: true, forceMeta: true });
        startInterval();
      }
    };
    const onFocus = () => {
      if (!document.hidden) void syncOnce({ forceDays: true, forceMeta: true });
    };
    const onOnline = () => {
      void syncOnce({ forceDays: true, forceMeta: true });
    };

    if (remotePoll && !document.hidden) {
      void syncOnce({ forceMeta: true });
      startInterval();
    }

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('focus', onFocus);
    window.addEventListener('online', onOnline);

    return () => {
      stopInterval();
      queuedRef.current = null;
      if (syncApiRef) syncApiRef.current = null;
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('online', onOnline);
      channel?.removeEventListener('message', onMessage);
      window.removeEventListener(CHAT_LOCAL_SYNC_EVENT, onLocalSync);
      try {
        channel?.close();
      } catch {
        /* ignore */
      }
    };
  }, [enabled, storageReady, ctx, remotePoll, syncApiRef]);
}

/** Helper for pane: merge remote day into current message window by id. */
export function mergeMessagesForDate(
  prevMessages,
  dateStr,
  remoteMessages,
  remoteParsed,
  extraDeletedIds,
) {
  const localForDay = (prevMessages || []).filter((m) => m.dateStr === dateStr);
  const otherDays = (prevMessages || []).filter((m) => m.dateStr !== dateStr);
  const extra = extraDeletedIds instanceof Set
    ? [...extraDeletedIds]
    : Array.isArray(extraDeletedIds)
      ? extraDeletedIds
      : [];
  const extraMap = {};
  for (const id of extra) {
    if (id) extraMap[id] = new Date(0).toISOString();
  }
  const merged = mergeDayMessages(
    {
      messages: localForDay,
      deletedIds: extra,
      deletedAtById: extraMap,
    },
    remoteParsed || {
      messages: remoteMessages || [],
      deletedIds: [],
      deletedAtById: {},
    },
  );
  const withDate = merged.messages.map((m) => ({ ...m, dateStr }));
  const localById = new Map(localForDay.map((m) => [m.id, m]));
  const mergedWithFlags = withDate.map((m) => {
    const local = localById.get(m.id);
    if (!local) return m;
    let next = m;
    if (local.pendingReactionSync) {
      next = {
        ...next,
        reactions: local.reactions,
        reactionsAt: local.reactionsAt,
        pendingReactionSync: true,
      };
    }
    if (!local.pendingSync) return next;
    if (
      local.body === next.body &&
      (local.editedAt || '') === (next.editedAt || '')
    ) {
      return { ...next, pendingSync: local.pendingSync };
    }
    return next;
  });
  const deleted = new Set(merged.deletedIds || []);
  const mergedIds = new Set(
    mergedWithFlags.map((m) => m.id).filter(Boolean),
  );
  const rest = otherDays.filter(
    (m) => !deleted.has(m.id) && !mergedIds.has(m.id),
  );
  return [...rest, ...mergedWithFlags].sort(
    (a, b) => (Date.parse(a.at) || 0) - (Date.parse(b.at) || 0),
  );
}

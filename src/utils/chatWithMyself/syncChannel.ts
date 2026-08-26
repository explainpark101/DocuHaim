export const CHAT_SYNC_CHANNEL = 's3haim-chat-sync';
/** Same-tab refresh (BroadcastChannel ignores originTabId === this tab). */
export const CHAT_LOCAL_SYNC_EVENT = 's3haim-chat-local-sync';

const TAB_ID =
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `tab-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export function getChatSyncTabId() {
  return TAB_ID;
}

/**
 * @returns {BroadcastChannel | null}
 */
export function openChatSyncChannel() {
  if (typeof BroadcastChannel === 'undefined') return null;
  try {
    return new BroadcastChannel(CHAT_SYNC_CHANNEL);
  } catch {
    return null;
  }
}

/**
 * Notify other tabs via BroadcastChannel.
 * @param {'day' | 'meta'} type
 * @param {{ dateStr?: string }} [extra]
 */
export function postChatSyncEvent(type: any, extra = {}) {
  const ch = openChatSyncChannel();
  if (!ch) return;
  try {
    ch.postMessage({
      type,
      // @ts-expect-error TS(2339): Property 'dateStr' does not exist on type '{}'.
      dateStr: extra.dateStr || null,
      originTabId: TAB_ID,
      at: Date.now(),
    });
  } catch {
    /* ignore */
  } finally {
    try {
      ch.close();
    } catch {
      /* ignore */
    }
  }
}

/**
 * Notify this tab's chat pane (e.g. share-target wrote while /chat is open).
 * @param {'day' | 'meta'} type
 * @param {{ dateStr?: string }} [extra]
 */
export function postChatLocalSyncEvent(type: any, extra = {}) {
  if (typeof window === 'undefined') return;
  try {
    window.dispatchEvent(
      new CustomEvent(CHAT_LOCAL_SYNC_EVENT, {
        detail: {
          type,
          // @ts-expect-error TS(2339): Property 'dateStr' does not exist on type '{}'.
          dateStr: extra.dateStr || null,
          at: Date.now(),
        },
      }),
    );
  } catch {
    /* ignore */
  }
}

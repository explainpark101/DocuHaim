export const CHAT_SYNC_CHANNEL = 's3haim-chat-sync';

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
 * @param {'day' | 'meta'} type
 * @param {{ dateStr?: string }} [extra]
 */
export function postChatSyncEvent(type, extra = {}) {
  const ch = openChatSyncChannel();
  if (!ch) return;
  try {
    ch.postMessage({
      type,
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

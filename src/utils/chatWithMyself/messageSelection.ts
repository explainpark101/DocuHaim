/**
 * Pure helpers for chat message multi-select (Telegram-style).
 */

import {
  normalizeReaction,
  reactionKey,
  type ChatReaction,
} from '@/utils/chatWithMyself/reactions';

export function toggleSelectedId(
  selected: ReadonlySet<string>,
  id: string,
): Set<string> {
  const next = new Set(selected);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}

/**
 * Inclusive range select along an ordered id list (visible message order).
 * Adds every id between `anchorId` and `targetId` (inclusive).
 */
export function rangeSelectIds(
  orderedIds: readonly string[],
  selected: ReadonlySet<string>,
  anchorId: string,
  targetId: string,
): Set<string> {
  const a = orderedIds.indexOf(anchorId);
  const b = orderedIds.indexOf(targetId);
  if (a < 0 || b < 0) {
    return toggleSelectedId(selected, targetId);
  }
  const lo = Math.min(a, b);
  const hi = Math.max(a, b);
  const next = new Set(selected);
  for (let i = lo; i <= hi; i += 1) {
    const id = orderedIds[i];
    if (id) next.add(id);
  }
  return next;
}

/** Pin if any selected message is unpinned; otherwise unpin all. */
export function shouldBulkPin(
  messages: ReadonlyArray<{ pinnedAt?: string | null }>,
): boolean {
  return messages.some((m) => !m?.pinnedAt);
}

/** Sort messages by `at` ascending for stable copy order. */
export function sortMessagesByAtAsc<T extends { at?: string }>(
  messages: readonly T[],
): T[] {
  return [...messages].sort((a, b) => {
    const ta = Date.parse(String(a?.at || '')) || 0;
    const tb = Date.parse(String(b?.at || '')) || 0;
    return ta - tb;
  });
}

function isTruthyMarkdownFlag(value: unknown): boolean {
  return value === true || value === '1' || value === 'true';
}

/** Join message bodies for merge (trim trailing whitespace per body). */
export function joinMessageBodiesForMerge(
  messages: ReadonlyArray<{ body?: string | null }>,
): string {
  return messages
    .map((m) => String(m?.body ?? '').replace(/\s+$/u, ''))
    .filter((body) => body.length > 0)
    .join('\n\n');
}

/** Union reactions in encounter order (dedupe by reactionKey). */
export function unionMessageReactions(
  messages: ReadonlyArray<{ reactions?: ChatReaction[] | null }>,
): ChatReaction[] {
  const out: ChatReaction[] = [];
  const seen = new Set<string>();
  for (const msg of messages) {
    const list = Array.isArray(msg?.reactions) ? msg.reactions : [];
    for (const item of list) {
      const reaction = normalizeReaction(item);
      if (!reaction) continue;
      const key = reactionKey(reaction);
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(reaction);
    }
  }
  return out;
}

export type MergeChatMessagesInput = {
  id: string;
  at?: string;
  body?: string | null;
  group?: string;
  markdown?: boolean | string;
  reactions?: ChatReaction[] | null;
  pinnedAt?: string | null;
};

export type MergeChatMessagesPlan<T extends MergeChatMessagesInput> = {
  keep: T;
  remove: T[];
  body: string;
  markdown: boolean;
  reactions: ChatReaction[];
  reactionsAt: string;
  pinnedAt: string;
};

/**
 * Plan merging 2+ messages into the earliest (`at`) survivor.
 * Caller deletes `remove` and writes body/reactions/pin onto `keep`.
 */
export function planMergeChatMessages<T extends MergeChatMessagesInput>(
  messages: readonly T[],
): MergeChatMessagesPlan<T> | null {
  if (messages.length < 2) return null;
  const ordered = sortMessagesByAtAsc(messages);
  const keep = ordered[0];
  if (!keep) return null;
  const remove = ordered.slice(1);
  const body = joinMessageBodiesForMerge(ordered);
  const reactions = unionMessageReactions(ordered);
  const reactionsAt =
    reactions.length > 0 ? new Date().toISOString() : '';
  const pinnedAt =
    ordered.map((m) => String(m?.pinnedAt || '').trim()).find(Boolean) || '';
  const markdown = ordered.some((m) => isTruthyMarkdownFlag(m?.markdown));
  return {
    keep,
    remove,
    body,
    markdown,
    reactions,
    reactionsAt,
    pinnedAt,
  };
}

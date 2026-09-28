/**
 * Pure helpers for chat message multi-select (Telegram-style).
 */

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

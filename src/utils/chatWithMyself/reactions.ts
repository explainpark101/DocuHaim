/** Discord-style message reactions (emoji + Lucide icon names). */

export type ChatReactionKind = 'emoji' | 'lucide';

export type ChatReaction = {
  kind: ChatReactionKind;
  value: string;
};

const KIND_PREFIX: Record<ChatReactionKind, string> = {
  emoji: 'e',
  lucide: 'l',
};

const PREFIX_KIND: Record<string, ChatReactionKind> = {
  e: 'emoji',
  emoji: 'emoji',
  l: 'lucide',
  lucide: 'lucide',
};

function escapeToken(value: string): string {
  return String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/\|/g, '\\|');
}

function unescapeToken(value: string): string {
  return String(value ?? '')
    .replace(/\\\|/g, '|')
    .replace(/\\\\/g, '\\');
}

/** Stable key for equality / Set lookups. */
export function reactionKey(reaction: ChatReaction): string {
  return `${reaction.kind}:${reaction.value}`;
}

export function normalizeReaction(
  input: Partial<ChatReaction> | null | undefined,
): ChatReaction | null {
  if (!input || typeof input !== 'object') return null;
  const kind = input.kind === 'lucide' ? 'lucide' : input.kind === 'emoji' ? 'emoji' : null;
  const value = String(input.value ?? '').trim();
  if (!kind || !value) return null;
  if (kind === 'lucide') {
    const name = value.toLowerCase().replace(/_/g, '-');
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) return null;
    return { kind, value: name };
  }
  // Reject control chars / attribute breakers; allow ZWJ sequences.
  if (/[\u0000-\u001f"|]/.test(value)) return null;
  return { kind, value };
}

/**
 * Parse day-file `reactions` attribute.
 * Format: `e:👍|e:❤️|l:heart` (pipe-separated; `\|` / `\\` escaped).
 */
export function parseReactionsAttr(raw: string | null | undefined): ChatReaction[] {
  const text = String(raw ?? '').trim();
  if (!text) return [];
  const parts: string[] = [];
  let buf = '';
  let escaped = false;
  for (const ch of text) {
    if (escaped) {
      buf += ch;
      escaped = false;
      continue;
    }
    if (ch === '\\') {
      escaped = true;
      continue;
    }
    if (ch === '|') {
      parts.push(buf);
      buf = '';
      continue;
    }
    buf += ch;
  }
  if (buf || text.endsWith('|')) parts.push(buf);

  const out: ChatReaction[] = [];
  const seen = new Set<string>();
  for (const part of parts) {
    const token = part.trim();
    if (!token) continue;
    const colon = token.indexOf(':');
    if (colon <= 0) continue;
    const kind = PREFIX_KIND[token.slice(0, colon).toLowerCase()];
    if (!kind) continue;
    const value = unescapeToken(token.slice(colon + 1));
    const reaction = normalizeReaction({ kind, value });
    if (!reaction) continue;
    const key = reactionKey(reaction);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(reaction);
  }
  return out;
}

/** Serialize reactions for the day-file attribute (empty → omit). */
export function serializeReactionsAttr(reactions: ChatReaction[] | null | undefined): string {
  const list = Array.isArray(reactions) ? reactions : [];
  const seen = new Set<string>();
  const parts: string[] = [];
  for (const item of list) {
    const reaction = normalizeReaction(item);
    if (!reaction) continue;
    const key = reactionKey(reaction);
    if (seen.has(key)) continue;
    seen.add(key);
    parts.push(`${KIND_PREFIX[reaction.kind]}:${escapeToken(reaction.value)}`);
  }
  return parts.join('|');
}

export function toggleReaction(
  reactions: ChatReaction[] | null | undefined,
  next: ChatReaction,
): ChatReaction[] {
  const normalized = normalizeReaction(next);
  if (!normalized) return Array.isArray(reactions) ? [...reactions] : [];
  const key = reactionKey(normalized);
  const list = Array.isArray(reactions) ? reactions : [];
  if (list.some((r) => reactionKey(r) === key)) {
    return list.filter((r) => reactionKey(r) !== key);
  }
  return [...list, normalized];
}

export function hasReaction(
  reactions: ChatReaction[] | null | undefined,
  candidate: ChatReaction,
): boolean {
  const normalized = normalizeReaction(candidate);
  if (!normalized) return false;
  const key = reactionKey(normalized);
  return (reactions || []).some((r) => reactionKey(r) === key);
}

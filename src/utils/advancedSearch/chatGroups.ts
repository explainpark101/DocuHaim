/**
 * Chat group picker helpers for Advanced Search nested mode.
 */

import { SELF_GROUP } from '@/utils/chatWithMyself/paths.js';
import type { AdvancedSearchHit } from '@/utils/advancedSearch/query';
import { fuzzyMatchText, scoreFuzzyRelevance } from '@/utils/advancedSearch/fuzzyMatch';

export type ChatGroupEntry = {
  id: string;
  name: string;
  aliases?: string[];
  iconPath?: string;
};

export const CHAT_SELECT_GROUP_COMMAND_ID = 'chat-select-group' as const;
export const CHAT_SELECT_GROUP_ITEM_COMMAND_ID = 'chat-select-group-item' as const;
export const CHAT_CLEAR_GROUP_COMMAND_ID = 'chat-clear-group' as const;

/** Clear group filter deep-link. */
export function chatClearGroupHashPath(): string {
  return '/chat#group-clear';
}

/** Build /chat#group-{encodedId} for deep-link selection. */
export function chatGroupHashPath(groupId: string): string {
  const id = String(groupId || '').trim() || SELF_GROUP;
  return `/chat#group-${encodeURIComponent(id)}`;
}

/**
 * Parse group id from location hash (`#group-…` / `#group=…`).
 * Returns null for clear hashes / non-group hashes.
 * Does not lowercase the id (ids may be case-sensitive).
 */
export function parseChatGroupHash(hash: string): string | null {
  const raw = String(hash || '').replace(/^#/, '');
  if (/^group-clear$/i.test(raw) || /^clear-group$/i.test(raw)) return null;
  const m = raw.match(/^group[-=](.+)$/i);
  if (!m?.[1]) return null;
  try {
    return decodeURIComponent(m[1]);
  } catch {
    return m[1];
  }
}

export function isChatClearGroupHash(hash: string): boolean {
  const raw = String(hash || '')
    .replace(/^#/, '')
    .toLowerCase();
  return raw === 'group-clear' || raw === 'clear-group';
}

function matchesQuery(entry: ChatGroupEntry, q: string): boolean {
  if (!q) return true;
  const hay = [entry.id, entry.name, ...(entry.aliases || [])].join(' ');
  return fuzzyMatchText(hay, q);
}

function clearGroupHit(query: string): AdvancedSearchHit | null {
  const q = String(query || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
  const title = '그룹 선택 해제';
  const keywords = [
    '그룹 선택 해제',
    '그룹 해제',
    'clear group',
    'deselect',
    '전체 보기',
    '필터 해제',
  ];
  let score = 1;
  if (q) {
    score = Math.max(
      scoreFuzzyRelevance(title, q),
      ...keywords.map((k) => scoreFuzzyRelevance(k, q)),
    );
    if (score <= 0) return null;
  }
  return {
    docId: 'chat-group:clear',
    kind: 'command',
    path: chatClearGroupHashPath(),
    title,
    preview: '전체 그룹 보기 · 필터 끄기',
    commandId: CHAT_CLEAR_GROUP_COMMAND_ID,
    reasons: ['command'],
    score,
  };
}

/**
 * List selectable chat groups for Advanced Search (SELF_GROUP first, then given groups).
 * Clear-filter action is always pinned at the bottom when shown.
 */
export function listChatGroupHits(
  groups: ChatGroupEntry[] | null | undefined,
  query: string,
  limit = 80,
): AdvancedSearchHit[] {
  const q = String(query || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');

  const self: ChatGroupEntry = { id: SELF_GROUP, name: SELF_GROUP };
  const rest = Array.isArray(groups) ? groups : [];
  const seen = new Set<string>([SELF_GROUP]);
  const ordered: ChatGroupEntry[] = [self];

  for (const g of rest) {
    const id = String(g?.id || '').trim();
    const name = String(g?.name || '').trim();
    if (!id || !name || id === SELF_GROUP || name === SELF_GROUP) continue;
    if (seen.has(id)) continue;
    seen.add(id);
    const row: ChatGroupEntry = { id, name };
    if (Array.isArray(g.aliases) && g.aliases.length) {
      row.aliases = g.aliases;
    }
    const iconPath = String(g.iconPath || '').trim();
    if (iconPath) row.iconPath = iconPath;
    ordered.push(row);
  }

  const hits: AdvancedSearchHit[] = [];
  for (let i = 0; i < ordered.length; i++) {
    const entry = ordered[i];
    if (!entry || !matchesQuery(entry, q)) continue;
    let score = 900 - i;
    if (q) {
      score = scoreFuzzyRelevance(entry.name, q);
      const aliasScore = Math.max(
        0,
        ...(entry.aliases || []).map((a) => scoreFuzzyRelevance(a, q) - 30),
      );
      const idScore = Math.max(0, scoreFuzzyRelevance(entry.id, q) - 60);
      score = Math.max(score, aliasScore, idScore);
      if (score <= 0) continue;
    }
    const isSelf = entry.id === SELF_GROUP;
    const hit: AdvancedSearchHit = {
      docId: `chat-group:${entry.id}`,
      kind: 'command',
      path: chatGroupHashPath(entry.id),
      title: entry.name,
      preview: isSelf ? '기본 그룹 · 선택' : '채팅 그룹 · 선택',
      commandId: CHAT_SELECT_GROUP_ITEM_COMMAND_ID,
      group: entry.id,
      reasons: ['command'],
      score,
    };
    if (entry.iconPath) hit.iconPath = entry.iconPath;
    hits.push(hit);
  }

  hits.sort(
    (a, b) => b.score - a.score || a.title.localeCompare(b.title, 'ko'),
  );

  const clearHit = clearGroupHit(q);
  const room = clearHit ? Math.max(0, limit - 1) : limit;
  const out = hits.slice(0, room);
  if (clearHit) out.push(clearHit);
  return out;
}

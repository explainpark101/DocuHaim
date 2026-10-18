import type { OgPayload } from '@/utils/chatWithMyself/og';
import {
  groupUrlsByOgIdentity,
  ogPayloadIdentity,
  type OgUrlGroup,
} from '@/utils/chatWithMyself/ogIdentity';

/** OG preview stored on a chat bubble (day-file `og` attribute). */
export type ChatBubbleOgCard = {
  /** Payload identity after fetch (`yt:…` or content hash). */
  key: string;
  /** Pre-fetch keys (`ogUrlIdentityKey`) that collapsed into this card. */
  sourceKeys: string[];
  /** Click target (first URL in the bubble, may still include `t`). */
  url: string;
  /** Canonical fetch URL (YouTube has no timestamp). */
  fetchUrl: string;
  urls: string[];
  title: string;
  description: string;
  image: string;
  siteName: string;
  type: string;
  provider: string;
  embedHtml: string;
  fetchedAt: string;
};

const DESC_MAX = 800;
const EMBED_MAX = 6000;

function clip(value: string, max: number): string {
  const text = String(value || '');
  if (text.length <= max) return text;
  return text.slice(0, max);
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const out: string[] = [];
  for (const item of value) {
    const text = String(item || '').trim();
    if (text && !out.includes(text)) out.push(text);
  }
  return out;
}

export function payloadIsUsable(data: OgPayload | null | undefined): boolean {
  if (!data || data.provider === 'fallback') return false;
  return Boolean(
    String(data.title || '').trim() ||
      String(data.description || '').trim() ||
      String(data.image || '').trim() ||
      String(data.embedHtml || '').trim(),
  );
}

export function cardToPayload(card: ChatBubbleOgCard): OgPayload {
  return {
    url: card.fetchUrl || card.url,
    fetchedAt: card.fetchedAt || '',
    title: card.title || '',
    description: card.description || '',
    image: card.image || '',
    siteName: card.siteName || '',
    type: card.type || '',
    provider: card.provider || '',
    embedHtml: card.embedHtml || '',
  };
}

function normalizeCard(raw: unknown): ChatBubbleOgCard | null {
  if (!raw || typeof raw !== 'object') return null;
  const row = raw as Partial<ChatBubbleOgCard>;
  const url = String(row.url || '').trim();
  const fetchUrl = String(row.fetchUrl || url).trim();
  if (!url && !fetchUrl) return null;
  const urls = asStringArray(row.urls);
  if (!urls.length && url) urls.push(url);
  const sourceKeys = asStringArray(row.sourceKeys);
  const payload: OgPayload = {
    url: fetchUrl || url,
    fetchedAt: String(row.fetchedAt || ''),
    title: String(row.title || ''),
    description: String(row.description || ''),
    image: String(row.image || ''),
    siteName: String(row.siteName || ''),
    type: String(row.type || ''),
    provider: String(row.provider || ''),
    embedHtml: String(row.embedHtml || ''),
  };
  const key = String(row.key || '').trim() || ogPayloadIdentity(payload);
  if (!sourceKeys.length) sourceKeys.push(key);
  return {
    key,
    sourceKeys,
    url: url || fetchUrl,
    fetchUrl: fetchUrl || url,
    urls,
    title: payload.title,
    description: clip(payload.description, DESC_MAX),
    image: payload.image,
    siteName: payload.siteName,
    type: payload.type,
    provider: payload.provider,
    embedHtml: clip(payload.embedHtml, EMBED_MAX),
    fetchedAt: payload.fetchedAt,
  };
}

export function parseOgCardsAttr(raw: string | null | undefined): ChatBubbleOgCard[] {
  const text = String(raw ?? '').trim();
  if (!text) return [];
  try {
    const parsed = JSON.parse(decodeURIComponent(text)) as unknown;
    if (!Array.isArray(parsed)) return [];
    const cards: ChatBubbleOgCard[] = [];
    for (const item of parsed) {
      const card = normalizeCard(item);
      if (card) cards.push(card);
    }
    return cards;
  } catch {
    return [];
  }
}

export function serializeOgCardsAttr(
  cards: ChatBubbleOgCard[] | null | undefined,
): string {
  const list = (cards || [])
    .map((card) => normalizeCard(card))
    .filter((card): card is ChatBubbleOgCard => card != null);
  if (!list.length) return '';
  return encodeURIComponent(JSON.stringify(list));
}

export function ogCardsSignature(
  cards: ChatBubbleOgCard[] | null | undefined,
): string {
  return (cards || [])
    .map((card) =>
      [
        card.key,
        card.fetchUrl,
        card.urls.join('\n'),
        card.title,
        card.image,
        card.fetchedAt,
      ].join('\u0001'),
    )
    .join('\u0002');
}

export function savedCardsCoverGroups(
  cards: ChatBubbleOgCard[] | null | undefined,
  groups: readonly OgUrlGroup[],
): boolean {
  if (!groups.length) return true;
  const keys = new Set((cards || []).flatMap((card) => card.sourceKeys));
  return groups.every((group) => keys.has(group.key));
}

export function seedForGroup(
  cards: ChatBubbleOgCard[] | null | undefined,
  group: OgUrlGroup,
): OgPayload | null {
  const card = (cards || []).find((item) => item.sourceKeys.includes(group.key));
  if (!card || !payloadIsUsable(cardToPayload(card))) return null;
  return cardToPayload(card);
}

/**
 * Collapse resolved groups that share one OG payload.
 * Returns null while any group is still unresolved.
 * Skips fallback payloads so a later visit can retry.
 */
export function collectBubbleOgCards(
  groups: readonly OgUrlGroup[],
  byKey: Readonly<Record<string, OgPayload | undefined>>,
): ChatBubbleOgCard[] | null {
  if (!groups.length) return [];
  for (const group of groups) {
    if (!byKey[group.key]) return null;
  }
  const cards: ChatBubbleOgCard[] = [];
  const index = new Map<string, ChatBubbleOgCard>();
  for (const group of groups) {
    const data = byKey[group.key];
    if (!data || !payloadIsUsable(data)) continue;
    const key = ogPayloadIdentity(data, group.key);
    const existing = index.get(key);
    if (existing) {
      for (const url of group.urls) {
        if (!existing.urls.includes(url)) existing.urls.push(url);
      }
      if (!existing.sourceKeys.includes(group.key)) existing.sourceKeys.push(group.key);
      continue;
    }
    const card: ChatBubbleOgCard = {
      key,
      sourceKeys: [group.key],
      url: group.displayUrl,
      fetchUrl: group.fetchUrl,
      urls: [...group.urls],
      title: data.title || '',
      description: clip(data.description || '', DESC_MAX),
      image: data.image || '',
      siteName: data.siteName || '',
      type: data.type || '',
      provider: data.provider || '',
      embedHtml: clip(data.embedHtml || '', EMBED_MAX),
      fetchedAt: data.fetchedAt || '',
    };
    index.set(key, card);
    cards.push(card);
  }
  return cards;
}

export function ogCardsToSearchText(
  cards: ChatBubbleOgCard[] | null | undefined,
): string {
  const parts: string[] = [];
  for (const card of cards || []) {
    const text = [card.url, card.title, card.description, card.siteName, card.fetchUrl]
      .map((value) => String(value || '').trim())
      .filter(Boolean)
      .join('\n');
    if (text) parts.push(text);
  }
  return parts.join('\n\n');
}

export function mergeOgCardsOntoWinner<
  T extends { body?: string; ogCards?: ChatBubbleOgCard[] | null },
>(winner: T, loser: T | null | undefined): T {
  if (!loser) return winner;
  const winnerCards = Array.isArray(winner.ogCards) ? winner.ogCards : [];
  const loserCards = Array.isArray(loser.ogCards) ? loser.ogCards : [];
  if (winnerCards.length || !loserCards.length) return winner;
  if (String(winner.body ?? '') !== String(loser.body ?? '')) return winner;
  return { ...winner, ogCards: loserCards };
}

export function groupsForMessageUrls(urls: readonly string[]): OgUrlGroup[] {
  return groupUrlsByOgIdentity(urls);
}

import data from '@emoji-mart/data';
import type { ChatReaction } from '@/utils/chatWithMyself/reactions';
import { normalizeReaction } from '@/utils/chatWithMyself/reactions';

type EmojiMartSkin = { unified?: string; native?: string };
type EmojiMartEmoji = {
  id?: string;
  name?: string;
  keywords?: string[];
  emoticons?: string[];
  skins?: EmojiMartSkin[];
};

/** native emoji → searchable id / name / keywords (built once). */
let nativeToKeywords: Map<string, string> | null = null;

function ensureEmojiKeywordIndex(): Map<string, string> {
  if (nativeToKeywords) return nativeToKeywords;
  const map = new Map<string, string>();
  const emojis = (data as { emojis?: Record<string, EmojiMartEmoji> })?.emojis || {};
  for (const emoji of Object.values(emojis)) {
    if (!emoji || typeof emoji !== 'object') continue;
    const parts = [
      emoji.id,
      emoji.name,
      ...(Array.isArray(emoji.keywords) ? emoji.keywords : []),
      ...(Array.isArray(emoji.emoticons) ? emoji.emoticons : []),
    ]
      .map((v) => String(v || '').trim())
      .filter(Boolean);
    const hay = parts.join(' ');
    if (!hay) continue;
    for (const skin of emoji.skins || []) {
      const native = String(skin?.native || '').trim();
      if (!native) continue;
      const prev = map.get(native);
      map.set(native, prev ? `${prev} ${hay}` : hay);
    }
  }
  nativeToKeywords = map;
  return map;
}

function lucideSearchParts(name: string): string[] {
  const kebab = name.trim().toLowerCase();
  if (!kebab) return [];
  const spaced = kebab.replace(/-/g, ' ');
  const compact = kebab.replace(/-/g, '');
  return [...new Set([kebab, spaced, compact].filter(Boolean))];
}

/**
 * Flatten message reactions into searchable plain text.
 * - emoji: native char + emoji-mart id/name/keywords/emoticons
 * - lucide: kebab name, spaced words, and compact form
 */
export function reactionsToSearchText(
  reactions: ChatReaction[] | null | undefined,
): string {
  const list = Array.isArray(reactions) ? reactions : [];
  if (list.length === 0) return '';

  const index = ensureEmojiKeywordIndex();
  const parts: string[] = [];

  for (const item of list) {
    const reaction = normalizeReaction(item);
    if (!reaction) continue;
    if (reaction.kind === 'emoji') {
      parts.push(reaction.value);
      const keywords = index.get(reaction.value);
      if (keywords) parts.push(keywords);
      continue;
    }
    parts.push(...lucideSearchParts(reaction.value));
  }

  return parts.join('\n');
}

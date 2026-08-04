import { Store, FrequentlyUsed } from 'emoji-mart';

/**
 * Default “frequently used” emoji IDs for chat reactions.
 * Order: check, x, thumbs up, heart, thinking.
 */
export const CHAT_DEFAULT_FREQUENT_EMOJI_IDS = [
  'white_check_mark',
  'x',
  '+1',
  'heart',
  'thinking_face',
] as const;

/**
 * Ensure the reaction picker Frequent category includes our defaults.
 * Merges into emoji-mart’s localStorage-backed Store without wiping user history.
 */
export function ensureChatDefaultFrequentEmojis(): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = Store.get('frequently') as Record<string, number> | null;

    if (!raw) {
      const next: Record<string, number> = {};
      CHAT_DEFAULT_FREQUENT_EMOJI_IDS.forEach((id, i) => {
        next[id] = 200 - i;
      });
      const stock = (FrequentlyUsed.DEFAULTS || []) as string[];
      stock.forEach((id, i) => {
        if (next[id] == null) next[id] = Math.max(1, 40 - i);
      });
      Store.set('frequently', next);
      return;
    }

    for (const id of CHAT_DEFAULT_FREQUENT_EMOJI_IDS) {
      if (raw[id] == null) {
        FrequentlyUsed.add(id);
      }
    }
  } catch {
    /* ignore storage / init errors */
  }
}

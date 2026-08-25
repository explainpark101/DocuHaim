/**
 * Advanced Search nested picker: insert Unicode circled numbers (①, ②, …).
 */
import type { AdvancedSearchHit } from './query';
import { scoreFuzzyRelevance } from './fuzzyMatch';
import {
  CIRCLE_NUMBER_PICKER_MAX,
  CIRCLE_NUMBER_PICKER_MIN,
  toCircledNumber,
} from '@/utils/circleNumber';

export const CIRCLE_NUMBER_INSERT_COMMAND_ID = 'editor-insert-circle-number' as const;
export const CIRCLE_NUMBER_INSERT_ITEM_ID = 'circle-number-insert-item' as const;

export type CircleNumberInsertCommandId =
  | typeof CIRCLE_NUMBER_INSERT_COMMAND_ID
  | typeof CIRCLE_NUMBER_INSERT_ITEM_ID;

export function isCircleNumberInsertCommandId(
  id: string | undefined | null,
): id is CircleNumberInsertCommandId {
  return (
    id === CIRCLE_NUMBER_INSERT_COMMAND_ID || id === CIRCLE_NUMBER_INSERT_ITEM_ID
  );
}

/** Nested step 2: pick a circled number to insert at the editor cursor. */
export function listCircleNumberHits(query: string, limit = 80): AdvancedSearchHit[] {
  const q = String(query || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
  const hits: AdvancedSearchHit[] = [];

  for (let n = CIRCLE_NUMBER_PICKER_MIN; n <= CIRCLE_NUMBER_PICKER_MAX; n += 1) {
    const glyph = toCircledNumber(n);
    const title = `${glyph}  ${n}`;
    const preview = `원숫자 ${n} 삽입`;
    let score = 1000 - n;
    if (q) {
      score = Math.max(
        scoreFuzzyRelevance(title, q),
        scoreFuzzyRelevance(glyph, q),
        scoreFuzzyRelevance(String(n), q),
        scoreFuzzyRelevance(preview, q),
      );
      if (score <= 0) continue;
    }
    hits.push({
      docId: `circle-number:${n}`,
      kind: 'command',
      path: glyph,
      title,
      preview,
      commandId: CIRCLE_NUMBER_INSERT_ITEM_ID,
      reasons: ['command'],
      score,
    });
  }

  if (q) {
    hits.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'ko'));
  }
  return hits.slice(0, limit);
}

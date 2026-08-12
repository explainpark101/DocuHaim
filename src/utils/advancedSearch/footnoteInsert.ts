/**
 * Advanced Search nested picker: insert footnote (existing vs compose).
 */
import type { AdvancedSearchHit } from './query';
import { scoreFuzzyRelevance } from './fuzzyMatch';
import { listExistingFootnoteEntries } from '@/utils/footnoteInsertApply';

export const FOOTNOTE_INSERT_COMMAND_ID = 'editor-insert-footnote' as const;
export const FOOTNOTE_INSERT_PICK_EXISTING_ID = 'footnote-insert-pick-existing' as const;
export const FOOTNOTE_INSERT_COMPOSE_ID = 'footnote-insert-compose' as const;
export const FOOTNOTE_INSERT_EXISTING_ITEM_ID = 'footnote-insert-existing-item' as const;

export type FootnoteInsertCommandId =
  | typeof FOOTNOTE_INSERT_COMMAND_ID
  | typeof FOOTNOTE_INSERT_PICK_EXISTING_ID
  | typeof FOOTNOTE_INSERT_COMPOSE_ID
  | typeof FOOTNOTE_INSERT_EXISTING_ITEM_ID;

export function isFootnoteInsertCommandId(
  id: string | undefined | null,
): id is FootnoteInsertCommandId {
  return (
    id === FOOTNOTE_INSERT_COMMAND_ID ||
    id === FOOTNOTE_INSERT_PICK_EXISTING_ID ||
    id === FOOTNOTE_INSERT_COMPOSE_ID ||
    id === FOOTNOTE_INSERT_EXISTING_ITEM_ID
  );
}

export function isFootnoteRelatedCommandId(id: string | undefined | null): boolean {
  if (!id) return false;
  if (isFootnoteInsertCommandId(id)) return true;
  return id.startsWith('settings-footnote-');
}

type FootnoteInsertHandlers = {
  getMarkdown: () => string;
  insertExisting: (label: string) => void;
  openCompose: () => void;
};

let handlers: FootnoteInsertHandlers | null = null;
const listeners = new Set<() => void>();

function notify(): void {
  for (const listener of listeners) {
    try {
      listener();
    } catch {
      // ignore
    }
  }
}

export function registerFootnoteInsertHandlers(
  next: FootnoteInsertHandlers,
): () => void {
  handlers = next;
  notify();
  return () => {
    if (handlers === next) handlers = null;
    notify();
  };
}

export function hasFootnoteInsertHandlers(): boolean {
  return handlers != null;
}

export function getFootnoteInsertMarkdown(): string {
  try {
    return handlers?.getMarkdown() ?? '';
  } catch {
    return '';
  }
}

export function runInsertExistingFootnote(label: string): boolean {
  if (!handlers) return false;
  try {
    handlers.insertExisting(label);
    return true;
  } catch (err) {
    console.warn('[advancedSearch] insert existing footnote failed', err);
    return false;
  }
}

export function runOpenFootnoteCompose(): boolean {
  if (!handlers) return false;
  try {
    handlers.openCompose();
    return true;
  } catch (err) {
    console.warn('[advancedSearch] open footnote compose failed', err);
    return false;
  }
}

export function subscribeFootnoteInsertHandlers(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function choiceHit(
  id: typeof FOOTNOTE_INSERT_PICK_EXISTING_ID | typeof FOOTNOTE_INSERT_COMPOSE_ID,
  title: string,
  preview: string,
  keywords: string[],
  query: string,
  index: number,
): AdvancedSearchHit | null {
  const q = String(query || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
  let score = 1000 - index;
  if (q) {
    score = Math.max(
      scoreFuzzyRelevance(title, q),
      ...keywords.map((k) => scoreFuzzyRelevance(k, q)),
    );
    if (score <= 0) return null;
  }
  return {
    docId: `command:${id}`,
    kind: 'command',
    path: '',
    title,
    preview,
    commandId: id,
    reasons: ['command'],
    score,
  };
}

/** Nested step 1: pick existing vs compose. */
export function listFootnoteInsertChoiceHits(query: string): AdvancedSearchHit[] {
  const hits = [
    choiceHit(
      FOOTNOTE_INSERT_PICK_EXISTING_ID,
      '기존 각주 선택',
      '문서 하단 Sources의 [^N]을 커서에 삽입',
      ['기존', '선택', 'existing', 'reuse', '각주', 'footnote', 'source'],
      query,
      0,
    ),
    choiceHit(
      FOOTNOTE_INSERT_COMPOSE_ID,
      '직접 각주 내용 입력',
      '제목·URL 두 줄을 입력해 새 각주를 삽입',
      ['직접', '입력', 'compose', 'new', '작성', '각주', 'footnote', 'url'],
      query,
      1,
    ),
  ].filter((hit): hit is AdvancedSearchHit => Boolean(hit));

  if (query.trim()) {
    hits.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'ko'));
  }
  return hits;
}

/** Nested step 2: existing source labels. */
export function listExistingFootnoteHits(
  markdown: string,
  query: string,
  limit = 80,
): AdvancedSearchHit[] {
  const q = String(query || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
  const entries = listExistingFootnoteEntries(markdown);
  const hits: AdvancedSearchHit[] = [];

  for (let i = 0; i < entries.length; i += 1) {
    const entry = entries[i];
    if (!entry) continue;
    const title = `[^${entry.label}]`;
    const preview = entry.preview || '내용 없음';
    let score = 900 - i;
    if (q) {
      score = Math.max(
        scoreFuzzyRelevance(title, q),
        scoreFuzzyRelevance(entry.label, q),
        scoreFuzzyRelevance(preview, q),
      );
      if (score <= 0) continue;
    }
    hits.push({
      docId: `footnote-existing:${entry.label}`,
      kind: 'command',
      path: entry.label,
      title,
      preview,
      commandId: FOOTNOTE_INSERT_EXISTING_ITEM_ID,
      reasons: ['command'],
      score,
    });
  }

  if (q) {
    hits.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'ko'));
  }
  return hits.slice(0, limit);
}

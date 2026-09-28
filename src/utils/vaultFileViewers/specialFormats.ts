import {
  createEmptyKanbanDocument,
  serializeKanbanDocument,
} from '@/utils/kanban/kanbanDocument';
import { QUIZ_CONFIG_DEFAULT } from '@/utils/quiz/quizFileConfig';
import { serializeQuizDocument } from '@/utils/quiz/serializeQuizDocument';
import type { SpecialVaultFormat } from '@/utils/vaultFileViewers/types';

/**
 * Composite vault formats that override generic `.md` / `.json` open/create.
 * Add new JSON- or Markdown-based panes here (longest extension wins).
 *
 * Example future rows:
 * - `{ id: 'slide.md', extension: '.slide.md', family: 'markdown', viewer: 'slide', ... }`
 * - `{ id: 'whiteboard.json', extension: '.whiteboard.json', family: 'json', viewer: 'whiteboard', ... }`
 */
export const SPECIAL_VAULT_FORMATS: readonly SpecialVaultFormat[] = [
  {
    id: 'kanban.json',
    extension: '.kanban.json',
    family: 'json',
    viewer: 'kanban',
    contentType: 'application/json',
    editable: true,
    prettyJsonOnOpen: true,
    treeIcon: 'kanban',
    createSeed: () => serializeKanbanDocument(createEmptyKanbanDocument()),
  },
  {
    id: 'quiz.md',
    extension: '.quiz.md',
    family: 'markdown',
    // Quiz uses markdown viewer + noteSurface 'quiz' (not a separate viewer id).
    viewer: 'markdown',
    contentType: 'text/markdown',
    editable: true,
    treeIcon: 'quiz',
    createSeed: () => serializeQuizDocument(QUIZ_CONFIG_DEFAULT, []),
  },
];

/** Longest extension first for path matching. */
export function specialVaultFormatsLongestFirst(): SpecialVaultFormat[] {
  return [...SPECIAL_VAULT_FORMATS].sort(
    (a, b) => b.extension.length - a.extension.length,
  );
}

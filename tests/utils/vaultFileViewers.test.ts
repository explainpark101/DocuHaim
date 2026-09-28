import { describe, expect, it } from 'vitest';
import {
  contentTypeForCreatePath,
  contentTypeForViewer,
  isEditableViewerId,
  listEditableViewers,
  matchSpecialVaultFormat,
  prepareViewerText,
  resolveTextOpenViewer,
  seedContentForVaultPath,
  treeIconForVaultPath,
  viewerForCreatePath,
  viewerUsesPrettyJson,
} from '@/utils/vaultFileViewers';

describe('vaultFileViewers registry', () => {
  it('matches longest composite extensions', () => {
    expect(matchSpecialVaultFormat('a/b.kanban.json')?.id).toBe('kanban.json');
    expect(matchSpecialVaultFormat('a/b.quiz.md')?.id).toBe('quiz.md');
    expect(matchSpecialVaultFormat('a/b.json')).toBeNull();
    expect(matchSpecialVaultFormat('a/b.md')).toBeNull();
  });

  it('resolves open viewer for special formats only', () => {
    expect(resolveTextOpenViewer('board.kanban.json')?.viewer).toBe('kanban');
    expect(resolveTextOpenViewer('drill.quiz.md')?.viewer).toBe('markdown');
    expect(resolveTextOpenViewer('data.json')).toBeNull();
  });

  it('provides create seed / viewer / content-type', () => {
    const kanbanSeed = seedContentForVaultPath('x.kanban.json');
    expect(kanbanSeed).toContain('"version": 1');
    expect(viewerForCreatePath('x.kanban.json')).toBe('kanban');
    expect(contentTypeForCreatePath('x.kanban.json')).toBe('application/json');

    const quizSeed = seedContentForVaultPath('x.quiz.md');
    expect(quizSeed).toContain('quiz-config');
    expect(viewerForCreatePath('x.quiz.md')).toBe('markdown');
    expect(contentTypeForCreatePath('note.md')).toBe('text/markdown');
  });

  it('lists editable viewers including specials', () => {
    const list = listEditableViewers();
    expect(list).toContain('markdown');
    expect(list).toContain('json');
    expect(list).toContain('kanban');
    expect(isEditableViewerId('kanban')).toBe(true);
    expect(isEditableViewerId('pdf')).toBe(false);
  });

  it('maps content-type and pretty-json by viewer', () => {
    expect(contentTypeForViewer('kanban')).toBe('application/json');
    expect(contentTypeForViewer('json')).toBe('application/json');
    expect(contentTypeForViewer('markdown')).toBe('text/markdown');
    expect(viewerUsesPrettyJson('kanban')).toBe(true);
    expect(viewerUsesPrettyJson('json')).toBe(true);
    expect(viewerUsesPrettyJson('markdown')).toBe(false);
    expect(prepareViewerText('{"a":1}', 'kanban')).toBe('{\n  "a": 1\n}');
  });

  it('exposes tree icon hints', () => {
    expect(treeIconForVaultPath('b.kanban.json')).toBe('kanban');
    expect(treeIconForVaultPath('q.quiz.md')).toBe('quiz');
    expect(treeIconForVaultPath('n.md')).toBe('default');
  });
});

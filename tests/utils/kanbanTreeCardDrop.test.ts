import { describe, expect, it } from 'vitest';
import {
  isKanbanTreeCardDroppableId,
  kanbanCardTitleFromTreeNode,
  KANBAN_TREE_CARD_DROPPABLE_ID,
  resolveKanbanTreeDropCards,
} from '@/utils/kanban/kanbanTreeCardDrop';
import type { TreeFileNode } from '@/utils/chatWithMyself/treeAttachDrop';

describe('kanbanTreeCardDrop', () => {
  it('matches droppable id', () => {
    expect(isKanbanTreeCardDroppableId(KANBAN_TREE_CARD_DROPPABLE_ID)).toBe(
      true,
    );
    expect(isKanbanTreeCardDroppableId('other')).toBe(false);
  });

  it('builds card titles from name or path basename', () => {
    expect(kanbanCardTitleFromTreeNode('a/b/note.md', 'Spec')).toBe('Spec');
    expect(kanbanCardTitleFromTreeNode('a/b/note.md')).toBe('note.md');
  });

  it('resolves files and expands folders; skips trash, chat, and excludePath', () => {
    const tree: Record<string, TreeFileNode> = {
      'notes/a.md': { path: 'notes/a.md', name: 'a.md', type: 'file' },
      'notes/folder': {
        path: 'notes/folder',
        name: 'folder',
        type: 'folder',
        children: [
          { path: 'notes/folder/b.md', name: 'b.md', type: 'file' },
          { path: 'notes/folder/c.txt', name: 'c.txt', type: 'file' },
        ],
      },
      'board.kanban.json': {
        path: 'board.kanban.json',
        name: 'board.kanban.json',
        type: 'file',
      },
      '.trash/x.md': { path: '.trash/x.md', name: 'x.md', type: 'file' },
    };

    const findNode = (_st: string, path: string) => tree[path] || null;

    const seeds = resolveKanbanTreeDropCards(
      [
        { storageType: 's3', path: 'notes/a.md', nodeType: 'file', name: 'a.md' },
        {
          storageType: 's3',
          path: 'notes/folder',
          nodeType: 'folder',
          name: 'folder',
        },
        {
          storageType: 's3',
          path: 'board.kanban.json',
          nodeType: 'file',
          name: 'board.kanban.json',
        },
        {
          storageType: 's3',
          path: '.trash/x.md',
          nodeType: 'file',
          name: 'x.md',
        },
        {
          storageType: 's3',
          path: 'chat/g1',
          nodeType: 'chat',
          name: 'group',
        },
      ],
      findNode,
      { excludePath: 'board.kanban.json' },
    );

    expect(seeds).toEqual([
      { title: 'a.md', linkPath: 'notes/a.md' },
      { title: 'b.md', linkPath: 'notes/folder/b.md' },
      { title: 'c.txt', linkPath: 'notes/folder/c.txt' },
    ]);
  });

  it('dedupes link paths', () => {
    const findNode = (_st: string, path: string): TreeFileNode | null => ({
      path,
      name: 'dup.md',
      type: 'file',
    });
    const seeds = resolveKanbanTreeDropCards(
      [
        { storageType: 's3', path: 'notes/dup.md', nodeType: 'file' },
        { storageType: 's3', path: 'notes/dup.md', nodeType: 'file' },
      ],
      findNode,
    );
    expect(seeds).toHaveLength(1);
    expect(seeds[0]?.linkPath).toBe('notes/dup.md');
  });
});

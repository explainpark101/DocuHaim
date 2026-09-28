import { describe, expect, it } from 'vitest';
import {
  addCard,
  addColumn,
  collectKanbanLinkedPaths,
  createEmptyKanbanDocument,
  findColumnIdForCard,
  isKanbanCardDraftDirty,
  matchKanbanCardQuery,
  moveCard,
  normalizeLinkPaths,
  normalizeTags,
  parseKanbanDocument,
  removeCard,
  removeColumn,
  reorderColumns,
  resolveKanbanColumnWidth,
  searchKanbanCards,
  serializeKanbanDocument,
  updateCard,
  updateColumn,
} from '@/utils/kanban/kanbanDocument';
import { isKanbanJsonPath } from '@/utils/kanban/kanbanPath';

describe('kanbanPath', () => {
  it('detects .kanban.json paths', () => {
    expect(isKanbanJsonPath('boards/work.kanban.json')).toBe(true);
    expect(isKanbanJsonPath('WORK.KANBAN.JSON')).toBe(true);
    expect(isKanbanJsonPath('boards/work.json')).toBe(false);
    expect(isKanbanJsonPath('boards/work.md')).toBe(false);
    expect(isKanbanJsonPath(null)).toBe(false);
  });
});

describe('kanbanDocument parse/serialize', () => {
  it('seeds an empty board with three columns', () => {
    const doc = createEmptyKanbanDocument();
    expect(doc.version).toBe(1);
    expect(doc.columns.map((c) => c.title)).toEqual(['To Do', 'Doing', 'Done']);
    expect(doc.columns.every((c) => c.icon === null)).toBe(true);
    expect(Object.keys(doc.cards)).toHaveLength(0);
    expect(doc.columns.every((c) => c.cardIds.length === 0)).toBe(true);
  });

  it('defaults missing column icon to null', () => {
    const again = parseKanbanDocument(
      JSON.stringify({
        version: 1,
        columns: [{ id: 'col_a', title: 'A', color: null, cardIds: [] }],
        cards: {},
      }),
    );
    expect(again.ok).toBe(true);
    expect(again.document.columns[0]?.icon).toBeNull();
  });

  it('round-trips serialize → parse with linkPaths and tags', () => {
    let doc = createEmptyKanbanDocument();
    doc = addCard(doc, doc.columns[0]!.id, {
      title: 'Hello',
      body: 'World',
      linkPaths: ['notes/a.md', 'notes/b.md'],
      tags: ['urgent', 'spec'],
    });
    doc = updateColumn(doc, doc.columns[0]!.id, { color: '#3b82f6' });
    doc = updateColumn(doc, doc.columns[0]!.id, { width: 320 });
    doc = updateColumn(doc, doc.columns[0]!.id, { icon: '🚀' });
    const text = serializeKanbanDocument(doc);
    expect(text).not.toContain('"linkPath"');
    const again = parseKanbanDocument(text);
    expect(again.ok).toBe(true);
    expect(again.error).toBeNull();
    expect(again.document.columns[0]?.color).toBe('#3b82f6');
    expect(again.document.columns[0]?.width).toBe(320);
    expect(again.document.columns[0]?.icon).toBe('🚀');
    const cardId = again.document.columns[0]!.cardIds[0]!;
    expect(again.document.cards[cardId]?.title).toBe('Hello');
    expect(again.document.cards[cardId]?.linkPaths).toEqual([
      'notes/a.md',
      'notes/b.md',
    ]);
    expect(again.document.cards[cardId]?.tags).toEqual(['urgent', 'spec']);
  });

  it('migrates legacy linkPath to linkPaths', () => {
    const text = JSON.stringify({
      version: 1,
      columns: [{ id: 'col_a', title: 'A', color: null, cardIds: ['c1'] }],
      cards: {
        c1: {
          id: 'c1',
          title: 'Old',
          body: '',
          linkPath: 'notes/legacy.md',
        },
      },
    });
    const result = parseKanbanDocument(text);
    expect(result.document.cards.c1?.linkPaths).toEqual(['notes/legacy.md']);
    expect(result.document.cards.c1?.tags).toEqual([]);
  });

  it('returns empty board + error on invalid JSON', () => {
    const result = parseKanbanDocument('{not-json');
    expect(result.ok).toBe(false);
    expect(result.error).toBeTruthy();
    expect(result.document.columns).toHaveLength(3);
  });

  it('drops unknown cardIds and keeps orphan cards in map', () => {
    const text = JSON.stringify({
      version: 1,
      columns: [
        { id: 'col_a', title: 'A', color: null, cardIds: ['card_ok', 'missing'] },
      ],
      cards: {
        card_ok: {
          id: 'card_ok',
          title: 'Ok',
          body: '',
          linkPaths: [],
          tags: [],
        },
        card_orphan: {
          id: 'card_orphan',
          title: 'Orphan',
          body: '',
          linkPaths: [],
          tags: [],
        },
      },
    });
    const result = parseKanbanDocument(text);
    expect(result.ok).toBe(true);
    expect(result.document.columns[0]?.cardIds).toEqual(['card_ok']);
    expect(result.document.cards.card_orphan?.title).toBe('Orphan');
  });
});

describe('normalize helpers', () => {
  it('dedupes link paths and tags', () => {
    expect(normalizeLinkPaths(['a.md', 'a.md', 'b.md'])).toEqual(['a.md', 'b.md']);
    expect(normalizeTags(['Foo', 'foo', 'Bar', ''])).toEqual(['Foo', 'Bar']);
  });
});

describe('kanban search', () => {
  it('matches title, body, and tags', () => {
    let doc = createEmptyKanbanDocument();
    doc = addCard(doc, doc.columns[0]!.id, {
      title: 'Alpha task',
      body: 'detail about beta',
      tags: ['urgent'],
    });
    doc = addCard(doc, doc.columns[0]!.id, {
      title: 'Other',
      body: '',
      tags: ['later'],
    });
    const a = doc.columns[0]!.cardIds[0]!;
    const b = doc.columns[0]!.cardIds[1]!;
    expect(matchKanbanCardQuery(doc.cards[a]!, 'ALPHA')).toBe(true);
    expect(matchKanbanCardQuery(doc.cards[a]!, 'beta')).toBe(true);
    expect(matchKanbanCardQuery(doc.cards[a]!, 'urgent')).toBe(true);
    expect(searchKanbanCards(doc, 'urgent')).toEqual([a]);
    expect(searchKanbanCards(doc, 'later')).toEqual([b]);
    expect(searchKanbanCards(doc, '  ')).toEqual([]);
  });

  it('collects linked paths across cards', () => {
    let doc = createEmptyKanbanDocument();
    doc = addCard(doc, doc.columns[0]!.id, {
      linkPaths: ['a.md', 'b.md'],
    });
    doc = addCard(doc, doc.columns[0]!.id, { linkPaths: ['b.md', 'c.md'] });
    expect([...collectKanbanLinkedPaths(doc)].sort()).toEqual([
      'a.md',
      'b.md',
      'c.md',
    ]);
  });

  it('detects draft dirtiness', () => {
    let doc = createEmptyKanbanDocument();
    doc = addCard(doc, doc.columns[0]!.id, {
      title: 'T',
      body: 'B',
      linkPaths: ['a.md'],
      tags: ['x'],
    });
    const card = doc.cards[doc.columns[0]!.cardIds[0]!]!;
    expect(
      isKanbanCardDraftDirty(
        { title: 'T', body: 'B', linkPaths: ['a.md'], tags: ['x'] },
        card,
      ),
    ).toBe(false);
    expect(
      isKanbanCardDraftDirty(
        { title: 'T2', body: 'B', linkPaths: ['a.md'], tags: ['x'] },
        card,
      ),
    ).toBe(true);
  });
});

describe('kanbanDocument mutations', () => {
  it('moves a card across columns', () => {
    let doc = createEmptyKanbanDocument();
    const todo = doc.columns[0]!.id;
    const doing = doc.columns[1]!.id;
    doc = addCard(doc, todo, { title: 'Task' });
    const cardId = doc.columns[0]!.cardIds[0]!;
    doc = moveCard(doc, cardId, doing, 0);
    expect(findColumnIdForCard(doc, cardId)).toBe(doing);
    expect(doc.columns[0]?.cardIds).toEqual([]);
    expect(doc.columns[1]?.cardIds).toEqual([cardId]);
  });

  it('reorders cards within a column', () => {
    let doc = createEmptyKanbanDocument();
    const todo = doc.columns[0]!.id;
    doc = addCard(doc, todo, { title: 'A' });
    doc = addCard(doc, todo, { title: 'B' });
    const [a, b] = doc.columns[0]!.cardIds;
    doc = moveCard(doc, b!, todo, 0);
    expect(doc.columns[0]?.cardIds).toEqual([b, a]);
  });

  it('removes column and its cards', () => {
    let doc = createEmptyKanbanDocument();
    const todo = doc.columns[0]!.id;
    doc = addCard(doc, todo, { title: 'Gone' });
    const cardId = doc.columns[0]!.cardIds[0]!;
    doc = removeColumn(doc, todo);
    expect(doc.cards[cardId]).toBeUndefined();
    expect(doc.columns).toHaveLength(2);
  });

  it('adds and removes cards; updates fields', () => {
    let doc = createEmptyKanbanDocument();
    doc = addColumn(doc, 'Extra');
    expect(doc.columns).toHaveLength(4);
    const col = doc.columns[0]!.id;
    doc = addCard(doc, col, { title: 'X' });
    const id = doc.columns[0]!.cardIds[0]!;
    doc = updateCard(doc, id, {
      title: 'Y',
      linkPaths: ['p.md'],
      tags: ['t'],
    });
    expect(doc.cards[id]?.title).toBe('Y');
    expect(doc.cards[id]?.linkPaths).toEqual(['p.md']);
    expect(doc.cards[id]?.tags).toEqual(['t']);
    doc = removeCard(doc, id);
    expect(doc.cards[id]).toBeUndefined();
  });

  it('reorders columns', () => {
    let doc = createEmptyKanbanDocument();
    const [a, b] = [doc.columns[0]!.id, doc.columns[1]!.id];
    doc = reorderColumns(doc, a, b);
    expect(doc.columns[0]?.id).toBe(b);
    expect(doc.columns[1]?.id).toBe(a);
  });

  it('clamps column width helper', () => {
    expect(resolveKanbanColumnWidth(null)).toBe(288);
    expect(resolveKanbanColumnWidth(100)).toBe(200);
    expect(resolveKanbanColumnWidth(900)).toBe(560);
  });
});

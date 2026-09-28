import { describe, expect, it } from 'vitest';
import {
  addCard,
  addColumn,
  addLane,
  canAddKanbanCard,
  canAddKanbanColumn,
  canAddKanbanLane,
  collectKanbanLinkedPaths,
  countColumnCards,
  createEmptyKanbanDocument,
  DEFAULT_KANBAN_BOARD_SETTINGS,
  findCardPlacement,
  findColumnIdForCard,
  getLaneCardIds,
  KANBAN_DEFAULT_LANE_ID,
  KANBAN_DOCUMENT_VERSION,
  matchKanbanCardQuery,
  moveCard,
  normalizeLinkPaths,
  normalizeTags,
  parseKanbanDocument,
  removeCard,
  removeColumn,
  removeLane,
  reorderColumns,
  resolveKanbanColumnWidth,
  searchKanbanCards,
  serializeKanbanDocument,
  updateBoardSettings,
  updateCard,
  updateColumn,
  updateLane,
} from '@/utils/kanban/kanbanDocument';
import { isKanbanJsonPath } from '@/utils/kanban/kanbanPath';

describe('kanbanPath', () => {
  it('detects .kanban.json paths', () => {
    expect(isKanbanJsonPath('boards/work.kanban.json')).toBe(true);
    expect(isKanbanJsonPath('WORK.KANBAN.JSON')).toBe(true);
    expect(isKanbanJsonPath('boards/work.json')).toBe(false);
  });
});

describe('kanbanDocument v2', () => {
  it('seeds empty board as version 2 with default lane', () => {
    const doc = createEmptyKanbanDocument();
    expect(doc.version).toBe(KANBAN_DOCUMENT_VERSION);
    expect(doc.version).toBe(2);
    expect(doc.settings).toEqual(DEFAULT_KANBAN_BOARD_SETTINGS);
    expect(doc.lanes).toHaveLength(1);
    expect(doc.lanes[0]?.id).toBe(KANBAN_DEFAULT_LANE_ID);
    expect(doc.columns.map((c) => c.title)).toEqual(['To Do', 'Doing', 'Done']);
    expect(doc.columns.every((c) => c.coverPath === null)).toBe(true);
    expect(doc.columns.every((c) => c.folderPath === null)).toBe(true);
    expect(
      doc.columns.every((c) => getLaneCardIds(c, KANBAN_DEFAULT_LANE_ID).length === 0),
    ).toBe(true);
  });

  it('migrates v1 cardIds into cardIdsByLane + default lane', () => {
    const text = JSON.stringify({
      version: 1,
      columns: [
        { id: 'col_a', title: 'A', color: null, cardIds: ['c1', 'c2'] },
      ],
      cards: {
        c1: { id: 'c1', title: 'One', body: '', linkPaths: [], tags: [] },
        c2: {
          id: 'c2',
          title: 'Two',
          body: '',
          linkPath: 'notes/x.md',
        },
      },
    });
    const result = parseKanbanDocument(text);
    expect(result.ok).toBe(true);
    expect(result.document.version).toBe(2);
    expect(result.document.lanes[0]?.id).toBe(KANBAN_DEFAULT_LANE_ID);
    expect(getLaneCardIds(result.document.columns[0]!, KANBAN_DEFAULT_LANE_ID)).toEqual([
      'c1',
      'c2',
    ]);
    expect(result.document.cards.c1?.laneId).toBe(KANBAN_DEFAULT_LANE_ID);
    expect(result.document.cards.c2?.linkPaths).toEqual(['notes/x.md']);
    expect(result.document.cards.c2?.coverPath).toBeNull();
  });

  it('round-trips lanes, covers, folderPath', () => {
    let doc = updateBoardSettings(createEmptyKanbanDocument(), {
      swimlanesEnabled: true,
    });
    doc = addLane(doc, 'Urgent');
    const laneB = doc.lanes[1]!.id;
    doc = addCard(doc, doc.columns[0]!.id, {
      title: 'Hello',
      body: 'World',
      linkPaths: ['notes/a.md'],
      tags: ['spec'],
      coverPath: 'images/cover.png',
    });
    doc = updateColumn(doc, doc.columns[0]!.id, {
      color: '#3b82f6',
      width: 320,
      icon: '🚀',
      coverPath: 'images/col.png',
      folderPath: 'notes/todo',
    });
    const cardId = getLaneCardIds(doc.columns[0]!, KANBAN_DEFAULT_LANE_ID)[0]!;
    doc = moveCard(doc, cardId, doc.columns[1]!.id, 0, laneB);
    const text = serializeKanbanDocument(doc);
    expect(text).toContain('"version": 2');
    expect(text).not.toContain('"linkPath"');
    expect(text).not.toContain('"cardIds":');
    const again = parseKanbanDocument(text);
    expect(again.ok).toBe(true);
    expect(again.document.lanes).toHaveLength(2);
    expect(again.document.columns[0]?.folderPath).toBe('notes/todo');
    expect(again.document.columns[0]?.coverPath).toBe('images/col.png');
    expect(findCardPlacement(again.document, cardId)).toEqual({
      columnId: again.document.columns[1]!.id,
      laneId: laneB,
    });
    expect(again.document.cards[cardId]?.coverPath).toBe('images/cover.png');
  });

  it('removeLane moves cards to remaining lane and refuses last lane', () => {
    let doc = updateBoardSettings(createEmptyKanbanDocument(), {
      swimlanesEnabled: true,
    });
    doc = addLane(doc, 'B');
    const laneB = doc.lanes[1]!.id;
    doc = addCard(doc, doc.columns[0]!.id, { title: 'X' }, laneB);
    const cardId = getLaneCardIds(doc.columns[0]!, laneB)[0]!;
    const blocked = removeLane(doc, KANBAN_DEFAULT_LANE_ID);
    // still two lanes until we remove B; removing default moves B cards? 
    // remove default: cards in default stay... we remove lane_default, cards from it go to B
    expect(blocked.lanes).toHaveLength(1);
    expect(blocked.lanes[0]?.id).toBe(laneB);
    expect(getLaneCardIds(blocked.columns[0]!, laneB)).toContain(cardId);
    const last = removeLane(blocked, laneB);
    expect(last).toBe(blocked);
  });

  it('countColumnCards sums all lanes', () => {
    let doc = updateBoardSettings(createEmptyKanbanDocument(), {
      swimlanesEnabled: true,
    });
    doc = addLane(doc, 'B');
    doc = addCard(doc, doc.columns[0]!.id, { title: 'a' });
    doc = addCard(doc, doc.columns[0]!.id, { title: 'b' }, doc.lanes[1]!.id);
    expect(countColumnCards(doc.columns[0]!)).toBe(2);
  });
});

describe('normalize helpers', () => {
  it('dedupes link paths and tags', () => {
    expect(normalizeLinkPaths(['a.md', 'a.md', 'b.md'])).toEqual(['a.md', 'b.md']);
    expect(normalizeTags(['Foo', 'foo', 'Bar', ''])).toEqual(['Foo', 'Bar']);
  });
});

describe('kanban search', () => {
  it('matches across lanes', () => {
    let doc = updateBoardSettings(createEmptyKanbanDocument(), {
      swimlanesEnabled: true,
    });
    doc = addLane(doc, 'B');
    doc = addCard(doc, doc.columns[0]!.id, {
      title: 'Alpha',
      tags: ['urgent'],
    });
    doc = addCard(
      doc,
      doc.columns[0]!.id,
      { title: 'Other', tags: ['later'] },
      doc.lanes[1]!.id,
    );
    const hits = searchKanbanCards(doc, 'urgent');
    expect(hits).toHaveLength(1);
    expect(matchKanbanCardQuery(doc.cards[hits[0]!]!, 'ALPHA')).toBe(true);
  });

  it('collects linked paths', () => {
    let doc = createEmptyKanbanDocument();
    doc = addCard(doc, doc.columns[0]!.id, { linkPaths: ['a.md', 'b.md'] });
    expect([...collectKanbanLinkedPaths(doc)].sort()).toEqual(['a.md', 'b.md']);
  });
});

describe('mutations', () => {
  it('moves cards across columns and lanes', () => {
    let doc = updateBoardSettings(createEmptyKanbanDocument(), {
      swimlanesEnabled: true,
    });
    doc = addLane(doc, 'B');
    doc = addCard(doc, doc.columns[0]!.id, { title: 't' });
    const id = getLaneCardIds(doc.columns[0]!, KANBAN_DEFAULT_LANE_ID)[0]!;
    doc = moveCard(doc, id, doc.columns[2]!.id, 0, doc.lanes[1]!.id);
    expect(findColumnIdForCard(doc, id)).toBe(doc.columns[2]!.id);
    expect(doc.cards[id]?.laneId).toBe(doc.lanes[1]!.id);
  });

  it('reorder columns and update lane title', () => {
    let doc = createEmptyKanbanDocument();
    const a = doc.columns[0]!.id;
    const b = doc.columns[1]!.id;
    doc = reorderColumns(doc, a, b);
    expect(doc.columns[0]!.id).toBe(b);
    doc = updateLane(doc, KANBAN_DEFAULT_LANE_ID, { title: 'Main' });
    expect(doc.lanes[0]?.title).toBe('Main');
  });

  it('removeColumn deletes its cards', () => {
    let doc = createEmptyKanbanDocument();
    doc = addCard(doc, doc.columns[0]!.id, { title: 'gone' });
    const id = getLaneCardIds(doc.columns[0]!, KANBAN_DEFAULT_LANE_ID)[0]!;
    doc = removeColumn(doc, doc.columns[0]!.id);
    expect(doc.cards[id]).toBeUndefined();
  });

  it('removeCard clears all lane buckets', () => {
    let doc = createEmptyKanbanDocument();
    doc = addCard(doc, doc.columns[0]!.id, { title: 'x' });
    const id = getLaneCardIds(doc.columns[0]!, KANBAN_DEFAULT_LANE_ID)[0]!;
    doc = removeCard(doc, id);
    expect(countColumnCards(doc.columns[0]!)).toBe(0);
  });

  it('updateCard coverPath', () => {
    let doc = createEmptyKanbanDocument();
    doc = addCard(doc, doc.columns[0]!.id, { title: 'x' });
    const id = getLaneCardIds(doc.columns[0]!, KANBAN_DEFAULT_LANE_ID)[0]!;
    doc = updateCard(doc, id, { coverPath: 'img/a.png' });
    expect(doc.cards[id]?.coverPath).toBe('img/a.png');
  });

  it('clamps column width helper', () => {
    expect(resolveKanbanColumnWidth(null)).toBe(288);
    expect(resolveKanbanColumnWidth(100)).toBe(200);
    expect(resolveKanbanColumnWidth(900)).toBe(560);
  });

  it('addColumn seeds empty lane buckets', () => {
    let doc = updateBoardSettings(createEmptyKanbanDocument(), {
      swimlanesEnabled: true,
    });
    doc = addLane(doc, 'B');
    doc = addColumn(doc, 'Extra');
    const col = doc.columns[doc.columns.length - 1]!;
    expect(Object.keys(col.cardIdsByLane).sort()).toEqual(
      doc.lanes.map((l) => l.id).sort(),
    );
  });

  it('defaults missing settings on parse and round-trips settings', () => {
    const result = parseKanbanDocument(
      JSON.stringify({
        version: 2,
        lanes: [{ id: 'lane_default', title: 'Default' }],
        columns: [
          {
            id: 'col_a',
            title: 'A',
            cardIdsByLane: { lane_default: [] },
          },
        ],
        cards: {},
      }),
    );
    expect(result.ok).toBe(true);
    expect(result.document.settings).toEqual(DEFAULT_KANBAN_BOARD_SETTINGS);

    let doc = updateBoardSettings(result.document, {
      swimlanesEnabled: false,
      maxLanes: 2,
      maxColumns: 3,
      maxCardsPerCell: 1,
    });
    expect(doc.settings.swimlanesEnabled).toBe(false);
    expect(doc.settings.maxLanes).toBe(2);
    const again = parseKanbanDocument(serializeKanbanDocument(doc));
    expect(again.document.settings.maxColumns).toBe(3);
    expect(again.document.settings.maxCardsPerCell).toBe(1);
  });

  it('enforces capacity limits on addLane/addColumn/addCard', () => {
    let doc = updateBoardSettings(createEmptyKanbanDocument(), {
      maxLanes: 1,
      maxColumns: 3,
      maxCardsPerCell: 1,
    });
    expect(canAddKanbanLane(doc)).toBe(false);
    expect(addLane(doc, 'Nope')).toBe(doc);
    expect(canAddKanbanColumn(doc)).toBe(false);
    expect(addColumn(doc, 'X')).toBe(doc);

    const colId = doc.columns[0]!.id;
    const laneId = KANBAN_DEFAULT_LANE_ID;
    expect(canAddKanbanCard(doc, colId, laneId)).toBe(true);
    doc = addCard(doc, colId, { title: 'one' }, laneId);
    expect(canAddKanbanCard(doc, colId, laneId)).toBe(false);
    const blocked = addCard(doc, colId, { title: 'two' }, laneId);
    expect(getLaneCardIds(blocked.columns[0]!, laneId)).toHaveLength(1);
  });

  it('blocks moveCard into a full cell', () => {
    let doc = updateBoardSettings(createEmptyKanbanDocument(), {
      maxCardsPerCell: 1,
    });
    const colA = doc.columns[0]!.id;
    const colB = doc.columns[1]!.id;
    const laneId = KANBAN_DEFAULT_LANE_ID;
    doc = addCard(doc, colA, { title: 'a' }, laneId);
    doc = addCard(doc, colB, { title: 'b' }, laneId);
    const cardId = getLaneCardIds(doc.columns[0]!, laneId)[0]!;
    const blockedMove = moveCard(doc, cardId, colB, 0, laneId);
    expect(findCardPlacement(blockedMove, cardId)?.columnId).toBe(colA);
  });
});

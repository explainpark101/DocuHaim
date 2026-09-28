import { describe, expect, it, vi } from 'vitest';
import {
  KANBAN_CARD_PREFIX,
  KANBAN_COLUMN_DROP_PREFIX,
  KANBAN_COLUMN_PREFIX,
  createKanbanCollisionDetection,
  shouldInsertAfterCard,
} from '@/utils/kanban/kanbanDndCollision';

describe('kanbanDndCollision', () => {
  it('exports stable id prefixes matching KanbanPane', () => {
    expect(KANBAN_COLUMN_PREFIX).toBe('kanban-col:');
    expect(KANBAN_COLUMN_DROP_PREFIX).toBe('kanban-coldrop:');
    expect(KANBAN_CARD_PREFIX).toBe('kanban-card:');
  });

  it('returns a collision detection function', () => {
    const detect = createKanbanCollisionDetection();
    expect(typeof detect).toBe('function');
  });

  it('inserts after when pointer is below card midline', () => {
    const rect = {
      left: 0,
      right: 100,
      top: 0,
      bottom: 40,
      width: 100,
      height: 40,
    };
    expect(shouldInsertAfterCard(rect, 10)).toBe(false);
    expect(shouldInsertAfterCard(rect, 20)).toBe(false);
    expect(shouldInsertAfterCard(rect, 21)).toBe(true);
    expect(shouldInsertAfterCard(rect, 39)).toBe(true);
    expect(shouldInsertAfterCard(null, 10)).toBe(false);
  });

  it('prefers DOM resolveColumnAtPoint over rect fallback', () => {
    const resolveColumnAtPoint = vi.fn(() => 'col-b');
    const detect = createKanbanCollisionDetection({ resolveColumnAtPoint });

    const colADrop = {
      id: `${KANBAN_COLUMN_DROP_PREFIX}col-a`,
      data: { current: { type: 'column-drop', columnId: 'col-a' } },
    };
    const colBDrop = {
      id: `${KANBAN_COLUMN_DROP_PREFIX}col-b`,
      data: { current: { type: 'column-drop', columnId: 'col-b' } },
    };
    const cardA = {
      id: `${KANBAN_CARD_PREFIX}c1`,
      data: { current: { type: 'card', cardId: 'c1', columnId: 'col-a' } },
    };
    const cardB = {
      id: `${KANBAN_CARD_PREFIX}c2`,
      data: { current: { type: 'card', cardId: 'c2', columnId: 'col-b' } },
    };

    const droppableRects = new Map([
      [
        colADrop.id,
        { left: 0, right: 100, top: 0, bottom: 400, width: 100, height: 400 },
      ],
      [
        colBDrop.id,
        { left: 120, right: 220, top: 0, bottom: 400, width: 100, height: 400 },
      ],
      [
        cardA.id,
        { left: 0, right: 100, top: 40, bottom: 80, width: 100, height: 40 },
      ],
      [
        cardB.id,
        { left: 120, right: 220, top: 40, bottom: 80, width: 100, height: 40 },
      ],
    ]);

    const activeId = `${KANBAN_CARD_PREFIX}drag`;
    const result = detect({
      active: {
        id: activeId,
        data: { current: {} },
        rect: { current: { initial: null, translated: null } },
      },
      collisionRect: null,
      droppableContainers: [colADrop, colBDrop, cardA, cardB] as never[],
      droppableRects: droppableRects as never,
      pointerCoordinates: { x: 10, y: 60 }, // over col-a by rect, but DOM says col-b
    } as never);

    expect(resolveColumnAtPoint).toHaveBeenCalledWith(10, 60);
    expect(result).toEqual([{ id: cardB.id }]);
  });
});

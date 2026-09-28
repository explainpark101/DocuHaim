/**
 * Kanban board collision detection for @dnd-kit/core multi-container DnD.
 *
 * Prefer the **pointer** (not the dragged rect center). Column under the
 * cursor can be resolved via DOM hit-testing so horizontally scrolled /
 * transformed boards stay aligned with the mouse.
 */

import {
  closestCenter,
  closestCorners,
  type Collision,
  type CollisionDetection,
  type DroppableContainer,
  type UniqueIdentifier,
} from '@dnd-kit/core';

export const KANBAN_COLUMN_PREFIX = 'kanban-col:';
export const KANBAN_COLUMN_DROP_PREFIX = 'kanban-coldrop:';
export const KANBAN_CARD_PREFIX = 'kanban-card:';

function isColumnId(id: UniqueIdentifier): boolean {
  return String(id).startsWith(KANBAN_COLUMN_PREFIX);
}

function isColumnDropId(id: UniqueIdentifier): boolean {
  return String(id).startsWith(KANBAN_COLUMN_DROP_PREFIX);
}

function isCardId(id: UniqueIdentifier): boolean {
  return String(id).startsWith(KANBAN_CARD_PREFIX);
}

function columnIdFromDroppable(id: UniqueIdentifier): string | null {
  const s = String(id);
  if (s.startsWith(KANBAN_COLUMN_DROP_PREFIX)) {
    return s.slice(KANBAN_COLUMN_DROP_PREFIX.length) || null;
  }
  if (s.startsWith(KANBAN_COLUMN_PREFIX)) {
    return s.slice(KANBAN_COLUMN_PREFIX.length) || null;
  }
  return null;
}

type RectLike = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
};

function rectCenterX(rect: RectLike): number {
  return rect.left + rect.width / 2;
}

function rectCenterY(rect: RectLike): number {
  return rect.top + rect.height / 2;
}

function hitX(rect: RectLike, x: number): boolean {
  return x >= rect.left && x <= rect.right;
}

function hitXY(rect: RectLike, x: number, y: number): boolean {
  return (
    x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
  );
}

function findColumnDropContainer(
  containers: DroppableContainer[],
  columnId: string,
): DroppableContainer | null {
  const dropId = `${KANBAN_COLUMN_DROP_PREFIX}${columnId}`;
  return containers.find((c) => String(c.id) === dropId) ?? null;
}

function pickColumnDropByPointer(
  containers: DroppableContainer[],
  droppableRects: Map<UniqueIdentifier, RectLike>,
  pointerX: number,
  pointerY: number,
  excludeId: UniqueIdentifier,
): DroppableContainer | null {
  const columns = containers.filter(
    (c) => c.id !== excludeId && isColumnDropId(c.id),
  );

  // Prefer full 2D hit (column list area under the cursor).
  for (const c of columns) {
    const rect = droppableRects.get(c.id);
    if (rect && hitXY(rect, pointerX, pointerY)) return c;
  }

  // Then horizontal span only (pointer in column header / empty gutter Y).
  for (const c of columns) {
    const rect = droppableRects.get(c.id);
    if (rect && hitX(rect, pointerX)) return c;
  }

  // Fallback: nearest column center on X.
  let best: DroppableContainer | null = null;
  let bestDist = Infinity;
  for (const c of columns) {
    const rect = droppableRects.get(c.id);
    if (!rect) continue;
    const dist = Math.abs(rectCenterX(rect) - pointerX);
    if (dist < bestDist) {
      bestDist = dist;
      best = c;
    }
  }
  return best;
}

function pickCardInColumnByPointer(
  containers: DroppableContainer[],
  droppableRects: Map<UniqueIdentifier, RectLike>,
  columnId: string,
  pointerY: number,
  excludeId: UniqueIdentifier,
): UniqueIdentifier | null {
  const cards = containers.filter((c) => {
    if (c.id === excludeId || !isCardId(c.id)) return false;
    const data = c.data.current as { columnId?: string } | undefined;
    return data?.columnId === columnId;
  });

  if (cards.length === 0) return null;

  const ranked = cards
    .map((c) => ({ c, rect: droppableRects.get(c.id) }))
    .filter((row): row is { c: DroppableContainer; rect: RectLike } =>
      Boolean(row.rect),
    )
    .sort((a, b) => a.rect.top - b.rect.top);

  if (ranked.length === 0) return null;

  const first = ranked[0]!;
  if (pointerY < first.rect.top) return first.c.id;

  const last = ranked[ranked.length - 1]!;
  if (pointerY > last.rect.bottom) return last.c.id;

  for (const row of ranked) {
    if (pointerY >= row.rect.top && pointerY <= row.rect.bottom) {
      return row.c.id;
    }
  }

  let bestId: UniqueIdentifier | null = null;
  let bestDist = Infinity;
  for (const row of ranked) {
    const dist = Math.abs(rectCenterY(row.rect) - pointerY);
    if (dist < bestDist) {
      bestDist = dist;
      bestId = row.c.id;
    }
  }
  return bestId;
}

/**
 * Whether the pointer is in the lower half of the over-card — insert after.
 */
export function shouldInsertAfterCard(
  overRect: RectLike | null | undefined,
  pointerY: number | null | undefined,
): boolean {
  if (!overRect || pointerY == null || !Number.isFinite(pointerY)) return false;
  return pointerY > rectCenterY(overRect);
}

export type KanbanCollisionOptions = {
  lastOverIdRef?: { current: UniqueIdentifier | null };
  /**
   * DOM hit-test for the column under the pointer (preferred over measured
   * droppable rects when the board is scrolled or transformed).
   */
  resolveColumnAtPoint?: (x: number, y: number) => string | null;
};

/**
 * Card drags: pointer → column (DOM or rect) → card by Y in that column.
 * Column drags: closestCorners among columns only.
 */
export function createKanbanCollisionDetection(
  options?: KanbanCollisionOptions,
): CollisionDetection {
  const lastOverIdRef = options?.lastOverIdRef;
  const resolveColumnAtPoint = options?.resolveColumnAtPoint;

  return (args) => {
    const {
      active,
      droppableContainers,
      droppableRects,
      pointerCoordinates,
    } = args;
    const activeId = active.id;

    if (isColumnId(activeId)) {
      return closestCorners({
        ...args,
        droppableContainers: droppableContainers.filter((c) =>
          isColumnId(c.id),
        ),
      });
    }

    if (!isCardId(activeId)) {
      return closestCenter(args);
    }

    const rectMap = droppableRects as Map<UniqueIdentifier, RectLike>;

    if (pointerCoordinates) {
      let colDrop: DroppableContainer | null = null;

      if (resolveColumnAtPoint) {
        const colId = resolveColumnAtPoint(
          pointerCoordinates.x,
          pointerCoordinates.y,
        );
        if (colId) {
          colDrop = findColumnDropContainer(droppableContainers, colId);
        }
      }

      if (!colDrop) {
        colDrop = pickColumnDropByPointer(
          droppableContainers,
          rectMap,
          pointerCoordinates.x,
          pointerCoordinates.y,
          activeId,
        );
      }

      if (colDrop) {
        const colId = columnIdFromDroppable(colDrop.id);
        if (colId) {
          const cardId = pickCardInColumnByPointer(
            droppableContainers,
            rectMap,
            colId,
            pointerCoordinates.y,
            activeId,
          );
          const overId = cardId ?? colDrop.id;
          if (lastOverIdRef) lastOverIdRef.current = overId;
          return [{ id: overId }] as Collision[];
        }
      }
    }

    if (lastOverIdRef?.current != null) {
      return [{ id: lastOverIdRef.current }] as Collision[];
    }

    return closestCenter({
      ...args,
      droppableContainers: droppableContainers.filter((c) => c.id !== activeId),
    });
  };
}

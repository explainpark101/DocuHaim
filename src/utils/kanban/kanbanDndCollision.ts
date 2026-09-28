/**
 * Kanban board collision detection for @dnd-kit/core multi-container DnD.
 *
 * Prefer the **pointer** (not the dragged rect center). Column×lane cells
 * use droppable ids `kanban-coldrop:{columnId}:{laneId}`.
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
export const KANBAN_LANE_PREFIX = 'kanban-lane:';

function isColumnId(id: UniqueIdentifier): boolean {
  return String(id).startsWith(KANBAN_COLUMN_PREFIX);
}

function isColumnDropId(id: UniqueIdentifier): boolean {
  return String(id).startsWith(KANBAN_COLUMN_DROP_PREFIX);
}

function isCardId(id: UniqueIdentifier): boolean {
  return String(id).startsWith(KANBAN_CARD_PREFIX);
}

function isLaneId(id: UniqueIdentifier): boolean {
  return String(id).startsWith(KANBAN_LANE_PREFIX);
}

/** Parse `kanban-coldrop:colId:laneId` (lane optional for legacy). */
export function parseKanbanColumnDropId(
  id: UniqueIdentifier,
): { columnId: string; laneId: string | null } | null {
  const s = String(id);
  if (!s.startsWith(KANBAN_COLUMN_DROP_PREFIX)) return null;
  const rest = s.slice(KANBAN_COLUMN_DROP_PREFIX.length);
  if (!rest) return null;
  const idx = rest.indexOf(':');
  if (idx < 0) return { columnId: rest, laneId: null };
  return {
    columnId: rest.slice(0, idx),
    laneId: rest.slice(idx + 1) || null,
  };
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
  laneId?: string | null,
): DroppableContainer | null {
  if (laneId) {
    const exact = `${KANBAN_COLUMN_DROP_PREFIX}${columnId}:${laneId}`;
    const hit = containers.find((c) => String(c.id) === exact);
    if (hit) return hit;
  }
  return (
    containers.find((c) => {
      const parsed = parseKanbanColumnDropId(c.id);
      return parsed?.columnId === columnId;
    }) ?? null
  );
}

function pickColumnDropByPointer(
  containers: DroppableContainer[],
  droppableRects: Map<UniqueIdentifier, RectLike>,
  pointerX: number,
  pointerY: number,
  excludeId: UniqueIdentifier,
): DroppableContainer | null {
  const cells = containers.filter(
    (c) => c.id !== excludeId && isColumnDropId(c.id),
  );

  for (const c of cells) {
    const rect = droppableRects.get(c.id);
    if (rect && hitXY(rect, pointerX, pointerY)) return c;
  }

  for (const c of cells) {
    const rect = droppableRects.get(c.id);
    if (rect && hitX(rect, pointerX)) return c;
  }

  let best: DroppableContainer | null = null;
  let bestDist = Infinity;
  for (const c of cells) {
    const rect = droppableRects.get(c.id);
    if (!rect) continue;
    const cx = rectCenterX(rect);
    const cy = rectCenterY(rect);
    const dist = Math.hypot(cx - pointerX, cy - pointerY);
    if (dist < bestDist) {
      bestDist = dist;
      best = c;
    }
  }
  return best;
}

function pickCardInCellByPointer(
  containers: DroppableContainer[],
  droppableRects: Map<UniqueIdentifier, RectLike>,
  columnId: string,
  laneId: string | null,
  pointerY: number,
  excludeId: UniqueIdentifier,
): UniqueIdentifier | null {
  const cards = containers.filter((c) => {
    if (c.id === excludeId || !isCardId(c.id)) return false;
    const data = c.data.current as
      | { columnId?: string; laneId?: string }
      | undefined;
    if (data?.columnId !== columnId) return false;
    if (laneId && data?.laneId && data.laneId !== laneId) return false;
    return true;
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
   * DOM hit-test returning column (+ optional lane) under the pointer.
   */
  resolveCellAtPoint?: (
    x: number,
    y: number,
  ) => { columnId: string; laneId?: string | null } | null;
};

/**
 * Card drags: pointer → cell (DOM or rect) → card by Y in that cell.
 * Column / lane shell drags: closestCorners among same type.
 */
export function createKanbanCollisionDetection(
  options?: KanbanCollisionOptions,
): CollisionDetection {
  const lastOverIdRef = options?.lastOverIdRef;
  const resolveCellAtPoint = options?.resolveCellAtPoint;

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

    if (isLaneId(activeId)) {
      return closestCorners({
        ...args,
        droppableContainers: droppableContainers.filter((c) =>
          isLaneId(c.id),
        ),
      });
    }

    if (!isCardId(activeId)) {
      return closestCenter(args);
    }

    const rectMap = droppableRects as Map<UniqueIdentifier, RectLike>;

    if (pointerCoordinates) {
      let colDrop: DroppableContainer | null = null;

      if (resolveCellAtPoint) {
        const cell = resolveCellAtPoint(
          pointerCoordinates.x,
          pointerCoordinates.y,
        );
        if (cell?.columnId) {
          colDrop = findColumnDropContainer(
            droppableContainers,
            cell.columnId,
            cell.laneId,
          );
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
        const parsed = parseKanbanColumnDropId(colDrop.id);
        const data = colDrop.data.current as
          | { columnId?: string; laneId?: string }
          | undefined;
        const colId = parsed?.columnId || data?.columnId;
        const laneId = parsed?.laneId || data?.laneId || null;
        if (colId) {
          const cardId = pickCardInCellByPointer(
            droppableContainers,
            rectMap,
            colId,
            laneId,
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

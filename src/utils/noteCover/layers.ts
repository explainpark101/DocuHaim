import type { CoverElement, CoverGroup, NoteCover } from '@/utils/noteCover/types';
import {
  bringLayersToFront,
  collectDescendantElementIds,
  createEmptyGroup,
  deleteLayers,
  ensureLayerTree,
  flattenLayerTree,
  getGroup,
  isGroupId,
  moveLayerInParent,
  moveLayerRelative,
  registerNewElement,
  selectionToLayerIds,
  sendLayersToBack,
  ungroupLayer,
} from '@/utils/noteCover/layerTree';

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function getElementsByIds(
  cover: NoteCover,
  ids: ReadonlyArray<string> | ReadonlySet<string>,
): CoverElement[] {
  const set = ids instanceof Set ? ids : new Set(ids);
  return cover.elements.filter((el) => set.has(el.id));
}

export function moveElementsByDelta(
  cover: NoteCover,
  ids: ReadonlyArray<string>,
  dxPct: number,
  dyPct: number,
): NoteCover {
  if (!ids.length || (dxPct === 0 && dyPct === 0)) return cover;
  const idSet = new Set(ids);
  const targets = cover.elements.filter((el) => idSet.has(el.id));
  if (!targets.length) return cover;

  let minDx = dxPct;
  let minDy = dyPct;
  for (const el of targets) {
    if (dxPct < 0) minDx = Math.max(minDx, -el.x);
    if (dxPct > 0) minDx = Math.min(minDx, 100 - el.w - el.x);
    if (dyPct < 0) minDy = Math.max(minDy, -el.y);
    if (dyPct > 0) minDy = Math.min(minDy, 100 - el.h - el.y);
  }

  return {
    ...cover,
    elements: cover.elements.map((el) => {
      if (!idSet.has(el.id)) return el;
      return {
        ...el,
        x: clamp(el.x + minDx, 0, 100 - el.w),
        y: clamp(el.y + minDy, 0, 100 - el.h),
      };
    }),
  };
}

/** Selection bounding box (frame %). */
export function getSelectionBounds(
  elements: CoverElement[],
): { x: number; y: number; w: number; h: number } | null {
  if (!elements.length) return null;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const el of elements) {
    minX = Math.min(minX, el.x);
    minY = Math.min(minY, el.y);
    maxX = Math.max(maxX, el.x + el.w);
    maxY = Math.max(maxY, el.y + el.h);
  }
  return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
}

/** Normalize a possibly inverted drag rect to x,y,w,h >= 0. */
export function normalizePctRect(rect: {
  x: number;
  y: number;
  w: number;
  h: number;
}): { x: number; y: number; w: number; h: number } {
  const x1 = rect.x;
  const y1 = rect.y;
  const x2 = rect.x + rect.w;
  const y2 = rect.y + rect.h;
  const left = Math.min(x1, x2);
  const top = Math.min(y1, y2);
  return {
    x: left,
    y: top,
    w: Math.abs(x2 - x1),
    h: Math.abs(y2 - y1),
  };
}

/** Element ids whose boxes intersect the marquee rect (frame %). */
export function elementsIntersectingRect(
  elements: CoverElement[],
  rect: { x: number; y: number; w: number; h: number },
): string[] {
  const box = normalizePctRect(rect);
  // Ignore near-zero marquees (click without drag).
  if (box.w < 0.05 && box.h < 0.05) return [];
  const right = box.x + box.w;
  const bottom = box.y + box.h;
  return elements
    .filter((el) => {
      const elRight = el.x + el.w;
      const elBottom = el.y + el.h;
      return el.x < right && elRight > box.x && el.y < bottom && elBottom > box.y;
    })
    .map((el) => el.id);
}

/** Shared groupId when every selected element belongs to the same group. */
export function sharedGroupIdForSelection(
  cover: NoteCover,
  ids: ReadonlyArray<string>,
): string | null {
  if (!ids.length) return null;
  const groups = ids.map(
    (id) => cover.elements.find((el) => el.id === id)?.groupId ?? null,
  );
  const first = groups[0];
  if (!first || !groups.every((g) => g === first)) return null;
  return first;
}

/**
 * Expand selection so any grouped element pulls in all members of its group
 * (including nested group descendants).
 */
export function expandIdsToGroups(
  cover: NoteCover,
  ids: ReadonlyArray<string>,
): string[] {
  if (!ids.length) return [];
  const tree = ensureLayerTree(cover);
  const out = new Set<string>();
  for (const id of ids) {
    const el = tree.elements.find((e) => e.id === id);
    if (!el) continue;
    if (el.groupId) {
      for (const mid of collectDescendantElementIds(tree, el.groupId)) {
        out.add(mid);
      }
    } else {
      out.add(id);
    }
  }
  return [...out];
}

/**
 * Clone selected elements (new ids). Grouped clones get a new group entry.
 * Clones are appended above (front of) the stack.
 */
export function duplicateElements(
  cover: NoteCover,
  ids: ReadonlyArray<string>,
): { cover: NoteCover; newIds: string[] } {
  const unique = [...new Set(ids)].filter((id) =>
    cover.elements.some((el) => el.id === id),
  );
  if (!unique.length) return { cover, newIds: [] };

  const idSet = new Set(unique);
  const idMap = new Map<string, string>();
  for (const id of unique) idMap.set(id, crypto.randomUUID());

  const groupMap = new Map<string, string>();
  for (const el of cover.elements) {
    if (!idSet.has(el.id) || !el.groupId) continue;
    if (!groupMap.has(el.groupId)) groupMap.set(el.groupId, crypto.randomUUID());
  }

  const clones: CoverElement[] = [];
  for (const el of cover.elements) {
    if (!idSet.has(el.id)) continue;
    const newId = idMap.get(el.id);
    if (!newId) continue;
    const mappedGroup = el.groupId ? groupMap.get(el.groupId) : undefined;
    const clone = { ...el, id: newId } as CoverElement;
    if (mappedGroup) clone.groupId = mappedGroup;
    else delete clone.groupId;
    clones.push(clone);
  }

  let next = ensureLayerTree(cover);
  const newGroups: CoverGroup[] = [];
  for (const [oldGid, newGid] of groupMap) {
    const src = next.groups.find((g) => g.id === oldGid);
    const childIds = (src?.childIds ?? [])
      .map((cid) => {
        if (idMap.has(cid)) return idMap.get(cid)!;
        if (groupMap.has(cid)) return groupMap.get(cid)!;
        return null;
      })
      .filter((x): x is string => Boolean(x));
    newGroups.push({
      id: newGid,
      name: src?.name ? `${src.name} 복사` : '그룹',
      childIds,
    });
  }

  next = {
    ...next,
    groups: [...next.groups, ...newGroups],
    elements: [...next.elements, ...clones],
  };

  // Place clone roots at front of root (mirror selection top-level nodes).
  const layerIds = selectionToLayerIds(cover, unique);
  const newRootIds = layerIds
    .map((id) => idMap.get(id) ?? groupMap.get(id))
    .filter((x): x is string => Boolean(x));
  for (const id of [...newRootIds].reverse()) {
    next = {
      ...next,
      rootLayerIds: [id, ...(next.rootLayerIds ?? []).filter((x) => x !== id)],
    };
  }

  next = ensureLayerTree(next);
  return {
    cover: next,
    newIds: unique.map((id) => idMap.get(id)!).filter(Boolean),
  };
}

export function groupSelectedElements(
  cover: NoteCover,
  ids: ReadonlyArray<string>,
  name?: string,
): { cover: NoteCover; groupId: string } | null {
  const unique = [...new Set(ids)].filter((id) =>
    cover.elements.some((el) => el.id === id),
  );
  if (unique.length < 1) return null;

  let next = ensureLayerTree(cover);
  const created = createEmptyGroup(next, name?.trim() || undefined);
  next = created.cover;
  const groupId = created.groupId;

  const layerIds = selectionToLayerIds(next, unique);
  for (const id of [...layerIds].reverse()) {
    next = moveLayerRelative(next, id, groupId, 'inside');
  }

  return { cover: next, groupId };
}

export function ungroupElements(
  cover: NoteCover,
  groupId: string,
): NoteCover {
  return ungroupLayer(cover, groupId);
}

export function deleteElements(
  cover: NoteCover,
  ids: ReadonlyArray<string>,
): NoteCover {
  const tree = ensureLayerTree(cover);
  const layerIds = selectionToLayerIds(tree, ids);
  // Also allow direct element deletes when not fully grouping.
  const toDelete = layerIds.length ? layerIds : [...ids];
  return deleteLayers(tree, toDelete);
}

/** Move layer in z-order. dir +1 = toward front, -1 = toward back. */
export function moveLayerZ(
  cover: NoteCover,
  id: string,
  dir: -1 | 1,
): NoteCover {
  return moveLayerInParent(cover, id, dir);
}

/** Bring all selected to front (preserve relative order). */
export function bringSelectionToFront(
  cover: NoteCover,
  ids: ReadonlyArray<string>,
): NoteCover {
  const layerIds = selectionToLayerIds(cover, ids);
  return bringLayersToFront(cover, layerIds.length ? layerIds : ids);
}

export function sendSelectionToBack(
  cover: NoteCover,
  ids: ReadonlyArray<string>,
): NoteCover {
  const layerIds = selectionToLayerIds(cover, ids);
  return sendLayersToBack(cover, layerIds.length ? layerIds : ids);
}

export type CoverLayerRow =
  | { kind: 'group'; group: CoverGroup; memberIds: string[]; depth: number }
  | { kind: 'element'; element: CoverElement; depth: number };

/**
 * Build flat layer rows for sidebar (front first), respecting collapse.
 * Nested groups are included as separate group rows.
 */
export function buildLayerRowsFrontFirst(
  cover: NoteCover,
  collapsed: Record<string, boolean> = {},
): CoverLayerRow[] {
  const tree = ensureLayerTree(cover);
  const flat = flattenLayerTree(tree, collapsed);
  const rows: CoverLayerRow[] = [];
  for (const item of flat) {
    if (item.kind === 'group') {
      const group = getGroup(tree, item.id);
      if (!group) continue;
      rows.push({
        kind: 'group',
        group,
        memberIds: collectDescendantElementIds(tree, item.id),
        depth: item.depth,
      });
    } else {
      const element = tree.elements.find((el) => el.id === item.id);
      if (!element) continue;
      rows.push({ kind: 'element', element, depth: item.depth });
    }
  }
  return rows;
}

export function renameGroup(
  cover: NoteCover,
  groupId: string,
  name: string,
): NoteCover {
  const trimmed = name.trim() || '그룹';
  return {
    ...cover,
    groups: (cover.groups ?? []).map((g) =>
      g.id === groupId ? { ...g, name: trimmed } : g,
    ),
  };
}

export function renameElement(
  cover: NoteCover,
  id: string,
  name: string,
): NoteCover {
  const trimmed = name.trim();
  return {
    ...cover,
    elements: cover.elements.map((el) => {
      if (el.id !== id) return el;
      const next = { ...el };
      if (trimmed) next.name = trimmed;
      else delete next.name;
      return next;
    }),
  };
}

/** Own `locked` flag on an element or group (ignores ancestors). */
export function isLayerDirectlyLocked(cover: NoteCover, id: string): boolean {
  const group = getGroup(cover, id);
  if (group) return group.locked === true;
  const el = cover.elements.find((item) => item.id === id);
  return el?.locked === true;
}

/** True if element is locked or sits under a locked ancestor group. */
export function isElementEffectivelyLocked(
  cover: NoteCover,
  el: CoverElement | string,
): boolean {
  const element =
    typeof el === 'string' ? cover.elements.find((item) => item.id === el) : el;
  if (!element) return false;
  if (element.locked === true) return true;
  let gid = element.groupId;
  const seen = new Set<string>();
  while (gid && !seen.has(gid)) {
    seen.add(gid);
    const group = getGroup(cover, gid);
    if (!group) break;
    if (group.locked === true) return true;
    gid = group.parentGroupId;
  }
  return false;
}

/** True if group is locked or an ancestor group is locked. */
export function isGroupEffectivelyLocked(cover: NoteCover, groupId: string): boolean {
  let gid: string | undefined = groupId;
  const seen = new Set<string>();
  while (gid && !seen.has(gid)) {
    seen.add(gid);
    const group = getGroup(cover, gid);
    if (!group) break;
    if (group.locked === true) return true;
    gid = group.parentGroupId;
  }
  return false;
}

export function setLayerLocked(
  cover: NoteCover,
  id: string,
  locked: boolean,
): NoteCover {
  if (isGroupId(cover, id)) {
    return {
      ...cover,
      groups: (cover.groups ?? []).map((g) => {
        if (g.id !== id) return g;
        const next = { ...g };
        if (locked) next.locked = true;
        else delete next.locked;
        return next;
      }),
    };
  }
  return {
    ...cover,
    elements: cover.elements.map((el) => {
      if (el.id !== id) return el;
      const next = { ...el };
      if (locked) next.locked = true;
      else delete next.locked;
      return next;
    }),
  };
}

export function toggleLayerLocked(cover: NoteCover, id: string): NoteCover {
  return setLayerLocked(cover, id, !isLayerDirectlyLocked(cover, id));
}

/** Drop locked (effective) element ids from a move/nudge selection. */
export function filterUnlockedElementIds(
  cover: NoteCover,
  ids: ReadonlyArray<string>,
): string[] {
  return ids.filter((id) => !isElementEffectivelyLocked(cover, id));
}

/**
 * True if any id is a locked element/group (effective), or a group that
 * contains a locked descendant element.
 */
export function layerIdsIncludeLocked(
  cover: NoteCover,
  ids: ReadonlyArray<string>,
): boolean {
  return ids.some((id) => {
    if (isGroupId(cover, id)) {
      if (isGroupEffectivelyLocked(cover, id)) return true;
      return collectDescendantElementIds(cover, id).some((eid) =>
        isElementEffectivelyLocked(cover, eid),
      );
    }
    return isElementEffectivelyLocked(cover, id);
  });
}

const COVER_FONT_SIZE_MIN = 6;
const COVER_FONT_SIZE_MAX = 400;

function clampCoverFontSize(value: number): number {
  if (!Number.isFinite(value)) return COVER_FONT_SIZE_MIN;
  return Math.min(
    COVER_FONT_SIZE_MAX,
    Math.max(COVER_FONT_SIZE_MIN, Math.round(value)),
  );
}

/** Nudge fontSize on selected text / shape elements by `delta` px (clamped). */
export function nudgeCoverFontSizes(
  cover: NoteCover,
  ids: ReadonlyArray<string>,
  delta: number,
): NoteCover {
  if (!ids.length || !Number.isFinite(delta) || delta === 0) return cover;
  const idSet = new Set(ids);
  let changed = false;
  const elements = cover.elements.map((el) => {
    if (!idSet.has(el.id)) return el;
    if (el.type === 'text') {
      const current = Number(el.fontSize);
      const next = clampCoverFontSize(
        (Number.isFinite(current) ? current : 36) + delta,
      );
      if (next === el.fontSize) return el;
      changed = true;
      return { ...el, fontSize: next };
    }
    if (el.type === 'rect' || el.type === 'ellipse' || el.type === 'roundRect') {
      const parsed = Number(el.fontSize);
      const current = Number.isFinite(parsed) ? parsed : 24;
      const next = clampCoverFontSize(current + delta);
      if (next === current && el.fontSize === next) return el;
      changed = true;
      return { ...el, fontSize: next };
    }
    return el;
  });
  return changed ? { ...cover, elements } : cover;
}

export { createEmptyGroup, registerNewElement };

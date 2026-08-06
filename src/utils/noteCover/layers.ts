import type {
  CoverElement,
  CoverGroup,
  CoverTextAlign,
  NoteCover,
} from '@/utils/noteCover/types';
import {
  bringLayersToFront,
  collectDescendantElementIds,
  createEmptyGroup,
  deleteLayers,
  ensureLayerTree,
  flattenLayerTree,
  getChildIds,
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
 * Ancestor groups of an element from rootmost to immediate parent.
 * Empty when the element is ungrouped.
 */
export function getElementGroupChain(
  cover: NoteCover,
  elementId: string,
): string[] {
  const tree = ensureLayerTree(cover);
  const el = tree.elements.find((e) => e.id === elementId);
  if (!el?.groupId) return [];
  const upward: string[] = [];
  let gid: string | undefined = el.groupId;
  const seen = new Set<string>();
  while (gid && !seen.has(gid)) {
    seen.add(gid);
    upward.push(gid);
    gid = getGroup(tree, gid)?.parentGroupId;
  }
  return upward.reverse();
}

/** True when selectedIds is exactly the full descendant set of groupId. */
export function selectionMatchesGroupMembers(
  cover: NoteCover,
  selectedIds: ReadonlyArray<string>,
  groupId: string,
): boolean {
  const members = collectDescendantElementIds(cover, groupId);
  if (!members.length || members.length !== selectedIds.length) return false;
  const set = new Set(selectedIds);
  return members.every((id) => set.has(id));
}

/**
 * Expand selection so any grouped element pulls in members of its group.
 * - `root` (default): outermost ancestor group (canvas click / marquee)
 * - `immediate`: element's own groupId only
 */
export function expandIdsToGroups(
  cover: NoteCover,
  ids: ReadonlyArray<string>,
  scope: 'root' | 'immediate' = 'root',
): string[] {
  if (!ids.length) return [];
  const tree = ensureLayerTree(cover);
  const out = new Set<string>();
  for (const id of ids) {
    const el = tree.elements.find((e) => e.id === id);
    if (!el) continue;
    if (!el.groupId) {
      out.add(id);
      continue;
    }
    const groupId =
      scope === 'immediate'
        ? el.groupId
        : (getElementGroupChain(tree, id)[0] ?? el.groupId);
    for (const mid of collectDescendantElementIds(tree, groupId)) {
      out.add(mid);
    }
  }
  return [...out];
}

/**
 * Pointer-down selection for a canvas element.
 * Keeps the current group (or sole element) when it already sits on this
 * element's ancestor chain so nested drill-down is preserved; otherwise
 * selects the rootmost containing group.
 *
 * When drilled into a group (selection is a proper subset), clicking a sibling
 * inside that group selects that sibling unit without re-drilling / jumping
 * back to the root group.
 *
 * When the target is already selected as a partial (layer-list / drilled)
 * selection — not a full ancestor group — keep that selection so drag moves
 * those objects instead of expanding to the root group.
 */
export function resolveCoverPointerSelection(
  cover: NoteCover,
  elementId: string,
  selectedIds: ReadonlyArray<string>,
): string[] {
  const tree = ensureLayerTree(cover);
  if (!tree.elements.some((e) => e.id === elementId)) return [];
  const chain = getElementGroupChain(tree, elementId);
  if (!chain.length) return [elementId];

  let matched = -1;
  for (let i = 0; i < chain.length; i += 1) {
    if (selectionMatchesGroupMembers(tree, selectedIds, chain[i]!)) matched = i;
  }
  if (matched >= 0) {
    return collectDescendantElementIds(tree, chain[matched]!);
  }
  // Already selected individually (e.g. from the layer list): keep selection.
  if (selectedIds.includes(elementId)) {
    return [...selectedIds];
  }

  // Drilled into a group: click selects sibling units at that depth.
  const drillParent = findCoverDrillParentGroup(tree, selectedIds);
  if (drillParent) {
    const members = collectDescendantElementIds(tree, drillParent);
    if (members.includes(elementId)) {
      return coverLayerUnitUnderParent(tree, drillParent, elementId);
    }
  }

  return collectDescendantElementIds(tree, chain[0]!);
}

/**
 * Double-click drill: one step deeper toward elementId.
 * When the sole element is already selected, `enterEdit` asks the caller to
 * open text editing (if applicable).
 */
export function resolveCoverDrillSelection(
  cover: NoteCover,
  elementId: string,
  selectedIds: ReadonlyArray<string>,
): { ids: string[]; enterEdit: boolean } {
  const tree = ensureLayerTree(cover);
  if (!tree.elements.some((e) => e.id === elementId)) {
    return { ids: [], enterEdit: false };
  }

  if (selectedIds.length === 1 && selectedIds[0] === elementId) {
    return { ids: [elementId], enterEdit: true };
  }

  const chain = getElementGroupChain(tree, elementId);
  if (!chain.length) {
    return { ids: [elementId], enterEdit: true };
  }

  let matched = -1;
  for (let i = 0; i < chain.length; i += 1) {
    if (selectionMatchesGroupMembers(tree, selectedIds, chain[i]!)) matched = i;
  }

  if (matched < 0) {
    return {
      ids: collectDescendantElementIds(tree, chain[0]!),
      enterEdit: false,
    };
  }

  if (matched < chain.length - 1) {
    return {
      ids: collectDescendantElementIds(tree, chain[matched + 1]!),
      enterEdit: false,
    };
  }

  return { ids: [elementId], enterEdit: false };
}

/**
 * Deepest ancestor group that contains the whole selection as a proper subset
 * (i.e. the group we have drilled into). Null when selection is empty, spans
 * ungrouped elements, or exactly matches a topmost selected group with no
 * outer partial container.
 */
function findCoverDrillParentGroup(
  cover: NoteCover,
  selectedIds: ReadonlyArray<string>,
): string | null {
  if (!selectedIds.length) return null;
  const tree = ensureLayerTree(cover);
  let common: string[] | null = null;
  for (const id of selectedIds) {
    const chain = getElementGroupChain(tree, id);
    if (!chain.length) return null;
    if (common == null) {
      common = [...chain];
      continue;
    }
    const set = new Set(chain);
    common = common.filter((gid) => set.has(gid));
  }
  if (!common?.length) return null;

  const selected = new Set(selectedIds);
  for (let i = common.length - 1; i >= 0; i -= 1) {
    const gid = common[i]!;
    const members = collectDescendantElementIds(tree, gid);
    if (!members.length) continue;
    if (!selectedIds.every((id) => members.includes(id))) continue;
    if (members.every((m) => selected.has(m))) continue;
    return gid;
  }
  return null;
}

/** Direct child unit of `parentGroupId` that contains `elementId`. */
function coverLayerUnitUnderParent(
  cover: NoteCover,
  parentGroupId: string,
  elementId: string,
): string[] {
  const tree = ensureLayerTree(cover);
  for (const childId of getChildIds(tree, parentGroupId)) {
    if (isGroupId(tree, childId)) {
      const desc = collectDescendantElementIds(tree, childId);
      if (desc.includes(elementId)) return desc;
    } else if (childId === elementId) {
      return [elementId];
    }
  }
  return [elementId];
}

/**
 * Cmd/Ctrl multi-select targets.
 * After drilling into a group, toggles sibling units inside that group.
 * Otherwise expands to the rootmost group (canvas default).
 */
export function resolveCoverAdditiveSelection(
  cover: NoteCover,
  elementId: string,
  selectedIds: ReadonlyArray<string>,
): string[] {
  const tree = ensureLayerTree(cover);
  if (!tree.elements.some((e) => e.id === elementId)) return [];

  const drillParent = findCoverDrillParentGroup(tree, selectedIds);
  if (!drillParent) {
    return expandIdsToGroups(tree, [elementId], 'root');
  }

  const members = collectDescendantElementIds(tree, drillParent);
  if (!members.includes(elementId)) {
    return expandIdsToGroups(tree, [elementId], 'root');
  }

  return coverLayerUnitUnderParent(tree, drillParent, elementId);
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
  const layerIds = selectionToLayerIds(next, unique);
  // Already a single group — do not wrap it in another parent group.
  if (layerIds.length === 1 && isGroupId(next, layerIds[0]!)) {
    return null;
  }

  const created = createEmptyGroup(next, name?.trim() || undefined);
  next = created.cover;
  const groupId = created.groupId;

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

/**
 * Move selection one step in z-order within each parent.
 * dir +1 = toward front, -1 = toward back.
 */
export function nudgeSelectionZ(
  cover: NoteCover,
  ids: ReadonlyArray<string>,
  dir: -1 | 1,
): NoteCover {
  const layerIds = selectionToLayerIds(cover, ids);
  const units = layerIds.length ? layerIds : [...ids];
  if (!units.length) return cover;
  let next = cover;
  // Preserve relative order: nudge the leading edge of the stack first.
  const sequence = dir === 1 ? units : [...units].reverse();
  for (const id of sequence) {
    next = moveLayerZ(next, id, dir);
  }
  return next;
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

/** Set textAlign on selected text / shape elements. */
export function setCoverTextAlign(
  cover: NoteCover,
  ids: ReadonlyArray<string>,
  textAlign: CoverTextAlign,
): NoteCover {
  if (!ids.length) return cover;
  if (textAlign !== 'left' && textAlign !== 'center' && textAlign !== 'right') {
    return cover;
  }
  const idSet = new Set(ids);
  let changed = false;
  const elements = cover.elements.map((el) => {
    if (!idSet.has(el.id)) return el;
    if (el.type === 'text') {
      if (el.textAlign === textAlign) return el;
      changed = true;
      return { ...el, textAlign };
    }
    if (el.type === 'rect' || el.type === 'ellipse' || el.type === 'roundRect') {
      if (el.textAlign === textAlign) return el;
      changed = true;
      return { ...el, textAlign };
    }
    return el;
  });
  return changed ? { ...cover, elements } : cover;
}

export { createEmptyGroup, registerNewElement };

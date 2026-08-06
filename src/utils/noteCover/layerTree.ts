import type { CoverElement, CoverGroup, NoteCover } from '@/utils/noteCover/types';

export type LayerParentId = string | null;

export type FlatLayerItem = {
  id: string;
  kind: 'element' | 'group';
  depth: number;
  parentId: LayerParentId;
};

function cloneCover(cover: NoteCover): NoteCover {
  return {
    ...cover,
    rootLayerIds: [...(cover.rootLayerIds ?? [])],
    groups: (cover.groups ?? []).map((g) => ({
      ...g,
      childIds: [...(g.childIds ?? [])],
    })),
    elements: cover.elements.map((el) => ({ ...el })),
  };
}

export function isGroupId(cover: NoteCover, id: string): boolean {
  return (cover.groups ?? []).some((g) => g.id === id);
}

export function getGroup(cover: NoteCover, id: string): CoverGroup | null {
  return (cover.groups ?? []).find((g) => g.id === id) ?? null;
}

export function getChildIds(cover: NoteCover, parentId: LayerParentId): string[] {
  if (parentId == null) return [...(cover.rootLayerIds ?? [])];
  const g = getGroup(cover, parentId);
  return g ? [...(g.childIds ?? [])] : [];
}

function setChildIds(
  cover: NoteCover,
  parentId: LayerParentId,
  ids: string[],
): NoteCover {
  if (parentId == null) {
    return { ...cover, rootLayerIds: ids };
  }
  return {
    ...cover,
    groups: (cover.groups ?? []).map((g) =>
      g.id === parentId ? { ...g, childIds: ids } : g,
    ),
  };
}

function finalizeTree(cover: NoteCover): NoteCover {
  return syncElementsPaintOrder(syncElementGroupIds(cover));
}

/** Find which list contains `id` (root or a group's childIds). */
export function findLayerParent(
  cover: NoteCover,
  id: string,
): LayerParentId | undefined {
  if ((cover.rootLayerIds ?? []).includes(id)) return null;
  for (const g of cover.groups ?? []) {
    if ((g.childIds ?? []).includes(id)) return g.id;
  }
  return undefined;
}

function removeFromAllLists(cover: NoteCover, id: string): NoteCover {
  let next = {
    ...cover,
    rootLayerIds: (cover.rootLayerIds ?? []).filter((x) => x !== id),
    groups: (cover.groups ?? []).map((g) => ({
      ...g,
      childIds: (g.childIds ?? []).filter((x) => x !== id),
    })),
  };
  return next;
}

function insertIntoParent(
  cover: NoteCover,
  parentId: LayerParentId,
  id: string,
  index: number,
): NoteCover {
  const kids = getChildIds(cover, parentId).filter((x) => x !== id);
  const i = Math.max(0, Math.min(index, kids.length));
  kids.splice(i, 0, id);
  let next = setChildIds(cover, parentId, kids);
  if (isGroupId(next, id)) {
    next = {
      ...next,
      groups: next.groups.map((g) => {
        if (g.id !== id) return g;
        const copy = { ...g };
        if (parentId) copy.parentGroupId = parentId;
        else delete copy.parentGroupId;
        return copy;
      }),
    };
  }
  return next;
}

/** Keep element.groupId = immediate parent group (if any). */
export function syncElementGroupIds(cover: NoteCover): NoteCover {
  const parentOf = new Map<string, string>();
  for (const g of cover.groups ?? []) {
    for (const cid of g.childIds ?? []) {
      if (!isGroupId(cover, cid)) parentOf.set(cid, g.id);
    }
  }
  return {
    ...cover,
    elements: cover.elements.map((el) => {
      const gid = parentOf.get(el.id);
      const next = { ...el };
      if (gid) next.groupId = gid;
      else delete next.groupId;
      return next;
    }),
  };
}

/**
 * Build / repair rootLayerIds + group.childIds from legacy flat data
 * (or incomplete trees).
 */
export function ensureLayerTree(cover: NoteCover): NoteCover {
  let next = cloneCover(cover);
  const elementIds = new Set(next.elements.map((e) => e.id));
  const groupIds = new Set((next.groups ?? []).map((g) => g.id));

  // Drop unknown ids from lists.
  next.rootLayerIds = (next.rootLayerIds ?? []).filter(
    (id) => elementIds.has(id) || groupIds.has(id),
  );
  next.groups = (next.groups ?? []).map((g) => ({
    ...g,
    childIds: (g.childIds ?? []).filter(
      (id) => elementIds.has(id) || (groupIds.has(id) && id !== g.id),
    ),
  }));

  const placed = new Set<string>();
  const walkPlace = (ids: string[]) => {
    for (const id of ids) {
      if (placed.has(id)) continue;
      placed.add(id);
      if (groupIds.has(id)) {
        const g = next.groups.find((x) => x.id === id);
        if (g) walkPlace(g.childIds ?? []);
      }
    }
  };
  walkPlace(next.rootLayerIds);

  const hasTree =
    next.rootLayerIds.length > 0 ||
    next.groups.some((g) => (g.childIds ?? []).length > 0);

  if (!hasTree && (next.elements.length > 0 || next.groups.length > 0)) {
    // Legacy migrate: front-first from elements array.
    const seenGroups = new Set<string>();
    const root: string[] = [];
    const groupChildren = new Map<string, string[]>();

    for (let i = next.elements.length - 1; i >= 0; i -= 1) {
      const el = next.elements[i];
      if (!el) continue;
      const gid = el.groupId;
      if (gid && groupIds.has(gid)) {
        if (!seenGroups.has(gid)) {
          seenGroups.add(gid);
          root.push(gid);
          const members = next.elements
            .filter((m) => m.groupId === gid)
            .map((m) => m.id)
            .reverse();
          groupChildren.set(gid, members);
          members.forEach((m) => placed.add(m));
          placed.add(gid);
        }
        continue;
      }
      root.push(el.id);
      placed.add(el.id);
    }

    for (const g of next.groups) {
      if (!placed.has(g.id)) {
        root.push(g.id);
        placed.add(g.id);
      }
      if (!groupChildren.has(g.id)) groupChildren.set(g.id, []);
    }

    next.rootLayerIds = root;
    next.groups = next.groups.map((g) => ({
      ...g,
      childIds: groupChildren.get(g.id) ?? [],
    }));
  } else {
    // Place orphans at end of root.
    for (const el of next.elements) {
      if (!placed.has(el.id)) {
        next.rootLayerIds.push(el.id);
        placed.add(el.id);
      }
    }
    for (const g of next.groups) {
      if (!placed.has(g.id)) {
        next.rootLayerIds.push(g.id);
        placed.add(g.id);
      }
    }
  }

  return finalizeTree(next);
}

/** Element paint order: array end = front (matches CoverEditor map). */
export function orderedElementIdsBackFirst(cover: NoteCover): string[] {
  const tree = {
    ...cover,
    rootLayerIds: [...(cover.rootLayerIds ?? [])],
    groups: cover.groups ?? [],
  };
  const frontFirst: string[] = [];
  const walk = (ids: string[]) => {
    for (const id of ids) {
      if (isGroupId(tree, id)) {
        const g = getGroup(tree, id);
        walk(g?.childIds ?? []);
      } else if (tree.elements.some((e) => e.id === id)) {
        frontFirst.push(id);
      }
    }
  };
  walk(tree.rootLayerIds);
  return frontFirst.reverse();
}

export function syncElementsPaintOrder(cover: NoteCover): NoteCover {
  const byId = new Map(cover.elements.map((el) => [el.id, el]));
  const order = orderedElementIdsBackFirst(cover);
  const seen = new Set(order);
  const elements: CoverElement[] = [];
  for (const id of order) {
    const el = byId.get(id);
    if (el) elements.push(el);
  }
  for (const el of cover.elements) {
    if (!seen.has(el.id)) elements.push(el);
  }
  return { ...cover, elements };
}

/** Flatten tree front-first for DnD list rendering. */
export function flattenLayerTree(
  cover: NoteCover,
  collapsed: Record<string, boolean>,
): FlatLayerItem[] {
  const tree = ensureLayerTree(cover);
  const out: FlatLayerItem[] = [];

  const walk = (ids: string[], depth: number, parentId: LayerParentId) => {
    for (const id of ids) {
      if (isGroupId(tree, id)) {
        out.push({ id, kind: 'group', depth, parentId });
        if (!collapsed[id]) {
          const g = getGroup(tree, id);
          walk(g?.childIds ?? [], depth + 1, id);
        }
      } else if (tree.elements.some((e) => e.id === id)) {
        out.push({ id, kind: 'element', depth, parentId });
      }
    }
  };

  walk(tree.rootLayerIds ?? [], 0, null);
  return out;
}

export function createEmptyGroup(
  cover: NoteCover,
  name?: string,
): { cover: NoteCover; groupId: string } {
  const tree = ensureLayerTree(cover);
  const groupId = crypto.randomUUID();
  const group: CoverGroup = {
    id: groupId,
    name: name?.trim() || `그룹 ${(tree.groups.length ?? 0) + 1}`,
    childIds: [],
  };
  const next: NoteCover = {
    ...tree,
    groups: [...tree.groups, group],
    rootLayerIds: [groupId, ...tree.rootLayerIds],
  };
  return { cover: finalizeTree(next), groupId };
}

export function appendLayersToRoot(cover: NoteCover, ids: string[]): NoteCover {
  let next = ensureLayerTree(cover);
  for (const id of ids) {
    next = removeFromAllLists(next, id);
    next = {
      ...next,
      rootLayerIds: [id, ...(next.rootLayerIds ?? [])],
    };
  }
  return finalizeTree(next);
}

/** All element ids under a group (recursive). */
export function collectDescendantElementIds(
  cover: NoteCover,
  groupId: string,
): string[] {
  const tree = ensureLayerTree(cover);
  const out: string[] = [];
  const walk = (gid: string) => {
    const g = getGroup(tree, gid);
    if (!g) return;
    for (const cid of g.childIds ?? []) {
      if (isGroupId(tree, cid)) walk(cid);
      else out.push(cid);
    }
  };
  walk(groupId);
  return out;
}

export function wouldCreateGroupCycle(
  cover: NoteCover,
  groupId: string,
  newParentId: string,
): boolean {
  if (groupId === newParentId) return true;
  let cur: string | undefined = newParentId;
  const seen = new Set<string>();
  while (cur) {
    if (cur === groupId) return true;
    if (seen.has(cur)) return true;
    seen.add(cur);
    cur = getGroup(cover, cur)?.parentGroupId;
  }
  return false;
}

function isDescendantLayer(
  cover: NoteCover,
  ancestorGroupId: string,
  id: string,
): boolean {
  const stack = [...getChildIds(cover, ancestorGroupId)];
  while (stack.length) {
    const cid = stack.pop()!;
    if (cid === id) return true;
    if (isGroupId(cover, cid)) stack.push(...getChildIds(cover, cid));
  }
  return false;
}

/**
 * Move active layer relative to over target.
 * - `before` / `after`: same parent as over (or root)
 * - `inside`: become first child of over (must be group)
 */
export function moveLayerRelative(
  cover: NoteCover,
  activeId: string,
  overId: string,
  placement: 'before' | 'after' | 'inside',
): NoteCover {
  if (activeId === overId) return cover;
  let next = ensureLayerTree(cover);
  if (isGroupId(next, activeId) && isDescendantLayer(next, activeId, overId)) {
    return cover;
  }
  if (placement === 'inside') {
    if (!isGroupId(next, overId)) return cover;
    if (isGroupId(next, activeId) && wouldCreateGroupCycle(next, activeId, overId)) {
      return cover;
    }
    next = removeFromAllLists(next, activeId);
    next = insertIntoParent(next, overId, activeId, 0);
    return finalizeTree(next);
  }

  const overParent = findLayerParent(next, overId);
  if (overParent === undefined) return cover;
  if (
    isGroupId(next, activeId) &&
    overParent &&
    wouldCreateGroupCycle(next, activeId, overParent)
  ) {
    return cover;
  }

  next = removeFromAllLists(next, activeId);
  const siblings = getChildIds(next, overParent).filter((x) => x !== activeId);
  const overIndex = siblings.indexOf(overId);
  if (overIndex < 0) {
    next = insertIntoParent(next, overParent, activeId, siblings.length);
  } else {
    const index = placement === 'before' ? overIndex : overIndex + 1;
    next = insertIntoParent(next, overParent, activeId, index);
  }
  return finalizeTree(next);
}

/** Drop onto empty root padding (end of root, or start). */
export function moveLayerToRoot(
  cover: NoteCover,
  activeId: string,
  at: 'start' | 'end' = 'end',
): NoteCover {
  let next = ensureLayerTree(cover);
  next = removeFromAllLists(next, activeId);
  if (isGroupId(next, activeId)) {
    next = {
      ...next,
      groups: next.groups.map((g) => {
        if (g.id !== activeId) return g;
        const copy = { ...g };
        delete copy.parentGroupId;
        return copy;
      }),
    };
  }
  const root = [...(next.rootLayerIds ?? [])].filter((x) => x !== activeId);
  if (at === 'start') root.unshift(activeId);
  else root.push(activeId);
  return finalizeTree({ ...next, rootLayerIds: root });
}

export function deleteLayers(
  cover: NoteCover,
  ids: ReadonlyArray<string>,
): NoteCover {
  const elementDelete = new Set<string>();
  const groupDelete = new Set<string>();

  for (const id of ids) {
    if (isGroupId(cover, id)) {
      groupDelete.add(id);
      collectDescendantElementIds(cover, id).forEach((e) => elementDelete.add(e));
      // nested groups
      const stack = [id];
      while (stack.length) {
        const gid = stack.pop()!;
        const g = getGroup(cover, gid);
        for (const cid of g?.childIds ?? []) {
          if (isGroupId(cover, cid)) {
            groupDelete.add(cid);
            stack.push(cid);
          }
        }
      }
    } else {
      elementDelete.add(id);
    }
  }

  let next = ensureLayerTree(cover);
  for (const id of [...elementDelete, ...groupDelete]) {
    next = removeFromAllLists(next, id);
  }
  next = {
    ...next,
    elements: next.elements.filter((el) => !elementDelete.has(el.id)),
    groups: next.groups.filter((g) => !groupDelete.has(g.id)),
  };
  return finalizeTree(next);
}

/** Dissolve a group: children move to the group's former parent. */
export function ungroupLayer(cover: NoteCover, groupId: string): NoteCover {
  let next = ensureLayerTree(cover);
  const g = getGroup(next, groupId);
  if (!g) return cover;
  const parent = findLayerParent(next, groupId);
  if (parent === undefined) return cover;

  const kids = [...(g.childIds ?? [])];
  const siblingsBefore = getChildIds(next, parent);
  const at = siblingsBefore.indexOf(groupId);

  next = removeFromAllLists(next, groupId);
  next = {
    ...next,
    groups: next.groups.filter((x) => x.id !== groupId),
  };

  let insertAt = at >= 0 ? at : getChildIds(next, parent).length;
  for (const kid of kids) {
    next = removeFromAllLists(next, kid);
    next = insertIntoParent(next, parent, kid, insertAt);
    insertAt += 1;
  }
  return finalizeTree(next);
}

export function registerNewElement(
  cover: NoteCover,
  element: CoverElement,
): NoteCover {
  const tree = ensureLayerTree(cover);
  return finalizeTree({
    ...tree,
    elements: [...tree.elements, element],
    rootLayerIds: [element.id, ...(tree.rootLayerIds ?? [])],
  });
}

/** Move a layer one step within its parent list. dir +1 = toward front. */
export function moveLayerInParent(
  cover: NoteCover,
  id: string,
  dir: -1 | 1,
): NoteCover {
  let next = ensureLayerTree(cover);
  const parent = findLayerParent(next, id);
  if (parent === undefined) return cover;
  const kids = getChildIds(next, parent);
  const index = kids.indexOf(id);
  if (index < 0) return cover;
  // front-first: +1 front → lower index
  const nextIndex = index - dir;
  if (nextIndex < 0 || nextIndex >= kids.length) return cover;
  const swapped = [...kids];
  const tmp = swapped[index]!;
  swapped[index] = swapped[nextIndex]!;
  swapped[nextIndex] = tmp;
  next = setChildIds(next, parent, swapped);
  return finalizeTree(next);
}

/** Bring selected layer nodes to front of their respective parents. */
export function bringLayersToFront(
  cover: NoteCover,
  ids: ReadonlyArray<string>,
): NoteCover {
  let next = ensureLayerTree(cover);
  const unique = [...new Set(ids)];
  const byParent = new Map<string | 'root', string[]>();
  for (const id of unique) {
    const parent = findLayerParent(next, id);
    if (parent === undefined) continue;
    const key = parent ?? 'root';
    const list = byParent.get(key) ?? [];
    list.push(id);
    byParent.set(key, list);
  }
  for (const [key, moving] of byParent) {
    const parentId = key === 'root' ? null : key;
    const kids = getChildIds(next, parentId).filter((x) => !moving.includes(x));
    // Preserve relative order among moving items as they appear in current list.
    const orderedMoving = getChildIds(next, parentId).filter((x) =>
      moving.includes(x),
    );
    next = setChildIds(next, parentId, [...orderedMoving, ...kids]);
  }
  return finalizeTree(next);
}

export function sendLayersToBack(
  cover: NoteCover,
  ids: ReadonlyArray<string>,
): NoteCover {
  let next = ensureLayerTree(cover);
  const unique = [...new Set(ids)];
  const byParent = new Map<string | 'root', string[]>();
  for (const id of unique) {
    const parent = findLayerParent(next, id);
    if (parent === undefined) continue;
    const key = parent ?? 'root';
    const list = byParent.get(key) ?? [];
    list.push(id);
    byParent.set(key, list);
  }
  for (const [key, moving] of byParent) {
    const parentId = key === 'root' ? null : key;
    const kids = getChildIds(next, parentId).filter((x) => !moving.includes(x));
    const orderedMoving = getChildIds(next, parentId).filter((x) =>
      moving.includes(x),
    );
    next = setChildIds(next, parentId, [...kids, ...orderedMoving]);
  }
  return finalizeTree(next);
}

/** Map element selection to topmost layer ids (group if fully covered). */
export function selectionToLayerIds(
  cover: NoteCover,
  elementIds: ReadonlyArray<string>,
): string[] {
  const tree = ensureLayerTree(cover);
  const selected = new Set(elementIds);
  const result: string[] = [];
  const walk = (ids: string[]) => {
    for (const id of ids) {
      if (isGroupId(tree, id)) {
        const desc = collectDescendantElementIds(tree, id);
        if (desc.length > 0 && desc.every((d) => selected.has(d))) {
          result.push(id);
          continue;
        }
        const g = getGroup(tree, id);
        walk(g?.childIds ?? []);
      } else if (selected.has(id)) {
        result.push(id);
      }
    }
  };
  walk(tree.rootLayerIds ?? []);
  return result;
}

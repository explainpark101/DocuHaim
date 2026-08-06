import {
  collectDescendantElementIds,
  ensureLayerTree,
  getChildIds,
  getGroup,
  isGroupId,
  selectionToLayerIds,
} from '@/utils/noteCover/layerTree';
import { getSelectionBounds } from '@/utils/noteCover/layers';
import type { CoverElement, NoteCover } from '@/utils/noteCover/types';

export type CoverObjectAlign =
  | 'left'
  | 'centerX'
  | 'right'
  | 'top'
  | 'centerY'
  | 'bottom'
  | 'distributeX'
  | 'distributeY';

export type CoverAlignUnit = {
  /** Element ids that move together as one object. */
  memberIds: string[];
  bounds: { x: number; y: number; w: number; h: number };
};

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function unitFromLayerId(cover: NoteCover, layerId: string): CoverAlignUnit | null {
  if (isGroupId(cover, layerId)) {
    const members = getElementsByIds(
      cover,
      collectDescendantElementIds(cover, layerId),
    );
    if (!members.length) return null;
    const bounds = getSelectionBounds(members);
    if (!bounds) return null;
    return { memberIds: members.map((m) => m.id), bounds };
  }
  const el = cover.elements.find((e) => e.id === layerId);
  if (!el) return null;
  return {
    memberIds: [el.id],
    bounds: { x: el.x, y: el.y, w: el.w, h: el.h },
  };
}

function getElementsByIds(
  cover: NoteCover,
  ids: ReadonlyArray<string>,
): CoverElement[] {
  const set = new Set(ids);
  return cover.elements.filter((el) => set.has(el.id));
}

/**
 * Top-level align units for the current element selection.
 * Fully selected groups collapse to one unit (move as a whole).
 */
export function resolveSelectionAlignUnits(
  cover: NoteCover,
  selectedIds: ReadonlyArray<string>,
): {
  units: CoverAlignUnit[];
  /** When selection is exactly one fully-selected group. */
  soleGroupId: string | null;
} {
  const tree = ensureLayerTree(cover);
  const layerIds = selectionToLayerIds(tree, selectedIds);
  const soleGroupId =
    layerIds.length === 1 && isGroupId(tree, layerIds[0]!)
      ? layerIds[0]!
      : null;

  const units: CoverAlignUnit[] = [];
  for (const id of layerIds) {
    const unit = unitFromLayerId(tree, id);
    if (unit) units.push(unit);
  }
  return { units, soleGroupId };
}

/** Immediate children of a group as align units (nested group = one unit). */
export function resolveGroupInternalAlignUnits(
  cover: NoteCover,
  groupId: string,
): CoverAlignUnit[] {
  const tree = ensureLayerTree(cover);
  if (!getGroup(tree, groupId)) return [];
  const units: CoverAlignUnit[] = [];
  for (const id of getChildIds(tree, groupId)) {
    const unit = unitFromLayerId(tree, id);
    if (unit) units.push(unit);
  }
  return units;
}

/**
 * Align / distribute units. Each unit's members share the same delta
 * (group moves as one bounding box).
 */
export function alignCoverUnits(
  cover: NoteCover,
  units: ReadonlyArray<CoverAlignUnit>,
  mode: CoverObjectAlign,
  gapPct = 0,
): NoteCover {
  if (units.length < 1) return cover;
  if (units.length < 2 && mode.startsWith('distribute')) return cover;
  if (units.length < 2 && !mode.startsWith('distribute')) {
    // Single unit: nothing to align against.
    return cover;
  }

  const gap = Math.max(0, gapPct);
  const allBounds = {
    x: Math.min(...units.map((u) => u.bounds.x)),
    y: Math.min(...units.map((u) => u.bounds.y)),
    right: Math.max(...units.map((u) => u.bounds.x + u.bounds.w)),
    bottom: Math.max(...units.map((u) => u.bounds.y + u.bounds.h)),
  };
  const unionW = allBounds.right - allBounds.x;
  const unionH = allBounds.bottom - allBounds.y;

  const deltaByMember = new Map<string, { dx: number; dy: number }>();

  const setUnitDelta = (unit: CoverAlignUnit, dx: number, dy: number) => {
    for (const id of unit.memberIds) {
      deltaByMember.set(id, { dx, dy });
    }
  };

  if (mode === 'left') {
    for (const u of units) setUnitDelta(u, allBounds.x - u.bounds.x, 0);
  } else if (mode === 'centerX') {
    const cx = allBounds.x + unionW / 2;
    for (const u of units) {
      setUnitDelta(u, cx - (u.bounds.x + u.bounds.w / 2), 0);
    }
  } else if (mode === 'right') {
    for (const u of units) {
      setUnitDelta(u, allBounds.right - (u.bounds.x + u.bounds.w), 0);
    }
  } else if (mode === 'top') {
    for (const u of units) setUnitDelta(u, 0, allBounds.y - u.bounds.y);
  } else if (mode === 'centerY') {
    const cy = allBounds.y + unionH / 2;
    for (const u of units) {
      setUnitDelta(u, 0, cy - (u.bounds.y + u.bounds.h / 2));
    }
  } else if (mode === 'bottom') {
    for (const u of units) {
      setUnitDelta(u, 0, allBounds.bottom - (u.bounds.y + u.bounds.h));
    }
  } else if (mode === 'distributeX') {
    const sorted = [...units].sort((a, b) => a.bounds.x - b.bounds.x);
    if (sorted.length === 2) {
      const a = sorted[0]!;
      const b = sorted[1]!;
      const targetX = a.bounds.x + a.bounds.w + gap;
      setUnitDelta(b, targetX - b.bounds.x, 0);
    } else {
      const first = sorted[0]!;
      const last = sorted[sorted.length - 1]!;
      const span = last.bounds.x - first.bounds.x;
      const step = span / (sorted.length - 1);
      sorted.slice(1, -1).forEach((u, i) => {
        const targetX = first.bounds.x + step * (i + 1);
        setUnitDelta(u, targetX - u.bounds.x, 0);
      });
    }
  } else if (mode === 'distributeY') {
    const sorted = [...units].sort((a, b) => a.bounds.y - b.bounds.y);
    if (sorted.length === 2) {
      const a = sorted[0]!;
      const b = sorted[1]!;
      const targetY = a.bounds.y + a.bounds.h + gap;
      setUnitDelta(b, 0, targetY - b.bounds.y);
    } else {
      const first = sorted[0]!;
      const last = sorted[sorted.length - 1]!;
      const span = last.bounds.y - first.bounds.y;
      const step = span / (sorted.length - 1);
      sorted.slice(1, -1).forEach((u, i) => {
        const targetY = first.bounds.y + step * (i + 1);
        setUnitDelta(u, 0, targetY - u.bounds.y);
      });
    }
  }

  // Clamp so the whole unit stays in frame (same delta for all members).
  const members = cover.elements.filter((el) => deltaByMember.has(el.id));
  if (!members.length) return cover;

  // Per-unit clamp: reduce |dx|/|dy| so no member leaves the frame.
  const unitDeltas = new Map<string, { dx: number; dy: number }>();
  for (const u of units) {
    const sample = u.memberIds[0];
    if (!sample) continue;
    const d = deltaByMember.get(sample);
    if (!d) continue;
    let { dx, dy } = d;
    for (const id of u.memberIds) {
      const el = cover.elements.find((e) => e.id === id);
      if (!el) continue;
      if (dx < 0) dx = Math.max(dx, -el.x);
      if (dx > 0) dx = Math.min(dx, 100 - el.w - el.x);
      if (dy < 0) dy = Math.max(dy, -el.y);
      if (dy > 0) dy = Math.min(dy, 100 - el.h - el.y);
    }
    for (const id of u.memberIds) unitDeltas.set(id, { dx, dy });
  }

  return {
    ...cover,
    elements: cover.elements.map((el) => {
      const d = unitDeltas.get(el.id);
      if (!d || (d.dx === 0 && d.dy === 0)) return el;
      return {
        ...el,
        x: clamp(el.x + d.dx, 0, 100 - el.w),
        y: clamp(el.y + d.dy, 0, 100 - el.h),
      };
    }),
  };
}

/**
 * Align selected cover objects.
 * - Mixed selection: fully selected groups move as one unit.
 * - `insideGroupId`: align immediate children of that group instead.
 */
export function alignCoverElements(
  cover: NoteCover,
  ids: ReadonlyArray<string>,
  mode: CoverObjectAlign,
  gapPct = 0,
  options?: { insideGroupId?: string },
): NoteCover {
  const units = options?.insideGroupId
    ? resolveGroupInternalAlignUnits(cover, options.insideGroupId)
    : resolveSelectionAlignUnits(cover, ids).units;
  return alignCoverUnits(cover, units, mode, gapPct);
}

export function canAlignCoverSelection(
  cover: NoteCover,
  selectedIds: ReadonlyArray<string>,
): { enabled: boolean; soleGroupId: string | null; unitCount: number } {
  const { units, soleGroupId } = resolveSelectionAlignUnits(cover, selectedIds);
  if (soleGroupId) {
    const inner = resolveGroupInternalAlignUnits(cover, soleGroupId);
    return {
      enabled: inner.length >= 2,
      soleGroupId,
      unitCount: inner.length,
    };
  }
  return {
    enabled: units.length >= 2,
    soleGroupId: null,
    unitCount: units.length,
  };
}

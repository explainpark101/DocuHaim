/** Pixel distance at which a dragged split boundary snaps to another. */
export const PANE_BOUNDARY_SNAP_PX = 10;

/**
 * Snap `value` to the nearest target within `thresholdPx`.
 * When several targets are within range, the closest wins.
 */
export function snapToNearest(
  value: number,
  targets: readonly number[],
  thresholdPx: number = PANE_BOUNDARY_SNAP_PX,
): { value: number; snapped: boolean; target: number | null } {
  if (!Number.isFinite(value) || thresholdPx < 0 || targets.length === 0) {
    return { value, snapped: false, target: null };
  }
  let best = value;
  let bestDist = thresholdPx;
  let bestTarget: number | null = null;
  for (const t of targets) {
    if (!Number.isFinite(t)) continue;
    const d = Math.abs(t - value);
    if (d <= bestDist) {
      bestDist = d;
      best = t;
      bestTarget = t;
    }
  }
  return {
    value: best,
    snapped: bestTarget != null,
    target: bestTarget,
  };
}

/**
 * Deduplicate snap targets that are already nearly coincident
 * (aligned boundaries count as one magnet).
 */
export function uniquifySnapTargets(
  targets: readonly number[],
  mergePx: number = 1,
): number[] {
  const sorted = targets.filter((n) => Number.isFinite(n)).slice().sort((a, b) => a - b);
  const out: number[] = [];
  for (const t of sorted) {
    const prev = out[out.length - 1];
    if (prev != null && Math.abs(prev - t) <= mergePx) continue;
    out.push(t);
  }
  return out;
}

export const PANE_SPLIT_ROOT_ATTR = 'data-pane-split-root';
export const PANE_SPLIT_HANDLE_ATTR = 'data-pane-split-handle';
export const PANE_SPLIT_DIR_ATTR = 'data-pane-split-dir';

/**
 * Collect screen-axis coordinates of other split handles + leaf edges
 * that a dragged handle can snap to (same axis only).
 *
 * - `horizontal` direction → vertical separators → snap on X
 * - `vertical` direction → horizontal separators → snap on Y
 *
 * Leaf edges inside `splitParent` are skipped (they move with this drag).
 * Other handles anywhere in the workspace are included (leaf-agnostic).
 */
export function collectBoundarySnapTargetsFromDom(opts: {
  root: ParentNode;
  direction: 'horizontal' | 'vertical';
  excludeHandle: Element;
  /** The flex row/col that owns this handle; leaves inside it are not snap sources. */
  splitParent: Element;
  leafAttr?: string;
}): number[] {
  const {
    root,
    direction,
    excludeHandle,
    splitParent,
    leafAttr = 'data-pane-leaf',
  } = opts;

  const raw: number[] = [];

  root.querySelectorAll(`[${PANE_SPLIT_HANDLE_ATTR}]`).forEach((el) => {
    if (el === excludeHandle) return;
    if (el.getAttribute(PANE_SPLIT_DIR_ATTR) !== direction) return;
    const r = (el as HTMLElement).getBoundingClientRect();
    raw.push(direction === 'horizontal' ? r.left + r.width / 2 : r.top + r.height / 2);
  });

  root.querySelectorAll(`[${leafAttr}]`).forEach((el) => {
    if (splitParent.contains(el)) return;
    const r = (el as HTMLElement).getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) return;
    if (direction === 'horizontal') {
      raw.push(r.left, r.right);
    } else {
      raw.push(r.top, r.bottom);
    }
  });

  return uniquifySnapTargets(raw);
}

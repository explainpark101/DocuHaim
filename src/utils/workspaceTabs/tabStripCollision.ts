import {
  closestCenter,
  pointerWithin,
  type CollisionDetection,
  type UniqueIdentifier,
} from '@dnd-kit/core';
import {
  WORKSPACE_TAB_GROUP_ZONE_ID,
  WORKSPACE_TAB_ORPHAN_ZONE_ID,
} from '@/utils/workspaceTabs/paneLayout';

/** Marker on the workspace tablist for hit-tests (avoid DragOverlay / elementFromPoint). */
export const WORKSPACE_TAB_STRIP_ATTR = 'data-workspace-tab-strip';

function isTabStripZoneId(id: UniqueIdentifier): boolean {
  return id === WORKSPACE_TAB_GROUP_ZONE_ID || id === WORKSPACE_TAB_ORPHAN_ZONE_ID;
}

export type WorkspaceTabStripRole = 'group' | 'orphan' | 'flat';

function stripRoleOf(container: {
  id: UniqueIdentifier;
  data: { current?: unknown };
}): WorkspaceTabStripRole | null {
  if (isTabStripZoneId(container.id)) return null;
  const raw = container.data.current;
  const role =
    raw && typeof raw === 'object' && 'stripRole' in raw
      ? (raw as { stripRole?: unknown }).stripRole
      : undefined;
  return role === 'group' || role === 'orphan' || role === 'flat' ? role : 'flat';
}

/**
 * Tab-strip collision for split + orphan zones.
 *
 * Zone droppables (join group / leave as orphan) are large wrappers; with plain
 * `closestCenter` an orphan reorder near the collapsed split chip often reports
 * the group zone and silently joins the focused leaf. Prefer:
 * 1) pointerWithin hits (tabs over zones) — intentional cross-group join/leave
 * 2) closestCenter among tab sortables with the same stripRole only
 * 3) zone targets only when the pointer is actually inside them
 */
export const workspaceTabStripCollision: CollisionDetection = (args) => {
  const pointerHits = pointerWithin(args);
  if (pointerHits.length > 0) {
    const tabHits = pointerHits.filter((c) => !isTabStripZoneId(c.id));
    if (tabHits.length > 0) return tabHits;
    return pointerHits;
  }

  const activeContainer = args.droppableContainers.find((c) => c.id === args.active.id);
  const activeRole = activeContainer ? stripRoleOf(activeContainer) : 'flat';

  const tabContainers = args.droppableContainers.filter((c) => {
    if (c.id === args.active.id || isTabStripZoneId(c.id)) return false;
    // Same membership only — prevents orphan↔group closestCenter false joins.
    if (activeRole === 'orphan' || activeRole === 'group') {
      return stripRoleOf(c) === activeRole;
    }
    return true;
  });
  if (tabContainers.length > 0) {
    const amongTabs = closestCenter({
      ...args,
      droppableContainers: tabContainers,
    });
    if (amongTabs.length > 0) return amongTabs;
  }

  return [];
};

/** Zone ids that live on the tab strip (not pane geometry). */
export function isWorkspaceTabStripZoneId(id: UniqueIdentifier | null | undefined): boolean {
  if (id == null) return false;
  return isTabStripZoneId(id);
}

/**
 * True when (x,y) lies inside a workspace tab strip.
 * Uses layout rects so DragOverlay / pointer-events do not steal the hit.
 */
export function isPointOnWorkspaceTabStrip(clientX: number, clientY: number): boolean {
  if (typeof document === 'undefined') return false;
  const nodes = document.querySelectorAll<HTMLElement>(`[${WORKSPACE_TAB_STRIP_ATTR}]`);
  for (const node of nodes) {
    const rect = node.getBoundingClientRect();
    if (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    ) {
      return true;
    }
  }
  return false;
}

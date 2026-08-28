import { normalizeUnicodeNfc } from '@/utils/unicodeNfc';
import {
  tauriDropClientPointCandidates,
  type TauriDropPosition,
} from '@/utils/tauriDropClientPoint';

export type TreeDropHitTarget = {
  storageType: string;
  folderPath: string;
};

function readDropTargetFromElement(el: Element | null): TreeDropHitTarget | null {
  let current: Element | null = el;
  while (current) {
    const storageType = current.getAttribute('data-tree-drop-storage');
    if (storageType) {
      const folderPath = normalizeUnicodeNfc(current.getAttribute('data-tree-drop-path') || '');
      return { storageType, folderPath };
    }
    current = current.parentElement;
  }
  return null;
}

/** Resolve tree folder drop target under a Tauri native drag-drop position. */
export function resolveTreeDropTargetFromPoint(
  position: TauriDropPosition,
  scaleFactor = 1,
): TreeDropHitTarget | null {
  if (typeof document === 'undefined') return null;

  for (const { x, y } of tauriDropClientPointCandidates(position, scaleFactor)) {
    const hit = readDropTargetFromElement(document.elementFromPoint(x, y));
    if (hit) return hit;
  }

  return null;
}

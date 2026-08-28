import { normalizeUnicodeNfc } from '@/utils/unicodeNfc';

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

/** Resolve tree folder drop target under a screen point (Tauri native drag-drop). */
export function resolveTreeDropTargetFromPoint(x: number, y: number): TreeDropHitTarget | null {
  if (typeof document === 'undefined') return null;
  const scale = window.devicePixelRatio || 1;
  const logicalX = x / scale;
  const logicalY = y / scale;
  const el = document.elementFromPoint(logicalX, logicalY);
  return readDropTargetFromElement(el);
}

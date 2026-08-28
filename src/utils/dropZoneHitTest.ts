import {
  tauriDropClientPointCandidates,
  type TauriDropPosition,
} from '@/utils/tauriDropClientPoint';

/** True when a Tauri native drag-drop point is inside a DOM drop zone. */
export function isPointInsideDropZone(
  position: TauriDropPosition,
  scaleFactor: number,
  zoneSelector: string,
): boolean {
  if (typeof document === 'undefined') return false;

  for (const { x, y } of tauriDropClientPointCandidates(position, scaleFactor)) {
    const el = document.elementFromPoint(x, y);
    if (el?.closest(zoneSelector)) return true;
  }

  return false;
}

export const SESSION_DROP_ZONE_SELECTOR = '[data-session-drop-zone]';
export const CHAT_FILE_DROP_ZONE_SELECTOR = '[data-chat-file-drop]';
export const SETTINGS_VAULT_DROP_ZONE_SELECTOR = '[data-settings-vault-drop]';

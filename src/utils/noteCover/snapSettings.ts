export const COVER_CENTER_SNAP_STORAGE_KEY = 's3haim_cover_center_snap';

export function loadCoverCenterSnapEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const raw = window.localStorage.getItem(COVER_CENTER_SNAP_STORAGE_KEY);
    if (raw === '0' || raw === 'false') return false;
    if (raw === '1' || raw === 'true') return true;
  } catch {
    /* ignore */
  }
  return true;
}

export function saveCoverCenterSnapEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      COVER_CENTER_SNAP_STORAGE_KEY,
      enabled ? '1' : '0',
    );
  } catch {
    /* ignore */
  }
}

/** Snap moving objects to other objects' edges / center lines. Default off. */
export const COVER_OBJECT_SNAP_STORAGE_KEY = 's3haim_cover_object_snap';

export function loadCoverObjectSnapEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = window.localStorage.getItem(COVER_OBJECT_SNAP_STORAGE_KEY);
    if (raw === '1' || raw === 'true') return true;
    if (raw === '0' || raw === 'false') return false;
  } catch {
    /* ignore */
  }
  return false;
}

export function saveCoverObjectSnapEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      COVER_OBJECT_SNAP_STORAGE_KEY,
      enabled ? '1' : '0',
    );
  } catch {
    /* ignore */
  }
}

/** Show faint red solid outlines on every text element box (edit mode). Default off. */
export const COVER_TEXT_CONTAINER_OUTLINE_KEY = 's3haim_cover_text_container_outline';

export function loadCoverTextContainerOutlineEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = window.localStorage.getItem(COVER_TEXT_CONTAINER_OUTLINE_KEY);
    if (raw === '1' || raw === 'true') return true;
    if (raw === '0' || raw === 'false') return false;
  } catch {
    /* ignore */
  }
  return false;
}

export function saveCoverTextContainerOutlineEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      COVER_TEXT_CONTAINER_OUTLINE_KEY,
      enabled ? '1' : '0',
    );
  } catch {
    /* ignore */
  }
}

/** Show semi-transparent place-mode ghost preview. Default on. */
export const COVER_PLACE_PREVIEW_KEY = 's3haim_cover_place_preview';

export function loadCoverPlacePreviewEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const raw = window.localStorage.getItem(COVER_PLACE_PREVIEW_KEY);
    if (raw === '0' || raw === 'false') return false;
    if (raw === '1' || raw === 'true') return true;
  } catch {
    /* ignore */
  }
  return true;
}

export function saveCoverPlacePreviewEnabled(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(COVER_PLACE_PREVIEW_KEY, enabled ? '1' : '0');
  } catch {
    /* ignore */
  }
}

/**
 * Cover editor preference helpers (snap / outline / place preview).
 * Persistence lives in coverSettingsStore → Haim `.settings/cover.json`.
 */

import {
  COVER_SNAP_TOLERANCE_PX_DEFAULT,
  getCachedCoverSettings,
  patchCoverSettings,
} from '@/utils/coverSettingsStore';

export const COVER_CENTER_SNAP_TOLERANCE_DEFAULT = COVER_SNAP_TOLERANCE_PX_DEFAULT;
export const COVER_OBJECT_SNAP_TOLERANCE_DEFAULT = COVER_SNAP_TOLERANCE_PX_DEFAULT;

/** @deprecated Use coverSettingsStore; kept for import stability. */
export const COVER_CENTER_SNAP_STORAGE_KEY = 's3haim_cover_center_snap';
/** @deprecated */
export const COVER_CENTER_SNAP_TOLERANCE_KEY = 's3haim_cover_center_snap_tolerance_px';
/** @deprecated */
export const COVER_OBJECT_SNAP_STORAGE_KEY = 's3haim_cover_object_snap';
/** @deprecated */
export const COVER_OBJECT_SNAP_TOLERANCE_KEY = 's3haim_cover_object_snap_tolerance_px';
/** @deprecated */
export const COVER_TEXT_CONTAINER_OUTLINE_KEY = 's3haim_cover_text_container_outline';
/** @deprecated */
export const COVER_PLACE_PREVIEW_KEY = 's3haim_cover_place_preview';

export function loadCoverCenterSnapEnabled(): boolean {
  return getCachedCoverSettings().centerSnapEnabled;
}

export function saveCoverCenterSnapEnabled(enabled: boolean): void {
  patchCoverSettings({ centerSnapEnabled: Boolean(enabled) });
}

export function loadCoverCenterSnapTolerance(): number {
  return getCachedCoverSettings().centerSnapTolerancePx;
}

export function saveCoverCenterSnapTolerance(value: number): void {
  patchCoverSettings({ centerSnapTolerancePx: value });
}

export function loadCoverObjectSnapEnabled(): boolean {
  return getCachedCoverSettings().objectSnapEnabled;
}

export function saveCoverObjectSnapEnabled(enabled: boolean): void {
  patchCoverSettings({ objectSnapEnabled: Boolean(enabled) });
}

export function loadCoverObjectSnapTolerance(): number {
  return getCachedCoverSettings().objectSnapTolerancePx;
}

export function saveCoverObjectSnapTolerance(value: number): void {
  patchCoverSettings({ objectSnapTolerancePx: value });
}

export function loadCoverTextContainerOutlineEnabled(): boolean {
  return getCachedCoverSettings().textContainerOutlineEnabled;
}

export function saveCoverTextContainerOutlineEnabled(enabled: boolean): void {
  patchCoverSettings({ textContainerOutlineEnabled: Boolean(enabled) });
}

export function loadCoverPlacePreviewEnabled(): boolean {
  return getCachedCoverSettings().placePreviewEnabled;
}

export function saveCoverPlacePreviewEnabled(enabled: boolean): void {
  patchCoverSettings({ placePreviewEnabled: Boolean(enabled) });
}

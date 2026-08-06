export type {
  CoverAlign,
  CoverBackground,
  CoverBorderStyle,
  CoverElement,
  CoverGroup,
  CoverImageElement,
  CoverLayout,
  CoverShapeElement,
  CoverShapeType,
  CoverTextAlign,
  CoverTextElement,
  CoverTextVAlign,
  NoteCover,
} from '@/utils/noteCover/types';
export {
  NOTE_COVER_VERSION,
  DEFAULT_COVER_BG,
  DEFAULT_COVER_LAYOUT,
  coverElementLabel,
  createCoverImageElement,
  createCoverShapeElement,
  createCoverTextElement,
  createDefaultNoteCover,
  isCoverShapeElement,
  isCoverShapeType,
} from '@/utils/noteCover/types';
export {
  escapeCoverJsonForComment,
  findNoteCoverCommentRange,
  formatNoteCoverIssues,
  getNoteCoverCommentRaw,
  normalizeNoteCover,
  normalizeNoteCoverWithIssues,
  noteCoverCommentChanged,
  parseNoteCover,
  revertNoteCoverComment,
  serializeNoteCoverComment,
  stripNoteCoverComment,
  unescapeCoverJsonFromComment,
  upsertNoteCoverComment,
} from '@/utils/noteCover/parse';
export type {
  NoteCoverIssue,
  NoteCoverIssueKind,
  NormalizeNoteCoverResult,
  ParseNoteCoverResult,
} from '@/utils/noteCover/parse';
export {
  COVER_CENTER_SNAP_THRESHOLD_PCT,
  frameLocalToPage,
  getCoverFrameRect,
  nextPastePlacement,
  pageToFrameLocal,
  restackElementsByGap,
  gapPxToFramePct,
  snapElementToFrameCenter,
  updateElementAlignFrame,
  withCoverLayout,
} from '@/utils/noteCover/layout';
export type { CoverCenterSnapResult, CoverFrameRect } from '@/utils/noteCover/layout';
export {
  COVER_CENTER_SNAP_STORAGE_KEY,
  COVER_OBJECT_SNAP_STORAGE_KEY,
  COVER_PLACE_PREVIEW_KEY,
  COVER_TEXT_CONTAINER_OUTLINE_KEY,
  COVER_CENTER_SNAP_TOLERANCE_DEFAULT,
  COVER_OBJECT_SNAP_TOLERANCE_DEFAULT,
  loadCoverCenterSnapEnabled,
  loadCoverObjectSnapEnabled,
  loadCoverPlacePreviewEnabled,
  loadCoverTextContainerOutlineEnabled,
  loadCoverCenterSnapTolerance,
  loadCoverObjectSnapTolerance,
  saveCoverCenterSnapEnabled,
  saveCoverObjectSnapEnabled,
  saveCoverPlacePreviewEnabled,
  saveCoverTextContainerOutlineEnabled,
  saveCoverCenterSnapTolerance,
  saveCoverObjectSnapTolerance,
} from '@/utils/noteCover/snapSettings';
export {
  collectObjectSnapTargets,
  snapBoundsToObjects,
} from '@/utils/noteCover/objectSnap';
export type {
  CoverObjectSnapResult,
  CoverSnapBounds,
} from '@/utils/noteCover/objectSnap';
export {
  bringSelectionToFront,
  buildLayerRowsFrontFirst,
  createEmptyGroup,
  deleteElements,
  elementsIntersectingRect,
  expandIdsToGroups,
  getElementsByIds,
  getElementGroupChain,
  getSelectionBounds,
  groupSelectedElements,
  moveElementsByDelta,
  moveLayerZ,
  normalizePctRect,
  registerNewElement,
  renameElement,
  renameGroup,
  resolveCoverDrillSelection,
  resolveCoverPointerSelection,
  sendSelectionToBack,
  selectionMatchesGroupMembers,
  sharedGroupIdForSelection,
  duplicateElements,
  ungroupElements,
  isElementEffectivelyLocked,
  isGroupEffectivelyLocked,
  isLayerDirectlyLocked,
  setLayerLocked,
  toggleLayerLocked,
  filterUnlockedElementIds,
  layerIdsIncludeLocked,
  nudgeCoverFontSizes,
  setCoverTextAlign,
} from '@/utils/noteCover/layers';
export type { CoverLayerRow } from '@/utils/noteCover/layers';
export {
  appendLayersToRoot,
  collectDescendantElementIds,
  deleteLayers,
  ensureLayerTree,
  flattenLayerTree,
  getChildIds,
  getGroup,
  isGroupId,
  moveLayerRelative,
  moveLayerToRoot,
  bringLayersToFront,
  sendLayersToBack,
  selectionToLayerIds,
  ungroupLayer,
} from '@/utils/noteCover/layerTree';
export type { FlatLayerItem, LayerParentId } from '@/utils/noteCover/layerTree';
export {
  alignCoverElements,
  alignCoverUnits,
  canAlignCoverSelection,
  resolveGroupInternalAlignUnits,
  resolveSelectionAlignUnits,
} from '@/utils/noteCover/align';
export type { CoverAlignUnit, CoverObjectAlign } from '@/utils/noteCover/align';
export {
  coverPlaceKind,
  type CoverPlaceMode,
} from '@/utils/noteCover/placeMode';
export {
  coverImageBoxSizeForAspect,
  resizeCoverImageBox,
  restoreCoverImageNaturalAspect,
  withCoverImageNaturalMetrics,
} from '@/utils/noteCover/imageAspect';
export type { CoverResizeHandle } from '@/utils/noteCover/imageAspect';
export {
  coverShapeShellStyle,
  coverShapeTextBoxStyle,
  coverShapeTextContentStyle,
  coverShapeTextStyle,
} from '@/utils/noteCover/shapeStyle';

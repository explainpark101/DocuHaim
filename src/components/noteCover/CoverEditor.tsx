import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { createPortal } from 'react-dom';
import { ContextMenu } from 'radix-ui';
import { Crop, Lock, LockOpen, Ratio, RotateCcw } from 'lucide-react';
import CoverSlide from '@/components/noteCover/CoverSlide';
import Modal from '@/components/modals/Modal';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import NoteImageCropPanel from '@/components/modals/NoteImageCropPanel';
import { useCoverImageUrl } from '@/hooks/useCoverImageUrl';
import {
  collectDescendantElementIds,
  collectObjectSnapTargets,
  COVER_CENTER_SNAP_TOLERANCE_DEFAULT,
  COVER_OBJECT_SNAP_TOLERANCE_DEFAULT,
  createCoverImageElement,
  createCoverShapeElement,
  createCoverTextElement,
  coverImageBoxSizeForAspect,
  coverShapeShellStyle,
  coverShapeTextBoxStyle,
  coverShapeTextContentStyle,
  deleteElements,
  duplicateElements,
  elementsIntersectingRect,
  expandIdsToGroups,
  filterUnlockedElementIds,
  getElementsByIds,
  getGroup,
  getSelectionBounds,
  groupSelectedElements,
  isCoverShapeElement,
  isElementEffectivelyLocked,
  isGroupId,
  isLayerDirectlyLocked,
  layerIdsIncludeLocked,
  moveElementsByDelta,
  nextPastePlacement,
  normalizePctRect,
  nudgeCoverFontSizes,
  registerNewElement,
  resizeCoverImageBox,
  resolveCoverDrillSelection,
  resolveCoverPointerSelection,
  restoreCoverImageNaturalAspect,
  selectionToLayerIds,
  setLayerLocked,
  sharedGroupIdForSelection,
  snapBoundsToObjects,
  ungroupElements,
  withCoverImageNaturalMetrics,
  type CoverPlaceMode,
} from '@/utils/noteCover';
import type {
  CoverElement,
  CoverImageElement,
  CoverShapeElement,
  CoverShapeType,
  CoverTextElement,
  NoteCover,
} from '@/utils/noteCover/types';
import { CoverShapeBody } from '@/components/noteCover/CoverSlide';
import { extractImageFilesFromClipboard } from '@/utils/llmAssistImages';
import {
  convertSvgToPngFile,
  extractSvgMarkupFromClipboard,
  isSvgImageFile,
  looksLikeSvgMarkup,
} from '@/utils/svgToPng';
import { uploadPrintEditorImage } from '@/utils/printEditorImageUpload';
import { resolveWikiImageUrl } from '@/utils/wikiImageResolver';
import { getChromeDevToolsNumberStep } from '@/utils/scrubNumberStep';
import {
  chatMenuContentClass,
  chatMenuItemClass,
} from '@/components/chatWithMyself/ui/chatUiStyles';

type GetPresignedUrl = ((path: string) => Promise<string | null>) | null | undefined;

type PrintFile = {
  type?: string | null;
  id?: string | null;
};

type HandleId = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

const HANDLES: { id: HandleId; className: string }[] = [
  { id: 'n', className: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ns-resize' },
  { id: 's', className: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-ns-resize' },
  { id: 'e', className: 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2 cursor-ew-resize' },
  { id: 'w', className: 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize' },
  { id: 'ne', className: 'right-0 top-0 translate-x-1/2 -translate-y-1/2 cursor-nesw-resize' },
  { id: 'nw', className: 'left-0 top-0 -translate-x-1/2 -translate-y-1/2 cursor-nwse-resize' },
  { id: 'se', className: 'right-0 bottom-0 translate-x-1/2 translate-y-1/2 cursor-nwse-resize' },
  { id: 'sw', className: 'left-0 bottom-0 -translate-x-1/2 translate-y-1/2 cursor-nesw-resize' },
];

const MIN_SIZE = 2;

type CoverEditorProps = {
  cover: NoteCover;
  selectedIds: string[];
  onSelectIds: (ids: string[]) => void;
  onChange: (next: NoteCover) => void;
  getPresignedUrl?: GetPresignedUrl;
  currentFile?: PrintFile | null;
  centerSnapEnabled?: boolean;
  /** Pixel distance for page-center snap. */
  centerSnapTolerance?: number;
  /** Snap to other objects' edges and center lines while dragging. */
  objectSnapEnabled?: boolean;
  /** Pixel distance for object edge/center snap. */
  objectSnapTolerance?: number;
  /** Faint red solid outline on every text element box. */
  textContainerOutlineEnabled?: boolean;
  /** Semi-transparent ghost while placing text/image. */
  placePreviewEnabled?: boolean;
  /** Armed insert tool: click canvas to place. */
  placeMode?: CoverPlaceMode;
  onPlaceModeChange?: (mode: CoverPlaceMode) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  className?: string;
};

type DragState =
  | {
      kind: 'move';
      ids: string[];
      startX: number;
      startY: number;
      /** Snapshot of cover.elements at drag start. */
      origElements: CoverElement[];
      frameW: number;
      frameH: number;
      /** Duplicate once the pointer moves past a small threshold (Alt / Cmd-drag). */
      pendingDuplicate?: boolean;
    }
  | {
      kind: 'resize';
      id: string;
      handle: HandleId;
      startX: number;
      startY: number;
      orig: CoverElement;
      frameW: number;
      frameH: number;
    }
  | {
      kind: 'marquee';
      startXPct: number;
      startYPct: number;
      curXPct: number;
      curYPct: number;
      additive: boolean;
      frameW: number;
      frameH: number;
      originClientX: number;
      originClientY: number;
    };

const MOVE_DUPLICATE_THRESHOLD_PX = 3;
const ARROW_NUDGE_BASE_PX = 10;
const ARROW_NUDGE_REPEAT_DELAY_MS = 500;

const ARROW_KEYS = new Set(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']);

function isArrowKey(key: string): boolean {
  return ARROW_KEYS.has(key);
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function applyResize(
  orig: CoverElement,
  handle: HandleId,
  dxPct: number,
  dyPct: number,
): CoverElement {
  let { x, y, w, h } = orig;
  if (handle.includes('e')) w = clamp(orig.w + dxPct, MIN_SIZE, 100 - orig.x);
  if (handle.includes('s')) h = clamp(orig.h + dyPct, MIN_SIZE, 100 - orig.y);
  if (handle.includes('w')) {
    const nextW = clamp(orig.w - dxPct, MIN_SIZE, orig.x + orig.w);
    const delta = orig.w - nextW;
    x = clamp(orig.x + delta, 0, 100 - nextW);
    w = nextW;
  }
  if (handle.includes('n')) {
    const nextH = clamp(orig.h - dyPct, MIN_SIZE, orig.y + orig.h);
    const delta = orig.h - nextH;
    y = clamp(orig.y + delta, 0, 100 - nextH);
    h = nextH;
  }
  return { ...orig, x, y, w, h };
}

function updateElement(cover: NoteCover, id: string, next: CoverElement): NoteCover {
  return {
    ...cover,
    elements: cover.elements.map((el) => (el.id === id ? next : el)),
  };
}

function isEditablePasteTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(target.closest('textarea, input, [contenteditable="true"]'));
}

function EditorImage({
  el,
  getPresignedUrl,
  onNaturalReady,
}: {
  el: CoverImageElement;
  getPresignedUrl?: GetPresignedUrl;
  onNaturalReady?: (naturalAspect: number) => void;
}) {
  const url = useCoverImageUrl(el.path, getPresignedUrl);
  if (!url) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-[10px] text-neutral-400">
        이미지
      </div>
    );
  }
  return (
    <img
      src={url}
      alt=""
      className="pointer-events-none h-full w-full object-fill"
      draggable={false}
      onLoad={(e) => {
        const img = e.currentTarget;
        if (img.naturalWidth > 0 && img.naturalHeight > 0) {
          onNaturalReady?.(img.naturalWidth / img.naturalHeight);
        }
      }}
    />
  );
}

function EditorText({ el }: { el: CoverTextElement }) {
  return (
    <div
      className="h-full w-full overflow-hidden whitespace-pre-wrap break-words"
      style={{
        color: el.color,
        fontSize: `${el.fontSize}px`,
        fontWeight: el.fontWeight,
        textAlign: el.textAlign,
        fontFamily: el.fontFamily || undefined,
        lineHeight: 1.25,
      }}
    >
      {el.text}
    </div>
  );
}

function EditorShape({
  el,
  isEditing,
  onTextChange,
  onBlur,
}: {
  el: CoverShapeElement;
  isEditing: boolean;
  onTextChange: (text: string) => void;
  onBlur: () => void;
}) {
  if (!isEditing) return <CoverShapeBody el={el} />;
  return (
    <div className="h-full w-full" style={coverShapeShellStyle(el)} data-cover-shape={el.type}>
      <div style={coverShapeTextBoxStyle(el)}>
        <textarea
          className="min-h-[1.25em] w-full"
          style={coverShapeTextContentStyle(el)}
          value={el.text ?? ''}
          rows={Math.max(1, (el.text ?? '').split(/\r?\n/).length)}
          autoFocus
          onChange={(e) => onTextChange(e.target.value)}
          onBlur={onBlur}
          onPointerDown={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}

const DEFAULT_SHAPE_BOX = { w: 40, h: 25 };

export default function CoverEditor({
  cover,
  selectedIds,
  onSelectIds,
  onChange,
  getPresignedUrl,
  currentFile = null,
  centerSnapEnabled = true,
  centerSnapTolerance = COVER_CENTER_SNAP_TOLERANCE_DEFAULT,
  objectSnapEnabled = false,
  objectSnapTolerance = COVER_OBJECT_SNAP_TOLERANCE_DEFAULT,
  textContainerOutlineEnabled = false,
  placePreviewEnabled = true,
  placeMode = null,
  onPlaceModeChange,
  onUndo,
  onRedo,
  className = '',
}: CoverEditorProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [placeTipPos, setPlaceTipPos] = useState<{ x: number; y: number } | null>(null);
  const [placeGhost, setPlaceGhost] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  } | null>(null);
  const [placeImagePreviewUrl, setPlaceImagePreviewUrl] = useState<string | null>(null);
  const [placeImageAspect, setPlaceImageAspect] = useState<number | null>(null);
  const [snapGuides, setSnapGuides] = useState<{ v: number[]; h: number[] }>({
    v: [],
    h: [],
  });
  const [marqueeRect, setMarqueeRect] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  } | null>(null);
  const [cropTarget, setCropTarget] = useState<{
    id: string;
    path: string;
    imageSrc: string;
  } | null>(null);
  /** 0 = closed; 1 = first confirm; 2 = second confirm (locked only). */
  const [deleteConfirmStep, setDeleteConfirmStep] = useState<0 | 1 | 2>(0);
  const [deleteConfirmDouble, setDeleteConfirmDouble] = useState(false);
  const deleteConfirmOpenRef = useRef(false);
  const deleteConfirmAwaitingSecondRef = useRef(false);
  const deleteConfirmSecondTimerRef = useRef<number | null>(null);
  deleteConfirmOpenRef.current =
    deleteConfirmStep > 0 || deleteConfirmAwaitingSecondRef.current;

  const clearDeleteConfirmSecondTimer = () => {
    if (deleteConfirmSecondTimerRef.current != null) {
      window.clearTimeout(deleteConfirmSecondTimerRef.current);
      deleteConfirmSecondTimerRef.current = null;
    }
  };

  const resetDeleteConfirm = () => {
    clearDeleteConfirmSecondTimer();
    deleteConfirmAwaitingSecondRef.current = false;
    setDeleteConfirmStep(0);
    setDeleteConfirmDouble(false);
  };

  const advanceLockedDeleteConfirm = () => {
    // Close briefly so a double-click cannot skip the second ask.
    deleteConfirmAwaitingSecondRef.current = true;
    setDeleteConfirmStep(0);
    clearDeleteConfirmSecondTimer();
    deleteConfirmSecondTimerRef.current = window.setTimeout(() => {
      deleteConfirmSecondTimerRef.current = null;
      deleteConfirmAwaitingSecondRef.current = false;
      setDeleteConfirmStep(2);
    }, 220);
  };

  useEffect(() => () => clearDeleteConfirmSecondTimer(), []);

  const dragRef = useRef<DragState | null>(null);
  const coverRef = useRef(cover);
  const selectedIdsRef = useRef(selectedIds);
  const placeModeRef = useRef(placeMode);
  const centerSnapEnabledRef = useRef(centerSnapEnabled);
  const centerSnapToleranceRef = useRef(centerSnapTolerance);
  const objectSnapEnabledRef = useRef(objectSnapEnabled);
  const objectSnapToleranceRef = useRef(objectSnapTolerance);
  const pastingRef = useRef(false);
  coverRef.current = cover;
  selectedIdsRef.current = selectedIds;
  placeModeRef.current = placeMode;
  centerSnapEnabledRef.current = centerSnapEnabled;
  centerSnapToleranceRef.current = centerSnapTolerance;
  objectSnapEnabledRef.current = objectSnapEnabled;
  objectSnapToleranceRef.current = objectSnapTolerance;

  const findEl = useCallback((id: string) => {
    return coverRef.current.elements.find((el) => el.id === id) ?? null;
  }, []);

  const onPointerMove = useCallback(
    (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;

      if (drag.kind === 'marquee') {
        const dxPct = ((event.clientX - drag.originClientX) / drag.frameW) * 100;
        const dyPct = ((event.clientY - drag.originClientY) / drag.frameH) * 100;
        const curXPct = clamp(drag.startXPct + dxPct, 0, 100);
        const curYPct = clamp(drag.startYPct + dyPct, 0, 100);
        dragRef.current = { ...drag, curXPct, curYPct };
        setMarqueeRect(
          normalizePctRect({
            x: drag.startXPct,
            y: drag.startYPct,
            w: curXPct - drag.startXPct,
            h: curYPct - drag.startYPct,
          }),
        );
        return;
      }

      const dxPct = ((event.clientX - drag.startX) / drag.frameW) * 100;
      const dyPct = ((event.clientY - drag.startY) / drag.frameH) * 100;

      if (drag.kind === 'move') {
        if (drag.pendingDuplicate) {
          const dist = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY);
          if (dist >= MOVE_DUPLICATE_THRESHOLD_PX) {
            const result = duplicateElements(coverRef.current, drag.ids);
            onChange(result.cover);
            onSelectIds(result.newIds);
            drag.ids = result.newIds;
            drag.origElements = result.cover.elements.map((el) => ({ ...el }));
            drag.pendingDuplicate = false;
          } else {
            return;
          }
        }

        let moveDx = dxPct;
        let moveDy = dyPct;
        // Shift: lock to dominant axis (horizontal XOR vertical).
        if (event.shiftKey) {
          if (Math.abs(moveDx) >= Math.abs(moveDy)) moveDy = 0;
          else moveDx = 0;
        }

        const base: NoteCover = {
          ...coverRef.current,
          elements: drag.origElements.map((el) => ({ ...el })),
        };
        let next = moveElementsByDelta(base, drag.ids, moveDx, moveDy);

        const centerOn = centerSnapEnabledRef.current;
        const objectOn = objectSnapEnabledRef.current;
        if ((centerOn || objectOn) && !event.shiftKey) {
          const moved = next.elements.filter((el) => drag.ids.includes(el.id));
          const bounds = getSelectionBounds(moved);
          if (bounds) {
            const peers = objectOn
              ? collectObjectSnapTargets(next, drag.ids)
              : [];
            const snapped = snapBoundsToObjects(bounds, peers, {
              objectSnapEnabled: objectOn,
              frameCenterSnapEnabled: centerOn,
              objectThresholdPx: objectSnapToleranceRef.current,
              frameCenterThresholdPx: centerSnapToleranceRef.current,
              frameWidthPx: drag.frameW,
              frameHeightPx: drag.frameH,
            });
            const adjustX = snapped.x - bounds.x;
            const adjustY = snapped.y - bounds.y;
            if (adjustX !== 0 || adjustY !== 0) {
              next = moveElementsByDelta(next, drag.ids, adjustX, adjustY);
            }
            setSnapGuides({
              v: snapped.verticalGuides,
              h: snapped.horizontalGuides,
            });
          }
        } else {
          setSnapGuides({ v: [], h: [] });
        }

        onChange(next);
        return;
      }

      setSnapGuides({ v: [], h: [] });
      const orig = drag.orig;
      if (orig.type === 'image') {
        onChange(
          updateElement(
            coverRef.current,
            drag.id,
            resizeCoverImageBox(
              orig,
              drag.handle,
              dxPct,
              dyPct,
              drag.frameW,
              drag.frameH,
              { lockToCurrentAspect: event.shiftKey },
            ),
          ),
        );
        return;
      }
      onChange(
        updateElement(
          coverRef.current,
          drag.id,
          applyResize(orig, drag.handle, dxPct, dyPct),
        ),
      );
    },
    [onChange, onSelectIds],
  );

  const endDrag = useCallback(() => {
    const drag = dragRef.current;
    if (drag?.kind === 'marquee') {
      const box = normalizePctRect({
        x: drag.startXPct,
        y: drag.startYPct,
        w: drag.curXPct - drag.startXPct,
        h: drag.curYPct - drag.startYPct,
      });
      const hit = elementsIntersectingRect(coverRef.current.elements, box);
      const expanded = expandIdsToGroups(coverRef.current, hit);
      if (drag.additive && expanded.length) {
        const next = new Set(selectedIdsRef.current);
        expanded.forEach((id) => next.add(id));
        onSelectIds([...next]);
      } else {
        onSelectIds(expanded);
      }
      setMarqueeRect(null);
    }
    dragRef.current = null;
    setSnapGuides({ v: [], h: [] });
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', endDrag);
    window.removeEventListener('pointercancel', endDrag);
  }, [onPointerMove, onSelectIds]);

  useEffect(() => () => endDrag(), [endDrag]);

  const clientToFramePct = (clientX: number, clientY: number, frame: DOMRect) => {
    return {
      xPct: clamp(((clientX - frame.left) / frame.width) * 100, 0, 100),
      yPct: clamp(((clientY - frame.top) / frame.height) * 100, 0, 100),
    };
  };

  const boxAtTopLeft = (xPct: number, yPct: number, w: number, h: number) => ({
    x: clamp(xPct, 0, Math.max(0, 100 - w)),
    y: clamp(yPct, 0, Math.max(0, 100 - h)),
    w,
    h,
  });

  const placeTextBoxSize = useCallback((frameW: number, frameH: number) => {
    const fontSize = 36;
    const fw = frameW > 1 ? frameW : 800;
    const fh = frameH > 1 ? frameH : 1100;
    return {
      w: clamp(((fontSize * 0.65 * 5) / fw) * 100, 6, 40),
      h: clamp(((fontSize * 1.4) / fh) * 100, 3, 20),
      fontSize,
    };
  }, []);

  const placeImageBoxSize = useCallback(
    (frameW: number, frameH: number, aspect: number | null) => {
      if (aspect && aspect > 0 && frameW > 1 && frameH > 1) {
        return coverImageBoxSizeForAspect(aspect, frameW, frameH, 50);
      }
      return { w: 50, h: 35 };
    },
    [],
  );

  const placeTextAt = useCallback(
    (
      xPct: number,
      yPct: number,
      options?: {
        text?: string;
        fontSize?: number;
        fontWeight?: CoverTextElement['fontWeight'];
        clearPlaceMode?: boolean;
      },
    ) => {
      const frame = frameRef.current?.getBoundingClientRect();
      const fw = frame?.width ?? 0;
      const fh = frame?.height ?? 0;
      const text = options?.text ?? '제목';
      const fontSize = options?.fontSize ?? 36;
      const lines = Math.max(1, text.split(/\r?\n/).length);
      let w: number;
      let h: number;
      if (options?.text != null) {
        const approxChars = Math.min(40, Math.max(5, text.split(/\r?\n/)[0]?.length || 5));
        w = clamp(((fontSize * 0.65 * approxChars) / Math.max(1, fw || 800)) * 100, 8, 80);
        h = clamp(((fontSize * 1.35 * lines) / Math.max(1, fh || 1100)) * 100, 4, 40);
      } else {
        const size = placeTextBoxSize(fw, fh);
        w = size.w;
        h = size.h;
      }
      const box = boxAtTopLeft(xPct, yPct, w, h);
      const el = createCoverTextElement({
        ...box,
        text,
        textAlign: 'left',
        fontSize,
        ...(options?.fontWeight != null ? { fontWeight: options.fontWeight } : {}),
      });
      onChange(registerNewElement(coverRef.current, el));
      onSelectIds([el.id]);
      if (options?.clearPlaceMode !== false) onPlaceModeChange?.(null);
    },
    [onChange, onPlaceModeChange, onSelectIds, placeTextBoxSize],
  );

  const placeImageAt = useCallback(
    async (file: File, xPct: number, yPct: number) => {
      try {
        const path = await uploadPrintEditorImage(file, currentFile);
        const frame = frameRef.current?.getBoundingClientRect();
        const size = placeImageBoxSize(
          frame?.width ?? 0,
          frame?.height ?? 0,
          placeImageAspect,
        );
        let el = createCoverImageElement(path, boxAtTopLeft(xPct, yPct, size.w, size.h));
        if (frame && frame.width > 1 && frame.height > 1) {
          const url = URL.createObjectURL(file);
          try {
            const naturalAspect = await new Promise<number | null>((resolve) => {
              const img = new Image();
              img.onload = () => {
                const nw = img.naturalWidth || 0;
                const nh = img.naturalHeight || 0;
                resolve(nw > 0 && nh > 0 ? nw / nh : null);
              };
              img.onerror = () => resolve(null);
              img.src = url;
            });
            if (naturalAspect && naturalAspect > 0) {
              el = withCoverImageNaturalMetrics(el, naturalAspect, frame.width, frame.height, true);
              el = {
                ...el,
                x: clamp(xPct, 0, Math.max(0, 100 - el.w)),
                y: clamp(yPct, 0, Math.max(0, 100 - el.h)),
              };
            }
          } finally {
            URL.revokeObjectURL(url);
          }
        }
        onChange(registerNewElement(coverRef.current, el));
        onSelectIds([el.id]);
      } catch (err) {
        console.error(err);
        window.alert(err instanceof Error ? err.message : '이미지 업로드에 실패했습니다.');
      }
    },
    [currentFile, onChange, onSelectIds, placeImageAspect, placeImageBoxSize],
  );

  const placeShapeAt = useCallback(
    (shapeType: CoverShapeType, xPct: number, yPct: number) => {
      const box = boxAtTopLeft(xPct, yPct, DEFAULT_SHAPE_BOX.w, DEFAULT_SHAPE_BOX.h);
      const el = createCoverShapeElement(shapeType, {
        ...box,
        text: '',
        textAlign: 'center',
        textVAlign: 'middle',
        fontSize: 24,
        color: '#0c4a6e',
        fontWeight: 'bold',
        paddingPct: 2,
      });
      onChange(registerNewElement(coverRef.current, el));
      onSelectIds([el.id]);
      onPlaceModeChange?.(null);
    },
    [onChange, onPlaceModeChange, onSelectIds],
  );

  useEffect(() => {
    if (placeMode?.kind !== 'image' || !placeMode.files[0]) {
      setPlaceImageAspect(null);
      setPlaceImagePreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
      return undefined;
    }
    const file = placeMode.files[0];
    let cancelled = false;
    const url = URL.createObjectURL(file);
    setPlaceImagePreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      const nw = img.naturalWidth || 0;
      const nh = img.naturalHeight || 0;
      setPlaceImageAspect(nw > 0 && nh > 0 ? nw / nh : null);
    };
    img.onerror = () => {
      if (!cancelled) setPlaceImageAspect(null);
    };
    img.src = url;
    return () => {
      cancelled = true;
    };
  }, [placeMode]);

  useEffect(() => {
    if (!placePreviewEnabled) setPlaceGhost(null);
  }, [placePreviewEnabled]);

  useEffect(() => {
    if (!placeMode) {
      setPlaceTipPos(null);
      setPlaceGhost(null);
      return undefined;
    }
    const onMove = (event: PointerEvent) => {
      setPlaceTipPos({ x: event.clientX, y: event.clientY });
      if (!placePreviewEnabled) {
        setPlaceGhost(null);
        return;
      }
      const frame = frameRef.current?.getBoundingClientRect();
      if (!frame || frame.width < 1 || frame.height < 1) {
        setPlaceGhost(null);
        return;
      }
      const { xPct, yPct } = clientToFramePct(event.clientX, event.clientY, frame);
      if (placeMode.kind === 'text') {
        const size = placeTextBoxSize(frame.width, frame.height);
        setPlaceGhost(boxAtTopLeft(xPct, yPct, size.w, size.h));
        return;
      }
      if (placeMode.kind === 'shape') {
        setPlaceGhost(
          boxAtTopLeft(xPct, yPct, DEFAULT_SHAPE_BOX.w, DEFAULT_SHAPE_BOX.h),
        );
        return;
      }
      const size = placeImageBoxSize(frame.width, frame.height, placeImageAspect);
      setPlaceGhost(boxAtTopLeft(xPct, yPct, size.w, size.h));
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [
    placeMode,
    placePreviewEnabled,
    placeImageAspect,
    placeImageBoxSize,
    placeTextBoxSize,
  ]);

  const beginMarquee = (event: ReactPointerEvent) => {
    if (event.button !== 0) return;
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;
    event.preventDefault();
    setEditingTextId(null);
    // Ctrl/Cmd: additive marquee. Shift is reserved for move axis-lock.
    const additive = event.metaKey || event.ctrlKey;
    if (!additive) onSelectIds([]);
    const { xPct, yPct } = clientToFramePct(event.clientX, event.clientY, rect);
    dragRef.current = {
      kind: 'marquee',
      startXPct: xPct,
      startYPct: yPct,
      curXPct: xPct,
      curYPct: yPct,
      additive,
      frameW: rect.width,
      frameH: rect.height,
      originClientX: event.clientX,
      originClientY: event.clientY,
    };
    setMarqueeRect({ x: xPct, y: yPct, w: 0, h: 0 });
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);
  };

  const beginPlaceOrMarquee = (event: ReactPointerEvent) => {
    if (event.button !== 0) return;
    if (placeMode) {
      const frame = frameRef.current;
      if (!frame) return;
      const rect = frame.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      event.preventDefault();
      event.stopPropagation();
      const { xPct, yPct } = clientToFramePct(event.clientX, event.clientY, rect);
      if (placeMode.kind === 'text') {
        placeTextAt(xPct, yPct);
        return;
      }
      if (placeMode.kind === 'shape') {
        placeShapeAt(placeMode.shapeType, xPct, yPct);
        return;
      }
      const [file, ...rest] = placeMode.files;
      if (!file) {
        onPlaceModeChange?.(null);
        return;
      }
      void (async () => {
        await placeImageAt(file, xPct, yPct);
        onPlaceModeChange?.(rest.length ? { kind: 'image', files: rest } : null);
      })();
      return;
    }
    beginMarquee(event);
  };

  const beginMove = (id: string, event: ReactPointerEvent) => {
    if (event.button !== 0) return;
    const frame = frameRef.current;
    const el = findEl(id);
    if (!frame || !el) return;
    const rect = frame.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;
    event.preventDefault();
    event.stopPropagation();

    // Alt or Cmd/Ctrl+drag on an already-selected target: duplicate after drag starts.
    // Cmd/Ctrl click: additive multi-select (toggle), except sole selected target stays selected.
    // Shift: axis-lock while moving (not used for multi-select).
    const modKey = event.metaKey || event.ctrlKey;
    const altKey = event.altKey;
    const additive = modKey && !altKey;
    const targetIds = additive
      ? expandIdsToGroups(coverRef.current, [id], 'root')
      : resolveCoverPointerSelection(coverRef.current, id, selectedIdsRef.current);
    const selected = selectedIdsRef.current;
    const targetFullySelected =
      targetIds.length > 0 && targetIds.every((tid) => selected.includes(tid));
    const selectionIsExactTarget =
      targetFullySelected
      && selected.length === targetIds.length
      && targetIds.every((tid) => selected.includes(tid));

    let ids = selected;
    if (additive) {
      if (targetFullySelected) {
        if (selectionIsExactTarget) {
          // Sole selected: keep selection so Cmd-drag can copy.
          ids = targetIds;
        } else {
          const remove = new Set(targetIds);
          ids = selected.filter((x) => !remove.has(x));
          onSelectIds(ids);
          return;
        }
      } else {
        ids = [...new Set([...selected, ...targetIds])];
        onSelectIds(ids);
      }
    } else if (!targetFullySelected) {
      ids = targetIds;
      onSelectIds(ids);
    } else {
      // Already selected (root or drilled subgroup) — keep for move / further drill.
      ids = selected;
    }

    const movableIds = filterUnlockedElementIds(coverRef.current, ids);
    if (!movableIds.length) return;

    const pendingDuplicate = altKey || (modKey && targetFullySelected);

    dragRef.current = {
      kind: 'move',
      ids: movableIds,
      startX: event.clientX,
      startY: event.clientY,
      origElements: coverRef.current.elements.map((e) => ({ ...e })),
      frameW: rect.width,
      frameH: rect.height,
      ...(pendingDuplicate ? { pendingDuplicate: true } : {}),
    };
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);
  };

  const beginResize = (id: string, event: ReactPointerEvent, handle: HandleId) => {
    const frame = frameRef.current;
    const el = findEl(id);
    if (!frame || !el) return;
    if (isElementEffectivelyLocked(coverRef.current, el)) return;
    const rect = frame.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;
    event.preventDefault();
    event.stopPropagation();
    onSelectIds([id]);
    dragRef.current = {
      kind: 'resize',
      id,
      handle,
      startX: event.clientX,
      startY: event.clientY,
      orig: { ...el },
      frameW: rect.width,
      frameH: rect.height,
    };
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);
  };

  const handleImageNaturalReady = useCallback(
    (id: string, naturalAspect: number) => {
      const current = coverRef.current.elements.find((e) => e.id === id);
      if (!current || current.type !== 'image') return;
      const needsAspect = !(current.naturalAspect && current.naturalAspect > 0);
      const needsFit = needsAspect;
      if (!needsAspect && !needsFit) return;
      const frame = frameRef.current?.getBoundingClientRect();
      const fw = frame?.width ?? 1;
      const fh = frame?.height ?? 1;
      const next = withCoverImageNaturalMetrics(
        current,
        naturalAspect,
        fw,
        fh,
        needsFit,
      );
      if (
        next.naturalAspect === current.naturalAspect &&
        next.w === current.w &&
        next.h === current.h &&
        next.x === current.x &&
        next.y === current.y
      ) {
        return;
      }
      onChange(updateElement(coverRef.current, id, next));
    },
    [onChange],
  );

  const toggleImageLockAspect = useCallback(
    (id: string) => {
      const el = coverRef.current.elements.find((e) => e.id === id);
      if (!el || el.type !== 'image') return;
      const next: CoverImageElement = { ...el };
      if (el.lockAspect) delete next.lockAspect;
      else next.lockAspect = true;
      onChange(updateElement(coverRef.current, id, next));
    },
    [onChange],
  );

  const restoreImageAspect = useCallback(
    (id: string) => {
      const el = coverRef.current.elements.find((e) => e.id === id);
      if (!el || el.type !== 'image') return;
      const frame = frameRef.current?.getBoundingClientRect();
      if (!frame || frame.width < 1 || frame.height < 1) return;
      onChange(
        updateElement(
          coverRef.current,
          id,
          restoreCoverImageNaturalAspect(el, frame.width, frame.height),
        ),
      );
    },
    [onChange],
  );

  const openImageCrop = useCallback(
    async (el: CoverImageElement) => {
      onSelectIds([el.id]);
      if (typeof getPresignedUrl !== 'function') {
        window.alert('이미지를 불러올 수 없습니다.');
        return;
      }
      try {
        const imageSrc = (await resolveWikiImageUrl(el.path, getPresignedUrl)) || '';
        if (!imageSrc) {
          window.alert('이미지를 불러올 수 없습니다.');
          return;
        }
        setCropTarget({ id: el.id, path: el.path, imageSrc });
      } catch (err) {
        console.error(err);
        window.alert(err instanceof Error ? err.message : '이미지를 불러올 수 없습니다.');
      }
    },
    [getPresignedUrl, onSelectIds],
  );

  const handleCropConfirm = useCallback(
    async (file: File, area: { width: number; height: number }) => {
      if (!cropTarget) return;
      const path = await uploadPrintEditorImage(file, currentFile);
      const el = coverRef.current.elements.find((e) => e.id === cropTarget.id);
      if (!el || el.type !== 'image') {
        setCropTarget(null);
        return;
      }
      const aspect = area.width / Math.max(1, area.height);
      const frame = frameRef.current?.getBoundingClientRect();
      const fw = frame?.width ?? 1;
      const fh = frame?.height ?? 1;
      const next = withCoverImageNaturalMetrics(
        { ...el, path },
        aspect,
        fw,
        fh,
        true,
      );
      onChange(updateElement(coverRef.current, cropTarget.id, next));
      setCropTarget(null);
    },
    [cropTarget, currentFile, onChange],
  );

  useEffect(() => {
    // macOS Ctrl+click synthesizes contextmenu; keep it from stealing multi-select.
    const frame = frameRef.current;
    if (!frame) return undefined;
    const onContextMenu = (event: Event) => {
      const e = event as MouseEvent;
      if (e.ctrlKey) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    frame.addEventListener('contextmenu', onContextMenu);
    return () => frame.removeEventListener('contextmenu', onContextMenu);
  }, []);

  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => {
      if (isEditablePasteTarget(event.target)) return;
      if (pastingRef.current) return;

      const images = extractImageFilesFromClipboard(event.clipboardData);
      const svgMarkup = extractSvgMarkupFromClipboard(event.clipboardData);
      let text = String(event.clipboardData?.getData('text/plain') ?? '').trim();
      if (!images.length && !text && !svgMarkup) return;

      event.preventDefault();
      event.stopPropagation();

      void (async () => {
        pastingRef.current = true;
        try {
          let nextCover = coverRef.current;
          let lastId: string | null = null;

          const filesToUpload: File[] = [];
          let convertedSvg = false;

          for (const file of images) {
            if (isSvgImageFile(file)) {
              try {
                filesToUpload.push(await convertSvgToPngFile(file));
                convertedSvg = true;
              } catch (err) {
                console.error(err);
                window.alert(
                  err instanceof Error ? err.message : 'SVG를 PNG로 변환하지 못했습니다.',
                );
              }
            } else {
              filesToUpload.push(file);
            }
          }

          const alreadyHaveSvgFile = images.some(isSvgImageFile);
          if (svgMarkup && !alreadyHaveSvgFile) {
            try {
              filesToUpload.push(await convertSvgToPngFile(svgMarkup));
              convertedSvg = true;
            } catch (err) {
              console.error(err);
              window.alert(
                err instanceof Error ? err.message : 'SVG를 PNG로 변환하지 못했습니다.',
              );
            }
          }

          // Avoid also inserting SVG source as a text object when we rasterized it.
          if (convertedSvg && (looksLikeSvgMarkup(text) || !text)) {
            text = '';
          }

          if (filesToUpload.length) {
            onPlaceModeChange?.({ kind: 'image', files: filesToUpload });
          }

          if (text) {
            const place = nextPastePlacement(nextCover.elements.length);
            const lines = text.split(/\r?\n/).length;
            const el = createCoverTextElement({
              text,
              x: place.x,
              y: place.y,
              w: 64,
              h: Math.min(40, Math.max(10, lines * 4 + 4)),
              fontSize: filesToUpload.length ? 24 : 28,
              fontWeight: 'normal',
              textAlign: 'left',
            });
            nextCover = registerNewElement(nextCover, el);
            lastId = el.id;
          }

          if (nextCover !== coverRef.current) {
            onChange(nextCover);
            if (lastId) onSelectIds([lastId]);
          }
        } finally {
          pastingRef.current = false;
        }
      })();
    };

    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, [currentFile, onChange, onPlaceModeChange, onSelectIds]);

  useEffect(() => {
    const droppingRef = { current: false };

    const dataTransferHasPayload = (dt: DataTransfer | null) => {
      if (!dt) return false;
      if (dt.types?.includes('Files')) return true;
      if (dt.types?.includes('text/plain')) return true;
      if (dt.files?.length) return true;
      return false;
    };

    const collectDropTextFiles = async (dt: DataTransfer): Promise<string> => {
      let text = String(dt.getData('text/plain') ?? '').trim();
      const files = Array.from(dt.files || []);
      for (const file of files) {
        if (file.type.startsWith('image/')) continue;
        if (
          file.type.startsWith('text/')
          || /\.(txt|md|markdown|csv|json)$/i.test(file.name)
        ) {
          try {
            const body = (await file.text()).trim();
            if (body) text = body;
          } catch {
            /* ignore unreadable files */
          }
        }
      }
      return text;
    };

    const prepareImageFiles = async (
      images: File[],
      svgMarkup: string | null,
      text: string,
    ): Promise<{ files: File[]; text: string }> => {
      const filesToUpload: File[] = [];
      let convertedSvg = false;
      let nextText = text;

      for (const file of images) {
        if (isSvgImageFile(file)) {
          try {
            filesToUpload.push(await convertSvgToPngFile(file));
            convertedSvg = true;
          } catch (err) {
            console.error(err);
            window.alert(
              err instanceof Error ? err.message : 'SVG를 PNG로 변환하지 못했습니다.',
            );
          }
        } else {
          filesToUpload.push(file);
        }
      }

      const alreadyHaveSvgFile = images.some(isSvgImageFile);
      if (svgMarkup && !alreadyHaveSvgFile) {
        try {
          filesToUpload.push(await convertSvgToPngFile(svgMarkup));
          convertedSvg = true;
        } catch (err) {
          console.error(err);
          window.alert(
            err instanceof Error ? err.message : 'SVG를 PNG로 변환하지 못했습니다.',
          );
        }
      }

      if (convertedSvg && (looksLikeSvgMarkup(nextText) || !nextText)) {
        nextText = '';
      }

      return { files: filesToUpload, text: nextText };
    };

    const onDragOver = (event: DragEvent) => {
      if (!dataTransferHasPayload(event.dataTransfer)) return;
      if (isEditablePasteTarget(event.target)) return;
      event.preventDefault();
      if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy';
    };

    const onDrop = (event: DragEvent) => {
      if (!event.dataTransfer) return;
      if (isEditablePasteTarget(event.target)) return;
      if (!dataTransferHasPayload(event.dataTransfer)) return;
      if (droppingRef.current || pastingRef.current) return;

      event.preventDefault();
      event.stopPropagation();

      const images = extractImageFilesFromClipboard(event.dataTransfer);
      const svgMarkup = extractSvgMarkupFromClipboard(event.dataTransfer);

      void (async () => {
        droppingRef.current = true;
        try {
          let text = await collectDropTextFiles(event.dataTransfer!);
          const prepared = await prepareImageFiles(images, svgMarkup, text);
          text = prepared.text;
          const files = prepared.files;
          if (!files.length && !text) return;

          if (files.length) {
            onPlaceModeChange?.({ kind: 'image', files });
          }

          if (text) {
            const place = nextPastePlacement(coverRef.current.elements.length);
            const lines = text.split(/\r?\n/).length;
            const el = createCoverTextElement({
              text,
              x: place.x,
              y: place.y,
              w: 64,
              h: Math.min(40, Math.max(10, lines * 4 + 4)),
              fontSize: files.length ? 24 : 28,
              fontWeight: 'normal',
              textAlign: 'left',
            });
            onChange(registerNewElement(coverRef.current, el));
            if (!files.length) onSelectIds([el.id]);
          }
        } finally {
          droppingRef.current = false;
        }
      })();
    };

    window.addEventListener('dragover', onDragOver);
    window.addEventListener('drop', onDrop);
    return () => {
      window.removeEventListener('dragover', onDragOver);
      window.removeEventListener('drop', onDrop);
    };
  }, [onChange, onPlaceModeChange, onSelectIds]);

  useEffect(() => {
    const removeSelected = () => {
      const ids = selectedIdsRef.current;
      if (!ids.length) return;
      onChange(deleteElements(coverRef.current, ids));
      onSelectIds([]);
    };

    const openDeleteConfirm = () => {
      const ids = selectedIdsRef.current;
      if (!ids.length) return;
      const locked = layerIdsIncludeLocked(coverRef.current, ids);
      clearDeleteConfirmSecondTimer();
      deleteConfirmAwaitingSecondRef.current = false;
      setDeleteConfirmDouble(locked);
      setDeleteConfirmStep(1);
    };

    const pressedArrows = new Set<string>();
    let arrowGestureStartMs: number | null = null;

    const nudgeStepPx = (event: KeyboardEvent) =>
      ARROW_NUDGE_BASE_PX
      * getChromeDevToolsNumberStep({
        altKey: event.altKey,
        shiftKey: event.shiftKey,
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
      });

    const applyArrowNudge = (event: KeyboardEvent) => {
      const ids = filterUnlockedElementIds(coverRef.current, selectedIdsRef.current);
      if (!ids.length) return;
      if (editingTextId) return;
      const frame = frameRef.current?.getBoundingClientRect();
      if (!frame || frame.width < 1 || frame.height < 1) return;

      const stepPx = nudgeStepPx(event);
      let dxPx = 0;
      let dyPx = 0;
      if (pressedArrows.has('ArrowLeft')) dxPx -= stepPx;
      if (pressedArrows.has('ArrowRight')) dxPx += stepPx;
      if (pressedArrows.has('ArrowUp')) dyPx -= stepPx;
      if (pressedArrows.has('ArrowDown')) dyPx += stepPx;
      if (dxPx === 0 && dyPx === 0) return;

      const dxPct = (dxPx / frame.width) * 100;
      const dyPct = (dyPx / frame.height) * 100;
      onChange(moveElementsByDelta(coverRef.current, ids, dxPct, dyPct));
    };

    const clearArrowGesture = () => {
      pressedArrows.clear();
      arrowGestureStartMs = null;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const mod = event.metaKey || event.ctrlKey;

      if (event.key === 'Escape') {
        if (deleteConfirmOpenRef.current) return;
        // Place → edit → selection (one Esc step each).
        if (placeModeRef.current) {
          event.preventDefault();
          event.stopPropagation();
          onPlaceModeChange?.(null);
          return;
        }
        if (editingTextId) {
          event.preventDefault();
          event.stopPropagation();
          setEditingTextId(null);
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
          return;
        }
        if (isEditablePasteTarget(event.target)) return;
        if (!selectedIdsRef.current.length) return;
        event.preventDefault();
        event.stopPropagation();
        onSelectIds([]);
        return;
      }

      // Cmd/Ctrl+Shift+< / > : font size −1 / +1 px.
      // Handle before editable-target bail-out so sidebar inputs / text edit
      // focus do not swallow the shortcut (event.code is IME-safe).
      if (mod && event.shiftKey && !event.altKey) {
        const { code, key } = event;
        const decrease =
          code === 'Comma'
          || key === '<'
          || key === ',';
        const increase =
          code === 'Period'
          || key === '>'
          || key === '.';
        if (decrease || increase) {
          if (!selectedIdsRef.current.length) return;
          event.preventDefault();
          event.stopPropagation();
          const next = nudgeCoverFontSizes(
            coverRef.current,
            selectedIdsRef.current,
            decrease ? -1 : 1,
          );
          if (next !== coverRef.current) onChange(next);
          return;
        }
      }

      if (isEditablePasteTarget(event.target)) return;

      if (isArrowKey(event.key)) {
        if (!selectedIdsRef.current.length) return;
        if (editingTextId) return;
        if (dragRef.current) return;
        event.preventDefault();
        event.stopPropagation();

        const now = performance.now();
        const wasPressed = pressedArrows.has(event.key);
        pressedArrows.add(event.key);

        if (arrowGestureStartMs == null) {
          arrowGestureStartMs = now;
          applyArrowNudge(event);
          return;
        }

        // Newly pressed second arrow (diagonal): nudge immediately.
        if (!wasPressed && !event.repeat) {
          applyArrowNudge(event);
          return;
        }

        // Hold-to-repeat: ignore until 500ms after gesture start.
        if (now - arrowGestureStartMs < ARROW_NUDGE_REPEAT_DELAY_MS) return;
        applyArrowNudge(event);
        return;
      }

      if (
        !event.metaKey
        && !event.ctrlKey
        && !event.altKey
        && (event.key === 'Backspace' || event.key === 'Delete')
      ) {
        if (!selectedIdsRef.current.length) return;
        if (deleteConfirmOpenRef.current) return;
        event.preventDefault();
        event.stopPropagation();
        const locked = layerIdsIncludeLocked(
          coverRef.current,
          selectedIdsRef.current,
        );
        if (event.key === 'Backspace' || locked) {
          openDeleteConfirm();
          return;
        }
        removeSelected();
        return;
      }

      // Place tools: T = text, M = rect, O = ellipse (toggle; no modifiers).
      if (
        !event.metaKey
        && !event.ctrlKey
        && !event.altKey
        && !event.shiftKey
        && !event.repeat
      ) {
        const placeKey = event.key.toLowerCase();
        if (placeKey === 't' || placeKey === 'm' || placeKey === 'o') {
          if (editingTextId) return;
          if (deleteConfirmOpenRef.current) return;
          event.preventDefault();
          event.stopPropagation();
          const current = placeModeRef.current;
          if (placeKey === 't') {
            onPlaceModeChange?.(
              current?.kind === 'text' ? null : { kind: 'text' },
            );
            return;
          }
          if (placeKey === 'm') {
            onPlaceModeChange?.(
              current?.kind === 'shape' && current.shapeType === 'rect'
                ? null
                : { kind: 'shape', shapeType: 'rect' },
            );
            return;
          }
          onPlaceModeChange?.(
            current?.kind === 'shape' && current.shapeType === 'ellipse'
              ? null
              : { kind: 'shape', shapeType: 'ellipse' },
          );
          return;
        }
      }

      if (!mod || event.altKey) return;
      const key = event.key.toLowerCase();

      if (key === 'z' && event.shiftKey) {
        event.preventDefault();
        event.stopPropagation();
        onRedo?.();
        return;
      }
      if (key === 'y') {
        event.preventDefault();
        event.stopPropagation();
        onRedo?.();
        return;
      }
      if (key === 'z') {
        event.preventDefault();
        event.stopPropagation();
        onUndo?.();
        return;
      }

      if (key !== 'g') return;

      event.preventDefault();
      event.stopPropagation();

      if (event.shiftKey) {
        const gid = sharedGroupIdForSelection(coverRef.current, selectedIdsRef.current);
        if (!gid) return;
        onChange(ungroupElements(coverRef.current, gid));
        return;
      }

      const result = groupSelectedElements(coverRef.current, selectedIdsRef.current);
      if (!result) return;
      onChange(result.cover);
      onSelectIds(collectDescendantElementIds(result.cover, result.groupId));
    };

    const onKeyUp = (event: KeyboardEvent) => {
      if (!isArrowKey(event.key)) return;
      pressedArrows.delete(event.key);
      if (pressedArrows.size === 0) {
        arrowGestureStartMs = null;
      }
    };

    const onBlur = () => {
      clearArrowGesture();
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
    };
  }, [editingTextId, onChange, onSelectIds, onUndo, onRedo, onPlaceModeChange]);

  const selectedSet = new Set(selectedIds);
  const singleSelected = selectedIds.length === 1 ? findEl(selectedIds[0]!) : null;

  const groupSelectionChrome = useMemo(() => {
    const layerIds = selectionToLayerIds(cover, selectedIds);
    const outlines: { id: string; bounds: { x: number; y: number; w: number; h: number } }[] =
      [];
    const memberIds = new Set<string>();
    for (const id of layerIds) {
      if (!isGroupId(cover, id)) continue;
      const descendants = collectDescendantElementIds(cover, id);
      if (!descendants.length) continue;
      const bounds = getSelectionBounds(getElementsByIds(cover, descendants));
      if (!bounds) continue;
      outlines.push({ id, bounds });
      for (const mid of descendants) memberIds.add(mid);
    }
    return { outlines, memberIds };
  }, [cover, selectedIds]);

  const marqueeHitSet = useMemo(() => {
    if (!marqueeRect || (marqueeRect.w < 0.05 && marqueeRect.h < 0.05)) {
      return new Set<string>();
    }
    return new Set(elementsIntersectingRect(cover.elements, marqueeRect));
  }, [cover.elements, marqueeRect]);

  const elementChromeClass = (el: CoverElement, isSelected: boolean, isMarqueeHit: boolean) => {
    const locked = isElementEffectivelyLocked(cover, el);
    const inSelectedGroup = groupSelectionChrome.memberIds.has(el.id);
    const parts = ['absolute', 'box-border'];
    if (locked && isSelected) {
      // Locked + selected: yellow border
      parts.push('ring-2', 'ring-yellow-400', 'ring-offset-0');
    } else if (isSelected && inSelectedGroup) {
      // Group member: light blue; group envelope uses selection blue.
      parts.push('ring-2', 'ring-blue-300', 'ring-offset-0');
    } else if (isSelected) {
      parts.push('ring-2', 'ring-blue-500', 'ring-offset-0');
    } else if (isMarqueeHit) {
      parts.push('outline', 'outline-2', 'outline-dashed', 'outline-blue-500', '-outline-offset-1');
    } else {
      parts.push('hover:ring-1', 'hover:ring-blue-300');
    }
    if (textContainerOutlineEnabled && el.type === 'text') {
      // Inset so it does not fight selection ring / marquee dashed outline.
      parts.push('shadow-[inset_0_0_0_1px_rgba(248,113,113,0.7)]');
    }
    return parts.join(' ');
  };

  return (
    <CoverSlide
      cover={cover}
      getPresignedUrl={getPresignedUrl}
      showFrameOutline
      renderElements={false}
      className={`shadow-[0_8px_28px_rgba(15,23,42,0.12)] print:shadow-none ${className}`}
    >
      <div
        ref={frameRef}
        className={`absolute inset-0 ${placeMode ? 'cursor-crosshair' : ''}`}
        tabIndex={0}
        role="application"
        aria-label="표지 편집 캔버스"
        onPointerDown={(event) => {
          beginPlaceOrMarquee(event);
        }}
      >
        {snapGuides.v.map((x) => (
          <div
            key={`snap-v-${x}`}
            className="pointer-events-none absolute top-0 bottom-0 z-40 w-px bg-pink-500/80"
            style={{ left: `${x}%` }}
            aria-hidden
          />
        ))}
        {snapGuides.h.map((y) => (
          <div
            key={`snap-h-${y}`}
            className="pointer-events-none absolute left-0 right-0 z-40 h-px bg-pink-500/80"
            style={{ top: `${y}%` }}
            aria-hidden
          />
        ))}
        {marqueeRect && (marqueeRect.w > 0.05 || marqueeRect.h > 0.05) ? (
          <div
            className="pointer-events-none absolute z-50 border border-dashed border-blue-500 bg-blue-500/10"
            style={{
              left: `${marqueeRect.x}%`,
              top: `${marqueeRect.y}%`,
              width: `${marqueeRect.w}%`,
              height: `${marqueeRect.h}%`,
            }}
            aria-hidden
          />
        ) : null}
        {groupSelectionChrome.outlines.map(({ id, bounds }) => (
          <div
            key={`group-sel-${id}`}
            className="pointer-events-none absolute z-40 border-2 border-blue-500"
            style={{
              left: `${bounds.x}%`,
              top: `${bounds.y}%`,
              width: `${bounds.w}%`,
              height: `${bounds.h}%`,
            }}
            aria-hidden
          />
        ))}
        {placeMode && placePreviewEnabled && placeGhost ? (
          <div
            className="pointer-events-none absolute z-45 overflow-hidden rounded-sm border border-dashed border-blue-500 bg-blue-500/15"
            style={{
              left: `${placeGhost.x}%`,
              top: `${placeGhost.y}%`,
              width: `${placeGhost.w}%`,
              height: `${placeGhost.h}%`,
            }}
            aria-hidden
          >
            {placeMode.kind === 'text' ? (
              <div
                className="flex h-full w-full items-start justify-start px-0.5 text-left font-bold text-gray-800/40 dark:text-white/35"
                style={{ fontSize: 36, lineHeight: 1.25 }}
              >
                제목
              </div>
            ) : placeMode.kind === 'shape' ? (
              <div
                className="h-full w-full border border-blue-500/50 bg-sky-200/40"
                style={{
                  borderRadius:
                    placeMode.shapeType === 'ellipse'
                      ? '50%'
                      : placeMode.shapeType === 'roundRect'
                        ? '8%'
                        : 0,
                }}
              />
            ) : placeImagePreviewUrl ? (
              <img
                src={placeImagePreviewUrl}
                alt=""
                className="h-full w-full object-fill opacity-45"
                draggable={false}
              />
            ) : (
              <div className="h-full w-full bg-blue-400/20" />
            )}
          </div>
        ) : null}
        {cover.elements.map((el, index) => {
          const isSelected = selectedSet.has(el.id);
          const isMarqueeHit = marqueeHitSet.has(el.id);
          const isLocked = isElementEffectivelyLocked(cover, el);
          const canEditText = !isLocked && (el.type === 'text' || isCoverShapeElement(el));
          const isEditing = canEditText && el.id === editingTextId;
          const showHandles =
            isSelected && selectedIds.length === 1 && !isEditing && !isLocked;
          const chromeClass = elementChromeClass(el, isSelected, isMarqueeHit);

          const body = (
            <>
              {isEditing && el.type === 'text' ? (
                <textarea
                  className="h-full w-full resize-none border-0 bg-transparent p-0 outline-none"
                  style={{
                    color: el.color,
                    fontSize: `${el.fontSize}px`,
                    fontWeight: el.fontWeight,
                    textAlign: el.textAlign,
                    fontFamily: el.fontFamily || undefined,
                    lineHeight: 1.25,
                  }}
                  value={el.text}
                  autoFocus
                  onChange={(e) => {
                    onChange(
                      updateElement(coverRef.current, el.id, {
                        ...el,
                        text: e.target.value,
                      }),
                    );
                  }}
                  onBlur={() => setEditingTextId(null)}
                  onPointerDown={(e) => e.stopPropagation()}
                />
              ) : el.type === 'text' ? (
                <EditorText el={el} />
              ) : isCoverShapeElement(el) ? (
                <EditorShape
                  el={el}
                  isEditing={isEditing}
                  onTextChange={(text) => {
                    onChange(
                      updateElement(coverRef.current, el.id, {
                        ...el,
                        text,
                      }),
                    );
                  }}
                  onBlur={() => setEditingTextId(null)}
                />
              ) : (
                <EditorImage
                  el={el}
                  getPresignedUrl={getPresignedUrl}
                  onNaturalReady={(aspect) => handleImageNaturalReady(el.id, aspect)}
                />
              )}
              {showHandles
                ? HANDLES.map((h) => (
                    <div
                      key={h.id}
                      className={`absolute z-30 h-2.5 w-2.5 rounded-sm border border-white bg-blue-500 ${h.className}`}
                      onPointerDown={(event) => {
                        if (placeMode) {
                          beginPlaceOrMarquee(event);
                          return;
                        }
                        beginResize(el.id, event, h.id);
                      }}
                    />
                  ))
                : null}
            </>
          );

          const directlyLocked = isLayerDirectlyLocked(cover, el.id);
          const toggleLock = () => {
            const c = coverRef.current;
            if (directlyLocked) {
              onChange(setLayerLocked(c, el.id, false));
              return;
            }
            if (isLocked) {
              // Locked via ancestor group — unlock nearest locked group.
              let gid = el.groupId;
              const seen = new Set<string>();
              while (gid && !seen.has(gid)) {
                seen.add(gid);
                const group = getGroup(c, gid);
                if (!group) break;
                if (group.locked === true) {
                  onChange(setLayerLocked(c, gid, false));
                  return;
                }
                gid = group.parentGroupId;
              }
            }
            onChange(setLayerLocked(c, el.id, true));
          };

          return (
            <ContextMenu.Root key={el.id}>
              <ContextMenu.Trigger asChild>
                <div
                  data-cover-el={el.id}
                  data-cover-locked={isLocked ? '1' : undefined}
                  className={chromeClass}
                  style={{
                    left: `${el.x}%`,
                    top: `${el.y}%`,
                    width: `${el.w}%`,
                    height: `${el.h}%`,
                    zIndex: isSelected || isMarqueeHit ? 20 + index : 10 + index,
                    cursor: isEditing ? 'text' : isLocked ? 'default' : 'move',
                  }}
                  onPointerDown={(event) => {
                    if (placeMode) {
                      beginPlaceOrMarquee(event);
                      return;
                    }
                    if (isEditing) {
                      event.stopPropagation();
                      return;
                    }
                    beginMove(el.id, event);
                  }}
                  onDoubleClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    if (placeMode) return;
                    const drilled = resolveCoverDrillSelection(
                      coverRef.current,
                      el.id,
                      selectedIdsRef.current,
                    );
                    if (!drilled.ids.length) return;
                    onSelectIds(drilled.ids);
                    if (drilled.enterEdit && canEditText) {
                      setEditingTextId(el.id);
                    }
                  }}
                >
                  {body}
                </div>
              </ContextMenu.Trigger>
              <ContextMenu.Portal>
                <ContextMenu.Content
                  className={chatMenuContentClass}
                  onCloseAutoFocus={(e) => e.preventDefault()}
                >
                  <ContextMenu.Item className={chatMenuItemClass} onSelect={toggleLock}>
                    {isLocked ? (
                      <LockOpen size={16} className="shrink-0" />
                    ) : (
                      <Lock size={16} className="shrink-0" />
                    )}
                    {isLocked ? '잠금 해제' : '잠금'}
                  </ContextMenu.Item>
                  {el.type === 'image' ? (
                    <>
                      <ContextMenu.Separator className="my-1 h-px bg-gray-200 dark:bg-odp-borderStrong" />
                      <ContextMenu.Item
                        className={chatMenuItemClass}
                        disabled={isLocked}
                        onSelect={() => {
                          void openImageCrop(el);
                        }}
                      >
                        <Crop size={16} className="shrink-0" />
                        자르기
                      </ContextMenu.Item>
                      <ContextMenu.Item
                        className={chatMenuItemClass}
                        disabled={isLocked || !el.naturalAspect}
                        onSelect={() => restoreImageAspect(el.id)}
                      >
                        <RotateCcw size={16} className="shrink-0" />
                        원본 비율로 되돌리기
                      </ContextMenu.Item>
                      <ContextMenu.Item
                        className={chatMenuItemClass}
                        disabled={isLocked}
                        onSelect={() => toggleImageLockAspect(el.id)}
                      >
                        <Ratio size={16} className="shrink-0" />
                        {el.lockAspect ? '무조건 비율 유지 해제' : '무조건 비율 유지'}
                      </ContextMenu.Item>
                    </>
                  ) : null}
                </ContextMenu.Content>
              </ContextMenu.Portal>
            </ContextMenu.Root>
          );
        })}
      </div>
      {singleSelected ? (
        <span className="sr-only">
          Selected {singleSelected.type} {singleSelected.id}
        </span>
      ) : selectedIds.length > 1 ? (
        <span className="sr-only">Selected {selectedIds.length} layers</span>
      ) : null}
      <Modal
        isOpen={Boolean(cropTarget)}
        onClose={() => setCropTarget(null)}
        contentClassName="max-w-2xl"
      >
        {cropTarget ? (
          <NoteImageCropPanel
            imageSrc={cropTarget.imageSrc}
            fileName={cropTarget.path}
            onCancel={() => setCropTarget(null)}
            onConfirm={handleCropConfirm}
          />
        ) : null}
      </Modal>
      <ConfirmModal
        key={`cover-delete-confirm-${deleteConfirmStep}`}
        isOpen={deleteConfirmStep > 0}
        title={deleteConfirmStep === 2 ? '잠긴 개체 삭제' : '개체 삭제'}
        message={
          deleteConfirmStep === 2
            ? '잠긴 개체가 포함되어 있습니다. 정말 삭제할까요?'
            : '선택한 개체를 삭제할까요?'
        }
        confirmLabel="삭제"
        cancelLabel="취소"
        variant="danger"
        onConfirm={() => {
          if (deleteConfirmDouble && deleteConfirmStep === 1) {
            advanceLockedDeleteConfirm();
            return;
          }
          const ids = selectedIdsRef.current;
          resetDeleteConfirm();
          if (!ids.length) return;
          onChange(deleteElements(coverRef.current, ids));
          onSelectIds([]);
        }}
        onCancel={resetDeleteConfirm}
      />
      {placeMode && placeTipPos
        ? createPortal(
          <div
            className="pointer-events-none fixed z-[100001] rounded-md border border-gray-200 bg-white px-2 py-1 text-[11px] font-medium text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong"
            style={
              placePreviewEnabled
                ? {
                    left: placeTipPos.x + 14,
                    top: placeTipPos.y - 8,
                    transform: 'translateY(-100%)',
                  }
                : {
                    left: placeTipPos.x + 14,
                    top: placeTipPos.y + 18,
                  }
            }
          >
            클릭해서 삽입하기
          </div>,
          document.body,
        )
        : null}
    </CoverSlide>
  );
}

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { printFontCssVarValue } from '@/utils/fontFallback';
import { PRINT_BODY_PAGE_ATTR } from '@/utils/print/printBodyPage';
import type { PrintPageMarginsMm } from '@/utils/printPageLayout';
import {
  formatPrintChromePageLabel,
  printChromePageKey,
  resolvePrintChromePageNumber,
  resolvePrintChromePlacement,
  type PrintChromeDoc,
  type PrintChromePlacement,
  type PrintChromePosition,
  type PrintChromeTemplate,
} from '@/utils/printChrome';
import {
  formatPrintChromePlacementDelta,
  nudgePrintChromePlacementByPx,
  printChromePositionToPercent,
  type PrintChromePageSizePx,
} from '@/utils/printChrome/placementMetrics';

const POSITION_STYLE: Record<PrintChromePosition, CSSProperties> = {
  'top-left': { top: 0, left: 0, justifyContent: 'flex-start', textAlign: 'left' },
  'top-center': {
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    justifyContent: 'center',
    textAlign: 'center',
  },
  'top-right': { top: 0, right: 0, justifyContent: 'flex-end', textAlign: 'right' },
  'middle-left': {
    top: '50%',
    left: 0,
    transform: 'translateY(-50%)',
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
  'middle-right': {
    top: '50%',
    right: 0,
    transform: 'translateY(-50%)',
    justifyContent: 'flex-end',
    textAlign: 'right',
  },
  'bottom-left': { bottom: 0, left: 0, justifyContent: 'flex-start', textAlign: 'left' },
  'bottom-center': {
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    justifyContent: 'center',
    textAlign: 'center',
  },
  'bottom-right': { bottom: 0, right: 0, justifyContent: 'flex-end', textAlign: 'right' },
};

type GetPresignedUrl = ((path: string) => Promise<string | null>) | null | undefined;

export type PrintChromePlacementDraft = {
  templateId: string;
  pageKey: string;
  placement: PrintChromePlacement;
  /** Position when move mode started. */
  origin: PrintChromePlacement;
  /** True while the pointer is down dragging. */
  dragging?: boolean;
  /** Selected via click; required before drag / arrow nudge. */
  moveMode?: boolean;
  /** Preview page box size (CSS px) for delta labels and 1px arrow nudges. */
  pageWidthPx?: number;
  pageHeightPx?: number;
};

type PrintChromeLayerProps = {
  chrome: PrintChromeDoc;
  /** 0-based body page index; omit / null for cover. */
  bodyIndex?: number | null;
  bodyPageCount: number;
  hasCover: boolean;
  isCover?: boolean;
  marginsMm: PrintPageMarginsMm;
  getPresignedUrl?: GetPresignedUrl;
  className?: string;
  /** Allow dragging page-number chrome in the preview (not during print). */
  editable?: boolean;
  draftPlacement?: PrintChromePlacementDraft | null;
  onPlacementDraftChange?: ((draft: PrintChromePlacementDraft | null) => void) | undefined;
  onPlacementDraftCommit?: ((draft: PrintChromePlacementDraft) => void) | undefined;
  /** Outside click while in move mode (parent may confirm discard). */
  onRequestCancelPlacement?: (() => void) | undefined;
};

function chromeInsetStyle(margins: PrintPageMarginsMm): CSSProperties {
  const band = (mm: number) => (mm > 0 ? `max(2px, calc(${mm}mm * 0.15))` : '6px');
  return {
    top: band(margins.top),
    right: band(margins.right),
    bottom: band(margins.bottom),
    left: band(margins.left),
    padding: 0,
  };
}

function placementStyle(placement: PrintChromePlacement): CSSProperties {
  return {
    top: `${placement.yPercent}%`,
    left: `${placement.xPercent}%`,
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    justifyContent: 'center',
    textAlign: 'center',
  };
}

function ChromeImage({
  path,
  widthPx,
  heightPx,
  getPresignedUrl,
}: {
  path: string;
  widthPx: number;
  heightPx: number;
  getPresignedUrl?: GetPresignedUrl;
}) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const trimmed = path.trim();
    if (!trimmed) {
      setUrl(null);
      return undefined;
    }
    if (!getPresignedUrl) {
      setUrl(null);
      return undefined;
    }
    void getPresignedUrl(trimmed).then((next) => {
      if (!cancelled) setUrl(next);
    });
    return () => {
      cancelled = true;
    };
  }, [getPresignedUrl, path]);

  if (!url) return null;
  return (
    <img
      src={url}
      alt=""
      width={widthPx}
      height={heightPx}
      draggable={false}
      style={{
        width: widthPx,
        height: heightPx,
        maxWidth: '100%',
        objectFit: 'contain',
        display: 'block',
        WebkitPrintColorAdjust: 'exact',
        printColorAdjust: 'exact',
      } as CSSProperties}
    />
  );
}

const CLICK_SLOP_PX = 6;
const ARROW_STEP_PX = 1;

function clampPlacementPercent(n: number): number {
  return Math.min(100, Math.max(0, Math.round(n * 10000) / 10000));
}

function readPageSizePx(
  layerEl: HTMLElement | null,
  fallback?: {
    pageWidthPx?: number | undefined;
    pageHeightPx?: number | undefined;
  } | null,
): PrintChromePageSizePx | null {
  if (layerEl) {
    const rect = layerEl.getBoundingClientRect();
    return {
      widthPx: Math.max(1, rect.width),
      heightPx: Math.max(1, rect.height),
    };
  }
  const widthPx = fallback?.pageWidthPx;
  const heightPx = fallback?.pageHeightPx;
  if (widthPx != null && heightPx != null && widthPx > 0 && heightPx > 0) {
    return { widthPx, heightPx };
  }
  return null;
}

function ChromeItem({
  template,
  pageKey,
  page,
  total,
  showPageNumber,
  getPresignedUrl,
  editable,
  draftPlacement,
  layerRef,
  onPlacementDraftChange,
  onPlacementDraftCommit,
  onRequestCancelPlacement,
}: {
  template: PrintChromeTemplate;
  pageKey: string;
  page: number;
  total: number;
  showPageNumber: boolean;
  getPresignedUrl?: GetPresignedUrl;
  editable?: boolean;
  draftPlacement?: PrintChromePlacementDraft | null;
  layerRef: RefObject<HTMLDivElement | null>;
  onPlacementDraftChange?: ((draft: PrintChromePlacementDraft | null) => void) | undefined;
  onPlacementDraftCommit?: ((draft: PrintChromePlacementDraft) => void) | undefined;
  onRequestCancelPlacement?: (() => void) | undefined;
}) {
  const itemRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const clickArmRef = useRef<{ x: number; y: number } | null>(null);
  const dragStartRef = useRef<{
    clientX: number;
    clientY: number;
    placement: PrintChromePlacement;
  } | null>(null);
  const originRef = useRef<PrintChromePlacement | null>(null);
  const placementRef = useRef<PrintChromePlacement | null>(null);

  const canEdit = Boolean(
    editable &&
      template.type === 'page-number' &&
      template.enabled &&
      showPageNumber,
  );

  const draftForThis =
    draftPlacement &&
    draftPlacement.templateId === template.id &&
    draftPlacement.pageKey === pageKey
      ? draftPlacement
      : null;
  const draftForThisRef = useRef(draftForThis);
  draftForThisRef.current = draftForThis;
  const inMoveMode = Boolean(canEdit && draftForThis?.moveMode);

  useEffect(() => {
    if (draftForThis?.placement) {
      placementRef.current = draftForThis.placement;
      originRef.current = draftForThis.origin;
    } else if (!draftForThis) {
      placementRef.current = null;
      originRef.current = null;
      dragStartRef.current = null;
    }
  }, [draftForThis]);

  useEffect(() => {
    if (!inMoveMode) return undefined;
    itemRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }
      const key = event.key;
      if (
        key !== 'ArrowLeft' &&
        key !== 'ArrowRight' &&
        key !== 'ArrowUp' &&
        key !== 'ArrowDown'
      ) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      const pageSize = readPageSizePx(layerRef.current, draftForThisRef.current);
      if (!pageSize) return;
      const origin =
        originRef.current ??
        resolvePrintChromePlacement(template, pageKey) ??
        printChromePositionToPercent(template.position);
      const current =
        placementRef.current ??
        resolvePrintChromePlacement(template, pageKey) ??
        printChromePositionToPercent(template.position);
      let dxPx = 0;
      let dyPx = 0;
      if (key === 'ArrowLeft') dxPx = -ARROW_STEP_PX;
      if (key === 'ArrowRight') dxPx = ARROW_STEP_PX;
      if (key === 'ArrowUp') dyPx = -ARROW_STEP_PX;
      if (key === 'ArrowDown') dyPx = ARROW_STEP_PX;
      const placement = nudgePrintChromePlacementByPx(current, dxPx, dyPx, pageSize);
      originRef.current = origin;
      placementRef.current = placement;
      const draft: PrintChromePlacementDraft = {
        templateId: template.id,
        pageKey,
        placement,
        origin,
        dragging: false,
        moveMode: true,
        pageWidthPx: pageSize.widthPx,
        pageHeightPx: pageSize.heightPx,
      };
      onPlacementDraftChange?.(draft);
      onPlacementDraftCommit?.(draft);
    };

    const onPointerDownOutside = (event: PointerEvent) => {
      const el = itemRef.current;
      if (!el) return;
      if (event.target instanceof Node && el.contains(event.target)) return;
      // Ignore clicks on placement bar / confirm modal.
      if (
        event.target instanceof Element &&
        (event.target.closest('[data-print-chrome-placement-bar]') ||
          event.target.closest('[role="dialog"]'))
      ) {
        return;
      }
      // Do not clear local refs yet — parent may ask to keep editing.
      if (onRequestCancelPlacement) {
        onRequestCancelPlacement();
      } else {
        originRef.current = null;
        placementRef.current = null;
        dragStartRef.current = null;
        onPlacementDraftChange?.(null);
      }
    };

    window.addEventListener('keydown', onKeyDown, true);
    window.addEventListener('pointerdown', onPointerDownOutside, true);
    return () => {
      window.removeEventListener('keydown', onKeyDown, true);
      window.removeEventListener('pointerdown', onPointerDownOutside, true);
    };
  }, [
    inMoveMode,
    layerRef,
    onPlacementDraftChange,
    onPlacementDraftCommit,
    onRequestCancelPlacement,
    pageKey,
    template,
  ]);

  if (!template.enabled) return null;
  if (template.type === 'page-number' && !showPageNumber) return null;

  const free = draftForThis?.placement ?? resolvePrintChromePlacement(template, pageKey);
  const pos = free ? placementStyle(free) : POSITION_STYLE[template.position];
  const fontFamily =
    template.type === 'image'
      ? undefined
      : printFontCssVarValue(template.fontFamily) ??
        'var(--print-font-body, var(--font-sans-builtin))';

  const textStyle: CSSProperties = {
    fontFamily,
    fontSize:
      template.type === 'page-number' || template.type === 'text'
        ? `${template.fontSizePx}px`
        : undefined,
    color: '#111827',
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
    overflow: 'visible',
    WebkitPrintColorAdjust: 'exact',
    printColorAdjust: 'exact',
  };

  let content: ReactNode = null;
  if (template.type === 'page-number') {
    content = (
      <span style={textStyle}>
        {formatPrintChromePageLabel(template.format, page, total)}
      </span>
    );
  } else if (template.type === 'text') {
    if (!template.text) return null;
    content = <span style={textStyle}>{template.text}</span>;
  } else if (template.type === 'image') {
    if (!template.path.trim()) return null;
    content = (
      <ChromeImage
        path={template.path}
        widthPx={template.widthPx}
        heightPx={template.heightPx}
        getPresignedUrl={getPresignedUrl}
      />
    );
  }

  if (!content) return null;

  const pageSizeForLabel = readPageSizePx(layerRef.current, draftForThis);
  const deltaLabel =
    draftForThis && canEdit && draftForThis.moveMode
      ? formatPrintChromePlacementDelta(
          draftForThis.origin,
          draftForThis.placement,
          pageSizeForLabel,
        ).label
      : null;

  const withPageSize = (
    draft: Omit<PrintChromePlacementDraft, 'pageWidthPx' | 'pageHeightPx'> &
      Partial<Pick<PrintChromePlacementDraft, 'pageWidthPx' | 'pageHeightPx'>>,
  ): PrintChromePlacementDraft => {
    const pageSize = readPageSizePx(layerRef.current, {
      pageWidthPx: draft.pageWidthPx ?? draftForThis?.pageWidthPx,
      pageHeightPx: draft.pageHeightPx ?? draftForThis?.pageHeightPx,
    });
    return {
      ...draft,
      ...(pageSize
        ? { pageWidthPx: pageSize.widthPx, pageHeightPx: pageSize.heightPx }
        : {}),
    };
  };

  const enterMoveMode = () => {
    const current =
      resolvePrintChromePlacement(template, pageKey) ??
      printChromePositionToPercent(template.position);
    originRef.current = current;
    placementRef.current = current;
    onPlacementDraftChange?.(
      withPageSize({
        templateId: template.id,
        pageKey,
        placement: current,
        origin: current,
        dragging: false,
        moveMode: true,
      }),
    );
  };

  const emitDraft = (
    placement: PrintChromePlacement,
    dragging: boolean,
    origin = originRef.current,
  ) => {
    if (!origin) return;
    placementRef.current = placement;
    onPlacementDraftChange?.(
      withPageSize({
        templateId: template.id,
        pageKey,
        placement,
        origin,
        dragging,
        moveMode: true,
      }),
    );
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!canEdit || event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();

    // Not in move mode: arm click-to-select only (no drag).
    if (!inMoveMode) {
      clickArmRef.current = { x: event.clientX, y: event.clientY };
      draggingRef.current = false;
      movedRef.current = false;
      return;
    }

    // Move mode: drag by delta from the live placement (no snap-to-cursor).
    const layerEl = layerRef.current;
    if (!layerEl) return;
    draggingRef.current = true;
    movedRef.current = false;
    clickArmRef.current = null;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    if (!originRef.current) {
      originRef.current =
        draftForThis?.origin ??
        resolvePrintChromePlacement(template, pageKey) ??
        printChromePositionToPercent(template.position);
    }
    const placement =
      placementRef.current ??
      draftForThis?.placement ??
      resolvePrintChromePlacement(template, pageKey) ??
      printChromePositionToPercent(template.position);
    placementRef.current = placement;
    dragStartRef.current = {
      clientX: event.clientX,
      clientY: event.clientY,
      placement,
    };
    emitDraft(placement, true);
  };

  const placementFromDragDelta = (
    clientX: number,
    clientY: number,
  ): PrintChromePlacement | null => {
    const start = dragStartRef.current;
    const layerEl = layerRef.current;
    if (!start || !layerEl) return null;
    const rect = layerEl.getBoundingClientRect();
    const w = Math.max(1, rect.width);
    const h = Math.max(1, rect.height);
    return {
      xPercent: clampPlacementPercent(
        start.placement.xPercent + ((clientX - start.clientX) / w) * 100,
      ),
      yPercent: clampPlacementPercent(
        start.placement.yPercent + ((clientY - start.clientY) / h) * 100,
      ),
    };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!canEdit) return;

    if (!inMoveMode) {
      const arm = clickArmRef.current;
      if (!arm) return;
      const dx = event.clientX - arm.x;
      const dy = event.clientY - arm.y;
      if (dx * dx + dy * dy > CLICK_SLOP_PX * CLICK_SLOP_PX) {
        // Direct drag without move mode — cancel click-select, do not move.
        clickArmRef.current = null;
      }
      return;
    }

    if (!draggingRef.current) return;
    const placement = placementFromDragDelta(event.clientX, event.clientY);
    if (!placement) return;
    movedRef.current = true;
    emitDraft(placement, true);
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!canEdit) return;

    // Click without move mode → enter move mode.
    if (!inMoveMode) {
      const arm = clickArmRef.current;
      clickArmRef.current = null;
      if (!arm) return;
      const dx = event.clientX - arm.x;
      const dy = event.clientY - arm.y;
      if (dx * dx + dy * dy <= CLICK_SLOP_PX * CLICK_SLOP_PX) {
        enterMoveMode();
      }
      return;
    }

    if (!draggingRef.current) return;
    draggingRef.current = false;
    try {
      (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);
    } catch {
      // ignore
    }
    const origin = originRef.current;
    if (!origin) {
      dragStartRef.current = null;
      return;
    }
    if (!movedRef.current) {
      // Click again while in move mode — keep mode, no new commit needed.
      dragStartRef.current = null;
      emitDraft(
        placementRef.current ??
          draftForThis?.placement ??
          resolvePrintChromePlacement(template, pageKey) ??
          printChromePositionToPercent(template.position),
        false,
      );
      return;
    }
    const placement =
      placementFromDragDelta(event.clientX, event.clientY) ??
      placementRef.current ??
      draftForThis?.placement ??
      resolvePrintChromePlacement(template, pageKey) ??
      printChromePositionToPercent(template.position);
    dragStartRef.current = null;
    const draft = withPageSize({
      templateId: template.id,
      pageKey,
      placement,
      origin,
      dragging: false,
      moveMode: true,
    });
    onPlacementDraftChange?.(draft);
    onPlacementDraftCommit?.(draft);
  };

  return (
    <div
      ref={itemRef}
      key={template.id}
      data-print-chrome-item={template.type}
      data-print-chrome-move-mode={inMoveMode ? '1' : undefined}
      tabIndex={canEdit ? 0 : undefined}
      role={canEdit ? 'button' : undefined}
      aria-label={
        canEdit
          ? inMoveMode
            ? '쪽번호 이동 모드. 드래그하거나 화살표 키로 이동'
            : '쪽번호. 클릭하여 이동 모드'
          : undefined
      }
      aria-pressed={canEdit ? inMoveMode : undefined}
      className={`absolute max-w-none outline-none print:pointer-events-none ${
        canEdit
          ? `pointer-events-auto touch-none select-none ${
              inMoveMode
                ? 'cursor-grab active:cursor-grabbing'
                : 'cursor-pointer'
            }`
          : 'pointer-events-none'
      }`}
      style={pos}
      onPointerDown={canEdit ? onPointerDown : undefined}
      onPointerMove={canEdit ? onPointerMove : undefined}
      onPointerUp={canEdit ? endDrag : undefined}
      onPointerCancel={canEdit ? endDrag : undefined}
    >
      <div
        className={`relative flex items-center justify-center rounded-sm ${
          inMoveMode
            ? 'ring-2 ring-blue-500 ring-offset-1 ring-offset-white dark:ring-offset-odp-bgSoft'
            : ''
        }`}
      >
        {content}
        {deltaLabel ? (
          <span
            className="pointer-events-none absolute left-1/2 top-[calc(100%+4px)] z-10 -translate-x-1/2 whitespace-nowrap rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-white print:hidden"
            aria-hidden
          >
            {deltaLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Absolute chrome overlay for one page box (cover or .pagedjs_page).
 * Keep printable (no print:hidden).
 */
export function PrintChromeLayer({
  chrome,
  bodyIndex = null,
  bodyPageCount,
  hasCover,
  isCover = false,
  marginsMm,
  getPresignedUrl,
  className = '',
  editable = false,
  draftPlacement = null,
  onPlacementDraftChange,
  onPlacementDraftCommit,
  onRequestCancelPlacement,
}: PrintChromeLayerProps) {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const pageKey = printChromePageKey({ isCover, bodyIndex });

  const numbering = useMemo(() => {
    return resolvePrintChromePageNumber({
      numbering: chrome.numbering,
      bodyIndex: bodyIndex ?? 0,
      bodyPageCount,
      hasCover,
      isCover,
    });
  }, [bodyIndex, bodyPageCount, chrome.numbering, hasCover, isCover]);

  const templates = chrome.templates.filter((t) => t.enabled);
  if (templates.length === 0) return null;
  if (isCover && !chrome.showOnCover) return null;

  return (
    <div
      ref={layerRef}
      data-print-chrome-layer={isCover ? 'cover' : 'body'}
      className={`absolute z-20 overflow-visible print:pointer-events-none ${
        editable ? 'pointer-events-none' : 'pointer-events-none'
      } ${className}`}
      style={chromeInsetStyle(marginsMm)}
      aria-hidden={!editable}
    >
      {templates.map((template) => (
        <ChromeItem
          key={template.id}
          template={template}
          pageKey={pageKey}
          page={numbering.page}
          total={numbering.total}
          showPageNumber={numbering.showPageNumber}
          getPresignedUrl={getPresignedUrl}
          editable={editable}
          draftPlacement={draftPlacement}
          layerRef={layerRef}
          onPlacementDraftChange={onPlacementDraftChange}
          onPlacementDraftCommit={onPlacementDraftCommit}
          onRequestCancelPlacement={onRequestCancelPlacement}
        />
      ))}
    </div>
  );
}

type PrintChromePagesMountProps = {
  pagesHostRef: RefObject<HTMLElement | null>;
  chrome: PrintChromeDoc | null;
  bodyPageCount: number;
  hasCover: boolean;
  marginsMm: PrintPageMarginsMm;
  getPresignedUrl?: GetPresignedUrl;
  /** Remount when paged.js regenerates pages. */
  layoutKey: string;
  editable?: boolean;
  draftPlacement?: PrintChromePlacementDraft | null;
  onPlacementDraftChange?: ((draft: PrintChromePlacementDraft | null) => void) | undefined;
  onPlacementDraftCommit?: ((draft: PrintChromePlacementDraft) => void) | undefined;
  onRequestCancelPlacement?: (() => void) | undefined;
};
export function PrintChromePagesMount({
  pagesHostRef,
  chrome,
  bodyPageCount,
  hasCover,
  marginsMm,
  getPresignedUrl,
  layoutKey,
  editable = false,
  draftPlacement = null,
  onPlacementDraftChange,
  onPlacementDraftCommit,
  onRequestCancelPlacement,
}: PrintChromePagesMountProps) {
  const [pages, setPages] = useState<HTMLElement[]>([]);

  useEffect(() => {
    const pagesHost = pagesHostRef.current;
    if (!pagesHost || !chrome || chrome.templates.length === 0) {
      setPages([]);
      return undefined;
    }

    const collect = () => {
      const host = pagesHostRef.current;
      if (!host) {
        setPages([]);
        return;
      }
      const list = [
        ...host.querySelectorAll<HTMLElement>(`.pagedjs_page, [${PRINT_BODY_PAGE_ATTR}]`),
      ];
      const unique = [...new Set(list)];
      for (const page of unique) {
        const style = window.getComputedStyle(page);
        if (style.position === 'static') {
          page.style.position = 'relative';
        }
      }
      setPages(unique);
    };

    collect();
    const mo = new MutationObserver(() => collect());
    mo.observe(pagesHost, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, [chrome, layoutKey, pagesHostRef]);

  if (!chrome || chrome.templates.length === 0 || pages.length === 0) {
    return null;
  }

  return (
    <>
      {pages.map((pageEl, index) => {
        const attr = pageEl.getAttribute(PRINT_BODY_PAGE_ATTR);
        const bodyIndex = attr != null && attr !== '' ? Number(attr) : index;
        return createPortal(
          <PrintChromeLayer
            key={`${layoutKey}-${bodyIndex}`}
            chrome={chrome}
            bodyIndex={Number.isFinite(bodyIndex) ? bodyIndex : index}
            bodyPageCount={bodyPageCount}
            hasCover={hasCover}
            marginsMm={marginsMm}
            getPresignedUrl={getPresignedUrl}
            editable={editable}
            draftPlacement={draftPlacement}
            onPlacementDraftChange={onPlacementDraftChange}
            onPlacementDraftCommit={onPlacementDraftCommit}
            onRequestCancelPlacement={onRequestCancelPlacement}
          />,
          pageEl,
        );
      })}
    </>
  );
}

export default PrintChromeLayer;

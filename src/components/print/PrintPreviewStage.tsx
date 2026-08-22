import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  buildSpreadPairs,
  computeFitZoomPercent,
  getPrintPageOuterSizePx,
  pagesInSpread,
  PRINT_SPREAD_GAP_PX,
  spreadIndexForPage,
  type PrintPreviewNavigation,
  type PrintPreviewPageCount,
  type PrintSpreadPair,
} from '@/utils/printPreviewView';
import type { PrintPageSizeId } from '@/utils/printPageLayout';
import { useScrollPointerPan } from '@/hooks/useScrollPointerPan';

type Props = {
  navigation: PrintPreviewNavigation;
  pages: PrintPreviewPageCount;
  firstPageSingle: boolean;
  zoomPercent: number;
  onZoomChange: (next: number) => void;
  pageSizeId: PrintPageSizeId;
  pageStarts: number[];
  contentHeight: number;
  pageInnerHeightPx: number;
  hasCover: boolean;
  coverNode: ReactNode;
  /** Live MdPreview root (`#export-pdf-preview`) lives under this ref. */
  sourceContentRef: RefObject<HTMLElement | null>;
  layoutKey: string;
  /** 0-based spread index (flip mode). */
  flipIndex: number;
  onFlipIndexChange: (next: number) => void;
  /** 1-based logical page numbers currently visible. */
  onVisibleLogicalPagesChange?: (pages: number[]) => void;
};

function BlankPage({ widthPx, heightPx }: { widthPx: number; heightPx: number }) {
  return (
    <div
      data-print-page-slot="1"
      className="shrink-0 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.12)]"
      style={{ width: widthPx, height: heightPx }}
      aria-hidden
    />
  );
}

function CoverPageSlot({
  widthPx,
  heightPx,
  children,
}: {
  widthPx: number;
  heightPx: number;
  children: ReactNode;
}) {
  return (
    <div
      data-print-page-slot="1"
      className="relative shrink-0 overflow-hidden shadow-[0_8px_28px_rgba(15,23,42,0.12)]"
      style={{ width: widthPx, height: heightPx }}
    >
      {children}
    </div>
  );
}

function BodyPageSlot({
  widthPx,
  heightPx,
  pageInnerHeightPx,
  pageStart,
  pageEnd,
  previewHtml,
  layoutKey,
}: {
  widthPx: number;
  heightPx: number;
  pageInnerHeightPx: number;
  pageStart: number;
  pageEnd: number;
  previewHtml: string;
  layoutKey: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    host.innerHTML = previewHtml;
    for (const el of host.querySelectorAll('[id]')) {
      el.removeAttribute('id');
    }
    const root = host.firstElementChild;
    if (root instanceof HTMLElement) {
      root.setAttribute('data-export-pdf-preview', '1');
    }
  }, [layoutKey, previewHtml, pageStart]);

  const innerH = Math.max(1, pageInnerHeightPx);
  const sliceHeight = Math.max(1, pageEnd - pageStart);

  return (
    <div
      data-print-page-slot="1"
      className="relative shrink-0 overflow-hidden bg-white text-gray-900 shadow-[0_8px_28px_rgba(15,23,42,0.12)]"
      style={{
        width: widthPx,
        height: heightPx,
        padding: 'var(--print-page-margin)',
        boxSizing: 'border-box',
      }}
    >
      <div className="relative overflow-hidden" style={{ height: innerH }}>
        <div className="relative overflow-hidden" style={{ height: sliceHeight }}>
          <div
            ref={hostRef}
            className="export-pdf-page-slot-clone origin-top-left"
            style={{ transform: `translateY(-${pageStart}px)` }}
          />
        </div>
      </div>
    </div>
  );
}

function LogicalPageSlot({
  logicalIndex,
  hasCover,
  coverNode,
  pageStarts,
  contentHeight,
  pageInnerHeightPx,
  widthPx,
  heightPx,
  previewHtml,
  layoutKey,
  allowBlank = true,
}: {
  logicalIndex: number | null;
  hasCover: boolean;
  coverNode: ReactNode;
  pageStarts: number[];
  contentHeight: number;
  pageInnerHeightPx: number;
  widthPx: number;
  heightPx: number;
  previewHtml: string;
  layoutKey: string;
  /** When false, null index renders nothing (used for centered first page). */
  allowBlank?: boolean;
}) {
  if (logicalIndex == null) {
    return allowBlank ? <BlankPage widthPx={widthPx} heightPx={heightPx} /> : null;
  }
  if (hasCover && logicalIndex === 0) {
    return (
      <CoverPageSlot widthPx={widthPx} heightPx={heightPx}>
        {coverNode}
      </CoverPageSlot>
    );
  }
  const bodyIndex = logicalIndex - (hasCover ? 1 : 0);
  const pageStart = pageStarts[bodyIndex] ?? 0;
  const pageEnd = pageStarts[bodyIndex + 1] ?? contentHeight;
  return (
    <BodyPageSlot
      widthPx={widthPx}
      heightPx={heightPx}
      pageInnerHeightPx={pageInnerHeightPx}
      pageStart={pageStart}
      pageEnd={pageEnd}
      previewHtml={previewHtml}
      layoutKey={`${layoutKey}:${bodyIndex}`}
    />
  );
}

function SpreadView({
  pair,
  hasCover,
  coverNode,
  pageStarts,
  contentHeight,
  pageInnerHeightPx,
  widthPx,
  heightPx,
  previewHtml,
  layoutKey,
  gapPx,
}: {
  pair: PrintSpreadPair;
  hasCover: boolean;
  coverNode: ReactNode;
  pageStarts: number[];
  contentHeight: number;
  pageInnerHeightPx: number;
  widthPx: number;
  heightPx: number;
  previewHtml: string;
  layoutKey: string;
  gapPx: number;
}) {
  const soloIndex = pair.left ?? pair.right;
  if (pair.centerSingle && soloIndex != null) {
    // Reserve spread width so zoom/fit stays stable vs 2-up rows; center the solo page.
    return (
      <div
        className="flex flex-row items-start justify-center"
        style={{ width: widthPx * 2 + gapPx }}
      >
        <LogicalPageSlot
          logicalIndex={soloIndex}
          hasCover={hasCover}
          coverNode={coverNode}
          pageStarts={pageStarts}
          contentHeight={contentHeight}
          pageInnerHeightPx={pageInnerHeightPx}
          widthPx={widthPx}
          heightPx={heightPx}
          previewHtml={previewHtml}
          layoutKey={layoutKey}
          allowBlank={false}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-row items-start justify-center" style={{ gap: gapPx }}>
      <LogicalPageSlot
        logicalIndex={pair.left}
        hasCover={hasCover}
        coverNode={coverNode}
        pageStarts={pageStarts}
        contentHeight={contentHeight}
        pageInnerHeightPx={pageInnerHeightPx}
        widthPx={widthPx}
        heightPx={heightPx}
        previewHtml={previewHtml}
        layoutKey={layoutKey}
      />
      <LogicalPageSlot
        logicalIndex={pair.right}
        hasCover={hasCover}
        coverNode={coverNode}
        pageStarts={pageStarts}
        contentHeight={contentHeight}
        pageInnerHeightPx={pageInnerHeightPx}
        widthPx={widthPx}
        heightPx={heightPx}
        previewHtml={previewHtml}
        layoutKey={layoutKey}
      />
    </div>
  );
}

function SinglePageView({
  logicalIndex,
  hasCover,
  coverNode,
  pageStarts,
  contentHeight,
  pageInnerHeightPx,
  widthPx,
  heightPx,
  previewHtml,
  layoutKey,
}: {
  logicalIndex: number;
  hasCover: boolean;
  coverNode: ReactNode;
  pageStarts: number[];
  contentHeight: number;
  pageInnerHeightPx: number;
  widthPx: number;
  heightPx: number;
  previewHtml: string;
  layoutKey: string;
}) {
  return (
    <LogicalPageSlot
      logicalIndex={logicalIndex}
      hasCover={hasCover}
      coverNode={coverNode}
      pageStarts={pageStarts}
      contentHeight={contentHeight}
      pageInnerHeightPx={pageInnerHeightPx}
      widthPx={widthPx}
      heightPx={heightPx}
      previewHtml={previewHtml}
      layoutKey={layoutKey}
    />
  );
}

export default function PrintPreviewStage({
  navigation,
  pages,
  firstPageSingle,
  zoomPercent,
  onZoomChange,
  pageSizeId,
  pageStarts,
  contentHeight,
  pageInnerHeightPx,
  hasCover,
  coverNode,
  sourceContentRef,
  layoutKey,
  flipIndex,
  onFlipIndexChange,
  onVisibleLogicalPagesChange,
}: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollListRef = useRef<HTMLDivElement>(null);
  const [scrollPanRoot, setScrollPanRoot] = useState<HTMLDivElement | null>(null);
  const setScrollListRef = useCallback((node: HTMLDivElement | null) => {
    scrollListRef.current = node;
    setScrollPanRoot(node);
  }, []);
  const [previewHtml, setPreviewHtml] = useState('');

  useScrollPointerPan(scrollPanRoot, navigation === 'scroll' && pages === 2);

  const { widthPx, heightPx } = useMemo(
    () => getPrintPageOuterSizePx(pageSizeId),
    [pageSizeId],
  );

  const bodyPageCount = Math.max(1, pageStarts.length);
  const totalLogicalPages = (hasCover ? 1 : 0) + bodyPageCount;

  const pairs = useMemo(() => {
    if (pages === 1) {
      return Array.from({ length: totalLogicalPages }, (_, i) => ({
        left: i,
        right: null as number | null,
      }));
    }
    return buildSpreadPairs(totalLogicalPages, firstPageSingle);
  }, [firstPageSingle, pages, totalLogicalPages]);

  const safeFlipIndex = Math.min(Math.max(0, flipIndex), Math.max(0, pairs.length - 1));

  useLayoutEffect(() => {
    const source = sourceContentRef.current;
    if (!source) {
      setPreviewHtml('');
      return;
    }
    const preview = source.querySelector('#export-pdf-preview');
    setPreviewHtml(preview ? preview.outerHTML : source.innerHTML);
  }, [layoutKey, sourceContentRef, pageStarts, pageInnerHeightPx]);

  // Auto-fit zoom in flip mode when viewport or page geometry changes.
  const onZoomChangeRef = useRef(onZoomChange);
  onZoomChangeRef.current = onZoomChange;

  useLayoutEffect(() => {
    if (navigation !== 'flip') return undefined;
    const el = viewportRef.current;
    if (!el) return undefined;

    const applyFit = () => {
      const rect = el.getBoundingClientRect();
      const next = computeFitZoomPercent({
        viewportWidth: rect.width,
        viewportHeight: rect.height,
        pageWidthPx: widthPx,
        pageHeightPx: heightPx,
        pageCols: pages,
        gapPx: PRINT_SPREAD_GAP_PX,
      });
      onZoomChangeRef.current(next);
    };

    applyFit();
    const observer = new ResizeObserver(applyFit);
    observer.observe(el);
    return () => observer.disconnect();
  }, [heightPx, navigation, pages, widthPx]);

  useEffect(() => {
    if (flipIndex !== safeFlipIndex) onFlipIndexChange(safeFlipIndex);
  }, [flipIndex, onFlipIndexChange, safeFlipIndex]);

  const reportVisible = useCallback(
    (logicalIndices: number[]) => {
      if (!onVisibleLogicalPagesChange) return;
      const pages1 = logicalIndices.map((i) => i + 1);
      onVisibleLogicalPagesChange(pages1.length ? pages1 : [1]);
    },
    [onVisibleLogicalPagesChange],
  );

  useEffect(() => {
    if (navigation === 'flip') {
      const pair = pairs[safeFlipIndex];
      if (!pair) {
        reportVisible([0]);
        return;
      }
      if (pages === 1) {
        reportVisible(pair.left != null ? [pair.left] : [0]);
      } else {
        reportVisible(pagesInSpread(pair));
      }
    }
  }, [navigation, pages, pairs, reportVisible, safeFlipIndex]);

  // Scroll 2-up: track visible spreads from scroll position.
  useEffect(() => {
    if (navigation !== 'scroll' || pages !== 2) return undefined;
    const root = scrollListRef.current;
    if (!root) return undefined;

    const rowH = heightPx + PRINT_SPREAD_GAP_PX;
    const update = () => {
      const scale = zoomPercent / 100;
      const scaledRowH = Math.max(1, rowH * scale);
      const top = root.scrollTop;
      const viewH = root.clientHeight;
      const first = Math.max(0, Math.floor(top / scaledRowH));
      const last = Math.min(pairs.length - 1, Math.floor((top + viewH) / scaledRowH));
      const visible: number[] = [];
      for (let s = first; s <= last; s += 1) {
        const pair = pairs[s];
        if (!pair) continue;
        visible.push(...pagesInSpread(pair));
      }
      reportVisible(visible);
    };
    update();
    root.addEventListener('scroll', update, { passive: true });
    return () => root.removeEventListener('scroll', update);
  }, [heightPx, navigation, pages, pairs, reportVisible, zoomPercent]);

  const goPrev = useCallback(() => {
    onFlipIndexChange(Math.max(0, safeFlipIndex - 1));
  }, [onFlipIndexChange, safeFlipIndex]);

  const goNext = useCallback(() => {
    onFlipIndexChange(Math.min(pairs.length - 1, safeFlipIndex + 1));
  }, [onFlipIndexChange, pairs.length, safeFlipIndex]);

  const goPrevRef = useRef(goPrev);
  const goNextRef = useRef(goNext);
  goPrevRef.current = goPrev;
  goNextRef.current = goNext;
  const canPrev = safeFlipIndex > 0;
  const canNext = safeFlipIndex < pairs.length - 1;

  useEffect(() => {
    if (navigation !== 'flip') return undefined;
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target
        && (target.tagName === 'INPUT'
          || target.tagName === 'TEXTAREA'
          || target.isContentEditable)
      ) {
        return;
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        goPrev();
      } else if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        event.preventDefault();
        goNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev, navigation]);

  // Touch swipe + trackpad horizontal pan (two-finger) for flip.
  useEffect(() => {
    if (navigation !== 'flip') return undefined;
    const root = viewportRef.current;
    if (!root) return undefined;

    const SWIPE_PX = 48;
    const WHEEL_ACCUM = 60;
    let touchStartX = 0;
    let touchStartY = 0;
    let tracking = false;
    let wheelAccumX = 0;

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;
      const t = event.touches[0];
      if (!t) return;
      tracking = true;
      touchStartX = t.clientX;
      touchStartY = t.clientY;
    };
    const onTouchEnd = (event: TouchEvent) => {
      if (!tracking) return;
      tracking = false;
      const t = event.changedTouches[0];
      if (!t) return;
      const dx = t.clientX - touchStartX;
      const dy = t.clientY - touchStartY;
      if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      if (dx < 0) goNextRef.current();
      else goPrevRef.current();
    };
    const onTouchCancel = () => {
      tracking = false;
    };

    const onWheel = (event: WheelEvent) => {
      // Trackpad two-finger horizontal pan / shift+wheel.
      const dominantX =
        Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.1
        || (event.shiftKey && Math.abs(event.deltaY) > 0);
      if (!dominantX) {
        wheelAccumX = 0;
        return;
      }
      event.preventDefault();
      const delta = event.shiftKey && Math.abs(event.deltaX) < 1 ? event.deltaY : event.deltaX;
      wheelAccumX += delta;
      if (Math.abs(wheelAccumX) < WHEEL_ACCUM) return;
      if (wheelAccumX > 0) goNextRef.current();
      else goPrevRef.current();
      wheelAccumX = 0;
    };

    root.addEventListener('touchstart', onTouchStart, { passive: true });
    root.addEventListener('touchend', onTouchEnd, { passive: true });
    root.addEventListener('touchcancel', onTouchCancel, { passive: true });
    root.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      root.removeEventListener('touchstart', onTouchStart);
      root.removeEventListener('touchend', onTouchEnd);
      root.removeEventListener('touchcancel', onTouchCancel);
      root.removeEventListener('wheel', onWheel);
    };
  }, [navigation]);

  const zoomStyle = { zoom: zoomPercent / 100 } as CSSProperties;

  // Click left/right margin (outside page box) to flip.
  const onMarginPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) return;
      const root = viewportRef.current;
      if (!root) return;
      const pageEls = root.querySelectorAll<HTMLElement>('[data-print-page-slot="1"]');
      for (const el of pageEls) {
        const r = el.getBoundingClientRect();
        if (
          event.clientX >= r.left
          && event.clientX <= r.right
          && event.clientY >= r.top
          && event.clientY <= r.bottom
        ) {
          return; // click landed on a page — ignore
        }
      }
      const rect = root.getBoundingClientRect();
      const midX = rect.left + rect.width / 2;
      if (event.clientX < midX) {
        if (canPrev) goPrev();
      } else if (canNext) {
        goNext();
      }
    },
    [canNext, canPrev, goNext, goPrev],
  );

  // Scroll 2-page virtualized list
  if (navigation === 'scroll' && pages === 2) {
    const rowH = heightPx + PRINT_SPREAD_GAP_PX;
    const overscan = 1;
    const scale = zoomPercent / 100;
    return (
      <div
        ref={setScrollListRef}
        className="export-pdf-preview-stage h-full min-h-0 w-full overflow-auto print:hidden"
      >
        <div style={zoomStyle}>
          <div
            className="relative mx-auto"
            style={{
              height: Math.max(rowH, pairs.length * rowH),
              width: widthPx * 2 + PRINT_SPREAD_GAP_PX,
            }}
          >
            <ScrollSpreadWindow
              pairs={pairs}
              rowH={rowH}
              scale={scale}
              scrollRef={scrollListRef}
              overscan={overscan}
              hasCover={hasCover}
              coverNode={coverNode}
              pageStarts={pageStarts}
              contentHeight={contentHeight}
              pageInnerHeightPx={pageInnerHeightPx}
              widthPx={widthPx}
              heightPx={heightPx}
              previewHtml={previewHtml}
              layoutKey={layoutKey}
            />
          </div>
        </div>
      </div>
    );
  }

  // Flip modes
  const pair = pairs[safeFlipIndex] ?? { left: 0, right: null };

  return (
    <div
      ref={viewportRef}
      className="export-pdf-preview-stage relative flex h-full min-h-0 w-full flex-col items-center justify-center overflow-hidden touch-pan-y print:hidden"
      onPointerDown={onMarginPointerDown}
    >
      <div className="pointer-events-none relative z-10 flex min-h-0 w-full flex-1 items-center justify-center overflow-auto p-4">
        <div className="pointer-events-auto" style={zoomStyle}>
          {pages === 1 ? (
            <SinglePageView
              logicalIndex={pair.left ?? 0}
              hasCover={hasCover}
              coverNode={coverNode}
              pageStarts={pageStarts}
              contentHeight={contentHeight}
              pageInnerHeightPx={pageInnerHeightPx}
              widthPx={widthPx}
              heightPx={heightPx}
              previewHtml={previewHtml}
              layoutKey={layoutKey}
            />
          ) : (
            <SpreadView
              pair={pair}
              hasCover={hasCover}
              coverNode={coverNode}
              pageStarts={pageStarts}
              contentHeight={contentHeight}
              pageInnerHeightPx={pageInnerHeightPx}
              widthPx={widthPx}
              heightPx={heightPx}
              previewHtml={previewHtml}
              layoutKey={layoutKey}
              gapPx={PRINT_SPREAD_GAP_PX}
            />
          )}
        </div>
      </div>
      {/* Full-height margin hit affordance (visual chevrons); clicks handled on viewport. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-2 print:hidden">
        <button
          type="button"
          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-700 shadow-sm hover:bg-white disabled:opacity-30 dark:border-odp-borderSoft dark:bg-odp-bgSoft/90 dark:text-odp-fg"
          aria-label="이전 페이지"
          disabled={!canPrev}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-700 shadow-sm hover:bg-white disabled:opacity-30 dark:border-odp-borderSoft dark:bg-odp-bgSoft/90 dark:text-odp-fg"
          aria-label="다음 페이지"
          disabled={!canNext}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

function ScrollSpreadWindow({
  pairs,
  rowH,
  scale,
  scrollRef,
  overscan,
  hasCover,
  coverNode,
  pageStarts,
  contentHeight,
  pageInnerHeightPx,
  widthPx,
  heightPx,
  previewHtml,
  layoutKey,
}: {
  pairs: PrintSpreadPair[];
  rowH: number;
  scale: number;
  scrollRef: RefObject<HTMLDivElement | null>;
  overscan: number;
  hasCover: boolean;
  coverNode: ReactNode;
  pageStarts: number[];
  contentHeight: number;
  pageInnerHeightPx: number;
  widthPx: number;
  heightPx: number;
  previewHtml: string;
  layoutKey: string;
}) {
  const [range, setRange] = useState({ first: 0, last: 2 });

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return undefined;
    const update = () => {
      const scaledRowH = Math.max(1, rowH * scale);
      const top = root.scrollTop;
      const viewH = root.clientHeight;
      const first = Math.max(0, Math.floor(top / scaledRowH) - overscan);
      const last = Math.min(
        pairs.length - 1,
        Math.ceil((top + viewH) / scaledRowH) + overscan,
      );
      setRange((prev) => (prev.first === first && prev.last === last ? prev : { first, last }));
    };
    update();
    root.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(root);
    return () => {
      root.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, [overscan, pairs.length, rowH, scale, scrollRef]);

  const items: ReactNode[] = [];
  for (let i = range.first; i <= range.last; i += 1) {
    const pair = pairs[i];
    if (!pair) continue;
    items.push(
      <div
        key={`spread-${i}`}
        className="absolute left-0 right-0"
        style={{ top: i * rowH, height: heightPx }}
      >
        <SpreadView
          pair={pair}
          hasCover={hasCover}
          coverNode={coverNode}
          pageStarts={pageStarts}
          contentHeight={contentHeight}
          pageInnerHeightPx={pageInnerHeightPx}
          widthPx={widthPx}
          heightPx={heightPx}
          previewHtml={previewHtml}
          layoutKey={layoutKey}
          gapPx={PRINT_SPREAD_GAP_PX}
        />
      </div>,
    );
  }
  return <>{items}</>;
}

/** Resolve 0-based logical page index for a body heading element. */
export function logicalPageIndexForHeading(
  headingEl: HTMLElement,
  paperContentEl: HTMLElement,
  pageStarts: number[],
  hasCover: boolean,
): number {
  const headingRect = headingEl.getBoundingClientRect();
  const paperRect = paperContentEl.getBoundingClientRect();
  const top = headingRect.top - paperRect.top + paperContentEl.scrollTop;
  let bodyIndex = 0;
  for (let i = 0; i < pageStarts.length; i += 1) {
    const start = pageStarts[i] ?? 0;
    const next = pageStarts[i + 1] ?? Number.POSITIVE_INFINITY;
    if (top >= start && top < next) {
      bodyIndex = i;
      break;
    }
    if (top >= start) bodyIndex = i;
  }
  return (hasCover ? 1 : 0) + bodyIndex;
}

export function spreadIndexForLogicalPage(
  logicalPage: number,
  totalLogicalPages: number,
  pages: PrintPreviewPageCount,
  firstPageSingle: boolean,
): number {
  if (pages === 1) return Math.min(Math.max(0, logicalPage), Math.max(0, totalLogicalPages - 1));
  const pairs = buildSpreadPairs(totalLogicalPages, firstPageSingle);
  return spreadIndexForPage(pairs, logicalPage);
}

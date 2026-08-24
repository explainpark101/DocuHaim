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
import { copyPrintMermaidCanvases } from '@/utils/printMermaidCanvas';
import { PRINT_BODY_PAGE_ATTR } from '@/utils/printPagedJs';
import { useScrollPointerPan } from '@/hooks/useScrollPointerPan';

type Props = {
  navigation: PrintPreviewNavigation;
  pages: PrintPreviewPageCount;
  firstPageSingle: boolean;
  zoomPercent: number;
  onZoomChange: (next: number) => void;
  pageSizeId: PrintPageSizeId;
  /** Number of packed body pages (not including cover). */
  bodyPageCount: number;
  /** Host of Paged.js `.pagedjs_page` nodes under `[data-export-pdf-pages]`. */
  pagesHostRef: RefObject<HTMLElement | null>;
  /** Bumps when packed pages are rebuilt. */
  packLayoutKey: string;
  hasCover: boolean;
  coverNode: ReactNode;
  flipIndex: number;
  onFlipIndexChange: (next: number) => void;
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
  bodyIndex,
  pagesHostRef,
  packLayoutKey,
}: {
  widthPx: number;
  heightPx: number;
  bodyIndex: number;
  pagesHostRef: RefObject<HTMLElement | null>;
  packLayoutKey: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const host = hostRef.current;
    const pagesHost = pagesHostRef.current;
    if (!host) return;
    host.replaceChildren();
    if (!pagesHost) return;
    const source = pagesHost.querySelector<HTMLElement>(
      `.pagedjs_page[${PRINT_BODY_PAGE_ATTR}="${bodyIndex}"], [${PRINT_BODY_PAGE_ATTR}="${bodyIndex}"]`,
    );
    if (!source) return;
    const clone = source.cloneNode(true) as HTMLElement;
    copyPrintMermaidCanvases(source, clone);
    for (const el of clone.querySelectorAll('[id]')) {
      el.removeAttribute('id');
    }
    clone.removeAttribute('id');
    clone.style.boxShadow = 'none';
    clone.style.margin = '0';
    host.appendChild(clone);
  }, [bodyIndex, packLayoutKey, pagesHostRef]);

  return (
    <div
      data-print-page-slot="1"
      className="relative shrink-0 overflow-hidden bg-white text-gray-900 shadow-[0_8px_28px_rgba(15,23,42,0.12)]"
      style={{
        width: widthPx,
        height: heightPx,
        boxSizing: 'border-box',
      }}
    >
      <div ref={hostRef} className="export-pdf-page-slot-clone h-full w-full origin-top-left" />
    </div>
  );
}

function LogicalPageSlot({
  logicalIndex,
  hasCover,
  coverNode,
  bodyPageCount,
  pagesHostRef,
  packLayoutKey,
  widthPx,
  heightPx,
  allowBlank = true,
}: {
  logicalIndex: number | null;
  hasCover: boolean;
  coverNode: ReactNode;
  bodyPageCount: number;
  pagesHostRef: RefObject<HTMLElement | null>;
  packLayoutKey: string;
  widthPx: number;
  heightPx: number;
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
  if (bodyIndex < 0 || bodyIndex >= Math.max(1, bodyPageCount)) {
    return <BlankPage widthPx={widthPx} heightPx={heightPx} />;
  }
  return (
    <BodyPageSlot
      widthPx={widthPx}
      heightPx={heightPx}
      bodyIndex={bodyIndex}
      pagesHostRef={pagesHostRef}
      packLayoutKey={packLayoutKey}
    />
  );
}

function SpreadView({
  pair,
  hasCover,
  coverNode,
  bodyPageCount,
  pagesHostRef,
  packLayoutKey,
  widthPx,
  heightPx,
  gapPx,
}: {
  pair: PrintSpreadPair;
  hasCover: boolean;
  coverNode: ReactNode;
  bodyPageCount: number;
  pagesHostRef: RefObject<HTMLElement | null>;
  packLayoutKey: string;
  widthPx: number;
  heightPx: number;
  gapPx: number;
}) {
  const soloIndex = pair.left ?? pair.right;
  if (pair.centerSingle && soloIndex != null) {
    return (
      <div
        className="flex flex-row items-start justify-center"
        style={{ width: widthPx * 2 + gapPx }}
      >
        <LogicalPageSlot
          logicalIndex={soloIndex}
          hasCover={hasCover}
          coverNode={coverNode}
          bodyPageCount={bodyPageCount}
          pagesHostRef={pagesHostRef}
          packLayoutKey={packLayoutKey}
          widthPx={widthPx}
          heightPx={heightPx}
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
        bodyPageCount={bodyPageCount}
        pagesHostRef={pagesHostRef}
        packLayoutKey={packLayoutKey}
        widthPx={widthPx}
        heightPx={heightPx}
      />
      <LogicalPageSlot
        logicalIndex={pair.right}
        hasCover={hasCover}
        coverNode={coverNode}
        bodyPageCount={bodyPageCount}
        pagesHostRef={pagesHostRef}
        packLayoutKey={packLayoutKey}
        widthPx={widthPx}
        heightPx={heightPx}
      />
    </div>
  );
}

function SinglePageView({
  logicalIndex,
  hasCover,
  coverNode,
  bodyPageCount,
  pagesHostRef,
  packLayoutKey,
  widthPx,
  heightPx,
}: {
  logicalIndex: number;
  hasCover: boolean;
  coverNode: ReactNode;
  bodyPageCount: number;
  pagesHostRef: RefObject<HTMLElement | null>;
  packLayoutKey: string;
  widthPx: number;
  heightPx: number;
}) {
  return (
    <LogicalPageSlot
      logicalIndex={logicalIndex}
      hasCover={hasCover}
      coverNode={coverNode}
      bodyPageCount={bodyPageCount}
      pagesHostRef={pagesHostRef}
      packLayoutKey={packLayoutKey}
      widthPx={widthPx}
      heightPx={heightPx}
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
  bodyPageCount,
  pagesHostRef,
  packLayoutKey,
  hasCover,
  coverNode,
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

  useScrollPointerPan(scrollPanRoot, navigation === 'scroll' && pages === 2);

  const { widthPx, heightPx } = useMemo(
    () => getPrintPageOuterSizePx(pageSizeId),
    [pageSizeId],
  );

  const totalLogicalPages = (hasCover ? 1 : 0) + Math.max(1, bodyPageCount);

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

  useEffect(() => {
    if (navigation !== 'flip') return undefined;
    const root = viewportRef.current;
    if (!root) return undefined;

    const SWIPE_PX = 48;
    const WHEEL_ACCUM = 60;
    let touchStartX = 0;
    let touchStartY = 0;
    let wheelAccum = 0;

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      if (!touch) return;
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    };
    const onTouchEnd = (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      if (!touch) return;
      const dx = touch.clientX - touchStartX;
      const dy = touch.clientY - touchStartY;
      if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) < Math.abs(dy)) return;
      if (dx < 0) goNext();
      else goPrev();
    };
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) return;
      if (Math.abs(event.deltaX) < Math.abs(event.deltaY)) return;
      wheelAccum += event.deltaX;
      if (Math.abs(wheelAccum) < WHEEL_ACCUM) return;
      if (wheelAccum > 0) goNext();
      else goPrev();
      wheelAccum = 0;
    };

    root.addEventListener('touchstart', onTouchStart, { passive: true });
    root.addEventListener('touchend', onTouchEnd, { passive: true });
    root.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      root.removeEventListener('touchstart', onTouchStart);
      root.removeEventListener('touchend', onTouchEnd);
      root.removeEventListener('wheel', onWheel);
    };
  }, [goNext, goPrev, navigation]);

  const zoomStyle: CSSProperties = {
    zoom: zoomPercent / 100,
  };

  const onMarginPointerDown = useCallback(
    (event: ReactPointerEvent) => {
      if (event.button !== 0) return;
      const root = viewportRef.current;
      if (!root) return;
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
              bodyPageCount={bodyPageCount}
              pagesHostRef={pagesHostRef}
              packLayoutKey={packLayoutKey}
              widthPx={widthPx}
              heightPx={heightPx}
            />
          </div>
        </div>
      </div>
    );
  }

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
              bodyPageCount={bodyPageCount}
              pagesHostRef={pagesHostRef}
              packLayoutKey={packLayoutKey}
              widthPx={widthPx}
              heightPx={heightPx}
            />
          ) : (
            <SpreadView
              pair={pair}
              hasCover={hasCover}
              coverNode={coverNode}
              bodyPageCount={bodyPageCount}
              pagesHostRef={pagesHostRef}
              packLayoutKey={packLayoutKey}
              widthPx={widthPx}
              heightPx={heightPx}
              gapPx={PRINT_SPREAD_GAP_PX}
            />
          )}
        </div>
      </div>
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
  bodyPageCount,
  pagesHostRef,
  packLayoutKey,
  widthPx,
  heightPx,
}: {
  pairs: PrintSpreadPair[];
  rowH: number;
  scale: number;
  scrollRef: RefObject<HTMLDivElement | null>;
  overscan: number;
  hasCover: boolean;
  coverNode: ReactNode;
  bodyPageCount: number;
  pagesHostRef: RefObject<HTMLElement | null>;
  packLayoutKey: string;
  widthPx: number;
  heightPx: number;
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
        Math.floor((top + viewH) / scaledRowH) + overscan,
      );
      setRange((prev) => (prev.first === first && prev.last === last ? prev : { first, last }));
    };
    update();
    root.addEventListener('scroll', update, { passive: true });
    return () => root.removeEventListener('scroll', update);
  }, [overscan, pairs.length, rowH, scale, scrollRef]);

  const items: ReactNode[] = [];
  for (let i = range.first; i <= range.last; i += 1) {
    const pair = pairs[i];
    if (!pair) continue;
    items.push(
      <div
        key={`spread-${i}`}
        className="absolute left-0"
        style={{ top: i * rowH, height: rowH }}
      >
        <SpreadView
          pair={pair}
          hasCover={hasCover}
          coverNode={coverNode}
          bodyPageCount={bodyPageCount}
          pagesHostRef={pagesHostRef}
          packLayoutKey={packLayoutKey}
          widthPx={widthPx}
          heightPx={heightPx}
          gapPx={PRINT_SPREAD_GAP_PX}
        />
      </div>,
    );
  }
  return <>{items}</>;
}

/** Resolve 0-based logical page index for a heading inside a packed body page. */
export function logicalPageIndexForHeading(
  headingEl: HTMLElement,
  pagesHostEl: HTMLElement,
  hasCover: boolean,
): number {
  const page = headingEl.closest<HTMLElement>(`.pagedjs_page[${PRINT_BODY_PAGE_ATTR}], [${PRINT_BODY_PAGE_ATTR}]`);
  if (page && pagesHostEl.contains(page)) {
    const bodyIndex = Number(page.getAttribute(PRINT_BODY_PAGE_ATTR) ?? '0');
    return (hasCover ? 1 : 0) + (Number.isFinite(bodyIndex) ? bodyIndex : 0);
  }
  const pages = [...pagesHostEl.querySelectorAll<HTMLElement>(`.pagedjs_page[${PRINT_BODY_PAGE_ATTR}], [${PRINT_BODY_PAGE_ATTR}]`)];
  for (let i = 0; i < pages.length; i += 1) {
    const candidate = pages[i];
    if (candidate?.contains(headingEl)) {
      return (hasCover ? 1 : 0) + i;
    }
  }
  return hasCover ? 1 : 0;
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

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import TocResizeHandle from '@/components/TocResizeHandle';
import { useResizablePanelWidth } from '@/hooks/useResizablePanelWidth';

const SIDEBAR_WIDTH_KEY = 's3haim_sidebar_width';
const SIDEBAR_DEFAULT_WIDTH = 400;
/** Collapse to fully closed when pointer-up width is at or below this many vw. */
const SIDEBAR_COLLAPSE_BELOW_VW = 10;
const SIDEBAR_MIN_VW = 10;
const SIDEBAR_MAX_FLOOR_VW = 50;

function vwPx(vw) {
  if (typeof window === 'undefined') return vw * 5;
  return (window.innerWidth * vw) / 100;
}

/** Full untruncated width of an element (ignores truncate/overflow). */
function measureUntruncatedWidth(el) {
  if (!el) return 0;
  const clone = el.cloneNode(true);
  clone.style.cssText = [
    'position:absolute',
    'visibility:hidden',
    'display:inline-block',
    'width:auto',
    'max-width:none',
    'overflow:visible',
    'white-space:nowrap',
    'height:auto',
    'pointer-events:none',
  ].join(';');
  clone.classList?.remove?.('truncate');
  document.body.appendChild(clone);
  const w = clone.getBoundingClientRect().width;
  clone.remove();
  return w;
}

/** Min width so mode brand titles (e.g. "WebDAV Haim") and header controls fit without truncating. */
function measureBrandExpandWidth(panelEl) {
  if (!panelEl) return SIDEBAR_DEFAULT_WIDTH;
  const row = panelEl.querySelector('[data-sidebar-header-row]');
  const brand = panelEl.querySelector('[data-sidebar-brand]');
  if (!row || !brand) return SIDEBAR_DEFAULT_WIDTH;

  const left = panelEl.querySelector('[data-sidebar-header-left]');
  const right = panelEl.querySelector('[data-sidebar-header-right]');
  const brandWidth = measureUntruncatedWidth(brand);
  let leftExtras = 0;
  if (left) {
    left.querySelectorAll('button').forEach((btn) => {
      leftExtras += btn.getBoundingClientRect().width;
    });
    const gap = Number.parseFloat(getComputedStyle(left).gap || '0') || 0;
    const btnCount = left.querySelectorAll('button').length;
    leftExtras += gap * Math.max(0, btnCount); // gap between btn and title
  }
  const rightWidth = right?.getBoundingClientRect().width ?? 0;
  const rowGap = Number.parseFloat(getComputedStyle(row).gap || '0') || 0;
  const rowPadL = Number.parseFloat(getComputedStyle(row.parentElement || row).paddingLeft || '0') || 0;
  const rowPadR = Number.parseFloat(getComputedStyle(row.parentElement || row).paddingRight || '0') || 0;
  const border = 1;
  return Math.ceil(rowPadL + leftExtras + brandWidth + rowGap + rightWidth + rowPadR + border);
}

/** Content-driven max: longest tree row scroll width (filenames can exceed 50vw). */
function measureTreeContentWidth(panelEl) {
  if (!panelEl) return 0;
  let max = 0;
  panelEl.querySelectorAll('[data-tree-node-row], [data-tree-root-drop-zone]').forEach((row) => {
    max = Math.max(max, row.scrollWidth);
  });
  return Math.ceil(max);
}

function computeSidebarBounds(panelEl) {
  const min = Math.max(1, vwPx(SIDEBAR_MIN_VW));
  const collapseBelow = Math.max(min, vwPx(SIDEBAR_COLLAPSE_BELOW_VW));
  const floorMax = vwPx(SIDEBAR_MAX_FLOOR_VW);
  const contentMax = measureTreeContentWidth(panelEl);
  const max = Math.max(floorMax, contentMax, SIDEBAR_DEFAULT_WIDTH);
  return { min, max, collapseBelow };
}

const SidebarContentSlot = memo(function SidebarContentSlot({ children }) {
  return <div className="flex-1 min-h-0 overflow-hidden flex flex-col">{children}</div>;
});

/**
 * Desktop-resizable left sidebar shell. Owns width state so App does not re-render on drag.
 * Mobile: full-bleed overlay only — no width style, no resize handle.
 *
 * Drag range preview down to 0; on pointer-up, width below SIDEBAR_COLLAPSE_BELOW_VW
 * collapses via onRequestCollapse. Committed width stays at least that threshold when not
 * collapsed. Max is max(SIDEBAR_MAX_FLOOR_VW, tree content).
 * Re-expand restores a width where the brand title is fully visible.
 */
export default function ResizableSidebarPanel({
  isMobile = false,
  collapsed = false,
  open = false,
  onRequestCollapse,
  children,
  mobileHeader = null,
}) {
  const panelRef = useRef(null);
  const liveWidthRef = useRef(null);
  const collapsedRef = useRef(collapsed);
  const [snapCollapse, setSnapCollapse] = useState(false);
  const [bounds, setBounds] = useState(() => ({
    min: vwPx(SIDEBAR_MIN_VW),
    max: Math.max(vwPx(SIDEBAR_MAX_FLOOR_VW), SIDEBAR_DEFAULT_WIDTH),
    collapseBelow: vwPx(SIDEBAR_COLLAPSE_BELOW_VW),
  }));

  const refreshBounds = useCallback(() => {
    setBounds(computeSidebarBounds(panelRef.current));
  }, []);

  useEffect(() => {
    collapsedRef.current = collapsed;
    if (collapsed) setSnapCollapse(false);
  }, [collapsed]);

  useEffect(() => {
    refreshBounds();
    window.addEventListener('resize', refreshBounds);
    const panel = panelRef.current;
    const observers = [];

    if (panel && typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => {
        if (!collapsedRef.current) refreshBounds();
      });
      ro.observe(panel);
      observers.push(() => ro.disconnect());
    }

    if (panel && typeof MutationObserver !== 'undefined') {
      const mo = new MutationObserver(() => {
        if (!collapsedRef.current) refreshBounds();
      });
      mo.observe(panel, { childList: true, subtree: true, characterData: true });
      observers.push(() => mo.disconnect());
    }

    return () => {
      window.removeEventListener('resize', refreshBounds);
      observers.forEach((dispose) => dispose());
    };
  }, [refreshBounds]);

  const applyLiveWidth = useCallback(
    (nextWidth) => {
      liveWidthRef.current = nextWidth;
      const el = panelRef.current;
      if (!el || isMobile || collapsed || snapCollapse) return;
      el.style.width = `${nextWidth}px`;
    },
    [collapsed, isMobile, snapCollapse],
  );

  const handleCollapseBelowMin = useCallback(() => {
    setSnapCollapse(true);
    const el = panelRef.current;
    if (el && !isMobile) {
      el.style.width = '0px';
    }
    onRequestCollapse?.();
  }, [isMobile, onRequestCollapse]);

  const {
    width,
    setWidth,
    isResizing,
    handleProps,
  } = useResizablePanelWidth({
    storageKey: SIDEBAR_WIDTH_KEY,
    defaultWidth: SIDEBAR_DEFAULT_WIDTH,
    minWidth: bounds.min,
    collapseBelowWidth: bounds.collapseBelow,
    maxWidth: bounds.max,
    edge: 'left',
    deferReactUpdateUntilEnd: true,
    onLiveWidth: applyLiveWidth,
    onCollapseBelowMin: handleCollapseBelowMin,
  });

  useEffect(() => {
    if (!isResizing) liveWidthRef.current = null;
  }, [isResizing]);

  // When reopening from collapsed, ensure mode brand title is fully visible.
  const wasCollapsedRef = useRef(collapsed);
  useEffect(() => {
    const wasCollapsed = wasCollapsedRef.current;
    wasCollapsedRef.current = collapsed;
    if (isMobile || collapsed || !wasCollapsed) return;

    const applyBrandWidth = () => {
      const brandMin = measureBrandExpandWidth(panelRef.current);
      setWidth((prev) => Math.max(prev, brandMin));
      refreshBounds();
    };

    // Wait a frame so header nodes exist at non-zero layout when expanding.
    const id = window.requestAnimationFrame(applyBrandWidth);
    return () => window.cancelAnimationFrame(id);
  }, [collapsed, isMobile, setWidth, refreshBounds]);

  // Keep committed width inside the current max when viewport shrinks.
  useEffect(() => {
    if (collapsed || isMobile || isResizing) return;
    setWidth((prev) => Math.min(prev, bounds.max));
  }, [bounds.max, collapsed, isMobile, isResizing, setWidth]);

  const showResizeHandle = !isMobile && !collapsed && !snapCollapse;
  const desktopWidth =
    collapsed || snapCollapse
      ? 0
      : isResizing && liveWidthRef.current != null
        ? liveWidthRef.current
        : width;

  return (
    <div
      ref={panelRef}
      className={`
        flex flex-col bg-white dark:bg-odp-bgSoft border-r border-gray-200 dark:border-odp-bgSofter
        ${isMobile && open ? 'z-60' : 'z-40'}
        md:relative md:h-full md:shrink-0
        fixed top-0 left-0 right-0 w-full h-dvh md:max-h-none
        max-md:transition-transform max-md:duration-300 max-md:ease-out
        ${isResizing ? '' : 'md:transition-[width] md:duration-300 md:ease-in-out'}
        ${!isMobile && (collapsed || snapCollapse) ? 'md:overflow-hidden md:border-r-0' : ''}
        ${isMobile && !open ? '-translate-y-full pointer-events-none' : 'translate-y-0'}
      `}
      style={
        isMobile
          ? undefined
          : {
              width: desktopWidth,
              minWidth: 0,
            }
      }
    >
      {mobileHeader}
      <SidebarContentSlot>{children}</SidebarContentSlot>
      {showResizeHandle && (
        <TocResizeHandle
          handleProps={handleProps}
          isResizing={isResizing}
          edge="right"
          visibleOnHover
          label="사이드바 너비 조절"
        />
      )}
    </div>
  );
}

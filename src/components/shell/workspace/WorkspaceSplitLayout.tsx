import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import type { PaneNode, PaneSplit } from '@/utils/workspaceTabs/paneLayout';
import {
  isPaneLeaf,
  PANE_SPLIT_RATIO_MAX,
  PANE_SPLIT_RATIO_MIN,
  resizeSplit,
} from '@/utils/workspaceTabs/paneLayout';
import { lockPaneDragSelection } from '@/utils/workspaceTabs/paneDragSelectLock';
import {
  collectBoundarySnapTargetsFromDom,
  PANE_BOUNDARY_SNAP_PX,
  PANE_SPLIT_DIR_ATTR,
  PANE_SPLIT_HANDLE_ATTR,
  PANE_SPLIT_ROOT_ATTR,
  snapToNearest,
} from '@/utils/workspaceTabs/paneBoundarySnap';
import { PANE_LEAF_ATTR } from '@/utils/workspaceTabs/paneDropGeometry';
import { collectLinkedAlignedSplitIds } from '@/utils/workspaceTabs/paneLayoutNormalize';

export type PaneResizeOpts = {
  /** Alt held — move linked spanning sibling sashes together. */
  linkAligned?: boolean;
};

type WorkspaceSplitLayoutProps = {
  layout: PaneNode;
  onResizeSplit: (splitId: string, ratio: number, opts?: PaneResizeOpts) => void;
  /** Called when a resize gesture ends; `snapped` means the sash hit a magnet. */
  onResizeSplitEnd?: (
    splitId: string,
    snapped: boolean,
    opts?: PaneResizeOpts,
  ) => void;
  renderLeaf: (leafId: string) => ReactNode;
};

type DragVisual = {
  activeId: string;
  snapped: boolean;
  linkedIds: readonly string[];
};

const PaneResizeDragContext = createContext<DragVisual | null>(null);

/**
 * Map pointer to first-child flex ratio so the separator stays under the cursor.
 * Nearby same-axis boundaries magnetically snap.
 */
function ratioFromPointer(
  parent: HTMLElement,
  handle: HTMLElement,
  direction: 'horizontal' | 'vertical',
  clientX: number,
  clientY: number,
): { ratio: number; snapped: boolean } {
  const rect = parent.getBoundingClientRect();
  const style = window.getComputedStyle(parent);
  const gapRaw = direction === 'horizontal' ? style.columnGap || style.gap : style.rowGap || style.gap;
  const gap = Number.parseFloat(gapRaw) || 0;
  const handleRect = handle.getBoundingClientRect();
  const handleSize = direction === 'horizontal' ? handleRect.width : handleRect.height;
  const total =
    (direction === 'horizontal' ? rect.width : rect.height) - handleSize - gap;
  if (total <= 0) return { ratio: 0.5, snapped: false };

  let client = direction === 'horizontal' ? clientX : clientY;

  const root =
    handle.closest(`[${PANE_SPLIT_ROOT_ATTR}]`) ??
    parent.closest(`[${PANE_SPLIT_ROOT_ATTR}]`) ??
    document;

  const targets = collectBoundarySnapTargetsFromDom({
    root,
    direction,
    excludeHandle: handle,
    splitParent: parent,
    leafAttr: PANE_LEAF_ATTR,
  });
  const snapped = snapToNearest(client, targets, PANE_BOUNDARY_SNAP_PX);
  client = snapped.value;

  const offset =
    direction === 'horizontal' ? client - rect.left : client - rect.top;
  const firstSize = offset - handleSize / 2;
  const ratio = Math.min(
    PANE_SPLIT_RATIO_MAX,
    Math.max(PANE_SPLIT_RATIO_MIN, firstSize / total),
  );
  return { ratio, snapped: snapped.snapped };
}

function handleClassName(
  isRow: boolean,
  visual: 'idle' | 'active' | 'snapped' | 'linked',
): string {
  const base = isRow
    ? 'group relative z-10 w-2 shrink-0 cursor-col-resize touch-none select-none'
    : 'group relative z-10 h-2 shrink-0 cursor-row-resize touch-none select-none';
  switch (visual) {
    case 'snapped':
      // Snap magnet: brief yellow feedback (while held in snap range).
      return `${base} bg-amber-400/70 dark:bg-amber-300/60`;
    case 'linked':
      return `${base} bg-blue-500/40 dark:bg-blue-400/35`;
    case 'active':
      return `${base} bg-blue-500/55 dark:bg-blue-400/50`;
    default:
      return `${base} bg-transparent hover:bg-blue-500/35 dark:hover:bg-blue-400/30`;
  }
}

function SplitResizeHandle({
  splitId,
  direction,
  onRatioAtPointer,
  onDragEnd,
}: {
  splitId: string;
  direction: 'horizontal' | 'vertical';
  onRatioAtPointer: (
    clientX: number,
    clientY: number,
    handle: HTMLElement,
    linkAligned: boolean,
  ) => void;
  onDragEnd: (linkAligned: boolean) => void;
}) {
  const dragVisual = useContext(PaneResizeDragContext);
  const isActive = dragVisual?.activeId === splitId;
  const isLinked =
    Boolean(dragVisual) &&
    !isActive &&
    (dragVisual?.linkedIds.includes(splitId) ?? false);
  const visual: 'idle' | 'active' | 'snapped' | 'linked' = isActive
    ? dragVisual?.snapped
      ? 'snapped'
      : 'active'
    : isLinked
      ? dragVisual?.snapped
        ? 'snapped'
        : 'linked'
      : 'idle';

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const handle = e.currentTarget;
    if (!handle.parentElement) return;

    const unlockSelection = lockPaneDragSelection();
    const prevCursor = document.body.style.cursor;
    document.body.style.cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize';

    let lastLinkAligned = e.altKey;
    onRatioAtPointer(e.clientX, e.clientY, handle, lastLinkAligned);

    const onMove = (ev: PointerEvent) => {
      ev.preventDefault();
      try {
        window.getSelection()?.removeAllRanges();
      } catch {
        // ignore
      }
      lastLinkAligned = ev.altKey;
      onRatioAtPointer(ev.clientX, ev.clientY, handle, lastLinkAligned);
    };

    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      unlockSelection();
      document.body.style.cursor = prevCursor;
      onDragEnd(lastLinkAligned);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  };

  const isRow = direction === 'horizontal';
  return (
    <div
      role="separator"
      aria-orientation={isRow ? 'vertical' : 'horizontal'}
      aria-label="페인 크기 조절"
      {...{
        [PANE_SPLIT_HANDLE_ATTR]: splitId,
        [PANE_SPLIT_DIR_ATTR]: direction,
      }}
      data-pane-split-snapped={visual === 'snapped' ? '1' : undefined}
      data-pane-split-linked={isLinked || (isActive && (dragVisual?.linkedIds.length ?? 0) > 1) ? '1' : undefined}
      className={handleClassName(isRow, visual)}
      onPointerDown={onPointerDown}
    />
  );
}

function SplitNode({
  node,
  layoutRoot,
  onResizeSplit,
  onResizeSplitEnd,
  onDragVisual,
  renderLeaf,
}: {
  node: PaneSplit;
  layoutRoot: PaneNode;
  onResizeSplit: (splitId: string, ratio: number, opts?: PaneResizeOpts) => void;
  onResizeSplitEnd?: (
    splitId: string,
    snapped: boolean,
    opts?: PaneResizeOpts,
  ) => void;
  onDragVisual: (visual: DragVisual | null) => void;
  renderLeaf: (leafId: string) => ReactNode;
}) {
  const snappedRef = useRef(false);
  const linkAlignedRef = useRef(false);

  const handleRatioAtPointer = useCallback(
    (clientX: number, clientY: number, handle: HTMLElement, linkAligned: boolean) => {
      const parent = handle.parentElement;
      if (!parent) return;
      const { ratio, snapped: isSnapped } = ratioFromPointer(
        parent,
        handle,
        node.direction,
        clientX,
        clientY,
      );
      snappedRef.current = isSnapped;
      linkAlignedRef.current = linkAligned;
      const linkedIds = linkAligned
        ? collectLinkedAlignedSplitIds(layoutRoot, node.id)
        : [node.id];
      onDragVisual({
        activeId: node.id,
        snapped: isSnapped,
        linkedIds,
      });
      onResizeSplit(node.id, ratio, { linkAligned });
    },
    [layoutRoot, node.direction, node.id, onDragVisual, onResizeSplit],
  );

  const handleDragEnd = useCallback(
    (linkAligned: boolean) => {
      const wasSnapped = snappedRef.current;
      snappedRef.current = false;
      linkAlignedRef.current = false;
      onDragVisual(null);
      onResizeSplitEnd?.(node.id, wasSnapped, { linkAligned });
    },
    [node.id, onDragVisual, onResizeSplitEnd],
  );

  const isRow = node.direction === 'horizontal';
  const firstFlex = Math.max(PANE_SPLIT_RATIO_MIN, Math.min(PANE_SPLIT_RATIO_MAX, node.ratio));
  const secondFlex = Math.max(PANE_SPLIT_RATIO_MIN, 1 - firstFlex);

  return (
    <div
      className={`flex min-h-0 min-w-0 flex-1 gap-1.5 overflow-hidden ${isRow ? 'flex-row' : 'flex-col'}`}
      data-pane-split-id={node.id}
      data-pane-split-direction={node.direction}
    >
      <div
        className="flex min-h-0 min-w-0 flex-col overflow-hidden"
        style={{ flex: `${firstFlex} 1 0%` }}
      >
        <SplitLayoutBranch
          key={node.children[0].id}
          layout={node.children[0]}
          layoutRoot={layoutRoot}
          onResizeSplit={onResizeSplit}
          {...(onResizeSplitEnd ? { onResizeSplitEnd } : {})}
          onDragVisual={onDragVisual}
          renderLeaf={renderLeaf}
        />
      </div>
      <SplitResizeHandle
        splitId={node.id}
        direction={node.direction}
        onRatioAtPointer={handleRatioAtPointer}
        onDragEnd={handleDragEnd}
      />
      <div
        className="flex min-h-0 min-w-0 flex-col overflow-hidden"
        style={{ flex: `${secondFlex} 1 0%` }}
      >
        <SplitLayoutBranch
          key={node.children[1].id}
          layout={node.children[1]}
          layoutRoot={layoutRoot}
          onResizeSplit={onResizeSplit}
          {...(onResizeSplitEnd ? { onResizeSplitEnd } : {})}
          onDragVisual={onDragVisual}
          renderLeaf={renderLeaf}
        />
      </div>
    </div>
  );
}

function SplitLayoutBranch({
  layout,
  layoutRoot,
  onResizeSplit,
  onResizeSplitEnd,
  onDragVisual,
  renderLeaf,
}: {
  layout: PaneNode;
  layoutRoot: PaneNode;
  onResizeSplit: (splitId: string, ratio: number, opts?: PaneResizeOpts) => void;
  onResizeSplitEnd?: (
    splitId: string,
    snapped: boolean,
    opts?: PaneResizeOpts,
  ) => void;
  onDragVisual: (visual: DragVisual | null) => void;
  renderLeaf: (leafId: string) => ReactNode;
}) {
  if (isPaneLeaf(layout)) {
    return (
      <div
        key={layout.id}
        className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden"
      >
        {renderLeaf(layout.id)}
      </div>
    );
  }
  return (
    <SplitNode
      key={layout.id}
      node={layout}
      layoutRoot={layoutRoot}
      onResizeSplit={onResizeSplit}
      {...(onResizeSplitEnd ? { onResizeSplitEnd } : {})}
      onDragVisual={onDragVisual}
      renderLeaf={renderLeaf}
    />
  );
}

/**
 * Recursive split content tree. Tab strip stays outside — only pane bodies here.
 * Each split node owns one independent resize boundary by default.
 * Hold Alt to link spanning sibling sashes; nearby boundaries still snap
 * (yellow while magnetized) without merging handles unless Alt was held.
 */
export default function WorkspaceSplitLayout({
  layout,
  onResizeSplit,
  onResizeSplitEnd,
  renderLeaf,
}: WorkspaceSplitLayoutProps) {
  const [dragVisual, setDragVisual] = useState<DragVisual | null>(null);

  return (
    <PaneResizeDragContext.Provider value={dragVisual}>
      <SplitLayoutBranch
        key={layout.id}
        layout={layout}
        layoutRoot={layout}
        onResizeSplit={onResizeSplit}
        {...(onResizeSplitEnd ? { onResizeSplitEnd } : {})}
        onDragVisual={setDragVisual}
        renderLeaf={renderLeaf}
      />
    </PaneResizeDragContext.Provider>
  );
}

export function applySplitResize(
  layout: PaneNode,
  splitId: string,
  ratio: number,
): PaneNode {
  return resizeSplit(layout, splitId, ratio);
}

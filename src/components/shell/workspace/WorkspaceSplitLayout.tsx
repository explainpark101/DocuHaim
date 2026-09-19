import { useCallback, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import type { PaneNode, PaneSplit } from '@/utils/workspaceTabs/paneLayout';
import {
  isPaneLeaf,
  resizeSplit,
  PANE_SPLIT_RATIO_MAX,
  PANE_SPLIT_RATIO_MIN,
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

type WorkspaceSplitLayoutProps = {
  layout: PaneNode;
  onResizeSplit: (splitId: string, ratio: number) => void;
  renderLeaf: (leafId: string) => ReactNode;
};

/**
 * Map pointer to first-child flex ratio so the separator stays under the cursor.
 * Each split handle only updates its own split id (boundaries stay independent).
 * Nearby same-axis boundaries (other handles / outside leaf edges) magnetically snap.
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

function SplitResizeHandle({
  splitId,
  direction,
  onRatioAtPointer,
  onDragEnd,
  snapped,
}: {
  splitId: string;
  direction: 'horizontal' | 'vertical';
  onRatioAtPointer: (clientX: number, clientY: number, handle: HTMLElement) => void;
  onDragEnd: () => void;
  snapped: boolean;
}) {
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const handle = e.currentTarget;
    if (!handle.parentElement) return;

    const unlockSelection = lockPaneDragSelection();
    const prevCursor = document.body.style.cursor;
    document.body.style.cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize';

    onRatioAtPointer(e.clientX, e.clientY, handle);

    const onMove = (ev: PointerEvent) => {
      ev.preventDefault();
      try {
        window.getSelection()?.removeAllRanges();
      } catch {
        // ignore
      }
      onRatioAtPointer(ev.clientX, ev.clientY, handle);
    };

    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      unlockSelection();
      document.body.style.cursor = prevCursor;
      onDragEnd();
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
      data-pane-split-snapped={snapped ? '1' : undefined}
      className={
        isRow
          ? `group relative z-10 w-2 shrink-0 cursor-col-resize touch-none select-none ${
              snapped
                ? 'bg-blue-500/55 dark:bg-blue-400/50'
                : 'bg-transparent hover:bg-blue-500/35 dark:hover:bg-blue-400/30'
            }`
          : `group relative z-10 h-2 shrink-0 cursor-row-resize touch-none select-none ${
              snapped
                ? 'bg-blue-500/55 dark:bg-blue-400/50'
                : 'bg-transparent hover:bg-blue-500/35 dark:hover:bg-blue-400/30'
            }`
      }
      onPointerDown={onPointerDown}
    />
  );
}

function SplitNode({
  node,
  onResizeSplit,
  renderLeaf,
}: {
  node: PaneSplit;
  onResizeSplit: (splitId: string, ratio: number) => void;
  renderLeaf: (leafId: string) => ReactNode;
}) {
  const [snapped, setSnapped] = useState(false);

  const handleRatioAtPointer = useCallback(
    (clientX: number, clientY: number, handle: HTMLElement) => {
      const parent = handle.parentElement;
      if (!parent) return;
      const { ratio, snapped: isSnapped } = ratioFromPointer(
        parent,
        handle,
        node.direction,
        clientX,
        clientY,
      );
      setSnapped(isSnapped);
      // Only this split's ratio changes — other boundaries stay independent.
      onResizeSplit(node.id, ratio);
    },
    [node.direction, node.id, onResizeSplit],
  );

  const clearSnapped = useCallback(() => {
    setSnapped(false);
  }, []);

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
        <WorkspaceSplitLayout
          layout={node.children[0]}
          onResizeSplit={onResizeSplit}
          renderLeaf={renderLeaf}
        />
      </div>
      <SplitResizeHandle
        splitId={node.id}
        direction={node.direction}
        onRatioAtPointer={handleRatioAtPointer}
        onDragEnd={clearSnapped}
        snapped={snapped}
      />
      <div
        className="flex min-h-0 min-w-0 flex-col overflow-hidden"
        style={{ flex: `${secondFlex} 1 0%` }}
      >
        <WorkspaceSplitLayout
          layout={node.children[1]}
          onResizeSplit={onResizeSplit}
          renderLeaf={renderLeaf}
        />
      </div>
    </div>
  );
}

/**
 * Recursive split content tree. Tab strip stays outside — only pane bodies here.
 * Each split node owns one independent resize boundary; nearby boundaries snap
 * when the pointer approaches (leaf-agnostic, whole workspace).
 */
export default function WorkspaceSplitLayout({
  layout,
  onResizeSplit,
  renderLeaf,
}: WorkspaceSplitLayoutProps) {
  if (isPaneLeaf(layout)) {
    return (
      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {renderLeaf(layout.id)}
      </div>
    );
  }
  return (
    <SplitNode node={layout} onResizeSplit={onResizeSplit} renderLeaf={renderLeaf} />
  );
}

export function applySplitResize(
  layout: PaneNode,
  splitId: string,
  ratio: number,
): PaneNode {
  return resizeSplit(layout, splitId, ratio);
}

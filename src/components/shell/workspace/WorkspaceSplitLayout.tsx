import { useCallback, useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import type { PaneNode, PaneSplit } from '@/utils/workspaceTabs/paneLayout';
import { isPaneLeaf, resizeSplit } from '@/utils/workspaceTabs/paneLayout';

type WorkspaceSplitLayoutProps = {
  layout: PaneNode;
  onResizeSplit: (splitId: string, ratio: number) => void;
  renderLeaf: (leafId: string) => ReactNode;
  /** Leaf ids that should show the amber appear glow. */
  freshPaneIds?: ReadonlySet<string>;
};

function SplitResizeHandle({
  direction,
  onRatioDelta,
}: {
  direction: 'horizontal' | 'vertical';
  onRatioDelta: (deltaFraction: number, containerSize: number) => void;
}) {
  const startRef = useRef<{ pos: number; size: number } | null>(null);
  const prevUserSelectRef = useRef<string | null>(null);

  const unlockUserSelect = () => {
    if (prevUserSelectRef.current == null) return;
    document.body.style.userSelect = prevUserSelectRef.current;
    prevUserSelectRef.current = null;
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const parent = e.currentTarget.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    const size = direction === 'horizontal' ? rect.width : rect.height;
    startRef.current = {
      pos: direction === 'horizontal' ? e.clientX : e.clientY,
      size,
    };
    prevUserSelectRef.current = document.body.style.userSelect;
    document.body.style.userSelect = 'none';
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!startRef.current) return;
    const pos = direction === 'horizontal' ? e.clientX : e.clientY;
    const deltaPx = pos - startRef.current.pos;
    startRef.current = { ...startRef.current, pos };
    if (startRef.current.size <= 0) return;
    onRatioDelta(deltaPx / startRef.current.size, startRef.current.size);
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    startRef.current = null;
    unlockUserSelect();
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const isRow = direction === 'horizontal';
  return (
    <div
      role="separator"
      aria-orientation={isRow ? 'vertical' : 'horizontal'}
      aria-label="페인 크기 조절"
      className={
        isRow
          ? 'group relative z-10 w-2 shrink-0 cursor-col-resize touch-none select-none bg-transparent hover:bg-blue-500/35 dark:hover:bg-blue-400/30'
          : 'group relative z-10 h-2 shrink-0 cursor-row-resize touch-none select-none bg-transparent hover:bg-blue-500/35 dark:hover:bg-blue-400/30'
      }
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    />
  );
}

function SplitNode({
  node,
  onResizeSplit,
  renderLeaf,
  freshPaneIds,
}: {
  node: PaneSplit;
  onResizeSplit: (splitId: string, ratio: number) => void;
  renderLeaf: (leafId: string) => ReactNode;
  freshPaneIds?: ReadonlySet<string>;
}) {
  const ratioRef = useRef(node.ratio);
  ratioRef.current = node.ratio;

  const handleDelta = useCallback(
    (deltaFraction: number) => {
      onResizeSplit(node.id, ratioRef.current + deltaFraction);
    },
    [node.id, onResizeSplit],
  );

  const isRow = node.direction === 'horizontal';
  const firstFlex = Math.max(0.05, Math.min(0.95, node.ratio));
  const secondFlex = Math.max(0.05, 1 - firstFlex);

  return (
    <div
      className={`flex min-h-0 min-w-0 flex-1 gap-1.5 overflow-hidden ${isRow ? 'flex-row' : 'flex-col'}`}
    >
      <div
        className="flex min-h-0 min-w-0 flex-col overflow-hidden"
        style={{ flex: `${firstFlex} 1 0%` }}
      >
        <WorkspaceSplitLayout
          layout={node.children[0]}
          onResizeSplit={onResizeSplit}
          renderLeaf={renderLeaf}
          {...(freshPaneIds ? { freshPaneIds } : {})}
        />
      </div>
      <SplitResizeHandle direction={node.direction} onRatioDelta={handleDelta} />
      <div
        className="flex min-h-0 min-w-0 flex-col overflow-hidden"
        style={{ flex: `${secondFlex} 1 0%` }}
      >
        <WorkspaceSplitLayout
          layout={node.children[1]}
          onResizeSplit={onResizeSplit}
          renderLeaf={renderLeaf}
          {...(freshPaneIds ? { freshPaneIds } : {})}
        />
      </div>
    </div>
  );
}

/**
 * Recursive split content tree. Tab strip stays outside — only pane bodies here.
 */
export default function WorkspaceSplitLayout({
  layout,
  onResizeSplit,
  renderLeaf,
  freshPaneIds,
}: WorkspaceSplitLayoutProps) {
  if (isPaneLeaf(layout)) {
    const isFresh = Boolean(freshPaneIds?.has(layout.id));
    return (
      <div
        className={`relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-t-lg bg-white shadow-sm ring-1 ring-black/8 dark:bg-odp-bgSofter dark:ring-white/10 ${
          isFresh ? 'workspace-pane-appear-glow' : ''
        }`}
        data-pane-leaf={layout.id}
      >
        {renderLeaf(layout.id)}
      </div>
    );
  }
  return (
    <SplitNode
      node={layout}
      onResizeSplit={onResizeSplit}
      renderLeaf={renderLeaf}
      {...(freshPaneIds ? { freshPaneIds } : {})}
    />
  );
}

export function applySplitResize(
  layout: PaneNode,
  splitId: string,
  ratio: number,
): PaneNode {
  return resizeSplit(layout, splitId, ratio);
}

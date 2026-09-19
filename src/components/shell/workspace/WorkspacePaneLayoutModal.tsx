import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AnimatePresence, motion as Motion } from 'motion/react';
import { Columns2, GripVertical, RotateCcw, Rows2 } from 'lucide-react';
import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import Modal from '@/components/modals/Modal';
import {
  collectLeaves,
  isPaneLeaf,
  isPaneSplit,
  type PaneNode,
  type PaneSplit,
} from '@/utils/workspaceTabs/paneLayout';
import {
  applyFlipToDraft,
  applyLeafOrderToDraft,
  draftFromLayout,
  type PaneLayoutDraft,
} from '@/utils/workspaceTabs/paneLayoutEdit';
import { tabDisplayTitle, type WorkspaceTab } from '@/utils/workspaceTabs';

type WorkspacePaneLayoutModalProps = {
  open: boolean;
  onClose: () => void;
  layout: PaneNode;
  tabs: WorkspaceTab[];
  onApply: (layout: PaneNode) => void;
};

function leafLabel(
  leafId: string,
  layout: PaneNode,
  byTabId: Map<string, WorkspaceTab>,
): string {
  const leaf = collectLeaves(layout).find((l) => l.id === leafId);
  if (!leaf) return leafId;
  const titles = leaf.tabIds
    .map((id) => byTabId.get(id))
    .filter(Boolean)
    .map((t) => tabDisplayTitle(t!));
  if (titles.length === 0) return '빈 페인';
  if (titles.length === 1) return titles[0]!;
  return `${titles[0]} 외 ${titles.length - 1}`;
}

function PreviewTree({
  node,
  byTabId,
  onFlipSplit,
}: {
  node: PaneNode;
  byTabId: Map<string, WorkspaceTab>;
  onFlipSplit: (splitId: string) => void;
}) {
  if (isPaneLeaf(node)) {
    const titles = node.tabIds
      .map((id) => byTabId.get(id))
      .filter(Boolean)
      .map((t) => tabDisplayTitle(t!));
    return (
      <Motion.div
        layout
        className="flex min-h-16 min-w-0 flex-1 flex-col justify-center rounded-md border border-blue-200/80 bg-blue-50/80 px-2 py-1.5 dark:border-blue-400/30 dark:bg-blue-950/40"
      >
        <p className="truncate text-xs font-medium text-gray-800 dark:text-odp-fgStrong">
          {titles[0] ?? '빈 페인'}
        </p>
        {titles.length > 1 ? (
          <p className="truncate text-[10px] text-gray-500 dark:text-odp-muted">
            +{titles.length - 1} 탭
          </p>
        ) : null}
      </Motion.div>
    );
  }

  const split = node as PaneSplit;
  const isRow = split.direction === 'horizontal';
  return (
    <Motion.div
      layout
      className={`flex min-h-0 min-w-0 flex-1 gap-1 ${isRow ? 'flex-row' : 'flex-col'}`}
    >
      <div
        className="min-h-0 min-w-0"
        style={
          isRow
            ? { flex: `${split.ratio} 1 0%` }
            : { flex: `${split.ratio} 1 0%` }
        }
      >
        <PreviewTree node={split.children[0]} byTabId={byTabId} onFlipSplit={onFlipSplit} />
      </div>
      <button
        type="button"
        title="분할 방향 전환"
        aria-label="분할 방향 전환"
        className="flex shrink-0 items-center justify-center self-stretch rounded border border-dashed border-gray-300 bg-white/80 px-0.5 text-gray-500 hover:border-blue-400 hover:text-blue-600 dark:border-odp-borderSoft dark:bg-odp-surface/80 dark:hover:border-blue-400 dark:hover:text-blue-400"
        onClick={() => onFlipSplit(split.id)}
      >
        {isRow ? <Columns2 size={12} aria-hidden /> : <Rows2 size={12} aria-hidden />}
      </button>
      <div
        className="min-h-0 min-w-0"
        style={
          isRow
            ? { flex: `${1 - split.ratio} 1 0%` }
            : { flex: `${1 - split.ratio} 1 0%` }
        }
      >
        <PreviewTree node={split.children[1]} byTabId={byTabId} onFlipSplit={onFlipSplit} />
      </div>
    </Motion.div>
  );
}

function SortableLeafRow({
  id,
  label,
  index,
}: {
  id: string;
  label: string;
  index: number;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });
  const style: CSSProperties = {
    ...(transform ? { transform: CSS.Transform.toString(transform) ?? undefined } : {}),
    ...(transition ? { transition } : {}),
    opacity: isDragging ? 0.55 : 1,
  };
  return (
    <Motion.li
      layout
      ref={setNodeRef}
      style={style as never}
      className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-2 py-2 dark:border-odp-borderSoft dark:bg-odp-surface"
    >
      <button
        type="button"
        className="shrink-0 cursor-grab touch-none rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 active:cursor-grabbing dark:hover:bg-odp-focusBg dark:hover:text-odp-fg"
        aria-label="순서 변경"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={14} aria-hidden />
      </button>
      <span className="w-5 shrink-0 text-center text-[10px] font-medium text-gray-400">
        {index + 1}
      </span>
      <span className="min-w-0 flex-1 truncate text-sm text-gray-800 dark:text-odp-fgStrong">
        {label}
      </span>
    </Motion.li>
  );
}

function collectSplitNodes(node: PaneNode): PaneSplit[] {
  if (isPaneLeaf(node)) return [];
  return [node, ...collectSplitNodes(node.children[0]), ...collectSplitNodes(node.children[1])];
}

export default function WorkspacePaneLayoutModal({
  open,
  onClose,
  layout,
  tabs,
  onApply,
}: WorkspacePaneLayoutModalProps) {
  const [draft, setDraft] = useState<PaneLayoutDraft>(() => draftFromLayout(layout));
  const byTabId = useMemo(() => new Map(tabs.map((t) => [t.id, t])), [tabs]);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  useEffect(() => {
    if (open) setDraft(draftFromLayout(layout));
  }, [open, layout]);

  const splits = useMemo(() => collectSplitNodes(draft.layout), [draft.layout]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = draft.leafOrder.indexOf(String(active.id));
    const newIndex = draft.leafOrder.indexOf(String(over.id));
    if (oldIndex < 0 || newIndex < 0) return;
    const nextOrder = arrayMove(draft.leafOrder, oldIndex, newIndex);
    setDraft(applyLeafOrderToDraft(draft, nextOrder));
  };

  const handleApply = () => {
    onApply(draft.layout);
    onClose();
  };

  const handleReset = () => {
    setDraft(draftFromLayout(layout));
  };

  let body: ReactNode = null;
  if (open) {
    body = (
      <div className="flex flex-col gap-4 p-4">
        <div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-odp-fgStrong">
            분할 레이아웃 조절
          </h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-odp-muted">
            페인 순서를 드래그해 바꾸고, 미리보기의 구분선을 눌러 방향을 전환한 뒤 적용하세요.
          </p>
        </div>

        <div className="h-44 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-2 dark:border-odp-borderSoft dark:bg-odp-bgSoft">
          <AnimatePresence mode="popLayout">
            <PreviewTree
              key={draft.leafOrder.join('|') + splits.map((s) => s.direction).join(',')}
              node={draft.layout}
              byTabId={byTabId}
              onFlipSplit={(splitId) => setDraft((d) => applyFlipToDraft(d, splitId))}
            />
          </AnimatePresence>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={draft.leafOrder} strategy={verticalListSortingStrategy}>
            <ul className="flex flex-col gap-1.5">
              {draft.leafOrder.map((id, index) => (
                <SortableLeafRow
                  key={id}
                  id={id}
                  index={index}
                  label={leafLabel(id, draft.layout, byTabId)}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>

        {isPaneSplit(draft.layout) ? (
          <p className="text-[11px] text-gray-500 dark:text-odp-muted">
            분할 {splits.length}곳 · 페인 {draft.leafOrder.length}개
          </p>
        ) : null}

        <div className="flex items-center justify-between gap-2 border-t border-gray-200 pt-3 dark:border-odp-borderSoft">
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100 dark:text-odp-muted dark:hover:bg-odp-focusBg"
            onClick={handleReset}
          >
            <RotateCcw size={12} aria-hidden />
            초기화
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-md px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 dark:text-odp-fg dark:hover:bg-odp-focusBg"
              onClick={onClose}
            >
              취소
            </button>
            <button
              type="button"
              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={handleApply}
            >
              적용
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      onConfirm={handleApply}
      ignoreEnterInFields
      contentClassName="z-100010 max-h-[90vh] w-[min(92vw,420px)] overflow-y-auto"
      resizable={false}
    >
      {body}
    </Modal>
  );
}

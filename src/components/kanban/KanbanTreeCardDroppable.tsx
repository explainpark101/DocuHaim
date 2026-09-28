import { createPortal } from 'react-dom';
import { useDroppable } from '@dnd-kit/core';
import { LayoutGrid, Link2 } from 'lucide-react';
import { KANBAN_TREE_CARD_DROPPABLE_ID } from '@/utils/kanban/kanbanTreeCardDrop';

export type KanbanTreeCardDroppableProps = {
  host: HTMLElement | null;
  enabled?: boolean;
};

/**
 * Droppable registered inside Sidebar DndContext but portaled onto the kanban
 * board so Ctrl/Cmd tree drags can add linked cards.
 */
export default function KanbanTreeCardDroppable({
  host,
  enabled = true,
}: KanbanTreeCardDroppableProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: KANBAN_TREE_CARD_DROPPABLE_ID,
    data: { type: 'kanban-tree-card' },
    disabled: !enabled || !host,
  });

  if (!host || !enabled) return null;

  return createPortal(
    <div
      ref={setNodeRef}
      className={`pointer-events-none absolute inset-0 z-40 flex flex-col p-2 sm:p-3 ${
        isOver
          ? 'bg-sky-200/55 dark:bg-sky-950/55'
          : 'bg-sky-100/35 dark:bg-sky-950/30'
      }`}
      data-kanban-tree-card-drop
      aria-hidden
    >
      <div
        className={`flex min-h-0 flex-1 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 text-center transition-colors ${
          isOver
            ? 'border-sky-500 bg-white/55 dark:border-sky-400 dark:bg-odp-bgSoft/55'
            : 'border-sky-400/75 bg-white/25 dark:border-sky-600/70 dark:bg-odp-bgSoft/25'
        }`}
      >
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full ${
            isOver
              ? 'bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300'
              : 'bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400'
          }`}
        >
          <LayoutGrid size={24} aria-hidden />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
            {isOver ? '놓아서 카드 추가' : '칸반에 카드 추가'}
          </p>
          <p className="flex items-center justify-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
            <Link2 size={13} aria-hidden />
            Ctrl/Cmd+드래그로 파일을 연결한 카드를 만듭니다
          </p>
        </div>
      </div>
    </div>,
    host,
  );
}

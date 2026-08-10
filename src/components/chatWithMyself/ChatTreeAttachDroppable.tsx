import { createPortal } from 'react-dom';
import { useDroppable } from '@dnd-kit/core';
import { Link2, Share2 } from 'lucide-react';
import { CHAT_TREE_ATTACH_DROPPABLE_ID } from '@/utils/chatWithMyself/treeAttachDrop';

export type ChatTreeAttachDroppableProps = {
  /** Chat pane host element (must be position:relative). */
  host: HTMLElement | null;
  enabled?: boolean;
};

/**
 * Droppable registered inside Sidebar DndContext but portaled onto the chat pane
 * so tree drags can share vault files as note links (same as note → chat share).
 * Only mount while a tree drag is active.
 *
 * Keep z below Sidebar DragOverlay (100060) so the tree item preview stays on top.
 * Background opacity stays at most 60%.
 */
export default function ChatTreeAttachDroppable({
  host,
  enabled = true,
}: ChatTreeAttachDroppableProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: CHAT_TREE_ATTACH_DROPPABLE_ID,
    data: { type: 'chat-tree-share' },
    disabled: !enabled || !host,
  });

  if (!host || !enabled) return null;

  return createPortal(
    <div
      ref={setNodeRef}
      className={`pointer-events-none absolute inset-0 z-40 flex flex-col p-3 sm:p-4 ${
        isOver
          ? 'bg-[#b9cfe0]/60 dark:bg-[#0b1220]/60'
          : 'bg-[#b9cfe0]/40 dark:bg-[#0b1220]/40'
      }`}
      data-chat-tree-attach-drop
      aria-hidden
    >
      <div
        className={`flex min-h-0 flex-1 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 text-center transition-colors ${
          isOver
            ? 'border-blue-500 bg-white/50 dark:border-blue-400 dark:bg-odp-bgSoft/50'
            : 'border-blue-400/80 bg-white/30 dark:border-blue-600/70 dark:bg-odp-bgSoft/30'
        }`}
      >
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full ${
            isOver
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
              : 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
          }`}
        >
          <Share2 size={28} aria-hidden />
        </div>
        <div className="space-y-1.5">
          <p className="text-base font-semibold text-gray-800 dark:text-odp-fgStrong sm:text-lg">
            {isOver ? '놓아서 입력란에 추가' : '입력란에 노트·폴더 링크 추가'}
          </p>
          <p className="flex items-center justify-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
            <Link2 size={14} aria-hidden />
            사이드바 파일·폴더를 끌어다 놓고 메시지와 함께 보내세요
          </p>
        </div>
      </div>
    </div>,
    host,
  );
}

import { createPortal } from 'react-dom';
import { useDroppable } from '@dnd-kit/core';
import { FilePlus2, Files } from 'lucide-react';
import { LLM_ASSIST_REFERENCE_DROPPABLE_ID } from '@/utils/llm/llmAssistReferenceDrop';

export type LlmAssistTreeReferenceDroppableProps = {
  /** Chat panel host (position:relative). */
  host: HTMLElement | null;
  enabled?: boolean;
};

/**
 * Droppable registered in Sidebar DndContext, portaled onto LLM Assist chat.
 * Mount only while a tree drag is active and assist chat is ready.
 */
export default function LlmAssistTreeReferenceDroppable({
  host,
  enabled = true,
}: LlmAssistTreeReferenceDroppableProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: LLM_ASSIST_REFERENCE_DROPPABLE_ID,
    data: { type: 'llm-assist-file-reference' },
    disabled: !enabled || !host,
  });

  if (!host || !enabled) return null;

  return createPortal(
    <div
      ref={setNodeRef}
      className={`pointer-events-none absolute inset-0 z-40 flex flex-col p-3 sm:p-4 ${
        isOver
          ? 'bg-violet-200/60 dark:bg-violet-950/60'
          : 'bg-violet-100/45 dark:bg-violet-950/40'
      }`}
      data-llm-assist-reference-drop
      aria-hidden
    >
      <div
        className={`flex min-h-0 flex-1 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 text-center transition-colors ${
          isOver
            ? 'border-violet-500 bg-white/55 dark:border-violet-400 dark:bg-odp-bgSoft/55'
            : 'border-violet-400/80 bg-white/35 dark:border-violet-600/70 dark:bg-odp-bgSoft/30'
        }`}
      >
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full ${
            isOver
              ? 'bg-violet-100 text-violet-800 dark:bg-violet-950/60 dark:text-violet-200'
              : 'bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-300'
          }`}
        >
          <Files size={28} aria-hidden />
        </div>
        <div className="space-y-1.5">
          <p className="text-base font-semibold text-gray-800 dark:text-odp-fgStrong sm:text-lg">
            {isOver ? '놓아서 파일 전체 참고' : '파일 전체를 레퍼런스로 추가'}
          </p>
          <p className="flex items-center justify-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
            <FilePlus2 size={14} aria-hidden />
            사이드바·탭에서 노트를 끌어다 놓으세요
          </p>
        </div>
      </div>
    </div>,
    host,
  );
}

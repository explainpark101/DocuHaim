import { createPortal } from 'react-dom';
import { useDroppable } from '@dnd-kit/core';
import { FileText, Library } from 'lucide-react';
import { QUIZ_TREE_SOURCE_DROPPABLE_ID } from '@/utils/quiz/quizTreeSourceDrop';

export type QuizTreeSourceDroppableProps = {
  host: HTMLElement | null;
  enabled?: boolean;
};

/**
 * Droppable registered inside Sidebar DndContext but portaled onto the quiz
 * source picker / dock so tree drags can add `.md` RAG sources.
 */
export default function QuizTreeSourceDroppable({
  host,
  enabled = true,
}: QuizTreeSourceDroppableProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: QUIZ_TREE_SOURCE_DROPPABLE_ID,
    data: { type: 'quiz-tree-source' },
    disabled: !enabled || !host,
  });

  if (!host || !enabled) return null;

  return createPortal(
    <div
      ref={setNodeRef}
      className={`pointer-events-none absolute inset-0 z-40 flex flex-col p-2 sm:p-3 ${
        isOver
          ? 'bg-violet-200/55 dark:bg-violet-950/55'
          : 'bg-violet-100/35 dark:bg-violet-950/30'
      }`}
      data-quiz-tree-source-drop
      aria-hidden
    >
      <div
        className={`flex min-h-0 flex-1 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 text-center transition-colors ${
          isOver
            ? 'border-violet-500 bg-white/55 dark:border-violet-400 dark:bg-odp-bgSoft/55'
            : 'border-violet-400/75 bg-white/25 dark:border-violet-600/70 dark:bg-odp-bgSoft/25'
        }`}
      >
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full ${
            isOver
              ? 'bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300'
              : 'bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400'
          }`}
        >
          <Library size={24} aria-hidden />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
            {isOver ? '놓아서 근거 문서 추가' : '근거 문서에 추가'}
          </p>
          <p className="flex items-center justify-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
            <FileText size={13} aria-hidden />
            사이드바 `.md` 파일·폴더를 끌어다 놓으세요
          </p>
        </div>
      </div>
    </div>,
    host,
  );
}

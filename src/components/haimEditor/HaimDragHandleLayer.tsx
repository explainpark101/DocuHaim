import { GripVertical } from 'lucide-react';
import type { Editor } from '@tiptap/react';
import { DragHandle } from '@tiptap/extension-drag-handle-react';

type Props = {
  editor: Editor;
};

/** TipTap block DragHandle (no dnd-kit / motion overlay). */
export default function HaimDragHandleLayer({ editor }: Props) {
  if (!editor || editor.isDestroyed) return null;

  return (
    <DragHandle editor={editor} className="haim-drag-handle">
      <button
        type="button"
        tabIndex={-1}
        aria-label="블록 드래그"
        className="flex h-6 w-5 items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-odp-bgSoft dark:hover:text-odp-fg"
      >
        <GripVertical size={14} aria-hidden />
      </button>
    </DragHandle>
  );
}

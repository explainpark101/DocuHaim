import { GripVertical } from 'lucide-react';
import type { Editor } from '@tiptap/react';
import { DragHandle } from '@tiptap/extension-drag-handle-react';

type Props = {
  editor: Editor;
  /** True while a block drag is in progress (pause dual content sync). */
  onDraggingChange?: ((dragging: boolean) => void) | undefined;
};

/**
 * TipTap block DragHandle (no dnd-kit / motion overlay).
 *
 * Use a non-interactive div (not <button>) — HTML5 DnD does not start from
 * buttons inside a draggable parent in Chromium/WebKit.
 */
export default function HaimDragHandleLayer({
  editor,
  onDraggingChange,
}: Props) {
  if (!editor || editor.isDestroyed) return null;

  return (
    <DragHandle
      editor={editor}
      className="haim-drag-handle"
      onElementDragStart={() => onDraggingChange?.(true)}
      onElementDragEnd={() => onDraggingChange?.(false)}
    >
      <div
        role="button"
        tabIndex={-1}
        aria-label="블록 드래그"
        className="haim-drag-handle__grip flex h-7 w-6 cursor-grab items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-700 active:cursor-grabbing dark:hover:bg-odp-bgSoft dark:hover:text-odp-fg"
      >
        <GripVertical size={14} aria-hidden />
      </div>
    </DragHandle>
  );
}

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type DragEvent,
  type ReactNode,
} from 'react';
import { Paperclip, Upload } from 'lucide-react';

function dataTransferHasFiles(dt: DataTransfer | null | undefined): boolean {
  if (!dt) return false;
  return [...dt.types].includes('Files');
}

export type ChatFileDropOverlayProps = {
  children: ReactNode;
  className?: string;
  /** When true, ignore OS file drags (e.g. storage not ready). */
  disabled?: boolean;
  onFilesDrop: (files: FileList) => void;
};

/**
 * Wraps the chat view: OS file drag anywhere inside shows an overlay;
 * drop enqueues files as composer attachments. App TreeNode Sidebar sits
 * outside this pane, so vault OS-drop is unaffected.
 *
 * Drop/dragover use the capture phase so nested editors (MdEditor) do not
 * also consume the same OS file drop.
 */
export default function ChatFileDropOverlay({
  children,
  className = '',
  disabled = false,
  onFilesDrop,
}: ChatFileDropOverlayProps) {
  const [dragging, setDragging] = useState(false);
  const dragDepthRef = useRef(0);

  useEffect(() => {
    if (!disabled) return;
    dragDepthRef.current = 0;
    setDragging(false);
  }, [disabled]);

  const resetDrag = useCallback(() => {
    dragDepthRef.current = 0;
    setDragging(false);
  }, []);

  const onDragEnter = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      if (disabled || !dataTransferHasFiles(e.dataTransfer)) return;
      e.preventDefault();
      e.stopPropagation();
      dragDepthRef.current += 1;
      setDragging(true);
    },
    [disabled],
  );

  const onDragLeave = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
      if (dragDepthRef.current === 0) setDragging(false);
    },
    [disabled],
  );

  const onDragOverCapture = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      if (disabled || !dataTransferHasFiles(e.dataTransfer)) return;
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
      if (!dragging) setDragging(true);
    },
    [disabled, dragging],
  );

  const onDropCapture = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      if (disabled || !dataTransferHasFiles(e.dataTransfer)) return;
      e.preventDefault();
      e.stopPropagation();
      resetDrag();
      const files = e.dataTransfer?.files;
      if (files?.length) onFilesDrop(files);
    },
    [disabled, onFilesDrop, resetDrag],
  );

  return (
    <div
      className={`relative ${className}`.trim()}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOverCapture={onDragOverCapture}
      onDropCapture={onDropCapture}
    >
      {children}
      {dragging ? (
        <div
          className="pointer-events-none absolute inset-0 z-90 flex items-center justify-center bg-[#b9cfe0]/85 px-4 dark:bg-[#0b1220]/90"
          aria-hidden
        >
          <div className="flex max-w-sm flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-blue-500 bg-white/90 px-8 py-7 text-center shadow-lg dark:border-blue-400 dark:bg-odp-bgSoft/95">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300">
              <Upload size={24} aria-hidden />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
                여기에 놓기
              </p>
              <p className="flex items-center justify-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <Paperclip size={12} aria-hidden />
                첨부파일로 추가됩니다
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

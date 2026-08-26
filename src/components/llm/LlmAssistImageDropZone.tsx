import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type DragEvent,
  type ReactNode,
} from 'react';
import { ImagePlus, Upload } from 'lucide-react';

function dataTransferHasFiles(dt: DataTransfer | null | undefined): boolean {
  if (!dt) return false;
  return [...dt.types].includes('Files');
}

export type LlmAssistImageDropZoneProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  /** Called with OS FileList when images (or any files) are dropped; caller filters/reads. */
  onFilesDrop: (files: FileList) => void | Promise<void>;
};

/**
 * Capture-phase OS file drop target for LLM Assist chrome (panel / dock / popout).
 * Stops the drop from reaching the note editor underneath.
 */
export default function LlmAssistImageDropZone({
  children,
  className = '',
  disabled = false,
  onFilesDrop,
}: LlmAssistImageDropZoneProps) {
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
      if (files?.length) void onFilesDrop(files);
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
          className="pointer-events-none absolute inset-0 z-90 flex items-center justify-center bg-violet-100/85 px-4 dark:bg-violet-950/90"
          aria-hidden
        >
          <div className="flex max-w-sm flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-violet-500 bg-white/95 px-8 py-7 text-center shadow-lg dark:border-violet-400 dark:bg-odp-bgSoft/95">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-300">
              <Upload size={24} aria-hidden />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
                여기에 놓기
              </p>
              <p className="flex items-center justify-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <ImagePlus size={12} aria-hidden />
                AI 입력 이미지로 추가됩니다
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

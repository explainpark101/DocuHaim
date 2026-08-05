import { useCallback, useEffect, useRef, useState, type DragEvent } from 'react';
import { Dialog } from 'radix-ui';
import { ClipboardPaste, ImagePlus, Upload } from 'lucide-react';
import {
  chatDialogContentClass,
  chatDialogOverlayClass,
} from '@/components/chatWithMyself/ui/chatUiStyles';
import { isSvgImageSource } from '@/utils/chatWithMyself/cropPadImage';

const ACCEPT_IMAGE = 'image/*';

type ChatGroupIconSourceModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImageChosen: (file: File) => void;
  title?: string;
};

function isImageFile(file: File | null | undefined): file is File {
  return Boolean(file && (file.type.startsWith('image/') || isSvgImageSource(file)));
}

function firstImageFromFileList(list: FileList | null | undefined): File | null {
  if (!list?.length) return null;
  for (const file of list) {
    if (isImageFile(file)) return file;
  }
  return null;
}

async function readImageFromClipboard(): Promise<File | null> {
  if (!navigator.clipboard?.read) return null;
  const items = await navigator.clipboard.read();
  for (const item of items) {
    const type = item.types.find((t) => t.startsWith('image/'));
    if (!type) continue;
    const blob = await item.getType(type);
    const ext = type.split('/')[1] || 'png';
    return new File([blob], `clipboard.${ext}`, { type: blob.type || type });
  }
  return null;
}

/**
 * Pick a group icon source: clipboard paste, file picker, or drag-and-drop.
 */
export default function ChatGroupIconSourceModal({
  open,
  onOpenChange,
  onImageChosen,
  title = '그룹 아이콘 변경',
}: ChatGroupIconSourceModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const [clipboardBusy, setClipboardBusy] = useState(false);
  const dragDepthRef = useRef(0);

  useEffect(() => {
    if (!open) {
      setDragging(false);
      setError('');
      setClipboardBusy(false);
      dragDepthRef.current = 0;
    }
  }, [open]);

  const emitImage = useCallback(
    (file: File | null) => {
      if (!isImageFile(file)) {
        setError('이미지 파일을 선택해 주세요.');
        return;
      }
      setError('');
      onImageChosen(file);
      onOpenChange(false);
    },
    [onImageChosen, onOpenChange],
  );

  useEffect(() => {
    if (!open) return undefined;
    const onPaste = (e: ClipboardEvent) => {
      const fromFiles = firstImageFromFileList(e.clipboardData?.files ?? null);
      if (fromFiles) {
        e.preventDefault();
        emitImage(fromFiles);
        return;
      }
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (!item.type.startsWith('image/')) continue;
        const blob = item.getAsFile();
        if (blob) {
          e.preventDefault();
          emitImage(blob);
          return;
        }
      }
    };
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, [open, emitImage]);

  const handleClipboard = async () => {
    if (clipboardBusy) return;
    setClipboardBusy(true);
    setError('');
    try {
      const file = await readImageFromClipboard();
      if (!file) {
        setError('클립보드에 이미지가 없습니다. Ctrl/Cmd+V로 붙여넣을 수도 있습니다.');
        return;
      }
      emitImage(file);
    } catch {
      setError(
        '클립보드 접근이 거부되었습니다. Ctrl/Cmd+V로 붙여넣거나 파일을 선택해 주세요.',
      );
    } finally {
      setClipboardBusy(false);
    }
  };

  const onDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragDepthRef.current += 1;
    if (e.dataTransfer?.types?.includes('Files')) setDragging(true);
  };

  const onDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
    if (dragDepthRef.current === 0) setDragging(false);
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragDepthRef.current = 0;
    setDragging(false);
    emitImage(firstImageFromFileList(e.dataTransfer?.files ?? null));
  };

  const optionClass =
    'flex w-full items-center gap-3 rounded-xl border border-gray-200 px-3 py-3 text-left text-sm text-gray-800 transition hover:bg-gray-50 disabled:opacity-40 dark:border-odp-borderStrong dark:text-odp-fgStrong dark:hover:bg-odp-focusBg';

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={chatDialogOverlayClass} />
        <Dialog.Content
          className={`${chatDialogContentClass} w-[min(92vw,400px)]`}
          aria-describedby={undefined}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <Dialog.Title className="text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
            {title}
          </Dialog.Title>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            이미지를 고른 뒤 잘라냅니다. 여기로 드래그앤드롭할 수도 있습니다.
          </p>

          <div
            className={`mt-3 rounded-xl border-2 border-dashed px-3 py-4 transition ${
              dragging
                ? 'border-blue-500 bg-blue-50/80 dark:border-blue-400 dark:bg-blue-950/40'
                : 'border-gray-200 dark:border-odp-borderStrong'
            }`}
          >
            <div className="mb-3 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Upload size={14} />
              <span>{dragging ? '여기에 놓기' : '이미지 파일을 이 영역으로 드롭'}</span>
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                className={optionClass}
                disabled={clipboardBusy}
                onClick={() => void handleClipboard()}
              >
                <ClipboardPaste size={18} className="shrink-0 text-blue-600 dark:text-blue-300" />
                <span className="flex-1 font-medium">
                  {clipboardBusy ? '클립보드 읽는 중…' : '클립보드에서 붙여넣기'}
                </span>
              </button>
              <button
                type="button"
                className={optionClass}
                onClick={() => fileInputRef.current?.click()}
              >
                <ImagePlus size={18} className="shrink-0 text-blue-600 dark:text-blue-300" />
                <span className="flex-1 font-medium">파일에서 선택</span>
              </button>
            </div>
          </div>

          {error ? (
            <p className="mt-2 text-xs text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          ) : null}

          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPT_IMAGE}
            className="hidden"
            onChange={(e) => {
              const file = firstImageFromFileList(e.target.files);
              e.target.value = '';
              emitImage(file);
            }}
          />

          <div className="mt-3 flex justify-end">
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded-md px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-odp-focusBg"
              >
                취소
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

import { useCallback, useState, type DragEvent } from 'react';
import { Archive, FileText, FolderOpen, Upload } from 'lucide-react';
import Button from '@/components/Button';
import { IconFilePlus, IconMenu, IconMessage } from '@/components/icons';

type Props = {
  onOpenFiles: (files: FileList | File[], origin: 'md' | 'zip' | 'folder') => void | Promise<void>;
  onOpenDirectoryHandle?: () => void | Promise<void>;
  onDropTransfer: (dataTransfer: DataTransfer) => void | Promise<void>;
  onRequestCreateFile?: () => void;
  onOpenSidebar?: () => void;
  onOpenChatWithMyself?: () => void;
  isBusy?: boolean;
};

export default function SessionOpenPanel({
  onOpenFiles,
  onOpenDirectoryHandle,
  onDropTransfer,
  onRequestCreateFile,
  onOpenSidebar,
  onOpenChatWithMyself,
  isBusy = false,
}: Props) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'copy';
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const next = event.relatedTarget;
    if (next instanceof Node && event.currentTarget.contains(next)) return;
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    async (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);
      if (isBusy) return;
      await onDropTransfer(event.dataTransfer);
    },
    [isBusy, onDropTransfer],
  );

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-4">
      <div
        role="button"
        tabIndex={0}
        onDragEnter={handleDragOver}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-full rounded-xl border-2 border-dashed px-4 py-8 text-center transition ${
          isDragging
            ? 'border-blue-500 bg-blue-50/80 dark:border-blue-400 dark:bg-blue-950/30'
            : 'border-gray-300 bg-white/70 dark:border-odp-borderStrong dark:bg-odp-surface/70'
        }`}
      >
        <Upload className="mx-auto text-gray-400 dark:text-odp-muted" size={28} aria-hidden />
        <p className="mt-3 text-sm font-medium text-gray-700 dark:text-odp-fgStrong">
          Markdown, ZIP, 폴더를 드래그해서 열기
        </p>
        <p className="mt-1 text-xs text-gray-500 dark:text-odp-muted">
          편집 후 저장하면 다운로드로 내려받습니다. 저장소 연결 없이 사용할 수 있습니다.
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <label className="flex-1">
            <input
              type="file"
              accept=".md,.markdown,text/markdown"
              className="sr-only"
              disabled={isBusy}
              onChange={(event) => {
                const files = event.target.files;
                if (files?.length) void onOpenFiles(files, 'md');
                event.target.value = '';
              }}
            />
            <span className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700">
              <FileText size={16} aria-hidden />
              MD 열기
            </span>
          </label>
          <label className="flex-1">
            <input
              type="file"
              accept=".zip,application/zip"
              className="sr-only"
              disabled={isBusy}
              onChange={(event) => {
                const files = event.target.files;
                if (files?.length) void onOpenFiles(files, 'zip');
                event.target.value = '';
              }}
            />
            <span className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg">
              <Archive size={16} aria-hidden />
              ZIP 열기
            </span>
          </label>
          {typeof onOpenDirectoryHandle === 'function' ? (
            <Button
              type="button"
              variant="secondary"
              size="md"
              className="flex-1"
              disabled={isBusy}
              onClick={() => void onOpenDirectoryHandle()}
            >
              <FolderOpen size={16} aria-hidden />
              폴더 열기
            </Button>
          ) : (
            <label className="flex-1">
              <input
                type="file"
                className="sr-only"
                disabled={isBusy}
                {...{ webkitdirectory: '', directory: '' }}
                onChange={(event) => {
                  const files = event.target.files;
                  if (files?.length) void onOpenFiles(files, 'folder');
                  event.target.value = '';
                }}
              />
              <span className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-200 dark:bg-odp-bgSoft dark:text-odp-fgStrong dark:hover:bg-odp-focusBg">
                <FolderOpen size={16} aria-hidden />
                폴더 열기
              </span>
            </label>
          )}
        </div>
      </div>

      <div className="flex w-full max-w-xs flex-col gap-2">
        {typeof onRequestCreateFile === 'function' ? (
          <Button type="button" variant="secondary" size="md" className="w-full" onClick={onRequestCreateFile}>
            <IconFilePlus size={16} />
            파일 생성
          </Button>
        ) : null}
        {typeof onOpenSidebar === 'function' ? (
          <Button type="button" variant="secondary" size="md" className="w-full" onClick={onOpenSidebar}>
            <IconMenu size={16} />
            사이드바 열기
          </Button>
        ) : null}
        {typeof onOpenChatWithMyself === 'function' ? (
          <Button type="button" variant="secondary" size="md" className="w-full" onClick={onOpenChatWithMyself}>
            <IconMessage size={16} />
            나와의 채팅 열기
          </Button>
        ) : null}
      </div>
    </div>
  );
}

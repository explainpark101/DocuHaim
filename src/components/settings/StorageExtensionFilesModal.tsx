import { Dialog } from 'radix-ui';
import { FileIcon, X } from 'lucide-react';
import {
  formatStorageBytes,
  type StorageUsageExtensionRow,
  type StorageUsageFileEntry,
} from '@/utils/storageUsageAnalysis';

type Props = {
  open: boolean;
  extension: StorageUsageExtensionRow | null;
  onOpenChange: (open: boolean) => void;
  onOpenFile: (file: StorageUsageFileEntry) => void | Promise<void>;
};

/**
 * Lists all files for a selected extension from storage usage analysis.
 */
export default function StorageExtensionFilesModal({
  open,
  extension,
  onOpenChange,
  onOpenFile,
}: Props) {
  const files = extension?.files ?? [];
  const title = extension ? `${extension.label} 파일` : '파일 목록';

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-100000 bg-black/40" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 z-100001 flex max-h-[min(90vh,40rem)] w-[min(92vw,36rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl outline-none dark:border-odp-borderStrong dark:bg-odp-bgSoft"
          aria-describedby={undefined}
        >
          <div className="flex items-start justify-between gap-3 border-b border-gray-200 px-4 py-3 dark:border-odp-borderStrong">
            <div className="min-w-0">
              <Dialog.Title className="truncate text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
                {title}
              </Dialog.Title>
              {extension ? (
                <p className="mt-0.5 text-[11px] text-gray-500 dark:text-odp-muted">
                  {extension.count.toLocaleString()}개 · {formatStorageBytes(extension.size)}
                </p>
              ) : null}
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="inline-flex shrink-0 items-center justify-center rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-odp-focusBg dark:hover:text-odp-fg"
                aria-label="닫기"
              >
                <X size={16} />
              </button>
            </Dialog.Close>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            {files.length === 0 ? (
              <p className="px-4 py-8 text-center text-xs text-gray-500 dark:text-odp-muted">
                파일이 없습니다.
              </p>
            ) : (
              <ul className="divide-y divide-gray-100 dark:divide-odp-borderSoft">
                {files.map((file) => (
                  <li key={file.path}>
                    <button
                      type="button"
                      onClick={() => {
                        void onOpenFile(file);
                      }}
                      className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left transition hover:bg-gray-50 dark:hover:bg-odp-focusBg/40"
                    >
                      <FileIcon
                        size={14}
                        className="shrink-0 text-gray-400 dark:text-odp-muted"
                        aria-hidden
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-medium text-gray-800 dark:text-odp-fgStrong">
                          {file.name}
                        </span>
                        <span className="mt-0.5 block truncate font-mono text-[10px] text-gray-500 dark:text-odp-muted" title={file.path}>
                          {file.path}
                        </span>
                      </span>
                      <span className="shrink-0 tabular-nums text-[11px] text-gray-600 dark:text-odp-muted">
                        {formatStorageBytes(file.size)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

import { useState, type MouseEvent } from 'react';
import { Folder } from 'lucide-react';
import { Tooltip } from 'radix-ui';
import { useAlertModal } from '@/contexts/AlertModalContext';
import ChatFolderPickModal, {
  type ChatFolderPickFile,
} from '@/components/chatWithMyself/ChatFolderPickModal';

const MISSING_FOLDER_MESSAGE = '해당 폴더가 삭제되어 열 수 없습니다';

export type ChatFolderLinkCardProps = {
  path: string;
  name?: string | null;
  available?: boolean;
  listFiles?: ((folderPath: string) => ChatFolderPickFile[]) | undefined;
  onOpenFile?: ((filePath: string) => void) | undefined;
};

/**
 * Folder share card inside a chat bubble. Click opens a file picker modal.
 */
export default function ChatFolderLinkCard({
  path,
  name = null,
  available = true,
  listFiles,
  onOpenFile,
}: ChatFolderLinkCardProps) {
  const { showAlert } = useAlertModal();
  const [pickerOpen, setPickerOpen] = useState(false);
  const displayName =
    String(name || '').trim() ||
    String(path || '')
      .replace(/\/+$/, '')
      .split('/')
      .filter(Boolean)
      .pop() ||
    'folder';
  const pathHint = String(path || '').replace(/^\/+/, '');
  const canOpen = Boolean(available);
  const files = canOpen && pickerOpen && typeof listFiles === 'function' ? listFiles(path) : [];

  const handleOpenClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setPickerOpen(true);
  };

  const handleMissingClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    showAlert({
      title: '폴더 열기',
      message: MISSING_FOLDER_MESSAGE,
      ...(pathHint ? { detail: pathHint } : {}),
    });
  };

  if (!canOpen) {
    return (
      <Tooltip.Provider delayDuration={280} skipDelayDuration={120}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              type="button"
              onClick={handleMissingClick}
              className="mt-1.5 flex max-w-full cursor-pointer items-center gap-3 rounded-xl border border-dashed border-gray-300 bg-gray-50/90 px-3 py-2.5 text-left no-underline opacity-90 transition-opacity hover:opacity-100 dark:border-odp-borderSoft dark:bg-odp-bg/40"
              aria-label={`${displayName}: ${MISSING_FOLDER_MESSAGE}`}
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-200 text-gray-500 dark:bg-white/10 dark:text-gray-400"
                aria-hidden
              >
                <Folder size={18} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate text-sm font-semibold tracking-tight text-gray-600 dark:text-gray-300">
                  {displayName}
                </span>
                <span className="truncate text-[11px] text-gray-500 dark:text-gray-400">
                  폴더를 찾을 수 없음
                </span>
              </span>
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side="top"
              sideOffset={6}
              className="z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-[11px] leading-snug text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fgStrong"
            >
              {MISSING_FOLDER_MESSAGE}
              <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    );
  }

  return (
    <>
      <button
        type="button"
        title={pathHint || undefined}
        onClick={handleOpenClick}
        className="group mt-1.5 flex max-w-full items-center gap-3 rounded-xl border border-amber-200/90 bg-linear-to-r from-amber-50/90 via-white to-yellow-50/70 px-3 py-2.5 text-left no-underline shadow-sm transition-[border-color,box-shadow] hover:border-amber-400/80 hover:shadow-md dark:border-amber-800/50 dark:from-amber-950/40 dark:via-odp-bgSoft/90 dark:to-yellow-950/25 dark:hover:border-amber-500/50"
      >
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700 shadow-[inset_0_0_0_1px_rgba(251,191,36,0.4)] dark:bg-amber-900/45 dark:text-amber-300 dark:shadow-[inset_0_0_0_1px_rgba(245,158,11,0.35)]"
          aria-hidden
        >
          <Folder size={18} />
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-sm font-semibold tracking-tight text-gray-900 dark:text-odp-fgStrong">
            {displayName}
          </span>
          <span className="truncate text-[11px] text-gray-500 dark:text-gray-400">
            탭하여 파일 선택
          </span>
        </span>
        <span
          className="shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-amber-600 dark:text-gray-500 dark:group-hover:text-amber-400"
          aria-hidden
        >
          →
        </span>
      </button>
      <ChatFolderPickModal
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        folderPath={path}
        folderName={displayName}
        files={files}
        onSelectFile={(filePath) => {
          onOpenFile?.(filePath);
          setPickerOpen(false);
        }}
      />
    </>
  );
}

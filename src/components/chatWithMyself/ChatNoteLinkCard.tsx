import type { MouseEvent } from 'react';
import { FileText } from 'lucide-react';
import { Tooltip } from 'radix-ui';
import { noteViewHref } from '@/utils/chatWithMyself';
import { useAlertModal } from '@/contexts/AlertModalContext';

const MISSING_NOTE_MESSAGE = '해당 노트가 삭제되어 열 수 없습니다';

type ChatNoteLinkCardProps = {
  path: string;
  name?: string | null;
  /** When false, render a missing-note card (tooltip + global alert). Default true. */
  available?: boolean;
  onOpen?: ((path: string) => void) | undefined;
};

/**
 * Note share card inside a chat bubble (note → chat).
 * Visual cousin of the md-editor "chat → note" saved card, not a reply strip.
 * Clickable only when `available` (file still in the storage tree).
 */
export default function ChatNoteLinkCard({
  path,
  name = null,
  available = true,
  onOpen,
}: ChatNoteLinkCardProps) {
  const { showAlert } = useAlertModal();
  const displayName =
    String(name || '').trim() ||
    String(path || '')
      .split('/')
      .filter(Boolean)
      .pop() ||
    'note';
  const href = noteViewHref(path);
  const pathHint = String(path || '').replace(/^\/+/, '');
  const canOpen = Boolean(available);

  const handleOpenClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    if (typeof onOpen === 'function') {
      e.preventDefault();
      onOpen(path);
    }
  };

  const handleMissingClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    showAlert({
      title: '노트 열기',
      message: MISSING_NOTE_MESSAGE,
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
              aria-label={`${displayName}: ${MISSING_NOTE_MESSAGE}`}
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-200 text-gray-500 dark:bg-white/10 dark:text-gray-400"
                aria-hidden
              >
                <FileText size={18} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate text-sm font-semibold tracking-tight text-gray-600 dark:text-gray-300">
                  {displayName}
                </span>
                <span className="truncate text-[11px] text-gray-500 dark:text-gray-400">
                  노트를 찾을 수 없음
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
              {MISSING_NOTE_MESSAGE}
              <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    );
  }

  return (
    <a
      href={href}
      title={pathHint || undefined}
      onClick={handleOpenClick}
      className="group mt-1.5 flex max-w-full items-center gap-3 rounded-xl border border-emerald-200/90 bg-linear-to-r from-emerald-50/90 via-white to-teal-50/70 px-3 py-2.5 text-left no-underline shadow-sm transition-[border-color,box-shadow] hover:border-emerald-400/80 hover:shadow-md dark:border-emerald-800/50 dark:from-emerald-950/50 dark:via-odp-bgSoft/90 dark:to-teal-950/30 dark:hover:border-emerald-500/50"
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 shadow-[inset_0_0_0_1px_rgba(52,211,153,0.35)] dark:bg-emerald-900/50 dark:text-emerald-300 dark:shadow-[inset_0_0_0_1px_rgba(16,185,129,0.35)]"
        aria-hidden
      >
        <FileText size={18} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-sm font-semibold tracking-tight text-gray-900 dark:text-odp-fgStrong">
          {displayName}
        </span>
        <span className="truncate text-[11px] text-gray-500 dark:text-gray-400">
          탭하여 노트 열기
        </span>
      </span>
      <span
        className="shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald-600 dark:text-gray-500 dark:group-hover:text-emerald-400"
        aria-hidden
      >
        →
      </span>
    </a>
  );
}

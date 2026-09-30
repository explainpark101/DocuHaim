import {
  Copy,
  FolderInput,
  Merge,
  Pin,
  SmilePlus,
  Trash2,
  X,
} from 'lucide-react';
import { Tooltip } from 'radix-ui';

export type ChatMessageSelectionBarProps = {
  count: number;
  /** When true, show "고정 해제" affordance (all selected are pinned). */
  allPinned?: boolean;
  /** Enable merge when at least two messages are selected. */
  canMerge?: boolean;
  onClose: () => void;
  onReaction: () => void;
  onChangeGroup: () => void;
  onCopy: () => void;
  onTogglePin: () => void;
  onMerge: () => void;
  onDelete: () => void;
};

const btnClass =
  'inline-flex h-9 min-w-9 items-center justify-center gap-1 rounded-lg px-2 text-sm text-gray-700 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 aria-disabled:opacity-40 dark:text-odp-fg dark:hover:bg-white/10';

/**
 * Sticky bar above the composer while multi-select is active.
 */
export default function ChatMessageSelectionBar({
  count,
  allPinned = false,
  canMerge = false,
  onClose,
  onReaction,
  onChangeGroup,
  onCopy,
  onTogglePin,
  onMerge,
  onDelete,
}: ChatMessageSelectionBarProps) {
  if (count <= 0) return null;

  return (
    <div
      className="pointer-events-auto z-20 flex w-full shrink-0 items-center justify-center px-2 pb-1.5 pt-1"
      role="toolbar"
      aria-label="선택한 메시지 작업"
      data-chat-message-selection-bar=""
    >
      <div className="flex max-w-[min(96vw,36rem)] flex-wrap items-center justify-center gap-1 rounded-xl border border-gray-200 bg-white/95 px-2 py-1.5 shadow-lg backdrop-blur-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft/95">
        <p
          className="min-w-0 px-2 text-xs font-medium tabular-nums text-gray-700 dark:text-odp-fg"
          aria-live="polite"
          aria-atomic="true"
        >
          {count}개 선택
        </p>
        <Tooltip.Provider delayDuration={250} skipDelayDuration={0}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                type="button"
                className={btnClass}
                aria-label="반응 추가"
                onClick={onReaction}
              >
                <SmilePlus size={16} aria-hidden />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side="top"
                sideOffset={6}
                className="z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg"
              >
                반응 추가
                <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                type="button"
                className={btnClass}
                aria-label="그룹 변경"
                onClick={onChangeGroup}
              >
                <FolderInput size={16} aria-hidden />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side="top"
                sideOffset={6}
                className="z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg"
              >
                그룹 변경
                <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                type="button"
                className={btnClass}
                aria-label="내용 복사"
                onClick={onCopy}
              >
                <Copy size={16} aria-hidden />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side="top"
                sideOffset={6}
                className="z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg"
              >
                내용 복사
                <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                type="button"
                className={btnClass}
                aria-label={allPinned ? '고정 해제' : '고정'}
                onClick={onTogglePin}
              >
                <Pin
                  size={16}
                  aria-hidden
                  className={allPinned ? 'fill-current' : undefined}
                />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side="top"
                sideOffset={6}
                className="z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg"
              >
                {allPinned ? '고정 해제' : '고정'}
                <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                type="button"
                className={btnClass}
                aria-label="메시지 합치기"
                aria-disabled={!canMerge}
                onClick={() => {
                  if (!canMerge) return;
                  onMerge();
                }}
              >
                <Merge size={16} aria-hidden />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side="top"
                sideOffset={6}
                className="z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg"
              >
                {canMerge
                  ? '메시지 합치기'
                  : '메시지를 2개 이상 선택하면 합칠 수 있습니다'}
                <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                type="button"
                className={`${btnClass} text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40`}
                aria-label="삭제"
                onClick={onDelete}
              >
                <Trash2 size={16} aria-hidden />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side="top"
                sideOffset={6}
                className="z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg"
              >
                삭제
                <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                type="button"
                className={btnClass}
                aria-label="선택 해제"
                onClick={onClose}
              >
                <X size={16} aria-hidden />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side="top"
                sideOffset={6}
                className="z-100001 max-w-[min(92vw,280px)] rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-800 shadow-md dark:border-odp-borderStrong dark:bg-odp-surface dark:text-odp-fg"
              >
                선택 해제
                <Tooltip.Arrow className="fill-white dark:fill-odp-surface" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
    </div>
  );
}

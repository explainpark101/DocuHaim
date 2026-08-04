import { useEffect, useRef } from 'react';
import { FilePlus2, History, Pencil, Reply, Trash2, X } from 'lucide-react';
import { motion } from 'motion/react';
import { Dialog } from 'radix-ui';
import {
  chatMenuDangerItemClass,
  chatMenuItemClass,
  chatDialogContentClass,
  chatDialogOverlayClass,
} from '@/components/chatWithMyself/ui/chatUiStyles';

/** Ignore outside dismiss from the same finger that long-pressed to open. */
const DISMISS_GUARD_MS = 450;

const OVERLAY_TRANSITION = { duration: 0.18 };
const PANEL_TRANSITION = { type: 'spring', stiffness: 420, damping: 32 };

/** Centering translate is driven by motion (avoids CSS transform conflicts). */
const menuContentClass = chatDialogContentClass
  .replace('-translate-x-1/2 ', '')
  .replace('-translate-y-1/2 ', '');

/**
 * Mobile message actions dialog (centered).
 * Desktop uses ContextMenu / DropdownMenu in ChatMessageList.
 */
export default function ChatMessageContextMenu({
  open,
  message,
  onOpenChange,
  onReply,
  onDelete,
  onEdit,
  onAddToNote,
  onViewEditHistory,
  shiftHeldRef,
}) {
  const dismissGuardUntilRef = useRef(0);

  useEffect(() => {
    if (open && message) {
      dismissGuardUntilRef.current = Date.now() + DISMISS_GUARD_MS;
    }
  }, [open, message]);

  if (!message && !open) return null;

  const hasEditHistory =
    Boolean(message?.editedAt) ||
    (Array.isArray(message?.editHistory) && message.editHistory.length > 0);

  const guardOutside = (event) => {
    if (Date.now() < dismissGuardUntilRef.current) {
      event.preventDefault();
    }
  };

  return (
    <Dialog.Root
      open={Boolean(open && message)}
      onOpenChange={(next) => {
        if (!next && Date.now() < dismissGuardUntilRef.current) return;
        onOpenChange?.(next);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            className={chatDialogOverlayClass}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={OVERLAY_TRANSITION}
          />
        </Dialog.Overlay>
        <Dialog.Content
          asChild
          aria-describedby={undefined}
          onPointerDownOutside={guardOutside}
          onInteractOutside={guardOutside}
        >
          <motion.div
            className={menuContentClass}
            initial={{ opacity: 0, scale: 0.95, x: '-50%', y: 'calc(-50% + 8px)' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            transition={PANEL_TRANSITION}
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 dark:border-odp-borderSoft">
              <div className="min-w-0">
                <Dialog.Title className="text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
                  메시지 옵션
                </Dialog.Title>
                <p className="truncate text-xs text-gray-500">
                  {(message?.body || '').replace(/\s+/g, ' ').slice(0, 60) || '(빈 메시지)'}
                </p>
              </div>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-odp-focusBg"
                  aria-label="닫기"
                >
                  <X size={18} />
                </button>
              </Dialog.Close>
            </div>
            <div className="flex flex-col gap-0.5 p-1">
              <button
                type="button"
                className={chatMenuItemClass}
                onClick={() => {
                  onReply?.(message);
                  onOpenChange?.(false);
                }}
              >
                <Reply size={16} className="shrink-0 text-gray-500" />
                답장
              </button>
              <button
                type="button"
                className={chatMenuItemClass}
                onClick={() => {
                  onEdit?.(message);
                  onOpenChange?.(false);
                }}
              >
                <Pencil size={16} className="shrink-0 text-gray-500" />
                수정
              </button>
              {hasEditHistory ? (
                <button
                  type="button"
                  className={chatMenuItemClass}
                  onClick={() => {
                    onViewEditHistory?.(message);
                    onOpenChange?.(false);
                  }}
                >
                  <History size={16} className="shrink-0 text-gray-500" />
                  수정기록 보기
                </button>
              ) : null}
              <button
                type="button"
                className={chatMenuItemClass}
                onClick={() => {
                  onAddToNote?.(message);
                  onOpenChange?.(false);
                }}
              >
                <FilePlus2 size={16} className="shrink-0 text-gray-500" />
                노트로 추가
              </button>
              <button
                type="button"
                className={chatMenuDangerItemClass}
                onPointerDown={(e) => {
                  if (shiftHeldRef) shiftHeldRef.current = e.shiftKey;
                }}
                onClick={() => {
                  onDelete?.(message, {
                    skipConfirm: Boolean(shiftHeldRef?.current),
                  });
                  onOpenChange?.(false);
                }}
              >
                <Trash2 size={16} className="shrink-0" />
                삭제
              </button>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

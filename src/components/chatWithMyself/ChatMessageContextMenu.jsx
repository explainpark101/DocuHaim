import { useEffect, useRef, useState } from 'react';
import {
  Copy,
  FilePlus2,
  FileText,
  History,
  Pencil,
  Pin,
  Reply,
  Share2,
  Trash2,
  X,
  ChevronsDownUp,
  ChevronsUpDown,
  SmilePlus,
} from 'lucide-react';
import { motion as Motion } from 'motion/react';
import { Dialog } from 'radix-ui';
import {
  chatMenuDangerItemClass,
  chatMenuItemClass,
  chatDialogContentClass,
  chatDialogOverlayClass,
} from '@/components/chatWithMyself/ui/chatUiStyles';
import {
  canOfferWebShare,
  formatChatMessageMarkdownCopy,
  formatChatMessagePlainText,
  shareChatMessage,
} from '@/utils/chatWithMyself';

/** Ignore outside dismiss from the same finger that long-pressed to open. */
const DISMISS_GUARD_MS = 450;
/** Block accidental taps on menu actions right after open. */
const POINTER_BLOCK_MS = 500;
/** Briefly block selection after open (long-press residual selection). */
const SELECT_NONE_MS = 200;

const OVERLAY_TRANSITION = { duration: 0.18 };
const PANEL_TRANSITION = { type: 'spring', stiffness: 420, damping: 32 };

/** Centering translate is driven by motion (avoids CSS transform conflicts). */
const menuContentClass = chatDialogContentClass
  .replace('-translate-x-1/2 ', '')
  .replace('-translate-y-1/2 ', '');

async function copyText(text) {
  const value = String(text ?? '');
  if (!value) return;
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    /* ignore */
  }
}

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
  onTogglePin,
  onToggleCollapse,
  onOpenReactionPicker,
  getPresignedUrl,
  shiftHeldRef,
}) {
  const dismissGuardUntilRef = useRef(0);
  const [selectNone, setSelectNone] = useState(false);
  const [pointerBlocked, setPointerBlocked] = useState(false);
  const isOpen = Boolean(open && message);

  useEffect(() => {
    if (isOpen) {
      dismissGuardUntilRef.current = Date.now() + DISMISS_GUARD_MS;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setSelectNone(false);
      setPointerBlocked(false);
      return undefined;
    }
    setSelectNone(true);
    setPointerBlocked(true);
    const tSelect = window.setTimeout(() => setSelectNone(false), SELECT_NONE_MS);
    const tPointer = window.setTimeout(() => setPointerBlocked(false), POINTER_BLOCK_MS);
    return () => {
      window.clearTimeout(tSelect);
      window.clearTimeout(tPointer);
    };
  }, [isOpen]);

  if (!message && !open) return null;

  const hasEditHistory = Boolean(message?.editedAt);
  const pinned = Boolean(message?.pinnedAt);
  const collapsed =
    message?.collapsed === '1' || message?.collapsed === true;
  const shareAvailable = canOfferWebShare();

  const guardOutside = (event) => {
    if (Date.now() < dismissGuardUntilRef.current) {
      event.preventDefault();
    }
  };

  const selectNoneClass = selectNone ? 'select-none' : '';
  const pointerBlockClass = pointerBlocked ? 'pointer-events-none' : '';

  const menuBtnClass = `${chatMenuItemClass} ${pointerBlockClass}`.trim();

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(next) => {
        if (!next && Date.now() < dismissGuardUntilRef.current) return;
        onOpenChange?.(next);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <Motion.div
            className={`${chatDialogOverlayClass} ${selectNoneClass}`.trim()}
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
          <Motion.div
            className={`${menuContentClass} ${selectNoneClass}`.trim()}
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
                className={menuBtnClass}
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
                className={menuBtnClass}
                onClick={() => {
                  onOpenReactionPicker?.(message);
                  onOpenChange?.(false);
                }}
              >
                <SmilePlus size={16} className="shrink-0 text-gray-500" />
                반응 추가
              </button>
              <button
                type="button"
                className={menuBtnClass}
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
                  className={menuBtnClass}
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
                className={menuBtnClass}
                onClick={() => {
                  onTogglePin?.(message);
                  onOpenChange?.(false);
                }}
              >
                <Pin size={16} className={`shrink-0 text-gray-500 ${pinned ? 'fill-current' : ''}`} />
                {pinned ? '고정 해제' : '고정'}
              </button>
              <button
                type="button"
                className={menuBtnClass}
                onClick={() => {
                  onToggleCollapse?.(message);
                  onOpenChange?.(false);
                }}
              >
                {collapsed ? (
                  <ChevronsUpDown size={16} className="shrink-0 text-gray-500" />
                ) : (
                  <ChevronsDownUp size={16} className="shrink-0 text-gray-500" />
                )}
                {collapsed ? '펼치기' : '접기'}
              </button>
              <button
                type="button"
                className={menuBtnClass}
                onClick={() => {
                  void copyText(formatChatMessagePlainText(message));
                  onOpenChange?.(false);
                }}
              >
                <Copy size={16} className="shrink-0 text-gray-500" />
                내용 복사
              </button>
              <button
                type="button"
                className={menuBtnClass}
                onClick={() => {
                  void copyText(formatChatMessageMarkdownCopy(message));
                  onOpenChange?.(false);
                }}
              >
                <FileText size={16} className="shrink-0 text-gray-500" />
                MD 복사
              </button>
              {shareAvailable ? (
                <button
                  type="button"
                  className={menuBtnClass}
                  onClick={() => {
                    void (async () => {
                      await shareChatMessage(message, { getPresignedUrl });
                      onOpenChange?.(false);
                    })();
                  }}
                >
                  <Share2 size={16} className="shrink-0 text-gray-500" />
                  공유
                </button>
              ) : null}
              <button
                type="button"
                className={menuBtnClass}
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
                className={`${chatMenuDangerItemClass} ${pointerBlockClass}`.trim()}
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
          </Motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Dialog } from 'radix-ui';
import { motion as Motion } from 'motion/react';
import { X } from 'lucide-react';
import {
  IconFilePlus,
  IconFolderPlus,
  IconDownload,
  IconTrash,
} from '@/components/icons';
import { PencilIcon, ArrowRightToLine, Copy, SquareArrowOutUpRight } from 'lucide-react';
import {
  chatDialogContentClass,
  chatDialogOverlayClass,
} from '@/components/chatWithMyself/ui/chatUiStyles';

const VIEWPORT_PADDING = 8;
const DISMISS_GUARD_MS = 450;
const POINTER_BLOCK_MS = 500;

const OVERLAY_TRANSITION = { duration: 0.18 };
const PANEL_TRANSITION = { type: 'spring', stiffness: 420, damping: 32 };

const dialogPanelClass = chatDialogContentClass
  .replace('-translate-x-1/2 ', '')
  .replace('-translate-y-1/2 ', '');

function SidebarContextMenuItems({
  node,
  storageType,
  isTrashRoot,
  deleteCount,
  onClose,
  onCreateFile,
  onCreateFolder,
  onDownload,
  onRename,
  onDelete,
  onEmptyTrash,
  onDuplicate,
  onMove,
  onOpenInNewWindow,
  itemClass,
  iconClass,
  pointerBlocked = false,
}) {
  const isFolder = node.type === 'folder';
  const canAdd = isFolder && !isTrashRoot;
  const canEdit = !isTrashRoot;
  const pointerBlockClass = pointerBlocked ? 'pointer-events-none' : '';
  const btnClass = `${itemClass} ${pointerBlockClass}`.trim();

  return (
    <>
      {canAdd && onCreateFile && (
        <button
          type="button"
          className={btnClass}
          onClick={() => {
            onCreateFile(node);
            onClose();
          }}
        >
          <IconFilePlus className={iconClass} />
          파일 추가
        </button>
      )}
      {canAdd && onCreateFolder && (
        <button
          type="button"
          className={btnClass}
          onClick={() => {
            onCreateFolder(node);
            onClose();
          }}
        >
          <IconFolderPlus className={iconClass} />
          폴더 추가
        </button>
      )}
      {!isFolder && node.type === 'file' && onOpenInNewWindow && (
        <button
          type="button"
          className={btnClass}
          onClick={() => {
            void onOpenInNewWindow(storageType, node);
            onClose();
          }}
        >
          <SquareArrowOutUpRight className={iconClass} size={14} />
          새 창에서 열기
        </button>
      )}
      {onDownload && (isFolder || node.type === 'file') && (
        <button
          type="button"
          className={btnClass}
          onClick={() => {
            onDownload(node);
            onClose();
          }}
        >
          <IconDownload className={iconClass} />
          {isFolder ? '폴더 다운로드' : '다운로드'}
        </button>
      )}
      {canEdit && onRename && (
        <button
          type="button"
          className={btnClass}
          onClick={() => {
            onRename(node);
            onClose();
          }}
        >
          <PencilIcon className={iconClass} />
          이름 수정
        </button>
      )}
      {isTrashRoot && onEmptyTrash && (
        <button
          type="button"
          className={`${btnClass} text-red-600 dark:text-red-400`}
          onClick={() => {
            onEmptyTrash(node, storageType);
            onClose();
          }}
        >
          <IconTrash className={iconClass} />
          쓰레기통 비우기
        </button>
      )}
      {canEdit && onDelete && (
        <button
          type="button"
          className={`${btnClass} text-red-600 dark:text-red-400`}
          onClick={() => {
            onDelete(node);
            onClose();
          }}
        >
          <IconTrash className={iconClass} />
          {deleteCount > 1 ? `${deleteCount}개 삭제` : '삭제'}
        </button>
      )}
      {canEdit && onDuplicate && (
        <button
          type="button"
          className={btnClass}
          onClick={() => {
            onDuplicate(node);
            onClose();
          }}
        >
          <Copy className={iconClass} size={14} />
          복제
        </button>
      )}
      {canEdit && onMove && (
        <button
          type="button"
          className={btnClass}
          onClick={() => {
            onMove(node);
            onClose();
          }}
        >
          <ArrowRightToLine className={iconClass} size={14} />
          이동
        </button>
      )}
    </>
  );
}

/**
 * Sidebar tree context menu.
 * Desktop: fixed portal at pointer. Mobile: centered dialog.
 */
export default function SidebarContextMenu({
  x,
  y,
  node,
  storageType,
  isTrashRoot,
  mobileDialog = false,
  onClose,
  onCreateFile,
  onCreateFolder,
  onDownload,
  onRename,
  onDelete,
  onEmptyTrash,
  onDuplicate,
  onMove,
  onOpenInNewWindow,
  deleteCount = 1,
}) {
  const menuRef = useRef(null);
  const dismissGuardUntilRef = useRef(0);
  const [position, setPosition] = useState({ left: x, top: y });
  const [pointerBlocked, setPointerBlocked] = useState(false);

  const isOpen = Boolean(node);

  useEffect(() => {
    if (!isOpen || mobileDialog) return undefined;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, mobileDialog, onClose]);

  useEffect(() => {
    if (isOpen && mobileDialog) {
      dismissGuardUntilRef.current = Date.now() + DISMISS_GUARD_MS;
      setPointerBlocked(true);
      const t = window.setTimeout(() => setPointerBlocked(false), POINTER_BLOCK_MS);
      return () => window.clearTimeout(t);
    }
    setPointerBlocked(false);
    return undefined;
  }, [isOpen, mobileDialog]);

  useLayoutEffect(() => {
    if (mobileDialog || x == null || y == null || !node) return;
    const el = menuRef.current;
    if (!el) return;

    const { width, height } = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const pad = VIEWPORT_PADDING;

    let left = x;
    let top = y;

    if (top + height > vh - pad) {
      top = y - height;
    }
    if (top < pad) {
      top = pad;
    }
    if (top + height > vh - pad) {
      top = Math.max(pad, vh - pad - height);
    }

    if (left + width > vw - pad) {
      left = Math.max(pad, vw - pad - width);
    }
    if (left < pad) {
      left = pad;
    }

    setPosition({ left, top });
  }, [x, y, node, isTrashRoot, mobileDialog]);

  if (!node) return null;

  const displayName = isTrashRoot ? '쓰레기통' : node.name;
  const itemClass =
    'flex items-center gap-2 w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-odp-fg hover:bg-gray-100 dark:hover:bg-odp-focusBg disabled:opacity-50 disabled:pointer-events-none';
  const iconClass = 'shrink-0 w-4 h-4 text-gray-500 dark:text-odp-muted';

  const itemsProps = {
    node,
    storageType,
    isTrashRoot,
    deleteCount,
    onClose,
    onCreateFile,
    onCreateFolder,
    onDownload,
    onRename,
    onDelete,
    onEmptyTrash,
    onDuplicate,
    onMove,
    onOpenInNewWindow,
    itemClass,
    iconClass,
    pointerBlocked,
  };

  const guardOutside = (event) => {
    if (Date.now() < dismissGuardUntilRef.current) {
      event.preventDefault();
    }
  };

  if (mobileDialog) {
    return (
      <Dialog.Root
        open={isOpen}
        onOpenChange={(next) => {
          if (!next && Date.now() < dismissGuardUntilRef.current) return;
          if (!next) onClose();
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay asChild>
            <Motion.div
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
            <Motion.div
              className={dialogPanelClass}
              initial={{ opacity: 0, scale: 0.95, x: '-50%', y: 'calc(-50% + 8px)' }}
              animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
              transition={PANEL_TRANSITION}
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 dark:border-odp-borderSoft">
                <div className="min-w-0">
                  <Dialog.Title className="truncate text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
                    {displayName}
                  </Dialog.Title>
                  <p className="text-xs text-gray-500 dark:text-odp-muted">
                    {node.type === 'folder' ? '폴더' : '파일'}
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
              <div className="flex max-h-[min(60vh,420px)] flex-col gap-0.5 overflow-y-auto p-1">
                <SidebarContextMenuItems {...itemsProps} />
              </div>
            </Motion.div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }

  if (x == null || y == null) return null;

  return createPortal(
    <div
      ref={menuRef}
      className="fixed z-100 min-w-[180px] rounded-lg border border-gray-200 dark:border-gray-500 bg-white dark:bg-odp-bgSoft shadow-lg overflow-clip"
      style={{ left: position.left ?? x, top: position.top ?? y }}
    >
      <SidebarContextMenuItems {...itemsProps} />
    </div>,
    document.body,
  );
}

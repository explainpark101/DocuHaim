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

const VIEWPORT_PADDING = 8;
const DISMISS_GUARD_MS = 450;
const POINTER_BLOCK_MS = 500;

const MOBILE_MODAL_OVERLAY_CLASS =
  'fixed inset-0 z-100010 bg-black/50';
const MOBILE_MODAL_PANEL_CLASS =
  'fixed inset-0 z-100010 flex flex-col bg-white outline-none dark:bg-odp-bgSoft';

const OVERLAY_TRANSITION = { duration: 0.18 };
const PANEL_TRANSITION = { type: 'spring', stiffness: 420, damping: 32 };

function formatTreeNodePath(node, storageType) {
  if (!node) return '';
  if (node.path === '.trash/') return '.trash/';
  if (!node.path) {
    if (storageType === 's3') return '/';
    if (storageType === 'webdav') return '/';
    return '/';
  }
  return node.path;
}

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
 * Desktop: fixed portal at pointer. Mobile: full-screen modal with path header.
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
  const pathLabel = formatTreeNodePath(node, storageType);
  const itemClass =
    'flex items-center gap-2 w-full px-3 py-3 text-left text-sm text-gray-700 dark:text-odp-fg hover:bg-gray-100 dark:hover:bg-odp-focusBg disabled:opacity-50 disabled:pointer-events-none';
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
              className={MOBILE_MODAL_OVERLAY_CLASS}
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
              className={MOBILE_MODAL_PANEL_CLASS}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={PANEL_TRANSITION}
            >
              <div className="flex shrink-0 items-start justify-between gap-3 border-b border-gray-200 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] dark:border-odp-borderSoft">
                <div className="min-w-0 flex-1">
                  <Dialog.Title className="break-all font-mono text-sm font-semibold leading-snug text-gray-800 dark:text-odp-fgStrong">
                    {pathLabel}
                  </Dialog.Title>
                  <p className="mt-1 truncate text-xs text-gray-500 dark:text-odp-muted">
                    {displayName}
                    {' · '}
                    {node.type === 'folder' ? '폴더' : '파일'}
                  </p>
                </div>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="shrink-0 rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-odp-focusBg touch-manipulation"
                    aria-label="닫기"
                  >
                    <X size={20} />
                  </button>
                </Dialog.Close>
              </div>
              <div className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto p-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
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

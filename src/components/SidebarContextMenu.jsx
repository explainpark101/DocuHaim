import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import MobileContextMenuModal from '@/components/contextMenu/MobileContextMenuModal';
import {
  MOBILE_CONTEXT_MENU_DANGER_ITEM_CLASS,
  MOBILE_CONTEXT_MENU_ITEM_CLASS,
} from '@/components/contextMenu/mobileContextMenuStyles';
import {
  IconFilePlus,
  IconFolderPlus,
  IconDownload,
  IconTrash,
} from '@/components/icons';
import { PencilIcon, ArrowRightToLine, Copy, SquareArrowOutUpRight } from 'lucide-react';

const VIEWPORT_PADDING = 8;

function formatTreeNodePath(node, storageType) {
  if (!node) return '';
  if (node.path === '.trash/') return '.trash/';
  if (!node.path) return '/';
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
}) {
  const isFolder = node.type === 'folder';
  const canAdd = isFolder && !isTrashRoot;
  const canEdit = !isTrashRoot;

  return (
    <>
      {canAdd && onCreateFile && (
        <button
          type="button"
          className={itemClass}
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
          className={itemClass}
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
          className={itemClass}
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
          className={itemClass}
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
          className={itemClass}
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
          className={`${itemClass} text-red-600 dark:text-red-400`}
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
          className={`${itemClass} text-red-600 dark:text-red-400`}
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
          className={itemClass}
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
          className={itemClass}
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
 * Desktop: fixed portal at pointer. Mobile portrait: full-screen modal with path header.
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
  const [position, setPosition] = useState({ left: x, top: y });

  const isOpen = Boolean(node);
  const displayName = isTrashRoot ? '쓰레기통' : node?.name;
  const pathLabel = formatTreeNodePath(node, storageType);

  const itemClass = mobileDialog
    ? MOBILE_CONTEXT_MENU_ITEM_CLASS
    : 'flex items-center gap-2 w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-odp-fg hover:bg-gray-100 dark:hover:bg-odp-focusBg disabled:opacity-50 disabled:pointer-events-none';
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
  };

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

    if (top + height > vh - pad) top = y - height;
    if (top < pad) top = pad;
    if (top + height > vh - pad) top = Math.max(pad, vh - pad - height);
    if (left + width > vw - pad) left = Math.max(pad, vw - pad - width);
    if (left < pad) left = pad;

    setPosition({ left, top });
  }, [x, y, node, isTrashRoot, mobileDialog]);

  if (!node) return null;

  if (mobileDialog) {
    return (
      <MobileContextMenuModal
        open={isOpen}
        onOpenChange={(next) => {
          if (!next) onClose();
        }}
        title={pathLabel}
        subtitle={`${displayName} · ${node.type === 'folder' ? '폴더' : '파일'}`}
      >
        <SidebarContextMenuItems {...itemsProps} />
      </MobileContextMenuModal>
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

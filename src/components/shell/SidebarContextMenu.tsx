import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import MobileContextMenuModal from '@/components/contextMenu/MobileContextMenuModal';
import {
  MOBILE_CONTEXT_MENU_ITEM_CLASS,
  DESKTOP_CONTEXT_MENU_Z_CLASS,
} from '@/components/contextMenu/mobileContextMenuStyles';
import {
  IconFilePlus,
  IconFolderPlus,
  IconDownload,
  IconMessage,
  IconTrash,
  IconX,
  IconKey,
} from '@/components/icons';
import { PencilIcon, ArrowRightToLine, Copy, SquareArrowOutUpRight } from 'lucide-react';
import { isEncMdPath } from '@/utils/encMd';

const VIEWPORT_PADDING = 8;

type TreeMenuNode = {
  type?: string;
  name?: string;
  path?: string;
  handle?: unknown;
};

function formatTreeNodePath(node: TreeMenuNode | null | undefined): string {
  if (!node) return '';
  if (node.path === '.trash/') return '.trash/';
  if (!node.path) return '/';
  return node.path;
}

type MenuItemsProps = {
  node: TreeMenuNode;
  storageType: string;
  isTrashRoot: boolean;
  deleteCount: number;
  onClose: () => void;
  onCloseTab?: (() => void) | undefined;
  onCreateFile?: ((node: TreeMenuNode) => void) | undefined;
  onCreateFolder?: ((node: TreeMenuNode) => void) | undefined;
  onDownload?: ((node: TreeMenuNode) => void) | undefined;
  onRename?: ((node: TreeMenuNode) => void) | undefined;
  onChangeEncMdPassword?: ((storageType: string, node: TreeMenuNode) => void) | undefined;
  onDelete?: ((node: TreeMenuNode) => void) | undefined;
  onEmptyTrash?: ((node: TreeMenuNode, storageType: string) => void) | undefined;
  onDuplicate?: ((node: TreeMenuNode) => void) | undefined;
  onMove?: ((node: TreeMenuNode) => void) | undefined;
  onOpenInNewWindow?: ((storageType: string, node: TreeMenuNode) => void | Promise<void>) | undefined;
  onShareToChatWithMyself?: ((storageType: string, node: TreeMenuNode) => void | Promise<void>) | undefined;
  itemClass: string;
  iconClass: string;
};

function SidebarContextMenuItems({
  node,
  storageType,
  isTrashRoot,
  deleteCount,
  onClose,
  onCloseTab,
  onCreateFile,
  onCreateFolder,
  onDownload,
  onRename,
  onChangeEncMdPassword,
  onDelete,
  onEmptyTrash,
  onDuplicate,
  onMove,
  onOpenInNewWindow,
  onShareToChatWithMyself,
  itemClass,
  iconClass,
}: MenuItemsProps) {
  const isFolder = node.type === 'folder';
  const canAdd = isFolder && !isTrashRoot;
  const canEdit = !isTrashRoot;
  const showChangeEncMdPassword =
    !isFolder &&
    node.type === 'file' &&
    Boolean(onChangeEncMdPassword) &&
    (isEncMdPath(node.name) || isEncMdPath(node.path));

  return (
    <>
      {onCloseTab ? (
        <>
          <button
            type="button"
            className={itemClass}
            onClick={() => {
              onCloseTab();
              onClose();
            }}
          >
            <IconX className={iconClass} size={14} />
            탭 닫기
          </button>
          <div
            role="separator"
            className="my-0.5 h-px bg-gray-200 dark:bg-odp-borderSoft"
          />
        </>
      ) : null}
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
      {!isFolder && node.type === 'file' && onShareToChatWithMyself && (
        <button
          type="button"
          className={itemClass}
          onClick={() => {
            void onShareToChatWithMyself(storageType, node);
            onClose();
          }}
        >
          <IconMessage className={iconClass} size={14} />
          나와의 채팅에 공유하기
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
      {showChangeEncMdPassword && onChangeEncMdPassword && (
        <button
          type="button"
          className={itemClass}
          onClick={() => {
            onChangeEncMdPassword(storageType, node);
            onClose();
          }}
        >
          <IconKey className={iconClass} size={14} />
          파일 비밀번호 변경
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

export type SidebarContextMenuProps = {
  x?: number | null;
  y?: number | null;
  node: TreeMenuNode | null;
  storageType: string;
  isTrashRoot?: boolean;
  mobileDialog?: boolean;
  onClose: () => void;
  onCloseTab?: (() => void) | undefined;
  onCreateFile?: ((node: TreeMenuNode) => void) | undefined;
  onCreateFolder?: ((node: TreeMenuNode) => void) | undefined;
  onDownload?: ((node: TreeMenuNode) => void) | undefined;
  onRename?: ((node: TreeMenuNode) => void) | undefined;
  onChangeEncMdPassword?: ((storageType: string, node: TreeMenuNode) => void) | undefined;
  onDelete?: ((node: TreeMenuNode) => void) | undefined;
  onEmptyTrash?: ((node: TreeMenuNode, storageType: string) => void) | undefined;
  onDuplicate?: ((node: TreeMenuNode) => void) | undefined;
  onMove?: ((node: TreeMenuNode) => void) | undefined;
  onOpenInNewWindow?: ((storageType: string, node: TreeMenuNode) => void | Promise<void>) | undefined;
  onShareToChatWithMyself?: ((storageType: string, node: TreeMenuNode) => void | Promise<void>) | undefined;
  deleteCount?: number;
};

/**
 * Sidebar tree context menu.
 * Desktop: fixed portal at pointer. Mobile portrait: full-screen modal with path header.
 */
export default function SidebarContextMenu({
  x,
  y,
  node,
  storageType,
  isTrashRoot = false,
  mobileDialog = false,
  onClose,
  onCloseTab,
  onCreateFile,
  onCreateFolder,
  onDownload,
  onRename,
  onChangeEncMdPassword,
  onDelete,
  onEmptyTrash,
  onDuplicate,
  onMove,
  onOpenInNewWindow,
  onShareToChatWithMyself,
  deleteCount = 1,
}: SidebarContextMenuProps): ReactNode {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ left: x ?? 0, top: y ?? 0 });

  const isOpen = Boolean(node);
  const displayName = isTrashRoot ? '쓰레기통' : node?.name;
  const pathLabel = formatTreeNodePath(node);

  const itemClass = mobileDialog
    ? MOBILE_CONTEXT_MENU_ITEM_CLASS
    : 'flex items-center gap-2 w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-odp-fg hover:bg-gray-100 dark:hover:bg-odp-focusBg disabled:opacity-50 disabled:pointer-events-none';
  const iconClass = 'shrink-0 w-4 h-4 text-gray-500 dark:text-odp-muted';

  const itemsProps: MenuItemsProps | null = node
    ? {
        node,
        storageType,
        isTrashRoot,
        deleteCount,
        onClose,
        onCloseTab,
        onCreateFile,
        onCreateFolder,
        onDownload,
        onRename,
        onChangeEncMdPassword,
        onDelete,
        onEmptyTrash,
        onDuplicate,
        onMove,
        onOpenInNewWindow,
        onShareToChatWithMyself,
        itemClass,
        iconClass,
      }
    : null;

  useEffect(() => {
    if (!isOpen || mobileDialog) return undefined;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
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

  if (!node || !itemsProps) return null;

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
      className={`fixed ${DESKTOP_CONTEXT_MENU_Z_CLASS} min-w-[180px] rounded-lg border border-gray-200 dark:border-gray-500 bg-white dark:bg-odp-bgSoft shadow-lg overflow-clip`}
      style={{ left: position.left ?? x, top: position.top ?? y }}
    >
      <SidebarContextMenuItems {...itemsProps} />
    </div>,
    document.body,
  );
}

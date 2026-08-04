import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  IconFilePlus,
  IconFolderPlus,
  IconDownload,
  IconTrash,
} from '@/components/icons';
import { PencilIcon, ArrowRightToLine, Copy, SquareArrowOutUpRight } from 'lucide-react';

const VIEWPORT_PADDING = 8;

/**
 * 우클릭 시 표시되는 사이드바 컨텍스트 메뉴.
 * 폴더: 파일 추가, 폴더 추가, 다운로드, 이름 수정, 삭제, 복제, 이동
 * 파일: 새 창에서 열기, 다운로드, 이름 수정, 삭제, 복제, 이동
 */
export default function SidebarContextMenu({
  x,
  y,
  node,
  storageType,
  isTrashRoot,
  onClose,
  onCreateFile,
  onCreateFolder,
  onDownload,
  onRename,
  onDelete,
  onDuplicate,
  onMove,
  onOpenInNewWindow,
  deleteCount = 1,
}) {
  const menuRef = useRef(null);
  const [position, setPosition] = useState({ left: x, top: y });

  useEffect(() => {
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
  }, [onClose]);

  // Keep menu inside the viewport: flip above the cursor when it would overflow below.
  useLayoutEffect(() => {
    if (x == null || y == null || !node) return;
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
  }, [x, y, node, isTrashRoot]);

  if (x == null || y == null || !node) return null;

  const isFolder = node.type === 'folder';
  const canAdd = isFolder && !isTrashRoot;
  const canEdit = !isTrashRoot;

  const itemClass =
    'flex items-center gap-2 w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-odp-fg hover:bg-gray-100 dark:hover:bg-odp-focusBg disabled:opacity-50 disabled:pointer-events-none';
  const iconClass = 'shrink-0 w-4 h-4 text-gray-500 dark:text-odp-muted';

  /* body로 포털: App 레이아웃에서 메인(z-50)이 사이드바(z-40)보다 위라, fixed 메뉴가 에디터/설정 영역과 겹치면 가려짐 */
  return createPortal(
    <div
      ref={menuRef}
      className="fixed z-100 min-w-[180px] rounded-lg border border-gray-200 dark:border-gray-500 bg-white dark:bg-odp-bgSoft shadow-lg overflow-clip"
      style={{ left: position.left ?? x, top: position.top ?? y }}
    >
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
    </div>,
    document.body,
  );
}

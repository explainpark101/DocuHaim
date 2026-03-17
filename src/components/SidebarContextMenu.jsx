import { useEffect, useRef } from 'react';
import {
  IconFilePlus,
  IconFolderPlus,
  IconDownload,
  IconTrash,
} from '@/components/icons';
import { PencilIcon, ArrowRightToLine, Copy } from 'lucide-react';

/**
 * 우클릭 시 표시되는 사이드바 컨텍스트 메뉴.
 * 폴더: 파일 추가, 폴더 추가, 다운로드, 이름 수정, 삭제, 복제, 이동
 * 파일: 다운로드, 이름 수정, 삭제, 복제, 이동
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
}) {
  const menuRef = useRef(null);

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

  if (x == null || y == null || !node) return null;

  const isFolder = node.type === 'folder';
  const canAdd = isFolder && !isTrashRoot;
  const canEdit = !isTrashRoot;

  const itemClass =
    'flex items-center gap-2 w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-odp-fg hover:bg-gray-100 dark:hover:bg-odp-focusBg disabled:opacity-50 disabled:pointer-events-none';
  const iconClass = 'shrink-0 w-4 h-4 text-gray-500 dark:text-odp-muted';

  return (
    <div
      ref={menuRef}
      className="fixed z-[9999] min-w-[180px] py-1 rounded-lg border border-gray-200 dark:border-odp-borderSoft bg-white dark:bg-odp-bgSoft shadow-lg"
      style={{ left: x, top: y }}
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
          삭제
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
    </div>
  );
}

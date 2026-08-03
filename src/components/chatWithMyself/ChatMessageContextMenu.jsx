import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Reply, Trash2, X } from 'lucide-react';

const itemClass =
  'flex items-center gap-2 w-full px-3 py-2.5 text-left text-sm text-gray-700 dark:text-odp-fg hover:bg-gray-100 dark:hover:bg-odp-focusBg';
const dangerClass =
  'flex items-center gap-2 w-full px-3 py-2.5 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40';

/**
 * Desktop: fixed context menu at pointer.
 * Mobile: bottom modal sheet (long-press).
 */
export default function ChatMessageContextMenu({
  mode = 'menu', // 'menu' | 'modal'
  x,
  y,
  message,
  onClose,
  onReply,
  onDelete,
}) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!message) return undefined;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) onClose?.();
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [message, onClose]);

  if (!message) return null;

  const actions = (
    <>
      <button
        type="button"
        className={itemClass}
        onClick={() => {
          onReply?.(message);
          onClose?.();
        }}
      >
        <Reply size={16} className="shrink-0 text-gray-500" />
        답장
      </button>
      <button
        type="button"
        className={dangerClass}
        onClick={() => {
          onDelete?.(message);
          onClose?.();
        }}
      >
        <Trash2 size={16} className="shrink-0" />
        삭제
      </button>
    </>
  );

  if (mode === 'modal') {
    return createPortal(
      <div className="fixed inset-0 z-100 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4">
        <button
          type="button"
          className="absolute inset-0 cursor-default"
          aria-label="닫기"
          onClick={onClose}
        />
        <div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          className="relative z-10 w-full max-w-md rounded-t-2xl border border-gray-200 bg-white shadow-xl dark:border-odp-borderStrong dark:bg-odp-bgSoft sm:rounded-2xl"
        >
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 dark:border-odp-borderSoft">
            <div className="min-w-0">
              <div className="text-sm font-semibold text-gray-800 dark:text-odp-fgStrong">
                메시지 옵션
              </div>
              <div className="truncate text-xs text-gray-500">
                {(message.body || '').replace(/\s+/g, ' ').slice(0, 60) || '(빈 메시지)'}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-odp-focusBg"
              aria-label="닫기"
            >
              <X size={18} />
            </button>
          </div>
          <div className="py-1 pb-[max(0.5rem,env(safe-area-inset-bottom))]">{actions}</div>
        </div>
      </div>,
      document.body,
    );
  }

  const left = typeof x === 'number' ? Math.min(x, window.innerWidth - 200) : 0;
  const top = typeof y === 'number' ? Math.min(y, window.innerHeight - 120) : 0;

  return createPortal(
    <div
      ref={menuRef}
      className="fixed z-100 min-w-[160px] overflow-clip rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-500 dark:bg-odp-bgSoft"
      style={{ left, top }}
      role="menu"
    >
      {actions}
    </div>,
    document.body,
  );
}

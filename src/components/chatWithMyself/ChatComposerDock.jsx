import { useEffect, useState } from 'react';
import { useResizablePanelHeight } from '@/hooks/useResizablePanelHeight';

const STORAGE_KEY = 's3haim_chat_composer_dock_height';
const DEFAULT_H = 280;
const MIN_H = 140;

function viewportMaxHeight() {
  if (typeof window === 'undefined') return 640;
  const vvH = window.visualViewport?.height ?? window.innerHeight;
  return Math.max(MIN_H, Math.floor(vvH * 0.7));
}

/**
 * Resizable bottom composer dock. Height is always the persisted max;
 * children fill the dock with no outer overflow scroll.
 */
export default function ChatComposerDock({ children, className = '' }) {
  const [maxHeight, setMaxHeight] = useState(viewportMaxHeight);

  useEffect(() => {
    const sync = () => setMaxHeight(viewportMaxHeight());
    sync();
    const vv = window.visualViewport;
    vv?.addEventListener('resize', sync);
    window.addEventListener('resize', sync);
    return () => {
      vv?.removeEventListener('resize', sync);
      window.removeEventListener('resize', sync);
    };
  }, []);

  const { height, isResizing, handleProps } = useResizablePanelHeight({
    storageKey: STORAGE_KEY,
    defaultHeight: DEFAULT_H,
    minHeight: MIN_H,
    maxHeight,
    edge: 'bottom',
  });

  return (
    <div
      className={`relative w-full shrink-0 overflow-hidden border-t-2 border-gray-300 bg-slate-100 shadow-[0_-6px_16px_rgba(15,23,42,0.12)] dark:border-odp-borderStrong dark:bg-odp-bg dark:shadow-[0_-6px_16px_rgba(0,0,0,0.45)] ${className}`}
      style={{ height }}
    >
      <div
        {...handleProps}
        aria-label="채팅 입력창 높이 조절"
        title="채팅 입력창 높이 조절"
        className={[
          'absolute inset-x-0 top-0 z-20 flex h-3 cursor-row-resize touch-none items-start justify-center select-none',
          'pointer-fine:h-2.5',
        ].join(' ')}
      >
        <span
          className={[
            'mt-1 h-1 w-10 rounded-full transition-colors',
            isResizing
              ? 'bg-blue-400/90 dark:bg-blue-400/70'
              : 'bg-slate-400/55 dark:bg-slate-500/55 hover:bg-blue-400/70 dark:hover:bg-blue-400/55',
          ].join(' ')}
          aria-hidden
        />
      </div>
      <div className="flex h-full min-h-0 flex-col overflow-hidden pt-1.5 pb-1.5 md:pb-2">
        {children}
      </div>
    </div>
  );
}

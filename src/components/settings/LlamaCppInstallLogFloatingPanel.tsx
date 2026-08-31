import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Loader2, Minus, Terminal, X } from 'lucide-react';
import type { LlamaCppInstallAction } from '@/utils/llamaCppShell';

const INSTALL_TITLE: Record<LlamaCppInstallAction, string> = {
  brew: 'brew install llama.cpp',
  official: 'llama.app install.sh',
  scoop: 'scoop install llama.cpp (versions)',
};

type LlamaCppInstallLogFloatingPanelProps = {
  open: boolean;
  minimized: boolean;
  action: LlamaCppInstallAction | null;
  heading?: string;
  log: string;
  running: boolean;
  onMinimize: () => void;
  onExpand: () => void;
  onClose: () => void;
};

export default function LlamaCppInstallLogFloatingPanel({
  open,
  minimized,
  action,
  heading,
  log,
  running,
  onMinimize,
  onExpand,
  onClose,
}: LlamaCppInstallLogFloatingPanelProps) {
  const preRef = useRef<HTMLPreElement | null>(null);
  const stickToBottomRef = useRef(true);

  useEffect(() => {
    if (!open || minimized || !stickToBottomRef.current) return;
    const el = preRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [log, open, minimized]);

  if (!open || typeof document === 'undefined') return null;

  const title = heading || (action ? INSTALL_TITLE[action] : 'llama.cpp install');

  if (minimized) {
    return createPortal(
      <button
        type="button"
        onClick={onExpand}
        className="fixed bottom-4 right-4 z-10050 flex size-11 items-center justify-center rounded-full border border-sky-300/80 bg-sky-950/95 text-sky-50 shadow-lg backdrop-blur-sm hover:bg-sky-900 dark:border-sky-700"
        title={running ? `${title} (running)` : title}
        aria-label={running ? `Expand install log: ${title}` : 'Expand install log'}
      >
        {running ? <Loader2 size={18} className="animate-spin" /> : <Terminal size={18} />}
      </button>,
      document.body,
    );
  }

  return createPortal(
    <div
      className="fixed bottom-4 right-4 z-10050 flex w-[min(92vw,440px)] flex-col overflow-hidden rounded-lg border border-sky-300/50 bg-white/95 shadow-2xl backdrop-blur-md dark:border-sky-700/60 dark:bg-odp-surface/95"
      role="dialog"
      aria-modal="false"
      aria-label="llama.cpp install log"
    >
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-sky-200/60 bg-sky-50/90 px-3 py-2 dark:border-sky-800/50 dark:bg-sky-950/40">
        <div className="flex min-w-0 items-center gap-2 text-sm font-semibold text-sky-900 dark:text-sky-100">
          {running ? (
            <Loader2 size={15} className="shrink-0 animate-spin" aria-hidden />
          ) : (
            <Terminal size={15} className="shrink-0" aria-hidden />
          )}
          <span className="truncate">{title}</span>
        </div>
        <div className="flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            onClick={onMinimize}
            className="rounded p-1 text-sky-700 hover:bg-sky-100 dark:text-sky-200 dark:hover:bg-sky-900/50"
            title="Minimize"
            aria-label="Minimize install log"
          >
            <Minus size={15} />
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={running}
            className="rounded p-1 text-sky-700 hover:bg-sky-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-sky-200 dark:hover:bg-sky-900/50"
            title={running ? 'Wait until install finishes or abort first' : 'Close'}
            aria-label="Close install log"
          >
            <X size={15} />
          </button>
        </div>
      </div>
      <pre
        ref={preRef}
        onScroll={(e) => {
          const el = e.currentTarget;
          stickToBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 24;
        }}
        className="max-h-[min(40vh,320px)] min-h-40 overflow-auto bg-gray-950 px-3 py-2 font-mono text-[10px] leading-relaxed text-gray-100"
      >
        {log.trim() ? log : running ? 'Starting…\n' : 'No output yet.\n'}
      </pre>
    </div>,
    document.body,
  );
}

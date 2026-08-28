import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import { Check, ClipboardCheck, Link2, Loader2 } from 'lucide-react';
import { bindCopyTextToast } from '@/utils/copyText';
import { bindTauriDownloadToast } from '@/utils/tauriBlobDownload';

export type ToastIcon = 'check' | 'copy' | 'link' | 'loading';

export type ToastOptions = {
  message: string;
  icon?: ToastIcon;
  /** Auto-dismiss ms (default 1800). Use 0 to keep visible until dismissToast(). */
  durationMs?: number;
};

type ToastContextValue = {
  showToast: (options: ToastOptions | string) => void;
  dismissToast: () => void;
};

type ToastItem = {
  id: number;
  message: string;
  icon: ToastIcon;
};

const TOAST_TRANSITION = { type: 'spring' as const, stiffness: 480, damping: 34 };
const DEFAULT_DURATION_MS = 1800;

const ToastContext = createContext<ToastContextValue | null>(null);

function ToastGlyph({ icon }: { icon: ToastIcon }) {
  if (icon === 'loading') {
    return <Loader2 size={16} className="shrink-0 animate-spin" aria-hidden />;
  }
  if (icon === 'link') {
    return <Link2 size={16} className="shrink-0" aria-hidden />;
  }
  if (icon === 'copy') {
    return <ClipboardCheck size={16} className="shrink-0" aria-hidden />;
  }
  return <Check size={16} className="shrink-0" aria-hidden />;
}

/**
 * App-wide top toast. Use `useToast().showToast(...)`.
 * Also listens for native `copy` events and shows "복사됨".
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastItem | null>(null);
  const idRef = useRef(0);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Skip the next document `copy` toast (programmatic copy already toasted). */
  const suppressNativeCopyToastUntilRef = useRef(0);

  const clearHideTimer = useCallback(() => {
    if (hideTimerRef.current != null) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

  const showToast = useCallback(
    (options: ToastOptions | string) => {
      const message =
        typeof options === 'string'
          ? options.trim()
          : String(options?.message ?? '').trim();
      if (!message) return;

      const icon: ToastIcon =
        typeof options === 'string' ? 'check' : (options.icon ?? 'check');
      const durationMs =
        typeof options === 'string'
          ? DEFAULT_DURATION_MS
          : (options.durationMs ?? DEFAULT_DURATION_MS);

      // Programmatic clipboard writes do not fire `copy`; still suppress briefly
      // in case a caller also dispatches a synthetic copy event.
      suppressNativeCopyToastUntilRef.current = Date.now() + 400;

      idRef.current += 1;
      const id = idRef.current;
      clearHideTimer();
      setToast({ id, message, icon });
      if (durationMs > 0) {
        hideTimerRef.current = setTimeout(() => {
          setToast((prev) => (prev?.id === id ? null : prev));
          hideTimerRef.current = null;
        }, durationMs);
      }
    },
    [clearHideTimer],
  );

  const dismissToast = useCallback(() => {
    clearHideTimer();
    setToast(null);
  }, [clearHideTimer]);

  useEffect(() => () => clearHideTimer(), [clearHideTimer]);

  useEffect(() => {
    bindCopyTextToast(showToast);
    bindTauriDownloadToast(showToast);
    return () => {
      bindCopyTextToast(null);
      bindTauriDownloadToast(null);
    };
  }, [showToast]);

  useEffect(() => {
    const readCopiedPlainText = () => {
      const el = document.activeElement;
      if (
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement
      ) {
        const start = el.selectionStart;
        const end = el.selectionEnd;
        if (start != null && end != null && end > start) {
          return el.value.slice(start, end);
        }
      }
      return String(window.getSelection()?.toString() ?? '');
    };

    const onCopy = () => {
      if (Date.now() < suppressNativeCopyToastUntilRef.current) return;
      if (!readCopiedPlainText().trim()) return;
      showToast({ message: '복사됨', icon: 'copy' });
    };
    document.addEventListener('copy', onCopy);
    return () => document.removeEventListener('copy', onCopy);
  }, [showToast]);

  const value = useMemo(() => ({ showToast, dismissToast }), [showToast, dismissToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-100050 flex justify-center px-3 pt-[max(0.75rem,env(safe-area-inset-top))]"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence mode="popLayout">
          {toast ? (
            <Motion.div
              key={toast.id}
              role="status"
              className="pointer-events-none flex max-w-[min(92vw,22rem)] items-center gap-2 rounded-full border border-gray-200/90 bg-white/95 px-3.5 py-2 text-sm font-medium text-gray-800 shadow-lg backdrop-blur-sm dark:border-odp-borderStrong dark:bg-odp-surface/95 dark:text-odp-fgStrong"
              initial={{ opacity: 0, y: -28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={TOAST_TRANSITION}
            >
              <span
                className={
                  toast.icon === 'loading'
                    ? 'inline-flex size-6 items-center justify-center rounded-full bg-blue-500/15 text-blue-600 dark:bg-blue-400/15 dark:text-blue-400'
                    : 'inline-flex size-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-400'
                }
              >
                <ToastGlyph icon={toast.icon} />
              </span>
              <span className="min-w-0 truncate">{toast.message}</span>
            </Motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
}

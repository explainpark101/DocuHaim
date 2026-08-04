import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import Button from '@/components/Button';
import { IconCheck } from '@/components/icons';

export type AlertModalOptions = {
  title?: string;
  message: string;
  confirmLabel?: string;
  /** Optional secondary detail line (e.g. file path). */
  detail?: string;
};

type AlertModalContextValue = {
  showAlert: (options: AlertModalOptions | string) => void;
  closeAlert: () => void;
};

const OVERLAY_TRANSITION = { duration: 0.18 };
const PANEL_TRANSITION = { type: 'spring' as const, stiffness: 420, damping: 32 };

const AlertModalContext = createContext<AlertModalContextValue | null>(null);

/**
 * App-wide alert dialog (single instance). Use `useAlertModal().showAlert(...)`.
 */
export function AlertModalProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<AlertModalOptions | null>(null);

  const closeAlert = useCallback(() => {
    setAlert(null);
  }, []);

  const showAlert = useCallback((options: AlertModalOptions | string) => {
    if (typeof options === 'string') {
      setAlert({ title: '알림', message: options });
      return;
    }
    const message = String(options?.message ?? '').trim();
    if (!message) return;
    setAlert({
      title: options.title?.trim() || '알림',
      message,
      confirmLabel: options.confirmLabel?.trim() || '확인',
      detail: options.detail?.trim() || undefined,
    });
  }, []);

  useEffect(() => {
    if (!alert) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeAlert();
        return;
      }
      if (event.key !== 'Enter') return;
      if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) return;
      const target = event.target as HTMLElement | null;
      const targetTag = target?.tagName?.toLowerCase?.() ?? '';
      if (targetTag === 'textarea') return;
      if (target?.isContentEditable) return;
      event.preventDefault();
      closeAlert();
    };
    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [alert, closeAlert]);

  const value = useMemo(
    () => ({ showAlert, closeAlert }),
    [showAlert, closeAlert],
  );

  return (
    <AlertModalContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {alert ? (
          <Motion.div
            key="alert-modal"
            className="fixed inset-0 z-100000 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={OVERLAY_TRANSITION}
          >
            <div
              className="absolute inset-0 bg-black/40"
              aria-hidden="true"
              onClick={closeAlert}
            />
            <Motion.div
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="alert-modal-title"
              className="relative flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white text-gray-800 shadow-2xl dark:bg-odp-surface dark:text-odp-fgStrong"
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={PANEL_TRANSITION}
            >
              <div className="p-6">
                <h2
                  id="alert-modal-title"
                  className="mb-2 text-lg font-bold text-gray-800 dark:text-odp-fgStrong"
                >
                  {alert.title || '알림'}
                </h2>
                <p className="mb-4 whitespace-pre-line text-sm text-gray-600 dark:text-gray-400">
                  {alert.message}
                </p>
                {alert.detail ? (
                  <p className="mb-4 truncate text-[11px] text-gray-400 dark:text-gray-500">
                    {alert.detail}
                  </p>
                ) : null}
                <div className="flex justify-end">
                  <Button type="button" variant="primary" size="md" onClick={closeAlert}>
                    <IconCheck size={16} />
                    {alert.confirmLabel || '확인'}
                  </Button>
                </div>
              </div>
            </Motion.div>
          </Motion.div>
        ) : null}
      </AnimatePresence>
    </AlertModalContext.Provider>
  );
}

export function useAlertModal(): AlertModalContextValue {
  const ctx = useContext(AlertModalContext);
  if (!ctx) {
    throw new Error('useAlertModal must be used within AlertModalProvider');
  }
  return ctx;
}

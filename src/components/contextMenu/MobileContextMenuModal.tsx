import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { Dialog } from 'radix-ui';
import { motion as Motion } from 'motion/react';
import { X } from 'lucide-react';
import {
  MOBILE_CONTEXT_MENU_DISMISS_GUARD_MS,
  MOBILE_CONTEXT_MENU_OVERLAY_CLASS,
  MOBILE_CONTEXT_MENU_PANEL_CLASS,
  MOBILE_CONTEXT_MENU_POINTER_BLOCK_MS,
} from '@/components/contextMenu/mobileContextMenuStyles';

const OVERLAY_TRANSITION = { duration: 0.18 };
const PANEL_TRANSITION = { type: 'spring', stiffness: 420, damping: 32 };

const MobileContextMenuCloseContext = createContext<(() => void) | null>(null);

export function useMobileContextMenuClose(): (() => void) | null {
  return useContext(MobileContextMenuCloseContext);
}

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Primary header — what was selected (path, title, preview text, …). */
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  /** Extra class on scrollable body. */
  bodyClassName?: string;
};

/**
 * Full-screen mobile context menu shell (portrait touch).
 */
export default function MobileContextMenuModal({
  open,
  onOpenChange,
  title,
  subtitle,
  children,
  bodyClassName = '',
}: Props) {
  const dismissGuardUntilRef = useRef(0);
  const [pointerBlocked, setPointerBlocked] = useState(false);

  useEffect(() => {
    if (open) {
      dismissGuardUntilRef.current = Date.now() + MOBILE_CONTEXT_MENU_DISMISS_GUARD_MS;
      setPointerBlocked(true);
      const t = window.setTimeout(
        () => setPointerBlocked(false),
        MOBILE_CONTEXT_MENU_POINTER_BLOCK_MS,
      );
      return () => window.clearTimeout(t);
    }
    setPointerBlocked(false);
    return undefined;
  }, [open]);

  const guardOutside = (event: Event) => {
    if (Date.now() < dismissGuardUntilRef.current) {
      event.preventDefault();
    }
  };

  const pointerBlockClass = pointerBlocked ? 'pointer-events-none' : '';
  const closeMenu = () => onOpenChange(false);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next && Date.now() < dismissGuardUntilRef.current) return;
        onOpenChange(next);
      }}
    >
      <MobileContextMenuCloseContext.Provider value={closeMenu}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <Motion.div
            className={MOBILE_CONTEXT_MENU_OVERLAY_CLASS}
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
            className={MOBILE_CONTEXT_MENU_PANEL_CLASS}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={PANEL_TRANSITION}
          >
            <div className="flex shrink-0 items-start justify-between gap-3 border-b border-gray-200 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] dark:border-odp-borderSoft">
              <div className="min-w-0 flex-1">
                <Dialog.Title className="break-all text-sm font-semibold leading-snug text-gray-800 dark:text-odp-fgStrong">
                  {title}
                </Dialog.Title>
                {subtitle ? (
                  <p className="mt-1 truncate text-xs text-gray-500 dark:text-odp-muted">
                    {subtitle}
                  </p>
                ) : null}
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
            <div
              className={`flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto p-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] ${pointerBlockClass} ${bodyClassName}`.trim()}
            >
              {children}
            </div>
          </Motion.div>
        </Dialog.Content>
      </Dialog.Portal>
      </MobileContextMenuCloseContext.Provider>
    </Dialog.Root>
  );
}

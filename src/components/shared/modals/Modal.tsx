import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { useModalLayerKeyboard } from '@/hooks/useModalLayerKeyboard';
import {
  ModalCornerResizeHandles,
  useModalCornerResize,
} from '@/components/modals/modalCornerResize';

const ANIMATION_DURATION_MS = 200;

export type ModalProps = {
  isOpen: boolean;
  onClose?: (() => void) | undefined;
  onConfirm?: (() => void) | undefined;
  children?: ReactNode | undefined;
  contentClassName?: string | undefined;
  contentStyle?: CSSProperties | undefined;
  overlayClassName?: string | undefined;
  ignoreEnterInFields?: boolean | undefined;
  resizable?: boolean | undefined;
  resizeHeight?: boolean | undefined;
  layoutKey?: string | number | boolean | undefined;
};

/**
 * Base modal shell: portal overlay, enter/exit opacity, optional corner resize.
 */
export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  children,
  contentClassName = 'max-w-md max-h-[90vh]',
  contentStyle,
  overlayClassName = '',
  ignoreEnterInFields = false,
  resizable = true,
  resizeHeight = false,
  layoutKey,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const {
    panelRef,
    beginResize,
    resetBox,
    pinToCurrentRect,
    positioned,
    positionedStyle,
  } = useModalCornerResize(resizable, { resizeHeight });

  useModalLayerKeyboard({
    open: isOpen,
    onCancel: onClose,
    onConfirm,
    ignoreEnterInFields,
  });

  useEffect(() => {
    if (isOpen) {
      const raf = requestAnimationFrame(() => {
        setMounted(true);
        setVisible(false);
        requestAnimationFrame(() => setVisible(true));
      });
      return () => cancelAnimationFrame(raf);
    }
    if (mounted) {
      const raf = requestAnimationFrame(() => setVisible(false));
      const timer = setTimeout(() => {
        setMounted(false);
        resetBox();
      }, ANIMATION_DURATION_MS);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(timer);
      };
    }
    return undefined;
  }, [isOpen, mounted, resetBox]);

  // Pin to fixed rect after enter animation so the first drag does not
  // switch flex-centering → fixed (that cancels the pointer).
  useEffect(() => {
    if (!isOpen || !visible || !resizable) return undefined;
    const timer = window.setTimeout(() => {
      pinToCurrentRect();
    }, ANIMATION_DURATION_MS + 30);
    return () => window.clearTimeout(timer);
  }, [isOpen, visible, resizable, pinToCurrentRect]);

  // Size ↔ crop (etc.): drop fixed box, remeasure floor for the new layout.
  useEffect(() => {
    if (!isOpen || layoutKey === undefined) return undefined;
    resetBox();
    const timer = window.setTimeout(() => {
      pinToCurrentRect();
    }, 40);
    return () => window.clearTimeout(timer);
  }, [layoutKey, isOpen, resetBox, pinToCurrentRect]);

  if (!mounted || typeof document === 'undefined') return null;

  const mergedStyle: CSSProperties = {
    ...contentStyle,
    ...positionedStyle,
  };

  return createPortal(
    <div
      className={`fixed inset-0 z-100000 transition-opacity duration-200 ease-out ${
        positioned ? '' : 'flex items-center justify-center p-4'
      } ${visible ? 'opacity-100 bg-black/40' : 'opacity-0 bg-black/0'} ${overlayClassName}`}
      aria-hidden={!visible}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        ref={panelRef as RefObject<HTMLDivElement | null>}
        className={`relative flex w-full flex-col overflow-hidden rounded-2xl bg-white text-gray-800 shadow-2xl dark:bg-odp-surface dark:text-odp-fgStrong ${contentClassName} ${
          // Drop max-width so pinned/resized width can grow; keep inline width
          // from useModalCornerResize (callers should use max-w-* not bare w-[min]).
          positioned ? 'max-w-none!' : ''
        } ${
          positioned
            ? 'opacity-100'
            : `transition-[opacity,transform] duration-200 ease-out ${
                visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-2 scale-95 opacity-0'
              }`
        }`}
        style={mergedStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        {resizable ? (
          <ModalCornerResizeHandles
            onBeginResize={beginResize}
            resizeHeight={resizeHeight}
          />
        ) : null}
      </div>
    </div>,
    document.body,
  );
}

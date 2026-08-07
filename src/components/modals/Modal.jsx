import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useModalLayerKeyboard } from '@/hooks/useModalLayerKeyboard';
import {
  ModalCornerResizeHandles,
  useModalCornerResize,
} from '@/components/modals/modalCornerResize';

const ANIMATION_DURATION_MS = 200;

/**
 * @param {{
 *   isOpen: boolean,
 *   onClose?: () => void,
 *   onConfirm?: () => void,
 *   children?: import('react').ReactNode,
 *   contentClassName?: string,
 *   contentStyle?: import('react').CSSProperties,
 *   overlayClassName?: string,
 *   ignoreEnterInFields?: boolean,
 *   resizable?: boolean,
 * }} props
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
}) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const {
    panelRef,
    beginResize,
    resetBox,
    positioned,
    positionedStyle,
  } = useModalCornerResize(resizable);

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
  }, [isOpen, mounted, resetBox]);

  if (!mounted || typeof document === 'undefined') return null;

  const mergedStyle = {
    ...contentStyle,
    ...positionedStyle,
  };

  return createPortal(
    <div
      className={`fixed inset-0 z-100000 transition-opacity duration-200 ease-out ${
        positioned ? '' : 'flex items-center justify-center p-4'
      } ${visible ? 'opacity-100 bg-black/40' : 'opacity-0 bg-black/0'} ${overlayClassName}`}
      aria-hidden={!visible}
    >
      <div
        ref={panelRef}
        className={`relative flex w-full flex-col overflow-hidden rounded-2xl bg-white text-gray-800 shadow-2xl dark:bg-odp-surface dark:text-odp-fgStrong ${contentClassName} ${
          positioned ? 'max-w-none!' : ''
        } ${
          positioned
            ? 'opacity-100'
            : `transition-[opacity,transform] duration-200 ease-out ${
              visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-2 scale-95 opacity-0'
            }`
        }`}
        style={mergedStyle}
      >
        {children}
        {resizable ? <ModalCornerResizeHandles onBeginResize={beginResize} /> : null}
      </div>
    </div>,
    document.body,
  );
}

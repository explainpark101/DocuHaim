import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useModalLayerKeyboard } from '@/hooks/useModalLayerKeyboard';

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
}) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

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
      const timer = setTimeout(() => setMounted(false), ANIMATION_DURATION_MS);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(timer);
      };
    }
  }, [isOpen, mounted]);

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-100000 flex items-center justify-center p-4 transition-opacity duration-200 ease-out ${
        visible ? 'opacity-100 bg-black/40' : 'opacity-0 bg-black/0'
      } ${overlayClassName}`}
      aria-hidden={!visible}
    >
      <div
        className={`flex w-full flex-col overflow-hidden rounded-2xl bg-white text-gray-800 shadow-2xl transition-[opacity,transform] duration-200 ease-out dark:bg-odp-surface dark:text-odp-fgStrong ${contentClassName} ${
          visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-2 scale-95 opacity-0'
        }`}
        style={contentStyle}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

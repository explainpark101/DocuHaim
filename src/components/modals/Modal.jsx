import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

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
}) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

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

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (typeof onClose === 'function') {
          event.preventDefault();
          onClose();
        }
        return;
      }
      if (event.key !== 'Enter' || typeof onConfirm !== 'function') return;
      if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) return;
      const targetTag = event.target?.tagName?.toLowerCase?.() ?? '';
      if (targetTag === 'textarea') return;
      if (event.target?.isContentEditable) return;
      event.preventDefault();
      onConfirm();
    };
    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [isOpen, onClose, onConfirm]);

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

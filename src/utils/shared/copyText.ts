import type { ToastIcon } from '@/contexts/ToastContext';

export type CopyTextToast = {
  message?: string;
  icon?: ToastIcon;
};

type ShowToastFn = (options: {
  message: string;
  icon?: ToastIcon;
}) => void;

let showToastImpl: ShowToastFn | null = null;

/** Wired by ToastProvider so non-React helpers can trigger toasts. */
export function bindCopyTextToast(showToast: ShowToastFn | null) {
  showToastImpl = showToast;
}

/**
 * Write plain text to the clipboard and show a short toast on success.
 * @returns whether the write succeeded
 */
export async function copyText(
  text: string | null | undefined,
  toast: CopyTextToast | false = {},
): Promise<boolean> {
  const value = String(text ?? '');
  if (!value) return false;
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    return false;
  }
  if (toast !== false) {
    showToastImpl?.({
      message: toast.message?.trim() || '복사됨',
      icon: toast.icon ?? 'copy',
    });
  }
  return true;
}

/** Resolve a usable URL from an anchor (or closest ancestor). */
export function resolveAnchorHref(target: EventTarget | null): string | null {
  if (!(target instanceof Element)) return null;
  const el = target.closest('a[href]');
  if (!(el instanceof HTMLAnchorElement)) return null;
  const attr = (el.getAttribute('href') || '').trim();
  if (!attr || attr === '#' || /^javascript:/i.test(attr)) return null;
  const href = (el.href || attr).trim();
  return href || null;
}

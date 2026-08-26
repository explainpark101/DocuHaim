import type { ToastIcon } from '@/contexts/ToastContext';
import { isDesktopApp } from '@/utils/isDesktopApp';

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

function copyViaExecCommand(value: string): boolean {
  if (typeof document === 'undefined') return false;
  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.setAttribute('readonly', '');
  textarea.style.cssText = 'position:fixed;left:-10000px;top:0;';
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand('copy');
  textarea.remove();
  return ok;
}

/** Write plain text to the system clipboard (Tauri native API when available). */
async function writeClipboardText(value: string): Promise<boolean> {
  if (isDesktopApp()) {
    try {
      const { writeText } = await import('@tauri-apps/plugin-clipboard-manager');
      await writeText(value);
      return true;
    } catch {
      // Fall through to web APIs when the plugin is unavailable.
    }
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Fall through to execCommand.
  }

  return copyViaExecCommand(value);
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
  const ok = await writeClipboardText(value);
  if (!ok) return false;
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

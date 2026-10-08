import { shouldOpenPreviewLinkInNewTab } from '@/utils/appHref';
import { isDesktopApp } from '@/utils/isDesktopApp';
import { isTauriAndroid } from '@/utils/tauriPlatform';

/** Whether an anchor href should open in the OS default browser (Tauri shells). */
export function shouldOpenDesktopExternalLink(
  href: string,
  options: { target?: string | null } = {},
): boolean {
  const raw = String(href || '').trim();
  if (!raw || raw.startsWith('#') || raw.startsWith('javascript:')) return false;

  const lower = raw.toLowerCase();
  if (lower.startsWith('mailto:') || lower.startsWith('tel:')) return true;
  if (shouldOpenPreviewLinkInNewTab(raw)) return true;

  const target = String(options.target || '').trim();
  return target === '_blank' && /^https?:\/\//i.test(raw);
}

/**
 * Editable TipTap surfaces own link open policy (mod-click / hover-card / setting).
 * Skip global shell intercept so plain taps do not force-open while editing.
 */
export function isEditableProseMirrorAnchor(anchor: Element): boolean {
  const root = anchor.closest('.ProseMirror');
  if (!(root instanceof HTMLElement)) return false;
  return root.isContentEditable || root.getAttribute('contenteditable') === 'true';
}

async function openViaShellPlugin(href: string): Promise<void> {
  const { open } = await import('@tauri-apps/plugin-shell');
  await open(href);
}

async function openViaAndroidActivity(href: string): Promise<void> {
  const { invoke } = await import('@tauri-apps/api/core');
  await invoke('android_open_external_url', { url: href });
}

/**
 * Open an external URL in the OS browser (Android Activity Intent, else shell.open).
 */
export async function openDesktopExternalUrl(href: string): Promise<void> {
  const raw = String(href || '').trim();
  if (!raw) return;

  try {
    if (isTauriAndroid()) {
      try {
        await openViaAndroidActivity(raw);
        return;
      } catch (androidError) {
        console.warn(
          'android_open_external_url failed, falling back to shell.open:',
          raw,
          androidError,
        );
      }
    }
    await openViaShellPlugin(raw);
  } catch (error) {
    console.warn('Failed to open external URL in system browser:', raw, error);
  }
}

/**
 * Tauri shells: route external http(s)/mailto/tel anchor clicks to the OS browser.
 * Uses capture phase so nested click handlers cannot swallow the navigation.
 * Editable ProseMirror is excluded — HaimLink / hover-card owns that UX.
 */
export function initDesktopExternalLinks(): void {
  if (!isDesktopApp() || typeof document === 'undefined') return;

  document.addEventListener(
    'click',
    (event) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      let node = event.target;
      if (!(node instanceof Element)) return;

      const anchor = node.closest('a');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (isEditableProseMirrorAnchor(anchor)) return;

      const hrefAttr = anchor.getAttribute('href') || '';
      if (!shouldOpenDesktopExternalLink(hrefAttr, { target: anchor.target })) return;

      const resolvedHref = anchor.href;
      if (!resolvedHref) return;

      event.preventDefault();
      event.stopPropagation();
      void openDesktopExternalUrl(resolvedHref);
    },
    true,
  );
}

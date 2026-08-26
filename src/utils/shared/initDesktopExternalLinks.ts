import { shouldOpenPreviewLinkInNewTab } from '@/utils/appHref';
import { isDesktopApp } from '@/utils/isDesktopApp';

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

async function openDesktopExternalUrl(href: string): Promise<void> {
  try {
    const { open } = await import('@tauri-apps/plugin-shell');
    await open(href);
  } catch (error) {
    console.warn('Failed to open external URL in system browser:', href, error);
  }
}

/**
 * Tauri shells: route external http(s)/mailto/tel anchor clicks to the OS browser.
 * Uses capture phase so nested click handlers cannot swallow the navigation.
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

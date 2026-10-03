import { shouldOpenDesktopExternalLink } from '@/utils/shared/initDesktopExternalLinks';
import { isDesktopApp } from '@/utils/isDesktopApp';
import { isDocuhaimHref, parseDocuhaimHref } from '@/utils/docuhaimLink';
import { openHaimViewPath } from '@/utils/haimOpenViewPath';

async function openViaDesktopShell(href: string): Promise<void> {
  try {
    const { open } = await import('@tauri-apps/plugin-shell');
    await open(href);
  } catch (error) {
    console.warn('Failed to open external URL in system browser:', href, error);
  }
}

/**
 * Open via a temporary anchor click — more reliable than window.open(..., features)
 * under popup blockers / after pointerdown races.
 */
function openViaAnchorClick(href: string, target: string): void {
  if (typeof document === 'undefined') return;
  const a = document.createElement('a');
  a.href = href;
  a.target = target;
  a.rel = 'noopener noreferrer';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/**
 * Open a Haim link href: docuhaim:// in-app, desktop http(s) via OS browser,
 * otherwise a new tab.
 */
export function openHaimLinkHref(
  href: string,
  options?: { target?: string },
): void {
  const raw = String(href || '').trim();
  if (!raw) return;

  const docuhaimPath = parseDocuhaimHref(raw);
  if (docuhaimPath) {
    openHaimViewPath(docuhaimPath);
    return;
  }

  if (isDocuhaimHref(raw)) return;

  const rawTarget = String(options?.target || '_blank').trim();
  const target = !rawTarget || rawTarget === '_self' ? '_blank' : rawTarget;

  if (
    isDesktopApp() &&
    shouldOpenDesktopExternalLink(raw, { target })
  ) {
    void openViaDesktopShell(raw);
    return;
  }

  openViaAnchorClick(raw, target);
}

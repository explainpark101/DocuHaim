import {
  openDesktopExternalUrl,
  shouldOpenDesktopExternalLink,
} from '@/utils/shared/initDesktopExternalLinks';
import { isDesktopApp } from '@/utils/isDesktopApp';
import { isDocuhaimHref, parseDocuhaimHref } from '@/utils/docuhaimLink';
import { openHaimViewPath } from '@/utils/haimOpenViewPath';
import {
  isNoteDocumentHashHref,
  scrollPreviewToDocumentHash,
} from '@/utils/noteDocumentHashLink';

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
 * Open a Haim link href: in-document `#` scrolls (never a new tab),
 * docuhaim:// in-app, desktop/Android http(s) via OS browser, otherwise a new tab.
 *
 * Prefer editor-aware scroll helpers (`scrollHaimEditorToDocumentHash`, etc.)
 * when a TipTap/CM/preview root is available; this is the last-resort path.
 */
export function openHaimLinkHref(
  href: string,
  options?: { target?: string },
): void {
  const raw = String(href || '').trim();
  if (!raw) return;

  if (isNoteDocumentHashHref(raw)) {
    if (typeof document !== 'undefined') {
      scrollPreviewToDocumentHash(raw, document);
    }
    return;
  }

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
    void openDesktopExternalUrl(raw);
    return;
  }

  openViaAnchorClick(raw, target);
}

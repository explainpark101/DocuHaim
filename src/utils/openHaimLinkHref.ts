import { isDocuhaimHref, parseDocuhaimHref } from '@/utils/docuhaimLink';
import { openHaimViewPath } from '@/utils/haimOpenViewPath';

/**
 * Open a Haim WYSIWYG link href: docuhaim:// in-app, otherwise new tab.
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
  window.open(raw, target, 'noopener,noreferrer');
}

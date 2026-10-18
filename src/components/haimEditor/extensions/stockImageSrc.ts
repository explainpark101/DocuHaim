import { isInlineOrRemoteImageSrc } from '@/utils/storageImagePath';

const CUSTOM_SCHEME = /^[a-z][a-z0-9+.-]*:/i;

/**
 * True when the browser can try to paint this src.
 * Unknown schemes such as `attachment:` are not requested.
 */
export function isRenderableImageSrc(src: string): boolean {
  const value = String(src || '').trim();
  if (!value) return false;
  if (isInlineOrRemoteImageSrc(value)) return true;
  if (CUSTOM_SCHEME.test(value)) return false;
  return true;
}

// Wiki 이미지 캐싱 방식 설정
// - 'blob': S3에서 Blob을 받아 IndexedDB에 Blob으로 저장 (기본)
// - 'url':  Pre-signed URL 문자열과 만료 시간을 캐싱

export const WIKI_IMAGE_CACHE_MODE_BLOB = 'blob';
export const WIKI_IMAGE_CACHE_MODE_URL = 'url';

// TODO: 향후 .settings 쪽으로 옮길 수 있지만,
// 현재는 간단히 localStorage에만 저장한다.
const LOCAL_STORAGE_KEY = 's3haim_wiki_image_cache_mode';

export function loadWikiImageCacheMode() {
  if (typeof window === 'undefined') return WIKI_IMAGE_CACHE_MODE_BLOB;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw === WIKI_IMAGE_CACHE_MODE_URL) return WIKI_IMAGE_CACHE_MODE_URL;
    return WIKI_IMAGE_CACHE_MODE_BLOB;
  } catch {
    return WIKI_IMAGE_CACHE_MODE_BLOB;
  }
}

export function saveWikiImageCacheMode(mode) {
  if (typeof window === 'undefined') return;
  if (mode !== WIKI_IMAGE_CACHE_MODE_BLOB && mode !== WIKI_IMAGE_CACHE_MODE_URL) return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, mode);
  } catch {
    // ignore
  }
}


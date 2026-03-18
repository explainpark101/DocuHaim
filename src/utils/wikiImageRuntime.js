import {
  loadWikiImageCacheMode,
  WIKI_IMAGE_CACHE_MODE_BLOB,
  WIKI_IMAGE_CACHE_MODE_URL,
} from '@/utils/wikiImageSettings';

let currentMode = loadWikiImageCacheMode();

export function getWikiImageCacheMode() {
  if (currentMode !== WIKI_IMAGE_CACHE_MODE_BLOB && currentMode !== WIKI_IMAGE_CACHE_MODE_URL) {
    currentMode = WIKI_IMAGE_CACHE_MODE_BLOB;
  }
  return currentMode;
}

export function setWikiImageCacheMode(mode) {
  if (mode === WIKI_IMAGE_CACHE_MODE_BLOB || mode === WIKI_IMAGE_CACHE_MODE_URL) {
    currentMode = mode;
  }
}


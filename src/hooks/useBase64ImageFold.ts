import { useCallback, useState } from 'react';
import {
  loadBase64ImageFoldEnabled,
  saveBase64ImageFoldEnabled,
} from '@/utils/base64ImageFoldSettings';

/** Persisted default: collapse long base64 image payloads in the markdown source editor. */
export function useBase64ImageFold(): [
  boolean,
  (next: boolean | ((prev: boolean) => boolean)) => void,
] {
  const [foldBase64Images, setFoldBase64ImagesState] = useState(loadBase64ImageFoldEnabled);

  const setFoldBase64Images = useCallback((next: boolean | ((prev: boolean) => boolean)) => {
    setFoldBase64ImagesState((prev) => {
      const value = typeof next === 'function' ? next(prev) : Boolean(next);
      saveBase64ImageFoldEnabled(value);
      return value;
    });
  }, []);

  return [foldBase64Images, setFoldBase64Images];
}

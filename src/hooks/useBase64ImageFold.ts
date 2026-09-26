import { useCallback, useEffect, useState } from 'react';
import {
  BASE64_IMAGE_FOLD_CHANGED_EVENT,
  loadBase64ImageFoldEnabled,
  saveBase64ImageFoldEnabled,
} from '@/utils/base64ImageFoldSettings';

/**
 * Persisted default: collapse long base64 image payloads in the markdown
 * source editor. Toggle lives in Settings (not the editor toolbar); individual
 * folds still expand on chip click while the setting is on.
 */
export function useBase64ImageFold(): [
  boolean,
  (next: boolean | ((prev: boolean) => boolean)) => void,
] {
  const [foldBase64Images, setFoldBase64ImagesState] = useState(
    loadBase64ImageFoldEnabled,
  );

  useEffect(() => {
    const onEvt = () => setFoldBase64ImagesState(loadBase64ImageFoldEnabled());
    window.addEventListener(BASE64_IMAGE_FOLD_CHANGED_EVENT, onEvt);
    return () => {
      window.removeEventListener(BASE64_IMAGE_FOLD_CHANGED_EVENT, onEvt);
    };
  }, []);

  const setFoldBase64Images = useCallback(
    (next: boolean | ((prev: boolean) => boolean)) => {
      setFoldBase64ImagesState((prev) => {
        const value = typeof next === 'function' ? next(prev) : Boolean(next);
        saveBase64ImageFoldEnabled(value);
        return value;
      });
    },
    [],
  );

  return [foldBase64Images, setFoldBase64Images];
}
